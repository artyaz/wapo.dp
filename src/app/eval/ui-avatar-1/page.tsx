"use client"

// EVAL page — avatar p1 — CI/CD pipeline monitor — 1440x900 light

import {
  Activity,
  CheckIcon,
  GitBranch,
  KeyRound,
  PlayCircle,
  Rocket,
  Server,
  Settings2,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
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

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Pipelines", icon: GitBranch, active: true },
  { label: "Runs", icon: PlayCircle, active: false },
  { label: "Environments", icon: Server, active: false },
  { label: "Releases", icon: Rocket, active: false },
  { label: "Secrets", icon: KeyRound, active: false },
  { label: "Settings", icon: Settings2, active: false },
]

const STAGES = [
  { name: "Build", duration: "3m 12s" },
  { name: "Unit tests", duration: "4m 48s" },
  { name: "Lint", duration: "42s" },
  { name: "Deploy staging", duration: "2m 03s" },
  { name: "Smoke", duration: "1m 05s" },
]

const COMMITS = [
  {
    sha: "a41f9c2",
    message: "feat: idempotent refund retries for EU processor",
    name: "Maya Okafor",
    src: "https://i.pravatar.cc/150?img=47",
    initials: "MO",
    checks: "passed",
    when: "Today 09:12",
  },
  {
    sha: "7c02be1",
    message: "fix: settle webhook replay window off-by-one",
    name: "Dmitri Volkov",
    src: "https://i.pravatar.cc/150?img=33",
    initials: "DV",
    checks: "passed",
    when: "Today 08:48",
  },
  {
    sha: "9d44e0f",
    message: "chore: bump ledger client to 5.3.0",
    name: "Sofía Reyes",
    src: undefined,
    initials: "SR",
    checks: "passed",
    when: "Today 08:21",
  },
  {
    sha: "f10c3ab",
    message: "feat: report processor latency per region",
    name: "Kenji Watanabe",
    src: "https://i.pravatar.cc/150?img=12",
    initials: "KW",
    checks: "queued",
    when: "Today 09:36",
  },
]

const ONCALL = [
  {
    name: "Priya Raman",
    role: "Primary",
    src: "https://i.pravatar.cc/150?img=44",
    initials: "PR",
    status: "online",
  },
  {
    name: "Tom Lindqvist",
    role: "Secondary",
    src: "https://i.pravatar.cc/150?img=15",
    initials: "TL",
    status: "away",
  },
  {
    name: "Aisha Bello",
    role: "Escalation",
    src: undefined,
    initials: "AB",
    status: "offline",
  },
]

const ACTIVITY = [
  {
    name: "Maya Okafor",
    src: "https://i.pravatar.cc/150?img=47",
    initials: "MO",
    text: "requested production approval for v2.14.0",
    when: "09:41",
  },
  {
    name: "forge-bot",
    src: undefined,
    initials: "FB",
    text: "promoted build a41f9c2 to staging",
    when: "09:38",
  },
  {
    name: "Dmitri Volkov",
    src: "https://i.pravatar.cc/150?img=33",
    initials: "DV",
    text: "merged feat: idempotent refund retries",
    when: "09:12",
  },
]

