"use client"

// EVAL page — breadcrumb p1 — podcast player and episode library — 1920x1080 light

import {
  Antenna,
  ArrowDownToLine,
  AudioLines,
  Compass,
  Headphones,
  Home,
  ListPlus,
  Play,
  Podcast,
  RotateCcw,
  Search,
  Settings,
  SkipForward,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  { label: "Home", icon: Home, active: false },
  { label: "Browse", icon: Compass, active: false },
  { label: "Your library", icon: Headphones, active: true },
  { label: "Downloads", icon: ArrowDownToLine, active: false },
  { label: "Queue", icon: ListPlus, active: false },
  { label: "Settings", icon: Settings, active: false },
]

const SUBSCRIBED = [
  { name: "Static & Signal", meta: "New ep · Thu", active: true },
  { name: "Deep Field", meta: "3 unplayed", active: false },
  { name: "The Cartographers", meta: "Up to date", active: false },
  { name: "Night Shift FM", meta: "New ep · Tue", active: false },
]

const EPISODES = [
  {
    ep: 137,
    title: "The Cobalt Reserves",
    summary: "Inside the mines that keep the battery age running.",
    released: "Mar 06, 2025",
    duration: "47:32",
    status: "played" as const,
  },
  {
    ep: 138,
    title: "Dial-Up Cathedral",
    summary: "The last acoustic-coupler BBS in North America.",
    released: "Mar 20, 2025",
    duration: "51:08",
    status: "played" as const,
  },
  {
    ep: 139,
    title: "Weather Balloon Diaries",
    summary: "Two hobbyists, one radiosonde, forty thousand feet.",
    released: "Apr 03, 2025",
    duration: "44:55",
    status: "played" as const,
  },
  {
    ep: 140,
    title: "The Lighthouse Keepers' LAN",
    summary: "How a chain of beacons went digital in 1994.",
    released: "Apr 17, 2025",
    duration: "49:21",
    status: "downloaded" as const,
  },
  {
    ep: 141,
    title: "Copper Rain",
    summary: "The scrap economy built on dead telephone lines.",
    released: "May 01, 2025",
    duration: "53:40",
    status: "playing" as const,
  },
  {
    ep: 142,
    title: "Analog Ghosts",
    summary: "Hunting numbers stations across the shortwave bands.",
    released: "May 15, 2025",
    duration: "52:17",
    status: "new" as const,
  },
]

const HOSTS = [
  {
    name: "Mara Ellison",
    role: "Host · Producer",
    src: "https://i.pravatar.cc/150?img=45",
    initials: "ME",
  },
  {
    name: "Devon Cho",
    role: "Co-host · Research",
    src: "https://i.pravatar.cc/150?img=13",
    initials: "DC",
  },
]

