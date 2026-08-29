"use client"
// EVAL page — command p2 — farm IoT sensor dashboard — 390x844 light
// Inline Command panel with a pre-filled search (“irrigation”) showing
// live-filtered device commands, above the sensor readouts. Also features:
// Card, Badge, Button, Progress, Separator. Flat panels + hairlines only.

import {
  DropletsIcon,
  GaugeIcon,
  PlayIcon,
  PauseIcon,
  RadioIcon,
  SettingsIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const stats = [
  { label: "Sensors online", value: "24/24", unit: "" },
  { label: "Open alerts", value: "2", unit: "" },
  { label: "Rain · 24h", value: "12", unit: "mm" },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col gap-3.5 px-4 py-4">
        {/* Header */}
        <header className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-caption text-caption text-muted-foreground">
              TerraLink Farm OS · LoRaWAN
            </p>
            <h1 className="font-heading-3 text-heading-3 text-foreground">
              Willow Creek · Block 4
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Gateway settings"
          >
            <SettingsIcon />
          </Button>
        </header>

        {/* Snapshot stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((s) => (
            <Card key={s.label} className="gap-0 py-0">
              <CardContent className="flex flex-col gap-0.5 px-3 py-2.5">
                <span className="font-caption text-[11px] text-muted-foreground">
                  {s.label}
                </span>
                <span className="flex items-baseline gap-1 font-code text-base font-semibold text-foreground">
                  {s.value}
                  {s.unit ? (
                    <span className="text-xs font-medium text-muted-foreground">
                      {s.unit}
                    </span>
                  ) : null}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick commands — inline command list with live-filtered results */}
        <Card className="gap-0 overflow-hidden py-0">
          <div className="flex items-center justify-between border-b px-4 py-2.5">
            <span className="text-sm font-medium text-foreground">
              Quick commands
            </span>
            <span className="inline-flex items-center gap-1.5 font-code text-[11px] text-muted-foreground">
              <RadioIcon className="size-3.5" /> G-1 gateway
            </span>
          </div>
          <Command className="rounded-none">
            <CommandInput
              value="irrigation"
              placeholder="Search devices or actions…"
            />
            <CommandList className="max-h-[260px]">
              <CommandEmpty>No matching devices.</CommandEmpty>
              <CommandGroup heading="Devices">
                <CommandItem>
                  <DropletsIcon />
                  <span className="min-w-0 truncate">
                    Irrigation valve V-12 · North pivot
                  </span>
                  <span className="ms-auto flex shrink-0 items-center gap-1.5 font-code text-xs text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-success-500" />
                    Running
                  </span>
                </CommandItem>
                <CommandItem>
                  <DropletsIcon />
                  <span className="min-w-0 truncate">
                    Irrigation valve V-07 · South vineyard
                  </span>
                  <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                    Idle
                  </span>
                </CommandItem>
                <CommandItem>
                  <GaugeIcon />
                  <span className="min-w-0 truncate">
                    Irrigation pump P-02 · Borehole
                  </span>
                  <span className="ms-auto shrink-0 font-code text-xs text-muted-foreground">
                    Standby
                  </span>
                </CommandItem>
                {/* Filtered out by the active “irrigation” query: */}
                <CommandItem>
                  <ThermometerIcon />
                  <span className="min-w-0 truncate">
                    Weather station W-01 · Ridge
                  </span>
                </CommandItem>
                <CommandItem>
                  <GaugeIcon />
                  <span className="min-w-0 truncate">
                    Soil probe S-44 · Block 4
                  </span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <PlayIcon />
                  <span className="min-w-0 truncate">
                    Run irrigation cycle — 15 min
                  </span>
                  <CommandShortcut>⌘R</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <PauseIcon />
                  <span className="min-w-0 truncate">Pause all irrigation</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Card>

        {/* Soil moisture — the reason the query is open */}
        <Card className="gap-0 py-0">
          <CardContent className="flex flex-col gap-2.5 px-4 py-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Soil moisture · Block 4 North
                </p>
                <p className="font-caption text-caption text-muted-foreground">
                  Probe S-44 · 30 cm depth · 06:40 reading
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-code text-xs text-warning-600">
                <span className="size-1.5 rounded-full bg-warning-500" />
                Low
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-code text-2xl font-semibold text-foreground">
                31
              </span>
              <span className="font-code text-sm font-medium text-muted-foreground">
                %
              </span>
              <span className="font-caption text-caption text-muted-foreground">
                field capacity 42% · trigger 34%
              </span>
            </div>
            <Progress value={31} aria-label="Soil moisture, 31 percent" />
          </CardContent>
        </Card>

        {/* Tank + weather, side by side */}
        <div className="grid grid-cols-2 gap-2.5">
          <Card className="gap-0 py-0">
            <CardContent className="flex flex-col gap-1.5 px-4 py-3.5">
              <span className="font-caption text-[11px] text-muted-foreground">
                Main water tank
              </span>
              <span className="flex items-baseline gap-1 font-code text-xl font-semibold text-foreground">
                78
                <span className="text-xs font-medium text-muted-foreground">
                  %
                </span>
              </span>
              <Progress value={78} aria-label="Tank level, 78 percent" />
              <span className="font-caption text-[11px] text-muted-foreground">
                156,000 of 200,000 L
              </span>
            </CardContent>
          </Card>
          <Card className="gap-0 py-0">
            <CardContent className="flex flex-col gap-1.5 px-4 py-3.5">
              <span className="font-caption text-[11px] text-muted-foreground">
                Weather · Ridge
              </span>
              <span className="flex items-baseline gap-1 font-code text-xl font-semibold text-foreground">
                14.2
                <span className="text-xs font-medium text-muted-foreground">
                  °C
                </span>
              </span>
              <div className="flex flex-col gap-1 font-code text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <WindIcon className="size-3.5" /> Wind 8 km/h SW
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DropletsIcon className="size-3.5" /> 12 mm last 24h
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <footer className="mt-auto flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success-500" />
            Gateway online · last sync 2 min ago
          </span>
          <Badge variant="outline" className="font-code">
            v2.8.1
          </Badge>
        </footer>
      </div>
    </EvalShell>
  )
}
