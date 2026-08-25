"use client"

import { MessageScrollerContent } from "@/components/ui/message-scroller"
export function AccessibilityDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <MessageScrollerContent aria-busy={status === "streaming"}>
        {/* messages */}
      </MessageScrollerContent>
    </div>
  )
}
