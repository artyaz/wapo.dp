"use client"
// EVAL page — resizable p2 — fitness class scheduler — 1280x800 dark
// Resizable front and center: three-column IDE-style scheduler. Outer
// horizontal group: week rail | schedule grid + roster (nested vertical
// group) | class detail. Visible withHandle grips in the hairline style.
// Co-stars: Badge, Button, Avatar, Progress, Table, Tabs.

import { CalendarPlus, ChevronLeft, ChevronRight, Dumbbell } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Slot = {
  time: string
  name: string
  coach: string
  fill: number
  waitlist?: number
  selected?: boolean
}

const week: { day: string; date: string; today?: boolean; slots: Slot[] }[] = [
  {
    day: "Mon",
    date: "31",
    slots: [
      { time: "06:15", name: "Sunrise Vinyasa", coach: "E. Marsh", fill: 90 },
      { time: "17:30", name: "Barre Sculpt", coach: "I. Holm", fill: 78 },
    ],
  },
  {
    day: "Tue",
    date: "1",
    today: true,
    slots: [
      { time: "07:30", name: "Spin Interval 45", coach: "D. Voss", fill: 100, waitlist: 6, selected: true },
      { time: "12:15", name: "HIIT 45", coach: "M. Reyes", fill: 100, waitlist: 2 },
      { time: "18:45", name: "Lift Club L2", coach: "T. Ferreira", fill: 75 },
    ],
  },
  {
    day: "Wed",
    date: "2",
    slots: [
      { time: "06:15", name: "Sunrise Vinyasa", coach: "E. Marsh", fill: 95 },
      { time: "09:00", name: "Foundations", coach: "P. Nair", fill: 69 },
      { time: "19:30", name: "Restore & Stretch", coach: "E. Marsh", fill: 100 },
    ],
  },
  {
    day: "Thu",
    date: "3",
    slots: [
      { time: "07:30", name: "Spin Interval 45", coach: "D. Voss", fill: 100 },
      { time: "12:15", name: "HIIT 45", coach: "M. Reyes", fill: 92 },
      { time: "18:45", name: "Lift Club L2", coach: "T. Ferreira", fill: 92 },
    ],
  },
  {
    day: "Fri",
    date: "4",
    slots: [
      { time: "06:15", name: "Sunrise Vinyasa", coach: "E. Marsh", fill: 100 },
      { time: "17:30", name: "Barre Sculpt", coach: "I. Holm", fill: 89 },
    ],
  },
  {
    day: "Sat",
    date: "5",
    slots: [
      { time: "08:00", name: "Long Ride 75", coach: "D. Voss", fill: 100, waitlist: 4 },
      { time: "10:00", name: "Mobility Flow", coach: "P. Nair", fill: 60 },
    ],
  },
  {
    day: "Sun",
    date: "6",
    slots: [
      { time: "09:00", name: "Restore & Stretch", coach: "E. Marsh", fill: 88 },
      { time: "10:30", name: "Community Lift", coach: "M. Reyes", fill: 67 },
    ],
  },
]

const roster: {
  member: string
  initials: string
  plan: string
  status: "in" | "booked" | "wait"
  booked: string
  note: string
}[] = [
  { member: "Amara Osei", initials: "AO", plan: "NL-PRO", status: "in", booked: "Aug 26 · 18:04", note: "Bike 14" },
  { member: "Jonas Lindqvist", initials: "JL", plan: "NL-PRO", status: "in", booked: "Aug 26 · 18:22", note: "Bike 03" },
  { member: "Mei-Ling Zhao", initials: "MZ", plan: "NL-FLEX", status: "booked", booked: "Aug 27 · 07:41", note: "Bike 21" },
  { member: "Rafael Duarte", initials: "RD", plan: "NL-PRO", status: "in", booked: "Aug 27 · 12:15", note: "Bike 09" },
  { member: "Sofia Marchetti", initials: "SM", plan: "NL-FLEX", status: "booked", booked: "Aug 28 · 09:03", note: "Bike 17" },
  { member: "Theo Brandt", initials: "TB", plan: "NL-PRO", status: "wait", booked: "Aug 28 · 19:30", note: "#1" },
  { member: "Priyanka Shah", initials: "PS", plan: "NL-FLEX", status: "wait", booked: "Aug 29 · 08:12", note: "#2" },
]

