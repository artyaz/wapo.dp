"use client";

/**
 * EVAL page — dropdown-menu p3 — conference event ticketing — 768x1024,
 * dark theme, ltr.
 *
 * Box-office console for "DevSummit 2026". The account dropdown off the
 * header avatar renders OPEN at initial render (defaultOpen on the Root and
 * the "Switch event" submenu held open after mount) — label, icon items with
 * shortcuts, an open submenu switching events (uniform icon rows with a
 * trailing check on the active event — every row reserves the same leading
 * gutter as the parent menu), two checked preference toggles and sign-out.
 * Portrait tablet width: single column of stacked panels (gate status strip,
 * ticket tiers, recent orders). Other ui/* components: Button, Badge, Avatar,
 * Card, Progress, Separator, Table.
 */

import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  CheckIcon,
  DownloadIcon,
  GlobeIcon,
  ListIcon,
  LogOutIcon,
  MegaphoneIcon,
  MoreHorizontalIcon,
  QrCodeIcon,
  SparklesIcon,
  TicketIcon,
} from "lucide-react";

import * as React from "react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TIERS = [
  {
    name: "Early bird",
    price: "$99",
    sold: 500,
    cap: 500,
    badge: "Sold out",
    tone: "muted" as const,
  },
  {
    name: "Standard",
    price: "$149",
    sold: 842,
    cap: 1000,
    badge: "On sale",
    tone: "muted" as const,
  },
  {
    name: "Student",
    price: "$59",
    sold: 271,
    cap: 300,
    badge: "Low stock",
    tone: "warning" as const,
  },
  {
    name: "VIP workshop pass",
    price: "$349",
    sold: 96,
    cap: 150,
    badge: "On sale",
    tone: "muted" as const,
  },
];

const EVENTS = [
  {
    id: "devsummit-2026",
    label: "DevSummit 2026 · Columbus",
    icon: TicketIcon,
  },
  { id: "devsummit-eu", label: "DevSummit EU · Berlin", icon: GlobeIcon },
  { id: "ai-worlds", label: "AI Worlds · Austin", icon: SparklesIcon },
];

const ORDERS = [
  {
    code: "DS-84102",
    buyer: "Mara Whitfield",
    detail: "2 × Standard",
    total: "$298",
    status: "Paid",
    time: "09:41",
  },
  {
    code: "DS-84100",
    buyer: "Kira Petrova",
    detail: "1 × Student",
    total: "$59",
    status: "Pending",
    time: "09:35",
  },
  {
    code: "DS-84098",
    buyer: "Ana Souza",
    detail: "1 × Early bird",
    total: "$99",
    status: "Refunded",
    time: "09:24",
  },
];

