"use client";

/**
 * EVAL page — input-group p2 — retail banking transaction history — 1180x820 dark
 *
 * Scenario: "Meridian Trust" — Everyday Checking dashboard, transaction
 * history view. KPI cards (balance / money in / money out / quick transfer
 * with a $-prefixed, USD-suffixed amount group and an in-group send button),
 * a filter toolbar with search + "/" kbd hint, $-prefixed min/max amount
 * groups, a date group with calendar icon, and an open category dropdown
 * living inside a group; transaction table with status badges. Co-stars:
 * Card, Badge, Button, Table, Kbd, DropdownMenu, Avatar.
 */

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Bus,
  CalendarDays,
  ChevronDown,
  Coffee,
  Download,
  Landmark,
  PiggyBank,
  Search,
  ShoppingBag,
  ShoppingCart,
  Tag,
  type LucideIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KPIS = [
  {
    label: "Current balance",
    value: "$4,821.37",
    sub: "Available now $4,655.12 · 2 holds",
  },
  {
    label: "Money in · November",
    value: "+$3,940.00",
    sub: "Payroll Nov 29 · refund $18.00",
    credit: true,
  },
  {
    label: "Money out · November",
    value: "−$2,812.44",
    sub: "Rent $1,850.00 · 61 purchases",
  },
];

type Txn = {
  date: string;
  payee: string;
  ref: string;
  icon: LucideIcon;
  category: string;
  status: "cleared" | "pending" | "scheduled" | "refunded";
  amount: string;
  credit?: boolean;
};

const TXNS: Txn[] = [
  {
    date: "Nov 30",
    payee: "Round Table Pizza",
    ref: "card #58113",
    icon: ShoppingBag,
    category: "Dining",
    status: "cleared",
    amount: "−$38.20",
  },
  {
    date: "Nov 29",
    payee: "Spectral Design — payroll",
    ref: "direct deposit",
    icon: Briefcase,
    category: "Income",
    status: "cleared",
    amount: "+$1,970.00",
    credit: true,
  },
  {
    date: "Nov 28",
    payee: "Antonia's Grocery",
    ref: "card #57988",
    icon: ShoppingCart,
    category: "Groceries",
    status: "cleared",
    amount: "−$112.87",
  },
  {
    date: "Nov 28",
    payee: "SFMTA transit pass",
    ref: "autorenew",
    icon: Bus,
    category: "Transport",
    status: "cleared",
    amount: "−$98.00",
  },
  {
    date: "Nov 27",
    payee: "Nebula Coffee Roasters",
    ref: "card #57401",
    icon: Coffee,
    category: "Dining",
    status: "pending",
    amount: "−$6.40",
  },
  {
    date: "Nov 26",
    payee: "Transfer to Savings ••8813",
    ref: "recurring",
    icon: PiggyBank,
    category: "Transfer",
    status: "scheduled",
    amount: "−$500.00",
  },
  {
    date: "Nov 25",
    payee: "City Lights Books",
    ref: "refund #2291",
    icon: BookOpen,
    category: "Shopping",
    status: "refunded",
    amount: "+$18.00",
    credit: true,
  },
];

const STATUS_BADGE: Record<
  Txn["status"],
  { label: string; className?: string }
> = {
  // Uniform bordered pills — semantic hue only where meaning demands it
  // (pending = amber caution, refunded = green money-back).
  cleared: { label: "Cleared", className: "text-muted-foreground" },
  pending: {
    label: "Pending",
    className: "border-warning-500/40 text-warning-500",
  },
  scheduled: { label: "Scheduled", className: "text-muted-foreground" },
  refunded: {
    label: "Refunded",
    className: "border-success-500/40 text-success-500",
  },
};

