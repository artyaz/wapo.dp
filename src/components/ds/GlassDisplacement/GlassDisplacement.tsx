"use client";

/**
 * GlassDisplacement — the Chromium-tier liquid glass surface, rebuilt on the
 * GlassSurface runtime. On Chromium engines the negotiated svg-displacement
 * strategy bends the backdrop edge through an feDisplacementMap filter whose
 * map is generated at runtime for this element's exact size and radius
 * (chromatic aberration via per-channel scales — kept SUBTLE per the
 * monochrome doctrine through the local GlassSurfaceSubtle fork); every other
 * engine renders the same universal base material. Swap implementation, never
 * semantics.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { GlassSurfaceSubtle } from "@/components/ds/GlassDisplacement/GlassSurfaceSubtle";
import type { GlassMaterialControls } from "@/lib/glass";

export interface GlassDisplacementRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlassMaterialControls {
  radius?: "sm" | "md" | "lg" | "pill";
  children?: React.ReactNode;
  className?: string;
}

/** radius prop → Tailwind class on the outer sizing shell */
const RADIUS_CLASS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  pill: "rounded-[9999px]",
} as const;

/** radius prop → px value handed to GlassSurface (shape="free") */
const RADIUS_PX = {
  sm: 3,
  md: 3,
  lg: 8,
  pill: 9999,
} as const;

const GlassDisplacementRoot = React.forwardRef<
  HTMLDivElement,
  GlassDisplacementRootProps
>(function GlassDisplacementRoot(
  {
    radius = "lg",
    intensity = "medium",
    material = "regular",
    stretchable,
    bounce,
    children,
    className,
    ...otherProps
  }: GlassDisplacementRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/d49325d3 flex flex-col items-start overflow-hidden rounded-lg isolate relative",
        {
          "rounded-[9999px]": radius === "pill",
          "rounded-md": radius === "md",
          "rounded-sm": radius === "sm",
        },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {/* GlassSurfaceSubtle owns every tier: Chromium SVG displacement via the
          runtime-registered per-geometry filters (with the subtle aberration
          multipliers), WebGL refraction on Safari/Firefox, and the
          backdrop-filter base everywhere else. */}
      <GlassSurfaceSubtle
        material={material}
        shape="free"
        radius={RADIUS_PX[radius]}
        intensity={intensity}
        stretchable={stretchable}
        bounce={bounce}
        className="h-full w-full"
      >
        {children}
      </GlassSurfaceSubtle>
    </div>
  );
});

export const GlassDisplacement = GlassDisplacementRoot;
