"use client";

/**
 * EVAL page — navigation-menu p2 — smart home control panel —
 * 1180x820 light desktop.
 * Hero: NavigationMenu (product nav with an open mega-menu panel of room
 * links, active link + indicator). Supporting: Card, Badge, Button,
 * Switch, Slider, Progress.
 */

import {
  BedDoubleIcon,
  BriefcaseIcon,
  CarIcon,
  ChefHatIcon,
  Flower2Icon,
  LampIcon,
  LockIcon,
  PlusIcon,
  SearchIcon,
  SofaIcon,
  ThermometerIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const rooms = [
  {
    icon: SofaIcon,
    name: "Living room",
    meta: "8 devices · 21.5°C",
    active: true,
  },
  { icon: ChefHatIcon, name: "Kitchen", meta: "6 devices · 20.0°C", active: false },
  {
    icon: BedDoubleIcon,
    name: "Master bedroom",
    meta: "5 devices · 19.5°C",
    active: false,
  },
  { icon: BriefcaseIcon, name: "Office", meta: "4 devices · 21.0°C", active: false },
  { icon: CarIcon, name: "Garage", meta: "3 devices · 12.4°C", active: false },
  { icon: Flower2Icon, name: "Garden", meta: "2 devices · outdoor", active: false },
];

const lights = [
  { name: "Kitchen island", state: "On · 100%", on: true, level: 100 },
  { name: "Living room floor lamp", state: "On · 40%", on: true, level: 40 },
  { name: "Porch", state: "Dusk schedule · 17:52", on: false, level: 0 },
  { name: "Master bedroom", state: "Off", on: false, level: 0 },
];

const energy = [
  { label: "HVAC", value: "6.1 kWh", pct: 49 },
  { label: "EV charger", value: "4.0 kWh", pct: 32 },
  { label: "Lights", value: "2.3 kWh", pct: 19 },
];

const security = [
  { name: "Front door", status: "Locked", tone: "secondary" as const },
  { name: "Back door", status: "Locked", tone: "secondary" as const },
  { name: "Garage door", status: "Open 12 min", tone: "warning" as const },
  { name: "Hallway motion", status: "Clear", tone: "secondary" as const },
];

const activity = [
  { time: "17:42", text: "Living room lamp dimmed to 40% · Jordan's phone" },
  { time: "17:05", text: "EV charger reached 80% · charging stopped" },
  { time: "16:58", text: "“Good evening” scene armed · 9 devices" },
  { time: "16:31", text: "Kitchen leak sensor heartbeat · dry" },
  { time: "15:12", text: "Garage door left open · auto-close triggered" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* Header with product nav — mega panel open at initial render */}
        <header className="flex items-center gap-6 border-b px-6 py-3">
          <div className="shrink-0">
            <p className="font-heading-2 text-lg font-semibold leading-tight">
              Haven
            </p>
            <p className="font-code text-[10px] uppercase tracking-wide text-muted-foreground">
              124 Alameda Rd
            </p>
          </div>
          <NavigationMenu defaultValue="rooms" className="flex-1">
            <NavigationMenuList>
              <NavigationMenuItem value="rooms">
                <NavigationMenuTrigger>Rooms</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[440px] grid-cols-2 gap-1">
                    {rooms.map((room) => (
                      <li key={room.name}>
                        <NavigationMenuLink
                          href="#"
                          active={room.active}
                          className="flex-row items-center gap-3"
                        >
                          <room.icon
                            className="size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span className="flex min-w-0 flex-col gap-0.5">
                            <span className="truncate text-sm font-medium">
                              {room.name}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {room.meta}
                            </span>
                          </span>
                          {room.active ? (
                            <span className="ms-auto font-code text-[10px] text-muted-foreground">
                              now
                            </span>
                          ) : null}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1 flex items-center justify-between border-t px-2 pt-2">
                    <span className="text-xs text-muted-foreground">
                      28 devices across 6 rooms
                    </span>
                    <Button variant="ghost" size="xs" className="h-6 text-xs">
                      <PlusIcon aria-hidden="true" />
                      Add room
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="automations">
                <NavigationMenuTrigger>Automations</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem value="energy">
                <NavigationMenuTrigger>Energy</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem value="security">
                <NavigationMenuTrigger>Security</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuIndicator />
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm">
              <SearchIcon aria-hidden="true" />
              Find device
            </Button>
            <Button size="sm">
              <PlusIcon aria-hidden="true" />
              Pair device
            </Button>
          </div>
        </header>

        {/* Dashboard */}
        <main className="grid flex-1 gap-4 p-4 lg:grid-cols-3">
          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <ThermometerIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                Climate · Living room
              </CardTitle>
              <CardDescription className="text-xs">
                Heating to 22.0° · reaches in ~14 min
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex items-baseline justify-between">
                <p className="font-code text-4xl font-medium tracking-tight">
                  21.5°
                </p>
                <Badge variant="secondary">Eco after 23:00</Badge>
              </div>
              <div className="grid gap-2">
                <Slider
                  defaultValue={[22]}
                  min={16}
                  max={28}
                  step={0.5}
                  aria-label="Target temperature"
                />
                <div className="flex justify-between font-code text-[10px] text-muted-foreground">
                  <span>16.0°</span>
                  <span>target 22.0°</span>
                  <span>28.0°</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t pt-2.5 text-center">
                <div>
                  <p className="font-code text-sm">41%</p>
                  <p className="text-[10px] text-muted-foreground">humidity</p>
                </div>
                <div>
                  <p className="font-code text-sm">20.4°</p>
                  <p className="text-[10px] text-muted-foreground">outside</p>
                </div>
                <div>
                  <p className="font-code text-sm">38 min</p>
                  <p className="text-[10px] text-muted-foreground">runtime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <LampIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                Lights
              </CardTitle>
              <CardDescription className="text-xs">
                2 of 14 on · 214 W
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              {lights.map((light) => (
                <div
                  key={light.name}
                  className="flex items-center gap-3 rounded-md px-1 py-1.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{light.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {light.state}
                    </p>
                    {light.on ? (
                      <Progress value={light.level} className="mt-1 h-1" />
                    ) : null}
                  </div>
                  <Switch
                    defaultChecked={light.on}
                    aria-label={`${light.name} power`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="text-sm">Energy</CardTitle>
              <CardDescription className="text-xs">
                Today · 12.4 kWh · $1.86
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {energy.map((row) => (
                <div key={row.label} className="grid gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">{row.label}</span>
                    <span className="font-code text-xs text-muted-foreground">
                      {row.value}
                    </span>
                  </div>
                  <Progress value={row.pct} className="h-1.5" />
                </div>
              ))}
              <p className="border-t pt-2.5 text-xs text-muted-foreground">
                Peak window 18:00–21:00 · solar offset 3.1 kWh
              </p>
            </CardContent>
          </Card>

          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <LockIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                Security
              </CardTitle>
              <CardDescription className="text-xs">
                Front point · 12 devices
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium">System</span>
                <Badge>Armed · Away</Badge>
              </div>
              {security.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm">{item.name}</span>
                  <Badge
                    variant={item.tone === "warning" ? "outline" : "secondary"}
                    className={
                      item.tone === "warning"
                        ? "border-warning-300 text-warning-600"
                        : undefined
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-1 w-full">
                View cameras
              </Button>
            </CardContent>
          </Card>

          <Card className="gap-3 py-4 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Recent activity</CardTitle>
              <CardDescription className="text-xs">
                Hub events · last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-0">
              {activity.map((event) => (
                <div
                  key={event.time}
                  className="flex items-center gap-4 border-b py-1.5 last:border-b-0"
                >
                  <span className="w-10 shrink-0 font-code text-xs text-muted-foreground">
                    {event.time}
                  </span>
                  <span className="text-sm">{event.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>

        <footer className="flex items-center justify-between border-t px-6 py-2.5">
          <span className="font-code text-[10px] text-muted-foreground">
            hub online · fw 3.8.2 · 28 devices · last sync 2 min ago
          </span>
          <span className="font-code text-[10px] text-muted-foreground">
            next automation: evening scene 17:52
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
