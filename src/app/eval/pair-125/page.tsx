"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import {
  createColumnHelper,
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data — a small, realistic batch of payments awaiting reconciliation
// ---------------------------------------------------------------------------

type TxStatus = "success" | "pending" | "processing" | "failed";

type Tx = {
  id: string;
  status: TxStatus;
  merchant: string;
  method: string;
  date: string;
  amount: number;
};

const TRANSACTIONS: Tx[] = [
  { id: "tx_9014", status: "success", merchant: "Lumen Studio", method: "Card ·· 4242", date: "Mar 12", amount: 316 },
  { id: "tx_9013", status: "pending", merchant: "Meridian Supply Co.", method: "ACH transfer", date: "Mar 12", amount: 1240 },
  { id: "tx_9012", status: "success", merchant: "Orbit Labs", method: "Wire", date: "Mar 11", amount: 2890 },
  { id: "tx_9011", status: "failed", merchant: "Vertex Freight", method: "Card ·· 5536", date: "Mar 11", amount: 186 },
  { id: "tx_9010", status: "processing", merchant: "Hana Ramen Bar", method: "Apple Pay", date: "Mar 10", amount: 42.5 },
  { id: "tx_9009", status: "success", merchant: "Northwind Trading", method: "SEPA debit", date: "Mar 10", amount: 754 },
  { id: "tx_9008", status: "pending", merchant: "Cascade Print Co.", method: "Card ·· 0917", date: "Mar 09", amount: 129 },
  { id: "tx_9007", status: "success", merchant: "Aperture Films", method: "Wire", date: "Mar 08", amount: 1950 },
  { id: "tx_9006", status: "processing", merchant: "Solstice Yoga", method: "ACH transfer", date: "Mar 08", amount: 98 },
  { id: "tx_9005", status: "success", merchant: "Tidewater Books", method: "Card ·· 4242", date: "Mar 07", amount: 63.25 },
  { id: "tx_9004", status: "failed", merchant: "Ironclad Fitness", method: "Card ·· 8821", date: "Mar 06", amount: 300 },
  { id: "tx_9003", status: "success", merchant: "Bluebird Coffee", method: "Apple Pay", date: "Mar 06", amount: 24.75 },
];

const STATUS_DOT: Record<TxStatus, string> = {
  success: "bg-success-500",
  pending: "bg-warning-500",
  processing: "bg-neutral-500",
  failed: "bg-destructive-500",
};

const STATS = [
  { label: "Cleared", value: "$5,998", dot: "bg-success-500" },
  { label: "Pending settlement", value: "$1,510", dot: "bg-warning-500" },
  { label: "Failed", value: "$486", dot: "bg-destructive-500" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<Tx>();

const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className={`size-1.5 flex-none rounded-full ${STATUS_DOT[row.original.status]}`}
        />
        <span className="capitalize">{row.original.status}</span>
      </div>
    ),
  }),
  columnHelper.accessor("merchant", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Merchant" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.merchant}</span>,
  }),
  columnHelper.accessor("method", {
    header: "Method",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.method}</span>
    ),
  }),
  columnHelper.accessor("date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {row.original.date}
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {currency.format(row.original.amount)}
      </div>
    ),
  }),
]);

// ---------------------------------------------------------------------------
// Page — payment ledger reconciliation (portrait tablet, dark)
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col px-6 pb-6 pt-6">
        {/* top bar — location + sync state */}
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Finance</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Payments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ledger</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <span className="flex flex-none items-center gap-1.5 text-caption text-muted-foreground">
            <RefreshCw className="size-3.5" />
            Synced 14:02
          </span>
        </div>

        {/* title row */}
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-heading-2 text-foreground">Payment ledger</h1>
            <p className="mt-1 text-caption text-muted-foreground">
              Reconciliation · March statement #4471
            </p>
          </div>
          <button
            type="button"
            className="flex flex-none items-center gap-1.5 rounded-md border border-solid border-default-border px-3 py-1.5 text-caption text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="size-3.5" />
            Export
          </button>
        </div>

        {/* settlement summary */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-solid border-default-border bg-panel px-4 py-3"
            >
              <p className="flex items-center gap-1.5 text-caption text-muted-foreground">
                <span className={`size-1.5 flex-none rounded-full ${stat.dot}`} />
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ledger card — trailing rows defocus under the scrim, pagination
            pill docks on the blur field */}
        <section className="relative mt-5 overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
          <div className="relative px-5 pb-3 pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-heading-3 text-foreground">Recent payments</h2>
              <span className="text-caption text-muted-foreground">
                Last 7 days · 12 payments
              </span>
            </div>
            <div className="mt-3">
              <DataTable
                columns={columns}
                data={TRANSACTIONS}
                defaultPagination={{ pageIndex: 0, pageSize: 10 }}
                footer={(table) => (
                  <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center">
                    <div className="flex items-center gap-1 rounded-full border border-solid border-default-border bg-panel/80 py-1 pl-4 pr-1.5 backdrop-blur-md">
                      <span className="text-caption text-muted-foreground">
                        Showing 10 of 12
                      </span>
                      <span className="mx-1.5 h-4 w-px flex-none bg-default-border" />
                      <button
                        type="button"
                        aria-label="Previous page"
                        disabled={!table.getCanPreviousPage()}
                        className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      <span className="min-w-8 text-center text-caption font-medium tabular-nums text-foreground">
                        {table.getState().pagination.pageIndex + 1} /{" "}
                        {table.getPageCount()}
                      </span>
                      <button
                        type="button"
                        aria-label="Next page"
                        disabled={!table.getCanNextPage()}
                        className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          <AtmosphereScrim />
        </section>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between pt-5 text-caption text-muted-foreground">
          <span>Auto-reconcile on · matching rules v12</span>
          <span>Statement closes Mar 31</span>
        </div>
      </div>
    </EvalShell>
  );
}
