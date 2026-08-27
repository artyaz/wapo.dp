"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Sparkline } from "@/components/ds/Sparkline";
import { ReasoningLog } from "@/components/ds/ReasoningLog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Scenario — "Gateway diagnostics" phone screen for a finished agent run:
 * health signals (ds:Sparkline) and the agent's reasoning trace
 * (ds:ReasoningLog), with the report share sheet (ui:dialog, custom close
 * button pattern) open over the bottom of the screen.
 */

const STATS = [
  { label: "Latency p50", value: "12.4ms", note: "±0.3" },
  { label: "Throughput", value: "1.9k/s", note: "+18.2%" },
  { label: "Error rate", value: "0.12%", note: "−22.5%" },
] as const;

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <Dialog defaultOpen>
        <div className="mx-auto w-full max-w-[430px] px-4 pb-6 pt-5">
          {/* Screen header */}
          <header className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-[17px] font-semibold leading-tight text-default-font">
                Gateway diagnostics
              </h1>
              <p className="mt-1 font-code text-[11px] text-neutral-500">
                api-gateway · run 4471 · 09:58 UTC
              </p>
            </div>
            <span className="mt-0.5 flex flex-none items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel px-2.5 py-1">
              <span className="size-1.5 rounded-full bg-success-500" />
              <span className="text-[11px] font-medium text-neutral-700">
                healthy
              </span>
            </span>
          </header>

          {/* Signal monitor — ds:Sparkline */}
          <section className="mt-4 rounded-lg border border-solid border-default-border bg-panel p-4">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                signals · last 30 samples
              </span>
              <span className="font-code text-[11px] text-neutral-400">
                last 30m
              </span>
            </div>
            <Sparkline />
            <div className="mt-3 flex items-start gap-3 border-t border-solid border-default-border pt-2.5">
              {STATS.map((stat) => (
                <div key={stat.label} className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                    {stat.label}
                  </span>
                  <span className="mt-0.5 block font-code text-[12px] tabular-nums text-default-font">
                    {stat.value}{" "}
                    <span className="text-neutral-400">{stat.note}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Agent reasoning trace — ds:ReasoningLog */}
          <section className="mt-4 rounded-lg border border-solid border-default-border bg-panel p-4">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
                reasoning trace · run 4471
              </span>
              <span className="font-code text-[11px] text-neutral-400">
                17 steps
              </span>
            </div>
            <ReasoningLog showMoreLabel="Show 14 earlier steps">
              <ReasoningLog.Beat
                job="Collect gateway metrics"
                thought="Sampled 30 one-minute windows across latency, throughput and errors — no gaps."
              />
              <ReasoningLog.Beat
                job="Compare against baseline"
                thought="Latency flat within ±0.3ms, throughput up 18%, error rate far below the 0.5% budget."
              />
              <ReasoningLog.Beat
                job="Draft diagnostics summary"
                thought="No anomalies found — marking run 4471 healthy and ready to share."
              />
            </ReasoningLog>
          </section>

          {/* Share CTA — the button that opened the report sheet */}
          <div className="mt-5">
            <DialogTrigger
              render={
                <Button variant="outline" size="lg" className="w-full">
                  Share diagnostics report
                </Button>
              }
            />
          </div>
        </div>

        {/* Report share sheet — ui:dialog (custom close button), open in this
            static review state via defaultOpen on the Dialog root. */}
        <DialogContent className="top-auto bottom-0 left-0 right-0 max-w-full translate-x-0 translate-y-0 rounded-none rounded-t-2xl border-x-0 border-b-0 p-5 sm:max-w-full">
          <DialogHeader className="text-left">
            <DialogTitle>Share diagnostics report</DialogTitle>
            <DialogDescription>
              Anyone with this link can view the read-only metrics and
              reasoning trace for run 4471.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="report-link" className="sr-only">
                Report link
              </Label>
              <Input
                id="report-link"
                defaultValue="https://praxis.dev/runs/4471"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              render={
                <Button size="lg" className="w-full">
                  Done
                </Button>
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EvalShell>
  );
}
