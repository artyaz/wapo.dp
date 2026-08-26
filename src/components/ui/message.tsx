"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type MessageAlign = "start" | "end"

const MessageAlignContext = React.createContext<MessageAlign>("start")

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
  const align = React.useContext(MessageAlignContext)

  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-2",
        align === "end" ? "items-end" : "items-start",
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
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageGroup,
}
