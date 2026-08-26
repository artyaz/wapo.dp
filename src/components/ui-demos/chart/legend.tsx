"use client"

import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

export function LegendDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
    </div>
  )
}
