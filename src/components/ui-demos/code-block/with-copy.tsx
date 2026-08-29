"use client"

// CodeBlock — with copy: a filename header carrying copy + download actions.
// The copy button is the family's CodeBlockCopyButton; download is a plain
// outline Button writing the snippet to a file.

import { Download, FileCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBadge,
  CodeBlockCode,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"

const FILENAME = "sync.config.ts"

const code = `// sync.config.ts — offline-first sync for the mobile client
export const sync = {
  apiBase: "https://api.replog.dev/v2",
  timeoutMs: 8000,
  retries: 3,
  batch: {
    maxSize: 50,
    flushIntervalMs: 15000,
  },
  webhook: {
    url: "https://hooks.replog.dev/9f2c",
    events: ["workout.completed", "personal_record.hit"],
  },
} as const`

export function CodeBlockWithCopy() {
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = FILENAME
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex w-full max-w-[640px] flex-col">
      <CodeBlock code={code} language="tsx">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <FileCode className="size-3.5 shrink-0" aria-hidden="true" />
            {FILENAME}
          </CodeBlockTitle>
          <CodeBlockBadge />
          <CodeBlockActions>
            <CodeBlockCopyButton />
            <Button
              variant="outline"
              size="icon-xs"
              className="[&_svg]:size-3.5"
              aria-label={`Download ${FILENAME}`}
              onClick={handleDownload}
            >
              <Download aria-hidden="true" />
            </Button>
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockCode />
      </CodeBlock>
    </div>
  )
}
