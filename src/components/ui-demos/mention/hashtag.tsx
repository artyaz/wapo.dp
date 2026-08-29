"use client"

import { MentionInput, MentionTag } from "@/components/ui/mention"
import type { MentionItem } from "@/components/ui/mention"

const TOPICS: MentionItem[] = [
  { id: "t-release", value: "release-notes", label: "Release notes", description: "42 posts" },
  { id: "t-incident", value: "incident", label: "Incident review", description: "18 posts" },
  { id: "t-design", value: "design-review", label: "Design review", description: "31 posts" },
  { id: "t-hiring", value: "hiring", label: "Hiring", description: "12 posts" },
  { id: "t-howto", value: "how-to", label: "How-to guides", description: "57 posts" },
  { id: "t-retro", value: "retro", label: "Retro", description: "9 posts" },
]

/**
 * Hashtag — a # topic tag composer. Tags insert as outline chips and the
 * popup filters live against the typed query (`#re` → release notes,
 * retro…).
 */
export function MentionHashtag() {
  return (
    <div className="flex w-full max-w-[640px] flex-col items-start gap-3">
      <div className="flex w-full flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">
          Post to the team digest
        </span>
        <MentionInput
          aria-label="Post to the team digest"
          placeholder="Summarize the week… use # to tag a topic"
          mentions={[{ trigger: "#", label: "Topics", data: TOPICS }]}
          defaultValue={[
            "Weekly digest for ",
            { trigger: "#", value: "design-review", label: "Design review" },
            " — 3 specs approved, 1 parked. Also filing this under ",
          ]}
          defaultQuery={{ trigger: "#", query: "re" }}
          showHints
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-xs">Subscribed tags:</span>
        <MentionTag>release-notes</MentionTag>
        <MentionTag>design-review</MentionTag>
        <MentionTag>how-to</MentionTag>
      </div>
    </div>
  )
}
