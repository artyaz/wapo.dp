"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Card } from "@/components/ds/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { EntityTabs } from "@/components/ds/EntityTabs";

/**
 * pair-172 — record workspace with a line-items data table.
 * Tablet portrait 768x1024, dark theme, RTL, no-scroll.
 * Stars: ds:Card (table panel + quiet sources panel), ui:skeleton
 * (loading table rows + connecting source), ds:EntityTabs (record tabs).
 */

type RowState = "synced" | "pending" | "failed";

interface LineItem {
  id: string;
  item: string;
  qty: string;
  updated: string;
  state: RowState;
}

const LINE_ITEMS: LineItem[] = [
  { id: "LN-1042", item: "Steel bracket · 8 mm", qty: "240", updated: "2 h ago", state: "synced" },
  { id: "LN-1043", item: "Copper coil · 12 m", qty: "96", updated: "2 h ago", state: "synced" },
  { id: "LN-1044", item: "Rubber gasket set", qty: "1,204", updated: "3 h ago", state: "pending" },
  { id: "LN-1045", item: "Aluminium sheet · A2", qty: "48", updated: "4 h ago", state: "synced" },
  { id: "LN-1046", item: "Nylon fastener · M5", qty: "720", updated: "5 h ago", state: "failed" },
  { id: "LN-1047", item: "Brass hinge · 40 mm", qty: "312", updated: "5 h ago", state: "pending" },
  { id: "LN-1048", item: "Copper wire · 2.5 mm²", qty: "560", updated: "6 h ago", state: "synced" },
  { id: "LN-1049", item: "Steel washer · M8", qty: "1,080", updated: "7 h ago", state: "synced" },
];

const STATE_DOT: Record<RowState, string> = {
  synced: "bg-success-500",
  pending: "bg-warning-500",
  failed: "bg-destructive-500",
};

const DETAILS: Array<[string, string]> = [
  ["Owner", "m.ohara"],
  ["Source", "North wh"],
  ["Destination", "Central wh"],
  ["Lines", "12"],
];

const GRID_COLS = "grid grid-cols-[14px_88px_minmax(0,1fr)_60px_84px] items-center gap-x-3";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="mx-auto flex w-full max-w-[720px] flex-col px-6 py-6">
        {/* page header */}
        <header className="flex w-full items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col items-start gap-0.5">
            <h1 className="font-heading-3 text-heading-3 text-default-font">
              Transfer TRF-0042
            </h1>
            <p className="font-caption text-caption text-neutral-500">
              inventory transfer · created 2 h ago · due tomorrow 09:00
            </p>
          </div>
          <span className="mt-1 flex shrink-0 items-center gap-1.5 rounded-full border border-solid border-default-border px-2.5 py-1">
            <span className="size-1.5 animate-pulse rounded-full bg-warning-500" />
            <span className="font-caption text-[12px] leading-[14px] text-neutral-400">
              Syncing
            </span>
          </span>
        </header>

        {/* record-level tabs */}
        <div className="mt-3">
          <EntityTabs />
        </div>

        {/* details strip (the active "Details" tab content) */}
        <div className="grid w-full grid-cols-4 gap-x-4 px-1 pt-3">
          {DETAILS.map(([label, value]) => (
            <div key={label} className="flex min-w-0 flex-col gap-0.5">
              <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                {label}
              </span>
              <span className="truncate text-[13px] leading-[18px] text-default-font">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* line items data table */}
        <Card
          className="mt-3 w-full"
          header={
            <div className="flex w-full flex-col items-start gap-0.5">
              <span className="text-body-medium text-default-font">Line items</span>
              <span className="font-caption text-caption text-neutral-500">
                12 lines · synced 2 min ago
              </span>
            </div>
          }
          footer={
            <>
              <span className="font-caption text-caption text-neutral-400">
                Rows 1–8 of 12
              </span>
              <span className="font-caption text-caption text-neutral-400">
                auto-refresh on
              </span>
            </>
          }
        >
          <div className="w-full">
            {/* table head */}
            <div className={`${GRID_COLS} border-b border-solid border-default-border pb-2`}>
              <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                State
              </span>
              <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                Line
              </span>
              <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                Item
              </span>
              <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                Qty
              </span>
              <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                Updated
              </span>
            </div>

            {/* loaded rows */}
            {LINE_ITEMS.map((row) => (
              <div
                key={row.id}
                className={`${GRID_COLS} border-b border-solid border-default-border py-2.5`}
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${STATE_DOT[row.state]}`}
                  title={row.state}
                />
                <span className="font-code text-[12px] leading-[18px] tabular-nums text-default-font">
                  {row.id}
                </span>
                <span className="min-w-0 truncate text-[13px] leading-[18px] text-default-font">
                  {row.item}
                </span>
                <span className="font-code text-[12px] leading-[18px] tabular-nums text-default-font">
                  {row.qty}
                </span>
                <span className="text-[12px] leading-[18px] text-neutral-500">
                  {row.updated}
                </span>
              </div>
            ))}

            {/* loading caption + skeleton rows for the lines still syncing */}
            <div className="flex items-center gap-2 py-2.5">
              <span className="size-1.5 animate-pulse rounded-full bg-neutral-400" />
              <span className="font-caption text-[12px] leading-[16px] text-neutral-400">
                Syncing 2 more lines
              </span>
            </div>
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`${GRID_COLS} py-2.5 ${
                  i === 1 ? "" : "border-b border-solid border-default-border"
                }`}
              >
                <Skeleton className="size-2 shrink-0 rounded-full" />
                <Skeleton className="h-3 w-[64px]" />
                <Skeleton className="h-3 w-full max-w-[210px]" />
                <Skeleton className="h-3 w-[32px]" />
                <Skeleton className="h-3 w-[48px]" />
              </div>
            ))}
          </div>
        </Card>

        {/* sync sources — one still connecting (skeleton state) */}
        <Card
          variant="quiet"
          className="mt-4 w-full"
          header={
            <span className="font-caption text-caption text-neutral-500">
              Sync sources
            </span>
          }
        >
          <div className="flex w-full flex-col gap-2.5">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-solid border-default-border font-code text-[12px] leading-[14px] text-neutral-400">
                  N
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[13px] leading-[18px] text-default-font">
                    North warehouse API
                  </span>
                  <span className="font-caption text-[12px] leading-[16px] text-neutral-500">
                    synced · 2 min ago
                  </span>
                </div>
              </div>
              <span className="size-2 shrink-0 rounded-full bg-success-500" title="synced" />
            </div>

            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-full" />
                <div className="grid gap-1.5">
                  <Skeleton className="h-3 w-[150px]" />
                  <Skeleton className="h-3 w-[92px]" />
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="size-1.5 animate-pulse rounded-full bg-warning-500" />
                <span className="font-caption text-[12px] leading-[14px] text-neutral-400">
                  connecting
                </span>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </EvalShell>
  );
}