export default function Page() {
  // Radix's Menu.Sub closes itself during the portaled mount cycle around
  // hydration (its unmount cleanup fires onOpenChange(false)), so the
  // "Switch event" submenu is controlled and its initial open state
  // re-asserted right after mount to stay open for the static capture.
  const [switchOpen, setSwitchOpen] = React.useState(true);
  const [event, setEvent] = React.useState("devsummit-2026");
  // Radix Menu CheckboxItem is controlled-only (`checked = false` default;
  // `defaultChecked` is a silent no-op), so both preference toggles are
  // driven by explicit state — the checkmarks actually render.
  const [compactRows, setCompactRows] = React.useState(true);
  const [showRefunded, setShowRefunded] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setSwitchOpen(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* app bar — account dropdown OPEN off the avatar */}
        <header className="flex h-14 flex-none items-center justify-between gap-3 border-b border-default-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <TicketIcon className="size-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold tracking-tight">
                DevSummit 2026
              </span>
              <Badge variant="secondary">Box office</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm">
              <QrCodeIcon />
              Scan ticket
            </Button>
            <DropdownMenu defaultOpen modal={false}>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Account menu"
                    className="rounded-full"
                  >
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs">PN</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  Priya Nair
                  <span className="block font-normal text-muted-foreground">
                    Ticketing lead · DevSummit
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BarChart3Icon />
                    Event dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DownloadIcon />
                    Sales report
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MegaphoneIcon />
                    Broadcast to attendees
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSub open={switchOpen} onOpenChange={setSwitchOpen}>
                  <DropdownMenuSubTrigger>
                    <ArrowLeftRightIcon />
                    Switch event
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-[17rem]">
                      {/* Event picker rows: every row carries a leading icon so
                          the label column aligns with the parent menu's icon
                          rows; the active event gets an end-anchored check
                          (absolute, like the family's marker gutters, so long
                          labels never wrap). */}
                      {EVENTS.map((e) => (
                        <DropdownMenuItem
                          key={e.id}
                          role="menuitemradio"
                          aria-checked={event === e.id}
                          onSelect={() => setEvent(e.id)}
                        >
                          <e.icon />
                          {e.label}
                          {event === e.id && (
                            <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
                              <CheckIcon className="size-4 text-foreground" />
                            </span>
                          )}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <ListIcon />
                        Manage events…
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={compactRows}
                  onCheckedChange={setCompactRows}
                >
                  Compact order rows
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showRefunded}
                  onCheckedChange={setShowRefunded}
                >
                  Show refunded orders
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Sign out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          {/* page heading */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Box office
              </h1>
              <p className="mt-0.5 font-code text-xs text-muted-foreground">
                Thu May 14 · pre-registration desk · updated 09:41
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <DownloadIcon />
              Today&apos;s reconciliation
            </Button>
          </div>

          {/* sales summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tickets sold", value: "1,709", note: "of 1,950 cap" },
              { label: "Revenue", value: "$214,660", note: "gross · USD" },
              {
                label: "Checked in",
                value: "0",
                note: "gates open 08:00 May 14",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-default-border bg-card px-3 py-2.5"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-0.5 font-code text-lg tabular-nums">
                  {stat.value}
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>

          {/* gate & scanner status — compact strip; keeps the ticket-tier
              rows below the open account menu's footprint so every tier
              keeps its row-actions trigger visible */}
          <div className="flex items-center gap-2.5 rounded-lg border border-default-border bg-card px-4 py-3">
            <QrCodeIcon className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Entry gates</span>
            <Badge variant="outline" className="font-code text-[10px]">
              A · B · C open
            </Badge>
          </div>

          {/* ticket tiers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-heading-3 text-heading-3">
                Ticket tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {TIERS.map((tier) => (
                <div key={tier.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">{tier.name}</span>
                      <span className="font-code text-xs tabular-nums text-muted-foreground">
                        {tier.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {tier.tone === "warning" ? (
                        <Badge
                          variant="outline"
                          className="border-warning-500/50 font-normal text-warning-500"
                        >
                          {tier.badge}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="font-normal">
                          {tier.badge}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Tier actions for ${tier.name}`}
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={(tier.sold / tier.cap) * 100}
                      className="h-1.5"
                    />
                    <span className="flex-none font-code text-[10px] tabular-nums text-muted-foreground">
                      {tier.sold}/{tier.cap}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* recent orders */}
          <div className="overflow-hidden rounded-lg border border-default-border bg-card">
            <div className="flex items-center justify-between border-b border-default-border px-4 py-2.5">
              <h2 className="font-heading-3 text-heading-3">Recent orders</h2>
              <span className="font-code text-[10px] text-muted-foreground">
                live · last 20 min
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-9 text-xs">Order</TableHead>
                  <TableHead className="h-9 text-xs">Buyer</TableHead>
                  <TableHead className="h-9 text-xs">Total</TableHead>
                  <TableHead className="h-9 text-xs">Status</TableHead>
                  <TableHead className="h-9 text-xs">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDERS.map((order) => (
                  <TableRow key={order.code}>
                    <TableCell className="py-2 font-code text-xs">
                      {order.code}
                    </TableCell>
                    <TableCell className="py-2">
                      <p className="text-sm">{order.buyer}</p>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {order.detail}
                      </p>
                    </TableCell>
                    <TableCell className="py-2 font-code text-xs tabular-nums">
                      {order.total}
                    </TableCell>
                    <TableCell className="py-2">
                      {order.status === "Paid" ? (
                        <Badge
                          variant="outline"
                          className="border-success-500/50 font-normal text-success-500"
                        >
                          {order.status}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="font-normal text-muted-foreground"
                        >
                          {order.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-2 font-code text-xs tabular-nums text-muted-foreground">
                      {order.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <footer className="mt-auto flex items-center justify-between font-code text-[10px] text-muted-foreground">
            <span>DevSummit 2026 · May 14–16 · Greater Columbus Convention Center</span>
            <span>gateway sync · 0 lag</span>
          </footer>
        </main>
      </div>
    </EvalShell>
  );
}
