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
 *   2. progressive blur   — masked blur layer: the mask is generated from the
 *                           same rounded-rect SDF as the displacement map, so
 *                           frost ramps up exactly along the bezel band and
 *                           the center stays crisp (kills the old global-blur
 *                           bloom)
 *   3. tint layer         — color-mix(panel, tint%) over the refracted content
 *   4. rim                — 20% white border
 *   5. dual sheen         — canonical specular construction
 *   6. stretch handles    — pull-to-stretch interaction (magnifying-glass
 *                           elasticity), default ON for every surface
 *   7. content            — crisp, above every layer
 *
 * Stretch interaction: grab any edge of the surface and pull — the glass
 * stretches like liquid (real resize, so the displacement map regenerates
 * for the stretched geometry and the refraction intensifies along the pull),
 * then springs back elastically on release. Interior content stays fully
 * interactive; only the outer bezel band is a stretch handle.
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
   * Pull-to-stretch interaction (default true). Grab an edge and pull: the
   * surface stretches with the pointer and springs back on release.
   */
  stretchable?: boolean;
  /** maximum stretch factor per axis when pulled (default 1.6) */
  stretchMax?: number;
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
 * Runs an underdamped spring per axis and calls back with normalized
 * progress each frame. Returns a stop function.
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
  stretchMax = 1.6,
  as = "div",
  className,
  style,
  ref: forwardedRef,
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
    blurMaskUrl: string;
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
  /* Runs on EVERY tier — the progressive-blur mask is universal; only the
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
      blurMaskUrl: generated.blurMaskUrl,
      maximumDisplacement: generated.maximumDisplacement,
    });
  }, [glass, geo, shape, shapeRadius, ramp.bezel, ramp.thickness]);

  /* ------------ Chromium tier: per-geometry filter registration ------ */
  const registeredKeyRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!glass || strategy !== "svg-displacement" || !maps) return;

    // kube.io "Refraction Level": the intensity fork and material ramp
    // multiply the physical maximum, and stretching boosts it further.
    const scale = Math.max(
      1,
      Math.round(
        maps.maximumDisplacement *
          INTENSITY_BASE_SCALE[intensity] *
          ramp.refraction *
          (1 + stretchBoost)
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
  /* Pull-to-stretch (magnifying-glass elasticity)                       */
  /* ------------------------------------------------------------------ */

  const stretchRef = React.useRef<{
    pointerId: number;
    baseW: number;
    baseH: number;
    startX: number;
    startY: number;
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
    width: number;
    height: number;
  } | null>(null);
  const springStopRef = React.useRef<(() => void) | null>(null);
  const [stretching, setStretching] = React.useState(false);

  const beginStretch = React.useCallback(
    (
      e: React.PointerEvent<HTMLDivElement>,
      left: boolean,
      right: boolean,
      top: boolean,
      bottom: boolean
    ) => {
      if (!stretchable || !rootRef.current) return;
      const el = rootRef.current;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 32 || h < 16) return; // too small to stretch meaningfully

      e.preventDefault();
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      springStopRef.current?.();
      springStopRef.current = null;

      stretchRef.current = {
        pointerId: e.pointerId,
        baseW: w,
        baseH: h,
        startX: e.clientX,
        startY: e.clientY,
        left,
        right,
        top,
        bottom,
        width: w,
        height: h,
      };
      setStretching(true);
    },
    [stretchable]
  );

  const moveStretch = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const s = stretchRef.current;
      const el = rootRef.current;
      if (!s || !el || e.pointerId !== s.pointerId) return;

      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;

      const clamp = (v: number, base: number) =>
        Math.min(base * stretchMax, Math.max(base * 0.8, v));

      // Horizontal: pulling the left edge leftward (dx<0) grows the width;
      // pulling the right edge rightward (dx>0) grows it. Both edges in
      // band (small element) → the larger influence wins per axis.
      let width = s.baseW;
      if (s.left && s.right) {
        width = clamp(s.baseW + Math.abs(dx), s.baseW);
      } else if (s.left) {
        width = clamp(s.baseW - dx, s.baseW);
      } else if (s.right) {
        width = clamp(s.baseW + dx, s.baseW);
      }

      let height = s.baseH;
      if (s.top && s.bottom) {
        height = clamp(s.baseH + Math.abs(dy), s.baseH);
      } else if (s.top) {
        height = clamp(s.baseH - dy, s.baseH);
      } else if (s.bottom) {
        height = clamp(s.baseH + dy, s.baseH);
      }

      s.width = width;
      s.height = height;

      // Anchor the opposite edge: compensate the layout shift caused by the
      // resize so the grabbed edge follows the pointer one-to-one.
      const tx = s.left && s.right ? (s.baseW - width) / 2 : s.left ? s.baseW - width : 0;
      const ty = s.top && s.bottom ? (s.baseH - height) / 2 : s.top ? s.baseH - height : 0;

      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.translate =
        tx !== 0 || ty !== 0 ? `${tx}px ${ty}px` : "";

      // refraction intensifies as the glass stretches (quantized so the
      // filter re-registration happens a handful of times per pull)
      const boost = (width / s.baseW + height / s.baseH) / 2 - 1;
      const q = Math.round(Math.max(-0.4, Math.min(0.8, boost)) * 20) / 20;
      setStretchBoost((prev) => (prev === q ? prev : q));
    },
    [stretchMax]
  );

  const endStretch = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const s = stretchRef.current;
      const el = rootRef.current;
      if (!s || !el || e.pointerId !== s.pointerId) return;
      stretchRef.current = null;
      setStretching(false);
      try {
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }

      // elastic snap-back: underdamped spring on width/height/translate
      const w0 = s.baseW;
      const h0 = s.baseH;
      const fromW = s.width;
      const fromH = s.height;
      const txFrom = s.left
        ? s.left && s.right
          ? (w0 - fromW) / 2
          : w0 - fromW
        : 0;
      const tyFrom = s.top
        ? s.top && s.bottom
          ? (h0 - fromH) / 2
          : h0 - fromH
        : 0;

      setStretchBoost(0);

      if (reducedMotion() || (fromW === w0 && fromH === h0)) {
        el.style.width = "";
        el.style.height = "";
        el.style.translate = "";
        return;
      }

      const axes: SpringState[] = [
        { from: fromW, to: w0, v: 0 },
        { from: fromH, to: h0, v: 0 },
        { from: txFrom, to: 0, v: 0 },
        { from: tyFrom, to: 0, v: 0 },
      ];
      springStopRef.current = runSprings(axes, (values, done) => {
        const [w, h, tx, ty] = values;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.translate =
          Math.abs(tx) > 0.1 || Math.abs(ty) > 0.1 ? `${tx}px ${ty}px` : "";
        if (done) {
          el.style.width = "";
          el.style.height = "";
          el.style.translate = "";
          springStopRef.current = null;
        }
      });
    },
    []
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

  // Progressive-blur mask: generated from the same rounded-rect SDF as the
  // displacement map, so the frost ramps up exactly along the bezel band
  // and the center stays crisp. Only meaningful when there IS a blur.
  const blurMaskStyle = React.useMemo<
    React.CSSProperties | undefined
  >(() => {
    if (!maps?.blurMaskUrl || ramp.blur <= 0) return undefined;
    return {
      maskImage: `url(${maps.blurMaskUrl})`,
      maskSize: "100% 100%",
      maskRepeat: "no-repeat",
      WebkitMaskImage: `url(${maps.blurMaskUrl})`,
      WebkitMaskSize: "100% 100%",
      WebkitMaskRepeat: "no-repeat",
    };
  }, [maps, ramp.blur]);

  // The masked progressive-blur layer: blur only along the bezel band.
  // On the Chromium tier it frosts the refracted backdrop; on the fallback
  // tiers it IS the material. Saturate rides along (the SVG filter carries
  // its own saturate on Chromium, so it is omitted there).
  const blurLayerStyle: React.CSSProperties =
    !glass || activeStrategy === "backdrop-filter" || isSvg
      ? {
          backdropFilter: `blur(${ramp.blur}px)`,
          WebkitBackdropFilter: `blur(${ramp.blur}px)`,
        }
      : {
          // WebGL edge mode: base material beneath the canvas
          backdropFilter: `blur(${ramp.blur}px) saturate(${saturatePct}%)`,
          WebkitBackdropFilter: `blur(${ramp.blur}px) saturate(${saturatePct}%)`,
        };

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
      {...otherProps}
    >
      {/* Chromium tier: the kube.io refraction filter on its own layer —
          a failed url() voids only this layer */}
      {isSvg && filterId ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: `url(#${filterId})`,
            WebkitBackdropFilter: `url(#${filterId})`,
          }}
        />
      ) : null}

      {/* progressive blur — masked to the bezel band (kube.io music
          player "Progressive Blur"); saturate applies unmasked on
          non-Chromium tiers where the SVG filter can't carry it */}
      {!webglFull ? (
        <>
          {activeStrategy !== "svg-displacement" && glass ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backdropFilter: `saturate(${saturatePct}%)`,
                WebkitBackdropFilter: `saturate(${saturatePct}%)`,
              }}
            />
          ) : null}
          {ramp.blur > 0 ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ ...blurLayerStyle, ...blurMaskStyle }}
            />
          ) : null}
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

      {/* content sits above every layer, crisp */}
      {children ? (
        <div className="relative z-10 flex w-full items-center">{children}</div>
      ) : null}

      {/* stretch handles — the outer bezel band only; interior content
          stays interactive. Pull to stretch, release to spring back. */}
      {stretchable && !webglFull ? (
        <StretchHandles
          band={Math.min(16, Math.max(10, ramp.bezel * 0.75))}
          radius={cssRadius}
          onBegin={beginStretch}
          onMove={moveStretch}
          onEnd={endStretch}
        />
      ) : null}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* StretchHandles — 8 edge/corner grab zones over the bezel band       */
