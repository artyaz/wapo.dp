"use client";

/**
 * EVAL page (pair-121) — ds:MethodChip + ui:date-picker + ds:EntityTabs
 * Conditions: desktop 1280x800, dark theme, LTR, no constraint.
 *
 * Scenario: "Beacon Gateway" audit console. The header carries the audit
 * window (a range DatePicker, closed with a pinned selection). The left card
 * lists the `records` service endpoints — each row led by a MethodChip (all
 * five verbs, including one disabled/paused route). The right card inspects
 * the service record: an EntityTabs strip (Details active) over a details
 * grid, plus a "next compliance sweep" single DatePicker. A quiet
 * window-activity log closes the page below.
 */

import React from "react";
import type { DateRange } from "react-day-picker";
import { ChevronRight, Radar } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { MethodChip } from "@/components/ds/MethodChip";
import { EntityTabs } from "@/components/ds/EntityTabs";
import { DatePicker } from "@/components/ui/date-picker";

// Pinned dates so the screenshot is fully deterministic.
const WINDOW_FROM = new Date(2026, 7, 17); // Mon, Aug 17 2026
const WINDOW_TO = new Date(2026, 7, 23); // Sun, Aug 23 2026
const NEXT_SWEEP = new Date(2026, 7, 25); // Tue, Aug 25 2026

type Verb = "get" | "post" | "put" | "patch" | "delete";

const ROUTES: Array<{
  method: Verb;
  path: string;
  note: string;
  calls: string;
  disabled?: boolean;
}> = [
  {
    method: "get",
    path: "/v1/records",
    note: "List records · cursor pagination",
    calls: "12.4k",
  },
  {
    method: "post",
    path: "/v1/records",
    note: "Create record · validates payload",
    calls: "1.8k",
  },
  {
    method: "put",
    path: "/v2/records/{id}",
    note: "Replace record · full overwrite",
    calls: "312",
  },
  {
    method: "patch",
    path: "/v1/records/{id}",
    note: "Update fields · partial merge",
    calls: "904",
  },
  {
    method: "delete",
    path: "/v1/records/{id}",
    note: "Delete record · 30-day soft hold",
    calls: "87",
  },
  {
    method: "get",
    path: "/v1/records/{id}/meta",
    note: "Metrics export · paused during migration",
    calls: "paused",
    disabled: true,
  },
];

const DETAILS: Array<[string, string]> = [
  ["Service", "records"],
  ["Record ID", "SVC-0142"],
  ["Owner", "platform-core"],
  ["Region", "eu-west-1"],
  ["Version", "v1.4.2"],
  ["Endpoints", "12 active · 1 paused"],
  ["Rate limit", "600 req/min"],
  ["Updated", "Aug 23, 2026 · 14:02 UTC"],
];

const ACTIVITY: Array<{ time: string; text: string }> = [
  {
    time: "Aug 23 · 04:12 UTC",
    text: "Weekly compliance sweep passed — 47 checks, 3 flags escalated to the audit queue.",
  },
  {
    time: "Aug 21 · 16:48 UTC",
    text: "Rate limit raised from 400 to 600 req/min by m.ohara (platform-core).",
  },
  {
    time: "Aug 18 · 09:03 UTC",
    text: "Endpoint PUT /v2/records/{id} deployed — cutover migration 60% complete.",
  },
];

