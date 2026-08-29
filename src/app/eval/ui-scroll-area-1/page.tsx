"use client";

/**
 * EVAL page — scroll-area p1 — retail banking transaction history — 390x844 dark (phone)
 *
 * "Northline" mobile banking app, Everyday Checking ••4127. ScrollArea is the
 * spine of the screen: a horizontal category-filter strip and the bounded
 * transaction ledger (grouped by day) both use type="always" so the styled
 * monochrome thumbs render in the static capture.
 * Other ui/* components: Card, Badge, Avatar, Button, Separator.
 */

import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Bus,
  Coffee,
  CreditCard,
  FileText,
  Fuel,
  Landmark,
  Music,
  Package,
  Plane,
  Receipt,
  Search,
  ShoppingCart,
  Tv,
  Utensils,
  Dumbbell,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FILTERS = [
  "All activity",
  "Income",
  "Groceries",
  "Dining",
  "Transit",
  "Subscriptions",
  "Shopping",
  "Bills",
  "Travel",
  "Health",
];

type Tx = {
  name: string;
  meta: string;
  amount: string;
  tone?: "credit" | "declined" | "pending";
  glyph: React.ReactNode;
};

const GROUPS: { label: string; items: Tx[] }[] = [
  {
    label: "Today · Fri 06 Mar",
    items: [
      {
        name: "Payroll · Aurora Health Systems",
        meta: "Income · 00:03",
        amount: "+$2,980.00",
        tone: "credit",
        glyph: <ArrowDownLeft className="size-4" />,
      },
      {
        name: "Whole Foods Market",
        meta: "Groceries · 09:41",
        amount: "-$84.27",
        glyph: <ShoppingCart className="size-4" />,
      },
      {
        name: "Blue Bottle Coffee",
        meta: "Dining · 08:12",
        amount: "-$6.75",
        glyph: <Coffee className="size-4" />,
      },
      {
        name: "Zelle · Maya Chen",
        meta: "Transfer · 07:58",
        amount: "-$120.00",
        tone: "pending",
        glyph: (
          <Avatar size="sm">
            <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">MC</AvatarFallback>
          </Avatar>
        ),
      },
      {
        name: "Muni Transit · Clipper",
        meta: "Transit · 07:31",
        amount: "-$20.00",
        glyph: <Bus className="size-4" />,
      },
    ],
  },
  {
    label: "Yesterday · Thu 05 Mar",
    items: [
      {
        name: "Shell Station 4127",
        meta: "Fuel · 18:22",
        amount: "-$52.10",
        glyph: <Fuel className="size-4" />,
      },
      {
        name: "Trader Joe's · 9th St",
        meta: "Groceries · 17:04",
        amount: "-$63.84",
        glyph: <ShoppingCart className="size-4" />,
      },
      {
        name: "Netflix",
        meta: "Subscription · 06:00",
        amount: "-$15.49",
        glyph: <Tv className="size-4" />,
      },
      {
        name: "Equinox Fitness · Market St",
        meta: "Health · 14:36",
        amount: "-$118.00",
        tone: "declined",
        glyph: <Dumbbell className="size-4" />,
      },
    ],
  },
  {
    label: "Wed 04 Mar",
    items: [
      {
        name: "City Water & Power",
        meta: "Bills · autopay",
        amount: "-$76.42",
        glyph: <Receipt className="size-4" />,
      },
      {
        name: "Spotify Premium",
        meta: "Subscription · 09:00",
        amount: "-$11.99",
        glyph: <Music className="size-4" />,
      },
      {
        name: "Amazon Marketplace",
        meta: "Shopping · 21:47",
        amount: "-$34.16",
        glyph: <Package className="size-4" />,
      },
      {
        name: "Zelle · Jonas Reuter",
        meta: "Transfer · 12:19",
        amount: "+$75.00",
        tone: "credit",
        glyph: (
          <Avatar size="sm">
            <AvatarFallback className="font-code text-[10px] dark:text-neutral-300">JR</AvatarFallback>
          </Avatar>
        ),
      },
    ],
  },
  {
    label: "Tue 03 Mar",
    items: [
      {
        name: "United Airlines 3124",
        meta: "Travel · PDX trip",
        amount: "-$312.40",
        glyph: <Plane className="size-4" />,
      },
      {
        name: "Chipotle · 3rd Ave",
        meta: "Dining · 13:08",
        amount: "-$14.20",
        glyph: <Utensils className="size-4" />,
      },
      {
        name: "Card payment · ••4127",
        meta: "Credit card · autopay",
        amount: "-$450.00",
        glyph: <CreditCard className="size-4" />,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* app bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-default-border bg-card px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-background">
              <Landmark className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Northline</p>
              <p className="font-code text-[10px] text-muted-foreground">
                Everyday Checking ·•4127
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Search transactions"
            >
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Notifications"
              className="relative"
            >
              <Bell />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="font-code text-xs dark:text-neutral-300">AR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          {/* balance card */}
          <Card className="mx-4 mt-3 flex-none gap-0 py-4">
            <CardContent className="px-4">
              <p className="font-code text-[10px] tracking-wide text-muted-foreground uppercase">
                Available balance
              </p>
              <p className="mt-1 font-code text-[34px] leading-none tabular-nums">
                $4,826.17
              </p>
              <p className="mt-1.5 font-code text-[10px] text-muted-foreground">
                + $184.00 pending · 2 items
              </p>
            </CardContent>
            <Separator className="my-3.5" />
            <div className="flex items-center justify-between gap-3 px-4">
              <div className="leading-tight">
                <p className="font-code text-[10px] text-muted-foreground">
                  Mar inflow{" "}
                  <span className="text-success-500">+$5,240.50</span>
                </p>
                <p className="mt-1 font-code text-[10px] text-muted-foreground">
                  Mar outflow <span className="text-foreground">-$3,118.33</span>
                </p>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm">
                  <ArrowUpRight /> Send
                </Button>
                <Button variant="outline" size="sm">
                  <FileText /> Statement
                </Button>
              </div>
            </div>
          </Card>

          {/* category filter strip — horizontal ScrollArea (pb-5 keeps the
              always-on thumb clear of the pills and the section below) */}
          <div className="mt-3 flex-none px-4">
            <ScrollArea type="always">
              <div className="flex w-max items-center gap-2 pt-0.5 pb-5">
                {FILTERS.map((filter, i) => (
                  <Button
                    key={filter}
                    size="sm"
                    variant={i === 0 ? "default" : "outline"}
                    className="rounded-sm"
                    aria-pressed={i === 0}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <ScrollBar
                orientation="horizontal"
                className="border-t-default-border"
              />
            </ScrollArea>
          </div>

          {/* transaction ledger — bounded vertical ScrollArea */}
          <section
            className="mt-3 flex min-h-0 flex-1 flex-col border-t border-default-border bg-card"
            aria-label="Transaction history"
          >
            <div className="flex flex-none items-baseline justify-between px-4 pt-3 pb-1">
              <h2 className="font-heading-3 text-heading-3 text-foreground">
                Transactions
              </h2>
              <span className="font-code text-[10px] text-muted-foreground">
                16 items · Mar 2026
              </span>
            </div>
            <ScrollArea
              type="always"
              className="min-h-0 flex-1 [&_[data-slot=scroll-area-scrollbar]]:mr-1.5"
              aria-label="Transaction list"
            >
              <div className="pb-3">
                {GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="bg-card px-4 pt-3 pb-1 font-code text-[10px] tracking-wide text-muted-foreground uppercase">
                      {group.label}
                    </p>
                    <ul className="divide-y divide-default-border">
                      {group.items.map((tx) => (
                        <li
                          key={tx.name}
                          className="flex items-center gap-3 py-2.5 pl-4 pr-8"
                        >
                          <span className="flex size-9 flex-none items-center justify-center rounded-sm border border-default-border bg-background text-muted-foreground">
                            {tx.glyph}
                          </span>
                          <span className="min-w-0 flex-1 leading-tight">
                            <span className="block truncate text-sm font-medium">
                              {tx.name}
                            </span>
                            <span className="block font-code text-[10px] text-muted-foreground">
                              {tx.meta}
                            </span>
                          </span>
                          <span className="flex flex-col items-end leading-tight">
                            <span
                              className={
                                tx.tone === "credit"
                                  ? "font-code text-sm tabular-nums text-success-500"
                                  : tx.tone === "declined"
                                    ? "font-code text-sm tabular-nums text-muted-foreground line-through"
                                    : "font-code text-sm tabular-nums"
                              }
                            >
                              {tx.amount}
                            </span>
                            {tx.tone === "pending" && (
                              <Badge
                                variant="secondary"
                                className="mt-0.5 font-code text-[10px]"
                              >
                                Pending
                              </Badge>
                            )}
                            {tx.tone === "declined" && (
                              <span className="mt-0.5 font-code text-[10px] font-medium text-destructive">
                                Declined
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>
        </main>

        {/* footer */}
        <footer className="flex h-10 flex-none items-center justify-between border-t border-default-border bg-card px-4">
          <span className="font-code text-[10px] text-muted-foreground">
            Last synced 09:42 PT
          </span>
          <span className="font-code text-[10px] text-muted-foreground">
            FDIC insured · Northline Bank N.A.
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
