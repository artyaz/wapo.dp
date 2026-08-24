"use client";

/**
 * FoundationsIntroSection — the "Design language" doctrine essay: four
 * paragraphs on calm, the monochrome commitment, materials over decoration
 * and who the system serves; a three-panel "doctrine in practice" strip
 * (do / gradient don't / cast-shadow don't); and the token-naming note
 * (Tailwind utilities mapped from --ds-* custom properties, no dark: prefix).
 */

import { twClassNames } from "@/lib/subframe/utils";
import { Labeled, Note, Token } from "@/components/site/DocPage";

/* ------------------------------------------------------------------------ */
/* The doctrine essay — the system's voice.                                  */
/* ------------------------------------------------------------------------ */

const DOCTRINE_PARAGRAPHS: string[] = [
  "Praxis is calm and straightforward in the most literal sense: nothing on a page exists to be decorated. There are no gradient fills, no decorative chips, no illustrative flourishes — no element whose primary job is to be looked at. Every scrap of visual interest is earned the quiet way: through typographic hierarchy, where the important thing is simply the largest legible thing on the page; through warm-gray material depth, where one surface sits above another because it refracts more of what is behind it; and through whitespace treated as structure, not as leftover margin. The system trusts content to carry the experience — a latency graph, a diff, a log stream are the most interesting things on the screen, and any chrome that competes with them is a defect.",

  "The palette is monochrome by conviction. The brand ramp and the neutral ramp are the same ten warm grays, step for step — the brand is paper and ink, so applying it never shifts a single hue. The only color in the system is semantic — success, warning, destructive — and it always means something: a verified state, a risk to an SLA, an action that cannot be undone. Hue is never spent on emphasis, grouping, or delight. That scarcity is what makes it powerful: because color appears almost nowhere, the eye reads it as signal the instant it appears, and a single destructive dot in a field of warm gray outweighs any banner a louder system could paint.",

  "Texture comes from materials instead of decoration. A Praxis surface can be translucent, blurred, and saturation-boosted, with a specular highlight along its top edge — real optical behavior where a gradient would only fake one. The distinction matters: a gradient is paint, and paint describes how a designer felt about a surface, while a material describes how the surface behaves. Glass bends the content behind it, catches light on its rim, and reads as physically above the canvas without casting anything. Surfaces feel physical because they act physically — they bend light — and that is the whole trick: optics do the work other systems spend on ornament.",

  "The system is built for tool-builders — editors, monitors, IDE-like surfaces — software whose users stare at dense information for hours a day. For them, calm is not an aesthetic preference; it is fatigue management. Every ornament the interface sheds is one more thing the eye stops having to filter out at hour six. Density is welcome — Praxis assumes tables of numbers, nested trees, and stacked timelines — but noise is not. The measure of a Praxis screen is that after a full day inside it, the content is what the user remembers and the interface is what they never noticed.",
];

/* ------------------------------------------------------------------------ */
/* Doctrine-in-practice strip                                                */
/* ------------------------------------------------------------------------ */

type PracticeVariant = "do" | "gradient" | "shadow";

interface PracticePanelDoc {
  /** Panel verdict, e.g. "Do" or "Don't — gradient fill". */
  title: string;
  /** What the panel's composition demonstrates. */
  caption: string;
  /** Which rule the composition follows or breaks. */
  variant: PracticeVariant;
}

const PRACTICE_PANELS: PracticePanelDoc[] = [
  {
    title: "Do",
    variant: "do",
    caption: "border + bg-panel — the type does the work",
  },
  {
    title: "Don't — gradient fill",
    variant: "gradient",
    caption: "linear-gradient(135deg, slate-700, slate-500) — decoration, not information",
  },
  {
    title: "Don't — cast shadow",
    variant: "shadow",
    caption: "shadow-default on a laid object — the one cast shadow is reserved for true overlays",
  },
];

