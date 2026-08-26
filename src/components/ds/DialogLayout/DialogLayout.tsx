"use client";

/**
 * DialogLayout — the layout variant of Dialog: the same scrim + panel pair,
 * but children are arranged in a horizontal 24px-gap row inside the panel
 * (e.g. a leading mark beside a title/body/actions column).
 */

import React from "react";
import { Dialog } from "@/components/ds/Dialog";

export interface DialogLayoutRootProps
  extends React.ComponentProps<typeof Dialog> {
  children?: React.ReactNode;
  className?: string;
}

const DialogLayoutRoot = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  DialogLayoutRootProps
>(function DialogLayoutRoot(
  { children, className, ...otherProps }: DialogLayoutRootProps,
  ref
) {
  return (
    <Dialog className={className} ref={ref} {...otherProps}>
      <Dialog.Content>
        {children ? (
          // p-6: the layout variant owns the panel padding so composed
          // children never sit flush against the panel border.
          <div className="flex w-full min-w-0 items-start gap-6 p-6">
            {children}
          </div>
        ) : null}
      </Dialog.Content>
    </Dialog>
  );
});

export const DialogLayout = DialogLayoutRoot;
