"use client";

/**
 * StatTile demo — a quiet metrics row: p99 latency (with sparkline), request
 * volume, and error rate.
 */

import { StatTile } from "@/components/ds/StatTile";

const latencySparkline = (
  <svg
    viewBox="0 0 120 24"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="h-6 w-full text-neutral-400"
  >
    <polyline
      points="0,18 12,17 24,19 36,14 48,15 60,10 72,12 84,8 96,9 108,5 120,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default function Demo() {
  return (
    <div className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-3">
      <StatTile
        label="P99 latency"
        value="42.1ms"
        footer="vs. previous 24h"
        sparkline={latencySparkline}
      />
      <StatTile
        label="Requests"
        value="1,204"
        delta="+8.1%"
        sign="positive"
        footer="last 24 hours"
      />
      <StatTile
        label="Error rate"
        value="0.12%"
        delta="+0.04"
        sign="negative"
        footer="5xx + timeouts"
      />
    </div>
  );
}

export const demoSource = `const latencySparkline = (
  <svg viewBox="0 0 120 24" preserveAspectRatio="none" className="h-6 w-full text-neutral-400">
    <polyline
      points="0,18 12,17 24,19 36,14 48,15 60,10 72,12 84,8 96,9 108,5 120,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

<div className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-3">
  <StatTile
    label="P99 latency"
    value="42.1ms"
    footer="vs. previous 24h"
    sparkline={latencySparkline}
  />
  <StatTile
    label="Requests"
    value="1,204"
    delta="+8.1%"
    sign="positive"
    footer="last 24 hours"
  />
  <StatTile
    label="Error rate"
    value="0.12%"
    delta="+0.04"
    sign="negative"
    footer="5xx + timeouts"
  />
</div>`;
