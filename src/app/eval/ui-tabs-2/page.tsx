"use client"
// EVAL page — tabs p2 — software bug tracker — 1180x820 light
// Tabs front and center: issue views as icon tabs with counts
// (All 47 / Open 12 / In progress 8 / Closed 27) over a real issue table,
// plus a compact segmented range control in the severity rail card.
// Co-stars: Table, Badge, Button, Input, Avatar, Progress, Card.

import {
  CheckCheck,
  CircleDot,
  GitBranch,
  Layers,
  MessageCircle,
  Plus,
  Search,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SeverityBadge({ level }: { level: string }) {
  if (level === "Blocker") return <Badge variant="destructive">Blocker</Badge>
  if (level === "High")
    return (
      <Badge
        variant="secondary"
        className="border-transparent bg-warning-100 text-warning-700"
      >
        High
      </Badge>
    )
  return <Badge variant="outline">{level}</Badge>
}

const openIssues = [
  {
    id: "HLK-2841",
    title: "402 on saved Amex cards",
    label: "payments",
    severity: "Blocker",
    who: "RK",
    updated: "12 m ago",
    comments: 14,
  },
  {
    id: "HLK-2836",
    title: "Autofill wipes apartment number",
    label: "forms",
    severity: "High",
    who: "MT",
    updated: "48 m ago",
    comments: 6,
  },
  {
    id: "HLK-2833",
    title: "JPY tax total rounds down",
    label: "i18n",
    severity: "High",
    who: "AO",
    updated: "2 h ago",
    comments: 9,
  },
  {
    id: "HLK-2829",
    title: "Guest email rejects plus-addresses",
    label: "forms",
    severity: "Medium",
    who: "RK",
    updated: "3 h ago",
    comments: 3,
  },
  {
    id: "HLK-2824",
    title: "PDF truncates orders over 20 lines",
    label: "pdf",
    severity: "Medium",
    who: "JL",
    updated: "6 h ago",
    comments: 2,
  },
  {
    id: "HLK-2818",
    title: "Payment iframe collapses at 320 px",
    label: "css",
    severity: "Low",
    who: "—",
    updated: "yesterday",
    comments: 1,
  },
]

const inProgress = [
  {
    id: "HLK-2841",
    title: "402 on saved Amex cards",
    branch: "fix/amex-retry-402",
    pr: "#2843",
    who: "PR",
    pct: 80,
  },
  {
    id: "HLK-2836",
    title: "Apartment number wiped",
    branch: "fix/autofill-apt",
    pr: "#2838",
    who: "MT",
    pct: 55,
  },
  {
    id: "HLK-2833",
    title: "JPY rounding",
    branch: "feat/jpy-round-half-up",
    pr: "#2835",
    who: "AO",
    pct: 35,
  },
  {
    id: "HLK-2827",
    title: "Slow address lookup (EU)",
    branch: "perf/address-lookup-cache",
    pr: "#2831",
    who: "JL",
    pct: 15,
  },
]

const closed = [
  {
    id: "HLK-2809",
    title: "Duplicate charge on double-click of Pay",
    resolution: "Fixed",
    tone: "success" as const,
    when: "closed Feb 12",
    release: "v2.14.2",
  },
  {
    id: "HLK-2802",
    title: "Coupon field loses focus on paste",
    resolution: "Fixed",
    tone: "success" as const,
    when: "closed Feb 10",
    release: "v2.14.1",
  },
  {
    id: "HLK-2798",
    title: "Shipping estimate off by one day",
    resolution: "Duplicate",
    tone: "neutral" as const,
    when: "closed Feb 9",
    release: "—",
  },
  {
    id: "HLK-2791",
    title: "Legacy checkout route still resolvable",
    resolution: "Won't fix",
    tone: "neutral" as const,
    when: "closed Feb 7",
    release: "—",
  },
]

const severityMix: Record<string, { level: string; count: number; pct: number }[]> = {
  week: [
    { level: "Blocker", count: 2, pct: 16 },
    { level: "High", count: 5, pct: 42 },
    { level: "Medium", count: 4, pct: 33 },
    { level: "Low", count: 1, pct: 8 },
  ],
  month: [
    { level: "Blocker", count: 6, pct: 15 },
    { level: "High", count: 14, pct: 36 },
    { level: "Medium", count: 12, pct: 31 },
    { level: "Low", count: 7, pct: 18 },
  ],
  quarter: [
    { level: "Blocker", count: 17, pct: 14 },
    { level: "High", count: 44, pct: 37 },
    { level: "Medium", count: 38, pct: 32 },
    { level: "Low", count: 19, pct: 16 },
  ],
}

const activity = [
  { who: "PR", what: "moved HLK-2841 to In progress", when: "09:41" },
  { who: "RK", what: "commented on HLK-2836", when: "09:12" },
  { who: "AO", what: "opened HLK-2844 (Apple Pay hang)", when: "08:57" },
  { who: "JL", what: "shipped v2.14.3 — 6 issues", when: "08:30" },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex h-screen w-full max-w-[1180px] flex-col gap-4 px-6 py-4">
        {/* App header */}
        <header className="flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-3 text-heading-3 text-foreground">
              Hemlock
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Issue tracker · web-checkout
            </span>
          </div>
          <div className="relative ml-auto w-64">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues, e.g. HLK-2841"
              className="pl-8"
              aria-label="Search issues"
            />
          </div>
          <Button>
            <Plus />
            New issue
          </Button>
          <Avatar>
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </header>

        {/* Release strip */}
        <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2">
          <div className="flex items-center gap-2">
            <Badge className="border-transparent bg-success-100 text-success-700">
              v2.14.3 deployed
            </Badge>
            <span className="text-sm text-muted-foreground">
              6 issues shipped · all checks green
            </span>
          </div>
          <span className="font-code text-xs text-muted-foreground">
            a41f9c2 · 25 min ago
          </span>
        </div>

        {/* Issue views — the tabs */}
        <Tabs defaultValue="open" className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger
                value="all"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                <Layers />
                All
                <span className="font-code text-xs text-muted-foreground">47</span>
              </TabsTrigger>
              <TabsTrigger
                value="open"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                <CircleDot />
                Open
                <span className="font-code text-xs text-muted-foreground">12</span>
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                <GitBranch />
                In progress
                <span className="font-code text-xs text-muted-foreground">8</span>
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                <CheckCheck />
                Closed
                <span className="font-code text-xs text-muted-foreground">27</span>
              </TabsTrigger>
            </TabsList>
            <span className="font-caption text-caption text-muted-foreground">
              Sprint 42 · day 8 of 10 · Priya Raghunathan triaging
            </span>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] gap-4">
            {/* Main panel */}
            <TabsContent value="open" className="mt-0 min-h-0">
              <Card className="h-full gap-0 py-0">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <span className="text-sm font-medium text-foreground">
                    Open issues
                  </span>
                  <span className="font-caption text-caption text-muted-foreground">
                    sorted by severity, then recency
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24 pl-5">ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead className="w-24">Severity</TableHead>
                      <TableHead className="w-20">Assignee</TableHead>
                      <TableHead className="w-24 pe-5 text-end">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openIssues.map((i) => (
                      <TableRow key={i.id}>
                        <TableCell className="pl-5 font-code text-xs text-muted-foreground">
                          {i.id}
                        </TableCell>
                        <TableCell className="max-w-0">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm text-foreground">
                              {i.title}
                            </span>
                            <Badge variant="outline" className="font-code text-[10px]">
                              {i.label}
                            </Badge>
                            <span className="flex items-center gap-1 font-caption text-caption text-muted-foreground">
                              <MessageCircle className="size-3" />
                              {i.comments}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>
                          <SeverityBadge level={i.severity} />
                        </TableCell>
                        <TableCell>
                          {i.who === "—" ? (
                            <span className="font-caption text-caption text-muted-foreground">
                              unassigned
                            </span>
                          ) : (
                            <Avatar size="sm">
                              <AvatarFallback>{i.who}</AvatarFallback>
                            </Avatar>
                          )}
                        </TableCell>
                        <TableCell className="pe-5 text-end font-code text-xs text-muted-foreground">
                          {i.updated}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="mt-0 min-h-0">
              <Card className="h-full gap-0 py-0">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <span className="text-sm font-medium text-foreground">
                    All issues
                  </span>
                  <span className="font-caption text-caption text-muted-foreground">
                    every state · newest first
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24 pl-5">ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead className="w-24">Severity</TableHead>
                      <TableHead className="w-24">State</TableHead>
                      <TableHead className="w-20 pe-5 text-end">Assignee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...openIssues.slice(0, 5), ...closed.slice(0, 2).map((c) => ({
                      id: c.id,
                      title: c.title,
                      label: "closed",
                      severity: "Medium",
                      who: "PR",
                      updated: c.when,
                      comments: 0,
                    }))].map((i) => (
                      <TableRow key={i.id}>
                        <TableCell className="pl-5 font-code text-xs text-muted-foreground">
                          {i.id}
                        </TableCell>
                        <TableCell className="max-w-0 truncate text-sm text-foreground">
                          {i.title}
                        </TableCell>
                        <TableCell>
                          <SeverityBadge level={i.severity} />
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{i.label}</Badge>
                        </TableCell>
                        <TableCell className="pe-5">
                          <Avatar size="sm">
                            <AvatarFallback>{i.who}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="mt-0 min-h-0">
              <Card className="h-full gap-0 py-0">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <span className="text-sm font-medium text-foreground">
                    In progress
                  </span>
                  <span className="font-caption text-caption text-muted-foreground">
                    branches linked to open PRs
                  </span>
                </div>
                <div className="flex flex-col divide-y">
                  {inProgress.map((w) => (
                    <div key={w.id} className="flex items-center gap-4 px-5 py-3">
                      <Avatar size="sm">
                        <AvatarFallback>{w.who}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-foreground">
                          {w.id} · {w.title}
                        </p>
                        <p className="font-code text-xs text-muted-foreground">
                          {w.branch} → PR {w.pr}
                        </p>
                        <Progress
                          value={w.pct}
                          className="mt-2 h-1.5"
                          aria-label={`${w.id} ${w.pct}% complete`}
                        />
                      </div>
                      <span className="font-code text-xs text-muted-foreground">
                        {w.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="closed" className="mt-0 min-h-0">
              <Card className="h-full gap-0 py-0">
                <div className="flex items-center justify-between border-b px-5 py-3">
                  <span className="text-sm font-medium text-foreground">
                    Closed
                  </span>
                  <span className="font-caption text-caption text-muted-foreground">
                    last 7 days · 15 closed
                  </span>
                </div>
                <div className="flex flex-col divide-y">
                  {closed.map((c) => (
                    <div key={c.id} className="flex items-center gap-4 px-5 py-3">
                      <CheckCheck className="size-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                        {c.id} · {c.title}
                      </span>
                      <Badge
                        className={
                          c.tone === "success"
                            ? "border-transparent bg-success-100 text-success-700"
                            : undefined
                        }
                        variant={c.tone === "success" ? "secondary" : "outline"}
                      >
                        {c.resolution}
                      </Badge>
                      <span className="w-24 text-end font-code text-xs text-muted-foreground">
                        {c.release}
                      </span>
                      <span className="w-24 text-end font-code text-xs text-muted-foreground">
                        {c.when}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Right rail */}
            <div className="flex min-h-0 flex-col gap-4">
              <Card className="gap-0 py-0">
                <CardHeader className="border-b px-5 py-3">
                  <CardTitle className="text-sm">Triage board</CardTitle>
                  <CardDescription>web-checkout · this sprint</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-px px-0 py-0">
                  <div className="border-r border-b px-5 py-3">
                    <p className="font-code text-xl text-foreground">12</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      open
                    </p>
                  </div>
                  <div className="border-b px-5 py-3">
                    <p className="font-code text-xl text-foreground">8</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      in progress
                    </p>
                  </div>
                  <div className="border-r px-5 py-3">
                    <p className="font-code text-xl text-foreground">3</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      blocked
                    </p>
                  </div>
                  <div className="px-5 py-3">
                    <p className="font-code text-xl text-foreground">27</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      closed
                    </p>
                  </div>
                </CardContent>
                <div className="flex flex-col gap-1.5 border-t px-5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Sprint 42 burndown
                    </span>
                    <span className="font-code text-xs text-foreground">68%</span>
                  </div>
                  <Progress value={68} aria-label="Sprint 42 burndown, 68%" />
                </div>
              </Card>

              <Card className="gap-0 py-0">
                <CardHeader className="border-b px-5 py-3">
                  <CardTitle className="text-sm">Severity mix</CardTitle>
                </CardHeader>
                <div className="px-5 pt-3">
                  <Tabs defaultValue="week">
                    <TabsList className="w-full">
                      <TabsTrigger value="week">7 days</TabsTrigger>
                      <TabsTrigger value="month">30 days</TabsTrigger>
                      <TabsTrigger value="quarter">Quarter</TabsTrigger>
                    </TabsList>
                    {(["week", "month", "quarter"] as const).map((range) => (
                      <TabsContent key={range} value={range} className="mt-3">
                        <div className="flex flex-col gap-2.5">
                          {severityMix[range].map((s) => (
                            <div key={s.level} className="flex items-center gap-3">
                              <span className="w-16 text-sm text-foreground">
                                {s.level}
                              </span>
                              <Progress
                                value={s.pct}
                                className="h-1.5 flex-1"
                                aria-label={`${s.level}: ${s.count} issues`}
                              />
                              <span className="w-6 text-end font-code text-xs text-foreground">
                                {s.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </Card>

              <Card className="min-h-0 flex-1 gap-0 py-0">
                <CardHeader className="border-b px-5 py-3">
                  <CardTitle className="text-sm">Recent activity</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col divide-y px-0 py-0">
                  {activity.map((a) => (
                    <div key={a.what} className="flex items-center gap-3 px-5 py-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>{a.who}</AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                        {a.what}
                      </span>
                      <span className="font-code text-xs text-muted-foreground">
                        {a.when}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Hemlock · 4 maintainers · web-checkout is a private repo
          </span>
          <span className="font-code text-xs text-muted-foreground">
            synced 2 min ago
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