/* ------------------------------------------------------------------ */

function StretchHandles({
  band,
  radius,
  onBegin,
  onMove,
  onEnd,
}: {
  band: number;
  radius: string;
  onBegin: (
    e: React.PointerEvent<HTMLDivElement>,
    left: boolean,
    right: boolean,
    top: boolean,
    bottom: boolean
  ) => void;
  onMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onEnd: (e: React.PointerEvent<HTMLDivElement>) => void;
}) {
  const handle = (
    left: boolean,
    right: boolean,
    top: boolean,
    bottom: boolean
  ): React.HTMLAttributes<HTMLDivElement> => ({
    onPointerDown: (e) => onBegin(e, left, right, top, bottom),
    onPointerMove: (e) => onMove(e),
    onPointerUp: (e) => onEnd(e),
    onPointerCancel: (e) => onEnd(e),
  });

  // full cursors: corners get diagonal, edges get straight
  const cursorFor = (
    left: boolean,
    right: boolean,
    top: boolean,
    bottom: boolean
  ) => {
    const x = left || right ? (left ? "w" : "e") : "";
    const y = top || bottom ? (top ? "n" : "s") : "";
    if (x && y) return `${y}${x}-resize` as const;
    if (x) return `${x}-resize` as const;
    return `${y}-resize` as const;
  };

  const zone: React.CSSProperties = {
    position: "absolute",
    touchAction: "none",
    zIndex: 20,
  };

  return (
    <>
      {/* left edge */}
      <div
        {...handle(true, false, false, false)}
        aria-hidden="true"
        title=""
        style={{
          ...zone,
          left: 0,
          top: band,
          bottom: band,
          width: band,
          cursor: "ew-resize",
          borderRadius: `${radius} 0 0 ${radius}`,
        }}
      />
      {/* right edge */}
      <div
        {...handle(false, true, false, false)}
        aria-hidden="true"
        title=""
        style={{
          ...zone,
          right: 0,
          top: band,
          bottom: band,
          width: band,
          cursor: "ew-resize",
          borderRadius: `0 ${radius} ${radius} 0`,
        }}
      />
      {/* top edge */}
      <div
        {...handle(false, false, true, false)}
        aria-hidden="true"
        title=""
        style={{
          ...zone,
          top: 0,
          left: band,
          right: band,
          height: band,
          cursor: "ns-resize",
        }}
      />
      {/* bottom edge */}
      <div
        {...handle(false, false, false, true)}
        aria-hidden="true"
        title=""
        style={{
          ...zone,
          bottom: 0,
          left: band,
          right: band,
          height: band,
          cursor: "ns-resize",
        }}
      />
      {/* corners */}
      <div
        {...handle(true, false, true, false)}
        aria-hidden="true"
        title=""
        style={{ ...zone, left: 0, top: 0, width: band, height: band, cursor: "nwse-resize" }}
      />
      <div
        {...handle(false, true, true, false)}
        aria-hidden="true"
        title=""
        style={{ ...zone, right: 0, top: 0, width: band, height: band, cursor: "nesw-resize" }}
      />
      <div
        {...handle(true, false, false, true)}
        aria-hidden="true"
        title=""
        style={{ ...zone, left: 0, bottom: 0, width: band, height: band, cursor: "nesw-resize" }}
      />
      <div
        {...handle(false, true, false, true)}
        aria-hidden="true"
        title=""
        style={{ ...zone, right: 0, bottom: 0, width: band, height: band, cursor: "nwse-resize" }}
      />
    </>
  );
}

export { GlassMaterialContext, useGlassMaterial };
export type { GlassMaterialContextValue };
