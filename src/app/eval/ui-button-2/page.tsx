"use client"

// EVAL page — button p2 — flight booking flow — 430x932 light (phone)
// Button hierarchy: sticky primary CTA (thumb reach), outline secondary
// actions, ghost, quiet-destructive, loading state, icon buttons.
// + Card, Badge, Separator, Progress, Spinner, Switch.

import {
  Armchair,
  Backpack,
  Baby,
  ChevronLeft,
  CircleHelp,
  Luggage,
  Lock,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"

const PRICES: Array<[string, string]> = [
  ["Base fare × 2", "€496.00"],
  ["Seats 12A + 12B", "€48.00"],
  ["Checked bag 23 kg", "€35.00"],
  ["Flexible ticket", "€28.00"],
  ["Taxes & carrier fees", "€86.40"],
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <Button variant="ghost" size="icon-sm" aria-label="Back to results">
            <ChevronLeft />
          </Button>
          <p className="flex-1 text-sm font-semibold text-foreground">
            Confirm your flight
          </p>
          <Button variant="ghost" size="icon-sm" aria-label="Help">
            <CircleHelp />
          </Button>
        </header>

        {/* Step indicator */}
        <div className="shrink-0 px-4 pb-3.5 pt-3">
          <div className="flex items-baseline justify-between">
            <p className="text-caption font-caption text-muted-foreground">
              Step 2 of 3 — Extras &amp; seats
            </p>
            <p className="font-code text-xs text-muted-foreground">
              price locked 19:42
            </p>
          </div>
          <Progress value={62} className="mt-2" aria-label="Booking progress" />
          <div className="mt-1.5 flex justify-between">
            <p className="text-caption font-caption text-muted-foreground">
              Flights ✓
            </p>
            <p className="text-caption font-caption font-medium text-foreground">
              Extras
            </p>
            <p className="text-caption font-caption text-muted-foreground">
              Payment
            </p>
          </div>
        </div>

        <main className="flex flex-1 flex-col gap-2.5 px-4 pb-3">
          {/* Itinerary */}
          <Card className="gap-3 py-3.5">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Oslo &ndash; Lisbon</CardTitle>
              <CardDescription className="text-caption font-caption">
                Fri 12 – Sun 21 Jun · 2 travellers · SAS
              </CardDescription>
              <CardAction>
                <Badge variant="outline" className="font-code">
                  €248 pp
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-code text-lg leading-none text-foreground">
                    07:15
                  </p>
                  <p className="mt-1 text-caption font-caption text-muted-foreground">
                    OSL
                  </p>
                </div>
                <div className="flex flex-1 flex-col items-center gap-1.5">
                  <p className="text-caption font-caption text-muted-foreground">
                    5h 25m · 1 stop CPH
                  </p>
                  <div className="flex w-full items-center gap-1.5">
                    <Separator className="h-px flex-1" />
                    <PlaneTakeoff className="size-3.5 shrink-0 text-muted-foreground" />
                    <Separator className="h-px flex-1" />
                  </div>
                  <p className="font-code text-xs text-muted-foreground">
                    SK 4321
                  </p>
                </div>
                <div className="text-end">
                  <p className="font-code text-lg leading-none text-foreground">
                    11:40
                  </p>
                  <p className="mt-1 text-caption font-caption text-muted-foreground">
                    LIS
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <PlaneLanding className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Return · Sun 21 Jun
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    LIS 18:05 → OSL 22:35 · SK 4322
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  className="self-center border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Travellers & seats */}
          <Card className="gap-2.5 py-3.5">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Travellers &amp; seats</CardTitle>
              <CardDescription className="text-caption font-caption">
                Seats included with SAS Go
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col px-4">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Maria Bergstr&ouml;m
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    Adult · seat 12A · window
                  </p>
                </div>
                <Badge variant="outline" className="font-code">
                  12A
                </Badge>
                <Button variant="outline" size="xs">
                  Change
                </Button>
              </div>
              <Separator className="my-2.5" />
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Lars Bergstr&ouml;m
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    Adult · seat 12B · aisle
                  </p>
                </div>
                <Badge variant="outline" className="font-code">
                  12B
                </Badge>
                <Button variant="outline" size="xs">
                  Change
                </Button>
              </div>
              <Separator className="my-2.5" />
              <Button variant="ghost" size="xs" className="self-start">
                <Baby /> Add infant on lap
              </Button>
            </CardContent>
          </Card>

          {/* Extras */}
          <Card className="gap-2.5 py-3.5">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Extras</CardTitle>
              <CardDescription className="text-caption font-caption">
                Per traveller · per leg
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3">
                <Backpack className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Cabin bag 8 kg
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    Fits overhead bin
                  </p>
                </div>
                <Badge variant="outline">Included</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Luggage className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Checked bag 23 kg
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    €35.00 · per leg
                  </p>
                </div>
                <Button variant="outline" size="xs">
                  <Plus /> Add
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Armchair className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Extra legroom 14C
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    €18.00 · Maria · outbound
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  disabled
                  aria-live="polite"
                  className="gap-1.5"
                >
                  <Spinner className="size-3.5" /> Adding&hellip;
                </Button>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Flexible ticket
                  </p>
                  <p className="truncate text-caption font-caption text-muted-foreground">
                    Full refund until 24 h before departure
                  </p>
                </div>
                <Switch defaultChecked aria-label="Flexible ticket" />
              </div>
            </CardContent>
          </Card>

          {/* Price summary */}
          <Card className="gap-2.5 py-3.5">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Price summary</CardTitle>
              <CardDescription className="font-code text-xs">
                repriced 12:04 · EUR
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5 px-4">
              {PRICES.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between">
                  <p className="text-caption font-caption text-muted-foreground">
                    {label}
                  </p>
                  <p className="font-code text-xs text-foreground">{value}</p>
                </div>
              ))}
              <Separator className="my-1" />
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold text-foreground">Total</p>
                <p className="font-code text-base font-semibold text-foreground">
                  €693.40
                </p>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Sticky CTA — thumb reach */}
        <footer className="mt-auto shrink-0 border-t bg-background px-4 pb-4 pt-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <p className="text-caption font-caption text-muted-foreground">
                Total · 2 travellers
              </p>
              <p className="font-code text-xl leading-tight text-foreground">
                €693.40
              </p>
            </div>
            <Button size="lg" className="flex-1">
              <Lock /> Continue to payment
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
