"use client";

import React from "react";
import {
  BellRingIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  DoorOpenIcon,
  HourglassIcon,
  MoreHorizontalIcon,
  MousePointerClickIcon,
  Trash2Icon,
  UserCheckIcon,
  ZapIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type SessionStatus = "arrived" | "confirmed" | "pending";

type Session = {
  id: string;
  time: string;
  minutes: number;
  client: string;
  service: string;
  room: number;
  status: SessionStatus;
};

const SESSIONS: Session[] = [
  {
    id: "s1",
    time: "09:00",
    minutes: 60,
    client: "Maya Peretz",
    service: "Deep tissue massage",
    room: 2,
    status: "arrived",
  },
  {
    id: "s2",
    time: "11:30",
    minutes: 45,
    client: "Adi Levi",
    service: "Prenatal yoga",
    room: 1,
    status: "confirmed",
  },
  {
    id: "s3",
    time: "14:00",
    minutes: 30,
    client: "Noa Katz",
    service: "Physio consult",
    room: 3,
    status: "pending",
  },
];

const STATUS_STYLES: Record<SessionStatus, { label: string; className: string }> = {
  arrived: {
    label: "Arrived",
    className: "border-success-200 bg-success-50 text-success-700",
  },
  confirmed: {
    label: "Confirmed",
    className: "border-success-200 bg-success-50 text-success-700",
  },
  pending: {
    label: "Pending",
    className: "border-warning-200 bg-warning-50 text-warning-700",
  },
};

function StatusChip({ status }: { status: SessionStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-medium ${s.className}`}
    >
      {s.label}
    </span>
  );
}

function SessionRow({ session }: { session: Session }) {
  const [room, setRoom] = React.useState(String(session.room));
  const arrived = session.status === "arrived";

  return (
    <li>
      <ContextMenu dir="rtl">
        <ContextMenuTrigger className="flex w-full cursor-default items-center gap-3 px-4 py-3 text-start outline-hidden transition-colors hover:bg-accent/60">
          <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-muted/60 py-1.5">
            <span className="text-sm font-medium leading-5 tabular-nums">
              {session.time}
            </span>
            <span className="text-[0.65rem] leading-4 text-muted-foreground">
              {session.minutes} min
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium">{session.client}</p>
              <StatusChip status={session.status} />
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {session.service} · Room {room}
            </p>
          </div>
          <MoreHorizontalIcon className="size-4 shrink-0 text-muted-foreground" />
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>
            {session.time} · {session.client}
          </ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <CalendarClockIcon />
              Reschedule…
              <ContextMenuShortcut>⌘K</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem disabled={arrived}>
              <UserCheckIcon />
              Mark arrived
              <ContextMenuShortcut>⌘A</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <DoorOpenIcon />
              Assign room
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-40">
              <ContextMenuRadioGroup value={room} onValueChange={setRoom}>
                {[1, 2, 3].map((n) => (
                  <ContextMenuRadioItem key={n} value={String(n)}>
                    Room {n}
                  </ContextMenuRadioItem>
                ))}
              </ContextMenuRadioGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash2Icon />
            Cancel booking
            <ContextMenuShortcut>⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  );
}

function RuleRow({
  icon,
  title,
  description,
  ...switchProps
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
} & React.ComponentProps<typeof Switch>) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="text-muted-foreground">{icon}</span>
          {title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch dir="rtl" {...switchProps} />
    </div>
  );
}

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [reminders, setReminders] = React.useState(true);

  const dayLabel = (date ?? new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Aria Studio · Front desk
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">
              Appointment scheduler
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {dayLabel} · 3 sessions booked
            </p>
          </div>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted/40 text-muted-foreground">
            <CalendarDaysIcon className="size-5" />
          </div>
        </header>

        <div className="grid flex-1 items-start gap-6 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
          {/* Day picker — renders as the right-hand column in RTL */}
          <section className="flex flex-col gap-3">
            <Calendar
              mode="single"
              dir="rtl"
              selected={date}
              onSelect={setDate}
              className="w-full rounded-lg border [--cell-size:--spacing(9)]"
            />
            <div className="grid grid-cols-3 gap-2 rounded-lg border px-2 py-2.5">
              <div className="text-center">
                <p className="text-lg font-semibold leading-6">3</p>
                <p className="text-[0.65rem] text-muted-foreground">Booked</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold leading-6">2</p>
                <p className="text-[0.65rem] text-muted-foreground">
                  Open slots
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold leading-6">$410</p>
                <p className="text-[0.65rem] text-muted-foreground">
                  Expected
                </p>
              </div>
            </div>
          </section>

          {/* Sessions + booking rules — left-hand column in RTL */}
          <div className="flex flex-col gap-6">
            <section className="overflow-hidden rounded-xl border">
              <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <h2 className="text-sm font-medium">Sessions</h2>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MousePointerClickIcon className="size-3.5" />
                  Long-press for actions
                </span>
              </div>
              <ul className="divide-y divide-border">
                {SESSIONS.map((s) => (
                  <SessionRow key={s.id} session={s} />
                ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-xl border">
              <div className="border-b px-4 py-3">
                <h2 className="text-sm font-medium">Booking rules</h2>
              </div>
              <div className="divide-y divide-border">
                <RuleRow
                  icon={<ZapIcon className="size-3.5" />}
                  title="Auto-confirm requests"
                  description="New bookings are accepted instantly, without manual review."
                  defaultChecked
                />
                <RuleRow
                  icon={<HourglassIcon className="size-3.5" />}
                  title="Waitlist for full days"
                  description="Clients can join a waitlist when no slots are left."
                />
                <RuleRow
                  icon={<BellRingIcon className="size-3.5" />}
                  title="Reminder emails"
                  description="Send clients a reminder 24 hours before each session."
                  checked={reminders}
                  onCheckedChange={setReminders}
                />
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>Aria Studio — Dizengoff branch</span>
          <span>Manager view</span>
        </footer>
      </div>
    </EvalShell>
  );
}
