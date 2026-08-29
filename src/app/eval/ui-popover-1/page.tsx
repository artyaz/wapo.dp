"use client";

/**
 * EVAL page — popover p1 — farm IoT sensor dashboard — 430x932 dark
 *
 * Phone dashboard for "FieldSense", a farm IoT telemetry app watching the
 * North Block of Willow Creek Farm. The sensor-configuration Popover for
 * soil probe S-217 renders OPEN at initial render (controlled open state +
 * modal={false}, re-asserted after mount) so the static capture shows the
 * anchored settings panel: header, telemetry details, interval/threshold
 * sliders, alert switch and footer actions. The zone filter popover in the
 * Sensors header shows its closed trigger affordance.
 * Other ui/* components: Button, Badge, Progress, Slider, Switch, Alert.
 */

import * as React from "react";
import {
  Bell,
  ChevronDown,
  ClipboardList,
  Droplets,
  House,
  RadioTower,
  Settings2,
  SlidersHorizontal,
  Sprout,
  TriangleAlert,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type SensorStatus = "ok" | "dry" | "offline";

type Sensor = {
  id: string;
  name: string;
  location: string;
  reading: string;
  battery: string;
  status: SensorStatus;
};

const SENSORS: Sensor[] = [
  {
    id: "S-204",
    name: "Soil probe",
    location: "Pivot 1 · row 4",
    reading: "33.2% VWC",
    battery: "BAT 91%",
    status: "ok",
  },
  {
    id: "S-217",
    name: "Soil probe",
    location: "Pivot 3 · row 12",
    reading: "21.8% VWC",
    battery: "BAT 84%",
    status: "dry",
  },
  {
    id: "W-118",
    name: "Weather station",
    location: "Met mast · north fence",
    reading: "18.2°C · 4.1 m/s",
    battery: "SOLAR 100%",
    status: "ok",
  },
  {
    id: "V-03",
    name: "Valve controller",
    location: "Pivot 2 · hydrant 9",
    reading: "— no data",
    battery: "BAT 47%",
    status: "offline",
  },
  {
    id: "EC-291",
    name: "EC / salinity probe",
    location: "Drip line B · block 2",
    reading: "1.9 mS/cm",
    battery: "BAT 76%",
    status: "ok",
  },
];

const ZONES = [
  { label: "All zones", count: 26, active: true },
  { label: "Pivot 1", count: 8, active: false },
  { label: "Pivot 2", count: 7, active: false },
  { label: "Pivot 3", count: 6, active: false },
  { label: "Drip line B", count: 5, active: false },
];

const NAV = [
  { icon: House, label: "Fields", active: false },
  { icon: RadioTower, label: "Sensors", active: true },
  { icon: Droplets, label: "Irrigation", active: false },
  { icon: ClipboardList, label: "Reports", active: false },
];

const KPIS = [
  { label: "Soil moisture", value: "31.4%", note: "avg 0–30 cm · target ≥ 28%" },
  { label: "Soil temp", value: "18.2°C", note: "10 cm · +0.6° since dawn" },
  { label: "Active sensors", value: "24/26", note: "1 offline · 1 in service" },
];

function SensorBadge({ status }: { status: SensorStatus }) {
  if (status === "offline") {
    return <Badge variant="destructive">Offline</Badge>;
  }
  if (status === "dry") {
    return (
      <Badge variant="outline" className="border-warning-500/40 text-warning-500">
        Dry
      </Badge>
    );
  }
  return <Badge variant="secondary">OK</Badge>;
}

export default function Page() {
  // S-217's configuration popover is open at initial render for the static
  // capture; controlled + re-asserted after mount in case anything closes it.
  const [configOpen, setConfigOpen] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setConfigOpen(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* app bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-default-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <Sprout className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">FieldSense</p>
              <p className="font-code text-[10px] text-muted-foreground">
                Willow Creek · North Block
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5 font-code text-[10px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success-500" />
              synced 07:44
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Alerts"
              className="relative"
            >
              <Bell />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 px-4 pt-4">
          {/* page heading — serif reading role */}
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              North Block
            </h1>
            <p className="mt-0.5 font-code text-xs text-muted-foreground">
              Tue 09 Jun · 07:44 · irrigation schedule: auto
            </p>
          </div>

          {/* frost advisory — warning used only where meaning demands it */}
          <Alert className="border-warning-500/30">
            <TriangleAlert className="text-warning-500" />
            <AlertTitle className="text-warning-500">
              Frost advisory tonight
            </AlertTitle>
            <AlertDescription>
              Lows near 1°C between 03:00–06:00. Pivot 3 drip lines are set to
              purge at 02:30.
            </AlertDescription>
          </Alert>

          {/* KPI strip — flat panels, border separation, no shadows */}
          <div className="grid grid-cols-2 gap-3">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-default-border bg-card p-3"
              >
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="mt-0.5 font-code text-xl tabular-nums">
                  {kpi.value}
                </p>
                <p className="mt-0.5 font-code text-[10px] text-muted-foreground">
                  {kpi.note}
                </p>
              </div>
            ))}
            <div className="rounded-lg border border-default-border bg-card p-3">
              <p className="text-xs text-muted-foreground">South tank</p>
              <p className="mt-0.5 font-code text-xl tabular-nums">78%</p>
              <Progress value={78} className="mt-1.5 h-1.5" />
              <p className="mt-1.5 font-code text-[10px] text-muted-foreground">
                6,240 L · 2.1 days at current draw
              </p>
            </div>
          </div>

          {/* sensors */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                Sensors
              </h2>
              {/* closed trigger affordance — zone filter */}
              <Popover>
                <PopoverTrigger
                  render={
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal />
                      Zone · All
                      <ChevronDown />
                    </Button>
                  }
                />
                <PopoverContent align="end" className="w-52 p-2">
                  <PopoverHeader className="px-2 pt-1">
                    <PopoverDescription>Filter by zone</PopoverDescription>
                  </PopoverHeader>
                  <div className="mt-1 grid gap-0.5">
                    {ZONES.map((zone) => (
                      <span
                        key={zone.label}
                        className={
                          zone.active
                            ? "flex items-center justify-between rounded-sm bg-accent px-2 py-1.5 text-sm font-medium text-accent-foreground"
                            : "flex items-center justify-between rounded-sm px-2 py-1.5 text-sm text-muted-foreground"
                        }
                      >
                        {zone.label}
                        <span className="font-code text-[10px]">
                          {zone.count}
                        </span>
                      </span>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              {SENSORS.map((sensor) =>
                // S-217's row hosts the popover that is open at initial
                // render; its row stays highlighted while the panel is open.
                sensor.id === "S-217" ? (
                  <div
                    key={sensor.id}
                    className="flex items-center gap-3 rounded-lg border border-default-border bg-accent/50 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {sensor.name}
                        </p>
                        <SensorBadge status={sensor.status} />
                      </div>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {sensor.id} · {sensor.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-code text-sm tabular-nums">
                        {sensor.reading}
                      </p>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {sensor.battery}
                      </p>
                    </div>
                    <Popover open={configOpen} onOpenChange={setConfigOpen}>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Configure ${sensor.id}`}
                          >
                            <Settings2 />
                          </Button>
                        }
                      />
                      <PopoverContent
                        side="top"
                        align="end"
                        collisionPadding={8}
                        className="w-80"
                      >
                        <PopoverHeader>
                          <PopoverTitle>Soil probe S-217</PopoverTitle>
                          <PopoverDescription>
                            Pivot 3 · row 12 · 0.6 m depth · LoRa channel 12
                          </PopoverDescription>
                        </PopoverHeader>

                        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
                          {[
                            { k: "Battery", v: "84%" },
                            { k: "Signal", v: "−71 dBm" },
                            { k: "Firmware", v: "v2.4.1" },
                            { k: "Last read", v: "07:42" },
                          ].map((row) => (
                            <div key={row.k}>
                              <p className="text-xs text-muted-foreground">
                                {row.k}
                              </p>
                              <p className="font-code text-sm tabular-nums">
                                {row.v}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 border-t border-default-border pt-3">
                          <div className="flex items-baseline justify-between">
                            <p className="text-sm font-medium">
                              Report interval
                            </p>
                            <p className="font-code text-xs tabular-nums text-muted-foreground">
                              15 min
                            </p>
                          </div>
                          <Slider
                            defaultValue={[15]}
                            min={5}
                            max={60}
                            step={5}
                            className="mt-2.5"
                            aria-label="Report interval in minutes"
                          />
                          <div className="mt-4 flex items-baseline justify-between">
                            <p className="text-sm font-medium">Dry threshold</p>
                            <p className="font-code text-xs tabular-nums text-muted-foreground">
                              28% VWC
                            </p>
                          </div>
                          <Slider
                            defaultValue={[28]}
                            min={10}
                            max={40}
                            step={1}
                            className="mt-2.5"
                            aria-label="Dry threshold in percent volumetric water content"
                          />
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium">Push alerts</p>
                              <p className="text-xs text-muted-foreground">
                                Notify on threshold breach
                              </p>
                            </div>
                            <Switch defaultChecked aria-label="Push alerts" />
                          </div>
                        </div>

                        <PopoverFooter className="mt-4">
                          <Button variant="ghost" size="sm">
                            Calibrate
                          </Button>
                          <Button size="sm">Save config</Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <div
                    key={sensor.id}
                    className="flex items-center gap-3 rounded-lg border border-default-border bg-card p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {sensor.name}
                        </p>
                        <SensorBadge status={sensor.status} />
                      </div>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {sensor.id} · {sensor.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-code text-sm tabular-nums">
                        {sensor.reading}
                      </p>
                      <p className="font-code text-[10px] text-muted-foreground">
                        {sensor.battery}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Configure ${sensor.id}`}
                    >
                      <Settings2 />
                    </Button>
                  </div>
                )
              )}
            </div>
          </section>
        </main>

        {/* bottom tab bar — in-flow surface: flat panel + hairline, no glass */}
        <nav className="mt-auto flex flex-none items-stretch justify-around border-t border-default-border bg-card px-2 py-2">
          {NAV.map((item) => (
            <span
              key={item.label}
              className={
                item.active
                  ? "flex flex-col items-center gap-1 rounded-sm px-3 py-1 text-[10px] font-medium text-foreground"
                  : "flex flex-col items-center gap-1 rounded-sm px-3 py-1 text-[10px] text-muted-foreground"
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </span>
          ))}
        </nav>
      </div>
    </EvalShell>
  );
}
