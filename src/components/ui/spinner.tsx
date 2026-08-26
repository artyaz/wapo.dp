import * as React from "react"

import { cn } from "@/lib/utils"

function Spinner({
  className,
  render,
  ...props
}: React.ComponentProps<"svg"> & {
  render?: React.ReactElement<Record<string, unknown>>
}) {
  const spinnerClass = cn("size-4 animate-spin", className)

  if (render) {
    // Base-UI-style `render` prop: clone the provided element, merge the
    // spinner styling onto it and pass the remaining props through.
    return React.cloneElement(
      render,
      {
        role: "status",
        "aria-label": "Loading",
        className: cn(
          (render.props as { className?: string } | undefined)?.className,
          spinnerClass
        ),
        ...props,
      }
    )
  }

  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={spinnerClass}
      {...props}
    >
      {/* Partial arc (75% of the circle) swept by Tailwind's built-in
          `animate-spin` keyframes — pure CSS, no extra dependencies. */}
      <circle cx="12" cy="12" r="10" pathLength="100" strokeDasharray="75 25" />
    </svg>
  )
}

export { Spinner }
