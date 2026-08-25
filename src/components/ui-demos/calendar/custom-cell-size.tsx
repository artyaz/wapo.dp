"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CustomCellSizeDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border [--cell-size:2.75rem] md:[--cell-size:3rem]"
      />
    </div>
  )
}
