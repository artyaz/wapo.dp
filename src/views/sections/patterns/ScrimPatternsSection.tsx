"use client";

/**
 * ScrimPatternsSection — Patterns §1 "Progressive blur scrims".
 *
 * The why (legibility as a low-pass filtering problem), the anatomy of
 * AtmosphereScrim (four nested masked blur tiers drawn to scale), two live
 * stages (the bottom dock, and the ScrimTop mirror this site's header runs),
 * and the usage constraints. Deterministic — every figure is a pure function
 * of the component's real constants; nothing is measured or random.
 */

import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import { ScrimTop } from "@/components/site/ScrimTop";
import { CodeBlock } from "@/components/site/CodeBlock";
import { DemoStage } from "@/components/site/DemoStage";
import { Labeled, Token } from "@/components/site/DocPage";

/* ------------------------------------------------------------------ */
/* Intro — why a feathered blur field                                  */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
      <p>
        Text is read through its edges, and edges only survive against local
        contrast. The content that scrolls beneath a dock is made of exactly
        the wrong material: waveforms, grid lines, thumbnails, running prose —
        all sharp transitions, all high spatial frequency. The blunt answer
        is an opaque block behind the label, which restores contrast by force
        and severs the document in the process. The scrim takes the optical
        route instead: as content scrolls into the header area, a progressive
        blur acts as a low-pass filter, attenuating the high frequencies
        first — sharp edges soften and wash out — while the low-frequency
        field passes through. Foreground labels stay readable without an
        opaque background block, and the document never stops being one
        surface.
      </p>
      <p>
        The blur itself cannot have a boundary. A container with a uniform{" "}
        <Token>backdrop-filter</Token> and a hard edge makes every element
        visibly <span className="font-medium text-default-font">pop</span>{" "}
        into the blurred state the instant it crosses that edge — the
        discontinuity reads first as a seam, then as a bug. So each blur
        layer is drawn through a gradient <Token>mask-image</Token> that
        fades linearly from full strength at the docked edge to zero at the
        layer&apos;s top extent. No element enters blur at any single moment;
        it sinks into it. The feathered mask eliminates the seam.
      </p>
      <p>
        What the user perceives is depth. Content scrolling into the scrim
        reads as sinking beneath a distinct spatial layer — the same
        substance as the bars and chips docked on top of it, minus the tint,
        the specular and the content. That is the point of the pattern:
        hierarchy through depth rather than UI clutter. No dividing rule, no
        dimming overlay, no box — the document simply continues underneath,
        defocused.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layer anatomy                                                       */
/* ------------------------------------------------------------------ */

/** The scrim's fixed height: h-28. */
const SCRIM_HEIGHT = 112;

interface AnatomyLayer {
  id: string;
  /** nominal blur radius, px */
  blur: number;
  /** extent as % of the scrim height, anchored to the docked edge */
  extent: number;
  /** mask peak alpha at the docked edge, as authored */
  peak: number;
}

const ANATOMY_LAYERS: AnatomyLayer[] = [
  { id: "L1", blur: 1, extent: 100, peak: 0.85 },
  { id: "L2", blur: 4, extent: 75, peak: 1 },
  { id: "L3", blur: 10, extent: 50, peak: 1 },
  { id: "L4", blur: 18, extent: 25, peak: 1 },
];

/** Documented composite profile — effective blur sampled at eighths of the
 *  height, scrim top → docked edge. Approximate by design. */
const PROFILE_SAMPLES = [0.5, 1.2, 2.3, 5, 8, 11, 14, 18] as const;

/** Warm-gray illustration ink — a pure function of the tier constants. */
function ladderInk(layer: AnatomyLayer): string {
  const alpha = layer.peak * (0.14 + 0.4 * (layer.blur / 18));
  return `rgba(140, 138, 130, ${alpha.toFixed(3)})`;
}

