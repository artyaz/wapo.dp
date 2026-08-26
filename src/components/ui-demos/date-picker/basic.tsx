"use client"

import * as React from "react"

import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

export function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <DatePicker
        id="date-picker-simple"
        value={date}
        onValueChange={setDate}
      />
    </Field>
  )
}
