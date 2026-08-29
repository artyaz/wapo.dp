"use client"

import * as React from "react"
import { format as formatDate, isSameDay, type Locale as DateFnsLocale } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  type DateRange,
  type Locale as DayPickerLocale,
  type Matcher,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A quick-select preset for `mode="single"` pickers. */
export interface DatePickerPreset {
  label: string
  date: Date
}

/** A quick-select preset for `mode="range"` pickers. */
export interface DatePickerRangePreset {
  label: string
  range: DateRange
}

interface DatePickerSharedProps {
  id?: string
  /** Disables the trigger. */
  disabled?: boolean
  /** Label shown when nothing is selected. */
  placeholder?: string
  /** date-fns format string used to render the selected value(s). */
  format?: string
  /** date-fns locale used when formatting the trigger label. */
  formatLocale?: DateFnsLocale
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  buttonClassName?: string
  /** className applied to the popover content panel. */
  className?: string
  contentAlign?: "start" | "center" | "end"
  contentSide?: "top" | "right" | "bottom" | "left"
  contentAlignOffset?: number
  contentSideOffset?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * Close the popover after a selection. Defaults to `true` in single mode
   * and `false` in range/multiple modes.
   */
  closeOnSelect?: boolean

  // --- Calendar passthrough props
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  numberOfMonths?: number
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  dir?: "ltr" | "rtl"
  /** react-day-picker locale forwarded to the calendar. */
  locale?: DayPickerLocale
  /** Date matchers forwarded to the calendar's `disabled` prop. */
  disabledDates?: Matcher
  showOutsideDays?: boolean
  fixedWeeks?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  fromYear?: number
  toYear?: number
}

export interface DatePickerSingleProps extends DatePickerSharedProps {
  mode?: "single"
  value?: Date
  onValueChange?: (value: Date | undefined) => void
  presets?: DatePickerPreset[]
}

export interface DatePickerRangeProps extends DatePickerSharedProps {
  mode: "range"
  value?: DateRange
  onValueChange?: (value: DateRange | undefined) => void
  presets?: DatePickerRangePreset[]
}

export interface DatePickerMultipleProps extends DatePickerSharedProps {
  mode: "multiple"
  value?: Date[]
  onValueChange?: (value: Date[] | undefined) => void
  min?: number
  max?: number
}

export type DatePickerProps =
  | DatePickerSingleProps
  | DatePickerRangeProps
  | DatePickerMultipleProps

// ---------------------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------------------

/**
 * In dark theme the bridged `--accent` / `--secondary` tokens resolve to
 * neutral-100, which is the *same* value as the popover panel — range fills,
 * the today marker and preset chips would vanish on the overlay. Re-map them
 * to a visible step of the neutral ramp *inside the popover only*; in-flow
 * surfaces keep the global tokens.
 */
const popoverSurface =
  "dark:[--accent:var(--ds-color-neutral-300)] dark:[--secondary:var(--ds-color-neutral-200)]"

