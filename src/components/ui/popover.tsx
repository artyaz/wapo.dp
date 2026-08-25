"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ render, children, ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger> &
  { render?: React.ReactElement<Record<string, unknown>> }) {
  if (render) {
    return (
      <PopoverPrimitive.Trigger data-slot="popover-trigger" asChild {...props}>
        {/* Only clone with new children when children were actually passed;
           cloneElement's 3rd argument always *replaces* children, so passing
           `undefined` would wipe the render element's own children. */}
        {children !== undefined
          ? React.cloneElement(render, undefined, children)
          : render}
      </PopoverPrimitive.Trigger>
    )
  }
  return (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  )
}

type PopoverPhysicalSide = NonNullable<
  React.ComponentProps<typeof PopoverPrimitive.Content>["side"]
>

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  side,
  dir,
  ...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, "side"> & {
  /**
   * Side of the trigger the content opens on. Accepts logical sides
   * (`"inline-start"` / `"inline-end"`) which resolve against `dir`.
   */
  side?: PopoverPhysicalSide | "inline-start" | "inline-end"
  /** Text direction used to resolve the logical sides. */
  dir?: "ltr" | "rtl"
}) {
  const resolvedSide: PopoverPhysicalSide | undefined =
    side === "inline-start"
      ? dir === "rtl"
        ? "right"
        : "left"
      : side === "inline-end"
        ? dir === "rtl"
          ? "left"
          : "right"
        : side

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        side={resolvedSide}
        sideOffset={sideOffset}
        dir={dir}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("grid gap-1.5", className)}
      {...props}
    />
  )
}

function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverFooter,
  PopoverTitle,
  PopoverDescription,
}
