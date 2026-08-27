"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { TimeScrubber } from "@/components/ds/TimeScrubber";
import { LayerTreeRow } from "@/components/ds/LayerTreeRow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, MoreHorizontal, Users } from "lucide-react";

/**
 * Atlas Field — mobile inspector for a shared design file.
 *
 * Scenario: a teammate reviews the "Product Site Refactor" file from their
 * phone. The edit-activity card (TimeScrubber) shows when the 4 collaborators
 * were saving; the inspector accordion opens on the Layers section, whose
 * content is a LayerTreeRow stack of the checkout-page frame with long,
 * realistic layer names (dense content: wrapping accordion triggers, ellipsed
 * layer labels, multi-line captions).
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-default-background">
        {/* App bar */}
        <header className="flex flex-none items-center gap-3 border-b border-solid border-default-border bg-panel px-4 pb-3.5 pt-5">
          <button
            aria-label="Back to files"
            className="flex size-9 flex-none items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-[20px] text-default-font">
              Product Site Refactor — v42
            </p>
            <p className="truncate text-[11px] leading-[15px] text-neutral-500">
              Edited 12 min ago · 4 collaborators · 312 saves today
            </p>
          </div>
          <div className="flex flex-none items-center gap-1">
            <div className="flex items-center">
              <div className="flex size-7 items-center justify-center rounded-full border border-solid border-panel bg-neutral-200 text-[10px] font-medium text-neutral-600">
                MK
              </div>
              <div className="-ml-1.5 flex size-7 items-center justify-center rounded-full border border-solid border-panel bg-neutral-300 text-[10px] font-medium text-neutral-700">
                JD
              </div>
              <div className="-ml-1.5 flex size-7 items-center justify-center rounded-full border border-solid border-panel bg-neutral-400 text-[10px] font-medium text-white">
                +2
              </div>
            </div>
            <button
              aria-label="More actions"
              className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100"
            >
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        </header>

        <main className="flex flex-col gap-4 px-4 pb-10 pt-4">
          {/* Edit activity — TimeScrubber */}
          <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
            <div className="flex items-center justify-between gap-2 px-3 pt-3">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                edit activity · checkout-page
              </span>
              <span className="flex-none font-code text-[11px] text-neutral-400">
                UTC
              </span>
            </div>
            <TimeScrubber activeRange="1-d" rangeStart="13:12" rangeEnd="20:24" />
            <p className="px-3 pb-3 text-[12px] leading-[18px] text-neutral-500">
              312 saves from 4 collaborators in the selected window — peak
              activity around 18:40 while the two-column pricing table was
              reworked and the legacy footer was locked by the design-system
              team.
            </p>
          </section>

          {/* Inspector — Accordion with the layer tree inside */}
          <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
            <div className="flex items-center gap-2 border-b border-solid border-default-border px-4 py-3">
              <Users className="size-3.5 text-neutral-400" />
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                file inspector · shared with 6 people
              </span>
            </div>
            <div className="px-4">
              <Accordion defaultValue={["layers"]}>
                <AccordionItem value="layers">
                  <AccordionTrigger>
                    <span className="flex flex-col gap-1">
                      <span>
                        Layers — checkout page master frame &amp; nested
                        overrides
                      </span>
                      <span className="text-[11px] font-normal leading-[14px] text-neutral-500">
                        6 of 18 layers shown · tap a row to select it on canvas
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="flex flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
                      <LayerTreeRow
                        name="Checkout page — master frame · 1440 baseline grid"
                        nodeType="frame"
                        depth="0"
                        expanded
                        selected
                        visible
                      />
                      <LayerTreeRow
                        name="hero-banner / gradient-overlay & headline block"
                        nodeType="group"
                        depth="1"
                        expanded
                        visible
                      />
                      <LayerTreeRow
                        name="Buy today, save big on annual plans — display"
                        nodeType="text"
                        depth="2"
                        leaf
                      />
                      <LayerTreeRow
                        name="trust-badges / payment-provider-logo-strip"
                        nodeType="group"
                        depth="2"
                      />
                      <LayerTreeRow
                        name="PricingTable / three-tier-annual-comparison"
                        nodeType="component"
                        depth="1"
                      />
                      <LayerTreeRow
                        name="legacy-footer — locked by design-system team"
                        nodeType="frame"
                        depth="1"
                        locked
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sharing">
                  <AccordionTrigger>
                    Sharing &amp; permissions — links, guests and comment-only
                    access for external reviewers
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-[20px] text-neutral-500">
                      Anyone with the link can view this file. Guest reviewers
                      from Northwind Traders LLP have comment-only access until
                      the end of the quarter; edit access is limited to the
                      core product design group and requires an approval from
                      the file owner.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="handoff">
                  <AccordionTrigger>
                    Developer handoff — export presets, specs and production
                    code snippets
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-[20px] text-neutral-500">
                      Exports run against the latest save: WebP @1x–3x for
                      raster assets, production tokens as CSS variables, and
                      React snippets for the pricing table and trust-badge
                      components. Failed exports are retried nightly.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
