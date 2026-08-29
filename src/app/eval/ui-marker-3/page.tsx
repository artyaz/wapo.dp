"use client";

/**
 * EVAL page — marker p3 — craft brewery tap list — 390x844 dark (phone)
 *
 * Scenario: "Molasses Harbor Brewing" taproom board, dark phone screen.
 * Marker is the voice of the tap wall: a live tap-list indicator in the
 * header, status-dot markers on each beer row, separator markers between
 * the mainstay and rotating sections, and border markers as keg-event
 * chips in the evening's activity card.
 * Co-stars: Card, Badge, Button, Progress, Separator.
 */

import { Beer, MapPin } from "lucide-react";

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

const TAPS = [
  {
    name: "Column 77 Pils",
    style: "Czech-style pilsner",
    spec: "5.0% · 38 IBU",
    price: "$7",
    keg: 82,
    state: "on-tap" as const,
    label: "On tap",
  },
  {
    name: "Rust Belt IPA",
    style: "West coast IPA",
    spec: "6.2% · 55 IBU",
    price: "$8",
    keg: 64,
    state: "on-tap" as const,
    label: "On tap",
  },
  {
    name: "Ember Rye",
    style: "Rye amber ale",
    spec: "5.8% · 26 IBU",
    price: "$7",
    keg: 18,
    state: "low" as const,
    label: "Low · last keg",
  },
  {
    name: "Oat Cream Stout",
    style: "Oatmeal stout",
    spec: "5.5% · 30 IBU",
    price: "$8",
    keg: 0,
    state: "kicked" as const,
    label: "Kicked",
  },
];

const ROTATING = [
  {
    name: "Vera's Table Lager",
    style: "German helles",
    spec: "4.8% · 18 IBU",
    price: "$6",
    time: "Tapping 17:00",
  },
  {
    name: "Harbor Fog Hazy",
    style: "New England IPA",
    spec: "6.0% · 40 IBU",
    price: "$8",
    time: "Conditioning · 3 days",
  },
];

const DOT: Record<string, string> = {
  "on-tap": "bg-success-500",
  low: "bg-warning-500",
  kicked: "bg-destructive-500",
};

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-dvh w-full flex-col bg-background text-foreground">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="px-4 pb-3 pt-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Molasses Harbor Brewing
              </p>
              <h1 className="font-heading-2 text-heading-2">Tap list</h1>
            </div>
            <Button variant="outline" size="icon-sm" aria-label="Order a pour">
              <Beer />
            </Button>
          </div>
          {/* Live tap list marker */}
          <Marker
            role="status"
            className="mt-1.5 w-auto justify-start gap-1.5"
          >
            <MarkerIcon>
              <span className="size-2 animate-pulse rounded-full bg-success-500" />
            </MarkerIcon>
            <MarkerContent className="font-code text-[10px]">
              Live · updated 2 min ago · 12 taps pouring
            </MarkerContent>
          </Marker>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
          {/* ── Mainstays ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-1">
            <Marker variant="separator">
              <MarkerContent className="font-code text-[10px] uppercase tracking-wider">
                Mainstays
              </MarkerContent>
            </Marker>
            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">House lineup</CardTitle>
                <CardAction>
                  <Badge variant="secondary" className="font-code text-[10px]">
                    4 beers
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 px-2">
                {TAPS.map((beer, i) => (
                  <div key={beer.name}>
                    {i > 0 && <Separator className="mx-2" />}
                    <div className="flex flex-col gap-1.5 px-2 py-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="min-w-0 truncate text-sm font-medium">
                          {beer.name}
                        </p>
                        <span className="font-code text-sm">{beer.price}</span>
                      </div>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {beer.style} · {beer.spec}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <Progress
                            value={beer.keg}
                            aria-label={`${beer.name} keg ${beer.keg}% full`}
                            className="h-1.5"
                          />
                        </div>
                        {/* Row status marker in a fixed trailing slot */}
                        <div className="flex w-28 shrink-0 justify-start">
                          <Marker className="w-auto justify-start gap-1.5">
                            <MarkerIcon>
                              <span
                                className={`size-1.5 rounded-full ${DOT[beer.state]}`}
                                aria-hidden
                              />
                            </MarkerIcon>
                            <MarkerContent className="whitespace-nowrap text-[11px]">
                              {beer.label}
                            </MarkerContent>
                          </Marker>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ── Rotating taps ─────────────────────────────────────── */}
          <div className="flex flex-col gap-1">
            <Marker variant="separator">
              <MarkerContent className="font-code text-[10px] uppercase tracking-wider">
                Rotating taps
              </MarkerContent>
            </Marker>
            <Card className="gap-3 py-4">
              <CardContent className="flex flex-col gap-1 px-2">
                {ROTATING.map((beer, i) => (
                  <div key={beer.name}>
                    {i > 0 && <Separator className="mx-2" />}
                    <div className="flex flex-col gap-1.5 px-2 py-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="min-w-0 truncate text-sm font-medium">
                          {beer.name}
                        </p>
                        <span className="font-code text-sm">{beer.price}</span>
                      </div>
                      <p className="truncate font-code text-[10px] text-muted-foreground">
                        {beer.style} · {beer.spec}
                      </p>
                      {/* Row status marker — same line-3 slot as the keg bar */}
                      <Marker className="w-auto justify-start gap-1.5 text-muted-foreground">
                        <MarkerIcon>
                          <span
                            className="size-1.5 rounded-full bg-muted-foreground/50"
                            aria-hidden
                          />
                        </MarkerIcon>
                        <MarkerContent className="whitespace-nowrap text-[11px]">
                          {beer.time}
                        </MarkerContent>
                      </Marker>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ── Keg events ────────────────────────────────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Keg events · tonight</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 px-4">
              <Marker variant="border" className="w-full justify-start">
                <MarkerIcon>
                  <span className="size-1.5 rounded-full bg-success-500" />
                </MarkerIcon>
                <MarkerContent>
                  Tapped fresh · Column 77 · 18:05
                </MarkerContent>
              </Marker>
              <Marker variant="border" className="w-full justify-start">
                <MarkerIcon>
                  <span className="size-1.5 rounded-full bg-warning-500" />
                </MarkerIcon>
                <MarkerContent>
                  Low keg flagged · Ember Rye · 19:50
                </MarkerContent>
              </Marker>
              <Marker variant="border" className="w-full justify-start">
                <MarkerIcon>
                  <span className="size-1.5 rounded-full bg-destructive-500" />
                </MarkerIcon>
                <MarkerContent>
                  Kicked · Oat Cream Stout · 20:42
                </MarkerContent>
              </Marker>
            </CardContent>
          </Card>

          {/* ── Footer info ───────────────────────────────────────── */}
          <div className="flex items-center justify-between px-1 pb-1">
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="size-3" />
              Pier 9 · 132 Harbor Line Rd
            </p>
            <p className="font-code text-[10px] text-muted-foreground">
              Growler fills · until 21:00
            </p>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
