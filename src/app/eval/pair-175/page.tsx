"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  SearchIcon,
} from "lucide-react";

const SELECTED_DATE = new Date(2025, 8, 18);

const EVENTS = [
  { time: "09:30", title: "Team standup", length: "15m" },
  { time: "11:00", title: "Design review", length: "45m" },
  { time: "14:00", title: "1:1 with Maya", length: "30m" },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      {/* App behind the overlay (dimmed) */}
      <div className="relative min-h-screen w-full overflow-hidden bg-background">
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col gap-4 p-5 opacity-60 blur-[1.5px]"
        >
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-24 rounded-full bg-muted-foreground/40" />
            <div className="h-2.5 w-10 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="h-7 w-40 rounded-md bg-muted-foreground/25" />
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md bg-muted/70" />
            ))}
          </div>
        </div>

        {/* Scrim */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Command palette overlay */}
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col px-3 pt-8 pb-8">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-popover/95 shadow-2xl backdrop-blur-xl">
            {/* Search */}
            <div className="flex h-12 items-center gap-2 px-3">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <input
                className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Jump to a date or search events…"
                defaultValue=""
                aria-label="Search commands"
              />
              <kbd className="shrink-0 rounded-md border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            <Separator />

            {/* Section: jump to date */}
            <div className="px-2 pt-3 pb-1">
              <p className="px-1 pb-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                Jump to date
              </p>
              <Calendar
                mode="single"
                defaultMonth={SELECTED_DATE}
                selected={SELECTED_DATE}
                onSelect={() => {}}
                disabled={{ before: new Date(2025, 8, 8) }}
                className="mx-auto w-fit p-2 [--cell-size:--spacing(7)]"
              />
            </div>

            <Separator />

            {/* Section: up next */}
            <div className="px-3 pt-3 pb-2">
              <p className="pb-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                Up next · Thu, 18 Sep
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-9 w-14 px-2 text-xs">Time</TableHead>
                    <TableHead className="h-9 px-2 text-xs">Event</TableHead>
                    <TableHead className="h-9 px-2 text-xs">Length</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EVENTS.map((event) => (
                    <TableRow key={event.time}>
                      <TableCell className="px-2 py-2 text-xs tabular-nums text-muted-foreground">
                        {event.time}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-xs font-medium">
                        {event.title}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-xs text-muted-foreground">
                        {event.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            {/* Footer hints */}
            <div className="flex items-center justify-center gap-3 px-3 py-2.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <ArrowUpIcon className="size-3" />
                <ArrowDownIcon className="size-3" />
                navigate
              </span>
              <Separator orientation="vertical" className="h-3.5" />
              <span className="flex items-center gap-1">
                <CornerDownLeftIcon className="size-3" />
                select
              </span>
              <Separator orientation="vertical" className="h-3.5" />
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-muted/60 px-1 font-mono text-[10px]">
                  esc
                </kbd>
                close
              </span>
            </div>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