export function DatePicker(props: DatePickerProps) {
  const {
    id,
    disabled,
    placeholder = "Pick a date",
    format: formatString,
    formatLocale,
    buttonVariant = "outline",
    buttonClassName,
    className,
    contentAlign = "start",
    contentSide,
    contentAlignOffset,
    contentSideOffset,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    closeOnSelect: closeOnSelectProp,
    captionLayout,
    numberOfMonths,
    defaultMonth,
    month,
    onMonthChange,
    dir,
    locale,
    disabledDates,
    showOutsideDays,
    fixedWeeks,
    weekStartsOn,
    fromYear,
    toYear,
  } = props

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp ?? internalOpen
  const handleOpenChange = (next: boolean) => {
    if (openProp === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const mode = props.mode ?? "single"
  const closeOnSelect = closeOnSelectProp ?? mode === "single"

  const calendarProps = {
    captionLayout,
    numberOfMonths,
    month,
    onMonthChange,
    dir,
    locale,
    disabled: disabledDates,
    showOutsideDays,
    fixedWeeks,
    weekStartsOn,
    fromYear,
    toYear,
  }

  let label: React.ReactNode
  let hasValue = false
  let initialMonth: Date | undefined
  let calendar: React.ReactNode
  let presets: React.ReactNode = null

  if (props.mode === "range") {
    const { value, onValueChange, presets: rangePresets } = props
    const fmt = formatString ?? "LLL dd, y"
    hasValue = Boolean(value?.from)
    initialMonth = month ?? defaultMonth ?? value?.from

    label = value?.from ? (
      value.to ? (
        <>
          {formatDate(value.from, fmt, { locale: formatLocale })} -{" "}
          {formatDate(value.to, fmt, { locale: formatLocale })}
        </>
      ) : (
        formatDate(value.from, fmt, { locale: formatLocale })
      )
    ) : (
      <span>{placeholder}</span>
    )

    presets = rangePresets?.length ? (
      <div
        data-slot="date-picker-presets"
        className="flex flex-wrap gap-2 border-b p-3"
      >
        {rangePresets.map((preset) => {
          const active =
            value?.from !== undefined &&
            preset.range.from !== undefined &&
            isSameDay(value.from, preset.range.from) &&
            ((value.to === undefined && preset.range.to === undefined) ||
              (value.to !== undefined &&
                preset.range.to !== undefined &&
                isSameDay(value.to, preset.range.to)))
          return (
            <Button
              key={preset.label}
              variant={active ? "secondary" : "ghost"}
              size="sm"
              className="h-7"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => {
                onValueChange?.(preset.range)
                if (closeOnSelect) handleOpenChange(false)
              }}
            >
              {preset.label}
            </Button>
          )
        })}
      </div>
    ) : null

    calendar = (
      <Calendar
        mode="range"
        selected={value}
        onSelect={(range) => {
          onValueChange?.(range)
          if (closeOnSelect) handleOpenChange(false)
        }}
        defaultMonth={defaultMonth ?? initialMonth}
        {...calendarProps}
      />
    )
  } else if (props.mode === "multiple") {
    const { value, onValueChange, min, max } = props
    const fmt = formatString ?? "PPP"
    hasValue = (value?.length ?? 0) > 0
    initialMonth = month ?? defaultMonth ?? value?.[0]

    label = value?.length
      ? value.length === 1
        ? formatDate(value[0], fmt, { locale: formatLocale })
        : `${value.length} dates selected`
      : (
          <span>{placeholder}</span>
        )

    calendar = (
      <Calendar
        mode="multiple"
        selected={value}
        min={min}
        max={max}
        onSelect={(dates) => {
          onValueChange?.(dates)
          if (closeOnSelect) handleOpenChange(false)
        }}
        defaultMonth={defaultMonth ?? initialMonth}
        {...calendarProps}
      />
    )
  } else {
    const { value, onValueChange, presets: datePresets } = props
    const fmt = formatString ?? "PPP"
    hasValue = value !== undefined
    initialMonth = month ?? defaultMonth ?? value

    label = value ? (
      formatDate(value, fmt, { locale: formatLocale })
    ) : (
      <span>{placeholder}</span>
    )

    presets = datePresets?.length ? (
      <div
        data-slot="date-picker-presets"
        className="flex flex-wrap gap-2 border-b p-3"
      >
        {datePresets.map((preset) => {
          const active = value !== undefined && isSameDay(value, preset.date)
          return (
            <Button
              key={preset.label}
              variant={active ? "secondary" : "ghost"}
              size="sm"
              className="h-7"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => {
                onValueChange?.(preset.date)
                if (closeOnSelect) handleOpenChange(false)
              }}
            >
              {preset.label}
            </Button>
          )
        })}
      </div>
    ) : null

    calendar = (
      <Calendar
        mode="single"
        selected={value}
        onSelect={(date) => {
          onValueChange?.(date)
          if (closeOnSelect) handleOpenChange(false)
        }}
        defaultMonth={defaultMonth ?? initialMonth}
        {...calendarProps}
      />
    )
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            id={id}
            variant={buttonVariant}
            disabled={disabled}
            dir={dir}
            data-empty={!hasValue}
            className={cn(
              "justify-start font-normal data-[empty=true]:text-muted-foreground",
              buttonClassName
            )}
          />
        }
      >
        <CalendarIcon />
        {label}
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-auto p-0", popoverSurface, className)}
        align={contentAlign}
        side={contentSide}
        alignOffset={contentAlignOffset}
        sideOffset={contentSideOffset}
        dir={dir}
      >
        {presets}
        {calendar}
      </PopoverContent>
    </Popover>
  )
}

