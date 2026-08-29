"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RenderSlot } from "@/lib/render-compat"
import { cn } from "@/lib/utils"

/**
 * Multi-step questionnaire primitives.
 *
 * `<Questionnaire>` renders the `<form>` and owns the step state machine:
 * exactly one `<QuestionnaireItem>` is visible at a time. Inactive items stay
 * mounted (hidden via the `hidden` attribute — Tailwind's preflight enforces
 * `display: none !important`) so their inputs keep contributing to `FormData`.
 * "Next" validates the required check for the current item, "Previous" walks
 * back, "Skip" bypasses an optional item, and "Submit" runs the required check
 * across every enabled item before firing `onSubmit`.
 */

type QuestionnaireShortcutMode = "letters" | "numbers"

export type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped"

const DEFAULT_REQUIRED_MESSAGE = "An answer is required."

/** One entry of the `items` config array (extra fields are allowed). */
export interface QuestionnaireItemConfig {
  name: string
  required?: boolean
  disabled?: boolean
  [key: string]: unknown
}

interface RegisteredQuestionnaireItem {
  name: string
  required?: boolean
  disabled?: boolean
  hasAnswer(): boolean
  focusFirstControl(): void
}

interface QuestionnaireContextValue {
  items: readonly QuestionnaireItemConfig[]
  activeItem: string
  activeStatus: QuestionnaireItemStatus
  activeRequired: boolean
  isFirst: boolean
  isLast: boolean
  /** 1-based position of the active item among the enabled items. */
  current: number
  /** Number of enabled items. */
  total: number
  shortcuts?: QuestionnaireShortcutMode
  resetCount: number
  getStatus(name: string): QuestionnaireItemStatus
  getError(name: string): string | undefined
  setStatus(name: string, status: QuestionnaireItemStatus): void
  setError(name: string, message?: string): void
  clearError(name: string): void
  registerItem(entry: RegisteredQuestionnaireItem): () => void
  next(): void
  previous(): void
  skip(): void
}

interface QuestionnaireItemContextValue {
  name: string
  multiple: boolean
  required: boolean
  disabled: boolean
  invalid: boolean
  error: string | undefined
  /** Called after any field inside the item changed (status sync + error clear). */
  onFieldChange(): void
}

interface QuestionnaireChoicesContextValue {
  /** Re-read the checked state from the DOM (after programmatic changes). */
  syncFromDom(): void
}

const QuestionnaireContext =
  React.createContext<QuestionnaireContextValue | null>(null)
const QuestionnaireItemContext =
  React.createContext<QuestionnaireItemContextValue | null>(null)
const QuestionnaireChoicesContext =
  React.createContext<QuestionnaireChoicesContextValue | null>(null)

function useQuestionnaireContext(consumer: string): QuestionnaireContextValue {
  const context = React.useContext(QuestionnaireContext)
  if (!context) {
    throw new Error(
      `\`${consumer}\` must be used within a \`<Questionnaire>\` component.`
    )
  }
  return context
}

function useQuestionnaireItemContext(
  consumer: string
): QuestionnaireItemContextValue {
  const context = React.useContext(QuestionnaireItemContext)
  if (!context) {
    throw new Error(
      `\`${consumer}\` must be used within a \`<QuestionnaireItem>\` component.`
    )
  }
  return context
}

/* -------------------------------------------------------------------------- */
/* helpers                                                                    */
/* -------------------------------------------------------------------------- */

function computeAnsweredFromDom(
  container: HTMLElement | null
): QuestionnaireItemStatus {
  if (!container) return "unanswered"
  const controls = container.querySelectorAll("input, textarea, select")
  for (const control of controls) {
    if (control instanceof HTMLInputElement) {
      if (control.type === "radio" || control.type === "checkbox") {
        if (control.checked) return "answered"
      } else if (control.value.trim() !== "") {
        return "answered"
      }
    } else if (
      control instanceof HTMLTextAreaElement ||
      control instanceof HTMLSelectElement
    ) {
      if (control.value.trim() !== "") return "answered"
    }
  }
  return "unanswered"
}

