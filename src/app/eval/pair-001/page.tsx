"use client";

/**
 * EVAL page (pair-001) — a checkout / payment step.
 * Components: ds:GlassMaterialProvider, ds:Sheet, ds:MethodChip.
 * Conditions: laptop 1024x768, dark theme, ltr.
 *
 * Story: the payment step of a sandbox checkout in the Praxis Cloud console.
 * A glass toolbar (material level supplied by GlassMaterialProvider, engine
 * tier shown via its StrategyBadge) sits above the order summary; the right
 * rail traces the API calls this step fires (MethodChip); an open bottom
 * Sheet asks for the final confirm-and-pay.
 */

import React from "react";
import {
  CheckIcon,
  CreditCardIcon,
  LockIcon,
  ShieldCheckIcon,
} from "lucide-react";
import * as SubframeCore from "@/lib/subframe/core";
import { useGlassRuntime, type GlassStrategy } from "@/lib/glass";

import { EvalShell } from "@/eval/EvalShell";
import { GlassMaterialProvider } from "@/components/ds/GlassMaterialProvider";
import { GlassSurfaceSubtle } from "@/components/ds/GlassDisplacement/GlassSurfaceSubtle";
import { Sheet } from "@/components/ds/Sheet";
import { MethodChip } from "@/components/ds/MethodChip";

const GLASS_TIERS: GlassStrategy[] = [
  "svg-displacement",
  "webgl-refraction",
  "backdrop-filter",
];

const STEPS = ["Cart", "Details", "Payment", "Confirm"];
const CURRENT_STEP = 2; // "Payment"

const API_CALLS: {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  note: string;
  disabled?: boolean;
}[] = [
  { method: "get", path: "/v1/checkout/session", note: "session restored" },
  { method: "post", path: "/v1/payment-intents", note: "authorize $248.00" },
  { method: "patch", path: "/v1/payment-methods", note: "set default card" },
  { method: "delete", path: "/v1/sessions/sess_71b0", note: "dedupe cart" },
  {
    method: "get",
    path: "/v1/invoices/upcoming",
    note: "locked during payment",
    disabled: true,
  },
];

