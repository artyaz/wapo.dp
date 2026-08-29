"use client"

import * as React from "react"

import {
  FilterBarSummary,
  SortBar,
  type SortDirection,
  type SortRule,
} from "@/components/ui/filter-bar"

const invoices = [
  { id: "INV-2041", client: "Northwind Coffee", amount: 4820, issued: "2026-08-21" },
  { id: "INV-2042", client: "Atlas Foundry", amount: 12750, issued: "2026-08-23" },
  { id: "INV-2043", client: "Meridian Legal", amount: 3150, issued: "2026-08-24" },
  { id: "INV-2044", client: "Bastion Freight", amount: 9600, issued: "2026-08-27" },
  { id: "INV-2045", client: "Copperline Studio", amount: 2240, issued: "2026-08-29" },
]

const sortFields = [
  { value: "issued", label: "issue date" },
  { value: "amount", label: "amount" },
  { value: "client", label: "client" },
]

export function FilterBarSortRules() {
  const [sort, setSort] = React.useState<SortRule>({
    field: "issued",
    direction: "desc",
  })

  const rows = React.useMemo(() => {
    const factor: Record<SortDirection, number> = { asc: 1, desc: -1 }
    return [...invoices].sort((a, b) => {
      const left = String(a[sort.field as keyof (typeof invoices)[number]])
      const right = String(b[sort.field as keyof (typeof invoices)[number]])
      return left.localeCompare(right, undefined, { numeric: true }) * factor[sort.direction]
    })
  }, [sort])

  const activeField = sortFields.find((f) => f.value === sort.field)

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-2">
      <SortBar
        fields={sortFields}
        value={sort}
        onChange={setSort}
        label="Sort invoices by"
      />
      <FilterBarSummary
        filterCount={0}
        resultCount={rows.length}
        resultNoun="invoice"
        sort={activeField ? { label: activeField.label, direction: sort.direction } : null}
      />
      <div className="overflow-hidden rounded-lg border">
        {rows.map((invoice, index) => (
          <div
            key={invoice.id}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
              index > 0 ? "border-t" : ""
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{invoice.client}</p>
              <p className="font-code text-[11px] text-muted-foreground">
                {invoice.id} · {invoice.issued}
              </p>
            </div>
            <p className="font-code text-sm whitespace-nowrap tabular-nums">
              ${invoice.amount.toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
