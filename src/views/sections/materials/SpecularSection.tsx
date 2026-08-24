"use client";

/**
 * SpecularSection — the "Specular construction" section of the Materials view.
 * Anatomy of the dual-gradient sheen (160° key light + 340° counter-sheen),
 * the rim / hairline / specular edge tokens, the composed GlassChip recipe,
 * the dark-mode rim bloom open question, and the doctrine don'ts.
 * Light, not shadow.
 */

import React from "react";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import { DemoStage } from "@/components/site/DemoStage";
import { CodeBlock } from "@/components/site/CodeBlock";
import { GlassChip } from "@/components/ds/GlassChip";

/* ------------------------------------------------------------------ */
/* Canonical values — mirror the .praxis-sheen-* classes and the       */
/* GlassChip port exactly. Never drift from these numbers.             */
/* ------------------------------------------------------------------ */

const SHEEN_PRIMARY =
  "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.16) 26%, rgba(255,255,255,0.04) 44%, rgba(255,255,255,0) 60%)";
const SHEEN_COUNTER =
  "linear-gradient(340deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 22%, rgba(255,255,255,0) 42%)";

/* The same ladders unrolled along the gradient axis for the stop bars. */
const LADDER_PRIMARY =
  "linear-gradient(to right, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.16) 26%, rgba(255,255,255,0.04) 44%, rgba(255,255,255,0) 60%)";
const LADDER_COUNTER =
  "linear-gradient(to right, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 22%, rgba(255,255,255,0) 42%)";

interface SheenStop {
  /** stop position along the gradient axis */
  at: string;
  /** white alpha at that stop */
  alpha: string;
}

const PRIMARY_STOPS: SheenStop[] = [
  { at: "0%", alpha: "55%" },
  { at: "26%", alpha: "16%" },
  { at: "44%", alpha: "4%" },
  { at: "60%", alpha: "0%" },
];

const COUNTER_STOPS: SheenStop[] = [
  { at: "0%", alpha: "22%" },
  { at: "22%", alpha: "7%" },
  { at: "42%", alpha: "0%" },
];

const RIM_LITERAL = "border: 1px solid rgba(255,255,255,0.2)";
const HAIRLINE_LITERAL = "0px 0px 0px 1px rgb(255 255 255 / 0.08)";
const SPECULAR_LITERAL =
  "inset 0px 1px 0px 0px rgb(255 255 255 / 0.26), inset 0px -1px 0px 0px rgb(255 255 255 / 0.1)";

const COMPOSED_RECIPE = `// The composed surface — GlassChip.tsx, verbatim.
// Layer order: tint + frost → dual sheen → rim → contact ring + insets.
// (class groups split across lines for annotation only)
<div
  className={SubframeUtils.twClassNames(
    // geometry + content row
    "relative inline-flex items-center gap-1 rounded-[9999px] px-2 py-1.5",
    // tint + frost — the substrate
    "bg-panel/60 backdrop-blur-2xl backdrop-saturate-150",
    // rim — the 20% white edge
    "border border-solid border-[#ffffff33]",
    // contact ring (8%) + specular insets (26% top / 10% bottom)
    "shadow-[0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_0px_#ffffff42,inset_0px_-1px_0px_0px_#ffffff1a]"
  )}
>
  {/* primary sheen — the key light at 160deg */}
  <div className="pointer-events-none absolute inset-0 rounded-[9999px] bg-[linear-gradient(160deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_26%,rgba(255,255,255,0.04)_44%,rgba(255,255,255,0)_60%)]" />
  {/* counter-sheen — the bounce at 340deg */}
  <div className="pointer-events-none absolute inset-0 rounded-[9999px] bg-[linear-gradient(340deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.07)_22%,rgba(255,255,255,0)_42%)]" />
  {/* content sits above the light */}
  <div className="relative flex items-center gap-1">{children}</div>
</div>`;

const P = "text-body-medium text-neutral-600 dark:text-neutral-500";
const MUTED = "text-body-medium text-neutral-500";
const CODE_LITERAL =
  "mt-3 block break-all font-code text-[11px] leading-[1.6] text-neutral-500 dark:text-neutral-500";

/* ------------------------------------------------------------------ */
/* Sheen anatomy card — the stop ladder unrolled left → right over a   */
/* fixed neutral-300 field so the white alphas are visible in light    */
/* mode. Tick marks sit at the exact stop positions.                   */
/* ------------------------------------------------------------------ */

