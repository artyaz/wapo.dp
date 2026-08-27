"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Responsive media box that locks its content to a fixed `ratio` (e.g. 16 / 9).
 *
 * API notes — how sizing works (read before adding width/spacing classes):
 *
 * - The ratio box is exactly as wide as its PARENT: Radix renders an outer
 *   wrapper (`width: 100%` + `padding-bottom: 100 / ratio %`). The box has no
 *   width of its own, so constrain the width on a PARENT element.
 * - `className` and `style` are forwarded to the INNER absolutely-positioned
 *   layer (Radix behaviour), not to the ratio box. Width utilities
 *   (`w-*`, `max-w-*`) and margins (`m*-*`, `space-*`) passed here do NOT size
 *   or space the component — they only stretch or shift the inner layer and
 *   silently break the ratio (e.g. `w-11` + `ratio={9 / 16}` renders a
 *   44 x 636 px sliver instead of a 44 x 78 px portrait).
 * - `className` IS the right place for surface styling of the media layer:
 *   rounding, borders, `overflow-hidden`, backgrounds, shadows.
 *
 * Correct pattern — width and margins go on a wrapper, ratio on the component:
 *
 *     <div className="w-11 shrink-0"> // width + margins + flex sizing here
 *       <AspectRatio ratio={9 / 16} className="overflow-hidden rounded-md">
 *         <Image fill className="object-cover" ... />
 *       </AspectRatio>
 *     </div>
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
