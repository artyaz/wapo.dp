"use client";

/**
 * Demo — a reasoning trace excerpt: three settled beats under a monospace run
 * label, with a show-more link for the collapsed earlier steps. All beats are
 * quiet (no inflight shimmer), so the demo is fully static.
 */

import React from "react";
import { ReasoningLog } from "@/components/ds/ReasoningLog";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[480px] flex-col">
      <span className="mb-3 font-code text-[11px] tracking-[0.04em] text-neutral-500">
        reasoning trace · run 4471
      </span>
      <ReasoningLog showMoreLabel="Show 14 earlier steps">
        <ReasoningLog.Beat
          job="Retrieve workspace index"
          thought="Loaded 3 of 12 candidate documents; two were superseded by later revisions."
        />
        <ReasoningLog.Beat
          job="Score candidate passages"
          thought="Similarity scores clustered between 0.61 and 0.78; kept the four above threshold."
        />
        <ReasoningLog.Beat
          job="Draft citation set"
          thought="Chose passages 04, 09 and 11 — closest to the question with no overlap."
        />
      </ReasoningLog>
    </div>
  );
}

export const demoSource = `<ReasoningLog showMoreLabel="Show 14 earlier steps">
  <ReasoningLog.Beat
    job="Retrieve workspace index"
    thought="Loaded 3 of 12 candidate documents; two were superseded by later revisions."
  />
  <ReasoningLog.Beat
    job="Score candidate passages"
    thought="Similarity scores clustered between 0.61 and 0.78; kept the four above threshold."
  />
  <ReasoningLog.Beat
    job="Draft citation set"
    thought="Chose passages 04, 09 and 11 — closest to the question with no overlap."
  />
</ReasoningLog>`;
