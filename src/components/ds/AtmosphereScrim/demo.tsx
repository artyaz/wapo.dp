"use client";

/**
 * AtmosphereScrim demo — a document whose trailing lines fade under the
 * scrim, with a GlassChip pill docked on top of the blur field.
 */

import React from "react";
import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import { GlassChip } from "@/components/ds/GlassChip";

const LINES = [
  "The material system prefers elevation by refraction,",
  "never by cast shadow — light bends at the rim,",
  "content stays legible beneath a graded blur,",
  "surfaces separate by tint and saturation,",
  "and every laid object reads as one substance",
  "quietly settling onto the document below.",
];

export default function Demo() {
  return (
    <div className="relative h-48 w-full max-w-[560px] overflow-hidden rounded-lg border border-solid border-default-border bg-neutral-100">
      <div className="absolute inset-x-0 bottom-0 z-0 flex flex-col gap-1.5 px-6 pb-6">
        {LINES.map((line) => (
          <p key={line} className="text-body-medium text-neutral-600">
            {line}
          </p>
        ))}
      </div>
      <AtmosphereScrim />
      <GlassChip className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <GlassChip.Action glyph="⌘" label="Continue reading" />
        <GlassChip.Rule />
        <GlassChip.Action glyph="↓" label="Skip" />
      </GlassChip>
    </div>
  );
}

export const demoSource = `<div className="relative h-48 w-full overflow-hidden rounded-lg bg-neutral-100">
  {/* trailing lines of the document sit at the bottom (z-0) */}
  <div className="absolute inset-x-0 bottom-0 z-0 flex flex-col gap-1.5 px-6 pb-6">
    {LINES.map((line) => (
      <p key={line} className="text-body-medium text-neutral-600">{line}</p>
    ))}
  </div>

  {/* the blur field docks behind the bar */}
  <AtmosphereScrim />

  <GlassChip className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
    <GlassChip.Action glyph="⌘" label="Continue reading" />
    <GlassChip.Rule />
    <GlassChip.Action glyph="↓" label="Skip" />
  </GlassChip>
</div>`;
