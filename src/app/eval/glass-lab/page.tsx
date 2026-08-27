"use client";

/**
 * GLASS LAB — interactive harness for the liquid-glass runtime (kube.io
 * exact port).
 *
 * Not part of the public docs site. A deliberately busy, high-contrast
 * backdrop (grid + text specimen + color bands) so refraction is provable,
 * with GlassSurface instances sized to expose the known failure modes:
 *
 *  - fractional layout widths (233.5px) → filter-region hairline boxes
 *  - small chips (bezel ≈ element height) → whole-surface frost/bloom
 *  - interactive content (buttons/links) → must stay clickable and must
 *    never realign when the surface is elastically pulled
 *  - every material level side by side for refraction comparison
 *  - text + icon surfaces (the kube.io searchbox / player shapes) →
 *    content must stretch visually with the glass and stay legible
 *
 * Drag any glass surface to test the elastic pull; drag from a button and
 * the button's normal behavior wins (no gesture).
 */

import React from "react";
import {
  IconSearch,
  IconSparkles,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { EvalShell } from "@/eval/EvalShell";
import { GlassSurface, MATERIAL_RAMP, type MaterialLevel } from "@/lib/glass";

function BusyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {/* color bands — high-contrast edges make displacement obvious */}
      <div className="absolute inset-y-0 left-0 w-1/5 bg-neutral-200" />
      <div className="absolute inset-y-0 right-0 w-[18%] bg-neutral-400/60" />
      <div className="absolute inset-y-0 left-[38%] w-[3%] bg-neutral-800/80" />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(21,20,15,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,20,15,0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* text specimen */}
      <div className="absolute inset-0 p-6">
        <div className="grid h-full grid-cols-2 gap-x-10 gap-y-2 overflow-hidden sm:grid-cols-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <p
              key={i}
              className="truncate text-[12px] leading-[1.7] text-neutral-900/80"
            >
              The quick brown fox jumps specimen {String(i + 1).padStart(2, "0")}
            </p>
          ))}
        </div>
      </div>
      {/* diagonals — bending reads best against straight lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(21,20,15,0.5) 0 2px, transparent 2px 24px)",
        }}
      />
    </div>
  );
}

export default function GlassLabPage() {
  const [clickCount, setClickCount] = React.useState(0);
  const levels: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];

  return (
    <EvalShell theme="light">
      <div className="relative min-h-screen overflow-hidden bg-neutral-300">
        <BusyBackdrop />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14 p-10">
          <header className="max-w-xl">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Glass Lab
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-800">
              Drag any glass surface — it should stretch elastically toward the
              pointer (never fully reaching it, capped at ~1cm) and spring
              back with a jelly settle on release. Layout never changes;
              buttons stay put and stay clickable; the lens sharpens while
              held (refraction ×1.25).
            </p>
          </header>

          {/* material ramp row — refraction comparison */}
          <section className="flex flex-wrap items-center gap-5">
            {levels.map((level) => (
              <GlassSurface
                key={level}
                shape="card"
                material={level}
                className="flex h-16 w-44 items-center justify-center"
                data-glass-lab={`ramp-${level}`}
              >
                <span className="text-[13px] font-semibold text-neutral-900">
                  {level} · scale {MATERIAL_RAMP[level].maxDisplacement.toFixed(1)}
                </span>
              </GlassSurface>
            ))}
          </section>

          {/* text + icon surfaces — the kube.io component shapes; the
              content must stretch visually with the glass */}
          <section className="flex flex-wrap items-center gap-6">
            <GlassSurface
              shape="capsule"
              material="thin"
              className="flex h-14 w-[320px] items-center gap-2.5 px-5"
              data-glass-lab="search-capsule"
            >
              <IconSearch size={16} stroke={2} className="shrink-0 text-neutral-700" />
              <span className="text-[14px] text-neutral-500">
                Search the glass docs
              </span>
              <span className="ml-auto rounded border border-neutral-400 px-1.5 py-0.5 font-mono text-[11px] text-neutral-600">
                ⌘K
              </span>
            </GlassSurface>

            <GlassSurface
              shape="capsule"
              material="regular"
              className="flex h-16 w-[400px] items-center gap-4 px-6"
              data-glass-lab="player-capsule"
            >
              <IconPlayerPlay size={18} stroke={2} className="shrink-0 text-neutral-800" />
              <span className="font-mono text-[14px] tabular-nums text-neutral-800">
                03:12 / 18:40
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                <span className="text-[12px] font-medium text-neutral-700">
                  Ambient Refractions
                </span>
              </span>
            </GlassSurface>

            <GlassSurface
              shape="capsule"
              material="regular"
              className="flex h-11 items-center gap-2 px-4"
              data-glass-lab="sparkle-chip"
            >
              <IconSparkles size={15} stroke={2} className="shrink-0 text-neutral-700" />
              <span className="text-[13px] font-semibold text-neutral-900">
                Liquid preview
              </span>
            </GlassSurface>
          </section>

          {/* fractional widths — filter-region hairline box test */}
          <section className="flex flex-wrap items-start gap-6">
            <GlassSurface
              shape="card"
              className="flex h-24 w-[233.5px] items-center justify-center"
              data-glass-lab="fractional-a"
            >
              <span className="text-[13px] text-neutral-900">
                width 233.5px
              </span>
            </GlassSurface>
            <GlassSurface
              shape="card"
              className="flex h-24 w-[178.7px] items-center justify-center"
              data-glass-lab="fractional-b"
            >
              <span className="text-[13px] text-neutral-900">
                width 178.7px
              </span>
            </GlassSurface>
            <GlassSurface
              shape="capsule"
              className="flex h-14 w-[197.3px] items-center justify-center"
              data-glass-lab="fractional-capsule"
            >
              <span className="text-[13px] text-neutral-900">
                capsule 197.3px
              </span>
            </GlassSurface>
          </section>

          {/* interactive content — clicks must work, alignment must not move */}
          <section className="flex flex-wrap items-center gap-8">
            <GlassSurface
              shape="card"
              material="regular"
              className="flex h-28 w-[420px] items-center justify-center gap-4 px-6"
              data-glass-lab="interactive"
            >
              <span className="text-[13px] font-medium text-neutral-900">
                Clicks: {clickCount}
              </span>
              <button
                type="button"
                onClick={() => setClickCount((c) => c + 1)}
                className="rounded-full bg-neutral-900 px-4 py-1.5 text-[13px] font-semibold text-white transition-transform active:scale-95"
              >
                Count
              </button>
              <a
                href="#glass-lab-link"
                className="rounded-full border border-neutral-700 px-4 py-1.5 text-[13px] font-semibold text-neutral-900"
              >
                Link
              </a>
            </GlassSurface>

            {/* small chip — whole-surface bloom test */}
            <GlassSurface
              shape="capsule"
              material="thick"
              className="flex h-9 items-center gap-2 px-4"
              data-glass-lab="small-chip"
            >
              <span className="text-[13px] font-semibold text-neutral-900">
                Thick chip
              </span>
              <span className="text-[13px] text-neutral-700">⌘K</span>
            </GlassSurface>
          </section>

          {/* large panel — deep pull target */}
          <section>
            <GlassSurface
              shape="card"
              material="regular"
              className="flex h-56 w-full max-w-3xl flex-col items-center justify-center gap-3"
              data-glass-lab="panel"
            >
              <span className="text-lg font-semibold text-neutral-900">
                Elastic panel
              </span>
              <span className="text-sm text-neutral-700">
                Grab anywhere on the glass (not the buttons) and pull
              </span>
            </GlassSurface>
          </section>
        </div>
      </div>
    </EvalShell>
  );
}
