"use client"

import * as React from "react"

/**
 * Tiny clipboard hook with a timed "copied" reset.
 *
 * @returns `{ isCopied, copyToClipboard }` — `isCopied` flips back to
 * `false` after `timeout` ms (default 2000).
 */
export function useCopyToClipboard({ timeout = 2000 } = {}) {
  const [isCopied, setIsCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copyToClipboard = React.useCallback(
    async (value: string) => {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard?.writeText
      ) {
        try {
          await navigator.clipboard.writeText(value)
        } catch {
          // Fall through to the legacy path below.
          legacyCopy(value)
        }
      } else if (typeof document !== "undefined") {
        legacyCopy(value)
      }

      setIsCopied(true)

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => setIsCopied(false), timeout)
    },
    [timeout]
  )

  return { isCopied, copyToClipboard }
}

/** execCommand fallback for non-secure contexts without the async clipboard. */
function legacyCopy(value: string) {
  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()

  try {
    document.execCommand("copy")
  } catch {
    // Clipboard unavailable — the "copied" state is still surfaced by the
    // caller's UI; nothing else we can do without permissions.
  }

  document.body.removeChild(textarea)
}
