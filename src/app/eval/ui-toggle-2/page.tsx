"use client"
// EVAL page — toggle p2 — social media post scheduler — 834x1112 light (tablet)
// Toggle front and center: platform toggles (X + LinkedIn pressed), a
// weekday repeat picker (Tue/Thu pressed) and time-slot toggles (09:00
// pressed — single-select feel), all outlined. Co-stars: Card, Badge,
// Button, Avatar, Textarea, Progress.

import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

const days = [
  { short: "M", full: "Monday", on: false },
  { short: "T", full: "Tuesday", on: true },
  { short: "W", full: "Wednesday", on: false },
  { short: "T", full: "Thursday", on: true },
  { short: "F", full: "Friday", on: false },
  { short: "S", full: "Saturday", on: false },
  { short: "S", full: "Sunday", on: false },
] as const

const queue = [
  {
    when: "Tue 09:00",
    platform: "X",
    excerpt: "Changelog: v2.4 — recurring slots, per-platform drafts",
    state: "Scheduled",
    who: "LM",
  },
  {
    when: "Wed 12:30",
    platform: "LinkedIn",
    excerpt: "Case study: how Northwind cut campaign prep from 6h to 40min",
    state: "Needs review",
    who: "AO",
  },
  {
    when: "Fri 18:00",
    platform: "X + LinkedIn",
    excerpt: "AMA announcement — Friday 18:00 CET with the roasting team",
    state: "Draft",
    who: "LM",
  },
] as const

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-6 pb-24 pt-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-sm bg-primary font-code text-xs font-medium text-primary-foreground">
            Cd
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Cadence</p>
            <p className="font-caption text-caption text-muted-foreground">
              Social post scheduler
            </p>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Avatar size="sm">
                <AvatarFallback>NW</AvatarFallback>
              </Avatar>
              Northwind Coffee
            </Button>
            <Avatar>
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Week strip */}
        <div className="mt-5 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Previous week"
          >
            <ChevronLeft />
          </Button>
          <div className="text-center">
            <p className="font-code text-sm text-foreground">
              Feb 17 – Feb 23
            </p>
            <p className="font-caption text-caption text-muted-foreground">
              12 posts queued · 3 drafts
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Next week">
            <ChevronRight />
          </Button>
        </div>

        {/* Composer */}
        <Card className="mt-5 gap-4 rounded-lg p-5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">Compose post</p>
            <Badge variant="secondary">Draft</Badge>
            <Button variant="ghost" size="sm" className="ms-auto">
              Save draft
            </Button>
          </div>

          <div className="flex gap-3">
            <Avatar className="mt-0.5">
              <AvatarFallback>NW</AvatarFallback>
            </Avatar>
            <Textarea
              aria-label="Post text"
              className="min-h-[96px] text-sm"
              defaultValue="Single-origin drop, gone Saturday. Our Yirgacheffe lot lands in 40 cafés this week — we roasted it in 12kg batches so nothing sits on the shelf. Early access for subscribers opens 08:00 tomorrow."
            />
          </div>

          {/* Platform toggles */}
          <div className="flex flex-col gap-2 border-t pt-4">
            <p className="font-caption text-caption font-medium text-muted-foreground">
              Publish to
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle variant="outline" defaultPressed>
                <Twitter />
                X
              </Toggle>
              <Toggle variant="outline" defaultPressed>
                <Linkedin />
                LinkedIn
              </Toggle>
              <Toggle variant="outline">
                <Instagram />
                Instagram
              </Toggle>
              <Toggle variant="outline">
                <Youtube />
                YouTube
              </Toggle>
            </div>
          </div>

          {/* Weekday toggles */}
          <div className="flex flex-col gap-2 border-t pt-4">
            <div className="flex items-baseline justify-between">
              <p className="font-caption text-caption font-medium text-muted-foreground">
                Repeat weekly on
              </p>
              <span className="font-code text-xs text-muted-foreground">
                2 of 7 days
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {days.map((d) => (
                <Toggle
                  key={d.full}
                  size="sm"
                  variant="outline"
                  defaultPressed={d.on}
                  aria-label={`Repeat on ${d.full}`}
                  className="w-9 px-0 font-code"
                >
                  {d.short}
                </Toggle>
              ))}
            </div>
          </div>

          {/* Time-slot toggles */}
          <div className="flex flex-col gap-2 border-t pt-4">
            <p className="font-caption text-caption font-medium text-muted-foreground">
              Time slot (CET)
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle size="sm" variant="outline" defaultPressed>
                09:00
              </Toggle>
              <Toggle size="sm" variant="outline">
                12:30
              </Toggle>
              <Toggle size="sm" variant="outline">
                18:00
              </Toggle>
            </div>
          </div>

          {/* Per-platform length budgets */}
          <div className="flex flex-col gap-3 border-t pt-4">
            <div className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm text-foreground">X</span>
              <Progress
                value={76}
                aria-label="X post length 214 of 280 characters"
                className="flex-1"
              />
              <span className="w-28 shrink-0 whitespace-nowrap text-end font-code text-xs text-muted-foreground">
                214 / 280
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm text-foreground">
                LinkedIn
              </span>
              <Progress
                value={37}
                aria-label="LinkedIn post length 1,102 of 3,000 characters"
                className="flex-1"
              />
              <span className="w-28 shrink-0 whitespace-nowrap text-end font-code text-xs text-muted-foreground">
                1,102 / 3,000
              </span>
            </div>
          </div>
        </Card>

        {/* This week's queue */}
        <Card className="mt-5 gap-0 rounded-lg py-0">
          <div className="flex items-center justify-between px-5 py-3.5">
            <p className="text-sm font-medium text-foreground">This week</p>
            <Button variant="ghost" size="sm">
              View calendar
            </Button>
          </div>
          <div className="divide-y">
            {queue.map((q) => (
              <div key={q.when} className="flex items-center gap-3 px-5 py-3">
                <span className="w-[72px] shrink-0 font-code text-xs text-muted-foreground">
                  {q.when}
                </span>
                <Badge variant="outline" className="shrink-0">
                  {q.platform}
                </Badge>
                <p className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {q.excerpt}
                </p>
                <Badge
                  variant={
                    q.state === "Scheduled" ? "secondary" : "outline"
                  }
                  className={
                    q.state === "Draft" ? "shrink-0 text-muted-foreground" : "shrink-0"
                  }
                >
                  {q.state}
                </Badge>
                <Avatar size="sm" className="shrink-0">
                  <AvatarFallback>{q.who}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </Card>

        {/* Sticky action bar */}
        <footer className="sticky bottom-0 -mx-6 mt-5 flex items-center gap-3 border-t bg-background px-6 py-3">
          <p className="font-caption text-caption text-muted-foreground">
            Next slot Tue 09:00 · 2 platforms · 8× in March
          </p>
          <div className="ms-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              Preview
            </Button>
            <Button size="sm">Schedule post</Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
