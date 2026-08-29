"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  FilterBar,
  FilterBarSummary,
  type FilterField,
  type FilterRule,
} from "@/components/ui/filter-bar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const fields: FilterField[] = [
  {
    value: "status",
    label: "Status",
    type: "enum",
    options: [
      { label: "Open", value: "open" },
      { label: "Pending", value: "pending" },
      { label: "Closed", value: "closed" },
    ],
  },
  {
    value: "priority",
    label: "Priority",
    type: "enum",
    options: [
      { label: "Low", value: "low" },
      { label: "Normal", value: "normal" },
      { label: "Urgent", value: "urgent" },
    ],
  },
  {
    value: "assignee",
    label: "Assignee",
    type: "enum",
    options: [
      { label: "Me", value: "me" },
      { label: "Unassigned", value: "unassigned" },
      { label: "Support rota", value: "rota" },
    ],
  },
  { value: "updated", label: "Last updated", type: "date" },
]

/** Saved views — each preset is a stored set of rules. */
const presets: Record<string, FilterRule[]> = {
  open: [{ id: "preset-open", field: "status", operator: "is", value: "open" }],
  escalated: [
    { id: "preset-escalated-1", field: "priority", operator: "is", value: "urgent" },
    { id: "preset-escalated-2", field: "status", operator: "isNot", value: "closed" },
  ],
  mine: [
    { id: "preset-mine-1", field: "assignee", operator: "is", value: "me" },
    { id: "preset-mine-2", field: "status", operator: "isNot", value: "closed" },
  ],
}

const resultCounts: Record<string, number> = {
  open: 23,
  escalated: 5,
  mine: 9,
}

export function FilterBarSavedFilters() {
  const [view, setView] = React.useState("escalated")
  const [rules, setRules] = React.useState<FilterRule[]>(presets.escalated)

  const handleViewChange = (next: string) => {
    setView(next)
    setRules(presets[next] ?? [])
  }

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Tabs value={view} onValueChange={handleViewChange}>
          <TabsList aria-label="Saved views">
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="escalated">Escalated</TabsTrigger>
            <TabsTrigger value="mine">Mine</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm">
          Save view
        </Button>
      </div>
      <FilterBar
        aria-label="Filter support tickets"
        fields={fields}
        rules={rules}
        onRulesChange={setRules}
        searchPlaceholder="Search tickets…"
      />
      <FilterBarSummary
        filterCount={rules.length}
        resultCount={resultCounts[view]}
        resultNoun="ticket"
      />
    </div>
  )
}
