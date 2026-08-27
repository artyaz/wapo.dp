"use client";

import { create } from "zustand";
import type {
  GlassStrategy,
  MaterialLevel,
  RefractionIntensity,
} from "./engine-detect";
import type { RefractionParams } from "./webgl-refraction";

/**
 * Global glass runtime state.
 *
 * - `strategy` is negotiated once on the client after mount. The initial
 *   render is always the safe base tier (backdrop-filter), and the runtime
 *   promotes the tier afterwards — the review's "ship blur-based glass as the
 *   base state, opt into url() refraction only on a Chromium-positive signal".
 *
 * - `filters` is the page-level SVG filter registry. Every GlassSurface
 *   registers a filter keyed by its geometry (size × radius × scales); the
 *   GlassFilters host renders <filter> defs for all registered entries with
 *   refcounting. Per-instance IDs sidestep the singleton-vs-multi-instance
 *   open question — identical geometry dedupes to one filter.
 */

export interface GlassFilterSpec {
  id: string;
  /** element border-box width the filter is sized to (px) */
  width: number;
  /** element border-box height the filter is sized to (px) */
  height: number;
  /** displacement map data-url (R = X, G = Y, neutral 128) */
  displacementUrl: string;
  /** specular rim map data-url (grayscale) */
  specularUrl: string;
  /** feDisplacementMap scale — physical maximum displacement in px */
  scale: number;
  /** specular highlight opacity inside the filter */
  specularOpacity: number;
  /** material saturation percent, folded in via feColorMatrix */
  saturate: number;
}

/**
 * feColorMatrix offsets that drop the chroma of the page's base background.
 *
 * backdrop-filter samples the whole composited backdrop, and the base page
 * background is always the bottom of it — so the material's feColorMatrix
 * saturate (4..9) multiplies the base colour's chroma along with everything
 * else. On this warm off-white page, rgb(251 251 249) x saturate(9) is
 * rgb(252 252 234): the pale yellow that shows in the rim band, where the
 * saturated copy is composited at full opacity.
 *
 * These offsets shift the base colour onto its own luma (the saturate
 * matrix's own coefficients) at the head of the chain, so the base arrives
 * at the saturate already neutral and can tint nothing. Surrounding
 * material keeps its colour — shifted by the same sub-1% offset — and still
 * refracts, saturates and reflects exactly as before.
 */
export interface BaseChromaOffsets {
  /** feColorMatrix R-row offset, filter units (0..1) */
  or: number;
  /** feColorMatrix G-row offset */
  og: number;
  /** feColorMatrix B-row offset */
  ob: number;
}

/** feColorMatrix type="saturate" luma coefficients (sRGB). */
const LUMA = { r: 0.213, g: 0.715, b: 0.072 } as const;

