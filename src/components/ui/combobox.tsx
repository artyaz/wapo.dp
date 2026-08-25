"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/* -----------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------- */

/**
 * A group of items: `{ value: "Europe", items: [...] }`. Grouped items are
 * detected at runtime — every element of `items` that carries an `items`
 * array is treated as a group.
 */
interface ComboboxItemGroupLike {
  value?: unknown
  items?: readonly unknown[]
}

interface ComboboxBaseProps<T> {
  /**
   * Items to choose from. Either a flat array of values (strings or objects)
   * or an array of `{ value, items }` groups.
   */
  items: readonly T[]
  /** Enable multiple selection (renders/toggles a list of values). */
  multiple?: boolean
  /** Automatically highlight the first item while browsing. */
  autoHighlight?: boolean
  /**
   * Convert an item to the string used for filtering, selection identity and
   * `ComboboxValue`. Defaults to the item itself, or its `label`/`value`
   * field when the item is an object.
   */
  itemToStringValue?: (item: T) => string
  /** Controlled open state of the listbox popover. */
  open?: boolean
  /** Initial open state. */
  defaultOpen?: boolean
  /** Called when the listbox popover opens or closes. */
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

interface ComboboxSingleProps<T> extends ComboboxBaseProps<T> {
  multiple?: false
  value?: T | null
  defaultValue?: T | null
  onValueChange?: (value: T | null) => void
}

interface ComboboxMultipleProps<T> extends ComboboxBaseProps<T> {
  multiple: true
  value?: readonly T[]
  defaultValue?: readonly T[]
  onValueChange?: (value: T[]) => void
}

type ComboboxProps<T> =
  | ComboboxSingleProps<T>
  | ComboboxMultipleProps<T>

type ComboboxItemProps = React.ComponentProps<"div"> & {
  /** The raw item this option represents (from `items` / render props). */
  value: any
  disabled?: boolean
}

type ComboboxRenderItemsProps = Omit<React.ComponentProps<"div">, "children"> & {
  children?: (item: any, index: number) => React.ReactNode
}

/* -----------------------------------------------------------------------------
 * Context
 * -------------------------------------------------------------------------- */

interface ComboboxContextValue {
  multiple: boolean
  open: boolean
  changeOpen: (open: boolean) => void
  filterText: string
  setFilterText: (text: string) => void
  itemToString: (item: unknown) => string
  /** Top-level items after filtering (groups keep only matching items). */
  filteredItems: readonly unknown[]
  /** Visible items, flattened in display order. */
  flatItems: readonly unknown[]
  /** `itemToString` of every visible item, in display order. */
  flatValues: readonly string[]
  activeIndex: number | null
  activeValue: string | null
  setActiveIndex: (index: number | null) => void
  listId: string
  selectedValues: readonly string[]
  isSelected: (item: unknown) => boolean
  selectItem: (item: unknown) => void
  removeValue: (value: string) => void
  clearValue: () => void
  registerInput: (node: HTMLInputElement | null) => void
  focusInput: () => void
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  /**
   * The combobox "control" element (input wrapper / chips container).
   * Focus and pointer interactions inside it belong to the widget and must
   * not dismiss the popup (see `ComboboxContent`'s `onInteractOutside`).
   */
  controlRef: React.RefObject<HTMLElement | null>
  registerControl: (node: HTMLElement | null) => void
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useComboboxContext(part: string): ComboboxContextValue {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error(`\`${part}\` must be used within \`<Combobox>\`.`)
  }
  return context
}

/** Items provided to a `ComboboxCollection` by its parent group. */
const ComboboxGroupContext = React.createContext<readonly unknown[] | null>(
  null
)

/* -----------------------------------------------------------------------------
 * Utilities
 * -------------------------------------------------------------------------- */

function defaultItemToString(item: unknown): string {
  if (item == null) return ""
  if (typeof item === "string") return item
  if (
    typeof item === "number" ||
    typeof item === "boolean" ||
    typeof item === "bigint"
  ) {
    return String(item)
  }
  if (typeof item === "object") {
    const candidate = item as { label?: unknown; value?: unknown }
    if (
      typeof candidate.label === "string" ||
      typeof candidate.label === "number"
    ) {
      return String(candidate.label)
    }
    if (
      typeof candidate.value === "string" ||
      typeof candidate.value === "number"
    ) {
      return String(candidate.value)
    }
  }
  return String(item)
}

function isItemGroup(item: unknown): item is Required<ComboboxItemGroupLike> {
  return (
    typeof item === "object" &&
    item !== null &&
    Array.isArray((item as ComboboxItemGroupLike).items)
  )
}

function toArrayValue(value: unknown): unknown[] {
  if (value == null) return []
  return Array.isArray(value) ? [...value] : [value]
}

function filterByQuery(
  items: readonly unknown[],
  query: string,
  itemToString: (item: unknown) => string
): unknown[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return [...items]
  return items.filter((item) =>
    itemToString(item).toLowerCase().includes(needle)
  )
}

/* -----------------------------------------------------------------------------
 * Combobox (root)
 * -------------------------------------------------------------------------- */

function Combobox<T>(props: ComboboxSingleProps<T>): React.JSX.Element
function Combobox<T>(props: ComboboxMultipleProps<T>): React.JSX.Element
function Combobox(props: ComboboxProps<any>): React.JSX.Element {
  const {
    items = [],
    multiple = false,
    autoHighlight = false,
    itemToStringValue,
    value,
    defaultValue,
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
  } = props

  const itemToString = React.useMemo(
    () => (itemToStringValue ?? defaultItemToString) as (item: unknown) => string,
    [itemToStringValue]
  )

  const [filterText, setFilterText] = React.useState("")
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp ?? internalOpen

  const [internalSelected, setInternalSelected] = React.useState<unknown[]>(
    () => toArrayValue(defaultValue)
  )
  const isControlledValue = value !== undefined
  const selected = isControlledValue ? toArrayValue(value) : internalSelected
  const selectedValues = React.useMemo(
    () => selected.map(itemToString),
    [selected, itemToString]
  )

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const listId = React.useId()

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const registerInput = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node
  }, [])
  const focusInput = React.useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const controlRef = React.useRef<HTMLElement | null>(null)
  const registerControl = React.useCallback((node: HTMLElement | null) => {
    controlRef.current = node
  }, [])

  const changeOpen = (next: boolean) => {
    if (next === open) return
    if (openProp === undefined) setInternalOpen(next)
    onOpenChange?.(next)
    // Browsing always starts from an unfiltered list.
    setFilterText("")
    setActiveIndex(null)
  }

  const isGrouped = items.length > 0 && items.every(isItemGroup)

  const filteredItems = React.useMemo(() => {
    if (!isGrouped) return filterByQuery(items, filterText, itemToString)
    return (items as readonly ComboboxItemGroupLike[])
      .map((group) => ({
        ...group,
        items: filterByQuery(group.items ?? [], filterText, itemToString),
      }))
      .filter((group) => (group.items ?? []).length > 0)
  }, [items, filterText, itemToString, isGrouped])

  const { flatItems, flatValues } = React.useMemo(() => {
    if (!isGrouped) {
      return {
        flatItems: filteredItems,
        flatValues: filteredItems.map(itemToString),
      }
    }
    const list = (
      filteredItems as readonly ComboboxItemGroupLike[]
    ).flatMap((group) => [...(group.items ?? [])])
    return { flatItems: list, flatValues: list.map(itemToString) }
  }, [filteredItems, itemToString, isGrouped])

  const activeValue =
    activeIndex == null ? null : (flatValues[activeIndex] ?? null)

  // `autoHighlight` keeps the first item highlighted while browsing.
  React.useEffect(() => {
    if (!open || !autoHighlight) return
    setActiveIndex(flatValues.length > 0 ? 0 : null)
  }, [open, autoHighlight, flatValues])

  // Highlight the current selection when the list opens.
  React.useEffect(() => {
    if (!open || autoHighlight) return
    const first = selectedValues[0]
    const index = first === undefined ? -1 : flatValues.indexOf(first)
    setActiveIndex(index >= 0 ? index : null)
  }, [open])

  // Keep the highlight inside the list as the filtering shrinks it.
  React.useEffect(() => {
    if (!open) return
    setActiveIndex((current) => {
      if (current == null) return current
      if (flatValues.length === 0) return null
      return Math.min(current, flatValues.length - 1)
    })
  }, [open, flatValues])

  // Focus the combobox input when the listbox opens without focus already
  // inside it (e.g. opened via the trigger button), so keyboard navigation
  // works immediately.
  React.useEffect(() => {
    if (!open) return
    const input = inputRef.current
    if (!input) return
    const active = document.activeElement
    if (active === input || (active instanceof Node && input.contains(active))) {
      return
    }
    input.focus()
  }, [open])

  const handleValueChange = onValueChange as ((value: any) => void) | undefined

  const updateSelection = (next: unknown[]) => {
    if (!isControlledValue) setInternalSelected(next)
    handleValueChange?.(multiple ? next : (next[0] ?? null))
  }

  const isSelected = (item: unknown) =>
    selectedValues.includes(itemToString(item))

  const selectItem = (item: unknown) => {
    const stringValue = itemToString(item)
    if (multiple) {
      const next = selected.some(
        (candidate) => itemToString(candidate) === stringValue
      )
        ? selected.filter((candidate) => itemToString(candidate) !== stringValue)
        : [...selected, item]
      updateSelection(next)
      // Clear the filter so the rest of the list is browsable again.
      setFilterText("")
    } else {
      updateSelection([item])
      changeOpen(false)
    }
  }

  const removeValue = (valueToRemove: string) => {
    updateSelection(
      selected.filter((item) => itemToString(item) !== valueToRemove)
    )
  }

  const clearValue = () => {
    updateSelection([])
    setFilterText("")
    inputRef.current?.focus()
  }

  const moveActiveIndex = (delta: 1 | -1) => {
    if (flatValues.length === 0) return
    setActiveIndex((current) => {
      if (current == null) return delta > 0 ? 0 : flatValues.length - 1
      const next = current + delta
      if (next < 0) return 0
      if (next > flatValues.length - 1) return flatValues.length - 1
      return next
    })
  }

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.defaultPrevented) return
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault()
        if (!open) {
          changeOpen(true)
          if (flatValues.length > 0) setActiveIndex(0)
        } else {
          moveActiveIndex(1)
        }
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        if (!open) {
          changeOpen(true)
          if (flatValues.length > 0) setActiveIndex(flatValues.length - 1)
        } else {
          moveActiveIndex(-1)
        }
        break
      }
      case "Home": {
        if (!open) return
        event.preventDefault()
        setActiveIndex(flatValues.length > 0 ? 0 : null)
        break
      }
      case "End": {
        if (!open) return
        event.preventDefault()
        setActiveIndex(flatValues.length > 0 ? flatValues.length - 1 : null)
        break
      }
      case "Enter": {
        if (!open) return
        const item = activeIndex == null ? null : flatItems[activeIndex]
        if (item != null) {
          event.preventDefault()
          selectItem(item)
        }
        break
      }
      case "Escape": {
        if (open) {
          event.preventDefault()
          event.stopPropagation()
          changeOpen(false)
        }
        break
      }
      case "Tab": {
        if (open) changeOpen(false)
        break
      }
      case "Backspace": {
        if (
          multiple &&
          filterText === "" &&
          selected.length > 0 &&
          event.currentTarget.selectionStart === 0 &&
          event.currentTarget.selectionEnd === 0
        ) {
          removeValue(selectedValues[selectedValues.length - 1])
        }
        break
      }
      default:
        break
    }
  }

  const contextValue: ComboboxContextValue = {
    multiple,
    open,
    changeOpen,
    filterText,
    setFilterText,
    itemToString,
    filteredItems,
    flatItems,
    flatValues,
    activeIndex,
    activeValue,
    setActiveIndex,
    listId,
    selectedValues,
    isSelected,
    selectItem,
    removeValue,
    clearValue,
    registerInput,
    focusInput,
    handleInputKeyDown,
    controlRef,
    registerControl,
  }

  return (
    <Popover open={open} onOpenChange={changeOpen}>
      <ComboboxContext.Provider value={contextValue}>
        {children}
      </ComboboxContext.Provider>
    </Popover>
  )
}

