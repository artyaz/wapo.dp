"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleAlert, X } from "lucide-react"

import { toast as dispatchToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        // Praxis: the destructive toast keeps a fully monochrome panel,
        // hairline border, title, description and action — the semantic red
        // budget is spent ONLY on the leading status icon, exactly as the
        // success and warning types spend green/amber on theirs. Hue never
        // carries hierarchy in text; the transient toast stays legible at a
        // glance in both themes.
        destructive: "destructive group border bg-card text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-sm p-1 text-foreground/40 transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 group-hover:text-foreground",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    data-slot="toast-title"
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

/**
 * Options for the imperative `toast.add()` API used by the docs demos
 * (mirrors the new shadcn toast API). Toasts are dispatched into the store
 * behind `@/hooks/use-toast`, so they render through the app's mounted
 * `<Toaster />`.
 */
export type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Leading status icon. Color it semantically (e.g. `text-success-500`);
   * uncolored icons inherit the toast's text color (incl. destructive). */
  icon?: React.ReactNode
  type?: "success" | "info" | "warning" | "error"
  /** Accepted for API compatibility. "error" renders destructively. */
  priority?: "high" | "normal" | "low"
  /** Props for the optional action button (e.g. `children` + `onClick`). */
  actionProps?: React.ComponentPropsWithoutRef<"button">
  /** Auto-dismiss delay in ms. `Infinity` keeps the toast open. */
  duration?: number
}

export type ToastPromiseOptions<T> = {
  loading?: React.ReactNode
  success?: React.ReactNode | ((data: T) => React.ReactNode)
  error?: React.ReactNode | ((error: unknown) => React.ReactNode)
}

type ToastStoreHandle = ReturnType<typeof dispatchToast>

/** Handles for toasts created through the imperative API. */
const toastHandles = new Map<string, ToastStoreHandle>()

/** Default auto-dismiss delay (ms) for `toast.add()`. */
const TOAST_DURATION = 5000

function resolveToastContent<T>(
  content: React.ReactNode | ((data: T) => React.ReactNode) | undefined,
  data: T
): React.ReactNode {
  return typeof content === "function" ? content(data) : content
}

function createToast(options: ToastOptions): ToastStoreHandle {
  const { title, description, type, actionProps } = options
  const duration = options.duration ?? TOAST_DURATION

  // Praxis: semantic color lives on the status icon. Error toasts therefore
  // always carry a red alert icon — injected here when the caller omits one —
  // while the panel, border, description and action stay monochrome. Warnings,
  // successes and infos never claim color unless the caller passes an icon.
  const icon =
    options.icon ??
    (type === "error" ? (
      <CircleAlert className="size-4 text-destructive" />
    ) : undefined)

  // Radix's Toast root types `title` as a plain string (an aria attribute),
  // which narrows the store's input type even though the mounted <Toaster />
  // renders it as an arbitrary ReactNode. Cast at this boundary only.
  const handle = dispatchToast({
    // Only errors use the destructive variant (red icon on a neutral card —
    // same single-icon color budget as success/warning); every other type
    // stays on the default monochrome card.
    variant: type === "error" ? "destructive" : undefined,
    title,
    description,
    icon,
    // Forward the duration so Radix's own auto-close timer honors it —
    // otherwise every toast closed after the root's 5s default regardless
    // of the `duration` option.
    duration,
    action: actionProps ? (
      <ToastAction
        altText={
          typeof actionProps.children === "string"
            ? actionProps.children
            : "Action"
        }
        onClick={actionProps.onClick}
        className={actionProps.className}
      >
        {actionProps.children}
      </ToastAction>
    ) : undefined,
  } as Parameters<typeof dispatchToast>[0])

  toastHandles.set(handle.id, handle)

  if (duration !== Infinity) {
    setTimeout(() => handle.dismiss(), duration)
  }

  return handle
}

function addToast(options: ToastOptions): string {
  return createToast(options).id
}

function closeToast(id?: string): void {
  if (id === undefined) {
    toastHandles.forEach((handle) => handle.dismiss())
    return
  }
  toastHandles.get(id)?.dismiss()
}

function promiseToast<T>(
  promise: Promise<T>,
  options: ToastPromiseOptions<T> = {}
): Promise<T> {
  const handle = createToast({
    description: options.loading,
    // Keep the loading state open until the promise settles.
    duration: Infinity,
  })

  return promise
    .then((data) => {
      handle.update({
        id: handle.id,
        description: resolveToastContent(options.success, data),
        variant: undefined,
      })
      setTimeout(() => handle.dismiss(), TOAST_DURATION)
      return data
    })
    .catch((error: unknown) => {
      handle.update({
        id: handle.id,
        description: resolveToastContent(options.error, error),
        variant: "destructive",
        icon: <CircleAlert className="size-4 text-destructive" />,
      })
      setTimeout(() => handle.dismiss(), TOAST_DURATION)
      return Promise.reject(error)
    })
}

/**
 * Imperative toast API: `toast.add()`, `toast.close(id)` and
 * `toast.promise(p, { loading, success, error })`. Calling `toast()` directly
 * is an alias for `toast.add()`.
 */
const toast = ((options: ToastOptions) => addToast(options)) as {
  (options: ToastOptions): string
  add(options: ToastOptions): string
  close(id?: string): void
  dismiss(id?: string): void
  remove(id?: string): void
  promise<T>(promise: Promise<T>, options?: ToastPromiseOptions<T>): Promise<T>
}

toast.add = addToast
toast.close = closeToast
toast.dismiss = closeToast
toast.remove = closeToast
toast.promise = promiseToast

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}