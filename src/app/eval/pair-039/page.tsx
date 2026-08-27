"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Sparkline } from "@/components/ds/Sparkline";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, SendIcon } from "lucide-react";

const STATS = [
  { label: "latency p50", value: "12.4ms", note: "±0.3", tone: "neutral" },
  { label: "throughput", value: "1.9k/s", note: "+18.2%", tone: "good" },
  { label: "error rate", value: "0.12%", note: "−22.5%", tone: "good" },
] as const;

const DEPLOYS = [
  {
    ref: "router@2.14.3",
    summary: "Retry storm on stale keep-alive connections",
    time: "14:12",
    dot: "bg-destructive-400",
  },
  {
    ref: "router@2.14.2",
    summary: "Rollback completed — 502s cleared in 90s",
    time: "16:38",
    dot: "bg-success-400",
  },
  {
    ref: "edge-cache@5.8.0",
    summary: "Scheduled window, no anomalies",
    time: "02:04",
    dot: "bg-neutral-500",
  },
  {
    ref: "billing-worker@1.7.1",
    summary: "Scaled to 12 replicas ahead of peak",
    time: "09:47",
    dot: "bg-neutral-500",
  },
];

const ENDPOINTS = [
  { route: "POST /v1/checkout", p99: "1.9s", peak: "4.8%", bad: true },
  { route: "GET /v1/catalog", p99: "84ms", peak: "0.02%", bad: false },
  { route: "POST /v1/session", p99: "112ms", peak: "0.05%", bad: false },
  { route: "GET /v1/health", p99: "24ms", peak: "0.01%", bad: false },
];

function noteTone(tone: string) {
  if (tone === "good") return "text-success-600";
  return "text-neutral-500";
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col gap-6 p-6">
        {/* app header */}
        <header className="flex flex-none items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-solid border-default-border bg-panel">
              <ActivityIcon className="size-4 text-neutral-500" />
            </span>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold leading-tight text-foreground">
                Reliability console
              </h1>
              <span className="text-caption font-caption text-neutral-500">
                Praxis platform · eu-central-1
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">INC-2041 · resolved</Badge>
            <span className="text-caption font-caption text-neutral-500">
              updated 16:44 UTC
            </span>
          </div>
        </header>

        {/* main workspace */}
        <div className="grid flex-1 grid-cols-12 gap-6">
          {/* left rail — telemetry */}
          <div className="col-span-7 flex flex-col gap-6">
            {/* signal monitor (Sparkline) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  API gateway · signal monitor
                </CardTitle>
                <CardDescription>
                  last 30 samples · 60s resolution
                </CardDescription>
                <CardAction>
                  <Badge variant="outline">auto-refresh 60s</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Sparkline />
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-solid border-default-border pt-3">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <span className="text-caption font-caption uppercase tracking-[0.14em] text-neutral-500">
                        {stat.label}
                      </span>
                      <span className="font-code text-[13px] tabular-nums text-foreground">
                        {stat.value}{" "}
                        <span className={noteTone(stat.tone)}>
                          {stat.note}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* recent changes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent changes</CardTitle>
                <CardDescription>
                  deploy pipeline · last 24h · 1 reverted
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {DEPLOYS.map((deploy) => (
                  <div
                    key={deploy.ref}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`size-2 flex-none rounded-full ${deploy.dot}`}
                    />
                    <span className="w-32 flex-none font-code text-xs text-foreground">
                      {deploy.ref}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                      {deploy.summary}
                    </span>
                    <span className="flex-none font-code text-[11px] tabular-nums text-neutral-500">
                      {deploy.time}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t">
                <span className="text-caption font-caption text-neutral-500">
                  view full changelog →
                </span>
              </CardFooter>
            </Card>

            {/* affected endpoints */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-sm">Affected endpoints</CardTitle>
                <CardDescription>peak vs baseline · incident window</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                <div className="grid grid-cols-[minmax(0,1fr)_72px_72px] gap-3 border-b border-solid border-default-border pb-2">
                  <span className="text-caption font-caption uppercase tracking-[0.14em] text-neutral-500">
                    endpoint
                  </span>
                  <span className="text-right text-caption font-caption uppercase tracking-[0.14em] text-neutral-500">
                    p99
                  </span>
                  <span className="text-right text-caption font-caption uppercase tracking-[0.14em] text-neutral-500">
                    peak err
                  </span>
                </div>
                {ENDPOINTS.map((row) => (
                  <div
                    key={row.route}
                    className="grid grid-cols-[minmax(0,1fr)_72px_72px] items-baseline gap-3"
                  >
                    <span className="truncate font-code text-xs text-foreground">
                      {row.route}
                    </span>
                    <span className="text-right font-code text-xs tabular-nums text-muted-foreground">
                      {row.p99}
                    </span>
                    <span
                      className={`text-right font-code text-xs tabular-nums ${
                        row.bad ? "text-destructive-500" : "text-muted-foreground"
                      }`}
                    >
                      {row.peak}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* right rail — incident channel (Bubbles) */}
          <Card className="col-span-5 h-full">
            <CardHeader>
              <CardTitle className="text-sm">
                #inc-2041 · gateway 502s
              </CardTitle>
              <CardDescription>on-call channel · 3 participants</CardDescription>
              <CardAction>
                <Badge variant="secondary">resolved</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
              <Bubble variant="muted">
                <BubbleContent>
                  Pulse detected a 502 spike on api-gateway — error rate climbed
                  from 0.12% to 4.8% in four minutes. Paging on-call.
                </BubbleContent>
                <span className="font-code text-[10px] tabular-nums text-neutral-500">
                  16:02
                </span>
              </Bubble>
              <BubbleGroup>
                <Bubble align="end">
                  <BubbleContent>On it. Checking the router deploy from 14:12.</BubbleContent>
                </Bubble>
                <Bubble align="end">
                  <BubbleContent>
                    Reverted router to 2.14.2 in staging — errors cleared within
                    a minute.
                  </BubbleContent>
                </Bubble>
                <Bubble align="end">
                  <BubbleContent>Rolling production back now.</BubbleContent>
                  <span className="font-code text-[10px] tabular-nums text-neutral-500">
                    16:35
                  </span>
                </Bubble>
              </BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  Rollback completed at 16:38 UTC. Error rate is back to 0.12%
                  and holding. Postmortem doc drafted.
                </BubbleContent>
                <BubbleReactions role="img" aria-label="Reaction: thumbs up, 4">
                  <span>👍</span>
                  <span>4</span>
                </BubbleReactions>
                <span className="font-code text-[10px] tabular-nums text-neutral-500">
                  16:38
                </span>
              </Bubble>
              <Bubble align="end">
                <BubbleContent>
                  Nice work. Postmortem tomorrow 09:30 — I&apos;ll bring the
                  timeline.
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>
                  Scheduled. INC-2041 marked resolved at 16:44 UTC.
                </BubbleContent>
                <span className="font-code text-[10px] tabular-nums text-neutral-500">
                  16:44
                </span>
              </Bubble>
            </CardContent>
            <CardFooter className="border-t">
              <div className="flex w-full items-center gap-2 rounded-lg border border-solid border-input bg-background px-3 py-2">
                <span className="text-sm text-muted-foreground">
                  Message #inc-2041…
                </span>
                <SendIcon className="ml-auto size-4 flex-none text-neutral-500" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </EvalShell>
  );
}
