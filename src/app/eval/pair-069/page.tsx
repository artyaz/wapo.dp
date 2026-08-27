"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { RefreshCw } from "lucide-react";
import { createColumnHelper, DataTable } from "@/components/ui/data-table";
import { Progress } from "@/components/ui/progress";
import { PayloadInspector } from "@/components/ds/PayloadInspector";

// ---------------------------------------------------------------------------
// Data — a small slice of the payout ledger queue
// ---------------------------------------------------------------------------

type PayoutStatus = "pending" | "processing" | "success" | "failed";

interface Payout {
  id: string;
  status: PayoutStatus;
  email: string;
  amount: number;
}

const payouts: Payout[] = [
  { id: "489e1d42", status: "processing", email: "example@gmail.com", amount: 125 },
  { id: "9a3b41c7", status: "success", email: "ken99@yahoo.com", amount: 350 },
  { id: "728ed52f", status: "pending", email: "m@example.com", amount: 100 },
  { id: "b5f02e18", status: "failed", email: "jane.doe@outlook.com", amount: 75 },
  { id: "c2d81f93", status: "success", email: "payments@acme.co", amount: 2200 },
];

const statusDot: Record<PayoutStatus, string> = {
  pending: "bg-muted-foreground/50",
  processing: "bg-primary",
  success: "bg-emerald-500",
  failed: "bg-destructive",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// ---------------------------------------------------------------------------
// Columns — cell formatting patterns from the data-table demo
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<Payout>();

const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
    size: 82,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-xs capitalize">
        <span
          className={`size-1.5 shrink-0 rounded-full ${statusDot[row.original.status]}`}
        />
        {row.getValue("status")}
      </div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Account",
    cell: ({ row }) => (
      <div className="truncate text-xs lowercase text-muted-foreground">
        {row.getValue("email")}
      </div>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right text-xs">Amount</div>,
    size: 84,
    cell: ({ row }) => (
      <div className="text-right text-xs font-medium tabular-nums">
        {currency.format(row.getValue("amount"))}
      </div>
    ),
  }),
]);

// Raw payload of the batch currently being processed
const BATCH_PAYLOAD = `{
  "batch": "payouts-08-26",
  "status": "processing",
  "completed": 17,
  "total": 24,
  "amount": 1835.4,
  "currency": "USD"
}`;

// ---------------------------------------------------------------------------
// Page — compact payout-sync data table view (360x640, dark, no scroll)
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-svh flex-col gap-3 p-3">
        {/* App header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Payout Sync</h1>
            <p className="text-[11px] text-muted-foreground">
              Batch #24 · ledger queue
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
            <RefreshCw className="size-3" />
            Live
          </span>
        </header>

        {/* Batch progress */}
        <section className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between text-[11px]">
            <span className="font-medium">Processing payouts</span>
            <span className="tabular-nums text-muted-foreground">
              17 of 24 · 68%
            </span>
          </div>
          <Progress value={68} className="h-1.5" />
        </section>

        {/* Recent payouts table */}
        <section className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[11px] font-medium text-muted-foreground">
              Recent payouts
            </h2>
            <span className="text-[10px] text-muted-foreground/70">
              updated 12s ago
            </span>
          </div>
          <DataTable
            columns={columns}
            data={payouts}
            showPagination={false}
          />
        </section>

        {/* Raw payload of the running batch */}
        <section className="mt-auto flex flex-col gap-1.5">
          <p className="text-[11px] font-medium text-muted-foreground">
            Raw payload · running batch
          </p>
          <PayloadInspector
            language="json"
            filename="batch-24.json"
            code={BATCH_PAYLOAD}
            maxHeightClass="max-h-[104px]"
          />
        </section>
      </div>
    </EvalShell>
  );
}
