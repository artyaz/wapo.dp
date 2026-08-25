"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
export function AccessibilityDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <ButtonGroup aria-label="Button group">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    </div>
  )
}