/**
 * The shared composition: a Card-like bordered panel carrying a
 * StatTile-like label / value / footer, in the real components' visual
 * language. The `gradient` variant swaps the panel fill for a slate-gray
 * diagonal gradient (monochrome even in don'ts) and uses literal light
 * text colors, since the fill is mode-independent; the `shadow` variant
 * adds the shadow-default cast shadow.
 *
 * NOTE: text-size and text-color utilities are combined in plain literal
 * strings on purpose — twClassNames/twMerge would drop `text-caption` when
 * a `text-{color}` utility is present in the same merge.
 */
function PracticeCard({ variant }: { variant: PracticeVariant }) {
  const isGradient = variant === "gradient";
  return (
    <div
      className={twClassNames(
        "flex w-full max-w-[192px] flex-col items-start gap-1.5 rounded-lg border border-solid px-4 py-4",
        variant === "shadow" && "shadow-default",
        isGradient ? "border-white/25" : "border-default-border bg-panel"
      )}
      style={
        isGradient
          ? {
              backgroundImage:
                "linear-gradient(135deg, rgb(51 65 85) 0%, rgb(100 116 139) 100%)",
            }
          : undefined
      }
    >
      <span
        className={
          isGradient
            ? "text-caption font-caption uppercase tracking-[0.1em]"
            : "text-caption font-caption uppercase tracking-[0.1em] text-neutral-500"
        }
        style={isGradient ? { color: "rgba(241 245 249, 0.8)" } : undefined}
      >
        p99 latency
      </span>
      <span
        className={
          isGradient
            ? "font-code text-[28px] font-[600] leading-[28px] tabular-nums"
            : "font-code text-[28px] font-[600] leading-[28px] text-default-font tabular-nums"
        }
        style={isGradient ? { color: "rgb(248 250 252)" } : undefined}
      >
        42.1ms
      </span>
      <span
        className={
          isGradient
            ? "text-caption font-caption"
            : "text-caption font-caption text-neutral-400"
        }
        style={isGradient ? { color: "rgba(226 232 240, 0.7)" } : undefined}
      >
        rolling 15m · all regions
      </span>
    </div>
  );
}

/** One strip panel: verdict title, neutral-100 demo field with the shared
 *  composition (plus a subtle ✕ ring badge on the don'ts), mono caption. */
function DoctrinePanel({ title, variant, caption }: PracticePanelDoc) {
  const isDo = variant === "do";
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-default-border p-4">
      <span
        className={twClassNames(
          "font-code text-[11px] font-medium tracking-[0.12em] uppercase",
          isDo ? "text-default-font" : "text-neutral-500"
        )}
      >
        {title}
      </span>
      <div className="relative flex min-h-[140px] items-center justify-center rounded-md bg-neutral-100 p-5">
        <PracticeCard variant={variant} />
        {isDo ? null : (
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-[9999px] bg-default-background font-code text-[10px] leading-none text-neutral-500 ring-1 ring-neutral-500"
          >
            ✕
          </span>
        )}
      </div>
      <p className="font-code text-[11px] leading-[1.7] text-neutral-400">
        {caption}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

export function FoundationsIntroSection() {
  return (
    <div className="flex flex-col gap-12">
      {/* ------------------------------------------------- Doctrine essay */}
      <div className="flex max-w-2xl flex-col gap-5 text-prose font-prose text-neutral-600 dark:text-neutral-500">
        {DOCTRINE_PARAGRAPHS.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* ---------------------------------------- Doctrine in practice */}
      <Labeled label="Doctrine in practice">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PRACTICE_PANELS.map((panel) => (
            <DoctrinePanel key={panel.variant} {...panel} />
          ))}
        </div>
      </Labeled>

      {/* --------------------------------------------- Token naming note */}
      <Labeled label="Token naming">
        <Note>
          <p>
            Tokens are consumed as Tailwind utilities mapped from CSS custom
            properties. The <Token>--ds-*</Token> variables switch their
            values under <Token>.dark</Token>, while the utilities built on
            them stay identical — one class is correct in both modes, and no{" "}
            <Token>dark:</Token> prefix is ever needed.
          </p>
          <p className="mt-2.5 font-code text-[12px] leading-[1.7] text-default-font">
            bg-panel/60 · light rgb(255 255 255 / 0.60) · dark rgb(21 21 19 /
            0.60)
          </p>
        </Note>
      </Labeled>
    </div>
  );
}
