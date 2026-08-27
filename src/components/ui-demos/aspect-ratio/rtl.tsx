"use client"


import * as React from "react"
import Image from "next/image"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      caption: "Beautiful landscape",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      caption: "منظر طبيعي جميل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      caption: "נוף יפה",
    },
  },
}

export function AspectRatioRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    // Correct pattern: the <figure> is the width-constrained parent — the
    // ratio box fills it, so only surface classes go on <AspectRatio>.
    <figure className="w-full max-w-sm" dir={dir}>
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
        <Image
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          fill
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        {t.caption}
      </figcaption>
    </figure>
  )
}
