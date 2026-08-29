"use client"

// EVAL page — date-picker p2 — HR onboarding checklist for new hires —
// 1920x1080 dark. DatePicker as the due-date control across a week-1
// checklist table (compact single-date triggers), a stored start date,
// and the "Orientation window" range picker rendered OPEN with presets.
// Other components: Card, Table, Badge, Button, Checkbox, Avatar,
// Progress, Breadcrumb, Separator, Input.

import * as React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  BellIcon,
  CalendarDaysIcon,
  FileTextIcon,
  LaptopIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  PencilIcon,
  SearchIcon,
  UserPlusIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { DatePicker } from "@/components/ui/date-picker"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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

// ── deterministic schedule data ─────────────────────────────────────────
const today = new Date()
const start = (() => {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const diff = (8 - d.getDay()) % 7 || 7 // next Monday
  d.setDate(d.getDate() + diff)
  return d
})()
const day = (n: number) => addDays(start, n)
const fmtDay = (d: Date) => format(d, "EEE, MMM d")
const countdown = Math.round((start.getTime() - today.getTime()) / 86400000)

type Owner = { name: string; initials: string; role: string }

const owners: Record<"priya" | "jonas" | "it", Owner> = {
  priya: { name: "Priya Raman", initials: "PR", role: "People ops" },
  jonas: { name: "Jonas Ekström", initials: "JE", role: "Onboarding buddy" },
  it: { name: "IT Service Desk", initials: "IT", role: "Support" },
}

type Task = {
  id: string
  task: string
  owner: Owner
  due: Date
  status: "done" | "scheduled" | "overdue"
}

const tasks: Task[] = [
  {
    id: "offer",
    task: "Sign offer letter & NDA",
    owner: owners.priya,
    due: day(-5),
    status: "done",
  },
  {
    id: "payroll",
    task: "Payroll, tax & bank details",
    owner: owners.priya,
    due: day(-4),
    status: "done",
  },
  {
    id: "handbook",
    task: "Pre-boarding reading: design handbook",
    owner: { name: "Maya Okafor", initials: "MO", role: "New hire" },
    due: day(-1),
    status: "overdue",
  },
  {
    id: "laptop",
    task: "Laptop & badge pickup · desk 4.12",
    owner: owners.it,
    due: day(0),
    status: "scheduled",
  },
  {
    id: "sso",
    task: "SSO, email & Slack access",
    owner: owners.it,
    due: day(0),
    status: "scheduled",
  },
  {
    id: "figma",
    task: "Figma seat & design repo access",
    owner: owners.jonas,
    due: day(1),
    status: "scheduled",
  },
]

const sessions = [
  { when: "Mon 09:30", what: "Laptop, badge & security briefing" },
  { when: "Mon 11:00", what: "Tools setup with IT" },
  { when: "Tue 10:00", what: "Product walkthrough · growth pod" },
  { when: "Wed 14:00", what: "Design crit — first observe" },
  { when: "Thu 09:00", what: "1:1 with Ana Duarte (design lead)" },
  { when: "Fri 16:00", what: "Week 1 retro & goals draft" },
  { when: "Fri 17:00", what: "Cohort photo & wrap-up" },
]

const milestones = [
  { label: "Day 1", date: day(0), note: "Laptop pickup · team lunch" },
  { label: "Day 5", date: day(4), note: "Week 1 retro with buddy" },
  { label: "Day 30", date: day(29), note: "30-day review · goals v1" },
  { label: "Day 90", date: day(89), note: "Probation review · comp check-in" },
]

const navItems = [
  { icon: LayoutDashboardIcon, label: "Dashboard", active: false },
  { icon: UserPlusIcon, label: "Onboarding", active: true },
  { icon: CalendarDaysIcon, label: "Time off", active: false },
  { icon: WalletIcon, label: "Payroll", active: false },
  { icon: FileTextIcon, label: "Documents", active: false },
]

const cohorts = [
  { label: "Design · Aug 31", hires: 4, active: true },
  { label: "Engineering · Aug 31", hires: 7, active: false },
  { label: "Sales · Sep 14", hires: 3, active: false },
]

