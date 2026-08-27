"use client";

/**
 * Drawer — a side-sheet surface pair. The root renders the full-bleed dark
 * scrim anchored to the right edge; Drawer.Content renders the sheet itself
 * (full height, hairline left border) that slides in over it.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface ContentProps
  extends React.ComponentProps<typeof SubframeCore.Drawer.Content> {
  children?: React.ReactNode;
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { children, className, ...otherProps }: ContentProps,
  ref
) {
  // vaul's Drawer.Content reads `document` during render (useScaleBackground
  // → useMemo(() => document.body.style.backgroundColor)), which crashes any
  // server render of an open drawer with "ReferenceError: document is not
  // defined". Mount the sheet client-side only so consumers never need a
  // page-level `mounted` guard around <Drawer>.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && children ? (
    <SubframeCore.Drawer.Content asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          // max-w-full: the sheet never forces its frame wider than the
          // viewport at narrow sizes; overflow-y-auto keeps tall content
          // scrolling inside the panel instead of spilling past its edge.
          // mobile:w-full: below 30rem a side sheet would leave a cramped
          // scrimmed column of page text clipped mid-word — stretch the sheet
          // to fill its frame instead, so the sheet itself becomes the
          // reading surface on phones.
          // border-s: the hairline seam sits on the edge facing the page in
          // both directions (left in LTR, right in RTL).
          "flex h-full max-w-full flex-col items-start overflow-y-auto border-s border-solid border-[#e5e5e5] bg-[#ffffff] mobile:w-full",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </SubframeCore.Drawer.Content>
  ) : null;
});

export interface DrawerRootProps
  extends React.ComponentProps<typeof SubframeCore.Drawer.Root> {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const DrawerRoot = React.forwardRef<HTMLDivElement, DrawerRootProps>(
  function DrawerRoot(
    { children, className, ...otherProps }: DrawerRootProps,
    ref
  ) {
    return children ? (
      <SubframeCore.Drawer.Root asChild={true} {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            // relative + z-50: the scrim must own a stacking context above any
            // adjacent absolutely-positioned content — otherwise positioned
            // siblings paint over the scrim AND the (opaque) sheet panel.
            "relative z-50 flex h-full w-full flex-col items-end justify-center gap-2 bg-[#00000066]",
            className
          )}
          ref={ref}
        >
          {children}
        </div>
      </SubframeCore.Drawer.Root>
    ) : null;
  }
);

export const Drawer = Object.assign(DrawerRoot, {
  Content,
});
