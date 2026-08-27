"use client";

/**
 * GlassRefraction — material specimen rebuilt on the GlassSurface runtime.
 * Keeps the source's demo-stage presentation (the h-[200px] w-80 box with two
 * warm-gray radials under the surface, caption block below), but the rendered
 * implementation tier now ALWAYS comes from the runtime negotiation — the
 * `strategy` prop is accepted purely for API parity with the Subframe source.
 * The caption reads the LIVE material level and negotiated strategy.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { GlassSurfaceSubtle } from "@/components/ds/GlassDisplacement/GlassSurfaceSubtle";
import {
  useGlassMaterial,
  useGlassRuntime,
  type GlassStrategy,
  type GlassShape,
  type GlassMaterialControls,
} from "@/lib/glass";

export interface GlassRefractionRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlassMaterialControls {
  /**
   * Accepted for API parity with the Subframe source only — it is ignored.
   * The rendered tier is always the runtime-negotiated strategy
   * (Chromium → svg-displacement, Safari/Firefox → webgl-refraction,
   * otherwise the backdrop-filter base).
   */
  strategy?: GlassStrategy;
  shape?: GlassShape;
  children?: React.ReactNode;
  className?: string;
}

const GlassRefractionRoot = React.forwardRef<
  HTMLDivElement,
  GlassRefractionRootProps
>(function GlassRefractionRoot(
  {
    strategy: _strategy,
    material: materialProp,
    shape = "capsule",
    intensity,
    stretchable,
    bounce,
    refraction,
    frost,
    finish,
    backdrop,
    children,
    className,
    ...otherProps
  }: GlassRefractionRootProps,
  ref
) {
  // Live values: the level resolves through the provider chain (default
  // "regular"), the strategy is the negotiated runtime tier.
  const ctx = useGlassMaterial();
  const material = materialProp ?? ctx.level;
  const strategy = useGlassRuntime((s) => s.strategy);

  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/8d1ff3b2 flex flex-col items-center justify-center gap-3 px-4 py-4 max-sm:gap-1.5 max-sm:px-1 max-sm:py-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {/* lens: 120px on wide stages, 84px below sm so a 2×2 grid fits the
          fixed specimen stage height without clipping (mobile: was a Subframe
          breakpoint that Tailwind never compiled) */}
      <div className="flex h-[120px] w-36 flex-none items-center justify-center overflow-hidden rounded-2xl relative max-sm:h-[64px] max-sm:w-28">
        {/* warm-gray radials — the demo-stage backdrop under the surface */}
        <div className="flex items-start absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(160,155,145,0.25)_0%,transparent_60%)]" />
        <div className="flex items-start absolute inset-0 bg-[radial-gradient(circle_at_70%_65%,rgba(140,138,130,0.20)_0%,transparent_55%)]" />
        {/* the glass lens — the subtle-aberration surface renders the negotiated
            tier with the material ramp, rim, dual sheen and specular shadow */}
        <GlassSurfaceSubtle
          material={material}
          shape={shape}
          intensity={intensity}
          stretchable={stretchable}
          bounce={bounce}
          refraction={refraction}
          frost={frost}
          finish={finish}
          backdrop={backdrop}
          className="h-12 w-[85%] max-sm:h-7 max-sm:w-[80%]"
        >
          {children}
        </GlassSurfaceSubtle>
      </div>
      {/* caption — semantic muted tokens: the neutral scale inverts in dark
          theme, so hardcoded neutral-400/500 went near-illegible on dark
          surfaces (muted-foreground resolves to a readable gray in both) */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-caption font-caption text-muted-foreground">
          liquid glass surface
        </span>
        <div className="flex flex-wrap items-center justify-center">
          <span className="font-code text-[11px] font-[400] leading-[16px] text-muted-foreground tabular-nums">
            {`material ${material}`}
          </span>
          <span className="font-code text-[11px] font-[400] leading-[16px] text-muted-foreground tabular-nums">
            {` · ${strategy}`}
          </span>
        </div>
      </div>
    </div>
  );
});

export const GlassRefraction = GlassRefractionRoot;
