"use client"

import { Progress } from "@/components/ui/progress"

export function ProgressWithLabel() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>Upload progress</span>
        <span className="text-muted-foreground">56%</span>
      </div>
      <Progress value={56} className="w-full" />
    </div>
  )
}
