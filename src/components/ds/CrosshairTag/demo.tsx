"use client";

/**
 * Demo — CrosshairTag over its own static chart-ish background: plain divs,
 * hairline gridlines, a quiet bar series. The value tag is the only glass
 * element in the composition; the frame stays crisp, per doctrine. All
 * content is fixed — no randomness, no clocks. The crosshair anchor is fixed
 * too (the built-in 62% default, which sits on the tall bar of the 260px
 * frame) — pass `crosshairPosition` to pin the read-out to a data bar.
 */

import React from "react";
import { CrosshairTag } from "@/components/ds/CrosshairTag";

export default function Demo() {
  return (
    <div className="flex w-[260px] flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          USD/JPY · 1m
        </span>
        <span className="font-code text-[11px] text-neutral-400">
          tokyo session
        </span>
      </div>
      <CrosshairTag
        value="142.85"
        glyph="+0.42"
        timestamp="2025-06-11 14:32:05"
      />
    </div>
  );
}

export const demoSource = `<CrosshairTag
  value="142.85"
  glyph="+0.42"
  timestamp="2025-06-11 14:32:05"
/>`;
