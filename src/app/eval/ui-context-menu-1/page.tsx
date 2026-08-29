"use client";

/**
 * EVAL page — context-menu p1 — fitness class scheduler — 390x844 dark.
 *
 * Stars ui:context-menu — every class row in the schedule is a long-press /
 * right-click target. The menu over the 06:15 "Spin Interval" row is opened
 * at initial render via a synthetic `contextmenu` event (Radix anchors the
 * menu at the event coordinates) so the screenshot captures it open.
 * Co-stars: Tabs, Card, Badge, Avatar, Button, Progress, Separator.
 */

import React from "react";
import {
  BellIcon,
  ChevronLeftIcon,
  HandIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SlotStatus = "open" | "few" | "full";

type FitClass = {
  id: string;
  time: string;
  minutes: number;
  title: string;
  studio: string;
  coach: string;
  initials: string;
  booked: number;
  capacity: number;
  status: SlotStatus;
};

const CLASSES: FitClass[] = [
  {
    id: "spin-0615",
    time: "06:15",
    minutes: 45,
    title: "Spin Interval",
    studio: "Studio 2",
    coach: "Dara Nkemelu",
    initials: "DN",
    booked: 15,
    capacity: 18,
    status: "few",
  },
  {
    id: "strength-0730",
    time: "07:30",
    minutes: 60,
    title: "Strength Foundations",
    studio: "Studio 1",
    coach: "Marcus Webb",
    initials: "MW",
    booked: 14,
    capacity: 14,
    status: "full",
  },
  {
    id: "mobility-0900",
    time: "09:00",
    minutes: 50,
    title: "Mobility & Recovery",
    studio: "Studio 3",
    coach: "Lena Ortiz",
    initials: "LO",
    booked: 6,
    capacity: 12,
    status: "open",
  },
  {
    id: "hiit-1215",
    time: "12:15",
    minutes: 30,
    title: "Lunch Express HIIT",
    studio: "Studio 2",
    coach: "Marcus Webb",
    initials: "MW",
    booked: 9,
    capacity: 12,
    status: "open",
  },
  {
    id: "barbell-1745",
    time: "17:45",
    minutes: 75,
    title: "Evening Barbell Club",
    studio: "Studio 1",
    coach: "Dara Nkemelu",
    initials: "DN",
    booked: 10,
    capacity: 12,
    status: "open",
  },
];

function StatusBadge({ cls }: { cls: FitClass }) {
  if (cls.status === "full") {
    return <Badge variant="secondary">Full</Badge>;
  }
  if (cls.status === "few") {
    return (
      <span className="inline-flex items-center justify-center rounded-md border border-warning-300/30 bg-warning-400/10 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-warning-300">
        {cls.capacity - cls.booked} left
      </span>
    );
  }
  return <Badge variant="outline">Open</Badge>;
}

/** The context menu attached to every schedule row. */
function ClassMenu({ cls }: { cls: FitClass }) {
  return (
    <ContextMenuContent className="w-56 shadow-lg">
      <ContextMenuLabel>
        {cls.title} · {cls.studio}
      </ContextMenuLabel>
      <ContextMenuGroup>
        <ContextMenuItem>
          <UsersIcon />
          View roster
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilIcon />
          Edit class
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <UserPlusIcon />
            Assign coach
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuGroup>
              <ContextMenuItem>Dara Nkemelu</ContextMenuItem>
              <ContextMenuItem disabled>Marcus Webb</ContextMenuItem>
              <ContextMenuItem>Lena Ortiz</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>Manage coaches…</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuCheckboxItem defaultChecked>
          Waitlist alerts
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem defaultChecked>
          Check-in reminders
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>
          Auto-book from waitlist
        </ContextMenuCheckboxItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Cancel class
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
}

const sectionLabel =
  "text-caption font-caption uppercase tracking-[0.12em] text-neutral-500";

export default function Page() {
  const targetRef = React.useRef<HTMLDivElement>(null);

  // Radix's ContextMenu anchors at the `contextmenu` event coordinates —
  // synthesize one on the first row (06:15 Spin Interval) so the menu is
  // deterministically open in the captured screenshot.
  React.useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      el.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          button: 2,
          buttons: 2,
          // anchor toward the start of the row so the 224px menu opens
          // rightward with comfortable margins on both sides (no edge hug)
          clientX: rect.left + 40,
          clientY: rect.top + rect.height * 0.5,
        })
      );
    }, 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-4 px-4 pb-5 pt-5">
        {/* App header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="icon-sm" aria-label="Back">
              <ChevronLeftIcon />
            </Button>
            <div>
              <h1 className="font-heading-3 text-heading-3 text-foreground">
                FORMA Athletics
              </h1>
              <p className="mt-0.5 font-code text-xs text-muted-foreground">
                Thu, Feb 12 · Today&apos;s schedule
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon-sm" aria-label="Notifications">
              <BellIcon />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">KA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Day picker */}
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="fri">Fri 13</TabsTrigger>
            <TabsTrigger value="sat">Sat 14</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Day summary */}
        <Card>
          <CardContent className="flex flex-col gap-3 px-4 py-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-foreground">Booked today</p>
              <p className="font-code text-sm text-foreground">
                <span className="text-base font-medium">54</span>
                <span className="text-muted-foreground"> / 68 spots</span>
              </p>
            </div>
            <Progress value={79} aria-label="54 of 68 spots booked" />
            <div className="flex items-center justify-between">
              <p className="text-caption font-caption text-muted-foreground">
                Waitlist <span className="font-code text-foreground">9</span>
                <span className="mx-2 text-neutral-700" aria-hidden="true">
                  ·
                </span>
                No-shows <span className="font-code text-foreground">3</span>
              </p>
              <p className="font-code text-xs text-muted-foreground">79% fill</p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule list */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className={sectionLabel}>Classes</h2>
            <p className="font-code text-xs text-muted-foreground">
              5 sessions
            </p>
          </div>
          <Card className="overflow-hidden py-0">
            <ul className="divide-y divide-default-border">
              {CLASSES.map((cls, index) => (
                <li key={cls.id} className="list-none">
                  <ContextMenu>
                    <ContextMenuTrigger
                      ref={index === 0 ? targetRef : undefined}
                      className="flex w-full cursor-default items-center gap-3 px-4 py-3 text-start outline-hidden transition-colors hover:bg-accent/50 data-[state=open]:bg-accent/60"
                    >
                      <div className="flex w-11 shrink-0 flex-col">
                        <span className="font-code text-sm font-medium tabular-nums text-foreground">
                          {cls.time}
                        </span>
                        <span className="font-code text-[0.65rem] leading-4 text-muted-foreground">
                          {cls.minutes} min
                        </span>
                      </div>
                      <Separator
                        orientation="vertical"
                        className="!h-9 data-[orientation=vertical]:w-px"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium text-foreground">
                            {cls.title}
                          </p>
                          <StatusBadge cls={cls} />
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {cls.studio} · {cls.coach} ·{" "}
                          <span className="font-code">
                            {cls.booked}/{cls.capacity}
                          </span>
                        </p>
                      </div>
                      <Avatar className="size-7 shrink-0">
                        <AvatarFallback className="text-[0.65rem]">
                          {cls.initials}
                        </AvatarFallback>
                      </Avatar>
                      <MoreVerticalIcon className="size-4 shrink-0 text-muted-foreground" />
                    </ContextMenuTrigger>
                    <ClassMenu cls={cls} />
                  </ContextMenu>
                </li>
              ))}
              <li className="flex items-center justify-center px-4 py-2.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  2 more this evening
                </Button>
              </li>
            </ul>
          </Card>
        </section>

        {/* Footer hint */}
        <footer className="mt-auto flex items-center gap-2 border-t border-default-border pt-3.5">
          <HandIcon className="size-3.5 shrink-0 text-neutral-500" />
          <p className="text-caption font-caption text-neutral-500">
            Long-press a class for roster, coach and waitlist actions.
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
