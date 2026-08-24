"use client";

/**
 * Demo — one timeline track row: the TrackHeader label column ("Voice · A1",
 * audio) docked to a lane body carrying the track's waveform. Static content
 * only — the M / S / L squares render in their resting state.
 */

import React from "react";
import { TrackHeader } from "@/components/ds/TrackHeader";
import { WaveformStrip } from "@/components/ds/WaveformStrip";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[520px] items-stretch overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
      <TrackHeader trackName="Voice · A1" trackType="audio" />
      <div className="relative flex grow items-center overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-2">
        <WaveformStrip />
      </div>
    </div>
  );
}

export const demoSource = `<div className="flex items-stretch">
  <TrackHeader trackName="Voice · A1" trackType="audio" />
  <div className="flex grow items-center bg-neutral-50 px-2">
    <WaveformStrip />
  </div>
</div>`;
