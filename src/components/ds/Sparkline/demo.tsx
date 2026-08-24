"use client";

/**
 * Demo — a signal monitor card: the Sparkline's three authored variants
 * (Neutral / Positive / Negative) read as flat, rising and falling series,
 * each summarized by a quiet mono stat aligned beneath its column. Fixed
 * literals only — no randomness, no clocks.
 */

import React from "react";
import { Sparkline } from "@/components/ds/Sparkline";

const STATS = [
  { label: "latency p50", value: "12.4ms", note: "±0.3" },
  { label: "throughput", value: "1.9k/s", note: "+18.2%" },
  { label: "error rate", value: "0.12%", note: "−22.5%" },
] as const;

export default function Demo() {
  return (
    <div className="w-full max-w-[520px] rounded-lg border border-solid border-default-border bg-panel p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          signals · last 30 samples
        </span>
        <span className="font-code text-[11px] text-neutral-400">
          api-gateway
        </span>
      </div>
      <Sparkline />
      <div className="mt-3 flex items-start gap-4 border-t border-solid border-default-border pt-2">
        {STATS.map((stat) => (
          <span
            key={stat.label}
            className="flex-1 font-code text-[10px] text-neutral-400 tabular-nums"
          >
            {stat.label} {stat.value} {stat.note}
          </span>
        ))}
      </div>
    </div>
  );
}

export const demoSource = `<div className="w-full max-w-[520px] rounded-lg border border-solid border-default-border bg-panel p-5">
  <Sparkline />
</div>`;
