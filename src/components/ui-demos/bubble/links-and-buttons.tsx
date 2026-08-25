"use client"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
 
export function BubbleLinkDemo() {
  return (
    <Bubble variant="muted">
      <BubbleContent render={<button />}>Click here</BubbleContent>
    </Bubble>
  )
}