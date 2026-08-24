import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Drop-in replacement for @subframe/core's createTwClassNames.
 *
 * The Subframe export calls `SubframeUtils.twClassNames(...)` with a list of
 * class strings and conditional objects — identical semantics to clsx — but it
 * also understands that the design system's text-style utilities
 * (text-body, text-caption, text-heading-1 …) form a font-size conflict group
 * and must NOT be treated as text colors when merged.
 *
 * tailwind-merge's default config only knows Tailwind's built-in scale, so
 * `text-caption` + `text-neutral-500` would collide (both parsed into the
 * text-color group, last one wins — the size silently drops). We teach the
 * merger the custom class groups explicitly.
 */

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "body",
            "body-medium",
            "caption",
            "heading-1",
            "heading-2",
            "heading-3",
            "prose",
            "default",
            "code",
          ],
        },
      ],
      "font-family": [
        {
          font: [
            "body",
            "body-medium",
            "caption",
            "heading-1",
            "heading-2",
            "heading-3",
            "prose",
            "default",
            "code",
          ],
        },
      ],
    },
  },
});

export function twClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
