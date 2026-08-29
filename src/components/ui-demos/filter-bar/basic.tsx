"use client"

import * as React from "react"

import {
  FilterBar,
  FilterBarSummary,
  type FilterField,
  type FilterRule,
} from "@/components/ui/filter-bar"

const fields: FilterField[] = [
  {
    value: "merchant",
    label: "Merchant",
    type: "string",
    placeholder: "e.g. Figtree Design",
  },
  {
    value: "status",
    label: "Status",
    type: "enum",
    options: [
      { label: "Settled", value: "settled" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
    ],
  },
  {
    value: "amount",
    label: "Amount",
    type: "number",
    placeholder: "0.00",
    operators: ["gt", "gte", "lt", "lte", "is", "isNot"],
  },
  { value: "date", label: "Date", type: "date" },
]

export function FilterBarBasic() {
  const [rules, setRules] = React.useState<FilterRule[]>([
    { id: "rule-status", field: "status", operator: "is", value: "settled" },
    { id: "rule-amount", field: "amount", operator: "gte", value: "250" },
  ])

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-2">
      <FilterBar
        aria-label="Filter payments"
        fields={fields}
        rules={rules}
        onRulesChange={setRules}
        searchPlaceholder="Search payments…"
        addDescription="Rules combine with AND."
      />
      <FilterBarSummary filterCount={rules.length} resultCount={38} resultNoun="payment" />
    </div>
  )
}
