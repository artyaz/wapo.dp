"use client";

/**
 * Demo — a two-tab strip: transcript.md active (lifted onto the pane, top
 * brand rule) and notes.md inactive, over a quiet markdown preview with mono
 * line numbers. Fully static content.
 */

import React from "react";
import { EditorTab } from "@/components/ds/EditorTab";

const LINES = [
  "# Interview — session 12",
  "[00:00:12] Room tone, take three. Ambience only.",
  "[00:00:48] Interviewer: Let's start with the timeline.",
  "[00:01:30] Subject: The material system, I think —",
  "[00:02:04] [crosstalk, 2 s]",
];

export default function Demo() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
      <div className="flex w-full items-stretch">
        <EditorTab label="transcript.md" glyph="¶" active />
        <EditorTab label="notes.md" glyph="md" />
        <div className="h-9 grow border-b border-solid border-default-border" />
      </div>
      <div className="flex flex-col gap-1 bg-panel px-4 py-3">
        {LINES.map((line, index) => (
          <div key={index} className="flex items-baseline gap-3">
            <span className="w-4 flex-none text-right font-code text-[10px] leading-[18px] text-neutral-400 tabular-nums">
              {index + 1}
            </span>
            <span className="font-code text-[12px] leading-[18px] text-neutral-600">
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const demoSource = `<div className="flex items-stretch">
  <EditorTab label="transcript.md" glyph="¶" active />
  <EditorTab label="notes.md" glyph="md" />
  <div className="h-9 grow border-b border-solid border-default-border" />
</div>`;
