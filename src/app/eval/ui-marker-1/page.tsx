"use client";

/**
 * EVAL page — marker p1 — warehouse inventory console — 430x932 light (phone)
 *
 * Scenario: "Northgate Fulfillment" building-2 inventory console for clerk
 * D. Reyes. Marker carries the status vocabulary of the floor: a live sync
 * indicator in the header, status-dot markers on pick-queue rows, separator
 * markers dividing the queue sections, border markers as exception chips,
 * and a spinner status marker for the running cycle count.
 * Co-stars: Card, Badge, Button, Progress, Separator.
 */

import {
  Boxes,
  ClipboardList,
  Home,
  PackageSearch,
  ScanLine,
  User,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

const PICK_QUEUE = [
  {
    sku: "SKU-41822",
    name: "Corrugated shipper 12×300",
    loc: "A-14-3",
    qty: "1,240",
    state: "in-stock" as const,
    label: "In stock",
  },
  {
    sku: "SKU-63108",
    name: "Packing tape 48 mm",
    loc: "A-11-1",
    qty: "430",
    state: "in-stock" as const,
    label: "In stock",
  },
  {
    sku: "SKU-20517",
    name: "Stretch wrap 18 µ 400 m",
    loc: "A-09-2",
    qty: "96",
    state: "low" as const,
    label: "Low",
  },
  {
    sku: "SKU-77340",
    name: "Thermal label rolls 4×6",
    loc: "B-02-7",
    qty: "12",
    state: "critical" as const,
    label: "Critical",
  },
];

const DOT: Record<string, string> = {
  "in-stock": "bg-success-500",
  low: "bg-warning-500",
  critical: "bg-destructive-500",
};

const TABBAR = [
  { icon: Home, label: "Floor", active: true },
  { icon: PackageSearch, label: "Lookup" },
  { icon: ScanLine, label: "Scan" },
  { icon: User, label: "Profile" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-dvh w-full flex-col bg-background text-foreground">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="px-4 pb-2 pt-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Northgate Fulfillment · Bldg 2
              </p>
              <h1 className="font-heading-2 text-heading-2">
                Inventory console
              </h1>
            </div>
            <Button variant="outline" size="icon-sm" aria-label="Task list">
              <ClipboardList />
            </Button>
          </div>
          {/* Live sync marker */}
          <Marker
            role="status"
            className="mt-1.5 w-auto justify-start gap-1.5"
          >
            <MarkerIcon>
              <span className="size-2 animate-pulse rounded-full bg-success-500" />
            </MarkerIcon>
            <MarkerContent className="font-code text-[10px]">
              Live · synced 4 s ago · zone A
            </MarkerContent>
          </Marker>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
          {/* ── Bay status cards ───────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-2">
            <Card className="gap-1.5 rounded-lg py-3">
              <CardContent className="px-3">
                <p className="font-code text-[9px] uppercase tracking-wider text-muted-foreground">
                  Pick rate
                </p>
                <p className="font-code text-lg font-semibold leading-tight">
                  142
                </p>
                <p className="text-[10px] text-muted-foreground">lines / hr</p>
              </CardContent>
            </Card>
            <Card className="gap-1.5 rounded-lg py-3">
              <CardContent className="px-3">
                <p className="font-code text-[9px] uppercase tracking-wider text-muted-foreground">
                  Accuracy
                </p>
                <p className="font-code text-lg font-semibold leading-tight">
                  99.2%
                </p>
                <p className="text-[10px] text-muted-foreground">this shift</p>
              </CardContent>
            </Card>
            <Card className="gap-1.5 rounded-lg py-3">
              <CardContent className="px-3">
                <p className="font-code text-[9px] uppercase tracking-wider text-muted-foreground">
                  Exceptions
                </p>
                <p className="font-code text-lg font-semibold leading-tight">
                  3
                </p>
                <p className="text-[10px] text-muted-foreground">open now</p>
              </CardContent>
            </Card>
          </div>

          {/* ── Pick queue ─────────────────────────────────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Pick queue · zone A</CardTitle>
              <CardAction>
                <Badge variant="secondary" className="font-code text-[10px]">
                  4 lines
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-2">
              {PICK_QUEUE.map((line, i) => (
                <div key={line.sku}>
                  {i > 0 && <Separator className="mx-2" />}
                  <div className="flex items-center gap-3 px-2 py-2.5">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-sm border bg-muted"
                      aria-hidden
                    >
                      <Boxes className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {line.name}
                      </p>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {line.sku} · loc {line.loc} · qty {line.qty}
                      </p>
                    </div>
                    {/* Row status marker */}
                    <Marker className="w-auto shrink-0 justify-start gap-1.5">
                      <MarkerIcon>
                        <span
                          className={`size-1.5 rounded-full ${DOT[line.state]}`}
                          aria-hidden
                        />
                      </MarkerIcon>
                      <MarkerContent className="text-[11px]">
                        {line.label}
                      </MarkerContent>
                    </Marker>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ── Exceptions (separator + border markers) ────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Exceptions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 px-4">
              <Marker variant="separator">
                <MarkerContent className="font-code text-[10px] uppercase tracking-wider">
                  Last 30 minutes
                </MarkerContent>
              </Marker>
              <Marker
                variant="border"
                role="status"
                className="w-full justify-start"
              >
                <MarkerIcon>
                  <span className="size-1.5 rounded-full bg-destructive-500" />
                </MarkerIcon>
                <MarkerContent>
                  Scanner SC-04 offline · 18 min
                </MarkerContent>
              </Marker>
              <Marker
                variant="border"
                role="status"
                className="w-full justify-start"
              >
                <MarkerIcon>
                  <span className="size-1.5 rounded-full bg-warning-500" />
                </MarkerIcon>
                <MarkerContent>
                  Recount pending · bin B-02-7
                </MarkerContent>
              </Marker>
              <Marker
                variant="border"
                className="w-full justify-start text-muted-foreground"
              >
                <MarkerIcon>
                  <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                </MarkerIcon>
                <MarkerContent>
                  PO 8814 received · 11:42 · dock 3
                </MarkerContent>
              </Marker>
            </CardContent>
          </Card>

          {/* ── Cycle count (spinner status marker) ────────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Cycle count · bay 4</CardTitle>
              <CardAction>
                <Badge variant="outline" className="font-code text-[10px]">
                  63%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 px-4">
              <Progress value={63} aria-label="Cycle count 63% complete" />
              <Marker role="status">
                <MarkerIcon>
                  <Spinner className="size-3.5" />
                </MarkerIcon>
                <MarkerContent className="font-code text-[10px]">
                  Counting bins B-14 → B-29 · 214 of 340
                </MarkerContent>
              </Marker>
            </CardContent>
          </Card>
        </div>

        {/* ── Tab bar ─────────────────────────────────────────────── */}
        <nav className="border-t">
          <div className="grid grid-cols-4">
            {TABBAR.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`flex flex-col items-center gap-1 py-2.5 text-[10px] ${
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </div>
        </nav>
      </div>
    </EvalShell>
  );
}
