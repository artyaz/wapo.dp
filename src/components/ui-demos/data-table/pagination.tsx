"use client"

import { Button } from "@/components/ui/button"
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
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
])

export function PaginationDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <DataTable
        columns={columns}
        data={payments}
        defaultPagination={{ pageIndex: 0, pageSize: 5 }}
        showPagination={false}
        footer={(table) => (
          <div className="flex items-center justify-end gap-2 py-4">
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      />
    </div>
  )
}
