"use client"

/**
 * Filter Bar / Query Builder — a dedicated interface for constructing complex
 * filtering criteria and sorting rules.
 *
 * Family:
 * - `FilterBar`        — root bar: search input + removable rule chips +
 *                        add-filter popover + clear-all.
 * - `FilterBarSearch`  — the bar's search input (icon + sm control).
 * - `FilterBarChip`    — removable chip showing field · operator · value.
 * - `FilterPopover`    — popover-wrapped rule editor (add or edit a rule).
 * - `FilterRuleEditor` — the standalone field / operator / value form.
 * - `SortBar`          — sort-by field select + asc/desc segmented toggle.
 * - `FilterBarSummary` — live region, e.g. "3 filters · sorted by date desc".
 *
 * Praxis geometry: the in-flow bar is a flat 8px panel (`rounded-lg`, border,
 * no shadow); controls inside keep the 3px small-control radius (`rounded-md`);
 * chips match the Badge family. The popover is a true overlay and may shadow.
 * Values inside chips render in IBM Plex Mono (`font-code`) — they are data.
 */

import * as React from "react"
import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  ListFilterIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

/** Value domain of a filterable field — drives the operator set and value control. */
export type FilterFieldType = "string" | "number" | "date" | "enum" | "options" | "boolean"

/** Comparison operators. Numeric/date comparisons use symbolic labels. */
export type FilterOperator =
  | "is"
  | "isNot"
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "before"
  | "after"
  | "isEmpty"
  | "isNotEmpty"

/** One allowed value of an enum/options/boolean field. */
export interface FilterFieldOption {
  label: string
  value: string
}

/** Field metadata consumed by the rule editor and the chips. */
export interface FilterField {
  /** Stable field id referenced by `FilterRule.field` and `SortRule.field`. */
  value: string
  /** Human label shown in selects and chips. */
  label: string
  type: FilterFieldType
  /** Allowed values for `enum` / `options` / `boolean` fields. */
  options?: readonly FilterFieldOption[]
  /** Overrides the default operator set for the field's type. */
  operators?: readonly FilterOperator[]
  /** Placeholder for the value input. */
  placeholder?: string
}

/** One active filter rule. */
export interface FilterRule {
  id: string
  field: string
  operator: FilterOperator
  /** Raw value; `undefined` for unary operators (`isEmpty`, …). */
  value?: string
}

/** Seed for a new rule (no id yet). */
export interface FilterRuleDraft {
  field?: string
  operator?: FilterOperator
  value?: string
}

export type SortDirection = "asc" | "desc"

/** Sortable field — `FilterField` satisfies this structurally. */
export interface SortField {
  value: string
  label: string
}

/** Active sort rule. */
export interface SortRule {
  field: string
  direction: SortDirection
}

// ----------------------------------------------------------------------------
// Operator metadata
// ----------------------------------------------------------------------------

const OPERATOR_LABELS: Record<FilterOperator, string> = {
  is: "is",
  isNot: "is not",
  contains: "contains",
  notContains: "does not contain",
  startsWith: "starts with",
  endsWith: "ends with",
  gt: ">",
  gte: "≥",
  lt: "<",
  lte: "≤",
  before: "before",
  after: "after",
  isEmpty: "is empty",
  isNotEmpty: "is not empty",
}

const UNARY_OPERATORS: readonly FilterOperator[] = ["isEmpty", "isNotEmpty"]

const DEFAULT_OPERATORS: Record<FilterFieldType, readonly FilterOperator[]> = {
  string: ["is", "isNot", "contains", "notContains", "isEmpty", "isNotEmpty"],
  number: ["is", "isNot", "gt", "gte", "lt", "lte", "isEmpty", "isNotEmpty"],
  date: ["is", "isNot", "before", "after", "isEmpty", "isNotEmpty"],
  enum: ["is", "isNot"],
  options: ["is", "isNot"],
  boolean: ["is"],
}

