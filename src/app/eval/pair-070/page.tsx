"use client";

import React from "react";
import {
  Activity,
  Boxes,
  Cloud,
  Database,
  Globe,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { StatusBadge } from "@/components/ds/StatusBadge";

const environments = [
  {
    name: "production",
    region: "us-east-1",
    uptime: "99.98%",
    p95: "212 ms",
    tone: "live" as const,
    label: "Live",
  },
  {
    name: "production-eu",
    region: "eu-west-1",
    uptime: "99.95%",
    p95: "248 ms",
    tone: "success" as const,
    label: "Synced",
  },
  {
    name: "staging",
    region: "us-east-1",
    uptime: "99.41%",
    p95: "305 ms",
    tone: "warning" as const,
    label: "Degraded",
  },
  {
    name: "edge",
    region: "global",
    uptime: "99.99%",
    p95: "68 ms",
    tone: "success" as const,
    label: "Synced",
  },
  {
    name: "sandbox",
    region: "us-west-2",
    uptime: "—",
    p95: "—",
    tone: "idle" as const,
    label: "Idle",
  },
];

const services = [
  {
    icon: Globe,
    name: "api-gateway",
    meta: "1.2M req/h · 4 replicas",
    tone: "live" as const,
    label: "Live",
  },
  {
    icon: ShieldCheck,
    name: "auth-service",
    meta: "OAuth + WebAuthn · 99.98%",
    tone: "success" as const,
    label: "Synced",
  },
  {
    icon: Cloud,
    name: "edge-cdn",
    meta: "38 PoPs · cache hit 94.2%",
    tone: "warning" as const,
    label: "Degraded",
  },
  {
    icon: Boxes,
    name: "worker-pool",
    meta: "0 queued jobs · scaled to 0",
    tone: "idle" as const,
    label: "Idle",
  },
  {
    icon: Database,
    name: "primary-db",
    meta: "Postgres 16 · replica lag 120 ms",
    tone: "success" as const,
    label: "Synced",
  },
  {
    icon: Search,
    name: "search-index",
    meta: "rebuild queued · 2.1M docs",
    tone: "warning" as const,
    label: "Degraded",
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-background">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 border-b border-border/70 px-4 pb-3 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card">
              <Activity className="size-4.5 text-foreground" />
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight text-foreground">
                Fleet Status
              </h1>
              <p className="text-xs text-muted-foreground">
                6 services · 5 environments
              </p>
            </div>
          </div>
          <StatusBadge tone="live">Live</StatusBadge>
        </header>

        {/* Filters */}
        <section
          aria-label="Filters"
          className="flex items-end gap-2.5 px-4 pt-4"
        >
          <div className="flex-1">
            <label
              htmlFor="region-select"
              className="mb-1.5 block text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
            >
              Region
            </label>
            <NativeSelect id="region-select" defaultValue="all">
              <NativeSelectOption value="all">All regions</NativeSelectOption>
              <NativeSelectOptGroup label="Americas">
                <NativeSelectOption value="us-east-1">
                  us-east-1
                </NativeSelectOption>
                <NativeSelectOption value="us-west-2">
                  us-west-2
                </NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Europe">
                <NativeSelectOption value="eu-west-1">
                  eu-west-1
                </NativeSelectOption>
                <NativeSelectOption value="eu-north-1">
                  eu-north-1
                </NativeSelectOption>
              </NativeSelectOptGroup>
            </NativeSelect>
          </div>
          <div className="w-[132px]">
            <label
              htmlFor="window-select"
              className="mb-1.5 block text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
            >
              Window
            </label>
            <NativeSelect id="window-select" disabled>
              <NativeSelectOption value="24h">Last 24 hours</NativeSelectOption>
            </NativeSelect>
          </div>
        </section>

        {/* Environments — horizontal scroller */}
        <section aria-label="Environments" className="pt-5">
          <div className="flex items-center justify-between px-4 pb-2">
            <h2 className="text-sm font-semibold text-foreground">
              Environments
            </h2>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <SlidersHorizontal className="size-3" />
              swipe for more
            </span>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max gap-3 px-4 pb-3">
              {environments.map((env) => (
                <article
                  key={env.name}
                  className="w-[148px] shrink-0 rounded-xl border border-border bg-card p-3"
                >
                  <StatusBadge tone={env.tone}>{env.label}</StatusBadge>
                  <h3 className="pt-2 font-mono text-[13px] font-medium text-foreground">
                    {env.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {env.region}
                  </p>
                  <dl className="mt-2.5 grid grid-cols-2 gap-1 border-t border-border/70 pt-2 text-[11px]">
                    <div>
                      <dt className="text-muted-foreground">uptime</dt>
                      <dd className="font-medium text-foreground">
                        {env.uptime}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">p95</dt>
                      <dd className="font-medium text-foreground">{env.p95}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Services */}
        <section aria-label="Services" className="px-4 pb-6 pt-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-semibold text-foreground">Services</h2>
            <span className="text-[11px] text-muted-foreground">
              4 healthy · 2 degraded
            </span>
          </div>
          <ul className="divide-y divide-border/70 rounded-xl border border-border bg-card">
            {services.map((service) => (
              <li
                key={service.name}
                className="flex items-center justify-between gap-3 px-3.5 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <service.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[13px] font-medium text-foreground">
                      {service.name}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {service.meta}
                    </p>
                  </div>
                </div>
                <StatusBadge tone={service.tone}>{service.label}</StatusBadge>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/70 px-4 py-3 text-center text-[11px] text-muted-foreground">
          Auto-refresh every 30s · incident channel #fleet-oncall
        </footer>
      </div>
    </EvalShell>
  );
}
