"use client";

/**
 * EVAL page — textarea p1 — gym workout tracker — 1920x1080 dark
 *
 * "Ironbook" strength-training session logger (5/3/1 · block 3, week 3).
 * Textarea is the spine of the screen: live session notes with a character
 * counter, a PR-attempt note that failed verification (invalid state), and a
 * locked read-only coach-notes field. Co-stars: Card, Table, Badge, Button,
 * Progress, Avatar.
 */

import * as React from "react";
import { Check, Dumbbell, Trophy, X } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const WEEK = [
  { day: "Mon 09", label: "Push A", meta: "6,240 kg", state: "done" },
  { day: "Tue 10", label: "Pull A", meta: "7,180 kg", state: "done" },
  { day: "Wed 11", label: "Rest", meta: "—", state: "done" },
  { day: "Thu 12", label: "Legs A", meta: "in session", state: "active" },
  { day: "Fri 13", label: "Push B", meta: "planned", state: "planned" },
  { day: "Sat 14", label: "Pull B", meta: "planned", state: "planned" },
  { day: "Sun 15", label: "Rest", meta: "—", state: "planned" },
] as const;

const SETS = [
  { set: 1, weight: "160.0", reps: "5", rpe: "7.0", state: "done" },
  { set: 2, weight: "160.0", reps: "5", rpe: "7.5", state: "done" },
  { set: 3, weight: "170.0", reps: "3", rpe: "8.5", state: "done" },
  { set: 4, weight: "177.5", reps: "1", rpe: "9.5", state: "done" },
  { set: 5, weight: "182.5", reps: "0", rpe: "—", state: "missed" },
] as const;

const LIFTS = [
  { lift: "Squat", pct: 86 },
  { lift: "Bench", pct: 74 },
  { lift: "Deadlift", pct: 91 },
  { lift: "Overhead", pct: 68 },
];

