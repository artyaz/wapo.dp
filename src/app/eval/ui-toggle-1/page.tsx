"use client"
// EVAL page — toggle p1 — engineering team wiki — 1180x820 dark
// Toggle front and center: a sticky editor toolbar of icon toggles with
// mixed pressed states (Bold/Code/List on, others off) plus outlined view
// toggles (Preview on, Full width off), and review meta. Glass blur only on
// the floating toolbar; flat panels + hairline borders elsewhere.
// Co-stars: Card, Badge, Button, Avatar, Separator, Kbd.

import {
  Bold,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Code,
  Eye,
  FileText,
  GitPullRequest,
  Home,
  Image as ImageIcon,
  Italic,
  Lightbulb,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Plus,
  Quote,
  Search,
  Strikethrough,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"

const nav = [
  { icon: Home, label: "Overview", count: null, active: false },
  { icon: FileText, label: "Engineering", count: "48", active: true },
  { icon: GitPullRequest, label: "RFCs", count: "12", active: false },
  { icon: BookOpen, label: "Runbooks", count: "26", active: false },
  { icon: FileText, label: "Onboarding", count: null, active: false },
  { icon: Calendar, label: "Team calendar", count: null, active: false },
] as const

const toc = [
  { n: "01", label: "Pool sizing", active: true },
  { n: "02", label: "Failover behavior", active: false },
  { n: "03", label: "Rollout plan", active: false },
  { n: "04", label: "Related runbooks", active: false },
] as const

const related = [
  "INC-2841 · postmortem (write timeouts)",
  "pgbouncer runbook · v9",
  "Ledger write path — architecture diagram",
] as const

const reviewers = ["DN", "MK", "TA"] as const

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[236px] shrink-0 flex-col border-r md:flex">
          <div className="flex items-center gap-2 px-4 py-4">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary font-code text-xs font-medium text-primary-foreground">
              LP
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                Ledger Platform
              </p>
              <p className="font-caption text-caption text-muted-foreground">
                Engineering wiki
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {nav.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-sm bg-muted px-2 py-1.5 text-sm font-medium text-foreground"
                    : "flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                }
              >
                <item.icon className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.count && (
                  <span className="font-code text-xs text-muted-foreground">
                    {item.count}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <div className="mt-auto px-4 pb-4">
            <Separator className="mb-4" />
            <p className="font-caption text-caption text-muted-foreground">
              3 edits this week · 2 pages in review
            </p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex items-center gap-3 border-b px-6 py-3">
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 items-center gap-2.5 font-code text-xs text-muted-foreground"
            >
              <span className="flex min-w-0 items-center gap-1">
                <span className="shrink-0">engineering</span>
                <ChevronRight className="size-3 shrink-0" />
                <span className="truncate text-foreground">postgres-pooling</span>
              </span>
              <span className="hidden shrink-0 text-muted-foreground/70 xl:inline">
                v14 · synced 3 min ago
              </span>
            </nav>
            <div className="ms-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search />
                Search
                <Kbd className="ms-2">⌘K</Kbd>
              </Button>
              <Button size="sm">
                <Plus />
                New page
              </Button>
              <Avatar size="sm">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Sticky editor toolbar — the Toggle showcase.
              Glass blur is allowed here: it floats above the document. */}
          <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
            <div className="flex flex-wrap items-center gap-1 px-6 py-2">
              <Toggle
                size="sm"
                defaultPressed
                aria-label="Toggle bold"
                className="px-0"
              >
                <Bold />
              </Toggle>
              <Toggle
                size="sm"
                defaultPressed
                aria-label="Toggle italic"
                className="px-0"
              >
                <Italic />
              </Toggle>
              <Toggle
                size="sm"
                aria-label="Toggle strikethrough"
                className="px-0"
              >
                <Strikethrough />
              </Toggle>
              <Toggle
                size="sm"
                defaultPressed
                aria-label="Toggle inline code"
                className="px-0"
              >
                <Code />
              </Toggle>
              <Toggle size="sm" aria-label="Toggle link" className="px-0">
                <Link2 />
              </Toggle>
              <Toggle size="sm" aria-label="Toggle blockquote" className="px-0">
                <Quote />
              </Toggle>
              <Toggle
                size="sm"
                defaultPressed
                aria-label="Toggle bulleted list"
                className="px-0"
              >
                <List />
              </Toggle>
              <Toggle size="sm" aria-label="Toggle numbered list" className="px-0">
                <ListOrdered />
              </Toggle>
              <Toggle
                size="sm"
                aria-label="Toggle image"
                className="px-0"
                disabled
              >
                <ImageIcon />
              </Toggle>
              <Separator orientation="vertical" className="mx-2 !h-5" />
              <Toggle size="sm" variant="outline" defaultPressed>
                <Eye />
                Preview
              </Toggle>
              <Toggle size="sm" variant="outline">
                <Maximize2 />
                Full width
              </Toggle>
              <span className="ms-auto font-code text-xs text-muted-foreground">
                412 words · saved
              </span>
            </div>
          </div>

          {/* Article + right rail */}
          <div className="mx-auto grid w-full max-w-[1040px] flex-1 gap-10 px-6 py-5 lg:grid-cols-[minmax(0,1fr)_224px]">
            <article className="min-w-0">
              <h1 className="font-heading-1 text-heading-1 text-foreground">
                Connection pooling for the ledger-write path
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <Avatar size="sm">
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">
                  Priya Raman
                </span>
                <span className="font-code text-xs text-muted-foreground">
                  edited Feb 17 · 09:41
                </span>
                <Badge variant="secondary">In review</Badge>
                <span className="font-caption text-caption text-muted-foreground">
                  6 min read
                </span>
              </div>

              <h2 className="mt-5 font-heading-2 text-heading-2 text-foreground">
                Pool sizing
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Each ledger-write pod currently opens its own pool of 8
                connections. At 60 pods that is 480 direct connections against
                a{" "}
                <span className="font-code text-xs text-foreground">
                  max_connections
                </span>{" "}
                budget of 500 — no headroom for analytics replicas. We are
                moving the write path behind a shared pgbouncer tier in
                transaction mode:
              </p>
              <div className="mt-3 rounded-lg border bg-muted/40 p-4">
                <pre className="font-code text-[13px] leading-relaxed text-foreground">
                  <code>{`[pgbouncer]
pool_mode = transaction
default_pool_size = 24        # per database-user pair
max_client_conn = 480
server_idle_timeout = 60
# rollout: 5% of traffic -> 25% -> 100%`}</code>
                </pre>
              </div>

              <h2 className="mt-5 font-heading-2 text-heading-2 text-foreground">
                Failover behavior
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                On primary failure the pooler drains server connections within{" "}
                <span className="font-code text-xs text-foreground">
                  server_login_retry=5
                </span>{" "}
                seconds. Writers must treat{" "}
                <span className="font-code text-xs text-foreground">
                  SQLSTATE 57P01
                </span>{" "}
                as retryable with jittered backoff (retry envelope: ledger client
                changelog).
              </p>

              <Card className="mt-4 flex items-start gap-3 rounded-lg py-4">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Review note — Daniel N.
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Add the burn-down chart for the 5% canary cohort before
                    this leaves review. Pool sizing table is already approved.
                  </p>
                </div>
                <Badge variant="outline" className="ms-auto shrink-0">
                  v14
                </Badge>
              </Card>
            </article>

            {/* Right rail */}
            <aside className="hidden flex-col gap-6 lg:flex">
              <div>
                <p className="font-caption text-caption font-medium uppercase text-muted-foreground">
                  On this page
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {toc.map((t) => (
                    <li key={t.n} className="flex items-baseline gap-2">
                      <span className="font-code text-xs text-muted-foreground">
                        {t.n}
                      </span>
                      <span
                        className={
                          t.active
                            ? "text-sm font-medium text-foreground"
                            : "text-sm text-muted-foreground"
                        }
                      >
                        {t.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-caption text-caption font-medium uppercase text-muted-foreground">
                  Reviewers
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  {reviewers.map((r) => (
                    <Avatar key={r} size="sm">
                      <AvatarFallback>{r}</AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="ms-1 flex items-center gap-1 font-caption text-caption text-muted-foreground">
                    <Check className="size-3" />
                    2 of 3 approved
                  </span>
                </div>
              </div>
              <div>
                <p className="font-caption text-caption font-medium uppercase text-muted-foreground">
                  Related
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {related.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <FileText className="mt-0.5 size-3.5 shrink-0" />
                      <span className="min-w-0">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </EvalShell>
  )
}