/** Parses `rgb(251 251 249)`, `rgb(251, 251, 249)`, `rgba(…)`. Opaque only. */
function parseRgb(value: string): [number, number, number] | null {
  const m = value.match(
    /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?/
  );
  if (!m) return null;
  if (m[4] !== undefined) {
    const raw = m[4];
    const alpha = raw.endsWith("%") ? Number.parseFloat(raw) / 100 : Number(raw);
    if (!(alpha > 0.99)) return null; // translucent: not the painted base
  }
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** The colour actually painted underneath every glass surface. */
function readBaseBackground(): [number, number, number] | null {
  if (typeof document === "undefined") return null;
  for (const el of [document.body, document.documentElement]) {
    if (!el) continue;
    const painted = parseRgb(getComputedStyle(el).backgroundColor);
    if (painted) return painted;
  }
  return parseRgb(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--ds-color-default-background")
      .trim()
  );
}

/** null when the base is unreadable or already neutral — chain stays verbatim. */
export function baseChromaOffsets(): BaseChromaOffsets | null {
  const base = readBaseBackground();
  if (!base) return null;
  const [r, g, b] = base;
  if (Math.abs(r - g) < 0.5 && Math.abs(g - b) < 0.5 && Math.abs(r - b) < 0.5) {
    return null;
  }
  const luma = LUMA.r * r + LUMA.g * g + LUMA.b * b;
  return {
    or: (luma - r) / 255,
    og: (luma - g) / 255,
    ob: (luma - b) / 255,
  };
}

interface GlassRuntimeState {
  strategy: GlassStrategy;
  negotiated: boolean;
  filters: Record<string, GlassFilterSpec>;
  /** null until probed, or when the base background carries no chroma */
  baseChroma: BaseChromaOffsets | null;
  /**
   * Whether the WebGL tier found a backdrop image to refract. null before any
   * surface reports in. false is the important state: the tier is live but the
   * shader has nothing to bend, so every refraction control is inert.
   */
  webglTexture: boolean | null;
  setStrategy: (strategy: GlassStrategy) => void;
  setWebglTexture: (found: boolean) => void;
  setBaseChroma: (offsets: BaseChromaOffsets | null) => void;
  registerFilter: (key: string, spec: GlassFilterSpec) => void;
  unregisterFilter: (key: string) => void;
}

export const useGlassRuntime = create<GlassRuntimeState>((set) => ({
  strategy: "backdrop-filter",
  negotiated: false,
  filters: {},
  baseChroma: null,
  webglTexture: null,
  setStrategy: (strategy) => set({ strategy, negotiated: true }),
  setWebglTexture: (webglTexture) => set({ webglTexture }),
  setBaseChroma: (baseChroma) => set({ baseChroma }),
  registerFilter: (key, spec) =>
    set((state) => {
      if (state.filters[key]) return state; // refcount: keep-first wins
      return { filters: { ...state.filters, [key]: spec } };
    }),
  unregisterFilter: (key) =>
    set((state) => {
      if (!state.filters[key]) return state;
      const next = { ...state.filters };
      delete next[key];
      return { filters: next };
    }),
}));

/** Stable hash for filter ids (djb2, hex). */
export function hashKey(key: string): string {
  let h = 5381;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) + h + key.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

/**
 * React context carrying { strategy, level } to consumers — the documented
 * provider contract. GlassSurface consumes it so `material` can be inherited
 * from context when not set explicitly.
 */
import { createContext, useContext, useEffect } from "react";

export interface GlassMaterialContextValue {
  strategy: GlassStrategy;
  level: MaterialLevel;
}

export const GlassMaterialContext = createContext<GlassMaterialContextValue>({
  strategy: "backdrop-filter",
  level: "regular",
});

export function useGlassMaterial(): GlassMaterialContextValue {
  return useContext(GlassMaterialContext);
}

/* ------------------------------------------------------------------ */
/* Live overrides — the docs preview's control panel                   */
/* ------------------------------------------------------------------ */

/**
 * Material settings pushed in from OUTSIDE the component tree, for tuning a
 * surface live without editing its props. Unlike the material context, these
 * WIN over a component's own props: the point is to override what a laid
 * object hardcodes (GlassChip's material="regular", CrosshairTag's
 * stretchable={false}) while dragging a slider.
 *
 * Only the docs component preview mounts this, so nothing in the app is
 * quietly overridden. Every field is optional and unset fields fall through
 * to the component's props, then to the material level's own constants.
 */
export interface GlassOverrides {
  material?: MaterialLevel;
  intensity?: RefractionIntensity;
  refraction?: Partial<RefractionParams>;
  frost?: { blur?: number; saturate?: number };
  bounce?: number;
  stretchable?: boolean;
}

export const GlassOverrideContext = createContext<GlassOverrides>({});

export function useGlassOverrides(): GlassOverrides {
  return useContext(GlassOverrideContext);
}

/* ------------------------------------------------------------------ */
/* Base-background probe — one per document, re-reads on theme change  */
/* ------------------------------------------------------------------ */

let chromaProbeInstalled = false;

function installBaseChromaProbe(): void {
  if (chromaProbeInstalled || typeof document === "undefined") return;
  chromaProbeInstalled = true;

  const read = () => {
    const next = baseChromaOffsets();
    const prev = useGlassRuntime.getState().baseChroma;
    const same =
      prev === next ||
      (!!prev &&
        !!next &&
        Math.abs(prev.or - next.or) < 1e-5 &&
        Math.abs(prev.og - next.og) < 1e-5 &&
        Math.abs(prev.ob - next.ob) < 1e-5);
    if (!same) useGlassRuntime.getState().setBaseChroma(next);
  };

  read();
  const observer = new MutationObserver(read);
  const themed = { attributes: true, attributeFilter: ["class", "style", "data-theme"] };
  observer.observe(document.documentElement, themed);
  if (document.body) observer.observe(document.body, themed);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", read);
}

/**
 * The live base-background chroma offsets. Installs the document probe on
 * first use, so a surface rendered outside GlassRuntime is covered too.
 */
export function useBaseChroma(): BaseChromaOffsets | null {
  useEffect(installBaseChromaProbe, []);
  return useGlassRuntime((s) => s.baseChroma);
}