const QUEUE = [
  { show: "Static & Signal", title: "Ep 141 · Copper Rain", remaining: "34:35 left" },
  { show: "Deep Field", title: "Ep 88 · Relay Station 9", remaining: "38:02" },
  { show: "Night Shift FM", title: "Ep 210 · Third Shift Blues", remaining: "29:44" },
]

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
              <Podcast className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Ampersand</p>
              <p className="mt-1 text-caption font-caption text-muted-foreground">
                Audio library
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

          <Separator className="my-4 bg-default-border" />

          <div className="flex min-h-0 flex-1 flex-col px-3">
            <p className="px-2.5 pb-2 text-caption font-caption text-muted-foreground">
              Subscribed shows
            </p>
            <div className="flex flex-col gap-0.5">
              {SUBSCRIBED.map((show) => (
                <span
                  key={show.name}
                  className={`flex items-center gap-2.5 rounded-sm px-2.5 py-2 ${
                    show.active ? "bg-secondary" : ""
                  }`}
                >
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-default-border bg-muted font-code text-[10px] text-muted-foreground"
                    aria-hidden="true"
                  >
                    {show.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-sm leading-none ${
                        show.active ? "font-medium text-foreground" : "text-foreground"
                      }`}
                    >
                      {show.name}
                    </span>
                    <span className="mt-1 block font-code text-[11px] text-muted-foreground">
                      {show.meta}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center gap-2.5 rounded-lg border border-default-border bg-card p-3">
              <Avatar size="sm">
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Ines Carvalho"
                />
                <AvatarFallback>IC</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-none">
                  Ines Carvalho
                </p>
                <p className="mt-1 text-caption font-caption text-muted-foreground">
                  128 episodes saved
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main ------------------------------------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar with breadcrumb */}
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-default-border px-6">
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="sm:gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Library</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Shows</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Static &amp; Signal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis className="size-6" />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Season 3</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Ep 142 · Analog Ghosts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex shrink-0 items-center gap-2.5">
              <Input
                type="search"
                placeholder="Search episodes, shows…"
                className="h-8 w-64"
                aria-label="Search episodes and shows"
              />
              <Button variant="outline" size="sm">
                <Search className="size-4" aria-hidden="true" />
                Filters
              </Button>
              <Button size="sm">
                <Play className="size-4" aria-hidden="true" />
                Play season
              </Button>
            </div>
          </header>

          <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_336px] gap-6 p-6">
            {/* Left column */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* Episode hero */}
              <section className="rounded-lg border border-default-border bg-card p-5">
                <div className="flex items-start gap-5">
                  <div
                    className="flex size-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-default-border bg-muted"
                    aria-hidden="true"
                  >
                    <Antenna className="size-5 text-muted-foreground" />
                    <span className="font-code text-[10px] text-muted-foreground">
                      SS·142
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-code">
                        Season 3 · Episode 142
                      </Badge>
                      <Badge variant="secondary">New</Badge>
                      <span className="font-code text-xs text-muted-foreground">
                        May 15, 2025 · 52:17
                      </span>
                    </div>
                    <h1 className="mt-2.5 font-heading-1 text-heading-1 text-foreground">
                      Analog Ghosts
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      Mara and Devon trace forty years of numbers-station
                      broadcasts — from Cold War relay towers to the ham
                      operators still logging them tonight. With retired
                      signals analyst Ruth Okonkwo.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      <Button size="sm">
                        <Play className="size-4" aria-hidden="true" />
                        Play episode
                      </Button>
                      <Button variant="outline" size="sm">
                        <ListPlus className="size-4" aria-hidden="true" />
                        Add to queue
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowDownToLine className="size-4" aria-hidden="true" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Episode library */}
              <Card className="min-h-0 py-0">
                <CardHeader className="border-b border-default-border px-5 py-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Season 3 · Episode library
                  </CardTitle>
                  <CardDescription>
                    6 of 6 episodes · 3 played · 1 downloaded offline
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 py-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 ps-5">Ep</TableHead>
                        <TableHead>Episode</TableHead>
                        <TableHead>Released</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="pe-5 text-end">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {EPISODES.map((episode) => (
                        <TableRow key={episode.ep}>
                          <TableCell className="ps-5 font-code text-xs text-muted-foreground">
                            {episode.ep}
                          </TableCell>
                          <TableCell className="max-w-[420px]">
                            <span className="flex flex-col gap-0.5">
                              <span
                                className={`truncate text-sm ${
                                  episode.status === "new"
                                    ? "font-medium text-foreground"
                                    : "text-foreground"
                                }`}
                              >
                                {episode.title}
                              </span>
                              <span className="truncate text-xs text-muted-foreground">
                                {episode.summary}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell className="font-code text-xs text-muted-foreground">
                            {episode.released}
                          </TableCell>
                          <TableCell className="font-code text-xs text-muted-foreground">
                            {episode.duration}
                          </TableCell>
                          <TableCell>
                            {episode.status === "played" ? (
                              <Badge variant="secondary">Played</Badge>
                            ) : episode.status === "downloaded" ? (
                              <Badge className="border-transparent bg-success-100 text-success-700">
                                Downloaded
                              </Badge>
                            ) : episode.status === "playing" ? (
                              <Badge variant="outline" className="font-code">
                                In progress · 36%
                              </Badge>
                            ) : (
                              <Badge variant="outline">New</Badge>
                            )}
                          </TableCell>
                          <TableCell className="pe-5 text-end">
                            <span className="inline-flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Play episode ${episode.ep}`}
                              >
                                <Play className="size-4" aria-hidden="true" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Download episode ${episode.ep}`}
                              >
                                <ArrowDownToLine
                                  className="size-4"
                                  aria-hidden="true"
                                />
                              </Button>
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
              {/* Now playing */}
              <Card className="py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Now playing
                  </CardTitle>
                  <CardDescription>
                    Static &amp; Signal · Copper Rain
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-default-border bg-muted"
                      aria-hidden="true"
                    >
                      <AudioLines className="size-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-none">
                        Ep 141 · Copper Rain
                      </p>
                      <p className="mt-1 truncate text-caption font-caption text-muted-foreground">
                        The scrap economy on dead telephone lines
                      </p>
                    </div>
                  </div>
                  <Progress value={36} aria-label="Episode playback progress" />
                  <div className="flex items-center justify-between font-code text-xs text-muted-foreground">
                    <span>19:25</span>
                    <span>53:40</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <RotateCcw className="size-4" aria-hidden="true" />
                      15s
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Play className="size-4" aria-hidden="true" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <SkipForward className="size-4" aria-hidden="true" />
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hosts */}
              <Card className="py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Hosts
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 px-5">
                  {HOSTS.map((host) => (
                    <div
                      key={host.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex items-center gap-2.5">
                        <Avatar>
                          <AvatarImage src={host.src} alt={host.name} />
                          <AvatarFallback>{host.initials}</AvatarFallback>
                        </Avatar>
                        <span>
                          <span className="block text-sm font-medium leading-none">
                            {host.name}
                          </span>
                          <span className="mt-1 block text-caption font-caption text-muted-foreground">
                            {host.role}
                          </span>
                        </span>
                      </span>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Up next */}
              <Card className="py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Up next
                  </CardTitle>
                  <CardDescription>3 episodes in queue</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  {QUEUE.map((item, i) => (
                    <div key={item.title} className="flex flex-col gap-3">
                      {i > 0 ? <Separator className="bg-default-border" /> : null}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-caption font-caption text-muted-foreground">
                            {item.show}
                          </p>
                          <p className="mt-0.5 truncate text-sm font-medium leading-snug">
                            {item.title}
                          </p>
                        </div>
                        <span className="shrink-0 font-code text-xs text-muted-foreground">
                          {item.remaining}
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
              Ampersand Audio · 1 download in progress · synced 2 min ago
            </p>
            <p className="font-code text-xs text-muted-foreground">
              192 kbps · offline mode ready
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
