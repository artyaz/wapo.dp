"use client"

import * as React from "react"

import {
  FilterBar,
  FilterBarSummary,
  type FilterField,
  type FilterRule,
} from "@/components/ui/filter-bar"

const fields: FilterField[] = [
  { value: "service", label: "Service", type: "string", placeholder: "e.g. checkout-api" },
  {
    value: "level",
    label: "Log level",
    type: "enum",
    options: [
      { label: "Debug", value: "debug" },
      { label: "Info", value: "info" },
      { label: "Warn", value: "warn" },
      { label: "Error", value: "error" },
    ],
  },
  { value: "latency_ms", label: "Latency (ms)", type: "number", placeholder: "500" },
  { value: "timestamp", label: "Timestamp", type: "date" },
]

export function FilterBarQueryBuilder() {
  const [rules, setRules] = React.useState<FilterRule[]>([
    {
      id: "rule-service",
      field: "service",
      operator: "contains",
      value: "checkout",
    },
  ])

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-2">
      <FilterBar
        aria-label="Query builder"
        fields={fields}
        rules={rules}
        onRulesChange={setRules}
        searchPlaceholder="Search log events…"
        addTitle="Add rule"
        addDescription="Rules combine with AND. Values match exactly."
        defaultPopoverOpen
        defaultRule={{ field: "timestamp", operator: "after", value: "2026-08-27" }}
      />
      <FilterBarSummary filterCount={rules.length} resultCount={124} resultNoun="event" />
    </div>
  )
}
