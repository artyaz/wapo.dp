import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Typography — the shadcn "typeset" system: a set of CSS classes that typeset
 * raw HTML or rendered markdown, from blog posts to streaming chat.
 *
 * The styling lives in a single CSS block injected through React 19 style
 * hoisting (`<style href="typeset-css" precedence="medium">`), so it is
 * deduped and hoisted into <head> no matter how many Typography instances
 * render.
 *
 * Everything is driven by custom properties, so a whole document can be
 * retuned from one override:
 *
 *   --typeset-font-body / --typeset-font-heading / --typeset-font-mono
 *   --typeset-size      body font-size
 *   --typeset-leading   body line-height
 *   --typeset-flow      space between blocks
 *
 * The rules sit in `@layer components` (with Tailwind's canonical layer order
 * restated first, so the ordering holds no matter which stylesheet the
 * browser parses first). That means plain utilities — `text-lg`,
 * `text-muted-foreground`, `mt-4` — always win over the typeset styles, which
 * is what makes per-element overrides work.
 */

const TYPESET_CSS = `@layer theme, base, components, utilities;
@layer components {
  /* ── Scale ─────────────────────────────────────────────────── */
  .typeset {
    --typeset-font-body: inherit;
    --typeset-font-heading: var(--ds-font-heading-1, ui-serif, Georgia, serif);
    --typeset-font-mono: var(--ds-font-code, ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace);

    --typeset-size: 1em; /* body font-size */
    --typeset-leading: 1.75; /* body line-height */
    --typeset-flow: 1.25em; /* space between blocks */

    font-family: var(--typeset-font-body);
    font-size: var(--typeset-size);
    line-height: var(--typeset-leading);
    color: var(--foreground);
    text-wrap: pretty;
  }

  /* Density presets */
  .typeset-docs {
    --typeset-size: 15px;
    --typeset-flow: 1.5em;
  }
  .typeset-chat {
    --typeset-flow: 1em;
    --typeset-leading: 1.6;
  }

  /* Custom themes */
  .typeset-reading {
    --typeset-font-body: var(--ds-font-prose, ui-serif, Georgia, serif);
    --typeset-font-heading: var(--ds-font-prose, ui-serif, Georgia, serif);
    --typeset-size: 18px;
    --typeset-leading: 1.9;
    --typeset-flow: 2em;
  }
  .typeset-compact {
    --typeset-font-body: var(--ds-font-body, ui-sans-serif, system-ui, sans-serif);
    --typeset-font-heading: var(--ds-font-body, ui-sans-serif, system-ui, sans-serif);
    --typeset-size: 14px;
    --typeset-leading: 1.6;
    --typeset-flow: 1em;
  }

  /* Accessibility: larger type, roomier rhythm */
  .typeset-large {
    --typeset-size: 16px;
    --typeset-leading: 2;
    --typeset-flow: 2em;
  }

  /* Dark mode: a little more air between lines */
  .dark .typeset {
    --typeset-leading: 1.9;
  }

  /* ── Flow ──────────────────────────────────────────────────── */
  .typeset > * {
    margin-block-end: 0;
  }
  .typeset > * + * {
    margin-block-start: var(--typeset-flow);
  }
  .typeset > :first-child {
    margin-block-start: 0;
  }
  .typeset > :last-child {
    margin-block-end: 0;
  }

  /* Extra air before a heading that follows content */
  .typeset > * + :is(h1, h2, h3, h4, h5, h6) {
    margin-block-start: calc(var(--typeset-flow) * 1.75);
  }

  /* ── Headings ──────────────────────────────────────────────── */
  .typeset :is(h1, h2, h3, h4, h5, h6) {
    font-family: var(--typeset-font-heading);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }
  .typeset h1 {
    font-size: 1.875em;
  }
  .typeset h2 {
    font-size: 1.5em;
  }
  .typeset h3 {
    font-size: 1.25em;
  }
  .typeset h4 {
    font-size: 1.125em;
  }
  .typeset h5 {
    font-size: 1em;
  }
  .typeset h6 {
    font-size: 0.9375em;
    letter-spacing: 0.04em;
    color: var(--muted-foreground);
  }

  /* ── Links ─────────────────────────────────────────────────── */
  .typeset a {
    color: var(--primary);
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    text-decoration-color: color-mix(in oklab, var(--primary) 45%, transparent);
  }
  .typeset a:hover {
    text-decoration-color: var(--primary);
  }

  /* ── Lists ─────────────────────────────────────────────────── */
  .typeset :is(ul, ol) {
    padding-inline-start: 1.625em;
    list-style-position: outside;
  }
  .typeset ul {
    list-style-type: disc;
  }
  .typeset ol {
    list-style-type: decimal;
  }
  .typeset li {
    margin-block: 0.3em;
  }
  .typeset li::marker {
    color: var(--muted-foreground);
  }
  .typeset li > :is(ul, ol) {
    margin-block: 0.3em;
    padding-inline-start: 1.375em;
  }
  .typeset li > p {
    margin-block: 0.2em;
  }

  /* GFM task lists */
  .typeset li:has(> input[type="checkbox"]) {
    list-style-type: none;
  }
  .typeset li > input[type="checkbox"] {
    margin-inline-end: 0.5em;
    accent-color: var(--primary);
  }

  /* ── Blockquote ────────────────────────────────────────────── */
  .typeset blockquote {
    margin-inline: 0;
    padding-inline-start: 1.25em;
    border-inline-start: 2px solid var(--border);
    color: var(--muted-foreground);
    font-style: italic;
  }
  .typeset blockquote > p + p {
    margin-block-start: 0.75em;
  }

  /* ── Code ──────────────────────────────────────────────────── */
  .typeset code {
    font-family: var(--typeset-font-mono);
    font-variant-ligatures: none;
    font-size: 0.875em;
  }
  .typeset :not(pre) > code {
    background-color: var(--muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm, 3px);
    padding: 0.1em 0.4em;
    font-size: 0.85em;
    white-space: nowrap;
  }
  .typeset pre {
    background-color: var(--muted);
    border: 1px solid var(--border);
    border-radius: var(--radius, 8px);
    padding: 0.875em 1em;
    overflow-x: auto;
    font-family: var(--typeset-font-mono);
    font-size: 0.8125em;
    line-height: 1.7;
    font-variant-ligatures: none;
    tab-size: 2;
  }
  .typeset pre code {
    background-color: transparent;
    border: 0;
    border-radius: 0;
    padding: 0;
    font-size: inherit;
    white-space: inherit;
  }

  /* ── Tables ────────────────────────────────────────────────── */
  .typeset table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9375em;
    line-height: 1.5;
    font-variant-numeric: tabular-nums;
    text-align: start;
  }
  .typeset :is(th, td) {
    padding: 0.5em 0.75em;
    text-align: inherit;
    vertical-align: top;
    border-block-end: 1px solid var(--border);
  }
  .typeset thead th {
    font-weight: 600;
    white-space: nowrap;
    border-block-end: 1px solid var(--muted-foreground);
  }
  .typeset tbody tr:last-child :is(th, td) {
    border-block-end: 0;
  }
  .typeset caption {
    margin-block-start: 0.75em;
    color: var(--muted-foreground);
    font-size: 0.875em;
    text-align: start;
  }

  /* ── Rules & media ─────────────────────────────────────────── */
  .typeset hr {
    margin-block: calc(var(--typeset-flow) * 1.25);
    border: none;
    border-block-start: 1px solid var(--border);
  }
  .typeset img {
    max-inline-size: 100%;
    block-size: auto;
    border-radius: var(--radius, 8px);
  }
  .typeset figure {
    margin-inline: 0;
  }
  .typeset figcaption {
    margin-block-start: 0.5em;
    color: var(--muted-foreground);
    font-size: 0.875em;
    text-align: center;
  }

  /* ── Emphasis & inline ─────────────────────────────────────── */
  .typeset strong {
    font-weight: 600;
  }
  .typeset em {
    font-style: italic;
  }
  .typeset kbd {
    font-family: var(--typeset-font-mono);
    font-size: 0.8125em;
    background-color: var(--muted);
    border: 1px solid var(--border);
    border-block-end-width: 2px;
    border-radius: var(--radius-sm, 3px);
    padding: 0.1em 0.4em;
  }

  /* ── Responsive tables ─────────────────────────────────────── */
  .typeset-scroll {
    overflow-x: auto;
    scrollbar-width: thin;
  }

  /* ── Streaming cursor ──────────────────────────────────────── */
  .typeset .streaming-cursor::after {
    content: "";
    display: inline-block;
    inline-size: 0.5em;
    block-size: 1.05em;
    margin-inline-start: 0.15em;
    vertical-align: text-bottom;
    border-radius: 1px;
    background-color: currentcolor;
    animation: typeset-cursor-blink 1.1s steps(2, start) infinite;
  }
  @keyframes typeset-cursor-blink {
    to {
      visibility: hidden;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .typeset .streaming-cursor::after {
      animation: none;
    }
  }

  /* ── Opting out ────────────────────────────────────────────── */
  /* revert-layer rolls every property this layer sets back to what it
     would be without the typeset — base layer, utilities, UA and inline
     styles are untouched, so embedded components render exactly as they
     would outside the typeset. */
  .typeset .not-typeset,
  .typeset .not-typeset * {
    margin-block: revert-layer;
    margin-inline: revert-layer;
    padding-block: revert-layer;
    padding-inline: revert-layer;
    border: revert-layer;
    border-radius: revert-layer;
    background-color: revert-layer;
    color: revert-layer;
    font-family: revert-layer;
    font-size: revert-layer;
    font-weight: revert-layer;
    font-style: revert-layer;
    line-height: revert-layer;
    letter-spacing: revert-layer;
    list-style-type: revert-layer;
    list-style-position: revert-layer;
    text-align: revert-layer;
    text-decoration: revert-layer;
    vertical-align: revert-layer;
    white-space: revert-layer;
  }
}
`

