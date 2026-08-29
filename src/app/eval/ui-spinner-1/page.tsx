"use client"

// EVAL page — spinner p1 — farm IoT sensor dashboard — 1280x800 dark
// Loading states across a live operations dashboard: header sync button,
// sidebar node sync, KPI card refresh, chart region overlay ("recomputing
// 24 h series"), a syncing sensor row in the fleet table and an in-flight
// irrigation command — mixed with loaded panels so the page reads as a real
// dashboard mid-refresh, not an empty shell.
// Family: Spinner + Card, Badge, Button, Table, Progress, Skeleton, Avatar.
// Flat panels + hairlines only — no shadows on in-flow content.

import {
  Droplets,
  FileText,
  LayoutDashboard,
  Map,
  Radio,
  Sprout,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: false },
  { icon: Radio, label: "Sensor fleet", active: true },
  { icon: Map, label: "Zones", active: false },
  { icon: Droplets, label: "Irrigation", active: false },
  { icon: FileText, label: "Reports", active: false },
]

const fieldNodes = [
  { id: "FG-231", zone: "North A", battery: 96, signal: "−67 dBm", last: "06:42:04", status: "syncing" },
  { id: "FG-229", zone: "North B", battery: 88, signal: "−71 dBm", last: "06:41:57", status: "online" },
  { id: "FG-118", zone: "South A", battery: 17, signal: "−84 dBm", last: "06:40:12", status: "low" },
  { id: "FG-077", zone: "East C", battery: 61, signal: "—", last: "05:58:31", status: "offline" },
  { id: "FG-090", zone: "West D", battery: 74, signal: "−75 dBm", last: "06:41:48", status: "online" },
]

const moistureBars = [
  34, 36, 35, 38, 41, 43, 42, 45, 48, 47, 44, 41,
  39, 37, 36, 35, 34, 33, 35, 36, 38, 36, 34, 33,
]

function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Radio
  label: string
  active: boolean
}) {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-2.5 rounded-md px-2 text-sm",
        active
          ? "bg-sidebar-accent font-medium text-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  )
}

