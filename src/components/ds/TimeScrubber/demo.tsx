"use client";

/**
 * Demo — a quiet observability range picker: the component's own fixed bar
 * backdrop (activity histogram) with the authored selection handles at
 * 55% / 85% and mono range tags pinned to them. The tag times match the
 * handle geometry exactly — 55% and 85% of a 24-hour 1D window — and nothing
 * is computed at render. All content fixed; no randomness, no clocks.
 */

import React from "react";
import { TimeScrubber } from "@/components/ds/TimeScrubber";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          requests · api-gateway
        </span>
        <span className="font-code text-[11px] text-neutral-400">
          13:12 – 20:24 UTC
        </span>
      </div>
      <TimeScrubber rangeStart="13:12" rangeEnd="20:24" />
    </div>
  );
}

export const demoSource = `<TimeScrubber rangeStart="13:12" rangeEnd="20:24" />`;
