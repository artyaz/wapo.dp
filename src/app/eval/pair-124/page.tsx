"use client";

/**
 * EVAL page (pair-124) — ui:drawer + ds:Button + ds:InspectorRow
 * Conditions: 390x420 (half phone), dark theme, LTR, no constraint.
 *
 * Scenario: checkout / payment step. Behind the sheet: the compact checkout
 * top bar (back chevron, "Checkout", step indicator). The bottom Drawer opens
 * by default as the payment sheet: header (Confirm & pay), an order-options
 * panel built from InspectorRow rows (card select, tip stepper, promo code
 * field, gift-wrap toggle) and a footer action row — Back (secondary) beside
 * the dominant Pay CTA (primary, large).
 */

import React from "react";
import { ChevronLeft } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ds/Button";
import { InspectorRow } from "@/components/ds/InspectorRow";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      {/* ---- checkout step behind the sheet (top bar peeks above it) ---- */}
      <header className="flex h-14 items-center gap-2 px-4">
        <ChevronLeft className="size-4 flex-none text-default-font" />
        <span className="font-body text-[14px] font-[600] leading-[20px] text-foreground">
          Checkout
        </span>
        <span className="ml-auto font-caption text-[12px] leading-[16px] text-default-font">
          Step 3 of 3
        </span>
      </header>

      {/* ---- payment sheet (ui:drawer, open by default) ---- */}
      <Drawer defaultOpen>
        <DrawerContent className="h-[364px] data-[vaul-drawer-direction=bottom]:max-h-none">
          <DrawerHeader>
            <DrawerTitle>Confirm &amp; pay</DrawerTitle>
            <DrawerDescription>
              Order AT-2847 · 2 items · Aeropress Go + filters
            </DrawerDescription>
          </DrawerHeader>

          {/* order options inspector (ds:InspectorRow) */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4">
            <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
              <InspectorRow label="card" variant="select" value="Visa •• 4242" />
              <InspectorRow label="tip" variant="number" value="$4.00" />
              <InspectorRow label="promo code" variant="text" />
              <InspectorRow label="gift wrap" variant="toggle" checked />
            </div>
          </div>

          {/* actions (ds:Button) */}
          <DrawerFooter className="flex-row items-stretch gap-2.5 p-3">
            <Button variant="secondary" size="large">
              Back
            </Button>
            <Button variant="primary" size="large" className="flex-1">
              Pay $67.90
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </EvalShell>
  );
}
