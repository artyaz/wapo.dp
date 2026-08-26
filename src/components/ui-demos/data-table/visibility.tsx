"use client"

import * as React from "react"
import type { VisibilityState } from "@tanstack/react-table"

import { DataTable, DataTableViewOptions } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"

import { columns } from "./columns"
import { payments } from "./data"

export function VisibilityDemo() {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  return (
    <div className="mx-auto w-full max-w-4xl py-4">
      <DataTable
        columns={columns}
        data={payments}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
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
    </div>
  )
}
