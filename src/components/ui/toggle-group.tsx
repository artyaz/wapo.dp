"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        // Rounding/borders use logical (start/end) utilities so the segmented
        // group mirrors correctly in RTL (see ui/input-otp.tsx for the idiom).
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-s-0 data-[variant=outline]:first:border-s",
        // Pressed = inverted primary chip, mirroring ui/toggle.tsx: the shared
        // toggleVariants' `data-[state=on]:bg-accent` fill is the same color as
        // card/panel surfaces in dark theme (~1.1:1 in light), so the segmented
        // on-state would be effectively invisible. The hover compounds keep the
        // pressed fill stable while hovering (outline's hover:bg-accent would
        // otherwise win by source order).
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:data-[state=on]:bg-primary hover:data-[state=on]:text-primary-foreground",
        // Color-only transitions (150-200ms default) — overrides the variant's
        // transition-[color,box-shadow], which animated the focus ring's
        // box-shadow; matches the audited input/checkbox/textarea siblings.
        "transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
