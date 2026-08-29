"use client"

// EVAL page — select p2 — CI/CD pipeline monitor — 1920x1080 light
// Select (grouped "pipeline" filter listbox open at initial render + two
// closed filter selects + environment/branch selects in the deploy form)
// + Table, Card, Badge, Button, Input, Switch, Avatar, Progress, Label.

import { GitBranch, Play, Search, Workflow } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const kpis = [
  { label: "Success rate · 7d", value: "94.2%", delta: "+1.1 pts" },
  { label: "Median duration", value: "6m 48s", delta: "-22s" },
  { label: "Active runs", value: "3", delta: "2 pipelines" },
  { label: "Failed · 24h", value: "1", delta: "checkout-api" },
]

const environmentItems = [
  { label: "prod-us-east-1", value: "prod-us-east" },
  { label: "prod-eu-west-1", value: "prod-eu-west" },
  { label: "staging-main", value: "staging" },
  { label: "pr-482-observability", value: "pr-482" },
]

const branchItems = [
  { label: "release/2.14.0", value: "release/2.14.0" },
  { label: "main", value: "main" },
  { label: "feat/observability", value: "feat/observability" },
  { label: "hotfix/token-ramp", value: "hotfix/token-ramp" },
]

const pipelineItems = [
  { label: "All pipelines", value: "all" },
  { label: "web-gateway", value: "web-gateway" },
  { label: "checkout-api", value: "checkout-api" },
  { label: "auth-service", value: "auth-service" },
  { label: "worker-fleet", value: "worker-fleet" },
  { label: "docs-site", value: "docs-site" },
]

const statusItems = [
  { label: "Any status", value: "any" },
  { label: "Passed", value: "passed" },
  { label: "Failed", value: "failed" },
  { label: "Running", value: "running" },
]

const rangeItems = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
]

const runs = [
  {
    pipeline: "web-gateway",
    commit: "a3f92c1",
    branch: "main",
    env: "prod",
    duration: "4m 12s",
    status: "Passed",
    who: "Dev Sharma",
    initials: "DS",
    when: "09:41",
  },
  {
    pipeline: "checkout-api",
    commit: "7b2e08d",
    branch: "main",
    env: "prod",
    duration: "2m 04s",
    status: "Failed",
    who: "Dev Sharma",
    initials: "DS",
    when: "09:36",
  },
  {
    pipeline: "auth-service",
    commit: "51cc9af",
    branch: "release/2.14.0",
    env: "staging",
    duration: "6m 48s",
    status: "Passed",
    who: "Marisol Vega",
    initials: "MV",
    when: "09:12",
  },
  {
    pipeline: "worker-fleet",
    commit: "e0d1b34",
    branch: "main",
    env: "prod",
    duration: "11m 03s",
    status: "Passed",
    who: "bot/renovate",
    initials: "BR",
    when: "08:47",
  },
  {
    pipeline: "docs-site",
    commit: "9f7a2c5",
    branch: "feat/observability",
    env: "preview",
    duration: "1m 56s",
    status: "Running",
    who: "Yuki Tanaka",
    initials: "YT",
    when: "08:31",
  },
  {
    pipeline: "web-gateway",
    commit: "c41d6ea",
    branch: "main",
    env: "prod",
    duration: "4m 39s",
    status: "Passed",
    who: "bot/renovate",
    initials: "BR",
    when: "08:02",
  },
  {
    pipeline: "checkout-api",
    commit: "88ab3f0",
    branch: "release/2.14.0",
    env: "staging",
    duration: "8m 17s",
    status: "Passed",
    who: "Amara Osei",
    initials: "AO",
    when: "07:48",
  },
  {
    pipeline: "auth-service",
    commit: "2de5f71",
    branch: "main",
    env: "prod",
    duration: "—",
    status: "Queued",
    who: "scheduler",
    initials: "SC",
    when: "07:30",
  },
]

