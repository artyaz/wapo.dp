"use client";

/**
 * EVAL page (pair-111) — ui:drawer + ui:spinner + ui:chart
 * Conditions: laptop 1024x768, dark theme, LTR, no constraint.
 *
 * Scenario: "Praxis Cloud" pricing page with the "Compare plans" bottom
 * drawer open by default. Behind the dimmed modal overlay sit the app
 * header, the hero with the drawer trigger, and the three plan cards.
 * The open sheet carries the pricing comparison itself: a grouped bar
 * chart of monthly vs annual billing cost for the workspace's 12 seats
 * (ui:chart), a workspace cost panel whose Enterprise row is still
 * fetching its custom quote plus a header pill syncing regional prices
 * (ui:spinner), and the switch-plan actions in the footer.
 */

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Check, Columns3, Layers, TrendingDown } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/* ---- comparison data (12 seats) -------------------------------------- */

const chartData = [
  { plan: "Starter", monthly: 96, annual: 77 },
  { plan: "Pro", monthly: 216, annual: 173 },
  { plan: "Scale", monthly: 504, annual: 403 },
];

const chartConfig = {
  monthly: { label: "Monthly billing", color: "var(--chart-2)" },
  annual: { label: "Annual billing · −20%", color: "var(--chart-5)" },
} satisfies ChartConfig;

const plans = [
  {
    name: "Starter",
    price: "$8",
    features: ["Up to 10 seats", "Community support", "1 production project"],
    cta: "Start for free",
    variant: "secondary" as const,
  },
  {
    name: "Pro",
    price: "$18",
    popular: true,
    features: [
      "Unlimited seats & projects",
      "Usage analytics",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    variant: "default" as const,
  },
  {
    name: "Scale",
    price: "$42",
    features: ["SAML SSO & SCIM", "Audit logs", "Dedicated support"],
    cta: "Contact sales",
    variant: "outline" as const,
  },
];

/* ---- small building blocks ------------------------------------------- */

function PlanRow({
  name,
  tag,
  tagTone = "muted",
  price,
}: {
  name: string;
  tag?: string;
  tagTone?: "muted" | "solid";
  price: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs">
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="text-foreground">{name}</span>
        {tag ? (
          <span
            className={`shrink-0 rounded-full px-1.5 py-px text-[10px] leading-4 ${
              tagTone === "solid"
                ? "bg-primary font-medium text-primary-foreground"
                : "border border-border bg-secondary/60 text-muted-foreground"
            }`}
          >
            {tag}
          </span>
        ) : null}
      </span>
      <span className="font-mono tabular-nums text-foreground">{price}</span>
    </div>
  );
}

/* ---- page ------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <Drawer defaultOpen>
        {/* ============ pricing page behind the open sheet ============ */}
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <header className="flex h-14 flex-none items-center justify-between border-b border-border px-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary">
                <Layers className="size-4" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Praxis Cloud
              </span>
              <span className="text-muted-foreground/50">/</span>
              <span className="truncate text-sm text-muted-foreground">
                Pricing
              </span>
            </div>
            <div className="flex flex-none items-center gap-2">
              <Button variant="ghost" size="sm">
                Docs
              </Button>
              <Button variant="outline" size="sm">
                Manage billing
              </Button>
            </div>
          </header>

          <div className="flex items-end justify-between gap-6 px-6 pt-5">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight">
                Pricing that scales with your team
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Every plan includes SSO, SOC 2 Type II and a 99.99% uptime
                SLA.
              </p>
            </div>
            {/* opens the comparison sheet */}
            <DrawerTrigger
              render={
                <Button variant="outline" size="sm" className="shrink-0" />
              }
            >
              <Columns3 />
              Compare plans
            </DrawerTrigger>
          </div>

          <div className="grid grid-cols-3 gap-4 px-6 pt-4">
            {plans.map((plan) => (
              <section
                key={plan.name}
                className="flex flex-col rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-medium">{plan.name}</h2>
                  {plan.popular ? (
                    <span className="shrink-0 rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-2.5 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /seat · month
                  </span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="size-3.5 shrink-0 text-muted-foreground/70" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <Button
                    variant={plan.variant}
                    size="sm"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* ============ comparison sheet (ui:drawer, open) ============ */}
        <DrawerContent className="h-[430px]">
          <DrawerHeader className="gap-1.5 px-6 pb-3 pt-3 md:text-left">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <DrawerTitle className="text-base">
                  Compare plans for Acme Inc
                </DrawerTitle>
                <DrawerDescription className="mt-1 text-xs">
                  Total cost at 12 seats · USD · taxes excluded
                </DrawerDescription>
              </div>
              {/* live sync status (ui:spinner) */}
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground">
                <Spinner className="size-3.5" />
                Syncing regional prices
              </span>
            </div>
          </DrawerHeader>

          <div className="flex min-h-0 flex-1 gap-6 px-6 pb-3">
            {/* ---- cost comparison chart (ui:chart) ---- */}
            <section className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-none items-baseline justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Monthly cost per plan
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  USD / month
                </span>
              </div>
              <ChartContainer
                config={chartConfig}
                className="mt-1 min-h-0 w-full flex-1"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="plan"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="monthly"
                    fill="var(--color-monthly)"
                    radius={4}
                    maxBarSize={40}
                  />
                  <Bar
                    dataKey="annual"
                    fill="var(--color-annual)"
                    radius={4}
                    maxBarSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </section>

            {/* ---- workspace cost panel ---- */}
            <aside className="flex w-[300px] flex-none flex-col rounded-lg border border-border bg-card p-4">
              <div className="flex flex-none items-center justify-between gap-2">
                <h3 className="text-sm font-medium">Acme Inc</h3>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                  12 seats
                </span>
              </div>

              <div className="mt-1 flex flex-none items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Annual billing rates
                </span>
              </div>

              <div className="mt-0.5 divide-y divide-border">
                <PlanRow name="Starter" tag="Current" price="$77/mo" />
                <PlanRow name="Pro" tag="Best fit" tagTone="solid" price="$173/mo" />
                <PlanRow name="Scale" price="$403/mo" />
                {/* enterprise quote still loading (ui:spinner) */}
                <div className="flex items-center justify-between gap-3 py-2 text-xs">
                  <span className="text-foreground">Enterprise</span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Spinner className="size-3.5" />
                    Fetching quote…
                  </span>
                </div>
              </div>

              <div className="mt-auto flex items-start gap-2 rounded-md border border-success-200/30 bg-success-50 p-2.5">
                <TrendingDown className="mt-0.5 size-3.5 shrink-0 text-success-500" />
                <p className="text-[11px] leading-snug text-success-700">
                  Annual billing on Pro saves{" "}
                  <span className="font-medium">$516/yr</span> vs monthly —
                  $173/mo instead of $216.
                </p>
              </div>
            </aside>
          </div>

          <DrawerFooter className="flex-row items-center justify-between gap-3 border-t border-border px-6 py-3">
            <p className="text-xs text-muted-foreground">
              Starter caps at 10 seats — Pro fits your team. Switch or cancel
              anytime.
            </p>
            <div className="flex flex-none items-center gap-2">
              <DrawerClose
                render={<Button variant="ghost" size="sm" />}
              >
                Maybe later
              </DrawerClose>
              <Button size="sm">Switch to Pro · $173/mo</Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </EvalShell>
  );
}
