/**
 * Glass strategy negotiation — engine detection with a safe fail direction.
 *
 * Chain (per MaterialTokens / integration review):
 *   ① svg-displacement  — Chromium engines (Chrome, Edge, Opera, Brave…)
 *   ② webgl-refraction  — Safari and Firefox primary; universal middle tier
 *   ③ backdrop-filter   — last resort everywhere
 *
 * Rules learned from the review rounds:
 *  - Never gate on `CSS.supports('backdrop-filter', 'url(#f)')` — it tests
 *    parsing, not renderability, and reports true on engines that will not
 *    render SVG-referenced backdrop filters (Safari).
 *  - Never gate on `window.__liquidGLNoWebGL__` — that global does not exist
 *    in the library.
 *  - Undetected engines fall through to the universal tiers (fail direction:
 *    always ends on a tier that renders).
 */

export type GlassStrategy = "svg-displacement" | "webgl-refraction" | "backdrop-filter";

export type MaterialLevel = "ultrathin" | "thin" | "regular" | "thick";

export type GlassShape = "capsule" | "card" | "free";

export type RefractionIntensity = "subtle" | "medium" | "strong";

/* ------------------------------------------------------------------ */
/* Engine sniffing                                                     */
/* ------------------------------------------------------------------ */

interface NavigatorUABrandVersion {
  brand: string;
  version: string;
}

interface NavigatorUAData {
  brands?: NavigatorUABrandVersion[];
  isChromium?: boolean;
}

function navUAData(): NavigatorUAData | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { userAgentData?: NavigatorUAData })
    .userAgentData;
}

/** Chromium-family engine: Chrome, Edge, Opera, Brave, Arc, Dia… */
export function isChromium(): boolean {
  const uaData = navUAData();
  if (uaData) {
    if (typeof uaData.isChromium === "boolean") return uaData.isChromium;
    const brands = uaData.brands ?? [];
    const chromiumBrand = brands.find(
      (b) => b.brand === "Chromium" || b.brand === "Google Chrome"
    );
    if (chromiumBrand) return true;
    // Not-A.Brand spoofs present on non-Chromium engines
    if (brands.some((b) => /Not.?A.?Brand/i.test(b.brand))) return false;
  }
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // Edge/Opera/Brave all carry Chrome in the UA; Safari does not.
  if (/Chrome|Chromium|Edg|OPR|Opera|Brave/i.test(ua) && !/Safari\/(?!.*Chrome)/.test(ua + " " + (ua.match(/Chrome\/[\d.]+/)?.[0] ?? ""))) {
    // Crude but safe: anything advertising Chrome outside a Safari-only UA
    return /Chrome|Chromium|Edg|OPR|Opera|Brave/i.test(ua);
  }
  return false;
}

/** WebKit Safari, including desktop-mode iPad (fails UA-CH entirely). */
export function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" &&
      typeof navigator.maxTouchPoints === "number" &&
      navigator.maxTouchPoints > 1);
  const safariOnly = /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR|Opera|Brave|FxiOS/i.test(ua);
  return safariOnly || (isIOS && !/CriOS|FxiOS|EdgiOS/i.test(ua));
}

export function isFirefox(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Firefox|FxiOS/i.test(navigator.userAgent);
}

/* ------------------------------------------------------------------ */
/* WebGL capability probe (cached once)                                */
/* ------------------------------------------------------------------ */

let webglProbe: boolean | null = null;

/**
 * Chained context acquisition exactly like liquidGL: webgl2 → webgl →
 * experimental-webgl. Returns false when all fail — the CALLER decides how to
 * degrade (the library itself throws; we probe here so the React runtime can
 * pick a tier without exceptions).
 */
export function webglAvailable(): boolean {
  if (webglProbe !== null) return webglProbe;
  if (typeof document === "undefined") {
    webglProbe = false;
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    for (const type of ["webgl2", "webgl", "experimental-webgl"] as const) {
      const gl = canvas.getContext(type, {
        alpha: true,
        antialias: true,
      }) as WebGLRenderingContext | null;
      if (gl) {
        // Lose the probe context immediately — real surfaces create their own.
        const lose = gl.getExtension("WEBGL_lose_context");
        lose?.loseContext();
        webglProbe = true;
        return true;
      }
    }
  } catch {
    /* fallthrough */
  }
  webglProbe = false;
  return false;
}

/* ------------------------------------------------------------------ */
/* Strategy negotiation                                                */
/* ------------------------------------------------------------------ */

let negotiated: GlassStrategy | null = null;

export function negotiateStrategy(): GlassStrategy {
  if (negotiated) return negotiated;
  if (typeof window === "undefined") return "backdrop-filter";

  // ① Chromium → SVG displacement renders natively via backdrop-filter:url()
  if (isChromium()) {
    negotiated = "svg-displacement";
    return negotiated;
  }

  // ② Safari / Firefox (and anything WebKit/Gecko) → WebGL refraction when
  //    the GPU can give us a context; degrades to ③ on throw/no-context.
  if (isSafari() || isFirefox()) {
    negotiated = webglAvailable() ? "webgl-refraction" : "backdrop-filter";
    return negotiated;
  }

  // Unknown engine — universal middle tier if WebGL exists, else base.
  negotiated = webglAvailable() ? "webgl-refraction" : "backdrop-filter";
  return negotiated;
}

/** Test seam — reset cached negotiation. */
export function resetStrategyCache(): void {
  negotiated = null;
  webglProbe = null;
}

