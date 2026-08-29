"use client"

// EVAL page — hover-card p2 — fitness class scheduler — 390x844 dark (phone)

import {
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  Dumbbell,
  User,
  Users,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type ClassRow = {
  time: string
  meta: string
  name: string
  coach: { name: string; initials: string }
  state: "completed" | "booked" | "urgent" | "full"
  spots: string
}

const CLASSES: ClassRow[] = [
  {
    time: "05:45",
    meta: "Studio 1 · 50 min",
    name: "Sunrise Yoga Flow",
    coach: { name: "Lena Ortiz", initials: "LO" },
    state: "completed",
    spots: "14 attended",
  },
  {
    time: "06:30",
    meta: "Studio 2 · 45 min",
    name: "Spin Interval 45",
    coach: { name: "Dara Osei", initials: "DO" },
    state: "urgent",
    spots: "1 spot left",
  },
  {
    time: "07:15",
    meta: "Studio 1 · 60 min",
    name: "Vinyasa Flow II",
    coach: { name: "Lena Ortiz", initials: "LO" },
    state: "booked",
    spots: "Booked · mat 12",
  },
  {
    time: "18:30",
    meta: "Studio 3 · 50 min",
    name: "Boxing Conditioning",
    coach: { name: "Dara Osei", initials: "DO" },
    state: "full",
    spots: "Full · waitlist 3",
  },
]

const BOTTOM_NAV = [
  { label: "Schedule", icon: CalendarDays, active: true },
  { label: "Coaches", icon: Users, active: false },
  { label: "Progress", icon: BarChart3, active: false },
  { label: "Profile", icon: User, active: false },
]

/* ------------------------------------------------------------------ */
/* Coach hover card                                                    */
/* ------------------------------------------------------------------ */

function CoachHoverCard({
  coach,
  defaultOpen = false,
}: {
  coach: { name: string; initials: string }
  defaultOpen?: boolean
}) {
  return (
    <HoverCard defaultOpen={defaultOpen} openDelay={100} closeDelay={100}>
      <HoverCardTrigger
        render={
          <button
            type="button"
            className="flex min-w-0 items-center gap-2 rounded-sm text-start outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        }
      >
        <Avatar size="sm">
          <AvatarFallback>{coach.initials}</AvatarFallback>
        </Avatar>
        <span className="min-w-0">
          <span className="block truncate text-xs font-medium leading-none">
            {coach.name}
          </span>
          <span className="mt-1 block text-[11px] leading-none text-muted-foreground">
            View coach profile
          </span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="start"
        className="flex w-[300px] flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{coach.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold leading-none">{coach.name}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Spin &amp; Conditioning Coach
            </p>
          </div>
        </div>
        <p className="text-sm leading-snug text-muted-foreground">
          Former track sprinter turned endurance coach. Eight years leading
          interval classes — expect structured effort blocks and no hiding at
          the back.
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline">NASM-CPT</Badge>
          <Badge variant="outline">Spin L2</Badge>
          <Badge variant="outline">First aid</Badge>
        </div>
        <Separator />
        <dl className="grid grid-cols-3 gap-2 text-center">
          {[
            ["Classes / wk", "12"],
            ["Rating", "4.9"],
            ["Avg. burn", "512 kcal"],
          ].map(([term, value]) => (
            <div key={term}>
              <dd className="font-code text-sm">{value}</dd>
              <dt className="mt-1 text-[11px] leading-none text-muted-foreground">
                {term}
              </dt>
            </div>
          ))}
        </dl>
        <Button size="sm" className="w-full">
          View full profile
        </Button>
      </HoverCardContent>
    </HoverCard>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* Top bar --------------------------------------------------- */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-default-border px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Dumbbell className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Ironwood</p>
              <p className="mt-1 text-caption font-caption text-muted-foreground">
                Athletic Club · Downtown
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Notifications"
              className="relative"
            >
              <Bell className="size-4" aria-hidden="true" />
              <span className="absolute top-1.5 end-1.5 size-1.5 rounded-full bg-warning-500" />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Body ------------------------------------------------------ */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-3.5">
          {/* Greeting + weekly goal */}
          <section>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Good morning, Maya
            </h1>
            <p className="mt-1 text-caption font-caption text-muted-foreground">
              Thursday, Feb 12 · 4 classes today
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-default-border bg-card px-3.5 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium">Weekly goal</p>
                  <p className="font-code text-xs text-muted-foreground">
                    3 of 5 classes
                  </p>
                </div>
                <Progress
                  value={60}
                  className="mt-2 h-1.5"
                  aria-label="Weekly class goal"
                />
              </div>
            </div>
          </section>

          {/* Tabs + class list --------------------------------------- */}
          <Tabs
            defaultValue="today"
            className="mt-3.5 flex min-h-0 flex-1 flex-col gap-3"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
              <TabsTrigger value="week">This week</TabsTrigger>
            </TabsList>

            <TabsContent
              value="today"
              className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden"
            >
              {CLASSES.map((cls, index) => (
                <div
                  key={cls.time}
                  className={`rounded-lg border border-default-border bg-card p-3 ${
                    cls.state === "completed" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-code text-[11px] leading-none text-muted-foreground">
                        {cls.time} · {cls.meta}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold leading-none">
                        {cls.name}
                      </p>
                    </div>
                    {cls.state === "urgent" && (
                      <Badge className="border-transparent bg-warning-100 text-warning-700">
                        1 spot left
                      </Badge>
                    )}
                    {cls.state === "booked" && (
                      <Badge className="gap-1 border-transparent bg-success-100 text-success-700">
                        <Check className="size-3" aria-hidden="true" />
                        Booked
                      </Badge>
                    )}
                    {cls.state === "completed" && (
                      <Badge variant="outline">Completed</Badge>
                    )}
                    {cls.state === "full" && (
                      <Badge variant="secondary">Full</Badge>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-default-border pt-2.5">
                    <CoachHoverCard
                      coach={cls.coach}
                      defaultOpen={index === 1}
                    />
                    {cls.state === "completed" ? (
                      <Button variant="ghost" size="xs" disabled>
                        Class ended
                      </Button>
                    ) : cls.state === "booked" ? (
                      <Button variant="ghost" size="xs">
                        Cancel
                      </Button>
                    ) : cls.state === "full" ? (
                      <Button variant="outline" size="xs">
                        Join waitlist
                      </Button>
                    ) : (
                      <Button size="xs">Book</Button>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="tomorrow" className="min-h-0 flex-1">
              <p className="text-sm text-muted-foreground">
                6 classes scheduled for Friday, Feb 13.
              </p>
            </TabsContent>

            <TabsContent value="week" className="min-h-0 flex-1">
              <p className="text-sm text-muted-foreground">
                23 classes this week across 4 studios.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom nav ------------------------------------------------ */}
        <nav
          className="flex h-16 shrink-0 items-stretch justify-around border-t border-default-border bg-background"
          aria-label="Main"
        >
          {BOTTOM_NAV.map((item) => (
            <span
              key={item.label}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 ${
                item.active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <item.icon className="size-5" aria-hidden="true" />
              <span className="text-[11px] leading-none font-medium">
                {item.label}
              </span>
            </span>
          ))}
        </nav>
      </div>
    </EvalShell>
  )
}