const COACH_NOTES =
  "Marcus — week 3 intensity is exactly on script, so resist adding volume. Bar path drifts forward once we pass 170: cue the two-count eccentric and drive through mid-foot. I would rather bank a clean 182.5 than grind a shaky 187.5. Deload week follows, so empty the tank today. — D.K.";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [notes, setNotes] = React.useState(
    "Top single moved clean — 0.24 m/s off the pins. Rep 3 of the back-offs drifted forward when I rushed the descent; resetting the brace fixed it. Left knee sleeve felt tight in warm-ups, worth watching before deadlift day."
  );

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* Week sidebar — flat panel + hairline, no glass */}
        <aside className="flex w-60 flex-none flex-col border-r border-default-border bg-card">
          <div className="flex h-14 flex-none items-center gap-2.5 border-b border-default-border px-4">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-background">
              <Dumbbell className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Ironbook</p>
              <p className="font-code text-[10px] text-muted-foreground">
                5/3/1 · block 3 · week 3
              </p>
            </div>
          </div>

          <nav className="flex-1 px-2 py-3">
            <p className="px-2 pb-2 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              This week
            </p>
            {WEEK.map((d) => (
              <div
                key={d.day}
                className={
                  d.state === "active"
                    ? "flex items-center justify-between rounded-sm bg-muted px-2 py-2"
                    : "flex items-center justify-between rounded-sm px-2 py-2"
                }
              >
                <span className="flex min-w-0 items-baseline gap-2">
                  <span className="font-code text-[10px] text-muted-foreground">
                    {d.day}
                  </span>
                  <span className="truncate text-sm">{d.label}</span>
                </span>
                <span
                  className={
                    d.state === "active"
                      ? "font-code text-[10px] whitespace-nowrap"
                      : "font-code text-[10px] whitespace-nowrap text-muted-foreground"
                  }
                >
                  {d.meta}
                </span>
              </div>
            ))}
          </nav>

          <div className="flex flex-none items-center gap-2.5 border-t border-default-border p-3">
            <Avatar>
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium">Marcus Reyes</p>
              <p className="font-code text-[10px] text-muted-foreground">
                82.5 kg · 34 y · sq 1RM 208.5
              </p>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-14 flex-none items-center justify-between gap-6 border-b border-default-border px-6">
            <div className="min-w-0">
              <h1 className="truncate font-heading-2 text-heading-2 text-foreground">
                Legs A — squat day
              </h1>
              <p className="font-code text-[10px] text-muted-foreground">
                Thu 12 Feb 2026 · session 14 of 16 · Iron Pit South · coach
                Dana K.
              </p>
            </div>
            <div className="flex flex-none items-center gap-3">
              <span className="font-code text-[10px] text-muted-foreground">
                54:08 elapsed · 68 min planned
              </span>
              <Button size="sm">Finish session</Button>
            </div>
          </header>

          {/* Dashboard grid */}
          <main className="grid min-h-0 flex-1 grid-cols-12 grid-rows-2 gap-4 p-6">
            {/* Session log — working sets + live session notes */}
            <Card className="col-span-7 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <CardTitle>Back squat — 5/3/1 top set</CardTitle>
                <CardAction>
                  <span className="font-code text-[10px] text-muted-foreground">
                    5 working sets · 6,120 kg
                  </span>
                </CardAction>
              </div>

              <div className="mt-3 px-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8 w-14 text-xs">Set</TableHead>
                      <TableHead className="h-8 text-xs">
                        Weight (kg)
                      </TableHead>
                      <TableHead className="h-8 text-xs">Reps</TableHead>
                      <TableHead className="h-8 text-xs">RPE</TableHead>
                      <TableHead className="h-8 text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SETS.map((s) => (
                      <TableRow key={s.set}>
                        <TableCell className="py-2 font-code text-[13px] text-muted-foreground">
                          0{s.set}
                        </TableCell>
                        <TableCell className="py-2 font-code text-[13px] tabular-nums">
                          {s.weight}
                        </TableCell>
                        <TableCell className="py-2 font-code text-[13px] tabular-nums">
                          {s.reps}
                        </TableCell>
                        <TableCell className="py-2 font-code text-[13px] tabular-nums text-muted-foreground">
                          {s.rpe}
                        </TableCell>
                        <TableCell className="py-2">
                          {s.state === "missed" ? (
                            <span className="inline-flex items-center gap-1.5 font-code text-[11px] text-destructive">
                              <X className="size-3" />
                              failed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 font-code text-[11px] text-muted-foreground">
                              <Check className="size-3 text-success-500" />
                              logged
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-auto px-5 pt-4">
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="session-notes"
                    className="text-sm font-medium"
                  >
                    Session notes
                  </label>
                  <span className="font-code text-[10px] text-muted-foreground">
                    {notes.length} / 600
                  </span>
                </div>
                <Textarea
                  id="session-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 600))}
                  aria-describedby="session-notes-desc"
                  className="mt-2 resize-none"
                  placeholder="How did the bar move? Cues that worked, aches to watch…"
                />
                <p
                  id="session-notes-desc"
                  className="mt-2 text-xs text-muted-foreground"
                >
                  Auto-saves to the session · surfaces on coach review before
                  Monday.
                </p>
              </div>
            </Card>

            {/* PR attempt — invalid note blocked verification */}
            <Card className="col-span-5 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                  <Trophy className="size-4 text-muted-foreground" />
                  <CardTitle>182.5 kg attempt</CardTitle>
                </div>
                <CardAction>
                  <Badge variant="outline">Pending verification</Badge>
                </CardAction>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 px-5">
                {[
                  ["Exercise", "Back squat"],
                  ["Attempted", "182.5 kg × 1"],
                  ["Bar speed", "0.24 m/s"],
                  ["Est. 1RM", "208.5 kg"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">{k}</span>
                    <span className="font-code text-[13px]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 px-5">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="pr-notes" className="text-sm font-medium">
                    Attempt notes
                  </label>
                  <span className="font-code text-[10px] text-destructive">
                    0 / 240
                  </span>
                </div>
                <Textarea
                  id="pr-notes"
                  aria-invalid
                  aria-describedby="pr-notes-error"
                  placeholder="Depth felt deep, bar slowed just past mid-knee…"
                  className="mt-2 min-h-14 resize-none"
                />
                <p id="pr-notes-error" className="mt-2 text-xs text-destructive">
                  A note is required to verify the PR — describe bar speed,
                  depth and stance.
                </p>
              </div>

              <div className="mt-auto px-5">
                <div className="grid grid-cols-3 gap-2 border-t border-default-border pt-3">
                  {["Side video", "Spotter set", "Belt on"].map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 font-code text-[10px] text-muted-foreground"
                    >
                      <Check className="size-3 text-success-500" />
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="flex-1">
                    Log personal record
                  </Button>
                  <Button size="sm" variant="ghost">
                    Discard
                  </Button>
                </div>
              </div>
            </Card>

            {/* Coach notes — locked / read-only */}
            <Card className="col-span-5 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <CardTitle>Coach notes — Dana K.</CardTitle>
                <CardAction>
                  <span className="font-code text-[10px] text-muted-foreground">
                    09 Feb · block 3 review
                  </span>
                </CardAction>
              </div>
              <div className="mt-4 px-5">
                <label htmlFor="coach-notes" className="text-sm font-medium">
                  Block 3 guidance
                </label>
                <Textarea
                  id="coach-notes"
                  disabled
                  readOnly
                  value={COACH_NOTES}
                  className="mt-2 max-h-36 overflow-y-auto resize-none leading-relaxed"
                />
              </div>
              <p className="mt-auto px-5 pt-3 font-code text-[10px] text-muted-foreground">
                Read-only — notes lock after each weekly review.
              </p>
            </Card>

            {/* Block progression */}
            <Card className="col-span-7 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <CardTitle>Block 3 · progression</CardTitle>
                <CardAction>
                  <span className="font-code text-[10px] text-muted-foreground">
                    week 3 of 4
                  </span>
                </CardAction>
              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-default-border px-5">
                {[
                  ["28,540 kg", "volume to date"],
                  ["+9.2%", "vs block 2"],
                  ["2", "sessions left"],
                ].map(([v, l]) => (
                  <div key={l} className="px-4 first:pl-0 last:pr-0">
                    <p className="font-code text-xl leading-none tabular-nums">
                      {v}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3.5 px-5">
                {LIFTS.map((l) => (
                  <div key={l.lift}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm">{l.lift}</span>
                      <span className="font-code text-xs tabular-nums text-muted-foreground">
                        {l.pct}% of target
                      </span>
                    </div>
                    <Progress className="mt-1.5 h-1.5" value={l.pct} />
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-default-border px-5 pt-3">
                <span className="inline-flex items-center gap-2 font-code text-[11px] text-muted-foreground">
                  <Trophy className="size-3.5 text-success-500" />
                  Last verified PR — deadlift 220.0 kg · 05 Feb
                </span>
                <Badge
                  variant="outline"
                  className="border-success-500/40 text-success-400"
                >
                  Verified
                </Badge>
              </div>
            </Card>
          </main>

          {/* Status footer */}
          <footer className="flex h-9 flex-none items-center justify-between border-t border-default-border px-6 font-code text-[10px] text-muted-foreground">
            <span>
              <span className="text-success-500">●</span> Synced 18:42 · 18
              sets logged this block · knee sleeve flagged for review
            </span>
            <span>Next: Push B — Fri 13 Feb · 07:30</span>
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