export default function Page() {
  const [auditWindow, setAuditWindow] = React.useState<
    DateRange | undefined
  >({
    from: WINDOW_FROM,
    to: WINDOW_TO,
  });
  const [sweepDate, setSweepDate] = React.useState<Date | undefined>(
    NEXT_SWEEP
  );

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto w-full max-w-[1140px] px-8 py-6">
        {/* ── console header: brand + audit window filter ─────────── */}
        <header className="flex items-center justify-between gap-6 border-b border-solid border-default-border pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 flex-none items-center justify-center rounded-lg border border-solid border-default-border bg-panel/60">
              <Radar className="size-4 text-default-font" />
            </div>
            <div className="flex min-w-0 flex-col">
              <h1 className="text-[15px] font-semibold leading-[19px] text-default-font">
                Beacon Gateway
              </h1>
              <p className="text-[12px] leading-[16px] text-muted-foreground">
                api.beacon.internal · audit console
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-3">
            <span className="text-[12px] leading-[16px] text-muted-foreground">
              Audit window
            </span>
            <DatePicker
              mode="range"
              value={auditWindow}
              onValueChange={setAuditWindow}
              format="LLL d"
            />
          </div>
        </header>

        {/* ── main: endpoint list + service record inspector ──────── */}
        <div className="mt-6 grid grid-cols-[400px_1fr] items-start gap-8">
          {/* endpoints (child records) */}
          <aside className="flex flex-col rounded-xl border border-solid border-default-border bg-panel/40">
            <div className="flex items-baseline justify-between gap-3 border-b border-solid border-default-border px-4 py-3">
              <h2 className="text-[13px] font-semibold leading-[17px] text-default-font">
                Endpoints
              </h2>
              <span className="font-code text-[11px] leading-[14px] text-neutral-400 tabular-nums">
                12 total
              </span>
            </div>
            <div className="flex flex-col divide-y divide-default-border">
              {ROUTES.map((route) => (
                <div
                  key={`${route.method} ${route.path}`}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <div className="flex w-[60px] flex-none items-center">
                    <MethodChip
                      method={route.method}
                      disabled={route.disabled}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <code className="min-w-0 truncate font-code text-[12px] leading-[15px] text-default-font">
                        {route.path}
                      </code>
                      <span className="flex-none font-code text-[11px] leading-[15px] text-neutral-400 tabular-nums">
                        {route.calls}
                      </span>
                    </div>
                    <span className="truncate text-[11.5px] leading-[15px] text-neutral-500">
                      {route.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-solid border-default-border px-4 py-2.5">
              <span className="text-[12px] font-medium leading-[16px] text-default-font">
                View all 12 endpoints
              </span>
              <ChevronRight className="size-3.5 flex-none text-neutral-500" />
            </div>
          </aside>

          {/* service record inspector */}
          <section className="flex min-w-0 flex-col rounded-xl border border-solid border-default-border bg-panel/40 px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-[16px] font-semibold leading-[20px] text-default-font">
                    records
                  </h2>
                  <span className="rounded border border-solid border-default-border px-1.5 py-0.5 font-code text-[10.5px] font-[500] leading-[13px] tracking-[0.06em] text-neutral-500">
                    SVC-0142
                  </span>
                </div>
                <p className="truncate text-[12.5px] leading-[17px] text-muted-foreground">
                  Service · owned by platform-core · indexed 2 hours ago
                </p>
              </div>
              <span className="mt-0.5 flex flex-none items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel/60 px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-success-500" />
                <span className="font-code text-[11px] font-[500] uppercase leading-none tracking-[0.08em] text-default-font">
                  Indexed
                </span>
              </span>
            </div>

            {/* record-level tab strip */}
            <div className="mt-4">
              <EntityTabs />
            </div>

            {/* Details tab content */}
            <dl className="grid grid-cols-2 gap-x-10 gap-y-3 pt-4">
              {DETAILS.map(([label, value]) => (
                <div key={label} className="flex items-baseline gap-3">
                  <dt className="w-[92px] flex-none text-[12.5px] leading-[17px] text-neutral-500">
                    {label}
                  </dt>
                  <dd className="min-w-0 truncate text-[13px] leading-[17px] text-default-font">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* audit scheduling */}
            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-solid border-default-border pt-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-medium leading-[16px] text-default-font">
                  Next compliance sweep
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <DatePicker
                    id="next-sweep"
                    value={sweepDate}
                    onValueChange={setSweepDate}
                    format="EEE, MMM d"
                  />
                  <span className="text-[12px] leading-[16px] text-muted-foreground">
                    weekly · Tuesdays 04:00 UTC
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                <span className="font-code text-[11px] uppercase leading-[14px] tracking-[0.08em] text-neutral-400">
                  Last sweep · Aug 18
                </span>
                <span className="flex items-center gap-1.5 text-[12.5px] leading-[17px] text-default-font">
                  <span className="size-1.5 flex-none rounded-full bg-warning-500" />
                  47 checks passed · 3 open flags
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ── window activity log ─────────────────────────────────── */}
        <section className="mt-6 border-t border-solid border-default-border pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-[13px] font-semibold leading-[17px] text-default-font">
              Window activity
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400 tabular-nums">
              Aug 17 – Aug 23, 2026 · 47 events
            </span>
          </div>
          <div className="mt-1 flex flex-col divide-y divide-default-border">
            {ACTIVITY.map((entry) => (
              <div
                key={entry.time}
                className="flex items-baseline gap-5 py-2.5"
              >
                <span className="w-[150px] flex-none font-code text-[11px] leading-[15px] text-neutral-400 tabular-nums">
                  {entry.time}
                </span>
                <p className="min-w-0 text-[12.5px] leading-[17px] text-default-font/85">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
