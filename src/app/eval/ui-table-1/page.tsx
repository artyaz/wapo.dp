"use client"
// EVAL page — table p1 — CI/CD pipeline monitor — 1024x768 dark
// Table front and center: run history for one pipeline with status badges,
// commit info (message + mono sha), authors, branch names, mono durations,
// a live run (Spinner + Progress) and a totals footer row. Co-stars: Badge,
// Button, Avatar, Tabs, Progress, Spinner.

import {
  BarChart3,
  Boxes,
  CheckCircle2,
  GitBranch,
  Play,
  PlayCircle,
  RotateCcw,
  Settings,
  ShieldCheck,
  XCircle,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type RunStatus = "success" | "failed" | "running" | "cancelled"

type Run = {
  id: number
  status: RunStatus
  message: string
  sha: string
  author: string
  initials: string
  branch: string
  duration: string
  started: string
}

const runs: Run[] = [
  { id: 4821, status: "running", message: "feat: add idempotency key to charge endpoint", sha: "a3f9e12", author: "M. Osei", initials: "MO", branch: "feat/charge-idempotency", duration: "4m 12s", started: "14:31:52" },
  { id: 4820, status: "success", message: "fix: retry webhook delivery on 429", sha: "7c21b0e", author: "L. Tran", initials: "LT", branch: "main", duration: "6m 48s", started: "14:23:12" },
  { id: 4819, status: "success", message: "chore: bump pg driver to 0.30", sha: "1de4c8f", author: "L. Tran", initials: "LT", branch: "main", duration: "5m 02s", started: "13:58:41" },
  { id: 4818, status: "failed", message: "test: cart checkout spec flakes on staging", sha: "9b77a4d", author: "R. Silva", initials: "RS", branch: "fix/cart-flake", duration: "12m 31s", started: "13:22:07" },
  { id: 4817, status: "success", message: "perf: cache storefront product query", sha: "e02f5c9", author: "A. Kim", initials: "AK", branch: "main", duration: "7m 15s", started: "12:41:33" },
  { id: 4816, status: "cancelled", message: "docs: update on-call runbook", sha: "44c9e1b", author: "J. Park", initials: "JP", branch: "docs/runbook", duration: "—", started: "11:58:19" },
  { id: 4815, status: "success", message: "feat: expose worker latencies in /metrics", sha: "b8a1302", author: "M. Osei", initials: "MO", branch: "main", duration: "6m 05s", started: "10:12:54" },
  { id: 4814, status: "failed", message: "refactor: split payment worker package", sha: "6f3d97a", author: "A. Kim", initials: "AK", branch: "refactor/payment-worker", duration: "9m 44s", started: "09:47:02" },
  { id: 4813, status: "success", message: "fix: clamp discount codes to expiry", sha: "c5510af", author: "R. Silva", initials: "RS", branch: "main", duration: "4m 57s", started: "08:51:46" },
]

function statusBadge(status: RunStatus) {
  switch (status) {
    case "success":
      return (
        <Badge className="border-success-500/30 bg-success-500/10 text-success-500">
          <CheckCircle2 /> Passed
        </Badge>
      )
    case "failed":
      return (
        <Badge className="border-destructive-500/30 bg-destructive-500/10 text-destructive-500">
          <XCircle /> Failed
        </Badge>
      )
    case "running":
      return (
        <Badge className="border-warning-500/30 bg-warning-500/10 text-warning-500">
          <Spinner className="size-3" /> Running
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Cancelled
        </Badge>
      )
  }
}

const railItems = [
  { icon: GitBranch, label: "Pipelines", active: true },
  { icon: PlayCircle, label: "Runs", active: false },
  { icon: Boxes, label: "Environments", active: false },
  { icon: ShieldCheck, label: "Policies", active: false },
  { icon: BarChart3, label: "Insights", active: false },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Icon rail */}
        <nav className="flex w-14 shrink-0 flex-col items-center gap-1 border-e bg-card py-3">
          <div className="mb-3 flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GitBranch className="size-4" aria-hidden="true" />
          </div>
          {railItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="icon-sm"
              aria-label={item.label}
              className={
                item.active ? "bg-muted text-foreground" : "text-muted-foreground"
              }
            >
              <item.icon />
            </Button>
          ))}
          <div className="mt-auto flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Settings"
              className="text-muted-foreground"
            >
              <Settings />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">DO</AvatarFallback>
            </Avatar>
          </div>
        </nav>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-5">
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              checkout-service
            </h1>
            <Badge variant="outline" className="text-muted-foreground">
              prod
            </Badge>
            <Badge variant="outline" className="font-code text-muted-foreground">
              main
            </Badge>
            <div className="ms-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RotateCcw data-icon="inline-start" /> Re-run failed
              </Button>
              <Button size="sm">
                <Play data-icon="inline-start" /> Run pipeline
              </Button>
            </div>
          </header>

          <div className="flex h-12 shrink-0 items-center gap-4 border-b px-5">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
                <TabsTrigger value="running">Running</TabsTrigger>
                <TabsTrigger value="queued">Queued</TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="ms-auto flex items-center gap-2 font-code text-xs text-muted-foreground">
              <Spinner className="size-3 text-muted-foreground" />
              live · updated 14:36:04
            </span>
          </div>

          <main className="flex-1 overflow-hidden px-5 py-4">
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[110px] text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Commit
                    </TableHead>
                    <TableHead className="w-[130px] text-muted-foreground">
                      Author
                    </TableHead>
                    <TableHead className="w-[170px] text-muted-foreground">
                      Branch
                    </TableHead>
                    <TableHead className="w-[130px] text-end text-muted-foreground">
                      Duration
                    </TableHead>
                    <TableHead className="w-[90px] text-end text-muted-foreground">
                      Started
                    </TableHead>
                    <TableHead className="w-[52px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {runs.map((run) => (
                    <TableRow key={run.id}>
                      <TableCell>{statusBadge(run.status)}</TableCell>
                      <TableCell className="max-w-[260px]">
                        <div className="truncate font-medium">
                          {run.message}
                        </div>
                        <div className="font-code text-xs text-muted-foreground">
                          #{run.id} · {run.sha}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarFallback className="text-[10px]">
                              {run.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{run.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-code text-xs text-muted-foreground">
                          {run.branch}
                        </span>
                      </TableCell>
                      <TableCell className="text-end">
                        <span className="font-code text-sm tabular-nums">
                          {run.duration}
                        </span>
                      </TableCell>
                      <TableCell className="text-end">
                        <span className="font-code text-xs tabular-nums text-muted-foreground">
                          {run.started}
                        </span>
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Re-run pipeline ${run.id}`}
                          className="text-muted-foreground"
                        >
                          <RotateCcw />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="font-medium">
                      Last 24 h · 9 runs · 5 passed · 2 failed · 1 cancelled
                    </TableCell>
                    <TableCell className="text-end font-code text-sm tabular-nums">
                      52m 22s
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      className="text-end font-code text-xs tabular-nums text-muted-foreground"
                    >
                      avg 7m 29s
                    </TableCell>
                  </TableRow>
                </TableFooter>
                <TableCaption>
                  Runs for checkout-service on main · build history retained 30
                  days
                </TableCaption>
              </Table>
            </div>
          </main>

          <footer className="flex h-9 shrink-0 items-center justify-between border-t px-5">
            <span className="font-code text-xs text-muted-foreground">
              build agents: 6 online · queue depth 2
            </span>
            <span className="font-code text-xs text-muted-foreground">
              Relay CI v2.14.3
            </span>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
