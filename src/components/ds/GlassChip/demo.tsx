"use client";

/**
 * GlassChip demo — a composed command capsule: two Actions with text glyphs,
 * a Rule divider, a destructive Action and a disabled Action.
 */

import React from "react";
import { GlassChip } from "@/components/ds/GlassChip";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <GlassChip>
        <GlassChip.Action glyph="⌘" label="Export" />
        <GlassChip.Rule />
        <GlassChip.Action glyph="⇧" label="Duplicate" />
        <GlassChip.Rule />
        <GlassChip.Action label="Discard" tone="destructive" />
        <GlassChip.Action glyph="↗" disabled />
      </GlassChip>
    </div>
  );
}

export const demoSource = `<GlassChip>
  <GlassChip.Action glyph="⌘" label="Export" />
  <GlassChip.Rule />
  <GlassChip.Action glyph="⇧" label="Duplicate" />
  <GlassChip.Rule />
  <GlassChip.Action label="Discard" tone="destructive" />
  <GlassChip.Action glyph="↗" disabled />
</GlassChip>`;
