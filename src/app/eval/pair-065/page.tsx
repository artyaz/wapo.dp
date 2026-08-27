"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  InfoIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  WalletIcon,
} from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="relative mx-auto w-full max-w-[420px] px-5 pb-6 pt-5">
        {/* soft glass glow behind the header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-8 h-64 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col">
          {/* Header */}
          <header className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" aria-label="Back to shipping">
              <ChevronLeftIcon />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold leading-tight">
                Payment
              </h1>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                Step 2 of 3 · Aurora Analytics
              </p>
            </div>
            <span className="rounded-full border border-border/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              USD
            </span>
          </header>

          {/* Order summary */}
          <section
            aria-label="Order summary"
            className="mt-5 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">Aurora Analytics · Pro</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Annual subscription · 1 seat
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium tabular-nums">
                $288.00
              </p>
            </div>
            <div className="mt-3 space-y-1.5 border-t border-border/60 pt-3 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">$288.00</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Estimated tax (8%)</span>
                <span className="tabular-nums">$23.04</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Account credit</span>
                <span className="tabular-nums">−$18.00</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-sm font-medium">
                <span>Total today</span>
                <span className="tabular-nums">$293.04</span>
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section aria-label="Payment method" className="mt-6">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Payment method
            </h2>

            {/* Selected card */}
            <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/5 p-3.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                <CreditCardIcon className="size-4 text-foreground/80" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Visa •••• 4242</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Expires 09/28 · Default card
                </p>
              </div>
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CheckIcon className="size-3" />
              </span>
            </div>

            {/* Billing options */}
            <div className="mt-3 space-y-4 rounded-xl border border-border/60 bg-card/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">Apply account credit</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    You have $18.00 in credits
                  </p>
                </div>
                <Switch defaultChecked aria-label="Apply account credit" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">Save card for next time</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Store securely for faster checkout
                  </p>
                </div>
                <Switch aria-label="Save card for next time" />
              </div>
            </div>
          </section>

          {/* Separator between card and express checkout */}
          <Marker variant="separator" className="my-5">
            <MarkerContent>Or pay with</MarkerContent>
          </Marker>

          {/* Express checkout */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="h-10">
              <SmartphoneIcon /> Apple Pay
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <WalletIcon /> PayPal
            </Button>
          </div>

          {/* Security note with info tooltip (open by default) */}
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5">
            <ShieldCheckIcon className="size-4 shrink-0 text-muted-foreground" />
            <p className="min-w-0 flex-1 text-xs text-muted-foreground">
              3-D Secure verification may be required
            </p>
            <Tooltip defaultOpen>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label="What is 3-D Secure?"
                    className="shrink-0 text-muted-foreground/70 transition-colors hover:text-foreground"
                  />
                }
              >
                <InfoIcon className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="max-w-[220px]">
                <p>
                  Your bank may send a one-time passcode to confirm this
                  payment.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Pay */}
          <Button size="lg" className="mt-4 h-11 w-full text-[15px]">
            Pay $293.04
          </Button>

          {/* Trust marker */}
          <Marker render={<a href="/security" />} className="mt-4">
            <MarkerIcon>
              <LockIcon />
            </MarkerIcon>
            <MarkerContent>
              Payments encrypted · PCI DSS Level 1
            </MarkerContent>
          </Marker>
        </div>
      </div>
    </EvalShell>
  );
}
