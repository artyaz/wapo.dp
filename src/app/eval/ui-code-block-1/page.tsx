"use client"
// EVAL page — code-block p1 — digital news magazine reader — 1280x800 light
// A data-journalism feature: serif article prose (Typography, reading
// variant) with the code behind the chart embedded as CodeBlocks — the
// ink-panel chart component, and a numbered JSON data excerpt.
// Co-stars: Typography, Card, Badge, Button, Avatar, Progress.

import { ArrowUpRight, Github } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBadge,
  CodeBlockCode,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { Progress } from "@/components/ui/progress"
import { Typography } from "@/components/ui/typography"

const chartCode = `import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"

// One gray. Rent burden differs by weight, not hue.
export function RentChart({ wards }: { wards: WardRent[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={wards}>
        <XAxis dataKey="ward" tick={{ fill: "#8A877E" }} />
        <Bar dataKey="medianRent" fill="#4C4A43" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}`

const dataCode = `{
  "tract": "11001008202",
  "neighborhood": "Shaw",
  "median_rent": 2145,
  "units_surveyed": 1123,
  "share_cost_burdened": 0.58,
  "change_pct": -3.2,
  "surveyed_at": "2026-01-31"
}`

const mostRead = [
  "The quiet math of the city's disappearing basement apartments",
  "Five years of eviction filings, mapped block by block",
  "Why your landlord's tax bill dropped and yours didn't",
  "A field guide to the region's 41 affordable-housing waitlists",
  "The school boundary lines that quietly set rents",
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background">
        {/* Masthead */}
        <header className="flex h-14 items-center gap-6 border-b px-6">
          <span className="font-heading-1 text-xl font-semibold tracking-[0.02em] text-foreground">
            The Meridian
          </span>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="cursor-pointer text-foreground">Housing</span>
            <span className="cursor-pointer">Economy</span>
            <span className="cursor-pointer">Climate</span>
            <span className="cursor-pointer">Technology</span>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground">
              Tue, Feb 18, 2026
            </span>
            <Button size="sm" variant="outline">
              Sign in
            </Button>
            <Button size="sm">Subscribe</Button>
          </div>
        </header>
        <div className="px-6 pt-0.5">
          <Progress value={38} className="h-0.5" aria-hidden="true" />
        </div>

        {/* Article + rail — long-form page, natural document scroll */}
        <main className="mx-auto flex w-full max-w-[1120px] flex-1 gap-10 px-6 py-6">
          <article className="flex min-w-0 flex-1 flex-col">
            <span className="font-code text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Data investigation · Housing
            </span>
            <h1 className="mt-2 font-heading-1 text-[34px] leading-[1.15] font-semibold tracking-[-0.01em] text-foreground">
              The rent ate the city. We measured every bite.
            </h1>
            <p className="mt-2 max-w-[640px] font-prose text-[17px] leading-[1.5] text-muted-foreground">
              Two years, 2.4 million listings and one very gray chart: how our
              graphics desk rebuilt the region&rsquo;s rent map from the raw
              scrape up — and published every line of the pipeline.
            </p>
            <div className="mt-3 flex items-center gap-3 border-b pb-4">
              <Avatar size="sm">
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex items-baseline gap-2 text-sm">
                <span className="font-medium text-foreground">
                  By Mara Ellison
                </span>
                <span className="text-muted-foreground">
                  Data reporter · 9 min read · Updated 6:04 AM
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ms-auto gap-1.5 text-muted-foreground"
              >
                <Github className="size-3.5" aria-hidden="true" />
                412 stars
              </Button>
            </div>

            <Typography variant="reading" className="mt-4 text-[17px]">
              <p>
                Every rent map you have ever seen for this city colors its
                pain. Ours refuses to. When we set out to chart median rent by
                ward, the graphics desk adopted a one-hue rule — a single warm
                gray, darkened by weight — so the worst bar is never the
                brightest thing on the page. The chart itself is a plain React
                component, forty lines you can paste into any project:
              </p>
            </Typography>

            <div className="mt-4">
              <CodeBlock code={chartCode} language="tsx" variant="ink">
                <CodeBlockHeader>
                  <CodeBlockTitle>chart.tsx</CodeBlockTitle>
                  <CodeBlockBadge />
                  <CodeBlockActions>
                    <CodeBlockCopyButton />
                  </CodeBlockActions>
                </CodeBlockHeader>
                <CodeBlockCode />
              </CodeBlock>
            </div>

            <Typography variant="reading" className="mt-4 text-[17px]">
              <p>
                The numbers behind each bar come straight from the published
                extract — the same JSON the newsroom&rsquo;s scraper writes
                each night, one record per census tract:
              </p>
            </Typography>

            <div className="mt-4">
              {/* wrap keeps the tract record readable on narrow widths; the
                  full listing is short enough to show without a scroll cap */}
              <CodeBlock code={dataCode} language="json" size="compact">
                <CodeBlockCode showLineNumbers wrap />
              </CodeBlock>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t pt-4">
              <Badge variant="outline" className="font-code text-[10px]">
                Open methodology
              </Badge>
              <span className="text-sm text-muted-foreground">
                Cleaning script · pandas · dedupe rules · errata
              </span>
              <Button variant="link" size="sm" className="ms-auto gap-1">
                Get the data
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Button>
            </div>
          </article>

          {/* Right rail */}
          <aside className="hidden w-[300px] shrink-0 flex-col gap-4 lg:flex">
            <Card className="gap-0 py-0">
              <CardHeader className="border-b px-4 py-3">
                <CardTitle className="text-sm">Most read this week</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col px-0 py-0">
                {mostRead.map((headline, i) => (
                  <div
                    key={headline}
                    className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0"
                  >
                    <span className="font-code text-sm font-medium text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-prose text-sm leading-snug text-foreground">
                      {headline}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-0 py-0">
              <CardHeader className="border-b px-4 py-3">
                <CardTitle className="text-sm">How we did it</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4 py-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["2.4M", "listings"],
                    ["208", "weeks"],
                    ["41", "wards"],
                  ].map(([value, label]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="font-code text-lg text-foreground">
                        {value}
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Listings scraped nightly, geocoded to tracts, weighted by
                  unit count. Nothing behind a paywall — including the code.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Github className="size-3.5" aria-hidden="true" />
                  newsroom/rent-map
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-0 py-0">
              <CardContent className="flex items-center gap-3 px-4 py-4">
                <Avatar size="sm">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Mara Ellison
                  </p>
                  <p className="font-caption text-caption text-muted-foreground">
                    Covers housing markets and the data underneath them
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </main>

        <footer className="flex h-10 items-center justify-between border-t px-6">
          <span className="font-caption text-caption text-muted-foreground">
            © 2026 The Meridian · methodology edited by the standards desk
          </span>
          <span className="font-code text-xs text-muted-foreground">
            extract v2026.02.18 · 3:12 AM
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
