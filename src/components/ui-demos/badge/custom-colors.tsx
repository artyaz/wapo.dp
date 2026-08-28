"use client"

import { Badge } from "@/components/ui/badge"

/**
 * Custom colors — semantic tokens only (Praxis: monochrome first; success /
 * warning / destructive are a budget spent where meaning demands it).
 * The token scales flip automatically in dark theme, so no dark: overrides.
 */
export function BadgeCustomColors() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="border-transparent bg-success-100 text-success-700">
        Recovering
      </Badge>
      <Badge className="border-transparent bg-warning-100 text-warning-700">
        Follow-up
      </Badge>
      <Badge className="border-transparent bg-destructive-100 text-destructive-700">
        Allergic
      </Badge>
      <Badge className="border-transparent bg-neutral-100 text-neutral-700">
        Neutral
      </Badge>
      <Badge className="border-transparent bg-neutral-800 text-neutral-100">
        High contrast
      </Badge>
    </div>
  )
}
