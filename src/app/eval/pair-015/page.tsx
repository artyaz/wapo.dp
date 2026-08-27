"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LayerTreeRow } from "@/components/ds/LayerTreeRow";
import { Download, Shapes } from "lucide-react";

/**
 * Scenario: "Praxis Studio" export flow on a portrait tablet — a design-tool
 * editor (top bar + layers panel + artboard canvas) with the "Export assets"
 * sheet docked at the bottom. The sheet uses the no-close-button variant
 * (dismissal via the footer Cancel action / clicking outside).
 */
export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ── top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-border bg-panel/70 px-4">
          <div className="flex size-7 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel">
            <Shapes className="size-4 text-muted-foreground" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm leading-tight font-semibold">
              Praxis Studio
            </span>
            <span className="font-code text-[11px] leading-tight text-muted-foreground">
              checkout-page.prx
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden font-code text-[11px] text-muted-foreground sm:inline">
              autosaved 14:02
            </span>
            <Sheet defaultOpen>
              <SheetTrigger
                render={
                  <Button variant="outline" size="sm">
                    <Download />
                    Export
                  </Button>
                }
              />
              <SheetContent
                side="bottom"
                showCloseButton={false}
                className="gap-0"
              >
                <SheetHeader className="border-b border-border px-6 py-4">
                  <SheetTitle className="text-base">Export assets</SheetTitle>
                  <SheetDescription>
                    24 assets will be exported from checkout-page.prx as PNG.
                  </SheetDescription>
                </SheetHeader>
                <FieldGroup className="gap-x-8 gap-y-4 px-6 py-5 sm:grid-cols-2">
                  <Field orientation="horizontal">
                    <Checkbox
                      id="export-hidden-layers"
                      name="export-hidden-layers"
                      defaultChecked
                    />
                    <FieldLabel htmlFor="export-hidden-layers">
                      Include hidden layers
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="export-flatten-groups"
                      name="export-flatten-groups"
                    />
                    <FieldLabel htmlFor="export-flatten-groups">
                      Flatten groups
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="export-2x" name="export-2x" defaultChecked />
                    <FieldContent>
                      <FieldLabel htmlFor="export-2x">
                        Export @2x assets
                      </FieldLabel>
                      <FieldDescription>
                        Renders every slice at double resolution.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="export-optimize"
                      name="export-optimize"
                      defaultChecked
                    />
                    <FieldContent>
                      <FieldLabel htmlFor="export-optimize">
                        Optimize file size
                      </FieldLabel>
                      <FieldDescription>
                        Strips metadata and compresses PNGs.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>
                <SheetFooter className="flex-row items-center justify-between gap-2 border-t border-border px-6 py-4">
                  <span className="font-code text-[11px] text-muted-foreground">
                    est. 18.4 MB · 24 files
                  </span>
                  <div className="flex items-center gap-2">
                    <SheetClose
                      render={
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      }
                    />
                    <Button size="sm">
                      <Download />
                      Export
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* ── editor body ─────────────────────────────────────────── */}
        <div className="flex min-h-0 flex-1">
          {/* layers panel */}
          <aside className="flex w-[280px] flex-none flex-col border-r border-border bg-panel/60">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-muted-foreground">
                Layers
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                9
              </span>
            </div>
            <div className="px-3 pb-3">
              <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
                <LayerTreeRow
                  name="Checkout page"
                  nodeType="frame"
                  depth="0"
                  expanded
                  selected
                  visible
                />
                <LayerTreeRow
                  name="hero"
                  nodeType="group"
                  depth="1"
                  expanded
                  visible
                />
                <LayerTreeRow
                  name="headline"
                  nodeType="text"
                  depth="2"
                  leaf
                />
                <LayerTreeRow name="trust-badges" nodeType="group" depth="2" />
                <LayerTreeRow
                  name="pricing-table"
                  nodeType="component"
                  depth="1"
                />
                <LayerTreeRow
                  name="order-summary"
                  nodeType="group"
                  depth="1"
                  expanded
                  visible
                />
                <LayerTreeRow
                  name="total-row"
                  nodeType="text"
                  depth="2"
                  leaf
                />
                <LayerTreeRow
                  name="pay-button"
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
              </div>
            </div>
            <div className="mt-auto border-t border-border px-4 py-2.5">
              <span className="font-code text-[11px] text-muted-foreground">
                1 hidden · 1 locked
              </span>
            </div>
          </aside>

          {/* canvas */}
          <main className="relative min-w-0 flex-1 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(241, 239, 233, 0.08) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6">
              <div className="w-[240px] overflow-hidden rounded-xl border border-solid border-default-border bg-panel shadow-lg">
                <div className="flex items-center justify-between border-b border-solid border-default-border px-4 py-3">
                  <span className="text-xs font-medium text-default-font">
                    Checkout
                  </span>
                  <span className="font-code text-[10px] text-muted-foreground">
                    step 2/3
                  </span>
                </div>
                <div className="flex flex-col gap-3 px-4 py-4">
                  <div className="h-20 rounded-lg border border-solid border-default-border bg-black/25" />
                  <div className="h-2 w-3/4 rounded-full bg-white/10" />
                  <div className="h-2 w-1/2 rounded-full bg-white/10" />
                  <div className="mt-1 flex items-center justify-between border-t border-solid border-default-border pt-3">
                    <span className="text-[11px] text-muted-foreground">
                      Total
                    </span>
                    <span className="font-code text-[11px] text-default-font">
                      $148.00
                    </span>
                  </div>
                  <div className="flex h-9 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground">
                    Pay now
                  </div>
                </div>
              </div>
              <span className="font-code text-[11px] text-muted-foreground">
                checkout-page · 390 × 420
              </span>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
