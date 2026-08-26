"use client";

/**
 * AssistantMessage demo — a final response with prose, a bullet list, a
 * quote and a closing remark on the dark chat canvas.
 */

import React from "react";
import { AssistantMessage } from "@/components/ds/AssistantMessage";

export default function Demo() {
  return (
    <div className="flex w-full rounded-lg bg-neutral-900 p-6">
      <AssistantMessage className="max-w-[560px]">
        <AssistantMessage.Paragraph>
          The contrast audit is done. Twelve low-contrast text nodes were
          found across the library and patched to neutral-500 or brighter.
        </AssistantMessage.Paragraph>
        <AssistantMessage.List
          items={[
            "Replaced 8 instances of neutral-400 labels with neutral-500",
            "Raised two destructive captions from 3.1:1 to 4.8:1 contrast",
            "Verified all 50 component pages at 390px, 1024px and 1440px",
          ]}
        />
        <AssistantMessage.Quote>
          WCAG 2.1 AA requires 4.5:1 for normal text; the library now clears
          it everywhere except decorative specimen lines.
        </AssistantMessage.Quote>
        <AssistantMessage.Paragraph>
          Ready to push — say the word and I will open the branch.
        </AssistantMessage.Paragraph>
      </AssistantMessage>
    </div>
  );
}

export const demoSource = `<AssistantMessage>
  <AssistantMessage.Paragraph>
    The contrast audit is done. Twelve low-contrast text nodes were
    found across the library and patched to neutral-500 or brighter.
  </AssistantMessage.Paragraph>
  <AssistantMessage.List
    items={[
      "Replaced 8 instances of neutral-400 labels with neutral-500",
      "Raised two destructive captions from 3.1:1 to 4.8:1 contrast",
    ]}
  />
</AssistantMessage>`;
