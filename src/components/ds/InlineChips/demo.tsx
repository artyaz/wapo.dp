"use client";

/**
 * InlineChips demo — the three atoms woven into a sentence of agent prose
 * on the dark chat canvas.
 */

import React from "react";
import {
  InlineChips,
} from "@/components/ds/InlineChips";

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-900 p-6">
      <p className="text-[14px] leading-[24px] text-neutral-300">
        <InlineChips.IntegrationAvatar glyph="S" /> Used Superblocks
        integration, then edited{" "}
        <InlineChips.FileRef kind="tsx" path="src/components/ds">
          GlassChip.tsx
        </InlineChips.FileRef>{" "}
        and verified with <InlineChips.CodePill>bunx tsc --noEmit</InlineChips.CodePill>.
      </p>
      <p className="text-[14px] leading-[24px] text-neutral-300">
        Wrote the config to{" "}
        <InlineChips.FileRef kind="json">sync.json</InlineChips.FileRef> and
        the docs to{" "}
        <InlineChips.FileRef kind="md">README.md</InlineChips.FileRef>, then
        published under{" "}
        <InlineChips.CodePill>@praxis/ai-elements</InlineChips.CodePill>.
      </p>
    </div>
  );
}

export const demoSource = `<p>
  <InlineChips.IntegrationAvatar glyph="S" /> Used Superblocks
  integration, then edited{" "}
  <InlineChips.FileRef kind="tsx" path="src/components/ds">
    GlassChip.tsx
  </InlineChips.FileRef>{" "}
  and verified with{" "}
  <InlineChips.CodePill>bunx tsc --noEmit</InlineChips.CodePill>.
</p>`;
