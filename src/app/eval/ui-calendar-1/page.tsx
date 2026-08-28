"use client"

// EVAL page — calendar p1 — stock research terminal — 1024x768 light
// Calendar as an earnings/dividend/macro event calendar (marked days with
// filled = earnings, hollow = macro) + Card, Badge, Button, Input, Table,
// Separator. Flat panels + hairlines, IBM Plex Mono for market data.

import * as React from "react"
import type { DayButton } from "react-day-picker"
import {
  FileTextIcon,
  PlusIcon,
  ScanSearchIcon,
  SearchIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()
const mk = (day: number) => new Date(year, month, day)
const monthLabel = now.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
})

type Mark = "earnings" | "macro"
const markedDays: Record<number, Mark> = {
  4: "macro",
  6: "earnings",
  11: "macro",
  13: "earnings",
  18: "earnings",
  20: "macro",
  25: "earnings",
  27: "macro",
}

type DayEvent = { time: string; type: string; title: string; meta: string }
const eventsByDay: Record<number, DayEvent[]> = {
  18: [
    {
      time: "08:30",
      type: "Earnings",
      title: "NVIDIA Corp — Q3 FY26 results",
      meta: "Cons. EPS $0.83 · Rev $38.2B · call at 17:00 ET",
    },
    {
      time: "10:00",
      type: "Macro",
      title: "Existing home sales — October",
      meta: "Cons. 4.10M SAAR · prior 4.06M",
    },
    {
      time: "16:00",
      type: "Earnings",
      title: "Cisco Systems — Q1 FY26 results",
      meta: "Cons. EPS $0.91 · call after the close",
    },
  ],
}

