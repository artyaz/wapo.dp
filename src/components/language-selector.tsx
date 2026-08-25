"use client"

import * as React from "react"
import { LanguagesIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

/**
 * A language code. The common demo languages get literal completion while
 * arbitrary codes (`"fr"`, `"de"`, …) remain assignable.
 */
export type Language = "en" | "ar" | "he" | (string & {})

/** Per-language direction + string table used by `useTranslation`. */
export interface Translations {
  [language: string]: {
    dir: "ltr" | "rtl"
    values: Record<string, string>
  }
}

export interface LanguageOption {
  label: React.ReactNode
  value: Language
  dir?: "ltr" | "rtl"
}

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en", dir: "ltr" },
  { label: "العربية", value: "ar", dir: "rtl" },
  { label: "עברית", value: "he", dir: "rtl" },
] as const satisfies readonly LanguageOption[]

/**
 * Tiny translation hook powering the RTL demos: pass a translations record
 * and the language to start from.
 *
 * @returns `{ dir, t, language, setLanguage, languages }`
 */
export function useTranslation(
  translations: Translations,
  defaultLanguage: Language = "en"
) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage)

  const entry = translations[language] ?? translations.en

  return {
    dir: entry?.dir ?? "ltr",
    t: entry?.values ?? {},
    language,
    setLanguage,
    languages: Object.keys(translations),
  }
}

/**
 * Small dropdown for switching between languages (EN/AR/HE by default),
 * built on the existing `Select` component. Used by the RTL demos.
 */
function LanguageSelector({
  className,
  language,
  onLanguageChange,
  options = LANGUAGE_OPTIONS,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, "children"> & {
  /** Currently selected language (controlled). */
  language?: Language
  /** Called with the newly selected language. */
  onLanguageChange?: (language: Language) => void
  /** Available options; defaults to English / Arabic / Hebrew. */
  options?: readonly LanguageOption[]
}) {
  return (
    <Select value={language} onValueChange={onLanguageChange}>
      <SelectTrigger
        className={cn("w-fit", className)}
        aria-label="Select language"
        {...props}
      >
        <LanguagesIcon />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { LanguageSelector, LANGUAGE_OPTIONS }
