"use client";

/**
 * DialogLayout demo — an open dialog composed as a horizontal row: a quiet
 * workspace mark beside a title/body/actions column. The clipped frame stands
 * in for the viewport (the scrim is positioned over it via className), and the
 * dialog runs non-modally so the embedded demo never locks page scroll.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { DialogLayout } from "@/components/ds/DialogLayout";
import { Button } from "@/components/ds/Button";

export default function Demo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="relative h-[360px] w-full overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
        {/* quiet document sitting under the scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col gap-3 p-6"
        >
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            Workspace / Settings
          </span>
          <p className="text-body font-body text-default-font/60">
            Northwind Labs runs on the Pro plan with 12 members and a 90-day
            retention window.
          </p>
          <p className="text-body font-body text-default-font/60">
            Invoices are emailed to billing@northwind.example on the first of
            each month.
          </p>
          <p className="text-body font-body text-default-font/60">
            Storage usage is 41.2 GB of 100 GB; exports are unlimited.
          </p>
        </div>

        <DialogLayout
          open={open}
          onOpenChange={setOpen}
          modal={false}
          className="absolute inset-0"
        >
          <div className="flex w-[104px] shrink-0 flex-col items-start gap-2 max-sm:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-solid border-default-border bg-neutral-100 font-code text-[13px] text-neutral-500">
              NL
            </div>
            <span className="text-caption font-caption text-neutral-500">
              Northwind Labs
            </span>
            <span className="font-code text-[11px] text-neutral-400">
              Pro · 12 members
            </span>
          </div>
          <div className="flex w-[296px] max-w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                Archive workspace?
              </SubframeCore.Dialog.Title>
              <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
                The workspace becomes read-only for everyone. Transcripts and
                exports stay available; new recordings are paused until it is
                restored.
              </SubframeCore.Dialog.Description>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Archive workspace</Button>
            </div>
          </div>
        </DialogLayout>
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

<DialogLayout open={open} onOpenChange={setOpen}>
  <div className="flex w-[104px] shrink-0 flex-col items-start gap-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-solid border-default-border bg-neutral-100 font-code text-[13px] text-neutral-500">
      NL
    </div>
    <span className="text-caption font-caption text-neutral-500">
      Northwind Labs
    </span>
    <span className="font-code text-[11px] text-neutral-400">
      Pro · 12 members
    </span>
  </div>
  <div className="flex w-[296px] max-w-full flex-col items-start gap-5">
    <div className="flex w-full flex-col items-start gap-1.5">
      <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
        Archive workspace?
      </SubframeCore.Dialog.Title>
      <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
        The workspace becomes read-only for everyone. Transcripts and exports
        stay available; new recordings are paused until it is restored.
      </SubframeCore.Dialog.Description>
    </div>
    <div className="flex w-full flex-wrap items-center justify-end gap-2">
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={() => setOpen(false)}>Archive workspace</Button>
    </div>
  </div>
</DialogLayout>`;