/* ------------------------------------------------------------------ */
/* Material ramp — kube.io's shipped component constants, verbatim     */
/* ------------------------------------------------------------------ */

import { MAX_DISPLACEMENT } from "./displacement-map";

export interface MaterialRampEntry {
  /**
   * kube.io "refraction level" — the filter's scaleRatio spring rests at
   * refraction x 0.8 and rises to refraction x 1.0 while the surface is
   * grabbed (the magnifying-glass relationship, exactly).
   */
  refraction: number;
  /**
   * The shipped maxDisplacement constant — feDisplacementMap
   * scale = maxDisplacement x scaleRatio.
   */
  maxDisplacement: number;
  /** bezel band width in px — how far the refraction reaches inward */
  bezel: number;
  /**
   * In-filter frost: feGaussianBlur stdDeviation (kube.io keeps this in
   * 0..1 — the ONLY frost the reference construction carries).
   */
  blur: number;
  /** feColorMatrix saturate on the refracted content (kube 4..9) */
  saturate: number;
  /** feFuncA slope — specular rim opacity (kube 0.2..0.5) */
  specularOpacity: number;
  /** white tint alpha on the glass layer, percent (kube searchbox: 5) */
  tint: number;
  /** WebGL refraction strength on liquidGL's 0–1 scale */
  strength: number;
  /**
   * OUR stretch adaptation (the one allowed change): how much pull
   * travel this material allows relative to the 1cm budget.
   */
  stretch: number;
  /**
   * Release overshoot, 0 (dead stop) .. 1 (very jelly) — framer's spring
   * `bounce`. Thicker glass carries more mass, so it overshoots less.
   */
  bounce: number;
  /**
   * Release settle duration in seconds — framer's spring `duration`. Longer
   * duration is what makes the wobble read as soft rather than snappy: the
   * overshoot amplitude is `bounce`, the speed of it is this.
   */
  settle: number;
}

/**
 * Each level reuses one shipped kube.io component, constants verbatim:
 *
 *   ultrathin  switch thumb   146x92  r46  (rest ratio 0.4)
 *   thin       searchbox      420x56  r28  (rest ratio 0.7)
 *   regular    magnifier      210x150 r75  (rest ratio 0.8 -> scale 98.247)
 *   thick      hero circle    150x150 r75  (rest ratio 1.0)
 */
export const MATERIAL_RAMP: Record<MaterialLevel, MaterialRampEntry> = {
  ultrathin: {
    refraction: 0.5,
    maxDisplacement: MAX_DISPLACEMENT.ultrathin,
    bezel: 4,
    blur: 0.2,
    saturate: 4,
    specularOpacity: 0.4,
    tint: 5,
    strength: 0.35,
    stretch: 0.7,
    bounce: 0.42,
    settle: 0.6,
  },
  thin: {
    refraction: 0.875,
    maxDisplacement: MAX_DISPLACEMENT.thin,
    bezel: 21,
    blur: 1,
    saturate: 4,
    specularOpacity: 0.2,
    tint: 5,
    strength: 0.5,
    stretch: 0.85,
    bounce: 0.38,
    settle: 0.66,
  },
  regular: {
    refraction: 1,
    maxDisplacement: MAX_DISPLACEMENT.regular,
    bezel: 20,
    blur: 0,
    saturate: 9,
    specularOpacity: 0.5,
    tint: 5,
    strength: 0.65,
    stretch: 1,
    bounce: 0.36,
    settle: 0.72,
  },
  thick: {
    refraction: 1.25,
    maxDisplacement: MAX_DISPLACEMENT.thick,
    bezel: 32.5,
    blur: 0.2,
    saturate: 4,
    specularOpacity: 0.4,
    tint: 6,
    strength: 0.85,
    stretch: 1.3,
    bounce: 0.3,
    settle: 0.86,
  },
};

/**
 * The stretch budget (OUR adaptation of the magnifier's drag): a surface
 * may elongate by at most ~1cm (37.8px at 96dpi) or 22% of the stretched
 * axis — whichever is smaller — scaled by the material's stretch factor.
 */
export const STRETCH_BUDGET = { cmPx: 37.8, fraction: 0.22 } as const;

/**
 * Chromatic aberration multipliers per color channel (spec §4).
 *
 * The kube.io reference filter carries NO chromatic aberration — a single
 * displacement map displaces the backdrop once. Kept as an exported token
 * for the WebGL tier and docs, but the SVG tier now follows the reference
 * exactly: one map, one scale, monochrome rim.
 */
export const CHROMATIC = { r: 1.0, g: 1.0, b: 1.0 } as const;

/** Intensity forks — refraction level multipliers per fork (kube.io scale). */
export const INTENSITY_BASE_SCALE: Record<RefractionIntensity, number> = {
  subtle: 0.55,
  medium: 1.0,
  strong: 1.6,
};

/** Default specular highlight opacity (kube.io "Specular Opacity" slider). */
export const SPECULAR_DEFAULTS = { opacity: 0.5, saturation: 6, angle: -60 } as const;

export const SHAPE_RADIUS: Record<GlassShape, number | null> = {
  capsule: 9999,
  card: 16,
  free: null,
};

export function describeStrategy(strategy: GlassStrategy): string {
  switch (strategy) {
    case "svg-displacement":
      return "SVG displacement — Chromium tier, edge-bending via feDisplacementMap";
    case "webgl-refraction":
      return "WebGL refraction — Safari/Firefox tier, shader-based lens";
    default:
      return "Backdrop filter — universal base tier, blur + saturation";
  }
}
