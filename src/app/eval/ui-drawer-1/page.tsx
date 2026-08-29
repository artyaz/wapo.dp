"use client";

/**
 * EVAL page — drawer p1 — farm IoT sensor dashboard — 1920x1080 dark
 *
 * Scenario: "Loamworks" farm operations console for Northacre Farm. Sidebar
 * + KPI row + sensor table + zone rail (ui:Card/Badge/Button/Table/Progress/
 * Tabs). A bottom Drawer is open at initial render (defaultOpen) with snap
 * points 45% / 100% and fadeFromIndex 0, so the screenshot captures the
 * probe-detail sheet floating over the dimmed dashboard: live reading band,
 * 24 h moisture chart, quick actions, and expanded-state sections below the
 * first snap point.
 */

import {
  Bell,
  BatteryLow,
  ChevronDown,
  CloudSun,
  Droplets,
  FileText,
  Grid3x3,
  GripVertical,
  LayoutDashboard,
  MapPin,
  Plus,
  RadioTower,
  Search,
  Settings,
  Sprout,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NAV = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: RadioTower, label: "Sensors", active: true },
  { icon: Grid3x3, label: "Zones" },
  { icon: Droplets, label: "Irrigation" },
  { icon: CloudSun, label: "Weather" },
  { icon: FileText, label: "Reports" },
  { icon: Bell, label: "Alerts" },
  { icon: Settings, label: "Settings" },
];

const KPIS = [
  { label: "Sensors reporting", value: "129 / 132", sub: "3 offline · checked 12 s ago" },
  { label: "Avg soil moisture", value: "31.4 %", sub: "VWC · 6 zones · +2.1 pts / 24 h" },
  { label: "Irrigation", value: "Zone 3", sub: "Running · 18 min left · 4.2 mm/h" },
  { label: "Battery alerts", value: "3 probes", sub: "Below 15% · replace before May", warn: true },
];

const SENSORS = [
  {
    id: "S-114", zone: "North Field", type: "Soil moisture",
    reading: "31.4 %", battery: 71, status: "online",
  },
  {
    id: "S-118", zone: "River Block", type: "Soil moisture",
    reading: "28.9 %", battery: 54, status: "online",
  },
  {
    id: "S-121", zone: "Orchard Terrace", type: "Soil temp",
    reading: "16.8 °C", battery: 88, status: "online",
  },
  {
    id: "S-127", zone: "Hoop House 2", type: "Soil moisture",
    reading: "35.2 %", battery: 9, status: "battery",
  },
  {
    id: "S-131", zone: "Pasture East", type: "EC probe",
    reading: "0.98 mS/cm", battery: 63, status: "online",
  },
  {
    id: "S-132", zone: "North Field", type: "EC probe",
    reading: "—", battery: 0, status: "offline",
  },
];

const ZONES = [
  { name: "Hoop House 2", value: 35.2 },
  { name: "North Field", value: 31.4 },
  { name: "Pasture East", value: 29.8 },
  { name: "River Block", value: 28.9 },
  { name: "Orchard Terrace", value: 26.2 },
];

const TRANSMISSIONS = [
  { t: "06:45", vwc: "31.4 %", temp: "18.2 °C", ec: "1.24" },
  { t: "06:30", vwc: "31.2 %", temp: "18.1 °C", ec: "1.24" },
  { t: "06:15", vwc: "31.1 %", temp: "18.0 °C", ec: "1.23" },
  { t: "06:00", vwc: "30.9 %", temp: "17.9 °C", ec: "1.23" },
  { t: "05:45", vwc: "30.8 %", temp: "17.8 °C", ec: "1.22" },
];