function EventDayButton({
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const mark =
    day.date.getFullYear() === year && day.date.getMonth() === month
      ? markedDays[day.date.getDate()]
      : undefined
  return (
    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
      {children}
      <span
        aria-hidden="true"
        className={
          mark === "earnings"
            ? "size-1 rounded-full bg-current"
            : mark === "macro"
              ? "size-1 rounded-full border border-current bg-transparent"
              : "size-1 rounded-full bg-transparent"
        }
      />
    </CalendarDayButton>
  )
}

const watchlist = [
  { ticker: "NVDA", name: "NVIDIA", price: "131.88", change: "+2.39%", up: true },
  { ticker: "AAPL", name: "Apple", price: "243.20", change: "+0.84%", up: true },
  { ticker: "MSFT", name: "Microsoft", price: "415.62", change: "-0.52%", up: false },
  { ticker: "JPM", name: "JPMorgan", price: "252.90", change: "+1.13%", up: true },
  { ticker: "XOM", name: "Exxon Mobil", price: "118.44", change: "-0.21%", up: false },
  { ticker: "T", name: "AT&T", price: "22.76", change: "+0.18%", up: true },
]

const indices = [
  { name: "S&P 500", value: "5,984.12", change: "+0.42%", up: true },
  { name: "NASDAQ", value: "19,426.15", change: "+0.71%", up: true },
  { name: "VIX", value: "14.62", change: "-3.11%", up: false },
]

const filings = [
  {
    date: "2026-08-12",
    form: "10-Q",
    desc: "Quarterly report — period ending Jul 26, 2026",
  },
  {
    date: "2026-07-16",
    form: "8-K",
    desc: "Results of operations — Q2 FY26 press release",
  },
  {
    date: "2026-06-30",
    form: "S-3ASR",
    desc: "Automatic shelf registration — $12.5B mixed",
  },
]

export default function Page() {
  const [selected, setSelected] = React.useState<Date | undefined>(mk(18))
  const events = selected ? eventsByDay[selected.getDate()] : undefined

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-sm bg-primary font-code text-xs font-semibold text-primary-foreground">
              M
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Meridian Terminal
            </span>
          </div>
          <Badge variant="outline">NASDAQ · Open</Badge>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tickers — try NVDA"
                className="h-8 w-56 pl-8"
                aria-label="Search tickers"
              />
            </div>
            <Button variant="outline" size="sm">
              <ScanSearchIcon />
              Screen
            </Button>
            <Button size="sm">
              <PlusIcon />
              New note
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Watchlist */}
          <aside className="flex w-[236px] shrink-0 flex-col gap-3 border-r p-3">
            <p className="font-caption text-caption text-muted-foreground">
              Watchlist · 6 symbols
            </p>
            <div className="flex flex-col">
              {watchlist.map((w, i) => (
                <div key={w.ticker}>
                  {i > 0 && <Separator className="my-2" />}
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-code text-sm font-semibold leading-none">
                        {w.ticker}
                      </p>
                      <p className="mt-1 truncate font-caption text-caption text-muted-foreground">
                        {w.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-code text-sm leading-none tabular-nums">
                        {w.price}
                      </p>
                      <p
                        className={`mt-1 font-code text-xs leading-none tabular-nums ${
                          w.up
                            ? "text-success-600"
                            : "text-destructive-500"
                        }`}
                      >
                        {w.change}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              {indices.map((ix) => (
                <div key={ix.name} className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    {ix.name}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span className="font-code text-xs tabular-nums">
                      {ix.value}
                    </span>
                    <span
                      className={`font-code text-xs tabular-nums ${
                        ix.up ? "text-success-600" : "text-destructive-500"
                      }`}
                    >
                      {ix.change}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Workspace */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading-2 text-heading-2 text-foreground">
                    NVIDIA Corporation
                  </h1>
                  <Badge variant="secondary">NVDA</Badge>
                  <Badge variant="outline">Semiconductors</Badge>
                </div>
                <p className="mt-1 font-caption text-caption text-muted-foreground">
                  NASDAQ · USD · Real-time consolidated tape
                </p>
              </div>
              <div className="text-right">
                <p className="font-code text-2xl leading-none tabular-nums">
                  131.88
                </p>
                <p className="mt-1 font-code text-sm tabular-nums text-success-600">
                  +3.08 (+2.39%) today
                </p>
              </div>
            </div>

            <div className="flex min-h-0 items-start gap-4">
              {/* Calendar — event calendar with marked days */}
              <Card className="w-fit gap-3 py-4">
                <CardHeader>
                  <CardTitle className="text-sm">Event calendar</CardTitle>
                  <CardDescription>
                    Earnings, dividends &amp; macro · {monthLabel}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-4">
                  <Calendar
                    mode="single"
                    defaultMonth={mk(1)}
                    selected={selected}
                    onSelect={setSelected}
                    components={{ DayButton: EventDayButton }}
                    classNames={{ day: "[&>button]:font-code" }}
                  />
                  <div className="flex items-center gap-4 px-1">
                    <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                      <span className="size-1 rounded-full bg-foreground" />
                      Earnings
                    </span>
                    <span className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                      <span className="size-1 rounded-full border border-foreground/70" />
                      Macro
                    </span>
                    <span className="ml-auto font-code text-xs text-muted-foreground">
                      Times ET
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Events on the selected day + filings */}
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <Card className="gap-3 py-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      Events
                      <span className="font-caption text-caption font-normal text-muted-foreground">
                        {selected?.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {events ? `${events.length} scheduled` : "No scheduled events"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col px-4">
                    {(events ?? []).map((e, i) => (
                      <div key={e.title}>
                        {i > 0 && <Separator className="my-3" />}
                        <div className="flex items-start gap-3">
                          <span className="w-10 shrink-0 pt-0.5 font-code text-xs tabular-nums text-muted-foreground">
                            {e.time}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{e.type}</Badge>
                              <span className="truncate text-sm font-medium">
                                {e.title}
                              </span>
                            </div>
                            <p className="mt-1 truncate font-caption text-caption text-muted-foreground">
                              {e.meta}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!events && (
                      <p className="font-caption text-caption text-muted-foreground">
                        Nothing on the tape for this date.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="gap-3 py-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <FileTextIcon className="size-4 text-muted-foreground" />
                      Recent filings — NVDA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4">
                    <Table className="table-fixed">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="h-8 w-[104px]">Date</TableHead>
                          <TableHead className="h-8 w-[68px]">Form</TableHead>
                          <TableHead className="h-8">Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filings.map((f) => (
                          <TableRow key={f.date}>
                            <TableCell className="py-2 font-code text-xs tabular-nums">
                              {f.date}
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge variant="outline">{f.form}</Badge>
                            </TableCell>
                            <TableCell className="truncate py-2 text-sm text-muted-foreground">
                              {f.desc}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>

        {/* Status bar */}
        <footer className="flex h-8 shrink-0 items-center justify-between border-t px-4">
          <span className="font-code text-xs text-muted-foreground">
            Data as of 14:32:05 ET · Some quotes delayed 15 min
          </span>
          <span className="font-code text-xs text-muted-foreground">
            Terminal v4.2.1 · Session 8841
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
