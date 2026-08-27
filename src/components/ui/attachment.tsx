"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"
type AttachmentSize = "default" | "sm" | "xs"
type AttachmentOrientation = "horizontal" | "vertical"
type AttachmentMediaVariant = "icon" | "image"

/**
 * Base-UI-style `render` prop. When provided, the given element is cloned
 * (className merged, children passed through) instead of rendering the
 * component's default element.
 */
interface AttachmentRenderProp {
  render?: React.ReactElement<Record<string, unknown>>
}

interface AttachmentContextValue {
  state?: AttachmentState
  size: AttachmentSize
  orientation: AttachmentOrientation
}

const AttachmentContext = React.createContext<AttachmentContextValue | null>(null)

function useAttachmentContext() {
  const context = React.useContext(AttachmentContext)

  return {
    /** Whether the sub-component is rendered inside an `<Attachment>`. */
    insideAttachment: context !== null,
    state: context?.state,
    size: context?.size ?? "default",
    orientation: context?.orientation ?? "horizontal",
  }
}

function mergeRenderProp(
  render: React.ReactElement<Record<string, unknown>>,
  className: string,
  props: Record<string, unknown>,
  children?: React.ReactNode
) {
  const renderChildren = (render.props as { children?: React.ReactNode })
    .children

  return React.cloneElement(render, {
    ...props,
    className,
    children: children ?? renderChildren,
  })
}

function Attachment({
  className,
  state,
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  state?: AttachmentState
  size?: AttachmentSize
  orientation?: AttachmentOrientation
}) {
  return (
    <AttachmentContext.Provider value={{ state, size, orientation }}>
      <div
        data-slot="attachment"
        data-state={state}
        data-size={size}
        className={cn(
          "group/attachment relative flex w-full items-center gap-3 rounded-lg border border-input bg-background p-3 text-sm transition-colors hover:bg-accent/50",
          size === "sm" && "gap-2.5 p-2.5",
          size === "xs" && "gap-2 p-2",
          orientation === "vertical" && "flex-col items-stretch gap-2",
          state === "error" && "border-destructive/50",
          className
        )}
        {...props}
      />
    </AttachmentContext.Provider>
  )
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: AttachmentMediaVariant
}) {
  const { size, orientation, state } = useAttachmentContext()

  const isImage = variant === "image"
  const isFullWidthImage = isImage && orientation === "vertical"

  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground",
        "[&_img]:size-full [&_img]:object-cover",
        !isImage && "[&_svg:not([class*='size-'])]:size-4",
        isFullWidthImage
          ? "aspect-[16/9] w-full"
          : size === "sm"
            ? "size-8"
            : size === "xs"
              ? "size-7"
              : "size-9",
        !isImage && state === "error" && "bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    />
  )
}

function AttachmentContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = useAttachmentContext()

  return (
    <div
      data-slot="attachment-title"
      className={cn(
        "truncate font-medium leading-none",
        size === "xs" ? "text-xs" : "text-sm",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { state } = useAttachmentContext()

  return (
    <div
      data-slot="attachment-description"
      className={cn(
        "truncate text-xs text-muted-foreground",
        state === "error" && "text-destructive",
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useAttachmentContext()

  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-10 flex items-center gap-1 opacity-0 transition-opacity group-focus-within/attachment:opacity-100 group-hover/attachment:opacity-100",
        orientation === "vertical"
          ? "self-end"
          : // Overlaid on the row's end edge (above the trigger layer, z-10)
            // instead of reserving flow space, so the title/description can use
            // the full card width while the actions are hidden. The scrim fades
            // the text out beneath the revealed buttons, and pointer-events are
            // re-enabled on the buttons so the fade zone stays click-through.
            "pointer-events-none absolute inset-y-0 end-0 rounded-e-lg ps-8 [&>*]:pointer-events-auto ltr:bg-linear-to-r rtl:bg-linear-to-l from-transparent to-background to-[45%]",
        className
      )}
      {...props}
    />
  )
}

type AttachmentActionVariant =
  | "default"
  | "ghost"
  | "secondary"
  | "outline"
  | "destructive"
  | "link"

type AttachmentActionSize =
  | "default"
  | "sm"
  | "lg"
  | "icon"
  | "icon-sm"
  | "icon-lg"

const ATTACHMENT_ACTION_VARIANTS: Record<AttachmentActionVariant, string> = {
  default: "text-muted-foreground hover:bg-accent hover:text-foreground",
  ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
  outline:
    "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  destructive: "text-destructive hover:bg-destructive/10 hover:text-destructive",
  link: "text-primary underline-offset-4 hover:underline",
}

const ATTACHMENT_ACTION_SIZES: Record<
  Exclude<AttachmentActionSize, "default">,
  string
> = {
  sm: "size-7",
  lg: "size-10",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
}

function AttachmentAction({
  className,
  render,
  children,
  variant = "default",
  size,
  ...props
}: React.ComponentProps<"button"> &
  AttachmentRenderProp & {
    variant?: AttachmentActionVariant
    size?: AttachmentActionSize
  }) {
  const { size: attachmentSize } = useAttachmentContext()

  const className_ = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
    "[&_svg:not([class*='size-'])]:size-4",
    ATTACHMENT_ACTION_VARIANTS[variant],
    size && size !== "default"
      ? ATTACHMENT_ACTION_SIZES[size]
      : attachmentSize === "sm"
        ? "size-6"
        : attachmentSize === "xs"
          ? "size-5 [&_svg:not([class*='size-'])]:size-3.5]"
          : "size-7",
    className
  )

  if (render) {
    return mergeRenderProp(
      render,
      className_,
      { "data-slot": "attachment-action", ...props },
      children
    )
  }

  return (
    <button
      type="button"
      data-slot="attachment-action"
      className={className_}
      {...props}
    >
      {children}
    </button>
  )
}

function AttachmentTrigger({
  className,
  render,
  children,
  ...props
}: React.ComponentProps<"button"> & AttachmentRenderProp) {
  const { insideAttachment } = useAttachmentContext()

  const className_ = cn(
    insideAttachment
      ? // Fills the attachment card as an interactive overlay while the
        // actions (z-10) stay clickable above it.
        "absolute inset-0 z-0 cursor-pointer rounded-[inherit] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      : // Standalone upload trigger rendered as a dashed drop-zone button.
        "flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-background px-3 text-sm text-muted-foreground transition-colors outline-none hover:bg-accent/50 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
    className
  )

  if (render) {
    return mergeRenderProp(
      render,
      className_,
      { "data-slot": "attachment-trigger", ...props },
      children
    )
  }

  return (
    <button
      type="button"
      data-slot="attachment-trigger"
      className={className_}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
