"use client";

/**
 * EVAL page (pair-038) — ui:drawer + ui:menubar + ui:collapsible
 * Conditions: phone 390x844, light theme, LTR, no constraint.
 *
 * Scenario: "Ledger" mobile expense-report review screen. A reviewer opens
 * report ER-2041: a Menubar toolbar (View / Sort / More) sits under the app
 * header, the report summary and details (two Collapsible sections — trip &
 * purpose expanded, policy notes collapsed) fill the scroll area, and a
 * persistent non-modal bottom Drawer (open by default) carries the
 * "Review & submit" sheet with totals, an out-of-policy warning and the
 * approval actions.
 */

import React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ClipboardCheck,
  Plane,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

function SummaryRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium tabular-nums ${
          valueClassName ?? "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

export default function Page() {
  const [tripOpen, setTripOpen] = React.useState(true);
  const [policyOpen, setPolicyOpen] = React.useState(false);

  return (
    <EvalShell theme="light" dir="ltr">
      {/* Drawer root wraps the screen so the header trigger stays in context */}
      <Drawer
        modal={false}
        dismissible={false}
        defaultOpen
        direction="bottom"
      >
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ---- app header ---- */}
        <header className="flex flex-none items-center gap-2 border-b bg-card px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to reports"
            className="size-10 shrink-0"
          >
            <ChevronLeft />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold leading-tight">
              Expense report
            </h1>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              ER-2041 · Submitted by Amara Chen
            </p>
          </div>
          {/* opens / toggles the persistent review sheet */}
          <DrawerTrigger
            render={
              <Button variant="outline" size="sm" className="h-9 shrink-0">
                <ClipboardCheck />
                Review
              </Button>
            }
          />
        </header>

        {/* ---- report toolbar (ui:menubar) ---- */}
        <div className="flex-none border-b bg-card px-4 py-2.5">
          <Menubar className="w-full">
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent className="w-60">
                <MenubarCheckboxItem checked>
                  Show receipt chips
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                  Group by day
                </MenubarCheckboxItem>
                <MenubarCheckboxItem>Show amounts only</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Compact rows <MenubarShortcut>⌘K</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Sort</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="date-desc">
                  <MenubarRadioItem value="date-desc">
                    Newest first
                  </MenubarRadioItem>
                  <MenubarRadioItem value="date-asc">
                    Oldest first
                  </MenubarRadioItem>
                  <MenubarRadioItem value="amount">
                    Highest amount
                  </MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>More</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Duplicate report</MenubarItem>
                <MenubarItem>Export as PDF</MenubarItem>
                <MenubarSeparator />
                <MenubarItem variant="destructive">
                  Delete report
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* ---- report body ---- */}
        <main className="flex-1 overflow-y-auto px-4 py-4">
          {/* summary card */}
          <section className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total claimed
              </p>
              <span className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-neutral-400" />
                In review
              </span>
            </div>
            <p className="mt-2 text-[28px] font-semibold leading-none tabular-nums">
              €1,284.50
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-3 text-xs text-muted-foreground">
              <span>12 expenses</span>
              <span className="size-1 rounded-full bg-neutral-300" />
              <span>3 receipts pending</span>
              <span className="size-1 rounded-full bg-neutral-300" />
              <span className="font-medium text-warning-700">1 flagged</span>
            </div>
          </section>

          {/* details (ui:collapsible) */}
          <section className="mt-3 overflow-hidden rounded-lg border bg-card">
            <Collapsible open={tripOpen} onOpenChange={setTripOpen}>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-11 w-full justify-between rounded-none px-4 text-sm font-medium"
                  >
                    <span className="flex items-center gap-2.5">
                      <Plane className="size-4 text-muted-foreground" />
                      Trip &amp; purpose
                    </span>
                    <span className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
                      Mar 3–6
                      <ChevronDown
                        className={`size-4 transition-transform ${
                          tripOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </Button>
                }
              />
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Four-day client workshop with Northwind Trading — kick-off,
                  two training sessions and a closing retrospective with the
                  regional team.
                </p>
                <dl className="mt-3 flex flex-col gap-1.5">
                  <MetaRow label="Dates" value="Mar 3–6, 2025" />
                  <MetaRow label="Location" value="Lisbon, PT" />
                  <MetaRow label="Cost centre" value="MKT-210 · Marketing" />
                </dl>
              </CollapsibleContent>
            </Collapsible>

            <div className="border-t" />

            <Collapsible open={policyOpen} onOpenChange={setPolicyOpen}>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-11 w-full justify-between rounded-none px-4 text-sm font-medium"
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldCheck className="size-4 text-muted-foreground" />
                      Policy notes
                    </span>
                    <span className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
                      <span className="rounded-full bg-warning-100 px-2 py-0.5 text-[11px] font-medium text-warning-700">
                        1 flag
                      </span>
                      <ChevronDown
                        className={`size-4 transition-transform ${
                          policyOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </Button>
                }
              />
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Daily meal cap is €60. Alcohol is not reimbursable. Receipts
                  are required above €25.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </section>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Last edited 2 h ago · Draft auto-saved
          </p>
        </main>

        {/* ---- persistent review sheet (ui:drawer, open by default) ---- */}
          <DrawerContent className="bg-card">
            <DrawerHeader>
              <DrawerTitle>Review &amp; submit</DrawerTitle>
              <DrawerDescription>
                Final check before sending ER-2041 to finance.
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 pb-1">
              <SummaryRow label="Submitted by" value="Amara Chen" />
              <SummaryRow label="Expenses" value="12 · 3 receipts pending" />
              <SummaryRow label="Total" value="€1,284.50" />
            </div>

            <div className="mx-4 mb-1 flex items-start gap-2.5 rounded-md border border-warning-200 bg-warning-50 px-3 py-2.5">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning-600" />
              <p className="text-xs leading-relaxed text-warning-800">
                <span className="font-medium">Out-of-policy expense — </span>
                Dinner, Mar 4 (€78.00) exceeds the €60 daily meal cap.
              </p>
            </div>

            <DrawerFooter className="flex-row gap-2">
              <DrawerClose
                render={
                  <Button variant="outline" className="h-10 flex-1">
                    Request changes
                  </Button>
                }
              />
              <Button className="h-10 flex-1">Approve &amp; submit</Button>
            </DrawerFooter>
          </DrawerContent>
      </div>
      </Drawer>
    </EvalShell>
  );
}
