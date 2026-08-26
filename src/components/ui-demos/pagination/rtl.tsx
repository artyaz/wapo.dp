"use client"


import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      previous: "Previous",
      next: "Next",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      previous: "السابق",
      next: "التالي",
    },
  },
  he: {
    dir: "rtl",
    values: {
      previous: "הקודם",
      next: "הבא",
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

export function PaginationRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <Pagination dir={dir}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label={t.previous}
            className="gap-1 px-2.5 sm:pl-2.5"
          >
            <ChevronLeftIcon />
            <span className="hidden sm:block">{t.previous}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{formatNumber(1)}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {formatNumber(2)}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{formatNumber(3)}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label={t.next}
            className="gap-1 px-2.5 sm:pr-2.5"
          >
            <span className="hidden sm:block">{t.next}</span>
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
