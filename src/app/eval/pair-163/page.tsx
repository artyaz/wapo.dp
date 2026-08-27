"use client";

/**
 * EVAL page (pair-163) — components: ui:toggle-group, ds:TimelineRuler,
 * ds:FormSection.
 * Conditions: 390x420 compact surface (half phone), light theme, ltr,
 * no constraint, scenario: an analytics dashboard.
 *
 * Scenario: the "Live funnel" inspector — a compact dock sheet from an
 * analytics dashboard. A KPI strip summarizes sessions / conversion / p95,
 * the ToggleGroup picks the time window feeding the timeline, the
 * TimelineRuler is the pannable time axis with ◆ deploy markers, and the
 * FormSection groups the anomaly-alert rule readout at the bottom.
 */

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TimelineRuler } from "@/components/ds/TimelineRuler";
import { FormSection } from "@/components/ds/FormSection";

// ---------------------------------------------------------------------------
// Supporting chrome — KPI stat + alert-rule row
// ---------------------------------------------------------------------------

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
      <span className="font-code text-[10px] uppercase tracking-[0.08em] text-neutral-500">
        {label}
      </span>
      <span className="text-[13px] font-medium tabular-nums text-default-font">
        {value}
      </span>
    </div>
  );
}

function RuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <span className="text-caption font-caption text-neutral-500">
        {label}
      </span>
      <span className="font-code text-[11px] text-default-font">{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-dvh w-full flex-col gap-3 px-4 py-4">
        {/* Header — sheet identity */}
        <header className="flex w-full shrink-0 items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              Analytics / Checkout
            </span>
            <div className="flex items-center gap-2">
              <span
                className="size-1.5 shrink-0 rounded-full bg-emerald-500"
                aria-hidden
              />
              <h1 className="text-heading-3 font-heading-3 text-default-font">
                Live funnel
              </h1>
            </div>
          </div>
          <span className="mt-1 shrink-0 font-code text-[11px] text-neutral-400">
            14:02 UTC
          </span>
        </header>

        {/* KPI strip */}
        <div className="flex w-full shrink-0 items-center gap-2 rounded-lg border border-solid border-default-border bg-panel px-2 py-2">
          <Stat label="Sessions" value="12,408" />
          <div className="h-7 w-px shrink-0 bg-default-border" />
          <Stat label="Conv. rate" value="3.2%" />
          <div className="h-7 w-px shrink-0 bg-default-border" />
          <Stat label="p95" value="412 ms" />
        </div>

        {/* Time window — ui:toggle-group */}
        <div className="flex w-full shrink-0 items-center justify-between gap-3">
          <ToggleGroup
            type="single"
            defaultValue="2h"
            variant="outline"
            size="sm"
            aria-label="Time window"
          >
            <ToggleGroupItem value="15m" className="px-3">
              15m
            </ToggleGroupItem>
            <ToggleGroupItem value="1h" className="px-3">
              1h
            </ToggleGroupItem>
            <ToggleGroupItem value="2h" className="px-3">
              2h
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="shrink-0 font-code text-[11px] text-neutral-400">
            24 px/s
          </span>
        </div>

        {/* Timeline — ds:TimelineRuler */}
        <section
          aria-label="Checkout latency timeline"
          className="flex w-full shrink-0 flex-col rounded-lg border border-solid border-default-border bg-panel p-3"
        >
          <div className="mb-2 flex w-full items-baseline justify-between gap-3">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
              checkout latency
            </span>
            <span className="shrink-0 font-code text-[11px] text-neutral-400">
              00:00–02:00
            </span>
          </div>
          <div className="relative">
            <div className="overflow-x-auto">
              <TimelineRuler />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-panel to-transparent" />
          </div>
          <p className="mt-2 font-code text-[11px] text-neutral-400">
            ◆ deploy markers · major tick 10 s · swipe to pan
          </p>
        </section>

        {/* Alert rule — ds:FormSection */}
        <FormSection
          sectionLabel="Anomaly alert"
          hint="Fires when p95 latency holds above budget for 2 minutes."
        >
          <RuleRow label="Threshold" value="p95 > 450 ms" />
          <RuleRow label="Notify" value="#analytics-ops · email" />
        </FormSection>
      </div>
    </EvalShell>
  );
}
