"use client"

// EVAL page — tooltip p3 — university study planner — 390x844 dark (phone)

import {
  CalendarDays,
  House,
  Info,
  Library,
  Play,
  Settings,
  User,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SESSIONS = [
  {
    time: "7:00 – 8:30 PM",
    title: "CS 146 · Problem set 5",
    sub: "B-tree operations · Green Library 2F",
    badge: "Due Fri",
  },
  {
    time: "9:00 – 9:15 PM",
    title: "SPAN 101 · Flashcards",
    sub: "Subjunctive mood · 40 cards",
    badge: "15 min",
  },
]

const DEADLINES = [
  { course: "MATH 214", title: "Midterm exam", due: "12 days" },
  { course: "CS 146", title: "Problem set 5", due: "3 days" },
  { course: "HIST 102", title: "Reading response", due: "4 days" },
]

const NAV = [
  { icon: House, label: "Home", active: true },
  { icon: CalendarDays, label: "Planner", active: false },
  { icon: Library, label: "Library", active: false },
  { icon: User, label: "Profile", active: false },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-12 shrink-0 items-center justify-between border-b bg-card px-4">
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback className="text-[11px]">MC</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold tracking-tight">
              Leland Study
            </span>
          </div>
          <Tooltip defaultOpen>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Settings"
                />
              }
            >
              <Settings className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" sideOffset={6}>
              <p>Study preferences</p>
            </TooltipContent>
          </Tooltip>
        </header>

        {/* Greeting */}
        <div className="flex flex-col gap-0.5 px-4 pt-4">
          <span className="font-code text-xs text-muted-foreground">
            Thu, Mar 5 · Week 6
          </span>
          <h1 className="font-heading-2 text-heading-2">
            Good evening, Maya
          </h1>
          <p className="text-sm text-muted-foreground">
            3 sessions · 2h 25m planned tonight
          </p>
        </div>

        {/* Segmented control */}
        <div className="px-4 pt-3">
          <Tabs defaultValue="today">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This week</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <main className="flex flex-1 flex-col gap-3 px-4 py-3">
          {/* Next up */}
          <Card className="gap-3 py-4">
            <CardContent className="flex flex-col gap-3 px-4">
              <div className="flex items-center justify-between">
                <Badge>Next up · 5:30 PM</Badge>
                <span className="font-code text-xs text-muted-foreground">
                  45 min
                </span>
              </div>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Full course details for MATH 214"
                      className="flex w-fit max-w-full cursor-help items-center rounded-sm border bg-background px-2 py-1 text-left text-sm font-medium"
                    />
                  }
                >
                  <span className="truncate">
                    MATH 214 · Linear Algebra II — Prof. Dvořák · Engle Hall 204
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start" sideOffset={6}>
                  <p>
                    <span className="font-code">MATH 214</span> · Linear
                    Algebra II · Prof. Dvořák ·{" "}
                    <span className="font-code">Engle Hall 204</span>
                  </p>
                </TooltipContent>
              </Tooltip>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Syllabus progress</span>
                  <span className="font-code">Week 6 of 14</span>
                </div>
                <Progress value={43} />
              </div>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button className="w-full gap-1.5" aria-label="Start focus session for MATH 214" />
                  }
                >
                  <Play className="size-3.5" />
                  Start focus session
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6}>
                  <p>
                    <span className="font-code">MATH 214</span> ·{" "}
                    <span className="font-code">Engle Hall 204</span> · Prof.
                    Dvořák
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Also today */}
          <Card className="gap-0 py-0">
            {SESSIONS.map((s, i) => (
              <div key={s.title}>
                {i > 0 ? <Separator /> : null}
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="font-code text-xs text-muted-foreground">
                    {s.time}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {s.title}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {s.sub}
                    </span>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {s.badge}
                  </Badge>
                </div>
              </div>
            ))}
          </Card>

          {/* Deadlines */}
          <Card className="gap-0 py-0">
            <CardHeader className="flex flex-row items-center justify-between border-b py-3">
              <CardTitle className="font-heading-3 text-sm">
                Deadlines
              </CardTitle>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Midterm exam details"
                      className="text-muted-foreground hover:text-foreground"
                    />
                  }
                >
                  <Info className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent side="top" align="end" sideOffset={6}>
                  <p>
                    <span className="font-code">MATH 214</span> midterm ·{" "}
                    <span className="font-code">Thu Mar 17</span> ·{" "}
                    <span className="font-code">6:30 PM</span> ·{" "}
                    <span className="font-code">Engle 204</span> · 24% of
                    final grade
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 px-4 py-3">
              {DEADLINES.map((d) => (
                <div key={d.course} className="flex items-center gap-2">
                  <span className="font-code text-xs">{d.course}</span>
                  <span className="truncate text-sm text-muted-foreground">
                    {d.title}
                  </span>
                  <span className="ms-auto font-code text-xs text-muted-foreground">
                    {d.due}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>

        {/* Bottom nav */}
        <nav className="flex h-16 shrink-0 items-center justify-around border-t bg-card px-2">
          {NAV.map((n) => (
            <Tooltip key={n.label} defaultOpen={n.label === "Library"}>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label={n.label}
                    aria-current={n.active ? "page" : undefined}
                    className={
                      n.active
                        ? "flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"
                        : "flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                    }
                  />
                }
              >
                <n.icon className="size-4" />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                align={n.label === "Library" ? "center" : undefined}
              >
                <p>
                  {n.label === "Library" ? "Course reserves · 3 ready" : n.label}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </EvalShell>
  )
}