function SheenBar({
  title,
  ladder,
  stops,
  literal,
  note,
}: {
  title: string;
  ladder: string;
  stops: SheenStop[];
  literal: string;
  note: string;
}) {
  return (
    <div className="rounded-lg border border-default-border p-4">
      <div className="mb-3 font-code text-[12px] font-medium text-default-font">
        {title}
      </div>
      <div className="relative">
        <div
          className="h-12 rounded-md bg-neutral-300"
          style={{ backgroundImage: ladder }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12">
          {stops.map((s) => (
            <span
              key={s.at}
              aria-hidden="true"
              className="absolute top-0 bottom-0 w-px bg-neutral-500/60"
              style={{ left: s.at }}
            />
          ))}
        </div>
      </div>
      <div className="relative mt-1.5 h-8">
        {stops.map((s) => (
          <span
            key={s.at}
            className={
              s.at === "0%"
                ? "absolute top-0 flex flex-col items-start font-code text-[10px] leading-[1.4] whitespace-nowrap"
                : "absolute top-0 flex -translate-x-1/2 flex-col items-center font-code text-[10px] leading-[1.4] whitespace-nowrap"
            }
            style={{ left: s.at }}
          >
            <span className="text-default-font/70">{s.alpha}</span>
            <span className="text-neutral-400">@ {s.at}</span>
          </span>
        ))}
      </div>
      <code className={CODE_LITERAL}>{literal}</code>
      <p className={`mt-2 ${MUTED}`}>{note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Edge token swatch — a small capsule over a dark neutral-800 field   */
/* so the 8–26% white alphas are actually visible.                     */
/* ------------------------------------------------------------------ */

function EdgeSwatch({
  name,
  literal,
  note,
  capsuleStyle,
}: {
  name: string;
  literal: string;
  note: string;
  capsuleStyle: React.CSSProperties;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-default-border">
      <div className="flex h-24 items-center justify-center bg-neutral-800">
        <div
          className="h-9 w-36 rounded-[9999px] bg-neutral-700"
          style={capsuleStyle}
        />
      </div>
      <div className="p-4">
        <div className="font-code text-[12px] font-medium text-default-font">
          {name}
        </div>
        <code className={CODE_LITERAL}>{literal}</code>
        <p className={`mt-2 ${MUTED}`}>{note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function SpecularSection() {
  return (
    <div className="flex flex-col gap-12">
      {/* Intro — light, not shadow */}
      <div className="flex flex-col gap-4">
        <p className={P}>
          The specular construction is light, not shadow — and it is what
          separates a refractive surface from the old cast look. A pane that
          only blurs its backdrop reads as fog; the sheen and the rim are what
          make the same backdrop-filter read as a physical object, a lens with
          a lit edge. Every value in the construction is a white alpha, so
          every mark it leaves reads as light landing on the surface rather
          than ink drawn on it.
        </p>
        <p className={P}>
          The light comes from the upper left, 155–160° off vertical. The
          primary sheen is a quad-stop gradient — 55% white entering at the
          light-facing corner, halved twice, fully transparent 60% of the way
          across — the highlight you would see on the near edge of a real
          lens. The counter-sheen at 340° runs the opposite direction: a much
          fainter bounce that puts a rim of light along the bottom edge, as if
          the pane were picking up light reflected from the content beneath
          it.
        </p>
        <Note>
          Material doctrine, verbatim: “don’t drop the counter-sheen — it’s
          what separates refractive from the old cast look under dark
          content.” Under dark backdrops the primary gradient nearly
          vanishes; the 340° bounce is then the only thing still drawing the
          lower edge.
        </Note>
      </div>

      {/* Sheen anatomy */}
      <Labeled label="Sheen anatomy">
        <div className="grid gap-4 sm:grid-cols-2">
          <SheenBar
            title="Primary sheen — 160°"
            ladder={LADDER_PRIMARY}
            stops={PRIMARY_STOPS}
            literal={SHEEN_PRIMARY}
            note="The key light. Four stops, most of the surface left clean — 55% at the corner is the highlight, gone by 60% of the way across."
          />
          <SheenBar
            title="Counter-sheen — 340°"
            ladder={LADDER_COUNTER}
            stops={COUNTER_STOPS}
            literal={SHEEN_COUNTER}
            note="The bounce. Three stops, roughly an octave down from the primary — just enough light to keep the bottom edge alive."
          />
        </div>
        <div className="mt-5">
          <DemoStage variant="plain" height="h-44">
            <div className="relative h-12 w-56 rounded-[9999px] bg-panel/60 backdrop-blur-2xl backdrop-saturate-150">
              <div
                className="pointer-events-none absolute inset-0 rounded-[9999px]"
                style={{ backgroundImage: SHEEN_PRIMARY }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[9999px]"
                style={{ backgroundImage: SHEEN_COUNTER }}
              />
            </div>
          </DemoStage>
          <p className={`mt-2 ${MUTED}`}>
            Combined — tint plus both gradients, before any edge treatment:
            the primary gradient does the lighting, the counter keeps the
            lower edge from going dead.
          </p>
        </div>
      </Labeled>

      {/* Rim + hairline tokens */}
      <Labeled label="Rim + hairline tokens">
        <p className={`mb-4 ${P}`}>
          The gradients carry the light; three edge constructions carry the
          geometry. All of them are white alphas — marks of light, never
          strokes. The rim is a 20% white border; the hairline is a 1px ring
          at 8% that sits just outside it; the specular insets draw a 26% lit
          edge along the top and a 10% counter-light along the bottom, from
          inside. Composed, the latter two are the{" "}
          <Token>shadow-glass-surface</Token> token.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <EdgeSwatch
            name="Rim"
            literal={RIM_LITERAL}
            note="Where the pane catches the key light head-on. Written border-[#ffffff33] in the export — the same 20%."
            capsuleStyle={{ border: "1px solid rgba(255,255,255,0.2)" }}
          />
          <EdgeSwatch
            name="shadow-glass-hairline"
            literal={HAIRLINE_LITERAL}
            note="The contact ring — a 1px 8% white ring just outside the rim, separating glass from backdrop without casting."
            capsuleStyle={{ boxShadow: HAIRLINE_LITERAL }}
          />
          <EdgeSwatch
            name="shadow-glass-specular"
            literal={SPECULAR_LITERAL}
            note="The lit edge from inside: a 26% inset along the top, a 10% counter-light along the bottom."
            capsuleStyle={{ boxShadow: SPECULAR_LITERAL }}
          />
        </div>
        <p className={`mt-3 ${MUTED}`}>
          Swatches sit on neutral-800 because at 8–26% alpha, white is
          invisible on light panels.
        </p>
      </Labeled>

      {/* The composed surface */}
      <Labeled label="The composed surface">
        <p className={`mb-4 ${P}`}>
          Every layer at once, exactly as GlassChip paints it — tint and
          frost, dual sheen, rim, contact ring and specular insets — beside
          the live component over busy content.
        </p>
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <CodeBlock filename="GlassChip.tsx" code={COMPOSED_RECIPE} />
          <DemoStage variant="text" height="h-64">
            <GlassChip>
              <GlassChip.Action glyph="⌘" label="Export" />
              <GlassChip.Rule />
              <GlassChip.Action glyph="⇧" label="Duplicate" />
              <GlassChip.Rule />
              <GlassChip.Action label="Discard" tone="destructive" />
              <GlassChip.Action glyph="↗" disabled />
            </GlassChip>
          </DemoStage>
        </div>
      </Labeled>

      {/* Dark mode — rim bloom */}
      <Labeled label="Dark mode — the rim bloom question">
        <p className={`mb-4 ${P}`}>
          One question is deliberately left open: rim bloom in dark mode. At
          20% white the rim over dark content can bloom — the edge stops
          reading as geometry and starts reading as a glow. The doctrine
          keeps it anyway, because vibrancy needs the rim: darkening it costs
          the surface its lit edge under light content too.
        </p>
        <DemoStage dark variant="text" height="h-56">
          <GlassChip>
            <GlassChip.Action glyph="⌘" label="Export" />
            <GlassChip.Rule />
            <GlassChip.Action glyph="⇧" label="Duplicate" />
          </GlassChip>
        </DemoStage>
        <p className={`mt-2 ${MUTED}`}>
          Regular GlassChip over dark content — watch the 20% rim bloom
          along the top edge. Whether the rim forks to a lower dark-mode
          alpha, or the construction grows a dark variant, is the §8.1
          formal dark pass — and it remains the architect’s call.
        </p>
      </Labeled>

      {/* Don’ts */}
      <Labeled label="Don’ts">
        <ul className="flex flex-col gap-3">
          {[
            <>
              Never replace family members with <Token>GlassChip</Token>{" "}
              wholesale — it is a composition host, not a shortcut. Toolbar
              actions keep their <Token>rounded-sm</Token> geometry inside
              their own capsule; chip actions keep their pill.
            </>,
            <>
              No glass on in-flow or crisp surfaces — chart frames and table
              chrome stay plain <Token>bg-panel</Token>; glass belongs to
              floating layers.
            </>,
            <>
              No cast shadows on laid objects — <Token>shadow-default</Token>{" "}
              is reserved for genuinely floating layers such as dialogs and
              popovers; laid objects separate with the rim, the hairline and
              the sheen alone.
            </>,
            <>
              Never animate the sheens — the light is environmental and
              fixed. A moving highlight reads as decoration, not material.
            </>,
          ].map((item, i) => (
            <li
              key={i}
              className={`flex gap-3 ${P}`}
            >
              <span
                aria-hidden="true"
                className="font-code text-neutral-300 select-none dark:text-neutral-600"
              >
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Labeled>
    </div>
  );
}
