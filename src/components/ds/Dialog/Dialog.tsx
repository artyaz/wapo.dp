"use client";

/**
 * Dialog — a modal surface pair. The root renders the full-bleed dark scrim
 * that centers its children; Dialog.Content renders the floating panel
 * (8px radius, hairline border, layered shadow) that sits on top of it.
 *
 * The panel is themed with surface tokens (`bg-panel` / `border-default-border`)
 * so the token-driven title (`text-default-font`, near-white in dark) stays
 * legible in dark theme — the panel used to hardcode `bg-[#ffffff]`.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import * as SubframeUtils from "@/lib/subframe/utils";

/**
 * Whether the enclosing Dialog root runs in modal mode (Radix's default).
 * Non-modal roots (`modal={false}`) opt their Content into safer focus
 * behavior — see the guards in Content below.
 */
const DialogModalContext = React.createContext(true);

export interface ContentProps
  extends React.ComponentProps<typeof SubframeCore.Dialog.Content> {
  children?: React.ReactNode;
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  {
    children,
    className,
    onOpenAutoFocus,
    onFocusOutside,
    ...otherProps
  }: ContentProps,
  ref
) {
  const modal = React.useContext(DialogModalContext);
  return children ? (
    <SubframeCore.Dialog.Content
      asChild={true}
      {...otherProps}
      onOpenAutoFocus={
        modal
          ? onOpenAutoFocus
          : (event: Event) => {
              (onOpenAutoFocus as ((event: Event) => void) | undefined)?.(event);
              // Non-modal dialogs never steal focus on open: Radix does not
              // prevent auto-focus for non-modal content, so the first button
              // would be focused — and that focusin event silently dismisses
              // any other open non-modal dialog (light-dismiss on focus
              // outside). Caller handlers still run first.
              if (!event.defaultPrevented) event.preventDefault();
            }
      }
      onFocusOutside={
        modal
          ? onFocusOutside
          : (event: Event) => {
              (onFocusOutside as ((event: Event) => void) | undefined)?.(event);
              // Non-modal dialogs stay open when focus merely moves elsewhere
              // (tabbing into the page, another overlay mounting); dismissal
              // still happens via Escape and pointer-down-outside (scrim
              // clicks). Caller handlers still run first.
              if (!event.defaultPrevented) event.preventDefault();
            }
      }
    >
      <div
        className={SubframeUtils.twClassNames(
          "flex min-w-[min(320px,100%)] max-w-full flex-col items-start rounded-[8px] border border-solid border-default-border bg-panel shadow-[0px_12px_32px_-4px_#00000014,0px_4px_8px_-2px_#00000014] max-h-[90vh] overflow-auto",
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
    { children, className, modal, ...otherProps }: DialogRootProps,
    ref
  ) {
    // `modal` flows through the loosely-typed shim props — normalize it so
    // Content can adapt its focus behavior (Radix itself defaults to modal).
    const isModal = modal === undefined ? true : Boolean(modal);
    return children ? (
      <SubframeCore.Dialog.Root asChild={true} modal={isModal} {...otherProps}>
        <DialogModalContext.Provider value={isModal}>
          <div
            className={SubframeUtils.twClassNames(
              // relative + z-50: the scrim must own a stacking context above any
              // adjacent absolutely-positioned content — otherwise positioned
              // siblings paint over the scrim AND the (opaque) content panel.
              //
              // empty:hidden: Radix keeps the Root's children mounted even
              // while the dialog is closed, so the (opaque-ish) scrim div
              // would keep dimming whatever sits under it forever. Once the
              // Content unmounts the div is :empty and must not paint at all.
              "relative z-50 flex h-full w-full flex-col items-center justify-center gap-2 bg-[#00000099] empty:hidden",
              className
            )}
            ref={ref}
          >
            {children}
          </div>
        </DialogModalContext.Provider>
      </SubframeCore.Dialog.Root>
    ) : null;
  }
);

export const Dialog = Object.assign(DialogRoot, {
  Content,
});
