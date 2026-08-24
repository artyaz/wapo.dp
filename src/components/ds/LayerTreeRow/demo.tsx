"use client";

/**
 * LayerTreeRow demo — a layers panel for a page mock: a selected frame with
 * nested groups, a text leaf, a collapsed component row, and a locked +
 * hidden frame carrying the ○ / 🔒 indicators as authored. Static data.
 */

import React from "react";
import { LayerTreeRow } from "@/components/ds/LayerTreeRow";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col items-start gap-2">
      <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
        layers · checkout-page
      </span>
      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
        <LayerTreeRow name="Checkout page" nodeType="frame" depth="0" expanded selected visible />
        <LayerTreeRow name="hero" nodeType="group" depth="1" expanded visible />
        <LayerTreeRow name="headline" nodeType="text" depth="2" leaf />
        <LayerTreeRow name="trust-badges" nodeType="group" depth="2" />
        <LayerTreeRow name="pricing-table" nodeType="component" depth="1" />
        <LayerTreeRow name="legacy-footer" nodeType="frame" depth="1" locked />
      </div>
    </div>
  );
}

export const demoSource = `<LayerTreeRow name="Checkout page" nodeType="frame" depth="0" expanded selected visible />
<LayerTreeRow name="hero" nodeType="group" depth="1" expanded visible />
<LayerTreeRow name="headline" nodeType="text" depth="2" leaf />
<LayerTreeRow name="trust-badges" nodeType="group" depth="2" />
<LayerTreeRow name="pricing-table" nodeType="component" depth="1" />
<LayerTreeRow name="legacy-footer" nodeType="frame" depth="1" locked />`;
