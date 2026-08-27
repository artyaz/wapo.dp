"use client";

/**
 * EVAL page (pair-148) — user profile page on a laptop (1024x768), light, ltr.
 * Components: ui:card, ds:CandleSeries, ui:dropdown-menu.
 *
 * Scenario: Dana Reyes' public investing profile in "Praxis Portfolio".
 * The account dropdown hangs open from the avatar in the top bar (defaultOpen)
 * over the quiet right side of the Account card; the profile card and the
 * performance card (CandleSeries + quote stats) stay fully visible.
 */

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CandleSeries } from "@/components/ds/CandleSeries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BadgeCheckIcon,
  BellIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CreditCardIcon,
  DownloadIcon,
  Link2Icon,
  LogOutIcon,
  MapPinIcon,
} from "lucide-react";

const accountRows = [
  { label: "Plan", value: "Pro · annual" },
  { label: "Two-factor", value: "Enabled", positive: true },
  { label: "Region", value: "EU · Frankfurt" },
  { label: "Active sessions", value: "3 devices" },
];

const quoteRows = [
  { label: "Day range", value: "103.1 – 108.4" },
  { label: "Session volume", value: "2.8M" },
  { label: "52W high", value: "112.70" },
  { label: "52W low", value: "94.16" },
  { label: "Sharpe · 1y", value: "1.18" },
  { label: "Max drawdown", value: "−6.3%", negative: true },
];

const profileStats = [
  { value: "$128.4k", label: "Portfolio value" },
  { value: "14", label: "Open positions" },
  { value: "68%", label: "Win rate" },
  { value: "2019", label: "Member since" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* ---------- top bar ---------- */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-border px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                Praxis Portfolio
              </span>
              <span className="text-xs leading-tight text-muted-foreground">
                Profile
              </span>
            </div>
          </div>

          {/* account menu — open by default so the menu surface is visible */}
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-10 gap-2 rounded-full px-2">
                  <Avatar>
                    <AvatarImage
                      src="https://avatar.vercel.sh/dana-reyes"
                      alt="Dana Reyes"
                    />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Dana Reyes</span>
                  <ChevronDownIcon className="size-4 text-muted-foreground" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>Dana Reyes</span>
                <span className="text-xs font-normal text-muted-foreground">
                  dana.reyes@praxis.dev
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                  <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* ---------- profile body ---------- */}
        <main className="mx-auto w-full max-w-[928px] flex-1 pt-6">
          <div className="grid grid-cols-[300px_minmax(0,1fr)] items-start gap-6">
            {/* ----- left: identity card (ui:card) ----- */}
            <Card>
              <CardHeader>
                <Avatar className="size-16">
                  <AvatarImage
                    src="https://avatar.vercel.sh/dana-reyes"
                    alt="Dana Reyes"
                  />
                  <AvatarFallback className="text-lg font-medium">
                    DR
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-2 flex items-center gap-1.5 text-lg">
                  Dana Reyes
                  <BadgeCheckIcon className="size-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  @dana.reyes · Portfolio strategist
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">Pro</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Index-first investor. Quarterly rebalancing, long horizons,
                  and notes on market structure.
                </p>
                <div className="flex flex-col gap-2.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon className="size-3.5" />
                    Berlin, DE
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDaysIcon className="size-3.5" />
                    Joined Mar 2021
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Link2Icon className="size-3.5" />
                    dana.reyes.dev
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border pt-4">
                  {profileStats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1">
                      <span className="text-base font-semibold leading-none">
                        {s.value}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm">
                  Share
                </Button>
                <Button size="sm" className="flex-1">
                  Edit profile
                </Button>
              </CardFooter>
            </Card>

            {/* ----- right column ----- */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* account card — the open avatar menu floats over its quiet right side */}
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Plan, sign-in and data controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex max-w-[320px] flex-col">
                    {accountRows.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-b-0"
                      >
                        <span className="text-xs text-muted-foreground">
                          {r.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                          {r.positive ? (
                            <span className="size-1.5 rounded-full bg-success-500" />
                          ) : null}
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* performance card (ui:card + ds:CandleSeries) */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal index</CardTitle>
                  <CardDescription>
                    Praxis daily composite (PXN) · last 14 sessions · daily
                    close
                  </CardDescription>
                  <CardAction>
                    <div className="flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-1">
                      <span className="font-code text-[12px] font-medium tabular-nums">
                        107.62
                      </span>
                      <span className="font-code text-[11px] tabular-nums text-success-600">
                        +2.41%
                      </span>
                    </div>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6">
                    <CandleSeries />
                    <div className="flex min-w-0 flex-1 flex-col">
                      {quoteRows.map((r) => (
                        <div
                          key={r.label}
                          className="flex items-baseline justify-between gap-4 border-b border-border py-[6px] last:border-b-0"
                        >
                          <span className="font-code text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                            {r.label}
                          </span>
                          <span
                            className={`font-code text-[12px] font-medium tabular-nums ${
                              r.negative ? "text-destructive-600" : ""
                            }`}
                          >
                            {r.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-[1px] bg-success-500" />
                      up sessions
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-[1px] bg-destructive-500" />
                      down sessions
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-[1px] bg-neutral-300" />
                      volume
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <DownloadIcon />
                    Export CSV
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <footer className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>Praxis profile · dana.reyes</span>
            <span>Visibility: public · Last saved just now</span>
          </footer>
        </main>
      </div>
    </EvalShell>
  );
}
