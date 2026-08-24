"use client";

/**
 * DoctrineSection — "The written law" block of the overview: the always /
 * never rule cards in a two-column layout (md:grid-cols-2), followed by the
 * closing paragraph. Cards reuse the site's card vocabulary (serif
 * heading-3 + body-medium on a bordered panel) with quiet mono markers;
 * literal values render as Token chips.
 */

import React from "react";
import { Labeled, Token } from "@/components/site/DocPage";

interface Rule {
  title: string;
  body: React.ReactNode;
}

const ALWAYS_RULES: Rule[] = [
  {
    title: "Monochrome first",
    body: "The working palette is warm gray, nothing more. Semantic color is a budget, spent only where meaning genuinely demands it — never as decoration, identity or emphasis.",
  },
  {
    title: "Serif for reading, sans for working, mono for data",
    body: "Three typefaces, three jobs. Source Serif 4 carries prose a person sits down to read; Inter carries the interface a person works in all day; IBM Plex Mono carries values a person compares — timestamps, tokens, code.",
  },
  {
    title: "Glass floats",
    body: "Liquid glass is for surfaces that float above the document — toolbars, sheets, scrims, menus. It is never an in-flow or crisp surface: a chart frame, a table or a form field is laid content, and takes panel and border, not blur.",
  },
  {
    title: "Counter-sheen stays",
    body: "The low sheen from the lower right answers the upper-left key light on every glass surface, and it is not decoration. Under dark content it is the cue that separates a refractive surface from the old cast look of a flat translucent fill.",
  },
  {
    title: "Members keep identity",
    body: (
      <>
        GlassChip is a member of the component family, not a mold for it.
        Never replace a family member with it wholesale: toolbar actions keep{" "}
        <Token>rounded-sm</Token>, chip actions keep the pill, and every member
        keeps the geometry it was given.
      </>
    ),
  },
];

const NEVER_RULES: Rule[] = [
  {
    title: "Never cast shadows on laid objects",
    body: "A cast shadow implies a light source and stacks gray mass under the panel. Shadows are reserved for true overlays — dialogs and popovers — where occlusion is real; laid objects separate optically.",
  },
  {
    title: "Never animate blur, sheens or shadows",
    body: (
      <>
        Blur, sheens and shadows are material properties, not motion
        properties — animating them re-renders the optics every frame and
        reads as flicker. Transitions touch color and opacity only, over{" "}
        <Token>150–200ms</Token>.
      </>
    ),
  },
  {
    title: "Never rely on CSS.supports for url() filters",
    body: (
      <>
        <Token>CSS.supports</Token> for a <Token>url()</Token> filter tests
        whether the engine can parse the declaration, not whether it will
        render it — Safari parses, then declines. Capability is decided by
        engine detection with a safe fallback direction, never by a parse
        test.
      </>
    ),
  },
  {
    title: "Never put text-bearing Thin over near-black content in light mode",
    body: "Thin is a 28px frost over a 50% tint — enough over calm content, not over near-black in light mode, where legibility collapses. Text-bearing surfaces over dark canvases start at Regular; Thin stays on scrims and hover chrome.",
  },
  {
    title: "Never introduce a second accent hue",
    body: "The warm gray is the accent; a second hue would instantly fragment the system's voice. If something seems to need a new color, the answer is hierarchy, weight or position — not hue.",
  },
];

function RuleCard({ rule, marker }: { rule: Rule; marker: string }) {
  return (
    <div className="rounded-lg border border-default-border bg-panel px-4 py-3.5">
      <div className="flex items-baseline gap-2.5">
        <span
          aria-hidden="true"
          className="font-code text-[12px] font-medium text-neutral-400"
        >
          {marker}
        </span>
        <h3 className="text-heading-3 font-heading-3 text-default-font">
          {rule.title}
        </h3>
      </div>
      <p className="mt-1.5 text-body-medium text-neutral-500">{rule.body}</p>
    </div>
  );
}

export function DoctrineSection() {
  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-2xl text-prose font-prose text-neutral-600 dark:text-neutral-500">
        Ten rules keep fifty components coherent — five things that are always
        true, five that are never allowed. They are short on purpose: the law
        is meant to be held in your head while you build.
      </p>

      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        <Labeled label="Always">
          <div className="flex flex-col gap-3">
            {ALWAYS_RULES.map((rule) => (
              <RuleCard key={rule.title} rule={rule} marker="✓" />
            ))}
          </div>
        </Labeled>
        <Labeled label="Never">
          <div className="flex flex-col gap-3">
            {NEVER_RULES.map((rule) => (
              <RuleCard key={rule.title} rule={rule} marker="✕" />
            ))}
          </div>
        </Labeled>
      </div>

      <div className="border-t border-default-border pt-6">
        <p className="max-w-2xl text-prose font-prose text-neutral-600 dark:text-neutral-500">
          The doctrine exists so that fifty components ship as one voice. Where
          the law has already decided, judgment is spent on the work rather
          than the styling — and every rule above was paid for somewhere: a
          shadow that read as decoration, a support query that passed while
          the render failed, a second hue that quietly fragmented the palette.
          None of it is preference. When in doubt, remove.
        </p>
      </div>
    </div>
  );
}
