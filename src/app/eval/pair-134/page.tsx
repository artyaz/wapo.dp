"use client";

import React from "react";
import { GitBranch, Server } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { GlassChip } from "@/components/ds/GlassChip";
import { CodePane } from "@/components/ds/CodePane";
import { StatTile } from "@/components/ds/StatTile";

/**
 * pair-134 — "Service inspector": a desktop (1280×800, light, ltr) page from an
 * internal developer console showing the health of `ledger-service`.
 *
 * Layout: a quiet app header with env + git info, a row of ds:StatTile metrics
 * (p99 latency with sparkline, requests, error rate, instances), the service's
 * entrypoint source in a ds:CodePane (cursor resting on the
 * `createLedgerEntry` signature described by the pinned hover doc card), a
 * deploy summary rail, and a floating ds:GlassChip command capsule docked at
 * the bottom over a soft wash (deploy / restart / rollback).
 */
const latencySparkline = (
  <svg
    viewBox="0 0 120 24"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="h-6 w-full text-neutral-400"
  >
    <polyline
      points="0,18 12,17 24,19 36,14 48,15 60,10 72,12 84,8 96,9 108,5 120,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const checks: Array<[label: string, value: string]> = [
  ["Unit tests", "148/148"],
  ["Typecheck", "clean"],
  ["Migrations", "0 pending"],
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative min-h-screen w-full">
        {/* soft wash at the foot of the page so the glass capsule's
            blur / sheen reads against something */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(15,23,42,0.06),transparent)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-[1120px] flex-col px-8 pb-24 pt-6">
          {/* ── app header ─────────────────────────────────────────────── */}
          <header className="flex flex-none items-center gap-3">
            <span className="flex size-8 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel">
              <Server className="size-4 text-default-font" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="text-[15px] font-semibold leading-5 text-default-font">
                ledger-service
              </h1>
              <p className="font-code text-[11px] leading-4 text-neutral-500">
                api · eu-west-1 · v2.14.3
              </p>
            </div>
            <span className="flex flex-none items-center gap-1.5 rounded-full border border-solid border-default-border px-2 py-1">
              <span className="size-1.5 rounded-full bg-success-500" aria-hidden="true" />
              <span className="text-[11px] font-medium leading-none text-neutral-500">
                healthy
              </span>
            </span>
            <span className="ml-auto flex flex-none items-center gap-1.5 font-code text-[11px] leading-none text-neutral-500">
              <GitBranch className="size-3.5 text-neutral-400" aria-hidden="true" />
              main · a41f9c2
            </span>
          </header>

          {/* ── metrics row — ds:StatTile ──────────────────────────────── */}
          <section className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                Metrics · last 24 hours
              </h2>
              <span className="font-code text-[11px] leading-none text-neutral-400">
                auto-refresh 30s
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatTile
                label="P99 latency"
                value="42.1ms"
                footer="vs. previous 24h"
                sparkline={latencySparkline}
              />
              <StatTile
                label="Requests"
                value="1,204"
                delta="+8.1%"
                sign="positive"
                footer="last 24 hours"
              />
              <StatTile
                label="Error rate"
                value="0.12%"
                delta="+0.04"
                sign="negative"
                footer="5xx + timeouts"
              />
              <StatTile
                label="Instances"
                value="6/6"
                footer="all serving traffic"
              />
            </div>
          </section>

          {/* ── source + deploy rail ───────────────────────────────────── */}
          <div className="mt-6 grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section className="min-w-0">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                  Source · src/services/ledger.ts
                </h2>
                <span className="font-code text-[11px] leading-none text-neutral-400">
                  read-only
                </span>
              </div>
              <CodePane>
                <CodePane.CodeLine lineNumber="1">
                  {'import { validateEntry } from "./validate";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="2">
                  {'import type { CreateEntryInput, LedgerEntry } from "./types";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="3" />
                <CodePane.CodeLine lineNumber="4" currentLine={true}>
                  export async function createLedgerEntry(
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="5">
                  <span className="pl-4">input: CreateEntryInput</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="6">{'): Promise<LedgerEntry> {'}</CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="7">
                  <span className="pl-4">validateEntry(input);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="8">
                  <span className="pl-4">
                    const entry = {"{ ...input, id: nextId() }"};
                  </span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="9">
                  <span className="pl-4">await wal.append(entry);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="10">
                  <span className="pl-4">return entry;</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="11">{'}'}</CodePane.CodeLine>
              </CodePane>
            </section>

            <aside className="flex flex-col gap-3">
              <div className="rounded-lg border border-solid border-default-border bg-panel px-4 py-4">
                <div className="flex items-center gap-2">
                  <GitBranch
                    className="size-3.5 flex-none text-neutral-400"
                    aria-hidden="true"
                  />
                  <h2 className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                    Last deploy
                  </h2>
                </div>
                <p className="mt-2 text-[13px] font-medium leading-5 text-default-font">
                  fix: batch wal flushes
                </p>
                <p className="mt-0.5 font-code text-[11px] leading-4 text-neutral-500">
                  a41f9c2 · dana@praxis.dev
                </p>
                <p className="mt-0.5 font-code text-[11px] leading-4 text-neutral-400">
                  deployed 2h ago · 38s build
                </p>
                <div className="mt-3 flex flex-col gap-2 border-t border-solid border-default-border pt-3">
                  {checks.map(([label, value]) => (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className="size-1.5 flex-none rounded-full bg-success-500"
                        aria-hidden="true"
                      />
                      <span className="text-[12px] leading-none text-default-font">
                        {label}
                      </span>
                      <span className="ml-auto font-code text-[11px] leading-none text-neutral-500">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── floating command capsule — ds:GlassChip ──────────────────── */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <GlassChip>
            <GlassChip.Action glyph="⌘" label="Deploy" />
            <GlassChip.Rule />
            <GlassChip.Action glyph="↻" label="Restart" />
            <GlassChip.Rule />
            <GlassChip.Action glyph="⇧" label="Rollback" tone="destructive" />
            <GlassChip.Action glyph="↗" disabled />
          </GlassChip>
        </div>
      </div>
    </EvalShell>
  );
}
