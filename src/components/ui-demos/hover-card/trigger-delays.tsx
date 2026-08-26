"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
export function TriggerDelaysDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <HoverCard openDelay={100} closeDelay={200}>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    </div>
  )
}
