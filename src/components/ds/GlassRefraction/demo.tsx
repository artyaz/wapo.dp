"use client";

import React from "react";
import { GlassRefraction } from "@/components/ds/GlassRefraction";
import type { MaterialLevel } from "@/lib/glass";

const MATERIALS: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-3 lg:grid-cols-4">
      {MATERIALS.map((material) => (
        <GlassRefraction key={material} material={material}>
          <span className="w-full text-center font-code text-[11px] tracking-[0.1em] text-default-font/80 uppercase">
            {material}
          </span>
        </GlassRefraction>
      ))}
    </div>
  );
}

export const demoSource = `<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
  <GlassRefraction material="ultrathin" />
  <GlassRefraction material="thin" />
  <GlassRefraction material="regular" />
  <GlassRefraction material="thick" />
</div>`;