/* -----------------------------------------------------------------------------
 * ComboboxInput
 * -------------------------------------------------------------------------- */

function ComboboxInput({
  className,
  showClear = false,
  showTrigger = true,
  children,
  onChange,
  onFocus,
  onKeyDown,
  ref,
  ...props
}: React.ComponentProps<"input"> & {
  /** Render a clear (X) button when there is something to clear. */
  showClear?: boolean
  /**
   * Render the trailing trigger button that opens/closes the listbox
   * (default `true`). Set to `false` when the input lives inside
   * `ComboboxContent` and the popup is opened from a `ComboboxTrigger`.
   */
  showTrigger?: boolean
}) {
  const context = useComboboxContext("ComboboxInput")
  const isTrigger = showTrigger !== false
  const isInvalid =
    props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const isDisabled = props.disabled === true
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const setRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    context.registerInput(node)
    if (typeof ref === "function") ref(node)
    else if (ref)
      (ref as React.RefObject<HTMLInputElement | null>).current = node
  }

  // Focus the search field when it lives inside the popover content.
  React.useEffect(() => {
    if (!isTrigger && context.open) {
      inputRef.current?.focus()
    }
  }, [isTrigger, context.open])

  const selectionText = context.selectedValues.join(", ")
  const displayValue = isTrigger && !context.open ? selectionText : context.filterText

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    if (!context.open) context.changeOpen(true)
    context.setFilterText(event.target.value)
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event)
    if (!context.open) context.changeOpen(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    context.handleInputKeyDown(event)
  }

  const input = (
    <input
      ref={setRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={context.open}
      aria-controls={context.listId}
      aria-activedescendant={
        context.open && context.activeIndex != null
          ? `${context.listId}-option-${context.activeIndex}`
          : undefined
      }
      aria-autocomplete="list"
      autoComplete="off"
      data-slot="combobox-input-field"
      className={cn(
        "placeholder:text-muted-foreground h-9 min-w-0 flex-1 bg-transparent px-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        !isTrigger && "px-0",
        className
      )}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )

  const wrapper = (
    <div
      ref={isTrigger ? context.registerControl : undefined}
      data-slot="combobox-input"
      className={cn(
        isTrigger
          ? cn(
              "border-input dark:bg-input/30 focus-within:ring-[3px] flex h-9 w-full items-center rounded-md border bg-transparent pe-1 shadow-xs transition-[color,box-shadow] outline-none",
              isInvalid
                ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/20 dark:focus-within:ring-destructive/40"
                : "focus-within:border-ring focus-within:ring-ring/50",
              isDisabled && "cursor-not-allowed opacity-50"
            )
          : "border-input flex h-9 w-full items-center gap-2 border-b px-3"
      )}
    >
      {input}
      {children}
      {isTrigger &&
      showClear &&
      (context.filterText.length > 0 || selectionText.length > 0) ? (
        <button
          type="button"
          tabIndex={-1}
          data-slot="combobox-clear"
          aria-label="Clear"
          className="text-muted-foreground hover:text-foreground flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center outline-none"
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.preventDefault()
            context.clearValue()
          }}
        >
          <XIcon className="size-4" />
        </button>
      ) : null}
      {isTrigger ? (
        <PopoverTrigger
          tabIndex={-1}
          aria-label="Toggle options"
          disabled={isDisabled}
          className="text-muted-foreground hover:text-foreground flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center outline-none"
          onMouseDown={(event) => event.preventDefault()}
        >
          <ChevronDownIcon
            className={cn(
              "size-4 transition-transform duration-150",
              context.open && "rotate-180"
            )}
          />
        </PopoverTrigger>
      ) : null}
    </div>
  )

  // The input anchors the popover unless it lives inside the popup itself.
  return isTrigger ? <PopoverAnchor asChild>{wrapper}</PopoverAnchor> : wrapper
}

