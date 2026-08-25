import * as React from "react"

import { RenderSlot } from "@/lib/render-compat"
import { cn } from "@/lib/utils"

function Kbd({
  className,
  render,
  children,
  ...props
}: React.ComponentProps<"kbd"> & {
  render?: React.ReactElement<Record<string, unknown>>
}) {
  return (
    <RenderSlot
      // Default to rendering a native <kbd> element; when a `render`
      // element is supplied it is cloned with the merged props instead.
      render={render ?? <kbd />}
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm border border-b-2 px-1.5 font-mono text-xs font-medium",
        className
      )}
      {...props}
    >
      {/* Fall back to the render element's own children so a childless
          <Kbd render={...} /> does not wipe them (RenderSlot always passes
          its children as the 3rd cloneElement arg, which overrides). */}
      {children ??
        (render?.props as { children?: React.ReactNode } | undefined)
          ?.children}
    </RenderSlot>
  )
}

function KbdGroup({
  className,
  render,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  render?: React.ReactElement<Record<string, unknown>>
}) {
  return (
    <RenderSlot
      render={render ?? <div />}
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {children ??
        (render?.props as { children?: React.ReactNode } | undefined)
          ?.children}
    </RenderSlot>
  )
}

export { Kbd, KbdGroup }