function statusClasses(status: string) {
  if (status === "online") return "text-success-600"
  if (status === "away") return "text-warning-600"
  return "text-muted-foreground"
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Sidebar ---------------------------------------------------- */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-default-border bg-neutral-50">
          <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Activity className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Forge CI</p>
              <p className="text-caption font-caption text-muted-foreground mt-1">
                Northwind Platform
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-0.5 px-3" aria-label="Primary">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm ${
                  item.active
                    ? "bg-secondary font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4 shrink-0" aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
            <div className="rounded-lg border border-default-border bg-card p-3">
              <p className="text-caption font-caption text-muted-foreground">
                On-call · Payments
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                <AvatarGroup>
                  <Avatar size="sm">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=44"
                      alt="Priya Raman"
                    />
                    <AvatarFallback>PR</AvatarFallback>
                    <AvatarBadge className="bg-success-500" />
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=15"
                      alt="Tom Lindqvist"
                    />
                    <AvatarFallback>TL</AvatarFallback>
                    <AvatarBadge className="bg-warning-500" />
                  </Avatar>
                </AvatarGroup>
                <p className="font-code text-xs text-muted-foreground">
                  #payments
                </p>
              </div>
            </div>

            <Separator className="bg-default-border" />

            <div className="flex items-center gap-2.5">
              <Avatar>
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=31"
                  alt="Elena Vargas"
                />
                <AvatarFallback>EV</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-none">
                  Elena Vargas
                </p>
                <p className="text-caption font-caption text-muted-foreground mt-1">
                  Platform SRE
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main ------------------------------------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-default-border px-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">payments-api</span>
              <span className="text-muted-foreground" aria-hidden="true">
                /
              </span>
              <span className="font-code text-muted-foreground">run #4182</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Input
                type="search"
                placeholder="Search runs, commits…"
                className="h-8 w-56"
                aria-label="Search runs and commits"
              />
              <Button variant="outline" size="sm">
                Re-run
              </Button>
              <Button size="sm">
                <PlayCircle className="size-4" aria-hidden="true" />
                New run
              </Button>
            </div>
          </header>

          <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_330px] gap-6 p-6">
            {/* Left column */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* Run header */}
              <section className="rounded-lg border border-default-border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h1 className="font-heading-1 text-heading-1 text-foreground">
                        payments-api
                      </h1>
                      <Badge variant="outline" className="font-code">
                        main
                      </Badge>
                      <Badge className="border-transparent bg-success-100 text-success-700">
                        passed
                      </Badge>
                    </div>
                    <p className="mt-2 truncate text-sm text-muted-foreground">
                      feat: idempotent refund retries for EU processor
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-code text-sm text-foreground">a41f9c2</p>
                    <p className="text-caption font-caption text-muted-foreground mt-1">
                      Today 09:12 · 12m run
                    </p>
                  </div>
                </div>
                <Separator className="my-4 bg-default-border" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar>
                      <AvatarImage
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Maya Okafor"
                      />
                      <AvatarFallback>MO</AvatarFallback>
                      <AvatarBadge className="bg-success-500" />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Maya Okafor
                      </p>
                      <p className="text-caption font-caption text-muted-foreground mt-1">
                        Triggered this run
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      View logs
                    </Button>
                    <Button variant="outline" size="sm">
                      Artifacts
                    </Button>
                  </div>
                </div>
              </section>

              {/* Stage strip */}
              <section
                className="rounded-lg border border-default-border bg-card px-5 py-4"
                aria-label="Pipeline stages"
              >
                <ol className="flex items-center gap-3">
                  {STAGES.map((stage, i) => (
                    <li
                      key={stage.name}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-sm font-medium">
                          <CheckIcon
                            className="size-4 shrink-0 text-success-600"
                            aria-hidden="true"
                          />
                          {stage.name}
                        </span>
                        <span className="font-code text-xs text-muted-foreground">
                          {stage.duration}
                        </span>
                      </div>
                      {i < STAGES.length - 1 ? (
                        <span
                          className="h-px w-8 shrink-0 border-t border-dashed border-default-border"
                          aria-hidden="true"
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>

              {/* Commits table */}
              <Card className="min-h-0 py-0">
                <CardHeader className="border-b border-default-border px-5 py-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Commits in this run
                  </CardTitle>
                  <CardDescription>
                    3 commits merged since v2.13.9 · 1 queued for run #4183
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 py-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="ps-5">Author</TableHead>
                        <TableHead>Commit</TableHead>
                        <TableHead>Checks</TableHead>
                        <TableHead className="pe-5 text-end">When</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {COMMITS.map((commit) => (
                        <TableRow key={commit.sha}>
                          <TableCell className="ps-5">
                            <span className="flex items-center gap-2.5">
                              <Avatar size="sm">
                                {commit.src ? (
                                  <AvatarImage
                                    src={commit.src}
                                    alt={commit.name}
                                  />
                                ) : null}
                                <AvatarFallback>
                                  {commit.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="whitespace-nowrap text-sm">
                                {commit.name}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell className="max-w-[280px]">
                            <span className="flex items-center gap-2.5">
                              <span className="font-code text-xs text-muted-foreground">
                                {commit.sha}
                              </span>
                              <span className="truncate text-sm text-muted-foreground">
                                {commit.message}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell>
                            {commit.checks === "passed" ? (
                              <Badge variant="secondary">passed</Badge>
                            ) : (
                              <Badge variant="outline">queued</Badge>
                            )}
                          </TableCell>
                          <TableCell className="pe-5 text-end">
                            <span className="font-code text-xs text-muted-foreground">
                              {commit.when}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Right rail */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* Production approval */}
              <Card className="py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Production approval
                  </CardTitle>
                  <CardDescription className="font-code">
                    v2.14.0 · payments-api
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-5">
                  <div className="flex items-center justify-between gap-3">
                    <AvatarGroup>
                      <Avatar>
                        <AvatarImage
                          src="https://i.pravatar.cc/150?img=47"
                          alt="Maya Okafor"
                        />
                        <AvatarFallback>MO</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage
                          src="https://i.pravatar.cc/150?img=33"
                          alt="Dmitri Volkov"
                        />
                        <AvatarFallback>DV</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage
                          src="https://i.pravatar.cc/150?img=44"
                          alt="Priya Raman"
                        />
                        <AvatarFallback>PR</AvatarFallback>
                      </Avatar>
                      <AvatarGroupCount>+1</AvatarGroupCount>
                    </AvatarGroup>
                    <p className="text-caption font-caption text-muted-foreground">
                      Approvers
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Progress value={75} aria-label="Approvals" />
                    <p className="font-code text-xs text-muted-foreground">
                      3 of 4 approvals · requires 4
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <Button size="sm" className="flex-1">
                      Approve release
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* On-call */}
              <Card className="py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    On-call tonight
                  </CardTitle>
                  <CardDescription>Rotation · 22:00–06:00 UTC</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 px-5">
                  {ONCALL.map((person) => (
                    <div
                      key={person.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex items-center gap-2.5">
                        <Avatar>
                          {person.src ? (
                            <AvatarImage src={person.src} alt={person.name} />
                          ) : null}
                          <AvatarFallback>{person.initials}</AvatarFallback>
                          <AvatarBadge
                            className={
                              person.status === "online"
                                ? "bg-success-500"
                                : person.status === "away"
                                  ? "bg-warning-500"
                                  : "bg-neutral-400"
                            }
                          />
                        </Avatar>
                        <span>
                          <span className="block text-sm font-medium leading-none">
                            {person.name}
                          </span>
                          <span className="text-caption font-caption text-muted-foreground mt-1 block">
                            {person.role}
                          </span>
                        </span>
                      </span>
                      <span
                        className={`font-code text-xs ${statusClasses(person.status)}`}
                      >
                        {person.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Activity */}
              <Card className="py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Latest activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  {ACTIVITY.map((item, i) => (
                    <div key={item.when} className="flex flex-col gap-3">
                      {i > 0 ? (
                        <Separator className="bg-default-border" />
                      ) : null}
                      <div className="flex items-start gap-2.5">
                        <Avatar size="sm">
                          {item.src ? (
                            <AvatarImage src={item.src} alt={item.name} />
                          ) : null}
                          <AvatarFallback>{item.initials}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm leading-snug">
                          <span className="font-medium">{item.name}</span>{" "}
                          <span className="text-muted-foreground">
                            {item.text}
                          </span>
                        </p>
                        <span className="ms-auto font-code text-xs text-muted-foreground">
                          {item.when}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>

          <footer className="flex h-8 shrink-0 items-center justify-between border-t border-default-border px-6">
            <p className="font-code text-xs text-muted-foreground">
              All systems operational · last incident 14 days ago · us-east-1 ·
              4 runners busy
            </p>
            <p className="font-code text-xs text-muted-foreground">
              Forge CI v4.2
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
