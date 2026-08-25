"use client"

import * as React from "react"
import type {
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table"

import { DataTable, DataTableViewOptions } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"

import { columns } from "./columns"
import type { Payment } from "./data"

interface DataTableProps {
  data: Payment[]
}

export function DataTablePayments({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  return (
    <DataTable
      columns={columns}
      data={data}
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      toolbar={(table) => (
        <>
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DataTableViewOptions table={table} />
        </>
      )}
    />
  )
}
