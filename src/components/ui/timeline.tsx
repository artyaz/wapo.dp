"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Timeline primitives — vertical event tracks: activity feeds, status
 * progressions, audit logs, story/milestone spines.
 *
 * Composition:
 *
 *   <Timeline side="left" aria-label="Claim history">
 *     <TimelineItem state="complete">
 *       <TimelineMarker>
 *         <TimelineDot />
 *         <TimelineSeparator />
 *       </TimelineMarker>
 *       <TimelineContent>
 *         <TimelineHeader title="Claim filed" timestamp="Aug 14 · 09:41" />
 *         <TimelineDescription>Submitted online with 14 photos…</TimelineDescription>
 *       </TimelineContent>
 *     </TimelineItem>
 *     …
 *   </Timeline>
 *
 * - `<Timeline>` is the `<ol>` root and `<TimelineItem>` an `<li>`, so
 *   screen readers announce list semantics natively. Marker graphics (dot,
 *   badge, separator) are aria-hidden — carry the state in words inside the
 *   content for assistive tech. The active item gets `aria-current="step"`.
 * - `side` places the marker rail on the left/right, or alternates items
 *   around a center spine (`alternating`). Parity is derived from the item's
 *   position; pass per-item `side` (or explicit `index`) to override.
 * - `density="compact"` tightens the rhythm for dense logs — smaller dots,
 *   caption-size text, shorter connectors.
 * - State budget (Praxis law): `complete` = primary fill, `current` =
 *   primary ring (static — no pulse, calm transitions only), `error` =
 *   destructive. `default` stays muted. Separators inherit their item's
 *   state, so a finished journey reads as one continuous ink flow.
 * - Flat geometry throughout: 1px hairline connectors (`border` token),
 *   no shadows on in-flow items.
 */

export type TimelineSide = "left" | "right" | "alternating"
export type TimelineDensity = "default" | "compact"
export type TimelineItemState = "default" | "complete" | "current" | "error"

/* ------------------------------------------------------------------ */
/* Contexts                                                            */
/* ------------------------------------------------------------------ */

interface TimelineContextValue {
  side: TimelineSide
  density: TimelineDensity
}

const TimelineContext = React.createContext<TimelineContextValue | null>(null)

interface TimelineItemContextValue {
  /** Position among the root's items (alternating parity). */
  index: number
  /** Resolved concrete side of this item ("left" | "right"). */
  side: Exclude<TimelineSide, "alternating">
  /** The root's side setting ("alternating" enables the center spine). */
  rootSide: TimelineSide
  state: TimelineItemState
  density: TimelineDensity
}

const TimelineItemContext = React.createContext<TimelineItemContextValue | null>(
  null
)

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

const timelineVariants = cva(
  // Trailing rhythm is carried by the content column (so separators can
  // stretch the full row height); the last item drops it.
  "flex w-full flex-col [&>li:last-child_[data-slot=timeline-content]]:pb-0",
  {
    variants: {
      side: {
        left: "",
        right: "",
        alternating: "",
      },
      density: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      side: "left",
      density: "default",
    },
  }
)

export interface TimelineProps
  extends React.ComponentProps<"ol">,
    VariantProps<typeof timelineVariants> {}

