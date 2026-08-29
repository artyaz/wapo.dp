"use client"

import { MentionInput } from "@/components/ui/mention"
import type { MentionItem } from "@/components/ui/mention"

const ON_CALL: MentionItem[] = [
  {
    id: "u-maya",
    value: "maya",
    label: "Maya Okafor",
    description: "Incident commander",
  },
  {
    id: "u-dana",
    value: "dana",
    label: "Dana Whitfield",
    description: "SRE on-call",
  },
  {
    id: "u-marcus",
    value: "marcus",
    label: "Marcus Webb",
    description: "Backend on-call",
  },
  {
    id: "u-priya",
    value: "priya",
    label: "Priya Raman",
    description: "Support liaison",
  },
  {
    id: "u-mei",
    value: "mei",
    label: "Mei Chen",
    description: "Mobile on-call",
  },
]

/**
 * With avatars — team mentions with avatar rows and role descriptions.
 * The popup opens on a bare `@` so the full on-call roster is visible.
 */
export function MentionWithAvatars() {
  return (
    <div className="flex w-full max-w-[640px] flex-col items-start gap-3">
      <div className="flex w-full flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">
          Incident follow-up
        </span>
        <MentionInput
          aria-label="Incident follow-up note"
          placeholder="Write a follow-up… use @ to page the on-call"
          mentions={[{ trigger: "@", label: "On-call", data: ON_CALL }]}
          defaultValue={[
            "Sev-2 is mitigated — checkout latency is back under 400 ms. ",
            { trigger: "@", value: "maya", label: "Maya Okafor" },
            " is writing the timeline. Pulling in ",
          ]}
          defaultQuery={{ trigger: "@", query: "" }}
          showHints
        />
      </div>
      <p className="text-muted-foreground text-xs">
        Rows show avatar, name and on-call role; the token that gets inserted
        (<span className="font-code text-foreground">@dana</span>) is previewed
        on the right of each row.
      </p>
    </div>
  )
}
