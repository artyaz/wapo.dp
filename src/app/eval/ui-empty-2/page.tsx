"use client";

/**
 * EVAL page — empty p2 — volunteer shift coordinator — 390x844 light (phone)
 *
 * Scenario: "Rosewood Food Bank" volunteer app, phone, volunteer Maya Okafor.
 * Greeting header + March progress card + next shift card (populated, for
 * contrast) + "all roles filled" open-shifts Empty (hero) + swap-inbox Empty
 * + bottom tab bar. Co-stars: Card, Badge, Button, Progress, Avatar,
 * Separator.
 */

import {
  ArrowLeftRight,
  Bell,
  CalendarCheck2,
  CalendarDays,
  Home,
  MapPin,
  MessageSquare,
  User,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";

const TABBAR = [
  { icon: Home, label: "Home", active: true },
  { icon: CalendarDays, label: "Shifts" },
  { icon: MessageSquare, label: "Messages" },
  { icon: User, label: "Profile" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="bg-background text-foreground mx-auto flex h-dvh w-full max-w-[420px] flex-col">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="flex items-start justify-between px-4 pb-3 pt-5">
          <div>
            <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
              Rosewood Food Bank
            </p>
            <h1 className="font-heading-2 text-heading-2">
              Good morning, Maya
            </h1>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Button variant="outline" size="icon-sm" aria-label="Notifications">
              <Bell />
            </Button>
            <Avatar size="lg">
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-3">
          {/* ── March progress (populated) ────────────────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">March progress</CardTitle>
              <CardAction>
                <Badge variant="secondary" className="font-code text-[10px]">
                  18 / 24 h
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-4">
              <Progress value={75} aria-label="18 of 24 hours" />
              <div className="text-muted-foreground flex justify-between font-code text-[10px]">
                <span>4 shifts completed</span>
                <span>goal 24 h / month</span>
              </div>
            </CardContent>
          </Card>

          {/* ── Next shift (populated) ────────────────────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Next shift</CardTitle>
              <CardAction>
                <Badge variant="outline">Confirmed</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex items-center gap-3 px-4">
              <div className="bg-muted flex size-12 shrink-0 flex-col items-center justify-center rounded-lg border">
                <span className="text-muted-foreground font-code text-[9px] uppercase tracking-wider">
                  Sat
                </span>
                <span className="font-code text-base font-semibold leading-none">
                  15
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Packing line B</p>
                <p className="text-muted-foreground font-code text-[10px]">
                  09:00–13:00 · Mar 15
                </p>
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-[11px]">
                  <MapPin className="size-3" />
                  Warehouse 2, Alameda dock
                </p>
              </div>
              <AvatarGroup>
                <Avatar size="sm">
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>PT</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </CardContent>
          </Card>

          {/* ── Open shifts — all roles filled (HERO Empty) ───────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">
                Open shifts · week of Mar 10
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <Empty className="border border-dashed p-6">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CalendarCheck2 />
                  </EmptyMedia>
                  <EmptyTitle className="text-base">All roles filled</EmptyTitle>
                  <EmptyDescription>
                    All 36 roles for the Mar 10–16 packing week are covered.
                    New roles post every Thursday at 17:00.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" size="sm">
                    Notify me about new roles
                  </Button>
                  <EmptyDescription className="text-xs">
                    214 volunteers are on this week&rsquo;s roster.
                  </EmptyDescription>
                </EmptyContent>
              </Empty>
            </CardContent>
          </Card>

          {/* ── Swap inbox (Empty, muted) ─────────────────────────── */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Swap requests</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <Empty className="bg-muted/30 p-5">
                <EmptyHeader>
                  <EmptyMedia>
                    <ArrowLeftRight className="text-muted-foreground size-6" />
                  </EmptyMedia>
                  <EmptyTitle className="text-base">
                    No swaps in your inbox
                  </EmptyTitle>
                  <EmptyDescription>
                    Cover requests from teammates will appear here. You have no
                    pending asks right now.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CardContent>
          </Card>
        </div>

        {/* ── Tab bar ─────────────────────────────────────────────── */}
        <nav className="border-t">
          <div className="grid grid-cols-4">
            {TABBAR.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`flex flex-col items-center gap-1 py-2.5 text-[10px] ${
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </div>
        </nav>
      </div>
    </EvalShell>
  );
}
