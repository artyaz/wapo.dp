"use client";

import React from "react";
import Link from "next/link";
import { EvalShell } from "@/eval/EvalShell";
import { TimelineRuler } from "@/components/ds/TimelineRuler";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Activity,
  ChevronRight,
  CircleAlert,
  Lock,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";

/**
 * Scenario: "Praxis Replay" — a wide-desktop session-replay inspector for
 * incident-2417 (checkout latency, SEV-2, resolved). Top product navigation
 * (NavigationMenu), incident header with status badges, replay canvas + event
 * stream, and a video-editor-style timeline whose time axis is the ds
 * TimelineRuler (00:00–02:00 @ 24 px/s) with a playhead parked at 00:32,
 * inside the 00:25–00:36 error window.
 */

// 24 px/s → the ruler's coordinate space
const PLAYHEAD_X = 768; // 00:32
const ERROR_WINDOW = { x: 600, w: 264 }; // 00:25 – 00:36
const RECOVERY_WINDOW = { x: 1620, w: 120 }; // 01:07.5 – 01:12.5

const EVENTS = [
  {
    t: "00:07.5",
    kind: "api",
    tone: "outline" as const,
    title: "GET /api/cart",
    desc: "200 OK · 84 ms",
  },
  {
    t: "00:17.5",
    kind: "ui",
    tone: "outline" as const,
    title: "checkout_step",
    desc: "address → payment",
  },
  {
    t: "00:25.0",
    kind: "error",
    tone: "error" as const,
    title: "POST /api/pay",
    desc: "502 · upstream timeout (psp-eu-2)",
  },
  {
    t: "00:35.8",
    kind: "cache",
    tone: "secondary" as const,
    title: "session invalidated",
    desc: "cart cookie rotated",
  },
  {
    t: "00:45.8",
    kind: "retry",
    tone: "secondary" as const,
    title: "POST /api/pay · retry 2",
    desc: "200 OK · 210 ms",
  },
  {
    t: "01:07.5",
    kind: "recovery",
    tone: "success" as const,
    title: "order_2841 confirmed",
    desc: "confirmation email dispatched",
  },
  {
    t: "01:29.2",
    kind: "ui",
    tone: "outline" as const,
    title: "confirmation screen",
    desc: "route /order/2841 rendered",
  },
];

const SELECTED_EVENT = 2; // the 00:25 payment failure the playhead sits after

function EventBadge({
  kind,
  tone,
}: {
  kind: string;
  tone: "outline" | "secondary" | "error" | "success";
}) {
  if (tone === "error") {
    return (
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        {kind}
      </Badge>
    );
  }
  if (tone === "success") {
    return (
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        {kind}
      </Badge>
    );
  }
  if (tone === "secondary") {
    return <Badge variant="secondary">{kind}</Badge>;
  }
  return <Badge variant="outline">{kind}</Badge>;
}

