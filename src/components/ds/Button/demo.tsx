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
    <div className="flex w-fit flex-col gap-6">
      <div className="flex flex-col gap-3">
        {rows.map(({ variant, label }) => (
          <div key={variant} className="flex items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {label}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
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
