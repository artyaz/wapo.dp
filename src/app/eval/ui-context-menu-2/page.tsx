"use client";

/**
 * EVAL page — context-menu p2 — analytics dashboard for a specialty coffee
 * chain — 1280x800 light.
 *
 * Stars ui:context-menu — every store row in the performance table is a
 * right-click target. The menu over the Bryant Park row is opened at
 * initial render via a synthetic `contextmenu` event, and its "Reports"
 * submenu is opened with a synthetic mouse `pointermove` over the sub
 * trigger, so the screenshot captures both overlays.
 * Co-stars: Table, Card, Badge, Button, Tabs, Avatar, Progress, Chart.
 */

import React from "react";
import {
  ActivityIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BarChart3Icon,
  CalendarIcon,
  ClockIcon,
  CoffeeIcon,
  DownloadIcon,
  LayoutDashboardIcon,
  MapPinIcon,
  MousePointerClickIcon,
  PackageIcon,
  ReceiptTextIcon,
  SettingsIcon,
  StoreIcon,
  TrashIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { EvalShell } from "@/eval/EvalShell";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- data: Cascara Coffee Co., week 8 of Q1 2026 --------------------------

type StoreStatus = "record" | "on-track" | "watch" | "closed";

type Store = {
  id: string;
  name: string;
  city: string;
  region: string;
  revenue: string;
  delta: number | null;
  transactions: string;
  ticket: string;
  status: StoreStatus;
};

const STORES: Store[] = [
  {
    id: "pike",
    name: "Pike St. Flagship",
    city: "Seattle, WA",
    region: "Pacific",
    revenue: "$58,410",
    delta: 6.8,
    transactions: "5,924",
    ticket: "$9.86",
    status: "record",
  },
  {
    id: "bryant",
    name: "Bryant Park",
    city: "New York, NY",
    region: "Northeast",
    revenue: "$47,230",
    delta: 4.1,
    transactions: "4,946",
    ticket: "$9.55",
    status: "on-track",
  },
  {
    id: "wicker",
    name: "Wicker Park",
    city: "Chicago, IL",
    region: "Midwest",
    revenue: "$39,610",
    delta: 2.4,
    transactions: "4,548",
    ticket: "$8.71",
    status: "on-track",
  },
  {
    id: "pearl",
    name: "Pearl District",
    city: "Portland, OR",
    region: "Pacific",
    revenue: "$31,050",
    delta: -1.8,
    transactions: "3,751",
    ticket: "$8.28",
    status: "watch",
  },
  {
    id: "congress",
    name: "South Congress",
    city: "Austin, TX",
    region: "Central",
    revenue: "$28,730",
    delta: 9.2,
    transactions: "2,806",
    ticket: "$10.24",
    status: "on-track",
  },
  {
    id: "rittenhouse",
    name: "Rittenhouse Sq.",
    city: "Philadelphia, PA",
    region: "Northeast",
    revenue: "—",
    delta: null,
    transactions: "—",
    ticket: "—",
    status: "closed",
  },
];

const dayparts = [
  { slot: "5–7a", revenue: 24.6 },
  { slot: "7–11a", revenue: 78.2 },
  { slot: "11–2p", revenue: 49.3 },
  { slot: "2–5p", revenue: 31.9 },
  { slot: "5–8p", revenue: 21.0 },
];

const daypartConfig = {
  revenue: { label: "Revenue ($K)", color: "var(--chart-2)" },
} satisfies ChartConfig;

const DRINKS = [
  { name: "Flat white", count: 3184 },
  { name: "Cortado", count: 2451 },
  { name: "Cold brew", count: 2117 },
  { name: "Pour over", count: 986 },
  { name: "Espresso tonic", count: 782 },
];

const KPIS = [
  { label: "Net revenue", value: "$205.0K", delta: "+4.2%", up: true },
  { label: "Transactions", value: "21,975", delta: "+2.1%", up: true },
  { label: "Avg ticket", value: "$9.33", delta: "+1.3%", up: true },
  { label: "Gross margin", value: "61.8%", delta: "−0.9pt", up: false },
];

const NAV = [
  { label: "Overview", icon: LayoutDashboardIcon, active: false },
  { label: "Locations", icon: MapPinIcon, active: true },
  { label: "Menu", icon: CoffeeIcon, active: false },
  { label: "Orders", icon: ReceiptTextIcon, active: false },
  { label: "Baristas", icon: UsersIcon, active: false },
  { label: "Inventory", icon: PackageIcon, active: false },
  { label: "Settings", icon: SettingsIcon, active: false },
];

function StatusBadge({ store }: { store: Store }) {
  switch (store.status) {
    case "record":
      return (
        <span className="inline-flex items-center justify-center rounded-md border border-success-300/50 bg-success-400/10 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-success-700">
          Record week
        </span>
      );
    case "watch":
      return (
        <span className="inline-flex items-center justify-center rounded-md border border-warning-300/50 bg-warning-400/10 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-warning-700">
          Watch
        </span>
      );
    case "closed":
      return <Badge variant="secondary">Training day</Badge>;
    default:
      return <Badge variant="outline">On track</Badge>;
  }
}

/** The context menu attached to every store row. */
function StoreMenu({ store }: { store: Store }) {
  return (
    <ContextMenuContent className="w-60">
      <ContextMenuLabel>
        {store.name} · {store.region}
      </ContextMenuLabel>
      <ContextMenuGroup>
        <ContextMenuItem>
          <StoreIcon />
          View store detail
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <ActivityIcon />
          Open live overview
          <ContextMenuShortcut>⌘L</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <BarChart3Icon />
            Reports
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuGroup>
              <ContextMenuItem>
                <TrendingUpIcon />
                Daily sales
              </ContextMenuItem>
              <ContextMenuItem>
                <ClockIcon />
                Hourly traffic
              </ContextMenuItem>
              <ContextMenuItem>
                <CoffeeIcon />
                Product mix
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>
                <CalendarIcon />
                Custom range…
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuCheckboxItem defaultChecked>
          Pin to overview
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>
          Alert on low margin
        </ContextMenuCheckboxItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Deactivate location
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
}

const sectionLabel =
  "text-caption font-caption uppercase tracking-[0.12em] text-neutral-500";

export default function Page() {
  const targetRef = React.useRef<HTMLTableRowElement>(null);

  // Radix's ContextMenu anchors at the `contextmenu` event coordinates —
  // synthesize one on the Bryant Park row so the menu is deterministically
  // open in the captured screenshot, then hover the "Reports" sub-trigger
  // (a mouse `pointermove` — Radix opens subs on mouse hover after 100ms)
  // so the submenu is captured open as well.
  React.useEffect(() => {
    const row = targetRef.current;
    if (!row) return;
    let subTimer = 0;
    const openTimer = window.setTimeout(() => {
      const rect = row.getBoundingClientRect();
      row.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          button: 2,
          buttons: 2,
          clientX: rect.left + rect.width * 0.45,
          clientY: rect.top + rect.height * 0.5,
        })
      );
      subTimer = window.setTimeout(() => {
        const sub = document.querySelector<HTMLElement>(
          '[data-slot="context-menu-sub-trigger"]'
        );
        if (!sub) return;
        const r = sub.getBoundingClientRect();
        sub.dispatchEvent(
          new PointerEvent("pointermove", {
            bubbles: true,
            cancelable: true,
            pointerType: "mouse",
            clientX: r.left + r.width / 2,
            clientY: r.top + r.height / 2,
          })
        );
      }, 700);
    }, 350);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(subTimer);
    };
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col gap-6 border-r border-default-border bg-card px-4 py-5">
          <div className="flex items-center gap-3 px-1.5">
            <div className="flex size-9 items-center justify-center rounded-lg border border-default-border bg-background text-neutral-700">
              <CoffeeIcon className="size-4.5" />
            </div>
            <div>
              <p className="font-heading-3 text-sm leading-5 font-semibold text-foreground">
                Cascara Coffee Co.
              </p>
              <p className="text-caption font-caption text-neutral-500">
                Specialty retail · 6 stores
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Main">
            {NAV.map((item) => (
              <span
                key={item.label}
                aria-current={item.active ? "page" : undefined}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-sm bg-accent px-2.5 py-2 text-sm font-medium text-accent-foreground"
                    : "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                }
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </span>
            ))}
          </nav>

          <div className="mt-auto rounded-lg border border-default-border bg-background px-3.5 py-3">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-medium text-foreground">
                Q1 POS rollout
              </p>
              <p className="font-code text-xs text-muted-foreground">4/6</p>
            </div>
            <Progress value={67} className="mt-2.5 h-1.5" aria-label="4 of 6 stores migrated" />
            <p className="mt-2 text-caption font-caption text-neutral-500">
              Pearl &amp; Rittenhouse next
            </p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 px-8 py-6">
          <header className="flex items-start justify-between gap-6">
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Store performance
              </h1>
              <p className="mt-1 text-caption font-caption text-muted-foreground">
                Week 8 ·{" "}
                <span className="font-code text-foreground">
                  Feb 9 – Feb 15, 2026
                </span>{" "}
                · 6 locations · 5 reporting
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <Tabs defaultValue="7d">
                <TabsList>
                  <TabsTrigger value="7d">7 days</TabsTrigger>
                  <TabsTrigger value="28d">28 days</TabsTrigger>
                  <TabsTrigger value="qtr">Quarter</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm">
                <DownloadIcon />
                Export CSV
              </Button>
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">AK</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-4">
            {KPIS.map((kpi) => (
              <Card key={kpi.label} className="py-0">
                <CardContent className="flex flex-col gap-1.5 px-4 py-3.5">
                  <p className="text-caption font-caption text-neutral-500">
                    {kpi.label}
                  </p>
                  <p className="font-code text-2xl font-medium tabular-nums text-foreground">
                    {kpi.value}
                  </p>
                  <p className="flex items-center gap-1 text-xs">
                    {kpi.up ? (
                      <ArrowUpRightIcon className="size-3.5 text-success-600" />
                    ) : (
                      <ArrowDownRightIcon className="size-3.5 text-destructive-500" />
                    )}
                    <span
                      className={
                        kpi.up
                          ? "font-code text-success-600"
                          : "font-code text-destructive-500"
                      }
                    >
                      {kpi.delta}
                    </span>
                    <span className="text-neutral-500">vs LW</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content row: table + rail */}
          <div className="flex min-w-0 flex-1 items-start gap-5">
            <Card className="min-w-0 flex-1 py-0">
              <div className="flex items-center justify-between border-b border-default-border px-5 py-3.5">
                <div>
                  <h2 className="text-sm font-medium text-foreground">
                    Locations · week 8
                  </h2>
                  <p className="mt-0.5 text-caption font-caption text-neutral-500">
                    Net revenue by store
                  </p>
                </div>
                <p className="flex items-center gap-1.5 text-caption font-caption text-neutral-500">
                  <MousePointerClickIcon className="size-3.5" />
                  Right-click a store for quick actions
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5">Store</TableHead>
                    <TableHead className="text-right">Net revenue</TableHead>
                    <TableHead className="text-right">vs LW</TableHead>
                    <TableHead className="text-right">Trans.</TableHead>
                    <TableHead className="text-right">Avg ticket</TableHead>
                    <TableHead className="pr-5 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {STORES.map((store) => (
                    <ContextMenu key={store.id}>
                      <ContextMenuTrigger asChild>
                        <TableRow
                          ref={store.id === "bryant" ? targetRef : undefined}
                          className={
                            store.status === "closed"
                              ? "cursor-default text-muted-foreground"
                              : "cursor-default data-[state=open]:bg-accent/50"
                          }
                        >
                          <TableCell className="py-3 pl-5">
                            <p className="text-sm font-medium text-foreground">
                              {store.name}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {store.city}
                            </p>
                          </TableCell>
                          <TableCell className="text-right font-code text-sm tabular-nums">
                            {store.revenue}
                          </TableCell>
                          <TableCell className="text-right font-code text-sm tabular-nums">
                            {store.delta === null ? (
                              <span className="text-neutral-400">—</span>
                            ) : (
                              <span
                                className={
                                  store.delta >= 0
                                    ? "text-success-600"
                                    : "text-destructive-500"
                                }
                              >
                                {store.delta >= 0 ? "+" : "−"}
                                {Math.abs(store.delta).toFixed(1)}%
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-code text-sm tabular-nums">
                            {store.transactions}
                          </TableCell>
                          <TableCell className="text-right font-code text-sm tabular-nums">
                            {store.ticket}
                          </TableCell>
                          <TableCell className="py-3 pr-5 text-right">
                            <StatusBadge store={store} />
                          </TableCell>
                        </TableRow>
                      </ContextMenuTrigger>
                      <StoreMenu store={store} />
                    </ContextMenu>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Right rail */}
            <div className="flex w-80 shrink-0 flex-col gap-5">
              <Card className="py-0">
                <CardHeader className="px-5 pt-4 pb-0">
                  <CardTitle className="text-sm font-medium">
                    Revenue by daypart
                  </CardTitle>
                  <CardAction>
                    <span className="font-code text-xs text-muted-foreground">
                      $205.0K
                    </span>
                  </CardAction>
                </CardHeader>
                <CardContent className="px-3 pb-3 pt-2">
                  <ChartContainer
                    config={daypartConfig}
                    className="h-[172px] w-full aspect-auto"
                  >
                    <BarChart
                      accessibilityLayer
                      data={dayparts}
                      margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="slot"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis hide domain={[0, 90]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="revenue"
                        fill="var(--color-revenue)"
                        radius={[3, 3, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="py-0">
                <CardHeader className="px-5 pt-4 pb-0">
                  <CardTitle className="text-sm font-medium">
                    Top drinks this week
                  </CardTitle>
                  <CardAction>
                    <span className="font-code text-xs text-muted-foreground">
                      5 of 38
                    </span>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 px-5 pb-4 pt-3">
                  {DRINKS.map((drink) => (
                    <div key={drink.name} className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between">
                        <p className="text-sm text-foreground">{drink.name}</p>
                        <p className="font-code text-xs tabular-nums text-muted-foreground">
                          {drink.count.toLocaleString("en-US")}
                        </p>
                      </div>
                      <Progress
                        value={(drink.count / DRINKS[0].count) * 100}
                        className="h-1.5"
                        aria-label={`${drink.name} sold ${drink.count} times`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="mt-auto flex items-center justify-between border-t border-default-border pt-3.5">
            <p className={sectionLabel}>Cascara Coffee Co. · Analytics</p>
            <p className="font-code text-xs text-neutral-500">
              Synced 06:40 · POS v8.2
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
