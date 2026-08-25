"use client"

import {
  DataTable,
  DataTableViewOptions,
} from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"

import { columns } from "./columns"
import { payments } from "./data"

/**
 * The reusable data-table building blocks in `@/components/ui/data-table`:
 *
 * - `DataTableColumnHeader` — sortable header with asc/desc/hide menu
 * - `DataTablePagination` — rows-per-page + page controls footer
 * - `DataTableViewOptions` — column visibility dropdown
 *
 * The shared `./columns` definitions use `DataTableColumnHeader`, the table
 * renders `DataTablePagination` by default, and `DataTableViewOptions` is
 * placed in the toolbar.
 */
export function ReusableComponentsDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl py-4">
      <DataTable
        columns={columns}
        data={payments}
        toolbar={(table) => (
          <>
            <Input
              placeholder="Search payments..."
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <DataTableViewOptions table={table} />
          </>
        )}
      />
      <p className="text-muted-foreground mt-2 px-2 text-sm">
        The footer above is rendered by <code>DataTablePagination</code>, and
        every sortable column uses <code>DataTableColumnHeader</code>.
      </p>
    </div>
  )
}
