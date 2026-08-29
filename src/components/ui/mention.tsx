"use client"

/**
 * Mention / tagging input primitives — text fields with dynamic `@user`
 * mentions and `#hashtag` suggestion popups.
 *
 * Composition:
 *
 *   <MentionInput
 *     aria-label="Shift note"
 *     placeholder="Write a note… use @ to mention"
 *     mentions={[{ trigger: "@", label: "People", data: people }]}
 *     defaultValue={["Thanks ", { trigger: "@", value: "maya", label: "Maya Okafor" }, " — "]}
 *     defaultQuery={{ trigger: "@", query: "ma" }}
 *     showHints
 *   />
 *
 * - `<MentionInput>` is a `contentEditable` field (styled like the Textarea
 *   family: 3px radius, hairline border, control micro-elevation, 3px
 *   focus-visible ring). Mentioned people/topics render as inline,
 *   non-editable chips (`MentionChip` / `MentionTag` styling). Trigger
 *   detection, caret anchoring, keyboard navigation and chip insertion are
 *   all managed internally; multiple trigger types are configured through
 *   the `mentions` prop.
 * - `defaultQuery` opens the suggestion popup at mount with the given
 *   trigger + query appended after the initial value — useful for
 *   documentation stages and static screenshots.
 * - `<MentionPopup>` is the floating suggestion panel (a true overlay:
 *   8px radius, popover surface, overlay shadow). `<MentionList>` is the
 *   `role="listbox"` row list it contains — both are exported so custom
 *   surfaces (e.g. an autocomplete attached to a plain input) can reuse
 *   them.
 * - `useMention` is the state hook behind the input: feed it the text
 *   immediately before the caret and it reports the active trigger, query,
 *   filtered items and popup open state. `detectMention` /
 *   `filterMentionItems` / `getMentionValue` are exported as pure helpers.
 * - Accessibility: the field is `role="textbox"` with
 *   `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` and
 *   `aria-activedescendant` wired to the `role="listbox"` /
 *   `role="option"` rows. Arrow keys navigate, Enter/Tab select, Escape
 *   dismisses.
 * - Praxis law: the field is a flat 3px control (no shadow beyond the
 *   shared control micro-elevation); chips are flat `rounded-sm` tokens in
 *   IBM Plex Mono; only the popup casts a shadow (true overlay). Calm
 *   color-only transitions.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Kbd } from "@/components/ui/kbd"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** One suggestion row / insertable mention. */
export interface MentionItem {
  /** Stable row identity (React key). */
  id: string
  /** The token inserted into the text, e.g. `maya` (without the trigger). */
  value: string
  /** Display name shown in the row and on the chip, e.g. `Maya Okafor`. */
  label?: string
  /** Secondary line in the suggestion row, e.g. role or post count. */
  description?: string
  /** Optional avatar image; falls back to initials from the label. */
  avatarUrl?: string
  /** Extra strings matched by the query filter. */
  keywords?: string[]
}

/** Configures one trigger character, e.g. `@` people or `#` topics. */
export interface MentionTriggerConfig {
  /** Single character that starts a mention query (`@`, `#`, …). */
  trigger: string
  /** Suggestion pool for this trigger. */
  data: MentionItem[]
  /** Popup heading for this trigger, e.g. `People` / `Sensors & zones`. */
  label?: string
  /** Chip style for inserted items; defaults by trigger (`#` → `tag`). */
  chipVariant?: "mention" | "tag"
}

/** A mention that exists in the field (chips export this shape). */
export interface MentionRecord {
  trigger: string
  value: string
  label?: string
}

/** Value reported by `onChange` — plain text plus the mention records. */
export interface MentionValue {
  text: string
  mentions: MentionRecord[]
}

/** Initial content segment: plain text or a pre-inserted mention chip. */
export type MentionSegment = string | MentionRecord

export interface MentionOptionState {
  active: boolean
  trigger: string
  query: string
}

/* ------------------------------------------------------------------ */
/* Chips                                                               */
/* ------------------------------------------------------------------ */

/**
 * Inline chip style. Flat `rounded-sm` token (IBM Plex Mono) — no shadow,
 * hairline border so the chip stays legible on the field surface in both
 * themes.
 */
