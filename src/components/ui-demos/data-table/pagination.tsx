"use client"

import {
  createColumnHelper,
  DataTable,
  type DataTablePaginationLabels,
} from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

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

// Localized labels for the built-in footer — the numeric labels take functions
// so translated sentences can keep their own word order. When the defaults are
// overridden, the footer no longer isolates the text with dir="ltr" and renders
// in the page direction instead.
const hebrewLabels = {
  selectedRows: (selected: number, total: number) =>
    `${selected} מתוך ${total} שורות נבחרו.`,
  rowsPerPage: "שורות בעמוד",
  pageStatus: (page: number, pageCount: number) =>
    `עמוד ${page} מתוך ${pageCount}`,
  goToFirstPage: "לעמוד הראשון",
  goToPreviousPage: "לעמוד הקודם",
  goToNextPage: "לעמוד הבא",
  goToLastPage: "לעמוד האחרון",
} satisfies DataTablePaginationLabels

const rtlColumns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "סטטוס",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "אימייל",
    cell: ({ row }) => (
      <span dir="ltr" className="block lowercase">
        {row.getValue("email")}
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-end">סכום</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.amount)

      return <div className="text-end font-medium tabular-nums">{formatted}</div>
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

      {/* Built-in footer with localized labels — pass paginationLabels to
          translate "X of Y row(s) selected.", "Rows per page" and "Page X of
          Y" (plus the screen-reader button labels); the chevrons mirror and
          the layout follows the page direction automatically. */}
      <div dir="rtl" className="mt-8">
        <DataTable
          columns={rtlColumns}
          data={payments}
          defaultPagination={{ pageIndex: 0, pageSize: 5 }}
          paginationLabels={hebrewLabels}
        />
      </div>
    </div>
  )
}
