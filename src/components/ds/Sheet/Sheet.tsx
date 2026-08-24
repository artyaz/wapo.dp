"use client";

/**
 * Sheet — a bottom-anchored modal surface built on the Dialog primitive. The
 * root paints the ink scrim across its container and docks Sheet.Content to
 * the bottom edge; Sheet.Content is the bordered, scrollable panel itself.
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
          "flex w-full max-w-[544px] flex-col items-start gap-[13px] rounded-none border border-solid border-default-border bg-panel px-[18px] py-[18px] max-h-[88vh] overflow-y-auto",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </SubframeCore.Dialog.Content>
  ) : null;
});

export interface SheetRootProps
  extends React.ComponentProps<typeof SubframeCore.Dialog.Root> {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const SheetRoot = React.forwardRef<HTMLDivElement, SheetRootProps>(
  function SheetRoot(
    { children, className, ...otherProps }: SheetRootProps,
    ref
  ) {
    return children ? (
      <SubframeCore.Dialog.Root asChild={true} {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-full w-full flex-col items-center justify-end bg-default-font/[0.34]",
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

export const Sheet = Object.assign(SheetRoot, {
  Content,
});
