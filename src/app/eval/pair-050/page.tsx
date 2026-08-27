"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import { AgentActivity } from "@/components/ds/AgentActivity";
import { StatusBadge } from "@/components/ds/StatusBadge";
import {
  ArrowUpIcon,
  DatabaseIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  GlobeIcon,
  HardDriveIcon,
  SparklesIcon,
} from "lucide-react";

const AGENTS = [
  {
    name: "Retriever",
    sub: "workspace + web",
    icon: DatabaseIcon,
    tone: "live" as const,
    label: "Live",
  },
  {
    name: "Index sync",
    sub: "12 documents",
    icon: HardDriveIcon,
    tone: "success" as const,
    label: "Synced",
  },
  {
    name: "Web monitor",
    sub: "rate-limited",
    icon: GlobeIcon,
    tone: "warning" as const,
    label: "Degraded",
  },
  {
    name: "Summarizer",
    sub: "queued",
    icon: SparklesIcon,
    tone: "idle" as const,
    label: "Idle",
  },
];

const SOURCES = [
  { title: "Q3 pipeline review", meta: "workspace · docx", icon: FileTextIcon },
  { title: "Procurement hold log", meta: "CRM export · csv", icon: FileSpreadsheetIcon },
  { title: "Finance export Q3", meta: "workspace · xlsx", icon: FileSpreadsheetIcon },
  { title: "Northwind freight terms", meta: "web · northwind-freight.com", icon: GlobeIcon },
  { title: "Atlas Media MSA (v4)", meta: "workspace · pdf", icon: FileTextIcon },
  { title: "Halden security policy", meta: "web · halden.io", icon: GlobeIcon },
  { title: "Deal desk minutes — Aug", meta: "workspace · docx", icon: FileTextIcon },
  { title: "Renewal forecast model", meta: "workspace · xlsx", icon: FileSpreadsheetIcon },
];