function resolveInitialItem(
  items: readonly QuestionnaireItemConfig[],
  defaultItem?: string
): string {
  if (defaultItem && items.some((item) => item.name === defaultItem)) {
    return defaultItem
  }
  return (
    items.find((item) => !item.disabled)?.name ?? items[0]?.name ?? ""
  )
}

function getInitiallyCheckedValues(children: React.ReactNode): string[] {
  const values: string[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === QuestionnaireChoice) {
      const choiceProps = child.props as {
        value?: string
        checked?: boolean
        defaultChecked?: boolean
      }
      if (
        typeof choiceProps.value === "string" &&
        (choiceProps.checked === true || choiceProps.defaultChecked === true)
      ) {
        values.push(choiceProps.value)
      }
    }
  })
  return values
}

/* -------------------------------------------------------------------------- */
/* Questionnaire (root)                                                       */
/* -------------------------------------------------------------------------- */

export interface QuestionnaireProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "onReset"> {
  /** Step definitions — drives the order, progress and validation model. */
  items: readonly QuestionnaireItemConfig[]
  /** Name of the item to start on (uncontrolled). */
  defaultItem?: string
  /** Controlled active item name. */
  item?: string
  onItemChange?: (item: string) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void
  /** Keyboard shortcuts for selecting choices: a–z or 1–9. */
  shortcuts?: QuestionnaireShortcutMode
}