function statusBadge(status: string) {
  if (status === "online") {
    return (
      <Badge variant="outline">
        <span className="size-1.5 rounded-full bg-success-500" />
        Online
      </Badge>
    );
  }
  if (status === "battery") {
    return (
      <Badge variant="outline" className="border-warning-500/40 text-warning-400">
        <span className="size-1.5 rounded-full bg-warning-500" />
        Low battery
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-destructive-500/40 text-destructive-400">
      <span className="size-1.5 rounded-full bg-destructive-500" />
      Offline
    </Badge>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <Drawer defaultOpen snapPoints={[0.5, 1]} fadeFromIndex={0}>
        <div className="bg-background flex h-screen w-full overflow-hidden">
          {/* ---------- sidebar ---------- */}
          <aside className="flex w-[220px] shrink-0 flex-col border-r">
            <div className="flex items-center gap-2.5 px-4 py-4">
              <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-sm">
                <Sprout className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="text-foreground text-sm font-semibold">Loamworks</p>
                <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
                  Farm OS
                </p>
              </div>
            </div>
            <nav className="flex flex-col gap-0.5 px-2">
              {NAV.map(({ icon: Icon, label, active }) => (
                <span
                  key={label}
                  className={`flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm ${
                    active
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                  {label === "Alerts" ? (
                    <span className="bg-warning-500 text-warning-950 ml-auto rounded-full px-1.5 py-px font-code text-[10px] font-semibold">
                      4
                    </span>
                  ) : null}
                </span>
              ))}
            </nav>
            <button
              type="button"
              className="border-default-border hover:bg-muted/50 mt-auto flex items-center gap-2.5 border-t px-4 py-3 text-left"
            >
              <MapPin className="text-muted-foreground size-4" />
              <span className="leading-tight">
                <span className="text-foreground block text-sm font-medium">Northacre Farm</span>
                <span className="text-muted-foreground block text-xs">Lane County, OR</span>
              </span>
              <ChevronDown className="text-muted-foreground ml-auto size-4" />
            </button>
          </aside>

          {/* ---------- main column ---------- */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-16 shrink-0 items-center justify-between gap-6 border-b px-6">
              <div>
                <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
                  Northacre Farm · Sensor network
                </p>
                <h1 className="text-foreground font-heading-2 text-heading-2">
                  Soil &amp; climate probes
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden lg:block">
                  <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                  <input
                    type="search"
                    placeholder="Search sensors, zones…"
                    className="border-input bg-card text-foreground placeholder:text-muted-foreground h-9 w-64 rounded-md border pr-3 pl-8 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                </div>
                <span className="text-muted-foreground hidden font-code text-xs xl:inline">
                  synced 12 s ago
                </span>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button size="sm">
                  <Plus data-slot="icon" />
                  Add sensor
                </Button>
              </div>
            </header>

            <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden p-6">
              {/* ---------- KPI row ---------- */}
              <div className="grid grid-cols-4 gap-5">
                {KPIS.map((kpi) => (
                  <Card key={kpi.label} className="gap-2 rounded-lg py-4">
                    <CardHeader className="px-5">
                      <CardDescription className="text-xs">
                        {kpi.label}
                      </CardDescription>
                      <CardTitle
                        className={`font-code text-2xl ${kpi.warn ? "text-warning-400" : "text-foreground"}`}
                      >
                        {kpi.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5">
                      <p className="text-muted-foreground text-xs">{kpi.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* ---------- table + zone rail ---------- */}
              <div className="grid min-h-0 flex-1 grid-cols-[1fr_330px] gap-5">
                <Card className="min-h-0 rounded-lg py-0">
                  <CardHeader className="items-center border-b px-5 py-4 [.border-b]:pb-4">
                    <CardTitle className="text-sm">All sensors</CardTitle>
                    <CardDescription className="text-xs">
                      132 probes · 6 gateways · LoRaWAN
                    </CardDescription>
                    <CardAction>
                      <Tabs defaultValue="all">
                        <TabsList className="h-8">
                          <TabsTrigger value="all" className="px-2.5 text-xs">All</TabsTrigger>
                          <TabsTrigger value="alerts" className="px-2.5 text-xs">Alerts · 4</TabsTrigger>
                          <TabsTrigger value="offline" className="px-2.5 text-xs">Offline · 3</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardAction>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-5">Probe</TableHead>
                        <TableHead>Zone</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Last reading</TableHead>
                        <TableHead>Battery</TableHead>
                        <TableHead className="pr-5 text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SENSORS.map((sensor) =>
                        sensor.id === "S-114" ? (
                          <DrawerTrigger
                            key={sensor.id}
                            render={<TableRow className="bg-muted/50 cursor-pointer" />}
                          >
                            <TableCell className="pl-5 font-code text-xs">
                              {sensor.id}
                            </TableCell>
                            <TableCell>{sensor.zone}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {sensor.type}
                            </TableCell>
                            <TableCell className="font-code text-xs">
                              {sensor.reading}
                            </TableCell>
                            <TableCell>
                              <span className="flex items-center gap-2">
                                <Progress value={sensor.battery} className="h-1.5 w-14" />
                                <span className="text-muted-foreground font-code text-xs">
                                  {sensor.battery}%
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="pr-5 text-right">
                              {statusBadge(sensor.status)}
                            </TableCell>
                          </DrawerTrigger>
                        ) : (
                          <TableRow key={sensor.id}>
                            <TableCell className="text-muted-foreground pl-5 font-code text-xs">
                              {sensor.id}
                            </TableCell>
                            <TableCell>{sensor.zone}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {sensor.type}
                            </TableCell>
                            <TableCell className="font-code text-xs">
                              {sensor.reading}
                            </TableCell>
                            <TableCell>
                              <span className="flex items-center gap-2">
                                <Progress
                                  value={sensor.battery}
                                  className="h-1.5 w-14"
                                  aria-label={`${sensor.id} battery ${sensor.battery} percent`}
                                />
                                <span className="text-muted-foreground font-code text-xs">
                                  {sensor.battery}%
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="pr-5 text-right">
                              {statusBadge(sensor.status)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Card>

                {/* ---------- right rail ---------- */}
                <div className="flex min-h-0 flex-col gap-5">
                  <Card className="gap-3 rounded-lg py-4">
                    <CardHeader className="px-5">
                      <CardTitle className="text-sm">Zone moisture</CardTitle>
                      <CardDescription className="text-xs">
                        VWC · field capacity 36 %
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2.5 px-5">
                      {ZONES.map((zone) => (
                        <div key={zone.name} className="flex items-center gap-3">
                          <span className="text-foreground w-32 truncate text-sm">
                            {zone.name}
                          </span>
                          <Progress value={zone.value} className="h-1.5" />
                          <span className="text-muted-foreground w-11 text-right font-code text-xs">
                            {zone.value.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="gap-3 rounded-lg py-4">
                    <CardHeader className="px-5">
                      <CardTitle className="text-sm">Alerts</CardTitle>
                      <CardDescription className="text-xs">
                        Last 24 hours · 2 unresolved
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 px-5">
                      <div className="flex items-start gap-2.5">
                        <BatteryLow className="text-warning-500 mt-0.5 size-4 shrink-0" />
                        <p className="text-foreground text-sm leading-snug">
                          S-127 battery at 9% — replace cell before weekend
                          irrigation
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-2.5">
                        <RadioTower className="text-warning-500 mt-0.5 size-4 shrink-0" />
                        <p className="text-foreground text-sm leading-snug">
                          S-132 unreachable since 04:12 — last hop gateway G-3
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>

          {/* ---------- bottom sheet: probe detail (open at render, snap 50% / 100%) ---------- */}
          <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-none h-[96vh]">
            <div className="flex h-full flex-col px-8 pt-3 pb-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <DrawerTitle className="text-lg">
                    Probe S-114 · Soil moisture
                  </DrawerTitle>
                  <DrawerDescription className="mt-1 text-sm">
                    North Field · Row 12 · LoRa node{" "}
                    <span className="font-code">0x2F</span> · reporting every
                    15 min
                  </DrawerDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant="outline" className="text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-success-500" />
                    Online
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-muted-foreground font-code"
                  >
                    Battery 71%
                  </Badge>
                </div>
              </div>

              {/* live reading band */}
              <div className="mt-5 grid grid-cols-4 gap-5">
                {[
                  { label: "Volumetric water content", value: "31.4 %", sub: "+2.1 pts vs yesterday" },
                  { label: "Soil temperature", value: "18.2 °C", sub: "At 20 cm depth" },
                  { label: "Electrical conductivity", value: "1.24 mS/cm", sub: "Salinity nominal" },
                  { label: "Gateway signal", value: "−87 dBm", sub: "RSSI · hop 2 · G-1" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-muted/40 rounded-lg border p-4"
                  >
                    <p className="text-muted-foreground text-[11px] uppercase tracking-[0.08em]">
                      {stat.label}
                    </p>
                    <p className="text-foreground mt-1.5 font-code text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* 24 h moisture chart */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-muted-foreground text-[11px] uppercase tracking-[0.08em]">
                    Moisture · last 24 hours
                  </p>
                  <p className="text-muted-foreground font-code text-[11px]">
                    field capacity 36% · refill point 22%
                  </p>
                </div>
                <div className="bg-card rounded-lg border p-3">
                  <svg
                    viewBox="0 0 720 90"
                    preserveAspectRatio="none"
                    aria-label="Soil moisture over the last 24 hours"
                    className="h-[80px] w-full"
                  >
                    <line x1="0" y1="18" x2="720" y2="18" strokeDasharray="4 4" className="stroke-muted-foreground/40" />
                    <line x1="0" y1="72" x2="720" y2="72" strokeDasharray="4 4" className="stroke-muted-foreground/40" />
                    <path
                      d="M0 50 C 60 52, 100 56, 150 58 C 210 60, 260 57, 310 52 C 370 46, 420 34, 480 26 C 540 18, 590 22, 650 26 C 680 28, 700 27, 720 26 L 720 90 L 0 90 Z"
                      className="fill-muted-foreground/15"
                    />
                    <path
                      d="M0 50 C 60 52, 100 56, 150 58 C 210 60, 260 57, 310 52 C 370 46, 420 34, 480 26 C 540 18, 590 22, 650 26 C 680 28, 700 27, 720 26"
                      fill="none"
                      strokeWidth="1.5"
                      className="stroke-foreground/70"
                    />
                    <circle cx="720" cy="26" r="3" className="fill-foreground" />
                  </svg>
                  <div className="text-muted-foreground mt-1 flex justify-between font-code text-[10px]">
                    <span>06:45 yesterday</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>00:00</span>
                    <span>now 06:45</span>
                  </div>
                </div>
              </div>

              {/* quick actions */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Button size="sm">Reconfigure probe</Button>
                  <Button variant="outline" size="sm">
                    Export 24 h CSV
                  </Button>
                  <DrawerClose render={<Button variant="ghost" size="sm">Close</Button>} />
                </div>
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <GripVertical className="size-3.5" />
                  Drag the handle · snap points 50% / 100%
                </p>
              </div>

              <Separator className="mt-5" />

              {/* below the first snap point — visible when expanded */}
              <div className="mt-4 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-2 text-[11px] uppercase tracking-[0.08em]">
                    Recent transmissions
                  </p>
                  <div className="flex flex-col">
                    {TRANSMISSIONS.map((row) => (
                      <div
                        key={row.t}
                        className="flex items-center justify-between border-b py-1.5 font-code text-xs last:border-b-0"
                      >
                        <span className="text-muted-foreground">{row.t}</span>
                        <span className="text-foreground">{row.vwc}</span>
                        <span className="text-muted-foreground">{row.temp}</span>
                        <span className="text-muted-foreground">{row.ec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2 text-[11px] uppercase tracking-[0.08em]">
                    Maintenance
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    {[
                      ["Last calibration", "2025-11-14 · offset +0.3%"],
                      ["Firmware", "2.4.1 · released 2025-09-30"],
                      ["Next service", "2026-05-12 · cell swap"],
                      ["Installed", "2024-03-02 · 30 cm profile"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-foreground font-code text-xs">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </div>
      </Drawer>
    </EvalShell>
  );
}
