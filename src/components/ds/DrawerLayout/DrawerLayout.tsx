"use client";

/**
 * DrawerLayout — the layout variant of Drawer: the same right-anchored scrim
 * and sheet pair, but children are stacked vertically with 32px gaps inside
 * Drawer.Content.
 */

import React from "react";
import { Drawer } from "@/components/ds/Drawer";

export interface DrawerLayoutRootProps
  extends React.ComponentProps<typeof Drawer> {
  children?: React.ReactNode;
  className?: string;
}

const DrawerLayoutRoot = React.forwardRef<
  React.ElementRef<typeof Drawer>,
  DrawerLayoutRootProps
>(function DrawerLayoutRoot(
  { children, className, ...otherProps }: DrawerLayoutRootProps,
  ref
) {
  return (
    <Drawer className={className} ref={ref} {...otherProps}>
      <Drawer.Content>
        {children ? (
          <div className="flex w-full grow min-w-0 flex-col items-start gap-8">
            {children}
          </div>
        ) : null}
      </Drawer.Content>
    </Drawer>
  );
});

export const DrawerLayout = DrawerLayoutRoot;
