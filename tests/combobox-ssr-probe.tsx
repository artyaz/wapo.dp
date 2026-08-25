/* SSR smoke probe for src/components/ui/combobox.tsx (R4-C9).
   Lives in tests/ (excluded from tsc) — run with: bun tests/combobox-ssr-probe.tsx */
import * as React from "react"
import { renderToString } from "react-dom/server"

import { Button } from "@/components/ui/button"
import {
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
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const

const countries = [
  { code: "us", value: "united-states", label: "United States", continent: "North America" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
]

const timezones = [
  {
    value: "Americas",
    items: ["(GMT-5) New York", "(GMT-8) Los Angeles"],
  },
  {
    value: "Europe",
    items: ["(GMT+0) London", "(GMT+1) Paris"],
  },
] as const

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg)
    process.exitCode = 1
  } else {
    console.log("ok:", msg)
  }
}

// 1. Basic (closed) — input wrapper, chevron, aria wiring.
{
  const html = renderToString(
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  assert(html.includes('data-slot="combobox-input"'), "basic: combobox-input wrapper")
  assert(html.includes('data-slot="combobox-input-field"'), "basic: input field")
  assert(html.includes('placeholder="Select a framework"'), "basic: placeholder passthrough")
  assert(html.includes('role="combobox"'), "basic: input role=combobox")
  assert(html.includes('aria-haspopup="listbox"'), "basic: aria-haspopup")
  assert(html.includes('aria-expanded="false"'), "basic: aria-expanded")
  assert(html.includes('data-slot="combobox-clear"') === false, "basic: no clear button without showClear")
  assert(html.includes("Next.js") === false, "basic: listbox closed, no items rendered")
}

// 2. defaultValue + showClear — selection shown in the input, clear button rendered.
{
  const html = renderToString(
    <Combobox items={frameworks} defaultValue={frameworks[0]}>
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  assert(html.includes('value="Next.js"'), "clear-button: default selection displayed in input")
  assert(html.includes('data-slot="combobox-clear"'), "clear-button: clear button rendered")
  assert(html.includes('aria-label="Clear"'), "clear-button: clear aria-label")
}

// 3. Popup — render prop trigger; children of the rendered element preserved.
{
  const html = renderToString(
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
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  assert(html.includes("United States"), "popup: ComboboxValue children preserved via render prop")
  assert(html.includes('data-slot="combobox-trigger"'), "popup: trigger data-slot")
  assert(html.includes('aria-haspopup="listbox"'), "popup: trigger aria-haspopup=listbox")
  assert(html.includes('aria-expanded="false"'), "popup: trigger aria-expanded")
  assert(html.includes("w-64"), "popup: rendered element keeps its own classes")
  assert(html.includes('data-slot="button"'), "popup: rendered Button intact")
}

// 4. Custom items — itemToStringValue drives the displayed value.
{
  const html = renderToString(
    <Combobox items={countries} itemToStringValue={(c) => c.label} defaultValue={countries[1]}>
      <ComboboxInput placeholder="Search countries..." aria-invalid="true" />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country) => (
            <ComboboxItem key={country.code} value={country}>
              {country.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  assert(html.includes('value="France"'), "custom-items: itemToStringValue default value displayed")
  assert(html.includes("border-destructive"), "invalid: aria-invalid styles the wrapper")
}

// 5. Multiple — chips container, render-prop value, chips input, anchor.
{
  function MultipleDemo() {
    const anchor = useComboboxAnchor()
    return (
      <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0]]}>
        <ComboboxChips ref={anchor} className="w-full max-w-xs">
          <ComboboxValue>
            {(values) => (
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
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }
  const html = renderToString(<MultipleDemo />)
  assert(html.includes('data-slot="combobox-chips"'), "multiple: chips container")
  assert(html.includes('data-slot="combobox-chip"'), "multiple: chip rendered from defaultValue")
  assert(html.includes(">Next.js</span>"), "multiple: chip label")
  assert(html.includes('data-slot="combobox-chips-input"'), "multiple: chips input")
  assert(html.includes('data-slot="combobox-value"'), "multiple: value span")
  assert(html.includes('aria-multiselectable'), "multiple: chips input aria wiring")
}

// 6. Groups — open state renders listbox with groups/labels/collections/separators.
{
  const html = renderToString(
    <Combobox items={timezones} defaultOpen>
      <ComboboxInput placeholder="Select a timezone" />
      <ComboboxContent className="w-60">
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
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
  assert(html.includes('data-slot="combobox-content"'), "groups: content rendered when open")
  assert(html.includes('role="listbox"'), "groups: listbox role")
  assert(html.includes('data-slot="combobox-group"'), "groups: group rendered")
  assert(html.includes('data-slot="combobox-label"'), "groups: label rendered")
  assert(html.includes("Americas"), "groups: group label text")
  assert(html.includes('data-slot="combobox-collection"'), "groups: collection rendered")
  assert(html.includes("(GMT-5) New York"), "groups: item text")
  assert(html.includes('data-slot="combobox-separator"'), "groups: separator rendered")
  assert(html.includes('role="option"'), "groups: option role")
  assert(html.includes('data-highlighted'), "groups: autoHighlight marks first item")
  assert(html.includes('data-slot="combobox-empty"') === false, "groups: empty hidden with matches")
}

// 7. Filtered/empty state — defaultOpen + no matching default? (open, empty items array)
{
  const html = renderToString(
    <Combobox items={[] as string[]} defaultOpen>
      <ComboboxInput placeholder="Select" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  assert(html.includes('data-slot="combobox-empty"'), "empty: ComboboxEmpty rendered")
  assert(html.includes("No items found."), "empty: empty text")
}

// 8. Controlled multiple selection (multiple-selection demo pattern).
{
  function Controlled() {
    const [value, setValue] = React.useState<string[]>(["SvelteKit"])
    return (
      <Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
        <ComboboxChips>
          <ComboboxValue>
            {value.map((item) => (
              <ComboboxChip key={item}>{item}</ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add framework" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }
  const html = renderToString(<Controlled />)
  assert(html.includes(">SvelteKit</span>"), "controlled multiple: chip from controlled value")
  assert(html.includes('placeholder="Add framework"'), "controlled multiple: chips input placeholder")
}

// 9. Default (unstyled) ComboboxTrigger without render.
{
  const html = renderToString(
    <Combobox items={frameworks}>
      <ComboboxTrigger />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  assert(html.includes('data-slot="combobox-trigger"'), "trigger default: rendered")
  assert(html.includes("chevron") || html.includes("svg"), "trigger default: chevron icon")
}

// 10. Context guard errors.
{
  let threw = ""
  try {
    renderToString(<ComboboxInput />)
  } catch (error) {
    threw = String(error)
  }
  assert(
    threw.includes("must be used within") && threw.includes("Combobox"),
    "guard: ComboboxInput outside Combobox throws"
  )
}

console.log("\nSSR probe done.")
