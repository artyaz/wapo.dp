"use client";

/**
 * EVAL page — input-otp p2 — recipe meal-plan weekly planner — 1920x1080 dark
 *
 * Scenario: "Pantry" desktop app — the Alvarez family weekly meal planner.
 * The right rail pairs InputOTP twice: a partially-entered SMS code for
 * grocery-delivery updates (with separator) and an invalid household invite
 * code (aria-invalid state + destructive alert). Co-stars: Tabs, Card, Badge,
 * Button, Avatar, Progress, Alert, Field.
 */

import * as React from "react";
import {
  BookOpen,
  CalendarDays,
  Carrot,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MessageSquareOffIcon,
  PlusIcon,
  RefreshCwIcon,
  ShareIcon,
  ShoppingCart,
  Users,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NAV = [
  { icon: CalendarDays, label: "This week", active: true },
  { icon: BookOpen, label: "Recipe box", active: false },
  { icon: Carrot, label: "Pantry", active: false },
  { icon: ShoppingCart, label: "Shopping list", active: false },
  { icon: Users, label: "Household", active: false },
];

const WEEK = [
  {
    day: "Mon",
    date: "Mar 3",
    meals: [
      { slot: "Breakfast", name: "Greek yogurt & honey bowl", kcal: "320 kcal" },
      { slot: "Dinner", name: "Sheet-pan harissa salmon", tag: "35 min", kcal: "560 kcal" },
    ],
  },
  {
    day: "Tue",
    date: "Mar 4",
    meals: [{ slot: "Dinner", name: "Miso butter ramen", tag: "25 min", kcal: "480 kcal" }],
  },
  {
    day: "Wed",
    date: "Mar 5",
    meals: [
      { slot: "Breakfast", name: "Overnight oats, blueberry", kcal: "290 kcal" },
      { slot: "Dinner", name: "Chicken tinga tacos", tag: "kid pick", kcal: "520 kcal" },
    ],
  },
  {
    day: "Thu",
    date: "Mar 6",
    meals: [
      { slot: "Dinner", name: "White bean & greens stew", tag: "vegan", kcal: "410 kcal" },
    ],
  },
  {
    day: "Fri",
    date: "Mar 7",
    meals: [
      { slot: "Dinner", name: "Cast-iron pizza night", tag: "40 min", kcal: "680 kcal" },
    ],
  },
  {
    day: "Sat",
    date: "Mar 8",
    meals: [
      { slot: "Dinner", name: "Slow-roast pork ragù", tag: "2 h 15", kcal: "610 kcal" },
    ],
  },
  {
    day: "Sun",
    date: "Mar 9",
    meals: [
      { slot: "Breakfast", name: "Sourdough & soft eggs", kcal: "350 kcal" },
      { slot: "Dinner", name: "Roast chicken, root veg", kcal: "590 kcal" },
    ],
  },
];

const HOUSEHOLD = [
  { initials: "NA", name: "Nadia" },
  { initials: "MA", name: "Mara" },
  { initials: "LU", name: "Luis" },
  { initials: "TO", name: "Tomás" },
];

export default function Page() {
  // Controlled OTPs: mid-entry SMS code (2 of 6) and a rejected invite code.
  const [deliveryCode, setDeliveryCode] = React.useState("83");
  const [inviteCode, setInviteCode] = React.useState("204791");

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full">
        {/* ---- Sidebar ---- */}
        <aside className="flex w-60 shrink-0 flex-col gap-6 border-e border-default-border px-4 pt-5 pb-14">
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex size-9 items-center justify-center rounded-md border border-default-border bg-card">
              <Carrot className="size-4.5 text-foreground" />
            </div>
            <div>
              <p className="font-heading-3 text-sm leading-tight text-foreground">
                Pantry
              </p>
              <p className="text-caption font-caption text-muted-foreground">
                Alvarez Family Kitchen
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                  item.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
                {item.label === "Shopping list" && (
                  <Badge variant="secondary" className="ms-auto font-code">
                    14
                  </Badge>
                )}
              </span>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center gap-2.5 rounded-md border border-default-border bg-card px-2.5 py-2">
              <Avatar className="size-8">
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Nadia Alvarez
                </span>
                <span className="text-caption font-caption text-muted-foreground">
                  Household admin
                </span>
              </div>
            </div>
            <span className="px-2 font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              pantry v3.7 · saved 2 min ago
            </span>
          </div>
        </aside>

        {/* ---- Main column ---- */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 px-8 py-6">
          <header className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-1">
              <p className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                week 10 of 2026 · 12 of 21 meals planned
              </p>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Week of March 3 – 9
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm" aria-label="Previous week">
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Next week">
                <ChevronRightIcon className="size-4" />
              </Button>
              <Button variant="outline">
                <ShareIcon />
                Share plan
              </Button>
              <Button>
                <PlusIcon />
                Add meal
              </Button>
            </div>
          </header>

          <Tabs defaultValue="plan" className="gap-4">
            <TabsList>
              <TabsTrigger value="plan">Week plan</TabsTrigger>
              <TabsTrigger value="list">Shopping list</TabsTrigger>
            </TabsList>

            <TabsContent value="plan" className="mt-0">
              <div className="grid grid-cols-7 gap-3">
                {WEEK.map((d) => (
                  <div
                    key={d.date}
                    className="flex flex-col gap-2 rounded-lg border border-default-border bg-card p-3"
                  >
                    <div className="flex flex-col gap-0.5 border-b border-default-border pb-2">
                      <span className="text-sm font-medium text-foreground">
                        {d.day}
                      </span>
                      <span className="font-code text-xs text-muted-foreground">
                        {d.date}
                      </span>
                    </div>
                    {d.meals.map((m) => (
                      <div
                        key={m.name}
                        className="flex flex-col gap-1.5 rounded-md border border-default-border px-2.5 py-2"
                      >
                        <span className="font-code text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          {m.slot}
                        </span>
                        <span className="text-sm leading-snug text-foreground">
                          {m.name}
                        </span>
                        <span className="flex items-center justify-between">
                          {m.tag ? (
                            <Badge variant="secondary" className="font-code">
                              {m.tag}
                            </Badge>
                          ) : (
                            <span />
                          )}
                          <span className="font-code text-xs text-muted-foreground">
                            {m.kcal}
                          </span>
                        </span>
                      </div>
                    ))}
                    <span className="flex items-center justify-center gap-1 rounded-md border border-dashed border-default-border py-1.5 text-caption font-caption text-muted-foreground">
                      <PlusIcon className="size-3.5" />
                      add slot
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <Card className="max-w-xl gap-3 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="text-sm">This week&rsquo;s list</CardTitle>
                  <CardDescription>
                    Auto-built from 12 planned meals · Fresh Cart Market.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5 font-code text-sm text-muted-foreground">
                  14 items · est. $132.40
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* ---- Right rail ---- */}
        <div className="flex w-[360px] shrink-0 flex-col gap-4 border-s border-default-border px-5 py-6">
          {/* Delivery verification — partially filled OTP with separator */}
          <Card className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Grocery delivery</CardTitle>
              <CardDescription>
                Friday 5–7 pm · Fresh Cart Market. Verify your phone for SMS
                updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5">
              <Field>
                <FieldLabel htmlFor="delivery-otp" className="text-caption font-caption">
                  Code sent to +34 612 •• ••41
                </FieldLabel>
                <InputOTP
                  id="delivery-otp"
                  maxLength={6}
                  value={deliveryCode}
                  onChange={setDeliveryCode}
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2" />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="text-center">
                  2 of 6 digits entered · expires in{" "}
                  <span className="font-code">07:20</span>
                </FieldDescription>
              </Field>
              <Button className="w-full">
                <RefreshCwIcon />
                Send a new code
              </Button>
            </CardContent>
          </Card>

          {/* Household invite — invalid OTP state */}
          <Card className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Household invite</CardTitle>
              <CardDescription>
                Add a member by entering the 6-digit code from their invite.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5">
              <Field>
                <FieldLabel htmlFor="invite-otp" className="text-caption font-caption">
                  Invite code
                </FieldLabel>
                <InputOTP
                  id="invite-otp"
                  maxLength={6}
                  value={inviteCode}
                  onChange={setInviteCode}
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} aria-invalid />
                    <InputOTPSlot index={1} aria-invalid />
                    <InputOTPSlot index={2} aria-invalid />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2" />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} aria-invalid />
                    <InputOTPSlot index={4} aria-invalid />
                    <InputOTPSlot index={5} aria-invalid />
                  </InputOTPGroup>
                </InputOTP>
              </Field>
              <Alert variant="destructive">
                <MessageSquareOffIcon />
                <AlertTitle>That code didn&rsquo;t match</AlertTitle>
                <AlertDescription>
                  Invite codes expire after 10 minutes. Ask Mara to resend from
                  her app.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Household members */}
          <Card className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Members</CardTitle>
              <CardDescription>Sharing 42 saved recipes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5">
              <div className="flex items-center gap-2">
                {HOUSEHOLD.map((m) => (
                  <Avatar key={m.initials} className="size-8 border border-default-border">
                    <AvatarFallback>{m.initials}</AvatarFallback>
                  </Avatar>
                ))}
                <span className="ms-1 text-caption font-caption text-muted-foreground">
                  {HOUSEHOLD.map((m) => m.name).join(" · ")}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-caption font-caption text-muted-foreground">
                    <ClockIcon className="size-3.5" />
                    Week completeness
                  </span>
                  <span className="font-code text-xs text-foreground">12 / 21</span>
                </div>
                <Progress value={57} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EvalShell>
  );
}
