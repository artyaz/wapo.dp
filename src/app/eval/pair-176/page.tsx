"use client";

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import { PayloadInspector } from "@/components/ds/PayloadInspector";
import { ActionTraces } from "@/components/ds/ActionTraces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  BotIcon,
  CheckCircle2Icon,
  ClockIcon,
  Link2Icon,
  WrenchIcon,
} from "lucide-react";

const RESULT_PAYLOAD = `{
  "run": "run_4821",
  "workflow": "superblocks/asset-sync",
  "status": "succeeded",
  "startedAt": "2026-08-26T11:57:04Z",
  "durationMs": 192311,
  "stats": {
    "assetsScanned": 148,
    "assetsUpdated": 12,
    "warnings": 2
  },
  "outputs": {
    "reportUrl": "https://relay.internal/reports/run_4821",
    "nextCursor": null
  }
}`;

const CONFIG_PAYLOAD = `{ "retries": 2, "concurrency": 6, "dryRun": false }`;

const WEBHOOK_PAYLOAD = `{
  "event": "run.completed",
  "delivery": "dlv_9f27ac41",
  "attempt": 1,
  "signature": "sha256=5f2c8e1a…b91d",
  "payload": {
    "runId": "run_4821",
    "status": "succeeded",
    "assetsUpdated": 12,
    "warnings": 2
  }
}`;

function SummaryLine({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-baseline gap-2 py-1">
      <span className="flex h-[18px] flex-none items-center text-neutral-500">
        {icon}
      </span>
      <p className="min-w-0 text-[13px] leading-[18px] text-neutral-600">
        {children}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col font-body">
        {/* ── Console chrome ────────────────────────────────────── */}
        <header className="flex flex-none items-center gap-4 border-b border-solid border-default-border bg-panel px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-neutral-900 text-white">
              <BotIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold text-default-font">
              Relay Console
            </span>
          </div>
          <div className="h-4 w-px bg-default-border" />
          <div className="min-w-0 truncate text-sm text-neutral-500">
            Automation runs · superblocks/asset-sync
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-full border border-solid border-default-border px-2.5 py-1 font-code text-[11px] text-neutral-500">
              agent v2.4.1
            </span>
            <span className="rounded-full border border-solid border-default-border px-2.5 py-1 font-code text-[11px] text-neutral-500">
              eu-edge-03
            </span>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-5 px-6 py-6">
          {/* ── Run header ───────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex w-fit items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-default-font"
            >
              <ArrowLeftIcon className="size-4" />
              All runs
            </button>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold tracking-[-0.01em] text-default-font">
                  Run #4821 · Asset sync
                </h1>
                <p className="text-sm text-neutral-500">
                  Triggered by schedule{" "}
                  <span className="font-code text-[12px] text-neutral-600">
                    nightly-token-audit
                  </span>{" "}
                  · Aug 26, 2026 · 11:57 UTC
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-solid border-success-200 bg-success-50 px-3 py-1">
                  <CheckCircle2Icon className="size-3.5 text-success-600" />
                  <span className="text-xs font-semibold text-success-700">
                    Succeeded
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-solid border-default-border px-3 py-1">
                  <ClockIcon className="size-3.5 text-neutral-500" />
                  <span className="text-xs font-medium tabular-nums text-neutral-600">
                    3m 12s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Run tabs ─────────────────────────────────────────── */}
          <Tabs defaultValue="details" className="gap-4">
            <TabsList>
              <TabsTrigger value="details">Run details</TabsTrigger>
              <TabsTrigger value="webhook">Webhook payload</TabsTrigger>
              <TabsTrigger
                value="logs"
                disabled
                title="Log ingestion in progress — available 48h after run completion"
              >
                Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              {/* Left — what the agent actually did */}
              <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
                <div className="flex items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
                  <h2 className="text-sm font-semibold text-default-font">
                    Execution trace
                  </h2>
                  <span className="font-code text-[11px] text-neutral-500">
                    6 steps · 3m 12s
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col gap-1.5">
                    <SummaryLine icon={<Link2Icon className="size-3.5" />}>
                      Connected to Superblocks and fetched the asset catalog
                    </SummaryLine>
                    <ActionTraces
                      items={[
                        {
                          kind: "api",
                          label:
                            "GET /v1/integrations/superblocks — 200 OK (312 ms)",
                        },
                        {
                          kind: "api",
                          label:
                            "GET /v1/assets?limit=200 — 200 OK · 148 items (891 ms)",
                        },
                      ]}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <SummaryLine icon={<WrenchIcon className="size-3.5" />}>
                      Audited token contrast and synced 12 asset updates
                    </SummaryLine>
                    <ActionTraces
                      items={[
                        {
                          kind: "skill",
                          label: "Loaded design skill: charts/palette-audit",
                        },
                        {
                          kind: "command",
                          label:
                            'rg -n "contrast" src/components/ds — 14 matches',
                        },
                        { kind: "command", label: "bunx tsc --noEmit — clean" },
                        {
                          kind: "api",
                          label:
                            "POST /v1/assets/bulk-upsert — 200 OK · 12 updated (1.2 s)",
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>

              {/* Right — what the run produced */}
              <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
                <div className="flex items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
                  <h2 className="text-sm font-semibold text-default-font">
                    Result payload
                  </h2>
                  <span className="font-code text-[11px] text-neutral-500">
                    run_4821_result.json
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <PayloadInspector
                    language="json"
                    filename="run_4821_result.json"
                    code={RESULT_PAYLOAD}
                    maxHeightClass="max-h-[420px]"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-neutral-500">
                      Runner config applied to this run
                    </span>
                    <PayloadInspector
                      language="json"
                      filename="sync.config.json"
                      code={CONFIG_PAYLOAD}
                    />
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="webhook">
              <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
                <div className="flex items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
                  <h2 className="text-sm font-semibold text-default-font">
                    Outbound webhook · run.completed
                  </h2>
                  <span className="font-code text-[11px] text-neutral-500">
                    attempt 1 of 5 · delivered
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <p className="text-sm text-neutral-500">
                    Body delivered to{" "}
                    <span className="font-code text-[12px] text-neutral-600">
                      https://hooks.relay.internal/runs
                    </span>{" "}
                    at 12:00:16 UTC:
                  </p>
                  <PayloadInspector
                    language="json"
                    filename="delivery-dlv_9f27ac41.json"
                    code={WEBHOOK_PAYLOAD}
                  />
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </EvalShell>
  );
}
