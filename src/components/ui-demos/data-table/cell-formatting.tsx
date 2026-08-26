"use client"

import { createColumnHelper, DataTable } from "@/components/ui/data-table"

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
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
])

export function CellFormattingDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <DataTable columns={columns} data={payments} />
    </div>
  )
}
