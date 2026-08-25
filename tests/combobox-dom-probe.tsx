/* Behavioral DOM probe for src/components/ui/combobox.tsx (R4-C9).
   Uses happy-dom (installed ephemerally in /tmp/hdom — project deps untouched).
   Run with: bun tests/combobox-dom-probe.tsx */
import * as React from "react"
import { createRoot, type Root } from "react-dom/client"

/* ----------------------------- DOM environment ---------------------------- */

const happyDom = await import("/tmp/hdom/node_modules/happy-dom")
const window = new happyDom.Window() as unknown as Window & typeof globalThis
const document = window.document

const g = globalThis as unknown as Record<string, unknown>
g.window = window
g.document = document
g.navigator = window.navigator
g.MutationObserver = window.MutationObserver
for (const key of [
  "Node",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLButtonElement",
  "HTMLDivElement",
  "SVGElement",
  "Document",
  "DocumentFragment",
  "ShadowRoot",
  "Text",
  "Comment",
  "CharacterData",
  "CustomEvent",
  "InputEvent",
  "KeyboardEvent",
  "MouseEvent",
  "FocusEvent",
  "WheelEvent",
  "Event",
  "EventTarget",
  "DOMRect",
  "Range",
  "Selection",
]) {
  const ctor = (window as unknown as Record<string, unknown>)[key]
  if (ctor && !g[key]) g[key] = ctor
}
g.getComputedStyle = window.getComputedStyle.bind(window)
g.requestAnimationFrame = (cb: FrameRequestCallback) =>
  window.setTimeout(() => cb(window.performance.now()), 0) as unknown as number
g.cancelAnimationFrame = (id: number) => window.clearTimeout(id)
g.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
g.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
if (!window.Element.prototype.scrollIntoView) {
  ;(window.Element.prototype as unknown as Record<string, unknown>).scrollIntoView = () => {}
}

const tick = (ms = 30) => new Promise((resolve) => window.setTimeout(resolve, ms))

let failures = 0
function assert(cond: unknown, msg: string) {
  if (!cond) {
    failures += 1
    console.error("FAIL:", msg)
  } else {
    console.log("ok:", msg)
  }
}

function fire(el: Element, type: string, init: Record<string, unknown> = {}) {
  const EventCtor =
    (window as unknown as Record<string, unknown>)[
      type === "keydown" || type === "keyup"
        ? "KeyboardEvent"
        : type === "click" || type === "mousedown" || type === "pointerdown"
          ? "MouseEvent"
          : type === "focus" || type === "blur" || type === "focusin"
            ? "FocusEvent"
            : "Event"
    ] as new (type: string, init?: Record<string, unknown>) => Event
  el.dispatchEvent(new EventCtor(type, { bubbles: true, cancelable: true, ...init }))
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set
  setter?.call(input, value)
  fire(input, "input", { bubbles: true })
}

async function withRoot(render: (root: Root) => void, run: () => Promise<void>) {
  const container = document.createElement("div")
  document.body.appendChild(container)
  const root = createRoot(container)
  render(root)
  await tick(50)
  await run()
  root.unmount()
  await tick(30)
  container.remove()
}

/* ------------------------------- Components ------------------------------- */

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

