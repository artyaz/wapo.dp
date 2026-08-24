"use client";

/**
 * TypographySection — the type foundations of Praxis: three typefaces with
 * strict roles, the nine text-style specimens, per-family cards, working
 * rules and the full scale table, all rendered from the token data in
 * foundations-data.ts.
 */

import {
  TYPOGRAPHY_STYLES,
  type FontFamilyName,
  type TypographyStyleDoc,
} from "@/lib/docs/foundations-data";
import { Labeled, Note, Token } from "@/components/site/DocPage";

/* ---------------------------------------------------------------------------
 * Specimens — each style rendered in its own utilities
 * ------------------------------------------------------------------------- */

/** The Tailwind pair every specimen renders in — its own classes, nothing else. */
const STYLE_CLASSES: Record<string, string> = {
  body: "text-body font-body",
  "body-medium": "text-body-medium font-body-medium",
  caption: "text-caption font-caption",
  "heading-1": "text-heading-1 font-heading-1",
  "heading-2": "text-heading-2 font-heading-2",
  "heading-3": "text-heading-3 font-heading-3",
  prose: "text-prose font-prose",
  default: "text-default font-default",
  code: "text-code font-code tabular-nums",
};

/** Realistic sample lines — headings, body and data each say their own line. */
const STYLE_SAMPLES: Record<string, string> = {
  body: "Body text carries the work",
  "body-medium": "Body text carries the work",
  caption: "12 files · updated 4 minutes ago",
  "heading-1": "Headings set the editorial voice",
  "heading-2": "Headings set the editorial voice",
  "heading-3": "Headings set the editorial voice",
  prose:
    "Long-form prose keeps the measure generous and the rhythm slow — the serif is doing the work, so nothing else has to.",
  default: "Body text carries the work",
  code: "01:42:07 · rec_0482",
};

/** "28px / 35 · 600 · -0.01em · Source Serif 4" — the spec string per style. */
function specString(style: TypographyStyleDoc): string {
  const lineHeight = style.lineHeight.replace("px", "");
  return `${style.size} / ${lineHeight} · ${style.weight} · ${style.letterSpacing} · ${style.family}`;
}

/* ---------------------------------------------------------------------------
 * Typeface cards — one per family
 * ------------------------------------------------------------------------- */

interface TypefaceCard {
  family: FontFamilyName;
  /** Font utility the large glyph specimen renders in. */
  glyphClass: string;
  role: string;
  /** The font-* utilities that map to this family. */
  utilities: string[];
  /** Which text styles it sets. */
  sets: string;
  /** The fallback stack exactly as authored in globals.css. */
  stack: string;
}

