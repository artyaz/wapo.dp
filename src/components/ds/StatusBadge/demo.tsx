"use client";

/**
 * StatusBadge demo — the four tones from the source API, presented as a
 * quiet roster of realistic service states.
 */

import React from "react";
import { StatusBadge } from "@/components/ds/StatusBadge";

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <StatusBadge tone="live">Live</StatusBadge>
      <StatusBadge tone="success">Synced</StatusBadge>
      <StatusBadge tone="warning">Degraded</StatusBadge>
      <StatusBadge tone="idle">Idle</StatusBadge>
    </div>
  );
}

export const demoSource = `<StatusBadge tone="live">Live</StatusBadge>
<StatusBadge tone="success">Synced</StatusBadge>
<StatusBadge tone="warning">Degraded</StatusBadge>
<StatusBadge tone="idle">Idle</StatusBadge>`;
