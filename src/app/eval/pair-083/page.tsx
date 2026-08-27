"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Skeleton } from "@/components/ui/skeleton";
import { DrawerLayout } from "@/components/ds/DrawerLayout";
import { LayerTreeRow } from "@/components/ds/LayerTreeRow";
import * as SubframeCore from "@/lib/subframe/core";
import { FrameIcon } from "lucide-react";

/**
 * pair-083 — Praxis Studio design editor on a portrait tablet (768×1024).
 *
 * Scenario: the file "checkout-page" is opening. The layers tree has already
 * loaded, but the canvas preview, the component thumbnails and the
 * collaborator/session rows are still streaming — so they sit in skeleton
 * states — while a right-anchored DrawerLayout holds the details of the
 * selected "hero" group, whose preview and activity rows are also loading.
 */

const LAYER_DETAILS = [
  { label: "Position", value: "x 24 · y 96" },
  { label: "Size", value: "390 × 420" },
  { label: "Fill", value: "#F5F5F2 · 100%" },
  { label: "Opacity", value: "100% · pass through" },
];

export default function Page() {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  // vaul's Drawer.Content reads `document` during render, so the drawer is
  // mounted client-side only (SSR would throw "document is not defined").
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-default-background font-body text-default-font">
        {/* ── app bar ─────────────────────────────────────────────── */}
        <header className="flex h-12 flex-none items-center justify-between border-b border-default-border bg-panel px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-default-font text-default-background">
              <FrameIcon className="size-3.5" />
            </span>
            <span className="text-body-medium font-body font-medium">
              Praxis Studio
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-caption font-caption text-neutral-500">
              checkout-page
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <span className="flex size-7 items-center justify-center rounded-full border border-default-border bg-neutral-100 text-[10px] font-medium text-neutral-600">
                MK
              </span>
              <span className="flex size-7 items-center justify-center rounded-full border border-default-border bg-neutral-200 text-[10px] font-medium text-neutral-600">
                JD
              </span>
            </div>
            <span className="text-caption font-caption text-neutral-500">
              Autosaved · 12:40
            </span>
          </div>
        </header>

        {/* ── editor underlay (everything left of the open drawer) ── */}
        <div className="flex min-h-0 flex-1">
          <div className="flex w-[468px] flex-none flex-col">
            {/* canvas pane — preview still rendering */}
            <section className="flex min-h-0 flex-1 flex-col gap-4 p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  canvas · rendering preview
                </span>
                <span className="font-code text-[11px] text-neutral-400">
                  390 × 844 · @1x
                </span>
              </div>

              {/* artboard wireframe loading */}
              <div className="flex flex-col gap-3 rounded-xl border border-default-border bg-panel p-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-36" />
              </div>

              {/* component thumbnails syncing */}
              <div>
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  components · syncing 3 of 9
                </span>
                <div className="mt-3 flex gap-3">
                  <Skeleton className="h-16 flex-1" />
                  <Skeleton className="h-16 flex-1" />
                  <Skeleton className="h-16 flex-1" />
                </div>
              </div>

              {/* collaborator session loading */}
              <div>
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  collaborators · loading
                </span>
                <div className="mt-3 flex items-center gap-4">
                  <Skeleton className="size-8 shrink-0 rounded-full" />
                  <div className="grid gap-2">
                    <Skeleton className="h-3 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </div>
            </section>

            {/* layers panel — already loaded */}
            <section className="flex-none border-t border-default-border bg-panel">
              <div className="flex h-10 items-center justify-between border-b border-default-border px-4">
                <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                  Layers
                </span>
                <span className="font-code text-[11px] text-neutral-400">
                  checkout-page · 10
                </span>
              </div>
              <LayerTreeRow
                name="Checkout page"
                nodeType="frame"
                depth="0"
                expanded
                visible
              />
              <LayerTreeRow
                name="hero"
                nodeType="group"
                depth="1"
                expanded
                selected
                visible
              />
              <LayerTreeRow
                name="headline"
                nodeType="text"
                depth="2"
                leaf
                visible
              />
              <LayerTreeRow
                name="product-shot"
                nodeType="component"
                depth="2"
                leaf
              />
              <LayerTreeRow name="trust-badges" nodeType="group" depth="2" />
              <LayerTreeRow name="pricing-table" nodeType="component" depth="1" />
              <LayerTreeRow
                name="payment-form"
                nodeType="group"
                depth="1"
                expanded
              />
              <LayerTreeRow
                name="card-number"
                nodeType="component"
                depth="2"
                leaf
              />
              <LayerTreeRow
                name="expiry-row"
                nodeType="component"
                depth="2"
                leaf
              />
              <LayerTreeRow
                name="legacy-footer"
                nodeType="frame"
                depth="1"
                locked
              />
            </section>
          </div>
        </div>

        {/* ── layer details drawer (right-anchored, non-modal) ────── */}
        {mounted ? (
        <DrawerLayout
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          direction="right"
          modal={false}
          className="absolute inset-0"
        >
          {/* title block */}
          <div className="flex w-[300px] max-w-full flex-col items-start gap-1.5 px-6 pt-6">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              layer · group
            </span>
            <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
              hero
            </SubframeCore.Drawer.Title>
            <SubframeCore.Drawer.Description className="text-caption font-caption text-neutral-500">
              3 children · inside Checkout page
            </SubframeCore.Drawer.Description>
          </div>

          {/* properties */}
          <div className="flex w-[300px] max-w-full flex-col items-start px-6">
            {LAYER_DETAILS.map(({ label, value }) => (
              <div
                key={label}
                className="flex w-full flex-col items-start gap-1 border-t border-default-border py-3 first:border-t-0 first:pt-0"
              >
                <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                  {label}
                </span>
                <span className="text-body font-body text-default-font">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* layer preview still rendering */}
          <div className="flex w-[300px] max-w-full flex-col items-start gap-3 px-6">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              preview · rendering
            </span>
            <Skeleton className="aspect-[4/3] w-full" />
          </div>

          {/* activity row loading */}
          <div className="flex w-[300px] max-w-full flex-col items-start px-6">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              activity · loading
            </span>
            <div className="mt-3 flex items-center gap-4">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="grid gap-2">
                <Skeleton className="h-3 w-[140px]" />
                <Skeleton className="h-3 w-[90px]" />
              </div>
            </div>
          </div>

          {/* child layers */}
          <div className="flex w-[300px] max-w-full flex-col items-start px-6 pb-6">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              children · 3
            </span>
            <div className="mt-3 flex w-full flex-col">
              <LayerTreeRow name="headline" nodeType="text" leaf visible />
              <LayerTreeRow name="product-shot" nodeType="component" leaf />
              <LayerTreeRow name="trust-badges" nodeType="group" />
            </div>
          </div>
        </DrawerLayout>
        ) : null}
      </div>
    </EvalShell>
  );
}
