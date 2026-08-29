"use client"

// EVAL page — spinner p3 — car rental booking service — 1920x1080 dark
// Search-in-progress states while browsing rental fleet: live search input in
// the header (spinner inside the field), a partner-source search strip, one
// availability row with a region overlay spinner, a streaming skeleton row,
// a filter panel that is re-counting results, a branch locator still locating
// and a booking summary whose Reserve action is committing — interleaved
// with fully loaded result rows.
// Family: Spinner + Card, Badge, Button, Input, Checkbox, Slider, Skeleton,
// Separator, Avatar. Flat panels + hairlines only.

import { CarFront, Globe, MapPin, Search, SlidersHorizontal } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"

const navLinks = ["Find a car", "Locations", "Long-term", "Rewards"]

const vehicleTypes = [
  { id: "suv", label: "SUV", count: 38, checked: true },
  { id: "compact", label: "Compact", count: 52, checked: true },
  { id: "estate", label: "Estate", count: 24, checked: false },
  { id: "van", label: "Van", count: 17, checked: false },
  { id: "ev", label: "Electric", count: 21, checked: false },
]

const results = [
  {
    name: "Toyota RAV4 Hybrid",
    supplier: "Hertz · LIS Terminal 1",
    badges: ["SUV", "Hybrid", "Automatic"],
    specs: "5 seats · 2 bags · A/C",
    price: "$58",
    total: "$174 for 3 days",
    loading: false,
  },
  {
    name: "Volkswagen Golf Variant",
    supplier: "Velo Select · LIS Terminal 1",
    badges: ["Estate", "Manual"],
    specs: "5 seats · 3 bags · A/C",
    price: "$41",
    total: "$123 for 3 days",
    loading: false,
  },
  {
    name: "Peugeot 3008 GT",
    supplier: "Europcar · off-terminal, shuttle",
    badges: ["SUV", "Automatic"],
    specs: "5 seats · 2 bags · A/C",
    price: "$64",
    total: "$192 for 3 days",
    loading: false,
  },
]

const branches = [
  { name: "LIS Airport", meta: "Terminal 1 · open 24/7", distance: "0.0 km" },
  { name: "Lisbon Centro", meta: "Av. da Liberdade 12 · closes 20:00", distance: "0.8 km" },
]

