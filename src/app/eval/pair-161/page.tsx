"use client";

import React from "react";
import type { DateRange } from "react-day-picker";
import {
  CalendarClock,
  FileJson,
  RotateCcw,
  Trash2,
  TriangleAlert,
  Webhook,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { JsonTreeNode } from "@/components/ds/JsonTreeNode";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/* Deterministic export window — May 2025, fixed dates. */
const EXPORT_FROM = new Date(2025, 4, 12);
const EXPORT_TO = new Date(2025, 4, 26);

export default function Page() {
  const [exportWindow, setExportWindow] = React.useState<
    DateRange | undefined
  >({ from: EXPORT_FROM, to: EXPORT_TO });

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ---------------- Top bar ---------------- */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-border bg-card px-5">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card">
              <Webhook className="size-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                Relay Console
              </span>
              <span className="text-xs text-muted-foreground">
                webhook deliveries · payments-v2 · eu-west-1
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
              Failing · retry 2 of 5
            </span>
            <span className="text-xs text-muted-foreground">dlv_9F42A1c7</span>
          </div>
        </header>

        {/* ---------------- Console body ---------------- */}
        <main className="grid min-h-0 flex-1 grid-cols-[500px_minmax(0,1fr)] gap-5 p-5">
          {/* Panel 1 — webhook payload inspector */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex h-11 flex-none items-center gap-2 border-b border-border px-4">
              <FileJson className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                delivery_9f42a1.json
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                application/json · 1.8 KB
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden px-3 py-3">
              <JsonTreeNode.JsonTreeNodeBranch
                keyName={'"delivery"'}
                braceType="object"
                expanded={true}
                collapsedBadge="{…} 8 keys"
              >
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"event"'}
                  valueType="string"
                  value={'"invoice.payment_failed"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"delivery_id"'}
                  valueType="string"
                  value={'"dlv_9F42A1c7"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"endpoint"'}
                  valueType="string"
                  value={'"https://hooks.payments.example/v2/invoices"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"attempt"'}
                  valueType="number"
                  value="2"
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"signature_valid"'}
                  valueType="boolean"
                  value="false"
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"next_retry_at"'}
                  valueType="null"
                  value="null"
                />
                <JsonTreeNode.JsonTreeNodeBranch
                  keyName={'"payload"'}
                  braceType="object"
                  expanded={true}
                  collapsedBadge="{…} 6 keys"
                >
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"invoice_id"'}
                    valueType="string"
                    value={'"in_8F21cQ2x"'}
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"customer"'}
                    valueType="string"
                    value={'"cus_T77bK4"'}
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"currency"'}
                    valueType="string"
                    value={'"EUR"'}
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"amount"'}
                    valueType="number"
                    value="4890"
                  />
                  <JsonTreeNode.JsonTreeNodeBranch
                    keyName={'"entries"'}
                    braceType="array"
                    expanded={true}
                    collapsedBadge="[…] 2 items"
                  >
                    <JsonTreeNode.JsonTreeNodeBranch
                      braceType="object"
                      expanded={true}
                      collapsedBadge="{…} 3 keys"
                      isArrayItem={true}
                      arrayIndex="[0]"
                    >
                      <JsonTreeNode.JsonTreeNodeLeaf
                        keyName={'"id"'}
                        valueType="string"
                        value={'"txn_2214"'}
                      />
                      <JsonTreeNode.JsonTreeNodeLeaf
                        keyName={'"amount"'}
                        valueType="number"
                        value="2214"
                      />
                      <JsonTreeNode.JsonTreeNodeLeaf
                        keyName={'"settled"'}
                        valueType="boolean"
                        value="false"
                      />
                    </JsonTreeNode.JsonTreeNodeBranch>
                    <JsonTreeNode.JsonTreeNodeBranch
                      braceType="object"
                      expanded={false}
                      collapsedBadge="{…} 3 keys"
                      isArrayItem={true}
                      arrayIndex="[1]"
                    />
                  </JsonTreeNode.JsonTreeNodeBranch>
                  <JsonTreeNode.JsonTreeNodeBranch
                    keyName={'"tags"'}
                    braceType="array"
                    expanded={false}
                    collapsedBadge="[…] 3 items"
                  />
                </JsonTreeNode.JsonTreeNodeBranch>
              </JsonTreeNode.JsonTreeNodeBranch>
            </div>
            <div className="flex h-8 flex-none items-center border-t border-border px-4 text-xs text-muted-foreground">
              depth 4 · 23 rows · signature invalid · sha256
            </div>
          </section>

          {/* Right column */}
          <div className="flex min-h-0 flex-col gap-5">
            {/* Panel 2 — export window */}
            <section className="flex-none overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex h-11 items-center gap-2 border-b border-border px-4">
                <CalendarClock className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Export window
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  cold storage
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="export-window"
                    className="text-xs font-medium text-foreground"
                  >
                    Retention window
                  </label>
                  <DatePicker
                    id="export-window"
                    mode="range"
                    value={exportWindow}
                    onValueChange={setExportWindow}
                    format="LLL dd, y"
                    buttonClassName="w-full"
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Payload and attempt logs are copied to cold storage for this
                    window before the record becomes eligible for purge.
                  </p>
                </div>
                <div className="flex flex-col gap-2 border-t border-border pt-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs text-muted-foreground">
                      Destination
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      s3://relay-exports/eu-west-1
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Format</span>
                    <span className="text-xs font-medium text-foreground">
                      JSONL · gzip
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs text-muted-foreground">
                      Schedule
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      daily · 03:00 UTC
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Panel 3 — retry policy */}
            <section className="flex-none overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex h-11 items-center gap-2 border-b border-border px-4">
                <RotateCcw className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Retry policy
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  attempt 2 of 5
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs text-muted-foreground">Backoff</span>
                  <span className="text-xs font-medium text-foreground">
                    exponential · 5m / 30m / 2h
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Next attempt
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    06:00 UTC
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Page on-call after
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    5 failed attempts
                  </span>
                </div>
              </div>
            </section>

            {/* Panel 4 — danger zone with destructive confirmation */}
            <AlertDialog defaultOpen>
              <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex h-11 flex-none items-center gap-2 border-b border-border px-4">
                  <TriangleAlert className="size-4 text-destructive" />
                  <span className="text-sm font-medium text-foreground">
                    Danger zone
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    GDPR · art. 17
                  </span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Purging removes the stored payload, all retry attempts and
                    the signature trail for this delivery. Export it first if
                    you need it for auditing.
                  </p>
                  <div className="mt-4">
                    <AlertDialogTrigger
                      render={
                        <Button variant="destructive">
                          <Trash2 />
                          Purge delivery record…
                        </Button>
                      }
                    />
                  </div>
                  <p className="mt-auto border-t border-border pt-3 text-xs text-muted-foreground">
                    Requires confirmation · every purge is written to the audit
                    trail.
                  </p>
                </div>
              </section>

              {/* Destructive confirmation — open by default for the audit */}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2 />
                  </AlertDialogMedia>
                  <AlertDialogTitle>
                    Purge this delivery record?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This permanently deletes the stored payload for
                    dlv_9F42A1c7 — including all 5 retry attempts and the
                    signature trail — once the export window closes on May 26,
                    2025. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep record</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Purge record
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