function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg border">
              <Dumbbell className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading-3 text-heading-3 leading-tight">
                Northline Strength
              </span>
              <span className="font-caption text-caption text-muted-foreground">
                Studio scheduler
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="me-2 flex items-center gap-0.5">
              <Button variant="ghost" size="icon-sm" aria-label="Previous week">
                <ChevronLeft />
              </Button>
              <span className="font-code text-code text-muted-foreground px-1">
                2026-W36
              </span>
              <Button variant="ghost" size="icon-sm" aria-label="Next week">
                <ChevronRight />
              </Button>
            </span>
            <Button variant="outline" size="sm">
              Import
            </Button>
            <Button size="sm">
              <CalendarPlus />
              New class
            </Button>
            <Avatar size="sm">
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Resizable scheduler */}
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-0 flex-1"
        >
          {/* Week rail */}
          <ResizablePanel defaultSize={18} minSize={14}>
            <div className="flex h-full flex-col">
              <div className="flex h-11 shrink-0 items-center justify-between border-b px-4">
                <span className="font-heading-3 text-heading-3">Week 36</span>
                <span className="font-caption text-caption text-muted-foreground">
                  Aug 31 – Sep 6
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                <ul className="divide-y">
                  {week.map((d) => (
                    <li
                      key={d.day}
                      className={
                        d.today
                          ? "flex items-center justify-between border-s-2 border-foreground bg-muted px-3.5 py-2.5"
                          : "flex items-center justify-between px-4 py-2.5"
                      }
                    >
                      <span className="flex items-baseline gap-2">
                        <span className="text-sm font-medium">{d.day}</span>
                        <span className="font-code text-code text-muted-foreground">
                          {d.date}
                        </span>
                      </span>
                      <span className="font-code text-code text-muted-foreground">
                        {d.slots.length}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex h-11 shrink-0 items-center justify-between border-t px-4">
                <span className="font-caption text-caption text-muted-foreground">
                  17 sessions
                </span>
                <span className="font-code text-code text-muted-foreground">
                  86% avg fill
                </span>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Schedule + roster */}
          <ResizablePanel defaultSize={57} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Week grid */}
              <ResizablePanel defaultSize={66} minSize={45}>
                <div className="flex h-full flex-col">
                  <div className="flex h-11 shrink-0 items-center justify-between border-b px-5">
                    <span className="font-caption text-caption text-muted-foreground">
                      All studios · times are local
                    </span>
                    <Tabs defaultValue="grid">
                      <TabsList>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="rooms">Rooms</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="grid min-h-0 flex-1 grid-cols-7 divide-x overflow-hidden">
                    {week.map((d) => (
                      <div
                        key={d.day}
                        className="flex min-w-0 flex-col gap-1.5 px-2 py-2.5"
                      >
                        <div className="flex items-baseline justify-between px-0.5">
                          <span
                            className={
                              d.today
                                ? "text-sm font-semibold text-foreground"
                                : "text-sm font-medium text-muted-foreground"
                            }
                          >
                            {d.day}
                          </span>
                          <span className="font-code text-code text-muted-foreground">
                            {d.date}
                          </span>
                        </div>
                        {d.slots.map((slot, i) => {
                          const isSelected = slot.selected
                          const dot = slot.waitlist
                            ? "bg-warning-400"
                            : slot.fill >= 100
                              ? "bg-neutral-500"
                              : "bg-success-400"
                          return (
                            <div
                              key={`${d.day}-${i}`}
                              className={
                                isSelected
                                  ? "flex flex-col gap-0.5 rounded-sm border border-foreground/50 bg-muted px-2 py-1.5"
                                  : "flex flex-col gap-0.5 rounded-sm border bg-muted/40 px-2 py-1.5"
                              }
                            >
                              <span className="flex items-center justify-between gap-1">
                                <span className="font-code text-code text-muted-foreground">
                                  {slot.time}
                                </span>
                                <span className={`size-1.5 rounded-full ${dot}`} />
                              </span>
                              <span className="line-clamp-2 text-xs font-medium leading-snug">
                                {slot.name}
                              </span>
                              <span className="font-caption text-[11px] text-muted-foreground">
                                {slot.coach}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Roster */}
              <ResizablePanel defaultSize={34} minSize={20}>
                <div className="flex h-full flex-col">
                  <div className="flex h-11 shrink-0 items-center justify-between border-b px-5">
                    <span className="flex items-center gap-2.5">
                      <span className="font-heading-3 text-heading-3">
                        Roster
                      </span>
                      <Badge variant="outline">22 booked</Badge>
                      <Badge
                        variant="outline"
                        className="border-warning-300/60 text-warning-300"
                      >
                        6 waitlisted
                      </Badge>
                    </span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Spin Interval 45 · Tue 07:30 · Cycle Room
                    </span>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="ps-5">Member</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Booking</TableHead>
                          <TableHead className="pe-5 text-end">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roster.map((r) => (
                          <TableRow key={r.member}>
                            <TableCell className="ps-5">
                              <span className="flex items-center gap-2.5">
                                <Avatar size="sm">
                                  <AvatarFallback>{r.initials}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {r.member}
                                </span>
                                <span className="font-code text-code text-muted-foreground">
                                  {r.note}
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="font-code text-code text-muted-foreground">
                              {r.plan}
                            </TableCell>
                            <TableCell className="font-code text-code text-muted-foreground">
                              {r.booked}
                            </TableCell>
                            <TableCell className="pe-5 text-end">
                              {r.status === "in" ? (
                                <Badge
                                  variant="outline"
                                  className="border-success-300/60 text-success-300"
                                >
                                  Checked in
                                </Badge>
                              ) : r.status === "booked" ? (
                                <Badge variant="secondary">Booked</Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="border-warning-300/60 text-warning-300"
                                >
                                  Waitlist
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Class detail */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="flex h-full flex-col bg-card">
              <div className="flex h-11 shrink-0 items-center border-b px-5">
                <span className="font-caption text-caption text-muted-foreground">
                  Class detail
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 py-4">
                <div className="flex flex-col gap-1">
                  <span className="font-caption text-caption text-muted-foreground">
                    Tuesday · 07:30–08:15 · Cycle Room
                  </span>
                  <h2 className="font-heading-2 text-heading-2 leading-tight">
                    Spin Interval 45
                  </h2>
                </div>

                <div className="flex items-center gap-2.5">
                  <Avatar>
                    <AvatarFallback>DV</AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">Dario Voss</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Lead instructor · cycle
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Capacity
                    </span>
                    <span className="font-code text-code">22 / 22</span>
                  </span>
                  <Progress value={100} className="h-1.5" aria-hidden="true" />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline">45 min</Badge>
                  <Badge variant="outline">High intensity</Badge>
                  <Badge
                    variant="outline"
                    className="border-warning-300/60 text-warning-300"
                  >
                    Waitlist 6
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-caption text-caption text-muted-foreground">
                    Booked this week
                  </span>
                  <AvatarGroup>
                    <Avatar>
                      <AvatarFallback>AO</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>MZ</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>RD</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+18</AvatarGroupCount>
                  </AvatarGroup>
                </div>
              </div>
              <div className="flex h-14 shrink-0 items-center gap-2 border-t px-5">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit class
                </Button>
                <Button size="sm" className="flex-1">
                  Message attendees
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </EvalShell>
  )
}

export default Page
