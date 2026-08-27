"use client";

import React from "react";
import { useGlassRuntime } from "./glass-store";

/**
 * Page-level SVG filter host — the Chromium tier's actual physics, built
 * EXACTLY like the kube.io liquid-glass-css-svg reference:
 *
 *   https://kube.io/blog/liquid-glass-css-svg/
 *
 *  - root <svg> carries colorInterpolationFilters="sRGB"
 *  - every <feImage> uses ABSOLUTE pixel geometry (x=0 y=0 width=W height=H)
 *    with preserveAspectRatio="none" — the article's warning: "The
 *    backdrop-filter dimensions do not adjust automatically to the element
 *    size, so you need to ensure that your filter images fit the size of
 *    your elements." Percentage-sourced feImage geometry resolved against
 *    the wrong viewport in Chrome and voided the whole tier (the
 *    blur-but-zero-displacement defect).
 *  - the filter region is pinned with filterUnits="userSpaceOnUse" slightly
 *    LARGER than the element's border-box (2px bleed each side): elements
 *    with fractional layout sizes (e.g. 200.4px) round their registered
 *    geometry to integers, and a filter region smaller than the element
 *    leaves an unfiltered strip that reads as a translucent box hugging the
 *    container. The bleed guarantees coverage; the layer's own rounded
 *    bounds clip the output visually.
 *  - a SINGLE <feDisplacementMap> reads SourceGraphic (the backdrop) with
 *    xChannelSelector="R" / yChannelSelector="G" and scale =
 *    maximumDisplacement — the pre-computed physical maximum, which is how
 *    the article re-imposes pixel scale on the normalized 8-bit map.
 *  - the specular rim map rides a second <feImage> and is combined with
 *    feBlend mode="screen" over the refracted result.
 *
 * The old three-branch channel-isolation construction (feColorMatrix →
 * per-channel displacement → screen recombination) is gone — it is not part
 * of the reference implementation and its recombination could void the
 * output on semi-transparent backdrops.
 */
export function GlassFilters() {
  const filters = useGlassRuntime((s) => s.filters);
  const entries = Object.entries(filters);
  if (entries.length === 0) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      colorInterpolationFilters="sRGB"
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
  spec: {
    width: number;
    height: number;
    displacementUrl: string;
    specularUrl: string;
    /** feDisplacementMap scale — the physical maximum displacement in px */
    scale: number;
    /** specular highlight opacity applied inside the filter */
    specularOpacity: number;
    /** material saturation percent, folded in via feColorMatrix */
    saturate: number;
  };
}) {
  const w = Math.max(1, Math.round(spec.width));
  const h = Math.max(1, Math.round(spec.height));
  // 2px bleed around the element box (see header note — fractional layout
  // sizes must never leave an unfiltered strip at the filter's edge).
  const bleed = 2;
  return (
    <filter
      id={id}
      filterUnits="userSpaceOnUse"
      x={-bleed}
      y={-bleed}
      width={w + bleed * 2}
      height={h + bleed * 2}
      colorInterpolationFilters="sRGB"
    >
      {/* the displacement map — sized 1:1 to the element (kube.io) */}
      <feImage
        href={spec.displacementUrl}
        x="0"
        y="0"
        width={w}
        height={h}
        preserveAspectRatio="none"
        result="displacement_map"
      />
      {/* single-pass refraction of the backdrop */}
      <feDisplacementMap
        in="SourceGraphic"
        in2="displacement_map"
        scale={spec.scale}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      {/* material saturation — folded into the filter chain so the
          Chromium tier needs no second backdrop-filter layer */}
      <feColorMatrix
        in="displaced"
        type="saturate"
        values={String(Math.max(0, spec.saturate) / 100)}
        result="saturated"
      />
      {/* specular rim — blended over the refracted backdrop (kube.io) */}
      {spec.specularOpacity > 0 ? (
        <>
          <feImage
            href={spec.specularUrl}
            x="0"
            y="0"
            width={w}
            height={h}
            preserveAspectRatio="none"
            result="specular_map"
          />
          <feComponentTransfer in="specular_map" result="specular_scaled">
            {/* scale the rim brightness (black screens as identity, so the
                flat interior of the map stays a no-op); alpha untouched */}
            <feFuncR type="linear" slope={spec.specularOpacity} />
            <feFuncG type="linear" slope={spec.specularOpacity} />
            <feFuncB type="linear" slope={spec.specularOpacity} />
          </feComponentTransfer>
          <feBlend in="saturated" in2="specular_scaled" mode="screen" />
        </>
      ) : null}
    </filter>
  );
}