const equipment = [
  { item: 'MacBook Pro 14" · 32 GB', eta: "ETA Aug 28", state: "Ordered" },
  { item: "Figma seat · org licence", eta: "on Day 1", state: "Pending" },
  { item: "VPN key & 1Password", eta: "issued Aug 26", state: "Ready" },
]

export default function Page() {
  const [dueDates, setDueDates] = React.useState<Record<string, Date>>(
    Object.fromEntries(tasks.map((t) => [t.id, t.due]))
  )
  const [orientation, setOrientation] = React.useState<DateRange | undefined>({
    from: day(0),
    to: day(4),
  })

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <UsersIcon className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3 text-foreground">
              Meridian People
            </span>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">People</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Onboarding</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Maya Okafor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search people, tasks…"
                aria-label="Search people and tasks"
                className="h-8 w-64 pl-8"
              />
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <BellIcon />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="font-code text-xs">PR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[220px_minmax(0,1fr)_360px] gap-5 p-5">
          {/* ── Sidebar ───────────────────────────────────────────── */}
          <nav className="flex min-w-0 flex-col gap-1" aria-label="Sections">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex h-9 items-center gap-2.5 rounded-md px-3 text-sm transition-colors ${
                  item.active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
            <Separator className="my-3" />
            <p className="px-3 pb-1 font-code text-[11px] uppercase tracking-wide text-muted-foreground">
              Cohorts · Q3
            </p>
            {cohorts.map((c) => (
              <button
                key={c.label}
                type="button"
                className={`flex h-9 items-center justify-between gap-2 rounded-md px-3 text-sm transition-colors ${
                  c.active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <span className="truncate">{c.label}</span>
                <Badge variant="outline">{c.hires}</Badge>
              </button>
            ))}
            <div className="mt-auto rounded-lg border bg-card p-3">
              <p className="text-sm font-medium">Q3 intake</p>
              <p className="mt-0.5 font-caption text-caption text-muted-foreground">
                23 of 28 offers signed
              </p>
              <Progress value={82} className="mt-2.5 h-1.5" aria-label="Q3 intake progress" />
            </div>
          </nav>

          {/* ── Main ───────────────────────────────────────────────── */}
          <main className="flex min-w-0 flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="font-heading-1 text-heading-1 text-foreground">
                  Onboarding checklist
                </h1>
                <p className="mt-1 font-caption text-caption text-muted-foreground">
                  Maya Okafor · Product Designer · Design pod · starts{" "}
                  <span className="font-code text-xs">
                    {format(start, "EEE, MMM d, yyyy")}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircleIcon />
                  Message
                </Button>
                <Button size="sm">
                  <PencilIcon />
                  Edit plan
                </Button>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="gap-2.5 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Checklist</CardTitle>
                  <CardDescription>tasks complete</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3 px-6">
                  <span className="font-code text-lg tabular-nums">9 / 14</span>
                  <Progress value={64} className="h-1.5" aria-label="Checklist progress" />
                </CardContent>
              </Card>
              <Card className="gap-2.5 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Documents</CardTitle>
                  <CardDescription>signed &amp; filed</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3 px-6">
                  <span className="font-code text-lg tabular-nums">3 / 5</span>
                  <Progress value={60} className="h-1.5" aria-label="Documents progress" />
                </CardContent>
              </Card>
              <Card className="gap-2.5 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Day 1 countdown</CardTitle>
                  <CardDescription>
                    starts {format(start, "EEE, MMM d")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3 px-6">
                  <span className="font-code text-lg tabular-nums">
                    {countdown} days
                  </span>
                  <Badge variant="outline">On track</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Week 1 checklist */}
            <Card className="gap-4 py-5">
              <CardHeader>
                <CardTitle className="text-sm">Week 1 checklist</CardTitle>
                <CardDescription>
                  owners can shift due dates inline — click any date
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">6 tasks</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 sr-only">Done</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>
                          <Checkbox
                            id={`task-${t.id}`}
                            checked={t.status === "done"}
                            aria-label={t.task}
                          />
                        </TableCell>
                        <TableCell
                          className={`font-medium ${
                            t.status === "done"
                              ? "text-muted-foreground line-through"
                              : ""
                          }`}
                        >
                          {t.task}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-2">
                            <Avatar className="size-6">
                              <AvatarFallback className="font-code text-[10px]">
                                {t.owner.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{t.owner.name}</span>
                          </span>
                        </TableCell>
                        <TableCell>
                          {t.status === "done" ? (
                            <span className="font-code text-xs tabular-nums text-foreground/70">
                              {fmtDay(t.due)}
                            </span>
                          ) : (
                            <DatePicker
                              buttonClassName="h-8 px-2.5 text-xs font-normal text-muted-foreground"
                              format="EEE, MMM d"
                              value={dueDates[t.id]}
                              onValueChange={(d) =>
                                d && setDueDates((prev) => ({ ...prev, [t.id]: d }))
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {t.status === "done" && (
                            <Badge variant="secondary">Done</Badge>
                          )}
                          {t.status === "scheduled" && (
                            <Badge variant="outline">Scheduled</Badge>
                          )}
                          {t.status === "overdue" && (
                            <Badge variant="destructive">Overdue</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Equipment & access */}
            <Card className="gap-3 py-5">
              <CardHeader>
                <CardTitle className="text-sm">Equipment &amp; access</CardTitle>
                <CardDescription>
                  provisioned by IT · desk 4.12 · badge #4471
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col px-6">
                {equipment.map((e, i) => (
                  <div key={e.item}>
                    {i > 0 && <Separator className="my-2.5" />}
                    <div className="flex items-center gap-3 py-0.5">
                      <LaptopIcon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {e.item}
                      </span>
                      <span className="font-code text-xs text-muted-foreground">
                        {e.eta}
                      </span>
                      <Badge
                        variant={
                          e.state === "Ready"
                            ? "secondary"
                            : e.state === "Pending"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {e.state}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>

          {/* ── Right rail ─────────────────────────────────────────── */}
          <aside className="flex min-w-0 flex-col gap-5">
            <Card className="gap-3 py-5">
              <CardHeader>
                <CardTitle className="text-sm">Orientation window</CardTitle>
                <CardDescription>
                  pick a range or use a preset below the field
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-6">
                <Field>
                  <FieldLabel htmlFor="orientation-window">Select dates</FieldLabel>
                  <DatePicker
                    id="orientation-window"
                    mode="range"
                    value={orientation}
                    onValueChange={setOrientation}
                    format="MMM d"
                    placeholder="Pick a range"
                    buttonClassName="w-full font-normal"
                    defaultOpen
                    presets={[
                      { label: "Days 1–5", range: { from: day(0), to: day(4) } },
                      { label: "Days 1–30", range: { from: day(0), to: day(29) } },
                      { label: "Days 1–90", range: { from: day(0), to: day(89) } },
                    ]}
                  />
                </Field>
                <p className="font-caption text-caption text-muted-foreground">
                  6 sessions · 3 presenters · 9.5 h total
                </p>
                <div className="flex flex-col">
                  {sessions.map((s, i) => (
                    <div key={s.when}>
                      {i > 0 && <Separator className="my-2" />}
                      <div className="flex items-baseline gap-3">
                        <span className="w-16 shrink-0 font-code text-[11px] tabular-nums text-muted-foreground">
                          {s.when}
                        </span>
                        <span className="min-w-0 flex-1 text-sm">{s.what}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <CalendarDaysIcon />
                  Export to calendar
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-3 py-5">
              <CardHeader>
                <CardTitle className="text-sm">Milestones</CardTitle>
                <CardDescription>from the offer &amp; 30-60-90 plan</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col px-6">
                {milestones.map((m, i) => (
                  <div key={m.label}>
                    {i > 0 && <Separator className="my-2.5" />}
                    <div className="flex items-baseline gap-3">
                      <span className="w-12 shrink-0 font-code text-xs text-foreground">
                        {m.label}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{m.note}</p>
                        <p className="mt-0.5 font-code text-[11px] text-muted-foreground">
                          {format(m.date, "EEE, MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* ── Status bar ──────────────────────────────────────────── */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t px-6">
          <span className="font-code text-xs text-muted-foreground">
            plan v3 · updated 12 min ago by Priya Raman
          </span>
          <span className="font-code text-xs text-muted-foreground">
            Meridian People 5.2 · 3 cohorts in flight
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
