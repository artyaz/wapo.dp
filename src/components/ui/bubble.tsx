"use client"

import * as React from "react"

import { RenderSlot } from "@/lib/render-compat"
import { cn } from "@/lib/utils"

type BubbleVariant =
  | "primary"
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "destructive"
  | "ghost"

type BubbleAlign = "start" | "end"

interface BubbleContextValue {
  variant: BubbleVariant
  align: BubbleAlign
}

const BubbleContext = React.createContext<BubbleContextValue>({
  variant: "primary",
  align: "start",
})

const bubbleVariants: Record<BubbleVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  default: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-foreground",
  muted: "border border-input bg-transparent text-foreground",
  tinted: "bg-primary/10 text-primary",
  outline: "border border-input bg-background text-foreground shadow-xs",
  destructive: "bg-destructive text-white dark:bg-destructive/60",
  ghost: "w-full max-w-full bg-transparent px-0 py-0 text-foreground",
}

function Bubble({
  className,
  variant = "primary",
  align = "start",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: BubbleVariant
  align?: BubbleAlign
}) {
  const value = React.useMemo<BubbleContextValue>(
    () => ({
      variant: variant === "default" ? "primary" : variant,
      align,
    }),
    [variant, align]
  )

  return (
    <BubbleContext.Provider value={value}>
      <div
        data-slot="bubble"
        data-variant={value.variant}
        data-align={align}
        className={cn(
          "flex w-full flex-col gap-1",
          align === "end" ? "items-end self-end" : "items-start self-start",
          className
        )}
        {...props}
      />
    </BubbleContext.Provider>
  )
}

function BubbleContent({
  className,
  render,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  render?: React.ReactElement<Record<string, unknown>>
}) {
  const { variant } = React.useContext(BubbleContext)

  return (
    <RenderSlot
      render={render}
      data-slot="bubble-content"
      className={cn(
        "block w-fit max-w-lg rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
        bubbleVariants[variant],
        // Interactive bubbles (`render={<button/>}`) need a visible keyboard
        // focus ring; inert bubbles are unaffected (never focusable).
        render &&
          "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      {children}
    </RenderSlot>
  )
}

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn(
        // Praxis geometry: every bubble keeps the full 8px panel radius
        // (rounded-lg). Consecutive bubbles separate with a tight 2px rhythm
        // instead of reduced inner corners, so the strict 3px/8px radius scale
        // stays legible at 1x (mixed 3px/8px corners on one bubble read as
        // inconsistent geometry).
        "flex w-full flex-col gap-0.5",
        className
      )}
      {...props}
    />
  )
}

function BubbleReactions({
  className,
  align,
  side = "bottom",
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Horizontal placement of the reactions pill. Defaults to the alignment of
   * the parent `Bubble` so reactions stay anchored beneath their message —
   * only pass this to deliberately override the bubble's side.
   */
  align?: BubbleAlign
  /** Renders the pill in its own reserved slot above the bubble (4px offset). */
  side?: "top" | "bottom"
}) {
  const { align: bubbleAlign } = React.useContext(BubbleContext)
  const effectiveAlign = align ?? bubbleAlign

  return (
    <div
      data-slot="bubble-reactions"
      className={cn(
        "relative flex items-center gap-1 rounded-full border border-input bg-background px-1.5 py-0.5 text-xs text-muted-foreground shadow-xs",
        effectiveAlign === "end" ? "self-end" : "self-start",
        side === "top" && "order-first mb-1",
        className
      )}
      {...props}
    />
  )
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions }
export type { BubbleAlign, BubbleVariant }
