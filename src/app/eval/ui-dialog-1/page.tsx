"use client"
// EVAL page — dialog p1 — smart home control panel — 430x932 light (phone)

import {
  AirVentIcon,
  BlindsIcon,
  HouseIcon,
  LampIcon,
  LockIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  ThermometerIcon,
  TreesIcon,
  WifiIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const scenes = [
  { icon: SunIcon, label: "Morning", meta: "6:30 AM", active: true },
  { icon: TreesIcon, label: "Away", meta: "Arm sensors" },
  { icon: LampIcon, label: "Evening", meta: "Lamps on" },
  { icon: MoonIcon, label: "Night", meta: "11:00 PM" },
]

const devices = [
  {
    icon: LampIcon,
    name: "Living room lights",
    meta: "On · 80% brightness",
    checked: true,
  },
  {
    icon: AirVentIcon,
    name: "Thermostat",
    meta: "Cooling to 70°F",
    checked: true,
  },
  {
    icon: LockIcon,
    name: "Front door",
    meta: "Locked · 8:12 AM",
    checked: true,
  },
  {
    icon: BlindsIcon,
    name: "Kitchen blinds",
    meta: "Open · 50%",
    checked: false,
  },
]

const days = ["M", "T", "W", "T", "F", "S", "S"]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      {/* Single Dialog root: the "Add a schedule" card button is the trigger;
          the dialog is open on first paint for the static capture. */}
      <Dialog defaultOpen>
        <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col gap-4 bg-background p-4 pb-6 text-foreground">
          {/* App bar */}
          <header className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HouseIcon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading-3 truncate text-base leading-tight font-semibold">
                Maple Grove House
              </h1>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <WifiIcon className="size-3" /> Hub online · 3 people home
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Home settings"
              className="text-muted-foreground"
            >
              <SettingsIcon />
            </Button>
          </header>

          {/* Climate card */}
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-1.5 text-sm">
                    <ThermometerIcon className="size-4 text-muted-foreground" />
                    Indoor climate
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Living room sensor · updated 2 min ago
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-code text-[11px]">
                  COOL
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5">
              <div className="flex items-end justify-between">
                <p className="font-heading-1 text-5xl leading-none font-semibold">
                  72°
                </p>
                <p className="text-xs text-muted-foreground">
                  Outside 64° · humidity 41%
                  <br />
                  Cooling to 70° until 4:00 PM
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Today&apos;s runtime
                </span>
                <span className="font-code">3 h 12 m of 6 h budget</span>
              </div>
            </CardContent>
          </Card>

          {/* Scenes */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Scenes
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {scenes.map((scene) => (
                <button
                  key={scene.label}
                  type="button"
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-start transition-colors ${
                    scene.active
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <scene.icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{scene.label}</span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {scene.meta}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Devices */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Devices
            </h2>
            <Card className="gap-0 py-0">
              {devices.map((device, i) => (
                <div key={device.name}>
                  {i > 0 ? <Separator /> : null}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <device.icon className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {device.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {device.meta}
                      </p>
                    </div>
                    <Switch checked={device.checked} aria-label={device.name} />
                  </div>
                </div>
              ))}
            </Card>
          </section>

          {/* Schedule trigger card */}
          <DialogTrigger
            render={
              <Button variant="outline" className="w-full justify-between" />
            }
          >
            <span className="flex items-center gap-2">
              <SunIcon className="size-4 text-muted-foreground" />
              Add a schedule
            </span>
            <span className="text-xs text-muted-foreground">2 active</span>
          </DialogTrigger>

          {/* Footer */}
          <footer className="mt-auto flex items-center justify-between border-t pt-3">
            <p className="font-code text-[11px] text-muted-foreground">
              Energy today · 8.4 kWh · −12% vs last Tue
            </p>
            <Badge variant="secondary" className="text-[11px]">
              All systems normal
            </Badge>
          </footer>
        </div>

        {/* Dialog — new schedule form, open at initial render */}
        <DialogContent className="top-auto bottom-4 max-w-[calc(100%-2rem)] translate-y-0 rounded-lg p-5 pb-4">
          <form className="flex flex-col gap-4">
            <DialogHeader className="text-start">
              <DialogTitle className="text-base">New schedule</DialogTitle>
              <DialogDescription className="text-xs">
                Run a scene automatically on set days and times.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <Label htmlFor="schedule-name" className="text-xs">
                Schedule name
              </Label>
              <Input
                id="schedule-name"
                defaultValue="Weekday wind-down"
                className="text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="start-at" className="text-xs">
                Starts at
              </Label>
              <Select defaultValue="21:30">
                <SelectTrigger
                  id="start-at"
                  size="sm"
                  className="w-full font-code"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20:30">8:30 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                  <SelectItem value="21:30">9:30 PM</SelectItem>
                  <SelectItem value="22:00">10:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs">Repeat</Label>
              <div className="flex items-center gap-1.5">
                {days.map((day, i) => (
                  <Label
                    key={i}
                    className="size-8 cursor-pointer justify-center rounded-sm border text-xs font-normal text-muted-foreground has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground"
                  >
                    <Checkbox
                      defaultChecked={i < 5}
                      aria-label={`Repeat on day ${i + 1}`}
                      className="sr-only"
                    />
                    {day}
                  </Label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs">Devices in this schedule</Label>
              <div className="flex flex-col gap-1 rounded-lg border p-1">
                {[
                  { name: "Dim lamps to 20%", on: true },
                  { name: "Set thermostat to 68°", on: true },
                  { name: "Lock all doors", on: false },
                ].map((item, i) => (
                  <div key={item.name}>
                    {i > 0 ? <Separator className="mx-3" /> : null}
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm">{item.name}</span>
                      <Switch checked={item.on} aria-label={item.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="flex-row justify-end gap-2 sm:justify-end">
              <DialogClose
                render={<Button variant="outline" size="sm" type="button" />}
              >
                Cancel
              </DialogClose>
              <Button size="sm" type="submit">
                Create schedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </EvalShell>
  )
}
