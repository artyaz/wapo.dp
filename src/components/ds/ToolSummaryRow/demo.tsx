"use client";

/**
 * ToolSummaryRow demo — an aggregated execution event on the dark chat
 * canvas, with granular ActionTraces nested underneath.
 */

import React from "react";
import { ToolSummaryRow } from "@/components/ds/ToolSummaryRow";
import { ActionTraces } from "@/components/ds/ActionTraces";

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-900 p-6">
      <ToolSummaryRow
        kind="integration"
        traces={
          <ActionTraces
            items={[
              {
                kind: "api",
                label: "GET /v1/integrations/superblocks — 200 OK (312ms)",
              },
              {
                kind: "command",
                label: "pwd; rg -n \"contrast\" src/components/ds",
              },
              {
                kind: "skill",
                label: "Loaded design skill: liquid-glass audit checklist",
              },
            ]}
          />
        }
      >
        Used Superblocks integration, loaded a tool, ran a command
      </ToolSummaryRow>

      <ToolSummaryRow kind="edits">Edited 3 files in src/components/ds</ToolSummaryRow>

      <ToolSummaryRow kind="command">
        Ran the test suite — 148 passed, 0 failed
      </ToolSummaryRow>
    </div>
  );
}

export const demoSource = `<ToolSummaryRow
  kind="integration"
  traces={
    <ActionTraces
      items={[
        { kind: "api", label: "GET /v1/integrations/superblocks — 200 OK" },
        { kind: "command", label: "pwd; rg -n \\"contrast\\" src/components/ds" },
        { kind: "skill", label: "Loaded design skill: liquid-glass audit" },
      ]}
    />
  }
>
  Used Superblocks integration, loaded a tool, ran a command
</ToolSummaryRow>

<ToolSummaryRow kind="edits">Edited 3 files in src/components/ds</ToolSummaryRow>`;
