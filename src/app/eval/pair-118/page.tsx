"use client";

/**
 * EVAL page (pair-118) — ds:Card + ds:WaveformStrip + ds:ToolSummaryRow
 * Conditions: desktop-wide 1440x900, light theme, LTR, no constraint.
 *
 * Scenario: the final checkout / payment step of "Verbatim", a voice-over
 * production studio. The customer reviews and pays for order VO-2847:
 *  - Deliverable card (ds:Card) previews the approved 30s TV edit as two
 *    stereo WaveformStrip channels with a transport row and a time ruler.
 *  - Payment method card (ds:Card) carries the verified billing details.
 *  - Order summary card (ds:Card) totals the line items and hosts the pay
 *    action in its footer.
 *  - Checkout assistant card (ds:Card) is the audit trail of how the order
 *    was prepared, composed of ds:ToolSummaryRow macro rows with nested
 *    ActionTraces micro steps.
 */

import React from "react";
import {
  AudioWaveform,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Card } from "@/components/ds/Card";
import { WaveformStrip } from "@/components/ds/WaveformStrip";
import { ToolSummaryRow } from "@/components/ds/ToolSummaryRow";
import { ActionTraces } from "@/components/ds/ActionTraces";

/* ---- small building blocks ------------------------------------------- */

const TICKS = ["00:00", "00:12", "00:24", "00:36", "00:48"];

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-baseline gap-4">
      <span className="w-20 flex-none text-caption text-neutral-500">
        {label}
      </span>
      <span className="min-w-0 text-caption text-default-font">{value}</span>
    </div>
  );
}

