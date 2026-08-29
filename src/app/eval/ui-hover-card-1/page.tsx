"use client"

// EVAL page — hover-card p1 — smart home control panel — 1180x820 light

import {
  Bell,
  Cloud,
  Gauge,
  House,
  Lightbulb,
  Lock,
  Plug,
  Settings,
  ShieldCheck,
  Sofa,
  Thermometer,
  Wind,
  Workflow,
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
import { Switch } from "@/components/ui/switch"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Overview", icon: House, active: true },
  { label: "Rooms", icon: Sofa, active: false },
  { label: "Devices", icon: Plug, active: false },
  { label: "Automations", icon: Workflow, active: false },
  { label: "Energy", icon: Gauge, active: false },
  { label: "Security", icon: ShieldCheck, active: false },
  { label: "Settings", icon: Settings, active: false },
]

const STATS = [
  { label: "Indoor temp", value: "21.5°C", sub: "target 22.0°C" },
  { label: "Humidity", value: "42%", sub: "comfortable" },
  { label: "Active devices", value: "12/18", sub: "3 idle · 3 offline-ready" },
  { label: "Energy today", value: "6.4 kWh", sub: "off-peak until 22:00" },
]

const AUTOMATIONS = [
  { name: "Morning warm-up", when: "06:20 · weekdays", on: true },
  { name: "Away mode", when: "when everyone leaves", on: true },
  { name: "Midnight lights-off", when: "00:00 · daily", on: false },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Sidebar ---------------------------------------------------- */}
        <aside className="flex w-52 shrink-0 flex-col border-r border-default-border bg-neutral-50">
          <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <House className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Hearth</p>
              <p className="mt-1 text-caption font-caption text-muted-foreground">
                Maple Street · Home
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
            <Separator className="bg-default-border" />
            <div className="flex items-center gap-2.5">
              <Avatar>
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-none">
                  Elena Marsh
                </p>
                <p className="mt-1 text-caption font-caption text-muted-foreground">
                  Owner · admin
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main ------------------------------------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-default-border px-6">
            <div className="flex items-center gap-2.5 text-sm">
              <span className="font-medium">Overview</span>
              <span className="text-muted-foreground" aria-hidden="true">
                /
              </span>
              <span className="font-code text-muted-foreground">
                18 devices · 2 hubs
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-sm border border-default-border px-2.5 py-1.5 font-code text-xs text-muted-foreground">
                <Cloud className="size-3.5" aria-hidden="true" />
                12°C · Overcast
              </span>
              <Button variant="outline" size="icon-sm" aria-label="Notifications">
                <span className="relative flex">
                  <Bell className="size-4" aria-hidden="true" />
                  <span className="absolute -top-0.5 -end-0.5 size-1.5 rounded-full bg-warning-500" />
                </span>
              </Button>
              <Avatar size="sm">
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_296px] gap-5 p-5">
            {/* Left column */}
            <div className="flex min-w-0 flex-col gap-4">
              {/* Stat tiles */}
              <div className="grid grid-cols-4 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-default-border bg-card px-3.5 py-3"
                  >
                    <p className="text-caption font-caption text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 font-code text-lg leading-none text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-caption font-caption text-muted-foreground">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Devices */}
              <section className="flex min-h-0 flex-1 flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading-3 text-heading-3 text-foreground">
                    Rooms &amp; devices
                  </h2>
                  <Button variant="ghost" size="xs">
                    Edit layout
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Thermostat — hover card open at initial render */}
                  <div className="flex flex-col gap-3 rounded-lg border border-default-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-sm bg-secondary text-foreground">
                          <Thermometer className="size-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            Living room
                          </p>
                          <p className="mt-1 text-caption font-caption text-muted-foreground">
                            Thermostat · Hearth T-300
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 font-code text-xs text-warning-700">
                        <span className="size-1.5 rounded-full bg-warning-500" />
                        heating
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="font-code text-2xl leading-none">21.5°</p>
                      <p className="text-caption font-caption text-muted-foreground">
                        heating to 22.0° · 14 min left
                      </p>
                    </div>
                    <HoverCard defaultOpen openDelay={100} closeDelay={100}>
                      <HoverCardTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="xs"
                            className="self-start text-muted-foreground"
                          />
                        }
                      >
                        Device details
                      </HoverCardTrigger>
                      <HoverCardContent
                        side="bottom"
                        align="start"
                        className="flex w-80 flex-col gap-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold leading-none">
                              Hearth T-300 Thermostat
                            </p>
                            <p className="mt-1.5 font-code text-xs text-muted-foreground">
                              SN T300-88412 · Living room
                            </p>
                          </div>
                          <Badge variant="outline" className="font-code">
                            v4.2.1
                          </Badge>
                        </div>
                        <Separator />
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          {[
                            ["Target", "22.0°C"],
                            ["Current", "21.5°C"],
                            ["Humidity", "42%"],
                            ["Power draw", "820 W"],
                            ["Signal", "-52 dBm"],
                            ["Uptime", "99.98%"],
                          ].map(([term, value]) => (
                            <div key={term} className="flex justify-between gap-2">
                              <dt className="text-muted-foreground">{term}</dt>
                              <dd className="font-code">{value}</dd>
                            </div>
                          ))}
                        </dl>
                        <Separator />
                        <div className="flex items-center gap-2">
                          <Button size="xs">Open controls</Button>
                          <Button variant="outline" size="xs">
                            Usage history
                          </Button>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {/* Front door lock */}
                  <div className="flex flex-col gap-3 rounded-lg border border-default-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-sm bg-secondary text-foreground">
                          <Lock className="size-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            Front door
                          </p>
                          <p className="mt-1 text-caption font-caption text-muted-foreground">
                            Lock · Hearth L2
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 font-code text-xs text-success-700">
                        <span className="size-1.5 rounded-full bg-success-500" />
                        locked
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="font-code text-2xl leading-none">84%</p>
                      <p className="text-caption font-caption text-muted-foreground">
                        battery · auto-lock 22:00
                      </p>
                    </div>
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="xs"
                            className="self-start text-muted-foreground"
                          />
                        }
                      >
                        Device details
                      </HoverCardTrigger>
                      <HoverCardContent side="bottom" align="start" className="w-72">
                        <p className="text-sm font-semibold leading-none">
                          Hearth L2 Smart Lock
                        </p>
                        <p className="mt-1.5 font-code text-xs text-muted-foreground">
                          SN L2-40217 · Front door
                        </p>
                        <Separator className="my-3" />
                        <p className="text-sm text-muted-foreground">
                          Last locked by Elena Marsh at 09:12. Auto-lock armed
                          for 22:00; keypad codes: 3 active.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {/* Air purifier */}
                  <div className="flex flex-col gap-3 rounded-lg border border-default-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-sm bg-secondary text-foreground">
                          <Wind className="size-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            Nursery
                          </p>
                          <p className="mt-1 text-caption font-caption text-muted-foreground">
                            Air purifier · Aer Mini A2
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 font-code text-xs text-success-700">
                        <span className="size-1.5 rounded-full bg-success-500" />
                        AQI 18
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="font-code text-2xl leading-none">Auto</p>
                      <p className="text-caption font-caption text-muted-foreground">
                        filter life 63% · quiet mode
                      </p>
                    </div>
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="xs"
                            className="self-start text-muted-foreground"
                          />
                        }
                      >
                        Device details
                      </HoverCardTrigger>
                      <HoverCardContent side="bottom" align="start" className="w-72">
                        <p className="text-sm font-semibold leading-none">
                          Aer Mini A2 Purifier
                        </p>
                        <p className="mt-1.5 font-code text-xs text-muted-foreground">
                          SN A2-99044 · Nursery
                        </p>
                        <Separator className="my-3" />
                        <p className="text-sm text-muted-foreground">
                          PM2.5 at 4 µg/m³ · filter replaced 42 days ago.
                          Scheduled check-in every 6 hours.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {/* Kitchen lights */}
                  <div className="flex flex-col gap-3 rounded-lg border border-default-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-sm bg-secondary text-foreground">
                          <Lightbulb className="size-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            Kitchen
                          </p>
                          <p className="mt-1 text-caption font-caption text-muted-foreground">
                            6 bulbs · dimmable
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked aria-label="Kitchen lights" />
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="font-code text-2xl leading-none">60%</p>
                      <p className="text-caption font-caption text-muted-foreground">
                        warm white · 2700 K
                      </p>
                    </div>
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="xs"
                            className="self-start text-muted-foreground"
                          />
                        }
                      >
                        Device details
                      </HoverCardTrigger>
                      <HoverCardContent side="bottom" align="end" className="w-72">
                        <p className="text-sm font-semibold leading-none">
                          Kitchen Light Group
                        </p>
                        <p className="mt-1.5 font-code text-xs text-muted-foreground">
                          6 × Hearth Bulb E27 · Mesh
                        </p>
                        <Separator className="my-3" />
                        <p className="text-sm text-muted-foreground">
                          Group power draw 34 W at 60%. Tied to “Midnight
                          lights-off” automation.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </section>
            </div>

            {/* Right rail */}
            <div className="flex min-w-0 flex-col gap-4">
              {/* Energy budget */}
              <section className="rounded-lg border border-default-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading-3 text-heading-3">
                    Energy budget
                  </h2>
                  <Badge variant="outline" className="font-code">
                    Feb
                  </Badge>
                </div>
                <p className="mt-2.5 font-code text-xl leading-none">135 kWh</p>
                <p className="mt-1.5 text-caption font-caption text-muted-foreground">
                  of 210 kWh monthly cap
                </p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <Progress value={64} aria-label="Monthly energy budget" />
                  <p className="font-code text-xs text-muted-foreground">
                    64% used · 12 days left
                  </p>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">vs. last month</span>
                  <span className="font-code text-success-700">-8.2%</span>
                </div>
              </section>

              {/* Automations */}
              <section className="rounded-lg border border-default-border bg-card p-4">
                <h2 className="font-heading-3 text-heading-3">Automations</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {AUTOMATIONS.map((auto) => (
                    <div
                      key={auto.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-none">
                          {auto.name}
                        </p>
                        <p className="mt-1 truncate font-code text-xs text-muted-foreground">
                          {auto.when}
                        </p>
                      </div>
                      <Switch
                        defaultChecked={auto.on}
                        aria-label={`${auto.name} automation`}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Household — member profile hover cards */}
              <section className="rounded-lg border border-default-border bg-card p-4">
                <h2 className="font-heading-3 text-heading-3">Household</h2>
                <div className="mt-3 flex flex-col gap-3">
                  <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger
                      render={
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-3 rounded-sm text-start outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                      }
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Avatar size="sm">
                          <AvatarFallback>DM</AvatarFallback>
                        </Avatar>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium leading-none">
                            Daniel Marsh
                          </span>
                          <span className="mt-1 block text-caption font-caption text-muted-foreground">
                            Member · full access
                          </span>
                        </span>
                      </span>
                      <span className="font-code text-xs text-muted-foreground">
                        home
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="left"
                      align="center"
                      className="flex w-72 flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar size="lg">
                          <AvatarFallback>DM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold leading-none">
                            Daniel Marsh
                          </p>
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            Member since Mar 2024
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <p className="text-sm leading-snug text-muted-foreground">
                        Can control thermostat, lights and media. Cannot edit
                        automations, locks or billing.
                      </p>
                      <Separator />
                      <dl className="grid grid-cols-3 gap-2 text-center">
                        {[
                          ["Devices", "3"],
                          ["Scenes", "2"],
                          ["Last active", "18:02"],
                        ].map(([term, value]) => (
                          <div key={term}>
                            <dd className="font-code text-sm">{value}</dd>
                            <dt className="mt-1 text-caption font-caption text-muted-foreground">
                              {term}
                            </dt>
                          </div>
                        ))}
                      </dl>
                      <Button variant="outline" size="sm" className="w-full">
                        Manage access
                      </Button>
                    </HoverCardContent>
                  </HoverCard>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium leading-none">
                          Marta Prieto
                        </span>
                        <span className="mt-1 block text-caption font-caption text-muted-foreground">
                          Sitter · limited
                        </span>
                      </span>
                    </span>
                    <span className="font-code text-xs text-muted-foreground">
                      away
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </main>

          <footer className="flex h-8 shrink-0 items-center justify-between border-t border-default-border px-6">
            <p className="font-code text-xs text-muted-foreground">
              All systems nominal · last sync 2 min ago
            </p>
            <p className="font-code text-xs text-muted-foreground">
              Hearth OS 6.1 · hub A
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
