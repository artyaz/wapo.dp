"use client";

/**
 * HeroSection — the overview landing hero.
 *
 * Full-width by design: OverviewView renders it OUTSIDE the max-w-6xl page
 * container, so this section is its own full-width wrapper with an inner
 * max-w-6xl column. Left: display headline, prose intro, quiet stats and
 * anchor links. Right: a live GlassSurface material proof over a DemoStage.
 */

import React from "react";
import { DemoStage } from "@/components/site/DemoStage";
import { GlassSurface } from "@/lib/glass";
import type { MaterialLevel } from "@/lib/glass";
import { Link } from "@/components/site/HashRouter";
import { twClassNames } from "@/lib/subframe/utils";

/** Quiet stats row — one line, font-code, no emphasis beyond weight of fact. */
const STATS: Array<[string, string]> = [
  ["50", "components"],
  ["4", "materials"],
  ["3", "rendering strategies"],
  ["2", "themes"],
];

/** Anchor links into the three major documentation routes. */
const ANCHORS = [
  { to: "/materials", label: "Materials" },
  { to: "/components", label: "Components" },
  { to: "/foundations", label: "Foundations" },
];

/**
 * Capsules floated over the specimen stage at different material levels.
 * Positions are fixed (deterministic) and non-overlapping from 320px up.
 */
const STAGE_CAPSULES: Array<{
  material: MaterialLevel;
  label: string;
  position: string;
}> = [
  { material: "regular", label: "Regular · anchor", position: "left-6 top-12" },
  { material: "thin", label: "Thin", position: "right-8 top-32" },
  { material: "thick", label: "Thick", position: "bottom-12 left-16" },
];

export function HeroSection() {
  return (
    <section className="flex min-h-[70vh] w-full flex-col border-b border-default-border">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        {/* left column — display headline + quiet meta */}
        <div className="min-w-0 flex-1">
          <span className="font-code text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
            Praxis Design System
          </span>
          <h1 className="mt-5 text-[44px] leading-[1.08] font-heading-1 font-semibold tracking-[-0.01em] text-default-font sm:text-[52px]">
            <span className="block">The interface recedes.</span>
            <span className="block">The work remains.</span>
          </h1>
          <p className="mt-6 max-w-xl text-prose font-prose text-neutral-600 dark:text-neutral-500">
            Praxis is a monochrome design system for tools people work in all
            day. Its interfaces are built from a single quiet palette and a
            family of liquid glass materials that lift floating surfaces above
            the document by bending light — never by stacking borders, fills,
            and shadows. Chrome stays legible over any content, and content
            never has to compete with its chrome.
          </p>

          <div className="mt-10 flex flex-col gap-5 border-t border-default-border pt-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-code text-[12px]">
              {STATS.map(([value, label], i) => (
                <React.Fragment key={label}>
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-neutral-400/60">
                      ·
                    </span>
                  ) : null}
                  <span className="text-default-font/80">{value}</span>
                  <span className="text-neutral-400">{label}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {ANCHORS.map((anchor) => (
                <Link
                  key={anchor.to}
                  to={anchor.to}
                  className="text-body-medium font-medium text-default-font underline decoration-default-border underline-offset-4 transition-colors hover:decoration-default-font"
                >
                  {anchor.label}
                  <span aria-hidden="true" className="ml-1.5 text-neutral-400">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* right column — the material, live */}
        <figure className="min-w-0 flex-1 lg:max-w-[560px]">
          <div className="relative">
            <DemoStage variant="text" height="h-80" />
            {STAGE_CAPSULES.map((capsule) => (
              <GlassSurface
                key={capsule.material}
                material={capsule.material}
                shape="capsule"
                className={twClassNames(
                  "absolute z-10 px-4 py-2",
                  capsule.position
                )}
              >
                <span className="select-none font-code text-[11px] font-medium tracking-[0.04em] whitespace-nowrap text-default-font">
                  {capsule.label}
                </span>
              </GlassSurface>
            ))}
          </div>
          <figcaption className="mt-3 font-code text-[11px] leading-[16px] text-neutral-400">
            Live material — three levels of the ramp over the specimen stage,
            refracting whatever sits behind them.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
