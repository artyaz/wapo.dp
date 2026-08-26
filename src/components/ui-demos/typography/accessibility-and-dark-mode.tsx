"use client"

import { Markdown } from "@/components/markdown"
import { Typography } from "@/components/ui/typography"

const content = `The large preset sets a 16px body, a 2 line-height and a 2em flow —
comfortable for long reading sessions and screen magnifiers.`

export function AccessibilityAndDarkModeDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6 p-4">
      <div className="flex min-w-72 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Light — typeset-large
        </p>
        <Typography variant="large">
          <Markdown
            content={content}
            className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
          />
          <p>
            Line height and flow both stretch to give the eye more room to
            track.
          </p>
        </Typography>
      </div>
      <div className="flex min-w-72 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Dark — leading bumps to 1.9
        </p>
        <div className="dark rounded-lg border border-border bg-background p-4">
          <Typography variant="docs">
            <p>
              Light text on a dark field blooms, so the typeset adds a little
              extra leading in dark mode — no class changes required.
            </p>
            <p>
              <code>.dark .typeset</code> retunes the scale the same way every
              other preset does.
            </p>
          </Typography>
        </div>
      </div>
    </div>
  )
}
