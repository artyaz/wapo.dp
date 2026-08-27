"use client";

/**
 * ComponentDetailView — the per-component documentation page (#/components/<slug>).
 *
 * Async-loads meta + demo through the registry (one code-split chunk per
 * component), then renders: breadcrumb header, live preview (stage choice by
 * category, wrapped in an error boundary), props table, usage code, same-
 * category related cards, and registry-order prev/next navigation. Quiet,
 * monochrome, deterministic — no state beyond the load.
 */

import React from "react";
import type { ComponentType } from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Link } from "@/components/site/HashRouter";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { PropTable } from "@/components/site/PropTable";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Note, Token } from "@/components/site/DocPage";
import {
  COMPONENT_REGISTRY,
  loadComponentDemo,
  loadComponentMeta,
} from "@/lib/docs/registry";
import { CATEGORIES } from "@/lib/docs/types";
import type { CategoryId, ComponentMeta } from "@/lib/docs/types";

/** Category display names, derived from the shared category table. */
const CATEGORY_NAMES: Record<CategoryId, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.name]),
) as Record<CategoryId, string>;

/**
 * Glass families prove their material over busy content, so they render on
 * the specimen stage; everything else sits on the plain document background.
 */
const STAGED_CATEGORIES: ReadonlySet<CategoryId> = new Set([
  "glass-primitives",
  "laid-objects",
]);

type Phase = "loading" | "ready" | "missing";

interface DetailState {
  phase: Phase;
  meta: ComponentMeta | null;
  Demo: ComponentType | null;
  demoSource: string;
}

const INITIAL_STATE: DetailState = {
  phase: "loading",
  meta: null,
  Demo: null,
  demoSource: "",
};

/* ------------------------------------------------------------------ */
/* Loading + failure states                                            */
/* ------------------------------------------------------------------ */

/** Quiet pulsing skeleton — blocks sized to the page it stands in for. */
function DetailSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-4xl px-4 pt-12 pb-16 sm:px-6"
      aria-busy="true"
      aria-label="Loading component"
    >
      <div className="animate-pulse">
        <div className="h-3 w-56 rounded-[4px] bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-8 h-11 w-64 max-w-full rounded-[8px] bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-7 h-4 w-full max-w-2xl rounded-[4px] bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-3 h-4 w-11/12 max-w-xl rounded-[4px] bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-10 h-80 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-10 h-44 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

/** Not-found card — unknown slug, or a meta module that failed to load. */
function NotFoundCard({ slug }: { slug: string }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-12 pb-16 sm:px-6">
      <div className="rounded-lg border border-default-border bg-panel p-8 sm:p-12">
        <span className="font-code text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
          404 · component not found
        </span>
        <h1 className="mt-4 text-heading-2 font-heading-2 text-default-font">
          No registry entry for <Token>{slug}</Token>
        </h1>
        <p className="mt-4 max-w-xl text-prose font-prose text-neutral-600 dark:text-neutral-500">
          The slug may be mistyped, renamed, or the component may not have
          landed in the library yet. The component index lists every registered
          entry.
        </p>
        <Link
          to="/components"
          className="mt-8 inline-flex items-center gap-2 rounded-[9999px] border border-default-border px-4 py-2 text-body-medium font-medium text-default-font transition-colors hover:bg-default-font/[0.04]"
        >
          <span aria-hidden="true" className="font-code text-[12px]">
            ←
          </span>
          All components
        </Link>
      </div>
    </div>
  );
}

/** Quiet in-frame message when the demo module exists but fails to render. */
function DemoFallback() {
  return (
    <div className="w-full py-10 text-center">
      <p className="font-code text-[12px] text-neutral-400">
        This demo could not be rendered.
      </p>
    </div>
  );
}

/** Quiet in-frame message when the demo module itself is unavailable. */
function DemoUnavailable() {
  return (
    <p className="w-full py-10 text-center font-code text-[12px] text-neutral-400">
      Demo unavailable for this component.
    </p>
  );
}

