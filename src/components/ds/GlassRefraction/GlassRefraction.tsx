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
import {
  GlassSurface,
  useGlassMaterial,
  useGlassRuntime,
  type GlassStrategy,
  type MaterialLevel,
  type GlassShape,
} from "@/lib/glass";

export interface GlassRefractionRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Accepted for API parity with the Subframe source only — it is ignored.
   * The rendered tier is always the runtime-negotiated strategy
   * (Chromium → svg-displacement, Safari/Firefox → webgl-refraction,
   * otherwise the backdrop-filter base).
   */
  strategy?: GlassStrategy;
  material?: MaterialLevel;
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
        "group/8d1ff3b2 flex min-h-[280px] flex-col items-center justify-center gap-6 px-10 py-10",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-[200px] w-80 flex-none items-center justify-center overflow-hidden rounded-2xl relative">
        {/* warm-gray radials — the demo-stage backdrop under the surface */}
        <div className="flex items-start absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(160,155,145,0.25)_0%,transparent_60%)]" />
        <div className="flex items-start absolute inset-0 bg-[radial-gradient(circle_at_70%_65%,rgba(140,138,130,0.20)_0%,transparent_55%)]" />
        {/* the glass lens — GlassSurface renders the negotiated tier with the
            material ramp, rim, dual sheen and specular shadow */}
        <GlassSurface material={material} shape={shape} className="h-24 w-56">
          {children}
        </GlassSurface>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-caption font-caption text-neutral-500">
          liquid glass surface
        </span>
        <div className="flex items-center">
          <span className="font-code text-[11px] font-[400] leading-[16px] text-neutral-400 tabular-nums">
            {`material ${material}`}
          </span>
          <span className="font-code text-[11px] font-[400] leading-[16px] text-neutral-400 tabular-nums">
            {` · ${strategy}`}
          </span>
        </div>
      </div>
    </div>
  );
});

export const GlassRefraction = GlassRefractionRoot;
