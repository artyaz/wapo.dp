"use client";

/**
 * EVAL page (pair-141) — ui:empty + ds:DialogLayout + ds:FormSection
 * Conditions: phone 390x844, dark theme, ltr, no constraint.
 * Scenario: a pricing comparison — the "Upgrade plan" flow of a workspace
 * product. A plan comparison grid leads, ds:FormSection groups the
 * billing-cycle choice, ui:empty holds the add-ons region, and an open
 * ds:DialogLayout confirmation ("Switch to Pro?") sits over the checkout
 * summary at the bottom of the screen.
 */

import React from "react";
import { Check, ChevronLeft, Puzzle } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button as UIButton } from "@/components/ui/button";
import { DialogLayout } from "@/components/ds/DialogLayout";
import { FormSection } from "@/components/ds/FormSection";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";
import { cn } from "@/lib/utils";

type Cycle = "annual" | "monthly";

const features = [
  { label: "Members", free: "2", pro: "25", scale: "Unlimited" },
  { label: "Projects", free: "3", pro: "50", scale: "Unlimited" },
  { label: "Storage", free: "2 GB", pro: "250 GB", scale: "1 TB" },
] as const;

const cycles: Record<
  Cycle,
  {
    label: string;
    sub: string;
    pro: number;
    scale: number;
    summary: Array<[string, string]>;
    today: string;
    renew: string;
    markPrice: string;
    charge: string;
    cadence: string;
  }
> = {
  annual: {
    label: "Annual",
    sub: "$288.00 per year · 2 months free",
    pro: 24,
    scale: 99,
    summary: [
      ["Pro plan · annual", "$288.00"],
      ["Trial credit · 12 days left", "−$9.60"],
    ],
    today: "$278.40",
    renew: "Renews automatically each year · cancel anytime",
    markPrice: "$288 / yr",
    charge: "$278.40",
    cadence: "then $288.00 per year",
  },
  monthly: {
    label: "Monthly",
    sub: "$28.00 per month · cancel anytime",
    pro: 28,
    scale: 119,
    summary: [
      ["Pro plan · monthly", "$28.00"],
      ["Trial credit · 12 days left", "−$11.20"],
    ],
    today: "$16.80",
    renew: "Renews automatically each month · cancel anytime",
    markPrice: "$28 / mo",
    charge: "$16.80",
    cadence: "then $28.00 each month",
  },
};