function NavListItem({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <li>
      <NavigationMenuLink render={<Link href="#" />}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="font-medium leading-none">{title}</div>
          {children ? (
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          ) : null}
        </div>
      </NavigationMenuLink>
    </li>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ── product header ─────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-4 border-b border-border bg-panel/70 px-4">
          <div className="flex items-center gap-2.5">
            <div className="grid size-7 place-items-center rounded-md border border-solid border-default-border bg-panel">
              <Activity className="size-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-semibold">Praxis Replay</span>
          </div>
          <div className="h-5 w-px bg-border" />
          <NavigationMenu className="flex-none">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-1">
                    <NavListItem title="Incident summary">
                      Impact, blast radius and detection timeline.
                    </NavListItem>
                    <NavListItem title="Latency percentiles">
                      p50 / p95 / p99 for the affected route.
                    </NavListItem>
                    <NavListItem title="Deployments">
                      Changes shipped in the preceding 24 hours.
                    </NavListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sessions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-1">
                    <NavListItem title="All replays">
                      Browse captured sessions with errors.
                    </NavListItem>
                    <NavListItem title="Rage clicks">
                      Sessions flagged for repeated tap retries.
                    </NavListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="#" />}
                >
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-code text-[11px] text-muted-foreground">
              14:02 UTC
            </span>
            <div className="grid size-7 place-items-center rounded-full border border-solid border-default-border font-code text-[10px] text-muted-foreground">
              AK
            </div>
          </div>
        </header>

        {/* ── incident context ───────────────────────────────────── */}
        <div className="flex flex-none items-center gap-4 border-b border-border px-6 py-3.5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-base font-semibold tracking-tight">
                incident-2417 · checkout latency
              </h1>
              <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                SEV-2
              </Badge>
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Resolved
              </Badge>
            </div>
            <p className="mt-1.5 font-code text-[11px] text-muted-foreground">
              session replay · usr_8c41f2 · captured Jan 14, 13:58 UTC · 11
              events / 2 errors
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">session 02:00</Badge>
            <Badge variant="outline">prod-eu-west</Badge>
          </div>
        </div>

        {/* ── replay canvas + event stream ───────────────────────── */}
        <div className="flex min-h-0 flex-1">
          <main className="flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-muted/25 p-6">
            <div className="w-full max-w-[500px] overflow-hidden rounded-xl border border-solid border-default-border bg-panel shadow-sm">
              {/* browser chrome */}
              <div className="flex items-center gap-2 border-b border-solid border-default-border bg-muted/40 px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-neutral-300" />
                  <span className="size-2 rounded-full bg-neutral-300" />
                  <span className="size-2 rounded-full bg-neutral-300" />
                </div>
                <div className="flex h-6 flex-1 items-center gap-1.5 rounded-md border border-solid border-default-border bg-background px-2">
                  <Lock className="size-3 text-muted-foreground" />
                  <span className="font-code text-[10px] text-muted-foreground">
                    checkout.praxis.dev/cart
                  </span>
                </div>
              </div>
              {/* replayed page (frame @ 00:32) */}
              <div className="relative p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Your cart</span>
                  <span className="font-code text-[11px] text-muted-foreground">
                    2 items
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="size-10 flex-none rounded-md border border-solid border-default-border bg-muted/50" />
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <div className="h-2 w-3/5 rounded-full bg-muted" />
                        <div className="h-2 w-2/5 rounded-full bg-muted/70" />
                      </div>
                      <span className="font-code text-[11px] text-default-font">
                        {i === 0 ? "$84.00" : "$64.00"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-1.5 border-t border-solid border-default-border pt-3 font-code text-[11px]">
                  <div className="flex justify-between text-muted-foreground">
                    <span>subtotal</span>
                    <span>$148.00</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between pt-1 text-default-font">
                    <span className="font-medium">total</span>
                    <span className="font-medium">$148.00</span>
                  </div>
                </div>
                <div className="mt-4 grid h-9 place-items-center rounded-md bg-primary text-xs font-medium text-primary-foreground">
                  Pay $148.00
                </div>
                {/* error toast on the replayed frame */}
                <div className="absolute right-4 bottom-4 flex max-w-[240px] items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 shadow-sm">
                  <CircleAlert className="mt-0.5 size-4 flex-none text-destructive" />
                  <div>
                    <div className="text-xs font-medium text-destructive">
                      Payment failed
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      Upstream timeout at 00:25 — retry succeeded at 00:45.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* event stream */}
          <aside className="flex w-[320px] flex-none flex-col border-l border-border bg-panel">
            <div className="flex flex-none items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-medium">Events</span>
              <span className="font-code text-[11px] text-muted-foreground">
                7 / 11
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {EVENTS.map((e, i) => (
                <div
                  key={e.t}
                  className={
                    i === SELECTED_EVENT
                      ? "flex items-start gap-2.5 rounded-lg bg-accent px-2.5 py-2"
                      : "flex items-start gap-2.5 rounded-lg px-2.5 py-2"
                  }
                >
                  <span className="mt-[3px] flex-none font-code text-[10px] tabular-nums text-muted-foreground">
                    {e.t}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <EventBadge kind={e.kind} tone={e.tone} />
                      <span className="truncate font-code text-[11px] text-default-font">
                        {e.title}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-muted-foreground">
                      {e.desc}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 size-3.5 flex-none text-muted-foreground/50" />
                </div>
              ))}
            </div>
            <div className="flex-none border-t border-border px-4 py-2.5 font-code text-[10px] text-muted-foreground">
              ◆ event markers on ruler · band = error window
            </div>
          </aside>
        </div>

        {/* ── timeline ───────────────────────────────────────────── */}
        <section className="flex-none border-t border-border bg-panel">
          {/* transport */}
          <div className="flex items-center gap-3 border-b border-solid border-default-border px-4 py-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous event"
                className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <SkipBack className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Play"
                className="grid size-8 place-items-center rounded-full bg-default-font text-panel transition-opacity hover:opacity-90"
              >
                <Play className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next event"
                className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <SkipForward className="size-3.5" />
              </button>
            </div>
            <span className="font-code text-xs tabular-nums text-default-font">
              00:32.0 <span className="text-muted-foreground">/ 02:00.0</span>
            </span>
            <div className="ml-auto flex items-center gap-3">
              <span className="font-code text-[11px] text-muted-foreground">
                zoom 24 px/s · scroll to pan
              </span>
            </div>
          </div>

          {/* ruler + tracks in a panning viewport */}
          <div className="relative px-4 py-3">
            <div className="overflow-x-auto">
              <div className="relative w-[2880px] pt-5">
                {/* incident / recovery window bands */}
                <div
                  className="pointer-events-none absolute inset-y-0 rounded-sm bg-destructive/[0.07]"
                  style={{ left: ERROR_WINDOW.x, width: ERROR_WINDOW.w }}
                />
                <div
                  className="pointer-events-none absolute inset-y-0 rounded-sm bg-emerald-500/[0.08]"
                  style={{ left: RECOVERY_WINDOW.x, width: RECOVERY_WINDOW.w }}
                />

                {/* tracks */}
                <div className="relative flex h-[68px] flex-col gap-1.5">
                  <div className="relative h-7">
                    <div className="absolute inset-0 rounded-md border border-solid border-default-border/70 bg-muted/25" />
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 font-code text-[10px] text-neutral-500">
                      net
                    </span>
                    <div className="absolute top-1/2 left-[48px] h-2.5 w-[512px] -translate-y-1/2 rounded-full bg-neutral-300" />
                    <div className="absolute top-1/2 left-[576px] h-2.5 w-[480px] -translate-y-1/2 rounded-full bg-neutral-300" />
                    <div className="absolute top-1/2 left-[1080px] h-2.5 w-[72px] -translate-y-1/2 rounded-full bg-neutral-400" />
                    <div className="absolute top-1/2 left-[1584px] h-2.5 w-[168px] -translate-y-1/2 rounded-full bg-neutral-300" />
                  </div>
                  <div className="relative h-7">
                    <div className="absolute inset-0 rounded-md border border-solid border-default-border/70 bg-muted/25" />
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 font-code text-[10px] text-neutral-500">
                      err
                    </span>
                    <div
                      className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-destructive/50"
                      style={{ left: ERROR_WINDOW.x, width: ERROR_WINDOW.w }}
                    />
                    <div
                      className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-emerald-500/50"
                      style={{
                        left: RECOVERY_WINDOW.x,
                        width: RECOVERY_WINDOW.w,
                      }}
                    />
                  </div>
                </div>

                {/* time axis */}
                <div className="relative h-[34px]">
                  <TimelineRuler />
                </div>

                {/* playhead */}
                <div
                  className="pointer-events-none absolute inset-y-0 w-px bg-default-font/70"
                  style={{ left: PLAYHEAD_X }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-[3px] bg-default-font px-1 py-0.5 font-code text-[9px] leading-none text-panel tabular-nums">
                    00:32
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-panel to-transparent" />
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