function Basic() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const countries = [
  { code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
]

function Popup() {
  return (
    <Combobox items={countries} defaultValue={countries[0]}>
      <ComboboxTrigger
        render={
          <Button variant="outline" className="w-64 justify-between font-normal">
            <ComboboxValue />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: (typeof countries)[number]) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const timezones = [
  { value: "Americas", items: ["(GMT-5) New York", "(GMT-8) Los Angeles"] },
  { value: "Europe", items: ["(GMT+0) London", "(GMT+1) Paris"] },
]

function Groups() {
  return (
    <Combobox items={timezones}>
      <ComboboxInput placeholder="Select a timezone" />
      <ComboboxContent className="w-60">
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof timezones)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < timezones.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function Multiple() {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0]]}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function Clearable() {
  return (
    <Combobox items={frameworks} defaultValue={frameworks[0]}>
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/* --------------------------------- Imports (after DOM globals) -------------------------------- */

const { Button } = await import("@/components/ui/button")
const {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxChip,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} = await import("@/components/ui/combobox")

/* ---------------------------------- Tests --------------------------------- */

// 1. Basic: focus opens, filter works, empty state, keyboard select.
await withRoot((root) => root.render(<Basic />), async () => {
  const input = document.querySelector('[data-slot="combobox-input-field"]') as HTMLInputElement
  assert(input != null, "basic: input rendered")

  fire(input, "focus")
  fire(input, "focusin")
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-content"]') != null,
    "basic: popover opens on focus"
  )
  assert(
    document.querySelectorAll('[role="option"]').length === frameworks.length,
    "basic: all 5 options rendered"
  )
  assert(
    document.querySelector('[data-slot="combobox-empty"]') == null,
    "basic: empty hidden when matches exist"
  )

  // Type a filter.
  setInputValue(input, "nuxt")
  await tick(80)
  assert(
    document.querySelectorAll('[role="option"]').length === 1,
    "basic: filtering narrows options"
  )
  assert(
    document.querySelector('[role="option"]')?.textContent === "Nuxt.js",
    "basic: matching option rendered"
  )

  // No match -> empty state.
  setInputValue(input, "zzz")
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-empty"]') != null,
    "basic: empty state when nothing matches"
  )

  // Filter again and select with keyboard.
  setInputValue(input, "re")
  await tick(80)
  fire(input, "keydown", { key: "ArrowDown" })
  await tick(50)
  const highlighted = document.querySelector("[data-highlighted]")
  assert(highlighted != null, "basic: ArrowDown highlights an item")
  fire(input, "keydown", { key: "Enter" })
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-content"]') == null,
    "basic: popover closes after selecting"
  )
  assert(input.value === "Remix", `basic: input shows selection (got "${input.value}")`)
})

// 2. Basic: arrow navigation order + Escape closes.
await withRoot((root) => root.render(<Basic />), async () => {
  const input = document.querySelector('[data-slot="combobox-input-field"]') as HTMLInputElement
  fire(input, "focus")
  fire(input, "focusin")
  await tick(80)
  fire(input, "keydown", { key: "ArrowDown" })
  await tick(40)
  assert(
    document.querySelector("[data-highlighted]")?.textContent === "Next.js",
    "nav: first ArrowDown highlights first item"
  )
  fire(input, "keydown", { key: "ArrowDown" })
  await tick(40)
  assert(
    document.querySelector("[data-highlighted]")?.textContent === "SvelteKit",
    "nav: second ArrowDown moves down"
  )
  fire(input, "keydown", { key: "ArrowUp" })
  await tick(40)
  assert(
    document.querySelector("[data-highlighted]")?.textContent === "Next.js",
    "nav: ArrowUp moves back up"
  )
  fire(input, "keydown", { key: "End" })
  await tick(40)
  assert(
    document.querySelector("[data-highlighted]")?.textContent === "Astro",
    "nav: End highlights last item"
  )
  fire(input, "keydown", { key: "Escape" })
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-content"]') == null,
    "nav: Escape closes the popover"
  )
})

// 3. Popup: trigger toggles, inner input auto-focuses + filters, select updates trigger label.
await withRoot((root) => root.render(<Popup />), async () => {
  const trigger = document.querySelector('[data-slot="combobox-trigger"]') as HTMLElement
  assert(trigger?.textContent === "Argentina", "popup: trigger shows default value")
  fire(trigger, "click")
  await tick(120)
  assert(
    document.querySelector('[data-slot="combobox-content"]') != null,
    "popup: clicking trigger opens the popover"
  )
  const search = document.querySelector(
    '[data-slot="combobox-input-field"]'
  ) as HTMLInputElement
  assert(search != null, "popup: internal search input rendered")
  assert(
    document.activeElement === search,
    "popup: internal input auto-focused on open"
  )
  setInputValue(search, "jap")
  await tick(80)
  assert(
    document.querySelectorAll('[role="option"]').length === 1,
    "popup: internal input filters the list"
  )
  const option = document.querySelector('[role="option"]') as HTMLElement
  fire(option, "click")
  await tick(120)
  assert(
    document.querySelector('[data-slot="combobox-content"]') == null,
    "popup: popover closes after selection"
  )
  assert(
    (document.querySelector('[data-slot="combobox-trigger"]') as HTMLElement)?.textContent ===
      "Japan",
    "popup: trigger shows new selection"
  )
  assert(
    (document.querySelector('[data-slot="combobox-trigger"]') as HTMLElement)?.getAttribute(
      "aria-expanded"
    ) === "false",
    "popup: trigger aria-expanded=false after close"
  )
})

