import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Logical alignment for InputGroupAddon.
 *
 * - `inline-start` (default) / `start`: addon flows before the control
 * - `inline-end` / `end`: addon flows after the control
 * - `block-start`: addon takes a full-width row above the control
 * - `block-end`: addon takes a full-width row below the control
 */
type InputGroupAlign =
  | "start"
  | "end"
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 has-[>input:disabled]:cursor-not-allowed has-[>input:disabled]:opacity-50 has-[>textarea:disabled]:cursor-not-allowed has-[>textarea:disabled]:opacity-50 flex min-h-9 w-full flex-wrap items-center rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-input"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 min-w-0 flex-1 rounded-md bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-textarea"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground field-sizing-content min-h-16 w-full min-w-0 flex-1 resize-none rounded-md bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm",
        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & { align?: InputGroupAlign }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "group/addon text-muted-foreground flex items-center gap-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        (align === "inline-start" || align === "start") && "order-first ps-3",
        (align === "inline-end" || align === "end") && "order-last pe-3",
        align === "block-start" && "order-first w-full px-3 py-1.5",
        align === "block-end" && "order-last w-full px-3 py-1.5",
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

type InputGroupButtonProps = Omit<React.ComponentProps<typeof Button>, "size"> & {
  /**
   * Group-friendly sizes. `icon-xs` and `icon-sm` are handled locally because
   * Button itself has no such variants; `sm` / `lg` / `icon` are passed through.
   */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-xs"
  /** Convenience ordering when the button is a direct child of InputGroup. */
  align?: "start" | "end"
}

function InputGroupButton({
  className,
  variant = "ghost",
  size,
  align,
  ...props
}: InputGroupButtonProps) {
  // Sizes that Button's cva does not know about (plus the compact default)
  // are resolved here; everything else is delegated to Button.
  const passthroughSize =
    size === undefined || size === "default" || size === "icon-xs" || size === "icon-sm"
      ? undefined
      : size

  const sizeClass =
    size === "icon-xs"
      ? "size-7 gap-0 rounded-md p-0"
      : size === "icon-sm"
        ? "size-8 gap-1 rounded-md p-0"
        : size === undefined || size === "default"
          ? "h-7 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5"
          : undefined

  return (
    <Button
      data-slot="input-group-button"
      variant={variant}
      size={passthroughSize}
      className={cn(
        "shrink-0 text-sm",
        sizeClass,
        align === "start" && "order-first",
        align === "end" && "order-last",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
}

export type { InputGroupAlign, InputGroupButtonProps }