const BOOLEAN_OPTIONS: readonly FilterFieldOption[] = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
]

function getOperators(field: FilterField): readonly FilterOperator[] {
  return field.operators ?? DEFAULT_OPERATORS[field.type] ?? DEFAULT_OPERATORS.string
}

function isUnaryOperator(operator: FilterOperator): boolean {
  return UNARY_OPERATORS.includes(operator)
}

function getFieldOptions(field: FilterField): readonly FilterFieldOption[] {
  if (field.type === "boolean") return field.options ?? BOOLEAN_OPTIONS
  return field.options ?? []
}

/** Display label for a rule value (resolves enum options to their labels). */
function getValueLabel(
  field: FilterField | undefined,
  value: string | undefined
): string {
  if (value === undefined || value === "") return ""
  const options = field ? getFieldOptions(field) : []
  if (options.length > 0) {
    const match = options.find((option) => option.value === value)
    return match ? match.label : value
  }
  return value
}

/** Human description of a rule — used for chip aria-labels and summaries. */
function describeRule(rule: FilterRule, fields: readonly FilterField[]): string {
  const field = fields.find((f) => f.value === rule.field)
  const fieldLabel = field?.label ?? rule.field
  const operatorLabel = OPERATOR_LABELS[rule.operator] ?? rule.operator
  const valueLabel = getValueLabel(field, rule.value)
  return [fieldLabel, operatorLabel, valueLabel].filter(Boolean).join(" ")
}

// ----------------------------------------------------------------------------
// FilterBarChip
// ----------------------------------------------------------------------------

const filterBarChipVariants = cva(
  // Matches the Badge family: 3px control radius, hairline border, calm
  // color-only transitions. Values are data → IBM Plex Mono.
  "inline-flex w-fit max-w-full items-center gap-1.5 rounded-md border px-2 py-1 text-xs leading-none whitespace-nowrap shrink-0 transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        muted: "border-transparent bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function FilterBarChip({
  className,
  variant,
  field,
  operator,
  value,
  onRemove,
  removeLabel,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof filterBarChipVariants> & {
    /** Field label, e.g. "Amount". */
    field: React.ReactNode
    /** Operator label, e.g. "≥". */
    operator: React.ReactNode
    /** Rule value — rendered in mono. Omit for unary operators. */
    value?: React.ReactNode
    /** When provided the chip renders a remove button. */
    onRemove?: () => void
    /** Accessible label for the remove button. */
    removeLabel?: string
  }) {
  const removeText = removeLabel ?? "Remove filter"

  return (
    <span
      data-slot="filter-bar-chip"
      className={cn(filterBarChipVariants({ variant }), className)}
      {...props}
    >
      <span className="font-medium">{field}</span>
      <span className="text-muted-foreground">{operator}</span>
      {value !== undefined && value !== "" ? (
        <span className="font-code max-w-40 truncate text-[11px]">{value}</span>
      ) : null}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeText}
          onClick={onRemove}
          className="outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 -me-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <XIcon aria-hidden="true" className="size-3" />
        </button>
      ) : null}
      {children}
    </span>
  )
}

// ----------------------------------------------------------------------------
// FilterBarSearch
// ----------------------------------------------------------------------------

function FilterBarSearch({
  className,
  id,
  searchLabel = "Search",
  ...props
}: React.ComponentProps<"input"> & {
  /** Accessible name of the input (also announced by screen readers). */
  searchLabel?: string
}) {
  return (
    <div
      data-slot="filter-bar-search"
      className="relative min-w-0 flex-1 basis-36"
    >
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id={id}
        type="search"
        aria-label={searchLabel}
        className={cn(
          "h-8 ps-8.5 text-sm [&::-webkit-search-cancel-button]:hidden",
          className
        )}
        {...props}
      />
    </div>
  )
}

// ----------------------------------------------------------------------------
// FilterRuleEditor
// ----------------------------------------------------------------------------

