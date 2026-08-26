"use client";

import React from "react";
import { GlassDisplacement } from "@/components/ds/GlassDisplacement";
import { DemoStage } from "@/components/site/DemoStage";

const INTENSITIES = [
  { value: "subtle", label: "Subtle" },
  { value: "medium", label: "Medium" },
  { value: "strong", label: "Strong" },
] as const;

export default function Demo() {
  return (
    <DemoStage variant="text" height="h-64">
      <div className="flex items-center justify-center gap-4">
        {INTENSITIES.map((tier) => (
          <GlassDisplacement
            key={tier.value}
            intensity={tier.value}
            className="h-24 w-36"
          >
            <span className="w-full text-center font-code text-[11px] tracking-[0.1em] text-default-font/80 uppercase">
              {tier.label}
            </span>
          </GlassDisplacement>
        ))}
      </div>
    </DemoStage>
  );
}

export const demoSource = `<DemoStage variant="text" height="h-72">
  <div className="flex items-center justify-center gap-4">
    <GlassDisplacement intensity="subtle" className="h-24 w-36">
      <span className="w-full text-center">Subtle</span>
    </GlassDisplacement>
    <GlassDisplacement intensity="medium" className="h-24 w-36">
      <span className="w-full text-center">Medium</span>
    </GlassDisplacement>
    <GlassDisplacement intensity="strong" className="h-24 w-36">
      <span className="w-full text-center">Strong</span>
    </GlassDisplacement>
  </div>
</DemoStage>`;
