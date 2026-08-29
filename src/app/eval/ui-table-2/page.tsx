"use client"
// EVAL page — table p2 — stock research terminal — 430x932 light (phone)
// Compact watchlist Table front and center: symbol column with company
// names, mono right-aligned prices, colored session change columns, subtle
// zebra striping, an averages footer row and a delayed-quotes caption.
// Co-stars: Badge, Button, Avatar, Tabs, Card, Progress.

import {
  Bell,
  Home,
  LineChart,
  Newspaper,
  Plus,
  Search,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Stock = {
  ticker: string
  name: string
  last: string
  chg: string
  chgPct: string
  up: boolean
}

const watchlist: Stock[] = [
  { ticker: "NVDA", name: "NVIDIA Corp.", last: "131.88", chg: "+3.02", chgPct: "+2.34%", up: true },
  { ticker: "AAPL", name: "Apple Inc.", last: "228.46", chg: "+1.24", chgPct: "+0.55%", up: true },
  { ticker: "MSFT", name: "Microsoft", last: "424.72", chg: "-2.18", chgPct: "-0.51%", up: false },
  { ticker: "AMZN", name: "Amazon.com", last: "186.30", chg: "+0.84", chgPct: "+0.45%", up: true },
  { ticker: "TSLA", name: "Tesla, Inc.", last: "219.11", chg: "-6.24", chgPct: "-2.77%", up: false },
  { ticker: "META", name: "Meta Platforms", last: "512.08", chg: "+4.16", chgPct: "+0.82%", up: true },
  { ticker: "GOOGL", name: "Alphabet Inc. A", last: "176.44", chg: "-0.92", chgPct: "-0.52%", up: false },
  { ticker: "JPM", name: "JPMorgan Chase", last: "208.63", chg: "+1.47", chgPct: "+0.71%", up: true },
]

const navItems = [
  { icon: Home, label: "Home", active: false },
  { icon: LineChart, label: "Watchlist", active: true },
  { icon: Newspaper, label: "News", active: false },
  { icon: Bell, label: "Alerts", active: false },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <h1 className="font-heading-2 text-heading-2 text-foreground">
            Ledgerline
          </h1>
          <Badge className="border-transparent bg-success-100 text-success-700">
            <span className="size-1.5 rounded-full bg-success-600" />
            NYSE · Open
          </Badge>
          <div className="ms-auto flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Search securities"
              className="text-muted-foreground"
            >
              <Search />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">AV</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-3 px-4 pt-3">
          {/* Index snapshot */}
          <section className="rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-caption font-caption text-muted-foreground">
                  S&amp;P 500 · INDEX
                </p>
                <p className="mt-1 font-code text-2xl tabular-nums text-foreground">
                  5,411.20
                </p>
              </div>
              <div className="text-end">
                <p className="font-code text-sm tabular-nums text-success-700">
                  +18.44
                </p>
                <p className="font-code text-sm tabular-nums text-success-700">
                  +0.34%
                </p>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-4 gap-2 border-t pt-3 font-code text-xs tabular-nums text-muted-foreground">
              <div>
                <dt className="sr-only">Open</dt>
                <dd>O 5,392.76</dd>
              </div>
              <div>
                <dt className="sr-only">High</dt>
                <dd>H 5,418.03</dd>
              </div>
              <div>
                <dt className="sr-only">Low</dt>
                <dd>L 5,387.11</dd>
              </div>
              <div>
                <dt className="sr-only">Volume</dt>
                <dd className="text-end">V 2.94B</dd>
              </div>
            </dl>
          </section>

          {/* View switch */}
          <Tabs defaultValue="watchlist">
            <TabsList className="w-full">
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="movers">Movers</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Watchlist table */}
          <section className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-9 text-xs text-muted-foreground">
                    Symbol
                  </TableHead>
                  <TableHead className="h-9 text-end text-xs text-muted-foreground">
                    Last
                  </TableHead>
                  <TableHead className="h-9 text-end text-xs text-muted-foreground">
                    Chg
                  </TableHead>
                  <TableHead className="h-9 text-end text-xs text-muted-foreground">
                    Chg %
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlist.map((stock, i) => (
                  <TableRow
                    key={stock.ticker}
                    className={i % 2 === 1 ? "bg-muted/30" : undefined}
                  >
                    <TableCell className="py-2.5">
                      <span className="text-sm font-medium">
                        {stock.ticker}
                      </span>
                      <span className="ms-2 text-xs text-muted-foreground">
                        {stock.name}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 text-end font-code text-[13px] tabular-nums">
                      {stock.last}
                    </TableCell>
                    <TableCell
                      className={`py-2.5 text-end font-code text-[13px] tabular-nums ${
                        stock.up
                          ? "text-success-700"
                          : "text-destructive-600"
                      }`}
                    >
                      {stock.chg}
                    </TableCell>
                    <TableCell
                      className={`py-2.5 text-end font-code text-[13px] tabular-nums ${
                        stock.up
                          ? "text-success-700"
                          : "text-destructive-600"
                      }`}
                    >
                      {stock.chgPct}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={2} className="py-2.5 text-xs font-medium">
                    Session average · 8 symbols
                  </TableCell>
                  <TableCell className="py-2.5 text-end font-code text-xs tabular-nums text-success-700">
                    +0.05
                  </TableCell>
                  <TableCell className="py-2.5 text-end font-code text-xs tabular-nums text-success-700">
                    +0.13%
                  </TableCell>
                </TableRow>
              </TableFooter>
              <TableCaption className="mt-3 text-xs text-foreground/70">
                Quotes delayed 15 min · Prices in USD · Consolidated tape
              </TableCaption>
            </Table>
          </section>

          {/* Analyst consensus on the selected ticker */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">AAPL · Apple Inc.</CardTitle>
              <CardAction>
                <Badge variant="outline" className="text-success-700">
                  Consensus: Buy
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-4">
              <div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">
                    Buy / overweight ratings
                  </span>
                  <span className="font-code tabular-nums">31 / 42 analysts</span>
                </div>
                <Progress value={74} className="mt-1.5 h-1.5" />
              </div>
              <dl className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dt className="text-muted-foreground">Mean PT</dt>
                  <dd className="mt-0.5 font-code text-sm tabular-nums">
                    245.10
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Upside</dt>
                  <dd className="mt-0.5 font-code text-sm tabular-nums text-success-700">
                    +7.3%
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">P/E (ttm)</dt>
                  <dd className="mt-0.5 font-code text-sm tabular-nums">
                    33.4
                  </dd>
                </div>
              </dl>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Plus data-icon="inline-start" /> Add position
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Full report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom navigation */}
        <nav className="mt-3 grid shrink-0 grid-cols-4 gap-1 border-t px-2 pb-3 pt-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              aria-label={item.label}
              className={
                item.active
                  ? "flex h-auto flex-col gap-1 rounded-md bg-muted py-2 text-foreground"
                  : "flex h-auto flex-col gap-1 rounded-md py-2 text-muted-foreground"
              }
            >
              <item.icon />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </EvalShell>
  )
}