function FilterRuleEditor({
  className,
  fields,
  value,
  defaultValue,
  onApply,
  onCancel,
  onRemove,
  applyLabel = "Apply filter",
  cancelLabel = "Cancel",
  removeLabel = "Remove",
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue"> & {
  /** Field definitions (drives operators + value control). */
  fields: readonly FilterField[]
  /** Existing rule to edit (edit mode). */
  value?: FilterRule | null
  /** Seed for a new rule (field / operator / value preselected). */
  defaultValue?: FilterRuleDraft | null
  /** Called with the rule when the editor is submitted. */
  onApply?: (rule: FilterRule) => void
  /** Called when editing is dismissed. */
  onCancel?: () => void
  /** When provided, a destructive “remove” action is rendered (edit mode). */
  onRemove?: () => void
  applyLabel?: string
  cancelLabel?: string
  removeLabel?: string
}) {
  const uid = React.useId()
  const generatedId = React.useId()

  const [fieldId, setFieldId] = React.useState<string>(
    () => value?.field ?? defaultValue?.field ?? fields[0]?.value ?? ""
  )
  const field =
    fields.find((f) => f.value === fieldId) ?? fields[0] ?? undefined
  const operators = field ? getOperators(field) : []

  const [operator, setOperator] = React.useState<FilterOperator>(
    () =>
      value?.operator ??
      defaultValue?.operator ??
      operators[0] ??
      "is"
  )
  const [inputValue, setInputValue] = React.useState<string>(
    () => value?.value ?? defaultValue?.value ?? ""
  )

  const isUnary = isUnaryOperator(operator)
  const options = field ? getFieldOptions(field) : []
  const isSelectValue =
    field !== undefined &&
    (field.type === "enum" || field.type === "options" || field.type === "boolean") &&
    options.length > 0
  const canApply = isUnary || inputValue.trim() !== ""

  const handleFieldChange = (nextFieldId: string) => {
    const nextField = fields.find((f) => f.value === nextFieldId)
    setFieldId(nextFieldId)
    if (nextField) {
      const nextOperators = getOperators(nextField)
      setOperator((prev) =>
        nextOperators.includes(prev) ? prev : (nextOperators[0] ?? "is")
      )
    }
    // A different field is a different value domain — start clean.
    setInputValue("")
  }

  const handleApply = () => {
    if (!field || !canApply) return
    onApply?.({
      id: value?.id ?? generatedId,
      field: field.value,
      operator,
      value: isUnary ? undefined : inputValue,
    })
  }

  const valueControl = isSelectValue ? (
    <Select value={inputValue} onValueChange={setInputValue}>
      <SelectTrigger
        id={`${uid}-value`}
        size="sm"
        className="w-full font-code text-[13px]"
      >
        <SelectValue placeholder={field?.placeholder ?? "Choose value"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <Input
      id={`${uid}-value`}
      type={field?.type === "number" ? "number" : field?.type === "date" ? "date" : "text"}
      inputMode={field?.type === "number" ? "decimal" : undefined}
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      placeholder={
        field?.placeholder ?? `Enter ${field?.label.toLowerCase() ?? "value"}`
      }
      className={cn(
        "h-8 text-sm",
        (field?.type === "number" || field?.type === "date") && "font-code text-[13px]"
      )}
    />
  )

  return (
    <div
      data-slot="filter-rule-editor"
      className={cn("grid gap-3", className)}
      {...props}
    >
      <div className="grid gap-1.5">
        <Label htmlFor={`${uid}-field`} className="text-xs text-muted-foreground">
          Field
        </Label>
        <Select value={fieldId} onValueChange={handleFieldChange}>
          <SelectTrigger id={`${uid}-field`} size="sm" className="w-full">
            <SelectValue placeholder="Choose field" />
          </SelectTrigger>
          <SelectContent>
            {fields.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label
          htmlFor={`${uid}-operator`}
          className="text-xs text-muted-foreground"
        >
          Operator
        </Label>
        <Select
          value={operator}
          onValueChange={(next) => setOperator(next as FilterOperator)}
        >
          <SelectTrigger id={`${uid}-operator`} size="sm" className="w-full">
            <SelectValue placeholder="Choose operator" />
          </SelectTrigger>
          <SelectContent>
            {operators.map((op) => (
              <SelectItem key={op} value={op}>
                {OPERATOR_LABELS[op]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!isUnary ? (
        <div className="grid gap-1.5">
          <Label
            htmlFor={`${uid}-value`}
            className="text-xs text-muted-foreground"
          >
            Value
          </Label>
          {valueControl}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-2">
        {onRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive"
          >
            <XIcon aria-hidden="true" />
            {removeLabel}
          </Button>
        ) : (
          <span aria-hidden="true" />
        )}
        <div className="flex items-center gap-2">
          {onCancel ? (
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              {cancelLabel}
            </Button>
          ) : null}
          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            disabled={!canApply}
          >
            {applyLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// FilterPopover
// ----------------------------------------------------------------------------

function FilterPopover({
  children,
  fields,
  value,
  defaultValue,
  open,
  defaultOpen = false,
  onOpenChange,
  onApply,
  onRemove,
  title,
  description,
  applyLabel,
  cancelLabel,
  removeLabel,
  align = "start",
  sideOffset = 6,
  contentClassName,
}: {
  /** Trigger element (button, chip, …). */
  children: React.ReactElement<Record<string, unknown>>
  fields: readonly FilterField[]
  /** Existing rule to edit; presence switches the popover to edit mode. */
  value?: FilterRule | null
  /** Seed for a new rule (field / operator / value preselected). */
  defaultValue?: FilterRuleDraft | null
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onApply?: (rule: FilterRule) => void
  onRemove?: (rule: FilterRule) => void
  title?: string
  description?: string
  applyLabel?: string
  cancelLabel?: string
  removeLabel?: string
  align?: "start" | "center" | "end"
  sideOffset?: number
  contentClassName?: string
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  const handleOpenChange = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const resolvedTitle = title ?? (value ? "Edit filter" : "Add filter")

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        ref={contentRef}
        tabIndex={-1}
        align={align}
        sideOffset={sideOffset}
        // Non-modal palette: on open, focus the (ring-less) panel instead of
        // the first control — Tab reaches the controls, Escape closes.
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          contentRef.current?.focus()
        }}
        // Overlay elevation: the theme-aware system shadow (same as Select
        // content) separates the panel from the page beneath it.
        className={cn("w-72 shadow-default", contentClassName)}
      >
        <div data-slot="filter-popover" className="grid gap-3">
          <div className="grid gap-1">
            <div
              data-slot="filter-popover-title"
              className="text-sm leading-none font-semibold"
            >
              {resolvedTitle}
            </div>
            {description ? (
              <p
                data-slot="filter-popover-description"
                className="text-xs text-muted-foreground"
              >
                {description}
              </p>
            ) : null}
          </div>
          <FilterRuleEditor
            fields={fields}
            value={value}
            defaultValue={defaultValue}
            onApply={(rule) => {
              onApply?.(rule)
              handleOpenChange(false)
            }}
            onCancel={() => handleOpenChange(false)}
            onRemove={
              onRemove && value
                ? () => {
                    onRemove(value)
                    handleOpenChange(false)
                  }
                : undefined
            }
            applyLabel={applyLabel}
            cancelLabel={cancelLabel}
            removeLabel={removeLabel}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ----------------------------------------------------------------------------
// FilterBar
// ----------------------------------------------------------------------------

function FilterBar({
  className,
  fields,
  rules,
  defaultRules,
  onRulesChange,
  searchValue,
  defaultSearch = "",
  onSearchChange,
  searchPlaceholder = "Search…",
  searchLabel = "Search",
  addLabel = "Filter",
  addTitle,
  addDescription = "Rules combine with AND.",
  clearLabel = "Clear all",
  popoverOpen,
  defaultPopoverOpen = false,
  onPopoverOpenChange,
  defaultRule,
  onAddClick,
  onClear,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Field definitions — drive the editor and the chip labels. */
  fields: readonly FilterField[]
  /** Active rules (controlled). */
  rules?: FilterRule[]
  /** Initial rules (uncontrolled). */
  defaultRules?: FilterRule[]
  onRulesChange?: (rules: FilterRule[]) => void
  /** Search text (controlled). */
  searchValue?: string
  /** Initial search text (uncontrolled). */
  defaultSearch?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  searchLabel?: string
  /** Label of the add-filter trigger button. */
  addLabel?: string
  /** Title inside the add-filter popover. */
  addTitle?: string
  /** Helper text inside the add-filter popover. */
  addDescription?: string
  clearLabel?: string
  /** Controls the add-filter popover (controlled). */
  popoverOpen?: boolean
  /** Opens the add-filter popover on mount (uncontrolled). */
  defaultPopoverOpen?: boolean
  onPopoverOpenChange?: (open: boolean) => void
  /** Seed for the first rule drafted in the popover. */
  defaultRule?: FilterRuleDraft | null
  /**
   * When provided, the add-filter button invokes this handler instead of
   * opening the built-in popover — host `FilterRuleEditor` in your own
   * container (e.g. a mobile bottom sheet). Popover props are then ignored.
   */
  onAddClick?: () => void
  /** Called after all rules are cleared. */
  onClear?: () => void
}) {
  const [internalRules, setInternalRules] = React.useState<FilterRule[]>(
    defaultRules ?? []
  )
  const [internalSearch, setInternalSearch] = React.useState(defaultSearch)

  const effectiveRules = rules ?? internalRules
  const effectiveSearch = searchValue ?? internalSearch

  const commitRules = (next: FilterRule[]) => {
    if (rules === undefined) setInternalRules(next)
    onRulesChange?.(next)
  }

  const handleSearchChange = (next: string) => {
    if (searchValue === undefined) setInternalSearch(next)
    onSearchChange?.(next)
  }

  const handleApply = (rule: FilterRule) => {
    commitRules([...effectiveRules, rule])
  }

  const handleRemove = (id: string) => {
    commitRules(effectiveRules.filter((rule) => rule.id !== id))
  }

  const handleClear = () => {
    commitRules([])
    onClear?.()
  }

  return (
    <div
      data-slot="filter-bar"
      role="group"
      aria-label="Filters"
      // In-flow panel: 8px radius, hairline border, flat — never casts shadow.
      // Two intentional rows (search + actions / criteria chips) instead of one
      // wrapping ragged row, so the bar stays compact on narrow viewports.
      className={cn(
        "flex flex-col gap-1.5 rounded-lg border bg-card p-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <FilterBarSearch
          value={effectiveSearch}
          onChange={(event) => handleSearchChange(event.currentTarget.value)}
          placeholder={searchPlaceholder}
          searchLabel={searchLabel}
        />

        {onAddClick ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddClick}
            aria-haspopup="dialog"
          >
            <ListFilterIcon aria-hidden="true" />
            {addLabel}
          </Button>
        ) : (
          <FilterPopover
            fields={fields}
            open={popoverOpen}
            defaultOpen={defaultPopoverOpen}
            onOpenChange={onPopoverOpenChange}
            onApply={handleApply}
            defaultValue={defaultRule}
            title={addTitle ?? "Add filter"}
            description={addDescription}
          >
            <Button variant="outline" size="sm">
              <ListFilterIcon aria-hidden="true" />
              {addLabel}
            </Button>
          </FilterPopover>
        )}
      </div>

      {effectiveRules.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {effectiveRules.map((rule) => {
            const field = fields.find((f) => f.value === rule.field)
            return (
              <FilterBarChip
                key={rule.id}
                field={field?.label ?? rule.field}
                operator={OPERATOR_LABELS[rule.operator] ?? rule.operator}
                value={
                  isUnaryOperator(rule.operator)
                    ? undefined
                    : getValueLabel(field, rule.value)
                }
                onRemove={() => handleRemove(rule.id)}
                removeLabel={`Remove filter: ${describeRule(rule, fields)}`}
              />
            )
          })}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-muted-foreground"
          >
            {clearLabel}
          </Button>
        </div>
      ) : null}

      {children}
    </div>
  )
}

// ----------------------------------------------------------------------------
// SortBar
// ----------------------------------------------------------------------------

function SortBar({
  className,
  fields,
  value,
  onChange,
  label = "Sort by",
  directionLabel = "Sort direction",
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Sortable fields (`FilterField[]` works directly). */
  fields: readonly SortField[]
  /** Active sort rule. */
  value: SortRule
  onChange: (rule: SortRule) => void
  /** Leading text label. */
  label?: string
  /** Accessible name of the asc/desc segmented control. */
  directionLabel?: string
}) {
  return (
    <div
      data-slot="sort-bar"
      role="group"
      aria-label="Sort rules"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      <span className="text-xs font-medium whitespace-nowrap text-muted-foreground">
        {label}
      </span>
      <Select
        value={value.field}
        onValueChange={(nextField) =>
          onChange({ ...value, field: nextField })
        }
      >
        <SelectTrigger
          size="sm"
          aria-label="Sort field"
          className="min-w-28"
        >
          <SelectValue placeholder="Choose field" />
        </SelectTrigger>
        <SelectContent>
          {fields.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={value.direction}
        onValueChange={(next) => {
          if (next) onChange({ ...value, direction: next as SortDirection })
        }}
        aria-label={directionLabel}
      >
        <ToggleGroupItem value="asc" aria-label="Sort ascending">
          <ArrowUpNarrowWideIcon aria-hidden="true" className="size-3.5" />
          Asc
        </ToggleGroupItem>
        <ToggleGroupItem value="desc" aria-label="Sort descending">
          <ArrowDownWideNarrowIcon aria-hidden="true" className="size-3.5" />
          Desc
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

// ----------------------------------------------------------------------------
// FilterBarSummary
// ----------------------------------------------------------------------------

function FilterBarSummary({
  className,
  filterCount,
  filterNoun = "filter",
  resultCount,
  resultNoun = "result",
  sort,
  ...props
}: React.ComponentProps<"p"> & {
  /** Number of active filter rules. */
  filterCount: number
  /** Noun for filter rules (pluralized automatically). */
  filterNoun?: string
  /** Number of results the current query yields. */
  resultCount?: number
  /** Noun for results (pluralized automatically). */
  resultNoun?: string
  /** Active sort, e.g. `{ label: "date", direction: "desc" }`. */
  sort?: { label: string; direction: SortDirection } | null
}) {
  const parts: string[] = []

  if (filterCount > 0) {
    parts.push(
      `${filterCount} ${filterCount === 1 ? filterNoun : `${filterNoun}s`}`
    )
  } else {
    parts.push(`No ${filterNoun}s`)
  }

  if (resultCount !== undefined) {
    parts.push(
      `${resultCount} ${resultCount === 1 ? resultNoun : `${resultNoun}s`}`
    )
  }

  if (sort) {
    parts.push(
      `sorted by ${sort.label} ${sort.direction === "desc" ? "descending" : "ascending"}`
    )
  }

  return (
    <p
      data-slot="filter-bar-summary"
      role="status"
      aria-live="polite"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    >
      {parts.join(" · ")}
    </p>
  )
}

// ----------------------------------------------------------------------------
// Exports
// ----------------------------------------------------------------------------

export {
  FilterBar,
  FilterBarChip,
  FilterBarSearch,
  FilterPopover,
  FilterRuleEditor,
  SortBar,
  FilterBarSummary,
  filterBarChipVariants,
}
