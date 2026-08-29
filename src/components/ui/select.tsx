"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Item shape accepted by the `Select` `items` prop. */
export type SelectItemData = {
  label?: React.ReactNode
  value: string | null
  disabled?: boolean
}

/**
 * Internal value used for `null`-valued items (the "reset / placeholder" row).
 * Radix requires non-empty item values (an empty string clears the selection),
 * so `null` items are rendered with this sentinel instead.
 */
const SELECT_EMPTY_ITEM_VALUE = "__select-empty-item__"

function Select({
  items: _items,
  value,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Root>, "value"> & {
  /**
   * List of items. Demos pair it with explicitly rendered `SelectItem`
   * children (groups, labels, separators), so it is accepted for API
   * compatibility and not used to render content.
   */
  items?: readonly SelectItemData[]
  /** Controlled value. `null` clears the selection (shows the placeholder). */
  value?: string | null
}) {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      value={value === null ? undefined : value}
      {...props}
    />
  )
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  render,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  render?: React.ReactElement<Record<string, unknown>>
}) {
  if (render) {
    return (
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        data-size={size}
        asChild
        {...props}
      >
        {/* Only clone with new children when children were actually passed;
           cloneElement's 3rd argument always *replaces* children, so passing
           `undefined` would wipe the render element's own children. */}
        {children !== undefined
          ? React.cloneElement(render, undefined, children)
          : render}
      </SelectPrimitive.Trigger>
    )
  }
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position,
  alignItemWithTrigger,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  /**
   * Align the selected item with the trigger when the list opens
   * (Radix `position="item-aligned"`). When `false` (or with an explicit
   * `position`), the list opens centered under the trigger ("popper").
   *
   * @default false
   */
  alignItemWithTrigger?: boolean
}) {
  const resolvedPosition =
    position ?? (alignItemWithTrigger ? "item-aligned" : "popper")

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // Floating overlay panel — rounded-lg (8px) per Praxis geometry,
          // matching Dialog/Popover/Command/Combobox popup panels. Elevation
          // uses the theme-aware system shadow token: shadcn's shadow-md/lg
          // (black at 10%) is invisible on dark surfaces.
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border shadow-default",
          resolvedPosition === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={resolvedPosition}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            resolvedPosition === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "value"> & {
  /**
   * Value of the item. `null` marks the reset/placeholder row (rendered with
   * an internal sentinel value because Radix forbids empty-string values).
   */
  value: string | null
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value ?? SELECT_EMPTY_ITEM_VALUE}
      className={cn(
        // Radix Select highlights the focused item via `:focus`. In dark theme
        // `--accent` equals the popover surface (both rgb(21 21 19)), which
        // makes the highlight invisible — step up to neutral-200, the system's
        // own dark accent surface (cf. --sidebar-accent), same as combobox.
        "focus:bg-accent focus:text-accent-foreground dark:focus:bg-neutral-200 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
