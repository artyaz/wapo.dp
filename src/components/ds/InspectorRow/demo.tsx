"use client";

/**
 * InspectorRow demo — a properties panel with all five variants the source
 * defines: text field, select (host → api.internal), number stepper
 * (latency → 42ms), toggles on and off, and a color row. Static values only.
 */

import React from "react";
import { InspectorRow } from "@/components/ds/InspectorRow";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col items-start gap-2">
      <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
        inspector · edge-relay
      </span>
      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
        <InspectorRow label="alias" variant="text" />
        <InspectorRow label="host" variant="select" value="api.internal" />
        <InspectorRow label="latency" variant="number" value="42ms" />
        <InspectorRow label="visible" variant="toggle" checked />
        <InspectorRow label="cache" variant="toggle" />
        <InspectorRow label="accent" variant="color" value="#737373" />
      </div>
    </div>
  );
}

export const demoSource = `<InspectorRow label="alias" variant="text" />
<InspectorRow label="host" variant="select" value="api.internal" />
<InspectorRow label="latency" variant="number" value="42ms" />
<InspectorRow label="visible" variant="toggle" checked />
<InspectorRow label="cache" variant="toggle" />
<InspectorRow label="accent" variant="color" value="#737373" />`;
