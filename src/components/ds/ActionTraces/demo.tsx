"use client";

/**
 * ActionTraces demo — granular execution lines nested inside a tool summary
 * on the dark chat canvas.
 */

import React from "react";
import { ActionTraces } from "@/components/ds/ActionTraces";
import { ToolSummaryRow } from "@/components/ds/ToolSummaryRow";

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-900 p-6">
      <ToolSummaryRow
        kind="integration"
        traces={
          <ActionTraces
            items={[
              { kind: "skill", label: "Loaded design skill: charts/palette-audit" },
              { kind: "command", label: "pwd; rg -n \"contrast\" src/components/ds" },
              { kind: "command", label: "bunx tsc --noEmit — clean" },
              {
                kind: "api",
                label: "GET /v1/integrations/superblocks — 200 OK (312ms)",
              },
            ]}
          />
        }
      >
        Used Superblocks integration, loaded a tool, ran a command
      </ToolSummaryRow>
    </div>
  );
}

export const demoSource = `<ActionTraces
  items={[
    { kind: "skill", label: "Loaded design skill: charts/palette-audit" },
    { kind: "command", label: "pwd; rg -n \\"contrast\\" src/components/ds" },
    { kind: "api", label: "GET /v1/integrations/superblocks — 200 OK (312ms)" },
  ]}
/>`;
