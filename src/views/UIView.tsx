"use client";

/**
 * UIView — the shadcn/ui component gallery: 63 components, 423 live demos.
 * Each card links to a detail page with variant tabs rendering the demos live.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Link } from "@/components/site/HashRouter";
import { UI_REGISTRY } from "@/lib/docs/ui-registry-loader";

const SEARCH_HINTS: Record<string, string> = {
  accordion: "Collapsible heading stacks",
  alert: "Callouts and banners",
  attachment: "File cards with upload states",
  avatar: "Identity, groups, badges",
  bubble: "Chat message bubbles",
  "button-group": "Joined button rows",
  calendar: "Date selection grids",
  carousel: "Embla slide tracks",
  chart: "Recharts containers",
  combobox: "Filterable selection",
  "data-table": "TanStack tables",
  "date-picker": "Popover calendars",
  field: "Accessible form fields",
  "input-group": "Inputs with addons",
  item: "Media rows and lists",
  kbd: "Keyboard key caps",
  marker: "Inline status notes",
  message: "Chat turns with avatars",
  "message-scroller": "Anchored chat scrolling",
  questionnaire: "Multi-step forms",
  sidebar: "Collapsible app navigation",
  typography: "Typeset markdown",
};

export function UIView() {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return UI_REGISTRY;
    return UI_REGISTRY.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.includes(q) ||
        (SEARCH_HINTS[c.slug] ?? "").toLowerCase().includes(q) ||
        c.variants.some((v) => v.title.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6">
      <header className="mb-10 max-w-3xl">
        <span className="font-code text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
          UI Library
        </span>
        <h1 className="mt-3 text-heading-1 font-heading-1 text-default-font">
          The component collection
        </h1>
        <p className="mt-4 text-prose font-prose text-neutral-600 dark:text-neutral-500">
          Sixty-three shadcn/ui components — four hundred and twenty-three live
          demos, rendered from the same code this site runs. Inputs and
          surfaces, chat primitives and data tables, calendars and charts; every
          one of them typed, themed, and interactive in this page.
        </p>
        <p className="mt-5 font-code text-[11px] tracking-[0.08em] text-neutral-400 uppercase">
          {UI_REGISTRY.length} components · {UI_REGISTRY.reduce((n, c) => n + c.variants.length, 0)} demos
        </p>
      </header>

      <div className="sticky top-14 z-30 -mx-4 mb-8 border-b border-default-border bg-default-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div role="search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components…"
            aria-label="Search UI components"
            className="w-full rounded-md border border-default-border bg-panel px-3 py-2 text-body-medium text-default-font outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            to={`/ui/${c.slug}`}
            className={twClassNames(
              "group flex flex-col rounded-lg border border-default-border bg-panel p-4 transition-colors hover:border-neutral-400"
            )}
          >
            <span className="font-heading-3 text-[15px] font-semibold text-default-font">
              {c.name}
            </span>
            <span className="mt-1 text-caption text-neutral-500">
              {SEARCH_HINTS[c.slug] ?? "Component"}
            </span>
            <span className="mt-3 font-code text-[11px] tracking-[0.06em] text-neutral-400 uppercase">
              {c.variants.length} demo{c.variants.length === 1 ? "" : "s"}
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-24 text-center">
          <span className="font-heading-3 text-default-font">
            No components match “{query}”
          </span>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="cursor-pointer text-body-medium text-neutral-500 underline underline-offset-4 hover:text-default-font"
          >
            Clear search
          </button>
        </div>
      ) : null}
    </div>
  );
}
