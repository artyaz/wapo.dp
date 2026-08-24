"use client";

/**
 * Demo — a timeline clip with realistic in/out points: the room-tone asset
 * laid on an audio lane between 00:15 and 00:42 of a one-minute sequence.
 * Geometry is fixed percentages (25% / 45%) and the readout is static, so
 * every render is identical.
 */

import React from "react";
import { MediaClip } from "@/components/ds/MediaClip";

const TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];
const IN_POINT = "25%";
const OUT_POINT = "70%";

export default function Demo() {
  return (
    <div className="w-full max-w-[560px] rounded-lg border border-solid border-default-border bg-panel p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          sequence · ambience-edit
        </span>
        <span className="font-code text-[11px] text-neutral-400">01:00</span>
      </div>
      <div className="relative flex h-4 items-start justify-between border-b border-solid border-default-border">
        {TICKS.map((tick) => (
          <span key={tick} className="font-code text-[10px] text-neutral-400">
            {tick}
          </span>
        ))}
        <div
          className="absolute inset-y-0 w-px bg-neutral-700"
          style={{ left: IN_POINT }}
        />
        <div
          className="absolute inset-y-0 w-px bg-neutral-700"
          style={{ left: OUT_POINT }}
        />
      </div>
      <div className="relative mt-2 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
        <MediaClip
          kind="audio"
          label="room-tone.wav"
          duration="00:27"
          className="absolute"
          style={{ left: IN_POINT, width: "45%" }}
        />
      </div>
      <div className="relative mt-1.5 h-4">
        <span
          className="absolute font-code text-[10px] text-neutral-500"
          style={{ left: IN_POINT }}
        >
          in 00:15.000
        </span>
        <span
          className="absolute font-code text-[10px] text-neutral-500"
          style={{ left: OUT_POINT }}
        >
          out 00:42.000
        </span>
      </div>
    </div>
  );
}

export const demoSource = `<div className="relative h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
  <MediaClip
    kind="audio"
    label="room-tone.wav"
    duration="00:27"
    className="absolute"
    style={{ left: "25%", width: "45%" }}
  />
</div>
<!-- in 00:15.000 · out 00:42.000 on a 01:00 timeline -->`;
