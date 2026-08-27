"use client";

/**
 * pair-080 — "Relay" deployment console (dark, 1280×800, ltr).
 *
 * A platform engineer reviews the service fleet: the main area is a
 * DataTable of deployed services (status / region / version / on-call
 * owner / p99). The owner cells are HoverCard triggers — the card for the
 * owner of the failing search-index service is open for the audit. The
 * selected row (edge-gateway) has its editable properties in the
 * right-hand inspector panel built from InspectorRow rows.
 */

import React from "react";
import { Activity, RefreshCw, Rocket } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { InspectorRow } from "@/components/ds/InspectorRow";
import {
  createColumnHelper,
  DataTable,
  DataTableColumnHeader,
  DataTableViewOptions,
} from "@/components/ui/data-table";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type Owner = {
  initials: string;
  name: string;
  handle: string;
  role: string;
  deploys: number;
  services: number;
  note: string;
};

type ServiceStatus = "live" | "canary" | "failing" | "paused";

type Service = {
  id: string;
  name: string;
  status: ServiceStatus;
  region: string;
  version: string;
  owner: Owner;
  p99: number;
};

const OWNERS: Record<string, Owner> = {
  osei: {
    initials: "MO",
    name: "Mara Osei",
    handle: "@mara",
    role: "Platform Engineer",
    deploys: 12,
    services: 2,
    note: "Owns edge ingress. Prefers canaries over big-bang rollouts.",
  },
  park: {
    initials: "JP",
    name: "Jonas Park",
    handle: "@jonas",
    role: "Backend Engineer",
    deploys: 9,
    services: 1,
    note: "Keeps auth-relay boring on purpose. Zero incidents this quarter.",
  },
  reyes: {
    initials: "NR",
    name: "Nadia Reyes",
    handle: "@nadia",
    role: "Staff SRE",
    deploys: 21,
    services: 2,
    note: "Runs the eu-west-1 capacity plan and the canary analysis dashboards.",
  },
  kim: {
    initials: "DK",
    name: "Daeun Kim",
    handle: "@daeun",
    role: "SRE · Incident Commander",
    deploys: 18,
    services: 1,
    note: "On-call for eu-west-1 this week. Shipped the search-index v3.7.1 hotfix and is watching the recovery.",
  },
  duarte: {
    initials: "AD",
    name: "Alba Duarte",
    handle: "@alba",
    role: "Backend Engineer",
    deploys: 6,
    services: 1,
    note: "Paused webhook-fanout during the partner API migration.",
  },
  moreau: {
    initials: "LM",
    name: "Luc Moreau",
    handle: "@luc",
    role: "Product Engineer",
    deploys: 14,
    services: 1,
    note: "Feature flags ship behind gates — ask before flipping anything.",
  },
};

const SERVICES: Service[] = [
  { id: "svc-001", name: "edge-gateway", status: "live", region: "us-east-1", version: "v2.14.3", owner: OWNERS.osei, p99: 38 },
  { id: "svc-002", name: "auth-relay", status: "live", region: "us-east-1", version: "v4.2.0", owner: OWNERS.park, p99: 64 },
  { id: "svc-003", name: "billing-sync", status: "canary", region: "eu-west-1", version: "v1.9.0-rc.2", owner: OWNERS.reyes, p99: 87 },
  { id: "svc-004", name: "search-index", status: "failing", region: "eu-west-1", version: "v3.7.1", owner: OWNERS.kim, p99: 1240 },
  { id: "svc-005", name: "media-cache", status: "live", region: "ap-south-1", version: "v0.22.5", owner: OWNERS.reyes, p99: 51 },
  { id: "svc-006", name: "webhook-fanout", status: "paused", region: "us-west-2", version: "v5.0.0", owner: OWNERS.duarte, p99: 45 },
  { id: "svc-007", name: "feature-flags", status: "live", region: "us-west-2", version: "v2.2.7", owner: OWNERS.moreau, p99: 72 },
  { id: "svc-008", name: "queue-worker", status: "canary", region: "ap-south-1", version: "v1.3.4", owner: OWNERS.osei, p99: 95 },
];

const STATUS_STYLES: Record<ServiceStatus, { dot: string; label: string }> = {
  live: { dot: "bg-emerald-500", label: "Live" },
  canary: { dot: "bg-amber-400", label: "Canary" },
  failing: { dot: "bg-red-500", label: "Failing" },
  paused: { dot: "bg-neutral-500", label: "Paused" },
};

// ---------------------------------------------------------------------------
// Table columns
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<Service>();

