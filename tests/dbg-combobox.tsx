import * as React from "react"
import { createRoot } from "react-dom/client"

const happyDom = await import("/tmp/hdom/node_modules/happy-dom")
const window = new happyDom.Window() as unknown as Window & typeof globalThis
const document = window.document
const g = globalThis as unknown as Record<string, unknown>
g.window = window
g.document = document
g.navigator = window.navigator
g.MutationObserver = window.MutationObserver
for (const key of ["Node","Element","HTMLElement","HTMLInputElement","HTMLButtonElement","HTMLDivElement","SVGElement","Document","DocumentFragment","ShadowRoot","Text","Comment","CharacterData","CustomEvent","InputEvent","KeyboardEvent","MouseEvent","FocusEvent","WheelEvent","Event","EventTarget","DOMRect","Range","Selection"]) {
  const ctor = (window as unknown as Record<string, unknown>)[key]
  if (ctor && !g[key]) g[key] = ctor
}
g.getComputedStyle = window.getComputedStyle.bind(window)
g.requestAnimationFrame = (cb: FrameRequestCallback) => window.setTimeout(() => cb(window.performance.now()), 0) as unknown as number
g.cancelAnimationFrame = (id: number) => window.clearTimeout(id)
g.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }
g.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return [] } }
if (!window.Element.prototype.scrollIntoView) {
  ;(window.Element.prototype as unknown as Record<string, unknown>).scrollIntoView = () => {}
}
const tick = (ms = 30) => new Promise((r) => window.setTimeout(r, ms))
function fire(el: Element, type: string, init: Record<string, unknown> = {}) {
  const Ctor = (window as unknown as Record<string, unknown>)[
    type === "keydown" ? "KeyboardEvent" : type === "click" ? "MouseEvent" : type === "focus" || type === "focusin" ? "FocusEvent" : "Event"
  ] as new (t: string, i?: Record<string, unknown>) => Event
  el.dispatchEvent(new Ctor(type, { bubbles: true, cancelable: true, ...init }))
}
function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
  setter?.call(input, value)
  fire(input, "input", { bubbles: true })
}

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]
const { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem } = await import("@/components/ui/combobox")

const container = document.createElement("div")
document.body.appendChild(container)
const root = createRoot(container)
root.render(
  <Combobox items={frameworks}>
    <ComboboxInput placeholder="Select a framework" />
    <ComboboxContent>
      <ComboboxEmpty>No items found.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
)
await tick(50)
const input = document.querySelector('[data-slot="combobox-input-field"]') as HTMLInputElement
fire(input, "focus"); fire(input, "focusin")
await tick(80)
console.log("after open, options:", document.querySelectorAll('[role="option"]').length)
setInputValue(input, "nuxt")
await tick(150)
console.log("after typing 'nuxt': input.value =", JSON.stringify(input.value))
console.log("options:", document.querySelectorAll('[role="option"]').length)
console.log("empty:", document.querySelector('[data-slot="combobox-empty"]')?.textContent ?? null)
console.log("body snippet:", document.body.innerHTML.slice(0, 1200))
