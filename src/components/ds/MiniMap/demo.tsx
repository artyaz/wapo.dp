"use client";

/**
 * Demo — a wireframe document beside the MiniMap that maps it. The block
 * percentages are shared between the two, so the ViewportFrame reads as the
 * highlighted region of the document. All geometry is a fixed array — no
 * randomness, no clocks.
 */

import React from "react";
import { MiniMap } from "@/components/ds/MiniMap";

/** Footprint of each document element, as percentages — mirrored 1:1 in the map. */
const DOC_LAYOUT: Array<{
  left: string;
  top: string;
  width: string;
  height: string;
}> = [
  { left: "8%", top: "6%", width: "56%", height: "5%" }, // heading
  { left: "8%", top: "16%", width: "84%", height: "3%" }, // paragraph lines
  { left: "8%", top: "22%", width: "84%", height: "3%" },
  { left: "8%", top: "29%", width: "84%", height: "3%" },
  { left: "8%", top: "35%", width: "84%", height: "3%" },
  { left: "8%", top: "42%", width: "84%", height: "3%" },
  { left: "8%", top: "51%", width: "84%", height: "22%" }, // figure
  { left: "8%", top: "78%", width: "84%", height: "3%" }, // closing lines
  { left: "8%", top: "84%", width: "84%", height: "3%" },
  { left: "8%", top: "90%", width: "52%", height: "3%" },
];

/** The region of the document currently in view. */
const VIEWPORT = { left: "36%", top: "33%", width: "56%", height: "40%" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-[520px] flex-wrap items-center justify-center gap-x-7 gap-y-4">
      {/* The mapped surface: a quiet wireframe document */}
      <div className="flex flex-col gap-2">
        <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
          report-draft.md
        </span>
        <div className="relative h-[220px] w-[260px] overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
          {DOC_LAYOUT.map((region, i) => (
            <div
              key={i}
              className="absolute rounded-[2px] bg-default-font/[0.07]"
              style={region}
            />
          ))}
          <div
            className="absolute rounded-[3px] border-2 border-solid border-default-font"
            style={VIEWPORT}
          />
        </div>
      </div>

      {/* The map: same geometry, scaled down and set in glass */}
      <MiniMap showGrid>
        {DOC_LAYOUT.map((region, i) => (
          <MiniMap.ContentBlock key={i} style={region} />
        ))}
        <MiniMap.ViewportFrame style={VIEWPORT} />
      </MiniMap>
    </div>
  );
}

export const demoSource = `<MiniMap showGrid>
  <MiniMap.ContentBlock style={{ left: "8%", top: "6%", width: "56%", height: "5%" }} />
  <MiniMap.ContentBlock style={{ left: "8%", top: "16%", width: "84%", height: "3%" }} />
  {/* …more ContentBlocks mirroring the document's layout… */}
  <MiniMap.ViewportFrame style={{ left: "36%", top: "33%", width: "56%", height: "40%" }} />
</MiniMap>`;