function OwnerCell({ owner, open }: { owner: Owner; open: boolean }) {
  return (
    <HoverCard openDelay={100} closeDelay={150} defaultOpen={open}>
      <HoverCardTrigger
        render={
          <button
            type="button"
            className="-mx-1 flex items-center gap-2 rounded-md px-1 py-0.5 text-sm text-foreground/90 transition-colors hover:bg-accent/60 hover:text-foreground"
          />
        }
      >
        <Avatar size="sm">
          <AvatarFallback className="text-[10px]">
            {owner.initials}
          </AvatarFallback>
        </Avatar>
        <span className="truncate">{owner.name}</span>
      </HoverCardTrigger>
      <HoverCardContent align="start" sideOffset={6} className="w-72">
        <div className="flex items-start gap-3">
          <Avatar size="lg">
            <AvatarFallback>{owner.initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
            <div className="text-sm font-semibold">{owner.name}</div>
            <div className="truncate text-xs text-muted-foreground">
              {owner.handle} · {owner.role}
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {owner.note}
        </p>
        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span>
            <strong className="font-semibold text-foreground">
              {owner.deploys}
            </strong>{" "}
            deploys
          </span>
          <span>
            <strong className="font-semibold text-foreground">
              {owner.services}
            </strong>{" "}
            services
          </span>
          {open ? (
            <span className="ml-auto inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-red-500" />
              on-call
            </span>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-[13px] font-medium">
        {row.getValue("name")}
      </span>
    ),
    size: 168,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<ServiceStatus>("status");
      const style = STATUS_STYLES[status];
      return (
        <Badge variant="outline" className="gap-1.5 px-2">
          <span className={`size-1.5 rounded-full ${style.dot}`} />
          {style.label}
        </Badge>
      );
    },
    size: 112,
  }),
  columnHelper.accessor("region", {
    header: "Region",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("region")}
      </span>
    ),
    size: 116,
  }),
  columnHelper.accessor("version", {
    header: "Version",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("version")}
      </span>
    ),
    size: 124,
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    cell: ({ row }) => (
      <OwnerCell owner={row.original.owner} open={row.original.id === "svc-004"} />
    ),
    size: 184,
  }),
  columnHelper.accessor("p99", {
    header: () => <div className="text-right">p99</div>,
    cell: ({ row }) => {
      const p99 = row.getValue<number>("p99");
      const tone =
        p99 >= 200
          ? "text-red-400"
          : p99 >= 80
            ? "text-amber-300"
            : "text-muted-foreground";
      return (
        <span
          className={`block text-right font-mono text-xs tabular-nums ${tone}`}
        >
          {p99}ms
        </span>
      );
    },
    size: 84,
  }),
]);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card/40 px-6">
          <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-primary/10">
            <Activity className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Relay</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm text-muted-foreground">Deployments</span>
          <Badge variant="outline" className="ml-1 text-[11px] text-muted-foreground">
            prod
          </Badge>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <RefreshCw />
              Refresh
            </Button>
            <AvatarGroup>
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">MO</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">NR</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">DK</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </header>

        <main className="flex flex-1 items-start gap-6 p-6">
          {/* Fleet table */}
          <section className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Service fleet
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  8 services · 3 regions · rolling 24 h · 2 canaries · 1 failing
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                updated 42 s ago
              </span>
            </div>

            <DataTable
              columns={columns}
              data={SERVICES}
              enableRowSelection
              getRowId={(service) => service.id}
              rowSelection={{ "svc-001": true }}
              defaultSorting={[{ id: "name", desc: false }]}
              toolbar={(table) => (
                <div className="flex w-full items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Rocket />
                    Deploy
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    next window 14:00 UTC
                  </span>
                  <DataTableViewOptions table={table} />
                </div>
              )}
            />
          </section>

          {/* Inspector panel */}
          <aside className="w-[320px] shrink-0 rounded-2xl border border-border bg-card p-5">
            <div className="mb-1 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Inspector</h2>
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                edge-gateway
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              svc-001 · us-east-1 · selected row
            </p>

            <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
              <InspectorRow label="alias" variant="text" />
              <InspectorRow label="host" variant="select" value="us-east-1.internal" />
              <InspectorRow label="replicas" variant="number" value="4" />
              <InspectorRow label="public" variant="toggle" checked />
              <InspectorRow label="drain" variant="toggle" />
              <InspectorRow label="accent" variant="color" value="#737373" />
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Last deploy
              </p>
              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Revision</span>
                  <span className="font-mono text-foreground/80">
                    v2.14.3 · #4821
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>By</span>
                  <span className="text-foreground/80">Mara Osei · 2 h ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Health</span>
                  <span className="inline-flex items-center gap-1.5 text-foreground/80">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    99.99% uptime
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Recent activity
              </p>
              <div className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
                <div>
                  <span className="font-mono text-[11px] text-neutral-500">
                    09:41
                  </span>{" "}
                  search-index p99 crossed 1.2 s — pager opened
                </div>
                <div>
                  <span className="font-mono text-[11px] text-neutral-500">
                    08:17
                  </span>{" "}
                  billing-sync canary promoted to 10% of traffic
                </div>
                <div>
                  <span className="font-mono text-[11px] text-neutral-500">
                    07:52
                  </span>{" "}
                  webhook-fanout paused for partner migration
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
