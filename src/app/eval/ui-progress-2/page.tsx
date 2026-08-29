"use client";

/**
 * EVAL page — progress p2 — university study planner — 1180x820 light
 *
 * Desktop dashboard of "StudyFlow", a study planner for a junior neuroscience
 * major (Elena Vasquez) in week 9 of the Fall 2025 semester. Progress is the
 * spine of the page: a semester-completion hero bar, five labeled per-course
 * syllabus rows with mono percentages, a study-log table with inline Progress
 * meters, a weekly-hours goal card, a sidebar semester widget and a catch-up
 * plan card. Success/warning colors appear only on genuine status meaning
 * (goal met / behind schedule).
 * Other ui/* components: Card, Badge, Button, Table, Input, Avatar.
 */

import {
  BookOpen,
  CalendarClock,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  NotebookPen,
  Plus,
  Search,
  Settings,
  Timer,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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

type CourseProgress = {
  code: string;
  name: string;
  value: number;
  note: string;
};

const COURSES: CourseProgress[] = [
  { code: "STAT 212", name: "Applied Statistics", value: 85, note: "problem sets 17/20" },
  { code: "NEUR 320", name: "Cognitive Neuroscience", value: 76, note: "syllabus week 9/14" },
  { code: "PHIL 140", name: "Ethics of Technology", value: 62, note: "readings 24/39" },
  { code: "CHEM 231", name: "Organic Chemistry II", value: 48, note: "lab reports 5/12" },
  { code: "ART 105", name: "Baroque Art History", value: 31, note: "2 weeks behind" },
];

type LogRow = {
  code: string;
  logged: string;
  goal: string;
  value: number;
  status: "met" | "on-track" | "behind" | "catching-up";
};

const STUDY_LOG: LogRow[] = [
  { code: "STAT 212", logged: "4.0 h", goal: "4 h", value: 100, status: "met" },
  { code: "NEUR 320", logged: "5.5 h", goal: "6 h", value: 92, status: "on-track" },
  { code: "ART 105", logged: "3.5 h", goal: "4 h", value: 88, status: "catching-up" },
  { code: "PHIL 140", logged: "3.0 h", goal: "4 h", value: 75, status: "on-track" },
  { code: "CHEM 231", logged: "2.5 h", goal: "6 h", value: 42, status: "behind" },
];

const DEADLINES = [
  { date: "Oct 20", title: "Problem set 6", course: "STAT 212", days: "2 days" },
  { date: "Oct 21", title: "Lab report 5", course: "CHEM 231", days: "3 days" },
  { date: "Oct 24", title: "Midterm exam", course: "NEUR 320", days: "6 days" },
  { date: "Oct 28", title: "Essay draft", course: "PHIL 140", days: "10 days" },
];

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Courses", active: false },
  { icon: CalendarClock, label: "Deadlines", active: false },
  { icon: Timer, label: "Study timer", active: false },
  { icon: NotebookPen, label: "Notes", active: false },
  { icon: Settings, label: "Settings", active: false },
];

