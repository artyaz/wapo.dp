"use client";

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import {
  MATERIAL_RAMP,
  SHAPE_RADIUS,
  INTENSITY_BASE_SCALE,
  SPECULAR_DEFAULTS,
  type MaterialLevel,
  type GlassShape,
  type RefractionIntensity,
} from "./engine-detect";
import {
  useGlassRuntime,
  useGlassMaterial,
  GlassMaterialContext,
  hashKey,
  type GlassMaterialContextValue,
} from "./glass-store";
import {
  generateDisplacementMaps,
  displacementMapKey,
} from "./displacement-map";
import {
  createLiquidGlass,
  type LiquidGlassHandle,
  type BackdropSpec,
} from "./webgl-refraction";

/**
 * GlassSurface — the universal liquid-glass primitive, rebuilt on the
 * kube.io reference implementation:
 *
 *   https://kube.io/blog/liquid-glass-css-svg/
 *
 * One component, three implementation tiers, identical semantics:
 *
 *  svg-displacement  Chromium: backdrop-filter: url(#filter) where the SVG
 *                    filter is EXACTLY the article's construction — an
 *                    element-sized feImage displacement map (real Snell's-law
 *                    refraction, normalized vectors) + a single
 *                    feDisplacementMap whose scale IS the physical maximum
 *                    displacement + a specular rim feImage blended with
 *                    feBlend mode="screen".
 *  webgl-refraction  Safari/Firefox: WebGL canvas in the inset slot; full mode
 *                    replaces the material, edge mode adds the bevel band over
 *                    the live backdrop.
 *  backdrop-filter   base tier: progressive (edge-only) blur + saturation.
 *
 * Layer stack (bottom → top), the tint moved OFF the root so the
 * backdrop-filter layers sample the page content itself, not the tint:
 *
 *   1. refraction layer   — url(#filter), Chromium tier
 *   2. progressive blur   — STACKED masked blur layers (kube.io "Progressive
 *                           Blur"): each layer is a small blur radius masked
 *                           to a shrinking span of the bezel band, so the
 *                           frost compounds toward the edge into a crisp
 *                           gradient instead of one fat alpha-faded blur
 *                           (which reads as bloom). Layers render ONLY when
 *                           the maps exist — never unmasked.
 *   3. tint layer         — color-mix(panel, tint%) over the refracted content
 *   4. rim                — 20% white border
 *   5. dual sheen         — canonical specular construction
 *   6. content            — crisp, above every layer
 *
 * Every backdrop-filter layer carries the surface's own border-radius so the
 * filter's sample region follows the rounded shape — square-cornered filter
 * layers under a rounded clip leave a translucent fringe (the "half-transparent
 * box" artifact) along the edges.
 *
 * Elastic pull interaction (kube.io magnifying-glass feel): grab the surface
 * anywhere and drag — the glass follows the pointer with saturating resistance
 * (it never stretches all the way to the cursor; it has its own
 * stretchability), elongating along the pull axis and squashing across it,
 * then springs back with an underdamped jelly wobble on release. The whole
 * deformation is a pure CSS transform on the root: layout, DOM geometry and
 * interactive children are completely untouched — buttons inside keep their
 * positions and keep working — while ALL content (text, icons) stretches
 * visually with the glass because the entire subtree transforms together.
 * No cursor is shown for the gesture. Interactive descendants (buttons,
 * links, inputs…) opt out automatically so their normal behavior wins.
 */

export interface GlassSurfaceProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  material?: MaterialLevel;
  shape?: GlassShape;
  /** radius override in px, used when shape="free" */
  radius?: number;
  intensity?: RefractionIntensity;
  /** enable the strategy tiers (false = static base material only) */
  glass?: boolean;
  /** WebGL tier mode over live content ("edge") or procedural stages ("full") */
  webglMode?: "full" | "edge";
  /** procedural backdrop for webgl full mode */
  backdrop?: BackdropSpec;
  /**
   * Elastic pull-to-stretch interaction (default true). Grab the surface and
   * drag: it deforms toward the pointer with saturating resistance and
   * springs back on release — purely visual, no layout effects.
   */
  stretchable?: boolean;
  as?: "div" | "header" | "nav" | "section" | "aside" | "footer";
  /** React 19 ref prop — merged with the internal root ref */
  ref?: React.Ref<HTMLDivElement>;
}

