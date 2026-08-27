"use client";

import React from "react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { GlassMaterialProvider } from "@/components/ds/GlassMaterialProvider";
import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import { GlassSurfaceSubtle } from "@/components/ds/GlassDisplacement/GlassSurfaceSubtle";
import { useGlassRuntime, type GlassStrategy } from "@/lib/glass";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

/* the live negotiated render tiers, exactly one active at a time */
const STRATEGIES: GlassStrategy[] = [
  "svg-displacement",
  "webgl-refraction",
  "backdrop-filter",
];

/* essay body — long enough to run under the scrim and clip mid-scroll */
const PARAGRAPHS = [
  "The material system prefers elevation by refraction, never by cast shadow. Light bends at the rim of a surface, and the eye reads the bend as depth — no darkness is thrown onto the document below.",
  "Content stays legible beneath a graded blur. The defocus deepens toward the bottom edge of the page, so a trailing line of text dissolves softly before the dock settles over it: nothing is hidden, everything simply recedes.",
  "Surfaces separate by tint and saturation rather than by outline. Two panels cut from the same substance can sit side by side and still read as two objects, because each carries a slightly different weight of light.",
  "And every laid object reads as one substance quietly settling onto the document below — a single material, folded once or twice, never stacked into clutter.",
  "Chapter 4 folds the same substance twice: a dock inside a dock, with the blur still graded beneath both.",
];

export default function Page() {
  // the tier this device actually negotiated — drives the active badge
  const live = useGlassRuntime((s) => s.strategy);

  return (
    <EvalShell theme="light" dir="ltr">
      {/* the whole reader region runs on "thick" material — the dock below
          inherits its level from this provider instead of a material prop */}
      <GlassMaterialProvider level="thick">
        <div className="flex w-full flex-col pb-8">
          {/* collection row — the toast docks above it */}
          <div className="flex items-center justify-between px-5 pt-[128px]">
            <span className="flex items-center gap-1 text-[13px] font-medium text-neutral-600">
              <ChevronLeft className="size-4" aria-hidden />
              Library
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              <Bookmark className="size-3.5" aria-hidden />
              Saved
            </span>
          </div>

          {/* essay header */}
          <header className="px-5 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Essay · Chapter 3
            </p>
            <h1 className="mt-1.5 text-[22px] font-semibold leading-tight text-neutral-900">
              The Glass Canon
            </h1>
            <p className="mt-1 text-xs text-neutral-500">
              Mira Voss · 12 min read · 64% completed
            </p>
          </header>

          {/* reading pane — trailing lines recede under the scrim */}
          <section
            aria-label="Reading pane"
            className="relative mx-4 mt-5 h-[400px] overflow-hidden rounded-2xl border border-default-border bg-neutral-100"
          >
            <div className="absolute inset-0 flex flex-col gap-3.5 px-5 pt-5">
              {PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[13px] leading-6 text-neutral-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* progressive blur field over the trailing lines */}
            <AtmosphereScrim />

            {/* page dock — thick glass inherited from the provider */}
            <GlassSurfaceSubtle
              shape="capsule"
              className="absolute bottom-5 left-1/2 z-10 h-14 -translate-x-1/2 px-2"
            >
              <div className="flex h-14 items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous chapter"
                  className="flex size-10 items-center justify-center rounded-full text-default-font/70 transition-colors hover:bg-default-font/5"
                >
                  <ChevronLeft className="size-[18px]" aria-hidden />
                </button>
                <div className="px-2 text-center">
                  <p className="text-[12px] font-semibold leading-4 text-default-font">
                    Chapter 3 of 9
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase leading-3 tracking-[0.12em] text-default-font/80">
                    64% read
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Next chapter"
                  className="flex size-10 items-center justify-center rounded-full text-default-font/70 transition-colors hover:bg-default-font/5"
                >
                  <ChevronRight className="size-[18px]" aria-hidden />
                </button>
              </div>
            </GlassSurfaceSubtle>
          </section>

          {/* display settings — which material strategy is live */}
          <section className="mx-4 mt-5 rounded-2xl border border-default-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-foreground">
                  Material rendering
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  How the dock's glass is drawn on this device
                </p>
              </div>
              <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Auto
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {STRATEGIES.map((s) => (
                <GlassMaterialProvider.StrategyBadge
                  key={s}
                  strategy={s}
                  active={s === live}
                />
              ))}
            </div>
          </section>
        </div>
      </GlassMaterialProvider>

      {/* bookmark confirmation — pinned open for the audit */}
      <ToastProvider>
        <Toast duration={Infinity}>
          <div className="grid gap-1">
            <ToastTitle>Bookmark added</ToastTitle>
            <ToastDescription>
              The Glass Canon · Chapter 3 — synced
            </ToastDescription>
          </div>
          <ToastAction altText="Undo bookmark">Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </EvalShell>
  );
}
