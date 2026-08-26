"use client"

import * as React from "react"

import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

export function DatePickerWithDateOfBirth() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date">Date of birth</FieldLabel>
      <DatePicker
        id="date"
        value={date}
        onValueChange={setDate}
        placeholder="Select date"
        captionLayout="dropdown"
        fromYear={1960}
        toYear={new Date().getFullYear()}
      />
    </Field>
  )
}
