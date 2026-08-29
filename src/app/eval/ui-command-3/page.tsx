"use client"
// EVAL page — command p3 — music festival lineup planner — 1180x820 dark
// Inline Command panel (artists / stages / actions with shortcuts) beside
// the Saturday running order. Also features: Card, Badge, Button, Avatar,
// Separator, Tabs. Flat panels + hairlines; semantic color only for the
// genuine schedule conflict.

import {
  CalendarDaysIcon,
  GuitarIcon,
  ListMusicIcon,
  LockIcon,
  MapPinIcon,
  MicIcon,
  Music2Icon,
  PencilIcon,
  Share2Icon,
  SparklesIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Command,
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Slot = {
  time: string
  artist: string
  initials: string
  stage: string
  status: "Confirmed" | "Hold" | "Conflict"
  note?: string
}

const slots: Slot[] = [
  {
    time: "18:00",
    artist: "Velvet Antler",
    initials: "VA",
    stage: "The Grove",
    status: "Confirmed",
  },
  {
    time: "19:30",
    artist: "Marigold Static",
    initials: "MS",
    stage: "Willow Tent",
    status: "Confirmed",
  },
  {
    time: "21:00",
    artist: "Ionika",
    initials: "IO",
    stage: "Willow Tent",
    status: "Hold",
    note: "Awaiting flight confirmation",
  },
  {
    time: "21:30",
    artist: "The Midnight Fog",
    initials: "MF",
    stage: "Main Stage",
    status: "Confirmed",
  },
  {
    time: "22:15",
    artist: "Cassia Vale",
    initials: "CV",
    stage: "The Grove",
    status: "Conflict",
    note: "Overlaps Ionika changeover",
  },
]

const stages = [
  { name: "Main Stage", capacity: "18,000" },
  { name: "Willow Tent", capacity: "6,500" },
  { name: "The Grove", capacity: "3,200" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ListMusicIcon className="size-4" />
            </span>
            <div>
              <p className="font-heading-3 text-heading-3 font-semibold">
                Hollowfield Festival
              </p>
              <p className="font-caption text-[11px] leading-tight text-muted-foreground">
                Aug 14–16, 2026 · Riverside Grounds
              </p>
            </div>
          </div>
          <span className="ms-4 hidden items-center gap-1.5 font-caption text-caption text-muted-foreground xl:inline-flex">
            <MapPinIcon className="size-3.5" /> 3 stages · 48 slots · 42 booked
          </span>
          <div className="ms-auto flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share2Icon /> Share draft
            </Button>
            <Button size="sm">
              <CalendarDaysIcon /> Publish lineup
            </Button>
            <Avatar size="sm">
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main */}
        <main className="flex flex-1 gap-5 overflow-hidden p-6">
          {/* Artist finder — inline command palette with groups + shortcuts */}
          <Card className="flex w-[440px] shrink-0 flex-col gap-0 overflow-hidden py-0">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-sm font-medium text-foreground">
                Add to running order
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                128 artists shortlisted
              </span>
            </div>
            <Command className="rounded-none">
              <CommandInput placeholder="Search artists, stages, or actions…" />
              <CommandList>
                <CommandEmpty>No artists match.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem>
                    <SparklesIcon />
                    <span className="min-w-0 truncate">
                      Auto-resolve scheduling conflicts
                    </span>
                    <CommandShortcut>⌘⇧R</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <LockIcon />
                    <span className="min-w-0 truncate">
                      Lock Saturday running order
                    </span>
                    <CommandShortcut>⌘L</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Artists">
                  <CommandItem>
                    <MicIcon />
                    <span className="min-w-0 truncate">Cassia Vale</span>
                    <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                      The Grove · 22:15
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <GuitarIcon />
                    <span className="min-w-0 truncate">Foxglove Choir</span>
                    <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                      Unbooked · €12k
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <Music2Icon />
                    <span className="min-w-0 truncate">Ionika</span>
                    <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                      Willow Tent · 21:00
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <GuitarIcon />
                    <span className="min-w-0 truncate">Marigold Static</span>
                    <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                      Willow Tent · 19:30
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <MicIcon />
                    <span className="min-w-0 truncate">The Midnight Fog</span>
                    <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                      Main Stage · 21:30
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <Music2Icon />
                    <span className="min-w-0 truncate">Velvet Antler</span>
                    <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                      The Grove · 18:00
                    </span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Stages">
                  {stages.map((stage) => (
                    <CommandItem key={stage.name}>
                      <MapPinIcon />
                      <span className="min-w-0 truncate">{stage.name}</span>
                      <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                        cap {stage.capacity}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <div className="border-t px-4 py-2">
              <span className="font-caption text-caption text-muted-foreground">
                Select an artist to place them in the Saturday running order
              </span>
            </div>
          </Card>

          {/* Running order */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading-2 text-heading-2 text-foreground">
                  Running order
                </h2>
                <p className="mt-0.5 font-caption text-caption text-muted-foreground">
                  Draft v7 · shared with 4 bookers
                </p>
              </div>
              <Tabs defaultValue="sat">
                <TabsList>
                  <TabsTrigger value="fri">Fri 14</TabsTrigger>
                  <TabsTrigger value="sat">Sat 15</TabsTrigger>
                  <TabsTrigger value="sun">Sun 16</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Card className="flex-1 gap-0 overflow-hidden py-0">
              <CardContent className="flex flex-col p-2">
                {slots.map((slot, index) => (
                  <div key={slot.time + slot.artist}>
                    {index > 0 && <Separator className="my-2" />}
                    <div className="flex items-center gap-4 rounded-md px-3 py-2.5">
                      <span className="w-12 shrink-0 font-code text-sm text-muted-foreground">
                        {slot.time}
                      </span>
                      <Avatar size="sm">
                        <AvatarFallback>{slot.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {slot.artist}
                        </p>
                        <p className="truncate font-caption text-caption text-muted-foreground">
                          {slot.stage}
                          {slot.note ? ` · ${slot.note}` : ""}
                        </p>
                      </div>
                      {slot.status === "Conflict" ? (
                        <Badge variant="destructive" className="gap-1">
                          <TriangleAlertIcon /> Conflict
                        </Badge>
                      ) : (
                        <Badge
                          variant={
                            slot.status === "Confirmed" ? "secondary" : "outline"
                          }
                        >
                          {slot.status}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${slot.artist} slot`}
                      >
                        <PencilIcon />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <footer className="flex items-center justify-between">
              <span className="font-caption text-caption text-muted-foreground">
                42 of 48 slots booked · 6 holds · 1 conflict
              </span>
              <span className="font-code text-xs text-muted-foreground">
                HF-2026 · draft saved 18:42
              </span>
            </footer>
          </div>
        </main>
      </div>
    </EvalShell>
  )
}
