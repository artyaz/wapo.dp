"use client"

import * as React from "react"

import { DatePickerInput } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

/**
 * A small natural-language date parser (no external dependency). It supports
 * common expressions like "today", "tomorrow", "yesterday", "in 3 days",
 * "next week", "next month" and "next friday", plus anything `new Date()`
 * can parse as a fallback. Swap `parse` for a library such as chrono-node in
 * your own app if you need richer parsing.
 */
function parseNaturalDate(input: string): Date | undefined {
  const value = input.trim().toLowerCase()
  if (!value) {
    return undefined
  }

  const today = new Date()
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
  const addDays = (date: Date, days: number) => {
    const next = new Date(date)
    next.setDate(next.getDate() + days)
    return next
  }

  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]

  let match = value.match(/^today$/)
  if (match) {
    return startOfToday
  }
  match = value.match(/^tomorrow$/)
  if (match) {
    return addDays(startOfToday, 1)
  }
  match = value.match(/^yesterday$/)
  if (match) {
    return addDays(startOfToday, -1)
  }
  match = value.match(/^in (\d+) (day|week|month|year)s?$/)
  if (match) {
    const count = Number(match[1])
    const unit = match[2]
    if (unit === "day") return addDays(startOfToday, count)
    if (unit === "week") return addDays(startOfToday, count * 7)
    if (unit === "month") {
      const next = new Date(startOfToday)
      next.setMonth(next.getMonth() + count)
      return next
    }
    const next = new Date(startOfToday)
    next.setFullYear(next.getFullYear() + count)
    return next
  }
  match = value.match(/^next week$/)
  if (match) {
    return addDays(startOfToday, 7)
  }
  match = value.match(/^next month$/)
  if (match) {
    const next = new Date(startOfToday)
    next.setMonth(next.getMonth() + 1)
    return next
  }
  match = value.match(/^next (sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/)
  if (match) {
    const target = weekdays.indexOf(match[1])
    const daysAhead = ((target - startOfToday.getDay() + 7) % 7) || 7
    return addDays(startOfToday, daysAhead)
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function DatePickerNaturalLanguage() {
  const [date, setDate] = React.useState<Date | undefined>(
    parseNaturalDate("In 2 days")
  )

  return (
    <Field className="mx-auto max-w-xs">
      <FieldLabel htmlFor="date-optional">Schedule Date</FieldLabel>
      <DatePickerInput
        id="date-optional"
        value={date}
        onValueChange={setDate}
        placeholder="Tomorrow or next week"
        parse={parseNaturalDate}
      />
      <div className="px-1 text-sm text-muted-foreground">
        Your post will be published on{" "}
        <span className="font-medium">{formatDate(date)}</span>.
      </div>
    </Field>
  )
}
