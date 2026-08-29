"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import {
  MentionChip,
  MentionPopup as MentionPopupSurface,
  filterMentionItems,
} from "@/components/ui/mention"
import type { MentionItem } from "@/components/ui/mention"

const DIRECTORY: MentionItem[] = [
  { id: "u-maya", value: "maya", label: "Maya Okafor", description: "Design lead" },
  { id: "u-marcus", value: "marcus", label: "Marcus Webb", description: "Backend" },
  { id: "u-dana", value: "dana", label: "Dana Whitfield", description: "QA" },
  { id: "u-priya", value: "priya", label: "Priya Raman", description: "Product" },
  { id: "u-mei", value: "mei", label: "Mei Chen", description: "iOS" },
]

/**
 * Popup anatomy — the exported `MentionPopup` listbox composed by hand
 * against a plain input: filtered rows (avatar + name + username), the
 * active row highlighted, and the keyboard hints footer built from `Kbd`.
 */
export function MentionPopup() {
  const [value, setValue] = React.useState("@re")
  const [open, setOpen] = React.useState(true)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<MentionItem | null>(null)

  const query = value.startsWith("@") ? value.slice(1) : ""
  const items = React.useMemo(
    () => filterMentionItems(DIRECTORY, query),
    [query]
  )
  const active = items.length === 0 ? 0 : Math.min(activeIndex, items.length - 1)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || items.length === 0) return
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((active + 1) % items.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((active - 1 + items.length) % items.length)
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault()
      setSelected(items[active] ?? null)
      setOpen(false)
    } else if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div className="flex w-full max-w-[640px] flex-col items-start gap-3">
      <div className="relative flex w-full flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">
          Search the team directory
        </span>
        <Input
          aria-label="Search the team directory"
          value={value}
          placeholder="Type @ and a name…"
          onChange={(event) => {
            setValue(event.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onKeyDown={handleKeyDown}
        />
        {open ? (
          <MentionPopupSurface
            items={items}
            activeIndex={active}
            trigger="@"
            query={query}
            label="People"
            showHints
            placement="bottom"
            style={{ left: 0, top: "100%" }}
            onSelect={(index) => {
              setSelected(items[index] ?? null)
              setOpen(false)
            }}
            onHoverItem={setActiveIndex}
          />
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          move between rows
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Kbd>↵</Kbd>
          insert mention
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Kbd>esc</Kbd>
          dismiss
        </span>
      </div>
      {selected ? (
        <p className="flex items-center gap-1.5 text-sm text-foreground">
          Selected:
          <MentionChip>{selected.label ?? selected.value}</MentionChip>
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">
          Press <span className="font-medium text-foreground">Enter</span> to
          insert the highlighted row as a chip.
        </p>
      )}
    </div>
  )
}
