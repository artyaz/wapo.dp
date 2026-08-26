"use client"

import { Typography } from "@/components/ui/typography"

export function OverridesDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center p-4">
      <Typography variant="docs" className="w-full max-w-2xl">
        <h2>Utilities still win</h2>
        <p>
          Every typeset rule lives in the components layer, so a single
          utility class overrides it — no specificity fights, no{" "}
          <code>!important</code>.
        </p>
        <p className="text-lg">
          This paragraph opts into <code className="text-sm">text-lg</code>{" "}
          while keeping the typeset flow.
        </p>
        <p className="text-muted-foreground">
          This one goes quiet with <code className="text-sm">text-muted-foreground</code>.
        </p>
        <p>
          A{" "}
          <a href="#" className="text-destructive">
            destructive link
          </a>{" "}
          keeps its typeset underline but takes its color from the utility.
        </p>
        <blockquote className="not-italic">
          <p>
            Even blockquotes can drop the italic with{" "}
            <code className="text-sm">not-italic</code> — the border and
            spacing stay.
          </p>
        </blockquote>
      </Typography>
    </div>
  )
}
