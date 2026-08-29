"use client"

// CodeBlock — line numbers: a numbered gutter with soft wrapping and a
// max-height scroll area, the shape long listings usually need.

import {
  CodeBlock,
  CodeBlockBadge,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"

const code = `// ingest.ts — nightly import of census rent tables into the warehouse
import { createHash } from "node:crypto"

interface RentRow {
  tract: string
  rent: number
  units: number
}

export async function ingestRentTable(source: string, rows: RentRow[]) {
  const batchId = createHash("sha256").update(source).digest("hex").slice(0, 12)
  const seen = new Set<string>()

  for (const row of rows) {
    if (seen.has(row.tract)) {
      throw new Error(
        \`Duplicate tract \${row.tract} in \${source} (batch \${batchId}) — the census extract for the Shaw / Logan Circle corridor is known to double-list tracts 11001008202 and 11001008201, so the loader keeps a per-batch set and fails loudly instead of silently upserting twice\`
      )
    }
    seen.add(row.tract)
    await warehouse.insert("rents", {
      ...row,
      batchId,
      ingestedAt: new Date().toISOString(),
    })
  }

  return { batchId, rows: rows.length }
}`

export function CodeBlockLineNumbers() {
  return (
    <div className="flex w-full max-w-[640px] flex-col">
      <CodeBlock code={code} language="typescript">
        <CodeBlockHeader>
          <CodeBlockTitle>ingest.ts</CodeBlockTitle>
          <CodeBlockBadge language="typescript" />
        </CodeBlockHeader>
        <CodeBlockCode showLineNumbers wrap maxHeight={280} />
      </CodeBlock>
    </div>
  )
}
