"use client"

import { AttachmentTrigger } from "@/components/ui/attachment"

const url =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"

export function AccessibilityDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <AttachmentTrigger
        render={
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open workspace.png"
          />
        }
      />
    </div>
  )
}
