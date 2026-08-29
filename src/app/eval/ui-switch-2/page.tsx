"use client"
// EVAL page — switch p2 — volunteer shift coordinator — 1280x800 light
// Switch front and center: weekly availability day rows with mono time
// windows, a master recurring-shifts toggle, a reminder panel with per-event
// switches, and one disabled coordinator-gated row.
// Co-stars: Tabs, Card, Badge, Button, Avatar, Progress.

import {
  ArrowLeftRight,
  Bell,
  CalendarCheck,
  Clock,
  HandHeart,
  Mail,
  MessageSquare,
  Repeat,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const days = [
  { day: "Monday", window: "17:00 – 20:30", on: true },
  { day: "Tuesday", window: "—", on: false },
  { day: "Wednesday", window: "17:00 – 20:30", on: true },
  { day: "Thursday", window: "—", on: false },
  { day: "Friday", window: "09:00 – 13:00", on: true },
  { day: "Saturday", window: "08:30 – 12:30", on: true },
  { day: "Sunday", window: "—", on: false },
]

const reminders = [
  {
    icon: Mail,
    title: "24 hours before",
    desc: "Email the evening before each shift",
    on: true,
  },
  {
    icon: MessageSquare,
    title: "2 hours before",
    desc: "Text message with your check-in link",
    on: true,
  },
  {
    icon: Clock,
    title: "Check-in nudges",
    desc: "Ping if you haven't checked in 15 min after start",
    on: false,
  },
  {
    icon: ArrowLeftRight,
    title: "Swap requests",
    desc: "When another volunteer asks you to cover a shift",
    on: true,
  },
  {
    icon: HandHeart,
    title: "Monthly impact summary",
    desc: "Hours logged and meals packed, first Monday",
    on: true,
  },
]

const shifts = [
  {
    role: "Sorting line",
    when: "Wed Mar 19 · 17:00",
    badge: "Confirmed",
    tone: "success" as const,
  },
  {
    role: "Driver assist",
    when: "Sat Mar 22 · 08:30",
    badge: "Confirmed",
    tone: "success" as const,
  },
  {
    role: "Front desk",
    when: "Sun Mar 23 · 10:00",
    badge: "Needs cover",
    tone: "warning" as const,
  },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex h-screen w-full max-w-[1200px] flex-col gap-4 px-6 py-4">
        {/* App header */}
        <header className="flex items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-3 text-title text-foreground">
              Haven Harvest
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Riverside Community Food Bank
            </span>
          </div>
          <nav className="ml-auto flex items-center gap-3 text-sm text-muted-foreground">
            <span className="cursor-pointer">Open shifts</span>
            <span className="cursor-pointer">Team</span>
          </nav>
          <Avatar>
            <AvatarFallback>JO</AvatarFallback>
          </Avatar>
        </header>

        <Tabs defaultValue="availability" className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="schedule">My schedule</TabsTrigger>
              <TabsTrigger value="swaps">Swap board</TabsTrigger>
              <TabsTrigger value="hours">Hours log</TabsTrigger>
            </TabsList>
            <span className="font-caption text-caption text-muted-foreground">
              Jules Okafor · volunteer since 2023
            </span>
          </div>

          <TabsContent value="availability" className="min-h-0">
            <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_290px] gap-4">
              {/* Availability */}
              <Card className="flex min-h-0 flex-col gap-0 py-0">
                <CardHeader className="border-b px-5 py-4">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CalendarCheck className="size-4 text-muted-foreground" />
                    Weekly availability
                  </CardTitle>
                  <CardDescription>
                    Recurring windows Nora can schedule you into
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col px-5">
                  <label
                    htmlFor="sw-recurring"
                    className="flex cursor-pointer items-start justify-between gap-4 py-3"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-foreground">
                        Open to recurring shifts
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Same slot every week, with a standing reminder
                      </span>
                    </span>
                    <Switch id="sw-recurring" defaultChecked className="mt-0.5" />
                  </label>
                  <div className="flex flex-1 flex-col divide-y border-t">
                    {days.map((d) => (
                      <label
                        key={d.day}
                        htmlFor={`sw-day-${d.day.toLowerCase()}`}
                        className="flex cursor-pointer items-center justify-between gap-4 py-[9px]"
                      >
                        <span className="w-24 text-sm text-foreground">{d.day}</span>
                        <span
                          className={
                            d.on
                              ? "flex-1 font-code text-xs text-foreground"
                              : "flex-1 font-code text-xs text-muted-foreground"
                          }
                        >
                          {d.window}
                        </span>
                        <Switch
                          id={`sw-day-${d.day.toLowerCase()}`}
                          defaultChecked={d.on}
                        />
                      </label>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t px-5 py-3">
                  <span className="font-caption text-caption text-muted-foreground">
                    Editing week of Mar 16 – 22
                  </span>
                  <Button size="sm">Update availability</Button>
                </CardFooter>
              </Card>

              {/* Reminders */}
              <Card className="flex min-h-0 flex-col gap-0 py-0">
                <CardHeader className="border-b px-5 py-4">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Bell className="size-4 text-muted-foreground" />
                    Shift reminders
                  </CardTitle>
                  <CardDescription>How the food bank reaches you</CardDescription>
                </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col divide-y px-5">
                  {reminders.map((r) => (
                    <label
                      key={r.title}
                      htmlFor={`sw-rem-${r.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="flex cursor-pointer items-center gap-3 py-3"
                    >
                      <r.icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-sm text-foreground">{r.title}</span>
                        <span className="font-caption text-caption text-muted-foreground">
                          {r.desc}
                        </span>
                      </span>
                      <Switch defaultChecked={r.on} />
                    </label>
                  ))}
                  <div className="flex items-center gap-3 py-3">
                    <Repeat className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-muted-foreground">
                        Last-minute fills (under 4 h notice)
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Ask Nora to enable — coordinator approval required
                      </span>
                    </span>
                    <Switch
                      disabled
                      aria-label="Last-minute fill requests, coordinator approval required"
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-5 py-3">
                  <span className="font-caption text-caption text-muted-foreground">
                    Sent to jules.okafor@gmail.com · +1 (773) 555-0198
                  </span>
                </CardFooter>
              </Card>

              {/* Right rail */}
              <div className="flex min-h-0 flex-col gap-4">
                <Card className="gap-3 py-5">
                  <CardHeader className="px-5">
                    <CardTitle className="text-sm">Next shifts</CardTitle>
                    <CardDescription>Week of Mar 16</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 px-5">
                    {shifts.map((s) => (
                      <div key={s.role} className="flex items-center gap-2">
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-foreground">
                            {s.role}
                          </span>
                          <span className="font-code text-xs text-muted-foreground">
                            {s.when}
                          </span>
                        </span>
                        <Badge
                          className={
                            s.tone === "success"
                              ? "border-transparent bg-success-100 text-success-700"
                              : "border-transparent bg-warning-100 text-warning-700"
                          }
                        >
                          {s.badge}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="px-5">
                    <Button variant="outline" size="sm" className="w-full">
                      Offer a shift to cover
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="gap-4 py-5">
                  <CardHeader className="px-5">
                    <CardTitle className="text-sm">Impact this quarter</CardTitle>
                    <CardDescription>Jan – Mar 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 px-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border px-3 py-2.5">
                        <p className="font-code text-xl text-foreground">14</p>
                        <p className="font-caption text-caption text-muted-foreground">
                          shifts completed
                        </p>
                      </div>
                      <div className="rounded-lg border px-3 py-2.5">
                        <p className="font-code text-xl text-foreground">42</p>
                        <p className="font-caption text-caption text-muted-foreground">
                          hours logged
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-caption text-caption text-muted-foreground">
                          50-hour pledge
                        </span>
                        <span className="font-code text-xs text-foreground">84%</span>
                      </div>
                      <Progress value={84} aria-label="50-hour pledge progress" />
                      <span className="font-caption text-caption text-muted-foreground">
                        1,260 meals packed with the Tuesday crew
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Haven Harvest — 312 volunteers on the roster
          </span>
          <span className="font-code text-xs text-muted-foreground">
            schedule synced 2 min ago
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
