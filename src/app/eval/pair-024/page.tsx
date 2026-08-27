"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { JsonTreeNode } from "@/components/ds/JsonTreeNode";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import {
  CalendarClock,
  Database,
  FileJson,
  SlidersHorizontal,
} from "lucide-react";

// Deterministic scheduling data — May 2025 (5 week rows, fixed month).
const MAINTENANCE_DATES = [
  new Date(2025, 4, 5),
  new Date(2025, 4, 6),
  new Date(2025, 4, 19),
  new Date(2025, 4, 20),
];

export default function Page() {
  const [lookback, setLookback] = React.useState<number[]>([6, 48]);
  const [threshold, setThreshold] = React.useState<number[]>([75]);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-default-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md border border-default-border bg-panel">
              <Database className="size-4 text-neutral-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-default-font">
                Ledger Sync
              </span>
              <span className="text-xs text-neutral-500">
                nightly reconciliation · production
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 flex-none rounded-full bg-success-600" />
            <span className="text-xs text-neutral-500">
              Delivered · 14 May 09:32 UTC · eu-west-1
            </span>
          </div>
        </header>

        {/* Console body */}
        <main className="grid min-h-0 flex-1 grid-cols-[520px_minmax(0,1fr)] gap-6 p-6">
          {/* Panel 1 — webhook payload inspector */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-default-border bg-panel">
            <div className="flex h-11 flex-none items-center gap-2 border-b border-default-border px-4">
              <FileJson className="size-4 text-neutral-500" />
              <span className="text-sm font-medium text-default-font">
                delivery_4821.json
              </span>
              <span className="ml-auto text-xs text-neutral-500">412 B</span>
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
                  value={'"ledger.settled"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"delivery_id"'}
                  valueType="string"
                  value={'"dlv_7f3a2b91-04c8-4d2e-9f61"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"source"'}
                  valueType="string"
                  value={'"https://api.ledgerworks.io/v2/hooks/acc_8842"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"delivered_at"'}
                  valueType="string"
                  value={'"2025-05-14T09:32:07Z"'}
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"attempt"'}
                  valueType="number"
                  value="3"
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"signature_valid"'}
                  valueType="boolean"
                  value="true"
                />
                <JsonTreeNode.JsonTreeNodeLeaf
                  keyName={'"retry_after"'}
                  valueType="null"
                  value="null"
                />
                <JsonTreeNode.JsonTreeNodeBranch
                  keyName={'"payload"'}
                  braceType="object"
                  expanded={true}
                  collapsedBadge="{…} 5 keys"
                >
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"account"'}
                    valueType="string"
                    value={'"acc_8842"'}
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"currency"'}
                    valueType="string"
                    value={'"EUR"'}
                  />
                  <JsonTreeNode.JsonTreeNodeLeaf
                    keyName={'"total"'}
                    valueType="number"
                    value="1430"
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
                        value={'"txn_1042"'}
                      />
                      <JsonTreeNode.JsonTreeNodeLeaf
                        keyName={'"amount"'}
                        valueType="number"
                        value="1042"
                      />
                      <JsonTreeNode.JsonTreeNodeLeaf
                        keyName={'"settled"'}
                        valueType="boolean"
                        value="true"
                      />
                    </JsonTreeNode.JsonTreeNodeBranch>
                    <JsonTreeNode.JsonTreeNodeBranch
                      braceType="object"
                      expanded={false}
                      collapsedBadge="{…} 3 keys"
                      isArrayItem={true}
                      arrayIndex="[1]"
                    >
                      <JsonTreeNode.JsonTreeNodeLeaf
                        keyName={'"id"'}
                        valueType="string"
                        value={'"txn_1043"'}
                      />
                    </JsonTreeNode.JsonTreeNodeBranch>
                  </JsonTreeNode.JsonTreeNodeBranch>
                  <JsonTreeNode.JsonTreeNodeBranch
                    keyName={'"tags"'}
                    braceType="array"
                    expanded={false}
                    collapsedBadge="[…] 2 items"
                  >
                    <JsonTreeNode.JsonTreeNodeLeaf
                      isArrayItem={true}
                      arrayIndex="[0]"
                      valueType="string"
                      value={'"production"'}
                    />
                    <JsonTreeNode.JsonTreeNodeLeaf
                      isArrayItem={true}
                      arrayIndex="[1]"
                      valueType="string"
                      value={'"eu-west-1"'}
                    />
                  </JsonTreeNode.JsonTreeNodeBranch>
                </JsonTreeNode.JsonTreeNodeBranch>
              </JsonTreeNode.JsonTreeNodeBranch>
            </div>
            <div className="flex h-8 flex-none items-center border-t border-default-border px-4 text-xs text-neutral-500">
              signature verified · sha256 · depth 4 · 23 rows
            </div>
          </section>

          {/* Right area — scheduling + parameters */}
          <div className="flex min-h-0 flex-col gap-6">
            {/* Panel 2 — next run window */}
            <section className="flex-none overflow-hidden rounded-lg border border-default-border bg-panel">
              <div className="flex h-11 items-center gap-2 border-b border-default-border px-4">
                <CalendarClock className="size-4 text-neutral-500" />
                <span className="text-sm font-medium text-default-font">
                  Next run window
                </span>
                <span className="ml-auto text-xs text-neutral-500">UTC</span>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-6">
                  <Calendar
                    mode="single"
                    defaultMonth={new Date(2025, 4, 1)}
                    defaultSelected={new Date(2025, 4, 15)}
                    disabled={MAINTENANCE_DATES}
                    modifiers={{ maintenance: MAINTENANCE_DATES }}
                    modifiersClassNames={{
                      maintenance: "[&>button]:line-through opacity-100",
                    }}
                    className="rounded-md bg-transparent p-0"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-xs text-neutral-500">Schedule</span>
                        <span className="text-xs font-medium text-default-font">
                          nightly · 02:00 UTC
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-xs text-neutral-500">Window</span>
                        <span className="text-xs font-medium text-default-font">
                          02:00 – 06:00
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-xs text-neutral-500">Duration</span>
                        <span className="text-xs font-medium text-default-font">
                          4 hours max
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-xs text-neutral-500">Region</span>
                        <span className="text-xs font-medium text-default-font">
                          eu-west-1
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-default-border pt-3">
                      <p className="text-xs font-medium text-neutral-500">
                        Upcoming runs
                      </p>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        <li className="flex items-center justify-between text-xs">
                          <span className="text-default-font">16 May · 02:00</span>
                          <span className="text-neutral-500">queued</span>
                        </li>
                        <li className="flex items-center justify-between text-xs">
                          <span className="text-default-font">17 May · 02:00</span>
                          <span className="text-neutral-500">queued</span>
                        </li>
                        <li className="flex items-center justify-between text-xs">
                          <span className="text-default-font">18 May · 02:00</span>
                          <span className="text-neutral-500">queued</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-neutral-500">
                  Struck-through days are reserved maintenance windows.
                </p>
              </div>
            </section>

            {/* Panel 3 — run parameters */}
            <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-default-border bg-panel">
              <div className="flex h-11 flex-none items-center gap-2 border-b border-default-border px-4">
                <SlidersHorizontal className="size-4 text-neutral-500" />
                <span className="text-sm font-medium text-default-font">
                  Run parameters
                </span>
                <span className="ml-auto text-xs text-neutral-500">
                  applies to next run
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-4">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-default-font">
                      Lookback window
                    </span>
                    <span className="text-xs tabular-nums text-neutral-500">
                      {lookback[0]} – {lookback[1]} h
                    </span>
                  </div>
                  <Slider
                    className="mt-2.5"
                    value={lookback}
                    onValueChange={(v) => setLookback(v as number[])}
                    min={0}
                    max={72}
                    step={1}
                    aria-label="Lookback window"
                  />
                  <p className="mt-1.5 text-xs text-neutral-500">
                    How far back the reconciler scans for unsettled entries.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-default-font">
                      Failure threshold
                    </span>
                    <span className="text-xs tabular-nums text-neutral-500">
                      {threshold[0]} %
                    </span>
                  </div>
                  <Slider
                    className="mt-2.5"
                    value={threshold}
                    onValueChange={(v) => setThreshold(v as number[])}
                    min={0}
                    max={100}
                    step={5}
                    aria-label="Failure threshold"
                  />
                  <p className="mt-1.5 text-xs text-neutral-500">
                    Alert when the share of failed deliveries exceeds this level.
                  </p>
                </div>
                <p className="mt-auto border-t border-default-border pt-3 text-xs text-neutral-500">
                  Parameters are versioned with the runbook and applied at 02:00 UTC.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