function LineItem({
  label,
  amount,
  tone = "default",
}: {
  label: string;
  amount: string;
  tone?: "default" | "discount";
}) {
  return (
    <div className="flex w-full items-baseline justify-between gap-4">
      <span className="min-w-0 text-caption text-neutral-600">{label}</span>
      <span
        className={`flex-none font-code text-caption tabular-nums ${
          tone === "discount" ? "text-success-600" : "text-default-font"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}

/* ---- page ------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-default-background font-body text-body text-default-font">
        {/* ============ top bar with checkout stepper ============ */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-solid border-default-border px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-7 flex-none items-center justify-center rounded-md bg-neutral-900 text-neutral-50">
              <AudioWaveform className="size-4" />
            </span>
            <span className="text-body-medium font-medium text-default-font">
              Verbatim
            </span>
            <span className="text-neutral-300">/</span>
            <span className="truncate text-body-medium text-neutral-500">
              Checkout
            </span>
          </div>
          <div className="flex flex-none items-center gap-1.5 text-caption text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5" />
              Cart
            </span>
            <ChevronRight className="size-3.5 text-neutral-300" />
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5" />
              Files
            </span>
            <ChevronRight className="size-3.5 text-neutral-300" />
            <span className="flex items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel px-2.5 py-1 font-medium text-default-font">
              <Lock className="size-3" />
              Payment
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-8">
          {/* intro line */}
          <div className="mb-6 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-heading-3 text-default-font">
                Review &amp; pay
              </h1>
              <p className="mt-1 text-body-medium text-neutral-500">
                Order VO-2847 · Whitfield &amp; Co. · step 3 of 3 — files
                unlock the moment payment clears
              </p>
            </div>
            <span className="flex flex-none items-center gap-1.5 text-caption text-neutral-500">
              <ShieldCheck className="size-3.5" />
              Secure checkout · PCI-DSS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* ================= left column ================= */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* ---- deliverable preview (ds:WaveformStrip) ---- */}
              <Card
                header={
                  <div className="flex w-full flex-col items-start gap-0.5">
                    <div className="flex w-full items-baseline justify-between gap-4">
                      <span className="text-body-medium font-medium text-default-font">
                        Deliverable · brand-read-take-03.wav
                      </span>
                      <span className="flex-none font-code text-caption tabular-nums text-neutral-400">
                        00:48.000
                      </span>
                    </div>
                    <span className="text-caption text-neutral-500">
                      VO-2847 · 30s TV edit · mastered · approved 2h ago
                    </span>
                  </div>
                }
                footer={
                  <>
                    <span className="text-caption text-neutral-400">
                      WAV · 48 kHz · 24-bit
                    </span>
                    <span className="text-caption text-neutral-400">
                      −16 LUFS · true peak −1.0 dBTP
                    </span>
                  </>
                }
              >
                {/* transport row */}
                <div className="flex w-full items-center gap-3">
                  <button
                    aria-label="Play preview"
                    className="flex size-9 flex-none items-center justify-center rounded-full border border-solid border-default-border bg-default-background text-default-font"
                  >
                    <Play className="size-4" />
                  </button>
                  <span className="flex min-w-0 items-center gap-1.5 text-caption text-neutral-500">
                    <Volume2 className="size-3.5 flex-none" />
                    Preview the approved master before you pay
                  </span>
                  <span className="ml-auto flex-none font-code text-caption tabular-nums text-neutral-400">
                    00:00 / 00:48
                  </span>
                </div>
                {/* stereo channels */}
                <div className="flex w-full flex-col gap-2">
                  {["L", "R"].map((channel) => (
                    <div key={channel} className="flex w-full items-center gap-3">
                      <span className="w-4 flex-none font-code text-caption text-neutral-400">
                        {channel}
                      </span>
                      <div className="h-12 min-w-0 grow">
                        <WaveformStrip />
                      </div>
                    </div>
                  ))}
                </div>
                {/* time ruler aligned to the strips */}
                <div className="ml-7 flex w-[calc(100%-28px)] justify-between border-t border-solid border-default-border pt-2">
                  {TICKS.map((tick) => (
                    <span
                      key={tick}
                      className="font-code text-caption tabular-nums text-neutral-400"
                    >
                      {tick}
                    </span>
                  ))}
                </div>
              </Card>

              {/* ---- payment method ---- */}
              <Card
                header={
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-body-medium font-medium text-default-font">
                      <CreditCard className="size-4 text-neutral-500" />
                      Payment method
                    </span>
                    <span className="flex flex-none items-center gap-1.5 text-caption text-neutral-500">
                      <Check className="size-3.5 text-success-600" />
                      Verified with Stripe
                    </span>
                  </div>
                }
                footer={
                  <>
                    <span className="text-caption text-neutral-400">
                      Billing profile VM-2291
                    </span>
                    <span className="text-caption text-neutral-400">
                      Updated 3 months ago
                    </span>
                  </>
                }
              >
                <div className="flex w-full flex-col gap-2">
                  <DetailRow
                    label="Card"
                    value="Visa ·••• •••• •••• 4242 · expires 04/28"
                  />
                  <DetailRow label="Name" value="Dana Whitfield — Whitfield & Co." />
                  <DetailRow
                    label="Billing"
                    value="118 Ludlow Ave, Cincinnati, OH 45220, US"
                  />
                  <DetailRow
                    label="Receipt"
                    value="dana@whitfield.co · invoice attached"
                  />
                </div>
              </Card>
            </div>

            {/* ================= right column ================= */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* ---- order summary ---- */}
              <Card
                header={
                  <div className="flex w-full flex-col items-start gap-0.5">
                    <span className="text-body-medium font-medium text-default-font">
                      Order summary
                    </span>
                    <span className="text-caption text-neutral-500">
                      One-time purchase · USD · taxes included
                    </span>
                  </div>
                }
                footer={
                  <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-body-medium font-medium text-neutral-50 hover:bg-neutral-800">
                    <Lock className="size-3.5" />
                    Pay $312.00
                  </button>
                }
              >
                <div className="flex w-full flex-col gap-2">
                  <LineItem
                    label="Brand read · 30s TV edit (master)"
                    amount="$280.00"
                  />
                  <LineItem
                    label="Broadcast license · 12 mo · North America"
                    amount="$60.00"
                  />
                  <LineItem
                    label="Promo VOICE10 · −10% brand read"
                    amount="−$28.00"
                    tone="discount"
                  />
                </div>
                <div className="flex w-full items-baseline justify-between gap-4 border-t border-solid border-default-border pt-3">
                  <span className="text-body-medium text-default-font">
                    Total due today
                  </span>
                  <span className="font-code text-body-medium font-semibold tabular-nums text-default-font">
                    $312.00
                  </span>
                </div>
                <span className="text-caption text-neutral-400">
                  Charged once to Visa •••• 4242 · 14-day refund window
                </span>
              </Card>

              {/* ---- checkout assistant (ds:ToolSummaryRow) ---- */}
              <Card
                header={
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-body-medium font-medium text-default-font">
                      <Sparkles className="size-4 text-neutral-500" />
                      Checkout assistant
                    </span>
                    <span className="flex-none font-code text-caption text-neutral-400">
                      audit trail
                    </span>
                  </div>
                }
                footer={
                  <>
                    <span className="text-caption text-neutral-400">
                      4 steps · 1.4 s total
                    </span>
                    <span className="text-caption text-neutral-400">
                      2 tools used
                    </span>
                  </>
                }
              >
                <ToolSummaryRow
                  kind="integration"
                  traces={
                    <ActionTraces
                      items={[
                        {
                          kind: "api",
                          label: "GET /v1/orders/VO-2847 — 200 OK (214 ms)",
                        },
                        {
                          kind: "command",
                          label: "ffmpeg -i take-03.wav -af loudnorm=I=-16 master.wav",
                        },
                        {
                          kind: "skill",
                          label: "Loaded licensing skill: NA broadcast rates 2025",
                        },
                      ]}
                    />
                  }
                >
                  Prepared order VO-2847 with the Verbatim production suite
                </ToolSummaryRow>
                <ToolSummaryRow kind="api">
                  Verified Visa •••• 4242 with Stripe — payment intent created
                </ToolSummaryRow>
                <ToolSummaryRow kind="skill">
                  Applied promo VOICE10 — $28.00 off the brand read
                </ToolSummaryRow>
                <ToolSummaryRow kind="command">
                  Ran the fraud pre-check — 0 risk signals found
                </ToolSummaryRow>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