function StatusBadge({ status }: { status: LogRow["status"] }) {
  if (status === "met") {
    return (
      <Badge variant="outline" className="border-success-500/40 text-success-600">
        Goal met
      </Badge>
    );
  }
  if (status === "behind") {
    return (
      <Badge variant="outline" className="border-warning-500/40 text-warning-600">
        Behind
      </Badge>
    );
  }
  if (status === "catching-up") {
    return <Badge variant="outline">Catching up</Badge>;
  }
  return <Badge variant="secondary">On track</Badge>;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* top bar */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-default-border px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <GraduationCap className="size-4" />
            </div>
            <p className="text-sm font-semibold tracking-tight">StudyFlow</p>
          </div>
          <Button variant="outline" size="sm" className="ms-2">
            Fall 2025
            <ChevronDown />
          </Button>
          <div className="relative ms-auto w-56">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses, notes…"
              className="h-8 pl-8 text-sm"
              aria-label="Search courses and notes"
            />
          </div>
          <Avatar className="size-8 border border-default-border">
            <AvatarFallback className="font-code text-xs">EV</AvatarFallback>
          </Avatar>
        </header>

        <div className="flex flex-1 min-h-0">
          {/* sidebar — flat panel, hairline separation */}
          <aside className="flex w-52 flex-none flex-col gap-1 border-e border-default-border px-3 py-4">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-sm bg-accent px-2.5 py-2 text-sm font-medium text-accent-foreground"
                    : "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-muted-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}

            {/* semester widget — sidebar progress */}
            <div className="mt-auto rounded-lg border border-default-border bg-card p-3">
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-medium">Week 9 of 14</p>
                <p className="font-code text-xs tabular-nums">64%</p>
              </div>
              <Progress
                value={64}
                className="mt-2 h-1.5"
                aria-label="Semester elapsed"
              />
              <p className="mt-2 font-code text-[10px] text-muted-foreground">
                62 of 98 days elapsed
              </p>
            </div>
          </aside>

          {/* main column */}
          <main className="flex flex-1 flex-col gap-4 px-5 py-4">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  Fall 2025 · Week 9
                </h1>
                <p className="mt-0.5 font-code text-xs text-muted-foreground">
                  Elena Vasquez · Neuroscience · 5 courses · 15 credits
                </p>
              </div>
              <Button size="sm">
                <Plus />
                Log study session
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* left column */}
              <div className="col-span-8 flex flex-col gap-4">
                {/* semester completion */}
                <Card className="gap-0 py-4">
                  <div className="flex items-baseline justify-between px-5">
                    <h2 className="font-heading-3 text-heading-3 text-foreground">
                      Semester progress
                    </h2>
                    <span className="font-code text-[10px] text-muted-foreground">
                      syllabus coverage by course
                    </span>
                  </div>
                  <CardContent className="mt-3 px-5">
                    <div className="flex items-center gap-4">
                      <p className="font-code text-2xl leading-none tabular-nums">
                        62%
                      </p>
                      <Progress
                        value={62}
                        className="h-2.5 flex-1"
                        aria-label="Overall semester completion"
                      />
                      <p className="font-code text-[10px] leading-snug text-muted-foreground">
                        midpoint review
                        <br />
                        Oct 30
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      {COURSES.map((course) => (
                        <div key={course.code}>
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="flex min-w-0 items-baseline gap-2">
                              <span className="font-code text-xs whitespace-nowrap text-muted-foreground">
                                {course.code}
                              </span>
                              <span className="truncate text-sm">{course.name}</span>
                            </p>
                            <p className="font-code text-xs whitespace-nowrap tabular-nums text-muted-foreground">
                              <span className="text-foreground">
                                {course.value}%
                              </span>
                              {" · "}
                              {course.note}
                            </p>
                          </div>
                          <Progress
                            value={course.value}
                            className="mt-1.5 h-1.5"
                            aria-label={`${course.code} syllabus coverage`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* weekly study log */}
                <Card className="gap-0 py-0">
                  <div className="flex items-baseline justify-between px-5 pt-4">
                    <h2 className="font-heading-3 text-heading-3 text-foreground">
                      Study log · week 41
                    </h2>
                    <span className="font-code text-[10px] text-muted-foreground">
                      Oct 13 – Oct 19
                    </span>
                  </div>
                  <Table className="mt-3">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-5">Course</TableHead>
                        <TableHead className="text-right">Logged</TableHead>
                        <TableHead className="text-right">Goal</TableHead>
                        <TableHead className="w-40 px-4">Progress</TableHead>
                        <TableHead className="pr-5 text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {STUDY_LOG.map((row) => (
                        <TableRow key={row.code}>
                          <TableCell className="pl-5 font-code text-xs">
                            {row.code}
                          </TableCell>
                          <TableCell className="text-right font-code text-xs tabular-nums">
                            {row.logged}
                          </TableCell>
                          <TableCell className="text-right font-code text-xs tabular-nums text-muted-foreground">
                            {row.goal}
                          </TableCell>
                          <TableCell className="px-4">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={row.value}
                                className="h-1.5 flex-1"
                                aria-label={`${row.code} weekly goal progress`}
                              />
                              <span className="font-code text-[10px] tabular-nums text-muted-foreground">
                                {row.value}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="pr-5 text-right">
                            <StatusBadge status={row.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>

              {/* right rail */}
              <div className="col-span-4 flex flex-col gap-4">
                {/* weekly hours goal */}
                <Card className="gap-0 py-4">
                  <CardContent className="px-5">
                    <div className="flex items-center justify-between">
                      <h2 className="font-heading-3 text-heading-3 text-foreground">
                        Weekly study goal
                      </h2>
                      <Badge variant="secondary">77%</Badge>
                    </div>
                    <p className="mt-2 font-code text-2xl leading-none tabular-nums">
                      18.5 h
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        / 24 h
                      </span>
                    </p>
                    <Progress
                      value={77}
                      className="mt-3 h-2"
                      aria-label="Weekly study goal"
                    />
                    <p className="mt-2 font-code text-[10px] text-muted-foreground">
                      pace 2.6 h/day · Sun 26 Oct left in week
                    </p>
                  </CardContent>
                </Card>

                {/* deadlines */}
                <Card className="gap-0 py-4">
                  <div className="flex items-baseline justify-between px-5">
                    <h2 className="font-heading-3 text-heading-3 text-foreground">
                      Deadlines
                    </h2>
                    <span className="font-code text-[10px] text-muted-foreground">
                      next 14 days
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col divide-y divide-default-border">
                    {DEADLINES.map((d) => (
                      <div
                        key={d.title}
                        className="flex items-center gap-3 px-5 py-2.5"
                      >
                        <div className="w-12 flex-none rounded-sm border border-default-border bg-background px-1 py-0.5 text-center">
                          <p className="font-code text-[9px] uppercase text-muted-foreground">
                            {d.date.split(" ")[0]}
                          </p>
                          <p className="font-code text-sm leading-none tabular-nums">
                            {d.date.split(" ")[1]}
                          </p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {d.title}
                          </p>
                          <p className="font-code text-[10px] text-muted-foreground">
                            {d.course}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            d.days === "2 days" || d.days === "3 days"
                              ? "border-warning-500/40 text-warning-600"
                              : undefined
                          }
                        >
                          {d.days}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* catch-up plan */}
                <Card className="gap-0 py-4">
                  <CardContent className="px-5">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-heading-3 text-heading-3 text-foreground">
                        ART 105 · catch-up
                      </h2>
                      <p className="font-code text-xs tabular-nums">
                        31%
                        <span className="text-muted-foreground"> / 45%</span>
                      </p>
                    </div>
                    <Progress
                      value={31}
                      className="mt-3 h-1.5"
                      aria-label="ART 105 catch-up plan progress"
                    />
                    <p className="mt-2 font-code text-[10px] text-muted-foreground">
                      6 lectures to review · target Nov 1 · est. 9 h
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>

        {/* status bar */}
        <footer className="flex h-9 flex-none items-center justify-between border-t border-default-border px-5 font-code text-[10px] text-muted-foreground">
          <span>last sync 08:12 · all courses</span>
          <span>Fall 2025 ends 12 Dec · 34 instruction days left</span>
        </footer>
      </div>
    </EvalShell>
  );
}
