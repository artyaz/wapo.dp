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
  destructive: "bg-destructive text-white",
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
        "flex w-full flex-col gap-0.5",
        // Consecutive start-aligned bubbles: reduce the leading (left) corners
        // where the bubbles stack, keeping the outer edge rounded.
        "[&>[data-slot=bubble][data-align=start]+[data-slot=bubble][data-align=start]_[data-slot=bubble-content]]:rounded-tl-sm",
        "[&>[data-slot=bubble][data-align=start]:has(+[data-slot=bubble][data-align=start])_[data-slot=bubble-content]]:rounded-bl-sm",
        // Consecutive end-aligned bubbles: reduce the trailing (right) corners.
        "[&>[data-slot=bubble][data-align=end]+[data-slot=bubble][data-align=end]_[data-slot=bubble-content]]:rounded-tr-sm",
        "[&>[data-slot=bubble][data-align=end]:has(+[data-slot=bubble][data-align=end])_[data-slot=bubble-content]]:rounded-br-sm",
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
  align?: BubbleAlign
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
        side === "top" && "z-10 -mb-2 order-first",
        className
      )}
      {...props}
    />
  )
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions }
export type { BubbleAlign, BubbleVariant }
