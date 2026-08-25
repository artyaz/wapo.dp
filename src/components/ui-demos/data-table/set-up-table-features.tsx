"use client"

import { DataTablePayments } from "./data-table"
import { payments } from "./data"

/**
 * TanStack Table v8 registers features through row models and table options
 * rather than a separate features object. `@/components/ui/data-table` wires
 * all of them up for you:
 *
 * - Sorting ............ `getSortedRowModel()` + `onSortingChange`
 * - Column filtering ... `getFilteredRowModel()` + `onColumnFiltersChange`
 * - Global filtering ... `globalFilterFn: "includesString"`
 * - Pagination ......... `getPaginationRowModel()` + `onPaginationChange`
 * - Row selection ...... `enableRowSelection` + `onRowSelectionChange`
 * - Column visibility .. `onColumnVisibilityChange`
 * - Faceted filters .... `getFaceted*RowModel()`
 *
 * Anything you don't use is never rendered, so unneeded features cost nothing
 * at runtime. This demo composes all of the features at once.
 */
export function SetUpTableFeaturesDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl py-4">
      <DataTablePayments data={payments} />
    </div>
  )
}
