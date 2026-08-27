"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { SlaTimer } from "@/components/ds/SlaTimer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WaveformStrip } from "@/components/ds/WaveformStrip";
import {
  AlertTriangleIcon,
  CheckCheckIcon,
  GaugeIcon,
  PlayIcon,
} from "lucide-react";

const FILTERS = [
  { label: "All alerts", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Escalations", value: "escalations" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col gap-3 p-3">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <h1 className="text-sm font-semibold text-neutral-800">
              Notifications
            </h1>
            <span className="text-caption font-caption text-neutral-400">
              3 new
            </span>
          </div>
          <Select items={FILTERS} defaultValue="all">
            <SelectTrigger size="sm" className="w-[124px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* feed */}
        <div className="flex flex-col gap-2.5">
          {/* breached SLA */}
          <article className="rounded-lg border border-solid border-default-border bg-panel p-2.5">
            <div className="flex items-start gap-2.5">
              <span className="flex size-7 flex-none items-center justify-center rounded-md bg-destructive-500/10 text-destructive-600">
                <AlertTriangleIcon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium leading-[26px] text-neutral-800">
                    Payment API latency breached SLO
                  </p>
                  <SlaTimer
                    tone="breach"
                    timecode="00:00:18"
                    showDot
                    className="flex-none"
                  />
                </div>
                <p className="mt-1 truncate text-[11px] leading-4 text-neutral-500">
                  p99 latency 2.4s — above the 1.2s threshold on shard eu-west-2
                </p>
              </div>
            </div>
          </article>

          {/* warning SLA */}
          <article className="rounded-lg border border-solid border-default-border bg-panel p-2.5">
            <div className="flex items-start gap-2.5">
              <span className="flex size-7 flex-none items-center justify-center rounded-md bg-warning-500/10 text-warning-600">
                <GaugeIcon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium leading-[26px] text-neutral-800">
                    Checkout queue depth rising
                  </p>
                  <SlaTimer
                    tone="warning"
                    timecode="00:04:32"
                    showDot
                    className="flex-none"
                  />
                </div>
                <p className="mt-1 truncate text-[11px] leading-4 text-neutral-500">
                  12,400 jobs waiting · autoscaler adding 4 workers
                </p>
              </div>
            </div>
          </article>

          {/* voice message */}
          <article className="rounded-lg border border-solid border-default-border bg-panel p-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-6 flex-none items-center justify-center rounded-full bg-neutral-100 font-code text-[10px] text-neutral-500">
                MK
              </span>
              <span className="text-xs font-medium text-neutral-800">
                Maya K.
              </span>
              <span className="truncate text-caption font-caption text-neutral-400">
                Voice message · escalation thread
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Play voice message"
                className="flex size-7 flex-none items-center justify-center rounded-full border border-solid border-default-border bg-neutral-100 text-neutral-700"
              >
                <PlayIcon className="size-3.5 translate-x-px" />
              </button>
              <div className="h-12 min-w-0 grow">
                <WaveformStrip />
              </div>
              <span className="flex-none font-code text-[11px] tabular-nums text-neutral-400">
                0:48
              </span>
            </div>
          </article>
        </div>

        {/* footer dock */}
        <div className="mt-auto flex items-center justify-between border-t border-solid border-default-border pt-2.5">
          <div className="flex items-center gap-2">
            <span className="text-caption font-caption text-neutral-500">
              Auto-refresh in
            </span>
            <SlaTimer tone="neutral" timecode="00:30:00" showDot />
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 text-caption font-caption text-neutral-500"
          >
            <CheckCheckIcon className="size-3.5" />
            Mark all read
          </button>
        </div>
      </div>
    </EvalShell>
  );
}
