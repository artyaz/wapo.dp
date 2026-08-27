"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { RelationshipGrid } from "@/components/ds/RelationshipGrid";
import { JumpToLatest } from "@/components/ds/JumpToLatest";
import { Activity, ChevronRight } from "lucide-react";

const feed = [
  {
    time: "09:41:02",
    kind: "metric",
    text: "p99 latency crossed 1.2s on us-west-2 edge-gateway (threshold 400ms)",
  },
  {
    time: "09:41:15",
    kind: "alert",
    text: "PagerDuty incident INC-40221 opened — assigned to SRE on-call (A. Okafor)",
  },
  {
    time: "09:43:08",
    kind: "note",
    text: "A. Okafor: “Seeing the BGP flap pattern on eu-edge-03 again, same signature as August.”",
  },
  {
    time: "09:47:52",
    kind: "tool",
    text: "netcheck --region us-west-2 · 14 probes · 3 degraded routes via eu-edge-03",
  },
  {
    time: "09:52:30",
    kind: "change",
    text: "CHG-1189 “Replace BGP session on eu-edge-03” linked and scheduled for 11:00 UTC",
  },
  {
    time: "09:58:44",
    kind: "metric",
    text: "Error rate 6.4% → 2.1% after draining node pool 7 in us-west-2b",
  },
  {
    time: "10:04:19",
    kind: "note",
    text: "M. Chen: “Root cause narrowed to missed BGP keepalive timers after the 08:50 config push.”",
  },
  {
    time: "10:07:02",
    kind: "trace",
    text: "Streaming 1,284 log lines from haproxy-7b · 412 events/s",
  },
  {
    time: "10:08:37",
    kind: "task",
    text: "TASK-8812 “Verify rollback procedure documented” reopened and re-assigned",
  },
];

function FeedEntry({
  time,
  kind,
  text,
}: {
  time: string;
  kind: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-neutral-800/60 py-2.5">
      <span className="flex-none pt-px font-mono text-[11px] leading-5 text-neutral-500 tabular-nums">
        {time}
      </span>
      <span className="flex-none pt-px font-mono text-[10px] leading-5 tracking-wide text-neutral-500 uppercase">
        {kind}
      </span>
      <span className="min-w-0 text-[13px] leading-5 text-neutral-300">
        {text}
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-neutral-800 bg-neutral-950/60 px-6">
          <span className="flex items-center gap-2 font-mono text-[12px] text-neutral-500">
            NOC Console
            <ChevronRight className="size-3.5" />
            us-west-2
          </span>
          <span className="rounded-[3px] border border-neutral-700 bg-neutral-900 px-2 py-0.5 font-mono text-[12px] text-neutral-200">
            INC-40221
          </span>
          <h1 className="truncate text-[14px] font-semibold text-neutral-100">
            Latency spike on us-west-2 cluster
          </h1>
          <span className="ml-auto flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1 font-mono text-[11px] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
            P1 · In Progress
          </span>
          <span className="font-mono text-[11px] text-neutral-500">
            2026-08-21 10:08 UTC
          </span>
        </header>

        {/* Resizable split: incident detail / live activity stream */}
        <div className="min-h-0 flex-1">
          <ResizablePanelGroup direction="horizontal" className="min-h-0">
            {/* Left: incident detail + related records */}
            <ResizablePanel defaultSize={58} minSize={32}>
              <div className="flex h-full min-h-0 flex-col gap-5 overflow-auto bg-neutral-950/40 p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Priority", value: "P1 — Critical" },
                    { label: "Service", value: "edge-gateway" },
                    { label: "Region", value: "us-west-2" },
                    { label: "Open for", value: "27m 14s" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2.5"
                    >
                      <div className="text-[10px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                        {stat.label}
                      </div>
                      <div className="mt-1 truncate font-mono text-[13px] text-neutral-200">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <section className="flex min-h-0 flex-col">
                  <div className="mb-2 flex items-baseline justify-between">
                    <h2 className="text-[13px] font-semibold text-neutral-200">
                      Related records
                    </h2>
                    <span className="font-mono text-[11px] text-neutral-500">
                      8 linked · drag divider to resize
                    </span>
                  </div>
                  <RelationshipGrid />
                </section>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right: live activity stream with JumpToLatest FAB */}
            <ResizablePanel defaultSize={42} minSize={24}>
              <div className="flex h-full min-h-0 flex-col bg-neutral-950/70">
                <div className="flex h-11 flex-none items-center justify-between border-b border-neutral-800 px-4">
                  <span className="flex items-center gap-2 text-[12px] font-semibold text-neutral-200">
                    <Activity className="size-3.5 text-neutral-400" />
                    Live activity
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                    streaming
                  </span>
                </div>

                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <div className="px-4 py-1">
                    {feed.map((entry) => (
                      <FeedEntry key={entry.time} {...entry} />
                    ))}
                    <div className="flex items-center gap-2 py-3 font-mono text-[11px] text-neutral-500">
                      <span className="inline-block h-3 w-1.5 animate-pulse bg-neutral-600" />
                      tailing haproxy-7b…
                    </div>
                  </div>

                  {/* bottom fade implying more output below */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent" />

                  {/* floating jump-to-latest control */}
                  <div className="absolute right-4 bottom-4">
                    <JumpToLatest label="Jump to latest output" />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </EvalShell>
  );
}
