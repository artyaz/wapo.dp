"use client";

/**
 * MaterialTeaserSection — the "Liquid glass" section of the overview.
 *
 * Three substantive paragraphs (the material ramp, refractive vs cast
 * elevation, vibrancy / content-is-canvas per Apple HIG), the compact ramp
 * readout, and one live demo: a GlassSurface card carrying a mini transport
 * UI over the grid stage.
 */

import React from "react";
import { DemoStage } from "@/components/site/DemoStage";
import { GlassSurface, MATERIAL_RAMP } from "@/lib/glass";
import type { MaterialLevel } from "@/lib/glass";
import { Link } from "@/components/site/HashRouter";

/** The four ramp levels in elevation order (values come from MATERIAL_RAMP). */
const RAMP_LEVELS: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];

/** 03:12 of 18:40 — a deterministic playhead, ~17% through the clip. */
const POSITION_PERCENT = 17;

/** Quiet icon button shared by the prev/next transports. */
const quietButtonClass =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9999px] text-[12px] text-neutral-500 transition-colors hover:bg-default-font/[0.06] hover:text-default-font";

export function MaterialTeaserSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 text-prose font-prose text-neutral-600 dark:text-neutral-500">
        <p>
          Liquid glass is the material Praxis uses for anything that floats
          above the document. It comes in four fixed levels — ultrathin, thin,
          regular, and thick — and each level is a complete recipe of backdrop
          blur, saturation, panel tint, and refraction strength, so elevation
          is chosen from a ramp instead of tuned per surface. Ultrathin and
          thin carry scrims and transient hover chrome; regular is the anchor
          level shared by capsules, toolbars, and this site&apos;s header; thick
          is the legibility floor for sheets that must stay readable over the
          busiest canvases.
        </p>
        <p>
          Where most systems elevate a surface by casting a shadow under it,
          glass elevates by refracting the content behind it. A cast shadow
          implies a light source and stacks gray mass under every panel, which
          reads as decoration the moment an interface gets dense; refraction
          implies only a medium, and a glass edge visibly bends whatever passes
          behind it — text, gridlines, waveforms — so the surface reads as
          physically above the canvas with no shadow at all. On Chromium the
          bend is drawn by a per-geometry SVG displacement map, on Safari and
          Firefox by a WebGL lens, and everywhere else by a
          blur-and-saturation base tier that keeps the same semantics.
        </p>
        <p>
          The material follows the Apple Human Interface Guidelines&apos;
          contention that the content is the canvas: chrome floats over the
          document rather than claiming a region of its own, and a floating
          surface never paints an opaque rectangle over that document. Instead
          of opacity, glass uses vibrancy — it samples the canvas behind it,
          blurs and saturates it, and lets it glow through, so a transport
          floating over a waveform keeps both the controls and the waveform
          legible. Because every material is defined by how it treats what is
          behind it rather than by any color of its own, the entire system
          stays monochrome across both themes.
        </p>
      </div>

      {/* the ramp, as a quiet readout */}
      <div>
        <div className="mb-2 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
          The material ramp
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RAMP_LEVELS.map((level) => {
            const ramp = MATERIAL_RAMP[level];
            return (
              <div
                key={level}
                className="flex flex-col gap-1 rounded-md border border-default-border bg-panel px-3 py-2.5"
              >
                <span className="text-body-medium font-medium text-default-font">
                  {level}
                </span>
                <span className="font-code text-[11px] text-neutral-400">
                  scale {ramp.maxDisplacement.toFixed(1)} · bezel {ramp.bezel}px
                  · sat ×{ramp.saturate}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* live demo — the material carrying real UI over a busy canvas */}
      <figure>
        <div className="relative">
          <DemoStage variant="grid" height="h-64" />
          <GlassSurface
            material="regular"
            shape="card"
            className="absolute inset-x-4 top-1/2 z-10 mx-auto w-full max-w-[400px] -translate-y-1/2 p-4"
          >
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  className={quietButtonClass}
                >
                  ◁
                </button>
                <button
                  type="button"
                  aria-label="Play"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9999px] border border-default-font/15 bg-default-font/[0.06] text-[11px] text-default-font transition-colors hover:bg-default-font/[0.1]"
                >
                  ▶
                </button>
                <button type="button" aria-label="Next" className={quietButtonClass}>
                  ▷
                </button>
                <span className="ml-2 font-code text-[13px] tracking-[0.02em] tabular-nums text-default-font">
                  03:12 / 18:40
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-[9999px] bg-default-font/15">
                <div
                  className="h-full rounded-[9999px] bg-default-font/50"
                  style={{ width: `${POSITION_PERCENT}%` }}
                />
              </div>
            </div>
          </GlassSurface>
        </div>
        <figcaption className="mt-3 font-code text-[11px] leading-[16px] text-neutral-400">
          Live — GlassSurface, material regular, shape card, over the grid
          stage. The edge bends the grid behind it; the bevel is the elevation.
        </figcaption>
      </figure>

      <div>
        <Link
          to="/materials"
          className="text-body-medium font-medium text-default-font underline decoration-default-border underline-offset-4 transition-colors hover:decoration-default-font"
        >
          Explore materials
          <span aria-hidden="true" className="ml-1.5 text-neutral-400">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
