"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { TrackHeader } from "@/components/ds/TrackHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  type: "audio" | "video" | "text";
  price: string;
  cadence: string;
  includes: string;
  solo?: boolean;
  locked?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    type: "text",
    price: "$0",
    cadence: "forever",
    includes: "3 projects · MP3 export",
  },
  {
    name: "Creator",
    type: "audio",
    price: "$12",
    cadence: "/month",
    includes: "Unlimited audio · WAV stems",
    solo: true,
  },
  {
    name: "Studio",
    type: "video",
    price: "$29",
    cadence: "/month",
    includes: "4K video · 5 seats · priority mix",
    locked: true,
  },
];

export default function Page() {
  // Announce the applied billing terms once the comparison is on screen.
  // Dispatched slightly after mount so the app-level <Toaster /> mounted in
  // the root layout has subscribed its store listener. Kept open
  // (duration: Infinity) so the notification persists on screen.
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      toast.add({
        title: "Annual billing applied",
        description: "Prices locked for 12 months — Studio saves 20%.",
        type: "success",
        duration: Infinity,
      });
    }, 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <main className="mx-auto flex w-full max-w-[430px] flex-col px-4 pb-8 pt-24">
        <header>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Praxis Studio
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Compare plans
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a plan for your studio — billed annually.
          </p>
        </header>

        {/* Column captions aligned to the 180px track-label column */}
        <div className="mt-6 flex items-baseline px-1 pb-2">
          <span className="w-[180px] shrink-0 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Plan
          </span>
          <span className="pl-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Price · includes
          </span>
        </div>

        {/* Plan comparison board — each tier is a track row */}
        <section className="flex flex-col gap-3" aria-label="Plan comparison">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="flex w-full items-stretch overflow-hidden rounded-lg border border-solid border-default-border bg-panel"
            >
              <TrackHeader
                trackName={plan.name}
                trackType={plan.type}
                solo={plan.solo}
                locked={plan.locked}
              />
              <div className="flex min-w-0 grow flex-col justify-center gap-1 border-l border-solid border-default-border bg-neutral-50 px-3 py-2.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-semibold leading-none text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
                <p className="text-xs leading-snug text-muted-foreground">
                  {plan.includes}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Enterprise tier — custom quote still being prepared */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-solid border-default-border bg-panel px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Enterprise</p>
            <p className="text-xs leading-snug text-muted-foreground">
              Custom studio pricing · unlimited seats
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            <Spinner data-icon="inline-start" />
            Quote pending
          </Badge>
        </div>

        <p className="mt-4 px-1 text-xs leading-relaxed text-muted-foreground">
          Studio includes everything in Creator, plus 4K video export, shared
          team seats and priority mix rendering.
        </p>

        <div className="mt-5">
          <Button size="lg" className="w-full">
            Continue with Studio — $29/mo
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Switch or cancel anytime · prices exclude tax
          </p>
        </div>
      </main>
    </EvalShell>
  );
}
