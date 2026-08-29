"use client";

/**
 * EVAL page — marker p2 — volunteer shift coordinator — 1024x768 light
 *
 * Scenario: "Harborline Food Rescue" shift board, desktop, coordinator
 * Sam Okafor. Marker is the status spine: live check-in indicator with
 * progress, per-volunteer status-dot markers in the table, separator
 * markers grouping the activity feed, border markers as event chips, a
 * spinner marker for the roster being published, and an online marker
 * for the coordinator in the sidebar.
 * Co-stars: Card, Badge, Button, Table, Avatar, Progress.
 */

import {
  CalendarDays,
  ClipboardCheck,
  FileBarChart,
  MessageSquare,
  Repeat,
  Users,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NAV = [
  { icon: CalendarDays, label: "Shift board", active: true },
  { icon: Users, label: "Roster · 214" },
  { icon: Repeat, label: "Swap inbox" },
  { icon: MessageSquare, label: "Messages" },
  { icon: FileBarChart, label: "Reports" },
];

const VOLUNTEERS = [
  {
    initials: "MO",
    name: "Maya Okafor",
    role: "Packing line B",
    hours: "6:02",
    state: "checked-in",
    label: "Checked in",
  },
  {
    initials: "JW",
    name: "Jordan Wells",
    role: "Forklift · bay 2",
    hours: "6:05",
    state: "checked-in",
    label: "Checked in",
  },
  {
    initials: "PR",
    name: "Priya Raman",
    role: "Loading dock",
    hours: "6:11",
    state: "checked-in",
    label: "Checked in",
  },
  {
    initials: "AL",
    name: "Alex Lindqvist",
    role: "QC station 1",
    hours: "—",
    state: "confirmed",
    label: "Confirmed",
  },
  {
    initials: "TF",
    name: "Tomás Ferreira",
    role: "Pallet wrap",
    hours: "—",
    state: "late",
    label: "Late 12 min",
  },
  {
    initials: "GL",
    name: "Grace Liu",
    role: "Sorting table",
    hours: "—",
    state: "unconfirmed",
    label: "Unconfirmed",
  },
];

const DOT: Record<string, string> = {
  "checked-in": "bg-success-500",
  confirmed: "bg-neutral-500",
  late: "bg-warning-500",
  unconfirmed: "bg-muted-foreground/40",
};

/** Event chip: border marker with the dot locked to the first text line. */
function EventMarker({
  tone,
  children,
}: {
  tone: "success" | "warning" | "muted";
  children: React.ReactNode;
}) {
  const dot =
    tone === "success"
      ? "bg-success-500"
      : tone === "warning"
        ? "bg-warning-500"
        : "bg-muted-foreground/50";
  return (
    <Marker variant="border" className="w-full items-start justify-start">
      <MarkerIcon className="mt-[5px]">
        <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
      </MarkerIcon>
      <MarkerContent>{children}</MarkerContent>
    </Marker>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-dvh w-full bg-background text-foreground">
        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="flex w-56 shrink-0 flex-col border-r">
          <div className="px-5 pb-6 pt-5">
            <p className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Harborline
            </p>
            <h2 className="font-heading-3 text-heading-3">Food Rescue</h2>
          </div>
          <nav className="flex flex-col gap-0.5 px-3">
            {NAV.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm ${
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </nav>
          <div className="mt-auto border-t px-5 py-4">
            <Marker className="w-auto items-center justify-start gap-2">
              <MarkerIcon>
                <Avatar size="sm">
                  <AvatarFallback>SO</AvatarFallback>
                </Avatar>
              </MarkerIcon>
              <MarkerContent className="text-[11px] leading-tight">
                Sam Okafor
                <span className="mt-0.5 flex items-center gap-1 text-muted-foreground">
                  <span
                    className="size-1.5 rounded-full bg-success-500"
                    aria-hidden
                  />
                  coordinator · online
                </span>
              </MarkerContent>
            </Marker>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex items-start justify-between gap-4 border-b px-6 pb-4 pt-5">
            <div>
              <p className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Sat, Mar 15 · 6:00–14:00 · Warehouse 2
              </p>
              <h1 className="font-heading-2 text-heading-2">
                Saturday packing run
              </h1>
              {/* Live check-in marker */}
              <Marker
                role="status"
                className="mt-1 w-auto justify-start gap-1.5"
              >
                <MarkerIcon>
                  <span className="size-2 animate-pulse rounded-full bg-success-500" />
                </MarkerIcon>
                <MarkerContent className="font-code text-[10px]">
                  Live check-in · 14 of 22 checked in · doors close 7:30
                </MarkerContent>
              </Marker>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button variant="outline" size="sm">
                <MessageSquare />
                Message team
              </Button>
              <Button size="sm">
                <ClipboardCheck />
                Open check-in
              </Button>
            </div>
          </header>

          {/* Content grid */}
          <div className="flex min-h-0 flex-1 gap-4 px-6 py-4">
            {/* ── Volunteer table ────────────────────────────────── */}
            <Card className="min-w-0 flex-1 gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">
                  Morning shift · check-in
                </CardTitle>
                <CardAction>
                  <Badge variant="secondary" className="font-code text-[10px]">
                    6 of 22 shown
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="px-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-2">Volunteer</TableHead>
                      <TableHead className="w-28">Status</TableHead>
                      <TableHead className="w-14 pr-2 text-right">
                        In at
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {VOLUNTEERS.map((v) => (
                      <TableRow key={v.name}>
                        <TableCell className="py-2 pl-2">
                          <div className="flex items-center gap-2.5">
                            <Avatar size="sm">
                              <AvatarFallback>{v.initials}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {v.name}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {v.role}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {/* Row status marker in a fixed slot */}
                          <Marker className="w-auto justify-start gap-1.5">
                            <MarkerIcon>
                              <span
                                className={`size-1.5 rounded-full ${DOT[v.state]}`}
                                aria-hidden
                              />
                            </MarkerIcon>
                            <MarkerContent className="text-[11px] whitespace-nowrap">
                              {v.label}
                            </MarkerContent>
                          </Marker>
                        </TableCell>
                        <TableCell className="pr-2 text-right font-code text-xs">
                          {v.hours}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* ── Activity feed ──────────────────────────────────── */}
            <Card className="flex w-72 shrink-0 flex-col gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Shift activity</CardTitle>
                <CardAction>
                  <Badge variant="outline" className="font-code text-[10px]">
                    live
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2.5 px-4">
                <Marker variant="separator">
                  <MarkerContent className="font-code text-[10px] uppercase tracking-wider">
                    This morning
                  </MarkerContent>
                </Marker>
                <EventMarker tone="success">
                  Swap approved · Priya → dock · 8:12
                </EventMarker>
                <EventMarker tone="warning">
                  2 roles unfilled · 14:00 wrap
                </EventMarker>
                <EventMarker tone="muted">
                  Timesheet approved · Jordan W.
                </EventMarker>
                <Marker variant="separator">
                  <MarkerContent className="font-code text-[10px] uppercase tracking-wider">
                    Yesterday
                  </MarkerContent>
                </Marker>
                <EventMarker tone="success">
                  Onboarded · Grace L. · cert on file
                </EventMarker>

                {/* Coverage + publishing status */}
                <div className="mt-auto flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Week coverage · Mar 17–23
                      </span>
                      <span className="font-code text-[10px] text-muted-foreground">
                        87%
                      </span>
                    </div>
                    <Progress value={87} aria-label="Week coverage 87%" />
                  </div>
                  <Marker role="status">
                    <MarkerIcon>
                      <Spinner className="size-3.5" />
                    </MarkerIcon>
                    <MarkerContent className="font-code text-[10px]">
                      Publishing next week&rsquo;s roster…
                    </MarkerContent>
                  </Marker>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
