"use client"

import { Markdown } from "@/components/markdown"
import { Typography } from "@/components/ui/typography"

const content = `Typography is the **typeset** system — one stylesheet that styles the
HTML your markdown renderer produces. It ships as *variables* rather than
utilities, so a single override like \`[--typeset-flow:2em]\` retunes an
entire document.

Inline elements work too: *emphasis*, \`inline code\`,
[links](https://ui.shadcn.com), and **strong** text at weight 600.

- Docs density is 15px with a 1.5em flow
- Chat density tightens the flow to 1em
- Every variable is overridable per container

1. Wrap rendered output in a typeset container
2. Pick a density preset
3. Tune the variables you care about

\`\`\`tsx
<Typography variant="docs">
  <Markdown content={content} />
</Typography>
\`\`\``

export function BuildingYourTypesetDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center p-4">
      <Typography variant="docs" className="w-full max-w-2xl">
        <h1>Building your typeset</h1>
        <Markdown
          content={content}
          className="gap-[var(--typeset-flow)] text-[length:var(--typeset-size)]"
        />
        <h2>Why variables beat utilities</h2>
        <blockquote>
          <p>
            A typeset is a contract about rhythm, not a pile of classes. Change
            one variable and every heading, list and code block moves together.
          </p>
        </blockquote>
        <h3>The scale</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Variable</th>
              <th scope="col">Controls</th>
              <th scope="col">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--typeset-size</code>
              </td>
              <td>Body font size</td>
              <td>
                <code>1em</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>--typeset-leading</code>
              </td>
              <td>Body line height</td>
              <td>
                <code>1.75</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>--typeset-flow</code>
              </td>
              <td>Space between blocks</td>
              <td>
                <code>1.25em</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>--typeset-font-heading</code>
              </td>
              <td>Heading family</td>
              <td>
                <code>--font-heading</code>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p>
          Headings, quotes, tables and rules keep the flow rhythm — and inline
          elements like <kbd>⌘</kbd> + <kbd>K</kbd> get their own treatment.
        </p>
        <figure>
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 220'%3E%3Crect width='640' height='220' fill='%23f4f2ec'/%3E%3Crect x='48' y='36' width='230' height='18' rx='4' fill='%2315150f'/%3E%3Crect x='48' y='74' width='430' height='11' rx='4' fill='%23c9c6bd'/%3E%3Crect x='48' y='97' width='390' height='11' rx='4' fill='%23c9c6bd'/%3E%3Crect x='48' y='134' width='180' height='15' rx='4' fill='%2315150f'/%3E%3Crect x='48' y='167' width='460' height='11' rx='4' fill='%23c9c6bd'/%3E%3C/svg%3E"
            alt="Diagram of the docs rhythm: a heading bar followed by evenly spaced body lines"
          />
          <figcaption>
            The docs typeset: a 15px body on a 1.5em flow.
          </figcaption>
        </figure>
      </Typography>
    </div>
  )
}
