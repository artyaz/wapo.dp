"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, icon, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex min-w-0 grow items-start gap-2">
              {icon ? (
                <span
                  data-slot="toast-icon"
                  className="shrink-0 translate-y-0.5 leading-none group-[.destructive]:text-destructive [&_svg:not([class*='size-'])]:size-4"
                >
                  {icon}
                </span>
              ) : null}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}