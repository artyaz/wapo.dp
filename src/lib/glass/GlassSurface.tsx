"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { twClassNames } from "@/lib/subframe/utils";
import {
  MATERIAL_RAMP,
  SHAPE_RADIUS,
  INTENSITY_BASE_SCALE,
  STRETCH_BUDGET,
  type MaterialLevel,
  type GlassShape,
  type RefractionIntensity,
} from "./engine-detect";
import {
  useGlassRuntime,
  useGlassMaterial,
  GlassMaterialContext,
  type GlassMaterialContextValue,
} from "./glass-store";
import { generateDisplacementMaps } from "./displacement-map";
import {
  createLiquidGlass,
  type LiquidGlassHandle,
  type BackdropSpec,
} from "./webgl-refraction";

/**
 * GlassSurface — the universal liquid-glass primitive, an exact port of
 * the kube.io reference implementation:
 *
 *   https://kube.io/blog/liquid-glass-css-svg/
 *
 * Chromium tier (the reference construction, verbatim):
 *
 *   <svg style="display:none" color-interpolation-filters="sRGB">
 *     <filter id>
 *       feGaussianBlur(SourceGraphic, stdDeviation 0..1)      the only frost
 *       feImage(displacement map, element-sized)
 *       feDisplacementMap(scale = maxDisplacement × scaleRatio)  the lens
 *       feColorMatrix(saturate 4..9)
 *       feImage(specular map, element-sized)
 *       feComposite(operator="in") · feComponentTransfer(feFuncA slope)
 *       feBlend × 2                                            the rim
 *
 *  ...applied as backdrop-filter: url(#id) on a single glass layer that
 *  also carries the white tint, the spring-animated shadow and the
 *  ring-1 hairline — exactly the magnifying-glass markup.
 *
 * Motion rig (the MagnifyingGlass component's springs, decoded verbatim):
 *   scaleRatio   spring {250, 14} — rest refractionLevel × 0.8,
 *                held refractionLevel × 1.0 (so a grabbed regular surface
 *                lenses at 98.247 px → 122.809 px, ×1.25 exactly)
 *   shadow       springs {340, 30} / alphas {220, 24} —
 *                rest (0, 4, 9, .16, .20) → held (4, 16, 24, .22, .27)
 *
 * Stretch (the ONE adaptation, built from the magnifier's math): hold the
 * surface and pull — it deforms with saturating resistance along the
 * dominant axis (one axis elongates, the other squashes, floor 0.7,
 * area-preserving like scaleX = base + (1 − scaleY)), capped at ~1cm or
 * 22% of the axis, then springs back on the same {340, 30} springs with
 * an underdamped jelly settle. Pure scaleX/scaleY on the root: layout,
 * DOM geometry and interactive children never move; the content stretches
 * visually with the glass because the whole subtree transforms together.
 * No cursor change; interactive descendants opt out automatically.
 *
 * Non-Chromium tiers keep their negotiated fallbacks (WebGL refraction on
 * Safari/Firefox, saturate + tint + hairline as the universal base).
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
/* Motion tag lookup — the root carries scaleX/scaleY directly        */
/* ------------------------------------------------------------------ */

const MOTION_TAGS = {
  div: motion.div,
  header: motion.header,
  nav: motion.nav,
  section: motion.section,
  aside: motion.aside,
  footer: motion.footer,
} as const;

/* ------------------------------------------------------------------ */
/* Elastic pull — saturating offset + dominant-axis squash & stretch  */
/* ------------------------------------------------------------------ */

/** Interactive descendants that must never start a pull gesture. */
const PULL_EXCLUDES =
  "button, a, input, textarea, select, label, summary, details, " +
  "[role='button'], [role='slider'], [role='tab'], [role='option'], " +
  "[role='checkbox'], [role='switch'], [role='menuitem'], " +
  "[contenteditable=''], [contenteditable='true'], [data-glass-no-stretch]";

/** Pointer travel (px) before the stretch engages — plain clicks stay inert. */
const PULL_ENGAGE_PX = 3;

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Per-axis saturating resistance: offset asymptotically reaches budget. */
function saturatePull(delta: number, budget: number): number {
  return budget * Math.tanh(delta / budget);
}

/**
 * The magnifier's squash & stretch, driven by the pull offset instead of
 * drag velocity: the dominant axis (larger normalized pull) elongates
 * while the cross axis squashes — area-preserving, squash floored at
 * kube's 0.7 — pure 2D scale, never a rotation or translation.
 */
