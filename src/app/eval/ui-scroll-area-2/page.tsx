"use client";

/**
 * EVAL page — scroll-area p2 — plant care reminder app — 1180x820 dark (desktop)
 *
 * "Verdant" household plant-care console. Three bounded ScrollAreas with
 * type="always" so the styled monochrome thumbs render in the static capture:
 * the horizontal due-today care strip, the week's reminder list (center), and
 * the care-journal history pane (right, chat-style).
 * Other ui/* components: Card, Badge, Avatar, Button, Progress, Label, Switch.
 */

import {
  CalendarDays,
  Check,
  CloudDrizzle,
  Droplets,
  FlaskConical,
  House,
  Leaf,
  NotebookPen,
  PenLine,
  Plus,
  Settings,
  Shovel,
  Sprout,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const TASK_STYLE = {
  Water: { icon: Droplets, badge: "outline" as const },
  Mist: { icon: CloudDrizzle, badge: "outline" as const },
  Fertilize: { icon: FlaskConical, badge: "secondary" as const },
  Repot: { icon: Shovel, badge: "secondary" as const },
};

type Task = keyof typeof TASK_STYLE;

const DUE_TODAY: {
  name: string;
  latin: string;
  task: Task;
  moisture: number;
  due: string;
  done?: boolean;
}[] = [
  { name: "Monstera deliciosa", latin: "MON-Del", task: "Water", moisture: 38, due: "09:00" },
  { name: "Peace lily", latin: "SPE-Dom", task: "Water", moisture: 31, due: "09:30", done: true },
  { name: "Calathea orbifolia", latin: "CAL-Orb", task: "Mist", moisture: 52, due: "10:30" },
  { name: "Fiddle-leaf fig", latin: "FIC-Lyr", task: "Water", moisture: 24, due: "12:00" },
  { name: "Bird's nest fern", latin: "ASPL-Nid", task: "Mist", moisture: 58, due: "11:00" },
  { name: "Snake plant", latin: "DRU-Trif", task: "Water", moisture: 61, due: "17:00" },
  { name: "String of pearls", latin: "CUR-Row", task: "Fertilize", moisture: 70, due: "18:00" },
  { name: "Aloe vera", latin: "ALO-Vera", task: "Repot", moisture: 44, due: "Sat 14:00" },
];

const WEEK: { day: string; items: { name: string; task: Task; time: string; done?: boolean }[] }[] = [
  {
    day: "Today · Sat 28 Feb",
    items: [
      { name: "Monstera deliciosa", task: "Water", time: "09:00", done: true },
      { name: "Peace lily", task: "Water", time: "09:30", done: true },
      { name: "Calathea orbifolia", task: "Mist", time: "10:30" },
      { name: "Fiddle-leaf fig", task: "Water", time: "12:00" },
      { name: "Snake plant", task: "Water", time: "17:00" },
    ],
  },
  {
    day: "Tomorrow · Sun 01 Mar",
    items: [
      { name: "ZZ plant", task: "Water", time: "09:00" },
      { name: "Rubber plant", task: "Fertilize", time: "10:00" },
    ],
  },
  {
    day: "Mon 02 Mar",
    items: [
      { name: "Philodendron 'Brasil'", task: "Mist", time: "08:30" },
      { name: "Parlor palm", task: "Water", time: "09:00" },
      { name: "Jade plant", task: "Water", time: "17:30" },
    ],
  },
  {
    day: "Tue 03 Mar",
    items: [
      { name: "Pothos 'Golden'", task: "Fertilize", time: "10:00" },
      { name: "Bird's nest fern", task: "Mist", time: "11:00" },
    ],
  },
  {
    day: "Wed 04 Mar",
    items: [
      { name: "Aloe vera", task: "Repot", time: "14:00" },
      { name: "Snake plant", task: "Water", time: "17:00" },
    ],
  },
];

const JOURNAL: { who: string; initials: string; when: string; note: string }[] = [
  {
    who: "Maya Chen",
    initials: "MC",
    when: "Today 08:12",
    note: "Watered the monstera and misted the calathea. Moved both a foot away from the drafty window.",
  },
  {
    who: "Jonas Weber",
    initials: "JW",
    when: "Today 07:48",
    note: "The fiddle-leaf dropped another leaf. I think it's the radiator — switching it to daily misting.",
  },
  {
    who: "Priya Nair",
    initials: "PN",
    when: "Fri 19:30",
    note: "Repotted the string of pearls into the wide terracotta pot. The soil drains much faster now.",
  },
  {
    who: "Sam Ortiz",
    initials: "SO",
    when: "Fri 16:05",
    note: "Mealybugs are back on the rubber plant. Picked up neem oil, treating tonight after sundown.",
  },
  {
    who: "Maya Chen",
    initials: "MC",
    when: "Thu 07:15",
    note: "Peace lily perked up after bottom-watering. New leaf unfurling — third one this month.",
  },
  {
    who: "Jonas Weber",
    initials: "JW",
    when: "Thu 18:40",
    note: "Refilled the humidifier. Living room is holding at 48% now, the ferns look happier.",
  },
  {
    who: "Priya Nair",
    initials: "PN",
    when: "Wed 09:05",
    note: "Separated the aloe pups — three new pots on the south sill for the neighbours to adopt.",
  },
  {
    who: "Maya Chen",
    initials: "MC",
    when: "Wed 15:22",
    note: "Calathea was curling again by afternoon. Rotated it a quarter turn away from the window.",
  },
  {
    who: "Sam Ortiz",
    initials: "SO",
    when: "Tue 11:47",
    note: "Ordered two moss poles for the big monsteras — arriving Monday with the worm castings.",
  },
  {
    who: "Priya Nair",
    initials: "PN",
    when: "Mon 08:00",
    note: "Weekly check: 12 plants, all alive. Rebalanced the watering schedule for the longer days.",
  },
];

const NAV = [
  { icon: House, label: "Today", active: true },
  { icon: Sprout, label: "Plants", active: false },
  { icon: CalendarDays, label: "Schedule", active: false },
  { icon: NotebookPen, label: "Journal", active: false },
  { icon: Settings, label: "Settings", active: false },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* sidebar */}
        <aside className="flex w-60 flex-none flex-col gap-4 border-r border-default-border bg-card px-3 py-4">
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-background">
              <Leaf className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Verdant</p>
              <p className="font-code text-[10px] text-muted-foreground">
                Plant care · Home
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-0.5" aria-label="Main">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-sm bg-accent px-2.5 py-2 text-sm font-medium text-foreground"
                    : "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-muted-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}
          </nav>

          <Card className="mt-auto gap-0 py-3">
            <div className="px-3">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">Garden health</p>
                <p className="font-code text-xs tabular-nums">82%</p>
              </div>
              <Progress value={82} className="mt-2 h-1.5" aria-label="Garden health" />
              <p className="mt-2 font-code text-[10px] text-muted-foreground">
                9 of 12 watered this week
              </p>
            </div>
          </Card>

          <div className="flex items-center justify-between px-2">
            <AvatarGroup>
              <Avatar>
                <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">MC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">JW</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">PN</AvatarFallback>
              </Avatar>
              <AvatarGroupCount className="font-code text-[10px] dark:text-neutral-300">
                4
              </AvatarGroupCount>
            </AvatarGroup>
            <span className="font-code text-[10px] text-muted-foreground">
              household
            </span>
          </div>
        </aside>

        {/* center column */}
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 flex-none items-center justify-between border-b border-default-border px-6">
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Today
              </h1>
              <p className="font-code text-[10px] text-muted-foreground">
                Sat 28 Feb · 4 care tasks · 2 done
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus /> Add plant
              </Button>
              <Button size="sm">Mark all done</Button>
            </div>
          </header>

          {/* due-today strip — horizontal ScrollArea */}
          <section className="flex-none pt-4" aria-label="Due today">
            <div className="flex items-baseline justify-between px-6 pb-2">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                Due today
              </h2>
              <span className="font-code text-[10px] text-muted-foreground">
                scroll for more →
              </span>
            </div>
            <ScrollArea type="always" className="mx-6">
              <div className="flex w-max gap-3 pt-1 pb-5">
                {DUE_TODAY.map((plant) => {
                  const style = TASK_STYLE[plant.task];
                  const TaskIcon = style.icon;
                  return (
                    <Card key={plant.name} className="w-52 gap-0 py-3">
                      <div className="flex items-center gap-2.5 px-3">
                        <Avatar size="sm">
                          <AvatarFallback className="text-foreground dark:text-neutral-300">
                            <Sprout className="size-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 leading-tight">
                          <p className="truncate text-sm font-medium">
                            {plant.name}
                          </p>
                          <p className="font-code text-[10px] text-muted-foreground">
                            {plant.done
                              ? `done · ${plant.latin}`
                              : `due ${plant.due} · ${plant.latin}`}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between px-3">
                        <Badge variant={style.badge}>
                          <TaskIcon />
                          {plant.task}
                        </Badge>
                        <span className="font-code text-[10px] text-muted-foreground">
                          {plant.done ? "✓ complete" : `moisture ${plant.moisture}%`}
                        </span>
                      </div>
                      <div className="mt-2.5 px-3">
                        <Progress
                          value={plant.moisture}
                          className="h-1.5"
                          aria-label={`${plant.name} soil moisture`}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
              <ScrollBar
                orientation="horizontal"
                className="border-t-default-border"
              />
            </ScrollArea>
          </section>

          {/* week reminders — bounded vertical ScrollArea */}
          <section
            className="mt-3 flex min-h-0 flex-1 flex-col border-t border-default-border"
            aria-label="Care reminders"
          >
            <div className="flex flex-none items-baseline justify-between px-6 pt-3 pb-1">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                This week
              </h2>
              <span className="font-code text-[10px] text-muted-foreground">
                14 reminders · Feb 28 – Mar 04
              </span>
            </div>
            <ScrollArea
              type="always"
              className="min-h-0 flex-1"
              aria-label="Reminder list"
            >
              <div className="px-6 pb-4">
                {WEEK.map((group) => (
                  <div key={group.day} className="mt-1">
                    <p className="py-1.5 font-code text-[10px] tracking-wide text-muted-foreground uppercase">
                      {group.day}
                    </p>
                    <ul className="divide-y divide-default-border rounded-lg border border-default-border bg-card">
                      {group.items.map((item) => {
                        const style = TASK_STYLE[item.task];
                        const TaskIcon = style.icon;
                        return (
                          <li
                            key={`${item.name}-${item.time}`}
                            className="flex items-center gap-3 py-2 pl-3 pr-5"
                          >
                            <Avatar size="sm">
                              <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">
                                {item.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={
                                item.done
                                  ? "min-w-0 flex-1 truncate text-sm text-foreground/70 line-through"
                                  : "min-w-0 flex-1 truncate text-sm"
                              }
                            >
                              {item.name}
                            </span>
                            <Badge variant={style.badge}>
                              <TaskIcon />
                              {item.task}
                            </Badge>
                            <span className="w-12 text-right font-code text-xs tabular-nums text-muted-foreground">
                              {item.time}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label={`Mark ${item.name} done`}
                              className={
                                item.done ? "text-success-500" : undefined
                              }
                            >
                              <Check />
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>
        </main>

        {/* right column — journal history pane */}
        <aside className="flex w-[340px] flex-none flex-col border-l border-default-border bg-card">
          <div className="flex h-14 flex-none items-center justify-between border-b border-default-border px-4">
            <h2 className="font-heading-3 text-heading-3 text-foreground">
              Care journal
            </h2>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="journal-alerts"
                className="text-[10px] font-medium text-muted-foreground"
              >
                Alerts
              </Label>
              <Switch id="journal-alerts" defaultChecked aria-label="Journal alerts" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-3">
            <ScrollArea
              type="always"
              className="min-h-0 flex-1 rounded-lg border border-default-border bg-background"
              aria-label="Care journal history"
            >
            <ul className="divide-y divide-default-border pb-6">
              {JOURNAL.map((entry) => (
                <li key={`${entry.who}-${entry.when}`} className="flex gap-3 py-3 pl-4 pr-6">
                  <Avatar size="sm" className="mt-0.5">
                    <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">
                      {entry.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 leading-snug">
                    <p className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">{entry.who}</span>
                      <span className="font-code text-[10px] text-muted-foreground">
                        {entry.when}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {entry.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            </ScrollArea>
          </div>

          <div className="flex-none border-t border-default-border p-3">
            <Button variant="secondary" className="w-full">
              <PenLine /> Add journal entry
            </Button>
          </div>
        </aside>
      </div>
    </EvalShell>
  );
}
