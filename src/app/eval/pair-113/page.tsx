"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import { QueryInput } from "@/components/ds/QueryInput";
import { SlaTimer } from "@/components/ds/SlaTimer";
import { TerminalLine } from "@/components/ds/TerminalLine";

import {
  Activity,
  ChevronRight,
  Search,
  Terminal,
  Users,
} from "lucide-react";

/**
 * pair-113 — Praxis Observability · incident console for a SEV-1 alert
 * (INC-2471 "checkout 5xx spike"), 1280×800 desktop, light, ltr.
 *
 * Layout: the mitigation-clock SlaTimer sits in the top bar next to the
 * incident chip; the left column carries the query explorer (ds:QueryInput,
 * drafting the error-rate query) above a live log tail of the affected
 * service (ds:TerminalLine); the right rail holds the response clocks
 * (ds:SlaTimer in warning/neutral tones) and the responder roster.
 */

const responseClocks = [
  {
    label: "Next status update",
    note: "customer comms thread",
    tone: "warning" as const,
    timecode: "00:04:32",
    showDot: true,
  },
  {
    label: "On-call ack window",
    note: "secondary responder paged",
    tone: "neutral" as const,
    timecode: "00:14:52",
    showDot: true,
  },
  {
    label: "Error budget reset",
    note: "checkout · 28-day window",
    tone: "neutral" as const,
    timecode: "6d 12:00",
    showDot: false,
  },
];

const responders = [
  { initials: "MK", name: "Maya K.", role: "Incident commander" },
  { initials: "DP", name: "Devon P.", role: "Payments on-call" },
  { initials: "SL", name: "Sofia L.", role: "Support lead" },
];

