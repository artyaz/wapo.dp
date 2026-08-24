"use client";

/**
 * FloatingToolbar demo — two action groups separated by a Rule, with plain
 * unicode glyphs (⌘ ⟲ ↓ ⌫) and a destructive close-out action.
 */

import React from "react";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <FloatingToolbar>
        <FloatingToolbar.Action glyph="⌘" label="Share" />
        <FloatingToolbar.Action glyph="⟲" label="Rerun" />
        <FloatingToolbar.Rule />
        <FloatingToolbar.Action glyph="↓" label="Export" />
        <FloatingToolbar.Action glyph="⌫" label="Delete" tone="destructive" />
      </FloatingToolbar>
    </div>
  );
}

export const demoSource = `<FloatingToolbar>
  <FloatingToolbar.Action glyph="⌘" label="Share" />
  <FloatingToolbar.Action glyph="⟲" label="Rerun" />
  <FloatingToolbar.Rule />
  <FloatingToolbar.Action glyph="↓" label="Export" />
  <FloatingToolbar.Action glyph="⌫" label="Delete" tone="destructive" />
</FloatingToolbar>`;
