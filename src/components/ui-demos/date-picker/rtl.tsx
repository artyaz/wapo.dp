"use client"

import * as React from "react"
import { arSA, enUS, he } from "date-fns/locale"
import {
  arSA as arSADayPicker,
  enUS as enUSDayPicker,
  he as heDayPicker,
} from "react-day-picker/locale"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"

type Language = "en" | "ar" | "he"

const languages: Record<
  Language,
  {
    label: string
    dir: "ltr" | "rtl"
    placeholder: string
    formatLocale: typeof enUS
    dayPickerLocale: typeof enUSDayPicker
  }
> = {
  en: {
    label: "English",
    dir: "ltr",
    placeholder: "Pick a date",
    formatLocale: enUS,
    dayPickerLocale: enUSDayPicker,
  },
  ar: {
    label: "العربية",
    dir: "rtl",
    placeholder: "اختر تاريخًا",
    formatLocale: arSA,
    dayPickerLocale: arSADayPicker,
  },
  he: {
    label: "עברית",
    dir: "rtl",
    placeholder: "בחר תאריך",
    formatLocale: he,
    dayPickerLocale: heDayPicker,
  },
}

export function DatePickerRtl() {
  const [language, setLanguage] = React.useState<Language>("ar")
  const [date, setDate] = React.useState<Date>()
  const { dir, placeholder, formatLocale, dayPickerLocale } =
    languages[language]

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-rtl">Date Picker</FieldLabel>
      <DatePicker
        id="date-picker-rtl"
        dir={dir}
        locale={dayPickerLocale}
        formatLocale={formatLocale}
        placeholder={placeholder}
        value={date}
        onValueChange={setDate}
        buttonClassName="w-full"
      />
      <div className="flex items-center justify-center gap-2 pt-2">
        {(Object.keys(languages) as Language[]).map((key) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            aria-pressed={language === key}
            onClick={() => setLanguage(key)}
          >
            {languages[key].label}
          </Button>
        ))}
      </div>
    </Field>
  )
}
