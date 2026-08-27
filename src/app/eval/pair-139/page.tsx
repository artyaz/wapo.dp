"use client";

import React from "react";
import { ActivityIcon, MoveVerticalIcon, TerminalIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sparkline } from "@/components/ds/Sparkline";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/ui/native-select";

const STATS = [
  { label: "latency p50", value: "12.4ms", note: "±0.3" },
  { label: "throughput", value: "1.9k/s", note: "+18.2%" },
  { label: "error rate", value: "0.12%", note: "−22.5%" },
] as const;

const EVENTS = [
  { time: "14:02:11", tone: "neutral", text: "deploy edge-7f2a → 12 nodes" },
  { time: "14:01:48", tone: "warning", text: "p99 latency >180ms for 90s" },
  { time: "14:00:05", tone: "neutral", text: "cache hit ratio steady 96.2%" },
  { time: "13:58:32", tone: "destructive", text: "upstream 5xx spike 0.4%" },
  { time: "13:57:10", tone: "neutral", text: "autoscaler added 4 replicas" },
  { time: "13:55:44", tone: "neutral", text: "cert rotation done for mesh" },
] as const;

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      {/* Scenario: edge-ops — a phone-sized node monitor. Pick region + time
          window, read live signals, drag the divider to rebalance the
          signal chart against the event log. */}
      <div className="flex h-dvh flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-3 border-b border-default-border px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md border border-default-border bg-panel">
              <ActivityIcon className="size-4 text-neutral-300" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-tight">edge-ops</span>
              <span className="font-code text-[10px] text-neutral-500">
                node monitor · us-east-1a
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-default-border bg-panel px-2.5 py-1 font-code text-[10px] uppercase tracking-[0.08em] text-neutral-300">
            <span className="size-1.5 rounded-full bg-success-400" />
            live
          </span>
        </header>

        <div className="grid grid-cols-2 gap-2.5 border-b border-default-border px-4 py-3">
          <label className="flex flex-col gap-1.5">
            <span className="font-code text-[10px] uppercase tracking-[0.08em] text-neutral-500">
              region
            </span>
            <NativeSelect defaultValue="us-east-1" aria-label="Region">
              <NativeSelectOptGroup label="Americas">
                <NativeSelectOption value="us-east-1">
                  us-east-1 · Virginia
                </NativeSelectOption>
                <NativeSelectOption value="us-west-2">
                  us-west-2 · Oregon
                </NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Europe">
                <NativeSelectOption value="eu-west-1">
                  eu-west-1 · Ireland
                </NativeSelectOption>
                <NativeSelectOption value="eu-central-1">
                  eu-central-1 · Frankfurt
                </NativeSelectOption>
              </NativeSelectOptGroup>
            </NativeSelect>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-code text-[10px] uppercase tracking-[0.08em] text-neutral-500">
              window
            </span>
            <NativeSelect defaultValue="1h" aria-label="Time window">
              <NativeSelectOption value="15m">last 15 min</NativeSelectOption>
              <NativeSelectOption value="1h">last hour</NativeSelectOption>
              <NativeSelectOption value="6h">last 6 hours</NativeSelectOption>
              <NativeSelectOption value="24h">last 24 hours</NativeSelectOption>
            </NativeSelect>
          </label>
        </div>

        <ResizablePanelGroup direction="vertical" className="flex-1 min-h-0">
          <ResizablePanel defaultSize={58} minSize={30}>
            <div className="flex h-full flex-col px-4 pb-3 pt-4">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  signals · last 30 samples
                </span>
                <span className="font-code text-[11px] text-neutral-400">
                  api-gateway
                </span>
              </div>
              <Sparkline />
              <div className="mt-3 flex items-start gap-4 border-t border-solid border-default-border pt-2">
                {STATS.map((stat) => (
                  <span
                    key={stat.label}
                    className="flex-1 font-code text-[10px] tabular-nums text-neutral-400"
                  >
                    {stat.label} {stat.value} {stat.note}
                  </span>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={42} minSize={20}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 pb-2 pt-3">
                <span className="flex items-center gap-1.5 font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  <TerminalIcon className="size-3.5" />
                  event log
                </span>
                <span className="font-code text-[10px] text-neutral-500">
                  auto-tail
                </span>
              </div>
              <ul className="flex-1 overflow-y-auto px-4 pb-3">
                {EVENTS.map((event) => (
                  <li
                    key={event.time}
                    className="flex items-start gap-2 py-1.5 font-code text-[11px] leading-snug"
                  >
                    <span
                      className={
                        event.tone === "warning"
                          ? "mt-1 size-1.5 flex-none rounded-full bg-warning-400"
                          : event.tone === "destructive"
                            ? "mt-1 size-1.5 flex-none rounded-full bg-destructive-400"
                            : "mt-1 size-1.5 flex-none rounded-full bg-neutral-500"
                      }
                    />
                    <span className="text-neutral-500">{event.time}</span>
                    <span className="text-neutral-300">{event.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <footer className="flex items-center justify-center gap-1.5 border-t border-default-border px-4 py-2">
          <MoveVerticalIcon className="size-3 text-neutral-500" />
          <span className="font-code text-[10px] text-neutral-500">
            drag the handle to rebalance panels
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
