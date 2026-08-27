"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { StatTile } from "@/components/ds/StatTile";
import { DialogLayout } from "@/components/ds/DialogLayout";
import { CandleSeries } from "@/components/ds/CandleSeries";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";
import { Search, TrendingUp } from "lucide-react";

/** Quiet equity-curve sparkline for the position-value tile (deterministic). */
const equitySparkline = (
  <svg
    viewBox="0 0 120 24"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="h-6 w-full text-neutral-400"
  >
    <polyline
      points="0,20 12,21 24,18 36,19 48,15 60,16 72,12 84,13 96,9 108,10 120,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const positionRows = [
  { label: "Shares held", value: "120", tone: "neutral" },
  { label: "Avg cost", value: "$89.10", tone: "neutral" },
  { label: "Unrealized P&L", value: "+$1,958 · +18.3%", tone: "positive" },
] as const;

export default function Page() {
  const [confirmOpen, setConfirmOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      {/* Phone screen: PXN position detail with an open sell confirmation. */}
      <div className="relative flex min-h-screen w-full flex-col px-4 pb-6 pt-5">
        {/* App bar */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Praxis Capital
            </span>
            <span className="text-caption font-caption text-neutral-500">
              Portfolio · Watchlist
            </span>
          </div>
          <button
            type="button"
            aria-label="Search holdings"
            className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-solid border-default-border bg-panel text-neutral-500"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>
        </header>

        {/* Quote tiles */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatTile label="PXN last" value="105.42" footer="Today's close" />
          <StatTile
            label="Day change"
            value="+1.24%"
            sign="positive"
            footer="vs. previous close"
          />
        </div>

        {/* Position value with equity sparkline */}
        <div className="mt-3">
          <StatTile
            label="Position value"
            value="$12,650"
            delta="+$1,958"
            sign="positive"
            footer="120 shares · avg cost $89.10"
            sparkline={equitySparkline}
          />
        </div>

        {/* Price chart */}
        <section className="mt-4 rounded-lg border border-solid border-default-border bg-panel p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
              PXN · Praxis Daily Index
            </span>
            <span className="font-code text-[11px] tabular-nums text-neutral-400">
              105.42{" "}
              <span className="text-success-700">+1.24%</span>
            </span>
          </div>
          <div className="mt-3 flex justify-center">
            <CandleSeries />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="font-code text-[10px] text-neutral-400">
              14 sessions · daily OHLC
            </span>
            <span className="font-code text-[10px] text-neutral-400">
              vol 1.2M
            </span>
          </div>
        </section>

        {/* Position details */}
        <section className="mt-4 rounded-lg border border-solid border-default-border bg-panel">
          <div className="px-4 pb-1.5 pt-3">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
              Position
            </span>
          </div>
          {positionRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-t border-solid border-default-border px-4 py-2.5"
            >
              <span className="text-body font-body text-neutral-500">
                {row.label}
              </span>
              <span
                className={`font-code text-[13px] tabular-nums ${
                  row.tone === "positive" ? "text-success-700" : "text-default-font"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </section>

        {/* Sell confirmation — open on load */}
        <DialogLayout
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          modal={false}
          className="absolute inset-0"
        >
          <div className="flex w-10 shrink-0 flex-col items-start gap-2 pt-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-neutral-100 text-neutral-500">
              <TrendingUp size={18} strokeWidth={1.75} />
            </div>
            <span className="text-caption font-caption text-neutral-500">
              PXN
            </span>
          </div>
          <div className="flex w-[248px] max-w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                Sell PXN position?
              </SubframeCore.Dialog.Title>
              <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
                Sells your 120 shares at the next market print (~$12,650).
                Proceeds settle to your cash balance at today&apos;s close.
              </SubframeCore.Dialog.Description>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setConfirmOpen(false)}>Sell shares</Button>
            </div>
          </div>
        </DialogLayout>
      </div>
    </EvalShell>
  );
}
