"use client";

import { SlaTimer } from "@/components/ds/SlaTimer";

const rows = [
  { label: "neutral", tone: "neutral" as const, timecode: "00:14:52", showDot: true },
  { label: "warning", tone: "warning" as const, timecode: "00:04:32", showDot: true },
  { label: "breach", tone: "breach" as const, timecode: "00:00:18", showDot: true },
  { label: "no dot", tone: "neutral" as const, timecode: "00:30:00", showDot: false },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-[560px] flex-col items-start gap-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-4">
          <span className="w-16 flex-none text-caption font-caption text-neutral-500">
            {row.label}
          </span>
          <SlaTimer
            tone={row.tone}
            timecode={row.timecode}
            showDot={row.showDot}
          />
        </div>
      ))}
    </div>
  );
}

export const demoSource = `<SlaTimer tone="neutral" timecode="00:14:52" showDot />
<SlaTimer tone="warning" timecode="00:04:32" showDot />
<SlaTimer tone="breach" timecode="00:00:18" showDot />
<SlaTimer timecode="00:30:00" />`;
