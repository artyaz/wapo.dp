"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * vaul (and Radix Dialog underneath it) render no overlay when `modal={false}`.
 * This context lets `Drawer` opt into a visual scrim for non-modal drawers —
 * set on the root so the scrim is only enabled when `modal` is actually false.
 */
const NonModalOverlayContext = React.createContext(false)

function Drawer({
  nonModalOverlay = false,
  modal,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  /** Dim the page behind the sheet even when `modal={false}` (scrim is pointer-events-none, so the page stays interactive). */
  nonModalOverlay?: boolean
}) {
  return (
    <NonModalOverlayContext.Provider value={nonModalOverlay && modal === false}>
      <DrawerPrimitive.Root data-slot="drawer" modal={modal} {...props} />
    </NonModalOverlayContext.Provider>
  )
}

function DrawerTrigger({ render, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger> &
  { render?: React.ReactElement<Record<string, unknown>> }) {
  if (render) {
    return (
      <DrawerPrimitive.Trigger data-slot="drawer-trigger" asChild {...props}>
        {children !== undefined ? React.cloneElement(render, undefined, children) : React.cloneElement(render)}
      </DrawerPrimitive.Trigger>
    )
  }
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ render, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Close> &
  { render?: React.ReactElement<Record<string, unknown>> }) {
  if (render) {
    return (
      <DrawerPrimitive.Close data-slot="drawer-close" asChild {...props}>
        {children !== undefined ? React.cloneElement(render, undefined, children) : React.cloneElement(render)}
      </DrawerPrimitive.Close>
    )
  }
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  const showNonModalOverlay = React.useContext(NonModalOverlayContext)
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      {showNonModalOverlay ? (
        <div
          aria-hidden="true"
          data-slot="drawer-non-modal-overlay"
          className="animate-in fade-in-0 pointer-events-none fixed inset-0 z-50 bg-black/50"
        />
      ) : null}
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
