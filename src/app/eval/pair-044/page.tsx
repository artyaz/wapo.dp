"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import { LayerTreeRow } from "@/components/ds/LayerTreeRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Check,
  ExternalLink,
  Layers,
  Play,
  Share2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const LAYERS: {
  name: string;
  nodeType: "frame" | "group" | "component" | "text";
  depth: "0" | "1" | "2" | "3" | "4";
  expanded?: boolean;
  selected?: boolean;
  visible?: boolean;
  locked?: boolean;
  leaf?: boolean;
}[] = [
  { name: "Checkout page", nodeType: "frame", depth: "0", expanded: true, selected: true, visible: true },
  { name: "header", nodeType: "group", depth: "1", expanded: true, visible: true },
  { name: "logo", nodeType: "text", depth: "2", leaf: true },
  { name: "nav-links", nodeType: "group", depth: "2" },
  { name: "cart-badge", nodeType: "component", depth: "2", leaf: true },
  { name: "payment-form", nodeType: "group", depth: "1", expanded: true },
  { name: "card-number", nodeType: "text", depth: "2", leaf: true },
  { name: "expiry-cvv", nodeType: "group", depth: "2" },
  { name: "summary-card", nodeType: "component", depth: "1" },
  { name: "legacy-footer", nodeType: "frame", depth: "1", locked: true },
];

const APPEARANCE: { label: string; value: string }[] = [
  { label: "Fill", value: "#FFFFFF" },
  { label: "Corner radius", value: "12 px" },
  { label: "Border", value: "1 px · solid" },
  { label: "Layout", value: "vertical · 16" },
];

const ASSETS = ["logo-mark.svg", "icon-set", "type-scale", "palette-tokens"];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      {/* Scenario: Praxis Studio — design editor for a "checkout-page" artboard.
          Left: Layers/Assets tabs over a LayerTreeRow stack. Center: the artboard
          preview whose call-to-action uses Button. Right: frame inspector with
          alignment + action Buttons. Fits 1024×768 with no scrolling. */}
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background font-body text-default-font">
        {/* Top bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-solid border-default-border bg-panel px-4">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-md bg-brand-primary text-brand-primary-foreground">
              <Layers className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-tight">Praxis Studio</span>
              <span className="font-code text-[11px] leading-tight text-neutral-400">
                checkout-page · draft
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Play />
              Preview
            </Button>
            <Button variant="link" size="sm">
              <ExternalLink />
              Docs
            </Button>
            <div className="mx-1 h-5 w-px bg-default-border" />
            <Button size="sm">
              <Share2 />
              Share
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Left: layers panel */}
          <aside className="flex w-[272px] flex-none flex-col border-r border-solid border-default-border bg-panel">
            <Tabs defaultValue="layers" className="flex min-h-0 flex-1 flex-col gap-0">
              <div className="flex-none px-3 pt-3">
                <TabsList className="w-full">
                  <TabsTrigger value="layers">Layers</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="history" disabled>
                    History
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent
                value="layers"
                className="min-h-0 flex-1 overflow-hidden pt-3"
              >
                <span className="block px-3 font-code text-[11px] tracking-[0.04em] text-neutral-500">
                  layers · checkout-page
                </span>
                <div className="mt-1.5 flex flex-col">
                  {LAYERS.map((layer) => (
                    <LayerTreeRow
                      key={layer.name}
                      name={layer.name}
                      nodeType={layer.nodeType}
                      depth={layer.depth}
                      expanded={layer.expanded}
                      selected={layer.selected}
                      visible={layer.visible}
                      locked={layer.locked}
                      leaf={layer.leaf}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="assets"
                className="min-h-0 flex-1 overflow-hidden p-3"
              >
                <span className="block font-code text-[11px] tracking-[0.04em] text-neutral-500">
                  assets · 4 files
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {ASSETS.map((asset) => (
                    <div
                      key={asset}
                      className="rounded-md border border-solid border-default-border px-2 py-1.5 font-code text-[11px] text-neutral-500"
                    >
                      {asset}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </aside>

          {/* Center: canvas with the checkout artboard */}
          <main className="flex min-w-0 flex-1 items-center justify-center bg-muted/40 p-6">
            <div className="flex flex-col items-center gap-2">
              <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                frame · checkout-page · 420 × 520
              </span>
              <div className="w-[420px] rounded-xl border border-solid border-default-border bg-panel p-6 shadow-lg shadow-black/5">
                <span className="font-code text-[11px] tracking-[0.04em] text-neutral-400">
                  step 2 of 3
                </span>
                <h2 className="mt-1 text-lg font-semibold leading-tight">
                  Order summary
                </h2>
                <div className="mt-4 flex flex-col gap-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Annual plan</span>
                    <span>$228.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Add-on seats × 3</span>
                    <span>$54.00</span>
                  </div>
                  <div className="my-1 h-px bg-default-border" />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total due today</span>
                    <span>$282.00</span>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button className="flex-1">Continue to payment</Button>
                </div>
              </div>
            </div>
          </main>

          {/* Right: frame inspector */}
          <aside className="flex w-[272px] flex-none flex-col border-l border-solid border-default-border bg-panel">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
              <div className="flex flex-col gap-2">
                <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                  properties · checkout-page
                </span>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon-xs" aria-label="Align left">
                    <AlignLeft />
                  </Button>
                  <Button variant="outline" size="icon-xs" aria-label="Align center">
                    <AlignCenter />
                  </Button>
                  <Button variant="outline" size="icon-xs" aria-label="Align right">
                    <AlignRight />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: "X", v: "0" },
                  { k: "Y", v: "32" },
                  { k: "W", v: "420" },
                  { k: "H", v: "520" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="flex items-center justify-between rounded-md border border-solid border-default-border px-2.5 py-1.5"
                  >
                    <span className="font-code text-[11px] text-neutral-400">{s.k}</span>
                    <span className="text-sm">{s.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                  appearance
                </span>
                {APPEARANCE.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-neutral-500">{row.label}</span>
                    <span className="font-code text-[12px]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-none items-center gap-2 border-t border-solid border-default-border p-3">
              <Button variant="outline" size="sm" className="flex-1">
                Reset
              </Button>
              <Button size="sm" className="flex-1">
                <Check />
                Apply
              </Button>
            </div>
          </aside>
        </div>

        {/* Status bar */}
        <footer className="flex h-9 flex-none items-center justify-between border-t border-solid border-default-border bg-panel px-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-xs" aria-label="Zoom out">
              <ZoomOut />
            </Button>
            <span className="w-10 text-center font-code text-[11px] text-neutral-500">
              100%
            </span>
            <Button variant="ghost" size="icon-xs" aria-label="Zoom in">
              <ZoomIn />
            </Button>
          </div>
          <span className="font-code text-[11px] text-neutral-400">
            10 layers · 1 frame selected
          </span>
          <span className="flex items-center gap-1.5 font-code text-[11px] text-neutral-400">
            <Check className="size-3" />
            saved · just now
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
