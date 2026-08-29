"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ render, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger> &
  { render?: React.ReactElement<Record<string, unknown>> }) {
  if (render) {
    return (
      <TooltipPrimitive.Trigger data-slot="tooltip-trigger" asChild {...props}>
        {/* Only clone with new children when children were actually passed;
           cloneElement's 3rd argument always *replaces* children, so passing
           `undefined` would wipe the render element's own children. */}
        {children !== undefined
          ? React.cloneElement(render, undefined, children)
          : render}
      </TooltipPrimitive.Trigger>
    )
  }
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // Praxis: tooltip is a true overlay floating above the document —
          // inverted monochrome bubble (bg-primary) carrying the theme-aware
          // system elevation token (shadow-default): shadcn's stock shadow-md
          // is black @10%, invisible over dark surfaces (verified by pixel
          // probe — same fix already applied to hover-card/select/menubar).
          // rounded-md resolves to the 3px token, same geometry family as
          // popover/dropdown/hover-card siblings.
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance shadow-default",
          className
        )}
        {...props}
      >
        {children}
        {/* data-slot hook lets per-instance callers restyle/hide the caret
            (e.g. arrowless tooltips anchored to small offset triggers). */}
        <TooltipPrimitive.Arrow
          data-slot="tooltip-arrow"
          className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
