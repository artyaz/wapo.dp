"use client";

/**
 * UIDetailView — one UI component, variant tabs, live demo each.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Link } from "@/components/site/HashRouter";
import {
  getUIComponent,
  loadUIDemo,
  UI_REGISTRY,
} from "@/lib/docs/ui-registry-loader";
import type { ComponentType } from "react";

class DemoErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-default-border p-8 text-center">
          <span className="font-code text-[12px] text-neutral-400">
            {this.props.name} — demo failed to render
          </span>
          <span className="max-w-md text-caption text-neutral-500">
            {this.state.error.message}
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

export function UIDetailView({ slug }: { slug: string }) {
  const component = React.useMemo(() => getUIComponent(slug), [slug]);
  const [activeVariant, setActiveVariant] = React.useState<string | null>(null);
  const [Demo, setDemo] = React.useState<ComponentType | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setActiveVariant(component?.variants[0]?.slug ?? null);
  }, [component]);

  React.useEffect(() => {
    if (!component || !activeVariant) return;
    let cancelled = false;
    setLoading(true);
    setDemo(null);
    loadUIDemo(component.slug, activeVariant).then((mod) => {
      if (cancelled) return;
      const variant = component.variants.find(
        (v) => v.slug === activeVariant
      );
      const Comp = (mod?.[variant?.export ?? ""] ?? mod?.default ?? null) as
        | ComponentType
        | null;
      setDemo(Comp ? () => Comp : null);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [component, activeVariant]);

  if (!component) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-32 text-center sm:px-6">
        <span className="font-heading-2 font-heading-2 text-default-font">
          No component named “{slug}”
        </span>
        <Link
          to="/ui"
          className="text-body-medium text-neutral-500 underline underline-offset-4 hover:text-default-font"
        >
          Back to the UI library
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          to="/ui"
          className="font-code text-[11px] tracking-[0.08em] text-neutral-400 uppercase hover:text-default-font"
        >
          UI Library
        </Link>
        <span className="mx-2 font-code text-[11px] text-neutral-400">/</span>
        <span className="font-code text-[11px] tracking-[0.08em] text-neutral-500 uppercase">
          {component.name}
        </span>
      </nav>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-heading-1 font-heading-1 text-default-font">
          {component.name}
        </h1>
        <p className="mt-3 font-code text-[11px] tracking-[0.08em] text-neutral-400 uppercase">
          {component.variants.length} live demo
          {component.variants.length === 1 ? "" : "s"}
        </p>
      </header>

      {/* variant pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {component.variants.map((v) => (
          <button
            key={v.slug}
            type="button"
            aria-pressed={activeVariant === v.slug}
            onClick={() => setActiveVariant(v.slug)}
            className={twClassNames(
              "cursor-pointer rounded-[9999px] border px-3 py-1.5 text-[13px] font-medium transition-colors",
              activeVariant === v.slug
                ? "border-neutral-400 bg-default-font/[0.06] text-default-font"
                : "border-default-border text-neutral-500 hover:border-neutral-400 hover:text-default-font"
            )}
          >
            {v.title}
          </button>
        ))}
      </div>

      {/* demo frame */}
      <div className="rounded-xl border border-default-border bg-panel p-6 sm:p-10">
        <div className="flex min-h-56 items-center justify-center">
          {loading ? (
            <div className="flex w-full max-w-md flex-col gap-3">
              <div className="h-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-8 w-2/3 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-8 w-1/2 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
            </div>
          ) : Demo ? (
            <DemoErrorBoundary
              name={`${component.name} / ${activeVariant}`}
            >
              <div className="flex w-full items-start justify-center">
                <Demo />
              </div>
            </DemoErrorBoundary>
          ) : (
            <span className="font-code text-[12px] text-neutral-400">
              demo not found
            </span>
          )}
        </div>
      </div>

      {/* prev / next */}
      <nav
        aria-label="Component navigation"
        className="mt-12 flex items-center justify-between border-t border-default-border pt-6"
      >
        <SiblingLink slug={slug} dir={-1} />
        <SiblingLink slug={slug} dir={1} />
      </nav>
    </div>
  );
}

function SiblingLink({ slug, dir }: { slug: string; dir: -1 | 1 }) {
  const idx = UI_REGISTRY.findIndex((c) => c.slug === slug);
  const next = UI_REGISTRY[idx + dir];
  if (!next) return <span />;
  return (
    <Link
      to={`/ui/${next.slug}`}
      className={twClassNames(
        "font-code text-[11px] tracking-[0.08em] text-neutral-400 uppercase hover:text-default-font",
        dir === -1 && "self-start",
        dir === 1 && "self-end"
      )}
    >
      {dir === -1 ? "← " : ""}
      {next.name}
      {dir === 1 ? " →" : ""}
    </Link>
  );
}
