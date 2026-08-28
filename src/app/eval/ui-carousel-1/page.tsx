"use client";

/**
 * EVAL page — carousel p1 — insurance claims portal — 1280x800 dark
 *
 * Meridian Mutual "Adjuster console" — a claim review workstation.
 * - ui:carousel → hero evidence-photo gallery (full-bleed slides) + a
 *   "comparable settlements" card carousel (1/3 basis, snap)
 * - other family members: card, badge, button, table, progress, tabs
 */

import React from "react";
import {
  Bell,
  CircleCheck,
  Clock,
  FileText,
  MessageSquare,
  Paperclip,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

type Photo = {
  seed: string;
  label: string;
  meta: string;
  tag: "Verified" | "Claimant" | "Pending";
};

const evidence: Photo[] = [
  { seed: "claim7", label: "Rear quarter panel — dent cluster", meta: "08-14 09:12 · K. Osei", tag: "Verified" },
  { seed: "claim14", label: "Trunk lid — paint chips along seam", meta: "08-14 09:19 · K. Osei", tag: "Verified" },
  { seed: "claim22", label: "Roof panel — hail strike pattern", meta: "08-14 09:27 · K. Osei", tag: "Verified" },
  { seed: "claim31", label: "Left rear door — crease dent", meta: "08-14 09:34 · K. Osei", tag: "Verified" },
  { seed: "claim45", label: "Hood — surface dents, 11 strikes", meta: "08-15 18:02 · claimant", tag: "Claimant" },
  { seed: "claim58", label: "Odometer verification — 41,208 mi", meta: "08-14 09:41 · K. Osei", tag: "Verified" },
];

type Comparable = {
  id: string;
  vehicle: string;
  amount: string;
  status: "Paid" | "Approved" | "In review";
  days: number;
};

const comparables: Comparable[] = [
  { id: "CLM-19344", vehicle: "2020 Subaru Outback", amount: "$4,310", status: "Paid", days: 12 },
  { id: "CLM-20119", vehicle: "2019 Toyota RAV4", amount: "$5,060", status: "Paid", days: 15 },
  { id: "CLM-20486", vehicle: "2021 Honda CR-V", amount: "$3,940", status: "Approved", days: 9 },
  { id: "CLM-20903", vehicle: "2022 Ford Escape", amount: "$5,590", status: "In review", days: 4 },
  { id: "CLM-21017", vehicle: "2020 Mazda CX-5", amount: "$4,730", status: "Paid", days: 11 },
];

const lineItems = [
  { item: "Quarter panel replacement", qty: "1 pc", amount: "$2,180" },
  { item: "Paint & blend, two panels", qty: "1 job", amount: "$1,392" },
  { item: "Hail paintless repair", qty: "roof", amount: "$1,248" },
];

const notes = [
  {
    author: "K. Osei · Field inspection",
    date: "Aug 15",
    body: "Strike count matches the Aug 12 storm cells over Arapahoe County. No pre-existing damage on the roof.",
  },
  {
    author: "D. Reyes · Desk adjuster",
    date: "Aug 16",
    body: "Reserve raised to $7,000 after the second shop estimate. Comparables support $4.3–5.1K.",
  },
];

const activity: { time: string; event: string; icon: LucideIcon }[] = [
  { time: "08-16 11:20", event: "Reserve increased to $7,000", icon: FileText },
  { time: "08-15 18:02", event: "Claimant uploaded 1 photo", icon: Paperclip },
  { time: "08-15 09:55", event: "Field report signed by K. Osei", icon: CircleCheck },
  { time: "08-14 08:31", event: "Claim opened via mobile app", icon: Clock },
];

const fileRows = [
  { k: "Claimant", v: "Dolores Ramirez" },
  { k: "Vehicle", v: "2021 Subaru Outback" },
  { k: "Policy", v: "PA-88231 · Collision", code: true },
  { k: "Filed", v: "2026-08-14 08:31", code: true },
  { k: "Deductible", v: "$1,000", code: true },
];

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
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ---------------- header ---------------- */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">Meridian Mutual</p>
              <p className="mt-1 text-[11px] leading-none text-muted-foreground">
                Adjuster console · Denver region
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-code text-xs text-foreground/70 lg:inline">
              CLM-20871 · est. payout $3,820
            </span>
            <Button size="sm">Approve payout</Button>
            <Button size="sm" variant="outline">
              Request docs
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Notifications">
              <Bell />
            </Button>
            <span className="flex size-8 items-center justify-center rounded-full border bg-muted font-code text-xs">
              DR
            </span>
          </div>
        </header>

        {/* ---------------- main ---------------- */}
        <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_332px] grid-rows-[minmax(0,1fr)] gap-6 overflow-hidden px-6 py-4">
          {/* ---- left: evidence gallery + comparables ---- */}
          <div className="flex min-h-0 flex-col gap-4 overflow-hidden">
            <div className="flex shrink-0 flex-wrap items-end justify-between gap-2">
              <div>
                <h1 className="font-heading-1 text-heading-1 text-foreground">
                  Hail damage — rear and roof panels
                </h1>
                <p className="mt-1 flex items-center gap-2 font-code text-xs text-foreground/60">
                  CLM-20871
                  <span className="text-foreground/30">·</span>
                  PA-88231
                  <span className="text-foreground/30">·</span>
                  filed 2026-08-14
                </p>
              </div>
              <Badge variant="secondary">
                <Clock className="size-3" />
                In review · day 4
              </Badge>
            </div>

            {/* hero evidence carousel */}
            <section className="flex shrink-0 flex-col">
              <div className="flex items-baseline justify-between px-1 pb-2">
                <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Damage documentation
                </h2>
                <span className="font-code text-xs tabular-nums text-foreground/70">
                  {current} / {count}
                </span>
              </div>
              <div className="px-12">
                <Carousel
                  setApi={setApi}
                  opts={{ align: "start" }}
                  aria-label="Damage documentation photos"
                >
                  <CarouselContent className="-ms-2">
                    {evidence.map((photo) => (
                      <CarouselItem key={photo.seed} className="ps-2">
                        <figure className="flex flex-col gap-2">
                          <div className="h-[352px] overflow-hidden rounded-lg border">
                            <img
                              src={`https://picsum.photos/seed/${photo.seed}/880/520`}
                              alt={photo.label}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <figcaption className="flex items-center justify-between gap-3 px-1">
                            <span className="flex min-w-0 items-baseline gap-2">
                              <span className="truncate text-sm font-medium">
                                {photo.label}
                              </span>
                              <span className="shrink-0 font-code text-[11px] text-foreground/60">
                                {photo.meta}
                              </span>
                            </span>
                            <Badge
                              variant={photo.tag === "Pending" ? "outline" : "secondary"}
                              className="shrink-0"
                            >
                              {photo.tag}
                            </Badge>
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

            {/* comparable settlements carousel */}
            <section className="shrink-0">
              <div className="flex items-baseline justify-between px-1 pb-2">
                <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Comparable settlements · hail, Colorado
                </h2>
                <span className="font-code text-[11px] text-foreground/70">
                  5 claims
                </span>
              </div>
              <div className="px-12">
                <Carousel opts={{ align: "start" }} aria-label="Comparable settlements">
                  <CarouselContent className="-ms-3">
                    {comparables.map((c) => (
                      <CarouselItem key={c.id} className="ps-3 md:basis-1/3">
                        <Card className="gap-0 rounded-lg py-0">
                          <CardContent className="flex flex-col gap-1.5 p-3.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-code text-xs text-foreground/70">
                                {c.id}
                              </span>
                              <Badge
                                variant={c.status === "In review" ? "outline" : "secondary"}
                                className="px-1.5 py-0 text-[10px]"
                              >
                                {c.status}
                              </Badge>
                            </div>
                            <span className="truncate text-[13px]">{c.vehicle}</span>
                            <div className="flex items-baseline justify-between">
                              <span className="font-code text-lg font-semibold tabular-nums">
                                {c.amount}
                              </span>
                              <span className="font-code text-[11px] text-foreground/70">
                                {c.days}d to close
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-10" />
                  <CarouselNext className="-right-10" />
                </Carousel>
              </div>
            </section>
          </div>

          {/* ---- right: claim file, payout, notes ---- */}
          <aside className="flex min-h-0 flex-col gap-4 overflow-hidden">
            <Card className="shrink-0 gap-0 rounded-lg py-0">
              <CardHeader className="flex-row items-center justify-between py-3.5">
                <CardTitle className="text-sm">Claim file</CardTitle>
                <CardAction>
                  <Badge variant="secondary">Collision</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col pb-3">
                {fileRows.map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-3 border-t py-1.5 text-[13px] first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <span className="text-muted-foreground">{row.k}</span>
                    <span
                      className={
                        row.code
                          ? "font-code text-xs tabular-nums"
                          : "font-medium"
                      }
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-between border-t py-3">
                <Button variant="outline" size="sm">
                  <FileText />
                  Full file
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare />
                  Message
                </Button>
              </CardFooter>
            </Card>

            <Card className="shrink-0 gap-0 rounded-lg py-0">
              <CardHeader className="py-3.5">
                <CardTitle className="text-sm">Payout estimate</CardTitle>
                <CardDescription className="text-xs">
                  Shop estimate vs reserve
                </CardDescription>
                <CardAction>
                  <span className="font-code text-xs tabular-nums text-foreground/70">
                    $4,820 / $7,000
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pb-4">
                <Progress value={69} aria-label="Repair estimate vs reserve" />
                <Table>
                  <TableBody>
                    {lineItems.map((li) => (
                      <TableRow key={li.item} className="last:border-0">
                        <TableCell className="py-1.5 text-[13px]">
                          {li.item}
                          <span className="ml-1.5 font-code text-[11px] text-foreground/60">
                            {li.qty}
                          </span>
                        </TableCell>
                        <TableCell className="py-1.5 text-end font-code text-xs tabular-nums">
                          {li.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t hover:bg-transparent">
                      <TableCell className="py-1.5 text-[13px] font-medium">
                        After deductible
                      </TableCell>
                      <TableCell className="py-1.5 text-end font-code text-sm font-semibold tabular-nums">
                        $3,820
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Tabs defaultValue="notes" className="min-h-0 shrink overflow-hidden">
              <TabsList className="w-full">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent
                value="notes"
                className="flex flex-col gap-3 pt-2"
              >
                {notes.map((n) => (
                  <div key={n.author} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-medium">{n.author}</span>
                      <span className="font-code text-[11px] text-foreground/60">
                        {n.date}
                      </span>
                    </div>
                    <p className="text-[13px] leading-snug text-muted-foreground">
                      {n.body}
                    </p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="activity" className="flex flex-col gap-2.5 pt-2">
                {activity.map((a) => (
                  <div key={a.time} className="flex items-center gap-2.5">
                    <a.icon className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="shrink-0 font-code text-[11px] text-foreground/70">
                      {a.time}
                    </span>
                    <span className="truncate text-[13px]">{a.event}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </aside>
        </main>

        {/* ---------------- footer ---------------- */}
        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-6">
          <span className="text-[11px] text-muted-foreground">
            Meridian Mutual · Claims workspace
          </span>
          <span className="font-code text-[11px] text-foreground/70">
            synced 14:32 EST · SLA 4d 6h remaining
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
