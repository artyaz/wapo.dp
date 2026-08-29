"use client"

// EVAL page — kanban p1 — engineering team wiki — 834x1112 dark

import {
  BellIcon,
  FilePlus2Icon,
  SearchIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { KanbanBoard } from "@/components/ui/kanban"

const stats = [
  { label: "In review", value: "4", note: "2 open > 3 days" },
  { label: "Published in August", value: "11", note: "across 6 spaces" },
  { label: "Stale (> 90 days)", value: "3", note: "needs re-verify" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      {/* Hide the Next.js dev-tools indicator — a dev-server artifact that
          floats bottom-left and can overlap page content in screenshots. */}
      <style>{"nextjs-portal{display:none!important}"}</style>
      <div className="mx-auto flex min-h-screen w-full max-w-[790px] flex-col gap-5 px-6 pb-14 pt-5">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="font-code flex h-8 w-8 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
              AT
            </span>
            <div>
              <p className="text-sm font-medium">Atlas</p>
              <p className="text-xs text-muted-foreground">
                Engineering wiki · eng.corp
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <SearchIcon
                aria-hidden="true"
                className="text-muted-foreground pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2"
              />
              <Input
                aria-label="Search articles"
                placeholder="Search 142 articles…"
                className="h-8 w-52 pl-8"
              />
            </div>
            <Button variant="outline" size="icon-sm" aria-label="Notifications">
              <BellIcon />
            </Button>
            <AvatarGroup className="-space-x-1">
              <Avatar size="sm">
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>PN</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </header>

        {/* Page title */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-code text-xs text-muted-foreground">
              SPACE / PLATFORM-ENG
            </p>
            <h1 className="font-heading-2 text-heading-2 mt-1">
              Content pipeline
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every article ships draft → review → published. Owners keep cards
              moving weekly.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-code">
              edited 12m ago
            </Badge>
            <Button size="sm">
              <FilePlus2Icon />
              New draft
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="gap-1 py-3">
              <CardContent className="flex flex-col gap-0.5 px-4">
                <span className="font-code text-xl tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-medium">{stat.label}</span>
                <span className="text-xs text-muted-foreground">
                  {stat.note}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Board */}
        <KanbanBoard
          aria-label="Documentation content pipeline"
          className="h-[640px]"
          columnClassName="w-56"
          defaultColumns={[
            {
              id: "draft",
              title: "Draft",
              cards: [
                {
                  id: "eng-142",
                  label: "ENG-142",
                  title: "OAuth 2.1 migration guide",
                  description:
                    "Covers the token endpoint changes and the rollout calendar for Q4.",
                  assignee: { name: "Dana Kovács" },
                  tags: ["api", "auth"],
                  priority: "medium",
                },
                {
                  id: "eng-147",
                  label: "ENG-147",
                  title: "Postmortem: payments latency on Jun 12",
                  assignee: { name: "Marcus Brandt" },
                  tags: ["postmortem"],
                  priority: "low",
                },
                {
                  id: "eng-151",
                  label: "ENG-151",
                  title: "Style guide for SDK code snippets",
                  description: "Align tab size, error handling and sample data.",
                  assignee: { name: "Sofia Álvarez" },
                  progress: 30,
                },
              ],
            },
            {
              id: "review",
              title: "In Review",
              wipLimit: 3,
              cards: [
                {
                  id: "eng-138",
                  label: "ENG-138",
                  title: "Scaling the events pipeline past 50k/s",
                  description:
                    "Second reviewer pass — sharding diagram needs a legend.",
                  assignee: { name: "Priya Nair" },
                  priority: "high",
                  dueDate: "Aug 21",
                  progress: 80,
                },
                {
                  id: "eng-140",
                  label: "ENG-140",
                  title: "Runbook: Redis failover in us-east-1",
                  assignee: { name: "Jonas Berg" },
                  tags: ["runbook"],
                  priority: "urgent",
                  dueDate: "Aug 15",
                },
                {
                  id: "eng-144",
                  label: "ENG-144",
                  title: "Deprecating v1 webhooks — migration notes",
                  assignee: { name: "Dana Kovács" },
                  tags: ["api"],
                  priority: "medium",
                  dueDate: "Aug 29",
                },
                {
                  id: "eng-149",
                  label: "ENG-149",
                  title: "On-call handbook: paging thresholds",
                  assignee: { name: "Amara Okafor" },
                  tags: ["oncall"],
                  priority: "medium",
                },
              ],
            },
            {
              id: "published",
              title: "Published",
              cards: [
                {
                  id: "eng-121",
                  label: "ENG-121",
                  title: "Onboarding: first-week setup checklist",
                  assignee: { name: "Mira Haddad" },
                  dueDate: "Aug 04",
                },
                {
                  id: "eng-125",
                  label: "ENG-125",
                  title: "Design tokens reference (v2)",
                  assignee: { name: "Theo Lindqvist" },
                  dueDate: "Aug 09",
                },
              ],
            },
          ]}
        />

        {/* Footer */}
        <footer className="mt-auto">
          <Separator className="mb-3" />
          <div className="flex items-center justify-between">
            <span className="font-code text-xs text-muted-foreground">
              synced 2m ago · 142 articles · 38 contributors
            </span>
            <span className="font-code text-xs text-muted-foreground">
              review SLA: 5 working days
            </span>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