/**
 * Class-component error boundary around the live demo — ported components
 * fail soft here instead of taking the whole page down. Remounted per slug
 * via `key` so a recovered navigation starts clean.
 */
class DemoErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Quiet diagnostic — the page stays usable either way.
    console.error("[praxis] component demo failed to render:", error, info.componentStack);
  }

  render() {
    return this.state.error ? <DemoFallback /> : this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

export function ComponentDetailView({ slug }: { slug: string }) {
  const [state, setState] = React.useState<DetailState>(INITIAL_STATE);

  React.useEffect(() => {
    let cancelled = false;
    setState(INITIAL_STATE);

    void (async () => {
      const [meta, demo] = await Promise.all([
        loadComponentMeta(slug),
        loadComponentDemo(slug),
      ]);
      if (cancelled) return;
      setState(
        meta
          ? {
              phase: "ready",
              meta,
              Demo: demo?.Demo ?? null,
              demoSource: demo?.demoSource ?? "",
            }
          : { ...INITIAL_STATE, phase: "missing" },
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.phase === "loading") return <DetailSkeleton />;
  if (state.phase === "missing" || !state.meta) {
    return <NotFoundCard slug={slug} />;
  }

  const meta = state.meta;
  const { Demo, demoSource } = state;

  // Registry context — navigation and related cards come from the static
  // index, independent of what the loaders returned.
  const registryIndex = COMPONENT_REGISTRY.findIndex((e) => e.slug === slug);
  const entry = registryIndex >= 0 ? COMPONENT_REGISTRY[registryIndex] : null;
  const prev =
    registryIndex > 0 ? COMPONENT_REGISTRY[registryIndex - 1] : null;
  const next =
    registryIndex >= 0 && registryIndex < COMPONENT_REGISTRY.length - 1
      ? COMPONENT_REGISTRY[registryIndex + 1]
      : null;
  const related = entry
    ? COMPONENT_REGISTRY.filter(
        (e) => e.category === entry.category && e.slug !== slug,
      ).slice(0, 4)
    : [];

  const categoryName = CATEGORY_NAMES[meta.category];
  const subComponents = meta.subComponents ?? [];

  const staged = STAGED_CATEGORIES.has(meta.category);
  // Glass components get the live material panel: their whole point is the
  // material, and which tier is live decides which knob does anything.
  const usesGlass =
    meta.category === "glass-primitives" ||
    meta.category === "laid-objects" ||
    (meta.tags?.includes("glass") ?? false);

  const importLine = `import { ${meta.name} } from "@/components/ds/${meta.name}";`;
  const trimmedSource = demoSource.trim();
  const usageCode = trimmedSource
    ? `${importLine}\n\n${trimmedSource}`
    : importLine;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-12 pb-16 sm:px-6">
      {/* ------------------------------------------------ header */}
      <header>
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 font-code text-[11px] tracking-[0.08em] uppercase"
        >
          <Link
            to="/components"
            className="text-neutral-500 transition-colors hover:text-default-font"
          >
            Components
          </Link>
          <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">
            /
          </span>
          <Link
            to="/components"
            className="text-neutral-500 transition-colors hover:text-default-font"
          >
            {categoryName}
          </Link>
          <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">
            /
          </span>
          <span className="text-neutral-400">{meta.name}</span>
        </nav>

        <h1 className="mt-4 text-heading-1 font-heading-1 text-default-font">
          {meta.name}
        </h1>

        <p className="mt-5 max-w-2xl text-prose font-prose text-neutral-600 dark:text-neutral-500">
          {meta.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-default-border pt-5">
          {meta.status ? (
            <span
              className={twClassNames(
                "inline-flex items-center rounded-[9999px] border px-2.5 py-[3px] font-code text-[10px] font-medium tracking-[0.12em] uppercase",
                meta.status === "experimental"
                  ? "border-dashed border-neutral-400 text-neutral-600 dark:text-neutral-300"
                  : "border-default-border text-neutral-500",
              )}
            >
              {meta.status}
            </span>
          ) : null}

          {meta.sourceRef ? (
            <span
              className="block max-w-[280px] truncate font-code text-[11px] text-neutral-400 sm:max-w-[420px]"
              title={meta.sourceRef}
            >
              {meta.sourceRef}
            </span>
          ) : null}

          {subComponents.length > 0 ? (
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="font-code text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
                Sub-components
              </span>
              {subComponents.map((sub) => (
                <Token key={sub}>{sub}</Token>
              ))}
            </span>
          ) : null}
        </div>
      </header>

      {/* ------------------------------------------------ live preview */}
      <section className="mt-14">
        <h2 className="text-heading-2 font-heading-2 text-default-font">
          Preview
        </h2>
        {staged ? (
          <p className="mt-3 text-body-medium text-neutral-500">
            Live demo over the specimen stage — the material proves itself
            against busy content.
          </p>
        ) : null}
        <div className="mt-6">
          <ComponentPreview
            title={meta.slug}
            source={demoSource || undefined}
            props={meta.props}
            stage={staged ? "text" : false}
            stageHeight="h-80"
            frame={staged ? "stage" : "plain"}
            glassControls={usesGlass}
          >
            <DemoErrorBoundary key={slug}>
              {Demo ? <Demo /> : <DemoUnavailable />}
            </DemoErrorBoundary>
          </ComponentPreview>
        </div>
      </section>

      {/* ------------------------------------------------ props */}
      <section className="mt-14">
        <h2 className="text-heading-2 font-heading-2 text-default-font">
          Props
        </h2>
        <div className="mt-6">
          {meta.props.length > 0 ? (
            <PropTable props={meta.props} />
          ) : (
            <Note>
              This component exposes only <Token>className</Token> passthrough.
            </Note>
          )}
        </div>
      </section>

      {/* ------------------------------------------------ usage */}
      <section className="mt-14">
        <h2 className="text-heading-2 font-heading-2 text-default-font">
          Usage
        </h2>
        {meta.usage ? (
          <p className="mt-3 max-w-2xl text-body-medium text-neutral-600 dark:text-neutral-500">
            {meta.usage}
          </p>
        ) : null}
        <div className="mt-6">
          <CodeBlock code={usageCode} filename={`${meta.name}.tsx`} />
        </div>
      </section>

      {/* ------------------------------------------------ related */}
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-heading-2 font-heading-2 text-default-font">
            Related components
          </h2>
          <p className="mt-3 text-body-medium text-neutral-500">
            Also in {categoryName}.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/components/${rel.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-default-border bg-panel px-4 py-3.5 transition-colors hover:border-neutral-400 hover:bg-default-font/[0.03]"
              >
                <span className="min-w-0">
                  <span className="block text-body-medium font-medium text-default-font">
                    {rel.name}
                  </span>
                  <span className="mt-0.5 block truncate font-code text-[11px] text-neutral-400">
                    {rel.slug}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-code text-[13px] text-neutral-300 transition-colors group-hover:text-neutral-500 dark:text-neutral-600 dark:group-hover:text-neutral-400"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------ prev / next */}
      <nav
        aria-label="Component navigation"
        className="mt-16 flex flex-col gap-3 border-t border-default-border pt-6 sm:flex-row sm:items-stretch sm:justify-between"
      >
        {prev ? (
          <Link
            to={`/components/${prev.slug}`}
            className="rounded-lg border border-default-border px-4 py-3 transition-colors hover:bg-default-font/[0.03] sm:min-w-[220px]"
          >
            <span className="block font-code text-[11px] tracking-[0.1em] text-neutral-400 uppercase">
              ← prev
            </span>
            <span className="mt-1 block truncate text-body-medium font-medium text-default-font">
              {prev.name}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
        {next ? (
          <Link
            to={`/components/${next.slug}`}
            className="rounded-lg border border-default-border px-4 py-3 text-right transition-colors hover:bg-default-font/[0.03] sm:min-w-[220px]"
          >
            <span className="block font-code text-[11px] tracking-[0.1em] text-neutral-400 uppercase">
              next →
            </span>
            <span className="mt-1 block truncate text-body-medium font-medium text-default-font">
              {next.name}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
      </nav>
    </div>
  );
}
