"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type MessageAlign = "start" | "end"

/**
 * Carries the side (`start`/`end`) of the closest ancestor `Message`.
 *
 * Exported so sibling slots that render inside a `Message` — most notably
 * `Bubble` — can inherit the message's alignment when they don't declare an
 * explicit `align` of their own (an align-less `Bubble` otherwise defaults to
 * the start edge and detaches from the avatar/footer of an `align="end"`
 * message, in both LTR and RTL).
 */
const MessageAlignContext = React.createContext<MessageAlign>("start")

/** Reads the `align` of the closest ancestor `Message`. Defaults to `"start"`. */
function useMessageAlign() {
  return React.useContext(MessageAlignContext)
}

/**
 * A single chat turn: avatar on one side, content (header, bubbles,
 * attachments, footer) on the other.
 */
function Message({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Which side of the conversation the message belongs to.
   * `"start"` renders the avatar on the left, `"end"` mirrors the row so the
   * avatar sits on the right and the content is right-aligned.
   *
   * @default "start"
   */
  align?: MessageAlign
}) {
  return (
    <MessageAlignContext.Provider value={align}>
      <div
        data-slot="message"
        data-align={align}
        className={cn(
          "flex w-full items-start gap-3",
          align === "end" && "flex-row-reverse",
          className
        )}
        {...props}
      />
    </MessageAlignContext.Provider>
  )
}

/**
 * Avatar slot for a message. Renders an invisible `size-8` placeholder when
 * empty so message content stays aligned across a group.
 */
function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Column that stacks the header, bubbles/attachments and footer of a turn.
 * Follows the `align` of the parent `Message`.
 */
function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  const align = useMessageAlign()

  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-2",
        align === "end" ? "items-end" : "items-start",
        // Bubbles default to the start edge; inside an `align="end"` message
        // that pushes them to the opposite edge from the avatar and footer
        // (the pair-170 RTL disconnect). Flip bubbles to the end edge so the
        // outgoing group stays cohesive in LTR and RTL. No-op for bubbles
        // that already align end; stays a no-op once `Bubble` consumes
        // `MessageAlignContext` for inherited alignment.
        align === "end" && "[&_[data-slot=bubble]]:items-end",
        className
      )}
      {...props}
    />
  )
}

/** Author or context label rendered above the message content. */
function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-none",
        className
      )}
      {...props}
    />
  )
}

/** Timestamps and message actions rendered below the message content. */
function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm",
        className
      )}
      {...props}
    />
  )
}

/** Stacks consecutive `Message` turns into a conversation section. */
function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

export {
  Message,
  MessageAlignContext,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageGroup,
  useMessageAlign,
}
export type { MessageAlign }
