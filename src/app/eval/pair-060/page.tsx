"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import * as SubframeCore from "@/lib/subframe/core";
import { DrawerLayout } from "@/components/ds/DrawerLayout";
import { GlassChip } from "@/components/ds/GlassChip";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  ArrowLeftRight,
  Gauge,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";

const payouts = [
  {
    name: "Nordwind Studios GmbH",
    iban: "DE89 ···· ···· 4300",
    ref: "REF-88231",
    amount: "€4,200.00",
    status: "Cleared",
    dot: "bg-success-500",
  },
  {
    name: "Lighthouse Print Co.",
    iban: "FR76 ···· ···· 8821",
    ref: "REF-88232",
    amount: "€1,860.50",
    status: "Cleared",
    dot: "bg-success-500",
  },
  {
    name: "Marlow & Finch Ltd",
    iban: "GB33 ···· ···· 6128",
    ref: "REF-88233",
    amount: "€9,540.00",
    status: "Review",
    dot: "bg-warning-500",
  },
  {
    name: "Ankora Design House",
    iban: "NL91 ···· ···· 7745",
    ref: "REF-88234",
    amount: "€2,639.25",
    status: "Cleared",
    dot: "bg-success-500",
  },
];

const details = [
  { label: "Batch", value: "PB-2291 · 4 payouts" },
  { label: "Total", value: "€18,239.75 · EUR" },
  { label: "Initiated by", value: "Maya Rivera · Treasury ops" },
  { label: "Cutoff", value: "Today 18:00 CET · 42 min left" },
];

const navItems = [
  { icon: Gauge, label: "Overview", active: false },
  { icon: ArrowLeftRight, label: "Payments", active: true },
  { icon: Users, label: "Beneficiaries", active: false },
  { icon: ScrollText, label: "Audit log", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Page() {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [code, setCode] = React.useState("824");

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-default-background font-body text-default-font">
        {/* top bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-solid border-default-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-default-font font-body text-[13px] font-[600] text-default-background">
              P
            </div>
            <span className="font-heading-3 text-heading-3 text-default-font">
              Praxis Pay
            </span>
            <span className="h-4 w-px bg-default-border" />
            <span className="font-caption text-caption text-neutral-500">
              Treasury desk
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            <span className="font-caption text-caption text-neutral-600">
              Maya Rivera · Approver
            </span>
          </div>
        </header>

        <div className="flex min-h-0 grow">
          {/* sidebar */}
          <aside className="flex w-[220px] flex-none flex-col gap-1 border-r border-solid border-default-border p-4">
            <span className="px-3 pb-2 font-caption text-caption uppercase tracking-[0.1em] text-neutral-500">
              Workspace
            </span>
            {navItems.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 " +
                  (active
                    ? "bg-neutral-100 text-default-font"
                    : "text-neutral-600")
                }
              >
                <Icon size={16} />
                <span className="font-body-medium text-body-medium">
                  {label}
                </span>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-2 px-3 pt-4">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-success-500" />
              <span className="font-caption text-caption text-neutral-500">
                SEPA · 3 approvers online
              </span>
            </div>
          </aside>

          {/* main content pane (sits under the drawer scrim) */}
          <main className="relative min-w-0 grow overflow-hidden">
            <div
              aria-hidden="true"
              className="flex h-full flex-col gap-6 p-8"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  Payments / Batches / PB-2291
                </span>
                <div className="flex items-baseline justify-between gap-4">
                  <h1 className="font-heading-2 text-heading-2 text-default-font">
                    Release batch PB-2291
                  </h1>
                  <span className="font-caption text-caption text-default-font/60">
                    Scheduled today · 18:00 CET cutoff
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-4 pb-2.5">
                  <span className="w-[236px] font-caption text-caption uppercase tracking-[0.1em] text-default-font/60">
                    Beneficiary
                  </span>
                  <span className="w-[104px] font-caption text-caption uppercase tracking-[0.1em] text-default-font/60">
                    Reference
                  </span>
                  <span className="w-[104px] text-right font-caption text-caption uppercase tracking-[0.1em] text-default-font/60">
                    Amount
                  </span>
                  <span className="w-[96px] font-caption text-caption uppercase tracking-[0.1em] text-default-font/60">
                    Status
                  </span>
                </div>
                {payouts.map(({ name, iban, ref, amount, status, dot }) => (
                  <div
                    key={ref}
                    className="flex items-center gap-4 border-t border-solid border-default-border py-3.5"
                  >
                    <div className="flex w-[236px] flex-col gap-0.5">
                      <span className="font-body-medium text-body-medium text-default-font">
                        {name}
                      </span>
                      <span className="font-caption text-caption text-default-font/60">
                        {iban}
                      </span>
                    </div>
                    <span className="w-[104px] font-code text-code text-neutral-600">
                      {ref}
                    </span>
                    <span className="w-[104px] text-right font-body-medium text-body-medium tabular-nums text-default-font">
                      {amount}
                    </span>
                    <div className="flex w-[96px] items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 flex-none rounded-full ${dot}`}
                      />
                      <span className="font-caption text-caption text-neutral-600">
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating command bar for the batch — stays above the
                non-modal drawer scrim */}
            <div className="pointer-events-none absolute inset-x-0 bottom-7 z-[60] flex justify-center pr-[362px]">
              <GlassChip className="pointer-events-auto">
                <GlassChip.Action glyph="⌘" label="Approve" />
                <GlassChip.Rule />
                <GlassChip.Action glyph="⇧" label="Hold" />
                <GlassChip.Rule />
                <GlassChip.Action label="Reject" tone="destructive" />
                <GlassChip.Action glyph="↗" disabled />
              </GlassChip>
            </div>

            {/* verification drawer (open on load) */}
            <DrawerLayout
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              direction="right"
              modal={false}
              className="absolute inset-0"
            >
              <div className="flex w-[360px] max-w-full flex-col items-start gap-1.5 px-7 pt-7">
                <SubframeCore.Drawer.Title className="font-heading-2 text-heading-2 text-default-font">
                  Verify release
                </SubframeCore.Drawer.Title>
                <SubframeCore.Drawer.Description className="font-caption text-caption text-neutral-500">
                  Step 2 of 2 · authorize batch PB-2291
                </SubframeCore.Drawer.Description>
              </div>

              <div className="flex w-[360px] max-w-full flex-col items-start px-7">
                {details.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-3 first:border-t-0 first:pt-0"
                  >
                    <span className="font-caption text-caption uppercase tracking-[0.1em] text-neutral-500">
                      {label}
                    </span>
                    <span className="font-body text-body text-default-font">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-[360px] max-w-full flex-col items-start gap-3 px-7">
                <div className="flex w-full flex-col items-start gap-1">
                  <span className="font-caption text-caption uppercase tracking-[0.1em] text-neutral-500">
                    Keycard code
                  </span>
                  <span className="font-body text-body text-default-font">
                    Enter the 6-digit code from your keycard reader, then
                    choose Approve on the command bar.
                  </span>
                </div>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={code}
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <span className="font-caption text-caption text-neutral-500">
                  Three failed attempts lock the card for 15 minutes.
                </span>
              </div>

              <div className="flex w-[360px] max-w-full flex-col items-start px-7 pb-7">
                <p className="font-caption text-caption text-neutral-500">
                  Releases are irreversible. This approval is logged against
                  PB-2291 together with your keycard serial.
                </p>
              </div>
            </DrawerLayout>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
