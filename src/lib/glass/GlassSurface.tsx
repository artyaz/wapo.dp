"use client";

import React from "react";
import {
  animate,
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
  useBaseChroma,
  useGlassOverrides,
  GlassMaterialContext,
  type GlassMaterialContextValue,
} from "./glass-store";
import { generateDisplacementMaps } from "./displacement-map";
import {
  createLiquidGlass,
  type LiquidGlassHandle,
  type BackdropSpec,
  type RefractionParams,
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
 * surface and pull — it grows toward the pointer, whatever direction that
 * is (right, left, diagonal, anything between). The far support point stays
 * put, so the deformation is one-sided — never mirrored to the opposite
 * edge, and no dominant axis to flip between. Travel saturates through tanh
 * against an elliptical budget (~1cm or 22% of the pulled axis, scaled per
 * material), so the material has mass and never reaches the cursor.
 * Release springs it back with overshoot (framer bounce, per material —
 * thicker glass wobbles less).
 *
 * The deformation is one matrix — scaleX/scaleY plus a translation that
 * moves the fixed point to the far side — written straight onto the root.
 * Strictly axis-aligned: no shear, because a sheared rectangle reads as a
 * tilt in depth. Layout, DOM geometry and interactive children never move;
 * the content stretches visually with the glass because the whole subtree
 * transforms together. No cursor change; interactive descendants opt out
 * automatically.
 *
 * Base-background chroma: backdrop-filter always samples the page canvas,
 * and the saturate node would multiply its colour (a warm off-white turns
 * the rim yellow), so the chain opens with a feColorMatrix that puts the
 * base colour on its own luma. Surrounding material still colours the
 * glass; the page's own background no longer can.
 *
 * Non-Chromium tiers keep their negotiated fallbacks: WebGL refraction on
 * Safari/Firefox when there is a backdrop image to refract, and as the
 * universal base a PROGRESSIVE frost: three stacked backdrop-filter layers,
 * core blur = rim x 0.1, mid = rim x 0.4, rim = cssBlur (5..14px), the mid
 * and rim bands faded in by radial masks. A single uniform blur reads as a
 * frosted card; the rising gradient reads as the backdrop bending into the
 * edge, which is the closest an engine without displacement can get over
 * live DOM. Saturate applies to the rim band only.
 *
 * The base tier must NOT reuse the ramp's in-filter saturate (4..9): that
 * value is composited through the rim mask inside the displacement chain,
 * and applied to a whole surface it washes the page gold instead of
 * frosting it.
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
  /** backdrop image source for the WebGL tier (auto-discovered when absent) */
  backdrop?: BackdropSpec;
  /**
   * WebGL refraction overrides — thickness, bezel, ior, blur, specular, tint
   * and shadow, the reference implementation's own control set. Defaults come
   * from the material level.
   */
  refraction?: Partial<RefractionParams>;
  /**
   * Universal base-tier overrides. `blur` is the RIM radius of the
   * progressive frost — the core and mid bands derive from it at 0.1x and
   * 0.4x — and `saturate` applies to the rim band only. Defaults to the
   * material level's cssBlur / cssSaturate. This is the only optical knob
   * that bites on EVERY tier's fallback, so it is the one to reach for when
   * the surface is not on Chromium and has no backdrop image.
   */
  frost?: { blur?: number; saturate?: number };
  /**
   * Elastic pull-to-stretch interaction (default true). Grab the surface and
   * drag: it deforms toward the pointer with saturating resistance and
   * springs back on release — purely visual, no layout effects.
   */
  stretchable?: boolean;
  /**
   * Release overshoot on the elastic pull: 0 stops dead, 0.9 is very jelly.
   * Defaults to the material's own mass (thicker glass bounces less).
   */
  bounce?: number;
  as?: "div" | "header" | "nav" | "section" | "aside" | "footer";
  /** React 19 ref prop — merged with the internal root ref */
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * The material configuration a component re-exposes when it wraps a glass
 * surface — everything about the Liquid Glass material that is not layout:
 *
 *   material     thickness level, and with it the whole shipped constant set
 *   intensity    refraction fork (0.55 / 1.0 / 1.6)
 *   refraction   WebGL optics: thickness, bezel, ior, blur, specular, tint,
 *                shadow — the reference implementation's own control set
 *   frost        base-tier blur + saturate, the knob that works on any tier
 *   backdrop     the image the WebGL shader refracts
 *   stretchable  elastic pull on/off
 *   bounce       release overshoot
 *
 * Components extend their props with this and forward the values straight
 * through, so the material stays configurable from the outside without every
 * wrapper inventing its own vocabulary. Shape and radius stay out — those
 * belong to each component's own layout language.
 *
 * Which knobs actually bite depends on the negotiated tier: `refraction` only
 * on WebGL (and only with a backdrop image), `intensity` only on the Chromium
 * displacement tier, `frost` on the universal base.
 */
export type GlassMaterialControls = Pick<
  GlassSurfaceProps,
  | "material"
  | "intensity"
  | "refraction"
  | "frost"
  | "backdrop"
  | "stretchable"
  | "bounce"
>;

/* ------------------------------------------------------------------ */
/* Motion tag lookup — the root carries the stretch matrix directly   */
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
/* Elastic pull — saturating offset + one-sided directional stretch   */
/* ------------------------------------------------------------------ */

/** Interactive descendants that must never start a pull gesture. */
const PULL_EXCLUDES =
  "button, a, input, textarea, select, label, summary, details, " +
  "[role='button'], [role='slider'], [role='tab'], [role='option'], " +
  "[role='checkbox'], [role='switch'], [role='menuitem'], " +
  "[contenteditable=''], [contenteditable='true'], [data-glass-no-stretch]";

/** Pointer travel (px) before the stretch engages — plain clicks stay inert. */
const PULL_ENGAGE_PX = 3;

/**
 * Progressive-blur band masks. `closest-side` makes the gradient an ellipse
 * matching the surface's own proportions, so a wide capsule gets a wide band
 * and a square gets a round one — the band tracks the shape for free.
 */
const FROST_MASK_MID =
  "radial-gradient(closest-side, transparent 55%, black 85%)";
const FROST_MASK_RIM =
  "radial-gradient(closest-side, transparent 78%, black 98%)";

/** Drag-follow spring: the material lags the pointer by its own mass. */
const PULL_FOLLOW = { type: "spring", stiffness: 340, damping: 30 } as const;

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Saturating resistance along the pull: travel asymptotically reaches budget. */
function saturatePull(delta: number, budget: number): number {
  return budget * Math.tanh(delta / budget);
}

/**
 * The pull budget in an arbitrary direction — the radius of the ellipse
 * whose semi-axes are the per-axis budgets. The cap therefore rotates
 * continuously with the pointer instead of switching between two values.
 */
function directionalBudget(
  directionX: number,
  directionY: number,
  budgetX: number,
  budgetY: number
): number {
  const norm = Math.hypot(directionX / budgetX, directionY / budgetY);
  return norm > 1e-6 ? 1 / norm : Math.min(budgetX, budgetY);
}

/**
 * Squash & stretch as a pure axis-aligned 2D scale, anchored on the far
 * side: each axis grows by its own share of the pull, and the support point
 * opposite the pointer stays exactly where it was — so the material reaches
 * toward the cursor only, at any angle, and never mirrors the deformation
 * to the other side.
 *
 * There is deliberately no off-diagonal term. A symmetric stretch about a
 * diagonal axis (R(t)·diag(elongate, squash)·R(-t), the obvious way to
 * write "elongate along the pull, squash across it") turns the rectangle
 * into a parallelogram, and the eye reads a parallelogram as a tilt in
 * depth. scaleX/scaleY plus a translation cannot express that: the surface
 * stays flat in 2D.
 *
 * Dropping the shear also costs the cross-axis squash. Measured over a full
 * rotation of the pull on chip / toolbar / card / square aspect ratios, any
 * cross-contraction weight above zero swings the deformed corner away from
 * the pointer — 24-49 degrees of direction error at weight 0.15, past 80 at
 * 0.25, because on a wide short box the per-dimension strain of a diagonal
 * pull is dominated by the short axis. At zero the corner tracks the pull
 * to within 13 degrees on every shape. Direction fidelity was the ask; the
 * thinning was decoration inherited from the magnifier.
 */
function computeStretchTransform(
  pullX: number,
  pullY: number,
  w: number,
  h: number
): string {
  if (w < 1 || h < 1) return "none";
  const distance = Math.hypot(pullX, pullY);
  if (distance < 0.01) return "none";
  // each axis grows by its own component of the pull, so the pulled corner
  // travels along the pull vector itself
  const scaleX = 1 + Math.abs(pullX) / w;
  const scaleY = 1 + Math.abs(pullY) / h;
  // anchor on the far side: the fixed point sits on the boundary opposite
  // the pointer, scaled by the direction cosines so it is smooth through
  // every angle (at zero pull the transform is the identity regardless)
  const originX = (-pullX / distance) * w * 0.5;
  const originY = (-pullY / distance) * h * 0.5;
  const translateX = originX * (1 - scaleX);
  const translateY = originY * (1 - scaleY);
  return (
    `matrix(${scaleX.toFixed(5)}, 0, 0, ${scaleY.toFixed(5)}, ` +
    `${translateX.toFixed(3)}, ${translateY.toFixed(3)})`
  );
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
  intensity: intensityProp = "medium",
  glass = true,
  webglMode = "edge",
  backdrop,
  refraction: refractionProp,
  frost: frostProp,
  stretchable: stretchableProp = true,
  bounce: bounceProp,
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
  // Live overrides from the docs control panel win over the component's own
  // props; unset fields fall through to props, then to the material level.
  const overrides = useGlassOverrides();
  const material = overrides.material ?? materialProp ?? ctx.level;
  const intensity = overrides.intensity ?? intensityProp;
  const refraction = overrides.refraction ?? refractionProp;
  const frost = overrides.frost ?? frostProp;
  const bounce = overrides.bounce ?? bounceProp;
  const stretchable = overrides.stretchable ?? stretchableProp;

  const strategy = useGlassRuntime((s) => s.strategy);
  const baseChroma = useBaseChroma();

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
  // The WebGL tier owns the whole surface once it has a backdrop image to
  // refract; with no image the CSS material underneath stays visible and
  // carries the blur (there is nothing for the shader to refract).
  const [webglTextured, setWebglTextured] = React.useState(false);
  const webglFull = isWebgl && (webglMode === "full" || webglTextured);

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
  /* Elastic pull — directional stretch on a budget-capped offset        */
  /* ------------------------------------------------------------------ */

  const pullRef = React.useRef<PullState | null>(null);
  const willChangeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [stretching, setStretching] = React.useState(false);

  // Dimensions + the pull-budget ellipse semi-axes, kept in a ref so the
  // motion-value transforms never go stale between renders. Layout geometry
  // is transform-independent, so the stretch can never feed back into it.
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

  // The pull offset itself is the animated quantity: the follow spring
  // carries it while dragging, the release spring bounces it back to zero.
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);

  const stretchTransform = useTransform([pullX, pullY], (values: number[]) =>
    computeStretchTransform(
      values[0],
      values[1],
      dimsRef.current.w,
      dimsRef.current.h
    )
  );

  // framer-motion composes its transform props in a fixed order and cannot
  // express rotate·scale·rotate, so the matrix goes straight onto the node —
  // the same escape hatch the feDisplacementMap scale uses below. No
  // transform prop is passed in `style`, so nothing else writes it.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const write = (value: string) => {
      el.style.transform = value;
    };
    write(stretchTransform.get());
    return stretchTransform.on("change", write);
  }, [stretchTransform]);

  const springBack = React.useCallback(() => {
    const release = {
      type: "spring" as const,
      duration: ramp.settle,
      bounce: Math.max(0, Math.min(0.9, bounce ?? ramp.bounce)),
    };
    animate(pullX, 0, { ...release, velocity: pullX.getVelocity() });
    animate(pullY, 0, { ...release, velocity: pullY.getVelocity() });
  }, [bounce, ramp.bounce, ramp.settle, pullX, pullY]);

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

      // Saturating resistance along the pull direction — the glass has its
      // own stretchability and never reaches the pointer. Direction is kept
      // exactly, so the deformation follows the cursor at any angle.
      const distance = Math.hypot(dx, dy);
      let targetX = 0;
      let targetY = 0;
      if (distance > 1e-4) {
        const { bx, by } = dimsRef.current;
        const directionX = dx / distance;
        const directionY = dy / distance;
        const pulled = saturatePull(
          distance,
          directionalBudget(directionX, directionY, bx, by)
        );
        targetX = directionX * pulled;
        targetY = directionY * pulled;
      }
      animate(pullX, targetX, {
        ...PULL_FOLLOW,
        velocity: pullX.getVelocity(),
      });
      animate(pullY, targetY, {
        ...PULL_FOLLOW,
        velocity: pullY.getVelocity(),
      });
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

      // Elastic snap-back with overshoot: the release spring carries the
      // pull offset through zero and back, so the material wobbles out its
      // momentum instead of stopping dead.
      springBack();
      if (willChangeTimer.current) clearTimeout(willChangeTimer.current);
      willChangeTimer.current = setTimeout(() => {
        el.style.willChange = "";
        willChangeTimer.current = null;
      }, ramp.settle * 1000 + 400);
    },
    [onPointerUp, springBack, ramp.settle]
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
      // A cancelled gesture settles on the same spring — an interrupted
      // pull must not snap the material back in one frame.
      springBack();
      if (willChangeTimer.current) clearTimeout(willChangeTimer.current);
      willChangeTimer.current = setTimeout(() => {
        el.style.willChange = "";
        willChangeTimer.current = null;
      }, ramp.settle * 1000 + 400);
    },
    [onPointerCancel, springBack, ramp.settle]
  );

  React.useEffect(
    () => () => {
      if (willChangeTimer.current) clearTimeout(willChangeTimer.current);
      pullX.stop();
      pullY.stop();
    },
    [pullX, pullY]
  );

  /* ------------ Safari/Firefox tier: bind the WebGL engine ----------- */
  const webglHandle = React.useRef<LiquidGlassHandle | null>(null);
  const refractionRef = React.useRef(refraction);
  refractionRef.current = refraction;
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
        params: refractionRef.current,
        onBackdropReady: (found) => {
          setWebglTextured(found);
          useGlassRuntime.getState().setWebglTexture(found);
        },
      });
      webglHandle.current = handle;
    } catch {
      // WebGL unavailable or shader failed → stay on the base tier.
    }
    return () => {
      handle?.destroy();
      webglHandle.current = null;
      setWebglTextured(false);
    };
  }, [glass, strategy, material, webglMode, backdrop]);

  // Parameter changes retarget the live engine instead of rebuilding it — an
  // inline `refraction={{...}}` object must not recreate the GL context.
  const refractionKey = JSON.stringify(refraction ?? null);
  React.useEffect(() => {
    if (refraction) webglHandle.current?.setParams(refraction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refractionKey]);

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
  // The universal base tier is real frost: blur plus a modest saturate. The
  // ramp's `saturate` (4..9) belongs inside the displacement chain, masked to
  // the rim — as a plain full-surface backdrop-filter it washes the page gold.
  // Progressive blur: the knob is the RIM radius, and the mid/core bands are
  // fixed fractions of it (the 1 / 4 / 10 shape that read as glass rather
  // than as a frosted card). Saturate lands on the rim layer only, so a warm
  // page cannot be washed through the whole surface.
  const frostRim = frost?.blur ?? ramp.cssBlur;
  const frostMid = frostRim * 0.4;
  const frostCore = frostRim * 0.1;
  const frostSaturate = frost?.saturate ?? ramp.cssSaturate;

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
                {/* the base page background contributes luminance but no
                    chroma — otherwise the saturate below multiplies the
                    canvas colour and the rim band goes yellow */}
                {baseChroma ? (
                  <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values={
                      `1 0 0 0 ${baseChroma.or.toFixed(6)} ` +
                      `0 1 0 0 ${baseChroma.og.toFixed(6)} ` +
                      `0 0 1 0 ${baseChroma.ob.toFixed(6)} ` +
                      `0 0 0 1 0`
                    }
                    result="balanced_source"
                  />
                ) : null}
                {/* the only frost — kube.io keeps stdDeviation in 0..1 */}
                <feGaussianBlur
                  in={baseChroma ? "balanced_source" : "SourceGraphic"}
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
          declaration, so the fallback layers stay separate. Progressive
          blur — three stacked backdrop-filter layers, sharp core, blur
          rising toward the rim. The gradient masks fade each layer in, so
          the backdrop reads as bending into the edge instead of sitting
          behind a uniform frosted card. */}
      {!isSvg && !webglFull ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: cssRadius,
              backdropFilter: `blur(${frostCore}px)`,
              WebkitBackdropFilter: `blur(${frostCore}px)`,
              zIndex: 0,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: cssRadius,
              backdropFilter: `blur(${frostMid}px)`,
              WebkitBackdropFilter: `blur(${frostMid}px)`,
              maskImage: FROST_MASK_MID,
              WebkitMaskImage: FROST_MASK_MID,
              zIndex: 0,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: cssRadius,
              backdropFilter: `blur(${frostRim}px) saturate(${frostSaturate})`,
              WebkitBackdropFilter: `blur(${frostRim}px) saturate(${frostSaturate})`,
              maskImage: FROST_MASK_RIM,
              WebkitMaskImage: FROST_MASK_RIM,
              zIndex: 0,
            }}
          />
          {/* tint, hairline and the spring shadow ride on top, unblurred */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white/5 ring-1 ring-black/10 dark:ring-white/10"
            style={{
              borderRadius: cssRadius,
              boxShadow,
              zIndex: 0,
            }}
          />
        </>
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