function StatusBadge({ status }: { status: string }) {
  if (status === "Passed") {
    return (
      <Badge variant="outline" className="border-success-500/50 text-success-700">
        Passed
      </Badge>
    )
  }
  if (status === "Failed") {
    return (
      <Badge variant="outline" className="border-destructive/40 text-destructive">
        Failed
      </Badge>
    )
  }
  if (status === "Running") {
    return <Badge variant="outline">Running</Badge>
  }
  return (
    <Badge
      variant="outline"
      className="border-border text-muted-foreground"
    >
      Queued
    </Badge>
  )
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* App header */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-8 border-b bg-card px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Workflow className="size-5" />
              <span className="font-heading-3 text-heading-3">Kestrel CI</span>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <span className="font-medium text-foreground">Pipelines</span>
              <span className="text-muted-foreground">Runs</span>
              <span className="text-muted-foreground">Deployments</span>
              <span className="text-muted-foreground">Insights</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" aria-label="Search runs">
              <Search />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page title + filters */}
        <div className="flex items-end justify-between gap-6 px-8 pt-6">
          <div>
            <h1 className="font-heading-1 text-heading-1">Deployments</h1>
            <p className="font-caption text-caption text-muted-foreground">
              8 runs · production + staging · updated 09:41 UTC
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Pipeline filter — grouped listbox open at initial render */}
            <Select items={pipelineItems} defaultValue="all" defaultOpen>
              <SelectTrigger
                className="w-44"
                aria-label="Filter by pipeline"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All pipelines</SelectItem>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>
                  <SelectItem value="web-gateway">
                    <span className="font-code">web-gateway</span>
                  </SelectItem>
                  <SelectItem value="checkout-api">
                    <span className="font-code">checkout-api</span>
                  </SelectItem>
                  <SelectItem value="auth-service">
                    <span className="font-code">auth-service</span>
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Infrastructure</SelectLabel>
                  <SelectItem value="worker-fleet">
                    <span className="font-code">worker-fleet</span>
                  </SelectItem>
                  <SelectItem value="docs-site">
                    <span className="font-code">docs-site</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={statusItems} defaultValue="any">
              <SelectTrigger className="w-32" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any status</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>
            <Select items={rangeItems} defaultValue="24h">
              <SelectTrigger className="w-36" aria-label="Time range">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Play />
              New deployment
            </Button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4 px-8 pt-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg border bg-card px-4 py-3"
            >
              <p className="font-caption text-caption text-muted-foreground">
                {kpi.label}
              </p>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-code text-xl text-foreground">
                  {kpi.value}
                </span>
                <span className="font-code text-xs text-muted-foreground">
                  {kpi.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Runs table + deploy form */}
        <div className="grid flex-1 grid-cols-12 items-start gap-6 px-8 pt-5 pb-6">
          <div className="col-span-8 overflow-hidden rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Pipeline</TableHead>
                  <TableHead>Commit</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Env</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Triggered by</TableHead>
                  <TableHead className="pr-6 text-right">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs.map((run) => (
                  <TableRow key={`${run.pipeline}-${run.commit}`}>
                    <TableCell className="py-3 pl-6 text-sm font-medium">
                      {run.pipeline}
                    </TableCell>
                    <TableCell className="font-code text-sm text-muted-foreground">
                      {run.commit}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 font-code text-sm text-muted-foreground">
                        <GitBranch className="size-3.5" />
                        {run.branch}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-code">
                        {run.env}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-code text-sm text-muted-foreground">
                      {run.duration}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={run.status} />
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm">
                        <Avatar size="sm">
                          <AvatarFallback>{run.initials}</AvatarFallback>
                        </Avatar>
                        {run.who}
                      </span>
                    </TableCell>
                    <TableCell className="pr-6 text-right font-code text-sm text-muted-foreground">
                      {run.when}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="col-span-4 flex flex-col gap-4">
            {/* New deployment — selects in a form context */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">New deployment</CardTitle>
                <CardDescription>
                  Ship release/2.14.0 from a protected branch
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deploy-environment">Environment</Label>
                  <Select items={environmentItems} defaultValue="prod-us-east">
                    <SelectTrigger
                      id="deploy-environment"
                      className="w-full"
                      aria-label="Deployment environment"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Production</SelectLabel>
                        <SelectItem value="prod-us-east">
                          <span className="font-code">prod-us-east-1</span>
                        </SelectItem>
                        <SelectItem value="prod-eu-west">
                          <span className="font-code">prod-eu-west-1</span>
                        </SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Staging</SelectLabel>
                        <SelectItem value="staging">
                          <span className="font-code">staging-main</span>
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Preview</SelectLabel>
                        <SelectItem value="pr-482">
                          <span className="font-code">pr-482-observability</span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deploy-branch">Branch</Label>
                  <Select items={branchItems} defaultValue="release/2.14.0">
                    <SelectTrigger
                      id="deploy-branch"
                      className="w-full"
                      aria-label="Deployment branch"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="release/2.14.0">
                        <span className="font-code">release/2.14.0</span>
                      </SelectItem>
                      <SelectItem value="main">
                        <span className="font-code">main</span>
                      </SelectItem>
                      <SelectItem value="feat/observability">
                        <span className="font-code">feat/observability</span>
                      </SelectItem>
                      <SelectItem value="hotfix/token-ramp">
                        <span className="font-code">hotfix/token-ramp</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deploy-tag">Version tag</Label>
                  <Input
                    id="deploy-tag"
                    defaultValue="v2.14.0-rc.3"
                    className="font-code"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor="auto-rollback" className="text-sm">
                      Auto-rollback
                    </Label>
                    <p className="font-caption text-caption text-muted-foreground">
                      Revert if health checks fail
                    </p>
                  </div>
                  <Switch id="auto-rollback" defaultChecked />
                </div>
                <Button className="w-full">
                  <Play />
                  Start deployment
                </Button>
              </CardContent>
            </Card>

            {/* Rollout health */}
            <Card className="gap-3">
              <CardHeader>
                <CardTitle className="text-sm">Rollout health</CardTitle>
                <CardDescription>Last 7 days · all pipelines</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-caption text-caption text-muted-foreground">
                    Success rate
                  </span>
                  <span className="font-code text-sm">94.2%</span>
                </div>
                <Progress value={94} aria-label="Success rate" />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-caption text-caption text-muted-foreground">
                    168 of 178 runs passed
                  </span>
                  <Badge
                    variant="outline"
                    className="border-warning-500/50 text-warning-700"
                  >
                    1 flaky suite
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-8">
          <span className="font-code text-xs text-muted-foreground">
            build 2.14.0 · runner pool us-east-1 · 3 agents online
          </span>
          <Button variant="ghost" size="sm">
            Open runbook
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