// 4. Groups: group rendering + filtering drops empty groups + cross-group navigation.
await withRoot((root) => root.render(<Groups />), async () => {
  const input = document.querySelector('[data-slot="combobox-input-field"]') as HTMLInputElement
  fire(input, "focus")
  fire(input, "focusin")
  await tick(80)
  assert(
    document.querySelectorAll('[data-slot="combobox-group"]').length === 2,
    "groups: two groups rendered"
  )
  assert(
    document.querySelectorAll('[data-slot="combobox-label"]').length === 2,
    "groups: labels rendered"
  )
  assert(
    document.querySelectorAll('[data-slot="combobox-separator"]').length === 1,
    "groups: separator between groups"
  )
  assert(
    document.querySelectorAll('[role="option"]').length === 4,
    "groups: all items rendered across groups"
  )

  // Filter to an item in the second group only.
  setInputValue(input, "paris")
  await tick(80)
  assert(
    document.querySelectorAll('[data-slot="combobox-group"]').length === 1,
    "groups: filtering drops non-matching groups"
  )
  assert(
    document.querySelector('[role="option"]')?.textContent === "(GMT+1) Paris",
    "groups: group item matches filter"
  )

  // Clear filter, navigate across groups, select.
  setInputValue(input, "")
  await tick(80)
  fire(input, "keydown", { key: "ArrowDown" })
  fire(input, "keydown", { key: "ArrowDown" })
  fire(input, "keydown", { key: "ArrowDown" })
  await tick(60)
  assert(
    document.querySelector("[data-highlighted]")?.textContent === "(GMT-8) Los Angeles",
    "groups: navigation crosses group boundaries"
  )
  fire(input, "keydown", { key: "Enter" })
  await tick(100)
  assert(input.value === "(GMT-8) Los Angeles", "groups: selection shown in input")
})

// 5. Multiple: toggle selection keeps popover open, chips update, backspace + click remove.
await withRoot((root) => root.render(<Multiple />), async () => {
  const chipsInput = document.querySelector(
    '[data-slot="combobox-chips-input"]'
  ) as HTMLInputElement
  assert(chipsInput != null, "multiple: chips input rendered")
  assert(
    document.querySelectorAll('[data-slot="combobox-chip"]').length === 1,
    "multiple: default chip rendered"
  )

  fire(chipsInput, "focus")
  fire(chipsInput, "focusin")
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-content"]') != null,
    "multiple: popover opens on chips input focus"
  )
  // autoHighlight + defaultValue: first item highlighted.
  assert(
    document.querySelector("[data-highlighted]")?.textContent === "Next.js",
    "multiple: autoHighlight highlights first item"
  )

  // Select via Enter (toggles "Next.js" off since it is the default).
  fire(chipsInput, "keydown", { key: "Enter" })
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-content"]') != null,
    "multiple: popover stays open after selecting"
  )
  assert(
    document.querySelectorAll('[data-slot="combobox-chip"]').length === 0,
    "multiple: toggling selected item removes chip"
  )

  // Add two more.
  fire(chipsInput, "keydown", { key: "ArrowDown" })
  fire(chipsInput, "keydown", { key: "ArrowDown" })
  await tick(40)
  fire(chipsInput, "keydown", { key: "Enter" })
  await tick(60)
  fire(chipsInput, "keydown", { key: "ArrowDown" })
  await tick(40)
  fire(chipsInput, "keydown", { key: "Enter" })
  await tick(80)
  const chips = Array.from(document.querySelectorAll('[data-slot="combobox-chip"]')).map(
    (el) => el.textContent
  )
  assert(
    chips.join(",") === "Nuxt.js,Remix",
    `multiple: chips updated after selections (got ${chips.join(",")})`
  )

  // Backspace with empty input removes the last chip.
  fire(chipsInput, "keydown", { key: "Backspace" })
  await tick(60)
  const chipsAfterBackspace = Array.from(
    document.querySelectorAll('[data-slot="combobox-chip"]'
    )
  ).map((el) => el.textContent)
  assert(
    chipsAfterBackspace.join(",") === "Nuxt.js",
    "multiple: Backspace removes last chip"
  )

  // Clicking a chip removes it.
  const chip = document.querySelector('[data-slot="combobox-chip"]') as HTMLElement
  fire(chip, "click")
  await tick(60)
  assert(
    document.querySelectorAll('[data-slot="combobox-chip"]').length === 0,
    "multiple: clicking a chip removes it"
  )

  fire(chipsInput, "keydown", { key: "Escape" })
  await tick(80)
  assert(
    document.querySelector('[data-slot="combobox-content"]') == null,
    "multiple: Escape closes popover"
  )
})

// 6. Clear button clears the selection.
await withRoot((root) => root.render(<Clearable />), async () => {
  const input = document.querySelector('[data-slot="combobox-input-field"]') as HTMLInputElement
  assert(input.value === "Next.js", "clear: input shows default selection")
  const clear = document.querySelector('[data-slot="combobox-clear"]') as HTMLButtonElement
  assert(clear != null, "clear: clear button rendered")
  fire(clear, "click")
  await tick(60)
  assert(input.value === "", "clear: selection cleared from input")
  assert(
    document.querySelector('[data-slot="combobox-clear"]') == null,
    "clear: clear button hidden when empty"
  )
})

console.log(failures === 0 ? "\nAll DOM probe assertions passed." : `\n${failures} FAILURES`)
process.exit(failures === 0 ? 0 : 1)
