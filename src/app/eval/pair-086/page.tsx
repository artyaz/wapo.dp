"use client";

/**
 * pair-086 — "קופה פלוס" payments console (light, 768×1024 portrait tablet, RTL / Hebrew).
 *
 * A store manager reviews the morning shift: KPI cards across the top (the
 * conversion card carries an open info Tooltip; the failed-payments card has a
 * hover Tooltip), a weekly revenue line chart with a reversed RTL axis, and a
 * DataTable of the latest payments with status badges and ILS-formatted
 * amounts. The CSV export button is disabled mid-sync — a Tooltip explains why.
 */

import React from "react";
import {
  CreditCard,
  Download,
  Info,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  createColumnHelper,
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type PaymentStatus = "success" | "pending" | "processing" | "failed";

type Payment = {
  ref: string;
  customer: string;
  method: string;
  status: PaymentStatus;
  amount: number;
};

const PAYMENTS: Payment[] = [
  { ref: "#4821", customer: "noam.cohen@gmail.com", method: "ויזה •• 4242", status: "success", amount: 8400 },
  { ref: "#4820", customer: "yuval.levi@walla.co.il", method: "מאסטרקארד •• 8310", status: "pending", amount: 1290 },
  { ref: "#4819", customer: "tamar.ben.david@gmail.com", method: "Apple Pay", status: "success", amount: 3450 },
  { ref: "#4818", customer: "orders@lumen.shop", method: "העברה בנקאית", status: "processing", amount: 12400 },
  { ref: "#4817", customer: "dana.rubin@gmail.com", method: "ויזה •• 1180", status: "failed", amount: 220 },
  { ref: "#4816", customer: "avi.shaked@hotmail.com", method: "מזומן בקופה", status: "success", amount: 760 },
  { ref: "#4815", customer: "shir.pinto@gmail.com", method: "ויזה •• 4242", status: "success", amount: 5980 },
  { ref: "#4814", customer: "billing@vertex.dev", method: "מאסטרקארד •• 0717", status: "pending", amount: 2150 },
  { ref: "#4813", customer: "ori.feldman@proton.me", method: "Apple Pay", status: "failed", amount: 480 },
];

const STATUS: Record<PaymentStatus, { label: string; dot: string }> = {
  success: { label: "הושלם", dot: "bg-emerald-600" },
  pending: { label: "ממתין", dot: "bg-amber-500" },
  processing: { label: "בעיבוד", dot: "bg-neutral-400" },
  failed: { label: "נכשל", dot: "bg-red-500" },
};

const shekel = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// ---------------------------------------------------------------------------
// Chart
// ---------------------------------------------------------------------------

const revenue = [
  { day: "א׳", online: 4200, register: 2600 },
  { day: "ב׳", online: 5100, register: 3100 },
  { day: "ג׳", online: 4680, register: 2880 },
  { day: "ד׳", online: 5600, register: 3420 },
  { day: "ה׳", online: 6180, register: 3960 },
  { day: "ו׳", online: 8420, register: 5240 },
  { day: "ש׳", online: 7140, register: 4380 },
];

const DAYS: Record<string, string> = {
  "א׳": "יום ראשון",
  "ב׳": "יום שני",
  "ג׳": "יום שלישי",
  "ד׳": "יום רביעי",
  "ה׳": "יום חמישי",
  "ו׳": "יום שישי",
  "ש׳": "יום שבת",
};

const chartConfig = {
  online: { label: "אונליין", color: "var(--chart-1)" },
  register: { label: "קופה", color: "var(--chart-2)" },
} satisfies ChartConfig;

// ---------------------------------------------------------------------------
// Table columns
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<Payment>();

const columns = columnHelper.columns([
  columnHelper.accessor("ref", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="אסמכתא" />
    ),
    cell: ({ row }) => (
      <span dir="ltr" className="font-mono text-[13px] text-muted-foreground">
        {row.getValue("ref")}
      </span>
    ),
    size: 96,
  }),
  columnHelper.accessor("customer", {
    header: "לקוח",
    cell: ({ row }) => (
      <span dir="ltr" className="block max-w-[200px] truncate text-[13px]">
        {row.getValue("customer")}
      </span>
    ),
  }),
  columnHelper.accessor("method", {
    header: "אמצעי תשלום",
    cell: ({ row }) => (
      <span className="text-[13px] text-muted-foreground">
        {row.getValue("method")}
      </span>
    ),
    size: 168,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="סטטוס" />
    ),
    cell: ({ row }) => {
      const s = STATUS[row.getValue<PaymentStatus>("status")];
      return (
        <Badge variant="outline" className="gap-1.5 px-2 text-[11px]">
          <span className={`size-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </Badge>
      );
    },
    size: 108,
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-end">סכום</div>,
    cell: ({ row }) => (
      <div className="text-end font-medium tabular-nums">
        {shekel.format(row.getValue<number>("amount"))}
      </div>
    ),
    size: 104,
  }),
]);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card/60 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg border bg-primary/5">
            <CreditCard className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">קופה פלוס</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm text-muted-foreground">תשלומים</span>
          <Badge variant="outline" className="text-[11px] text-muted-foreground">
            סניף ראשי
          </Badge>
          <div className="ms-auto flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" aria-label="רענון">
              <RefreshCw />
            </Button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full border bg-muted text-[11px] font-medium">
                נ׳
              </div>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                נועה אבידן · מנהלת
              </span>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-5">
          {/* Page title */}
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="text-lg font-semibold tracking-tight">
              מבט־על יומי
            </h1>
            <span className="text-xs text-muted-foreground">
              שבת · 09:42 · משמרת בוקר
            </span>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">הכנסות היום</p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
                {shekel.format(11520)}
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                <TrendingUp className="size-3 text-(--ds-color-success-600)" />
                <span className="font-medium text-(--ds-color-success-700)">
                  12.4%
                </span>
                <span>מאתמול</span>
              </p>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>שיעור המרה</span>
                <Tooltip defaultOpen>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        aria-label="מה זה שיעור המרה?"
                        className="text-muted-foreground/70 transition-colors hover:text-foreground"
                      />
                    }
                  >
                    <Info className="size-3.5" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={8}
                    dir="rtl"
                    className="max-w-[220px]"
                  >
                    <p>
                      הזמנות שהושלם בהן תשלום, מתוך הסלים שנפתחו ב־24 השעות
                      האחרונות
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
                68.4%
              </p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                214 הזמנות · 24 שע׳
              </p>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>תשלומים שנכשלו</span>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        aria-label="פירוט תשלומים שנכשלו"
                        className="text-muted-foreground/70 transition-colors hover:text-foreground"
                      />
                    }
                  >
                    <Info className="size-3.5" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={8}
                    dir="rtl"
                    className="max-w-[220px]"
                  >
                    <p>כולל 3 ניסיונות חיוב חוזרים אוטומטיים</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
                7
              </p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                מתוכם 3 ממתינים לניסיון חוזר
              </p>
            </div>
          </div>

          {/* Revenue chart */}
          <section className="rounded-2xl border bg-card p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  הכנסות בשבוע האחרון
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  אונליין מול קופה · ₪
                </p>
              </div>
              <div
                className="flex items-center gap-0.5 rounded-lg border bg-muted/40 p-0.5"
                aria-label="טווח תצוגה"
              >
                <button
                  type="button"
                  className="rounded-md bg-background px-2.5 py-1 text-[11px] font-medium shadow-xs"
                >
                  7 ימים
                </button>
                <button
                  type="button"
                  className="rounded-md px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  30 יום
                </button>
                <button
                  type="button"
                  className="rounded-md px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  90 יום
                </button>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[210px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={revenue}
                margin={{ top: 6, left: 4, right: 4 }}
              >
                <CartesianGrid vertical={false} orientation="right" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  reversed
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        DAYS[String(value)] ?? String(value)
                      }
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="online"
                  type="monotone"
                  stroke="var(--color-online)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="register"
                  type="monotone"
                  stroke="var(--color-register)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </section>

          {/* Payments table */}
          <section className="rounded-2xl border bg-card p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  תשלומים אחרונים
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  9 מתוך 214 הזמנות · מיון לפי אסמכתא
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground">
                סנכרון בתהליך…
              </span>
            </div>

            <DataTable
              columns={columns}
              data={PAYMENTS}
              defaultSorting={[{ id: "ref", desc: true }]}
              defaultPagination={{ pageIndex: 0, pageSize: 8 }}
              getRowId={(p) => p.ref}
              toolbar={
                <div className="flex w-full flex-wrap items-center gap-2">
                  <Button variant="secondary" size="sm">
                    הכל
                  </Button>
                  <Button variant="outline" size="sm">
                    הושלם
                  </Button>
                  <Button variant="outline" size="sm">
                    ממתין
                  </Button>
                  <Button variant="outline" size="sm">
                    נכשל
                  </Button>
                  <div className="ms-auto">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <span className="inline-block w-fit">
                            <Button variant="outline" size="sm" disabled>
                              <Download />
                              ייצוא CSV
                            </Button>
                          </span>
                        }
                      />
                      <TooltipContent
                        side="bottom"
                        sideOffset={6}
                        dir="rtl"
                      >
                        <p>הייצוא יהיה זמין בסיום הסנכרון</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              }
            />
          </section>
        </main>

        <footer className="border-t px-5 py-3">
          <p className="text-center text-[11px] text-muted-foreground">
            הנתונים מסונכרנים ממערכת הקופות · עדכון אחרון 09:42
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
