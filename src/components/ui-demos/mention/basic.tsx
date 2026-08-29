"use client"

import { MentionInput } from "@/components/ui/mention"
import type { MentionItem } from "@/components/ui/mention"

const TEAM: MentionItem[] = [
  { id: "u-maya", value: "maya", label: "Maya Okafor", description: "Design lead" },
  { id: "u-marcus", value: "marcus", label: "Marcus Webb", description: "Backend" },
  { id: "u-priya", value: "priya", label: "Priya Raman", description: "Product" },
  { id: "u-dana", value: "dana", label: "Dana Whitfield", description: "QA" },
  { id: "u-tomas", value: "tomas", label: "Tomás Aguilar", description: "Data" },
  { id: "u-mei", value: "mei", label: "Mei Chen", description: "iOS" },
]

/**
 * Basic — an @ mention composer. The field opens with a chip already
 * inserted and a live `@ma` query at the caret, so the suggestion popup
 * renders open with filtered rows.
 */
export function MentionBasic() {
  return (
    <div className="flex w-full max-w-[640px] flex-col items-start gap-3">
      <div className="flex w-full flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">
          Handoff comment
        </span>
        <MentionInput
          aria-label="Handoff comment"
          placeholder="Write a comment… use @ to mention a teammate"
          mentions={[{ trigger: "@", label: "People", data: TEAM }]}
          defaultValue={[
            "Cutover checklist is signed off — ",
            { trigger: "@", value: "priya", label: "Priya Raman" },
            " owns the rollback plan. Looping in ",
          ]}
          defaultQuery={{ trigger: "@", query: "ma" }}
          showHints
        />
      </div>
      <p className="text-muted-foreground text-xs">
        Type <span className="font-code text-foreground">@</span> to mention a
        teammate — mention chips notify the person and survive copy-paste.
      </p>
    </div>
  )
}