function AnatomyFigure() {
  return (
    <div className="max-w-xl overflow-hidden rounded-lg border border-default-border bg-panel/60">
      <div className="border-b border-default-border px-5 py-3 font-code text-[12.5px] text-default-font">
        cross-section · h-28 · 112px · extents to scale
      </div>

      <div className="flex flex-col gap-5 px-5 py-4">
        {/* composite profile — same track geometry as the ladder below, so
            the extent boundaries land exactly on the cell dividers */}
        <div className="flex items-start gap-3">
          <span className="w-16 flex-none" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between font-code text-[10px] font-medium tracking-[0.1em] text-neutral-400 uppercase">
              <span>scrim top · 0px</span>
              <span>docked edge · 112px</span>
            </div>
            <div className="grid grid-cols-8">
              {PROFILE_SAMPLES.map((value, i) => {
                const last = i === PROFILE_SAMPLES.length - 1;
                const alpha = 0.12 + (i / (PROFILE_SAMPLES.length - 1)) * 0.48;
                return (
                  <div
                    key={i}
                    className="flex min-w-0 flex-col items-center gap-1"
                  >
                    <span className="font-code text-[10.5px] text-neutral-500 tabular-nums dark:text-neutral-500">
                      {last ? `~${value}+` : `${value}`}
                    </span>
                    <div
                      className="h-2 w-full border-l border-default-border last:border-r"
                      style={{
                        backgroundColor: `rgba(140, 138, 130, ${alpha.toFixed(3)})`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <p className="text-right font-code text-[10px] tracking-[0.04em] text-neutral-400">
              → compounds toward ~30px effective at the edge
            </p>
          </div>
          <span className="w-28 flex-none" aria-hidden="true" />
        </div>

        {/* layer ladder — each bar is the layer's real extent with its
            real linear mask ramp, docked at the right (edge) end */}
        <div className="flex flex-col gap-1.5">
          {ANATOMY_LAYERS.map((layer) => {
            const extentPx = Math.round((SCRIM_HEIGHT * layer.extent) / 100);
            return (
              <div key={layer.id} className="flex items-center gap-3">
                <span className="w-16 flex-none font-code text-[11px] text-default-font tabular-nums">
                  {layer.id} · {layer.blur}px
                </span>
                <div className="relative h-5 min-w-0 flex-1 overflow-hidden rounded-[4px] bg-default-font/[0.04]">
                  <div
                    className="absolute inset-y-0 right-0"
                    style={{
                      width: `${layer.extent}%`,
                      background: `linear-gradient(to left, ${ladderInk(layer)} 0%, transparent 100%)`,
                    }}
                  />
                </div>
                <span className="w-28 flex-none text-right font-code text-[10.5px] text-neutral-400 tabular-nums">
                  {layer.extent}% · {extentPx}px
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="border-t border-default-border px-5 py-3 text-caption text-neutral-500 dark:text-neutral-500">
        Tiers, extents and mask ramps are the component&apos;s real values;
        the composite samples are the documented profile (≈), read at eighths
        of the height. Extent boundaries land on the 25 / 50 / 75% marks —
        exactly where the profile cells divide.
      </p>
    </div>
  );
}

const SCRIM_MARKUP = `<div className="flex h-28 items-start pointer-events-none
                absolute inset-x-0 bottom-0 select-none">

  {/* L1 · 1px tier — spans the full height · mask peaks at 0.85 */}
  <div className="flex items-start absolute inset-x-0 inset-y-0
    backdrop-blur-[1px]
    [mask-image:linear-gradient(to_top,rgba(0,0,0,0.85)_0%,transparent_100%)]" />

  {/* L2 · 4px tier — lower 75% of the scrim */}
  <div className="flex items-start absolute inset-x-0 bottom-0 h-[75%]
    backdrop-blur-[4px]
    [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_100%)]" />

  {/* L3 · 10px tier — lower 50% */}
  <div className="flex items-start absolute inset-x-0 bottom-0 h-[50%]
    backdrop-blur-[10px]
    [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_100%)]" />

  {/* L4 · 18px tier — lower 25% · terminates at the docked edge */}
  <div className="flex items-start absolute inset-x-0 bottom-0 h-[25%]
    backdrop-blur-[18px]
    [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_100%)]" />
</div>`;

function LayerAnatomy() {
  return (
    <Labeled label="Anatomy · four nested layers">
      <div className="flex flex-col gap-4">
        <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
          <p>
            The construction is four absolutely positioned divs inside one{" "}
            <Token>pointer-events-none</Token> wrapper, self-docked to its
            container&apos;s bottom edge at a fixed <Token>h-28</Token> —
            112px. Each child is nothing but a uniform{" "}
            <Token>backdrop-blur</Token> — the nominal tiers 1 / 4 / 10 /
            18px — clipped to a shrinking extent of the wrapper: the full
            height, then the lower 75%, 50% and 25%. A single CSS blur cannot
            ramp; <Token>backdrop-filter</Token> applies uniformly across
            whatever paints it. The ramp has to be assembled out of uniform
            layers whose membership fades — that is the entire trick.
          </p>
          <p>
            Each layer&apos;s mask is a{" "}
            <Token>linear-gradient(to top)</Token> from full alpha at the
            docked edge to transparent at that layer&apos;s own top extent,
            so every contribution rises from exactly zero at the height
            where it appears — nothing can pop, because nothing begins at
            non-zero strength. The composite is therefore strictly monotonic
            from scrim top to docked edge: sampled at eighths of the height
            it runs ≈0.5 → 1.2 → 2.3 → 5 → 8 → 11 → 14 → ≈18px and keeps
            compounding, and the fully stacked tiers at the edge combine
            toward ~30px of effective defocus — more than any single tier
            paints. (The gentlest tier&apos;s mask peaks at 0.85 rather than
            1, as authored in the export — the 1px layer contributes
            fractionally less at full dock.) The masks are plain gradients
            with no <Token>url()</Token> references, so no filter list inside
            the scrim can ever be voided by an unresolved reference.
          </p>
        </div>

        <AnatomyFigure />

        <CodeBlock
          code={SCRIM_MARKUP}
          filename="AtmosphereScrim.tsx · the four nested layers"
        />
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Live demo A — bottom dock                                           */
/* ------------------------------------------------------------------ */

function BottomDockDemo() {
  return (
    <Labeled label="Live · bottom dock">
      <div className="flex flex-col gap-3">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The stage is busy on purpose — eighteen specimen lines over the
          canonical warm-gray radials. Watch the bottom of the stage the way
          you would watch a document scroll under a transport bar: the lines
          defocus in steps, the blur is fully mature for the last stretch,
          and the bar&apos;s capsule sits on top of it reading crisp. There
          is no height at which the lines snap into blur — the scrim
          feathers them into the bar.
        </p>

        <div className="relative w-full overflow-hidden rounded-lg border border-default-border">
          <DemoStage variant="text" height="h-80" />
          {/* self-docks: absolute inset-x-0 bottom-0, h-28 */}
          <AtmosphereScrim />
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-4">
            <div className="rounded-[9999px] bg-panel/60 px-4 py-2 font-code text-[11px] font-medium tracking-[0.08em] text-default-font select-none backdrop-blur-2xl">
              Transport · docked
            </div>
          </div>
        </div>

        <p className="font-code text-[11px] tracking-[0.04em] text-neutral-500 dark:text-neutral-500">
          demo a · stage h-80 · AtmosphereScrim h-28 (1 / 4 / 10 / 18px) ·
          bar panel/60 + backdrop-blur-2xl — the bar&apos;s own blur stacks
          on the scrim&apos;s peak
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Live demo B — top scrim mirror                                      */
/* ------------------------------------------------------------------ */

function TopScrimDemo() {
  return (
    <Labeled label="Live · top mirror">
      <div className="flex flex-col gap-3">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The same construction anchored to the opposite edge:{" "}
          <Token>ScrimTop</Token> flips every mask to{" "}
          <Token>linear-gradient(to bottom)</Token> and docks to{" "}
          <Token>top-0</Token>, so content scrolling up into a header sinks
          at exactly the same rate. This is the mirror this site&apos;s own
          header runs — in production at <Token>h-10</Token>, feathering the
          boundary where page content passes beneath the bar.
        </p>

        <div className="relative w-full overflow-hidden rounded-lg border border-default-border">
          <DemoStage variant="text" height="h-80" />
          <ScrimTop />
          <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-4">
            <div className="rounded-[9999px] bg-panel/60 px-4 py-2 font-code text-[11px] font-medium tracking-[0.08em] text-default-font select-none backdrop-blur-2xl">
              Header content · scrolled under
            </div>
          </div>
        </div>

        <p className="font-code text-[11px] tracking-[0.04em] text-neutral-500 dark:text-neutral-500">
          demo b · stage h-80 · ScrimTop h-28 · label row at the top edge ·
          production header: h-10
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Usage constraints                                                   */
/* ------------------------------------------------------------------ */

const CONSTRAINTS: ReadonlyArray<{ lead: string; body: string }> = [
  {
    lead: "It docks itself — the ancestor must be positioned.",
    body: "The scrim pins to absolute inset-x-0 bottom-0 of its nearest positioned ancestor, at a fixed h-28. Every consumption site needs a relative (usually overflow-hidden) container, and that requirement should be stated at the point of use — the component cannot enforce it, and the failure mode is a scrim docked to the viewport instead of the panel.",
  },
  {
    lead: "The peak terminates in a hard cut at the docked edge.",
    body: "The 18px tier's mask is at full strength at 0% — the docked edge itself — with nothing below it to fade into. Docked behind a bar, as in demo a, the cut is hidden under the bar's own surface: the correct arrangement. Never float a scrim mid-canvas — with nothing docked over the edge, the cut is exposed and reads as a seam.",
  },
  {
    lead: "Pointer events pass through.",
    body: "The wrapper is pointer-events-none and carries no role and no content — the scrim is never interactive, never a target, never focusable. Links and text beneath the blur stay clickable and selectable through it; select-none only guards the scrim's own empty text.",
  },
  {
    lead: "Nested backdrop-filters stack a second blur.",
    body: "Anything floating over the scrim — chips, the demo's transport bar — samples the scrim's already-blurred output and blurs it again; demo a's bar adds backdrop-blur-2xl on top of the peak. Each layer is a full-area GPU pass, and Safari's cost for dense compositions of nested filters grows fast — cap how many share a viewport.",
  },
];

function UsageConstraints() {
  return (
    <Labeled label="Usage constraints">
      <div className="max-w-2xl overflow-hidden rounded-lg border border-default-border bg-panel/60">
        <div className="flex flex-col divide-y divide-default-border">
          {CONSTRAINTS.map((constraint, i) => (
            <div key={constraint.lead} className="flex gap-4 px-5 py-4">
              <span className="pt-0.5 font-code text-[11px] text-neutral-400 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-body-medium font-medium text-default-font">
                  {constraint.lead}
                </span>
                <span className="text-body-medium text-neutral-600 dark:text-neutral-500">
                  {constraint.body}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */

export function ScrimPatternsSection() {
  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <LayerAnatomy />
      <BottomDockDemo />
      <TopScrimDemo />
      <UsageConstraints />
    </div>
  );
}
