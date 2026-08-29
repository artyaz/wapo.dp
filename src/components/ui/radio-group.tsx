"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Radix defaults the group's `dir` to "ltr" and renders it as an attribute,
 * which breaks direction inheritance: on RTL pages the radio-group subtree
 * keeps an LTR layout (labels packed at the inline start of an LTR row) while
 * the rest of the page mirrors, leaving the control visually disconnected at
 * the wrong edge. When no explicit `dir` prop is given we resolve the
 * direction from the DOM ancestor and forward it so the group mirrors with
 * the page and Radix's arrow-key navigation matches.
 */
function useInheritedDirection(
  dir: "ltr" | "rtl" | undefined,
  ref: React.RefObject<HTMLDivElement | null>
): "ltr" | "rtl" | undefined {
  const [inheritedDir, setInheritedDir] = React.useState<
    "ltr" | "rtl" | undefined
  >(undefined)

  React.useLayoutEffect(() => {
    if (dir != null) return
    const parent = ref.current?.parentElement
    if (!parent) return
    const resolved =
      getComputedStyle(parent).direction === "rtl" ? "rtl" : "ltr"
    setInheritedDir((prev) => (prev === resolved ? prev : resolved))
  }, [dir, ref])

  return dir ?? inheritedDir
}

function RadioGroup({
  className,
  dir,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const resolvedDir = useInheritedDirection(dir, rootRef)

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      ref={rootRef}
      dir={resolvedDir}
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // Praxis: no shadow on in-flow content and color/opacity-only
        // transitions (150ms default) — never animated shadows. `rounded-full`
        // is the functional radio affordance (circular control + dot
        // indicator), not a radius-token violation.
        // dark:data-[state=unchecked]:not-aria-invalid:border-muted-foreground
        // lifts the unchecked ring above the dark panel (border-input alone is
        // neutral-200-on-neutral-100 in dark ≈ invisible) — same fix as the
        // checkbox sibling.
        "border-input dark:data-[state=unchecked]:not-aria-invalid:border-muted-foreground text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border transition-[color,background-color,border-color,opacity] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
