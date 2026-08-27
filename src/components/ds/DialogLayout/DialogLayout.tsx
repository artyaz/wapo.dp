"use client";

/**
 * DialogLayout — the layout variant of Dialog: the same scrim + panel pair,
 * but children are arranged in a horizontal 24px-gap row inside the panel
 * (e.g. a leading mark beside a title/body/actions column). The row centers
 * its children vertically so a compact leading block sits level with the
 * primary content column instead of pinning to the panel's top edge.
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
      <Dialog.Content
        // Theme the panel with tokens: the inherited Dialog panel hardcodes
        // light-theme hex (bg-[#ffffff] / border-[#e5e5e5]), which leaves the
        // token-driven title (text-default-font, near-white in dark) illegible
        // in dark theme. twClassNames merges these overrides cleanly.
        className="border-default-border bg-panel"
      >
        {children ? (
          // p-6: the layout variant owns the panel padding so composed
          // children never sit flush against the panel border.
          // items-center: a leading mark column aligns with the middle of the
          // title/body/actions column rather than sitting high on its top edge.
          <div className="flex w-full min-w-0 items-center gap-6 p-6">
            {children}
          </div>
        ) : null}
      </Dialog.Content>
    </Dialog>
  );
});

export const DialogLayout = DialogLayoutRoot;
