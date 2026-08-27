"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { CrosshairTag } from "@/components/ds/CrosshairTag";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  CreditCard,
  Database,
  Globe,
} from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-dvh flex-col bg-muted/40">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="size-4" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">
                Pulse Analytics
              </h1>
              <p className="text-xs text-muted-foreground">
                Store performance · Jun 1 – 11, 2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">
              <Spinner data-icon="inline-start" />
              Live sync
            </Badge>
            <span className="text-xs tabular-nums text-muted-foreground">
              Updated 12s ago
            </span>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-[minmax(0,1fr)_296px] items-start gap-6 p-6">
          {/* Left column — KPIs + charts */}
          <div className="flex min-w-0 flex-col gap-6">
            {/* KPI row */}
            <section className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Sessions
                </p>
                <p className="mt-2 font-code text-2xl font-bold tabular-nums">
                  48,210
                </p>
                <p className="mt-1 font-code text-xs tabular-nums text-success-600">
                  +4.2% vs prior period
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Checkout conversion
                </p>
                <p className="mt-2 font-code text-2xl font-bold tabular-nums">
                  3.42%
                </p>
                <p className="mt-1 font-code text-xs tabular-nums text-success-600">
                  +0.18 pts vs prior period
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Avg. order value
                </p>
                <div className="mt-2 flex h-8 items-center gap-2 text-muted-foreground">
                  <Spinner />
                  <span className="text-sm">Crunching numbers…</span>
                </div>
                <p className="mt-1 font-code text-xs tabular-nums text-muted-foreground">
                  3 batches queued
                </p>
              </div>
            </section>

            {/* Signal inspector — chart readouts */}
            <section className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-semibold">Signal inspector</h2>
                <span className="text-xs text-muted-foreground">
                  readings pinned at the crosshair
                </span>
              </div>
              <div className="mt-4 flex justify-center gap-8">
                <figure className="flex w-[260px] flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                      Conversion · 15m
                    </span>
                    <span className="font-code text-[11px] text-neutral-400">
                      storefront
                    </span>
                  </div>
                  <CrosshairTag
                    value="3.42%"
                    glyph="+0.18"
                    timestamp="2025-06-11 14:32:05"
                  />
                </figure>
                <figure className="flex w-[260px] flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                      Latency p95 · 1m
                    </span>
                    <span className="font-code text-[11px] text-neutral-400">
                      edge
                    </span>
                  </div>
                  <CrosshairTag
                    value="212ms"
                    glyph="−14"
                    timestamp="2025-06-11 14:31:58"
                  />
                </figure>
              </div>
            </section>
          </div>

          {/* Right column — sources + granularity */}
          <aside className="flex flex-col gap-6">
            {/* Data sources */}
            <section className="rounded-lg border border-border bg-background p-4">
              <h2 className="text-sm font-semibold">Data sources</h2>
              <ul className="mt-2 flex flex-col divide-y divide-border">
                <li className="flex items-center justify-between gap-2 py-2.5 first:pt-1">
                  <span className="flex items-center gap-2.5 text-sm">
                    <Globe className="size-4 shrink-0 text-muted-foreground" />
                    Web events
                  </span>
                  <Badge>
                    <Spinner data-icon="inline-start" />
                    Syncing
                  </Badge>
                </li>
                <li className="flex items-center justify-between gap-2 py-2.5">
                  <span className="flex items-center gap-2.5 text-sm">
                    <CreditCard className="size-4 shrink-0 text-muted-foreground" />
                    Payments
                  </span>
                  <Badge variant="secondary">
                    <Spinner data-icon="inline-start" />
                    Updating
                  </Badge>
                </li>
                <li className="flex items-center justify-between gap-2 py-2.5 last:pb-0">
                  <span className="flex items-center gap-2.5 text-sm">
                    <Database className="size-4 shrink-0 text-muted-foreground" />
                    Warehouse
                  </span>
                  <span className="font-code text-xs tabular-nums text-muted-foreground">
                    Queued · 02:00
                  </span>
                </li>
              </ul>
            </section>

            {/* Report granularity */}
            <section className="rounded-lg border border-border bg-background p-4">
              <h2 className="text-sm font-semibold">Report granularity</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Applies to every chart on this dashboard.
              </p>
              <RadioGroup defaultValue="daily" className="mt-4">
                <FieldLabel htmlFor="gran-hourly">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Hourly</FieldTitle>
                      <FieldDescription>
                        672 points · best for live ops
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="hourly" id="gran-hourly" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="gran-daily">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Daily</FieldTitle>
                      <FieldDescription>
                        28 points · balanced view
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="daily" id="gran-daily" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="gran-weekly">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Weekly</FieldTitle>
                      <FieldDescription>
                        4 points · trend only
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="weekly" id="gran-weekly" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </section>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
