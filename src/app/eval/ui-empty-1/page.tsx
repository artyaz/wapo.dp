"use client";

/**
 * EVAL page — empty p1 — warehouse inventory console — 1920x1080 dark
 *
 * Scenario: "Harborline WMS" inventory console for DC Rotterdam, Building 4.
 * Sidebar shell + KPI strip + inventory card whose filtered view returns no
 * results (hero Empty) + right rail with a "queue is clear" Empty and a
 * first-run "no count schedule yet" Empty. Co-stars: Card, Tabs, Badge,
 * Button, InputGroup, Avatar, Separator.
 */

import {
  ClipboardList,
  Download,
  FileText,
  LayoutDashboard,
  ListChecks,
  Package,
  PackageOpen,
  Plus,
  RotateCcw,
  Search,
  SearchX,
  Settings,
  Truck,
  X,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NAV = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Package, label: "Inventory", active: true },
  { icon: Truck, label: "Receiving" },
  { icon: ListChecks, label: "Pick waves" },
  { icon: PackageOpen, label: "Replenishment" },
  { icon: ClipboardList, label: "Cycle counts" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const KPIS = [
  { label: "SKUs tracked", value: "12,408", sub: "across 6 zones" },
  { label: "On-hand units", value: "48,312", sub: "+1,204 inbound today" },
  { label: "Open pick tasks", value: "27", sub: "8 due before 12:00" },
  {
    label: "30-day variance",
    value: "0.86%",
    sub: "target ≤ 0.50% · Zone D",
    warn: true,
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground flex h-screen w-full overflow-hidden">
        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="bg-card flex w-60 shrink-0 flex-col border-r">
          <div className="flex items-center gap-3 px-5 py-5">
            <div className="bg-muted text-foreground flex size-9 items-center justify-center rounded-lg border">
              <Package className="size-5" />
            </div>
            <div>
              <p className="font-heading-3 text-heading-3 leading-none">
                Harborline
              </p>
              <p className="text-muted-foreground mt-1 font-code text-[10px] uppercase tracking-[0.14em]">
                WMS · v4.2.1
              </p>
            </div>
          </div>
          <Separator />
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {NAV.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${
                  active
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
                {active ? (
                  <span className="bg-foreground ml-auto size-1 rounded-full" />
                ) : null}
              </span>
            ))}
          </nav>
          <Separator />
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Dana Kessler</p>
              <p className="text-muted-foreground truncate font-code text-[10px]">
                Shift B · ends 14:00
              </p>
            </div>
          </div>
        </aside>

        {/* ── Main column ─────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-4 border-b px-6 py-4">
            <div>
              <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
                DC Rotterdam — Building 4
              </p>
              <h1 className="font-heading-2 text-heading-2">Inventory</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="font-code text-[10px]">
                Live · synced 12 s ago
              </Badge>
              <Button variant="outline" size="sm">
                <Download data-icon="inline-start" />
                Export CSV
              </Button>
              <Button size="sm">
                <Plus data-icon="inline-start" />
                Receive shipment
              </Button>
            </div>
          </header>

          {/* KPI strip */}
          <div className="grid grid-cols-4 gap-4 px-6 pt-5">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-card rounded-lg border px-4 py-3"
              >
                <p className="text-muted-foreground text-xs">{kpi.label}</p>
                <p
                  className={`mt-1 font-code text-2xl ${
                    kpi.warn ? "text-warning-400" : "text-foreground"
                  }`}
                >
                  {kpi.value}
                </p>
                <p className="text-muted-foreground mt-0.5 font-code text-[10px]">
                  {kpi.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_360px] gap-4 p-6">
            {/* Inventory — filtered view returns no results */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Stock on hand
                </CardTitle>
                <CardDescription>
                  Query returned no rows — filters too narrow.
                </CardDescription>
                <CardAction>
                  <Button variant="outline" size="icon-sm" aria-label="Search">
                    <Search />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col gap-4 px-5">
                <div className="flex flex-wrap items-center gap-2">
                  <InputGroup className="w-64">
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                    <InputGroupInput
                      defaultValue="RTX-4088-12"
                      aria-label="Search SKU"
                    />
                  </InputGroup>
                  <Badge variant="outline">
                    Zone: Cold storage
                    <X className="size-3" />
                  </Badge>
                  <Badge variant="outline">
                    Low stock only
                    <X className="size-3" />
                  </Badge>
                  <Button variant="link" size="xs" className="ml-auto">
                    Clear all
                  </Button>
                </div>
                <Tabs defaultValue="low">
                  <TabsList className="h-8">
                    <TabsTrigger value="all" className="px-2.5 text-xs">
                      All items · 12,408
                    </TabsTrigger>
                    <TabsTrigger value="low" className="px-2.5 text-xs">
                      Low stock · 148
                    </TabsTrigger>
                    <TabsTrigger value="quarantine" className="px-2.5 text-xs">
                      Quarantined · 6
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* HERO — no search results */}
                <Empty className="min-h-0 flex-1 border border-dashed">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SearchX />
                    </EmptyMedia>
                    <EmptyTitle>
                      No items match &ldquo;RTX-4088-12&rdquo;
                    </EmptyTitle>
                    <EmptyDescription>
                      Searched 12,408 SKUs in Building 4 with{" "}
                      <span className="text-foreground font-medium">
                        Zone: Cold storage
                      </span>{" "}
                      and{" "}
                      <span className="text-foreground font-medium">
                        Low stock
                      </span>{" "}
                      applied. Shorten the query or clear a filter to widen the
                      result set.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button variant="outline" size="sm">
                        <RotateCcw data-icon="inline-start" />
                        Clear filters
                      </Button>
                      <Button variant="ghost" size="sm">
                        Save this search
                      </Button>
                    </div>
                    <EmptyDescription className="font-code text-[10px]">
                      Last inventory sync 06:42 UTC · 12 s ago
                    </EmptyDescription>
                  </EmptyContent>
                </Empty>
              </CardContent>
            </Card>

            {/* Right rail */}
            <div className="flex min-h-0 flex-col gap-4">
              <Card className="min-h-0 flex-1 gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Replenishment queue
                  </CardTitle>
                  <CardDescription>Bulk-bin → pick-face moves</CardDescription>
                </CardHeader>
                <CardContent className="min-h-0 flex-1 px-5">
                  <Empty className="h-full bg-muted/30">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <PackageOpen />
                      </EmptyMedia>
                      <EmptyTitle className="text-base">
                        Queue is clear
                      </EmptyTitle>
                      <EmptyDescription className="max-w-xs text-pretty">
                        No replenishment tasks pending for Building 4. New
                        tasks appear when stock drops below reorder points.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button variant="outline" size="sm">
                        View task history
                      </Button>
                    </EmptyContent>
                  </Empty>
                </CardContent>
              </Card>

              <Card className="min-h-0 flex-1 gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Cycle counts
                  </CardTitle>
                  <CardDescription>Zone D · accuracy last 30 d</CardDescription>
                  <CardAction>
                    <Badge variant="outline">Not configured</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="min-h-0 flex-1 px-5">
                  <Empty className="h-full">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <ClipboardList />
                      </EmptyMedia>
                      <EmptyTitle className="text-base">
                        No count schedule yet
                      </EmptyTitle>
                      <EmptyDescription className="max-w-xs text-pretty">
                        Set up a recurring count to keep Zone D accurate. Most
                        teams start with a weekly A-SKU count.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button size="sm">Create schedule</Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        How cycle counts work
                      </Button>
                    </EmptyContent>
                  </Empty>
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t px-6 py-2.5">
            <p className="text-muted-foreground font-code text-[10px]">
              RF gateway 12/12 online · last full sync 06:42 UTC
            </p>
            <p className="text-muted-foreground font-code text-[10px]">
              Building 4 — Rotterdam, NL
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