export const mentionChipVariants = cva(
  "inline-flex select-none items-center whitespace-nowrap rounded-sm border px-1 py-px font-code text-[0.8125rem] leading-[1.25rem] transition-colors",
  {
    variants: {
      variant: {
        /** `@user` — filled accent chip. */
        mention: "border-default-border bg-accent text-accent-foreground",
        /** `#topic` — hairline outline chip. */
        tag: "border-default-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "mention",
    },
  }
)

/** Class string for chips injected into the contentEditable DOM. */
function mentionChipClass(trigger: string, chipVariant?: "mention" | "tag") {
  return mentionChipVariants({
    variant: chipVariant ?? (trigger === "#" ? "tag" : "mention"),
  })
}

function MentionChip({
  className,
  variant,
  trigger = "@",
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof mentionChipVariants> & {
    /** Glyph printed before the chip text (`@` or `#`). */
    trigger?: string
  }) {
  return (
    <span
      data-slot="mention-chip"
      data-trigger={trigger}
      className={cn(mentionChipVariants({ variant }), className)}
      {...props}
    >
      <span aria-hidden="true" className="opacity-60">
        {trigger}
      </span>
      {children}
    </span>
  )
}

/** `#topic` chip — the outline variant of `MentionChip`. */
function MentionTag(props: React.ComponentProps<typeof MentionChip>) {
  const { trigger = "#", ...rest } = props
  return <MentionChip trigger={trigger} variant="tag" {...rest} />
}

/* ------------------------------------------------------------------ */
/* Pure helpers                                                        */
/* ------------------------------------------------------------------ */

/** How far before the caret the trigger scan looks back. */
const MENTION_SCAN_WINDOW = 64
/** Default suggestion rows shown before the list scrolls. */
const MENTION_DEFAULT_LIMIT = 8
/** Default popup width (`w-64`) — used for horizontal clamping. */
const MENTION_POPUP_WIDTH = 256

/**
 * Detects an active mention query in the text immediately before the caret.
 * A trigger is valid at the start of the text or right after whitespace (or
 * an opening paren); the query may not contain whitespace.
 */
export function detectMention(
  beforeCaret: string,
  triggers: string[]
): { trigger: string; query: string } | null {
  if (triggers.length === 0) return null
  const end = beforeCaret.length
  const start = Math.max(0, end - MENTION_SCAN_WINDOW)
  for (let i = end - 1; i >= start; i--) {
    const ch = beforeCaret[i]
    if (ch === undefined) break
    if (/\s/.test(ch)) return null
    if (triggers.includes(ch)) {
      const prev = i > 0 ? beforeCaret[i - 1] : ""
      if (prev === "" || /\s/.test(prev) || prev === "(") {
        return { trigger: ch, query: beforeCaret.slice(i + 1, end) }
      }
      // e.g. an email address — the trigger glyph is mid-word.
      return null
    }
  }
  return null
}

/**
 * Case-insensitive prefix-first filtering over value, label and keywords.
 * Returns at most `limit` items.
 */
export function filterMentionItems(
  data: MentionItem[],
  query: string,
  limit: number = MENTION_DEFAULT_LIMIT
): MentionItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return data.slice(0, limit)
  const scored: Array<{ item: MentionItem; score: number; index: number }> = []
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    const value = item.value.toLowerCase()
    const label = (item.label ?? "").toLowerCase()
    let score = -1
    if (value.startsWith(q) || label.startsWith(q)) {
      score = 0
    } else if (
      value.includes(q) ||
      label.includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q))
    ) {
      score = 1
    }
    if (score >= 0) scored.push({ item, score, index })
  }
  return scored
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.item)
    .slice(0, limit)
}

/** Extracts `{ text, mentions }` from a mention field's DOM. */
export function getMentionValue(el: HTMLElement): MentionValue {
  let text = ""
  const mentions: MentionRecord[] = []

  const walk = (parent: Node, topLevel: boolean) => {
    parent.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent ?? ""
        return
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return
      const element = child as HTMLElement
      if (element.hasAttribute("data-mention")) {
        const trigger = element.getAttribute("data-trigger") ?? "@"
        const value = element.getAttribute("data-value") ?? ""
        const label = element.getAttribute("data-label") ?? undefined
        mentions.push({ trigger, value, label })
        text += `${trigger}${label ?? value}`
        return
      }
      if (child.nodeName === "BR") {
        text += "\n"
        return
      }
      if (topLevel && (child.nodeName === "DIV" || child.nodeName === "P")) {
        // Chrome represents Enter as a new block. An empty line (a lone
        // <br>) contributes a single newline; a content block is prefixed
        // by one newline.
        const onlyBr =
          element.childNodes.length === 1 && element.firstChild?.nodeName === "BR"
        if (onlyBr) {
          text += "\n"
          return
        }
        if (text.length > 0 && !text.endsWith("\n")) text += "\n"
        walk(child, false)
        return
      }
      walk(child, topLevel)
    })
  }
  walk(el, true)
  return { text, mentions }
}