const STATS = [
  { label: "Deals reviewed", value: "9" },
  { label: "Slipped past close", value: "3" },
  { label: "Revenue at risk", value: "$1.1M" },
  { label: "Citations drafted", value: "3" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-dvh flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 flex-none items-center gap-4 border-b border-solid border-default-border px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-default-font text-default-background">
              <SparklesIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-default-font">
              Praxis Research
            </span>
          </div>
          <div className="h-4 w-px bg-default-border" />
          <span className="truncate text-sm text-neutral-500">Q3 revenue brief</span>
          <div className="ml-auto flex flex-none items-center gap-4">
            <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
              06:12 elapsed
            </span>
            <StatusBadge tone="live">Run active</StatusBadge>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-500">
              AK
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Sidebar — agent roster + sources */}
          <aside className="flex w-[280px] flex-none flex-col gap-7 overflow-hidden border-r border-solid border-default-border px-5 py-6">
            <section className="flex flex-col gap-3">
              <span className="font-code text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                Agents
              </span>
              <div className="flex flex-col gap-2">
                {AGENTS.map((agent) => (
                  <div key={agent.name} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                      <agent.icon className="h-4 w-4" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-body-medium font-medium text-default-font">
                        {agent.name}
                      </span>
                      <span className="truncate text-caption text-neutral-500">
                        {agent.sub}
                      </span>
                    </div>
                    <StatusBadge tone={agent.tone} className="flex-none">
                      {agent.label}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <span className="font-code text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                Sources · 8 of 12 loaded
              </span>
              <div className="flex flex-col gap-2.5">
                {SOURCES.map((source) => (
                  <div key={source.title} className="flex items-center gap-2.5">
                    <source.icon className="h-4 w-4 flex-none text-neutral-400" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-caption text-default-font">
                        {source.title}
                      </span>
                      <span className="truncate font-code text-[10px] tracking-[0.02em] text-neutral-500">
                        {source.meta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-auto flex flex-col gap-2 border-t border-solid border-default-border pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-code text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                  Run budget
                </span>
                <span className="text-caption tabular-nums text-neutral-500">
                  84k / 120k tokens
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-[70%] rounded-full bg-default-font" />
              </div>
            </div>
          </aside>

          {/* Main panel — reasoning trace */}
          <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex flex-none items-start justify-between gap-6 border-b border-solid border-default-border px-8 py-5">
              <div className="flex min-w-0 flex-col gap-1.5">
                <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                  reasoning trace · run 4471 · deep research
                </span>
                <h1 className="text-lg font-semibold leading-7 tracking-tight text-default-font">
                  Which enterprise deals slipped in Q3 because of procurement
                  holds?
                </h1>
              </div>
              <button className="flex flex-none items-center gap-2 rounded-md border border-solid border-default-border px-3 py-1.5 text-caption text-neutral-600">
                <DownloadIcon className="h-3.5 w-3.5" />
                Export brief
              </button>
            </div>

            <div className="flex flex-none items-center gap-8 border-b border-solid border-default-border px-8 py-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-caption text-neutral-500">
                    {stat.label}
                  </span>
                  <span className="text-body-medium font-semibold tabular-nums text-default-font">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Transcript — trailing steps defocus under the scrim */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 z-0 px-8 pb-8">
                {/* ReasoningLog retired — beats fold into the single
                    expanding AgentActivity object. */}
                <AgentActivity
                  label="Worked for 4m 12s"
                  defaultOpen
                  className="w-full max-w-[780px]"
                  steps={[
                    {
                      kind: "skill",
                      summary: "Parse brief request",
                      traces: [
                        {
                          kind: "skill",
                          label: "Resolved to two constraints: enterprise tier, deals expected to close in Q3.",
                        },
                      ],
                    },
                    {
                      kind: "api",
                      summary: "Retrieve workspace index",
                      traces: [
                        {
                          kind: "api",
                          label: "Loaded 3 of 12 candidate documents; two superseded by later revisions.",
                        },
                      ],
                    },
                    {
                      kind: "command",
                      summary: "Cross-check CRM pipeline",
                      traces: [
                        {
                          kind: "command",
                          label: "Matched 9 enterprise deals worth $4.2M; 3 slipped past their close date, all citing procurement holds.",
                        },
                      ],
                    },
                    {
                      kind: "api",
                      summary: "Read procurement threads",
                      traces: [
                        {
                          kind: "api",
                          label: "Hold notices confirmed for Northwind Freight and Atlas Media; Halden Systems cites a security review.",
                        },
                      ],
                    },
                    {
                      kind: "command",
                      summary: "Estimate revenue impact",
                      traces: [
                        {
                          kind: "command",
                          label: "Slipped deals push $1.1M from Q3 into Q4 at current stage durations.",
                        },
                      ],
                    },
                    {
                      kind: "edits",
                      summary: "Draft citation set",
                      traces: [
                        {
                          kind: "skill",
                          label: "Chose passages 04, 09 and 11 — closest to the question with no overlap.",
                        },
                      ],
                    },
                    {
                      kind: "command",
                      summary: "Reconcile finance export",
                      traces: [
                        {
                          kind: "command",
                          label: "Pipeline totals match to within 0.3%; kept the CRM figure as the source of truth.",
                        },
                      ],
                    },
                  ]}
                />
              </div>

              <AtmosphereScrim />
            </div>

            {/* Follow-up composer — below the scrim field, never over content */}
            <div className="flex flex-none items-center border-t border-solid border-default-border px-8 py-4">
              <div className="flex h-11 w-full max-w-[780px] items-center gap-3 rounded-full border border-solid border-default-border bg-default-background px-5 shadow-xs">
                <span className="truncate text-body-medium text-neutral-500">
                  Ask a follow-up about this run…
                </span>
                <span className="ml-auto flex h-7 w-7 flex-none items-center justify-center rounded-full bg-default-font text-default-background">
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
