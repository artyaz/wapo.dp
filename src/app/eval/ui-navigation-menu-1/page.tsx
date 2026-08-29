"use client";

/**
 * EVAL page — navigation-menu p1 — retail banking transaction history —
 * 390x844 dark phone.
 * Hero: NavigationMenu (product nav with dropdown panel of links, active
 * link + indicator, open at initial render). Supporting: Card, Badge,
 * Button, Avatar, Separator, Progress.
 */

import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  CalendarClockIcon,
  ClockIcon,
  CoffeeIcon,
  FilterIcon,
  FuelIcon,
  Rows3Icon,
  ShieldAlertIcon,
  ShoppingBasketIcon,
  TvIcon,
  WalletIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const activityLinks = [
  {
    icon: Rows3Icon,
    title: "All transactions",
    meta: "328 entries since Dec 1",
    active: true,
  },
  {
    icon: ClockIcon,
    title: "Pending",
    meta: "1 processing · 1–3 days",
    active: false,
  },
  {
    icon: CalendarClockIcon,
    title: "Scheduled",
    meta: "Rent · $1,650.00 due Feb 1",
    active: false,
  },
  {
    icon: ShieldAlertIcon,
    title: "Disputes",
    meta: "1 resolved · closed Jan 18",
    active: false,
  },
];

const today = [
  {
    icon: CoffeeIcon,
    name: "Blue Bottle Coffee",
    meta: "Card · 08:12",
    amount: "-$6.40",
    tone: "default" as const,
    badge: null as string | null,
  },
  {
    icon: ShoppingBasketIcon,
    name: "Whole Foods Market",
    meta: "Card · 09:46",
    amount: "-$84.27",
    tone: "default" as const,
    badge: "Pending",
  },
  {
    icon: ArrowDownLeftIcon,
    name: "Payroll · Riverton Schools",
    meta: "Direct deposit · 06:00",
    amount: "+$2,847.19",
    tone: "success" as const,
    badge: null,
  },
];

const yesterday = [
  {
    icon: TvIcon,
    name: "Netflix.com",
    meta: "Recurring · 23:41",
    amount: "-$17.99",
    tone: "default" as const,
    badge: null,
  },
  {
    icon: WalletIcon,
    name: "Transfer to Savings",
    meta: "Scheduled · 20:00",
    amount: "-$400.00",
    tone: "default" as const,
    badge: null,
  },
  {
    icon: FuelIcon,
    name: "Shell · Route 9",
    meta: "Card · 17:22",
    amount: "-$52.10",
    tone: "default" as const,
    badge: null,
  },
];

function TransactionRow({
  icon: Icon,
  name,
  meta,
  amount,
  tone,
  badge,
}: (typeof today)[number]) {
  return (
    <li className="flex items-center gap-3 py-2">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/40">
        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{name}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {meta}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={cn(
            "font-code text-sm",
            tone === "success" ? "text-success-500" : "text-foreground"
          )}
        >
          {amount}
        </span>
        {badge ? (
          <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
            {badge}
          </Badge>
        ) : null}
      </span>
    </li>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* App bar */}
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="font-heading-2 text-base font-semibold leading-tight">
              Meridian Trust
            </p>
            <p className="font-code text-[10px] uppercase tracking-wide text-foreground/60">
              mobile banking
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Notifications"
              className="relative"
            >
              <BellIcon aria-hidden="true" />
              <span className="absolute end-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">DR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Balance */}
        <section className="px-4 pt-3">
          <p className="text-xs text-muted-foreground">
            Everyday Checking ·· 4417
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="font-code text-3xl font-medium tracking-tight">
              $12,483.27
            </p>
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
              2 min ago
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Progress
              value={80}
              className="h-1.5 flex-1"
              aria-label="February spend against budget"
            />
            <span className="font-code text-[10px] text-muted-foreground">
              $2,811 / $3,500
            </span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Net +$2,441.00 this month · budget resets Mar 1
          </p>
        </section>

        {/* Product nav — dropdown panel open at initial render; the spacer
            keeps the floating panel clear of the in-flow list below it */}
        <nav
          className="relative px-4 pt-3 pb-[262px]"
          aria-label="Account sections"
        >
          <NavigationMenu defaultValue="activity" className="w-full max-w-none">
            <NavigationMenuList>
              <NavigationMenuItem value="activity">
                <NavigationMenuTrigger>Activity</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* explicit width: the stock viewport shrink-wraps on mobile */}
                  <ul className="grid w-[300px] gap-1">
                    {activityLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink
                          href="#"
                          active={link.active}
                          className="flex-row items-center gap-3"
                        >
                          <link.icon
                            className="size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span className="flex min-w-0 flex-col gap-0.5">
                            <span className="text-sm font-medium">
                              {link.title}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {link.meta}
                            </span>
                          </span>
                          {link.active ? (
                            <Badge
                              variant="secondary"
                              className="ms-auto h-5 shrink-0 px-1.5 text-[10px]"
                            >
                              now
                            </Badge>
                          ) : null}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="statements">
                <NavigationMenuTrigger>Statements</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem value="cards">
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Cards
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Transaction history */}
        <main className="flex-1 px-4 pb-3 pt-3">
          <Card className="gap-0 py-0">
            <CardHeader className="flex-row items-center justify-between border-b py-3 [.border-b]:pb-3">
              <div>
                <CardTitle className="text-sm">Transactions</CardTitle>
                <CardDescription className="text-xs">
                  Feb 4, 2026 · 3 today
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <FilterIcon aria-hidden="true" />
                Filter
              </Button>
            </CardHeader>
            <CardContent className="px-4 py-1">
              <p className="pt-3 font-code text-[10px] uppercase tracking-wide text-foreground/60">
                today · +$2,756.52
              </p>
              <ul className="divide-y">
                {today.map((t) => (
                  <TransactionRow key={t.name} {...t} />
                ))}
              </ul>
              <Separator className="my-1" />
              <p className="pt-2 font-code text-[10px] uppercase tracking-wide text-foreground/60">
                yesterday · -$470.09
              </p>
              <ul className="divide-y">
                {yesterday.map((t) => (
                  <TransactionRow key={t.name} {...t} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </main>

        <footer className="flex items-center justify-between border-t px-4 py-2">
          <span className="font-code text-[10px] text-muted-foreground">
            member since 2019 · FDIC insured
          </span>
          <span className="flex items-center gap-1 font-code text-[10px] text-muted-foreground">
            <ArrowUpRightIcon className="size-3" aria-hidden="true" />
            export csv
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
