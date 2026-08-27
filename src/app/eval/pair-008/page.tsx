"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Card } from "@/components/ds/Card";
import { LayerTreeRow } from "@/components/ds/LayerTreeRow";
import {
  Card as UICard,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Monochrome wireframe of the "checkout-page" frame — the canvas preview
 * shown in the review card. Mirrors the layer tree next to it:
 * nav / hero (headline + trust badges) / pricing-table / legacy footer.
 */
function FramePreview() {
  return (
    <div className="flex h-[320px] w-full flex-col gap-2.5 border-b border-solid border-neutral-200 bg-neutral-100/70 p-3.5">
      {/* nav bar */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-10 rounded-sm bg-neutral-300" />
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-8 rounded-full bg-neutral-300" />
          <div className="h-1.5 w-8 rounded-full bg-neutral-300" />
          <div className="h-1.5 w-8 rounded-full bg-neutral-300" />
          <div className="h-6 w-16 rounded-md bg-neutral-800/90" />
        </div>
      </div>
      {/* hero group: headline + trust badges */}
      <div className="flex flex-col items-center gap-2 py-3">
        <div className="h-3.5 w-3/5 rounded-sm bg-neutral-400/80" />
        <div className="h-3.5 w-2/5 rounded-sm bg-neutral-400/60" />
        <div className="h-1.5 w-1/3 rounded-full bg-neutral-300" />
        <div className="mt-1 flex items-center gap-1.5">
          <div className="h-4 w-14 rounded-full border border-solid border-neutral-300" />
          <div className="h-4 w-14 rounded-full border border-solid border-neutral-300" />
          <div className="h-4 w-14 rounded-full border border-solid border-neutral-300" />
        </div>
      </div>
      {/* pricing-table component */}
      <div className="grid grow grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 rounded-md border border-solid border-neutral-200 bg-white p-2"
          >
            <div className="h-2 w-7 rounded-full bg-neutral-400/70" />
            <div className="h-1.5 w-full rounded-full bg-neutral-200" />
            <div className="h-1.5 w-4/5 rounded-full bg-neutral-200" />
            <div className="mt-auto h-5 w-full rounded-sm bg-neutral-300" />
          </div>
        ))}
      </div>
      {/* legacy footer strip */}
      <div className="flex items-center justify-center gap-2.5 border-t border-dashed border-neutral-300 pt-2.5">
        <div className="h-1.5 w-14 rounded-full bg-neutral-200" />
        <div className="h-1.5 w-10 rounded-full bg-neutral-200" />
        <div className="h-1.5 w-12 rounded-full bg-neutral-200" />
        <div className="h-1.5 w-8 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col gap-5 px-6 py-6">
        {/* toolbar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Praxis" className="h-7 w-7" />
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-body-medium font-medium text-default-font">
                Praxis Canvas
              </span>
              <span className="text-caption font-caption text-neutral-500">
                review mode · checkout-page
              </span>
            </div>
          </div>
          <span className="text-caption font-caption text-neutral-400">
            v48 · autosaved
          </span>
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)_280px] items-start gap-4">
          {/* frame preview card */}
          <UICard className="overflow-hidden pt-0">
            <FramePreview />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">In review</Badge>
              </CardAction>
              <CardTitle className="text-base">
                Checkout page · desktop frame
              </CardTitle>
              <CardDescription>
                1440 × 900 · last edited 12 min ago by Ada L.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Open in editor</Button>
            </CardFooter>
          </UICard>

          {/* inspector sidebar */}
          <aside className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col items-start gap-2">
              <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                layers · checkout-page
              </span>
              <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
                <LayerTreeRow
                  name="Checkout page"
                  nodeType="frame"
                  depth="0"
                  expanded
                  selected
                  visible
                />
                <LayerTreeRow name="hero" nodeType="group" depth="1" expanded visible />
                <LayerTreeRow name="eyebrow" nodeType="text" depth="2" leaf />
                <LayerTreeRow name="headline" nodeType="text" depth="2" leaf />
                <LayerTreeRow name="trust-badges" nodeType="group" depth="2" />
                <LayerTreeRow name="pricing-table" nodeType="component" depth="1" />
                <LayerTreeRow name="legacy-footer" nodeType="frame" depth="1" locked />
              </div>
              <span className="text-caption font-caption text-neutral-400">
                7 layers · 1 locked · 1 selected
              </span>
            </div>

            <Card
              header={
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="text-body-medium text-default-font">
                    Inspection notes
                  </span>
                  <span className="text-caption font-caption text-neutral-500">
                    review pass 3 · 4 minutes ago
                  </span>
                </div>
              }
              footer={
                <>
                  <span className="text-caption font-caption text-neutral-400">
                    v48 @ a1b2c3d
                  </span>
                  <span className="text-caption font-caption text-neutral-400">
                    2 comments open
                  </span>
                </>
              }
            >
              <p className="w-full text-body text-default-font">
                Layout matches the spec at 1440 and 768. The locked
                legacy-footer frame is scheduled for removal, and trust-badges
                needs a 2× re-export before sign-off.
              </p>
            </Card>
          </aside>
        </div>

        {/* deploy status */}
        <Card
          header={
            <div className="flex w-full flex-col items-start gap-0.5">
              <span className="text-body-medium text-default-font">
                Deploy preview · build #482
              </span>
              <span className="text-caption font-caption text-neutral-500">
                checkout-page · queued from main · 4 minutes ago
              </span>
            </div>
          }
          footer={
            <>
              <span className="text-caption font-caption text-neutral-400">
                main @ a1b2c3d
              </span>
              <span className="text-caption font-caption text-neutral-400">
                96s build · 214 checks passed
              </span>
            </>
          }
        >
          <p className="w-full text-body text-default-font">
            The preview build succeeded and the review URL is warm. Promotion to
            staging is waiting on the two open comments in the inspection notes.
          </p>
        </Card>

        <footer className="mt-auto flex items-center justify-between pt-2">
          <span className="text-caption font-caption text-neutral-400">
            Praxis design system · internal review build
          </span>
          <span className="font-code text-[11px] tracking-[0.04em] text-neutral-400">
            pair-008
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
