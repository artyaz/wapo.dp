"use client"
// EVAL page — checkbox p1 — job board for designers — 1280x800 dark
// Checkbox front and center: filter facets, digest opt-ins, and a
// multi-select results list with a tri-state "select all" header.
// Co-stars: Card, Badge, Button, Input, Avatar, Progress.

import * as React from "react"
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const jobTypes = [
  { label: "Full-time", count: "2,431", checked: true },
  { label: "Contract", count: "812", checked: false },
  { label: "Freelance", count: "264", checked: true },
  { label: "Internship", count: "58", checked: false },
]

const disciplines = [
  { label: "Product / UX", count: "1,106", checked: true },
  { label: "Design systems", count: "487", checked: true },
  { label: "Brand & visual", count: "402", checked: false },
  { label: "Motion", count: "161", checked: false },
]

const workSetup = [
  { label: "Remote", count: "1,240", checked: true },
  { label: "Hybrid", count: "688", checked: true },
  { label: "On-site", count: "286", checked: false },
]

type Job = {
  id: string
  title: string
  company: string
  initials: string
  location: string
  mode: string
  salary: string
  posted: string
}

const jobs: Job[] = [
  {
    id: "j-1",
    title: "Staff Product Designer",
    company: "Figma",
    initials: "FG",
    location: "San Francisco, CA",
    mode: "Remote",
    salary: "$210–245k",
    posted: "2d ago",
  },
  {
    id: "j-2",
    title: "Design Systems Lead",
    company: "Linear",
    initials: "LN",
    location: "Remote (global)",
    mode: "Remote",
    salary: "$185–220k",
    posted: "5h ago",
  },
  {
    id: "j-3",
    title: "Senior Brand Designer",
    company: "Instrument",
    initials: "IN",
    location: "New York, NY",
    mode: "Hybrid",
    salary: "$150–180k",
    posted: "1d ago",
  },
  {
    id: "j-4",
    title: "Product Designer, Core App",
    company: "Notion",
    initials: "NT",
    location: "San Francisco, CA",
    mode: "Hybrid",
    salary: "$175–205k",
    posted: "3d ago",
  },
  {
    id: "j-5",
    title: "Motion Designer II",
    company: "Spotify",
    initials: "SP",
    location: "Stockholm, SE",
    mode: "Remote",
    salary: "€78–96k",
    posted: "6h ago",
  },
  {
    id: "j-6",
    title: "UX Researcher, Payments",
    company: "Stripe",
    initials: "ST",
    location: "Seattle, WA",
    mode: "Hybrid",
    salary: "$168–196k",
    posted: "4d ago",
  },
]

function FilterGroup({
  title,
  items,
}: {
  title: string
  items: { label: string; count: string; checked: boolean }[]
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-caption text-caption font-medium text-muted-foreground">
        {title}
      </p>
      {items.map((item) => (
        <label
          key={item.label}
          className="flex cursor-pointer items-center gap-2.5"
        >
          <Checkbox defaultChecked={item.checked} aria-label={item.label} />
          <span className="flex-1 text-sm text-foreground">{item.label}</span>
          <span className="font-code text-xs text-muted-foreground">
            {item.count}
          </span>
        </label>
      ))}
    </div>
  )
}

