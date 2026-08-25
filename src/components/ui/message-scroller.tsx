"use client"

import * as React from "react"
import { ArrowDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Distance (px) from an edge that still counts as "at" that edge. */
const EDGE_THRESHOLD = 4

/** Default space (px) kept between an anchored item and the viewport top. */
const DEFAULT_SCROLL_MARGIN = 24

/** Default amount (px) of the previous item kept visible above an anchor. */
const DEFAULT_PREVIOUS_ITEM_PEEK = 64

type MessageScrollerDefaultPosition = "start" | "end" | "last-anchor"

type MessageScrollerItemEntry = {
  /** Internally generated key, unique per mounted item instance. */
  key: string
  /** The `messageId` passed to `MessageScrollerItem`, if any. */
  id: string | null
  /** Whether the item should anchor a new turn when it mounts. */
  anchor: boolean
  element: HTMLElement
}

type MessageScrollerController = {
  setViewport: (node: HTMLDivElement | null) => void
  setContent: (node: HTMLDivElement | null) => void
  registerItem: (entry: MessageScrollerItemEntry) => () => void
  scrollToMessage: (
    messageId: string,
    options?: {
      behavior?: ScrollBehavior
      block?: ScrollLogicalPosition
      margin?: number
    }
  ) => void
  scrollToEnd: (behavior?: ScrollBehavior) => void
  scrollToStart: (behavior?: ScrollBehavior) => void
  handleViewportScroll: () => void
}

type MessageScrollerState = {
  /** Whether the reader can scroll further toward the start. */
  start: boolean
  /** Whether the reader can scroll further toward the end. */
  end: boolean
  /** Whether the viewport is pinned at the bottom edge. */
  atBottom: boolean
  /** `messageId` of the anchor for the turn currently in view. */
  currentAnchorId: string | null
  /** `messageId` values currently intersecting the viewport. */
  visibleMessageIds: string[]
}

const MessageScrollerControllerContext =
  React.createContext<MessageScrollerController | null>(null)

const MessageScrollerStateContext =
  React.createContext<MessageScrollerState | null>(null)

function useMessageScrollerController(
  component: string
): MessageScrollerController {
  const controller = React.useContext(MessageScrollerControllerContext)

  if (!controller) {
    throw new Error(
      `\`${component}\` must be used within a <MessageScrollerProvider>.`
    )
  }

  return controller
}

function useMessageScrollerState(component: string): MessageScrollerState {
  const state = React.useContext(MessageScrollerStateContext)

  if (!state) {
    throw new Error(
      `\`${component}\` must be used within a <MessageScrollerProvider>.`
    )
  }

  return state
}

function MessageScrollerProvider({
  autoScroll = false,
  defaultScrollPosition = "last-anchor",
  scrollMargin = DEFAULT_SCROLL_MARGIN,
  scrollPreviousItemPeek = DEFAULT_PREVIOUS_ITEM_PEEK,
  children,
}: {
  /**
   * Follow the live edge of the conversation: keep the viewport pinned to the
   * bottom while content streams in, but only for as long as the reader is
   * already at the bottom.
   *
   * @default false
   */
  autoScroll?: boolean
  /**
   * Where the transcript should open.
   *
   * - `"start"` — the first message.
   * - `"end"` — the newest message.
   * - `"last-anchor"` — the last item marked with `scrollAnchor`.
   *
   * @default "last-anchor"
   */
  defaultScrollPosition?: MessageScrollerDefaultPosition
  /**
   * Space (px) kept between an item scrolled into view and the viewport edge.
   *
   * @default 24
   */
  scrollMargin?: number
  /**
   * Amount (px) of the previous item kept visible above a newly anchored turn.
   *
   * @default 64
   */
  scrollPreviousItemPeek?: number
  children?: React.ReactNode
}) {
  const [viewport, setViewportState] =
    React.useState<HTMLDivElement | null>(null)
  const [content, setContentState] = React.useState<HTMLDivElement | null>(null)
  const [state, setState] = React.useState<MessageScrollerState>({
    start: false,
    end: false,
    atBottom: true,
    currentAnchorId: null,
    visibleMessageIds: [],
  })

  const itemsRef = React.useRef(new Map<string, MessageScrollerItemEntry>())
  const knownItemKeysRef = React.useRef(new Set<string>())
  const atBottomRef = React.useRef(true)
  const autoScrollRef = React.useRef(autoScroll)
  const scrollMarginRef = React.useRef(scrollMargin)
  const previousItemPeekRef = React.useRef(scrollPreviousItemPeek)
  const initialPositionAppliedRef = React.useRef(false)
  const updateFrameRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    autoScrollRef.current = autoScroll
  }, [autoScroll])

  React.useEffect(() => {
    scrollMarginRef.current = scrollMargin
  }, [scrollMargin])

  React.useEffect(() => {
    previousItemPeekRef.current = scrollPreviousItemPeek
  }, [scrollPreviousItemPeek])

  const setViewport = React.useCallback((node: HTMLDivElement | null) => {
    setViewportState((previous) => (previous === node ? previous : node))
  }, [])

  const setContent = React.useCallback((node: HTMLDivElement | null) => {
    setContentState((previous) => (previous === node ? previous : node))
  }, [])

  const getOrderedItems = React.useCallback(() => {
    const entries = Array.from(itemsRef.current.values())

    entries.sort((a, b) =>
      a.element.compareDocumentPosition(b.element) &
      Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1
    )

    return entries
  }, [])

  const updateMetrics = React.useCallback(() => {
    if (!viewport) {
      return
    }

    const viewportRect = viewport.getBoundingClientRect()
    const distanceFromBottom =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
    const atBottom = distanceFromBottom <= EDGE_THRESHOLD
    const start = viewport.scrollTop > EDGE_THRESHOLD
    const end = distanceFromBottom > EDGE_THRESHOLD

    const orderedItems = getOrderedItems()
    const viewportMiddle = viewportRect.top + viewportRect.height / 2
    const visibleMessageIds: string[] = []
    let currentAnchorId: string | null = null

    for (const item of orderedItems) {
      if (!item.id) {
        continue
      }

      const itemRect = item.element.getBoundingClientRect()
      const isVisible =
        itemRect.bottom > viewportRect.top + 1 &&
        itemRect.top < viewportRect.bottom - 1

      if (isVisible) {
        visibleMessageIds.push(item.id)
      }

      if (item.anchor && itemRect.top <= viewportMiddle) {
        currentAnchorId = item.id
      }
    }

    if (currentAnchorId === null) {
      currentAnchorId = orderedItems.find((item) => item.anchor && item.id)?.id ?? null
    }

    atBottomRef.current = atBottom

    setState((previous) => {
      const unchanged =
        previous.start === start &&
        previous.end === end &&
        previous.atBottom === atBottom &&
        previous.currentAnchorId === currentAnchorId &&
        previous.visibleMessageIds.length === visibleMessageIds.length &&
        previous.visibleMessageIds.every(
          (id, index) => id === visibleMessageIds[index]
        )

      return unchanged
        ? previous
        : { start, end, atBottom, currentAnchorId, visibleMessageIds }
    })
  }, [viewport, getOrderedItems])

  const scheduleUpdate = React.useCallback(() => {
    if (updateFrameRef.current !== null) {
      return
    }

    updateFrameRef.current = requestAnimationFrame(() => {
      updateFrameRef.current = null
      updateMetrics()
    })
  }, [updateMetrics])

  const scrollToAnchorItem = React.useCallback(
    (entry: MessageScrollerItemEntry, behavior: ScrollBehavior) => {
      if (!viewport) {
        return
      }

      const viewportRect = viewport.getBoundingClientRect()
      const itemRect = entry.element.getBoundingClientRect()
      const itemTop = viewport.scrollTop + (itemRect.top - viewportRect.top)
      const orderedItems = getOrderedItems()
      const index = orderedItems.indexOf(entry)
      const previousItem = index > 0 ? orderedItems[index - 1] : undefined

      let target: number

      if (previousItem) {
        // Keep a peek of the previous turn visible above the anchored row.
        const previousRect = previousItem.element.getBoundingClientRect()
        const previousBottom =
          viewport.scrollTop + (previousRect.bottom - viewportRect.top)

        target = previousBottom - previousItemPeekRef.current
      } else {
        target = itemTop - scrollMarginRef.current
      }

      viewport.scrollTo({ top: Math.max(0, target), behavior })
    },
    [viewport, getOrderedItems]
  )

  const handleItemAdded = React.useCallback(
    (entry: MessageScrollerItemEntry) => {
      if (!viewport) {
        scheduleUpdate()
        return
      }

      const viewportRect = viewport.getBoundingClientRect()
      const itemRect = entry.element.getBoundingClientRect()

      // History was prepended above the visible range: hold the reader's
      // current position instead of letting the view jump.
      if (itemRect.bottom <= viewportRect.top + 1) {
        const nextElement = entry.element.nextElementSibling
        const gap = nextElement
          ? Math.max(
              0,
              nextElement.getBoundingClientRect().top - itemRect.bottom
            )
          : 0

        viewport.scrollTop += itemRect.height + gap
        scheduleUpdate()
        return
      }

      // Follow the live edge while the reader is caught up.
      if (autoScrollRef.current && atBottomRef.current) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: "instant",
        })
        scheduleUpdate()
        return
      }

      if (entry.anchor) {
        scrollToAnchorItem(entry, "smooth")
      }

      scheduleUpdate()
    },
    [viewport, scheduleUpdate, scrollToAnchorItem]
  )

  const registerItem = React.useCallback(
    (entry: MessageScrollerItemEntry) => {
      const isNew = !knownItemKeysRef.current.has(entry.key)

      knownItemKeysRef.current.add(entry.key)
      itemsRef.current.set(entry.key, entry)

      if (initialPositionAppliedRef.current && isNew) {
        handleItemAdded(entry)
      } else {
        scheduleUpdate()
      }

      return () => {
        if (itemsRef.current.get(entry.key) === entry) {
          itemsRef.current.delete(entry.key)
        }

        scheduleUpdate()
      }
    },
    [handleItemAdded, scheduleUpdate]
  )

  const scrollToMessage = React.useCallback(
    (
      messageId: string,
      options?: {
        behavior?: ScrollBehavior
        block?: ScrollLogicalPosition
        margin?: number
      }
    ) => {
      if (!viewport) {
        return
      }

      const entry = getOrderedItems().find((item) => item.id === messageId)

      if (!entry) {
        return
      }

      const behavior = options?.behavior ?? "smooth"
      const margin = options?.margin ?? scrollMarginRef.current
      const viewportRect = viewport.getBoundingClientRect()
      const itemRect = entry.element.getBoundingClientRect()
      const itemTop = viewport.scrollTop + (itemRect.top - viewportRect.top)

      let block = options?.block ?? "start"

      if (block === "nearest") {
        if (
          itemRect.top >= viewportRect.top &&
          itemRect.bottom <= viewportRect.bottom
        ) {
          return
        }

        block = itemRect.top < viewportRect.top ? "start" : "end"
      }

      let target: number

      if (block === "center") {
        target = itemTop - (viewport.clientHeight - itemRect.height) / 2
      } else if (block === "end") {
        target = itemTop - viewport.clientHeight + itemRect.height + margin
      } else {
        target = itemTop - margin
      }

      viewport.scrollTo({ top: Math.max(0, target), behavior })
    },
    [viewport, getOrderedItems]
  )

  const scrollToEnd = React.useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      if (!viewport) {
        return
      }

      viewport.scrollTo({ top: viewport.scrollHeight, behavior })
      scheduleUpdate()
    },
    [viewport, scheduleUpdate]
  )

  const scrollToStart = React.useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      if (!viewport) {
        return
      }

      viewport.scrollTo({ top: 0, behavior })
      scheduleUpdate()
    },
    [viewport, scheduleUpdate]
  )

  // Open the transcript at the requested position once, after the initial
  // items have registered.
  React.useEffect(() => {
    if (!viewport || initialPositionAppliedRef.current) {
      return
    }

    if (defaultScrollPosition === "start") {
      viewport.scrollTop = 0
    } else if (defaultScrollPosition === "end") {
      viewport.scrollTop = viewport.scrollHeight
    } else {
      const orderedItems = getOrderedItems()
      const lastAnchor = [...orderedItems]
        .reverse()
        .find((item) => item.anchor)

      if (lastAnchor) {
        scrollToAnchorItem(lastAnchor, "instant")
      } else {
        viewport.scrollTop = viewport.scrollHeight
      }
    }

    initialPositionAppliedRef.current = true
    updateMetrics()
  }, [
    viewport,
    defaultScrollPosition,
    getOrderedItems,
    scrollToAnchorItem,
    updateMetrics,
  ])

  // Track scrolling and size changes (streaming content, viewport resizes).
  React.useEffect(() => {
    if (!viewport) {
      return
    }

    const handleScroll = () => scheduleUpdate()

    viewport.addEventListener("scroll", handleScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      if (autoScrollRef.current && atBottomRef.current) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "instant" })
      }

      scheduleUpdate()
    })

    resizeObserver.observe(viewport)

    if (content) {
      resizeObserver.observe(content)
    }

    updateMetrics()

    return () => {
      viewport.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
    }
  }, [viewport, content, scheduleUpdate, updateMetrics])

  React.useEffect(() => {
    return () => {
      if (updateFrameRef.current !== null) {
        cancelAnimationFrame(updateFrameRef.current)
      }
    }
  }, [])

  const controller = React.useMemo<MessageScrollerController>(
    () => ({
      setViewport,
      setContent,
      registerItem,
      scrollToMessage,
      scrollToEnd,
      scrollToStart,
      handleViewportScroll: scheduleUpdate,
    }),
    [
      setViewport,
      setContent,
      registerItem,
      scrollToMessage,
      scrollToEnd,
      scrollToStart,
      scheduleUpdate,
    ]
  )

  return (
    <MessageScrollerControllerContext.Provider value={controller}>
      <MessageScrollerStateContext.Provider value={state}>
        {children}
      </MessageScrollerStateContext.Provider>
    </MessageScrollerControllerContext.Provider>
  )
}

