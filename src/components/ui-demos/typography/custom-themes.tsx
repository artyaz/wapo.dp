"use client"

import { Markdown } from "@/components/markdown"
import { Typography } from "@/components/ui/typography"

const content = `Reading sets a *serif* body at 18px with a 2em flow — long-form
comfort. Compact goes the other way: a 14px sans body on a 1em flow,
for dense UI copy.

Both are just variable presets:

- reading: 18px / 1.9 leading / 2em flow
- compact: 14px / 1.6 leading / 1em flow`

export function CustomThemesDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6 p-4">
      <div className="flex min-w-64 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          typeset-reading
        </p>
        <Typography variant="reading">
          <Markdown
            content={content}
            className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
          />
        </Typography>
      </div>
      <div className="flex min-w-64 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          typeset-compact
        </p>
        <Typography variant="compact">
          <Markdown
            content={content}
            className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
          />
        </Typography>
      </div>
    </div>
  )
}
