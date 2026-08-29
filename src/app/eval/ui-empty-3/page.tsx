"use client";

/**
 * EVAL page — empty p3 — car rental booking service — 834x1112 dark (tablet)
 *
 * Scenario: "Meridian Rentals" booking app (Lisboa Airport, desk 4), tablet
 * portrait, driver Rui Cabral. Search summary card with active filter chips →
 * hero Empty (no vehicles match the filters) → two-up row with a first-run
 * "No trips yet" Empty and a populated "Popular at LIS" card for contrast.
 * Co-stars: Card, Badge, Button, Avatar, Separator.
 */

import { CarFront, Luggage, MapPin, X } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

const NAV_LINKS = ["Browse", "Trips", "Vehicles", "Support"];

const POPULAR = [
  {
    name: "VW ID.3",
    spec: "Electric · Automatic · 5 seats",
    price: "€58",
    left: "8 left",
  },
  {
    name: "Peugeot 208",
    spec: "Compact · Manual · 5 seats",
    price: "€41",
    left: "12 left",
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground mx-auto flex min-h-dvh w-full max-w-[780px] flex-col px-6 py-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="flex items-center gap-4 border-b pb-5">
          <div className="bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <CarFront className="size-5" />
          </div>
          <div>
            <p className="font-heading-3 text-heading-3 leading-none">
              Meridian Rentals
            </p>
            <p className="text-muted-foreground mt-1 font-code text-[10px] uppercase tracking-[0.14em]">
              Lisboa · Aeroporto desk 4
            </p>
          </div>
          <nav className="ml-auto hidden items-center gap-5 text-sm sm:flex">
            {NAV_LINKS.map((link, i) => (
              <span
                key={link}
                className={
                  i === 0
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }
              >
                {link}
              </span>
            ))}
          </nav>
          <Avatar size="lg">
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
        </header>

        {/* ── Search summary ──────────────────────────────────────── */}
        <Card className="mt-5 gap-4 py-5">
          <CardHeader className="px-5">
            <CardTitle className="text-sm">Your search</CardTitle>
            <CardDescription>
              14 vehicles available at LIS Airport for these dates
            </CardDescription>
            <CardAction>
              <Badge variant="secondary" className="font-code text-[10px]">
                3 days
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
                  Pick-up
                </p>
                <p className="mt-1 font-code text-sm">Mar 21 · 10:00</p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                  <MapPin className="size-3" />
                  LIS Airport · Terminal 1
                </p>
              </div>
              <div>
                <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
                  Return
                </p>
                <p className="mt-1 font-code text-sm">Mar 24 · 10:00</p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                  <MapPin className="size-3" />
                  LIS Airport · Terminal 1
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-xs">Filters</span>
              <Badge variant="outline">
                Electric
                <X className="size-3" />
              </Badge>
              <Badge variant="outline">
                Automatic
                <X className="size-3" />
              </Badge>
              <Badge variant="outline">
                ≤ €65 / day
                <X className="size-3" />
              </Badge>
              <Button variant="link" size="xs" className="ml-auto">
                Clear all
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── HERO — no vehicles match the filters ────────────────── */}
        <Empty className="mt-5 border border-dashed py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CarFront />
            </EmptyMedia>
            <EmptyTitle>No vehicles match these filters</EmptyTitle>
            <EmptyDescription>
              14 vehicles are available at LIS Airport for Mar 21–24, but none
              are electric automatics under €65/day. Widen your budget or
              include hybrids to see 6 more matches.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Button size="sm">Widen budget to €75/day</Button>
              <Button variant="outline" size="sm">
                Include hybrids
              </Button>
            </div>
            <EmptyDescription className="text-xs">
              Or keep filters and try Lisboa Centro — 8 km away, 3 electric
              automatics from €61/day.
            </EmptyDescription>
          </EmptyContent>
        </Empty>

        {/* ── Alternatives row ────────────────────────────────────── */}
        <div className="mt-5 grid flex-1 items-start gap-5 sm:grid-cols-2">
          {/* First-run — no trips yet */}
          <Card className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Your trips</CardTitle>
              <CardDescription>Itineraries &amp; receipts</CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <Empty className="bg-muted/30 p-6">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Luggage />
                  </EmptyMedia>
                  <EmptyTitle className="text-base">No trips yet</EmptyTitle>
                  <EmptyDescription>
                    Once you book, your itinerary, pickup instructions and
                    receipts live here.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" size="sm">
                    Browse all vehicles
                  </Button>
                </EmptyContent>
              </Empty>
            </CardContent>
          </Card>

          {/* Populated — for contrast and realism */}
          <Card className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Popular at LIS Airport</CardTitle>
              <CardAction>
                <Badge variant="outline">This week</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5">
              {POPULAR.map((car, i) => (
                <div key={car.name} className="contents">
                  {i > 0 ? <Separator /> : null}
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-lg border">
                      <CarFront className="text-muted-foreground size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{car.name}</p>
                      <p className="text-muted-foreground font-code text-[10px]">
                        {car.spec}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-code text-sm">
                        {car.price}
                        <span className="text-muted-foreground"> /day</span>
                      </p>
                      <Badge variant="secondary" className="mt-1 text-[10px]">
                        {car.left}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="pt-6">
          <Separator className="mb-3" />
          <div className="text-muted-foreground flex items-center justify-between font-code text-[10px]">
            <span>Meridian Rentals · PT license 9182-C</span>
            <span>Support +351 21 845 0200</span>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
