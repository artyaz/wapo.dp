"use client"

// EVAL page — select p1 — email client inbox zero — 768x1024 dark
// Select (grouped "filter conversations" listbox OPEN at initial render +
// closed "sort" select) + Button, Input, Checkbox, Badge, Progress, Avatar.

import { Inbox, PenSquare, RefreshCw, Search } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
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

const mailboxes = [
  { name: "Inbox", count: "24", active: true },
  { name: "Starred", count: "6" },
  { name: "Snoozed", count: "3" },
  { name: "Sent" },
  { name: "Drafts", count: "2" },
  { name: "Archive" },
]

const labels = [
  { name: "Receipts", count: "12" },
  { name: "Newsletter", count: "41" },
  { name: "Team updates", count: "8" },
]

const filterItems = [
  { label: "All conversations", value: "all" },
  { label: "Unread (24)", value: "unread" },
  { label: "Starred (6)", value: "starred" },
  { label: "Snoozed (3)", value: "snoozed" },
  { label: "Receipts (12)", value: "receipts" },
  { label: "Newsletter (41)", value: "newsletter" },
  { label: "Team updates (8)", value: "team" },
]

const sortItems = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Unread first", value: "unreads" },
  { label: "Starred first", value: "stars" },
]

const messages = [
  {
    initials: "MV",
    sender: "Marisol Vega",
    subject: "Re: Praxis token audit — sign-off",
    snippet:
      "Left two comments on the neutral ramp; everything else looks ready to merge.",
    time: "09:42",
    unread: true,
    tag: "Design",
  },
  {
    initials: "DS",
    sender: "Dev Sharma",
    subject: "CI failed on main — deploy blocked",
    snippet:
      "checkout-api #2041 exited 1 in the integration stage after 4m 12s.",
    time: "09:31",
    unread: true,
    tag: "Eng",
  },
  {
    initials: "AO",
    sender: "Amara Osei",
    subject: "Contract redlines from Legal",
    snippet:
      "Sections 4 and 9 only. If you can reply before the call we can close today.",
    time: "09:15",
    unread: true,
    tag: "Legal",
    due: "Due 10:00",
  },
  {
    initials: "CB",
    sender: "Chartline Billing",
    subject: "Your March invoice is ready",
    snippet: "Invoice #INV-2041 for $48.00 was charged to Visa •• 4242.",
    time: "08:58",
    tag: "Receipts",
  },
  {
    initials: "PE",
    sender: "The Pragmatic Engineer",
    subject: "Issue #214 — the hidden cost of flaky tests",
    snippet:
      "Why 3% flakiness can eat a whole platform team's week, and what to do about it.",
    time: "08:04",
    tag: "Newsletter",
  },
  {
    initials: "IW",
    sender: "Ines Wagner",
    subject: "Lunch Friday at Nonna's Table?",
    snippet:
      "They hold reservations for 15 minutes, so 12:15 sharp. Bring the roadmap deck.",
    time: "Yest.",
  },
  {
    initials: "GH",
    sender: "GitHub",
    subject: "[halden/praxis-ui] PR #482 approved",
    snippet: "nicoreina approved your pull request — 2 checks passed, 1 comment.",
    time: "Yest.",
  },
  {
    initials: "YT",
    sender: "Yuki Tanaka",
    subject: "Updated roadmap deck v3",
    snippet: "Trimmed Q3 to three bets. Slides 7–9 replaced with the new funnel data.",
    time: "Yest.",
  },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* App header */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card px-4">
          <div className="flex items-center gap-2">
            <Inbox className="size-5" />
            <span className="font-heading-3 text-heading-3">Halden Mail</span>
          </div>
          <div className="relative mx-auto w-full max-w-[220px]">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search mail"
              aria-label="Search mail"
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm">
              <PenSquare />
              Compose
            </Button>
            <Avatar size="sm">
              <AvatarFallback>NR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Mailbox sidebar */}
          <aside className="w-52 shrink-0 border-e bg-card p-3">
            <p className="px-2 pb-1 font-caption text-caption text-muted-foreground">
              Mailboxes
            </p>
            <nav className="flex flex-col gap-0.5">
              {mailboxes.map((box) => (
                <div
                  key={box.name}
                  className={`flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm ${
                    box.active
                      ? "bg-neutral-200 text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className={box.active ? "font-medium" : undefined}>
                    {box.name}
                  </span>
                  {box.count ? (
                    <span className="font-code text-xs text-muted-foreground">
                      {box.count}
                    </span>
                  ) : null}
                </div>
              ))}
            </nav>
            <p className="px-2 pt-4 pb-1 font-caption text-caption text-muted-foreground">
              Labels
            </p>
            <nav className="flex flex-col gap-0.5">
              {labels.map((label) => (
                <div
                  key={label.name}
                  className="flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground"
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full border border-neutral-400"
                    />
                    {label.name}
                  </span>
                  <span className="font-code text-xs text-muted-foreground">
                    {label.count}
                  </span>
                </div>
              ))}
            </nav>
          </aside>

          {/* Conversation list */}
          <main className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-col gap-3 px-4 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h1 className="font-heading-2 text-heading-2">Inbox</h1>
                  <p className="font-caption text-caption text-muted-foreground">
                    24 unread · 6 need replies
                  </p>
                </div>
                <Button variant="ghost" size="icon-sm" aria-label="Refresh">
                  <RefreshCw />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                {/* Filter — open at initial render */}
                <Select items={filterItems} defaultValue="unread" defaultOpen>
                  <SelectTrigger
                    className="w-44"
                    aria-label="Filter conversations"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="all">All conversations</SelectItem>
                      <SelectItem value="unread">Unread <span className="font-code text-muted-foreground">(24)</span></SelectItem>
                      <SelectItem value="starred">Starred <span className="font-code text-muted-foreground">(6)</span></SelectItem>
                      <SelectItem value="snoozed">Snoozed <span className="font-code text-muted-foreground">(3)</span></SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Labels</SelectLabel>
                      <SelectItem value="receipts">Receipts <span className="font-code text-muted-foreground">(12)</span></SelectItem>
                      <SelectItem value="newsletter">Newsletter <span className="font-code text-muted-foreground">(41)</span></SelectItem>
                      <SelectItem value="team">Team updates <span className="font-code text-muted-foreground">(8)</span></SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select items={sortItems} defaultValue="newest">
                  <SelectTrigger
                    className="w-40"
                    aria-label="Sort conversations"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="unreads">Unread first</SelectItem>
                    <SelectItem value="stars">Starred first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Inbox-zero progress */}
            <div className="mx-4 mt-3 flex items-center gap-3 rounded-lg border bg-card px-4 py-2.5">
              <span className="text-sm font-medium whitespace-nowrap">
                Inbox zero · today
              </span>
              <div className="min-w-0 flex-1">
                <Progress value={64} aria-label="Triaged today" />
              </div>
              <span className="font-code text-xs whitespace-nowrap text-muted-foreground">
                18/28 triaged
              </span>
              <Badge variant="outline">On pace</Badge>
            </div>

            <ul className="mx-4 mt-3 mb-4 overflow-hidden rounded-lg border bg-card">
              {messages.map((message) => (
                <li
                  key={message.subject}
                  className="flex items-center gap-3 border-b px-4 py-2.5 last:border-b-0"
                >
                  <Checkbox
                    aria-label={`Select message from ${message.sender}`}
                  />
                  <Avatar size="sm">
                    <AvatarFallback>{message.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`truncate text-sm ${
                          message.unread
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.sender}
                      </span>
                      {message.tag ? (
                        <Badge variant="outline">{message.tag}</Badge>
                      ) : null}
                      {message.due ? (
                        <Badge
                          variant="outline"
                          className="border-warning-500/40 text-warning-500"
                        >
                          {message.due}
                        </Badge>
                      ) : null}
                    </div>
                    <p
                      className={`truncate text-sm ${
                        message.unread
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.subject} — {message.snippet}
                    </p>
                  </div>
                  {message.unread ? (
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-foreground"
                    />
                  ) : null}
                  <span className="w-10 shrink-0 text-right font-code text-xs text-muted-foreground">
                    {message.time}
                  </span>
                </li>
              ))}
            </ul>

            <footer className="mt-auto flex h-10 shrink-0 items-center justify-between border-t px-4">
              <span className="font-code text-xs text-muted-foreground">
                Last sync 09:47 · 24 unread
              </span>
              <Button variant="ghost" size="sm">
                Mark all read
              </Button>
            </footer>
          </main>
        </div>
      </div>
    </EvalShell>
  )
}
