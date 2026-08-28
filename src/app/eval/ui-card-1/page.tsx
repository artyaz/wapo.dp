"use client"

// EVAL page — card p1 — smart home control panel — 768x1024 light
// Card family (stat / control / scene / media compositions) + Badge, Button,
// Switch, Slider, Separator. Flat panels + hairlines only — no cast shadows.

import {
  Bot,
  Coffee,
  Droplets,
  History,
  Lamp,
  Lightbulb,
  MonitorPlay,
  Plus,
  ShieldCheck,
  Sprout,
  Thermometer,
  Zap,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

const stats = [
  { icon: Thermometer, label: "Indoor temp", value: "21.5°", sub: "Living room · heating" },
  { icon: Droplets, label: "Humidity", value: "42%", sub: "Comfortable range" },
  { icon: Zap, label: "Energy today", value: "8.4 kWh", sub: "+0.6 vs yesterday" },
  { icon: ShieldCheck, label: "Security", value: "Armed", sub: "Front + rear doors" },
]

const devices = [
  { icon: Lightbulb, name: "Kitchen pendants", where: "Kitchen · 3 bulbs", on: true },
  { icon: Lamp, name: "Reading lamps", where: "Bedroom · 2 bulbs", on: false },
  { icon: Bot, name: "Nimbus vacuum", where: "Docked · 78% charged", on: true },
  { icon: Sprout, name: "Garden irrigation", where: "Backyard · zone 2 of 4", on: false },
]

const scenes = [
  {
    icon: Coffee,
    name: "Good morning",
    detail: "Lights 60% · blinds up · 21°",
  },
  {
    icon: MonitorPlay,
    name: "Movie night",
    detail: "Dim living room · TV on",
  },
  {
    icon: ShieldCheck,
    name: "Away",
    detail: "All off · locks · cameras",
  },
]

const week = [
  { day: "Mon", kwh: 7.2 },
  { day: "Tue", kwh: 9.1 },
  { day: "Wed", kwh: 6.8 },
  { day: "Thu", kwh: 8.4 },
  { day: "Fri", kwh: 10.2 },
  { day: "Sat", kwh: 11.6 },
  { day: "Today", kwh: 8.4 },
]

export default function Page() {
  const peak = Math.max(...week.map((d) => d.kwh))

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col gap-4 px-6 py-5">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-caption text-caption text-muted-foreground">
              Maple Street · 4 rooms · 12 devices
            </p>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Good afternoon, Elena
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <History />
              History
            </Button>
            <Button size="sm">
              <Plus />
              Add device
            </Button>
          </div>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <Card key={s.label} className="gap-2 py-4">
              <CardContent className="px-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <s.icon className="size-3.5" />
                  <span className="font-caption text-caption">{s.label}</span>
                </div>
                <p className="font-code text-2xl text-foreground">{s.value}</p>
                <p className="font-caption text-caption text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Climate + devices */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="text-sm">Climate</CardTitle>
              <CardDescription>Living room · auto schedule</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-code text-4xl leading-none text-foreground">21.5°</p>
                  <p className="mt-1.5 font-caption text-caption text-muted-foreground">
                    Heating to 22.0° · reaches in ~12 min
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Slider defaultValue={[22]} min={16} max={26} step={0.5} aria-label="Target temperature" />
                <div className="flex justify-between font-code text-xs text-muted-foreground">
                  <span>16°</span>
                  <span>22.0° target</span>
                  <span>26°</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Badge variant="outline">Eco</Badge>
              <Badge variant="outline">Boost</Badge>
              <Badge variant="default">Auto</Badge>
            </CardFooter>
          </Card>

          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="text-sm">Devices</CardTitle>
              <CardDescription>Quick toggles · 3 active</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              {devices.map((d, i) => (
                <div key={d.name}>
                  {i > 0 && <Separator className="my-3" />}
                  <div className="flex items-center gap-3">
                    <d.icon className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{d.name}</p>
                      <p className="truncate font-caption text-caption text-muted-foreground">
                        {d.where}
                      </p>
                    </div>
                    <Switch defaultChecked={d.on} aria-label={`Toggle ${d.name}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Scenes — nested action cards */}
        <div className="grid grid-cols-3 gap-3">
          {scenes.map((s) => (
            <Card key={s.name} className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <s.icon className="size-4 text-muted-foreground" />
                  {s.name}
                </CardTitle>
                <CardDescription>{s.detail}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto px-4">
                <Button variant="outline" size="xs" className="w-full">
                  Run scene
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Energy — flat in-flow chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Energy this week</CardTitle>
            <CardDescription>61.7 kWh total · peak Friday 10.2 kWh</CardDescription>
            <CardAction>
              <Badge variant="secondary">Grid + solar</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex items-end justify-between gap-3 pt-2">
            {week.map((d) => (
              <div key={d.day} className="flex w-full flex-col items-center gap-2">
                <p className="font-code text-xs text-muted-foreground">{d.kwh.toFixed(1)}</p>
                <div className="flex h-14 w-full items-end justify-center">
                  <div
                    className={
                      d.day === "Today"
                        ? "w-2/3 rounded-sm bg-neutral-800"
                        : "w-2/3 rounded-sm bg-neutral-300"
                    }
                    style={{ height: `${Math.max(8, (d.kwh / peak) * 100)}%` }}
                  />
                </div>
                <p className="font-caption text-caption text-muted-foreground">{d.day}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-between">
            <span className="font-code text-xs text-muted-foreground">
              Estimate: 268 kWh this billing cycle
            </span>
            <span className="font-code text-xs text-muted-foreground">
              metered since May 1
            </span>
          </CardFooter>
        </Card>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-code text-xs text-muted-foreground">
            Last sync 14:32:08 · hub firmware 2.7.1
          </span>
          <Button variant="ghost" size="sm">
            View logs
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