function Timeline({
  side = "left",
  density = "default",
  className,
  children,
  ...props
}: TimelineProps) {
  // VariantProps are nullable — normalize for the context value.
  const resolvedSide: TimelineSide = side ?? "left"
  const resolvedDensity: TimelineDensity = density ?? "default"
  const context = React.useMemo<TimelineContextValue>(
    () => ({ side: resolvedSide, density: resolvedDensity }),
    [resolvedSide, resolvedDensity]
  )

  // Positional indices for alternating parity. The raw child position is
  // used (items wrapped in fragments or interleaved with other nodes should
  // pass `index` or a per-item `side` explicitly).
  const items = React.useMemo(
    () =>
      React.Children.map(children, (child, position) => {
        if (React.isValidElement(child) && child.type === TimelineItem) {
          return React.cloneElement(
            child as React.ReactElement<TimelineItemProps>,
            { index: (child.props as TimelineItemProps).index ?? position }
          )
        }
        return child
      }),
    [children]
  )

  return (
    <TimelineContext.Provider value={context}>
      <ol
        data-slot="timeline"
        data-side={resolvedSide}
        data-density={resolvedDensity}
        className={cn(
          timelineVariants({ side: resolvedSide, density: resolvedDensity }),
          className
        )}
        {...props}
      >
        {items}
      </ol>
    </TimelineContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/* Item                                                                */
/* ------------------------------------------------------------------ */

const timelineItemVariants = cva("group/timeline-item relative", {
  variants: {
    layout: {
      left: "flex flex-row items-stretch gap-3",
      right: "flex flex-row-reverse items-stretch gap-3",
      alternating: "grid grid-cols-[1fr_auto_1fr] items-stretch gap-x-3",
    },
    density: {
      default: "",
      compact: "",
    },
  },
  defaultVariants: {
    layout: "left",
    density: "default",
  },
})

export interface TimelineItemProps extends React.ComponentProps<"li"> {
  /**
   * Zero-based position among the root's items — auto-assigned when the item
   * is a direct child of `<Timeline>`; pass it explicitly when wrapping
   * items in fragments. Drives left/right parity in `alternating` layouts.
   */
  index?: number
  /** Per-item rail placement (overrides the root's `side`). */
  side?: Exclude<TimelineSide, "alternating">
  /** Visual state of the event. */
  state?: TimelineItemState
}

function TimelineItem({
  index = 0,
  side: sideProp,
  state = "default",
  className,
  ...props
}: TimelineItemProps) {
  const root = React.useContext(TimelineContext)
  const rootSide = root?.side ?? "left"
  const density = root?.density ?? "default"
  const side: Exclude<TimelineSide, "alternating"> =
    sideProp ??
    (rootSide === "alternating"
      ? index % 2 === 0
        ? "left"
        : "right"
      : rootSide)
  const layout = rootSide === "alternating" ? "alternating" : side

  const context = React.useMemo<TimelineItemContextValue>(
    () => ({ index, side, rootSide, state, density }),
    [index, side, rootSide, state, density]
  )

  return (
    <TimelineItemContext.Provider value={context}>
      <li
        data-slot="timeline-item"
        data-state={state}
        data-side={side}
        aria-current={state === "current" ? "step" : undefined}
        className={cn(timelineItemVariants({ layout, density }), className)}
        {...props}
      />
    </TimelineItemContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/* Marker rail                                                         */
/* ------------------------------------------------------------------ */

function TimelineMarker({ className, ...props }: React.ComponentProps<"div">) {
  const item = React.useContext(TimelineItemContext)
  const compact = item?.density === "compact"
  return (
    <div
      data-slot="timeline-marker"
      className={cn(
        "flex shrink-0 flex-col items-center",
        compact ? "w-5" : "w-7",
        item?.rootSide === "alternating" && "col-start-2 row-start-1",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Dot — state node                                                    */
/* ------------------------------------------------------------------ */

const timelineDotVariants = cva(
  "mt-0.5 flex shrink-0 rounded-full border-2 transition-colors duration-200",
  {
    variants: {
      state: {
        default: "border-muted-foreground/60 bg-background",
        complete: "border-primary bg-primary",
        current: "border-primary bg-background ring-[3px] ring-primary/15",
        error: "border-destructive bg-destructive",
      },
      size: {
        default: "size-3.5",
        sm: "size-2.5",
      },
    },
    defaultVariants: {
      state: "default",
      size: "default",
    },
  }
)

export interface TimelineDotProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof timelineDotVariants> {}

function TimelineDot({ state, size, className, ...props }: TimelineDotProps) {
  const item = React.useContext(TimelineItemContext)
  const resolvedState = state ?? item?.state ?? "default"
  const resolvedSize = size ?? (item?.density === "compact" ? "sm" : "default")
  return (
    <span
      data-slot="timeline-dot"
      data-state={resolvedState}
      aria-hidden="true"
      className={cn(
        timelineDotVariants({ state: resolvedState, size: resolvedSize }),
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Badge — icon node                                                   */
/* ------------------------------------------------------------------ */

const timelineBadgeVariants = cva(
  "flex shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 [&_svg]:pointer-events-none",
  {
    variants: {
      state: {
        default: "border-border bg-muted text-muted-foreground",
        complete: "border-primary bg-primary text-primary-foreground",
        current: "border-primary bg-background text-primary ring-[3px] ring-primary/15",
        error: "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

export interface TimelineBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof timelineBadgeVariants> {}

function TimelineBadge({ state, className, ...props }: TimelineBadgeProps) {
  const item = React.useContext(TimelineItemContext)
  const resolvedState = state ?? item?.state ?? "default"
  const compact = item?.density === "compact"
  return (
    <span
      data-slot="timeline-badge"
      data-state={resolvedState}
      aria-hidden="true"
      className={cn(
        compact ? "size-5" : "size-7",
        compact
          ? "[&_svg:not([class*='size-'])]:size-3"
          : "[&_svg:not([class*='size-'])]:size-4",
        timelineBadgeVariants({ state: resolvedState }),
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Separator — hairline connector                                      */
/* ------------------------------------------------------------------ */

export interface TimelineSeparatorProps extends React.ComponentProps<"span"> {
  /** Connector state — inherited from the enclosing item by default. */
  state?: TimelineItemState
}

function TimelineSeparator({
  state,
  className,
  ...props
}: TimelineSeparatorProps) {
  const item = React.useContext(TimelineItemContext)
  const resolvedState = state ?? item?.state ?? "default"
  return (
    <span
      data-slot="timeline-separator"
      data-state={resolvedState}
      aria-hidden="true"
      className={cn(
        "w-px flex-1 bg-border transition-colors duration-200",
        item?.density === "compact" ? "my-1.5" : "my-2",
        resolvedState === "complete" && "bg-primary",
        resolvedState === "error" && "bg-destructive",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  const item = React.useContext(TimelineItemContext)
  const compact = item?.density === "compact"
  return (
    <div
      data-slot="timeline-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col",
        compact ? "gap-0.5 pb-4" : "gap-1 pb-6",
        item?.rootSide === "alternating" &&
          cn(
            "row-start-1 w-full",
            item.side === "left"
              ? "col-start-1 text-end"
              : "col-start-3 text-start"
          ),
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Header — title + timestamp                                          */
/* ------------------------------------------------------------------ */

export interface TimelineHeaderProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** Event title rendered by the default composition. */
  title?: React.ReactNode
  /** Timestamp / meta rendered in the mono data font. */
  timestamp?: React.ReactNode
}

function TimelineHeader({
  title,
  timestamp,
  className,
  children,
  ...props
}: TimelineHeaderProps) {
  const item = React.useContext(TimelineItemContext)
  return (
    <div
      data-slot="timeline-header"
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5",
        // Center-spine rows flip so the timestamp sits on the outer edge.
        item?.rootSide === "alternating" &&
          item.side === "left" &&
          "flex-row-reverse",
        className
      )}
      {...props}
    >
      {children !== undefined && children !== null ? (
        children
      ) : (
        <>
          {title !== undefined && title !== null ? (
            <TimelineTitle>{title}</TimelineTitle>
          ) : null}
          {timestamp !== undefined && timestamp !== null ? (
            <TimelineTimestamp>{timestamp}</TimelineTimestamp>
          ) : null}
        </>
      )}
    </div>
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"span">) {
  const item = React.useContext(TimelineItemContext)
  return (
    <span
      data-slot="timeline-title"
      className={cn(
        "font-medium leading-tight text-foreground",
        item?.density === "compact" ? "text-xs" : "text-sm",
        className
      )}
      {...props}
    />
  )
}

function TimelineTimestamp({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const item = React.useContext(TimelineItemContext)
  return (
    <span
      data-slot="timeline-timestamp"
      className={cn(
        "shrink-0 font-code tabular-nums text-muted-foreground",
        item?.density === "compact" ? "text-[11px]" : "text-xs",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Description                                                         */
/* ------------------------------------------------------------------ */

function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const item = React.useContext(TimelineItemContext)
  return (
    <p
      data-slot="timeline-description"
      className={cn(
        "text-muted-foreground",
        item?.density === "compact"
          ? "text-xs leading-relaxed"
          : "text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineDot,
  TimelineBadge,
  TimelineSeparator,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTimestamp,
  TimelineDescription,
  timelineVariants,
  timelineItemVariants,
  timelineDotVariants,
  timelineBadgeVariants,
}
