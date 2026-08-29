"use client";

/**
 * EVAL page — scroll-area p3 — conference event ticketing — 834x1112 light (tablet)
 *
 * "Forge Conf 2026" attendee ticketing console. Three bounded ScrollAreas with
 * type="always" so the styled monochrome thumbs render in the static capture:
 * the horizontal pass-tier strip, the Day-1 schedule list (left), and the
 * attendee chat history pane (right).
 * Other ui/* components: Card, Badge, Button, Avatar, Progress, Breadcrumb.
 */

import {
  ArrowRight,
  BadgeCheck,
  Check,
  Hammer,
  MessageSquare,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PASSES: {
  name: string;
  price: string;
  status: "selected" | "soldout" | "open";
  note?: string;
  includes: string[];
}[] = [
  {
    name: "Early bird",
    price: "$349",
    status: "soldout",
    includes: ["All talks · Sep 17–18", "Expo floor", "Lunch both days"],
  },
  {
    name: "Standard",
    price: "$449",
    status: "selected",
    includes: [
      "All talks · Sep 17–18",
      "Expo floor",
      "Lunch both days",
      "Rooftop social",
    ],
  },
  {
    name: "Plus",
    price: "$649",
    status: "open",
    note: "12 of 30 seats left",
    includes: [
      "Everything in Standard",
      "Workshop day · Sep 16",
      "Reserved main-stage seating",
    ],
  },
  {
    name: "Workshop bundle",
    price: "$799",
    status: "open",
    includes: [
      "Two hands-on workshops",
      "Rust at the edge · Design tokens",
      "All talks · Sep 17–18",
    ],
  },
  {
    name: "Patron",
    price: "$999",
    status: "open",
    includes: [
      "Everything in Plus",
      "Speaker dinner · Sep 17",
      "Funds the scholarship fund",
    ],
  },
];

const DAY_ONE: {
  time: string;
  title: string;
  speaker: string;
  room: string;
  track: string;
}[] = [
  { time: "09:00", title: "Opening keynote: the state of the web", speaker: "Ada Iwu", room: "Hall A", track: "Keynote" },
  { time: "10:15", title: "Rust at the edge: rewriting our ingest pipeline", speaker: "Marcus Lehmann", room: "Studio 2", track: "Platform" },
  { time: "11:30", title: "Design tokens that scale to 40 teams", speaker: "Sofia Reyes", room: "Studio 3", track: "DX" },
  { time: "12:30", title: "Lunch · expo floor opens", speaker: "—", room: "Courtyard", track: "Break" },
  { time: "13:30", title: "Accessible by default: auditing 200 components", speaker: "Priya Nair", room: "Hall B", track: "A11y" },
  { time: "14:45", title: "Edge runtimes, benchmarked honestly", speaker: "Yuki Tanaka", room: "Studio 2", track: "Perf" },
  { time: "16:00", title: "Panel: shipping less, better", speaker: "5 speakers", room: "Hall A", track: "Panel" },
  { time: "17:15", title: "Lightning talks × 5", speaker: "Community", room: "Hall B", track: "Lightning" },
  { time: "18:30", title: "Rooftop social · drinks & city view", speaker: "—", room: "Terrace", track: "Social" },
  { time: "19:30", title: "Hallway track: demos & mentoring", speaker: "—", room: "Expo floor", track: "Social" },
];

const CHAT: {
  who: string;
  initials: string;
  when: string;
  msg: string;
  organizer?: boolean;
}[] = [
  {
    who: "Forge Conf",
    initials: "FC",
    when: "07:30",
    msg: "Final schedule posted. Live captions on all main-stage talks, and quiet rooms on level 2.",
    organizer: true,
  },
  {
    who: "Ines Valdez",
    initials: "IV",
    when: "07:58",
    msg: "The rooftop social is worth staying for — the view over the river is unreal.",
  },
  {
    who: "Chris Okafor",
    initials: "CO",
    when: "08:15",
    msg: "First Forge! How early should I line up for the keynote on Thursday?",
  },
  {
    who: "Forge Conf",
    initials: "FC",
    when: "08:39",
    msg: "Doors at 08:15 — Hall A seats 900, no need to queue before 08:00.",
    organizer: true,
  },
  {
    who: "Meg Tanaka",
    initials: "MT",
    when: "08:41",
    msg: "Any quiet room for taking calls between sessions?",
  },
  {
    who: "Forge Conf",
    initials: "FC",
    when: "08:55",
    msg: "Badge pickup opens 08:00 at the SW lobby — bring the QR code from this page.",
    organizer: true,
  },
  {
    who: "Ravi Patel",
    initials: "RP",
    when: "09:07",
    msg: "Workshop seats are capped at 30 and they always sell out — grab one before Friday.",
  },
  {
    who: "Dana Kessler",
    initials: "DK",
    when: "09:12",
    msg: "Is the Sep 16 workshop day recorded? I can only join remotely that day.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* masthead */}
        <header className="flex h-16 flex-none items-center justify-between border-b border-default-border bg-card px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-background">
              <Hammer className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">
                Forge Conf 2026
              </p>
              <p className="font-code text-[10px] text-muted-foreground">
                Sep 17–18 · Portland, OR
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="font-code text-xs">KH</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* breadcrumb + hero */}
        <div className="flex-none px-5 pt-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Forge Conf 2026</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Tickets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Choose your pass</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <h1 className="font-heading-1 text-heading-1 text-foreground">
                Choose your pass
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Two days, forty sessions, one rooftop social — all talks
                recorded for ticket holders.
              </p>
            </div>
            <span className="font-code text-[10px] text-muted-foreground">
              prices in USD · incl. fees
            </span>
          </div>
        </div>

        {/* pass-tier strip — horizontal ScrollArea */}
        <section className="flex-none pt-4" aria-label="Pass tiers">
          <ScrollArea type="always">
            <div className="flex w-max gap-3 px-5 pt-1 pb-5">
              {PASSES.map((pass) => (
                <Card
                  key={pass.name}
                  className={
                    pass.status === "selected"
                      ? "w-[250px] gap-0 border-primary py-4"
                      : pass.status === "soldout"
                        ? "w-[250px] gap-0 py-4 opacity-70"
                        : "w-[250px] gap-0 py-4"
                  }
                >
                  <div className="flex items-baseline justify-between px-4">
                    <h2 className="font-heading-3 text-heading-3 text-foreground">
                      {pass.name}
                    </h2>
                    {pass.status === "selected" && (
                      <Badge>
                        <BadgeCheck />
                        Selected
                      </Badge>
                    )}
                    {pass.status === "soldout" && (
                      <Badge variant="secondary">Sold out</Badge>
                    )}
                    {pass.note && (
                      <span className="font-code text-[10px] text-warning-600">
                        {pass.note}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 px-4 leading-none">
                    <span
                      className={
                        pass.status === "soldout"
                          ? "font-code text-2xl tabular-nums text-muted-foreground"
                          : "font-code text-2xl tabular-nums"
                      }
                    >
                      {pass.price}
                    </span>
                    <span className="ml-1.5 font-code text-[10px] text-muted-foreground">
                      / person
                    </span>
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5 px-4">
                    {pass.includes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-3.5 flex-none" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 px-4">
                    <Button
                      className="w-full rounded-sm"
                      size="sm"
                      variant={
                        pass.status === "selected"
                          ? "default"
                          : pass.status === "soldout"
                            ? "outline"
                            : "outline"
                      }
                      disabled={pass.status === "soldout"}
                    >
                      {pass.status === "selected"
                        ? "Selected"
                        : pass.status === "soldout"
                          ? "Sold out"
                          : "Select pass"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar
              orientation="horizontal"
              className="border-t-default-border"
            />
          </ScrollArea>
        </section>

        {/* schedule + order/chat grid — two bounded vertical ScrollAreas */}
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-4 px-5 pb-3">
          {/* day one schedule */}
          <section className="flex min-h-0 flex-col" aria-label="Day one schedule">
            <div className="flex flex-none items-baseline justify-between pb-2">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                Day 1 · Thu 17 Sep
              </h2>
              <span className="font-code text-[10px] text-muted-foreground">
                10 slots · 3 tracks
              </span>
            </div>
            <ScrollArea
              type="always"
              className="min-h-0 flex-1 rounded-lg border border-default-border bg-card"
              aria-label="Day one session list"
            >
              <ul className="divide-y divide-default-border pb-6">
                {DAY_ONE.map((s) => (
                  <li
                    key={`${s.time}-${s.title}`}
                    className="flex items-start gap-3 py-3 pl-4 pr-6"
                  >
                    <span className="w-10 flex-none pt-0.5 font-code text-xs tabular-nums text-muted-foreground">
                      {s.time}
                    </span>
                    <div className="min-w-0 flex-1 leading-snug">
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="mt-0.5 font-code text-[10px] text-muted-foreground">
                        {s.speaker} · {s.room}
                      </p>
                    </div>
                    <Badge variant="outline" className="mt-0.5 flex-none">
                      {s.track}
                    </Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </section>

          {/* order summary + attendee chat */}
          <section className="flex min-h-0 flex-col gap-4">
            <Card className="flex-none gap-0 py-4">
              <div className="flex items-baseline justify-between px-4">
                <h2 className="font-heading-3 text-heading-3 text-foreground">
                  Order summary
                </h2>
                <span className="font-code text-[10px] text-muted-foreground">
                  1 attendee
                </span>
              </div>
              <div className="mt-2.5 flex flex-col gap-1.5 px-4 font-code text-xs tabular-nums">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Standard pass × 1</span>
                  <span>$449.00</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>$13.47</span>
                </p>
                <p className="mt-1 flex items-baseline justify-between border-t border-default-border pt-2">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-base">$462.47</span>
                </p>
              </div>
              <div className="mt-3 px-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-muted-foreground">
                    Standard tier capacity
                  </p>
                  <p className="font-code text-[10px] tabular-nums text-muted-foreground">
                    72% sold
                  </p>
                </div>
                <Progress value={72} className="mt-1.5 h-1.5" aria-label="Standard tier capacity" />
              </div>
              <div className="mt-3.5 px-4">
                <Button className="w-full rounded-sm">
                  Continue to checkout <ArrowRight />
                </Button>
                <p className="mt-2 text-center font-code text-[10px] text-muted-foreground">
                  Refundable until Aug 20 · invoice available
                </p>
              </div>
            </Card>

            {/* attendee chat history pane */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex flex-none items-center justify-between pb-2">
                <h2 className="flex items-center gap-2 font-heading-3 text-heading-3 text-foreground">
                  <MessageSquare className="size-4" />
                  Attendee chat
                </h2>
                <span className="font-code text-[10px] text-muted-foreground">
                  #general · 1.2k online
                </span>
              </div>
              <ScrollArea
                type="always"
                className="min-h-0 flex-1 rounded-lg border border-default-border bg-card"
                aria-label="Attendee chat history"
              >
                <ul className="divide-y divide-default-border pb-6">
                  {CHAT.map((m) => (
                    <li
                      key={`${m.who}-${m.when}`}
                      className="flex gap-3 py-2.5 pl-4 pr-6"
                    >
                      <Avatar size="sm" className="mt-0.5">
                        <AvatarFallback className="font-code text-[10px]">
                          {m.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 leading-snug">
                        <p className="flex items-center gap-2">
                          <span className="text-sm font-medium">{m.who}</span>
                          {m.organizer && (
                            <Badge variant="secondary">Team</Badge>
                          )}
                          <span className="font-code text-[10px] text-muted-foreground">
                            {m.when}
                          </span>
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {m.msg}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </section>
        </div>

        {/* footer */}
        <footer className="flex h-9 flex-none items-center justify-between border-t border-default-border bg-card px-5">
          <span className="font-code text-[10px] text-muted-foreground">
            forgeconf.dev · code of conduct · hello@forgeconf.dev
          </span>
          <span className="font-code text-[10px] text-muted-foreground">
            Secure checkout · refunds until Aug 20
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