/* -----------------------------------------------------------------------------
 * ComboboxTrigger
 * -------------------------------------------------------------------------- */

function ComboboxTrigger({
  className,
  render,
  children,
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  useComboboxContext("ComboboxTrigger")

  // `render` is delegated to the already-patched `PopoverTrigger` (Base UI
  // semantics: the render element keeps its own children when none are passed
  // here). The default trigger styling only applies to the plain trigger so
  // it never fights the rendered element's own classes.
  return (
    <PopoverTrigger
      data-slot="combobox-trigger"
      aria-haspopup="listbox"
      render={render}
      className={
        render
          ? className
          : cn(
              "border-input bg-transparent dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              className
            )
      }
      {...props}
    >
      {children !== undefined ? (
        children
      ) : render ? undefined : (
        <>
          <ComboboxValue />
          <ChevronDownIcon className="text-muted-foreground size-4" />
        </>
      )}
    </PopoverTrigger>
  )
}

/* -----------------------------------------------------------------------------
 * ComboboxValue
 * -------------------------------------------------------------------------- */

function ComboboxValue({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  /**
   * Either a static node, or a render prop receiving the string values of
   * the current selection (handy for rendering `ComboboxChip`s).
   */
  children?: React.ReactNode | ((values: string[]) => React.ReactNode)
}) {
  const context = useComboboxContext("ComboboxValue")
  const values = context.selectedValues

  return (
    <span
      data-slot="combobox-value"
      className={cn("contents", className)}
      {...props}
    >
      {typeof children === "function"
        ? children([...values])
        : children !== undefined
          ? children
          : values.join(", ")}
    </span>
  )
}

/* -----------------------------------------------------------------------------
 * ComboboxChips / ComboboxChipsInput / ComboboxChip
 * -------------------------------------------------------------------------- */

function ComboboxChips({
  className,
  onClick,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  const context = useComboboxContext("ComboboxChips")

  const setRef = (node: HTMLDivElement | null) => {
    context.registerControl(node)
    if (typeof ref === "function") ref(node)
    else if (ref)
      (ref as React.RefObject<HTMLDivElement | null>).current = node
  }

  return (
    <PopoverAnchor asChild>
      <div
        ref={setRef}
        data-slot="combobox-chips"
        className={cn(
          "border-input dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border bg-transparent p-1 shadow-xs transition-[color,box-shadow] outline-none",
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          context.focusInput()
        }}
        {...props}
      />
    </PopoverAnchor>
  )
}

function ComboboxChipsInput({
  className,
  onChange,
  onFocus,
  onKeyDown,
  ref,
  ...props
}: React.ComponentProps<"input">) {
  const context = useComboboxContext("ComboboxChipsInput")
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const setRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    context.registerInput(node)
    if (typeof ref === "function") ref(node)
    else if (ref)
      (ref as React.RefObject<HTMLInputElement | null>).current = node
  }

  return (
    <input
      ref={setRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={context.open}
      aria-controls={context.listId}
      aria-activedescendant={
        context.open && context.activeIndex != null
          ? `${context.listId}-option-${context.activeIndex}`
          : undefined
      }
      aria-autocomplete="list"
      autoComplete="off"
      data-slot="combobox-chips-input"
      className={cn(
        "placeholder:text-muted-foreground h-7 min-w-16 flex-1 bg-transparent px-1 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={context.filterText}
      onChange={(event) => {
        onChange?.(event)
        if (!context.open) context.changeOpen(true)
        context.setFilterText(event.target.value)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        if (!context.open) context.changeOpen(true)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        context.handleInputKeyDown(event)
      }}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"span">) {
  const context = useComboboxContext("ComboboxChip")
  const label =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : null

  return (
    <span
      data-slot="combobox-chip"
      title={label ? `Remove ${label}` : "Remove"}
      className={cn(
        "border-input bg-background text-foreground dark:bg-input/50 hover:bg-accent/60 hover:text-accent-foreground inline-flex h-5 max-w-full cursor-pointer items-center gap-1 rounded-md border px-1.5 text-xs font-medium select-none",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && label) {
          context.removeValue(label)
        }
      }}
      {...props}
    >
      {children}
    </span>
  )
}

/* -----------------------------------------------------------------------------
 * ComboboxContent
 * -------------------------------------------------------------------------- */

function ComboboxContent({
  className,
  children,
  anchor,
  align = "start",
  sideOffset = 4,
  onOpenAutoFocus,
  onInteractOutside,
  ...props
}: React.ComponentProps<typeof PopoverContent> & {
  /**
   * Anchor the popup to a custom element (e.g. the ref returned from
   * `useComboboxAnchor()` and attached to `ComboboxChips`).
   */
  anchor?: React.RefObject<HTMLElement | null>
}) {
  const context = useComboboxContext("ComboboxContent")

  return (
    <>
      {anchor ? (
        <PopoverAnchor
          virtualRef={anchor as unknown as React.RefObject<HTMLElement>}
        />
      ) : null}
      <PopoverContent
        data-slot="combobox-content"
        align={align}
        sideOffset={sideOffset}
        onOpenAutoFocus={(event) => {
          // Keep focus in the combobox input (or trigger), not the popup.
          event.preventDefault()
          onOpenAutoFocus?.(event)
        }}
        onInteractOutside={(event) => {
          onInteractOutside?.(event)
          // Focus and pointer interactions inside the combobox control
          // (input wrapper / chips container) belong to the widget: they
          // must not dismiss the popup. Without this, focusing the input
          // to type dismisses the popup via Radix's focus-outside handling.
          const target = event.detail.originalEvent.target
          const control = context.controlRef.current
          if (
            control &&
            target instanceof Node &&
            control.contains(target)
          ) {
            event.preventDefault()
          }
        }}
        className={cn(
          "text-popover-foreground min-w-[8rem] w-[var(--radix-popover-trigger-width)] overflow-hidden p-0",
          className
        )}
        {...props}
      >
        {children}
      </PopoverContent>
    </>
  )
}

/* -----------------------------------------------------------------------------
 * ComboboxList / ComboboxGroup / ComboboxCollection / ComboboxLabel / ComboboxSeparator / ComboboxEmpty
 * -------------------------------------------------------------------------- */

function ComboboxList({
  className,
  children,
  ...props
}: ComboboxRenderItemsProps) {
  const context = useComboboxContext("ComboboxList")

  return (
    <div
      data-slot="combobox-list"
      role="listbox"
      id={context.listId}
      aria-multiselectable={context.multiple ? true : undefined}
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    >
      {typeof children === "function"
        ? context.filteredItems.map((item, index) => children(item, index))
        : children}
    </div>
  )
}

function ComboboxGroup({
  className,
  items,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** The group's items, filtered by the combobox input text. */
  items?: readonly unknown[]
}) {
  const context = useComboboxContext("ComboboxGroup")

  const filteredItems = React.useMemo(
    () =>
      items
        ? filterByQuery(items, context.filterText, context.itemToString)
        : null,
    [items, context.filterText, context.itemToString]
  )

  return (
    <ComboboxGroupContext.Provider value={filteredItems}>
      <div
        data-slot="combobox-group"
        role="group"
        className={cn("text-foreground overflow-hidden p-1", className)}
        {...props}
      >
        {children}
      </div>
    </ComboboxGroupContext.Provider>
  )
}

function ComboboxCollection({
  className,
  children,
  ...props
}: ComboboxRenderItemsProps) {
  const context = useComboboxContext("ComboboxCollection")
  const groupItems = React.useContext(ComboboxGroupContext)
  const items = groupItems ?? context.flatItems

  return (
    <div data-slot="combobox-collection" className={className} {...props}>
      {typeof children === "function"
        ? items.map((item, index) => children(item, index))
        : children}
    </div>
  )
}

function ComboboxLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-label"
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: React.ComponentProps<"div">) {
  const context = useComboboxContext("ComboboxEmpty")

  if (context.flatItems.length > 0) return null

  return (
    <div
      data-slot="combobox-empty"
      className={cn(
        "text-muted-foreground py-6 text-center text-sm",
        className
      )}
      {...props}
    />
  )
}

/* -----------------------------------------------------------------------------
 * ComboboxItem
 * -------------------------------------------------------------------------- */

function ComboboxItem({
  value,
  className,
  children,
  disabled = false,
  onClick,
  onMouseDown,
  onMouseMove,
  ...props
}: ComboboxItemProps) {
  const context = useComboboxContext("ComboboxItem")
  const itemRef = React.useRef<HTMLDivElement | null>(null)
  const itemString = context.itemToString(value)
  const index = context.flatValues.indexOf(itemString)
  const isHighlighted = index >= 0 && context.activeIndex === index
  const isSelected = context.isSelected(value)

  React.useEffect(() => {
    if (isHighlighted) {
      itemRef.current?.scrollIntoView({ block: "nearest" })
    }
  }, [isHighlighted])

  return (
    <div
      ref={itemRef}
      id={index >= 0 ? `${context.listId}-option-${index}` : undefined}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-slot="combobox-item"
      data-highlighted={isHighlighted || undefined}
      data-selected={isSelected || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) {
          context.selectItem(value)
        }
      }}
      onMouseDown={(event) => {
        // Keep focus in the combobox input while clicking options.
        event.preventDefault()
        onMouseDown?.(event)
      }}
      onMouseMove={(event) => {
        onMouseMove?.(event)
        if (!disabled && !isHighlighted && index >= 0) {
          context.setActiveIndex(index)
        }
      }}
      {...props}
    >
      {children}
      <span
        data-slot="combobox-item-indicator"
        className={cn(
          "ms-auto flex shrink-0 items-center justify-center transition-opacity",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      >
        <CheckIcon className="size-4" />
      </span>
    </div>
  )
}

/* -----------------------------------------------------------------------------
 * Hooks
 * -------------------------------------------------------------------------- */

/**
 * Creates a ref for anchoring `ComboboxContent` to an element other than the
 * trigger — attach it to `ComboboxChips` (or any element) and pass it to
 * `ComboboxContent` via its `anchor` prop.
 */
function useComboboxAnchor<
  T extends HTMLElement = HTMLDivElement,
>(): React.RefObject<T | null> {
  return React.useRef<T | null>(null)
}

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxChip,
  ComboboxContent,
  ComboboxList,
  ComboboxGroup,
  ComboboxCollection,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
  ComboboxItem,
  useComboboxAnchor,
}

export type {
  ComboboxProps,
  ComboboxSingleProps,
  ComboboxMultipleProps,
  ComboboxItemProps,
}
