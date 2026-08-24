"use client";

/**
 * Dialog demo — a destructive confirmation composed inside the component's
 * own scrim. The clipped frame stands in for the viewport so the demo stays
 * inside its container; modal and auto-focus are disabled so the embedded
 * demo never traps the page around it.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { Dialog } from "@/components/ds/Dialog";
import { Button } from "@/components/ds/Button";

export default function Demo() {
  const [open, setOpen] = React.useState(true);
  const frameRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div
        ref={frameRef}
        className="relative h-80 w-full overflow-hidden rounded-lg border border-default-border bg-default-background"
      >
        {/* quiet document sitting under the scrim */}
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

        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <Dialog.Content
            aria-describedby={undefined}
            onOpenAutoFocus={(event: Event) => event.preventDefault()}
            onPointerDownOutside={(event) => {
              // non-modal: only dismiss for interactions inside the demo
              // frame (i.e. the scrim itself), never for stray page clicks
              if (!frameRef.current?.contains(event.target as Node)) {
                event.preventDefault();
              }
            }}
          >
            <div className="flex w-[400px] flex-col items-start gap-5 p-6">
              <div className="flex w-full flex-col items-start gap-1.5">
                <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                  Delete transcript?
                </SubframeCore.Dialog.Title>
                <span className="text-body font-body text-neutral-500">
                  &quot;Q3 planning session&quot; and its 14 annotations will
                  be removed permanently. This action cannot be undone.
                </span>
              </div>
              <div className="flex w-full items-center justify-end gap-2">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => setOpen(false)}>
                  Delete transcript
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="small" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <span className="text-caption font-caption text-neutral-500">
          Click the scrim or press Escape to dismiss.
        </span>
      </div>
    </div>
  );
}

export const demoSource = `const [open, setOpen] = useState(true);

<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Content>
    <div className="flex w-[400px] flex-col items-start gap-5 p-6">
      <div className="flex w-full flex-col items-start gap-1.5">
        <span className="text-heading-2 font-heading-2 text-default-font">
          Delete transcript?
        </span>
        <span className="text-body font-body text-neutral-500">
          "Q3 planning session" and its 14 annotations will be removed
          permanently. This action cannot be undone.
        </span>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => setOpen(false)}>
          Delete transcript
        </Button>
      </div>
    </div>
  </Dialog.Content>
</Dialog>`;
