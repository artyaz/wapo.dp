"use client"

import { Markdown } from "@/components/markdown"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"

export function OptingOutDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center p-4">
      <Typography variant="docs" className="w-full max-w-2xl">
        <h2>Opting out</h2>
        <p>
          Everything inside a <code>not-typeset</code> element is untouched by
          the scale — embedded components render exactly as they would outside
          the typeset.
        </p>
        <Markdown
          content={`Drop a component into the prose and mark it \`not-typeset\`: its
margins, fonts and colors revert through \`revert-layer\`, while the
surrounding **prose keeps its rhythm**.`}
          className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
        />
        <Card className="not-typeset">
          <CardHeader>
            <CardTitle>Untouched component</CardTitle>
            <CardDescription>
              Rounded, bordered, 14px — exactly as outside the typeset.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No serif headings, no prose rhythm — the card keeps its own
              design.
            </p>
            <Button variant="outline" size="sm" className="mt-4">
              Still a button
            </Button>
          </CardContent>
        </Card>
        <p>Back inside the typeset, the prose rhythm resumes.</p>
      </Typography>
    </div>
  )
}
