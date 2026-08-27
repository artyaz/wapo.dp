"use client";

import React from "react";
import {
  ActivityIcon,
  ArchiveRestoreIcon,
  ChevronDownIcon,
  CloudOffIcon,
  PlusIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  StethoscopeIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** Recovery console — the story: connection dropped mid-sync, auto-recovery
 *  rebuilt the queue, and the workspace has no snapshots to fall back on. */

const retryData = [
  { attempt: "Retry 1", restored: 2140, queued: 612 },
  { attempt: "Retry 2", restored: 5320, queued: 418 },
  { attempt: "Retry 3", restored: 3980, queued: 205 },
  { attempt: "Retry 4", restored: 1180, queued: 96 },
  { attempt: "Retry 5", restored: 677, queued: 3 },
];

const chartConfig = {
  restored: { label: "Restored", color: "var(--chart-1)" },
  queued: { label: "Re-queued", color: "var(--chart-4)" },
} satisfies ChartConfig;

const incidentTimeline = [
  {
    time: "14:02",
    text: "Connection lost mid-upload on sync worker 03 — 13,300 records in flight.",
  },
  {
    time: "14:03",
    text: "Auto-recovery engaged; five retry passes queued for the interrupted batches.",
  },
  {
    time: "14:05",
    text: "Connection restored; retries resumed automatically, oldest batch first.",
  },
  {
    time: "14:11",
    text: "13,297 records restored — 3 conflicting items flagged for review.",
  },
];

const failedItems = [
  {
    name: "Q3-board-deck.key",
    detail: "Checksum mismatch on the final chunk — upload interrupted at 14:02.",
  },
  {
    name: "team-photos/IMG_4821.raw",
    detail: "Timed out on chunk 7 of 9 while the connection was down.",
  },
  {
    name: "contracts/MSA-Acme-redline-v4.docx",
    detail: "Version conflict: a newer copy already exists on the server.",
  },
];

function StatBlock({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-2xl leading-none font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      <p className="mt-1.5 text-[13px] font-medium">{label}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function TimelineItem({
  time,
  last = false,
  children,
}: {
  time: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <div aria-hidden="true" className="flex flex-col items-center">
        <span className="mt-1.5 size-1.5 rounded-full bg-neutral-400" />
        {last ? null : <span className="w-px flex-1 bg-border" />}
      </div>
      <div className="min-w-0 pb-3">
        <p className="text-[13px] leading-none font-medium tabular-nums">
          {time}
        </p>
        <p className="mt-1 text-[13px] leading-[19px] text-muted-foreground">
          {children}
        </p>
      </div>
    </li>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col gap-6 px-8 py-8">
        {/* ---- console header ---- */}
        <header className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex size-10 flex-none items-center justify-center rounded-xl border border-border bg-muted/60">
              <CloudOffIcon className="size-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Praxis Sync
              </p>
              <h1 className="mt-0.5 text-xl leading-tight font-semibold tracking-tight">
                Workspace recovery
              </h1>
              <p className="mt-1 text-[13px] leading-[19px] text-muted-foreground">
                The connection dropped at 14:02 UTC. Auto-recovery rebuilt the
                sync queue — nothing was lost.
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-3 pt-1">
            <span className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="size-2 rounded-full bg-neutral-500" />
              Auto-recovery active
            </span>
            <Button size="sm">
              <RefreshCwIcon />
              Resume full sync
            </Button>
          </div>
        </header>

        {/* ---- recovery tabs ---- */}
        <Tabs defaultValue="progress" className="gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList>
              <TabsTrigger value="progress">
                <ActivityIcon />
                Progress
              </TabsTrigger>
              <TabsTrigger value="failed">
                <TriangleAlertIcon />
                Failed items
              </TabsTrigger>
              <TabsTrigger
                value="diagnostics"
                disabled
                title="Unlocks when the recovery pass completes"
              >
                <StethoscopeIcon />
                Diagnostics
              </TabsTrigger>
            </TabsList>
            <p className="text-xs text-muted-foreground">
              Recovery pass 5 of 5 · elapsed 8m 12s
            </p>
          </div>

          {/* ---- tab: progress ---- */}
          <TabsContent
            value="progress"
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]"
          >
            <Card>
              <CardHeader>
                <CardTitle>Records recovered by retry attempt</CardTitle>
                <CardDescription>
                  Automatic retries resumed when the connection returned at
                  14:05 UTC. Re-queued records were carried into the next
                  pass.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
                  <StatBlock
                    value="13,297"
                    label="records restored"
                    hint="of 13,300 in flight"
                  />
                  <StatBlock
                    value="99.9%"
                    label="recovery rate"
                    hint="across 5 retry passes"
                  />
                  <StatBlock
                    value="3"
                    label="items need review"
                    hint="version conflicts"
                  />
                </div>
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[216px] w-full"
                >
                  <BarChart accessibilityLayer data={retryData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="attempt"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="restored" fill="var(--color-restored)" radius={4} />
                    <Bar dataKey="queued" fill="var(--color-queued)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* ---- sidebar: empty snapshots + incident details ---- */}
            <div className="flex min-w-0 flex-col gap-6">
              <Card className="gap-0 border-dashed py-5 shadow-none">
                <CardContent className="flex flex-col items-center gap-3.5 px-6 text-center">
                  <div className="flex size-11 items-center justify-center rounded-full border border-border bg-muted/60">
                    <ArchiveRestoreIcon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold">No snapshots yet</h3>
                    <p className="mx-auto max-w-[27ch] text-[13px] leading-[19px] text-muted-foreground">
                      Snapshots appear after a successful sync. None existed
                      before the outage, so recovery is rebuilding straight
                      from the sync queue.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusIcon />
                    Create first snapshot
                  </Button>
                  <p className="text-[11px] text-muted-foreground">
                    Snapshot storage · 2 GB available
                  </p>
                </CardContent>
              </Card>

              <Card className="gap-0 py-3">
                <CardContent className="px-2">
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger
                      render={
                        <Button
                          variant="ghost"
                          className="group w-full justify-between px-3 py-2.5 text-[13px] font-medium"
                        >
                          What happened during the outage
                          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Button>
                      }
                    />
                    <CollapsibleContent className="px-3 pb-2 pt-1">
                      <ol className="flex flex-col">
                        {incidentTimeline.map((event, i) => (
                          <TimelineItem
                            key={event.time}
                            time={event.time}
                            last={i === incidentTimeline.length - 1}
                          >
                            {event.text}
                          </TimelineItem>
                        ))}
                      </ol>
                      <p className="border-t border-border pt-3 text-xs leading-[18px] text-muted-foreground">
                        Full network diagnostics unlock automatically once the
                        recovery pass completes.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ---- tab: failed items ---- */}
          <TabsContent value="failed" className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>3 items need review</CardTitle>
                <CardDescription>
                  These records could not be recovered automatically. Retry
                  them, or resolve the conflict on the server first.
                </CardDescription>
                <CardAction>
                  <Button variant="outline" size="sm">
                    <RotateCcwIcon />
                    Retry all
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {failedItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex size-9 flex-none items-center justify-center rounded-lg border border-border bg-muted/60">
                        <TriangleAlertIcon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium">
                          {item.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                      <Button variant="outline" size="xs" className="flex-none">
                        <RotateCcwIcon />
                        Retry
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EvalShell>
  );
}