export default function Page() {
  const liveStrategy = useGlassRuntime((s) => s.strategy);
  const [sheetOpen, setSheetOpen] = React.useState(true);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* ---- checkout document (sits behind the confirm sheet) ---- */}
        <div className="mx-auto flex w-full max-w-[960px] flex-1 flex-col px-6 pb-6 pt-6">
          {/* glass toolbar + engine status — GlassMaterialProvider feeds the
              "thick" material level to every glass surface below it */}
          <GlassMaterialProvider level="thick" className="w-full gap-2.5">
            <GlassSurfaceSubtle shape="capsule" className="h-14 w-full shrink-0">
              <div className="flex w-full items-center justify-between gap-4 px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <ShieldCheckIcon className="h-4 w-4 shrink-0 text-neutral-500" />
                  <span className="font-body-medium text-body-medium text-default-font">
                    Praxis Cloud
                  </span>
                  <span className="font-caption text-caption text-neutral-500">
                    · Checkout
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <LockIcon className="h-3.5 w-3.5 text-neutral-500" />
                  <span className="font-caption text-caption text-neutral-500">
                    Sandbox · test mode
                  </span>
                </div>
              </div>
            </GlassSurfaceSubtle>

            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <p className="font-caption text-caption text-neutral-500">
                Northwind Labs workspace · run TR-8841
              </p>
              <div className="flex items-center gap-2">
                <span className="font-caption text-caption text-neutral-500">
                  preview engine
                </span>
                {GLASS_TIERS.map((tier) => (
                  <GlassMaterialProvider.StrategyBadge
                    key={tier}
                    strategy={tier}
                    active={tier === liveStrategy}
                  />
                ))}
              </div>
            </div>
          </GlassMaterialProvider>

          <main className="mt-5 grid grid-cols-[1fr_340px] items-start gap-5">
            {/* left — the payment step itself */}
            <section className="flex min-w-0 flex-col gap-4">
              <header className="flex flex-col gap-1">
                <h1 className="font-heading-2 text-heading-2 text-default-font">
                  Payment
                </h1>
                <p className="font-caption text-caption text-neutral-500">
                  Step 3 of 4 — review the order, then confirm the charge.
                </p>
              </header>

              {/* steps rail */}
              <ol className="flex w-full items-center gap-2.5">
                {STEPS.map((label, i) => {
                  const done = i < CURRENT_STEP;
                  const current = i === CURRENT_STEP;
                  return (
                    <React.Fragment key={label}>
                      {i > 0 ? (
                        <span
                          aria-hidden="true"
                          className="h-px min-w-4 flex-1 bg-default-border"
                        />
                      ) : null}
                      <li className="flex items-center gap-1.5">
                        <span
                          className={
                            current
                              ? "flex h-5 w-5 items-center justify-center rounded-full bg-default-font font-caption text-caption text-default-background"
                              : "flex h-5 w-5 items-center justify-center rounded-full border border-solid border-default-border font-caption text-caption text-neutral-500"
                          }
                        >
                          {done ? <CheckIcon className="h-3 w-3" /> : i + 1}
                        </span>
                        <span
                          className={
                            current
                              ? "font-caption text-caption text-default-font"
                              : "font-caption text-caption text-neutral-500"
                          }
                        >
                          {label}
                        </span>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ol>

              {/* order summary */}
              <div className="flex flex-col gap-3 rounded-lg border border-solid border-default-border bg-panel p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-body-medium text-body-medium text-default-font">
                      Team plan · annual
                    </p>
                    <p className="font-caption text-caption text-neutral-500">
                      12 seats × $19.00 / seat / month
                    </p>
                  </div>
                  <p className="shrink-0 font-code text-code text-default-font">
                    $228.00
                  </p>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-body-medium text-body-medium text-default-font">
                      Usage add-on
                    </p>
                    <p className="font-caption text-caption text-neutral-500">
                      10M events / month
                    </p>
                  </div>
                  <p className="shrink-0 font-code text-code text-default-font">
                    $20.00
                  </p>
                </div>

                <div className="h-px w-full bg-default-border" />

                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-caption text-caption text-neutral-500">
                    Subtotal
                  </p>
                  <p className="font-code text-code text-neutral-500">$248.00</p>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-caption text-caption text-neutral-500">
                    VAT
                  </p>
                  <p className="font-code text-code text-neutral-500">Included</p>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-body-medium text-body-medium text-default-font">
                    Total due today
                  </p>
                  <p className="font-body-medium text-body-medium text-default-font">
                    $248.00
                  </p>
                </div>
              </div>
            </section>

            {/* right — the API calls this step fires */}
            <aside className="flex min-w-0 flex-col gap-3 rounded-lg border border-solid border-default-border bg-panel p-4">
              <header className="flex flex-col gap-1">
                <h2 className="font-heading-3 text-heading-3 text-default-font">
                  Live API calls
                </h2>
                <p className="font-caption text-caption text-neutral-500">
                  payment step · sandbox trace
                </p>
              </header>

              <div className="flex flex-col gap-3.5 pt-1">
                {API_CALLS.map((call) => (
                  <div key={call.path} className="flex min-w-0 items-start gap-3">
                    <MethodChip
                      method={call.method}
                      disabled={call.disabled}
                      className="mt-0.5"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <code className="min-w-0 truncate font-code text-code text-default-font">
                        {call.path}
                      </code>
                      <span className="min-w-0 truncate font-caption text-caption text-neutral-500">
                        {call.note}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-caption text-caption text-neutral-500">
                5 calls · 0 errors · 84 ms p50
              </p>
            </aside>
          </main>
        </div>

        {/* ---- confirm-and-pay sheet (open by default) ---- */}
        {sheetOpen ? (
          <Sheet
            open
            onOpenChange={setSheetOpen}
            modal={false}
            className="absolute inset-0"
          >
            <Sheet.Content
              aria-describedby={undefined}
              onPointerDownOutside={(event: Event) => event.preventDefault()}
            >
              <SubframeCore.Dialog.Title className="w-full font-body-medium text-body-medium text-default-font">
                Confirm and pay
              </SubframeCore.Dialog.Title>
              <p className="w-full font-body text-body text-neutral-500">
                This completes the payment step of your checkout. We&apos;ll
                charge the card below once and email the receipt to
                billing@northwind.dev.
              </p>

              <div className="flex w-full items-center gap-3 rounded-md border border-solid border-default-border px-3 py-2.5">
                <CreditCardIcon className="h-4 w-4 shrink-0 text-neutral-500" />
                <div className="min-w-0 flex-1">
                  <p className="font-body-medium text-body-medium text-default-font">
                    Visa •••• 4242
                  </p>
                  <p className="font-caption text-caption text-neutral-500">
                    Expires 04 / 2028
                  </p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer rounded-md px-2 py-1 font-caption text-caption text-neutral-500 hover:bg-neutral-100 hover:text-default-font"
                >
                  Change
                </button>
              </div>

              <div className="flex w-full items-center justify-between border-t border-solid border-default-border pt-3">
                <p className="font-body-medium text-body-medium text-default-font">
                  Total due today
                </p>
                <p className="font-code text-code text-default-font">
                  $248.00 USD
                </p>
              </div>

              <div className="flex w-full items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="cursor-pointer rounded-md px-3 py-1.5 font-caption text-caption text-default-font hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="cursor-pointer rounded-md border border-solid border-default-border bg-default-font px-3 py-1.5 font-caption text-caption text-default-background hover:opacity-90"
                >
                  Pay $248.00
                </button>
              </div>
            </Sheet.Content>
          </Sheet>
        ) : null}
      </div>
    </EvalShell>
  );
}
