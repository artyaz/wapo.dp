"use client"

import * as React from "react"
import { AlertCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ----------------------------------------------------------------------------
// Field context
// ----------------------------------------------------------------------------

/**
 * State shared by everything rendered inside a `<Field>`.
 *
 * `Field` generates the ids used by `FieldDescription` and `FieldError`,
 * composes them into the `aria-describedby` value the field control should
 * reference, and tracks the invalid state (the `invalid` / `data-invalid`
 * props, or simply the presence of a `FieldError`).
 */
interface FieldContextValue {
  /** Id rendered on the `FieldDescription` element. */
  descriptionId: string
  /** Id rendered on the `FieldError` element. */
  errorId: string
  /** Space separated id list for `aria-describedby` on the field control. */
  ariaDescribedBy: string | undefined
  /** Whether the field is invalid — controls should mirror it as `aria-invalid`. */
  invalid: boolean
  /** Registers a mounted `FieldDescription` so it joins `aria-describedby`. */
  setDescriptionPresent: (present: boolean) => void
  /** Registers a mounted `FieldError` so it joins `aria-describedby`. */
  setErrorPresent: (present: boolean) => void
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

/**
 * Reads the enclosing `<Field>` state. Returns `null` outside of a field so
 * the helpers (`FieldDescription`, …) also work standalone inside
 * `FieldSet` / `FieldGroup`. Controls can wire themselves up with:
 *
 * ```tsx
 * const field = useField()
 * <input
 *   aria-describedby={field?.ariaDescribedBy}
 *   aria-invalid={field?.invalid || undefined}
 * />
 * ```
 */
function useField(): FieldContextValue | null {
  return React.useContext(FieldContext)
}

// ----------------------------------------------------------------------------
// Field
// ----------------------------------------------------------------------------

type FieldOrientation = "vertical" | "horizontal" | "responsive"

const FIELD_ORIENTATION_CLASSES: Record<FieldOrientation, string> = {
  vertical: "flex-col",
  horizontal: "flex-row items-center",
  responsive: "flex-col md:flex-row md:items-center md:gap-4",
}

interface FieldProps extends React.ComponentProps<"div"> {
  /** Layout of label, control and helper content. @default "vertical" */
  orientation?: FieldOrientation
  /** Marks the field invalid — sets `data-invalid` on the wrapper. */
  invalid?: boolean
  /** Demos mark invalid fields with a bare `data-invalid` — read as state too. */
  "data-invalid"?: boolean | "true" | "false" | ""
}

function Field({
  className,
  orientation = "vertical",
  invalid: invalidProp,
  ...props
}: FieldProps) {
  const id = React.useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const [descriptionPresent, setDescriptionPresent] = React.useState(false)
  const [errorPresent, setErrorPresent] = React.useState(false)

  const invalid =
    Boolean(invalidProp) ||
    errorPresent ||
    (props["data-invalid"] != null && props["data-invalid"] !== false)

  const ariaDescribedBy =
    [
      descriptionPresent ? descriptionId : null,
      errorPresent ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  const context = React.useMemo<FieldContextValue>(
    () => ({
      descriptionId,
      errorId,
      ariaDescribedBy,
      invalid,
      setDescriptionPresent,
      setErrorPresent,
    }),
    [
      descriptionId,
      errorId,
      ariaDescribedBy,
      invalid,
      setDescriptionPresent,
      setErrorPresent,
    ]
  )

  return (
    <FieldContext.Provider value={context}>
      <div
        {...props}
        data-slot="field"
        data-invalid={invalid || undefined}
        className={cn(
          "group/field flex w-full gap-2",
          FIELD_ORIENTATION_CLASSES[orientation],
          className
        )}
      />
    </FieldContext.Provider>
  )
}

// ----------------------------------------------------------------------------
// Field parts
// ----------------------------------------------------------------------------

function FieldLabel({
  className,
  // `defaultChecked` is passed to FieldLabel in some generated demos. Labels
  // are not inputs, so it is accepted and dropped instead of hitting the DOM.
  defaultChecked: _defaultChecked,
  ...props
}: React.ComponentProps<"label">) {
  const field = useField()

  return (
    <label
      data-slot="field-label"
      data-error={field?.invalid || undefined}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        "data-[error=true]:text-destructive",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const field = useField()
  const fallbackId = React.useId()

  React.useEffect(() => {
    if (!field) {
      return
    }
    field.setDescriptionPresent(true)
    return () => field.setDescriptionPresent(false)
  }, [field])

  return (
    <p
      {...props}
      data-slot="field-description"
      id={props.id ?? (field ? field.descriptionId : fallbackId)}
      className={cn("text-muted-foreground text-sm", className)}
    />
  )
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const field = useField()
  const fallbackId = React.useId()

  React.useEffect(() => {
    if (!field) {
      return
    }
    field.setErrorPresent(true)
    return () => field.setErrorPresent(false)
  }, [field])

  return (
    <p
      {...props}
      data-slot="field-error"
      id={props.id ?? (field ? field.errorId : fallbackId)}
      className={cn(
        "text-destructive flex items-start gap-2 text-sm",
        className
      )}
    >
      <AlertCircleIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  )
}

function FieldSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      className={cn("bg-border h-px w-full", className)}
      {...props}
    />
  )
}

// ----------------------------------------------------------------------------
// Field groups
// ----------------------------------------------------------------------------

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "grid w-full gap-4 data-[slot=checkbox-group]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("grid w-full gap-4 rounded-md border p-4", className)}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"legend"> & {
  /**
   * "default" renders a small section heading, "label" renders the legend
   * with the same weight as a `FieldLabel`.
   * @default "default"
   */
  variant?: "default" | "label"
}) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "text-foreground text-sm leading-none font-semibold select-none",
        variant === "label" && "font-medium",
        className
      )}
      {...props}
    />
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  useField,
  type FieldContextValue,
  type FieldOrientation,
}
