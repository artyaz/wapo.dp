"use client"

import * as React from "react"

import { DatePickerInput } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

export function DatePickerWithInput() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )

  return (
    <Field className="mx-auto w-48">
      <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel>
      <DatePickerInput
        id="date-required"
        value={date}
        onValueChange={setDate}
        placeholder="June 01, 2025"
      />
    </Field>
  )
}
