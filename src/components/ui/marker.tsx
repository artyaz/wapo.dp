"use client"

import * as React from "react"

import { RenderSlot } from "@/lib/render-compat"
import { cn } from "@/lib/utils"

type MarkerVariant = "default" | "separator" | "border"

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: MarkerVariant
  render?: React.ReactElement<Record<string, unknown>>
}) {
  return (
    <RenderSlot
      render={render}
      data-slot="marker"
      data-variant={variant}
      className={cn(
        "flex w-full items-center justify-center gap-2 text-xs text-muted-foreground transition-colors outline-none [a]:hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
        variant === "separator" &&
          "gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
        variant === "border" &&
          "justify-start rounded-md border border-input bg-background px-2.5 py-1.5 focus-visible:border-ring",
        className
      )}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn("min-w-0 text-xs", className)}
      {...props}
    />
  )
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      className={cn(
        "flex shrink-0 items-center justify-center gap-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { Marker, MarkerContent, MarkerIcon }
export type { MarkerVariant }
