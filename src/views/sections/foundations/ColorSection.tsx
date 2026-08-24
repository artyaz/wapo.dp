"use client";

/**
 * ColorSection — the color foundations of Praxis: the monochrome doctrine,
 * the neutral ramp that doubles as the brand (light + dark strips), the three
 * semantic scales with their 500 anchors, the four singleton tokens, and the
 * contrast rules. Every swatch renders from the token data in
 * foundations-data.ts — nothing is hand-typed.
 */

import {
  COLOR_SCALES,
  COLOR_SINGLETONS,
  type ColorSingletonDoc,
  type ColorStepDoc,
} from "@/lib/docs/foundations-data";
import { Labeled, Note, Token } from "@/components/site/DocPage";

/* ---------------------------------------------------------------------------
 * Color math — pure, deterministic helpers over the authored rgb() strings
 * ------------------------------------------------------------------------- */

/** "rgb(251 251 249)" → "#FBFBF9". */
function toHex(value: string): string {
  const match = /^rgb\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*\)$/.exec(value);
  if (!match) return "#000000";
  return `#${[match[1], match[2], match[3]]
    .map((part) => Number(part).toString(16).toUpperCase().padStart(2, "0"))
    .join("")}`;
}

/** WCAG relative luminance of an rgb() string. */
function luminance(value: string): number {
  const channels = /^rgb\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*\)$/
    .exec(value)
    ?.slice(1)
    .map((part) => {
      const s = Number(part) / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
  if (!channels || channels.length < 3) return 0;
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG contrast ratio between two luminances. */
function contrastRatio(a: number, b: number): number {
  const lighter = a > b ? a : b;
  const darker = a > b ? b : a;
  return (lighter + 0.05) / (darker + 0.05);
}

const NEUTRAL = COLOR_SCALES.neutral;

/** The system ink in each mode — neutral-900 — used to label swatches. */
const DARK_INK = NEUTRAL[NEUTRAL.length - 1].light;
const LIGHT_INK = NEUTRAL[NEUTRAL.length - 1].dark;
const DARK_INK_LUMINANCE = luminance(DARK_INK);
const LIGHT_INK_LUMINANCE = luminance(LIGHT_INK);

/** Whichever ink contrasts harder with the given fill — used for step numbers. */
function inkOn(value: string): string {
  const l = luminance(value);
  return contrastRatio(l, DARK_INK_LUMINANCE) >= contrastRatio(l, LIGHT_INK_LUMINANCE)
    ? DARK_INK
    : LIGHT_INK;
}

/* ---------------------------------------------------------------------------
 * Doctrine copy
 * ------------------------------------------------------------------------- */

const SEMANTIC_SCALES: {
  name: "success" | "warning" | "destructive";
  usage: string;
}[] = [
  {
    name: "success",
    usage:
      "Confirmations only: a completed action, a healthy state, a verified result — and nothing else. Success is never decoration; there are no green illustration fills, no 'positive' branding, no emphasis.",
  },
  {
    name: "warning",
    usage:
      "Flags risk to an SLA or a degraded-but-functional state that will turn destructive if ignored. Warning predicts trouble; it does not report it.",
  },
  {
    name: "destructive",
    usage:
      "Destructive actions and live recording states — deletion, overwrite, the recording indicator. If everything is red, nothing is.",
  },
];

/** The Tailwind utility each singleton is consumed through. */
const SINGLETON_UTILITIES: Record<string, string> = {
  panel: "bg-panel",
  "default-background": "bg-default-background",
  "default-border": "border-default-border",
  "default-font": "text-default-font",
};

/* ---------------------------------------------------------------------------
 * Presenters
 * ------------------------------------------------------------------------- */

/** One step of the neutral grid — light value, step number, hex + rgb. */
function StepSwatch({ step }: { step: ColorStepDoc }) {
  const hex = toHex(step.light);
  return (
    <div className="overflow-hidden rounded-lg border border-default-border">
      <div
        className="flex h-14 items-start justify-start p-2"
        style={{ backgroundColor: step.light }}
        title={`neutral-${step.name} · ${hex} · light`}
      >
        <span
          className="font-code text-[11px] font-medium"
          style={{ color: inkOn(step.light) }}
        >
          {step.name}
        </span>
      </div>
      <div className="bg-panel px-2.5 py-2">
        <div className="font-code text-[11px] text-default-font">{hex}</div>
        <div className="mt-0.5 font-code text-[10px] text-neutral-400">
          {step.light}
        </div>
      </div>
    </div>
  );
}

/** One labeled ramp row — ten connected flex segments, values inside/below. */
function RampStrip({
  scale,
  steps,
  mode,
  compact = false,
  highlight,
}: {
  scale: string;
  steps: ColorStepDoc[];
  mode: "light" | "dark";
  compact?: boolean;
  /** Step name to ring — the anchor. */
  highlight?: string;
}) {
  return (
    <div className="flex">
      <div className="flex w-11 shrink-0 items-center justify-center border-r border-default-border bg-panel font-code text-[10px] uppercase tracking-[0.08em] text-neutral-400">
        {mode}
      </div>
      {steps.map((step) => {
        const value = mode === "light" ? step.light : step.dark;
        const hex = toHex(value);
        return (
          <div
            key={step.name}
            className="min-w-0 flex-1"
            title={`${scale}-${step.name} · ${hex} · ${mode}`}
          >
            <div
              className={`flex items-start justify-start p-1.5 ${
                compact ? "h-8" : "h-12"
              }${
                highlight === step.name
                  ? " ring-2 ring-inset ring-default-font/60"
                  : ""
              }`}
              style={{ backgroundColor: value }}
            >
              <span
                className="font-code text-[10px] font-medium"
                style={{ color: inkOn(value) }}
              >
                {step.name}
              </span>
            </div>
            {compact ? null : (
              <div className="truncate bg-panel px-1 py-1 text-center font-code text-[10px] text-neutral-400">
                {hex}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** One semantic scale — usage discipline, compact light/dark strips, anchor. */
function SemanticScale({
  name,
  usage,
}: {
  name: "success" | "warning" | "destructive";
  usage: string;
}) {
  const steps = COLOR_SCALES[name];
  const anchor = steps.find((step) => step.name === "500") ?? steps[0];
  return (
    <article>
      <h3 className="font-code text-[13px] font-medium text-default-font">
        {name}
      </h3>
      <p className="mt-1.5 max-w-[68ch] text-body-medium text-neutral-500">
        {usage}
      </p>
      <div className="mt-4 divide-y divide-default-border overflow-hidden rounded-lg border border-default-border">
        <RampStrip scale={name} steps={steps} mode="light" compact highlight="500" />
        <RampStrip scale={name} steps={steps} mode="dark" compact highlight="500" />
      </div>
      <p className="mt-2.5 font-code text-[11px] text-neutral-400">
        500 · anchor — {toHex(anchor.light)} light · {toHex(anchor.dark)} dark
      </p>
    </article>
  );
}

/** One singleton token card — light/dark halves, values, usage note. */
function SingletonCard({ singleton }: { singleton: ColorSingletonDoc }) {
  return (
    <div className="overflow-hidden rounded-lg border border-default-border bg-panel">
      <div className="flex h-14">
        <div
          className="flex flex-1 items-end justify-start p-2"
          style={{ backgroundColor: singleton.light }}
          title={`${singleton.name} · light · ${toHex(singleton.light)}`}
        >
          <span
            className="font-code text-[10px] font-medium"
            style={{ color: inkOn(singleton.light) }}
          >
            Light
          </span>
        </div>
        <div
          className="flex flex-1 items-end justify-end border-l border-default-border p-2"
          style={{ backgroundColor: singleton.dark }}
          title={`${singleton.name} · dark · ${toHex(singleton.dark)}`}
        >
          <span
            className="font-code text-[10px] font-medium"
            style={{ color: inkOn(singleton.dark) }}
          >
            Dark
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-code text-[13px] font-medium text-default-font">
            {singleton.name}
          </h3>
          <span className="font-code text-[10px] text-neutral-400">
            {SINGLETON_UTILITIES[singleton.name] ?? ""}
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-0.5">
          <div className="font-code text-[10px] text-neutral-600 dark:text-neutral-500">
            light · {toHex(singleton.light)} · {singleton.light}
          </div>
          <div className="font-code text-[10px] text-neutral-600 dark:text-neutral-500">
            dark · {toHex(singleton.dark)} · {singleton.dark}
          </div>
        </div>
        <p className="mt-3 text-body-medium text-neutral-500">
          {singleton.description}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Section
 * ------------------------------------------------------------------------- */

export function ColorSection() {
  return (
    <div className="flex flex-col gap-14">
      {/* Intro — the monochrome doctrine */}
      <div className="flex max-w-[68ch] flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
        <p>
          Praxis is monochrome by conviction: the brand ramp and the neutral
          ramp are the same ten values. <Token>brand-50</Token> through{" "}
          <Token>brand-900</Token> alias <Token>neutral-50</Token> through{" "}
          <Token>neutral-900</Token> exactly, so there is no accent hue to
          apply, retire, or grow tired of. The grays run warm — a few points
          of red and green carried over blue — so surfaces read as paper and
          ink rather than glass and steel. Identity comes from typography,
          material and rhythm; when color carries no meaning, the content
          does the talking.
        </p>
        <p>
          Semantic color appears only where meaning demands it:{" "}
          <Token>success</Token>, <Token>warning</Token> and{" "}
          <Token>destructive</Token> each exist as a single ten-step ramp
          with strict usage rules, and nothing else in the system is
          chromatic. Dark mode does not re-hue the palette — it inverts the
          neutral ramp, so the system stays monochrome in both directions
          while the semantic ramps re-anchor around their 500 steps for
          contrast against the dark canvas. Color this rare is believed:
          when something is red, it is red for a reason.
        </p>
      </div>

      {/* Neutral ramp — swatch grid, light values */}
      <Labeled label="Neutral ramp · light values">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {NEUTRAL.map((step) => (
            <StepSwatch key={step.name} step={step} />
          ))}
        </div>
        <p className="mt-3 text-caption text-neutral-400">
          <Token>brand-50…900</Token> alias these values step for step — the
          brand is the ramp, not a color beside it. The grid documents the
          light-mode values; the dark-mode values follow below.
        </p>
      </Labeled>

      {/* Connected strip — light and dark side by side */}
      <Labeled label="One ramp · light & dark">
        <div className="divide-y divide-default-border overflow-hidden rounded-lg border border-default-border">
          <RampStrip scale="neutral" steps={NEUTRAL} mode="light" />
          <RampStrip scale="neutral" steps={NEUTRAL} mode="dark" />
        </div>
        <p className="mt-3 text-caption text-neutral-400">
          Dark mode inverts the ramp end to end — the extremes trade places
          while the 500 midpoint barely moves. Warmth is constant; nothing is
          re-hued.
        </p>
      </Labeled>

      {/* Semantic scales */}
      <Labeled label="Semantic scales">
        <p className="mb-8 max-w-[68ch] text-body-medium text-neutral-500">
          Three ramps carry every chromatic meaning in the system. Each is
          anchored at its 500 step — the value buttons, text and icons are
          built from — and each is disciplined about where it may appear.
          Light values sit on the top row, dark values beneath; the anchor is
          ringed.
        </p>
        <div className="flex flex-col divide-y divide-default-border">
          {SEMANTIC_SCALES.map((scale, index) => (
            <div key={scale.name} className={index === 0 ? "pb-8" : "py-8"}>
              <SemanticScale name={scale.name} usage={scale.usage} />
            </div>
          ))}
        </div>
      </Labeled>

      {/* Singletons */}
      <Labeled label="Singletons">
        <div className="grid gap-4 sm:grid-cols-2">
          {COLOR_SINGLETONS.map((singleton) => (
            <SingletonCard key={singleton.name} singleton={singleton} />
          ))}
        </div>
        <p className="mt-3 text-caption text-neutral-400">
          <Token>panel</Token> is the tint source for the glass material
          system — every material level mixes it over the backdrop at 40–72%
          opacity. The other three are the canvas, the hairline and the ink
          all components inherit.
        </p>
      </Labeled>

      {/* Contrast */}
      <Note>
        <span className="font-medium">Contrast.</span> <Token>neutral-600</Token>{" "}
        on <Token>default-background</Token> passes AA for body text in light
        mode; <Token>neutral-500</Token> is reserved for large text and UI
        affordances (3.5:1). Never place text on steps{" "}
        <Token>neutral-50</Token>–<Token>neutral-200</Token> — they are
        surfaces and fills, not canvases. The <Token>success</Token> and{" "}
        <Token>destructive</Token> ramps are tuned for 4.5:1 at steps 500–700
        in light mode and 400–600 in dark.
      </Note>
    </div>
  );
}