/* ------------------------------------------------------------------ */
/* Stretch spring — tiny underdamped spring, rAF-driven, no deps       */
/* ------------------------------------------------------------------ */

interface SpringState {
  from: number;
  to: number;
  v: number;
}

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Runs an underdamped spring per axis and calls back with values each frame.
 * Returns a stop function.
 */
function runSprings(
  axes: SpringState[],
  onUpdate: (values: number[], done: boolean) => void,
  stiffness = 200,
  damping = 16
): () => void {
  let raf = 0;
  let last = performance.now();
  const step = (now: number) => {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;
    let settled = true;
    const values = axes.map((a) => {
      const f = -stiffness * (a.from - a.to);
      const d = -damping * a.v;
      a.v += (f + d) * dt;
      a.from += a.v * dt;
      if (Math.abs(a.from - a.to) > 0.1 || Math.abs(a.v) > 1) settled = false;
      return a.from;
    });
    onUpdate(values, settled);
    if (!settled) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/* ------------------------------------------------------------------ */
/* Elastic pull — saturating offset + directional stretch transform    */
/* ------------------------------------------------------------------ */

/** Interactive descendants that must never start a pull gesture. */
const PULL_EXCLUDES =
  "button, a, input, textarea, select, label, summary, details, " +
  "[role='button'], [role='slider'], [role='tab'], [role='option'], " +
  "[role='checkbox'], [role='switch'], [role='menuitem'], " +
  "[contenteditable=''], [contenteditable='true'], [data-glass-no-stretch]";

/** Saturating resistance: the offset asymptotically approaches maxPull. */
function saturatePull(delta: number, maxPull: number): number {
  return maxPull * Math.tanh(delta / maxPull);
}

/**
 * Writes the elastic deformation for one pull offset. Purely visual: a
 * translate toward the pull plus a stretch along the pull axis and a squash
 * across it (rotate → scale → rotate back keeps the deformation axis-aligned
 * with the pull direction). Below the subpixel floor the transform clears —
 * identity costs nothing.
 */
function applyPullTransform(
  el: HTMLElement,
  ox: number,
  oy: number,
  maxPull: number
): void {
  const len = Math.hypot(ox, oy);
  if (len < 0.5) {
    if (el.style.transform) el.style.transform = "";
    return;
  }
  const t = Math.min(1, len / maxPull);
  const stretch = 1 + 0.85 * t; // elongation along the pull axis
  const squash = 1 - 0.32 * t; // counter-squash across it
  const ang = Math.atan2(oy, ox);
  el.style.transform =
    `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px) ` +
    `rotate(${ang.toFixed(4)}rad) ` +
    `scale(${stretch.toFixed(4)}, ${squash.toFixed(4)}) ` +
    `rotate(${(-ang).toFixed(4)}rad)`;
}

interface PullState {
  pointerId: number;
  startX: number;
  startY: number;
  maxPull: number;
  ox: number;
  oy: number;
}

/* ------------------------------------------------------------------ */
/* GlassSurface                                                        */
/* ------------------------------------------------------------------ */

export function GlassSurface({
  children,
  material: materialProp,
  shape = "capsule",
  radius: radiusProp,
  intensity = "medium",
  glass = true,
  webglMode = "edge",
  backdrop,
  stretchable = true,
  as = "div",
  className,
  style,
  ref: forwardedRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ...otherProps
}: GlassSurfaceProps) {
  const ctx = React.useContext(GlassMaterialContext);
  const material = materialProp ?? ctx.level;

  const strategy = useGlassRuntime((s) => s.strategy);
  const registerFilter = useGlassRuntime((s) => s.registerFilter);
  const unregisterFilter = useGlassRuntime((s) => s.unregisterFilter);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
      }
    },
    [forwardedRef]
  );
  const [filterId, setFilterId] = React.useState<string | null>(null);
  const webglHandle = React.useRef<LiquidGlassHandle | null>(null);

  const shapeRadius =
    shape === "free" ? (radiusProp ?? 0) : (SHAPE_RADIUS[shape] ?? 0);
  const cssRadius = shape === "capsule" ? "9999px" : `${shapeRadius}px`;
  const ramp = MATERIAL_RAMP[material];

  const activeStrategy = glass ? strategy : "backdrop-filter";
  const isSvg = activeStrategy === "svg-displacement" && filterId !== null;
  const isWebgl = activeStrategy === "webgl-refraction";

  /* ------------ measured geometry + generated maps ------------------ */
  const [geo, setGeo] = React.useState<{ w: number; h: number } | null>(null);
  const [stretchBoost, setStretchBoost] = React.useState(0);
  const [maps, setMaps] = React.useState<{
    key: string;
    width: number;
    height: number;
    displacementUrl: string;
    specularUrl: string;
    blurStack: Array<{ radius: number; maskUrl: string }>;
    maximumDisplacement: number;
  } | null>(null);

  React.useEffect(() => {
    if (!glass) return;
    const el = rootRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 8 || h < 8) return;
      setGeo((prev) =>
        prev && Math.abs(prev.w - w) < 0.5 && Math.abs(prev.h - h) < 0.5
          ? prev
          : { w, h }
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [glass]);

  /* ------------ generate maps for the measured geometry ------------- */
  /* Runs on EVERY tier — the progressive-blur stack is universal; only the
     SVG filter registration below is Chromium-specific. */
  React.useEffect(() => {
    if (!glass || !geo) return;
    const { w, h } = geo;
    const r = shape === "capsule" ? Math.min(w, h) / 2 : shapeRadius;

    const spec = {
      width: w,
      height: h,
      radius: r,
      bezel: ramp.bezel,
      thickness: ramp.thickness,
      blur: ramp.blur,
      profile: "convex-squircle" as const,
      specular: {
        angle: SPECULAR_DEFAULTS.angle,
        exponent: SPECULAR_DEFAULTS.saturation,
      },
    };
    const generated = generateDisplacementMaps(spec);
    if (!generated) return;
    setMaps({
      key: displacementMapKey(spec),
      width: w,
      height: h,
      displacementUrl: generated.displacementUrl,
      specularUrl: generated.specularUrl,
      blurStack: generated.blurStack,
      maximumDisplacement: generated.maximumDisplacement,
    });
  }, [glass, geo, shape, shapeRadius, ramp.bezel, ramp.thickness, ramp.blur]);

  /* ------------ Chromium tier: per-geometry filter registration ------ */
  const registeredKeyRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!glass || strategy !== "svg-displacement" || !maps) return;

    // kube.io "Refraction Level": the intensity fork and material ramp
    // multiply the physical maximum, and pulling boosts it further (the
    // glass lenses harder while it is deformed).
    const scale = Math.max(
      1,
      Math.round(
        maps.maximumDisplacement *
          INTENSITY_BASE_SCALE[intensity] *
          ramp.refraction *
          (1 + 0.6 * stretchBoost)
      )
    );

    const key = `${maps.key}-s${scale}`;
    const id = `glass-dsp-${hashKey(key)}`;
    registerFilter(key, {
      id,
      width: maps.width,
      height: maps.height,
      displacementUrl: maps.displacementUrl,
      specularUrl: maps.specularUrl,
      scale,
      specularOpacity: SPECULAR_DEFAULTS.opacity,
      saturate: Math.round(ramp.saturate * 100),
    });
    setFilterId(id);
    registeredKeyRef.current = key;

    return () => {
      const k = registeredKeyRef.current;
      if (k) {
        unregisterFilter(k);
        registeredKeyRef.current = null;
      }
    };
  }, [
    glass,
    strategy,
    maps,
    geo,
    shape,
    shapeRadius,
    intensity,
    stretchBoost,
    registerFilter,
    unregisterFilter,
    ramp.bezel,
    ramp.thickness,
    ramp.refraction,
    ramp.saturate,
  ]);

  /* ------------ Safari/Firefox tier: bind the WebGL engine ----------- */
  React.useEffect(() => {
    if (!glass || strategy !== "webgl-refraction") return;
    const el = rootRef.current;
    if (!el) return;

    let handle: LiquidGlassHandle | null = null;
    try {
      handle = createLiquidGlass({
        target: el,
        material,
        mode: webglMode,
        backdrop,
      });
      webglHandle.current = handle;
    } catch {
      // WebGL unavailable or shader failed → stay on the base tier.
    }
    return () => {
      handle?.destroy();
      webglHandle.current = null;
    };
  }, [glass, strategy, material, webglMode, backdrop]);

  /* ------------------------------------------------------------------ */
  /* Elastic pull (magnifying-glass stretchiness)                        */
  /* ------------------------------------------------------------------ */

  const pullRef = React.useRef<PullState | null>(null);
  const springStopRef = React.useRef<(() => void) | null>(null);
  const [stretching, setStretching] = React.useState(false);

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(e);
      if (e.defaultPrevented) return;
      if (!stretchable || e.button !== 0) return;
      if (pullRef.current) return; // one gesture at a time (multi-touch)
      const el = rootRef.current;
      if (!el) return;

      const target = e.target as Element | null;
      if (target?.closest?.(PULL_EXCLUDES)) return;
      // A nested glass surface owns its own pull gesture.
      const ownerSurface = target?.closest?.("[data-glass-surface]");
      if (ownerSurface && ownerSurface !== el) return;

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 24 || h < 12) return; // too small to deform meaningfully

      // Own stretchability: the maximum travel scales with the surface but
      // is capped — big panels are not infinitely pullable.
      const maxPull = Math.min(64, Math.max(24, Math.min(w, h) * 0.35));

      springStopRef.current?.();
      springStopRef.current = null;

      e.preventDefault(); // no text-selection drag
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* capture is best-effort */
      }
      el.style.touchAction = "none"; // claim the gesture on touch too
      el.style.willChange = "transform"; // composited for the whole gesture

      pullRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        maxPull,
        ox: 0,
        oy: 0,
      };
      setStretching(true);
    },
    [stretchable, onPointerDown]
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e);
      const p = pullRef.current;
      const el = rootRef.current;
      if (!p || !el || e.pointerId !== p.pointerId) return;

      const dx = e.clientX - p.startX;
      const dy = e.clientY - p.startY;
      p.ox = saturatePull(dx, p.maxPull);
      p.oy = saturatePull(dy, p.maxPull);
      applyPullTransform(el, p.ox, p.oy, p.maxPull);

      // Refraction intensifies as the glass deforms (quantized so the filter
      // re-registration happens a handful of times per pull).
      const t = Math.min(1, Math.hypot(p.ox, p.oy) / p.maxPull);
      const q = Math.round(t * 5) / 5;
      setStretchBoost((prev) => (prev === q ? prev : q));
    },
    [onPointerMove]
  );

  const endPull = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(e);
      const p = pullRef.current;
      const el = rootRef.current;
      if (!p || !el || e.pointerId !== p.pointerId) return;

      pullRef.current = null;
      setStretching(false);
      setStretchBoost(0);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
      el.style.touchAction = "";

      const clearGesture = () => {
        el.style.transform = "";
        el.style.willChange = "";
      };
      if (reducedMotion() || Math.hypot(p.ox, p.oy) < 0.5) {
        clearGesture();
        return;
      }

      // Elastic snap-back: underdamped spring on the offset — the jelly
      // wobble comes free because the stretch is derived from the offset.
      const axes: SpringState[] = [
        { from: p.ox, to: 0, v: 0 },
        { from: p.oy, to: 0, v: 0 },
      ];
      springStopRef.current = runSprings(
        axes,
        (values, done) => {
          applyPullTransform(el, values[0], values[1], p.maxPull);
          if (done) {
            clearGesture();
            springStopRef.current = null;
          }
        },
        170,
        13
      );
    },
    [onPointerUp]
  );

  const handlePointerCancel = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerCancel?.(e);
      const p = pullRef.current;
      const el = rootRef.current;
      if (!p || !el || e.pointerId !== p.pointerId) return;
      pullRef.current = null;
      setStretching(false);
      setStretchBoost(0);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
      el.style.touchAction = "";
      el.style.transform = "";
      el.style.willChange = "";
    },
    [onPointerCancel]
  );

  React.useEffect(
    () => () => {
      springStopRef.current?.();
    },
    []
  );

  const Tag = as as React.ElementType;

  /* Layer styles ------------------------------------------------------ */
  const webglFull = isWebgl && webglMode === "full";
  const saturatePct = Math.round(ramp.saturate * 100);

  // Stacked progressive blur (kube.io): small radii, shrinking masks, each
  // layer rounded to the surface shape. Rendered ONLY when the maps exist —
  // an unmasked blur layer would frost the whole surface (the bloom bug).
  const blurLayers = React.useMemo(() => {
    if (!maps || maps.blurStack.length === 0 || !glass || webglFull)
      return null;
    return maps.blurStack.map((l) => {
      const maskUrl = `url(${l.maskUrl})`;
      return {
        radius: l.radius,
        style: {
          borderRadius: cssRadius,
          backdropFilter: `blur(${l.radius}px)`,
          WebkitBackdropFilter: `blur(${l.radius}px)`,
          maskImage: maskUrl,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskImage: maskUrl,
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
        } as React.CSSProperties,
      };
    });
  }, [maps, glass, webglFull, cssRadius]);

  return (
    <Tag
      ref={setRootRef}
      data-glass-surface={activeStrategy}
      data-stretching={stretching || undefined}
      className={twClassNames(
        "relative isolate overflow-hidden",
        stretching && "select-none",
        className
      )}
      style={{
        borderRadius: cssRadius,
        boxShadow: "var(--ds-shadow-glass-specular)",
        ...style,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPull}
      onPointerCancel={handlePointerCancel}
      {...otherProps}
    >
      {/* Chromium tier: the kube.io refraction filter on its own layer —
          a failed url() voids only this layer */}
      {isSvg && filterId ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: cssRadius,
            backdropFilter: `url(#${filterId})`,
            WebkitBackdropFilter: `url(#${filterId})`,
          }}
        />
      ) : null}

      {/* progressive blur — the stacked frost gradient (kube.io music
          player "Progressive Blur"); saturate applies unmasked on
          non-Chromium tiers where the SVG filter can't carry it */}
      {!webglFull ? (
        <>
          {activeStrategy !== "svg-displacement" && glass ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: cssRadius,
                backdropFilter: `saturate(${saturatePct}%)`,
                WebkitBackdropFilter: `saturate(${saturatePct}%)`,
              }}
            />
          ) : null}
          {blurLayers?.map((l, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={l.style}
            />
          ))}
        </>
      ) : null}

      {/* tint — ABOVE the refracted backdrop, so the veil never blurs the
          sampled content (the old root-background tint sat inside the
          backdrop snapshot and flattened the refraction) */}
      {!webglFull ? (
        <div
          aria-hidden="true"
          className="praxis-glass-tint pointer-events-none absolute inset-0"
          style={{
            borderRadius: cssRadius,
            backgroundColor: `color-mix(in srgb, var(--ds-color-panel) ${ramp.tint}%, transparent)`,
          }}
        />
      ) : null}

      {/* rim — 20% white (spec: single rim token) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: cssRadius,
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* dual quad-stop sheen — canonical specular construction */}
      {!webglFull ? (
        <>
          <div
            aria-hidden="true"
            className="praxis-sheen-primary pointer-events-none absolute inset-0"
            style={{ borderRadius: cssRadius }}
          />
          <div
            aria-hidden="true"
            className="praxis-sheen-counter pointer-events-none absolute inset-0"
            style={{ borderRadius: cssRadius }}
          />
        </>
      ) : null}

      {/* content sits above every layer, crisp. It stretches visually with
          the glass because the whole subtree transforms together — layout
          and DOM geometry never move. */}
      {children ? (
        <div className="relative z-10 flex w-full items-center">{children}</div>
      ) : null}
    </Tag>
  );
}

export { GlassMaterialContext, useGlassMaterial };
export type { GlassMaterialContextValue };
