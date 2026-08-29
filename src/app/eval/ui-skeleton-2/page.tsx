"use client"

// EVAL page — skeleton p2 — city bike-share station map — 1024x768 light
// Loading state of a station dashboard: map raster tiles + station detail
// cards + nearby-station rows + pending chart bars are Skeletons, while the
// header, network stats, two live station cards, two nearby rows and the
// morning ride bars are already loaded — a deliberate progressive-loading
// snapshot. Semantic color stays on a strict budget: green = bikes available,
// amber = low availability. Everything else is the monochrome neutral scale.
// Family: Skeleton + Card, Badge, Button, Avatar, Separator.

import {
  Bike,
  Crosshair,
  Minus,
  Plus,
  Signal,
  SquareParking,
} from "lucide-react"

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
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const stats = [
  { icon: Bike, label: "Bikes out", value: "1,284", sub: "+312 since 8:00" },
  { icon: SquareParking, label: "Docks free", value: "962", sub: "of 2,246 total" },
  { icon: Signal, label: "Stations online", value: "96/102", sub: "6 offline" },
]

// Loaded morning bars (rides per hour, peak-scaled) + pending afternoon slots.
const ridesLoaded = [210, 486, 642, 388, 294, 352, 596, 512]
const ridesPending = ["h-9", "h-12", "h-7", "h-10", "h-8", "h-6"]

const pins = [
  { className: "left-[30%] top-[22%]", tone: "bg-success-500" },
  { className: "left-[58%] top-[48%]", tone: "bg-success-500" },
  { className: "left-[76%] top-[16%]", tone: "bg-warning-500" },
  { className: "left-[18%] top-[64%]", tone: "bg-neutral-400" },
  { className: "left-[46%] top-[76%]", tone: "bg-success-500" },
]

function StationSkeletonRow() {
  // Mirrors the loaded row structure exactly (status dot + two text lines +
  // outline badge) so nothing shifts when real data lands.
  return (
    <div className="flex items-center gap-3 py-1" aria-hidden="true">
      <Skeleton className="size-2.5 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <Skeleton className="h-5 w-14 shrink-0 rounded-md border bg-neutral-100" />
    </div>
  )
}

