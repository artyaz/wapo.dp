"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CircleDollarSign,
  Database,
  Percent,
  RefreshCw,
  Smile,
  Timer,
  TrendingDown,
  TrendingUp,
  UserMinus,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * pair-152 — "Praxis Pulse" product analytics dashboard
 * (768×1024 portrait tablet, dark, ltr).
 *
 * - ui:select    → toolbar: date-range + audience pickers above the data
 * - ui:carousel  → swipeable KPI metric cards ("Key metrics")
 * - ui:accordion → auto-generated weekly insights with expandable detail
 */

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

type Metric = {
  label: string;
  value: string;
  delta: string;
  dir: "up" | "down";
  good: boolean;
  icon: LucideIcon;
  bars: number[];
};

const metrics: Metric[] = [
  {
    label: "Revenue",
    value: "$482.6K",
    delta: "+12.4%",
    dir: "up",
    good: true,
    icon: CircleDollarSign,
    bars: [34, 41, 38, 52, 47, 58, 55, 66, 61, 72, 80, 92],
  },
  {
    label: "Active users",
    value: "38,204",
    delta: "+5.1%",
    dir: "up",
    good: true,
    icon: Users,
    bars: [58, 62, 55, 66, 60, 64, 59, 70, 66, 68, 74, 78],
  },
  {
    label: "Conversion",
    value: "3.42%",
    delta: "-0.3pt",
    dir: "down",
    good: false,
    icon: Percent,
    bars: [72, 68, 70, 64, 66, 60, 62, 58, 55, 52, 48, 44],
  },
  {
    label: "Avg. session",
    value: "6m 12s",
    delta: "+2.0%",
    dir: "up",
    good: true,
    icon: Timer,
    bars: [46, 52, 49, 55, 51, 58, 54, 57, 60, 58, 63, 66],
  },
  {
    label: "Churn",
    value: "1.8%",
    delta: "-0.4pt",
    dir: "down",
    good: true,
    icon: UserMinus,
    bars: [64, 60, 62, 55, 58, 50, 52, 45, 47, 40, 38, 34],
  },
  {
    label: "NPS",
    value: "54",
    delta: "+3",
    dir: "up",
    good: true,
    icon: Smile,
    bars: [38, 42, 40, 48, 45, 52, 50, 55, 58, 57, 62, 68],
  },
];

type Insight = {
  value: string;
  title: string;
  body: string;
  meta: string;
  icon: LucideIcon;
  tone: string; // semantic class for the leading icon
};

