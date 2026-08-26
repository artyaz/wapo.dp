"use client";

/**
 * JumpToLatest demo — the FAB floating over the bottom-right corner of a
 * tall execution transcript, plus a hidden-state variant beneath it.
 */

import React from "react";
import { JumpToLatest } from "@/components/ds/JumpToLatest";
import { ToolSummaryRow } from "@/components/ds/ToolSummaryRow";
import { ActionTraces } from "@/components/ds/ActionTraces";

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-neutral-900 p-6">
      <div className="relative flex max-h-[280px] flex-col gap-3 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
        <ToolSummaryRow kind="integration">Used Superblocks integration</ToolSummaryRow>
        <ToolSummaryRow kind="command">Ran 14 shell commands</ToolSummaryRow>
        <ToolSummaryRow kind="skill">Loaded 2 design skills</ToolSummaryRow>
        <ToolSummaryRow
          kind="command"
          traces={
            <ActionTraces
              items={[
                { kind: "command", label: "bunx tsc --noEmit" },
                { kind: "command", label: "bunx eslint src --max-warnings 0" },
                { kind: "api", label: "POST /v1/screenshots — 200 OK (1.2s)" },
              ]}
            />
          }
        >
          Running the verification suite…
        </ToolSummaryRow>

        {/* floated bottom-right of the transcript frame */}
        <div className="absolute right-4 bottom-4">
          <JumpToLatest />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <JumpToLatest visible={false} />
        <span className="text-[12px] text-neutral-600">
          hidden state — drives itself from streaming state via the visible prop
        </span>
      </div>
    </div>
  );
}

export const demoSource = `<div className="relative overflow-hidden">
  {/* …long execution transcript… */}

  <div className="absolute right-4 bottom-4">
    <JumpToLatest />
  </div>
</div>

<JumpToLatest visible={false} />`;