/* ------------------------------------------------------------------ */
/* useMention                                                          */
/* ------------------------------------------------------------------ */

export interface UseMentionOptions {
  /** Supported triggers; first match in `mentions` prop order wins. */
  triggers: MentionTriggerConfig[]
  /** Maximum suggestion rows (default 8). */
  limit?: number
}

/**
 * Mention trigger state. Feed `detect()` the text immediately before the
 * caret (from any editable surface) and read back the open/trigger/query
 * state plus the filtered suggestion rows.
 */
export function useMention(options: UseMentionOptions) {
  const { triggers, limit = MENTION_DEFAULT_LIMIT } = options

  const [open, setOpen] = React.useState(false)
  const [trigger, setTrigger] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const queryRef = React.useRef("")

  const triggerConfig = React.useMemo(
    () =>
      trigger === null
        ? null
        : (triggers.find((t) => t.trigger === trigger) ?? null),
    [triggers, trigger]
  )

  const items = React.useMemo(
    () =>
      triggerConfig ? filterMentionItems(triggerConfig.data, query, limit) : [],
    [triggerConfig, query, limit]
  )

  const detect = React.useCallback(
    (beforeCaret: string): { trigger: string; query: string } | null => {
      const found = detectMention(
        beforeCaret,
        triggers.map((t) => t.trigger)
      )
      if (!found) {
        setOpen(false)
        return null
      }
      setOpen(true)
      setTrigger(found.trigger)
      if (queryRef.current !== found.query) {
        queryRef.current = found.query
        setQuery(found.query)
        setActiveIndex(0)
      } else {
        setQuery(found.query)
      }
      return found
    },
    [triggers]
  )

  const close = React.useCallback(() => {
    setOpen(false)
  }, [])

  const moveActive = React.useCallback(
    (delta: number) => {
      setActiveIndex((index) => {
        if (items.length === 0) return 0
        const count = items.length
        return ((index + delta) % count + count) % count
      })
    },
    [items]
  )

  const safeActiveIndex =
    items.length === 0 ? 0 : Math.min(activeIndex, items.length - 1)

  return {
    open,
    trigger,
    query,
    items,
    activeIndex: safeActiveIndex,
    triggerConfig,
    detect,
    close,
    setActiveIndex,
    moveActive,
  }
}

/* ------------------------------------------------------------------ */
/* DOM helpers                                                         */
/* ------------------------------------------------------------------ */

interface MentionDetection {
  trigger: string
  query: string
  textNode: Text
  /** Offset of the trigger character inside `textNode`. */
  start: number
  /** Caret offset inside `textNode`. */
  end: number
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;")
}

/** Serialized chip markup used for both mount content and inserts. */
function chipHtml(segment: MentionRecord, chipVariant?: "mention" | "tag") {
  const { trigger, value, label } = segment
  const variant = chipVariant ?? (trigger === "#" ? "tag" : "mention")
  return (
    `<span data-mention="" data-trigger="${escapeAttr(trigger)}" ` +
    `data-value="${escapeAttr(value)}"` +
    (label ? ` data-label="${escapeAttr(label)}"` : "") +
    ` contenteditable="false" class="${mentionChipClass(trigger, variant)}">` +
    `${escapeHtml(trigger + (label ?? value))}</span>`
  )
}

function buildInitialHtml(defaultValue?: string | MentionSegment[]): string {
  if (!defaultValue) return ""
  const segments =
    typeof defaultValue === "string" ? [defaultValue] : defaultValue
  return segments
    .map((segment) => {
      if (typeof segment === "string") {
        return escapeHtml(segment).replace(/\n/g, "<br>")
      }
      return chipHtml(segment)
    })
    .join("")
}

