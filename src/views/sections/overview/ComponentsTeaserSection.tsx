"use client";

/**
 * ComponentsTeaserSection — the "Components" section of the overview.
 *
 * Reads the static registry (COMPONENT_REGISTRY, getCategoryCounts) plus the
 * category metadata (CATEGORIES) and renders the ten families as a calm grid
 * of count cards, each linking into the component index at #/components.
 */

import React from "react";
import { Link } from "@/components/site/HashRouter";
import { COMPONENT_REGISTRY, getCategoryCounts } from "@/lib/docs/registry";
import { CATEGORIES } from "@/lib/docs/types";

export function ComponentsTeaserSection() {
  const counts = getCategoryCounts();
  const total = COMPONENT_REGISTRY.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
        {total} components · {CATEGORIES.length} families
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            to="/components"
            className="flex flex-col gap-2 rounded-lg border border-default-border bg-panel p-4 transition-colors hover:bg-default-font/[0.03]"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-heading-3 font-heading-3 text-default-font">
                {category.name}
              </span>
              <span className="flex-none font-code text-[11px] text-neutral-400">
                {counts[category.id]} components
              </span>
            </div>
            <p className="text-body-medium text-neutral-500">
              {category.description}
            </p>
          </Link>
        ))}
      </div>

      <p className="text-prose font-prose text-neutral-600 dark:text-neutral-500">
        The ten families deliberately span the system&apos;s full range: the
        glass primitives implement the material itself, laid objects and
        surfaces compose the chrome that floats over documents, inputs and
        indicators carry interaction and status, and the code-editor,
        data-display, and data-visualization families do the actual work —
        file trees, diffs, timers, waveforms, candle series. Every family
        draws from the same tokens, the same two themes, and the same material
        contract, which is what makes fifty separate components read as one
        system.
      </p>
    </div>
  );
}
