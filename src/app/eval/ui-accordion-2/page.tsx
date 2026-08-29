"use client";

// EVAL page — accordion p2 — plant care reminder app — 1920x1080 light
// Showcases: Accordion (hero) + Card, Badge, Button, Table, Switch, Avatar

import {
  ActivityIcon,
  BellIcon,
  CheckIcon,
  DropletsIcon,
  LeafIcon,
  PlusIcon,
  RefreshCwIcon,
  SettingsIcon,
  SprayCanIcon,
  SproutIcon,
  SunIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const nav = [
  { label: "Today", icon: SunIcon, active: true },
  { label: "Plants", icon: LeafIcon, active: false },
  { label: "Watering", icon: DropletsIcon, active: false },
  { label: "Reminders", icon: BellIcon, active: false },
  { label: "Insights", icon: ActivityIcon, active: false },
  { label: "Settings", icon: SettingsIcon, active: false },
];

const stats = [
  { label: "Due today", value: "6 tasks" },
  { label: "Overdue", value: "2 tasks", alert: true },
  { label: "Completed this week", value: "18 tasks" },
  { label: "Watering streak", value: "12 days" },
];

const plants = [
  {
    id: "fig",
    name: "Fiddle-leaf fig",
    latin: "Ficus lyrata",
    room: "Living room",
    moisture: "24%",
    lastWatered: "MAR 08",
    tasks: [
      {
        icon: DropletsIcon,
        label: "Water 500 ml",
        meta: "1 day overdue",
        danger: true,
      },
      {
        icon: RefreshCwIcon,
        label: "Rotate a quarter turn",
        meta: "every 2 weeks",
        danger: false,
      },
      {
        icon: SprayCanIcon,
        label: "Mist leaves",
        meta: "humidity 38%",
        danger: false,
      },
    ],
  },
  {
    id: "monstera",
    name: "Monstera deliciosa",
    latin: "Monstera deliciosa",
    room: "Study",
    moisture: "31%",
    lastWatered: "MAR 10",
    tasks: [
      {
        icon: DropletsIcon,
        label: "Water 350 ml",
        meta: "due today",
        danger: false,
      },
      {
        icon: LeafIcon,
        label: "Wipe leaves",
        meta: "dust check",
        danger: false,
      },
    ],
  },
];

const upcoming = [
  { id: "snake", name: "Snake plant", meta: "Next · water · MAR 17" },
  { id: "lily", name: "Peace lily", meta: "Next · water · MAR 15" },
  { id: "pothos", name: "Golden pothos", meta: "Next · fertilize · MAR 21" },
];

const week = [
  { day: "Mon 16", plant: "Peace lily", task: "Water", time: "08:00" },
  { day: "Tue 17", plant: "Snake plant", task: "Water", time: "08:00" },
  { day: "Wed 18", plant: "Fiddle-leaf fig", task: "Fertilize", time: "09:00" },
  { day: "Thu 19", plant: "Herb garden", task: "Harvest", time: "17:30" },
  { day: "Fri 20", plant: "Bird's nest fern", task: "Mist", time: "08:00" },
  { day: "Sat 21", plant: "Golden pothos", task: "Fertilize", time: "10:00" },
];

const reminders = [
  { label: "Morning push", meta: "08:00 · all plants", checked: true },
  { label: "Overdue alerts", meta: "re-notify after 24 h", checked: true },
  { label: "Weekly email digest", meta: "Sundays 18:00", checked: false },
  { label: "Weekend quiet hours", meta: "no alerts before 10:00", checked: true },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="bg-background text-foreground flex h-screen overflow-hidden">
        {/* Sidebar */}
        <nav className="bg-card flex w-[248px] shrink-0 flex-col border-r px-4 py-5">
          <div className="flex items-center gap-2.5 px-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <SproutIcon className="size-4" />
            </div>
            <span className="text-heading-3 font-heading-3 font-semibold">
              Verdant
            </span>
          </div>

          <ul className="mt-6 flex flex-col gap-0.5">
            {nav.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${
                    item.active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                  {item.label === "Reminders" ? (
                    <Badge variant="secondary" className="ml-auto">
                      2
                    </Badge>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2.5 border-t px-2 pt-4">
            <Avatar>
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Maya Okonkwo</p>
              <p className="text-muted-foreground truncate text-xs">
                14 plants · Free plan
              </p>
            </div>
          </div>
        </nav>

        {/* Center — today's tasks */}
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto px-10 py-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/60 font-code text-code">
                SATURDAY · MAR 14, 2026
              </p>
              <h1 className="text-heading-1 font-heading-1 mt-1">
                Today in your garden
              </h1>
            </div>
            <div className="flex items-center gap-2.5">
              <Button variant="ghost" size="sm">
                Skip day
              </Button>
              <Button size="sm">
                <PlusIcon />
                Add reminder
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="gap-1.5 rounded-lg py-4">
                <CardContent className="px-4">
                  <p className="text-muted-foreground text-xs">
                    {stat.label}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 font-semibold">
                      {stat.value}
                    </span>
                    {stat.alert ? (
                      <Badge variant="destructive">action needed</Badge>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-heading-2 font-heading-2 mt-8">
            Care tasks by plant
          </h2>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Tap a plant to see today&apos;s tasks and soil readings.
          </p>

          <Accordion
            multiple
            defaultValue={["fig", "monstera"]}
            className="mt-4 overflow-hidden rounded-lg border"
          >
            {plants.map((plant) => (
              <AccordionItem key={plant.id} value={plant.id} className="px-5">
                <AccordionTrigger>
                  <span className="flex flex-1 items-center justify-between gap-4 pr-4">
                    <span className="flex items-baseline gap-2.5">
                      {plant.name}
                      <span className="text-muted-foreground text-xs italic">
                        {plant.latin}
                      </span>
                    </span>
                    <span className="flex items-center gap-2.5">
                      <Badge variant="outline">{plant.room}</Badge>
                      <span className="text-foreground/60 font-code text-code">
                        H₂O {plant.moisture}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 pb-0.5">
                    <ul className="flex flex-col gap-1.5">
                      {plant.tasks.map((task) => (
                        <li
                          key={task.label}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span className="flex items-center gap-2.5">
                            <task.icon className="text-muted-foreground size-4 shrink-0" />
                            {task.label}
                          </span>
                          <span
                            className={`font-code text-code ${
                              task.danger ? "text-destructive" : "text-foreground/60"
                            }`}
                          >
                            {task.meta}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-foreground/60 flex items-center justify-between border-t pt-2.5 font-code text-code">
                      <span>LAST WATERED {plant.lastWatered}</span>
                      <span className="flex items-center gap-1.5">
                        <CheckIcon className="size-3" />
                        LOG TO HISTORY
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {upcoming.map((plant) => (
              <AccordionItem key={plant.id} value={plant.id} className="px-5">
                <AccordionTrigger>
                  <span className="flex flex-1 items-center justify-between gap-4 pr-4">
                    <span className="flex items-baseline gap-2.5">{plant.name}</span>
                    <span className="text-foreground/60 font-code text-code">
                      {plant.meta}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm">
                    No tasks due today — this plant is on its normal schedule.
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
            <SprayCanIcon className="size-4" />
            Rain forecast for Sunday — outdoor planter watering is paused
            automatically.
          </p>
        </main>

        {/* Right rail — schedule + reminders */}
        <aside className="flex w-[420px] shrink-0 flex-col gap-5 overflow-y-auto border-l px-6 py-8">
          <Card className="gap-3 rounded-lg py-5">
            <CardHeader>
              <CardTitle className="text-heading-3 font-heading-3">
                This week
              </CardTitle>
              <CardDescription className="text-sm">
                6 tasks scheduled · 2 hands-on
              </CardDescription>
              <CardAction>
                <Badge variant="secondary">week 12</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-8 pl-0 text-xs">Day</TableHead>
                    <TableHead className="h-8 text-xs">Plant</TableHead>
                    <TableHead className="h-8 text-xs">Task</TableHead>
                    <TableHead className="h-8 text-right text-xs">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {week.map((row) => (
                    <TableRow key={row.day}>
                      <TableCell className="py-2.5 pl-0 pr-3 font-code text-code">
                        {row.day}
                      </TableCell>
                      <TableCell className="py-2.5 pr-3 text-sm whitespace-normal">
                        {row.plant}
                      </TableCell>
                      <TableCell className="py-2.5 pr-3 text-sm">
                        {row.task}
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        {row.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="gap-3 rounded-lg py-5">
            <CardHeader>
              <CardTitle className="text-heading-3 font-heading-3">
                Reminder settings
              </CardTitle>
              <CardDescription className="text-sm">
                When Verdant should nudge you
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              {reminders.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between gap-4 py-3 ${
                    i > 0 ? "border-t" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-foreground/60 font-code text-code">
                      {item.meta}
                    </p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </EvalShell>
  );
}