function CarRow({
  result,
}: {
  result: (typeof results)[number]
}) {
  return (
    <div className="flex items-center gap-5 rounded-lg border bg-card px-4 py-4">
      <div className="flex size-24 shrink-0 items-center justify-center rounded-md border bg-background">
        <CarFront className="size-8 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{result.name}</p>
        <p className="font-caption text-caption text-muted-foreground">
          {result.supplier}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {result.badges.map((b, i) => (
            <Badge key={b} variant={i === result.badges.length - 1 ? "outline" : "secondary"}>
              {b}
            </Badge>
          ))}
          <span className="ml-1 font-code text-xs text-muted-foreground">
            {result.specs}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <p className="font-code text-xl leading-none">
          {result.price}
          <span className="font-caption text-caption text-muted-foreground"> /day</span>
        </p>
        <p className="font-caption text-caption text-muted-foreground">
          {result.total}
        </p>
        <Button size="sm" className="mt-1.5">
          Reserve
        </Button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Header — search field still querying */}
        <header className="flex h-14 shrink-0 items-center gap-6 border-b px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md border bg-card">
              <CarFront className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3">Velo Rent</span>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            {navLinks.map((link, i) => (
              <span
                key={link}
                className={i === 0 ? "font-medium text-foreground" : "text-muted-foreground"}
              >
                {link}
              </span>
            ))}
          </nav>
          <div className="relative ml-auto w-[420px]">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue="Lisbon Airport (LIS)"
              aria-label="Search pickup location"
              className="pr-9 pl-8"
            />
            <Spinner
              className="absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-label="Searching locations"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Globe />
            EN · EUR
          </Button>
          <Avatar>
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Filters — recounting after a filter change */}
          <aside className="flex w-72 shrink-0 flex-col gap-5 overflow-hidden border-r bg-sidebar px-4 py-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading-3 text-heading-3">Filters</h2>
              <Button variant="ghost" size="xs">
                Reset
              </Button>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="font-code text-xs tracking-wide text-muted-foreground uppercase">
                Vehicle type
              </p>
              {vehicleTypes.map((t) => (
                <label
                  key={t.id}
                  htmlFor={`type-${t.id}`}
                  className="flex h-6 items-center gap-2.5 text-sm"
                >
                  <Checkbox id={`type-${t.id}`} defaultChecked={t.checked} />
                  <span className="flex-1">{t.label}</span>
                  <span className="font-code text-xs text-muted-foreground">
                    {t.count}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-code text-xs tracking-wide text-muted-foreground uppercase">
                Price per day
              </p>
              <Slider
                defaultValue={[35, 120]}
                min={20}
                max={200}
                step={5}
                aria-label="Daily price range"
              />
              <p className="font-code text-xs text-muted-foreground">$35 – $120 / day</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2" aria-busy="true">
              <Spinner className="size-3.5 shrink-0 text-muted-foreground" />
              <p className="font-caption text-caption text-muted-foreground">
                Updating matches for SUV + Compact…
              </p>
            </div>
          </aside>

          {/* Results — live stream */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden px-6 py-5">
            <div className="flex shrink-0 items-end justify-between">
              <div>
                <h1 className="font-heading-2 text-heading-2">Lisbon Airport (LIS)</h1>
                <p className="font-caption text-caption text-muted-foreground">
                  Pickup Jun 12, 09:00 · Return Jun 15, 09:00 · 3 days · driver 25+
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-code text-xs text-muted-foreground">
                  214 matches
                </span>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal />
                  Sort · price
                </Button>
              </div>
            </div>

            {/* Partner-source search in progress */}
            <div
              className="flex shrink-0 items-center gap-3 rounded-lg border bg-card px-4 py-3"
              aria-busy="true"
            >
              <Spinner className="size-4 shrink-0" />
              <p className="text-sm font-medium">
                Searching 38 partner fleets around LIS…
              </p>
              <span className="ml-auto font-code text-xs text-muted-foreground">
                12 of 38 sources responded · updated 09:41:12
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3">
              {results.slice(0, 2).map((r) => (
                <CarRow key={r.name} result={r} />
              ))}

              {/* Availability check — region overlay */}
              <div
                className="relative flex items-center gap-5 rounded-lg border bg-card px-4 py-4"
                aria-busy="true"
                aria-label="Checking availability"
              >
                <Skeleton className="size-24 shrink-0" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="mt-2 h-3 w-32" />
                  <div className="mt-3 flex items-center gap-1.5">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-14" />
                    <Skeleton className="ml-1 h-3 w-40" />
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-card/85">
                  <Spinner className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium">Checking availability…</p>
                  <p className="font-code text-xs text-muted-foreground">
                    licence PL-7724 · asking 3 sources
                  </p>
                </div>
              </div>

              {results.slice(2).map((r) => (
                <CarRow key={r.name} result={r} />
              ))}

              {/* Streaming row — sources still responding */}
              <div
                className="flex items-center gap-5 rounded-lg border border-dashed px-4 py-4"
                aria-busy="true"
                aria-label="Loading more results"
              >
                <Skeleton className="size-24 shrink-0" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="mt-2 h-3 w-36" />
                  <Skeleton className="mt-3 h-3.5 w-64" />
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>

              <div className="mt-auto flex shrink-0 items-center justify-between pt-1">
                <span className="font-caption text-caption text-muted-foreground">
                  Showing 5 of 214 · results stream in as partners respond
                </span>
                <Button variant="outline" size="sm">
                  Load 12 more
                </Button>
              </div>
            </div>
          </main>

          {/* Booking rail — reserving + branch locator */}
          <aside className="flex w-80 shrink-0 flex-col gap-4 overflow-hidden border-l px-4 py-5">
            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Your booking</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 px-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Toyota RAV4 Hybrid</p>
                  <Badge variant="outline">or similar</Badge>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <p className="font-code text-xs text-muted-foreground">
                    pickup LIS T1 · Jun 12 · 09:00
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <p className="font-code text-xs text-muted-foreground">
                    return LIS T1 · Jun 15 · 09:00
                  </p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    $58 × 3 days
                  </span>
                  <span className="font-code text-xs">$174.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Taxes &amp; fees
                  </span>
                  <span className="font-code text-xs">$21.30</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-code text-sm font-medium">$195.30</span>
                </div>
                <Button className="mt-1 w-full" disabled aria-busy="true">
                  <Spinner data-icon="inline-start" />
                  Reserving…
                </Button>
                <p className="font-caption text-caption text-muted-foreground">
                  Free cancellation until Jun 11, 23:59
                </p>
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Nearest branches</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 px-4">
                {branches.map((b) => (
                  <div key={b.name} className="flex items-center gap-2.5">
                    <MapPin className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{b.name}</p>
                      <p className="truncate font-caption text-caption text-muted-foreground">
                        {b.meta}
                      </p>
                    </div>
                    <span className="font-code text-xs text-muted-foreground">
                      {b.distance}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center gap-2.5" aria-busy="true">
                  <Spinner className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">Locating partner branches…</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      within 5 km of the terminal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Footer */}
        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-6">
          <span className="font-code text-xs text-muted-foreground">
            Velo Rent · Lisbon · 214 vehicles matched · 38 sources
          </span>
          <span className="font-code text-xs text-muted-foreground">
            search SR-40219 · prices refresh every 60 s
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
