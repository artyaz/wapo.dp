"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Textarea } from "@/components/ui/textarea";
import { TimeScrubber } from "@/components/ds/TimeScrubber";
import { GlassRefraction } from "@/components/ds/GlassRefraction";
import type { MaterialLevel } from "@/lib/glass";
import {
  Activity,
  Check,
  History,
  Layers,
  NotebookPen,
} from "lucide-react";

/**
 * Scenario: "Meridian" incident console — postmortem draft for INC-482
 * (api-gateway latency spike). The on-call is reviewing the traffic window
 * (TimeScrubber) and the auto-compiled incident timeline, writing the
 * postmortem note (Textarea), and picking the glass surface material for
 * the exported incident status card (GlassRefraction specimens).
 */

const MATERIALS: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];
const SELECTED_MATERIAL: MaterialLevel = "regular";

type Tone = "neutral" | "warning" | "destructive" | "success";

const toneDelta: Record<Tone, string> = {
  neutral: "text-muted-foreground",
  warning: "text-warning-500",
  destructive: "text-destructive-500",
  success: "text-success-500",
};

const toneChip: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  warning: "bg-warning-500/15 text-warning-500",
  destructive: "bg-destructive-500/15 text-destructive-500",
  success: "bg-success-500/15 text-success-500",
};

const stats: { label: string; value: string; delta: string; tone: Tone }[] = [
  {
    label: "p99 latency",
    value: "812 ms",
    delta: "+594 ms vs baseline",
    tone: "warning",
  },
  {
    label: "peak error rate",
    value: "1.9 %",
    delta: "baseline 0.4 %",
    tone: "destructive",
  },
  {
    label: "throughput",
    value: "42.3k rpm",
    delta: "peak at 14:00 UTC",
    tone: "neutral",
  },
  {
    label: "impact window",
    value: "63 min",
    delta: "8 % of sessions",
    tone: "neutral",
  },
];

