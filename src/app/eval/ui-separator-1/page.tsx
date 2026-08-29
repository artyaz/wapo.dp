"use client"

// EVAL page — separator p1 — retail banking transaction history — 1280x800 light

import {
  ArrowLeftRight,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  PieChart,
  Search,
  Settings,
  SlidersHorizontal,
  Wallet,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Txn = {
  id: string
  merchant: string
  initials: string
  detail: string
  amount: string
  credit?: boolean
  time: string
  pending?: boolean
}

const TODAY: Txn[] = [
  {
    id: "TX-90341",
    merchant: "Payroll · Northwind Studio",
    initials: "NS",
    detail: "Income · Deposit",
    amount: "+3,250.00",
    credit: true,
    time: "06:00",
  },
  {
    id: "TX-90352",
    merchant: "Whole Foods Market",
    initials: "WF",
    detail: "Groceries · Card ••2214",
    amount: "−118.42",
    time: "09:47",
  },
  {
    id: "TX-90358",
    merchant: "Blue Bottle Coffee",
    initials: "BB",
    detail: "Food & drink · Card ••2214",
    amount: "−6.75",
    time: "08:12",
    pending: true,
  },
  {
    id: "TX-90371",
    merchant: "Lyft",
    initials: "LY",
    detail: "Transport · Card ••2214",
    amount: "−18.60",
    time: "17:22",
    pending: true,
  },
]

const YESTERDAY: Txn[] = [
  {
    id: "TX-90210",
    merchant: "Shell Station · Hayes St",
    initials: "SH",
    detail: "Fuel · Card ••2214",
    amount: "−61.20",
    time: "08:31",
  },
  {
    id: "TX-90266",
    merchant: "Amazon Marketplace",
    initials: "AM",
    detail: "Shopping · Online",
    amount: "−42.99",
    time: "14:03",
  },
  {
    id: "TX-90289",
    merchant: "Transfer · Savings ••8830",
    initials: "MT",
    detail: "Internal transfer · Scheduled",
    amount: "−400.00",
    time: "19:15",
  },
]

const MONDAY: Txn[] = [
  {
    id: "TX-90108",
    merchant: "Netflix",
    initials: "NF",
    detail: "Subscription · Auto-pay",
    amount: "−15.49",
    time: "07:00",
  },
  {
    id: "TX-90133",
    merchant: "Trader Joe's · Divisadero",
    initials: "TJ",
    detail: "Groceries · Card ••2214",
    amount: "−76.18",
    time: "18:40",
  },
]

const ACCOUNT_STATS = [
  { label: "Current balance", value: "$8,412.93", note: "Ledger balance" },
  { label: "Available to spend", value: "$8,387.58", note: "After holds" },
  {
    label: "Pending holds",
    value: "−$25.35",
    note: "2 authorizations · holds",
  },
  { label: "Last statement", value: "$1,204.16", note: "Closed Dec 28" },
]

const SPEND_CATEGORIES = [
  { label: "Groceries", value: "$412.86" },
  { label: "Bills & utilities", value: "$310.00" },
  { label: "Dining out", value: "$236.40" },
  { label: "Shopping", value: "$164.97" },
]

const UPCOMING = [
  {
    label: "Rent · Bayside",
    value: "−$1,850.00",
    when: "Feb 1 · scheduled",
  },
  {
    label: "Phone · Verizon",
    value: "−$65.00",
    when: "Jan 29 · auto-pay",
  },
  {
    label: "Salary · Northwind",
    value: "+$3,250.00",
    when: "Jan 31 · recurring",
    credit: true,
  },
]

const NAV_PRIMARY = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Accounts", icon: Wallet },
  { label: "Transactions", icon: ArrowLeftRight, count: "9", active: true },
  { label: "Payments", icon: CreditCard },
]

const NAV_SECONDARY = [
  { label: "Statements", icon: FileText },
  { label: "Insights", icon: PieChart },
  { label: "Settings", icon: Settings },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function TxnRow({ txn }: { txn: Txn }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Avatar size="sm">
        <AvatarFallback>{txn.initials}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-foreground">
          {txn.merchant}
        </span>
        <span className="text-caption font-caption text-muted-foreground">
          {txn.detail}
        </span>
      </div>
      <span className="font-code text-xs text-muted-foreground">
        {txn.time}
      </span>
      <span
        className={`w-24 text-end font-code text-code ${
          txn.credit ? "text-success-700" : "text-foreground"
        }`}
      >
        {txn.amount}
      </span>
      {txn.pending ? (
        <Badge variant="outline">Pending</Badge>
      ) : (
        <span className="w-[68px] text-end text-caption font-caption text-muted-foreground">
          Posted
        </span>
      )}
    </div>
  )
}

