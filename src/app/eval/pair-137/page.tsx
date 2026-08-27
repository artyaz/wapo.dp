"use client";

/**
 * pair-137 — compact pricing-comparison sheet (phone-half surface).
 * Components: ds:WaveformStrip, ui:collapsible, ui:avatar
 * Conditions: 390x420, dark theme, ltr.
 *
 * Scenario: "Pulse FM" podcast-hosting upgrade sheet. A waveform strip shows
 * this cycle's published audio (usage against the Starter plan's minute
 * allowance), the workspace avatar group shows the team that has to fit the
 * plan, and a default-open collapsible carries the full feature comparison
 * between the two tiers.
 */

import React from "react";
import { Check, ChevronDown, Minus } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { WaveformStrip } from "@/components/ds/WaveformStrip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

const COMPARISON: Array<{
  label: string;
  starter: string | boolean;
  studio: string | boolean;
}> = [
  { label: "Audio minutes", starter: "150 / mo", studio: "Unlimited" },
  { label: "Transcription", starter: false, studio: true },
  { label: "Team seats", starter: "1", studio: "12" },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <Check
        aria-label="Included"
        className="size-3.5 shrink-0 text-foreground"
      />
    );
  }
  if (value === false) {
    return (
      <Minus
        aria-label="Not included"
        className="size-3.5 shrink-0 text-neutral-500"
      />
    );
  }
  return (
    <span className="text-[11px] leading-4 text-neutral-500">{value}</span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex w-full flex-col px-3 pb-2.5 pt-3">
        {/* header — workspace identity + team that has to fit the plan */}
        <header className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-caption text-caption text-neutral-500">
              Pulse FM · 8 members
            </p>
            <h1 className="font-heading-3 text-heading-3 text-foreground">
              Compare plans
            </h1>
          </div>
          <AvatarGroup className="shrink-0">
            <Avatar>
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>SO</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
        </header>

        {/* usage — this cycle's published audio vs the Starter allowance */}
        <section
          aria-label="Audio usage this cycle"
          className="mt-1.5 rounded-lg border border-solid border-default-border bg-panel p-2.5"
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
              audio usage · ep-24 field-rec.wav
            </span>
            <span className="shrink-0 font-code text-[11px] text-neutral-400">
              142 / 150 min
            </span>
          </div>
          <div className="mt-1.5 h-9">
            <WaveformStrip />
          </div>
        </section>

        {/* the two tiers */}
        <section aria-label="Plans" className="mt-1.5 grid grid-cols-2 gap-2.5">
          <div className="flex flex-col rounded-lg border border-solid border-default-border bg-panel p-2.5">
            <div className="flex items-center justify-between gap-1.5">
              <span className="font-caption text-caption font-medium text-foreground">
                Starter
              </span>
              <span className="rounded-full border border-solid border-default-border px-1.5 py-px text-[9px] font-medium uppercase leading-3 tracking-[0.06em] text-neutral-500">
                Current
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[18px] font-semibold leading-6 text-foreground">
                $9
              </span>
              <span className="text-[11px] leading-4 text-neutral-500">
                / month
              </span>
            </div>
            <div className="mt-1.5 flex flex-col gap-0.5">
              <span className="text-[11px] leading-4 text-neutral-500">
                150 audio minutes / mo
              </span>
              <span className="text-[11px] leading-4 text-neutral-500">
                1 show · 1 seat
              </span>
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-solid border-neutral-400 bg-panel p-2.5">
            <div className="flex items-center justify-between gap-1.5">
              <span className="font-caption text-caption font-medium text-foreground">
                Studio
              </span>
              <span className="rounded-full bg-foreground px-1.5 py-px text-[9px] font-medium uppercase leading-3 tracking-[0.06em] text-background">
                Best value
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[18px] font-semibold leading-6 text-foreground">
                $29
              </span>
              <span className="text-[11px] leading-4 text-neutral-500">
                / month
              </span>
            </div>
            <div className="mt-1.5 flex flex-col gap-0.5">
              <span className="text-[11px] leading-4 text-neutral-500">
                Unlimited audio minutes
              </span>
              <span className="text-[11px] leading-4 text-neutral-500">
                Transcription · 12 seats
              </span>
            </div>
          </div>
        </section>

        {/* full comparison, open by default */}
        <Collapsible
          defaultOpen
          className="mt-1.5 rounded-lg border border-solid border-default-border bg-panel"
        >
          <CollapsibleTrigger
            render={
              <button
                type="button"
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left font-caption text-caption font-medium text-foreground hover:bg-neutral-200/50 focus-visible:outline-1 focus-visible:outline-neutral-500"
              >
                Full feature comparison
                <ChevronDown className="ml-auto size-4 shrink-0 text-neutral-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            }
          />
          <CollapsibleContent>
            <div className="border-t border-solid border-default-border px-2.5 py-2.5">
              <div className="mb-1 grid grid-cols-[1fr_64px_76px] items-baseline">
                <span />
                <span className="text-right text-[10px] font-medium uppercase leading-3 tracking-[0.06em] text-neutral-500">
                  Starter
                </span>
                <span className="text-right text-[10px] font-medium uppercase leading-3 tracking-[0.06em] text-neutral-500">
                  Studio
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {COMPARISON.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_64px_76px] items-center"
                  >
                    <span className="text-[11px] leading-4 text-muted-foreground">
                      {row.label}
                    </span>
                    <div className="flex justify-end">
                      <Cell value={row.starter} />
                    </div>
                    <div className="flex justify-end">
                      <Cell value={row.studio} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </EvalShell>
  );
}
