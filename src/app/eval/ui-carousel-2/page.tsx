"use client";

/**
 * EVAL page — carousel p2 — city bike-share station map — 834x1112 light
 *
 * "CityWheels" station finder (portrait tablet).
 * - ui:carousel → swipeable station cards (1/2 basis, snap) + a photo
 *   carousel of popular routes
 * - other family members: card, badge, button, progress, table
 */

import React from "react";
import { Bike, Navigation, SquareParking } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

type Station = {
  id: string;
  name: string;
  distance: string;
  bikes: number;
  docks: number;
  status: "Active" | "Low bikes" | "Full" | "Offline";
};

const stations: Station[] = [
  { id: "ST-041", name: "Union Square North", distance: "240 m", bikes: 12, docks: 4, status: "Active" },
  { id: "ST-118", name: "Market & 5th", distance: "380 m", bikes: 3, docks: 13, status: "Low bikes" },
  { id: "ST-007", name: "Civic Center Plaza", distance: "520 m", bikes: 16, docks: 0, status: "Full" },
  { id: "ST-072", name: "Riverfront Park", distance: "740 m", bikes: 9, docks: 7, status: "Active" },
  { id: "ST-042", name: "Union Square Garage", distance: "290 m", bikes: 1, docks: 15, status: "Low bikes" },
  { id: "ST-090", name: "Mission & 7th", distance: "1.1 km", bikes: 0, docks: 0, status: "Offline" },
];

type Route = {
  seed: string;
  name: string;
  meta: string;
  rides: string;
};

const routes: Route[] = [
  { seed: "bike11", name: "Riverfront loop", meta: "4.2 km · 18 min", rides: "214 rides" },
  { seed: "bike23", name: "Union Sq → Museum", meta: "2.8 km · 11 min", rides: "186 rides" },
  { seed: "bike37", name: "Market St corridor", meta: "3.5 km · 15 min", rides: "161 rides" },
  { seed: "bike49", name: "Presidio climb", meta: "5.1 km · 27 min", rides: "98 rides" },
  { seed: "bike61", name: "Embarcadero sprint", meta: "1.9 km · 8 min", rides: "87 rides" },
];

const rides = [
  { time: "09:24", from: "Union Sq North", to: "Riverfront Park", dur: "18 min", fare: "$3.50" },
  { time: "08:52", from: "Market & 5th", to: "Civic Center", dur: "7 min", fare: "$1.50" },
  { time: "08:15", from: "Riverfront Park", to: "Museum District", dur: "22 min", fare: "$4.00" },
  { time: "07:48", from: "Mission & 7th", to: "Union Sq North", dur: "12 min", fare: "$2.50" },
];

/* map pin positions (percentages inside the service-area panel) */
const mapStations = [
  { x: 46, y: 40, label: "UNION SQ", active: true },
  { x: 27, y: 62, label: "", active: false },
  { x: 68, y: 30, label: "RIVERFRONT", active: false },
  { x: 55, y: 71, label: "", active: false },
  { x: 14, y: 26, label: "CIVIC CENTER", active: false },
  { x: 80, y: 58, label: "", active: false },
];

