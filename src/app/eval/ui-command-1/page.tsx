"use client"
// EVAL page — command p1 — job board for designers — 1280x800 dark
// Command palette (CommandDialog) open at initial render over a full job
// board screen. Also features: Card, Badge, Button, Avatar, Separator,
// Tabs, Kbd. Flat panels + hairlines; the dialog is a true overlay so its
// shadow is allowed.

import {
  BellIcon,
  BookmarkPlusIcon,
  BookmarkIcon,
  BriefcaseIcon,
  BuildingIcon,
  GlobeIcon,
  MapPinIcon,
  PenToolIcon,
  SearchIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Job = {
  id: string
  role: string
  company: string
  initials: string
  location: string
  salary: string
  posted: string
  tags: { label: string; variant: "secondary" | "outline" }[]
}

const jobs: Job[] = [
  {
    id: "GLY-1042",
    role: "Senior Product Designer",
    company: "Linear",
    initials: "LN",
    location: "Remote · EU/US",
    salary: "$165–190k",
    posted: "2d ago",
    tags: [
      { label: "Remote", variant: "secondary" },
      { label: "Full-time", variant: "outline" },
    ],
  },
  {
    id: "GLY-1051",
    role: "Brand Designer",
    company: "Figma",
    initials: "FG",
    location: "San Francisco, CA",
    salary: "$145–175k",
    posted: "1d ago",
    tags: [
      { label: "Hybrid 3d", variant: "outline" },
      { label: "Full-time", variant: "outline" },
    ],
  },
  {
    id: "GLY-1058",
    role: "Motion Designer",
    company: "Framer",
    initials: "FR",
    location: "Amsterdam, NL",
    salary: "€70–90k",
    posted: "3d ago",
    tags: [
      { label: "On-site", variant: "outline" },
      { label: "Contract", variant: "outline" },
    ],
  },
  {
    id: "GLY-1063",
    role: "Staff Designer, Systems",
    company: "Stripe",
    initials: "ST",
    location: "Seattle, WA",
    salary: "$210–245k",
    posted: "5d ago",
    tags: [
      { label: "Hybrid 2d", variant: "outline" },
      { label: "Full-time", variant: "outline" },
    ],
  },
  {
    id: "GLY-1067",
    role: "Product Designer, Growth",
    company: "Vercel",
    initials: "VC",
    location: "Remote · Global",
    salary: "$155–180k",
    posted: "6h ago",
    tags: [
      { label: "Remote", variant: "secondary" },
      { label: "Full-time", variant: "outline" },
    ],
  },
  {
    id: "GLY-1070",
    role: "UX Researcher",
    company: "Notion",
    initials: "NT",
    location: "New York, NY",
    salary: "$140–160k",
    posted: "4d ago",
    tags: [
      { label: "Hybrid 3d", variant: "outline" },
      { label: "Full-time", variant: "outline" },
    ],
  },
]

const navLinks = ["Jobs", "Companies", "Salaries", "Portfolio review"]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <PenToolIcon className="size-4" />
            </span>
            <span className="text-base font-semibold">Glyph</span>
          </div>
          <nav className="ms-4 hidden items-center gap-1 lg:flex">
            {navLinks.map((link, i) => (
              <span
                key={link}
                className={`rounded-md px-2.5 py-1.5 text-sm ${
                  i === 0
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link}
              </span>
            ))}
          </nav>

          {/* Palette trigger — mirrors the open CommandDialog */}
          <div className="ms-auto flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-64 justify-start gap-2 text-muted-foreground"
            >
              <SearchIcon className="size-4" />
              <span className="truncate">Search roles, companies…</span>
              <KbdGroup className="ms-auto">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </Button>
            <Button variant="outline" size="sm">
              Post a job
            </Button>
            <Avatar size="sm">
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-caption text-caption text-muted-foreground">
                  Curated design jobs · No recruiter spam
                </p>
                <h1 className="mt-0.5 font-heading-2 text-heading-2 text-foreground">
                  Product design roles
                </h1>
              </div>
              <p className="font-code text-xs text-muted-foreground">
                218 open roles · updated 6 min ago
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All roles</TabsTrigger>
                  <TabsTrigger value="remote">Remote</TabsTrigger>
                  <TabsTrigger value="new">New this week</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="ghost" size="sm" className="ms-auto gap-1.5">
                <BellIcon className="size-4" /> Alert preferences
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="gap-0 py-0">
                  <CardContent className="flex flex-col gap-2.5 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="mt-0.5">
                        <AvatarFallback>{job.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <p className="truncate text-sm font-medium text-foreground">
                          {job.role}
                        </p>
                        <p className="truncate font-caption text-caption text-muted-foreground">
                          {job.company}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="ms-auto"
                        aria-label={`Save ${job.role} at ${job.company}`}
                      >
                        <BookmarkIcon />
                      </Button>
                    </div>
                    <p className="flex items-center gap-1.5 font-code text-xs text-muted-foreground">
                      <MapPinIcon className="size-3.5 shrink-0" />
                      {job.location}
                      <span aria-hidden>·</span>
                      {job.salary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {job.tags.map((tag) => (
                          <Badge key={tag.label} variant={tag.variant}>
                            {tag.label}
                          </Badge>
                        ))}
                      </div>
                      <span className="font-code text-[11px] text-muted-foreground">
                        {job.posted}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <footer className="flex items-center justify-between pb-2">
              <span className="font-caption text-caption text-muted-foreground">
                1,284 companies hiring designers · Every listing vetted by a
                human
              </span>
              <span className="font-code text-xs text-muted-foreground">
                GLY-2026 · v4.2
              </span>
            </footer>
          </div>
        </main>

        {/* Command palette — open at initial render */}
        <CommandDialog
          defaultOpen
          showCloseButton={false}
          title="Glyph command palette"
          description="Search roles, companies, or run a command"
          className="sm:max-w-[560px]"
        >
          <CommandInput placeholder="Search roles, companies, or commands…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick actions">
              <CommandItem>
                <BookmarkPlusIcon />
                <span>Save this search</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <BellIcon />
                <span>New job alert for “product design”</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <GlobeIcon />
                <span>Toggle remote-only filter</span>
                <CommandShortcut>⌘R</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Roles">
              <CommandItem>
                <BriefcaseIcon />
                <span className="truncate">Senior Product Designer — Linear</span>
                <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                  $165–190k
                </span>
              </CommandItem>
              <CommandItem>
                <BriefcaseIcon />
                <span className="truncate">Brand Designer — Figma</span>
                <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                  $145–175k
                </span>
              </CommandItem>
              <CommandItem>
                <BriefcaseIcon />
                <span className="truncate">
                  Motion Designer — Framer
                </span>
                <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                  €70–90k
                </span>
              </CommandItem>
              <CommandItem>
                <BriefcaseIcon />
                <span className="truncate">
                  Product Designer, Growth — Vercel
                </span>
                <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                  $155–180k
                </span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Companies">
              <CommandItem>
                <BuildingIcon />
                <span>Linear</span>
                <span className="ms-auto font-code text-xs text-muted-foreground">
                  28 roles
                </span>
              </CommandItem>
              <CommandItem>
                <BuildingIcon />
                <span>Figma</span>
                <span className="ms-auto font-code text-xs text-muted-foreground">
                  12 roles
                </span>
              </CommandItem>
              <CommandItem>
                <BuildingIcon />
                <span>Vercel</span>
                <span className="ms-auto font-code text-xs text-muted-foreground">
                  9 roles
                </span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              to navigate
              <KbdGroup className="ms-1">
                <Kbd>↵</Kbd>
              </KbdGroup>
              to open
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <KbdGroup>
                <Kbd>esc</Kbd>
              </KbdGroup>
              to close
            </span>
          </div>
        </CommandDialog>
      </div>
    </EvalShell>
  )
}