function computeStretchScales(
  pullX: number,
  pullY: number,
  w: number,
  h: number
): { scaleX: number; scaleY: number } {
  if (w < 1 || h < 1) return { scaleX: 1, scaleY: 1 };
  const qx = Math.abs(pullX) / w;
  const qy = Math.abs(pullY) / h;
  const dominant = Math.max(qx, qy);
  const elongate = 1 + dominant;
  const squash = Math.max(0.7, 1 - dominant);
  return qx >= qy
    ? { scaleX: elongate, scaleY: squash }
    : { scaleX: squash, scaleY: elongate };
}

interface PullState {
  pointerId: number;
  startX: number;
  startY: number;
  engaged: boolean;
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

  const shapeRadius =
    shape === "free" ? (radiusProp ?? 0) : (SHAPE_RADIUS[shape] ?? 0);
  const cssRadius = shape === "capsule" ? "9999px" : `${shapeRadius}px`;
  const ramp = MATERIAL_RAMP[material];

  const activeStrategy = glass ? strategy : "backdrop-filter";
  const isSvg = activeStrategy === "svg-displacement";
  const isWebgl = activeStrategy === "webgl-refraction";
  const webglFull = isWebgl && webglMode === "full";

  /* ------------ measured geometry + generated maps ------------------ */
  const [geo, setGeo] = React.useState<{ w: number; h: number } | null>(null);
  const [maps, setMaps] = React.useState<{
    width: number;
    height: number;
    displacementUrl: string;
    specularUrl: string;
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

  React.useEffect(() => {
    if (!glass || !geo) return;
    const { w, h } = geo;
    const r = shape === "capsule" ? Math.min(w, h) / 2 : shapeRadius;
    const generated = generateDisplacementMaps({
      width: w,
      height: h,
      radius: r,
      bezel: ramp.bezel,
      material,
    });
    if (!generated) return;
    setMaps({
      width: w,
      height: h,
      displacementUrl: generated.displacementUrl,
      specularUrl: generated.specularUrl,
    });
  }, [glass, geo, shape, shapeRadius, material, ramp.bezel]);

  /* ------------ per-instance filter id ------------------------------ */
  const reactId = React.useId();
  const filterId = `glass-fx-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

  /* ------------------------------------------------------------------ */
  /* kube.io motion rig — scaleRatio + shadow springs, verbatim          */
  /* ------------------------------------------------------------------ */

  const [held, setHeld] = React.useState(false);

  // scaleRatio spring {250, 14}: rest = level × intensity × 0.8, held × 1.0.
  const ratioTarget = useMotionValue(
    ramp.refraction * INTENSITY_BASE_SCALE[intensity] * 0.8
  );
  const scaleRatio = useSpring(ratioTarget, { stiffness: 250, damping: 14 });
  // feDisplacementMap scale = maxDisplacement × scaleRatio (derived).
  const filterScale = useTransform(
    scaleRatio,
    (v) => ramp.maxDisplacement * v
  );

  React.useEffect(() => {
    ratioTarget.set(
      ramp.refraction *
        INTENSITY_BASE_SCALE[intensity] *
        (held ? 1 : 0.8)
    );
  }, [ratioTarget, ramp.refraction, intensity, held]);

  // Shadow springs — magnifier values: rest (0, 4, 9, .16, .20) →
  // held (4, 16, 24, .22, .27); geometry {340, 30}, alphas {220, 24}.
  const shadowXTarget = useMotionValue(0);
  const shadowYTarget = useMotionValue(4);
  const shadowBlurTarget = useMotionValue(9);
  const shadowAlphaTarget = useMotionValue(0.16);
  const insetAlphaTarget = useMotionValue(0.2);
  const shadowX = useSpring(shadowXTarget, { stiffness: 340, damping: 30 });
  const shadowY = useSpring(shadowYTarget, { stiffness: 340, damping: 30 });
  const shadowBlur = useSpring(shadowBlurTarget, { stiffness: 340, damping: 30 });
  const shadowAlpha = useSpring(shadowAlphaTarget, { stiffness: 220, damping: 24 });
  const insetAlpha = useSpring(insetAlphaTarget, { stiffness: 220, damping: 24 });

  React.useEffect(() => {
    shadowXTarget.set(held ? 4 : 0);
    shadowYTarget.set(held ? 16 : 4);
    shadowBlurTarget.set(held ? 24 : 9);
    shadowAlphaTarget.set(held ? 0.22 : 0.16);
    insetAlphaTarget.set(held ? 0.27 : 0.2);
  }, [
    held,
    shadowXTarget,
    shadowYTarget,
    shadowBlurTarget,
    shadowAlphaTarget,
    insetAlphaTarget,
  ]);

  const boxShadow = useTransform(
    [shadowX, shadowY, shadowBlur, shadowAlpha, insetAlpha],
    (values: number[]) => {
      const [x, y, blur, alpha, inset] = values;
      return (
        `${x}px ${y}px ${blur}px rgba(0,0,0,${alpha}), ` +
        `inset ${x / 2}px ${y / 2}px 24px rgba(0,0,0,${inset}), ` +
        `inset ${-x / 2}px ${-y / 2}px 24px rgba(255,255,255,${inset})`
      );
    }
  );

  /* ------------------------------------------------------------------ */
  /* Elastic pull — the magnifier's springs on a budget-capped offset    */
  /* ------------------------------------------------------------------ */

  const pullRef = React.useRef<PullState | null>(null);
  const willChangeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [stretching, setStretching] = React.useState(false);

  // Dimensions + per-axis budgets, kept in a ref so the motion-value
  // transforms never go stale between renders.
  const dimsRef = React.useRef({ w: 0, h: 0, bx: 1, by: 1 });
  React.useEffect(() => {
    if (!geo) return;
    const stretch = ramp.stretch;
    dimsRef.current = {
      w: geo.w,
      h: geo.h,
      bx:
        Math.max(1, Math.min(STRETCH_BUDGET.cmPx, STRETCH_BUDGET.fraction * geo.w)) *
        stretch,
      by:
        Math.max(1, Math.min(STRETCH_BUDGET.cmPx, STRETCH_BUDGET.fraction * geo.h)) *
        stretch,
    };
  }, [geo, ramp.stretch]);

  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const pullXS = useSpring(pullX, { stiffness: 340, damping: 30 });
  const pullYS = useSpring(pullY, { stiffness: 340, damping: 30 });

  const scaleX = useTransform(
    [pullXS, pullYS],
    (values: number[]) =>
      computeStretchScales(values[0], values[1], dimsRef.current.w, dimsRef.current.h)
        .scaleX
  );
  const scaleY = useTransform(
    [pullXS, pullYS],
    (values: number[]) =>
      computeStretchScales(values[0], values[1], dimsRef.current.w, dimsRef.current.h)
        .scaleY
  );

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(e);
      if (e.defaultPrevented) return;
      if (!stretchable || e.button !== 0) return;
      if (pullRef.current) return; // one gesture at a time (multi-touch)
      if (reducedMotion()) return;
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

      if (willChangeTimer.current) {
        clearTimeout(willChangeTimer.current);
        willChangeTimer.current = null;
      }

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
        engaged: false,
      };
      setStretching(true);
      setHeld(true); // the glass wakes: refraction 0.8 → 1.0, shadow grows
    },
    [stretchable, onPointerDown]
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e);
      const p = pullRef.current;
      if (!p || e.pointerId !== p.pointerId) return;

      const dx = e.clientX - p.startX;
      const dy = e.clientY - p.startY;
      if (!p.engaged) {
        if (Math.hypot(dx, dy) < PULL_ENGAGE_PX) return;
        p.engaged = true;
      }

      // Saturating resistance per axis — the glass has its own
      // stretchability and never reaches the pointer.
      const { bx, by } = dimsRef.current;
      pullX.set(saturatePull(dx, bx));
      pullY.set(saturatePull(dy, by));
    },
    [onPointerMove, pullX, pullY]
  );

  const endPull = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(e);
      const p = pullRef.current;
      const el = rootRef.current;
      if (!p || !el || e.pointerId !== p.pointerId) return;

      pullRef.current = null;
      setStretching(false);
      setHeld(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
      el.style.touchAction = "";

      // Elastic snap-back: the {340, 30} springs return the pull offset to
      // zero — the underdamped jelly settle comes free.
      pullX.set(0);
      pullY.set(0);
      if (willChangeTimer.current) clearTimeout(willChangeTimer.current);
      willChangeTimer.current = setTimeout(() => {
        el.style.willChange = "";
        willChangeTimer.current = null;
      }, 450);
    },
    [onPointerUp, pullX, pullY]
  );

  const handlePointerCancel = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerCancel?.(e);
      const p = pullRef.current;
      const el = rootRef.current;
      if (!p || !el || e.pointerId !== p.pointerId) return;

      pullRef.current = null;
      setStretching(false);
      setHeld(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
      el.style.touchAction = "";
      el.style.willChange = "";
      if (willChangeTimer.current) {
        clearTimeout(willChangeTimer.current);
        willChangeTimer.current = null;
      }
      pullX.set(0);
      pullY.set(0);
    },
    [onPointerCancel, pullX, pullY]
  );

  React.useEffect(
    () => () => {
      if (willChangeTimer.current) clearTimeout(willChangeTimer.current);
    },
    []
  );

  /* ------------ Safari/Firefox tier: bind the WebGL engine ----------- */
  const webglHandle = React.useRef<LiquidGlassHandle | null>(null);
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

  /* ------------ animated feDisplacementMap scale --------------------- */
  // framer-motion treats a `scale` prop as a transform, so the attribute is
  // written through a subscription instead (identical result to kube's
  // motion value — the spring emits per-frame values).
  const dispMapRef = React.useRef<SVGFEDisplacementMapElement | null>(null);
  React.useEffect(() => {
    const el = dispMapRef.current;
    if (!el || !isSvg || !maps) return;
    const write = (v: number) => el.setAttribute("scale", String(v));
    write(filterScale.get());
    return filterScale.on("change", write);
  }, [filterScale, isSvg, maps]);

  const restingScale =
    ramp.maxDisplacement *
    ramp.refraction *
    INTENSITY_BASE_SCALE[intensity] *
    0.8;

  const MotionTag = MOTION_TAGS[as] as React.ElementType;
  const saturateValue = ramp.saturate;

  return (
    <MotionTag
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
        ...style,
        scaleX,
        scaleY,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPull}
      onPointerCancel={handlePointerCancel}
      {...otherProps}
    >
      {/* Chromium tier — the kube.io filter, inline per surface exactly
          like the shipped components (one <svg> per glass element). */}
      {isSvg && maps ? (
        <>
          <svg
            aria-hidden="true"
            focusable="false"
            colorInterpolationFilters="sRGB"
            style={{ display: "none" }}
          >
            <defs>
              <filter id={filterId}>
                {/* the only frost — kube.io keeps stdDeviation in 0..1 */}
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation={ramp.blur}
                  result="blurred_source"
                />
                <feImage
                  href={maps.displacementUrl}
                  x={0}
                  y={0}
                  width={maps.width}
                  height={maps.height}
                  result="displacement_map"
                  preserveAspectRatio="none"
                />
                <feDisplacementMap
                  ref={dispMapRef}
                  in="blurred_source"
                  in2="displacement_map"
                  scale={restingScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />
                {/* saturate the refracted content */}
                <feColorMatrix
                  in="displaced"
                  type="saturate"
                  values={String(saturateValue)}
                  result="displaced_saturated"
                />
                {/* specular rim — exact Yr construction */}
                <feImage
                  href={maps.specularUrl}
                  x={0}
                  y={0}
                  width={maps.width}
                  height={maps.height}
                  result="specular_layer"
                  preserveAspectRatio="none"
                />
                <feComposite
                  in="displaced_saturated"
                  in2="specular_layer"
                  operator="in"
                  result="specular_saturated"
                />
                <feComponentTransfer
                  in="specular_layer"
                  result="specular_faded"
                >
                  <feFuncA
                    type="linear"
                    slope={ramp.specularOpacity}
                  />
                </feComponentTransfer>
                <feBlend
                  in="specular_saturated"
                  in2="displaced"
                  mode="normal"
                  result="withSaturation"
                />
                <feBlend
                  in="specular_faded"
                  in2="withSaturation"
                  mode="normal"
                />
              </filter>
            </defs>
          </svg>

          {/* the glass layer — backdrop-filter + tint + spring shadow +
              hairline, the magnifying-glass markup verbatim */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white/5 ring-1 ring-black/10 dark:ring-white/10"
            style={{
              borderRadius: cssRadius,
              backdropFilter: `url(#${filterId})`,
              WebkitBackdropFilter: `url(#${filterId})`,
              boxShadow,
              zIndex: 0,
            }}
          />
        </>
      ) : null}

      {/* Non-Chromium tiers: the url() form would void the whole
          declaration, so the fallback layers stay separate. */}
      {!isSvg && !webglFull ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/5 ring-1 ring-black/10 dark:ring-white/10"
          style={{
            borderRadius: cssRadius,
            backdropFilter: `saturate(${saturateValue})`,
            WebkitBackdropFilter: `saturate(${saturateValue})`,
            boxShadow,
            zIndex: 0,
          }}
        />
      ) : null}

      {/* Content sits above every layer, crisp. It stretches visually
          with the glass because the whole subtree transforms together —
          layout and DOM geometry never move. */}
      {children ? (
        <div className="relative z-10 flex w-full items-center">{children}</div>
      ) : null}
    </MotionTag>
  );
}

export { GlassMaterialContext, useGlassMaterial };
export type { GlassMaterialContextValue };
