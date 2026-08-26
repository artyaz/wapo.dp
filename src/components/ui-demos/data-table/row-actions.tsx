"use client"

import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  createColumnHelper,
  DataTable,
} from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { payments, type Payment } from "./data"

const columnHelper = createColumnHelper<Payment>()

const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "success" ? "default" : "outline"}>
        <span className="capitalize">{row.getValue("status")}</span>
      </Badge>
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
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="size-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])

export function RowActionsDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <DataTable columns={columns} data={payments} />
    </div>
  )
}
