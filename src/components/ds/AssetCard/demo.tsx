"use client";

/**
 * Demo — one media-library card for an audio asset: the waveform preview is
 * the audio kind's body, with the mono duration chip and a quiet format meta
 * line. Fully static — the drag-handle grid only appears on hover.
 */

import React from "react";
import { AssetCard } from "@/components/ds/AssetCard";

export default function Demo() {
  return (
    <div className="mx-auto w-[248px] max-w-full">
      <AssetCard
        kind="audio"
        title="room-tone.wav"
        duration="00:48"
        meta="WAV · 48 kHz · 24-bit"
      />
    </div>
  );
}

export const demoSource = `<AssetCard
  kind="audio"
  title="room-tone.wav"
  duration="00:48"
  meta="WAV · 48 kHz · 24-bit"
/>`;