export default function Page() {
  const [cycle, setCycle] = React.useState<Cycle>("annual");
  const [confirmOpen, setConfirmOpen] = React.useState(true);
  const plan = cycles[cycle];

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-default-background text-default-font">
        {/* ── app bar ─────────────────────────────────────────────── */}
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-solid border-default-border px-4">
          <button
            type="button"
            aria-label="Back to workspace"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[6px] border border-solid border-default-border text-neutral-500"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm font-semibold leading-[18px]">
              Upgrade plan
            </span>
            <span className="truncate text-caption font-caption leading-4 text-neutral-500">
              Northwind Labs · Pro trial · 12 days left
            </span>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-solid border-default-border px-2.5 py-1 text-caption font-caption text-neutral-500">
            8 members
          </span>
        </header>

        {/* ── pricing comparison ──────────────────────────────────── */}
        <main className="flex w-full flex-col px-4 pt-3 pb-2">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
              Compare plans
            </span>
            <span className="text-caption font-caption text-neutral-400">
              Pro fits 8 members
            </span>
          </div>

          <div className="grid grid-cols-[72px_1fr_1.3fr_1fr] overflow-hidden rounded-lg border border-solid border-default-border">
            {/* header row */}
            <div className="flex h-[46px] items-center border-b border-solid border-default-border px-2 text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-neutral-500">
              Features
            </div>
            <div className="flex h-[46px] flex-col items-center justify-center gap-1 border-b border-solid border-default-border px-1">
              <span className="text-[13px] font-medium leading-4">Free</span>
              <span className="font-code text-[11px] leading-3 text-neutral-400">
                $0
              </span>
            </div>
            <div className="flex h-[46px] flex-col items-center justify-center gap-1 border-b border-x border-solid border-default-border bg-panel px-1">
              <span className="text-[13px] font-medium leading-4">Pro</span>
              <span className="font-code text-[11px] leading-3 text-default-font">
                ${plan.pro}/mo
              </span>
            </div>
            <div className="flex h-[46px] flex-col items-center justify-center gap-1 border-b border-solid border-default-border px-1">
              <span className="text-[13px] font-medium leading-4">Scale</span>
              <span className="font-code text-[11px] leading-3 text-neutral-400">
                ${plan.scale}/mo
              </span>
            </div>

            {/* feature rows */}
            {features.map((feature) => (
              <React.Fragment key={feature.label}>
                <div className="flex h-8 items-center px-2 text-caption font-caption text-neutral-500">
                  {feature.label}
                </div>
                <div className="flex h-8 items-center justify-center px-1 text-center text-caption font-caption">
                  {feature.free}
                </div>
                <div className="flex h-8 items-center justify-center border-x border-solid border-default-border bg-panel px-1 text-center text-caption font-caption">
                  {feature.pro}
                </div>
                <div className="flex h-8 items-center justify-center px-1 text-center text-caption font-caption">
                  {feature.scale}
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* ── billing cycle — ds:FormSection ────────────────────── */}
          <div className="mt-3">
            <FormSection
              sectionLabel="Billing cycle"
              hint="Prices per workspace. Switch or cancel anytime."
            >
              {(Object.keys(cycles) as Cycle[]).map((id) => {
                const selected = cycle === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCycle(id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[6px] border border-solid px-3 py-2 text-left",
                      selected
                        ? "border-neutral-500 bg-muted/30"
                        : "border-default-border bg-transparent"
                    )}
                  >
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-sm font-medium leading-[18px]">
                        {cycles[id].label}
                      </span>
                      <span className="truncate text-caption font-caption leading-4 text-neutral-500">
                        {cycles[id].sub}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-default-font bg-default-font"
                          : "border-default-border"
                      )}
                    >
                      {selected ? (
                        <Check
                          className="size-3 text-default-background"
                          strokeWidth={3}
                        />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </FormSection>
          </div>

          {/* ── add-ons — ui:empty ────────────────────────────────── */}
          <Empty className="mt-3 gap-1.5 border border-solid border-dashed border-border bg-muted/20 p-3 md:p-3">
            <EmptyHeader className="gap-1.5">
              <EmptyMedia variant="icon" className="mb-1">
                <Puzzle />
              </EmptyMedia>
              <EmptyTitle>No add-ons yet</EmptyTitle>
              <EmptyDescription className="max-w-[320px] text-pretty">
                Region packs unlock on Pro and Scale.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <UIButton variant="outline" size="sm">
                Browse add-ons
              </UIButton>
            </EmptyContent>
          </Empty>
        </main>

        {/* ── checkout summary + open confirmation — ds:DialogLayout ── */}
        <div className="relative mt-auto h-[226px] shrink-0 overflow-hidden border-t border-solid border-default-border">
          {/* order summary under the scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col gap-2.5 p-4"
          >
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              Order summary
            </span>
            <div className="flex flex-col gap-2">
              {plan.summary.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-3 text-caption font-caption"
                >
                  <span className="text-default-font/60">{label}</span>
                  <span className="font-code text-default-font/60">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-3 border-t border-default-border pt-2.5">
              <span className="text-sm font-medium">Charged today</span>
              <span className="font-code text-sm">{plan.today}</span>
            </div>
            <span className="text-caption font-caption text-neutral-400">
              {plan.renew}
            </span>
          </div>

          <DialogLayout
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            modal={false}
            className="absolute inset-0"
          >
            <div className="flex w-[64px] shrink-0 flex-col items-start gap-1.5 pt-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-neutral-100 font-code text-[13px] text-neutral-500">
                P
              </div>
              <span className="text-caption font-caption text-neutral-500">
                Pro plan
              </span>
              <span className="font-code text-[11px] leading-4 text-neutral-400">
                {plan.markPrice}
              </span>
            </div>
            <div className="flex w-[240px] max-w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-1.5">
                <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                  Switch to Pro?
                </SubframeCore.Dialog.Title>
                <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
                  You&apos;re charged {plan.charge} today — the 12 trial days
                  are credited — {plan.cadence}.
                </SubframeCore.Dialog.Description>
              </div>
              <div className="flex w-full flex-wrap items-center justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  Keep Free
                </Button>
                <Button onClick={() => setConfirmOpen(false)}>Upgrade</Button>
              </div>
            </div>
          </DialogLayout>
        </div>
      </div>
    </EvalShell>
  );
}
