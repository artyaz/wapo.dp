"use client";

/**
 * Demo — four lines from one deploy session: the prompt, its stdout, a retry
 * error from the edge region, and the success line. Fixed transcript.
 */

import React from "react";
import { TerminalLine } from "@/components/ds/TerminalLine";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[520px] flex-col gap-0.5 rounded-lg border border-solid border-default-border bg-panel px-4 py-3">
      <TerminalLine
        variant="prompt"
        path="~/praxis"
        command="deploy --env production"
      />
      <TerminalLine variant="stdout" text="building 42 modules" />
      <TerminalLine
        variant="stderr"
        text="error: edge region euw-2 unreachable — retry 1/3"
      />
      <TerminalLine variant="success" text="deploy complete · 12.4s" />
    </div>
  );
}

export const demoSource = `<TerminalLine variant="prompt" path="~/praxis" command="deploy --env production" />
<TerminalLine variant="stdout" text="building 42 modules" />
<TerminalLine variant="stderr" text="error: edge region euw-2 unreachable — retry 1/3" />
<TerminalLine variant="success" text="deploy complete · 12.4s" />`;
