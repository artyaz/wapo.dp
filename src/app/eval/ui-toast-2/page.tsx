"use client"
// EVAL page — toast p2 — podcast player and episode library — 1024x768 dark
// Toast front and center: a download-progress toast pinned open (progress
// track + rate/ETA copy + Cancel action) above a just-completed download
// notification. Dispatched a beat after mount through the app-level
// <Toaster /> (root layout) and pinned with a 10-minute duration.
// The persistent player sits directly under the header (Apple-Podcasts
// style) so the bottom-right toast stack never covers transport controls.
// Co-stars: Card, Button, Badge, Progress, Input, Avatar.

import React from "react"
import {
  Check,
  CircleCheck,
  Download,
  Headphones,
  Mic,
  Pause,
  Play,
  Podcast,
  Search,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { toast } from "@/components/ui/toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const EPISODES = [
  { ep: "EP-142", title: "The Missing Mass", dur: "52:18", date: "Feb 07", downloaded: false, playing: false },
  { ep: "EP-141", title: "Listening to the Void", dur: "41:02", date: "Jan 31", downloaded: true, playing: true },
  { ep: "EP-140", title: "Ice Giants, Loud Neighbors", dur: "47:55", date: "Jan 24", downloaded: true, playing: false },
  { ep: "EP-139", title: "The Candle Standard", dur: "39:12", date: "Jan 17", downloaded: false, playing: false },
  { ep: "EP-138", title: "Habitable, Apparently", dur: "1:01:08", date: "Jan 10", downloaded: false, playing: false },
  { ep: "EP-137", title: "Antenna at Far Side", dur: "44:47", date: "Jan 03", downloaded: false, playing: false },
]

const LIBRARY = [
  { name: "The Deep Field", cat: "Science", fresh: 2 },
  { name: "Material World", cat: "Chemistry", fresh: 0 },
  { name: "The Long Ledger", cat: "History", fresh: 1 },
  { name: "Field Notes FM", cat: "Interviews", fresh: 0 },
]

export default function Page() {
  // EP-141 finished downloading moments ago; EP-142 is mid-download with a
  // live progress read-out. Both stay open for the capture. Data tokens
  // (episode codes, percent, byte counts, ETA) render in IBM Plex Mono;
  // show titles stay in Inter.
  React.useEffect(() => {
    const t1 = window.setTimeout(() => {
      toast.add({
        type: "success",
        icon: <CircleCheck className="size-4 text-success-500" />,
        title: "Download complete",
        description: (
          <span>
            <span className="font-code text-xs">EP-141</span> · Listening to
            the Void · <span className="font-code text-xs">41.2 MB</span> —
            ready offline.
          </span>
        ),
        duration: 600000,
      })
    }, 300)
    const t2 = window.setTimeout(() => {
      toast.add({
        type: "info",
        icon: <Download className="size-4 text-muted-foreground" />,
        title: "Downloading episode",
        description: (
          <span className="block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="truncate text-sm">
                The Missing Mass
                <span className="font-code text-xs"> · EP-142</span>
              </span>
              <span className="shrink-0 font-code text-xs">68%</span>
            </span>
            <span
              className="mt-1.5 block h-2 w-full overflow-hidden rounded-full bg-primary/20"
              role="progressbar"
              aria-valuenow={68}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Downloading EP-142, 68 percent"
            >
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: "68%" }}
              />
            </span>
            <span className="mt-1.5 block font-code text-xs">
              34.1 of 50.2 MB · 2 min left
            </span>
          </span>
        ),
        actionProps: { children: "Cancel" },
        duration: 600000,
      })
    }, 450)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden">
        {/* App header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-4">
          <span className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Headphones className="size-4" />
            </span>
            <span className="text-sm font-semibold text-foreground">Waveform</span>
          </span>
          <div className="relative mx-auto w-72">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="Search shows and episodes" />
          </div>
          <Avatar>
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
        </header>

        {/* Persistent player bar (top-mounted, clear of the toast stack) */}
        <div className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Back 15 seconds">
              <SkipBack />
            </Button>
            <Button size="icon" aria-label="Play">
              <Pause />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Forward 30 seconds">
              <SkipForward />
            </Button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="truncate text-sm font-medium text-foreground">
                EP-141 · Listening to the Void
              </p>
              <p className="font-code text-xs text-muted-foreground">
                12:41 / 41:02
              </p>
            </div>
            <Progress
              value={31}
              className="mt-1.5"
              aria-label="Playback position, 12 minutes 41 seconds"
            />
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="size-4 text-muted-foreground" />
            <Badge variant="secondary" className="font-code text-[10px]">
              1.5×
            </Badge>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Series + library rail */}
          <aside className="hidden w-64 shrink-0 flex-col gap-4 overflow-auto border-r p-4 lg:flex">
            <Card className="gap-3 rounded-lg px-4 py-4">
              <div className="flex size-20 items-center justify-center self-start rounded-lg bg-muted">
                <Podcast className="size-9 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-heading-3 text-heading-3 text-foreground">
                  The Deep Field
                </h2>
                <p className="font-caption text-caption text-muted-foreground">
                  Mara Voss · 128 episodes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Science</Badge>
                <Badge variant="secondary">Weekly</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Follow show
              </Button>
            </Card>

            <div>
              <p className="px-1 pb-2 font-caption text-caption text-muted-foreground">
                Your library
              </p>
              <div className="flex flex-col gap-1">
                {LIBRARY.map((show) => (
                  <div
                    key={show.name}
                    className="flex items-center gap-3 rounded-md px-1 py-1.5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Mic className="size-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{show.name}</p>
                      <p className="font-caption text-caption text-muted-foreground">
                        {show.cat}
                      </p>
                    </div>
                    {show.fresh > 0 ? (
                      <Badge variant="default" className="font-code text-[10px]">
                        {show.fresh} new
                      </Badge>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Episode list */}
          <main className="min-w-0 flex-1 overflow-auto p-5">
            <div className="flex items-end justify-between gap-4 pb-3">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  All episodes
                </h1>
                <p className="font-caption text-caption text-muted-foreground">
                  The Deep Field · newest first · 2 downloaded
                </p>
              </div>
              <Badge variant="outline" className="font-code text-[10px]">
                SORTED BY DATE
              </Badge>
            </div>
            <Card className="gap-0 divide-y rounded-lg py-0">
              {EPISODES.map((e) => (
                <div key={e.ep} className="flex items-center gap-3 px-4 py-3">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`${e.playing ? "Pause" : "Play"} ${e.title}`}
                  >
                    {e.playing ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4" />
                    )}
                  </Button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {e.title}
                    </p>
                    <p className="font-code text-xs text-muted-foreground">
                      {e.ep} · {e.dur} · {e.date}
                    </p>
                  </div>
                  {e.downloaded ? (
                    <span
                      className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground"
                      aria-label="Downloaded"
                    >
                      <Check className="size-4 text-success-500" />
                      Offline
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={`Download ${e.title}`}
                    >
                      <Download className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </Card>
          </main>
        </div>
      </div>
    </EvalShell>
  )
}