/** The scroll container: holds the viewport and the floating scroll button. */
function MessageScroller({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-scroller"
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col",
        className
      )}
      {...props}
    />
  )
}

/** The element that actually scrolls. Receives the scroll ref for virtualization. */
function MessageScrollerViewport({
  className,
  onScroll,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  const { setViewport, handleViewportScroll } = useMessageScrollerController(
    "MessageScrollerViewport"
  )

  const handleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }

      setViewport(node)
    },
    [ref, setViewport]
  )

  return (
    <div
      ref={handleRef}
      data-slot="message-scroller-viewport"
      tabIndex={0}
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth outline-none",
        className
      )}
      onScroll={(event) => {
        onScroll?.(event)
        handleViewportScroll()
      }}
      {...props}
    />
  )
}

/**
 * The transcript list. Announces additions to assistive tech through
 * `role="log"` and `aria-relevant="additions"`.
 */
function MessageScrollerContent({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  const { setContent } = useMessageScrollerController(
    "MessageScrollerContent"
  )

  const handleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }

      setContent(node)
    },
    [ref, setContent]
  )

  return (
    <div
      ref={handleRef}
      data-slot="message-scroller-content"
      role="log"
      aria-relevant="additions"
      className={cn("flex flex-col gap-4 p-4", className)}
      {...props}
    />
  )
}

