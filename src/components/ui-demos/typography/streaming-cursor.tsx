"use client"

import { Markdown } from "@/components/markdown"
import { Typography } from "@/components/ui/typography"

export function StreamingCursorDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center p-4">
      <Typography variant="chat" className="w-full max-w-md">
        <Markdown
          content={`Reading your **typeset** config…

- docs density detected
- flow: 1em, leading: 1.6
- headings resolve to the serif stack`}
          className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
        />
        <p>
          The remaining variables are inherited from the
          <span className="streaming-cursor" />
        </p>
      </Typography>
    </div>
  )
}
