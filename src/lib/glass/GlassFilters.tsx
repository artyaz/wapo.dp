"use client";

import React from "react";
import { useGlassRuntime } from "./glass-store";

/**
 * Page-level SVG filter host — the Chromium tier's actual physics.
 *
 * Construction verified in re-review round 2:
 *  - root <svg> carries colorInterpolationFilters="sRGB"
 *  - every feImage: preserveAspectRatio="none" (no letterbox transparent-map
 *    risk), stretched to the full filter region
 *  - per filter: feImage → 3× (feColorMatrix channel isolation →
 *    feDisplacementMap) → 2× feBlend mode="screen"
 *  - channel isolation matrices keep an identity row per channel and
 *    preserve alpha; disjoint channels recombined via screen are lossless
 *  - the filter is referenced from a SEPARATE backdrop layer carrying only
 *    the bare url(), so an unresolved reference voids only that layer
 *
 * Displacement scales: R = base × 1.25, G = base × 0.83, B = base × 1.0 —
 * the chromatic aberration ratio preserved across every fork.
 */
export function GlassFilters() {
  const filters = useGlassRuntime((s) => s.filters);
  const entries = Object.entries(filters);
  if (entries.length === 0) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        {entries.map(([key, spec]) => (
          <GlassDisplacementFilterDef key={key} id={spec.id} spec={spec} />
        ))}
      </defs>
    </svg>
  );
}

function GlassDisplacementFilterDef({
  id,
  spec,
}: {
  id: string;
  spec: { mapUrl: string; scaleR: number; scaleG: number; scaleB: number };
}) {
  return (
    <filter
      id={id}
      x="0"
      y="0"
      width="100%"
      height="100%"
      colorInterpolationFilters="sRGB"
    >
      <feImage
        href={spec.mapUrl}
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        result="map"
      />
      {/* Red branch — isolated red channel, strongest displacement */}
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="1 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0"
        result="srcR"
      />
      <feDisplacementMap
        in="srcR"
        in2="map"
        scale={spec.scaleR}
        xChannelSelector="R"
        yChannelSelector="G"
        result="dispR"
      />
      {/* Green branch — weakest displacement */}
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0
                0 1 0 0 0
                0 0 0 0 0
                0 0 0 1 0"
        result="srcG"
      />
      <feDisplacementMap
        in="srcG"
        in2="map"
        scale={spec.scaleG}
        xChannelSelector="R"
        yChannelSelector="G"
        result="dispG"
      />
      {/* Blue branch — reference displacement */}
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 1 0 0
                0 0 0 1 0"
        result="srcB"
      />
      <feDisplacementMap
        in="srcB"
        in2="map"
        scale={spec.scaleB}
        xChannelSelector="R"
        yChannelSelector="G"
        result="dispB"
      />
      {/* Lossless recombination of disjoint channels */}
      <feBlend in="dispR" in2="dispG" mode="screen" result="rg" />
      <feBlend in="rg" in2="dispB" mode="screen" />
    </filter>
  );
}