const insights: Insight[] = [
  {
    value: "signup-conversion",
    title: "Signup conversion up 18.2% after the pricing page redesign",
    body: "Variant B converted 214 of 2,418 sessions over the last 14 days, lifting signup completion from 11.7% to 13.8%. The gain is consistent across all traffic sources, with paid search benefiting most (+24.6%).",
    meta: "A/B test · 96% significance · recommend full rollout",
    icon: TrendingUp,
    tone: "text-success-500",
  },
  {
    value: "checkout-dropoff",
    title: "Checkout drop-off is concentrated at the payment step",
    body: "31% of checkout sessions stall on the 3-D Secure redirect, which has a median latency of 4.2 s. Sessions that pass this step complete at 94.6%, so the payment flow remains the single largest funnel loss this month.",
    meta: "Funnel · payment step · 8,120 sessions",
    icon: AlertTriangle,
    tone: "text-warning-500",
  },
  {
    value: "trial-retention",
    title: "Trial-to-paid retention slipped 3.1pt this cycle",
    body: "Cohorts that started after the onboarding change retain 41.9% at day 14, down from 45.0%. The decline is sharpest on mobile web, where day-3 activation fell 6.2pt — the revised setup checklist is the likely culprit.",
    meta: "Cohorts · 3,640 trials · day-14 retention",
    icon: TrendingDown,
    tone: "text-destructive-500",
  },
];

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <EvalShell theme="dark" dir="ltr">
      <main className="mx-auto flex w-full max-w-[720px] flex-col gap-7 px-6 py-8">
        {/* ---------------- header ---------------- */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
              <Activity className="size-5" />
            </span>
            <div>
              <h1 className="text-[15px] font-semibold leading-tight tracking-tight">
                Praxis Pulse
              </h1>
              <p className="text-xs leading-4 text-muted-foreground">
                Product analytics · Growth workspace
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success-500" />
            Live
          </span>
        </header>

        {/* ---------------- toolbar (ui:select) ---------------- */}
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="28d">
            <SelectTrigger aria-label="Date range" className="gap-2">
              <Calendar className="size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Range</SelectLabel>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="28d">Last 28 days</SelectItem>
                <SelectItem value="qtd">This quarter</SelectItem>
                <SelectItem value="ytd">Year to date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger aria-label="Audience" className="gap-2">
              <Users className="size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Audience</SelectLabel>
                <SelectItem value="all">All users</SelectItem>
                <SelectItem value="new">New users</SelectItem>
                <SelectItem value="returning">Returning users</SelectItem>
                <SelectItem value="power">Power users</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="ml-auto hidden text-[11px] text-muted-foreground sm:inline">
            compared to previous period
          </span>
        </div>

        {/* ---------------- key metrics (ui:carousel) ---------------- */}
        <section className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between px-1">
            <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Key metrics
            </h2>
            <span className="text-[11px] tabular-nums text-muted-foreground">
              Slide {current} of {count}
            </span>
          </div>
          <div className="px-12">
            <Carousel
              setApi={setApi}
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent>
                {metrics.map((metric) => (
                  <CarouselItem key={metric.label} className="basis-1/2">
                    <Card className="h-[188px] w-full gap-0 rounded-lg py-0">
                      <CardContent className="flex h-full flex-col gap-2.5 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            {metric.label}
                          </span>
                          <metric.icon className="size-4 shrink-0 text-muted-foreground/70" />
                        </div>
                        <span className="text-[26px] font-semibold leading-none tracking-tight tabular-nums">
                          {metric.value}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs">
                          <span
                            className={cn(
                              "inline-flex items-center gap-0.5 font-medium tabular-nums",
                              metric.good
                                ? "text-success-500"
                                : "text-destructive-500"
                            )}
                          >
                            {metric.dir === "up" ? (
                              <ArrowUpRight className="size-3.5" />
                            ) : (
                              <ArrowDownRight className="size-3.5" />
                            )}
                            {metric.delta}
                          </span>
                          <span className="text-muted-foreground">vs prev</span>
                        </span>
                        <div className="mt-auto flex h-11 items-end gap-1">
                          {metric.bars.map((height, i) => (
                            <span
                              key={i}
                              className={cn(
                                "w-full rounded-[2px]",
                                i === metric.bars.length - 1
                                  ? "bg-foreground/75"
                                  : "bg-foreground/20"
                              )}
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* ---------------- weekly insights (ui:accordion) ---------------- */}
        <section className="flex flex-col gap-3">
          <Card className="gap-0 rounded-xl py-0">
            <CardHeader className="py-5">
              <CardTitle className="text-sm">Weekly insights</CardTitle>
              <CardDescription className="text-xs">
                Auto-generated from events in the selected range
              </CardDescription>
              <CardAction>
                <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  3 new
                </span>
              </CardAction>
            </CardHeader>
            <CardContent className="px-5 pb-2">
              <Accordion defaultValue={["signup-conversion"]}>
                {insights.map((insight) => (
                  <AccordionItem key={insight.value} value={insight.value}>
                    <AccordionTrigger className="hover:no-underline">
                      <span className="flex items-start gap-3">
                        <insight.icon
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            insight.tone
                          )}
                        />
                        <span className="text-[13px] font-medium leading-snug">
                          {insight.title}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-7">
                      <div className="flex flex-col gap-2.5">
                        <p className="text-[13px] leading-relaxed text-muted-foreground">
                          {insight.body}
                        </p>
                        <span className="font-mono text-[11px] leading-4 text-muted-foreground/80">
                          {insight.meta}
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* ---------------- footer ---------------- */}
        <footer className="flex items-center justify-between border-t pt-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Database className="size-3.5" />
            Source · events-prod (US-East)
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <RefreshCw className="size-3.5" />
            Synced 2 min ago
          </span>
        </footer>
      </main>
    </EvalShell>
  );
}