function createChipElement(
  item: MentionItem,
  trigger: string,
  chipVariant?: "mention" | "tag"
): HTMLSpanElement {
  const span = document.createElement("span")
  span.setAttribute("data-mention", "")
  span.setAttribute("data-trigger", trigger)
  span.setAttribute("data-value", item.value)
  if (item.label) span.setAttribute("data-label", item.label)
  span.setAttribute("contenteditable", "false")
  span.className = mentionChipClass(trigger, chipVariant)
  span.textContent = `${trigger}${item.label ?? item.value}`
  return span
}

function lastTextNode(el: HTMLElement): Text | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let last: Text | null = null
  let node = walker.nextNode()
  while (node) {
    last = node as Text
    node = walker.nextNode()
  }
  return last
}

function placeCaretAtEnd(el: HTMLElement) {
  const selection = window.getSelection()
  if (!selection) return
  const range = document.createRange()
  const last = lastTextNode(el)
  if (last) {
    range.setStart(last, last.length)
    range.setEnd(last, last.length)
  } else {
    range.selectNodeContents(el)
    range.collapse(false)
  }
  selection.removeAllRanges()
  selection.addRange(range)
}

/** Row id pattern shared by the field's `aria-activedescendant` wiring. */
function mentionOptionId(listboxId: string, index: number) {
  return `${listboxId}-opt-${index}`
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => (word[0] ?? "").toUpperCase())
    .join("")
}

/** Subtle matched-substring emphasis (weight, never hue). */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, index)}
      <span className="font-semibold">{text.slice(index, index + query.length)}</span>
      {text.slice(index + query.length)}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* MentionList                                                         */
/* ------------------------------------------------------------------ */

export interface MentionListProps
  extends Omit<
    React.ComponentProps<"div">,
    "role" | "onSelect"
  > {
  items: MentionItem[]
  /** Index of the keyboard-active row. */
  activeIndex?: number
  /** Trigger glyph for the rows (`@`, `#`, …). */
  trigger?: string | null
  /** Current query — used for matched-substring emphasis. */
  query?: string
  /** List scroll cap in px (default 288). */
  maxHeight?: number
  /** Copy shown when `items` is empty. */
  emptyLabel?: string
  /** Called with the row index on click. */
  onSelect?: (index: number) => void
  /** Called when a row is hovered (moves the active row). */
  onHoverItem?: (index: number) => void
  /** Custom row renderer. */
  renderOption?: (item: MentionItem, state: MentionOptionState) => React.ReactNode
}

