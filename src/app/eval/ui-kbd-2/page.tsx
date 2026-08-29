"use client"
// EVAL page — kbd p2 — HR onboarding checklist for new hires — 1920x1080 dark
// "Northwind People" onboarding workspace: sidebar nav with go-to key
// sequences, toolbar action hints, global ⌘K search, and a full keyboard
// shortcut cheat-sheet rail. Co-stars: Checkbox, Card, Badge, Button,
// Progress, Separator, Avatar, Table, InputGroup. Flat panels, no shadows.

import {
  BellIcon,
  BuildingIcon,
  CalendarClockIcon,
  ClipboardListIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SearchIcon,
  UserPlusIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const onboardingNav = [
  { label: "Overview", icon: LayoutDashboardIcon, keys: ["1"], active: false },
  { label: "New-hire checklist", icon: ClipboardListIcon, keys: ["2"], active: true },
  { label: "Documents", icon: FileTextIcon, keys: ["3"], active: false },
  { label: "Day-one schedule", icon: CalendarClockIcon, keys: ["4"], active: false },
]

const workspaceNav = [
  { label: "Directory", icon: UserPlusIcon, keys: ["G", "D"] },
  { label: "Office spaces", icon: BuildingIcon, keys: ["G", "O"] },
]

const itTasks = [
  {
    task: "Create Okta account & SSO groups",
    owner: "PN",
    ownerName: "Priya N.",
    due: "Feb 24",
    done: true,
    atRisk: false,
  },
  {
    task: "Ship laptop, monitor & peripherals",
    owner: "PN",
    ownerName: "Priya N.",
    due: "Feb 26",
    done: true,
    atRisk: false,
  },
  {
    task: "Grant Figma, Jira & GitHub seats",
    owner: "PN",
    ownerName: "Priya N.",
    due: "Feb 28",
    done: false,
    atRisk: false,
  },
  {
    task: "Add to payroll in Gusto",
    owner: "DK",
    ownerName: "Dan K.",
    due: "Mar 02",
    done: false,
    atRisk: false,
  },
]

const paperworkTasks = [
  {
    task: "Signed offer letter counter-signed",
    owner: "RW",
    ownerName: "Rachel W.",
    due: "Feb 20",
    done: true,
    atRisk: false,
  },
  {
    task: "I-9 employment verification",
    owner: "RW",
    ownerName: "Rachel W.",
    due: "Mar 03",
    done: false,
    atRisk: true,
  },
  {
    task: "Benefits enrollment window",
    owner: "DK",
    ownerName: "Dan K.",
    due: "Mar 07",
    done: false,
    atRisk: false,
  },
]

const schedule = [
  { time: "09:00", activity: "Welcome & office tour", owner: "Rachel W.", place: "Floor 3 · lobby" },
  { time: "10:00", activity: "Laptop handover & MFA setup", owner: "Priya N.", place: "IT desk · Floor 2" },
  { time: "11:30", activity: "Team lunch — Brand squad", owner: "Squad", place: "Cafe Verde" },
  { time: "14:00", activity: "Onboarding 1:1 with manager", owner: "Tomás R.", place: "Room Sequoia" },
  { time: "16:00", activity: "Design systems walkthrough", owner: "Maya O.", place: "Room Alder" },
]

const shortcutSections = [
  {
    heading: "General",
    rows: [
      { action: "Command palette", keys: ["⌘", "K"] },
      { action: "Search tasks", keys: ["/"] },
      { action: "Shortcuts panel", keys: ["?"] },
    ],
  },
  {
    heading: "Checklist",
    rows: [
      { action: "Add task", keys: ["N"] },
      { action: "Complete task", keys: ["X"] },
      { action: "Assign owner", keys: ["A"] },
      { action: "Save note", keys: ["⌘", "S"] },
    ],
  },
  {
    heading: "Navigate",
    rows: [
      { action: "Next section", keys: ["J"] },
      { action: "Previous section", keys: ["K"] },
      { action: "Go to directory", keys: ["G", "D"] },
    ],
  },
]

function TaskRow({
  task,
}: {
  task: (typeof itTasks)[number]
}) {
  return (
    <li className="flex items-center gap-3 px-4 py-2.5">
      <Checkbox
        checked={task.done}
        aria-label={task.task}
        className="data-[state=unchecked]:border-muted-foreground/60"
      />
      <span
        className={`min-w-0 flex-1 truncate text-sm ${
          task.done ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {task.task}
      </span>
      <Avatar size="sm" aria-label={task.ownerName}>
        <AvatarFallback className="font-code text-[10px] font-semibold">
          {task.owner}
        </AvatarFallback>
      </Avatar>
      <span className="w-12 font-code text-xs text-muted-foreground">
        {task.due}
      </span>
      {task.atRisk ? (
        <Badge variant="outline" className="text-warning-600">
          At risk
        </Badge>
      ) : task.done ? (
        <Badge variant="secondary" className="font-caption">
          Done
        </Badge>
      ) : (
        <Kbd>X</Kbd>
      )}
    </li>
  )
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-5 border-b px-6">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-3 text-sm font-semibold text-foreground">
              Northwind People
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              HR workspace
            </span>
          </div>
          <InputGroup className="h-9 w-72">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search people, tasks, docs…"
              aria-label="Search the workspace"
            />
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
          <div className="ms-auto flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <BellIcon />
            </Button>
            <Avatar aria-label="Rachel Whitfield">
              <AvatarFallback className="font-code text-[11px] font-semibold">
                RW
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar nav with go-to key hints */}
          <aside className="flex w-60 shrink-0 flex-col gap-5 border-e px-3 py-5">
            <nav className="flex flex-col gap-1">
              <p className="font-caption text-caption px-2 pb-1 text-muted-foreground">
                Onboarding
              </p>
              {onboardingNav.map((item) => (
                <span
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm ${
                    item.active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground"
                  }`}
                >
                  <item.icon className="size-4 text-muted-foreground" />
                  {item.label}
                  <KbdGroup className="ms-auto">
                    {item.keys.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </KbdGroup>
                </span>
              ))}
              <Separator className="my-2" />
              <p className="font-caption text-caption px-2 pb-1 text-muted-foreground">
                Workspace
              </p>
              {workspaceNav.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm text-foreground"
                >
                  <item.icon className="size-4 text-muted-foreground" />
                  {item.label}
                  <KbdGroup className="ms-auto">
                    {item.keys.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </KbdGroup>
                </span>
              ))}
            </nav>

            <Card className="mt-auto gap-0 py-0">
              <CardContent className="flex flex-col gap-2 px-3.5 py-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Q1 cohort · 4 new hires
                  </span>
                  <span className="font-code text-xs text-foreground">72%</span>
                </div>
                <Progress value={72} aria-label="Cohort onboarding 72 percent" />
                <span className="font-caption text-[11px] text-muted-foreground">
                  18 of 25 tasks complete
                </span>
              </CardContent>
            </Card>
          </aside>

          {/* Main column */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 px-8 py-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  New-hire onboarding
                </h1>
                <p className="font-caption text-caption text-muted-foreground">
                  Maya Okafor · Product Designer · starts Mon, Mar 3 · San
                  Francisco
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Pre-boarding</Badge>
                <Badge variant="outline">Buddy assigned</Badge>
              </div>
            </div>

            {/* Checklist toolbar with action key hints */}
            <div className="flex items-center gap-2.5">
              <InputGroup className="h-9 w-64">
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Filter checklist…"
                  aria-label="Filter checklist"
                />
                <InputGroupAddon align="inline-end">
                  <Kbd>/</Kbd>
                </InputGroupAddon>
              </InputGroup>
              <Button size="sm">
                Add task
                <Kbd data-icon="inline-end" className="translate-y-px">
                  N
                </Kbd>
              </Button>
              <Button variant="outline" size="sm">
                Assign owner
                <Kbd data-icon="inline-end" className="translate-y-px">
                  A
                </Kbd>
              </Button>
            </div>

            {/* Checklist */}
            <Card className="gap-0 py-0">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  Checklist · 6 of 11 complete
                </p>
                <span className="font-caption text-caption text-muted-foreground">
                  Press <Kbd className="mx-0.5">J</Kbd>/<Kbd>K</Kbd> to move
                  between sections
                </span>
              </div>
              <p className="font-caption text-caption border-b bg-muted/40 px-4 py-1.5 text-muted-foreground">
                IT &amp; access · due before Day 1
              </p>
              <ul className="divide-y">
                {itTasks.map((t) => (
                  <TaskRow key={t.task} task={t} />
                ))}
              </ul>
              <p className="font-caption text-caption border-y bg-muted/40 px-4 py-1.5 text-muted-foreground">
                Paperwork · People ops
              </p>
              <ul className="divide-y">
                {paperworkTasks.map((t) => (
                  <TaskRow key={t.task} task={t} />
                ))}
              </ul>
            </Card>

            {/* Day-one schedule */}
            <Card className="gap-0 py-0">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  Day-one schedule · Mon, Mar 3
                </p>
                <span className="font-caption text-caption text-muted-foreground">
                  Pacific time
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 font-caption text-caption">
                      Time
                    </TableHead>
                    <TableHead className="font-caption text-caption">
                      Activity
                    </TableHead>
                    <TableHead className="font-caption text-caption">
                      Host
                    </TableHead>
                    <TableHead className="font-caption text-caption text-end">
                      Location
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.time}>
                      <TableCell className="font-code text-xs text-muted-foreground">
                        {row.time}
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {row.activity}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {row.owner}
                      </TableCell>
                      <TableCell className="text-end text-sm text-muted-foreground">
                        {row.place}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </main>

          {/* Right rail: profile + shortcut cheat-sheet */}
          <aside className="flex w-80 shrink-0 flex-col gap-4 border-s px-4 py-6">
            <Card className="gap-0 py-0">
              <CardContent className="flex items-start gap-3.5 px-4 py-4">
                <Avatar size="lg" aria-label="Maya Okafor">
                  <AvatarFallback className="font-code text-sm font-semibold">
                    MO
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    Maya Okafor
                  </p>
                  <p className="font-caption text-caption text-muted-foreground">
                    Product Designer · Brand squad
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Progress
                      value={55}
                      className="h-1.5"
                      aria-label="Onboarding 55 percent"
                    />
                    <span className="font-code text-xs text-muted-foreground">
                      55%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-0 py-0">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-sm">Keyboard shortcuts</CardTitle>
                <CardDescription className="font-caption text-caption">
                  Available anywhere in onboarding
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4 pb-4">
                {shortcutSections.map((section) => (
                  <div key={section.heading} className="flex flex-col">
                    <p className="font-caption text-caption pb-1 text-muted-foreground">
                      {section.heading}
                    </p>
                    <ul>
                      {section.rows.map((row) => (
                        <li
                          key={row.action}
                          className="flex items-center justify-between border-b border-dashed py-1.5 last:border-b-0"
                        >
                          <span className="text-sm text-muted-foreground">
                            {row.action}
                          </span>
                          <KbdGroup>
                            {row.keys.map((k) => (
                              <Kbd key={k}>{k}</Kbd>
                            ))}
                          </KbdGroup>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <p className="mt-auto flex items-center justify-between font-caption text-caption text-muted-foreground">
              <span>Northwind People · v4.2</span>
              <span className="inline-flex items-center gap-1.5">
                Press
                <Kbd>?</Kbd>
                for help
              </span>
            </p>
          </aside>
        </div>
      </div>
    </EvalShell>
  )
}
