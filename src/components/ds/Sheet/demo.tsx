"use client";

/**
 * Sheet demo — an open bottom sheet over a neutral document backdrop.
 * Rendered non-modally (modal={false}) so the embedded demo never locks page
 * scroll; the panel offers Cancel / Clear cache close affordances wired to
 * onOpenChange, and Escape closes it too.
 */

import * as React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { Sheet } from "@/components/ds/Sheet";

export default function Demo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="relative h-[320px] w-full max-w-[520px] overflow-hidden rounded-lg border border-solid border-default-border bg-neutral-200">
      {/* neutral backdrop content */}
      <div aria-hidden="true" className="absolute inset-0 select-none p-6">
        <div className="flex h-full flex-col gap-2 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <p
              key={i}
              className="truncate text-caption font-caption text-neutral-500"
            >
              Region us-east-1 · replica {i + 1} · healthy · lag 0.{i}s ·
              uptime 31d
            </p>
          ))}
        </div>
      </div>

      {open ? (
        <Sheet
          open
          onOpenChange={setOpen}
          modal={false}
          className="absolute inset-0"
        >
          <Sheet.Content
            aria-describedby={undefined}
            onPointerDownOutside={(event: Event) => event.preventDefault()}
          >
            <SubframeCore.Dialog.Title className="w-full text-body-medium text-default-font">
              Clear the build cache?
            </SubframeCore.Dialog.Title>
            <p className="w-full text-body text-default-font">
              This removes 1.8 GB of compiled artifacts for api-gateway. The
              next build will recompile from source and take roughly three
              minutes longer.
            </p>
            <div className="flex w-full items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-3 py-1.5 text-caption font-caption text-default-font hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md border border-solid border-default-border bg-default-font px-3 py-1.5 text-caption font-caption text-default-background hover:opacity-90"
              >
                Clear cache
              </button>
            </div>
          </Sheet.Content>
        </Sheet>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer rounded-md border border-solid border-default-border bg-panel px-3 py-1.5 text-caption font-caption text-default-font"
          >
            Show sheet
          </button>
        </div>
      )}
    </div>
  );
}

export const demoSource = `const [open, setOpen] = useState(true);

<Sheet open={open} onOpenChange={setOpen} modal={false}>
  <Sheet.Content>
    <SubframeCore.Dialog.Title className="w-full text-body-medium text-default-font">
      Clear the build cache?
    </SubframeCore.Dialog.Title>
    <p className="w-full text-body text-default-font">
      This removes 1.8 GB of compiled artifacts for api-gateway. The next
      build will recompile from source and take roughly three minutes longer.
    </p>
    <div className="flex w-full items-center justify-end gap-2">
      <button type="button" onClick={() => setOpen(false)}>
        Cancel
      </button>
      <button type="button" onClick={() => setOpen(false)}>
        Clear cache
      </button>
    </div>
  </Sheet.Content>
</Sheet>`;
