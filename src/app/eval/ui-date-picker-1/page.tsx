"use client"

// EVAL page — date-picker p1 — plant care reminder app — 1280x800 light
// DatePicker as the watering-schedule control: the hero "Next watering"
// picker renders OPEN (presets + single month calendar) in a dedicated
// left rail of the form so the overlay lands on its own card; a closed
// "Last repotted" picker shows a stored date; plus a time input.
// Other components: Card, Field, Button, Badge, Checkbox, Avatar,
// Progress, Separator, Tabs, Input, Textarea.

import * as React from "react"
import { addDays, format } from "date-fns"
import {
  BellIcon,
  DropletsIcon,
  SearchIcon,
  SproutIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { DatePicker } from "@/components/ui/date-picker"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const today = new Date()
const tomorrow = addDays(today, 1)
const inTwoDays = addDays(today, 2)
const repotted = new Date(today.getFullYear(), today.getMonth() - 4, 12)

const fmtShort = (d: Date) => `${format(d, "MMM d")} ·`

const plants = [
  {
    initials: "MO",
    name: "Monstera deliciosa",
    room: "Living room · large pot",
    moisture: 62,
    next: inTwoDays,
  },
  {
    initials: "FL",
    name: "Ficus lyrata",
    room: "Balcony · clay pot",
    moisture: 31,
    next: tomorrow,
  },
  {
    initials: "SN",
    name: "Sansevieria trifasciata",
    room: "Hallway · low light",
    moisture: 58,
    next: addDays(today, 6),
  },
]

const upcoming = [
  {
    id: "water-ficus",
    plant: "Ficus lyrata · balcony",
    action: "Water · 500 ml",
    when: `${fmtShort(tomorrow)} 08:00`,
    state: "due" as const,
    done: false,
  },
  {
    id: "feed-lily",
    plant: "Peace lily · study",
    action: "Feed · half-strength",
    when: `${fmtShort(addDays(today, 4))} 09:00`,
    state: "done" as const,
    done: true,
  },
  {
    id: "check-roots",
    plant: "Sansevieria · hallway",
    action: "Check roots for rot",
    when: `${fmtShort(addDays(today, -1))} 17:00`,
    state: "overdue" as const,
    done: false,
  },
]

const careLog = [
  { when: format(addDays(today, -5), "MMM d"), what: "Watered 500 ml · drained clear" },
  { when: format(addDays(today, -12), "MMM d"), what: "Rotated a quarter turn" },
  { when: format(addDays(today, -19), "MMM d"), what: "Fed 20 ml · half-strength" },
]

export default function Page() {
  const [nextWatering, setNextWatering] = React.useState<Date | undefined>(
    inTwoDays
  )
  const [lastRepotted, setLastRepotted] = React.useState<Date | undefined>(
    repotted
  )

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <SproutIcon className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3 text-foreground">
              Fernfield
            </span>
          </div>
          <Tabs defaultValue="schedule">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="schedule">Care schedule</TabsTrigger>
              <TabsTrigger value="plants">Plants</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search plants, tasks…"
                aria-label="Search plants and tasks"
                className="h-8 w-56 pl-8"
              />
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <BellIcon />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="font-code text-xs">ML</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_360px] gap-5 p-5">
          {/* Left: the scheduling form (hero) */}
          <main className="flex min-w-0 flex-col">
            <Card className="min-h-0 flex-1 gap-4 py-5">
              <CardHeader>
                <CardTitle className="font-heading-3 text-heading-3">
                  Watering schedule — Monstera deliciosa
                </CardTitle>
                <CardDescription>
                  Living room · large pot · water when the top 5 cm of soil is
                  dry
                </CardDescription>
                <CardAction>
                  <Badge variant="outline">
                    <DropletsIcon />
                    Every 7 days
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="grid min-h-0 flex-1 grid-cols-[280px_minmax(0,1fr)] gap-6 px-6">
                {/* Left rail of the form: the open picker + its landing zone */}
                <div className="flex flex-col gap-4">
                  <Field>
                    <FieldLabel htmlFor="next-watering">
                      Next watering
                    </FieldLabel>
                    <DatePicker
                      id="next-watering"
                      value={nextWatering}
                      onValueChange={setNextWatering}
                      format="EEE, MMM d, yyyy"
                      placeholder="Pick a day"
                      buttonClassName="w-full font-normal"
                      defaultOpen
                      presets={[
                        { label: "Today", date: today },
                        { label: "Tomorrow", date: tomorrow },
                        { label: "In 3 days", date: addDays(today, 3) },
                      ]}
                    />
                  </Field>
                  <div className="flex flex-col gap-2 rounded-lg border bg-muted/40 p-3">
                    <span className="font-caption text-caption text-muted-foreground">
                      Soil dryness · balcony hub
                    </span>
                    <span className="font-code text-xl tabular-nums">62%</span>
                    <Progress
                      value={62}
                      className="h-1.5"
                      aria-label="Soil dryness"
                    />
                    <span className="font-caption text-caption text-muted-foreground">
                      waters automatically below 40%
                    </span>
                  </div>
                </div>

                {/* Right side of the form: visible fields */}
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="reminder-time">
                        Reminder time
                      </FieldLabel>
                      <Input
                        id="reminder-time"
                        type="time"
                        defaultValue="08:30"
                        aria-label="Reminder time"
                        className="appearance-none bg-background text-sm [&::-webkit-calendar-picker-indicator]:appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="last-repotted">
                        Last repotted
                      </FieldLabel>
                      <DatePicker
                        id="last-repotted"
                        value={lastRepotted}
                        onValueChange={setLastRepotted}
                        format="MMM d, yyyy"
                        buttonClassName="w-full font-normal"
                        disabledDates={(date) => date > today}
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="care-notes">Care notes</FieldLabel>
                    <Textarea
                      id="care-notes"
                      rows={3}
                      className="text-sm"
                      defaultValue="Water thoroughly until it drains. Check the underside of new leaves for spider mites."
                    />
                  </Field>
                  <Separator />
                  <div className="mt-auto flex flex-col gap-3 pt-2">
                    <span className="font-caption text-caption text-muted-foreground">
                      Recent care log
                    </span>
                    {careLog.map((entry) => (
                      <div
                        key={entry.when}
                        className="flex items-baseline gap-3"
                      >
                        <span className="w-12 shrink-0 font-code text-xs tabular-nums text-muted-foreground">
                          {entry.when}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {entry.what}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2 px-6">
                <Button size="sm">Save schedule</Button>
                <Button variant="ghost" size="sm">
                  Skip this cycle
                </Button>
                <span className="ml-auto font-code text-xs text-muted-foreground">
                  updated {format(today, "MMM d")} · 07:42
                </span>
              </CardFooter>
            </Card>
          </main>

          {/* Right: plant roster + upcoming queue */}
          <aside className="flex min-w-0 flex-col gap-4">
            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="font-heading-3 text-heading-3">
                  My plants
                </CardTitle>
                <CardDescription>12 plants · 4 need attention</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-6">
                {plants.map((p) => (
                  <div key={p.initials} className="flex items-center gap-3">
                    <Avatar className="size-7 shrink-0">
                      <AvatarFallback className="font-code text-xs">
                        {p.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="mt-0.5 truncate font-caption text-caption text-muted-foreground">
                        {p.room}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Progress
                          value={p.moisture}
                          className="h-1.5"
                          aria-label={`${p.name} soil moisture`}
                        />
                        <span className="w-16 shrink-0 text-right font-code text-[11px] tabular-nums text-muted-foreground">
                          {p.moisture}% soil
                        </span>
                      </div>
                    </div>
                    <span className="w-14 shrink-0 text-right font-code text-[11px] tabular-nums text-muted-foreground">
                      {format(p.next, "MMM d")}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="font-heading-3 text-heading-3">
                  Coming up
                </CardTitle>
                <CardDescription>
                  3 care tasks in the next five days
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col px-6">
                {upcoming.map((task, i) => (
                  <div key={task.id}>
                    {i > 0 && <Separator className="my-2" />}
                    <div className="flex items-start gap-3 py-0.5">
                      <Checkbox
                        id={task.id}
                        checked={task.done}
                        className="mt-0.5"
                        aria-label={`${task.action} — ${task.plant}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className={`truncate text-sm font-medium ${
                              task.done
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            {task.action}
                          </span>
                          <span className="shrink-0 font-code text-[11px] tabular-nums text-muted-foreground">
                            {task.when}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="min-w-0 flex-1 truncate font-caption text-caption text-muted-foreground">
                            {task.plant}
                          </span>
                          {task.state === "overdue" ? (
                            <Badge variant="destructive">Overdue</Badge>
                          ) : task.state === "done" ? (
                            <Badge variant="secondary">Done</Badge>
                          ) : (
                            <Badge variant="outline">Scheduled</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* ── Status bar ──────────────────────────────────────────── */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t px-5">
          <span className="font-code text-xs text-muted-foreground">
            6 reminders scheduled · next sync in 24 min
          </span>
          <span className="font-code text-xs text-muted-foreground">
            Fernfield 2.4 · balcony hub online
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
