"use client"

import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TooltipDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <ChartTooltip
        content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
      />
    </div>
  )
}