const LABEL_CLASS =
  "text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground flex h-screen flex-col">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-card flex size-8 items-center justify-center rounded-md border">
              <Landmark className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Meridian Trust</p>
              <p className={LABEL_CLASS}>Online banking</p>
            </div>
          </div>
          <Badge variant="secondary" className="font-code">
            Everyday Checking ••4291
          </Badge>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Statements
            </Button>
            <Button size="sm">
              <ArrowRight className="size-4" />
              Pay &amp; transfer
            </Button>
            <Avatar>
              <AvatarFallback className="bg-muted text-xs font-medium">
                DR
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* ── Main ──────────────────────────────────────────────── */}
        <main className="flex min-h-0 flex-1 flex-col gap-4 px-5 py-4">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-4">
            {KPIS.map((kpi) => (
              <Card key={kpi.label} className="gap-1.5 px-4 py-3.5">
                <p className={LABEL_CLASS}>{kpi.label}</p>
                <p
                  className={`font-code text-xl leading-tight ${
                    kpi.credit ? "text-success-500" : ""
                  }`}
                >
                  {kpi.value}
                </p>
                <p className="text-muted-foreground text-xs">{kpi.sub}</p>
              </Card>
            ))}

            <Card className="gap-1.5 px-4 py-3.5">
              <p className={LABEL_CLASS}>Quick transfer</p>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText className="font-code">$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  defaultValue="500.00"
                  inputMode="decimal"
                  aria-label="Transfer amount"
                  className="font-code"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="font-code text-xs">
                    USD
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" className="pe-1.5">
                  <InputGroupButton
                    size="icon-xs"
                    aria-label="Send transfer to Savings"
                  >
                    <ArrowRight />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <p className="text-muted-foreground text-xs">
                to Savings ••8813 · arrives instantly
              </p>
            </Card>
          </div>

          {/* Filter toolbar */}
          <div className="flex items-center gap-3">
            <InputGroup className="flex-1">
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search payees, references, amounts…"
                aria-label="Search transactions"
              />
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="w-52">
              <InputGroupAddon>
                <InputGroupText className="font-code text-xs">
                  $
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                defaultValue="0.00 – 250.00"
                inputMode="decimal"
                aria-label="Amount range"
                className="font-code"
              />
            </InputGroup>

            <InputGroup className="w-48">
              <InputGroupAddon>
                <CalendarDays className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                defaultValue="Nov 1 – Nov 30"
                aria-label="Statement period"
                className="font-code text-xs"
              />
            </InputGroup>

            <InputGroup className="w-56">
              <InputGroupAddon>
                <Tag className="size-4" />
              </InputGroupAddon>
              <InputGroupButton variant="ghost" className="px-0">
                All categories
              </InputGroupButton>
              <InputGroupAddon align="inline-end" className="pe-1.5">
                <DropdownMenu defaultOpen>
                  <DropdownMenuTrigger
                    render={
                      <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Change category filter"
                      >
                        <ChevronDown />
                      </InputGroupButton>
                    }
                  />
                  {/* True overlay: elevation shadow on the floating menu. */}
                  <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="shadow-xl"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem>All categories</DropdownMenuItem>
                      <DropdownMenuItem>Dining</DropdownMenuItem>
                      <DropdownMenuItem>Groceries</DropdownMenuItem>
                      <DropdownMenuItem>Income</DropdownMenuItem>
                      <DropdownMenuItem>Transfers</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Transaction table */}
          <Card className="min-h-0 flex-1 gap-3 py-4">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-heading-3">
                Transaction history
              </CardTitle>
              <CardDescription className="font-code text-[10px] uppercase tracking-[0.12em]">
                132 posted · 1 pending · statement Nov 1–30, 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-0 px-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Date</TableHead>
                    <TableHead>Payee</TableHead>
                    <TableHead className="w-28">Category</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-28 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TXNS.map((t) => {
                    const badge = STATUS_BADGE[t.status];
                    const Icon = t.icon;
                    return (
                      <TableRow key={t.ref}>
                        <TableCell className="text-muted-foreground py-2 font-code text-xs">
                          {t.date}
                        </TableCell>
                        <TableCell className="py-2">
                          <span className="flex items-center gap-2.5">
                            <span className="bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-md border">
                              <Icon className="size-3.5" />
                            </span>
                            <span className="flex flex-col leading-tight">
                              <span className="text-sm">{t.payee}</span>
                              <span className="text-muted-foreground font-code text-[10px]">
                                {t.ref}
                              </span>
                            </span>
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground py-2 text-xs">
                          {t.category}
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className={badge.className}>
                            {badge.label}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`py-2 text-right font-code text-sm ${
                            t.credit ? "text-success-500" : ""
                          }`}
                        >
                          {t.amount}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="gap-2 px-5">
              <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
                Showing 7 of 132
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="size-4" />
                  CSV
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="text-muted-foreground flex h-8 shrink-0 items-center justify-between border-t px-5 font-code text-[10px] uppercase tracking-[0.12em]">
          <span>Everyday Checking ••4291 · FDIC insured</span>
          <span>Last updated 09:12 PST · session 8f3a</span>
        </footer>
      </div>
    </EvalShell>
  );
}
