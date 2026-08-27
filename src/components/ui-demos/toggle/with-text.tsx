"use client"

import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleText() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle defaultPressed aria-label="Toggle bold">
        <BoldIcon />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
    </div>
  )
}