/**
 * A row in the transcript (a message, marker, or divider). Items marked with
 * `scrollAnchor` settle near the top edge when a new turn starts.
 */
function MessageScrollerItem({
  className,
  messageId,
  scrollAnchor = false,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  /** Stable id used by the scroller hooks (anchoring, visibility, jumps). */
  messageId?: string
  /**
   * Anchor this item for the next turn: when it mounts, the scroller
   * positions it near the top edge with a peek of the previous item above.
   *
   * @default false
   */
  scrollAnchor?: boolean
}) {
  const { registerItem } = useMessageScrollerController("MessageScrollerItem")
  const itemRef = React.useRef<HTMLDivElement | null>(null)
  const itemKeyRef = React.useRef<string | null>(null)

  if (itemKeyRef.current === null) {
    itemKeyRef.current = `message-scroller-item-${Math.random().toString(36).slice(2)}`
  }

  const handleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      itemRef.current = node

      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  React.useEffect(() => {
    const element = itemRef.current

    if (!element || itemKeyRef.current === null) {
      return
    }

    return registerItem({
      key: itemKeyRef.current,
      id: messageId ?? null,
      anchor: scrollAnchor,
      element,
    })
  }, [registerItem, messageId, scrollAnchor])

  return (
    <div
      ref={handleRef}
      data-slot="message-scroller-item"
      data-message-id={messageId}
      data-scroll-anchor={scrollAnchor || undefined}
      className={className}
      {...props}
    />
  )
}

