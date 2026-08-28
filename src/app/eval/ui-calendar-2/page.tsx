"use client"

// EVAL page — calendar p2 — podcast player and episode library — 834x1112 dark
// Calendar as the episode release schedule (filled dot = episode day,
// hollow = bonus feed) + Card, Badge, Button, Input, Tabs, Progress,
// Separator, Avatar. Flat panels + hairlines, mono for timestamps.

import * as React from "react"
import type { DayButton } from "react-day-picker"
import {
  AudioLinesIcon,
  BellRingIcon,
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  RadioIcon,
  SearchIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const now = new Date()
const isDropDay = (d: Date) => d.getDay() === 2 || d.getDay() === 5 // Tue / Fri
const bonusDays = [8, 21]

function nextDrop(from: Date): Date {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  while (!isDropDay(d)) d.setDate(d.getDate() + 1)
  return d
}

const initialDrop = nextDrop(now)

function DropDayButton({
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const mark = bonusDays.includes(day.date.getDate())
    ? "bonus"
    : isDropDay(day.date)
      ? "episode"
      : undefined
  return (
    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
      {children}
      <span
        aria-hidden="true"
        className={
          mark === "episode"
            ? "size-1 rounded-full bg-current"
            : mark === "bonus"
              ? "size-1 rounded-full border border-current bg-transparent"
              : "size-1 rounded-full bg-transparent"
        }
      />
    </CalendarDayButton>
  )
}

const fmtDay = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

const episodeDate = (daysAgo: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  return d
}

const episodes = [
  {
    ep: 142,
    title: "The Quiet Collapse of Social Search",
    guest: "with Mara Kessler",
    date: episodeDate(0),
    duration: "58:03",
    status: "PLAYING" as const,
    progress: 38,
  },
  {
    ep: 141,
    title: "After the Hype Cycle: What Survives",
    guest: "with Devon Park",
    date: episodeDate(3),
    duration: "47:12",
    status: "NEW" as const,
  },
  {
    ep: 140,
    title: "The Archivist of Dead Formats",
    guest: "interview · Ruth Okafor",
    date: episodeDate(7),
    duration: "71:45",
  },
  {
    ep: 139,
    title: "Why Local Maxima Sound Like Home",
    guest: "essay · no guest",
    date: episodeDate(10),
    duration: "39:58",
  },
  {
    ep: 138,
    title: "Bonus: The Unedited Pilot Tape",
    guest: "bonus feed",
    date: episodeDate(13),
    duration: "22:30",
    status: "BONUS" as const,
  },
  {
    ep: 137,
    title: "Modem Songs for the End of Dial-Up",
    guest: "with Mara Kessler",
    date: episodeDate(14),
    duration: "52:16",
  },
]

const upcoming = [
  {
    ep: 143,
    title: "What the Mixer Teaches Us About Attention",
    tag: "PREMIERE" as const,
  },
  {
    ep: 144,
    title: "Night Shift at the Grid — field recording",
    tag: "BONUS" as const,
  },
  {
    ep: 145,
    title: "Mailbag: Tuning Forks & Dead Formats",
  },
]

export default function Page() {
  const [selected, setSelected] = React.useState<Date | undefined>(initialDrop)

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <RadioIcon className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3 text-foreground">
              Static &amp; Signal
            </span>
          </div>
          <Badge variant="outline">Tech · Culture</Badge>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search episodes"
                className="h-8 w-52 pl-8"
                aria-label="Search episodes"
              />
            </div>
            <Avatar className="size-8">
              <AvatarFallback className="font-code text-xs">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Player + library */}
          <main className="flex min-w-0 flex-1 flex-col gap-5 p-5">
            {/* Now playing */}
            <Card className="gap-4 py-4">
              <CardContent className="flex items-start gap-4 px-4">
                <div className="flex size-20 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border bg-muted">
                  <AudioLinesIcon className="size-6 text-muted-foreground" />
                  <span className="font-code text-[10px] text-muted-foreground">
                    EP 142
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-caption text-caption text-muted-foreground">
                    Now playing · {fmtDay(episodes[0].date)} · Static &amp;
                    Signal
                  </p>
                  <h2 className="mt-0.5 truncate font-heading-2 text-heading-2 text-foreground">
                    {episodes[0].title}
                  </h2>
                  <p className="mt-0.5 font-caption text-caption text-muted-foreground">
                    {episodes[0].guest} · Episode 142
                  </p>
                  <Progress value={38} className="mt-3" aria-label="Playback progress" />
                  <div className="mt-1.5 flex justify-between font-code text-xs tabular-nums text-muted-foreground">
                    <span>22:14</span>
                    <span>-35:49</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="flex items-center gap-1 px-4">
                <Button variant="ghost" size="icon-sm" aria-label="Back 15 seconds">
                  <SkipBackIcon />
                </Button>
                <Button size="icon" aria-label="Pause">
                  <PauseIcon />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Forward 30 seconds">
                  <SkipForwardIcon />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Volume">
                  <Volume2Icon />
                </Button>
                <Button variant="outline" size="sm" className="ml-auto">
                  <DownloadIcon />
                  Save offline
                </Button>
              </CardContent>
            </Card>

            {/* Episode library */}
            <Card className="min-h-0 flex-1 gap-4 py-4">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm">Episode library</CardTitle>
                    <CardDescription>
                      142 episodes · 61 hours · 12 saved offline
                    </CardDescription>
                  </div>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unplayed">Unplayed</TabsTrigger>
                      <TabsTrigger value="offline">Offline</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-col px-4">
                {episodes.map((e, i) => (
                  <div key={e.ep}>
                    {i > 0 && <Separator className="my-2.5" />}
                    <div className="flex items-center gap-3 py-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Play episode ${e.ep}`}
                      >
                        {e.status === "PLAYING" ? (
                          <PauseIcon />
                        ) : (
                          <PlayIcon />
                        )}
                      </Button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-code text-xs text-muted-foreground">
                            EP {e.ep}
                          </span>
                          <span className="truncate text-sm font-medium">
                            {e.title}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate font-caption text-caption text-muted-foreground">
                          {fmtDay(e.date)} · {e.guest}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-code text-xs tabular-nums text-muted-foreground">
                          {e.duration}
                        </span>
                        {e.status === "PLAYING" && (
                          <Badge>Playing</Badge>
                        )}
                        {e.status === "NEW" && (
                          <Badge variant="outline">New</Badge>
                        )}
                        {e.status === "BONUS" && (
                          <Badge variant="secondary">Bonus</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>

          {/* Release schedule rail */}
          <aside className="flex w-[320px] shrink-0 flex-col gap-5 border-l p-5">
            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Release schedule</CardTitle>
                <CardDescription>
                  New episodes drop Tuesdays &amp; Fridays · 06:00 ET
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                <Calendar
                  mode="single"
                  defaultMonth={selected}
                  selected={selected}
                  onSelect={setSelected}
                  components={{ DayButton: DropDayButton }}
                />
                <div className="flex items-center gap-4 px-1">
                  <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                    <span className="size-1 rounded-full bg-foreground" />
                    Episode day
                  </span>
                  <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                    <span className="size-1 rounded-full border border-foreground/70" />
                    Bonus feed
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <BellRingIcon />
                  Remind me on drop days
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Coming up</CardTitle>
                <CardDescription>
                  Next from the {selected && fmtDay(selected) === fmtDay(now) ? "current" : "upcoming"} season
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col px-4">
                {upcoming.map((u, i) => (
                  <div key={u.ep}>
                    {i > 0 && <Separator className="my-2.5" />}
                    <div className="flex items-start gap-3">
                      <span className="w-9 shrink-0 pt-0.5 font-code text-xs tabular-nums text-muted-foreground">
                        EP {u.ep}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{u.title}</p>
                        <p className="mt-0.5 font-caption text-caption text-muted-foreground">
                          {u.tag === "PREMIERE"
                            ? "Season premiere"
                            : u.tag === "BONUS"
                              ? "Patreon bonus feed"
                              : "Listener questions"}
                        </p>
                      </div>
                      {u.tag && (
                        <Badge variant={u.tag === "PREMIERE" ? "default" : "secondary"}>
                          {u.tag === "PREMIERE" ? "Premiere" : "Bonus"}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Status bar */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t px-5">
          <span className="font-code text-xs text-muted-foreground">
            Synced just now · 12 episodes offline · 4.2 GB
          </span>
          <Badge variant="outline">Wi-Fi only downloads</Badge>
        </footer>
      </div>
    </EvalShell>
  )
}
