"use client";

/**
 * SubframeCore shim — provides the three @subframe/core APIs the exported
 * components actually use, mapped onto our local Radix/vaul dependencies:
 *
 *   SubframeCore.IconWrapper        → plain span (className + children)
 *   SubframeCore.Dialog.Root/.Content → @radix-ui/react-dialog
 *   SubframeCore.Drawer.Root/.Content → vaul
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Drawer as VaulDrawer } from "vaul";

/* ------------------------------------------------------------------ */

export const IconWrapper = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { children?: React.ReactNode }
>(function IconWrapper({ children, ...props }, ref) {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});

/* ------------------------------------------------------------------ */

function asRadixRoot<P extends { children?: React.ReactNode }>(
  Primitive: React.ComponentType<any>
) {
  const Root = React.forwardRef<HTMLDivElement, P & Record<string, unknown>>(
    function ShimRoot({ children, ...props }, ref) {
      return (
        <Primitive asChild ref={ref} {...props}>
          {children}
        </Primitive>
      );
    }
  );
  return Root;
}

function asRadixContent<P extends { children?: React.ReactNode }>(
  Primitive: React.ComponentType<any>
) {
  const Content = React.forwardRef<HTMLDivElement, P & Record<string, unknown>>(
    function ShimContent({ children, ...props }, ref) {
      return (
        <Primitive asChild ref={ref} {...props}>
          {children}
        </Primitive>
      );
    }
  );
  return Content;
}

/* Dialog (Radix) — Root / Content / Trigger / Portal / Overlay / Title... */
const DialogRoot = asRadixRoot(DialogPrimitive.Root);
const DialogContent = asRadixContent(DialogPrimitive.Content);

export const Dialog = {
  Root: DialogRoot,
  Content: DialogContent,
  Trigger: DialogPrimitive.Trigger,
  Portal: DialogPrimitive.Portal,
  Overlay: DialogPrimitive.Overlay,
  Title: DialogPrimitive.Title,
  Description: DialogPrimitive.Description,
  Close: DialogPrimitive.Close,
};

/* Drawer (vaul) — Root / Content / Portal / Overlay... */
const DrawerRoot = asRadixRoot(VaulDrawer.Root);
const DrawerContent = asRadixContent(VaulDrawer.Content);

export const Drawer = {
  Root: DrawerRoot,
  Content: DrawerContent,
  Trigger: VaulDrawer.Trigger,
  Portal: VaulDrawer.Portal,
  Overlay: VaulDrawer.Overlay,
  Title: VaulDrawer.Title,
  Description: VaulDrawer.Description,
  Close: VaulDrawer.Close,
};
