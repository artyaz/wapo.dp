"use client";

/**
 * Demo — a stereo take card. Both channels render the strip's fixed
 * sixty-bar envelope (room-tone is near-mono, and the sample array is baked
 * into the component), so the output is fully deterministic — no randomness,
 * no clocks.
 */

import React from "react";
import { WaveformStrip } from "@/components/ds/WaveformStrip";

const CHANNELS = ["L", "R"] as const;
const TICKS = ["00:00", "00:12", "00:24", "00:36", "00:48"];

export default function Demo() {
  return (
    <div className="w-full max-w-[520px] rounded-lg border border-solid border-default-border bg-panel p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          take-03 · room-tone.wav
        </span>
        <span className="font-code text-[11px] text-neutral-400">
          00:48.000
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {CHANNELS.map((channel) => (
          <div key={channel} className="flex items-center gap-3">
            <span className="w-4 flex-none font-code text-[11px] text-neutral-400">
              {channel}
            </span>
            <div className="h-12 grow">
              <WaveformStrip />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 ml-7 flex justify-between border-t border-solid border-default-border pt-2">
        {TICKS.map((tick) => (
          <span key={tick} className="font-code text-[11px] text-neutral-400">
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}

export const demoSource = `<div className="h-12 w-64">
  <WaveformStrip />
</div>`;
