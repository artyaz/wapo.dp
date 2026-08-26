"use client";

/**
 * Button demo — variant × size matrix plus icon, icon-only and loading states.
 */

import React from "react";
import { Button } from "@/components/ds/Button";

const rows = [
  { variant: "primary" as const, label: "Save changes" },
  { variant: "secondary" as const, label: "Preview" },
  { variant: "ghost" as const, label: "Dismiss" },
  { variant: "danger" as const, label: "Stop capture" },
];

const sizes = ["small", "medium", "large"] as const;

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        {rows.map(({ variant, label }, rowIndex) => (
          <div key={variant} className="flex flex-wrap items-start gap-3">
            {sizes.map((size) => (
              <div
                key={size}
                className="flex min-w-0 flex-col items-center gap-1.5"
              >
                <Button variant={variant} size={size}>
                  {label}
                </Button>
                {/* quiet column labels, anchored to the first row so the
                    size order reads top-down without repeating 12 times */}
                {rowIndex === 0 ? (
                  <span className="text-caption font-caption text-neutral-400">
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button icon="＋">New record</Button>
        <Button variant="secondary" icon="⌕" iconOnly />
        <Button variant="ghost" loading>
          Saving
        </Button>
      </div>
    </div>
  );
}

export const demoSource = `<Button variant="primary" size="medium">Save changes</Button>
<Button variant="secondary" size="medium">Preview</Button>
<Button variant="ghost" size="medium">Dismiss</Button>
<Button variant="danger" size="large">Stop capture</Button>

<Button icon="＋">New record</Button>
<Button variant="secondary" icon="⌕" iconOnly />
<Button variant="ghost" loading>Saving</Button>`;