function TxnGroup({
  title,
  count,
  txns,
}: {
  title: string
  count: string
  txns: Txn[]
}) {
  return (
    <section className="flex flex-col">
      {/* Labeled group header anchored by a hairline separator */}
      <div className="flex items-baseline justify-between px-1 pb-1.5">
        <p className="text-caption font-caption font-medium text-foreground">
          {title}
        </p>
        <p className="font-code text-xs text-muted-foreground">{count}</p>
      </div>
      <Separator />
      <div className="flex flex-col px-1">
        {txns.map((txn, i) => (
          <div key={txn.id} className="flex flex-col">
            {i > 0 ? <Separator className="opacity-70" /> : null}
            <TxnRow txn={txn} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full bg-default-background">
        {/* Sidebar */}
        <aside className="flex w-56 shrink-0 flex-col border-r border-default-border bg-card">
          <div className="px-5 pt-6 pb-5">
            <p className="font-heading-3 text-heading-3 text-foreground">
              Meridian Trust
            </p>
            <p className="text-caption font-caption text-muted-foreground">
              Personal banking
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-0.5 px-3">
            {NAV_PRIMARY.map((item) => (
              <div
                key={item.label}
                className={`flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm ${
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <Badge variant={item.active ? "default" : "secondary"}>
                    {item.count}
                  </Badge>
                ) : null}
              </div>
            ))}

            {/* Separator dividing the two navigation groups */}
            <Separator className="my-3" />

            {NAV_SECONDARY.map((item) => (
              <div
                key={item.label}
                className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-muted-foreground"
              >
                <item.icon className="size-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
              </div>
            ))}
          </nav>

          <div className="border-t border-default-border px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="text-caption font-caption text-muted-foreground">
                Savings goal
              </p>
              <Badge variant="secondary">64%</Badge>
            </div>
            <p className="mt-1.5 text-sm font-medium text-foreground">
              Kyoto, spring 2026
            </p>
            <Progress value={64} aria-label="Savings goal progress" />
            <p className="mt-1.5 font-code text-xs text-muted-foreground">
              $12,800 / $20,000
            </p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center gap-4 border-b border-default-border px-6 py-4">
            <div className="min-w-0">
              <p className="text-caption font-caption text-muted-foreground">
                Everyday Checking ••4417 · Joint with Mariel R.
              </p>
              <h1 className="font-heading-1 text-heading-1 text-foreground">
                Transaction history
              </h1>
            </div>
            <div className="ms-auto flex items-center gap-2.5">
              <div className="relative">
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions"
                  className="w-64 ps-9"
                  aria-label="Search transactions"
                />
              </div>
              <Button variant="outline">
                <SlidersHorizontal />
                Filter
              </Button>
              <Button variant="outline">
                <Download />
                Export
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="flex min-h-0 flex-1 gap-6 p-6">
            {/* Left: account strip + activity */}
            <div className="flex min-w-0 flex-1 flex-col gap-5">
              {/* Account summary strip — segments divided by vertical separators */}
              <div className="flex items-stretch rounded-lg border border-default-border bg-card">
                {ACCOUNT_STATS.map((stat, i) => (
                  <div key={stat.label} className="flex flex-1 items-stretch">
                    {i > 0 ? <Separator orientation="vertical" /> : null}
                    <div className="flex flex-1 flex-col gap-1.5 px-5 py-4">
                      <p className="text-caption font-caption text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="font-code text-code text-foreground">
                        {stat.value}
                      </p>
                      <p className="font-code text-xs text-muted-foreground">
                        {stat.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <Card className="min-h-0 flex-1 gap-0 overflow-hidden rounded-lg py-0 shadow-none">
                <CardHeader className="border-b border-default-border px-6 py-4 [.border-b]:pb-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    January activity
                  </CardTitle>
                  <CardDescription>
                    Posted and pending items · Wednesday, 14 January 2026
                  </CardDescription>
                  <CardAction>
                    <Tabs defaultValue="all">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="debits">Debits</TabsTrigger>
                        <TabsTrigger value="credits">Credits</TabsTrigger>
                        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex min-h-0 flex-1 flex-col gap-5 overflow-auto px-6 py-5">
                  <TxnGroup
                    title="Today · Wed 14 January"
                    count="4 items"
                    txns={TODAY}
                  />
                  <TxnGroup
                    title="Yesterday · Tue 13 January"
                    count="3 items"
                    txns={YESTERDAY}
                  />
                  <TxnGroup
                    title="Monday · 12 January"
                    count="2 items"
                    txns={MONDAY}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right rail */}
            <div className="flex w-72 shrink-0 flex-col gap-4">
              {/* Where money went */}
              <Card className="gap-0 rounded-lg py-0 shadow-none">
                <CardHeader className="px-5 py-3">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Where money went
                  </CardTitle>
                  <CardDescription>
                    January 1 – 14 · 4 categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col px-5 pb-4">
                  {SPEND_CATEGORIES.map((cat, i) => (
                    <div key={cat.label} className="flex flex-col">
                      {i > 0 ? <Separator /> : null}
                      <div className="flex items-baseline justify-between py-2.5">
                        <span className="text-sm text-foreground">
                          {cat.label}
                        </span>
                        <span className="font-code text-code text-foreground">
                          {cat.value}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-baseline justify-between pt-3 pb-1">
                    <span className="text-sm font-medium text-foreground">
                      Total spent
                    </span>
                    <span className="font-code text-code text-foreground">
                      $1,242.43
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming */}
              <Card className="gap-0 rounded-lg py-0 shadow-none">
                <CardHeader className="px-5 py-3">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Upcoming
                  </CardTitle>
                  <CardDescription>
                    Next 14 days · 3 scheduled items
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col px-5 pb-4">
                  {UPCOMING.map((item, i) => (
                    <div key={item.label} className="flex flex-col">
                      {i > 0 ? <Separator /> : null}
                      <div className="flex items-center justify-between gap-2 py-2.5">
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                          <span className="font-code text-xs text-muted-foreground">
                            {item.when}
                          </span>
                        </div>
                        <span
                          className={`shrink-0 font-code text-code ${
                            item.credit
                              ? "text-success-700"
                              : "text-foreground"
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between border-t border-default-border px-6 py-3">
            <p className="text-caption font-caption text-muted-foreground">
              Meridian Trust Bank · Member FDIC · Equal Housing Lender
            </p>
            <div className="flex items-center gap-3">
              <p className="font-code text-xs text-muted-foreground">
                Synced 2 min ago
              </p>
              <Badge variant="outline">9 of 247 items shown</Badge>
            </div>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
