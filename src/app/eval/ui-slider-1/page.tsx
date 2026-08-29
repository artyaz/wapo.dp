"use client";

/**
 * EVAL page — slider p1 — smart home control panel — 1440x900 dark
 *
 * "Hearth OS" wall-panel dashboard for the Alder House. Slider is the spine
 * of the screen: target-temperature slider with mono readout, two-thumb night
 * comfort band, four vertical zone-dimmer sliders, master brightness and
 * color-temperature sliders — every slider with a visible mono value.
 * Other ui/* components: Card, Badge, Button, Switch, Tabs, Separator.
 */

import {
  Film,
  House,
  Lightbulb,
  Moon,
  Plane,
  Play,
  Sunset,
  Thermometer,
  Zap,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const ROOMS = [
  { name: "Living room", status: "21.5° · lights on", active: true },
  { name: "Kitchen", status: "20.0° · off", active: false },
  { name: "Primary bedroom", status: "19.0° · dim 20%", active: false },
  { name: "Office", status: "20.5° · off", active: false },
  { name: "Terrace", status: "12.8° · off", active: false },
];

const SCENES = [
  { icon: Sunset, label: "Evening", active: true },
  { icon: Film, label: "Movie", active: false },
  { icon: Moon, label: "Night", active: false },
  { icon: Plane, label: "Away", active: false },
];

const ZONES = [
  { name: "Pendants", value: 72 },
  { name: "Floor lamp", value: 40 },
  { name: "Track spots", value: 15 },
  { name: "Terrace", value: 0 },
];

const ENERGY = [
  { value: "3.2 kW", label: "Grid draw" },
  { value: "0.4 kW", label: "Solar" },
  { value: "64%", label: "Battery" },
  { value: "8.1 kWh", label: "Est. tonight" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* Room sidebar — flat panel + hairline, no glass */}
        <aside className="flex w-60 flex-none flex-col border-r border-default-border bg-card">
          <div className="flex h-14 flex-none items-center gap-2.5 border-b border-default-border px-4">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-background">
              <House className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Alder House</p>
              <p className="font-code text-[10px] text-muted-foreground">
                Hearth OS · v4.2.1
              </p>
            </div>
          </div>

          <nav className="flex-1 px-2 py-3">
            <p className="px-2 pb-2 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Rooms
            </p>
            {ROOMS.map((room) => (
              <div
                key={room.name}
                className={
                  room.active
                    ? "flex items-center justify-between rounded-sm bg-muted px-2 py-2"
                    : "flex items-center justify-between rounded-sm px-2 py-2"
                }
              >
                <span className="truncate text-sm">{room.name}</span>
                <span className="font-code text-[10px] whitespace-nowrap text-muted-foreground">
                  {room.status}
                </span>
              </div>
            ))}
          </nav>

          <div className="flex-none border-t border-default-border p-3">
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Scenes
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {SCENES.map((scene) => (
                <Button
                  key={scene.label}
                  size="xs"
                  variant={scene.active ? "secondary" : "ghost"}
                  className="justify-start"
                >
                  <scene.icon className="size-3.5" />
                  {scene.label}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-14 flex-none items-center justify-between gap-6 border-b border-default-border px-6">
            <div className="min-w-0">
              <h1 className="truncate font-heading-2 text-heading-2 text-foreground">
                Good evening, Ines
              </h1>
              <p className="font-code text-[10px] text-muted-foreground">
                Fri 06 Mar · 19:42 · sunset 18:55 · guests arrive 20:00
              </p>
            </div>
            <div className="flex flex-none items-center gap-3">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="climate">Climate</TabsTrigger>
                  <TabsTrigger value="lighting">Lighting</TabsTrigger>
                  <TabsTrigger value="energy">Energy</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button size="sm">
                <Play />
                Run evening scene
              </Button>
            </div>
          </header>

          {/* Dashboard grid */}
          <main className="grid flex-1 grid-cols-12 grid-rows-2 gap-4 p-6">
            {/* Climate — target temperature + night comfort band */}
            <Card className="col-span-7 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                  <Thermometer className="size-4 text-muted-foreground" />
                  <CardTitle>Living room climate</CardTitle>
                </div>
                <Badge variant="secondary">Heating · reaching 22.0°</Badge>
              </div>

              <div className="mt-4 flex items-end justify-between px-5">
                <div>
                  <p className="font-code text-5xl leading-none tabular-nums">
                    21.5°
                  </p>
                  <p className="mt-1.5 font-code text-[10px] text-muted-foreground">
                    currently · humidity 38% · mode auto · fan 2/3
                  </p>
                </div>
                <p className="text-right font-code text-[10px] leading-snug text-muted-foreground">
                  heating since 19:26
                  <br />
                  filter life 82%
                </p>
              </div>

              <div className="mt-5 px-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">
                    Target temperature
                  </span>
                  <span className="font-code text-sm tabular-nums">
                    22.0 °C
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  defaultValue={[22]}
                  min={16}
                  max={28}
                  step={0.5}
                  aria-label="Target temperature"
                />
                <div className="mt-1.5 flex justify-between font-code text-[10px] text-muted-foreground">
                  <span>16°</span>
                  <span>20°</span>
                  <span>24°</span>
                  <span>28°</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="px-5 pb-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">
                    Night comfort band
                  </span>
                  <span className="font-code text-sm tabular-nums">
                    19.0° – 23.5°
                  </span>
                </div>
                <Slider
                  className="mt-3"
                  defaultValue={[19, 23.5]}
                  min={16}
                  max={28}
                  step={0.5}
                  aria-label="Night comfort band"
                />
                <p className="mt-2 font-code text-[10px] text-muted-foreground">
                  Active 22:30 – 06:30 · eco setback when outside band
                </p>
              </div>
            </Card>

            {/* Lighting — vertical zone dimmers */}
            <Card className="col-span-5 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-muted-foreground" />
                  <CardTitle>Zone dimmers</CardTitle>
                </div>
                <span className="font-code text-[10px] text-muted-foreground">
                  3 of 6 zones on
                </span>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3 px-5">
                {ZONES.map((zone) => (
                  <div
                    key={zone.name}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-xs text-muted-foreground">
                      {zone.name}
                    </span>
                    <Slider
                      orientation="vertical"
                      defaultValue={[zone.value]}
                      min={0}
                      max={100}
                      step={1}
                      className="h-32"
                      aria-label={`${zone.name} brightness`}
                    />
                    <span
                      className={
                        zone.value === 0
                          ? "font-code text-xs tabular-nums text-muted-foreground"
                          : "font-code text-xs tabular-nums"
                      }
                    >
                      {zone.value === 0 ? "Off" : `${zone.value}%`}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Whole-home lighting — master brightness + warmth */}
            <Card className="col-span-5 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <CardTitle>Whole-home lighting</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Follow sunset
                  </span>
                  <Switch defaultChecked aria-label="Follow sunset" />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-5 px-5">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">
                      Master brightness
                    </span>
                    <span className="font-code text-sm tabular-nums">58%</span>
                  </div>
                  <Slider
                    className="mt-3"
                    defaultValue={[58]}
                    min={0}
                    max={100}
                    step={1}
                    aria-label="Master brightness"
                  />
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">Warmth</span>
                    <span className="font-code text-sm tabular-nums">
                      3100 K
                    </span>
                  </div>
                  <Slider
                    className="mt-3"
                    defaultValue={[3100]}
                    min={2700}
                    max={6500}
                    step={100}
                    aria-label="Color temperature"
                  />
                  <div className="mt-1.5 flex justify-between font-code text-[10px] text-muted-foreground">
                    <span>2700 K warm</span>
                    <span>4600 K</span>
                    <span>6500 K cool</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Energy right now */}
            <Card className="col-span-7 gap-0 py-4">
              <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-muted-foreground" />
                  <CardTitle>Energy right now</CardTitle>
                </div>
                <CardAction>
                  <Badge variant="outline">Grid + solar</Badge>
                </CardAction>
              </div>
              <div className="mt-5 grid grid-cols-4 divide-x divide-default-border px-5">
                {ENERGY.map((stat) => (
                  <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                    <p className="font-code text-2xl leading-none tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 px-5 font-code text-[10px] text-muted-foreground">
                EV charging scheduled 01:00 · low tariff until 23:00 · battery
                reserve 20%
              </p>
            </Card>
          </main>

          {/* Status footer */}
          <footer className="flex h-9 flex-none items-center justify-between border-t border-default-border px-6 font-code text-[10px] text-muted-foreground">
            <span>
              <span className="text-success-500">●</span> Hub online · 14
              devices · last sync 19:41
            </span>
            <span>Away mode off · alarm arms 22:30</span>
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
