"use client"

// EVAL page — avatar p3 — music festival lineup planner — 1280x800 dark

import {
  CalendarDays,
  Check,
  Compass,
  Music2,
  Plus,
  Settings2,
  Sun,
  Ticket,
  Users,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Lineup", icon: Music2, active: true },
  { label: "Stages", icon: Ticket, active: false },
  { label: "Crew", icon: Users, active: false },
  { label: "Travel", icon: Compass, active: false },
  { label: "Settings", icon: Settings2, active: false },
]

type Act = {
  time: string
  name: string
  initials: string
  src?: string
  genre: string
  stage: string
  inPlan: boolean
  overlap?: string
}

const SATURDAY: Act[] = [
  {
    time: "17:30",
    name: "Marisol Vega",
    initials: "MV",
    src: "https://i.pravatar.cc/150?img=45",
    genre: "Latin soul",
    stage: "Dock Stage",
    inPlan: true,
  },
  {
    time: "18:15",
    name: "NOVA CASCADE",
    initials: "NC",
    src: undefined,
    genre: "Synthwave",
    stage: "Warehouse",
    inPlan: true,
    overlap: "Overlaps Marisol Vega · ends 18:45",
  },
  {
    time: "19:00",
    name: "The Glass Harbor",
    initials: "TG",
    src: undefined,
    genre: "Indie rock · headliner",
    stage: "Main Stage",
    inPlan: true,
  },
  {
    time: "20:00",
    name: "DJ Halcyon",
    initials: "DH",
    src: "https://i.pravatar.cc/150?img=60",
    genre: "House set",
    stage: "Warehouse",
    inPlan: false,
  },
  {
    time: "21:30",
    name: "Iron Meridian",
    initials: "IM",
    src: undefined,
    genre: "Post-rock",
    stage: "Main Stage",
    inPlan: false,
  },
]

const UPCOMING = [
  {
    time: "18:15",
    name: "NOVA CASCADE",
    initials: "NC",
    src: undefined,
    stage: "Warehouse",
  },
  {
    time: "19:00",
    name: "The Glass Harbor",
    initials: "TG",
    src: undefined,
    stage: "Main Stage",
  },
  {
    time: "21:30",
    name: "Iron Meridian",
    initials: "IM",
    src: undefined,
    stage: "Main Stage",
  },
]

const CREW = [
  {
    name: "Jade Okafor",
    src: "https://i.pravatar.cc/150?img=26",
    initials: "JO",
    status: "here",
  },
  {
    name: "Rui Costa",
    src: "https://i.pravatar.cc/150?img=59",
    initials: "RC",
    status: "en route",
  },
  {
    name: "Nina Bergström",
    src: "https://i.pravatar.cc/150?img=48",
    initials: "NB",
    status: "here",
  },
  {
    name: "Sam Whitfield",
    src: undefined,
    initials: "SW",
    status: "not going",
  },
]

function crewStatusClasses(status: string) {
  if (status === "here") return "text-success-600"
  if (status === "en route") return "text-warning-500"
  return "text-muted-foreground"
}

