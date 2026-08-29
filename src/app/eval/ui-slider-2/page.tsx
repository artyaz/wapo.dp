"use client";

/**
 * EVAL page — slider p2 — restaurant reservation system — 1920x1080 light
 *
 * Guest-side booking console for "Tavola Collective" (Hayes Valley, SF).
 * Slider is the spine of the filter rail: party-size slider, two-thumb
 * seating-time window and two-thumb budget-per-person range — each with a
 * visible mono readout. Results land in a dense availability table with
 * time-slot chips; the right rail holds the pending reservation summary.
 * Other ui/* components: Card, Badge, Button, Checkbox, Switch, Table.
 */

import {
  ArrowUpDown,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

// Seating window slider maps 17:00 → 0 and 22:00 → 300 (minutes).
const fmtTime = (minutes: number) =>
  `${17 + Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;

const WINDOW_FROM = 120; // 19:00
const WINDOW_TO = 210; // 20:30

const RESTAURANTS = [
  {
    name: "Fiori Osteria",
    cuisine: "Italian · tasting menu",
    area: "Hayes Valley",
    price: "$85",
    rating: "4.8",
    times: ["18:30", "19:00", "20:15"],
    note: null as string | null,
  },
  {
    name: "Maison Verte",
    cuisine: "French bistro",
    area: "Alamo Square",
    price: "$95",
    rating: "4.6",
    times: ["19:00", "21:00"],
    note: null,
  },
  {
    name: "Bar Cava",
    cuisine: "Tapas · natural wine",
    area: "Hayes Valley",
    price: "$55",
    rating: "4.4",
    times: ["18:00", "18:30", "19:30"],
    note: null,
  },
  {
    name: "Nisei Room",
    cuisine: "Japanese · counter",
    area: "NoPa",
    price: "$140",
    rating: "4.7",
    times: [],
    note: "Waitlist",
  },
  {
    name: "Osaka 46",
    cuisine: "Omakase · 12 seats",
    area: "NoPa",
    price: "$210",
    rating: "4.9",
    times: ["20:30"],
    note: "Last table",
  },
];

const SEATING = [
  { label: "Window table", checked: true },
  { label: "Outdoor / terrace", checked: true },
  { label: "Chef's counter", checked: false },
  { label: "Quiet zone", checked: false },
];

const BLOCK_STATS = [
  { value: "142/180", label: "Covers booked" },
  { value: "2.4", label: "Avg party" },
  { value: "3.1%", label: "No-show rate" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-16 flex-none items-center justify-between border-b border-default-border px-8">
          <div className="flex items-baseline gap-3">
            <p className="font-heading-3 text-heading-3 text-foreground">
              Tavola Collective
            </p>
            <span className="font-code text-xs text-muted-foreground">
              San Francisco · Hayes Valley
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CalendarDays />
              Fri 06 Mar · Dinner
            </Button>
            <Button variant="outline" size="sm">
              <Users />
              2 guests
            </Button>
            <span
              aria-hidden
              className="mx-1 h-5 w-px bg-default-border"
            />
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </div>
        </header>

        {/* Title band */}
        <div className="flex flex-none items-end justify-between border-b border-default-border px-8 py-5">
          <div>
            <h1 className="font-heading-1 text-heading-1 text-foreground">
              Find a table tonight
            </h1>
            <p className="mt-1 font-code text-xs text-muted-foreground">
              14 of 128 restaurants match your filters · availability synced
              19:02 PST
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <ArrowUpDown />
            Sort · rating
          </Button>
        </div>

        {/* Body */}
        <div className="grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)_360px] gap-6 px-8 py-6">
          {/* Filter rail — three sliders, values always visible */}
          <Card className="h-fit gap-0 py-4">
            <div className="flex items-center justify-between px-5">
              <CardTitle>Filters</CardTitle>
              <Badge variant="secondary">3 active</Badge>
            </div>

            <div className="mt-5 flex flex-col gap-5 px-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Party size</span>
                  <span className="font-code text-sm tabular-nums">
                    2 guests
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  defaultValue={[2]}
                  min={1}
                  max={8}
                  step={1}
                  aria-label="Party size"
                />
                <div className="mt-1.5 flex justify-between font-code text-[10px] text-muted-foreground">
                  <span>1</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8+</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Seating window</span>
                  <span className="font-code text-sm tabular-nums">
                    {fmtTime(WINDOW_FROM)} – {fmtTime(WINDOW_TO)}
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  defaultValue={[WINDOW_FROM, WINDOW_TO]}
                  min={0}
                  max={300}
                  step={15}
                  aria-label="Seating window"
                />
                <div className="mt-1.5 flex justify-between font-code text-[10px] text-muted-foreground">
                  <span>17:00</span>
                  <span>18:30</span>
                  <span>20:00</span>
                  <span>21:30</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">
                    Budget per person
                  </span>
                  <span className="font-code text-sm tabular-nums">
                    $75 – $150
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  defaultValue={[75, 150]}
                  min={25}
                  max={250}
                  step={5}
                  aria-label="Budget per person"
                />
                <div className="mt-1.5 flex justify-between font-code text-[10px] text-muted-foreground">
                  <span>$25</span>
                  <span>$100</span>
                  <span>$175</span>
                  <span>$250</span>
                </div>
              </div>

              <div className="border-t border-default-border pt-4">
                <p className="text-sm font-medium">Seating</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {SEATING.map((option) => (
                    <label
                      key={option.label}
                      className="flex cursor-pointer items-center gap-2.5 text-sm"
                    >
                      <Checkbox
                        defaultChecked={option.checked}
                        aria-label={option.label}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Apply filters
                </Button>
                <Button size="sm" variant="ghost">
                  Clear all
                </Button>
              </div>
            </div>
          </Card>

          {/* Results — availability table */}
          <section className="flex min-w-0 flex-col gap-4">
            <Card className="gap-0 overflow-hidden py-0">
              <div className="flex items-baseline justify-between px-5 pt-4">
                <CardTitle>Available tonight</CardTitle>
                <span className="font-code text-[10px] text-muted-foreground">
                  party of 2 · incl. service
                </span>
              </div>
              <Table className="mt-3">
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-5">Restaurant</TableHead>
                    <TableHead>Neighborhood</TableHead>
                    <TableHead>Price pp</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="pr-5 text-right">
                      Seatings
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RESTAURANTS.map((restaurant) => (
                    <TableRow key={restaurant.name}>
                      <TableCell className="pl-5">
                        <p className="font-medium">{restaurant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {restaurant.cuisine}
                        </p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {restaurant.area}
                      </TableCell>
                      <TableCell className="font-code tabular-nums">
                        {restaurant.price}
                      </TableCell>
                      <TableCell className="font-code tabular-nums text-muted-foreground">
                        {restaurant.rating} / 5
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {restaurant.times.map((time) => (
                            <Button
                              key={time}
                              variant="outline"
                              size="xs"
                              className="font-code text-xs"
                            >
                              {time}
                            </Button>
                          ))}
                          {restaurant.note === "Waitlist" && (
                            <Badge variant="outline">Join waitlist</Badge>
                          )}
                          {restaurant.note === "Last table" && (
                            <Badge className="border-warning-300 bg-warning-50 text-warning-700">
                              Last table
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="border-t border-default-border px-5 py-2.5 font-code text-[10px] text-muted-foreground">
                Time slots hold for 10 minutes · parties over 6 should call the
                restaurant directly
              </p>
            </Card>
          </section>

          {/* Right rail — pending reservation */}
          <aside className="flex min-w-0 flex-col gap-4">
            <Card className="gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <CardTitle>Your table</CardTitle>
                <Badge>Held 08:12</Badge>
              </div>

              <div className="mt-4 px-5">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 flex-none text-muted-foreground" />
                  <div>
                    <p className="font-heading-3 text-heading-3 text-foreground">
                      Fiori Osteria
                    </p>
                    <p className="mt-0.5 font-code text-[10px] text-muted-foreground">
                      632 Hayes St · Italian · tasting menu
                    </p>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-y-3 border-t border-default-border pt-4 text-sm">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="text-right font-code tabular-nums">
                    Fri 06 Mar
                  </dd>
                  <dt className="text-muted-foreground">Time</dt>
                  <dd className="text-right font-code tabular-nums">19:00</dd>
                  <dt className="text-muted-foreground">Party</dt>
                  <dd className="text-right font-code tabular-nums">
                    2 guests
                  </dd>
                  <dt className="text-muted-foreground">Est. total</dt>
                  <dd className="text-right font-code tabular-nums">
                    $170 – $190
                  </dd>
                </dl>

                <div className="mt-4 flex flex-col gap-2.5 border-t border-default-border pt-4">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox defaultChecked aria-label="Window seat" />
                    Window seat
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox aria-label="Quiet corner" />
                    Quiet corner
                  </label>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-default-border pt-4">
                  <span className="text-sm">Text me if the table moves up</span>
                  <Switch defaultChecked aria-label="Text notifications" />
                </div>

                <Button className="mt-4 w-full">Confirm reservation</Button>
                <p className="mt-2 text-center font-code text-[10px] text-muted-foreground">
                  Free cancellation until 17:00
                </p>
              </div>
            </Card>

            <Card className="gap-0 py-4">
              <div className="px-5">
                <CardTitle>Tonight in Hayes Valley</CardTitle>
              </div>
              <div className="mt-4 grid grid-cols-3 divide-x divide-default-border px-5">
                {BLOCK_STATS.map((stat) => (
                  <div key={stat.label} className="px-3 first:pl-0 last:pr-0">
                    <p className="font-code text-xl leading-none tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>

        {/* Footer */}
        <footer className="flex h-9 flex-none items-center justify-between border-t border-default-border px-8 font-code text-[10px] text-muted-foreground">
          <span>Tavola Collective · availability sync 19:02 PST</span>
          <span>Help · Guest policies · 2024–2026</span>
        </footer>
      </div>
    </EvalShell>
  );
}
