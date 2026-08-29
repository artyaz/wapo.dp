"use client"
// EVAL page — kbd p1 — plant care reminder app — 834x1112 light
// "Fernworth" tablet care console: search "/" hint, per-task key hints
// (W/M/F), open "More" menu with shortcut items, and a shortcut cheat-sheet
// panel. Co-stars: Card, Badge, Button, Progress, Separator, Avatar,
// InputGroup, DropdownMenu. Flat panels + hairlines; no shadows in flow.

import {
  CheckIcon,
  ChevronDownIcon,
  DropletsIcon,
  LeafIcon,
  ListFilterIcon,
  SearchIcon,
  SettingsIcon,
  SprayCanIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const tasks = [
  {
    initials: "MO",
    name: "Monstera deliciosa",
    room: "Living room · shelf",
    care: "Water",
    time: "8:00",
    key: "W",
    icon: DropletsIcon,
    overdue: true,
    done: false,
  },
  {
    initials: "FL",
    name: "Fiddle-leaf fig",
    room: "Bedroom · east window",
    care: "Mist",
    time: "9:30",
    key: "M",
    icon: SprayCanIcon,
    overdue: false,
    done: false,
  },
  {
    initials: "SN",
    name: "Snake plant",
    room: "Hallway",
    care: "Water",
    time: "11:00",
    key: "W",
    icon: DropletsIcon,
    overdue: false,
    done: true,
  },
  {
    initials: "BA",
    name: "Genovese basil",
    room: "Kitchen · sill",
    care: "Water",
    time: "12:30",
    key: "W",
    icon: DropletsIcon,
    overdue: false,
    done: false,
  },
  {
    initials: "PL",
    name: "Peace lily",
    room: "Bathroom",
    care: "Fertilize",
    time: "14:00",
    key: "F",
    icon: LeafIcon,
    overdue: false,
    done: false,
  },
]

const moisture = [
  { initials: "MO", name: "Monstera", value: 38, note: "watered 6 days ago" },
  { initials: "FL", name: "Fiddle-leaf fig", value: 71, note: "watered 2 days ago" },
]

const shortcuts = [
  { action: "Open search", keys: ["⌘", "K"] },
  { action: "Search plant list", keys: ["/"] },
  { action: "Water selected", keys: ["W"] },
  { action: "Mist selected", keys: ["M"] },
  { action: "Fertilize selected", keys: ["F"] },
  { action: "Snooze for a day", keys: ["S"] },
  { action: "Show this panel", keys: ["?"] },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[790px] flex-col gap-4 px-5 py-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-caption text-caption text-muted-foreground">
              Fernworth · Balcony &amp; indoor garden · 14 plants
            </p>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Today&apos;s care
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Care settings"
          >
            <SettingsIcon />
          </Button>
        </header>

        {/* Toolbar: search + quick actions */}
        <div className="flex items-center gap-2.5">
          <InputGroup className="h-9 w-56">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Find a plant…"
              aria-label="Find a plant"
            />
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <Button size="sm">
            Water all due
            <Kbd data-icon="inline-end" className="translate-y-px">
              W
            </Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Snooze
            <Kbd data-icon="inline-end" className="translate-y-px">
              S
            </Kbd>
          </Button>
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm">
                  More
                  <ChevronDownIcon />
                </Button>
              }
            />
            <DropdownMenuContent align="end" sideOffset={6}>
              <DropdownMenuLabel>Schedule actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <ListFilterIcon />
                Group by room
                <span className="ms-auto">
                  <Kbd>G</Kbd>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropletsIcon />
                Run watering history
                <span className="ms-auto">
                  <Kbd>H</Kbd>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LeafIcon />
                Export schedule (.ics)
                <span className="ms-auto">
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>E</Kbd>
                  </KbdGroup>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                Skip a watering day
                <span className="ms-auto">
                  <Kbd>⌫</Kbd>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main grid: care queue + side rail */}
        <div className="grid flex-1 grid-cols-12 gap-4">
          {/* Care queue */}
          <Card className="col-span-7 gap-0 self-start py-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Saturday, March 15
                </p>
                <p className="font-caption text-caption text-muted-foreground">
                  5 tasks due · 1 overdue
                </p>
              </div>
              <Badge variant="outline" className="text-warning-700">
                1 overdue
              </Badge>
            </div>
            <ul className="divide-y">
              {tasks.map((t) => (
                <li
                  key={t.name}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    t.done ? "opacity-55" : ""
                  }`}
                >
                  <Avatar size="default">
                    <AvatarFallback className="font-code text-[11px] font-semibold">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="font-caption text-caption text-muted-foreground">
                      {t.room}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-24 justify-center gap-1"
                  >
                    <t.icon className="size-3" />
                    {t.care}
                  </Badge>
                  <span className="w-12 text-right font-code text-xs text-muted-foreground">
                    {t.time}
                  </span>
                  <span className="flex w-8 justify-center">
                    {t.done ? (
                      <CheckIcon
                        className="size-3.5 text-muted-foreground"
                        aria-label="Done"
                      />
                    ) : (
                      <Kbd
                        aria-label={`${t.care} ${t.name}`}
                        className={
                          t.overdue ? "border-warning-300 text-warning-700" : ""
                        }
                      >
                        {t.key}
                      </Kbd>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Side rail */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* Soil moisture */}
            <Card className="gap-0 py-0">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-sm">Soil moisture</CardTitle>
                <CardDescription className="font-caption text-caption">
                  Sensors · synced 6:40
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5 px-4 pb-4">
                {moisture.map((m) => (
                  <div key={m.name} className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-foreground">{m.name}</span>
                      <span className="font-code text-xs text-muted-foreground">
                        {m.value}%
                      </span>
                    </div>
                    <Progress
                      value={m.value}
                      aria-label={`${m.name} soil moisture ${m.value} percent`}
                    />
                    <span className="font-caption text-[11px] text-muted-foreground">
                      {m.note}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shortcut cheat-sheet — the Kbd showcase */}
            <Card className="gap-0 py-0">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-sm">Keyboard shortcuts</CardTitle>
                <CardDescription className="font-caption text-caption">
                  Works on every screen · hold{" "}
                  <Kbd className="mx-0.5 inline-flex h-4 align-middle px-1 text-[10px]">
                    ⇧
                  </Kbd>{" "}
                  to reveal hints
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ul className="flex flex-col">
                  {shortcuts.map((s) => (
                    <li
                      key={s.action}
                      className="flex items-center justify-between border-b py-1.5 last:border-b-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {s.action}
                      </span>
                      <KbdGroup>
                        {s.keys.map((k) => (
                          <Kbd key={k}>{k}</Kbd>
                        ))}
                      </KbdGroup>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <footer className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success-500" />
            3 sensors online · synced 2 min ago
          </span>
          <span className="inline-flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
            Press
            <Kbd>?</Kbd>
            for all shortcuts
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
