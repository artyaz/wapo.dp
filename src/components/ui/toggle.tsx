"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Toggle — a two-state, pressable chip (icon and/or label) for toolbar and
 * filter-bar mode toggles.
 *
 * The pressed state uses a high-contrast inverted fill (`bg-primary` /
 * `text-primary-foreground`), mirroring the "on" treatment of `ui:switch`,
 * so on/off stays legible on panels in both light and dark themes. The
 * stock `data-[state=on]:bg-accent` fill was ~1.1:1 against white panels in
 * light theme and identical to the panel color in dark theme, making the
 * state effectively invisible.
 *
 * NOTE: Toggle is not a switch. For settings-style on/off rows (label plus a
 * trailing track/thumb control), use `ui:switch` instead.
 */
function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({ variant, size }),
        // Pressed = inverted primary chip; the hover-compound pair keeps the
        // pressed fill stable while hovering (the outline variant's
        // hover:bg-accent would otherwise override it).
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:data-[state=on]:bg-primary hover:data-[state=on]:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
