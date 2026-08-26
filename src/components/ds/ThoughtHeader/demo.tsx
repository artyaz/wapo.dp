"use client";

/**
 * ThoughtHeader demo — a collapsed and an expanded execution header on the
 * dark chat canvas; the expanded one reveals a short reasoning log styled
 * for the dark surface.
 */

import React from "react";
import { ThoughtHeader } from "@/components/ds/ThoughtHeader";

function LogLine({
  state,
  children,
}: {
  state: "done" | "active";
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-2.5">
      <span
        aria-hidden="true"
        className={
          state === "done"
            ? "mt-[7px] h-[5px] w-[5px] flex-none rounded-full bg-neutral-600"
            : "mt-[6px] h-[7px] w-[7px] flex-none animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-neutral-400 motion-reduce:animate-none"
        }
      />
      <p
        className={
          state === "done"
            ? "min-w-0 text-[13px] leading-[20px] text-neutral-400"
            : "min-w-0 text-[13px] leading-[20px] text-neutral-200"
        }
      >
        {children}
      </p>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-8 rounded-lg bg-neutral-900 p-6">
      <ThoughtHeader label="Worked for 3m 51s" defaultOpen>
        <div className="flex flex-col gap-2.5">
          <LogLine state="done">
            Scanned 50 registered components for contrast regressions — 12
            low-contrast text nodes found
          </LogLine>
          <LogLine state="done">
            Patched neutral-400 labels to neutral-500 across the library
          </LogLine>
          <LogLine state="active">
            Re-running the visual audit to confirm the fixes
          </LogLine>
        </div>
      </ThoughtHeader>

      <ThoughtHeader label="Worked for 22s" />
    </div>
  );
}

export const demoSource = `<ThoughtHeader label="Worked for 3m 51s" defaultOpen>
  {/* reasoning log — your own log lines rendered as children */}
  <LogLine state="done">
    Scanned 50 registered components for contrast regressions
  </LogLine>
  <LogLine state="active">
    Re-running the visual audit to confirm the fixes
  </LogLine>
</ThoughtHeader>

<ThoughtHeader label="Worked for 22s" />`;
