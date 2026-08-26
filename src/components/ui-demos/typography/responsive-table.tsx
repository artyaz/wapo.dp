"use client"

import { Typography } from "@/components/ui/typography"

export function ResponsiveTableDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center p-4">
      <Typography variant="docs" className="w-full max-w-md">
        <h3>Responsive tables</h3>
        <p>
          Wide tables scroll inside <code>.typeset-scroll</code> instead of
          breaking the layout. The table keeps its typeset styling — hairline
          rules, tabular numerals, a stronger header border.
        </p>
        <div className="typeset-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Preset</th>
                <th scope="col">Size</th>
                <th scope="col">Leading</th>
                <th scope="col">Flow</th>
                <th scope="col">Heading font</th>
                <th scope="col">Body font</th>
                <th scope="col">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>docs</td>
                <td>15px</td>
                <td>1.75</td>
                <td>1.5em</td>
                <td>Serif</td>
                <td>Inherited</td>
                <td>Documentation pages</td>
              </tr>
              <tr>
                <td>chat</td>
                <td>1em</td>
                <td>1.6</td>
                <td>1em</td>
                <td>Serif</td>
                <td>Inherited</td>
                <td>Streaming messages</td>
              </tr>
              <tr>
                <td>reading</td>
                <td>18px</td>
                <td>1.9</td>
                <td>2em</td>
                <td>Serif</td>
                <td>Serif</td>
                <td>Long-form articles</td>
              </tr>
              <tr>
                <td>compact</td>
                <td>14px</td>
                <td>1.6</td>
                <td>1em</td>
                <td>Sans</td>
                <td>Sans</td>
                <td>Dense UI copy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Typography>
    </div>
  )
}
