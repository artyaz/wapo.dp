"use client"

import * as React from "react"
import type { ColumnFiltersState } from "@tanstack/react-table"

import { createColumnHelper, DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"

import { payments, type Payment } from "./data"

const columnHelper = createColumnHelper<Payment>()

const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
])

export function FilteringDemo() {
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <DataTable
        columns={columns}
        data={payments}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        toolbar={(table) => (
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
      />
    </div>
  )
}
