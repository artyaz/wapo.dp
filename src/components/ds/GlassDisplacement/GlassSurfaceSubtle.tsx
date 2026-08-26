"use client";

/**
 * GlassSurfaceSubtle — a local fork of the shared GlassSurface runtime with the
 * chromatic aberration multipliers pulled WAY down.
 *
 * Why a fork: the shared runtime computes displacement scales as
 * R = base × 1.25 / G = base × 0.83 (src/lib/glass/engine-detect.ts, spec §4).
 * On the warm-gray Praxis palette that ratio reads as neon green/cyan/magenta
 * rim fringing — a palette violation for a monochrome doctrine that only wants
 * a barely-there rim tint. The shared lib is off-limits to component rounds,
 * so the glass primitives re-implement the tier negotiation here with subtle
 * multipliers (R × 1.08 / G × 0.94). Everything else — tier negotiation, base
 * material, rim, dual sheen, specular shadow — is identical semantics.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import {
  MATERIAL_RAMP,
  SHAPE_RADIUS,
  INTENSITY_BASE_SCALE,
  type MaterialLevel,
  type GlassShape,
  type RefractionIntensity,
} from "@/lib/glass";
import {
  useGlassRuntime,
  GlassMaterialContext,
  hashKey,
} from "@/lib/glass/glass-store";
import {
  generateDisplacementMap,
  displacementMapKey,
} from "@/lib/glass/displacement-map";
import {
  createLiquidGlass,
  type LiquidGlassHandle,
  type BackdropSpec,
} from "@/lib/glass";

/**
 * SUBTLE chromatic aberration multipliers (local override of the shared
 * CHROMATIC = { r: 1.25, g: 0.83, b: 1.0 }). Doctrine: monochrome neutrals —
 * the aberration must stay a barely-there rim tint, never neon. Empirically,
 * even a ±8% channel spread produces saturated green/cyan rims where the
 * displaced channels land on different sides of high-contrast specimen text,
 * so the multipliers are pulled to ±2% — the per-channel scales round equal
 * at every realistic base and the rim tint comes from the canonical white
 * rim + dual sheen instead.
 */
const CHROMATIC_SUBTLE = { r: 1.02, g: 0.98, b: 1.0 } as const;

export interface GlassSurfaceSubtleProps
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
  as?: "div" | "header" | "nav" | "section" | "aside" | "footer";
}

export function GlassSurfaceSubtle({
  children,
  material: materialProp,
  shape = "capsule",
  radius: radiusProp,
  intensity = "medium",
  glass = true,
  webglMode = "edge",
  backdrop,
  as = "div",
  className,
  style,
  ...otherProps
}: GlassSurfaceSubtleProps) {
  const ctx = React.useContext(GlassMaterialContext);
  const material = materialProp ?? ctx.level;

  const strategy = useGlassRuntime((s) => s.strategy);
  const registerFilter = useGlassRuntime((s) => s.registerFilter);
  const unregisterFilter = useGlassRuntime((s) => s.unregisterFilter);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const [filterId, setFilterId] = React.useState<string | null>(null);
  const webglHandle = React.useRef<LiquidGlassHandle | null>(null);

  const shapeRadius =
    shape === "free" ? (radiusProp ?? 0) : (SHAPE_RADIUS[shape] ?? 0);
  const cssRadius = shape === "capsule" ? "9999px" : `${shapeRadius}px`;
  const ramp = MATERIAL_RAMP[material];

  const activeStrategy = glass ? strategy : "backdrop-filter";
  const isSvg = activeStrategy === "svg-displacement" && filterId !== null;
  const isWebgl = activeStrategy === "webgl-refraction";

  /* ---------------- Chromium tier: register a per-geometry filter -------- */
  React.useEffect(() => {
    if (!glass || strategy !== "svg-displacement") return;
    const el = rootRef.current;
    if (!el) return;

    let key: string | null = null;
    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 8 || h < 8) return;

      const r =
        shape === "capsule"
          ? Math.min(w, h) / 2
          : shapeRadius;
      const base =
        INTENSITY_BASE_SCALE[intensity] * (ramp.displacement / 12) ||
        INTENSITY_BASE_SCALE[intensity];
      const scaleB = Math.round(base);
      const scaleR = Math.round(base * CHROMATIC_SUBTLE.r);
      const scaleG = Math.round(base * CHROMATIC_SUBTLE.g);

      const geoKey = `subtle-${displacementMapKey({
        width: w,
        height: h,
        radius: r,
      })}-s${scaleR}-${scaleG}-${scaleB}`;

      const mapUrl = generateDisplacementMap({ width: w, height: h, radius: r });
      if (!mapUrl) return;

      const id = `glass-dsp-${hashKey(geoKey)}`;
      registerFilter(geoKey, {
        id,
        mapUrl,
        scaleR,
        scaleG,
        scaleB,
      });
      setFilterId(id);
      key = geoKey;
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (key) unregisterFilter(key);
    };
  }, [
    glass,
    strategy,
    shape,
    shapeRadius,
    intensity,
    material,
    registerFilter,
    unregisterFilter,
    ramp.displacement,
  ]);

  /* ---------------- Safari/Firefox tier: bind the WebGL engine ----------- */
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

  const Tag = as as React.ElementType;

  /* Layer style builders --------------------------------------------- */
  const baseLayerStyle: React.CSSProperties =
    activeStrategy === "backdrop-filter" || !glass
      ? {
          backdropFilter: `blur(${ramp.blur}px) saturate(${Math.round(
            ramp.saturate * 100
          )}%)`,
          WebkitBackdropFilter: `blur(${ramp.blur}px) saturate(${Math.round(
            ramp.saturate * 100
          )}%)`,
        }
      : isSvg
      ? {
          // Low base blur under the displacement tier.
          backdropFilter: `blur(3px)`,
          WebkitBackdropFilter: `blur(3px)`,
        }
      : isWebgl && webglMode === "full"
      ? {
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          backgroundColor: "transparent",
        }
      : {
          backdropFilter: `blur(${ramp.blur}px) saturate(${Math.round(
            ramp.saturate * 100
          )}%)`,
          WebkitBackdropFilter: `blur(${ramp.blur}px) saturate(${Math.round(
            ramp.saturate * 100
          )}%)`,
        };

  const showCssSheen = !(isWebgl && webglMode === "full");

  return (
    <Tag
      ref={rootRef}
      data-glass-surface={activeStrategy}
      data-glass-aberration="subtle"
      className={twClassNames(
        "relative isolate overflow-hidden praxis-glass-tint",
        className
      )}
      style={{
        borderRadius: cssRadius,
        backgroundColor:
          isWebgl && webglMode === "full"
            ? "transparent"
            : `color-mix(in srgb, var(--ds-color-panel) ${ramp.tint}%, transparent)`,
        boxShadow: "var(--ds-shadow-glass-specular)",
        ...style,
      }}
      {...otherProps}
    >
      {/* base material layer (blur + saturate) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={baseLayerStyle}
      />

      {/* Chromium tier: bare url() on its own layer so a failure voids only
          itself */}
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
      {showCssSheen ? (
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
    </Tag>
  );
}
