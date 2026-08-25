"use client"

import { Markdown } from "@/components/markdown"
import { Typography } from "@/components/ui/typography"

const content = `The same markdown, two densities. Docs reads roomy, chat reads tight.

- flow shrinks from **1.5em** to **1em**
- leading drops from 1.75 to 1.6
- size stays at the inherited body

Inline \`code\` and [links](https://ui.shadcn.com) scale with the container.

\`\`\`css
.typeset-chat { --typeset-flow: 1em; }
\`\`\``

export function CustomTypesetsDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6 p-4">
      <div className="flex min-w-64 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          typeset-docs
        </p>
        <Typography variant="docs">
          <Markdown
            content={content}
            className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
          />
        </Typography>
      </div>
      <div className="flex min-w-64 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          typeset-chat
        </p>
        <Typography variant="chat">
          <Markdown
            content={content}
            className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
          />
        </Typography>
      </div>
      <div className="flex min-w-64 flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          typeset [--typeset-flow:1.75em]
        </p>
        <Typography variant="default" className="[--typeset-flow:1.75em]">
          <Markdown
            content={content}
            className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
          />
        </Typography>
      </div>
    </div>
  )
}
