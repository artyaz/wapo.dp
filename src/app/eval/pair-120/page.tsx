"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MaterialTokens } from "@/components/ds/MaterialTokens";
import { DropletsIcon, SlidersHorizontalIcon } from "lucide-react";

/**
 * pair-120 — 390×420 (phone-half) · light · ltr · no-scroll
 * Scenario: "Glass Studio — appearance sheet".
 * A bottom sheet (open by default, no floating close button — closes via
 * "Done") offering two quick surface-effect switches above the live
 * four-level material ramp reference card. The studio surface behind the
 * scrim peeks out above the sheet.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <Sheet defaultOpen>
        {/* Studio surface behind the sheet (dimmed by the sheet scrim) */}
        <div className="flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_18%_0%,rgba(244,244,241,0.95)_0%,transparent_55%),radial-gradient(circle_at_85%_12%,rgba(234,234,230,0.9)_0%,transparent_50%)]">
          <header className="flex items-center gap-3 px-4 pt-3">
            <div className="flex size-8 flex-none items-center justify-center rounded-lg border border-solid border-default-border bg-panel/60 backdrop-blur-md">
              <DropletsIcon className="size-4 text-neutral-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight">
                Glass Studio
              </p>
              <p className="font-code text-[11px] leading-4 text-neutral-400">
                specimen stage · ramp v0.9
              </p>
            </div>
            <SheetTrigger
              render={
                <Button variant="outline" size="sm">
                  <SlidersHorizontalIcon />
                  Appearance
                </Button>
              }
            />
          </header>
          <div className="mt-3 flex flex-col gap-1.5 px-4">
            {[
              "specimen 01 — quiet surfaces",
              "specimen 02 — one substance, graded",
              "specimen 03 — elevation by refraction",
            ].map((line) => (
              <span
                key={line}
                className="font-code text-[11px] leading-4 text-neutral-400/70"
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Appearance sheet — open */}
        <SheetContent side="bottom" showCloseButton={false} className="gap-2">
          <SheetHeader className="gap-2 px-4 pb-0 pt-3">
            <div className="flex items-center justify-between gap-3">
              <SheetTitle>Glass appearance</SheetTitle>
              <SheetClose
                render={
                  <Button variant="ghost" size="sm">
                    Done
                  </Button>
                }
              />
            </div>
            <SheetDescription className="sr-only">
              Toggle surface effects and review the four-level material ramp.
            </SheetDescription>
            <div className="flex gap-2">
              <label className="flex h-11 flex-1 cursor-pointer items-center justify-between gap-3 rounded-lg border border-solid border-default-border bg-muted/40 px-3">
                <span className="text-sm font-medium leading-none">Frost</span>
                <Switch defaultChecked aria-label="Frost" />
              </label>
              <label className="flex h-11 flex-1 cursor-pointer items-center justify-between gap-3 rounded-lg border border-solid border-default-border bg-muted/40 px-3">
                <span className="text-sm font-medium leading-none">Sheen</span>
                <Switch aria-label="Sheen" />
              </label>
            </div>
          </SheetHeader>
          <MaterialTokens
            className="gap-2 px-3 py-3 [&>div:last-of-type]:hidden"
          />
        </SheetContent>
      </Sheet>
    </EvalShell>
  );
}
