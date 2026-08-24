"use client";

import React from "react";
import { GlassSurface, useGlassRuntime, type GlassStrategy } from "@/lib/glass";
import { GlassMaterialProvider } from "@/components/ds/GlassMaterialProvider";
import { DemoStage } from "@/components/site/DemoStage";

const STRATEGIES: GlassStrategy[] = [
  "svg-displacement",
  "webgl-refraction",
  "backdrop-filter",
];

export default function Demo() {
  // the live negotiated tier — exactly one badge is active at a time
  const live = useGlassRuntime((s) => s.strategy);

  return (
    <GlassMaterialProvider level="thick" className="gap-6">
      {/* the surface inherits material="thick" from the provider context */}
      <DemoStage variant="text" height="h-56">
        <GlassSurface shape="capsule" className="h-20 w-72">
          <span className="w-full text-center font-code text-[11px] tracking-[0.1em] text-default-font/80 uppercase">
            thick · inherited
          </span>
        </GlassSurface>
      </DemoStage>

      <div className="flex flex-wrap items-center gap-2">
        {STRATEGIES.map((s) => (
          <GlassMaterialProvider.StrategyBadge
            key={s}
            strategy={s}
            active={s === live}
          />
        ))}
      </div>
    </GlassMaterialProvider>
  );
}

export const demoSource = `<GlassMaterialProvider level="thick" className="gap-6">
  {/* the surface inherits material="thick" from the provider context */}
  <DemoStage variant="text" height="h-56">
    <GlassSurface shape="capsule" className="h-20 w-72">
      <span className="w-full text-center">thick · inherited</span>
    </GlassSurface>
  </DemoStage>

  <div className="flex flex-wrap items-center gap-2">
    <GlassMaterialProvider.StrategyBadge strategy="svg-displacement" active />
    <GlassMaterialProvider.StrategyBadge strategy="webgl-refraction" />
    <GlassMaterialProvider.StrategyBadge strategy="backdrop-filter" />
  </div>
</GlassMaterialProvider>`;
