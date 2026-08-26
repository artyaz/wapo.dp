"use client"


import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Progress } from "@/components/ui/progress"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Upload progress",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "تقدم الرفع",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "התקדמות העלאה",
    },
  },
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

export function ProgressRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <div dir={dir} className="w-full max-w-sm">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>{t.label}</span>
        <span className="ms-auto text-muted-foreground">
          {formatNumber(56)}%
        </span>
      </div>
      <Progress value={56} className="w-full" />
    </div>
  )
}
