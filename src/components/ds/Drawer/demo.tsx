"use client";

/**
 * Drawer demo — a right-anchored sheet with a few rows of session metadata,
 * sliding in over the component's own scrim. The clipped frame stands in for
 * the viewport; modal and auto-focus are disabled so the embedded demo never
 * traps the page around it.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { Drawer } from "@/components/ds/Drawer";
import { Button } from "@/components/ds/Button";

const rows = [
  { label: "Recorded", value: "Aug 14, 2025 · 42 min" },
  { label: "Participants", value: "4 — Maya, Jonas, Priya, Sam" },
  { label: "Retention", value: "90 days · expires Nov 12" },
];

export default function Demo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="relative h-80 w-full overflow-hidden rounded-lg border border-default-border bg-default-background">
        {/* quiet page sitting under the scrim */}
        <div className="absolute inset-0 flex flex-col gap-3 p-6">
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            Transcripts / Q3 planning session
          </span>
          <p className="text-body font-body text-default-font/60">
            So the retention window moves to ninety days on the first of
            October.
          </p>
          <p className="text-body font-body text-default-font/60">
            Agreed — I&apos;ll update the export job before the review.
          </p>
          <p className="text-body font-body text-default-font/60">
            Notes and action items are attached to the calendar invite.
          </p>
        </div>

        <Drawer
          open={open}
          onOpenChange={setOpen}
          direction="right"
          modal={false}
        >
          <Drawer.Content aria-describedby={undefined}>
            <div className="flex w-[320px] max-w-full flex-col items-start gap-6 p-6">
              <div className="flex w-full flex-col items-start gap-1.5">
                <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
                  Session details
                </SubframeCore.Drawer.Title>
                <span className="text-caption font-caption text-neutral-500">
                  Q3 planning session
                </span>
              </div>
              <div className="flex w-full flex-col items-start">
                {rows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-3 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                      {label}
                    </span>
                    <span className="text-body font-body text-default-font">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Drawer.Content>
        </Drawer>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="small"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Close drawer" : "Open drawer"}
        </Button>
        <span className="text-caption font-caption text-neutral-500">
          {/* The sheet is anchored to the right edge, so the drag-to-dismiss
              direction is toward the right; Esc only exists on keyboards. */}
          <span className="mobile:hidden">
            Drag the sheet right or press Escape to dismiss.
          </span>
          <span className="hidden mobile:inline">
            Drag the sheet right to dismiss.
          </span>
        </span>
      </div>
    </div>
  );
}

export const demoSource = `const [open, setOpen] = useState(true);

<Drawer open={open} onOpenChange={setOpen} direction="right">
  <Drawer.Content>
    <div className="flex w-[320px] max-w-full flex-col items-start gap-6 p-6">
      <div className="flex w-full flex-col items-start gap-1.5">
        <span className="text-heading-2 font-heading-2 text-default-font">
          Session details
        </span>
        <span className="text-caption font-caption text-neutral-500">
          Q3 planning session
        </span>
      </div>
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-3 first:border-t-0 first:pt-0">
          <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
            Recorded
          </span>
          <span className="text-body font-body text-default-font">
            Aug 14, 2025 · 42 min
          </span>
        </div>
        {/* …more rows… */}
      </div>
    </div>
  </Drawer.Content>
</Drawer>`;