export default function Page() {
  const peak = Math.max(...ridesLoaded)

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Header — loaded */}
        <header className="flex h-13 shrink-0 items-center gap-3 border-b px-4">
          <div className="flex size-7 items-center justify-center rounded-md border bg-card">
            <Bike className="size-4" />
          </div>
          <div>
            <p className="text-sm leading-tight font-semibold">Riverline</p>
            <p className="font-caption text-caption leading-tight text-muted-foreground">
              Bike share · Portland, OR
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">
              <span className="size-1.5 rounded-full bg-neutral-500" />
              Live · updated 12s ago
            </Badge>
            <Button variant="outline" size="sm">
              Filters
            </Button>
            <Avatar size="sm">
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 gap-4 p-4">
          {/* Station map — raster tiles streaming */}
          <section
            className="relative min-w-0 flex-1 overflow-hidden rounded-lg border bg-card"
            aria-busy="true"
            aria-label="Loading station map"
          >
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2.5 p-2.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="rounded-sm" />
              ))}
            </div>

            {/* Loaded station markers */}
            <div aria-hidden="true">
              {pins.map((p, i) => (
                <span
                  key={i}
                  className={`absolute size-3 rounded-full ring-2 ring-card ${p.className} ${p.tone}`}
                />
              ))}
            </div>

            {/* Live station card */}
            <div className="absolute top-4 left-4 w-52 rounded-md border bg-card p-3">
              <p className="text-xs font-medium">SW 3rd &amp; Alder</p>
              <p className="mt-0.5 font-code text-xs text-muted-foreground">
                120 m · 6 bikes · 8 docks
              </p>
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className="border-success-200 bg-success-50 text-success-600"
                >
                  Available
                </Badge>
              </div>
            </div>

            {/* Low-availability station card */}
            <div className="absolute top-1/3 right-4 w-52 rounded-md border bg-card p-3">
              <p className="text-xs font-medium">Eastbank Esplanade</p>
              <p className="mt-0.5 font-code text-xs text-muted-foreground">
                340 m · 1 bike · 14 docks
              </p>
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className="border-warning-200 bg-warning-50 text-warning-600"
                >
                  Low availability
                </Badge>
              </div>
            </div>

            {/* Station details streaming in */}
            <div
              className="absolute bottom-4 left-4 w-52 rounded-md border bg-card p-3"
              aria-busy="true"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3.5 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-5 w-24 rounded-md border bg-neutral-100" />
              </div>
            </div>

            {/* Zoom controls — loaded */}
            <div className="absolute top-4 right-4 flex flex-col overflow-hidden rounded-md border bg-card">
              <Button variant="ghost" size="icon-xs" aria-label="Zoom in">
                <Plus />
              </Button>
              <Separator />
              <Button variant="ghost" size="icon-xs" aria-label="Zoom out">
                <Minus />
              </Button>
            </div>

            {/* Legend — loaded */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-md border bg-card px-3 py-1.5">
              <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                <span className="size-2 rounded-full bg-success-500" />
                Available
              </span>
              <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                <span className="size-2 rounded-full bg-warning-500" />
                Low
              </span>
              <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                <span className="size-2 rounded-full bg-neutral-400" />
                Offline
              </span>
            </div>
          </section>

          {/* Dashboard rail */}
          <div className="flex w-[340px] shrink-0 flex-col gap-3">
            {/* Network stats — loaded */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <Card key={s.label} className="gap-1.5 px-3 py-3">
                  <CardContent className="flex flex-col gap-1 px-0">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <s.icon className="size-3.5" />
                      <span className="font-caption text-caption">
                        {s.label}
                      </span>
                    </div>
                    <p className="font-code text-xl leading-none text-foreground">
                      {s.value}
                    </p>
                    <p className="font-caption text-caption text-muted-foreground">
                      {s.sub}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stations near you — first two cached, two streaming */}
            <Card className="flex-1 gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Stations near you</CardTitle>
                <CardAction>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    aria-label="Locate me"
                  >
                    <Crosshair />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col px-4">
                <div className="flex items-center gap-3">
                  <span className="size-2.5 shrink-0 rounded-full bg-success-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      SW 3rd &amp; Alder
                    </p>
                    <p className="font-caption text-caption text-muted-foreground">
                      120 m · 8 docks free
                    </p>
                  </div>
                  <Badge variant="outline">6 bikes</Badge>
                </div>
                <Separator className="my-2.5" />
                <div className="flex items-center gap-3">
                  <span className="size-2.5 shrink-0 rounded-full bg-warning-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      Eastbank Esplanade
                    </p>
                    <p className="font-caption text-caption text-muted-foreground">
                      340 m · 14 docks free
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-warning-200 bg-warning-50 text-warning-600"
                  >
                    Low
                  </Badge>
                </div>
                <Separator className="my-2.5" />
                <div aria-busy="true" aria-label="Loading nearby stations">
                  <StationSkeletonRow />
                  <Separator className="my-2.5" />
                  <StationSkeletonRow />
                </div>
              </CardContent>
            </Card>

            {/* Rides today — morning bars loaded, afternoon pending */}
            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Rides today</CardTitle>
                <CardAction>
                  <span className="font-code text-xs text-muted-foreground">
                    hourly · streaming
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-4">
                <div
                  className="flex h-24 items-end gap-1.5"
                  aria-busy="true"
                  aria-label="Loading afternoon ride volumes"
                >
                  {ridesLoaded.map((v, i) => (
                    <div
                      key={i}
                      className={
                        i === ridesLoaded.length - 1
                          ? "w-full rounded-sm bg-neutral-800"
                          : "w-full rounded-sm bg-neutral-300"
                      }
                      style={{ height: `${Math.max(8, (v / peak) * 100)}%` }}
                    />
                  ))}
                  {ridesPending.map((h, i) => (
                    <Skeleton key={i} className={`w-full rounded-sm ${h}`} />
                  ))}
                </div>
                <div className="flex justify-between font-code text-xs text-muted-foreground">
                  <span>06</span>
                  <span>09</span>
                  <span>12</span>
                  <span>15</span>
                  <span>18</span>
                  <span>21</span>
                </div>
                <p className="font-caption text-caption text-muted-foreground">
                  4,712 rides so far · avg trip 12 min
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer — loaded */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t px-4">
          <span className="font-caption text-caption text-muted-foreground">
            Riverline Bike Share · open data feed · station status refreshed
            every 15s
          </span>
          <Button variant="ghost" size="xs">
            Report an issue
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
