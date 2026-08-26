"use client"

import { toast } from "sonner"

import { Bubble, BubbleContent } from "@/components/ui/bubble"

export function AccessibilityDemo() {
  const onReply = () => {
    toast.info("Password reset flow would start here.")
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Bubble variant="muted" align="end">
        <BubbleContent render={<button type="button" onClick={onReply} />}>
          I forgot my password
        </BubbleContent>
      </Bubble>
    </div>
  )
}
