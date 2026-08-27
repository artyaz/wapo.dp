"use client";

/**
 * Sheet — a bottom-anchored modal surface built on the Dialog primitive. The
 * root paints a black scrim across its container (34% in light theme, deepened
 * to 60% in dark theme where the near-black page needs stronger dimming) and
 * docks Sheet.Content to the bottom edge; Sheet.Content is the bordered,
 * scrollable panel itself.
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
          "flex w-full max-w-[544px] flex-col items-start gap-4 rounded-none border border-solid border-default-border bg-panel px-[18px] py-[18px] max-h-[88vh] overflow-y-auto",
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
            // relative + z-50: the scrim must own a stacking context above any
            // adjacent absolutely-positioned content — otherwise positioned
            // siblings paint over the scrim AND the (opaque) sheet panel.
            //
            // bg-[#00000057] / dark:bg-[#00000099] — a BLACK scrim in both
            // themes. A previous bg-default-font/[0.34] scrim inverted with
            // the ink token in dark theme (near-white 34% haze), and a flat
            // 34% black is imperceptible over the near-black dark page —
            // either way the sheet read as an un-scrimmed panel floating over
            // content. Dark theme deepens to 60% to match ds:Dialog's
            // #00000099 scrim; light keeps the original 34% ink strength.
            "relative z-50 flex h-full w-full flex-col items-center justify-end bg-[#00000057] dark:bg-[#00000099]",
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