// ---------------------------------------------------------------------------
// DatePickerInput
// ---------------------------------------------------------------------------

function defaultFormatDate(date: Date | undefined, formatString: string) {
  if (!date) {
    return ""
  }
  return formatDate(date, formatString)
}

function defaultParseDate(input: string) {
  const trimmed = input.trim()
  if (!trimmed) {
    return undefined
  }
  const date = new Date(trimmed)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export interface DatePickerInputProps {
  id?: string
  value?: Date
  onValueChange?: (value: Date | undefined) => void
  placeholder?: string
  /** date-fns format string used to render the selected date. */
  format?: string
  /** date-fns locale used when formatting the input value. */
  formatLocale?: DateFnsLocale
  /** Parses typed input into a date. Return `undefined` for invalid input. */
  parse?: (input: string) => Date | undefined
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  dir?: "ltr" | "rtl"
  /** react-day-picker locale forwarded to the calendar. */
  locale?: DayPickerLocale
  className?: string
  /** Accessible label for the calendar trigger button. */
  buttonAriaLabel?: string
}

export function DatePickerInput({
  id,
  value,
  onValueChange,
  placeholder = "Pick a date",
  format: formatString = "MMMM dd, yyyy",
  formatLocale,
  parse = defaultParseDate,
  disabled,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  captionLayout,
  defaultMonth,
  month,
  onMonthChange,
  dir,
  locale,
  className,
  buttonAriaLabel = "Select date",
}: DatePickerInputProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp ?? internalOpen
  const handleOpenChange = (next: boolean) => {
    if (openProp === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  // Draft holds the text while the user is typing; when null the input shows
  // the formatted `value` instead.
  const [draft, setDraft] = React.useState<string | null>(null)
  const displayValue = draft ?? defaultFormatDate(value, formatString)

  const selectDate = (date: Date | undefined) => {
    onValueChange?.(date)
    setDraft(null)
    handleOpenChange(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <InputGroup
        data-slot="date-picker-input"
        dir={dir}
        className={className}
      >
        <InputGroupInput
          id={id}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => {
            setDraft(event.target.value)
            const parsed = parse(event.target.value)
            // Only commit valid dates (or a cleared input) while typing.
            if (parsed !== undefined || event.target.value.trim() === "") {
              onValueChange?.(parsed)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              handleOpenChange(true)
            }
          }}
          onBlur={() => setDraft(null)}
        />
        <InputGroupAddon align="inline-end">
          <PopoverTrigger
            render={
              <InputGroupButton
                id={id ? `${id}-trigger` : undefined}
                variant="ghost"
                size="icon-xs"
                aria-label={buttonAriaLabel}
                disabled={disabled}
              >
                <CalendarIcon />
                <span className="sr-only">{buttonAriaLabel}</span>
              </InputGroupButton>
            }
          />
          <PopoverContent
            className={cn(
              "w-auto overflow-hidden p-0",
              popoverSurface,
              className
            )}
            align="end"
            alignOffset={-8}
            sideOffset={10}
            dir={dir}
          >
            <Calendar
              mode="single"
              selected={value}
              month={month}
              onMonthChange={onMonthChange}
              defaultMonth={defaultMonth ?? value}
              captionLayout={captionLayout}
              locale={locale}
              dir={dir}
              onSelect={(date) => selectDate(date)}
            />
          </PopoverContent>
        </InputGroupAddon>
      </InputGroup>
    </Popover>
  )
}
