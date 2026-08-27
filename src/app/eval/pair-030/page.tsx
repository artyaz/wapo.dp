"use client";

/**
 * EVAL page (pair-030) — agent operations console.
 * Components: ds:ActionTraces, ds:MiniMap, ds:SlaTimer
 * Conditions: desktop 1440x900, light theme, ltr.
 *
 * Scenario: a runbook-agent is working incident INC-40221 ("Latency spike on
 * us-west-2"). The console shows its live activity transcript with granular
 * ActionTraces, the runbook outline it is editing mirrored in a glass MiniMap,
 * and the SLA countdowns (overall resolution clock in the header, per-task
 * queue timers on the right).
 */

import React from "react";
import { ActivityIcon, HourglassIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { ActionTraces } from "@/components/ds/ActionTraces";
import { MiniMap } from "@/components/ds/MiniMap";
import { SlaTimer } from "@/components/ds/SlaTimer";
import { ToolSummaryRow } from "@/components/ds/ToolSummaryRow";

/** Runbook outline geometry (percentages) — mirrored 1:1 in the MiniMap. */
const DOC_LAYOUT = [
  { left: "8%", top: "5%", width: "58%", height: "6%" }, // title
  { left: "8%", top: "15%", width: "84%", height: "3%" }, // summary lines
  { left: "8%", top: "21%", width: "84%", height: "3%" },
  { left: "8%", top: "29%", width: "26%", height: "4%" }, // 1 · Detect
  { left: "8%", top: "37%", width: "84%", height: "3%" },
  { left: "8%", top: "43%", width: "84%", height: "3%" },
  { left: "8%", top: "51%", width: "30%", height: "4%" }, // 2 · Mitigate
  { left: "8%", top: "59%", width: "84%", height: "16%" }, // command block
  { left: "8%", top: "79%", width: "24%", height: "4%" }, // 3 · Verify
  { left: "8%", top: "87%", width: "84%", height: "3%" }, // closing lines
  { left: "8%", top: "93%", width: "52%", height: "3%" },
];

/** The runbook region the agent is currently editing. */
const VIEWPORT = { left: "34%", top: "46%", width: "58%", height: "40%" };

/** Escalation queue — each task carries its own SLA clock. */
const QUEUE = [
  {
    task: "Acknowledge page",
    owner: "auto · pager",
    tone: "breach",
    timecode: "00:00:18",
    showDot: true,
  },
  {
    task: "Post status-page update",
    owner: "agent · draft ready",
    tone: "warning",
    timecode: "00:04:32",
    showDot: true,
  },
  {
    task: "Notify customer success",
    owner: "r.okafor",
    tone: "neutral",
    timecode: "00:18:05",
    showDot: true,
  },
  {
    task: "Escalate to major incident",
    owner: "needs manual approval",
    tone: "neutral",
    timecode: "00:45:00",
    showDot: false,
  },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
      {children}
    </h2>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex h-screen w-full flex-col gap-5 p-6">
        {/* Header — incident identity + overall SLA clocks */}
        <header className="flex items-center justify-between gap-4 rounded-lg border border-solid border-default-border bg-panel px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-solid border-default-border bg-default-background">
              <ActivityIcon className="size-4 text-neutral-500" />
            </span>
            <div className="min-w-0">
              <p className="text-caption font-caption text-neutral-400">
                Agent operations · us-west-2
              </p>
              <h1 className="truncate text-heading-3 font-heading-3 text-default-font">
                Runbook agent — INC-40221
              </h1>
            </div>
          </div>
          <div className="flex flex-none items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-caption font-caption text-neutral-400">
                resolution SLA
              </span>
              <SlaTimer tone="warning" timecode="00:12:07" showDot />
            </div>
            <div className="h-8 w-px bg-default-border" />
            <div className="flex items-center gap-2">
              <span className="text-caption font-caption text-neutral-400">
                session
              </span>
              <SlaTimer timecode="00:31:44" />
            </div>
          </div>
        </header>

        {/* Main — activity transcript + runbook/queue column */}
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-5">
          {/* Live activity — ToolSummaryRow macro rows with ActionTraces micro traces */}
          <section className="flex min-h-0 flex-col rounded-lg border border-solid border-default-border bg-panel p-5">
            <div className="flex items-baseline justify-between">
              <SectionLabel>Live activity</SectionLabel>
              <span className="font-code text-[11px] leading-[14px] text-neutral-400">
                streaming · step 5 of 6
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-4">
              <ToolSummaryRow
                kind="skill"
                traces={
                  <ActionTraces
                    items={[
                      {
                        kind: "skill",
                        label: "Loaded runbook skill: incident/edge-failover",
                      },
                      {
                        kind: "command",
                        label: 'rg -n "BGP flap" runbooks/ --glob "*.md"',
                      },
                      {
                        kind: "api",
                        label: "GET /v1/incidents/INC-40221 — 200 OK (142ms)",
                      },
                    ]}
                  />
                }
              >
                Located the latency runbook and pulled the incident record
              </ToolSummaryRow>

              <ToolSummaryRow
                kind="command"
                traces={
                  <ActionTraces
                    items={[
                      {
                        kind: "command",
                        label: "kubectl -n edge logs deploy/eu-edge-03 --tail=200",
                      },
                      {
                        kind: "command",
                        label: "hey -z 30s -c 50 https://staging.internal/api",
                      },
                      {
                        kind: "api",
                        label: "POST /v1/loadtests — 201 Created (6.4s)",
                      },
                    ]}
                  />
                }
              >
                Reproduced the spike against the staging edge
              </ToolSummaryRow>

              <ToolSummaryRow
                kind="edits"
                traces={
                  <ActionTraces
                    items={[
                      { kind: "skill", label: "Loaded design skill: prose/edit-pass" },
                      {
                        kind: "command",
                        label: "git diff --stat runbooks/edge-failover.md",
                      },
                      {
                        kind: "command",
                        label: "bunx prettier --check runbooks/ — clean",
                      },
                      {
                        kind: "api",
                        label: "PATCH /v1/runbooks/edge-failover — 200 OK (89ms)",
                      },
                    ]}
                  />
                }
              >
                Drafted the mitigation section in the runbook
              </ToolSummaryRow>

              <ToolSummaryRow
                kind="integration"
                traces={
                  <ActionTraces
                    items={[
                      {
                        kind: "api",
                        label: "POST /v1/jira/issues — 201 Created (310ms)",
                      },
                      {
                        kind: "api",
                        label: "POST /v1/pager/acknowledge — 202 Accepted (210ms)",
                      },
                    ]}
                  />
                }
              >
                Synced the timeline to Jira and paged the on-call
              </ToolSummaryRow>

              <ToolSummaryRow
                kind="api"
                traces={
                  <ActionTraces
                    items={[
                      {
                        kind: "api",
                        label: "GET /v1/statuspage/incidents — 200 OK (98ms)",
                      },
                      {
                        kind: "command",
                        label: 'rg -n "maintenance" statuspage/templates/',
                      },
                      {
                        kind: "skill",
                        label: "Loaded design skill: comms/status-update",
                      },
                    ]}
                  />
                }
              >
                Checked the status page before publishing
              </ToolSummaryRow>
            </div>

            <div className="mt-auto flex items-center gap-2 rounded-md border border-dashed border-default-border px-3 py-2.5">
              <HourglassIcon className="size-3.5 flex-none text-neutral-400" />
              <p className="text-body-medium font-body-medium text-neutral-500">
                Queued — publish the runbook update once the verify checklist
                passes.
              </p>
            </div>
          </section>

          {/* Right column — runbook outline + MiniMap, then SLA queue */}
          <div className="flex min-h-0 flex-col gap-5">
            <section className="rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="flex items-baseline justify-between gap-3">
                <SectionLabel>Runbook preview</SectionLabel>
                <span className="truncate font-code text-[11px] leading-[14px] text-neutral-400">
                  runbooks/edge-failover.md
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                {/* The mapped surface: quiet wireframe outline */}
                <div className="flex flex-col gap-2">
                  <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                    outline
                  </span>
                  <div className="relative h-[220px] w-[260px] overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
                    {DOC_LAYOUT.map((region, i) => (
                      <div
                        key={i}
                        className="absolute rounded-[2px] bg-default-font/[0.07]"
                        style={region}
                      />
                    ))}
                    <div
                      className="absolute rounded-[3px] border-2 border-solid border-default-font"
                      style={VIEWPORT}
                    />
                  </div>
                </div>

                {/* The map: same geometry, scaled down and set in glass */}
                <div className="flex flex-col gap-2">
                  <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                    map
                  </span>
                  <MiniMap showGrid>
                    {DOC_LAYOUT.map((region, i) => (
                      <MiniMap.ContentBlock key={i} style={region} />
                    ))}
                    <MiniMap.ViewportFrame style={VIEWPORT} />
                  </MiniMap>
                </div>
              </div>
            </section>

            <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="flex items-baseline justify-between">
                <SectionLabel>Escalation queue</SectionLabel>
                <span className="font-code text-[11px] leading-[14px] text-neutral-400">
                  SLA per task
                </span>
              </div>
              <div className="mt-1 flex flex-col">
                {QUEUE.map((row) => (
                  <div
                    key={row.task}
                    className="flex items-center justify-between gap-3 border-b border-solid border-default-border py-3 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-body-medium font-body-medium text-default-font">
                        {row.task}
                      </p>
                      <p className="text-caption font-caption text-neutral-400">
                        {row.owner}
                      </p>
                    </div>
                    <SlaTimer
                      className="flex-none"
                      tone={row.tone}
                      timecode={row.timecode}
                      showDot={row.showDot}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-auto text-caption font-caption text-neutral-400">
                Breached SLAs page the secondary on-call automatically.
              </p>
            </section>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-solid border-default-border pt-3">
          <span className="text-caption font-caption text-neutral-400">
            Auto-synced from agent runtime · eu-edge-03
          </span>
          <span className="text-caption font-caption text-neutral-500">
            5 tool calls · 15 traces · 0 errors
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
