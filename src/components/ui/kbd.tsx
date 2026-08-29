import * as React from "react"

import { RenderSlot } from "@/lib/render-compat"
import { cn } from "@/lib/utils"

function Kbd({
  className,
  render,
  children,
  dir = "ltr",
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
      // Keycaps and key sequences ("⌘S", "Ctrl") are inherently LTR:
      // isolate from an RTL parent so the bidi algorithm neither inverts
      // glyph order nor flips flex row order. An explicit `dir` still wins.
      dir={dir}
      className={cn(
        // Type role 3: keycaps are "tokens" — IBM Plex Mono via font-code
        // (plain font-mono falls back to the raw ui-monospace stack).
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm border border-b-2 px-1.5 font-code text-xs font-medium",
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
  dir = "ltr",
  ...props
}: React.ComponentProps<"div"> & {
  render?: React.ReactElement<Record<string, unknown>>
}) {
  return (
    <RenderSlot
      render={render ?? <div />}
      data-slot="kbd-group"
      // Modifier-first key order ("Ctrl" before "K") must stay stable under
      // RTL parents — key sequences read left-to-right regardless of locale.
      dir={dir}
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