function MentionList({
  items,
  activeIndex = 0,
  trigger = "@",
  query = "",
  maxHeight = 288,
  emptyLabel = "No matches",
  onSelect,
  onHoverItem,
  renderOption,
  className,
  id,
  ...props
}: MentionListProps) {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const resolvedTrigger = trigger ?? "@"

  React.useEffect(() => {
    const el = listRef.current
    if (!el || el.scrollHeight <= el.clientHeight) return
    el.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({
      block: "nearest",
    })
  }, [activeIndex, items])

  return (
    <div
      ref={listRef}
      role="listbox"
      id={id}
      data-slot="mention-list"
      className={cn(
        "w-full overflow-x-hidden overflow-y-auto overscroll-contain p-1",
        className
      )}
      style={{ maxHeight }}
      {...props}
    >
      {items.length === 0 ? (
        <div
          className="px-2 py-3 text-center text-sm text-muted-foreground"
          aria-live="polite"
        >
          {emptyLabel}
        </div>
      ) : (
        items.map((item, index) => {
          const active = index === activeIndex
          return (
            <div
              key={item.id}
              id={id ? mentionOptionId(id, index) : undefined}
              role="option"
              aria-selected={active}
              data-slot="mention-option"
              data-active={active || undefined}
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSelect?.(index)}
              onPointerEnter={() => onHoverItem?.(index)}
              className={cn(
                "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-hidden select-none",
                active &&
                  "bg-accent text-accent-foreground ring-1 ring-border ring-inset dark:bg-(--ds-color-neutral-200)"
              )}
            >
              {renderOption ? (
                renderOption(item, { active, trigger: resolvedTrigger, query })
              ) : (
                <MentionOptionRow
                  item={item}
                  trigger={resolvedTrigger}
                  query={query}
                />
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

function MentionOptionRow({
  item,
  trigger,
  query,
}: {
  item: MentionItem
  trigger: string
  query: string
}) {
  const name = item.label ?? item.value
  const showAvatar = trigger === "@" || item.avatarUrl !== undefined
  // The right-hand token previews what gets inserted (`@maya`); skip it
  // when it would just duplicate the visible label (typical for # tags).
  const showToken = name !== item.value
  return (
    <>
      {showAvatar ? (
        <Avatar className="shrink-0">
          {item.avatarUrl ? <AvatarImage src={item.avatarUrl} alt="" /> : null}
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
      ) : (
        <span
          aria-hidden="true"
          className="border bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-sm font-code text-sm"
        >
          {trigger}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-sm leading-tight",
            // Slug-style labels (# tags) are identifiers → IBM Plex Mono,
            // matching the chip they insert; display names stay Inter.
            showToken ? "font-medium" : "font-code font-normal"
          )}
        >
          <Highlight text={name} query={query} />
        </span>
        {item.description ? (
          <span className="text-muted-foreground truncate text-xs leading-tight">
            {item.description}
          </span>
        ) : null}
      </span>
      {showToken ? (
        <span className="text-muted-foreground ms-auto shrink-0 font-code text-xs">
          {trigger}
          {item.value}
        </span>
      ) : null}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* MentionPopup                                                        */
/* ------------------------------------------------------------------ */

export interface MentionPopupProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  items: MentionItem[]
  /** Index of the keyboard-active row. */
  activeIndex?: number
  /** Trigger glyph shown in the header (`@`, `#`, …). */
  trigger?: string | null
  /** Current query, echoed in the header. */
  query?: string
  /** Heading; defaults from the trigger (`People` / `Tags`). */
  label?: string
  /** `role="listbox"` id — also used to build option ids. */
  listboxId?: string
  /** Which side of the anchor point the popup opens on. */
  placement?: "top" | "bottom"
  /** Keyboard hints footer (arrows / enter / escape). */
  showHints?: boolean
  /** Copy shown when `items` is empty. */
  emptyLabel?: string
  /** List scroll cap in px (default 288). */
  maxHeight?: number
  /** Called with the row index on click. */
  onSelect?: (index: number) => void
  /** Called when a row is hovered (moves the active row). */
  onHoverItem?: (index: number) => void
  /** Custom row renderer. */
  renderOption?: (item: MentionItem, state: MentionOptionState) => React.ReactNode
}

function MentionPopup({
  items,
  activeIndex = 0,
  trigger = "@",
  query = "",
  label,
  listboxId,
  placement = "bottom",
  showHints = false,
  emptyLabel = "No matches",
  maxHeight = 288,
  onSelect,
  onHoverItem,
  renderOption,
  className,
  style,
  ...props
}: MentionPopupProps) {
  const autoId = React.useId()
  const resolvedListboxId = listboxId ?? `mention-listbox-${autoId}`
  const heading =
    label ?? (trigger === "@" ? "People" : trigger === "#" ? "Tags" : `Mention ${trigger}`)

  return (
    <div
      data-slot="mention-popup"
      data-placement={placement}
      className={cn(
        "animate-in fade-in-0 zoom-in-95 absolute z-50 w-64 duration-150",
        // The popup is anchored to the caret line (~12px inside the field),
        // so lifting by 100% + 20px keeps ~8px of clear air between the
        // popup's bottom border and the field's top border — the floating
        // surface reads as a distinct overlay instead of sitting flush.
        placement === "top"
          ? "[transform:translateY(calc(-100%_-_20px))]"
          : "translate-y-1.5",
        className
      )}
      style={style}
      {...props}
    >
      <div className="bg-popover text-popover-foreground overflow-hidden rounded-lg border shadow-md">
        <div className="flex items-center justify-between gap-2 border-b px-2.5 py-1.5">
          <span className="text-muted-foreground text-xs font-medium">
            {heading}
          </span>
          <span className="text-muted-foreground font-code text-xs" aria-hidden="true">
            {trigger}
            {query}
          </span>
        </div>
        <MentionList
          id={resolvedListboxId}
          items={items}
          activeIndex={activeIndex}
          trigger={trigger}
          query={query}
          maxHeight={maxHeight}
          emptyLabel={emptyLabel}
          onSelect={onSelect}
          onHoverItem={onHoverItem}
          renderOption={renderOption}
        />
        {showHints ? (
          // Tight gaps/padding keep all three hint groups on one line inside
          // the w-64 popup (~218px of content); flex-wrap stays as the
          // graceful fallback if font metrics ever change.
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 border-t px-2 py-1.5">
            <span className="flex items-center gap-1 text-[11px]">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              navigate
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Kbd>↵</Kbd>
              select
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Kbd>esc</Kbd>
              close
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MentionInput                                                        */
/* ------------------------------------------------------------------ */

const mentionFieldClass =
  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 min-h-16 w-full whitespace-pre-wrap break-words rounded-md border bg-transparent px-3 py-2 text-base leading-6 shadow-xs transition-colors outline-none focus-visible:ring-[3px] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 md:text-sm empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"

export interface MentionInputProps
  extends Omit<
    React.ComponentProps<"div">,
    | "onChange"
    | "defaultValue"
    | "placeholder"
    | "children"
    | "content"
    | "contentEditable"
    | "dangerouslySetInnerHTML"
    | "suppressContentEditableWarning"
  > {
  /** Trigger configurations — order defines detection priority. */
  mentions: MentionTriggerConfig[]
  /** Placeholder shown when the field is empty. */
  placeholder?: string
  /**
   * Initial content: plain text (newlines allowed) and/or pre-inserted
   * mention chips. Uncontrolled after mount.
   */
  defaultValue?: string | MentionSegment[]
  /**
   * Opens the popup at mount: the trigger + query are appended after the
   * initial value and the caret is placed after them, as if the user had
   * just typed them.
   */
  defaultQuery?: { trigger: string; query: string }
  /** Focus the field on mount. */
  autoFocus?: boolean
  /** Disables editing (read-only chips + text). */
  disabled?: boolean
  /** Preferred popup side relative to the caret line. */
  placement?: "top" | "bottom"
  /** Maximum suggestion rows (default 8). */
  limit?: number
  /** Keyboard hints footer inside the popup. */
  showHints?: boolean
  /** Extra classes for the popup (width overrides change clamping). */
  popupClassName?: string
  /** Fires on every edit with the plain text and mention records. */
  onChange?: (value: MentionValue) => void
  /** Fires when a suggestion is inserted. */
  onMentionSelect?: (item: MentionItem, trigger: string) => void
  /** Custom suggestion row renderer. */
  renderOption?: (
    item: MentionItem,
    state: MentionOptionState
  ) => React.ReactNode
}

function MentionInput({
  mentions,
  placeholder,
  defaultValue,
  defaultQuery,
  autoFocus = false,
  disabled = false,
  placement = "bottom",
  limit,
  showHints = false,
  popupClassName,
  onChange,
  onMentionSelect,
  renderOption,
  className,
  onInput,
  onKeyDown,
  onKeyUp,
  onClick,
  onBlur,
  onPaste,
  ...props
}: MentionInputProps) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const editorRef = React.useRef<HTMLDivElement | null>(null)
  const initializedRef = React.useRef(false)
  const detectionRef = React.useRef<MentionDetection | null>(null)

  const mention = useMention({ triggers: mentions, limit })
  /** Caret rect (relative to the wrapper) + wrapper width, captured at
   *  anchor time so the popup clamp never reads a ref during render. */
  const [anchor, setAnchor] = React.useState<{
    x: number
    top: number
    bottom: number
    width: number
  } | null>(null)

  const listboxId = React.useId()

  // Latest-callback refs so the once-only mount effect and DOM handlers
  // never capture stale closures.
  const onChangeRef = React.useRef(onChange)
  const onSelectRef = React.useRef(onMentionSelect)
  React.useEffect(() => {
    onChangeRef.current = onChange
    onSelectRef.current = onMentionSelect
  })

  const chipVariantFor = React.useCallback(
    (trigger: string): "mention" | "tag" | undefined =>
      mentions.find((t) => t.trigger === trigger)?.chipVariant,
    [mentions]
  )

  /** Caret line rect, relative to the wrapper, for popup anchoring. */
  const updateAnchor = React.useCallback(() => {
    const wrapper = wrapperRef.current
    const editor = editorRef.current
    const selection = window.getSelection()
    if (!wrapper || !editor || !selection || selection.rangeCount === 0) return
    const range = selection.getRangeAt(0)
    let x: number | null = null
    let top = 0
    let bottom = 0
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      const node = range.startContainer as Text
      const probe = document.createRange()
      probe.setStart(node, Math.max(0, range.startOffset - 40))
      probe.setEnd(node, range.startOffset)
      const rects = probe.getClientRects()
      if (rects.length > 0) {
        const last = rects[rects.length - 1]
        if (last) {
          x = last.right
          top = last.top
          bottom = last.bottom
        }
      }
    }
    if (x === null) {
      const rect = editor.getBoundingClientRect()
      x = rect.left + 12
      top = rect.top + 6
      bottom = rect.top + 30
    }
    const wrapRect = wrapper.getBoundingClientRect()
    setAnchor({
      x: x - wrapRect.left,
      top: top - wrapRect.top,
      bottom: bottom - wrapRect.top,
      width: wrapRect.width,
    })
  }, [])

  const runDetection = React.useCallback(() => {
    const editor = editorRef.current
    const selection = window.getSelection()
    if (
      !editor ||
      !selection ||
      selection.rangeCount === 0 ||
      !selection.isCollapsed
    ) {
      mention.close()
      detectionRef.current = null
      return
    }
    const range = selection.getRangeAt(0)
    const container = range.startContainer
    if (
      container.nodeType !== Node.TEXT_NODE ||
      !editor.contains(container)
    ) {
      mention.close()
      detectionRef.current = null
      return
    }
    const textNode = container as Text
    const before = (textNode.textContent ?? "").slice(0, range.startOffset)
    const found = mention.detect(before)
    if (!found) {
      detectionRef.current = null
      return
    }
    detectionRef.current = {
      trigger: found.trigger,
      query: found.query,
      textNode,
      start: range.startOffset - found.query.length - 1,
      end: range.startOffset,
    }
    updateAnchor()
  }, [mention, updateAnchor])

  /* Mount: seed the editable DOM once (never via React children, so the
     imperative chip/text DOM stays invisible to the reconciler). */
  React.useEffect(() => {
    const editor = editorRef.current
    if (!editor || initializedRef.current) return
    initializedRef.current = true

    editor.innerHTML = buildInitialHtml(defaultValue)

    if (defaultQuery && !disabled) {
      const tail = defaultQuery.trigger + defaultQuery.query
      const lastText = lastTextNode(editor)
      const alreadyTyped = (lastText?.textContent ?? "").endsWith(tail)
      if (!alreadyTyped) {
        // Keep a space between a trailing chip and the typed query.
        const afterChip =
          editor.lastChild !== null &&
          editor.lastChild.nodeType !== Node.TEXT_NODE
        editor.appendChild(
          document.createTextNode((afterChip ? "\u00A0" : "") + tail)
        )
      }
    }

    if (autoFocus) editor.focus()
    if (defaultQuery && !disabled) {
      placeCaretAtEnd(editor)
      runDetection()
    }
    onChangeRef.current?.(getMentionValue(editor))
    // Mount-only seeding: the editable DOM is imperative and intentionally
    // excluded from the React render cycle, so this runs once by design.
  }, [])

  /* Keep the popup glued to the caret across font loads / resize. */
  React.useEffect(() => {
    if (!mention.open) return
    updateAnchor()
    const raf = requestAnimationFrame(updateAnchor)
    const timer = setTimeout(updateAnchor, 300)
    void document.fonts?.ready?.then(() => updateAnchor()).catch(() => {})
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [mention.open, updateAnchor])

  const insertMention = React.useCallback(
    (item: MentionItem, detection: MentionDetection) => {
      const editor = editorRef.current
      const selection = window.getSelection()
      if (!editor || !selection) return
      if (document.activeElement !== editor) editor.focus()

      const range = document.createRange()
      try {
        range.setStart(detection.textNode, detection.start)
        range.setEnd(detection.textNode, detection.end)
      } catch {
        mention.close()
        return
      }
      range.deleteContents()

      const chip = createChipElement(
        item,
        detection.trigger,
        chipVariantFor(detection.trigger)
      )
      const space = document.createTextNode("\u00A0")
      const fragment = document.createDocumentFragment()
      fragment.appendChild(chip)
      fragment.appendChild(space)
      range.insertNode(fragment)

      const caret = document.createRange()
      caret.setStart(space, 1)
      caret.collapse(true)
      selection.removeAllRanges()
      selection.addRange(caret)

      mention.close()
      detectionRef.current = null
      onChangeRef.current?.(getMentionValue(editor))
      onSelectRef.current?.(item, detection.trigger)
    },
    [mention, chipVariantFor]
  )

  const commitActive = React.useCallback(() => {
    const detection = detectionRef.current
    if (!detection) {
      mention.close()
      return
    }
    const item = mention.items[mention.activeIndex]
    if (!item) return
    insertMention(item, detection)
  }, [insertMention, mention])

  const handleInput = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      onInput?.(event)
      const editor = event.currentTarget
      // Restore the :empty placeholder once all content is gone.
      if (
        editor.textContent === "" &&
        editor.innerHTML !== "" &&
        document.activeElement !== editor
      ) {
        editor.innerHTML = ""
      }
      onChangeRef.current?.(getMentionValue(editor))
      runDetection()
    },
    [onInput, runDetection]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (mention.open) {
        if (event.key === "ArrowDown") {
          event.preventDefault()
          mention.moveActive(1)
          return
        }
        if (event.key === "ArrowUp") {
          event.preventDefault()
          mention.moveActive(-1)
          return
        }
        if (
          (event.key === "Enter" && !event.shiftKey) ||
          event.key === "Tab"
        ) {
          if (mention.items.length === 0) {
            mention.close()
            return
          }
          event.preventDefault()
          commitActive()
          return
        }
        if (event.key === "Escape") {
          event.preventDefault()
          mention.close()
          return
        }
      }
    },
    [commitActive, mention, onKeyDown]
  )

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(event)
      mention.close()
      const editor = event.currentTarget
      if (editor.textContent === "" && editor.innerHTML !== "") {
        editor.innerHTML = ""
      }
    },
    [mention, onBlur]
  )

  const handlePaste = React.useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      onPaste?.(event)
      if (event.defaultPrevented || disabled) return
      event.preventDefault()
      const text = event.clipboardData.getData("text/plain")
      if (!text) return
      document.execCommand("insertText", false, text)
    },
    [disabled, onPaste]
  )

  const popupStyle = React.useMemo(() => {
    if (!anchor) return undefined
    const maxLeft = Math.max(4, anchor.width - MENTION_POPUP_WIDTH - 4)
    const left = Math.min(Math.max(4, anchor.x), maxLeft)
    return {
      left,
      top: placement === "top" ? anchor.top : anchor.bottom,
    }
  }, [anchor, placement])

  const activeIndex = mention.activeIndex

  return (
    <div ref={wrapperRef} data-slot="mention-input" className="relative w-full">
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props -- aria-expanded is valid on role="textbox" per ARIA 1.2; jsx-a11y's role map predates it */}
      <div
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={mention.open}
        aria-controls={mention.open ? listboxId : undefined}
        aria-activedescendant={
          mention.open && mention.items.length > 0
            ? mentionOptionId(listboxId, activeIndex)
            : undefined
        }
        aria-disabled={disabled || undefined}
        aria-readonly={disabled || undefined}
        contentEditable={!disabled}
        spellCheck
        data-disabled={disabled || undefined}
        data-placeholder={placeholder}
        className={cn(mentionFieldClass, className)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={(event) => {
          onKeyUp?.(event)
          runDetection()
        }}
        onClick={(event) => {
          onClick?.(event)
          runDetection()
        }}
        onBlur={handleBlur}
        onPaste={handlePaste}
        {...props}
      />
      {mention.open && anchor ? (
        <MentionPopup
          items={mention.items}
          activeIndex={activeIndex}
          trigger={mention.trigger}
          query={mention.query}
          label={mention.triggerConfig?.label}
          listboxId={listboxId}
          placement={placement}
          showHints={showHints}
          onSelect={(index) => {
            const detection = detectionRef.current
            const item = mention.items[index]
            if (!detection || !item) {
              mention.close()
              return
            }
            insertMention(item, detection)
          }}
          onHoverItem={mention.setActiveIndex}
          renderOption={renderOption}
          className={popupClassName}
          style={popupStyle}
        />
      ) : null}
    </div>
  )
}

export {
  MentionInput,
  MentionPopup,
  MentionList,
  MentionChip,
  MentionTag,
}
