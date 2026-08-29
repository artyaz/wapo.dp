"use client"

// CodeBlock — syntax highlight: TypeScript on the paper panel and JSON on
// the ink panel. Both are highlighted by the same monochrome theme; tokens
// are told apart by weight and neutral step, never by hue.

import {
  CodeBlock,
  CodeBlockBadge,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"

const ts = `// Median rent, weighted by unit count in each census tract.
export function medianRent(rows: RentRow[]): number {
  const rents = rows
    .filter((row) => row.units > 0)
    .map((row) => row.rent)
    .sort((a, b) => a - b)

  const mid = Math.floor(rents.length / 2)
  return rents.length % 2 === 0
    ? (rents[mid - 1] + rents[mid]) / 2
    : rents[mid]
}`

const json = `{
  "tract": "11001008202",
  "neighborhood": "Shaw",
  "median_rent": 2145,
  "units_surveyed": 1123,
  "change_pct": -3.2,
  "surveyed_at": "2026-01-31"
}`

export function CodeBlockSyntaxHighlight() {
  return (
    <div className="flex w-full max-w-[640px] flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="font-code text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          Paper panel · TypeScript
        </span>
        <CodeBlock code={ts} language="tsx">
          <CodeBlockHeader>
            <CodeBlockTitle>median-rent.ts</CodeBlockTitle>
            <CodeBlockBadge />
          </CodeBlockHeader>
          <CodeBlockCode />
        </CodeBlock>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-code text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          Ink panel · JSON
        </span>
        <CodeBlock code={json} language="json" variant="ink">
          <CodeBlockCode />
        </CodeBlock>
      </div>
    </div>
  )
}