const TYPEFACE_CARDS: TypefaceCard[] = [
  {
    family: "Inter",
    glyphClass: "font-body",
    role: "The interface face. Every label, control, menu item and table cell is set in Inter — anything a person interacts with carries its neutral warmth. The body enables cv11 and ss01 so its letterforms match the Subframe export.",
    utilities: ["font-body", "font-body-medium", "font-caption", "font-default"],
    sets: "sets body · body-medium · caption · default",
    stack: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
  {
    family: "Source Serif 4",
    glyphClass: "font-heading-1",
    role: "The reading face. Headings and long-form prose — the serif is what gives Praxis its calm editorial voice, softening the interface without decorating it. It never appears below 17px, where the strokes turn to noise.",
    utilities: ["font-heading-1", "font-heading-2", "font-heading-3", "font-prose"],
    sets: "sets heading-1 · heading-2 · heading-3 · prose",
    stack: "var(--font-source-serif-4), ui-serif, Georgia, serif",
  },
  {
    family: "IBM Plex Mono",
    glyphClass: "font-code",
    role: "The data face. Code, terminal output, timecodes and any number that changes — mono’s fixed cells keep digits from jittering. It also captions this documentation: every token, spec string and eyebrow is font-code.",
    utilities: ["font-code"],
    sets: "sets code",
    stack: 'var(--font-ibm-plex-mono), ui-monospace, "SFMono-Regular", Menlo, monospace',
  },
];

/* ---------------------------------------------------------------------------
 * Rules
 * ------------------------------------------------------------------------- */

const RULES: { title: string; detail: string }[] = [
  {
    title: "Headings are serif",
    detail:
      "Every page, section and card title sets in Source Serif 4 — text-heading-1, -2 or -3. The serif is the system’s only decorative gesture.",
  },
  {
    title: "Everything interactive is Inter",
    detail:
      "Buttons, fields, menus, tabs, table cells — if a person acts on it, it’s font-body or font-caption. Serif never appears on a control.",
  },
  {
    title: "Numbers that change are always font-code tabular-nums",
    detail:
      "Timecodes, counters, durations, coordinates — fixed-width digits stop the layout from jittering as values tick.",
  },
  {
    title: "Captions are caption 13/19",
    detail:
      "Metadata, timestamps and helper annotations all use text-caption — the smallest voice in the system, and never anything smaller.",
  },
  {
    title: "Prose is for long-form only",
    detail:
      "text-prose (19/31 serif) is reserved for article and documentation bodies. Product copy stays in the body styles.",
  },
  {
    title: "Never use serif below 17px",
    detail:
      "heading-3 at 17px is the floor — below that the serif’s stroke contrast turns to visual noise. Smaller text is Inter or IBM Plex Mono.",
  },
];

/* ---------------------------------------------------------------------------
 * Section
 * ------------------------------------------------------------------------- */

export function TypographySection() {
  return (
    <div className="flex flex-col gap-14">
      {/* Intro */}
      <div className="flex max-w-[68ch] flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
        <p>
          Praxis sets text in three typefaces, and each one has a strict job.
          Inter is the interface face — UI labels, controls, menus and data
          readouts, everything a person acts on. Source Serif 4 is the reading
          face — headings and long-form prose, and the source of the system’s
          calm editorial voice. IBM Plex Mono is the data face — code, tabular
          numbers, timestamps, and the token captions running through this
          documentation.
        </p>
        <p>
          Together they carry the nine text styles below — the complete set;
          there is no other sizing in the system. Inter runs with{" "}
          <Token>{'font-feature-settings: "cv11", "ss01"'}</Token> (a
          single-storey “a” and the alternate digit forms), applied once on the
          body so the whole product matches the Subframe export. Every style
          pairs a <Token>text-*</Token> utility with its <Token>font-*</Token>{" "}
          family, and every specimen on this page renders in exactly those
          classes.
        </p>
      </div>

      {/* Specimens */}
      <Labeled label="Type specimens">
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-default-border bg-panel px-6">
            {TYPOGRAPHY_STYLES.map((style) => (
              <div
                key={style.name}
                className="border-b border-default-border py-5 last:border-b-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-code text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                    {style.name}
                  </span>
                  <span className="font-code text-[11px] tabular-nums text-neutral-400">
                    {specString(style)}
                  </span>
                </div>
                <p
                  className={`mt-2.5 text-default-font ${STYLE_CLASSES[style.name]}`}
                >
                  {STYLE_SAMPLES[style.name]}
                </p>
              </div>
            ))}
          </div>
          <Note>
            Pair them: <Token>text-heading-1</Token> carries the size, weight,
            tracking and line height, but only <Token>font-heading-1</Token>{" "}
            sets the family — a heading styled with <Token>text-heading-1</Token>{" "}
            alone will silently render in Inter.
          </Note>
        </div>
      </Labeled>

      {/* Typeface cards */}
      <Labeled label="The three typefaces">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TYPEFACE_CARDS.map((card) => (
            <article
              key={card.family}
              className="flex flex-col rounded-lg border border-default-border bg-panel p-6"
            >
              <span
                className={`text-[40px] leading-[1.1] text-default-font ${card.glyphClass}`}
              >
                Aa
              </span>
              <h3 className="mt-5 text-heading-3 font-heading-3 text-default-font">
                {card.family}
              </h3>
              <p className="mt-2 text-body-medium text-neutral-500">
                {card.role}
              </p>
              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {card.utilities.map((utility) => (
                    <Token key={utility}>{utility}</Token>
                  ))}
                </div>
                <p className="mt-2.5 text-caption text-neutral-400">
                  {card.sets}
                </p>
                <p className="mt-4 border-t border-default-border pt-3 font-code text-[11px] leading-relaxed text-neutral-400">
                  {card.stack}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Labeled>

      {/* Rules */}
      <Labeled label="Working rules">
        <ol>
          {RULES.map((rule, index) => (
            <li
              key={rule.title}
              className="flex gap-4 border-t border-default-border py-3.5 first:border-t-0 first:pt-0 last:pb-0"
            >
              <span className="pt-0.5 font-code text-[11px] tabular-nums text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-body-medium font-medium text-default-font">
                  {rule.title}
                </p>
                <p className="mt-1 text-body-medium text-neutral-500">
                  {rule.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Labeled>

      {/* Scale table */}
      <Labeled label="The full scale">
        <div className="overflow-x-auto rounded-lg border border-default-border">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-default-border bg-default-font/[0.03]">
                {[
                  "Style",
                  "Family",
                  "Size",
                  "Line height",
                  "Weight",
                  "Tracking",
                  "Usage",
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="whitespace-nowrap px-4 py-2.5 font-code text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPOGRAPHY_STYLES.map((style) => (
                <tr
                  key={style.name}
                  className="border-b border-default-border last:border-b-0 hover:bg-default-font/[0.03]"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-code text-[12px] text-default-font">
                    text-{style.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-body-medium text-default-font">
                    {style.family}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-code text-[12px] tabular-nums text-neutral-600 dark:text-neutral-500">
                    {style.size}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-code text-[12px] tabular-nums text-neutral-600 dark:text-neutral-500">
                    {style.lineHeight}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-code text-[12px] tabular-nums text-neutral-600 dark:text-neutral-500">
                    {style.weight}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-code text-[12px] tabular-nums text-neutral-600 dark:text-neutral-500">
                    {style.letterSpacing}
                  </td>
                  <td className="px-4 py-3 text-body-medium text-neutral-500">
                    {style.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-caption text-neutral-400">
          All nine styles exactly as authored in theme.css — size, line height,
          weight and tracking travel together as one token and are never
          recombined by hand.
        </p>
      </Labeled>
    </div>
  );
}
