"use client";

import React from "react";
import { AgentActivity } from "./AgentActivity";

export const demoSource = `import { AgentActivity } from "@/components/ds/AgentActivity";

<AgentActivity label="Worked for 3m 51s" defaultOpen steps={[
  {
    kind: "integration",
    summary: "Used Superblocks integration and loaded a design skill",
    traces: [
      { kind: "skill", label: "skill design-system tokens --section glass" },
      { kind: "api", label: "GET /v1/integrations/superblocks/status" },
    ],
  },
  {
    kind: "command",
    summary: "Ran a shell command to audit the glass surfaces",
    command: {
      code: "rg -n 'backdrop-filter' src/components/ds | wc -l",
      exitCode: 0,
      duration: "1.8s",
      output: "18",
    },
  },
  {
    kind: "edits",
    summary: "Edited 4 components to adopt the base glass container",
  },
]} />`;

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-start gap-6 p-6">
      <AgentActivity label="Worked for 3m 51s" defaultOpen steps={[
        {
          kind: "integration",
          summary: "Used Superblocks integration and loaded a design skill",
          traces: [
            { kind: "skill", label: "skill design-system tokens --section glass" },
            { kind: "api", label: "GET /v1/integrations/superblocks/status" },
          ],
        },
        {
          kind: "command",
          summary: "Ran a shell command to audit the glass surfaces",
          command: {
            code: "rg -n 'backdrop-filter' src/components/ds | wc -l",
            exitCode: 0,
            duration: "1.8s",
            output: "18",
          },
        },
        {
          kind: "edits",
          summary: "Edited 4 components to adopt the base glass container",
        },
      ]} />

      <AgentActivity label="Worked for 22s" />

      <AgentActivity label="Currently working…">
        <AgentActivity.Step
          kind="command"
          summary="Running the evaluation suite"
          command={{
            code: "bun run eval --pairs 180 --model agy-image",
            exitCode: null,
          }}
        />
      </AgentActivity>
    </div>
  );
}
