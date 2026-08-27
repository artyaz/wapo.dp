"use client";

/**
 * EVAL page (pair-007) — incident-commander mobile view.
 * Components: ds:RelationshipGrid, ui:chart, ui:dropdown-menu
 * Conditions: phone 390x844, light theme, ltr.
 *
 * Scenario: the on-call engineer opens incident INC-40221 — "Latency spike
 * on us-west-2" — on their phone: a 24h P99 latency trend, the incident
 * actions menu (rendered open via defaultOpen), and the linked-records grid
 * around the current incident.
 */

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  BellOffIcon,
  ChevronDownIcon,
  Link2Icon,
  TriangleAlertIcon,
  UserPlusIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { RelationshipGrid } from "@/components/ds/RelationshipGrid";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const latencyData = [
  { time: "00:00", ms: 118 },
  { time: "02:00", ms: 121 },
  { time: "04:00", ms: 116 },
  { time: "06:00", ms: 123 },
  { time: "08:00", ms: 131 },
  { time: "10:00", ms: 127 },
  { time: "12:00", ms: 136 },
  { time: "14:00", ms: 129 },
  { time: "16:00", ms: 214 },
  { time: "18:00", ms: 612 },
  { time: "20:00", ms: 389 },
  { time: "22:00", ms: 243 },
];

const chartConfig = {
  ms: {
    label: "P99 latency (ms)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-3.5 px-4 pb-5 pt-4">
        {/* Header: incident identity + owner actions menu */}
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-400">
              Network operations · us-west-2
            </p>
            <h1 className="mt-1 truncate text-heading-3 font-heading-3 text-default-font">
              Latency spike on us-west-2
            </h1>
            <p className="mt-1 font-code text-[12px] leading-[16px] text-neutral-500">
              INC-40221 · P1 · in progress
            </p>
          </div>

          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger className="flex h-10 flex-none items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel pl-1 pr-2.5 outline-none">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary font-body text-[12px] font-[600] leading-[12px] text-brand-primary-foreground">
                MC
              </span>
              <ChevronDownIcon className="size-4 text-neutral-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>M. Chen · on-call IC</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link2Icon />
                  Copy incident link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlusIcon />
                  Reassign owner
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellOffIcon />
                  Snooze updates
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TriangleAlertIcon />
                Escalate to major
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Incident summary — supporting chrome */}
        <section className="rounded-lg border border-solid border-default-border bg-panel p-3">
          <p className="text-body-medium font-body-medium text-neutral-500">
            P99 crossed the 300 ms SLO at 17:42 UTC. Suspected BGP flap on
            eu-edge-03 — failover in progress, no data loss reported.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-[3px] border border-solid border-default-border px-2 py-[3px] font-code text-[11px] leading-[14px] text-neutral-500">
              started 17:42 utc
            </span>
            <span className="rounded-[3px] border border-solid border-default-border px-2 py-[3px] font-code text-[11px] leading-[14px] text-neutral-500">
              impact: api · edge
            </span>
            <span className="rounded-[3px] border border-solid border-default-border px-2 py-[3px] font-code text-[11px] leading-[14px] text-neutral-500">
              owner: m.chen
            </span>
          </div>
        </section>

        {/* Trend — ui:chart */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
              P99 latency — last 24 h
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400">
              peak 612 ms
            </span>
          </div>
          <div className="mt-2 rounded-lg border border-solid border-default-border bg-panel p-3">
            <ChartContainer
              config={chartConfig}
              className="min-h-[180px] w-full"
            >
              <LineChart accessibilityLayer data={latencyData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={2}
                  tickFormatter={(value) => value.slice(0, 2)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="ms"
                  type="monotone"
                  stroke="var(--color-ms)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </section>

        {/* Linked records — ds:RelationshipGrid */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
              Linked records
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400">
              7 linked
            </span>
          </div>
          <div className="mt-2">
            <RelationshipGrid />
          </div>
        </section>

        <footer className="mt-auto flex items-center justify-between border-t border-solid border-default-border pt-3">
          <span className="text-caption font-caption text-neutral-400">
            Auto-synced from CMDB
          </span>
          <span className="text-caption font-caption text-neutral-500">
            2 min ago
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
