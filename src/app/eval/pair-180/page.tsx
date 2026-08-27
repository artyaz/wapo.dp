"use client";

/**
 * EVAL page (pair-180) — ui:avatar + ui:carousel + ds:QueryInput
 * Conditions: tablet-portrait 768x1024, light theme, LTR, no constraint.
 * Scenario: an observability incident-review console. The on-call engineer
 * inspects a saved query (ds:QueryInput), swipes through affected-service
 * cards (ui:carousel), and sees who is responding via avatars (ui:avatar).
 */

import React from "react";
import {
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Minus,
  TrendingUp,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { QueryInput } from "@/components/ds/QueryInput";
import { cn } from "@/lib/utils";

/* Affected services swiped through during the review. */
const SERVICES = [
  {
    name: "checkout-api",
    scope: "eu-central-1 · prod",
    status: "critical" as const,
    statusLabel: "Critical",
    rate: "5.2%",
    delta: "+4.8 pts / 1h",
    p95: "p95 842 ms",
    pods: "3 of 12 pods restarting",
    bars: [18, 22, 15, 26, 20, 30, 24, 38, 52, 66, 84, 92],
    barClass: "bg-destructive-400",
  },
  {
    name: "edge-router",
    scope: "global · prod",
    status: "warning" as const,
    statusLabel: "Warning",
    rate: "1.8%",
    delta: "+1.2 pts / 1h",
    p95: "p95 121 ms",
    pods: "18 pods · all healthy",
    bars: [14, 18, 16, 24, 22, 20, 28, 34, 42, 38, 48, 44],
    barClass: "bg-warning-400",
  },
  {
    name: "billing-worker",
    scope: "eu-west-1 · prod",
    status: "stable" as const,
    statusLabel: "Stable",
    rate: "0.4%",
    delta: "±0.0 pts / 1h",
    p95: "p95 310 ms",
    pods: "8 pods · all healthy",
    bars: [12, 14, 10, 16, 12, 18, 14, 12, 16, 14, 12, 15],
    barClass: "bg-muted-foreground/30",
  },
  {
    name: "search-indexer",
    scope: "us-east-1 · staging",
    status: "stable" as const,
    statusLabel: "Stable",
    rate: "0.1%",
    delta: "±0.0 pts / 1h",
    p95: "p95 96 ms",
    pods: "4 pods · all healthy",
    bars: [10, 12, 9, 11, 13, 10, 12, 9, 11, 10, 12, 9],
    barClass: "bg-muted-foreground/30",
  },
];

const STATUS_CHIP: Record<string, string> = {
  critical: "border-destructive-200 bg-destructive-50 text-destructive-700",
  warning: "border-warning-200 bg-warning-50 text-warning-700",
  stable: "border-success-200 bg-success-50 text-success-700",
};

const STATUS_DELTA: Record<string, string> = {
  critical: "text-destructive-600",
  warning: "text-warning-600",
  stable: "text-muted-foreground",
};

/* On-call responders (initials avatars with status badges). */
const RESPONDERS = [
  {
    initials: "AK",
    name: "Ana Kovács",
    role: "Incident commander",
    time: "ack 09:41",
    acked: true,
  },
  {
    initials: "JT",
    name: "Jonas Thiel",
    role: "SRE on-call",
    time: "paged 09:44",
    acked: false,
  },
  {
    initials: "MR",
    name: "Mira Rahim",
    role: "Service owner · checkout",
    time: "ack 09:47",
    acked: true,
  },
  {
    initials: "DP",
    name: "Dev Patel",
    role: "Comms lead",
    time: "ack 09:52",
    acked: true,
  },
];

const CHECKLIST = [
  { label: "Confirm rollback window with checkout team", done: true },
  { label: "Freeze deploys on edge-router fleet", done: true },
  { label: "Post status update to customer page", done: false },
  { label: "Attach 5xx trace sample to incident log", done: false },
];

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(SERVICES.length);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background">
        {/* ---- top bar: incident identity + on-call group ---- */}
        <header className="flex items-start justify-between gap-4 border-b border-border bg-card px-6 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Praxis Observability · Incident review
            </p>
            <h1 className="mt-1 truncate text-lg font-semibold leading-tight text-foreground">
              INC-2417 · Elevated 5xx rate on checkout
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JT</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+2</AvatarGroupCount>
            </AvatarGroup>
            <span className="text-[11px] text-muted-foreground">
              6 on-call responders
            </span>
          </div>
        </header>

        {/* ---- main: query console + responders (left), service carousel (right) ---- */}
        <main className="mx-auto grid w-full max-w-[720px] flex-1 grid-cols-[minmax(0,340px)_minmax(0,1fr)] items-start gap-6 px-6 py-6">
          {/* left column */}
          <section aria-label="Query console" className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-foreground">
                Query console
              </h2>
              <span className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                saved · error-rate-prod
              </span>
            </div>

            <QueryInput />

            <p className="text-xs leading-relaxed text-muted-foreground">
              Saved query — runs automatically every 60 s. Last run 09:58 ·
              14 series matched.
            </p>

            <div className="mt-3 border-t border-border pt-4">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold text-foreground">
                  Responders
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  ack 4 / 6
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-3">
                {RESPONDERS.map((r) => (
                  <li key={r.name} className="flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarFallback>{r.initials}</AvatarFallback>
                      <AvatarBadge>
                        {r.acked ? <Check /> : <Clock />}
                      </AvatarBadge>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {r.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.role}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {r.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* right column */}
          <section
            aria-label="Affected services"
            className="flex min-w-0 flex-col gap-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-foreground">
                Affected services
              </h2>
              <span className="text-[11px] text-muted-foreground">
                4 of 17 monitored
              </span>
            </div>

            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {SERVICES.map((s) => (
                  <CarouselItem key={s.name}>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-mono text-sm font-semibold text-foreground">
                            {s.name}
                          </p>
                          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                            {s.scope}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                            STATUS_CHIP[s.status]
                          )}
                        >
                          {s.statusLabel}
                        </span>
                      </div>

                      <div className="mt-4 flex items-end gap-2">
                        <p className="text-3xl font-semibold tabular-nums leading-none text-foreground">
                          {s.rate}
                        </p>
                        <span
                          className={cn(
                            "flex items-center gap-1 pb-0.5 text-xs font-medium",
                            STATUS_DELTA[s.status]
                          )}
                        >
                          {s.status === "stable" ? (
                            <Minus className="size-3" />
                          ) : (
                            <TrendingUp className="size-3" />
                          )}
                          {s.delta}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        error rate · 60 min window
                      </p>

                      <div className="mt-3 flex h-12 items-end gap-1">
                        {s.bars.map((h, i) => (
                          <span
                            key={i}
                            className={cn("w-full rounded-sm", s.barClass)}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
                        <span>{s.p95}</span>
                        <span>{s.pods}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* inline slide controls under the track */}
              <div className="mt-3 flex items-center justify-center gap-3">
                <CarouselPrevious className="static left-auto right-auto top-auto translate-x-0 translate-y-0" />
                <span className="text-xs tabular-nums text-muted-foreground">
                  Slide {current} of {count}
                </span>
                <CarouselNext className="static left-auto right-auto top-auto translate-x-0 translate-y-0" />
              </div>
            </Carousel>

            {/* review checklist */}
            <div className="mt-3 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground">
                  Review checklist
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  2 open
                </span>
              </div>
              <ul className="mt-2.5 flex flex-col gap-2">
                {CHECKLIST.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2.5 text-xs"
                  >
                    {c.done ? (
                      <CheckCircle2 className="size-4 shrink-0 text-success-700" />
                    ) : (
                      <Circle className="size-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={cn(
                        c.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        {/* ---- footer ---- */}
        <footer className="flex items-center justify-between border-t border-border px-6 py-3 text-[11px] text-muted-foreground">
          <span>Last sync 09:59 · data window 60 min</span>
          <span className="font-mono">praxis-observability 3.7.2</span>
        </footer>
      </div>
    </EvalShell>
  );
}
