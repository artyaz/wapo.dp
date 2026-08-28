"use client";

/**
 * EVAL page — alert p1 — HR onboarding checklist for new hires — 390x844 light.
 *
 * Alert drives the "Today's updates" stack: destructive (payroll ID blocker),
 * warning (benefits deadline), success (paperwork filed), default/info
 * (laptop shipping, with an AlertAction). Co-stars: Avatar, Progress, Badge,
 * Card, Checkbox, Label, Button.
 */

import React from "react";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
  TruckIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const tasks = [
  {
    id: "offer",
    label: "Sign offer letter and NDA",
    meta: "Jun 9",
    done: true,
  },
  {
    id: "id-docs",
    label: "Re-upload ID for payroll",
    meta: "Blocker",
    done: false,
    blocker: true,
  },
  {
    id: "training",
    label: "Finish security training",
    meta: "Due Fri",
    done: false,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-background text-foreground">
        {/* ---------- Header ---------- */}
        <header className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Foxglove Systems · People Ops
            </p>
            <h1 className="mt-1 font-heading-1 text-[26px] leading-tight text-foreground">
              Welcome, Priya
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Customer Success Specialist · Day 3 of 5
            </p>
          </div>
          <Avatar size="lg" className="mt-1">
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </header>

        {/* ---------- Setup progress ---------- */}
        <section className="px-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Setup progress
            </span>
            <span className="font-code text-xs text-muted-foreground">
              11 of 16 tasks · 69%
            </span>
          </div>
          <Progress
            value={69}
            className="mt-2 h-1.5"
            aria-label="Onboarding setup progress, 11 of 16 tasks complete"
          />
        </section>

        {/* ---------- Today's updates (Alert stack) ---------- */}
        <section className="mt-3 px-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading-3 text-base leading-tight text-foreground">
              Today&rsquo;s updates
            </h2>
            <span className="font-code text-xs text-muted-foreground">
              Wed, Jun 11
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {/* Destructive — real blocker (tinted panel, parallel to warning/success) */}
            <Alert className="border-destructive-200 bg-destructive-50 text-destructive-900">
              <CircleAlertIcon />
              <AlertTitle>ID verification failed</AlertTitle>
              <AlertDescription className="text-neutral-600">
                Direct-deposit name doesn&rsquo;t match your passport. Re-upload
                both to unblock payroll.
              </AlertDescription>
            </Alert>

            {/* Warning — genuine deadline */}
            <Alert className="border-warning-200 bg-warning-50 text-warning-900">
              <TriangleAlertIcon />
              <AlertTitle>Benefits enrollment closes Friday</AlertTitle>
              <AlertDescription className="text-neutral-600">
                Choose a 2026 health plan by Fri, Jun 13, 5:00 PM ET, or
                you&rsquo;ll get the default PPO.
              </AlertDescription>
            </Alert>

            {/* Success — verified paperwork */}
            <Alert className="border-success-200 bg-success-50 text-success-900">
              <CircleCheckIcon />
              <AlertTitle>Paperwork is on file</AlertTitle>
              <AlertDescription className="text-neutral-600">
                I-9, W-4, and NDA are verified and filed with People Ops.
                No action needed.
              </AlertDescription>
            </Alert>

            {/* Info — monochrome, with an action */}
            <Alert>
              <TruckIcon />
              <AlertTitle>Your laptop ships today</AlertTitle>
              <AlertDescription className="text-neutral-600">
                MacBook Air 13&quot; lands Thu, Jun 12 before 6 PM.
                Signature required.
              </AlertDescription>
              <AlertAction>
                <Button size="xs" variant="outline">
                  Track
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </section>

        {/* ---------- This week's checklist ---------- */}
        <section className="mt-3 px-4">
          <Card className="gap-0 py-0">
            <CardHeader className="border-b border-default-border px-4 py-2.5">
              <CardTitle className="font-heading-3 text-base leading-tight">
                This week
              </CardTitle>
              <CardAction>
                <Badge variant="secondary">2 open</Badge>
              </CardAction>
            </CardHeader>
            <ul className="px-4 py-1">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 border-b border-default-border py-2 last:border-b-0"
                >
                  <Checkbox
                    id={`task-${task.id}`}
                    defaultChecked={task.done}
                    aria-label={task.label}
                  />
                  <Label
                    htmlFor={`task-${task.id}`}
                    className="flex-1 text-sm font-normal leading-snug"
                  >
                    {task.label}
                  </Label>
                  {task.blocker ? (
                    <Badge variant="outline">{task.meta}</Badge>
                  ) : (
                    <span className="shrink-0 font-code text-[11px] text-muted-foreground">
                      {task.meta}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* ---------- Footer ---------- */}
        <footer className="mt-auto px-4 pb-5 pt-3">
          <Button size="lg" className="w-full">
            Continue setup
          </Button>
          <p className="mt-2.5 text-center font-code text-[10px] text-muted-foreground">
            Manager: Dana Whitfield · people@foxglove.io · ext. 4127
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
