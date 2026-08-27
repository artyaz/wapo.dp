"use client";

/**
 * HierarchySection — the flagship section of the Materials view: the four
 * semantic levels (UltraThin → Thick) as prose, the live MaterialTokens card,
 * a level playground over busy content, the full ramp table, and the
 * chromatic-aberration and anchor notes that keep the ramp honest.
 */

import { MaterialTokens } from "@/components/ds/MaterialTokens";
import { DemoStage } from "@/components/site/DemoStage";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import { GlassSurface, CHROMATIC, type MaterialLevel } from "@/lib/glass";
import {
  MATERIAL_RAMP_DOCS,
  type MaterialLevelDoc,
} from "@/lib/docs/foundations-data";

/** HIG-style display names, used inside capsules and the ramp table. */
const LEVEL_NAMES: Record<MaterialLevel, string> = {
  ultrathin: "UltraThin",
  thin: "Thin",
  regular: "Regular",
  thick: "Thick",
};

/** Swatch-caption format: tint · blur · saturate, e.g. "panel/60 · 40px · 150%". */
function rampValues(doc: MaterialLevelDoc): string {
  return `panel/${doc.tint} · ${doc.blur}px · ${doc.saturate}%`;
}

const TABLE_HEADINGS = [
  "Level",
  "Blur",
  "Saturate",
  "Tint",
  "WebGL strength",
  "Displacement scale",
  "Role",
] as const;

