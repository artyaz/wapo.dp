import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * NativeSelect — a styled native `<select>` element that visually matches
 * the Input component, with a chevron icon overlaid on the inline-end side.
 *
 * A `dir` prop is lifted onto the positioning wrapper so both the select and
 * the chevron flip correctly in RTL contexts (all spacing is logical:
 * `ps-3` / `pe-8` / `end-3`).
 */
function NativeSelect({
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div dir={dir} className="relative">
      <select
        data-slot="native-select"
        className={cn(
          // Praxis: calm transitions — color only (150ms default), never
          // shadows; the focus-visible ring appears instantly for better a11y
          // feedback. shadow-xs is the control micro-elevation shared with the
          // Input / Button family; rounded-md resolves to the 3px
          // small-control token (--ds-radius-md).
          "border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full appearance-none rounded-md border bg-transparent py-2 ps-3 pe-8 text-sm shadow-xs transition-colors outline-none",
          // Native selects hard-clip overflowing values; force ellipsis so long
          // labels truncate cleanly instead of running under the chevron.
          "truncate",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2" />
    </div>
  )
}

/** NativeSelectOption — passthrough `<option>` with a data-slot hook. */
function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

/** NativeSelectOptGroup — passthrough `<optgroup>` with a data-slot hook. */
function NativeSelectOptGroup(props: React.ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" {...props} />
}

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup }
