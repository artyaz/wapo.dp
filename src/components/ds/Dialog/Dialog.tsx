"use client";

/**
 * Dialog — a modal surface pair. The root renders the full-bleed dark scrim
 * that centers its children; Dialog.Content renders the floating panel
 * (8px radius, hairline border, layered shadow) that sits on top of it.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface ContentProps
  extends React.ComponentProps<typeof SubframeCore.Dialog.Content> {
  children?: React.ReactNode;
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { children, className, ...otherProps }: ContentProps,
  ref
) {
  return children ? (
    <SubframeCore.Dialog.Content asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex min-w-[min(320px,100%)] max-w-full flex-col items-start rounded-[8px] border border-solid border-[#e5e5e5] bg-[#ffffff] shadow-[0px_12px_32px_-4px_#00000014,0px_4px_8px_-2px_#00000014] max-h-[90vh] overflow-auto",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </SubframeCore.Dialog.Content>
  ) : null;
});

export interface DialogRootProps
  extends React.ComponentProps<typeof SubframeCore.Dialog.Root> {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const DialogRoot = React.forwardRef<HTMLDivElement, DialogRootProps>(
  function DialogRoot(
    { children, className, ...otherProps }: DialogRootProps,
    ref
  ) {
    return children ? (
      <SubframeCore.Dialog.Root asChild={true} {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            // relative + z-50: the scrim must own a stacking context above any
            // adjacent absolutely-positioned content — otherwise positioned
            // siblings paint over the scrim AND the (opaque) content panel.
            "relative z-50 flex h-full w-full flex-col items-center justify-center gap-2 bg-[#00000099]",
            className
          )}
          ref={ref}
        >
          {children}
        </div>
      </SubframeCore.Dialog.Root>
    ) : null;
  }
);

export const Dialog = Object.assign(DialogRoot, {
  Content,
});