export function HierarchySection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 1 · Intro */}
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Praxis models its material hierarchy on the vibrancy materials of
          Apple's Human Interface Guidelines: four levels —{" "}
          <Token>ultrathin</Token>, <Token>thin</Token>, <Token>regular</Token>
          , <Token>thick</Token> — that answer exactly one question: how
          strongly does a floating surface separate from the content behind
          it. The level is a semantic declaration, not a recipe. A component
          states a thickness, and the glass runtime resolves that statement
          into blur, saturation, tint and refraction for whichever of the
          three rendering strategies the visitor's browser negotiated. One{" "}
          <Token>material</Token> prop means the same substance on every
          tier.
        </p>
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The ramp is arithmetic and anchored in the middle, and since the
          kube.io rewrite it carries the material primarily through{" "}
          <Token>refraction</Token> rather than frost: a surface profile
          (bezel width, glass thickness, IOR 1.5) drives the displacement
          field, while the frost ceiling stays deliberately small — blur
          climbs 0 → 1.5 → 3 → 6px, and even that is distributed across a{" "}
          <Token>stacked progressive blur</Token> (three masked layers of
          small radii, each frost span nested tighter toward the edge) so the
          bend at the bezel never washes out into haze. Saturation rises
          120% → 160%, the panel tint thickens from 24% to 46%, and the
          refraction level steps 0.7 → 1.15× the physical maximum
          displacement. Each step is small enough that adjacent levels still
          read as the same substance, and large enough to be felt without a
          side-by-side.
        </p>
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Each level has one job. UltraThin is the scrim hint — glass that
          must barely register over large ambient fields. Thin carries chips
          and labels over calm content, where the work underneath stays the
          priority. Regular is the default for every floating surface —
          chips, toolbars, HUDs, laid objects. Thick is the legibility floor
          for text over busy content: sheets, dialogs, dense readouts. And
          for surfaces that refract without frosting — the displacement-only
          tier — thickness comes from refraction, not tint: all four levels
          hold a single constant tint of <Token>panel/8</Token>, because a
          heavier tint would drown the very bending of light that makes the
          surface read as thick.
        </p>
      </div>

      {/* 2 · Live swatch ramp — the ported token card, values verbatim */}
      <Labeled label="Live token card — MaterialTokens">
        <div className="rounded-xl border border-solid border-default-border bg-default-background p-4 sm:p-6">
          <div className="max-w-[520px]">
            <MaterialTokens />
          </div>
        </div>
      </Labeled>

      {/* 3 · Level playground — one capsule per level over busy content */}
      <Labeled label="Level playground — four capsules over live content">
        <DemoStage variant="text" height="h-72">
          <div className="grid w-full max-w-2xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {MATERIAL_RAMP_DOCS.map((doc) => (
              <div
                key={doc.level}
                className="flex flex-col items-center gap-2.5"
              >
                <GlassSurface
                  material={doc.level}
                  shape="capsule"
                  className="h-12 w-full"
                >
                  <span className="w-full text-center font-code text-[11px] tracking-[0.1em] text-default-font/80 uppercase select-none">
                    {LEVEL_NAMES[doc.level]}
                  </span>
                </GlassSurface>
                <span className="font-code text-[11px] leading-4 text-neutral-400 tabular-nums select-none whitespace-nowrap">
                  {rampValues(doc)}
                </span>
              </div>
            ))}
          </div>
        </DemoStage>
      </Labeled>

      {/* 4 · The ramp table */}
      <Labeled label="The ramp — level × strategy values">
        <div className="overflow-x-auto rounded-lg border border-solid border-default-border">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-neutral-100">
                {TABLE_HEADINGS.map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-solid border-default-border px-3 py-2.5 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATERIAL_RAMP_DOCS.map((doc) => {
                const anchor = doc.level === "regular";
                return (
                  <tr
                    key={doc.level}
                    className={anchor ? "bg-default-font/[0.04]" : undefined}
                  >
                    <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="font-body text-body-medium font-medium text-default-font">
                          {LEVEL_NAMES[doc.level]}
                        </span>
                        {anchor ? (
                          <span className="inline-flex items-center rounded-[4px] bg-default-font/[0.08] px-1.5 py-0.5 font-code text-[10px] font-medium tracking-[0.12em] text-default-font uppercase">
                            Anchor
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                      {doc.blur}px
                    </td>
                    <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                      {doc.saturate}%
                    </td>
                    <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                      panel/{doc.tint}
                    </td>
                    <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                      {doc.strength.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                      {doc.displacement}
                    </td>
                    <td className="border-t border-solid border-default-border px-3 py-3 text-body-medium text-neutral-600 dark:text-neutral-500">
                      {doc.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Labeled>

      {/* 5 · Chromatic aberration */}
      <Labeled label="Chromatic aberration">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Token>R ×{CHROMATIC.r.toFixed(2)}</Token>
            <Token>G ×{CHROMATIC.g.toFixed(2)}</Token>
            <Token>B ×{CHROMATIC.b.toFixed(2)}</Token>
            <span className="font-code text-[11px] text-neutral-400 select-none">
              CHROMATIC · per-channel displacement multipliers
            </span>
          </div>
          <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
            The displacement scale in the table is the base, blue-channel
            number. The runtime actually bends three copies of the backdrop —
            red at ×{CHROMATIC.r.toFixed(2)}, green at ×
            {CHROMATIC.g.toFixed(2)}, blue at ×{CHROMATIC.b.toFixed(2)} — so
            the channels land a fraction of a pixel apart wherever the lens
            has curvature. The result is a faint warm fringe on one edge of a
            surface and a cool one on the opposite edge: strongest at the
            corners, absent across the flat interior. It reads as lensing
            rather than decoration for three reasons — it only appears where
            light is actually being bent, it follows the surface's geometry
            rather than its palette, and it behaves the way a simple physical
            lens splits white light. The eye files it under optics, not
            ornament.
          </p>
        </div>
      </Labeled>

      {/* 6 · Anchor note */}
      <Note>
        <span className="font-medium text-default-font">
          Every strategy's default lands exactly on Regular — swap
          implementation, never semantics.
        </span>{" "}
        All three rendering tiers resolve the anchor to the same visual
        weight: the backdrop-filter base tier frosts it as{" "}
        <Token>blur(40px)</Token> · <Token>saturate(150%)</Token> over{" "}
        <Token>panel/60</Token>; the Chromium displacement tier bends it with
        the 12-scale filter (derived channels 15 / 10 / 12); the WebGL tier
        refracts it at strength <Token>0.65</Token> over the same frost. A
        surface promoted between tiers — Chromium to Safari, WebGL to a
        context-starved GPU — never changes its perceived thickness; only the
        mechanism producing that thickness does.
      </Note>
    </div>
  );
}
