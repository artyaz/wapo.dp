"use client"

import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDisabled() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold" disabled>
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="strikethrough"
        aria-label="Toggle strikethrough"
        disabled
      >
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
