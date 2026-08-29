"use client";

/**
 * EVAL page — radio-group p2 — volunteer shift coordinator — 430x932 light
 *
 * Phone screen for "Harvest Table", the volunteer app of a community
 * kitchen. Saturday shift signup: volunteers pick exactly one role, so the
 * screen is built around two RadioGroups — a role choice-card list (with
 * slot meters, an urgent-needs badge and a genuinely disabled "full" role)
 * and a cadence fieldset ("how often can you join?") — plus a summary card
 * with the CTA.
 * Other ui/* components: Alert, Badge, Button, Card, Avatar(+Group),
 * Progress, Separator.
 */

import {
  Bell,
  CalendarCheck,
  Car,
  CheckCircle2,
  HeartHandshake,
  House,
  MessageCircle,
  Sparkles,
  TriangleAlert,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Role = {
  id: string;
  name: string;
  icon: typeof UtensilsCrossed;
  time: string;
  lead: string;
  filled: number;
  total: number;
  urgent?: boolean;
  full?: boolean;
};

const ROLES: Role[] = [
  {
    id: "prep",
    name: "Prep kitchen",
    icon: UtensilsCrossed,
    time: "08:00 – 11:00",
    lead: "Lead: Marta Reyes",
    filled: 6,
    total: 8,
  },
  {
    id: "serving",
    name: "Serving line",
    icon: HeartHandshake,
    time: "11:00 – 14:00",
    lead: "Lead: Owen Baptiste",
    filled: 7,
    total: 10,
    urgent: true,
  },
  {
    id: "driver",
    name: "Delivery driver",
    icon: Car,
    time: "10:00 – 13:00",
    lead: "Own car · 3 stops",
    filled: 2,
    total: 3,
  },
  {
    id: "cleanup",
    name: "Cleanup crew",
    icon: Sparkles,
    time: "14:00 – 16:00",
    lead: "Lead: June Park",
    filled: 5,
    total: 5,
    full: true,
  },
];

const CADENCE = [
  { id: "weekly", label: "Every Saturday", hint: "Recurring — we'll hold your spot weekly." },
  { id: "biweekly", label: "Every other week", hint: "We'll remind you the Monday before." },
  { id: "once", label: "Just this week", hint: "One-time signup, no commitment." },
];

const CREW = [
  { initials: "MR", name: "Marta Reyes" },
  { initials: "OB", name: "Owen Baptiste" },
  { initials: "TK", name: "Tomas Kovač" },
  { initials: "JD", name: "Jia Deng" },
  { initials: "AF", name: "Amara Fowler" },
];

const NAV = [
  { icon: House, label: "Shifts", active: true },
  { icon: CalendarCheck, label: "My schedule", active: false },
  { icon: MessageCircle, label: "Messages", active: false },
  { icon: UserRound, label: "Profile", active: false },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* app bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-default-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <HeartHandshake className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Harvest Table</p>
              <p className="font-code text-[10px] text-muted-foreground">
                SE Portland kitchen
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <Bell />
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-4 px-4 pt-4">
          {/* heading — serif reading role */}
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Claim a Saturday shift
            </h1>
            <p className="mt-0.5 font-code text-xs text-muted-foreground">
              Sat 13 Jun · doors 10:30 · lunch for ~180 guests
            </p>
          </div>

          {/* urgent need — warning used only where meaning demands it */}
          <Alert className="border-warning-500/30">
            <TriangleAlert className="text-warning-600" />
            <AlertTitle className="text-warning-600">
              Serving line is short 3 people
            </AlertTitle>
            <AlertDescription>
              Saturday lunch covers 181 meal kits — the line can’t start plating
              below 10 volunteers.
            </AlertDescription>
          </Alert>

          {/* role choice cards — single-select RadioGroup */}
          <section className="flex flex-col gap-2.5">
            <h2 className="font-heading-3 text-heading-3 text-foreground">
              Pick your role
            </h2>
            <RadioGroup defaultValue="serving" className="gap-2.5">
              {ROLES.map((role) => (
                <FieldLabel key={role.id} htmlFor={`role-${role.id}`} className="block">
                  <div
                    className={
                      role.full
                        ? "flex items-start gap-3 rounded-lg border border-default-border bg-muted/40 p-3.5 opacity-70"
                        : "flex items-start gap-3 rounded-lg border border-default-border bg-card p-3.5 transition-colors has-[button[data-state=checked]]:border-foreground/40 has-[button[data-state=checked]]:bg-accent/60"
                    }
                  >
                    <RadioGroupItem
                      value={role.id}
                      id={`role-${role.id}`}
                      disabled={role.full}
                      className="mt-0.5"
                    />
                    <FieldContent className="gap-1">
                      <span className="flex w-full items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-sm leading-none font-medium">
                          <role.icon className="size-4 text-muted-foreground" />
                          {role.name}
                        </span>
                        {role.urgent ? (
                          <Badge
                            variant="outline"
                            className="border-warning-500/40 text-warning-600"
                          >
                            Needs 3 more
                          </Badge>
                        ) : role.full ? (
                          <Badge variant="secondary">Full</Badge>
                        ) : null}
                      </span>
                      <span className="font-code text-xs tabular-nums text-muted-foreground">
                        {role.time} · {role.lead}
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <Progress
                          value={(role.filled / role.total) * 100}
                          className={
                            role.full
                              ? "h-1.5 flex-1 opacity-40"
                              : "h-1.5 flex-1"
                          }
                          aria-label={`${role.filled} of ${role.total} slots filled`}
                        />
                        <span className="font-code text-[10px] tabular-nums text-muted-foreground">
                          {role.filled}/{role.total}
                        </span>
                      </span>
                    </FieldContent>
                  </div>
                </FieldLabel>
              ))}
            </RadioGroup>
          </section>

          {/* cadence — fieldset with legend */}
          <section>
            <FieldSet className="gap-3.5 p-4">
              <FieldLegend
                variant="label"
                className="font-heading-3 text-[17px] leading-[23px] font-semibold"
              >
                How often can you join?
              </FieldLegend>
              <RadioGroup defaultValue="biweekly" className="gap-3">
                {CADENCE.map((cad) => (
                  <Field key={cad.id} orientation="horizontal" className="items-start">
                    <RadioGroupItem value={cad.id} id={`cad-${cad.id}`} className="mt-0.5" />
                    <FieldContent className="gap-0.5">
                      <FieldLabel htmlFor={`cad-${cad.id}`} className="font-normal">
                        {cad.label}
                      </FieldLabel>
                      <FieldDescription>{cad.hint}</FieldDescription>
                    </FieldContent>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>
          </section>

          {/* summary card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading-3 text-heading-3">
                Your Saturday
              </CardTitle>
              <CardDescription>
                Serving line · 11:00 – 14:00 · arrives 10:45 for briefing.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AvatarGroup>
                    {CREW.map((member) => (
                      <Avatar key={member.initials} className="size-6">
                        <AvatarFallback className="text-[10px]">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="text-xs text-muted-foreground">
                    7 volunteers signed up
                  </span>
                </span>
                <span className="flex items-center gap-1 font-code text-[10px] text-success-600">
                  <CheckCircle2 className="size-3.5" />
                  meal credit +1
                </span>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <Button className="w-full">Claim Saturday shift</Button>
                <Button variant="ghost" className="w-full">
                  Not this week
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* bottom tab bar — in-flow surface: flat panel + hairline */}
        <nav className="mt-auto flex flex-none items-stretch justify-around border-t border-default-border bg-card px-2 py-2">
          {NAV.map((item) => (
            <span
              key={item.label}
              className={
                item.active
                  ? "flex flex-col items-center gap-1 rounded-sm px-3 py-1 text-[10px] font-medium text-foreground"
                  : "flex flex-col items-center gap-1 rounded-sm px-3 py-1 text-[10px] text-muted-foreground"
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </span>
          ))}
        </nav>
      </div>
    </EvalShell>
  );
}