function StatusCell({ status }: { status: string }) {
  if (status === "syncing") {
    return (
      <div className="flex items-center gap-1.5">
        <Spinner className="size-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Syncing</span>
      </div>
    )
  }
  if (status === "online") {
    return (
      <Badge className="border-transparent bg-success-100 text-success-700">
        Online
      </Badge>
    )
  }
  if (status === "low") {
    return (
      <Badge className="border-transparent bg-warning-100 text-warning-700">
        Low battery
      </Badge>
    )
  }
  return <Badge variant="destructive">Offline</Badge>
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Header — sync in flight */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md border bg-card">
              <Sprout className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3">Ferngrove Ops</span>
          </div>
          <span className="text-caption font-caption text-muted-foreground">
            North Field Cluster · 4 zones
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground">
              last sync 06:42:18
            </span>
            <Button variant="secondary" size="sm" disabled>
              <Spinner data-icon="inline-start" />
              Syncing…
            </Button>
            <Avatar>
              <AvatarFallback>EW</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Sidebar — one node mid-sync, gateway re-establishing */}
          <aside className="flex w-56 shrink-0 flex-col gap-5 overflow-hidden border-r bg-sidebar px-3 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </nav>
            <div className="flex flex-col gap-1.5">
              <p className="px-2 font-code text-xs tracking-wide text-muted-foreground uppercase">
                Field nodes
              </p>
              <div className="flex items-center gap-2 px-2" aria-busy="true">
                <Spinner className="size-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">FG-231 · North A</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    syncing 3 probes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-2">
                <span className="size-2 shrink-0 rounded-full bg-success-500" />
                <p className="truncate text-xs text-muted-foreground">
                  FG-229 · North B · online
                </p>
              </div>
              <div className="flex items-center gap-2 px-2">
                <span className="size-2 shrink-0 rounded-full bg-warning-500" />
                <p className="truncate text-xs text-muted-foreground">
                  FG-118 · South A · 17% batt
                </p>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-2 rounded-lg border bg-card px-3 py-3">
              <div className="flex items-center gap-2">
                <Spinner className="size-3.5 shrink-0 text-muted-foreground" />
                <p className="text-xs font-medium">Gateway GW-1</p>
              </div>
              <p className="font-caption text-caption text-muted-foreground">
                LTE backhaul re-establishing · attempt 2 of 5
              </p>
            </div>
          </aside>

          {/* Main dashboard */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden p-5">
            {/* KPI row — one card refreshing */}
            <div className="grid shrink-0 grid-cols-4 gap-4">
              <Card className="gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Soil moisture · Zone A</CardTitle>
                  <CardAction>
                    <Spinner className="size-3.5 text-muted-foreground" />
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 px-4">
                  <p className="font-code text-2xl leading-none">31.4%</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    at −20 cm · refreshing
                  </p>
                </CardContent>
              </Card>
              <Card className="gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Air temperature</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 px-4">
                  <p className="font-code text-2xl leading-none">18.2°C</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    shade canopy · 2 m
                  </p>
                </CardContent>
              </Card>
              <Card className="gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Solar radiation</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 px-4">
                  <p className="font-code text-2xl leading-none">612 W/m²</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    pyranometer · 10-min avg
                  </p>
                </CardContent>
              </Card>
              <Card className="gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Gateway uptime</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 px-4">
                  <p className="font-code text-2xl leading-none">99.2%</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    rolling 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart region refreshing + pending commands */}
            <div className="grid shrink-0 grid-cols-3 gap-4">
              <Card className="col-span-2 gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Soil moisture — Zone A · last 24 h
                  </CardTitle>
                  <CardAction>
                    <span className="font-code text-xs text-muted-foreground">
                      zone-a-moist · 288 points
                    </span>
                  </CardAction>
                </CardHeader>
                <CardContent className="px-4" aria-busy="true" aria-label="Refreshing soil moisture chart">
                  <div className="relative h-[168px] overflow-hidden rounded-md border border-dashed">
                    <div className="flex h-full items-end gap-1 px-3 pb-3">
                      {moistureBars.map((h, i) => (
                        <Skeleton
                          key={i}
                          className="w-full shrink"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/85">
                      <Spinner className="size-7 text-muted-foreground" />
                      <p className="text-sm font-medium">Recomputing 24 h series…</p>
                      <p className="font-code text-xs text-muted-foreground">
                        aggregating 288 samples · 2 probes pending
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Pending commands</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">Valve V-4 · Zone B</p>
                      <Badge variant="outline">irrigation</Badge>
                    </div>
                    <p className="font-caption text-caption text-muted-foreground">
                      Open 12 min · scheduled 06:45
                    </p>
                    <Button size="sm" disabled className="w-full">
                      <Spinner data-icon="inline-start" />
                      Sending command…
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">FG-118 recalibration</p>
                      <Badge variant="secondary">queued</Badge>
                    </div>
                    <p className="font-caption text-caption text-muted-foreground">
                      Awaits gateway reconnect
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sensor fleet — one row mid-sync */}
            <Card className="min-h-0 flex-1 gap-0 overflow-hidden py-0">
              <div className="flex h-11 shrink-0 items-center justify-between border-b px-4">
                <p className="text-sm font-medium">Sensor fleet</p>
                <span className="font-code text-xs text-muted-foreground">
                  12 nodes · 5 shown · polling every 60 s
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Node</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Last reading</TableHead>
                    <TableHead className="pr-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldNodes.map((node) => (
                    <TableRow key={node.id} aria-busy={node.status === "syncing"}>
                      <TableCell className="py-2.5 pl-4 font-code text-xs">
                        {node.id}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs">{node.zone}</TableCell>
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={node.battery}
                            className="h-1.5 w-14"
                            aria-label={`${node.id} battery ${node.battery}%`}
                          />
                          <span className="font-code text-xs text-muted-foreground">
                            {node.battery}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 font-code text-xs text-muted-foreground">
                        {node.signal}
                      </TableCell>
                      <TableCell className="py-2.5 font-code text-xs text-muted-foreground">
                        {node.last}
                      </TableCell>
                      <TableCell className="py-2.5 pr-4">
                        <StatusCell status={node.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </main>
        </div>

        {/* Footer */}
        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-5">
          <span className="font-code text-xs text-muted-foreground">
            Ferngrove Ops · LoRa 868 MHz · 12 nodes · 4 zones
          </span>
          <span className="font-code text-xs text-muted-foreground">
            telemetry buffered locally · 47 samples pending upload
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