const events: { t: string; tag: string; tone: Tone; text: string }[] = [
  {
    t: "13:04",
    tag: "deploy",
    tone: "neutral",
    text: "api-gateway v2.41.0 rolled to 3 of 12 pods in canary cohort B",
  },
  {
    t: "13:12",
    tag: "alert",
    tone: "warning",
    text: "LAT-p99-500 fired — p99 above 500 ms for five consecutive minutes",
  },
  {
    t: "13:26",
    tag: "cause",
    tone: "destructive",
    text: "Connection-pool exhaustion confirmed — pool capped at 200, retries doubled demand",
  },
  {
    t: "14:02",
    tag: "rollback",
    tone: "neutral",
    text: "Rollback to v2.40.2 started across cohort B, deploys paused",
  },
  {
    t: "14:15",
    tag: "recovered",
    tone: "success",
    text: "Error rate back under 0.5 % — incident marked mitigated",
  },
  {
    t: "15:40",
    tag: "follow-up",
    tone: "neutral",
    text: "Ticket filed: raise pool ceiling and alert on pool_utilization > 80 %",
  },
  {
    t: "17:12",
    tag: "note",
    tone: "neutral",
    text: "Postmortem draft opened by @sre-oncall, review set for Thu 15:00 UTC",
  },
  {
    t: "20:24",
    tag: "watching",
    tone: "neutral",
    text: "p99 stable at 118 ms for 6 h — incident ready to close",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-border bg-card px-4">
          <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-background">
            <Activity className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-semibold leading-none">
              Meridian
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              Incident console · INC-482 · api-gateway
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-success-500/15 px-2.5 py-1 text-[11px] font-medium text-success-500">
              <span className="size-1.5 rounded-full bg-success-500" />
              Mitigated 14:15 UTC
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
              Postmortem draft
            </span>
            <span className="font-code text-xs tabular-nums text-muted-foreground">
              20:24 UTC
            </span>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ── Main: traffic window + timeline ─────────────────────── */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-5">
            {/* Traffic window — TimeScrubber */}
            <section className="flex flex-none flex-col gap-2 rounded-xl border border-border bg-card p-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  requests · api-gateway
                </span>
                <span className="font-code text-[11px] text-muted-foreground/80">
                  13:12 – 20:24 UTC · 48 buckets
                </span>
              </div>
              <TimeScrubber
                rangeStart="13:12"
                rangeEnd="20:24"
                className="px-0 py-1"
              />
            </section>

            {/* Window stats */}
            <section className="grid flex-none grid-cols-4 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3.5"
                >
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="font-code text-xl font-medium leading-none tracking-tight tabular-nums">
                    {s.value}
                  </span>
                  <span className={"text-[11px] " + toneDelta[s.tone]}>
                    {s.delta}
                  </span>
                </div>
              ))}
            </section>

            {/* Incident timeline */}
            <section className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
              <div className="flex flex-none items-center gap-2">
                <History className="size-3.5 text-muted-foreground" />
                <SectionHeading>Incident timeline</SectionHeading>
                <span className="ml-auto text-[11px] text-muted-foreground/80">
                  auto-compiled from alerts, deploys and tickets
                </span>
              </div>
              <div className="flex min-h-0 flex-col gap-2 overflow-hidden">
                {events.map((e) => (
                  <article
                    key={e.t}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card px-3.5 py-2.5"
                  >
                    <time className="w-[42px] flex-none pt-0.5 font-code text-xs tabular-nums text-muted-foreground">
                      {e.t}
                    </time>
                    <span
                      className={
                        "flex flex-none items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide " +
                        toneChip[e.tone]
                      }
                    >
                      {e.tag}
                    </span>
                    <p className="min-w-0 flex-1 pt-0.5 text-sm leading-snug text-foreground/90">
                      {e.text}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* ── Sidebar: postmortem note + card surface picker ─────── */}
          <aside className="flex w-[416px] flex-none flex-col border-l border-border bg-card p-4">
            {/* Postmortem note — Textarea */}
            <section className="flex flex-none flex-col gap-2">
              <div className="flex items-center gap-2">
                <NotebookPen className="size-3.5 text-muted-foreground" />
                <SectionHeading>Postmortem note</SectionHeading>
                <span className="ml-auto font-code text-[11px] tabular-nums text-muted-foreground/80">
                  INC-482
                </span>
              </div>
              <Textarea
                aria-label="Postmortem note"
                defaultValue={
                  "13:12–14:15 UTC — p99 rose 118 ms → 812 ms after v2.41.0 hit 3/12 pods.\n\nCause: pool capped at 200; retries doubled demand.\nImpact: 63 min degraded reads, 9.4 % budget spent."
                }
                className="h-[156px] resize-none overflow-auto"
              />
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Draft · autosaved 17:18 UTC</span>
                <span className="font-code tabular-nums">
                  owner @sre-oncall
                </span>
              </div>
            </section>

            {/* Status card surface — GlassRefraction picker */}
            <section className="mt-4 flex min-h-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <Layers className="size-3.5 text-muted-foreground" />
                <SectionHeading>Status card surface</SectionHeading>
                <span className="ml-auto text-[11px] text-muted-foreground/80">
                  for the exported card
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {MATERIALS.map((material) => {
                  const selected = material === SELECTED_MATERIAL;
                  return (
                    <div
                      key={material}
                      className={
                        "relative rounded-xl border " +
                        (selected
                          ? "border-foreground/45 bg-foreground/[0.04]"
                          : "border-border")
                      }
                    >
                      {selected ? (
                        <span className="absolute right-1.5 top-1.5 z-10 flex size-4 items-center justify-center rounded-full bg-foreground text-background">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                      ) : null}
                      <GlassRefraction material={material} className="py-1.5">
                        <span className="w-full text-center font-code text-[11px] tracking-[0.1em] text-default-font/80 uppercase">
                          {material}
                        </span>
                      </GlassRefraction>
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
