"use client"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioSquare() {
  return (
    // Constrain the WIDTH on a parent: width utilities passed to
    // <AspectRatio> land on the inner absolutely-positioned layer and
    // silently break the ratio (192px wide but full-column tall).
    // Surface styling (rounding, background) stays on the component.
    <div className="w-full max-w-[12rem]">
      <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted">
        <Image
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          fill
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  )
}
