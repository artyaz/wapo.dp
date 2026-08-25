import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * ButtonGroup — a container that joins Buttons (and form controls such as
 * Input / SelectTrigger) into a single segmented control.
 *
 * The group provides the outer border, radius (via the `--radius` CSS var,
 * so it can be themed with `[--radius:9999rem]`) and shadow. Direct children
 * have their own borders, radii and shadows reset so adjacent controls share
 * a single 1px divider and only the outer ends are rounded.
 *
 * All positioning is logical (`border-e`, `rounded-s`, …) so groups render
 * correctly in RTL contexts.
 */
function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      role="group"
      className={cn(
        "border-input flex w-fit items-stretch rounded-(--radius) border shadow-xs",
        // Normalize direct children — the group owns the border, radius and
        // shadow. Variant utilities intentionally outrank the children's own
        // `border`, `rounded-md` and `shadow-xs` classes.
        "[&>*]:border-0 [&>*]:rounded-none [&>*]:shadow-none [&>*]:relative",
        "[&>*:focus-visible]:z-10 [&>*]:focus-within:z-10",
        orientation === "vertical"
          ? cn(
              "flex-col",
              // 1px divider on the block-end edge of every child except the
              // last one and separators.
              "[&>*:not(:last-child):not([data-slot=button-group-separator])]:border-b",
              // Round only the outer (block-axis) ends of the group, one
              // nesting level deep for nested ButtonGroups.
              "[&>*:first-child]:rounded-t-(--radius) [&>*:last-child]:rounded-b-(--radius)",
              "[&>*:first-child>*:first-child]:rounded-t-(--radius) [&>*:last-child>*:last-child]:rounded-b-(--radius)",
              // Separators render as horizontal rules inside vertical groups.
              "[&_[data-slot=button-group-separator]]:-mt-px [&_[data-slot=button-group-separator]]:ms-0 [&_[data-slot=button-group-separator]]:h-px [&_[data-slot=button-group-separator]]:w-auto"
            )
          : cn(
              // 1px divider on the inline-end edge of every child except the
              // last one and separators.
              "[&>*:not(:last-child):not([data-slot=button-group-separator])]:border-e",
              // Round only the outer (inline-axis) ends of the group, one
              // nesting level deep for nested ButtonGroups.
              "[&>*:first-child]:rounded-s-(--radius) [&>*:last-child]:rounded-e-(--radius)",
              "[&>*:first-child>*:first-child]:rounded-s-(--radius) [&>*:last-child>*:last-child]:rounded-e-(--radius)"
            ),
        className
      )}
      {...props}
    />
  )
}

/**
 * ButtonGroupSeparator — a thin vertical divider rendered between the
 * children of a ButtonGroup. It overlaps (and replaces) the divider border
 * of the preceding child so only a single 1px line is shown.
 */
function ButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group-separator"
      role="separator"
      className={cn("bg-border -ms-px self-stretch w-px", className)}
      {...props}
    />
  )
}

/**
 * ButtonGroupText — non-interactive text content inside a ButtonGroup
 * (e.g. a unit or label segment).
 */
function ButtonGroupText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="button-group-text"
      className={cn(
        "text-muted-foreground flex items-center px-3 text-sm font-medium",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