function Page() {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(["j-1", "j-2"])
  )
  const allSelected = selected.size === jobs.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(jobs.map((job) => job.id)) : new Set())
  }

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-screen w-full max-w-[1200px] flex-col gap-4 px-6 py-4">
        {/* App header */}
        <header className="flex items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-3 text-title text-foreground">
              baseline
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              design jobs, curated
            </span>
          </div>
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Role, company, or skill — try “design systems”"
              className="pl-9"
            />
          </div>
          <nav className="ml-auto flex items-center gap-5 text-sm text-muted-foreground">
            <span className="cursor-pointer text-foreground">Jobs</span>
            <span className="cursor-pointer">Talent grid</span>
            <span className="cursor-pointer">Salary data</span>
          </nav>
          <Button size="sm">Post a job</Button>
          <Avatar>
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[250px_minmax(0,1fr)_290px] gap-4">
          {/* Filter rail */}
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="flex items-center gap-2 text-sm">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                Filters
              </CardTitle>
              <CardDescription>3 active · 214 roles match</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 px-5">
              <FilterGroup title="Job type" items={jobTypes} />
              <FilterGroup title="Discipline" items={disciplines} />
              <FilterGroup title="Work setup" items={workSetup} />
              <label className="flex cursor-pointer items-start gap-2.5 border-t pt-4">
                <Checkbox
                  defaultChecked
                  id="salary-only"
                  className="mt-0.5"
                  aria-label="Only show jobs with salary data"
                />
                <span className="text-sm leading-snug text-foreground">
                  Only show jobs with published salary
                </span>
              </label>
            </CardContent>
            <CardFooter className="px-5">
              <Button variant="outline" size="sm" className="w-full">
                Show 214 roles
              </Button>
            </CardFooter>
          </Card>

          {/* Results list */}
          <Card className="gap-0 py-0">
            <div className="flex items-center gap-3 border-b px-5 py-3.5">
              <Checkbox
                checked={
                  allSelected ? true : someSelected ? "indeterminate" : false
                }
                onCheckedChange={(checked) => toggleAll(checked === true)}
                aria-label="Select all roles"
              />
              <span className="text-sm font-medium text-foreground">
                Select all
              </span>
              <span className="font-code text-xs text-muted-foreground">
                {jobs.length} of 214 shown
              </span>
              <Button variant="ghost" size="xs" className="ml-auto">
                Most recent
                <ChevronDown />
              </Button>
            </div>
            {selected.size > 0 && (
              <div className="flex items-center gap-2 border-b bg-muted/50 px-5 py-2.5">
                <span className="font-code text-xs text-foreground">
                  {selected.size} selected
                </span>
                <Button size="xs" className="ml-1">
                  Save to shortlist
                </Button>
                <Button variant="outline" size="xs">
                  Export CSV
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setSelected(new Set())}
                >
                  Clear
                </Button>
              </div>
            )}
            <div className="flex flex-col divide-y">
              {jobs.map((job) => (
                <label
                  key={job.id}
                  className="flex cursor-pointer items-center gap-4 px-5 py-3"
                >
                  <Checkbox
                    checked={selected.has(job.id)}
                    onCheckedChange={(checked) =>
                      toggleOne(job.id, checked === true)
                    }
                    aria-label={`Select ${job.title} at ${job.company}`}
                  />
                  <Avatar size="sm">
                    <AvatarFallback>{job.initials}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {job.title}
                    </span>
                    <span className="mt-0.5 flex min-w-0 items-center gap-1.5">
                      <span className="truncate font-caption text-caption text-muted-foreground">
                        {job.company} · {job.location}
                      </span>
                      <Badge variant="outline">{job.mode}</Badge>
                    </span>
                  </span>
                  <span className="w-24 shrink-0 text-right">
                    <span className="block font-code text-sm text-foreground">
                      {job.salary}
                    </span>
                    <span className="block font-code text-xs text-muted-foreground">
                      {job.posted}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* Right rail */}
          <div className="flex flex-col gap-4">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Weekly digest</CardTitle>
                <CardDescription>Every Monday · 07:00 your time</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <Checkbox defaultChecked id="digest-matches" className="mt-0.5" />
                  <span className="text-sm leading-snug text-foreground">
                    New matches for my saved searches
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <Checkbox id="digest-salary" className="mt-0.5" />
                  <span className="text-sm leading-snug text-foreground">
                    Salary changes on shortlisted roles
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <Checkbox defaultChecked id="digest-local" className="mt-0.5" />
                  <span className="text-sm leading-snug text-foreground">
                    Companies hiring near Berlin
                  </span>
                </label>
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Your shortlist</CardTitle>
                <CardDescription>Private to you</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border px-3 py-2.5">
                    <p className="font-code text-xl text-foreground">12</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      roles saved
                    </p>
                  </div>
                  <div className="rounded-lg border px-3 py-2.5">
                    <p className="font-code text-xl text-foreground">3</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      in interview
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Profile strength
                    </span>
                    <span className="font-code text-xs text-foreground">
                      78%
                    </span>
                  </div>
                  <Progress value={78} aria-label="Profile strength" />
                </div>
              </CardContent>
              <CardFooter className="px-5">
                <Button variant="ghost" size="xs" className="w-full">
                  Complete profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            baseline — 1,284 open design roles indexed
          </span>
          <span className="font-code text-xs text-muted-foreground">
            last crawl 09:42 UTC
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
