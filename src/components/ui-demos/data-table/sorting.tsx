"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"
import type { SortingState } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { createColumnHelper, DataTable } from "@/components/ui/data-table"

import { payments, type Payment } from "./data"

const columnHelper = createColumnHelper<Payment>()

const columns = columnHelper.columns([
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  }),
])

export function SortingDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <DataTable
        columns={columns}
        data={payments}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  )
}