/** Density/theme preset applied on top of the base `typeset` scale. */
export type TypographyVariant =
  | "default"
  | "docs"
  | "chat"
  | "reading"
  | "compact"
  | "large"

const TYPESET_VARIANTS: Record<TypographyVariant, string> = {
  default: "",
  docs: "typeset-docs",
  chat: "typeset-chat",
  reading: "typeset-reading",
  compact: "typeset-compact",
  large: "typeset-large",
}

/**
 * Class string for a typeset container, e.g. "typeset typeset-docs".
 * Use it directly when you need the scale without the wrapper component:
 *
 *   <article className={typographyClasses("chat")}>{message}</article>
 */
export function typographyClasses(
  variant: TypographyVariant = "docs"
): string {
  return cn("typeset", TYPESET_VARIANTS[variant])
}

/**
 * A div that typesets its children — rendered HTML or markdown output.
 *
 *   <Typography variant="docs">
 *     <Markdown content={content} />
 *   </Typography>
 *
 * Custom properties can be retuned per instance with an arbitrary-property
 * utility: `<Typography variant="default" className="[--typeset-flow:1.75em]" />`.
 * Elements can opt out with the `not-typeset` class, and wide tables can be
 * wrapped in `className="typeset-scroll"` for horizontal scrolling.
 */
function Typography({
  className,
  variant = "docs",
  ...props
}: React.ComponentProps<"div"> & {
  /** Density preset: "docs", "chat", or one of the theme presets. */
  variant?: TypographyVariant
}) {
  return (
    <>
      <style href="typeset-css" precedence="medium">
        {TYPESET_CSS}
      </style>
      <div
        data-slot="typography"
        data-variant={variant}
        className={cn(typographyClasses(variant), className)}
        {...props}
      />
    </>
  )
}

export { Typography }
