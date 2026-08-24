"use client";

/**
 * ComponentsView — the component gallery.
 *
 * Searchable, filterable index of every ported component. Each card renders a
 * LIVE mini preview loaded from the registry's per-component demo chunk:
 * demos arrive progressively in small idle-time batches (never fifty dynamic
 * imports at once) and sit behind per-card error boundaries, so a single
 * throwing demo degrades quietly instead of unwinding the gallery.
 */

import React from "react";
import type { ComponentType } from "react";
import { Link } from "@/components/site/HashRouter";
import { twClassNames } from "@/lib/subframe/utils";
import {
  COMPONENT_REGISTRY,
  getCategoryCounts,
  loadComponentDemo,
  loadComponentMeta,
} from "@/lib/docs/registry";
import type { RegistryEntry } from "@/lib/docs/registry";
import { CATEGORIES } from "@/lib/docs/types";
import type { Category, CategoryId, ComponentMeta } from "@/lib/docs/types";

/* ------------------------------------------------------------------------ */
/* Static index preparation — module scope, fully deterministic             */
/* ------------------------------------------------------------------------ */

const CATEGORY_BY_ID: ReadonlyMap<CategoryId, Category> = new Map(
  CATEGORIES.map((category) => [category.id, category]),
);

/** Registry order: category order first, then component name. */
const CATEGORY_ORDER: ReadonlyMap<CategoryId, number> = new Map(
  CATEGORIES.map((category, index) => [category.id, index]),
);

const SORTED_ENTRIES: RegistryEntry[] = [...COMPONENT_REGISTRY].sort((a, b) => {
  const orderA = CATEGORY_ORDER.get(a.category) ?? CATEGORIES.length;
  const orderB = CATEGORY_ORDER.get(b.category) ?? CATEGORIES.length;
  if (orderA !== orderB) return orderA - orderB;
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
});

const TOTAL = COMPONENT_REGISTRY.length;
const CATEGORY_COUNTS = getCategoryCounts();

/** Demos load in small batches between idle ticks — never all at once. */
const DEMO_BATCH_SIZE = 6;

const NO_DEMOS: ReadonlyMap<string, ComponentType> = new Map();
const NO_METAS: ReadonlyMap<string, ComponentMeta> = new Map();

type CategoryFilter = CategoryId | "all";

/* ------------------------------------------------------------------------ */
/* Mini preview pieces                                                       */
/* ------------------------------------------------------------------------ */

/**
 * Error boundary for one mini preview. A demo that throws during render or
 * updates is replaced by a quiet font-code fallback carrying the component
 * name — the gallery itself never goes down.
 */
class DemoPreviewBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { failed: boolean }
> {
  constructor(props: { name: string; children: React.ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(error: unknown): void {
    if (typeof console !== "undefined" && typeof console.warn === "function") {
      console.warn(`[praxis] component preview failed: ${this.props.name}`, error);
    }
  }

  render(): React.ReactNode {
    if (this.state.failed) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-code text-[11px] tracking-[0.08em] text-neutral-400">
            {this.props.name}
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * One gallery card. Memoized so that progressively arriving demo chunks (or
 * keystrokes in the search box) re-render only the cards whose preview
 * actually changed — mounted live demos are never needlessly re-rendered.
 */
const ComponentCard = React.memo(function ComponentCard({
  entry,
  categoryName,
  Demo,
}: {
  entry: RegistryEntry;
  categoryName: string;
  Demo: ComponentType | null;
}) {
  return (
    <Link
      to={`/components/${entry.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-default-border bg-panel p-4 transition-colors hover:border-neutral-400"
    >
      <span className="font-code text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
        {categoryName}
      </span>
      <span className="text-heading-3 font-heading-3 text-default-font">
        {entry.name}
      </span>

      {/* live mini preview — the demo's natural size, clipped by the frame */}
      <div
        aria-hidden="true"
        className="relative h-36 overflow-hidden rounded-md border border-default-border/60 bg-default-background p-3"
      >
        {Demo ? (
          <div className="pointer-events-none h-full">
            <DemoPreviewBoundary name={entry.name}>
              <Demo />
            </DemoPreviewBoundary>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="animate-pulse font-code text-[11px] tracking-[0.08em] text-neutral-400">
              {entry.name}
            </span>
          </div>
        )}
      </div>

      <span className="flex items-center justify-between gap-3 font-code text-[11px] text-neutral-400">
        <span className="truncate">{entry.slug}</span>
        <span
          aria-hidden="true"
          className="flex-none text-neutral-300 transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-300"
        >
          →
        </span>
      </span>
    </Link>
  );
});

/* ------------------------------------------------------------------------ */
/* View                                                                      */
/* ------------------------------------------------------------------------ */

export function ComponentsView() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const [demos, setDemos] = React.useState<ReadonlyMap<string, ComponentType>>(NO_DEMOS);
  const [metas, setMetas] = React.useState<ReadonlyMap<string, ComponentMeta>>(NO_METAS);

  /**
   * Progressive preview loading: batches of DEMO_BATCH_SIZE slugs walk the
   * sorted registry, each batch kicked off from an idle callback (falling
   * back to a short timeout where requestIdleCallback is unavailable). Meta
   * modules ride along with each batch so search picks up tags and
   * descriptions without a second wave of imports.
   */
  React.useEffect(() => {
    let cancelled = false;
    let cursor = 0;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const advance = () => {
      if (cancelled) return;
      const batch = SORTED_ENTRIES.slice(cursor, cursor + DEMO_BATCH_SIZE);
      cursor += batch.length;
      if (batch.length === 0) return;

      void Promise.all(
        batch.map(async (entry) => {
          const [demo, meta] = await Promise.all([
            loadComponentDemo(entry.slug),
            loadComponentMeta(entry.slug),
          ]);
          return { slug: entry.slug, demo, meta };
        }),
      )
        .then((results) => {
          if (cancelled) return;
          setDemos((prev) => {
            const next = new Map(prev);
            for (const result of results) {
              if (result.demo) next.set(result.slug, result.demo.Demo);
            }
            return next;
          });
          setMetas((prev) => {
            const next = new Map(prev);
            for (const result of results) {
              if (result.meta) next.set(result.slug, result.meta);
            }
            return next;
          });
          schedule();
        })
        .catch(() => {
          if (!cancelled) schedule();
        });
    };

    const schedule = () => {
      if (cancelled || cursor >= SORTED_ENTRIES.length) return;
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(() => advance(), { timeout: 500 });
      } else {
        timeoutHandle = window.setTimeout(() => advance(), 64);
      }
    };

    schedule();
    return () => {
      cancelled = true;
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  const trimmed = query.trim();
  const searching = trimmed.length > 0;

  /** Client-side filter: name / slug / category, plus tags and description
   *  once the matching meta module has arrived. All terms must match (AND). */
  const visible = React.useMemo(() => {
    const terms = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
    return SORTED_ENTRIES.filter((entry) => {
      if (activeCategory !== "all" && entry.category !== activeCategory) {
        return false;
      }
      if (terms.length === 0) return true;
      const meta = metas.get(entry.slug);
      const haystack = [
        entry.name,
        entry.slug,
        entry.category,
        CATEGORY_BY_ID.get(entry.category)?.name ?? "",
        ...(meta?.tags ?? []),
        meta?.description ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [trimmed, activeCategory, metas]);

  /** Family groups with headers — used whenever the user is not searching:
   *  "All" shows every family in registry order, a pill shows that one. */
  const groups = React.useMemo(() => {
    if (searching) return [];
    return CATEGORIES.filter(
      (category) => activeCategory === "all" || category.id === activeCategory,
    )
      .map((category) => ({
        category,
        entries: visible.filter((entry) => entry.category === category.id),
      }))
      .filter((group) => group.entries.length > 0);
  }, [searching, activeCategory, visible]);

  const renderCard = (entry: RegistryEntry) => (
    <ComponentCard
      key={entry.slug}
      entry={entry}
      categoryName={CATEGORY_BY_ID.get(entry.category)?.name ?? entry.category}
      Demo={demos.get(entry.slug) ?? null}
    />
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6">
      {/* Header */}
      <header className="max-w-3xl">
        <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          Components
        </span>
        <h1 className="mt-3 text-heading-1 font-heading-1 text-default-font">
          The component library
        </h1>
        <p className="mt-4 text-prose font-prose text-neutral-600 dark:text-neutral-500">
          Fifty components across ten families, from the glass primitives that
          implement the material itself to the editors, charts and layouts
          that carry the day&apos;s work. Every card below renders a live
          instance straight from the library — the same code this site runs —
          so the gallery doubles as a health check on the system. Search by
          name, slug or tag, or filter by family to narrow the field.
        </p>
        <p className="mt-5 font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
          {TOTAL} components · {CATEGORIES.length} families · live previews
        </p>
      </header>

      {/* Search + family filter — sticky below the site header from md up,
          plain in-flow block on small screens so it never eats the viewport */}
      <div className="-mx-4 mt-10 mb-10 border-b border-default-border bg-default-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:sticky md:top-14 md:z-30">
        <div role="search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components…"
            aria-label="Search components by name, slug, tag or family"
            className="w-full rounded-md border border-default-border bg-panel px-3 py-2 text-body-medium text-default-font transition-colors outline-none placeholder:text-neutral-400 focus:border-neutral-400"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={twClassNames(
              "flex cursor-pointer items-center gap-1.5 rounded-[9999px] border px-3 py-1.5 text-[13px] font-medium transition-colors",
              activeCategory === "all"
                ? "border-neutral-400 bg-default-font/[0.06] text-default-font"
                : "border-default-border text-neutral-500 hover:border-neutral-400 hover:text-default-font",
            )}
          >
            <span>All</span>
            <span className="font-code text-[11px] text-neutral-400">{TOTAL}</span>
          </button>

          {CATEGORIES.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category.id)}
                className={twClassNames(
                  "flex cursor-pointer items-center gap-1.5 rounded-[9999px] border px-3 py-1.5 text-[13px] font-medium transition-colors",
                  active
                    ? "border-neutral-400 bg-default-font/[0.06] text-default-font"
                    : "border-default-border text-neutral-500 hover:border-neutral-400 hover:text-default-font",
                )}
              >
                <span>{category.name}</span>
                <span className="font-code text-[11px] text-neutral-400">
                  {CATEGORY_COUNTS[category.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count while searching */}
      {searching ? (
        <p
          aria-live="polite"
          className="mb-6 font-code text-[11px] uppercase tracking-[0.12em] text-neutral-400"
        >
          {visible.length} {visible.length === 1 ? "match" : "matches"} ·
          &ldquo;{trimmed}&rdquo;
        </p>
      ) : null}

      {visible.length === 0 ? (
        /* Empty state — quiet, with the query echoed back */
        <div className="rounded-lg border border-default-border bg-panel px-6 py-20 text-center">
          <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            No matches
          </span>
          <p className="mx-auto mt-3 max-w-md text-body-medium text-neutral-500">
            Nothing in the library matches{" "}
            <span className="font-code text-default-font">
              &ldquo;{trimmed}&rdquo;
            </span>
            {activeCategory !== "all" ? (
              <>
                {" "}
                within{" "}
                <span className="text-default-font">
                  {CATEGORY_BY_ID.get(activeCategory)?.name ?? activeCategory}
                </span>
              </>
            ) : null}
            . Try a shorter term, or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("all");
            }}
            className="mt-6 inline-flex cursor-pointer items-center rounded-[9999px] border border-default-border px-4 py-1.5 text-[13px] font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-default-font"
          >
            Clear filters
          </button>
        </div>
      ) : searching ? (
        /* Flat results grid while searching */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(renderCard)}
        </div>
      ) : (
        /* Grouped by family — headers only when browsing, not searching */
        <div className="flex flex-col gap-12">
          {groups.map(({ category, entries }) => (
            <section key={category.id} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-heading-3 font-heading-3 text-default-font">
                  {category.name}
                </h2>
                <span className="font-code text-[11px] text-neutral-400">
                  — {entries.length}
                </span>
              </div>
              <p className="max-w-2xl text-caption text-neutral-500">
                {category.description}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map(renderCard)}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
