"use client";

/**
 * EVAL page (pair-061) — analytics dashboard "insight dock".
 * Components: ui:Separator, ds:ActivityEvent, ds:ActionTraces
 * Conditions: 390x420 half-phone sheet, dark theme, ltr, no constraint.
 *
 * Scenario: a bottom inspector dock on an analytics dashboard. It summarizes
 * the revenue dashboard (KPI strip), the data-pipeline activity timeline that
 * feeds it, and the traces of the insight agent that just investigated an
 * anomaly in the checkout funnel.
 */

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import { Separator } from "@/components/ui/separator";
import { ActivityEvent } from "@/components/ds/ActivityEvent";
import { ActionTraces } from "@/components/ds/ActionTraces";

const stats = [
  { label: "Events", value: "48.2K" },
  { label: "P95 latency", value: "312 ms" },
  { label: "Error rate", value: "0.4%" },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col border-t border-default-border bg-panel">
        {/* sheet grabber */}
        <div className="mx-auto mt-1.5 h-1 w-9 flex-none rounded-full bg-neutral-400" />

        {/* dock header */}
        <header className="flex items-baseline justify-between px-4 pb-1 pt-2">
          <h1 className="text-heading-3 font-heading-3 text-default-font">
            Revenue dashboard
          </h1>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-success-500" />
            <span className="text-caption font-caption leading-[19px] text-neutral-500">
              Live
            </span>
          </span>
        </header>

        {/* KPI strip */}
        <div className="flex h-12 items-stretch gap-4 px-4">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <Separator orientation="vertical" />}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                <span className="truncate text-caption font-caption text-neutral-500">
                  {s.label}
                </span>
                <span className="text-body-medium font-body-medium font-medium tabular-nums text-default-font">
                  {s.value}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="px-4">
          <Separator className="my-2" />
        </div>

        {/* pipeline activity timeline */}
        <section className="px-4">
          <div className="flex items-baseline justify-between pb-1">
            <h2 className="text-caption font-caption font-medium text-neutral-500">
              Pipeline activity
            </h2>
            <span className="font-code text-[12px] leading-[16px] tabular-nums text-neutral-500">
              09:41 – 09:44
            </span>
          </div>
          <ActivityEvent
            author="dbt"
            timestamp="09:41:07"
            body="Synced 1.2M rows into metrics.daily"
            isFirst
          />
          <ActivityEvent
            variant="system"
            body="Anomaly detected → insight agent queued"
          />
          <ActivityEvent
            variant="email"
            subject="alerts@northwind"
            timestamp="09:44:52"
            isLast
          />
        </section>

        <div className="px-4">
          <Separator className="my-2" />
        </div>

        {/* insight agent run traces */}
        <section className="px-4 pb-3">
          <div className="flex items-baseline justify-between pb-2">
            <h2 className="text-caption font-caption font-medium text-neutral-500">
              Insight agent
            </h2>
            <span className="font-code text-[12px] leading-[16px] tabular-nums text-neutral-500">
              run #482 · 1.4 s
            </span>
          </div>
          <ActionTraces
            items={[
              { kind: "skill", label: "Loaded skill: metrics/anomaly-scan" },
              { kind: "command", label: "SELECT region, SUM(total) FROM orders" },
              { kind: "api", label: "GET /v1/query?range=24h — 200 (312ms)" },
            ]}
          />
        </section>
      </div>
    </EvalShell>
  );
}