/**
 * Floating "scroll to bottom" button. Hidden — and removed from the tab
 * order — while the reader is already at the bottom. Clicking it jumps to
 * the newest message and re-engages auto-scroll.
 */
function MessageScrollerButton({
  className,
  onClick,
  children,
  ref,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollToEnd } = useMessageScrollerController(
    "MessageScrollerButton"
  )
  const { atBottom } = useMessageScrollerState("MessageScrollerButton")

  return (
    <button
      ref={ref}
      type="button"
      data-slot="message-scroller-button"
      data-state={atBottom ? "hidden" : "visible"}
      aria-label="Scroll to bottom"
      tabIndex={atBottom ? -1 : 0}
      aria-hidden={atBottom || undefined}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          scrollToEnd("smooth")
        }
      }}
      className={cn(
        "absolute bottom-4 left-1/2 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-input bg-background/80 text-foreground shadow-sm backdrop-blur-xs transition-all duration-200 outline-none select-none hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        atBottom && "pointer-events-none scale-75 opacity-0",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon />
          <span className="sr-only">Scroll to bottom</span>
        </>
      )}
    </button>
  )
}

/**
 * Imperative scrolling for the enclosing scroller.
 *
 * @returns `{ scrollToMessage, scrollToEnd, scrollToStart }`
 */
function useMessageScroller() {
  const { scrollToMessage, scrollToEnd, scrollToStart } =
    useMessageScrollerController("useMessageScroller")

  return React.useMemo(
    () => ({ scrollToMessage, scrollToEnd, scrollToStart }),
    [scrollToMessage, scrollToEnd, scrollToStart]
  )
}

/**
 * Which parts of the transcript the reader is currently looking at.
 *
 * @returns `{ currentAnchorId, visibleMessageIds }`
 */
function useMessageScrollerVisibility() {
  const { currentAnchorId, visibleMessageIds } = useMessageScrollerState(
    "useMessageScrollerVisibility"
  )

  return { currentAnchorId, visibleMessageIds }
}

/**
 * Which directions the reader can still scroll in.
 *
 * @returns `{ start, end }` — `start` is `true` when there is content above
 * the current position, `end` when there is content below.
 */
function useMessageScrollerScrollable() {
  const { start, end } = useMessageScrollerState("useMessageScrollerScrollable")

  return { start, end }
}

export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