function crewStatusColor(status: string) {
  if (status === "here") return "bg-success-500"
  if (status === "en route") return "bg-warning-500"
  return "bg-neutral-600"
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Sidebar ---------------------------------------------------- */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-default-border">
          <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Sun className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Solstice Fest</p>
              <p className="text-caption font-caption text-muted-foreground mt-1">
                Jun 12–14 · Harbor Point
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

          <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
            <div className="rounded-lg border border-default-border bg-card p-3">
              <p className="text-caption font-caption text-muted-foreground">
                Your crew · 7 going
              </p>
              <div className="mt-2.5 flex items-center justify-between gap-3">
                <AvatarGroup>
                  <Avatar size="sm">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=26"
                      alt="Jade Okafor"
                    />
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=59"
                      alt="Rui Costa"
                    />
                    <AvatarFallback>RC</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=48"
                      alt="Nina Bergström"
                    />
                    <AvatarFallback>NB</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+4</AvatarGroupCount>
                </AvatarGroup>
                <Button variant="outline" size="icon-xs" aria-label="Invite friends">
                  <Plus className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <Separator className="bg-default-border" />

            <div className="flex items-center gap-2.5">
              <Avatar>
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=68"
                  alt="Alex Moreau"
                />
                <AvatarFallback>AM</AvatarFallback>
                <AvatarBadge className="bg-success-500" />
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-none">
                  Alex Moreau
                </p>
                <p className="text-caption font-caption text-muted-foreground mt-1">
                  Wristband #A-20417
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main ------------------------------------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-default-border px-6">
            <div className="flex items-center gap-2.5 text-sm">
              <CalendarDays
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="font-medium">Saturday · Jun 13</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Day 2 of 3</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Button variant="outline" size="sm">
                Share plan
              </Button>
              <Button size="sm">
                <Plus className="size-4" aria-hidden="true" />
                Invite crew
              </Button>
            </div>
          </header>

          <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] gap-6 p-6">
            {/* Left column */}
            <div className="flex min-w-0 flex-col gap-5">
              {/* Day tabs */}
              <div className="flex items-center justify-between gap-4">
                <Tabs defaultValue="sat">
                  <TabsList>
                    <TabsTrigger value="fri">Fri 12</TabsTrigger>
                    <TabsTrigger value="sat">Sat 13</TabsTrigger>
                    <TabsTrigger value="sun">Sun 14</TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="font-code text-xs text-warning-500">
                  1 set overlap in your plan
                </p>
              </div>

              {/* Schedule */}
              <Card className="min-h-0 gap-0 py-4">
                <CardHeader className="border-b border-default-border px-5 pb-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Saturday lineup
                  </CardTitle>
                  <CardDescription>
                    42 acts across 4 stages · gates open 16:00
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-0 px-5">
                  {SATURDAY.map((act, i) => (
                    <div key={act.name} className="flex flex-col">
                      {i > 0 ? <Separator className="bg-default-border" /> : null}
                      <div className="flex items-center gap-4 py-3">
                        <span className="w-11 shrink-0 font-code text-sm text-muted-foreground">
                          {act.time}
                        </span>
                        <Avatar className="shrink-0">
                          {act.src ? (
                            <AvatarImage src={act.src} alt={act.name} />
                          ) : null}
                          <AvatarFallback>{act.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium leading-none">
                              {act.name}
                            </span>
                            {act.inPlan ? (
                              <Badge
                                variant="outline"
                                className="gap-1 border-success-300 text-success-600"
                              >
                                <Check className="size-3" aria-hidden="true" />
                                In plan
                              </Badge>
                            ) : null}
                            {act.overlap ? (
                              <Badge className="border-transparent bg-warning-100 text-warning-700">
                                overlap
                              </Badge>
                            ) : null}
                          </p>
                          <p className="text-caption font-caption text-muted-foreground mt-1.5">
                            {act.genre}
                            {act.overlap ? ` · ${act.overlap}` : ""}
                          </p>
                        </div>
                        <span className="hidden w-28 shrink-0 text-end text-sm text-muted-foreground lg:inline">
                          {act.stage}
                        </span>
                        {act.inPlan ? (
                          <Button
                            variant="secondary"
                            size="icon-xs"
                            aria-label={`Remove ${act.name} from plan`}
                          >
                            <Check className="size-3.5" aria-hidden="true" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label={`Add ${act.name} to plan`}
                          >
                            <Plus className="size-3.5" aria-hidden="true" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right rail */}
            <div className="flex min-w-0 flex-col gap-5">
              {/* Your plan */}
              <Card className="gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Your plan
                  </CardTitle>
                  <CardDescription>3 acts saved for Saturday</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 px-5">
                  <div className="flex flex-col gap-1.5">
                    <Progress value={25} aria-label="Festival progress" />
                    <p className="font-code text-xs text-muted-foreground">
                      12 of 48 acts picked · 3 days
                    </p>
                  </div>
                  <Separator className="bg-default-border" />
                  {UPCOMING.map((act) => (
                    <div
                      key={act.name}
                      className="flex items-center gap-2.5"
                    >
                      <Avatar size="sm">
                        {act.src ? (
                          <AvatarImage src={act.src} alt={act.name} />
                        ) : null}
                        <AvatarFallback>{act.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-none">
                          {act.name}
                        </p>
                        <p className="text-caption font-caption text-muted-foreground mt-1">
                          {act.stage}
                        </p>
                      </div>
                      <span className="font-code text-xs text-muted-foreground">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Crew status */}
              <Card className="gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Crew status
                  </CardTitle>
                  <CardDescription>Live · updated 18:04</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 px-5">
                  {CREW.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Avatar>
                          {member.src ? (
                            <AvatarImage src={member.src} alt={member.name} />
                          ) : null}
                          <AvatarFallback>{member.initials}</AvatarFallback>
                          <AvatarBadge
                            className={crewStatusColor(member.status)}
                          />
                        </Avatar>
                        <span className="truncate text-sm font-medium">
                          {member.name}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-code text-xs ${crewStatusClasses(member.status)}`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>

          <footer className="flex h-8 shrink-0 items-center justify-between border-t border-default-border px-6">
            <p className="font-code text-xs text-muted-foreground">
              Harbor Point, ME · Main Stage cap. 12,000 · clear, 18°C
            </p>
            <p className="font-code text-xs text-muted-foreground">
              Solstice app v1.3
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
