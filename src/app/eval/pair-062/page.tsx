"use client";

/**
 * Eval page (pair-062) — components: ui:toggle, ds:CanvasNode, ui:progress.
 * Conditions: desktop 1440x900, light theme, ltr, dense-content.
 *
 * Scenario: "Orbit" workflow-orchestration console — a production
 * data-pipeline canvas (CanvasNode cards wired port-to-port) with a floating
 * view-option toolbar (Toggles), and a rollout inspector panel (Progress bars
 * + deployment-option Toggles).
 */

import React from "react";
import {
  BellRingIcon,
  GitPullRequestIcon,
  Grid3x3Icon,
  LockIcon,
  ShareIcon,
  ShieldCheckIcon,
  SplineIcon,
  TerminalIcon,
  Undo2Icon,
  WaypointsIcon,
  WorkflowIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { CanvasNode } from "@/components/ds/CanvasNode";
import { Toggle } from "@/components/ui/toggle";
import { Progress } from "@/components/ui/progress";

const wire = "h-px w-16 flex-none bg-neutral-300";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-default-background text-default-font">
        {/* top bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-solid border-default-border bg-panel px-6">
          <div className="flex items-center gap-3">
            <WorkflowIcon className="size-4 text-neutral-500" />
            <h1 className="font-body text-[15px] font-[600] leading-[22px]">
              Orbit · Workflow orchestration
            </h1>
            <span className="font-code text-[11px] tracking-[0.04em] text-neutral-400">
              / customer-360-sync
            </span>
          </div>
          <div className="flex items-center gap-5 font-code text-[11px] text-neutral-500">
            <span>eu-west-1</span>
            <span>autosave · 2m ago</span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <GitPullRequestIcon className="size-3.5" />
              PR #4821
            </span>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* canvas */}
          <main
            className="relative min-w-0 flex-1 overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(rgba(21, 20, 15, 0.07) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            {/* floating view-option toolbar */}
            <div className="absolute left-4 top-4 flex items-center gap-1 rounded-lg border border-solid border-default-border bg-panel p-1 shadow-sm">
              <Toggle size="sm" defaultPressed aria-label="Snap to grid">
                <Grid3x3Icon />
              </Toggle>
              <Toggle size="sm" defaultPressed aria-label="Show wire labels">
                <SplineIcon />
              </Toggle>
              <Toggle size="sm" aria-label="Lock node positions">
                <LockIcon />
              </Toggle>
              <div className="mx-1 h-5 w-px bg-neutral-200" />
              <Toggle size="sm" variant="outline" aria-label="Auto-layout graph">
                <WaypointsIcon />
              </Toggle>
              <Toggle size="sm" variant="outline" disabled aria-label="Share canvas">
                <ShareIcon />
              </Toggle>
            </div>
            <span className="absolute right-4 top-4 font-code text-[11px] text-neutral-400">
              zoom 100% · grid 22px
            </span>

            {/* node flow */}
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-start">
                {/* main chain */}
                <div className="flex items-center">
                  <CanvasNode
                    variant="selected"
                    title="Extract customer records"
                    statusTone="live"
                    footer={
                      <span className="font-code text-[11px] text-neutral-400">
                        s3://exports/customers/
                      </span>
                    }
                  >
                    <div className="flex w-full flex-col gap-1.5">
                      <span className="font-body text-[12px] font-[400] leading-[18px] text-neutral-600">
                        Incremental pull from the CRM replica; resolves merged
                        contacts and backfills missing emails.
                      </span>
                      <div className="flex w-full items-center justify-between font-code text-[11px] leading-4">
                        <span className="text-default-font">p99 · 42ms</span>
                        <span className="text-neutral-500">rps · 1,204</span>
                      </div>
                    </div>
                  </CanvasNode>
                  <div className={wire} />
                  <CanvasNode
                    title="Normalize & dedupe addresses"
                    statusTone="warning"
                    footer={
                      <span className="font-code text-[11px] text-neutral-400">
                        queue · geocode-normalizer
                      </span>
                    }
                  >
                    <div className="flex w-full flex-col gap-1.5">
                      <span className="font-body text-[12px] font-[400] leading-[18px] text-neutral-600">
                        Cleanses postal records against the Geocoder API; 4.2%
                        of rows quarantined for manual review.
                      </span>
                      <div className="flex w-full items-center justify-between font-code text-[11px] leading-4">
                        <span className="text-default-font">p99 · 128ms</span>
                        <span className="text-neutral-500">rps · 630</span>
                      </div>
                    </div>
                  </CanvasNode>
                  <div className={wire} />
                  <CanvasNode
                    variant="danger"
                    title="Sync to Snowflake warehouse"
                    statusTone="warning"
                    footer={
                      <span className="font-code text-[11px] text-neutral-400">
                        warehouse · analytics-prod
                      </span>
                    }
                  >
                    <div className="flex w-full flex-col gap-1.5">
                      <span className="font-body text-[12px] font-[400] leading-[18px] text-neutral-600">
                        MERGE into ANALYTICS.CUSTOMERS failed after 3 retries —
                        schema drift on SHIPPING_ADDRESS_LINE_2.
                      </span>
                      <div className="flex w-full items-center justify-between font-code text-[11px] leading-4">
                        <span className="text-default-font">retries · 3 of 3</span>
                        <span className="text-neutral-500">backoff · 30s</span>
                      </div>
                    </div>
                  </CanvasNode>
                </div>

                {/* scheduled branch off "Normalize & dedupe addresses" */}
                <div
                  className="h-8 w-px border-l border-dashed border-neutral-400"
                  style={{ marginLeft: 394 }}
                />
                <div className="flex items-center" style={{ paddingLeft: 284 }}>
                  <CanvasNode
                    variant="disabled"
                    title="Nightly reconciliation report"
                    statusTone="idle"
                    footer={
                      <span className="font-code text-[11px] text-neutral-400">
                        report · finance-recon
                      </span>
                    }
                  >
                    <div className="flex w-full flex-col gap-1.5">
                      <span className="font-body text-[12px] font-[400] leading-[18px] text-neutral-600">
                        Generates the finance reconciliation workbook for Q4
                        close; paused by the on-call engineer.
                      </span>
                      <div className="flex w-full items-center justify-between font-code text-[11px] leading-4">
                        <span className="text-default-font">last run · 02:00 UTC</span>
                        <span className="text-neutral-500">14m 06s</span>
                      </div>
                    </div>
                  </CanvasNode>
                  <div className="flex max-w-[230px] flex-col gap-1.5 pl-5">
                    <span className="font-body text-[12px] font-[400] leading-[18px] text-neutral-500">
                      Scheduled branch — detached from the live flow while the
                      Q4 close is in progress.
                    </span>
                    <span className="font-code text-[11px] leading-4 text-neutral-400">
                      cron · nightly · owner finance-data
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 flex items-center gap-3 font-code text-[11px] text-neutral-500">
              <span>flow · production</span>
              <span className="text-neutral-300">|</span>
              <span>4 nodes · 2 wires · 1 detached</span>
            </div>
          </main>

          {/* rollout inspector */}
          <aside className="flex w-[380px] flex-none flex-col gap-6 overflow-hidden border-l border-solid border-default-border bg-panel p-6">
            <div className="flex flex-col gap-2">
              <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                deploy · release 2025.11.4
              </span>
              <h2 className="text-heading-3 font-heading-3 text-foreground">
                Pipeline rollout
              </h2>
              <p className="font-body text-[12px] font-[400] leading-[18px] text-neutral-500">
                Triggered by the merge of “add shipping-address backfill” —
                building on main and promoting through eu-west-1.
              </p>
            </div>

            {/* rollout progress */}
            <section className="flex flex-col gap-4">
              <span className="font-body text-[13px] font-[600] leading-[19px] text-default-font">
                Rollout status
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-body text-[13px] font-[400] leading-[19px] text-default-font">
                    Uploading build bundle
                  </span>
                  <span className="font-code text-[11px] leading-4 text-default-font">
                    68%
                  </span>
                </div>
                <Progress value={68} />
                <span className="font-code text-[11px] leading-4 text-neutral-400">
                  142 MB of 208 MB · layer cache + build artifacts
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-body text-[13px] font-[400] leading-[19px] text-default-font">
                    Provisioning worker replicas
                  </span>
                  <span className="font-code text-[11px] leading-4 text-default-font">
                    38%
                  </span>
                </div>
                <Progress value={38} />
                <span className="font-code text-[11px] leading-4 text-neutral-400">
                  3 of 8 ready · eu-west-1c · c6i.2xlarge
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-body text-[13px] font-[400] leading-[19px] text-default-font">
                    Running smoke test suite
                  </span>
                  <span className="font-code text-[11px] leading-4 text-default-font">
                    100%
                  </span>
                </div>
                <Progress value={100} />
                <span className="font-code text-[11px] leading-4 text-neutral-400">
                  214 checks passed · 0 failed · 41s
                </span>
              </div>
            </section>

            {/* deployment options */}
            <section className="flex flex-col gap-2">
              <span className="font-body text-[13px] font-[600] leading-[19px] text-default-font">
                Deployment options
              </span>
              <div className="flex flex-col gap-1.5">
                <Toggle
                  defaultPressed
                  className="h-10 w-full justify-start px-3"
                  aria-label="Verbose build logs"
                >
                  <TerminalIcon />
                  <span className="font-body text-[13px] font-[500] leading-[19px]">
                    Verbose build logs
                  </span>
                </Toggle>
                <Toggle
                  defaultPressed
                  className="h-10 w-full justify-start px-3"
                  aria-label="Auto-rollback on failure"
                >
                  <Undo2Icon />
                  <span className="font-body text-[13px] font-[500] leading-[19px]">
                    Auto-rollback on failure
                  </span>
                </Toggle>
                <Toggle
                  className="h-10 w-full justify-start px-3"
                  aria-label="Notify #ops-on-call in Slack"
                >
                  <BellRingIcon />
                  <span className="font-body text-[13px] font-[500] leading-[19px]">
                    Notify #ops-on-call in Slack
                  </span>
                </Toggle>
                <Toggle
                  disabled
                  className="h-10 w-full justify-start px-3"
                  aria-label="Require compliance approval before promote"
                >
                  <ShieldCheckIcon />
                  <span className="font-body text-[13px] font-[500] leading-[19px]">
                    Require compliance approval before promote
                  </span>
                </Toggle>
              </div>
            </section>

            <footer className="mt-auto flex items-center justify-between border-t border-solid border-default-border pt-4 font-code text-[11px] leading-4 text-neutral-400">
              <span>started 09:41 UTC · 6m 12s elapsed</span>
              <span>run #1,284</span>
            </footer>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
