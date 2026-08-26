"use client";

/**
 * Demo — the ruler at default zoom (24 px/s) inside a panning viewport. The
 * component spans 00:00–02:00 across 2880px; the frame reveals the first
 * stretch and scrolls horizontally for the rest, with a quiet right-edge fade
 * marking the continuation. Fixed content only.
 */

import React from "react";
import { TimelineRuler } from "@/components/ds/TimelineRuler";

export default function Demo() {
  return (
    <div className="w-full max-w-[560px] rounded-lg border border-solid border-default-border bg-panel p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          incident-2417 · checkout latency
        </span>
        <span className="font-code text-[11px] text-neutral-400">
          00:00–02:00 · 24 px/s
        </span>
      </div>
      <div className="relative">
        <div className="overflow-x-auto">
          <TimelineRuler />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-panel to-transparent" />
      </div>
      <p className="mt-3 font-code text-[11px] text-neutral-400">
        major tick every 10 s · minor every 2 s · ◆ event markers · scroll to pan
      </p>
    </div>
  );
}

export const demoSource = `<div className="relative">
  <div className="overflow-x-auto">
    <TimelineRuler />
  </div>
  <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-panel to-transparent" />
</div>`;
