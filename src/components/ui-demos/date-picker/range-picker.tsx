"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

export function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
      <DatePicker
        id="date-picker-range"
        mode="range"
        value={date}
        onValueChange={setDate}
        numberOfMonths={2}
        format="LLL dd, y"
      />
      <p className="text-muted-foreground px-1 text-sm">
        {date?.from
          ? `Selected range: ${format(date.from, "LLL dd, y")}${
              date.to ? ` – ${format(date.to, "LLL dd, y")}` : ""
            }`
          : "No range selected."}
      </p>
    </Field>
  )
}