function Questionnaire({
  className,
  items,
  defaultItem,
  item: itemProp,
  onItemChange,
  onSubmit,
  onReset,
  shortcuts,
  onKeyDown,
  children,
  ...props
}: QuestionnaireProps) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [internalItem, setInternalItem] = React.useState(() =>
    resolveInitialItem(items, defaultItem)
  )
  const activeItem = itemProp ?? internalItem
  const [statuses, setStatuses] = React.useState<
    Record<string, QuestionnaireItemStatus>
  >({})
  const [errors, setErrors] = React.useState<
    Record<string, string | undefined>
  >({})
  const [resetCount, setResetCount] = React.useState(0)
  const registeredItemsRef = React.useRef(
    new Map<string, RegisteredQuestionnaireItem>()
  )

  const getStatus = React.useCallback(
    (name: string) => statuses[name] ?? "unanswered",
    [statuses]
  )
  const getError = React.useCallback(
    (name: string) => errors[name],
    [errors]
  )
  const setStatus = React.useCallback(
    (name: string, status: QuestionnaireItemStatus) => {
      setStatuses((currentStatuses) =>
        currentStatuses[name] === status
          ? currentStatuses
          : { ...currentStatuses, [name]: status }
      )
    },
    []
  )
  const setError = React.useCallback(
    (name: string, message: string = DEFAULT_REQUIRED_MESSAGE) => {
      setErrors((currentErrors) =>
        currentErrors[name] === message
          ? currentErrors
          : { ...currentErrors, [name]: message }
      )
    },
    []
  )
  const clearError = React.useCallback((name: string) => {
    setErrors((currentErrors) =>
      currentErrors[name] === undefined
        ? currentErrors
        : { ...currentErrors, [name]: undefined }
    )
  }, [])
  const registerItem = React.useCallback(
    (entry: RegisteredQuestionnaireItem) => {
      registeredItemsRef.current.set(entry.name, entry)
      return () => {
        registeredItemsRef.current.delete(entry.name)
      }
    },
    []
  )

  const getItemInfo = React.useCallback(
    (name: string) => {
      const registered = registeredItemsRef.current.get(name)
      const config = items.find((item) => item.name === name)
      return {
        required: config?.required ?? registered?.required ?? false,
        disabled: config?.disabled ?? registered?.disabled ?? false,
        hasAnswer: registered?.hasAnswer,
        focusFirstControl: registered?.focusFirstControl,
      }
    },
    [items]
  )

  const nextEnabledItemName = React.useCallback(
    (afterName: string): string | null => {
      const startIndex = items.findIndex((item) => item.name === afterName)
      for (let index = startIndex + 1; index < items.length; index += 1) {
        const candidate = items[index]
        if (!getItemInfo(candidate.name).disabled) return candidate.name
      }
      return null
    },
    [items, getItemInfo]
  )

  const previousEnabledItemName = React.useCallback(
    (beforeName: string): string | null => {
      const startIndex = items.findIndex((item) => item.name === beforeName)
      if (startIndex === -1) return null
      for (let index = startIndex - 1; index >= 0; index -= 1) {
        const candidate = items[index]
        if (!getItemInfo(candidate.name).disabled) return candidate.name
      }
      return null
    },
    [items, getItemInfo]
  )

  function goToItem(nextItemName: string) {
    setInternalItem(nextItemName)
    onItemChange?.(nextItemName)
  }

  function validateItem(name: string): boolean {
    const info = getItemInfo(name)
    if (info.required && info.hasAnswer && !info.hasAnswer()) {
      setError(name)
      info.focusFirstControl?.()
      return false
    }
    clearError(name)
    return true
  }

  function handleNext() {
    if (!validateItem(activeItem)) return
    const nextItemName = nextEnabledItemName(activeItem)
    if (nextItemName) goToItem(nextItemName)
  }

  function handlePrevious() {
    const previousItemName = previousEnabledItemName(activeItem)
    if (previousItemName) goToItem(previousItemName)
  }

  function handleSkip() {
    if (getItemInfo(activeItem).required) return
    setStatus(activeItem, "skipped")
    clearError(activeItem)
    const nextItemName = nextEnabledItemName(activeItem)
    if (nextItemName) goToItem(nextItemName)
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Required check across every enabled item — submitting early behaves
    // like a failed "Next": the first unanswered item is revealed with its
    // error message instead of firing `onSubmit` with incomplete data.
    const missing: string[] = []
    for (const entry of items) {
      const info = getItemInfo(entry.name)
      if (info.disabled) continue
      if (info.required && info.hasAnswer && !info.hasAnswer()) {
        missing.push(entry.name)
      }
    }
    if (missing.length > 0) {
      for (const name of missing) setError(name)
      const target = missing.includes(activeItem) ? activeItem : missing[0]
      if (target !== activeItem) goToItem(target)
      getItemInfo(target).focusFirstControl?.()
      return
    }
    onSubmit?.(event)
  }

  function handleFormReset(event: React.FormEvent<HTMLFormElement>) {
    onReset?.(event)
    if (event.defaultPrevented) return
    setErrors({})
    // The browser applies the default reset action *after* the reset event
    // dispatch, so re-read the restored values on the next tick.
    setTimeout(() => setResetCount((count) => count + 1), 0)
  }

  function handleShortcutsKeyDown(
    event: React.KeyboardEvent<HTMLFormElement>
  ) {
    if (!shortcuts || event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const target = event.target
    if (
      target instanceof Element &&
      target.closest(
        "input:not([type='radio']):not([type='checkbox']), textarea, select, [contenteditable='true'], [contenteditable='']"
      )
    ) {
      return
    }

    let choiceIndex = -1
    if (shortcuts === "numbers") {
      if (/^[1-9]$/.test(event.key)) choiceIndex = Number(event.key) - 1
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      choiceIndex = event.key.toLowerCase().charCodeAt(0) - 97
    }
    if (choiceIndex < 0) return

    const activeItemElement = event.currentTarget.querySelector(
      '[data-slot="questionnaire-item"][data-active]'
    )
    const choiceInputs = activeItemElement?.querySelectorAll<HTMLInputElement>(
      'input[data-slot="questionnaire-choice-input"]'
    )
    const choiceInput = choiceInputs?.[choiceIndex]
    if (choiceInput) {
      event.preventDefault()
      choiceInput.click()
    }
  }

  // Move focus to the first control of the new step, but only when focus is
  // already inside the form (keyboard flow) so mounting never steals focus.
  React.useEffect(() => {
    const form = formRef.current
    if (!form) return
    if (!form.contains(document.activeElement)) return
    form
      .querySelector<HTMLElement>(
        '[data-slot="questionnaire-item"][data-active] input:not([type="hidden"]), [data-slot="questionnaire-item"][data-active] textarea, [data-slot="questionnaire-item"][data-active] select'
      )
      ?.focus()
  }, [activeItem])

  // Render-time navigation facts are derived from the `items` config only
  // (ref reads happen exclusively inside event handlers).
  const activePosition = items.findIndex((item) => item.name === activeItem)
  const hasPreviousItem =
    activePosition > -1 &&
    items
      .slice(0, activePosition)
      .some((item) => item.disabled !== true)
  const hasNextItem =
    activePosition > -1 &&
    items
      .slice(activePosition + 1)
      .some((item) => item.disabled !== true)
  const enabledItems = items.filter((item) => item.disabled !== true)
  const activeIndex = enabledItems.findIndex(
    (item) => item.name === activeItem
  )

  const contextValue: QuestionnaireContextValue = {
    items,
    activeItem,
    activeStatus: getStatus(activeItem),
    activeRequired:
      items.find((item) => item.name === activeItem)?.required === true,
    isFirst: !hasPreviousItem,
    isLast: !hasNextItem,
    current: activeIndex === -1 ? enabledItems.length : activeIndex + 1,
    total: enabledItems.length,
    shortcuts,
    resetCount,
    getStatus,
    getError,
    setStatus,
    setError,
    clearError,
    registerItem,
    next: handleNext,
    previous: handlePrevious,
    skip: handleSkip,
  }

  return (
    <form
      ref={formRef}
      data-slot="questionnaire"
      noValidate
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      onKeyDown={(event) => {
        handleShortcutsKeyDown(event)
        onKeyDown?.(event)
      }}
      {...props}
    >
      <QuestionnaireContext.Provider value={contextValue}>
        {children}
      </QuestionnaireContext.Provider>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireItem                                                          */
/* -------------------------------------------------------------------------- */

export interface QuestionnaireItemProps extends React.ComponentProps<"div"> {
  /** Form field name — the key collected in `FormData`. */
  name: string
  required?: boolean
  disabled?: boolean
  /** Allow selecting several choices (checkboxes instead of radios). */
  multiple?: boolean
  /** Force the invalid state (e.g. schema validation). */
  invalid?: boolean
  onStatusChange?: (status: QuestionnaireItemStatus) => void
}

function QuestionnaireItem({
  className,
  name,
  required = false,
  disabled = false,
  multiple = false,
  invalid = false,
  onStatusChange,
  children,
  ...props
}: QuestionnaireItemProps) {
  const context = useQuestionnaireContext("QuestionnaireItem")
  const { setStatus, clearError, registerItem, resetCount } = context
  const itemRef = React.useRef<HTMLDivElement>(null)

  const status = context.getStatus(name)
  const error = context.getError(name)
  const isActive = context.activeItem === name
  const configDisabled =
    context.items.find((entry) => entry.name === name)?.disabled === true
  // A disabled step is skipped by the navigation AND its inputs are disabled
  // (fieldset semantics) so stale values drop out of `FormData`.
  const isDisabled = disabled || configDisabled
  const isInvalid = invalid || error !== undefined

  const hasAnswer = React.useCallback(
    () => computeAnsweredFromDom(itemRef.current) === "answered",
    []
  )
  const focusFirstControl = React.useCallback(() => {
    itemRef.current
      ?.querySelector<HTMLElement>(
        "input:not([type='hidden']), textarea, select"
      )
      ?.focus()
  }, [])
  const syncStatus = React.useCallback(() => {
    setStatus(name, computeAnsweredFromDom(itemRef.current))
  }, [setStatus, name])

  React.useEffect(
    () =>
      registerItem({
        name,
        required,
        disabled: isDisabled,
        hasAnswer,
        focusFirstControl,
      }),
    [registerItem, name, required, isDisabled, hasAnswer, focusFirstControl]
  )

  // Sync the status from the DOM on mount and after a form reset
  // (covers `defaultChecked` / `defaultValue`).
  React.useEffect(() => {
    syncStatus()
  }, [syncStatus, resetCount])

  const handleStatusChangeRef = React.useRef(onStatusChange)
  React.useEffect(() => {
    handleStatusChangeRef.current = onStatusChange
  })
  React.useEffect(() => {
    handleStatusChangeRef.current?.(status)
  }, [status])

  const itemContextValue = React.useMemo<QuestionnaireItemContextValue>(
    () => ({
      name,
      multiple,
      required,
      disabled: isDisabled,
      invalid: isInvalid,
      error,
      onFieldChange: () => {
        syncStatus()
        clearError(name)
      },
    }),
    [
      name,
      multiple,
      required,
      isDisabled,
      isInvalid,
      error,
      syncStatus,
      clearError,
    ]
  )

  return (
    <div
      ref={itemRef}
      data-slot="questionnaire-item"
      data-active={isActive ? "" : undefined}
      data-status={status}
      data-required={required || undefined}
      data-multiple={multiple || undefined}
      data-disabled={isDisabled || undefined}
      data-invalid={isInvalid || undefined}
      aria-disabled={isDisabled || undefined}
      hidden={isActive ? undefined : true}
      className={cn(
        "flex flex-col gap-3",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <QuestionnaireItemContext.Provider value={itemContextValue}>
        {children}
      </QuestionnaireItemContext.Provider>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireTitle / QuestionnaireDescription                              */
/* -------------------------------------------------------------------------- */

export interface QuestionnaireTitleProps
  extends React.HTMLAttributes<HTMLElement> {
  render?: React.ReactElement<Record<string, unknown>>
}

function QuestionnaireTitle({
  className,
  render,
  children,
  ...props
}: QuestionnaireTitleProps) {
  if (render) {
    return (
      <RenderSlot
        render={render}
        className={cn("text-lg font-semibold", className)}
        data-slot="questionnaire-title"
        {...props}
      >
        {children}
      </RenderSlot>
    )
  }
  return (
    <h2
      data-slot="questionnaire-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export interface QuestionnaireDescriptionProps
  extends React.HTMLAttributes<HTMLElement> {
  render?: React.ReactElement<Record<string, unknown>>
}

function QuestionnaireDescription({
  className,
  render,
  children,
  ...props
}: QuestionnaireDescriptionProps) {
  if (render) {
    return (
      <RenderSlot
        render={render}
        className={cn("text-muted-foreground text-sm", className)}
        data-slot="questionnaire-description"
        {...props}
      >
        {children}
      </RenderSlot>
    )
  }
  return (
    <p
      data-slot="questionnaire-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </p>
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireProgress                                                      */
/* -------------------------------------------------------------------------- */

export interface QuestionnaireProgressState {
  /** 1-based position of the active item among the enabled items. */
  current: number
  /** Number of enabled items. */
  total: number
}

export interface QuestionnaireProgressRenderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string
  "data-current"?: number
  "data-total"?: number
}

export type QuestionnaireProgressRender = (
  props: QuestionnaireProgressRenderProps,
  state: QuestionnaireProgressState
) => React.ReactElement

export interface QuestionnaireProgressProps
  extends Omit<React.ComponentProps<"div">, "render"> {
  render?: QuestionnaireProgressRender
  /**
   * Step-counter label shown above the bar (also used as its accessible
   * label). Pass a localized string — e.g. `"שאלה 1 מתוך 3"` — or a
   * function of `{ current, total }` for full control. Defaults to
   * `Question {current} of {total}`.
   */
  stepLabel?: string | ((state: QuestionnaireProgressState) => string)
}

function QuestionnaireProgress({
  className,
  render,
  stepLabel,
  ...props
}: QuestionnaireProgressProps) {
  const context = useQuestionnaireContext("QuestionnaireProgress")
  const { current, total } = context

  const slotProps: QuestionnaireProgressRenderProps = {
    "data-slot": "questionnaire-progress",
    "data-current": current,
    "data-total": total,
    ...props,
    className: cn("flex w-full flex-col gap-2", className),
  }

  if (render) {
    return render(slotProps, { current, total })
  }

  const percent = total > 0 ? Math.round((current / total) * 100) : 0
  const label =
    typeof stepLabel === "function"
      ? stepLabel({ current, total })
      : (stepLabel ?? `Question ${current} of ${total}`)

  return (
    <div {...slotProps}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-sm tabular-nums">
          {percent}%
        </p>
      </div>
      {/* Local direction-aware track: the fill is anchored to the logical
          `start` edge, so it mirrors automatically in RTL (the shared
          <Progress> indicator offsets a full-width bar with a physical
          translateX and therefore always fills from the left edge). */}
      <div
        data-slot="questionnaire-progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={label}
        className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
      >
        <div
          data-slot="questionnaire-progress-bar-indicator"
          className="bg-primary absolute inset-y-0 start-0 transition-[width] duration-150"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireChoices / QuestionnaireChoice                                 */
/* -------------------------------------------------------------------------- */

export type QuestionnaireChoicesProps = React.ComponentProps<"div">

function QuestionnaireChoices({
  className,
  children,
  onChange,
  ...props
}: QuestionnaireChoicesProps) {
  const item = useQuestionnaireItemContext("QuestionnaireChoices")
  const { resetCount } = useQuestionnaireContext("QuestionnaireChoices")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [values, setValues] = React.useState<string[]>(() =>
    getInitiallyCheckedValues(children)
  )

  const syncFromDom = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const checked = Array.from(
      container.querySelectorAll<HTMLInputElement>("input:checked")
    ).map((input) => input.value)
    setValues(checked)
  }, [])

  // Re-read the checked state from the DOM on mount and after a form reset.
  React.useEffect(() => {
    syncFromDom()
  }, [syncFromDom, resetCount])

  const handleContainerChange = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      const target = event.target
      if (
        target instanceof HTMLInputElement &&
        (target.type === "radio" || target.type === "checkbox")
      ) {
        if (target.checked) {
          // Picking a choice replaces a freeform answer typed next to it
          // (only uncontrolled inputs are cleared).
          containerRef.current
            ?.querySelectorAll<HTMLInputElement>(
              'input[data-slot="questionnaire-input"]:not([data-controlled])'
            )
            .forEach((input) => {
              input.value = ""
            })
        }
        syncFromDom()
        item.onFieldChange()
      }
    },
    [syncFromDom, item]
  )

  // Assign a stable index to every direct `<QuestionnaireChoice>` child so
  // shortcut labels map 1:1 onto the DOM order used by the keyboard handler.
  // (Pure two-pass pass — no render-time mutation.)
  const childrenArray = React.Children.toArray(children)
  const isChoiceElement = (child: React.ReactNode): child is React.ReactElement<QuestionnaireChoiceProps> =>
    React.isValidElement(child) && child.type === QuestionnaireChoice
  const renderedChildren = childrenArray.map((child, index) => {
    if (!isChoiceElement(child)) return child
    const choiceIndex = childrenArray
      .slice(0, index)
      .filter((entry) => isChoiceElement(entry)).length
    const choiceProps = child.props as { value?: string }
    return React.cloneElement(child, {
      choiceIndex,
      groupChecked:
        typeof choiceProps.value === "string" &&
        values.includes(choiceProps.value),
    })
  })

  const choicesContextValue = React.useMemo<QuestionnaireChoicesContextValue>(
    () => ({ syncFromDom }),
    [syncFromDom]
  )

  return (
    <div
      ref={containerRef}
      role={item.multiple ? "group" : "radiogroup"}
      aria-required={item.required || undefined}
      aria-invalid={item.invalid || undefined}
      data-slot="questionnaire-choices"
      data-invalid={item.invalid || undefined}
      className={cn("flex w-full flex-col gap-2", className)}
      onChange={(event) => {
        handleContainerChange(event)
        onChange?.(event)
      }}
      {...props}
    >
      <QuestionnaireChoicesContext.Provider value={choicesContextValue}>
        {renderedChildren}
      </QuestionnaireChoicesContext.Provider>
    </div>
  )
}

export interface QuestionnaireChoiceProps
  extends Omit<
    React.ComponentProps<"input">,
    | "value"
    | "checked"
    | "defaultChecked"
    | "onChange"
    | "type"
    | "name"
    | "children"
  > {
  value: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  children?: React.ReactNode
  /** @internal Injected by `QuestionnaireChoices`. */
  choiceIndex?: number
  /** @internal Injected by `QuestionnaireChoices`. */
  groupChecked?: boolean
}

function QuestionnaireChoice({
  className,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled,
  choiceIndex,
  groupChecked,
  children,
  ...props
}: QuestionnaireChoiceProps) {
  const item = useQuestionnaireItemContext("QuestionnaireChoice")
  const { shortcuts } = useQuestionnaireContext("QuestionnaireChoice")

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : (groupChecked ?? false)
  const inputType = item.multiple ? "checkbox" : "radio"
  const isDisabled = disabled ?? false

  const shortcutLabel =
    shortcuts && choiceIndex !== undefined
      ? shortcuts === "numbers"
        ? choiceIndex < 9
          ? String(choiceIndex + 1)
          : null
        : choiceIndex < 26
          ? String.fromCharCode(65 + choiceIndex)
          : null
      : null

  return (
    <label
      data-slot="questionnaire-choice"
      data-state={isChecked ? "checked" : "unchecked"}
      data-disabled={isDisabled || undefined}
      data-invalid={item.invalid || undefined}
      className={cn(
        "group/questionnaire-choice flex w-full cursor-pointer items-start gap-3 rounded-lg border border-input bg-background p-3 text-sm shadow-xs outline-none transition-[color,border-color,background-color]",
        "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 dark:data-[state=checked]:bg-primary/10",
        "data-[state=unchecked]:hover:border-primary/40",
        "data-[state=unchecked]:data-[invalid]:border-destructive/50",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
    >
      <input
        type={inputType}
        value={value}
        name={item.name}
        data-slot="questionnaire-choice-input"
        aria-invalid={item.invalid || undefined}
        aria-keyshortcuts={
          shortcutLabel ? shortcutLabel.toLowerCase() : undefined
        }
        className="sr-only"
        disabled={isDisabled || item.disabled}
        onChange={
          isControlled
            ? (onChange ?? (() => {}))
            : onChange
        }
        {...(isControlled ? { checked } : { defaultChecked })}
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center border shadow-xs transition-[border-color,background-color,color]",
          item.multiple ? "rounded-sm" : "rounded-full",
          isChecked
            ? item.multiple
              ? "border-primary bg-primary text-primary-foreground"
              : "border-primary dark:bg-input/30"
            : "border-input dark:border-muted-foreground"
        )}
      >
        {isChecked ? (
          item.multiple ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <span className="size-2 rounded-full bg-primary" />
          )
        ) : null}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        {children}
      </span>
      {shortcutLabel ? (
        <kbd
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none ms-auto mt-0.5 self-start rounded-sm border border-input bg-muted px-1.5 font-code text-[10px] font-medium leading-4"
        >
          {shortcutLabel}
        </kbd>
      ) : null}
    </label>
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireInput                                                         */
/* -------------------------------------------------------------------------- */

export type QuestionnaireInputProps = React.ComponentProps<"input">

function QuestionnaireInput({
  className,
  name,
  type = "text",
  value,
  onChange,
  ...props
}: QuestionnaireInputProps) {
  const item = useQuestionnaireItemContext("QuestionnaireInput")
  const choices = React.useContext(QuestionnaireChoicesContext)

  return (
    <input
      type={type}
      value={value}
      data-slot="questionnaire-input"
      data-controlled={value === undefined ? undefined : ""}
      name={name ?? item.name}
      aria-invalid={item.invalid || undefined}
      disabled={item.disabled || undefined}
      className={cn(
        "border-input placeholder:text-muted-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      onChange={(event) => {
        // A written answer replaces the picked choice (single-choice items):
        // uncheck the sibling radios so `FormData` keeps a single value.
        if (event.currentTarget.value !== "") {
          const container = event.currentTarget.closest(
            '[data-slot="questionnaire-choices"]'
          )
          container?.querySelectorAll<HTMLInputElement>(
            'input[type="radio"]'
          ).forEach((radio) => {
            if (!radio.disabled) radio.checked = false
          })
          choices?.syncFromDom()
        }
        item.onFieldChange()
        onChange?.(event)
      }}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireError / QuestionnaireErrors                                   */
/* -------------------------------------------------------------------------- */

export type QuestionnaireErrorProps = React.ComponentProps<"p">

function QuestionnaireError({
  className,
  children,
  ...props
}: QuestionnaireErrorProps) {
  const item = useQuestionnaireItemContext("QuestionnaireError")
  const message =
    children !== undefined && children !== null
      ? children
      : item.error ?? (item.invalid ? DEFAULT_REQUIRED_MESSAGE : undefined)
  if (!message) return null
  return (
    <p
      role="alert"
      data-slot="questionnaire-error"
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {message}
    </p>
  )
}

export type QuestionnaireErrorsProps = React.ComponentProps<"div">

/**
 * Aggregate validation display: renders every error currently held by the
 * questionnaire (set by the built-in required check or `setError`).
 */
function QuestionnaireErrors({
  className,
  children,
  ...props
}: QuestionnaireErrorsProps) {
  const context = useQuestionnaireContext("QuestionnaireErrors")
  const errored = context.items.filter(
    (entry) => context.getError(entry.name) !== undefined
  )
  if (errored.length === 0 && !children) return null
  return (
    <div
      role="alert"
      data-slot="questionnaire-errors"
      className={cn("text-destructive flex flex-col gap-1 text-sm", className)}
      {...props}
    >
      {children ??
        errored.map((entry) => (
          <p key={entry.name}>{context.getError(entry.name)}</p>
        ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* QuestionnaireActions                                                       */
/* -------------------------------------------------------------------------- */

export type QuestionnaireActionsProps = React.ComponentProps<"div">

function QuestionnaireActions({
  className,
  ...props
}: QuestionnaireActionsProps) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 mobile:flex-col mobile:items-stretch",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Action buttons                                                             */
/* -------------------------------------------------------------------------- */

/** Shared props for the navigation buttons (`variant`/`size` come from Button). */
type QuestionnaireActionButtonProps = React.ComponentProps<typeof Button>

function QuestionnairePrevious({
  className,
  variant = "ghost",
  disabled,
  onClick,
  children,
  ...props
}: QuestionnaireActionButtonProps) {
  const context = useQuestionnaireContext("QuestionnairePrevious")
  return (
    <Button
      type="button"
      data-slot="questionnaire-previous"
      data-status={context.activeStatus}
      variant={variant}
      className={className}
      disabled={disabled || context.isFirst}
      onClick={(event) => {
        onClick?.(event)
        context.previous()
      }}
      {...props}
    >
      {children ?? "Previous"}
    </Button>
  )
}

function QuestionnaireNext({
  className,
  variant = "default",
  disabled,
  onClick,
  children,
  ...props
}: QuestionnaireActionButtonProps) {
  const context = useQuestionnaireContext("QuestionnaireNext")
  return (
    <Button
      type="button"
      data-slot="questionnaire-next"
      data-status={context.activeStatus}
      variant={variant}
      className={className}
      disabled={disabled || context.isLast}
      onClick={(event) => {
        onClick?.(event)
        context.next()
      }}
      {...props}
    >
      {children ?? "Next"}
    </Button>
  )
}

function QuestionnaireSkip({
  className,
  variant = "ghost",
  disabled,
  onClick,
  children,
  ...props
}: QuestionnaireActionButtonProps) {
  const context = useQuestionnaireContext("QuestionnaireSkip")
  // Required items are not skippable — render nothing for them.
  if (context.activeRequired) return null
  return (
    <Button
      type="button"
      data-slot="questionnaire-skip"
      data-status={context.activeStatus}
      variant={variant}
      className={className}
      disabled={disabled || context.isLast}
      onClick={(event) => {
        onClick?.(event)
        context.skip()
      }}
      {...props}
    >
      {children ?? "Skip"}
    </Button>
  )
}

function QuestionnaireSubmit({
  className,
  variant = "default",
  children,
  ...props
}: QuestionnaireActionButtonProps) {
  const context = useQuestionnaireContext("QuestionnaireSubmit")
  return (
    <Button
      type="submit"
      data-slot="questionnaire-submit"
      data-status={context.activeStatus}
      variant={variant}
      className={className}
      {...props}
    >
      {children ?? "Submit"}
    </Button>
  )
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireErrors,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
}

export type {
  QuestionnaireActionButtonProps,
  QuestionnaireShortcutMode,
}