function statusBadge(status: Station["status"]) {
  if (status === "Offline")
    return { variant: "secondary" as const, cls: "text-destructive-600" };
  if (status === "Low bikes" || status === "Full")
    return { variant: "secondary" as const, cls: "text-warning-600" };
  return { variant: "secondary" as const, cls: undefined };
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[782px] flex-col gap-5 px-5 py-5">
        {/* ---------------- header ---------------- */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-foreground text-background">
              <Bike className="size-5" />
            </span>
            <div>
              <h1 className="font-heading-3 text-heading-3 text-foreground leading-tight">
                CityWheels · Arborview
              </h1>
              <p className="text-xs text-muted-foreground">
                Station finder · downtown grid
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1.5 px-2.5 py-1">
            <span className="size-1.5 rounded-full bg-success-500" />
            Live · GBFS v3
          </Badge>
        </header>

        {/* ---------------- network stats ---------------- */}
        <section
          aria-label="Network stats"
          className="grid grid-cols-3 gap-3"
        >
          {[
            { v: "274", l: "stations online" },
            { v: "1,908", l: "bikes available" },
            { v: "14 min", l: "avg ride today" },
          ].map((s) => (
            <Card key={s.l} className="gap-0 rounded-lg py-0">
              <CardContent className="flex flex-col gap-0.5 p-3.5">
                <span className="font-code text-xl font-semibold tabular-nums leading-none">
                  {s.v}
                </span>
                <span className="text-[11px] text-muted-foreground">{s.l}</span>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ---------------- stations carousel ---------------- */}
        <section className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between px-1">
            <h2 className="font-heading-3 text-heading-3 text-foreground">
              Stations near Union Square
            </h2>
            <span className="font-code text-xs tabular-nums text-muted-foreground">
              {current} / {count}
            </span>
          </div>
          <div className="px-12">
            <Carousel
              setApi={setApi}
              opts={{ align: "start" }}
              aria-label="Bike-share stations near Union Square"
            >
              <CarouselContent className="-ms-3">
                {stations.map((st) => {
                  const badge = statusBadge(st.status);
                  return (
                    <CarouselItem key={st.id} className="ps-3 md:basis-1/2">
                      <Card className="h-full gap-0 rounded-lg py-0">
                        <CardContent className="flex h-full flex-col gap-3 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold leading-tight">
                                {st.name}
                              </p>
                              <p className="mt-0.5 font-code text-[11px] text-muted-foreground">
                                {st.id} · {st.distance}
                              </p>
                            </div>
                            <Badge
                              variant={badge.variant}
                              className={badge.cls}
                            >
                              {st.status}
                            </Badge>
                          </div>
                          {st.status === "Offline" ? (
                            <p className="text-[13px] text-muted-foreground">
                              No live feed — maintenance window until 12:00.
                            </p>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <Bike className="size-3.5 shrink-0 text-muted-foreground" />
                                <Progress
                                  value={(st.bikes / 16) * 100}
                                  className="h-1.5"
                                  aria-label={`${st.bikes} of 16 bikes available`}
                                />
                                <span className="w-12 shrink-0 text-end font-code text-[11px] tabular-nums text-muted-foreground">
                                  {st.bikes}/16
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <SquareParking className="size-3.5 shrink-0 text-muted-foreground" />
                                <Progress
                                  value={(st.docks / 16) * 100}
                                  className="h-1.5"
                                  aria-label={`${st.docks} of 16 docks free`}
                                />
                                <span className="w-12 shrink-0 text-end font-code text-[11px] tabular-nums text-muted-foreground">
                                  {st.docks}/16
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                            <span className="font-code text-[11px] text-muted-foreground">
                              {st.status === "Offline"
                                ? "last seen 08:40"
                                : "updated 09:38"}
                            </span>
                            <Button variant="outline" size="sm">
                              <Navigation />
                              Route
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* ---------------- service area map ---------------- */}
        <section className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between px-1">
            <h2 className="font-heading-3 text-heading-3 text-foreground">
              Service area · downtown grid
            </h2>
            <span className="font-code text-[11px] text-muted-foreground">
              6 stations in view
            </span>
          </div>
          <div className="relative h-44 overflow-hidden rounded-lg border bg-muted">
            {/* street grid */}
            <div className="absolute inset-0">
              <div className="absolute inset-y-0 left-[22%] w-px bg-default-border" />
              <div className="absolute inset-y-0 left-[48%] w-px bg-default-border" />
              <div className="absolute inset-y-0 left-[74%] w-px bg-default-border" />
              <div className="absolute inset-x-0 top-[22%] h-px bg-default-border" />
              <div className="absolute inset-x-0 top-[48%] h-px bg-default-border" />
              <div className="absolute inset-x-0 top-[74%] h-px bg-default-border" />
              <div className="absolute left-[10%] right-[8%] top-[58%] h-[3px] -rotate-6 rounded-full bg-default-border" />
              <div className="absolute inset-x-0 bottom-0 h-[14%] bg-default-border/50" />
            </div>
            {/* stations */}
            {mapStations.map((p, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span
                  className={
                    p.active
                      ? "size-3.5 rounded-full bg-foreground ring-4 ring-foreground/15"
                      : "size-2.5 rounded-full bg-foreground/70"
                  }
                />
                {p.label ? (
                  <span className="mt-1 bg-muted/85 px-1 font-code text-[9px] tracking-wide text-muted-foreground">
                    {p.label}
                  </span>
                ) : null}
              </div>
            ))}
            {/* legend */}
            <div className="absolute bottom-2 left-2 flex items-center gap-3 rounded-md bg-background/90 px-2 py-1 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-foreground/70" /> station
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2.5 rounded-full bg-foreground ring-2 ring-foreground/15" /> you
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- popular routes carousel ---------------- */}
        <section className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between px-1">
            <h2 className="font-heading-3 text-heading-3 text-foreground">
              Popular rides today
            </h2>
            <span className="font-code text-[11px] text-muted-foreground">
              fastest first
            </span>
          </div>
          <div className="px-12">
            <Carousel opts={{ align: "start" }} aria-label="Popular rides today">
              <CarouselContent className="-ms-3">
                {routes.map((r) => (
                  <CarouselItem key={r.seed} className="ps-3 md:basis-1/2">
                    <figure className="flex flex-col gap-2">
                      <div className="h-32 overflow-hidden rounded-lg border">
                        <img
                          src={`https://picsum.photos/seed/${r.seed}/640/400`}
                          alt={`${r.name} route preview`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <figcaption className="flex items-baseline justify-between gap-2 px-0.5">
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate text-[13px] font-medium">
                            {r.name}
                          </span>
                          <span className="shrink-0 font-code text-[11px] text-muted-foreground">
                            {r.meta}
                          </span>
                        </span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {r.rides}
                        </span>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* ---------------- recent rides table ---------------- */}
        <Card className="gap-0 rounded-lg py-0">
          <CardHeader className="py-4">
            <h2 className="font-heading-3 text-heading-3 text-foreground leading-none">
              Your recent rides
            </h2>
            <CardDescription className="text-xs">
              Billed to CityWheels pass · week of Aug 11
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Time
                  </TableHead>
                  <TableHead className="h-8 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Route
                  </TableHead>
                  <TableHead className="h-8 text-end text-[11px] uppercase tracking-wider text-muted-foreground">
                    Duration
                  </TableHead>
                  <TableHead className="h-8 text-end text-[11px] uppercase tracking-wider text-muted-foreground">
                    Fare
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((r) => (
                  <TableRow key={r.time}>
                    <TableCell className="py-2.5 font-code text-xs tabular-nums">
                      {r.time}
                    </TableCell>
                    <TableCell className="py-2.5 text-[13px]">
                      {r.from}
                      <span className="mx-1.5 text-muted-foreground/60">→</span>
                      {r.to}
                    </TableCell>
                    <TableCell className="py-2.5 text-end font-code text-xs tabular-nums">
                      {r.dur}
                    </TableCell>
                    <TableCell className="py-2.5 text-end font-code text-xs tabular-nums">
                      {r.fare}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ---------------- footer ---------------- */}
        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="text-[11px] text-muted-foreground">
            City of Arborview · open bike-share feed
          </span>
          <span className="font-code text-[11px] text-muted-foreground">
            updated 09:41 · map data CC-BY
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
