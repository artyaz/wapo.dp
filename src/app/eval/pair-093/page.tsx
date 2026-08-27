"use client";

/**
 * EVAL page (pair-093) — components: ds:TimeScrubber, ds:TimelineRuler,
 * ds:DialogLayout
 * Conditions: desktop 1280x800, light theme, ltr, dense-content.
 *
 * Scenario: reliability console for incident-2417 (checkout confirm latency
 * breach). TimeScrubber picks the requests metric window, TimelineRuler is the
 * trace-waterfall axis in a panning viewport, and DialogLayout is an open
 * "Escalate to SEV-1" confirmation over the whole console.
 */

import React from "react";
import { ActivityIcon, ShieldAlertIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { TimeScrubber } from "@/components/ds/TimeScrubber";
import { TimelineRuler } from "@/components/ds/TimelineRuler";
import { DialogLayout } from "@/components/ds/DialogLayout";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";

const requestStats = [
  { label: "requests", value: "12,481,902" },
  { label: "p99 latency", value: "1.84 s" },
  { label: "error rate", value: "0.42 %" },
  { label: "SLO burn", value: "3.1× budget" },
];

// times match the ruler's ◆ marker geometry (24 px/s)
const timelineEvents = [
  { time: "00:07", label: "edge cache purge · us-east-1 · 42 keys invalidated" },
  { time: "00:17", label: "deploy 7f3c2e1 rolled to 40 % of checkout pods" },
  { time: "00:25", label: "p99 crossed the 2.5 s SLO on POST /v2/checkout/confirm" },
  { time: "00:35", label: "auto-scaler added 6 payments-ledger pods" },
];

const deploys = [
  {
    sha: "7f3c2e1",
    label: "idempotency retry path for payments-ledger writes",
    meta: "20:01 · 40 %, paused",
  },
  {
    sha: "b19ad04",
    label: "connection-pool sizing for the payments-ledger client",
    meta: "18:47 · stable",
  },
  {
    sha: "4e02f1c",
    label: "edge cache purge on config publish",
    meta: "16:12 · stable",
  },
];

const activity = [
  { time: "20:19", label: "rollback of 7f3c2e1 started · eta 12 min" },
  { time: "20:14", label: "payments on-call paged · ack in 3 min" },
  { time: "20:07", label: "deploy 7f3c2e1 paused at 40 % rollout" },
  { time: "20:03", label: "SLO burn alert fired · p99 2.71 s" },
];

export default function Page() {
  const [escalateOpen, setEscalateOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative flex min-h-screen w-full flex-col bg-default-background">
        {/* console header */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-solid border-default-border px-6 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-solid border-default-border bg-panel text-neutral-500">
              <ActivityIcon className="h-4 w-4" />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Reliability console
              </span>
              <span className="truncate font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                incidents / incident-2417 · checkout confirm latency
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="flex items-center gap-2 rounded-[3px] border border-solid border-default-border bg-panel px-2.5 py-1.5 font-code text-[11px] text-neutral-500 tabular-nums">
              <span className="h-1.5 w-1.5 rounded-full bg-warning-500" />
              SEV-2 · investigating · 41 min
            </span>
            <span className="font-code text-[11px] text-neutral-400 tabular-nums">
              last sync 20:24 UTC
            </span>
          </div>
        </header>

        <main className="flex flex-1 items-stretch gap-6 px-6 py-5">
          {/* ── main column: metric window + trace timeline ── */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* requests metric — TimeScrubber */}
            <section className="shrink-0 rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  requests · api-gateway / us-east-1
                </span>
                <span className="font-code text-[11px] text-neutral-400 tabular-nums">
                  13:12 – 20:24 UTC
                </span>
              </div>
              <dl className="mb-4 flex flex-wrap items-baseline gap-x-6 gap-y-1.5 border-b border-solid border-default-border pb-3">
                {requestStats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-1.5">
                    <dt className="font-code text-[11px] text-neutral-400">
                      {s.label}
                    </dt>
                    <dd className="font-code text-[11px] text-default-font tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <TimeScrubber rangeStart="13:12" rangeEnd="20:24" />
            </section>

            {/* trace waterfall axis — TimelineRuler + event/deploy lists */}
            <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="mb-3 flex shrink-0 items-baseline justify-between gap-4">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  session timeline · trace waterfall
                </span>
                <span className="font-code text-[11px] text-neutral-400 tabular-nums">
                  00:00–02:00 · 24 px/s
                </span>
              </div>
              <div className="relative shrink-0">
                <div className="overflow-x-auto">
                  <TimelineRuler />
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-panel to-transparent" />
              </div>
              <ul className="mt-3 flex shrink-0 flex-col divide-y divide-default-border border-t border-solid border-default-border">
                {timelineEvents.map((e) => (
                  <li
                    key={e.time}
                    className="flex items-baseline gap-3 py-1"
                  >
                    <span className="w-10 shrink-0 font-code text-[11px] text-neutral-400 tabular-nums">
                      {e.time}
                    </span>
                    <span className="text-caption font-caption text-neutral-500">
                      {e.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex shrink-0 flex-col">
                <span className="mb-1 font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                  recent deploys · checkout-confirm
                </span>
                <ul className="flex flex-col divide-y divide-default-border">
                  {deploys.map((d) => (
                    <li
                      key={d.sha}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1"
                    >
                      <span className="font-code text-[11px] text-default-font">
                        {d.sha}
                      </span>
                      <span className="min-w-0 flex-1 text-caption font-caption text-neutral-500">
                        {d.label}
                      </span>
                      <span className="font-code text-[11px] text-neutral-400 tabular-nums">
                        {d.meta}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* ── side column: incident summary + escalation ── */}
          <div className="flex w-[540px] shrink-0 flex-col gap-6">
            {/* incident summary */}
            <section className="shrink-0 rounded-lg border border-solid border-default-border bg-panel p-4">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                incident summary
              </span>
              <p className="mt-1.5 text-body-medium font-body-medium text-default-font">
                p99 latency breach on POST /v2/checkout/confirm
              </p>
              <p className="mt-2 text-caption font-caption text-neutral-500">
                p99 crossed the 2.5 s SLO at 20:03 UTC, four minutes after
                deploy 7f3c2e1 reached 40 % of checkout pods in us-east-1.
              </p>
              <p className="mt-2 text-caption font-caption text-neutral-500">
                Suspected cause: connection-pool saturation in the
                payments-ledger client after the retry path in 7f3c2e1.
                Rollback in progress.
              </p>
              <div className="mt-3 border-t border-solid border-default-border pt-2.5">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                  recent activity
                </span>
                <ul className="mt-1 flex flex-col divide-y divide-default-border">
                  {activity.map((a) => (
                    <li key={a.time} className="flex items-baseline gap-3 py-1">
                      <span className="w-10 shrink-0 font-code text-[11px] text-neutral-400 tabular-nums">
                        {a.time}
                      </span>
                      <span className="text-caption font-caption text-neutral-500">
                        {a.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* escalation policy */}
            <section className="flex flex-1 flex-col rounded-lg border border-solid border-default-border bg-panel p-4">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                escalation policy · SEV-1
              </span>
              <p className="mt-2 text-caption font-caption text-neutral-500">
                SEV-1 pages the payments and platform leads, opens a bridge
                channel, and publishes the customer status page after 15
                minutes.
              </p>
              <p className="mt-2 text-caption font-caption text-neutral-500">
                Reserve it for measurable checkout conversion impact; SEV-2
                keeps the current on-call rotation and update cadence. The
                incident commander role transfers to the platform lead on
                escalation.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setEscalateOpen(true)}
                >
                  Escalate to SEV-1
                </Button>
                <span className="text-caption font-caption text-neutral-400">
                  asks for confirmation before anyone is paged
                </span>
              </div>
            </section>
          </div>
        </main>

        {/* Escalation confirmation — open, non-modal, over the whole console */}
        <DialogLayout
          open={escalateOpen}
          onOpenChange={setEscalateOpen}
          modal={false}
          className="absolute inset-0"
        >
          <div className="flex w-[104px] shrink-0 flex-col items-start gap-2 pt-1 max-sm:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-neutral-100 font-code text-[13px] text-neutral-500">
              <ShieldAlertIcon className="h-4 w-4" />
            </div>
            <span className="text-caption font-caption text-neutral-500">
              On-call lead
            </span>
            <span className="font-code text-[11px] text-neutral-500">
              rotation A
            </span>
          </div>
          <div className="flex w-[352px] max-w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                Escalate to SEV-1?
              </SubframeCore.Dialog.Title>
              <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
                The payments and platform leads are paged immediately and a
                bridge channel opens; the rollback of 7f3c2e1 continues either
                way.
              </SubframeCore.Dialog.Description>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setEscalateOpen(false)}
              >
                Keep at SEV-2
              </Button>
              <Button onClick={() => setEscalateOpen(false)}>
                Escalate &amp; page leads
              </Button>
            </div>
          </div>
        </DialogLayout>
      </div>
    </EvalShell>
  );
}
