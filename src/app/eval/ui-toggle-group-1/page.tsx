"use client"
// EVAL page — toggle-group p1 — city bike-share station map — 1024x768 dark
// ToggleGroup front and center, five distinct groups: multi-select map layers,
// single-select time range, icon-only selection mode (pan/station/multi/lasso),
// a floating segmented basemap switcher, and a vertical map-tools group.
// Co-stars: Card, Badge, Button, Input, Progress, Avatar.

import {
  Bike,
  Camera,
  Flame,
  Hand,
  Layers2,
  Lasso,
  Map,
  Minus,
  MousePointerClick,
  Navigation,
  Plus,
  RefreshCw,
  Route,
  Ruler,
  Satellite,
  Search,
  SquareDashed,
  TrainFront,
  TriangleAlert,
  WifiOff,
  Zap,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

type StationStatus = "available" | "low" | "empty" | "offline"

type Station = {
  id: string
  name: string
  bikes: number
  docksFree: number
  status: StationStatus
  x: number // percent of map width
  y: number // percent of map height
}

const stations: Station[] = [
  { id: "ST-0412", name: "Nicollet Ave & 7th St", bikes: 28, docksFree: 9, status: "available", x: 44, y: 40 },
  { id: "ST-0108", name: "Union Depot", bikes: 22, docksFree: 3, status: "available", x: 62, y: 66 },
  { id: "ST-0331", name: "Mill District", bikes: 3, docksFree: 1, status: "low", x: 52, y: 57 },
  { id: "ST-0257", name: "Riverside Plaza", bikes: 0, docksFree: 18, status: "empty", x: 34, y: 72 },
  { id: "ST-0190", name: "Loring Park", bikes: 8, docksFree: 12, status: "available", x: 20, y: 30 },
  { id: "ST-0344", name: "Stone Arch Bridge", bikes: 2, docksFree: 6, status: "low", x: 70, y: 52 },
  { id: "ST-0477", name: "U of M East Bank", bikes: 31, docksFree: 4, status: "available", x: 66, y: 14 },
  { id: "ST-0203", name: "Snelling Ave Station", bikes: 0, docksFree: 0, status: "offline", x: 10, y: 26 },
  { id: "ST-0155", name: "Lowertown", bikes: 6, docksFree: 9, status: "available", x: 82, y: 76 },
]

const statusStyles: Record<StationStatus, string> = {
  available:
    "border-success-500/50 bg-success-500/15 text-success-500",
  low: "border-warning-500/50 bg-warning-500/15 text-warning-500",
  empty: "border-destructive-500/50 bg-destructive-500/15 text-destructive-500",
  offline:
    "border-dashed border-neutral-400/60 bg-neutral-800 text-neutral-500",
}

const legend: { label: string; range: string; dot: string }[] = [
  { label: "Available", range: "≥ 5 bikes", dot: "bg-success-500" },
  { label: "Low stock", range: "1 – 4", dot: "bg-warning-500" },
  { label: "Empty", range: "0 bikes", dot: "bg-destructive-500" },
  { label: "Offline", range: "no data", dot: "bg-neutral-500" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card px-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Bike className="size-4" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-heading-3 text-heading-3 leading-none text-foreground">
                Circline
              </h1>
              <p className="text-xs text-muted-foreground">
                Bike-share · Twin Cities operations
              </p>
            </div>
          </div>
          <div className="relative w-64">
            <Search
              className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search station, street, or ID…"
              className="h-8 ps-8 text-sm"
              aria-label="Search stations"
            />
          </div>
          <div className="ms-auto flex items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 font-code text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-success-500" />
              live · 14:32
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw /> Sync
            </Button>
            <Avatar size="sm">
              <AvatarFallback className="text-[10px]">KA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Control sidebar */}
          <aside className="flex w-[280px] shrink-0 flex-col gap-5 border-e bg-card p-4">
            <section className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Map layers
              </h2>
              <ToggleGroup
                type="multiple"
                variant="outline"
                size="sm"
                defaultValue={["stations", "lanes"]}
                className="w-full"
                aria-label="Map layers"
              >
                <ToggleGroupItem value="stations" className="gap-1.5 text-xs">
                  <Bike className="size-3.5" /> Stations
                </ToggleGroupItem>
                <ToggleGroupItem value="lanes" className="gap-1.5 text-xs">
                  <Route className="size-3.5" /> Lanes
                </ToggleGroupItem>
                <ToggleGroupItem value="heatmap" className="gap-1.5 text-xs">
                  <Flame className="size-3.5" /> Heat
                </ToggleGroupItem>
                <ToggleGroupItem value="ebikes" className="gap-1.5 text-xs">
                  <Zap className="size-3.5" /> E-bikes
                </ToggleGroupItem>
              </ToggleGroup>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Time range
              </h2>
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                defaultValue="now"
                className="w-full"
                aria-label="Time range"
              >
                <ToggleGroupItem value="now" className="text-xs">
                  Now
                </ToggleGroupItem>
                <ToggleGroupItem value="1h" className="text-xs">
                  1h
                </ToggleGroupItem>
                <ToggleGroupItem value="4h" className="text-xs">
                  4h
                </ToggleGroupItem>
                <ToggleGroupItem value="today" className="text-xs">
                  Today
                </ToggleGroupItem>
              </ToggleGroup>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Selection mode
              </h2>
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                defaultValue="multi"
                className="w-full"
                aria-label="Selection mode"
              >
                <ToggleGroupItem value="pan" aria-label="Pan map">
                  <Hand className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="station" aria-label="Select single station">
                  <MousePointerClick className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="multi" aria-label="Multi-select stations">
                  <SquareDashed className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="lasso" aria-label="Lasso select stations">
                  <Lasso className="size-3.5" />
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-xs text-muted-foreground">
                Multi-select · 3 stations selected on map
              </p>
            </section>

            <div className="h-px bg-border" />

            <section className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Stations in view
                </h2>
                <span className="font-code text-xs tabular-nums text-muted-foreground">
                  9
                </span>
              </div>
              <ul className="flex flex-col overflow-hidden rounded-md border">
                {stations.slice(0, 6).map((station, index) => (
                  <li
                    key={station.id}
                    className={`flex items-center gap-2 px-2.5 py-2 ${
                      index === 0 ? "bg-muted" : "border-t"
                    }`}
                  >
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        station.status === "available"
                          ? "bg-success-500"
                          : station.status === "low"
                            ? "bg-warning-500"
                            : station.status === "empty"
                              ? "bg-destructive-500"
                              : "bg-neutral-500"
                      }`}
                    />
                    <span className="min-w-0 flex-1 truncate text-xs font-medium">
                      {station.name}
                    </span>
                    <span className="font-code text-[11px] tabular-nums text-muted-foreground">
                      {station.status === "offline"
                        ? "— / —"
                        : `${station.bikes}/${station.docksFree}`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Map canvas */}
          <main className="relative min-w-0 flex-1 overflow-hidden">
            {/* Stylized city base map (monochrome) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 456 676"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              {/* parks */}
              <rect x="18" y="150" width="96" height="78" rx="4" style={{ fill: "var(--ds-color-neutral-200)", opacity: 0.45 }} />
              <rect x="330" y="88" width="92" height="64" rx="4" style={{ fill: "var(--ds-color-neutral-200)", opacity: 0.45 }} />
              {/* river */}
              <path
                d="M -10 470 C 90 430 150 500 230 470 C 320 436 380 470 470 430 L 470 560 C 380 600 320 566 230 600 C 150 630 90 560 -10 600 Z"
                style={{ fill: "var(--ds-color-neutral-100)", opacity: 0.5 }}
              />
              {/* minor streets */}
              <g style={{ stroke: "var(--ds-color-neutral-200)", opacity: 0.5, strokeWidth: 1 }} >
                <line x1="120" y1="0" x2="120" y2="676" />
                <line x1="236" y1="0" x2="236" y2="676" />
                <line x1="352" y1="0" x2="352" y2="676" />
                <line x1="0" y1="112" x2="456" y2="112" />
                <line x1="0" y1="264" x2="456" y2="264" />
                <line x1="0" y1="384" x2="456" y2="384" />
              </g>
              {/* arterials */}
              <g style={{ stroke: "var(--ds-color-neutral-300)", strokeWidth: 3, strokeLinecap: "round" }}>
                <line x1="178" y1="0" x2="178" y2="676" />
                <line x1="294" y1="0" x2="294" y2="676" />
                <line x1="0" y1="190" x2="456" y2="190" />
                <line x1="0" y1="522" x2="456" y2="522" />
              </g>
              {/* protected bike lanes */}
              <g style={{ stroke: "var(--ds-color-neutral-500)", strokeWidth: 1.5, strokeDasharray: "6 5" }}>
                <line x1="178" y1="0" x2="178" y2="676" />
                <line x1="0" y1="522" x2="456" y2="522" />
              </g>
              {/* street labels */}
              <text x="182" y="120" className="font-code" style={{ fill: "var(--ds-color-neutral-500)", fontSize: 9, letterSpacing: 1.5, writingMode: "vertical-rl" }}>
                WASHINGTON AVE
              </text>
              <text x="6" y="516" className="font-code" style={{ fill: "var(--ds-color-neutral-500)", fontSize: 9, letterSpacing: 1.5 }}>
                RIVER PKWY
              </text>
            </svg>

            {/* Station markers */}
            {stations.map((station) => (
              <div
                key={station.id}
                className="absolute"
                style={{ left: `${station.x}%`, top: `${station.y}%` }}
              >
                <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full border font-code text-[10px] font-medium tabular-nums ${
                      statusStyles[station.status]
                    }${station.id === "ST-0412" ? " ring-2 ring-ring ring-offset-2 ring-offset-background" : ""}`}
                  >
                    {station.status === "offline" ? "—" : station.bikes}
                  </span>
                  {station.id === "ST-0412" && (
                    <span className="whitespace-nowrap rounded-sm border bg-card px-1.5 py-0.5 font-code text-[10px] text-foreground">
                      {station.name}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Floating basemap switcher (glass float above the map) */}
            <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center rounded-md border bg-card/80 p-1 shadow-xs backdrop-blur-md">
              <ToggleGroup
                type="single"
                size="sm"
                defaultValue="streets"
                aria-label="Basemap style"
              >
                <ToggleGroupItem value="streets" className="gap-1.5 text-xs">
                  <Map className="size-3.5" /> Map
                </ToggleGroupItem>
                <ToggleGroupItem value="satellite" className="gap-1.5 text-xs">
                  <Satellite className="size-3.5" /> Satellite
                </ToggleGroupItem>
                <ToggleGroupItem value="transit" className="gap-1.5 text-xs">
                  <TrainFront className="size-3.5" /> Transit
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Floating map tools (vertical toggle group + zoom) */}
            <div className="absolute end-3 top-3 flex flex-col gap-1 rounded-md border bg-card/80 p-1 shadow-xs backdrop-blur-md">
              <ToggleGroup
                type="single"
                orientation="vertical"
                size="sm"
                defaultValue="layers"
                className="flex-col"
                aria-label="Map tools"
              >
                <ToggleGroupItem value="layers" aria-label="Layer settings" className="px-0">
                  <Layers2 className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="measure" aria-label="Measure distance" className="px-0">
                  <Ruler className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="snapshot" aria-label="Snapshot map" className="px-0">
                  <Camera className="size-3.5" />
                </ToggleGroupItem>
              </ToggleGroup>
              <div className="h-px bg-border" />
              <div className="flex flex-col">
                <Button variant="ghost" size="icon-xs" aria-label="Zoom in" className="text-muted-foreground">
                  <Plus />
                </Button>
                <Button variant="ghost" size="icon-xs" aria-label="Zoom out" className="text-muted-foreground">
                  <Minus />
                </Button>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 start-3 rounded-md border bg-card/90 px-3 py-2.5 backdrop-blur-sm">
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Station status
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {legend.map((item) => (
                  <li key={item.label} className="flex items-center gap-1.5 text-[11px]">
                    <span className={`size-1.5 rounded-full ${item.dot}`} />
                    <span>{item.label}</span>
                    <span className="font-code text-[10px] text-muted-foreground">
                      {item.range}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </main>

          {/* Right rail: selection details + network overview */}
          <aside className="flex w-[280px] shrink-0 flex-col gap-4 overflow-y-auto border-s bg-card p-4">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardDescription className="font-code text-xs">
                  ST-0412 · Convention District
                </CardDescription>
                <CardTitle className="text-base">
                  Nicollet Ave &amp; 7th St
                </CardTitle>
                <CardAction>
                  <Badge className="border-success-500/30 bg-success-500/10 text-success-500">
                    Available
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2 px-5">
                <div className="space-y-0.5">
                  <p className="font-code text-xl tabular-nums text-foreground">28</p>
                  <p className="text-[11px] text-muted-foreground">Bikes</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-code text-xl tabular-nums text-foreground">9</p>
                  <p className="text-[11px] text-muted-foreground">Docks free</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-code text-xl tabular-nums text-foreground">6</p>
                  <p className="text-[11px] text-muted-foreground">E-bikes</p>
                </div>
                <div className="col-span-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Dock occupancy</span>
                    <span className="font-code tabular-nums">28 / 37</span>
                  </div>
                  <Progress value={76} className="h-1.5" aria-label="Dock occupancy 76 percent" />
                </div>
                <div className="col-span-3 space-y-1 font-code text-[11px] text-muted-foreground">
                  <p>last check-in · 14:31:08</p>
                  <p>rebalanced 06:12 · van 07</p>
                </div>
              </CardContent>
              <CardFooter className="gap-2 px-5">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation /> Route van
                </Button>
                <Button size="sm" className="flex-1">
                  Rebalance
                </Button>
              </CardFooter>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-base">Network overview</CardTitle>
                <CardDescription className="text-xs">
                  Live fleetwide totals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5 px-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Bikes on street</span>
                    <span className="font-code tabular-nums">2,341 / 3,106</span>
                  </div>
                  <Progress value={75} className="h-1.5" aria-label="Bikes on street 75 percent" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Docks free</span>
                    <span className="font-code tabular-nums">1,984 / 4,860</span>
                  </div>
                  <Progress value={41} className="h-1.5" aria-label="Docks free 41 percent" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">E-bike charge ≥ 50%</span>
                    <span className="font-code tabular-nums">149 / 218</span>
                  </div>
                  <Progress value={68} className="h-1.5" aria-label="E-bike charge 68 percent" />
                </div>
                <div className="space-y-1.5 border-t pt-3">
                  <p className="flex items-center gap-1.5 text-xs text-warning-500">
                    <TriangleAlert className="size-3.5" /> 6 stations low stock
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-destructive-500">
                    <WifiOff className="size-3.5" /> 3 stations offline
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Status bar */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t bg-card px-4">
          <span className="font-code text-xs text-muted-foreground">
            412 stations · 3,106 bikes · 218 e-bikes · 6 vans active
          </span>
          <span className="font-code text-xs text-muted-foreground">
            updated 12s ago · circline ops v3.8.1
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