const savedQueries = ["checkout-error-rate", "prod-5xx", "cart-latency"];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ── top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-solid border-default-border bg-panel px-5">
          <div className="flex size-7 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-background">
            <Activity className="size-4 text-neutral-700" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            Praxis
          </span>
          <span className="text-caption font-caption text-neutral-400">
            Observability
          </span>

          <div className="mx-2 flex items-center gap-1.5 text-caption font-caption text-neutral-400">
            <span>Incidents</span>
            <ChevronRight className="size-3.5" />
            <span className="text-neutral-600">INC-2471</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-sm bg-destructive-500/10 px-2 py-1 font-code text-[11px] font-[600] text-destructive-600">
              SEV-1 · checkout 5xx spike
            </span>
            <div className="flex items-center gap-2">
              <span className="text-caption font-caption text-neutral-500">
                Mitigation due
              </span>
              <SlaTimer
                tone="breach"
                timecode="00:00:18"
                showDot
                className="flex-none"
              />
            </div>
          </div>
        </header>

        {/* ── main ────────────────────────────────────────────────── */}
        <main className="flex min-h-0 flex-1">
          {/* left column — query explorer + live tail */}
          <div className="flex min-w-0 flex-1 flex-col gap-5 p-6">
            {/* query explorer */}
            <section className="rounded-xl border border-solid border-default-border bg-panel p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold text-neutral-800">
                    Query explorer
                  </h2>
                  <div className="flex items-center gap-1 rounded-md border border-solid border-default-border bg-background p-0.5">
                    <span className="rounded-[4px] bg-neutral-800 px-2 py-1 text-caption font-caption text-neutral-50">
                      Metrics
                    </span>
                    <span className="px-2 py-1 text-caption font-caption text-neutral-400">
                      Logs
                    </span>
                    <span className="px-2 py-1 text-caption font-caption text-neutral-400">
                      Traces
                    </span>
                  </div>
                </div>
                <span className="font-code text-[11px] text-neutral-400">
                  ⌘↵ to run · last run 2 min ago
                </span>
              </div>

              <div className="mt-4">
                <QueryInput />
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-solid border-default-border pt-3.5">
                <Search className="size-3.5 flex-none text-neutral-400" />
                <span className="text-caption font-caption text-neutral-500">
                  Saved
                </span>
                {savedQueries.map((q) => (
                  <span
                    key={q}
                    className="rounded-full border border-solid border-default-border bg-background px-2.5 py-0.5 font-code text-[11px] text-neutral-600"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </section>

            {/* live tail */}
            <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-solid border-default-border bg-panel">
              <div className="flex flex-none items-center justify-between gap-3 border-b border-solid border-default-border px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-neutral-500" />
                  <h2 className="text-sm font-semibold text-neutral-800">
                    Live tail
                  </h2>
                  <span className="font-code text-[11px] text-neutral-400">
                    checkout · us-east-1
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-caption font-caption text-neutral-500">
                  <span className="size-1.5 flex-none rounded-full bg-success-600" />
                  streaming · 3/3 replicas
                </span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-hidden px-5 py-4">
                <TerminalLine
                  variant="prompt"
                  path="~/praxis"
                  command="tail --service checkout --level warn --follow"
                />
                <TerminalLine
                  variant="stdout"
                  text="attached to 3/3 replicas · buffer 96%"
                />
                <TerminalLine
                  variant="stdout"
                  text="14:02:09 checkout-api  POST /v1/cart/merge  500  182ms"
                />
                <TerminalLine
                  variant="stdout"
                  text="14:02:11 checkout-api  POST /v1/cart/merge  503  44ms"
                />
                <TerminalLine
                  variant="stderr"
                  text="error: upstream timeout → payments-api (euw-2) after 3 retries"
                />
                <TerminalLine
                  variant="spinner"
                  text="tailing · 1,284 events/min"
                />
                <TerminalLine
                  variant="success"
                  text="circuit breaker half-open · traffic shifted to usw-1"
                />
              </div>
            </section>
          </div>

          {/* right rail — response clocks + responders */}
          <aside className="flex w-[320px] flex-none flex-col gap-5 border-l border-solid border-default-border bg-neutral-50 p-5">
            <section className="rounded-xl border border-solid border-default-border bg-panel p-4">
              <h2 className="text-sm font-semibold text-neutral-800">
                Response clocks
              </h2>
              <ul className="mt-3.5 flex flex-col gap-3">
                {responseClocks.map((clock) => (
                  <li
                    key={clock.label}
                    className="flex items-center justify-between gap-2 border-b border-solid border-default-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-neutral-800">
                        {clock.label}
                      </p>
                      <p className="mt-0.5 truncate text-caption font-caption text-neutral-400">
                        {clock.note}
                      </p>
                    </div>
                    <SlaTimer
                      tone={clock.tone}
                      timecode={clock.timecode}
                      showDot={clock.showDot}
                      className="flex-none"
                    />
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-solid border-default-border bg-panel p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-800">
                  Responders
                </h2>
                <span className="flex items-center gap-1 text-caption font-caption text-neutral-400">
                  <Users className="size-3.5" />
                  3 on the bridge
                </span>
              </div>
              <ul className="mt-3.5 flex flex-col gap-3">
                {responders.map((person) => (
                  <li key={person.initials} className="flex items-center gap-2.5">
                    <span className="flex size-7 flex-none items-center justify-center rounded-full border border-solid border-default-border bg-background font-code text-[10px] text-neutral-600">
                      {person.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-neutral-800">
                        {person.name}
                      </p>
                      <p className="truncate text-caption font-caption text-neutral-400">
                        {person.role}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-auto text-caption font-caption leading-relaxed text-neutral-400">
              Mitigation playbook step 4 of 7 — awaiting confirmation that
              error rate stays under 0.5% for 5 minutes before downgrading
              severity.
            </p>
          </aside>
        </main>

        {/* ── status bar ──────────────────────────────────────────── */}
        <footer className="flex h-9 flex-none items-center justify-between border-t border-solid border-default-border bg-panel px-5">
          <span className="flex items-center gap-1.5 text-caption font-caption text-neutral-500">
            <span className="size-1.5 flex-none rounded-full bg-success-600" />
            Streaming · data fresh within 15s
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            us-east-1 · p50 ingest 42ms · retention 30d
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
