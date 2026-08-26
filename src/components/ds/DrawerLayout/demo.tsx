"use client";

/**
 * DrawerLayout demo — an open right-anchored sheet with a title block and
 * sample metadata rows, separated by the layout's 32px column gap. The
 * clipped frame stands in for the viewport (the scrim is positioned over it
 * via className), and the sheet runs non-modally so the embedded demo never
 * locks page scroll.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { DrawerLayout } from "@/components/ds/DrawerLayout";
import { Button } from "@/components/ds/Button";

const rows = [
  { label: "Recorded", value: "Aug 14, 2025 · 42 min" },
  { label: "Participants", value: "4 — Maya, Jonas, Priya, Sam" },
  { label: "Retention", value: "90 days · expires Nov 12, 2025" },
];

export default function Demo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="relative h-[360px] w-full overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
        {/* quiet page sitting under the scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col gap-3 p-6"
        >
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

        <DrawerLayout
          open={open}
          onOpenChange={setOpen}
          direction="right"
          modal={false}
          className="absolute inset-0"
        >
          <div className="flex w-[320px] max-w-full flex-col items-start gap-1.5 px-6 pt-6">
            <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
              Session details
            </SubframeCore.Drawer.Title>
            <SubframeCore.Drawer.Description className="text-caption font-caption text-neutral-500">
              Q3 planning session
            </SubframeCore.Drawer.Description>
          </div>
          <div className="flex w-[320px] max-w-full flex-col items-start px-6 pb-6">
            {rows.map(({ label, value }) => (
              <div
                key={label}
                className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-3 first:border-t-0 first:pt-0"
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
        </DrawerLayout>
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
          Drag the sheet left or press Escape to dismiss.
        </span>
      </div>
    </div>
  );
}

export const demoSource = `const [open, setOpen] = useState(true);

<DrawerLayout
  open={open}
  onOpenChange={setOpen}
  direction="right"
>
  <div className="flex w-[320px] max-w-full flex-col items-start gap-1.5 px-6 pt-6">
    <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
      Session details
    </SubframeCore.Drawer.Title>
    <SubframeCore.Drawer.Description className="text-caption font-caption text-neutral-500">
      Q3 planning session
    </SubframeCore.Drawer.Description>
  </div>
  <div className="flex w-[320px] max-w-full flex-col items-start px-6 pb-6">
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
</DrawerLayout>`;
