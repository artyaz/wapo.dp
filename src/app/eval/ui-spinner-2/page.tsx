"use client"

// EVAL page — spinner p2 — retail banking transaction history — 430x932 light (phone)
// Processing payment states in a mobile banking app: an in-flight P2P
// transfer (hero card: spinner + progress + cancel), a pending direct-debit
// row with an inline spinner in the transaction list, a disabled quick action
// and a confirming bottom CTA — mixed with settled history so the screen
// reads as a real ledger mid-settlement.
// Family: Spinner + Card, Badge, Button, Input, Progress, Separator, Avatar.
// Single column, thumb-reach actions at the bottom. Flat panels + hairlines.

import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Bell,
  Building2,
  Coffee,
  Landmark,
  Plus,
  QrCode,
  Search,
  ShoppingCart,
  Zap,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"

const todayTxns = [
  {
    icon: Zap,
    name: "CityGrid Utilities",
    meta: "Direct debit · ref DD-55821",
    amount: "−$84.50",
    state: "processing" as const,
  },
  {
    icon: Coffee,
    name: "Blue Bottle Coffee",
    meta: "Card · 08:12 · Hayes St",
    amount: "−$6.40",
    state: "settled" as const,
  },
  {
    icon: Banknote,
    name: "Payroll · Nordic Grain Co.",
    meta: "Deposit · 06:00",
    amount: "+$3,250.00",
    state: "credited" as const,
  },
]

const yesterdayTxns = [
  {
    icon: Building2,
    name: "Sunrise Properties",
    meta: "Standing order · rent",
    amount: "−$1,450.00",
    state: "settled" as const,
  },
  {
    icon: ShoppingCart,
    name: "Fern Market",
    meta: "Card · 19:44 · groceries",
    amount: "−$98.20",
    state: "settled" as const,
  },
]

function TxnRow({
  icon: Icon,
  name,
  meta,
  amount,
  state,
}: (typeof todayTxns)[number]) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-card">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate font-caption text-caption text-muted-foreground">
          {meta}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <p className="font-code text-sm">{amount}</p>
        {state === "processing" ? (
          <div className="flex items-center gap-1.5" aria-busy="true">
            <Spinner className="size-3.5 text-muted-foreground" />
            <span className="font-caption text-caption text-muted-foreground">
              Processing
            </span>
          </div>
        ) : state === "credited" ? (
          <Badge className="border-transparent bg-success-100 text-success-700">
            Credited
          </Badge>
        ) : (
          <span className="font-caption text-caption text-muted-foreground">
            Settled
          </span>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* App header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <div className="flex size-7 items-center justify-center rounded-md border bg-card">
            <Landmark className="size-4" />
          </div>
          <span className="font-heading-3 text-heading-3">Meridian Bank</span>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <Bell />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Ledger */}
        <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
          {/* Account summary */}
          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="text-sm">
                Everyday Checking <span className="font-code text-xs text-muted-foreground">•••• 4821</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-4">
              <p className="font-code text-3xl leading-none">$4,812.36</p>
              <p className="font-caption text-caption text-muted-foreground">
                Available $4,477.86 · $334.50 pending
              </p>
            </CardContent>
          </Card>

          {/* In-flight payment — the processing hero */}
          <Card className="gap-3 py-4" aria-busy="true" aria-label="Processing payment to Maya Torres">
            <CardHeader>
              <CardTitle className="text-sm">Payment in progress</CardTitle>
              <p className="font-code text-xs text-muted-foreground">ref TR-91042</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background">
                  <Spinner className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Maya Torres</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    Instant transfer · memo “June share”
                  </p>
                </div>
                <p className="font-code text-sm font-medium">−$250.00</p>
              </div>
              <Progress value={64} aria-label="Payment progress, step 2 of 3" />
              <div className="flex items-center justify-between">
                <span className="font-code text-xs text-muted-foreground">
                  authorising with bank · step 2 of 3
                </span>
                <Button variant="ghost" size="xs">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions — one slot still committing */}
          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary" size="sm">
              <ArrowUpRight />
              Send
            </Button>
            <Button variant="secondary" size="sm">
              <ArrowDownLeft />
              Request
            </Button>
            <Button variant="secondary" size="sm">
              <Plus />
              Top up
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions"
              aria-label="Search transactions"
              className="pl-8"
            />
          </div>

          {/* Today — pending row on top */}
          <section className="flex min-h-0 flex-col" aria-label="Transactions today">
            <div className="flex items-baseline justify-between px-0.5">
              <h2 className="font-heading-3 text-heading-3">Today</h2>
              <span className="font-code text-xs text-muted-foreground">
                3 items · 1 pending
              </span>
            </div>
            <Separator className="mb-1 mt-2" />
            {todayTxns.map((t) => (
              <TxnRow key={t.name} {...t} />
            ))}
          </section>

          {/* Yesterday */}
          <section className="mt-3 flex min-h-0 flex-col" aria-label="Transactions yesterday">
            <div className="flex items-baseline justify-between px-0.5">
              <h2 className="font-heading-3 text-heading-3">Yesterday</h2>
              <span className="font-code text-xs text-muted-foreground">
                2 items
              </span>
            </div>
            <Separator className="mb-1 mt-2" />
            {yesterdayTxns.map((t) => (
              <TxnRow key={t.name} {...t} />
            ))}
          </section>
        </main>

        {/* Bottom CTA — confirming */}
        <footer className="flex shrink-0 items-center gap-2 border-t bg-background px-4 py-3">
          <Button className="flex-1" disabled aria-busy="true">
            <Spinner data-icon="inline-start" />
            Confirming transfer…
          </Button>
          <Button variant="outline" size="icon" aria-label="Scan QR code">
            <QrCode />
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
