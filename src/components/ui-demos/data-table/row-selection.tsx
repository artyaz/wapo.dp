"use client"

import * as React from "react"
import type { RowSelectionState } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"

import { columns } from "./columns"
import { payments } from "./data"

export function RowSelectionDemo() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <DataTable
        columns={columns}
        data={payments}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        toolbar={(table) => (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}
      />
    </div>
  )
}
