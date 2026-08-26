"use client";

/**
 * Demo — an activity timeline for a transcription workspace: an indexer
 * comment, a system event and an email notification, closed with isLast.
 * Fully static — no clocks, no animation.
 */

import React from "react";
import { ActivityEvent } from "@/components/ds/ActivityEvent";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[480px] flex-col">
      <ActivityEvent
        author="Indexer"
        timestamp="09:41:07"
        body="Transcript indexed — 12,408 tokens across 38 segments."
        isFirst
      />
      <ActivityEvent
        variant="system"
        body="Export queued → batch #4471 (markdown)"
      />
      <ActivityEvent
        variant="email"
        subject="ops@northwind"
        timestamp="09:44:52"
        body="Access granted to workspace analytics, expires in 30 days."
        isLast
      />
    </div>
  );
}

export const demoSource = `<ActivityEvent
  author="Indexer"
  timestamp="09:41:07"
  body="Transcript indexed — 12,408 tokens across 38 segments."
  isFirst
/>
<ActivityEvent variant="system" body="Export queued → batch #4471 (markdown)" />
<ActivityEvent
  variant="email"
  subject="ops@northwind"
  timestamp="09:44:52"
  body="Access granted to workspace analytics, expires in 30 days."
  isLast
/>`;
