"use client";

/**
 * EVAL page — progress p1 — HR onboarding checklist for new hires — 430x932 dark
 *
 * Phone app for "Meridian Labs People Ops": the Day-4 onboarding screen for a
 * new hire (Maya Chen, Product Designer). Progress is the spine of the page —
 * overall completion hero with mono percentage, four labeled onboarding-track
 * rows (paperwork / IT / team / compliance) with mono counts + percentages,
 * and a benefits-enrollment quota card with a deadline. A warning alert flags
 * the I-9 verification due tomorrow (genuine warning semantics).
 * Other ui/* components: Card, Badge, Button, Checkbox, Alert, Avatar.
 */

import {
  Bell,
  CalendarCheck,
  ClipboardList,
  House,
  TriangleAlert,
  UserRound,
  Users,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const TRACKS = [
  { label: "Paperwork", done: 12, total: 12, value: 100 },
  { label: "IT & access", done: 9, total: 12, value: 75 },
  { label: "Team integration", done: 3, total: 9, value: 33 },
  { label: "Compliance training", done: 1, total: 6, value: 17 },
];

const TODAY = [
  { label: "Sign equipment agreement", meta: "done 09:15", done: true },
  { label: "Set up password manager", meta: "done 10:02", done: true },
  { label: "1:1 with Jonas Reuter", meta: "14:00 · room 4F-12", done: false },
  {
    label: "Security training · module 2 of 4",
    meta: "due today 18:00",
    done: false,
  },
];

const NAV = [
  { icon: House, label: "Home", active: true },
  { icon: ClipboardList, label: "Tasks", active: false },
  { icon: Users, label: "Team", active: false },
  { icon: UserRound, label: "Profile", active: false },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* app bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-default-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <CalendarCheck className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">
                Meridian Labs
              </p>
              <p className="font-code text-[10px] text-muted-foreground">
                People Ops · Onboarding
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Notifications"
              className="relative"
            >
              <Bell />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <Avatar className="size-8 border border-default-border">
              <AvatarFallback className="font-code text-xs">MC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-3 px-4 pt-3">
          {/* page heading — serif reading role */}
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Welcome, Maya
            </h1>
            <p className="mt-0.5 font-code text-xs text-muted-foreground">
              Start 02 Mar 2026 · Day 4 of 10 · Mgr Jonas Reuter
            </p>
          </div>

          {/* I-9 warning — semantic color only where meaning demands it */}
          <Alert className="border-warning-500/30">
            <TriangleAlert className="text-warning-500" />
            <AlertTitle className="text-warning-500">
              I-9 verification due tomorrow
            </AlertTitle>
            <AlertDescription className="text-xs">
              Bring your passport to the People Ops desk, 4th floor, before
              Fri 06 Mar 17:00.
            </AlertDescription>
          </Alert>

          {/* overall completion hero */}
          <Card className="gap-0 py-4">
            <CardContent className="px-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading-3 text-heading-3 text-foreground">
                    Onboarding progress
                  </h2>
                  <p className="font-code text-[10px] text-muted-foreground">
                    21 of 31 tasks complete
                  </p>
                </div>
                <Badge variant="secondary">On track</Badge>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <p className="font-code text-4xl leading-none tabular-nums">
                  68%
                </p>
                <p className="text-right font-code text-[10px] leading-snug text-muted-foreground">
                  next milestone
                  <br />
                  Week-1 review · Fri 06 Mar
                </p>
              </div>

              <Progress
                value={68}
                className="mt-3 h-2.5"
                aria-label="Overall onboarding completion"
              />
              <div className="mt-2 flex justify-between font-code text-[10px] text-muted-foreground">
                <span>Day 1</span>
                <span>Day 5</span>
                <span>Day 10</span>
              </div>
            </CardContent>
          </Card>

          {/* today's checklist */}
          <Card className="gap-0 overflow-hidden py-0">
            <div className="flex items-baseline justify-between px-4 pt-3.5">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                Today
              </h2>
              <span className="font-code text-[10px] text-muted-foreground">
                Thu 05 Mar · 2 of 4 done
              </span>
            </div>
            <div className="mt-2 divide-y divide-default-border">
              {TODAY.map((item) => (
                <label
                  key={item.label}
                  className="flex cursor-pointer items-center gap-3 px-4 py-2.5"
                >
                  <Checkbox
                    defaultChecked={item.done}
                    aria-label={item.label}
                  />
                  <span
                    className={
                      item.done
                        ? "flex-1 truncate text-sm text-muted-foreground line-through"
                        : "flex-1 truncate text-sm"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="font-code text-[10px] whitespace-nowrap text-muted-foreground">
                    {item.meta}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* onboarding tracks — labeled progress rows with mono percentages */}
          <Card className="gap-0 py-4">
            <div className="flex items-baseline justify-between px-4">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                Onboarding tracks
              </h2>
              <span className="font-code text-[10px] text-muted-foreground">
                4 tracks
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3.5 px-4">
              {TRACKS.map((track) => (
                <div key={track.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-sm">{track.label}</p>
                    <p className="font-code text-xs whitespace-nowrap tabular-nums text-muted-foreground">
                      <span className="text-foreground">{track.value}%</span>
                      {" · "}
                      {track.done}/{track.total}
                    </p>
                  </div>
                  <Progress
                    value={track.value}
                    className="mt-1.5 h-1.5"
                    aria-label={`${track.label} completion`}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* benefits enrollment quota */}
          <Card className="gap-0 py-4">
            <CardContent className="px-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading-3 text-heading-3 text-foreground">
                    Benefits enrollment
                  </h2>
                  <p className="font-code text-[10px] text-muted-foreground">
                    Window closes 16 Mar · step 2 of 5
                  </p>
                </div>
                <Button size="sm">Continue</Button>
              </div>
              <Progress
                value={40}
                className="mt-3 h-1.5"
                aria-label="Benefits enrollment progress"
              />
              <p className="mt-2 font-code text-[10px] text-muted-foreground">
                Medical + dental selected · vision, FSA, 401(k) remaining
              </p>
            </CardContent>
          </Card>
        </main>

        {/* bottom tab bar — in-flow surface: flat panel + hairline, no glass */}
        <nav className="mt-3 flex flex-none items-stretch justify-around border-t border-default-border bg-card px-2 py-2">
          {NAV.map((item) => (
            <span
              key={item.label}
              className={
                item.active
                  ? "flex flex-col items-center gap-1 rounded-sm px-3 py-1 text-[10px] font-medium text-foreground"
                  : "flex flex-col items-center gap-1 rounded-sm px-3 py-1 text-[10px] text-muted-foreground"
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </span>
          ))}
        </nav>
      </div>
    </EvalShell>
  );
}
