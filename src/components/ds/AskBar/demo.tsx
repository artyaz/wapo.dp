"use client";

import { AskBar } from "@/components/ds/AskBar";

export default function Demo() {
  return (
    <div className="w-full max-w-[560px]">
      <AskBar
        placeholder="Summarize this incident timeline…"
        statusText="Answers cite the linked record and its activity log."
      />
    </div>
  );
}

export const demoSource = `<AskBar
  placeholder="Summarize this incident timeline…"
  statusText="Answers cite the linked record and its activity log."
/>`;
