"use client"

import * as React from "react"
import {
  createColumnHelper as createTanStackColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnHelper,
  type VisibilityState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  EyeOff,
  Settings2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ---------------------------------------------------------------------------
// Column helper
// ---------------------------------------------------------------------------

/**
 * TanStack Table v8's `ColumnHelper`, extended with a `columns()` convenience
 * method (the API the shadcn/ui docs column definitions use):
 *
 * ```tsx
 * const columnHelper = createColumnHelper<Payment>()
 * export const columns = columnHelper.columns([
 *   columnHelper.display({ id: "select", ... }),
 *   columnHelper.accessor("email", { header: "Email" }),
 * ])
 * ```
 *
 * `columns()` returns the array of column definitions and drops falsy entries,
 * so conditional columns (`shouldShow && columnHelper.display(...)`) work.
 */
export interface DataTableColumnHelper<TData extends RowData>
  extends ColumnHelper<TData> {
  columns: (
    columns: (ColumnDef<TData, any> | false | null | undefined)[]
  ) => ColumnDef<TData, any>[]
}

export function createColumnHelper<TData extends RowData>(): DataTableColumnHelper<TData> {
  const helper = createTanStackColumnHelper<TData>()
  const columns = (
    defs: (ColumnDef<TData, any> | false | null | undefined)[]
  ): ColumnDef<TData, any>[] =>
    defs.filter((def): def is ColumnDef<TData, any> => Boolean(def))

  return { ...helper, columns }
}

/**
 * An untyped column helper for quick column definitions on loosely typed data.
 * Prefer `createColumnHelper<TData>()` for full type safety.
 */
export const columnHelper: DataTableColumnHelper<any> = createColumnHelper()

// ---------------------------------------------------------------------------
// DataTable
// ---------------------------------------------------------------------------

export interface DataTableProps<TData extends RowData> {
  /** Column definitions — see `createColumnHelper`. */
  columns: ColumnDef<TData, any>[]
  /** The row data for the table. */
  data: TData[]

  // --- Controlled state (each slice is optional — falls back to internal state)
  sorting?: SortingState
  defaultSorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  columnFilters?: ColumnFiltersState
  defaultColumnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  columnVisibility?: VisibilityState
  defaultColumnVisibility?: VisibilityState
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  globalFilter?: string
  onGlobalFilterChange?: OnChangeFn<string>
  pagination?: PaginationState
  defaultPagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>

  // --- Table options
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean)
  getRowId?: (row: TData, index: number) => string

  // --- Rendering
  /** Content rendered above the table. Receives the table instance. */
  toolbar?: React.ReactNode | ((table: Table<TData>) => React.ReactNode)
  /**
   * Replaces the built-in pagination footer. Receives the table instance.
   */
  footer?: React.ReactNode | ((table: Table<TData>) => React.ReactNode)
  /** Whether to render the built-in `DataTablePagination` footer. Default true. */
  showPagination?: boolean
  /**
   * Labels for the built-in `DataTablePagination` footer (ignored when a
   * custom `footer` is provided). Lets non-English UIs localize the footer
   * strings — see `DataTablePaginationLabels`.
   */
  paginationLabels?: DataTablePaginationLabels
  /** Message rendered when there are no rows. Default "No results." */
  emptyMessage?: React.ReactNode
  className?: string
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  sorting: sortingProp,
  defaultSorting,
  onSortingChange,
  columnFilters: columnFiltersProp,
  defaultColumnFilters,
  onColumnFiltersChange,
  columnVisibility: columnVisibilityProp,
  defaultColumnVisibility,
  onColumnVisibilityChange,
  rowSelection: rowSelectionProp,
  onRowSelectionChange,
  globalFilter: globalFilterProp,
  onGlobalFilterChange,
  pagination: paginationProp,
  defaultPagination,
  onPaginationChange,
  enableRowSelection,
  getRowId,
  toolbar,
  footer,
  showPagination = true,
  paginationLabels,
  emptyMessage = "No results.",
  className,
}: DataTableProps<TData>) {
  // Internal state — used for any slice that is not controlled via props.
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    defaultSorting ?? []
  )
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>(defaultColumnFilters ?? [])
  const [internalColumnVisibility, setInternalColumnVisibility] =
    React.useState<VisibilityState>(defaultColumnVisibility ?? {})
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({})
  const [internalGlobalFilter, setInternalGlobalFilter] =
    React.useState<string>("")
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>(
      defaultPagination ?? { pageIndex: 0, pageSize: 10 }
    )

  const handleSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      if (sortingProp === undefined) setInternalSorting(updater)
      onSortingChange?.(updater)
    },
    [sortingProp, onSortingChange]
  )
  const handleColumnFiltersChange =
    React.useCallback<OnChangeFn<ColumnFiltersState>>(
      (updater) => {
        if (columnFiltersProp === undefined)
          setInternalColumnFilters(updater)
        onColumnFiltersChange?.(updater)
      },
      [columnFiltersProp, onColumnFiltersChange]
    )
  const handleColumnVisibilityChange =
    React.useCallback<OnChangeFn<VisibilityState>>(
      (updater) => {
        if (columnVisibilityProp === undefined)
          setInternalColumnVisibility(updater)
        onColumnVisibilityChange?.(updater)
      },
      [columnVisibilityProp, onColumnVisibilityChange]
    )
  const handleRowSelectionChange =
    React.useCallback<OnChangeFn<RowSelectionState>>(
      (updater) => {
        if (rowSelectionProp === undefined) setInternalRowSelection(updater)
        onRowSelectionChange?.(updater)
      },
      [rowSelectionProp, onRowSelectionChange]
    )
  const handleGlobalFilterChange = React.useCallback<OnChangeFn<string>>(
    (updater) => {
      if (globalFilterProp === undefined) setInternalGlobalFilter(updater)
      onGlobalFilterChange?.(updater)
    },
    [globalFilterProp, onGlobalFilterChange]
  )
  const handlePaginationChange = React.useCallback<OnChangeFn<PaginationState>>(
    (updater) => {
      if (paginationProp === undefined) setInternalPagination(updater)
      onPaginationChange?.(updater)
    },
    [paginationProp, onPaginationChange]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingProp ?? internalSorting,
      columnFilters: columnFiltersProp ?? internalColumnFilters,
      columnVisibility: columnVisibilityProp ?? internalColumnVisibility,
      rowSelection: rowSelectionProp ?? internalRowSelection,
      globalFilter: globalFilterProp ?? internalGlobalFilter,
      pagination: paginationProp ?? internalPagination,
    },
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onRowSelectionChange: handleRowSelectionChange,
    onGlobalFilterChange: handleGlobalFilterChange,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: "includesString",
    enableRowSelection,
    getRowId,
  })

  const toolbarContent =
    typeof toolbar === "function" ? toolbar(table) : toolbar
  const footerContent = typeof footer === "function" ? footer(table) : footer

  return (
    <div
      data-slot="data-table"
      className={cn("flex w-full flex-col gap-2", className)}
    >
      {toolbarContent ? (
        <div
          data-slot="data-table-toolbar"
          className="flex flex-wrap items-center gap-2 py-1"
        >
          {toolbarContent}
        </div>
      ) : null}
      {/* Praxis: the table is in-flow panel content — 8px radius + hairline
          border, no shadow (optical separation, not cast). */}
      <div className="overflow-hidden rounded-lg border">
        <UiTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={
                        header.column.columnDef.size !== undefined
                          ? { width: header.column.getSize() }
                          : undefined
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllLeafColumns().length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UiTable>
      </div>
      {footerContent !== undefined && footerContent !== null ? (
        footerContent
      ) : showPagination ? (
        <DataTablePagination table={table} labels={paginationLabels} />
      ) : null}
    </div>
  )
}

// ---------------------------------------------------------------------------
// DataTableColumnHeader
// ---------------------------------------------------------------------------

export interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div
      data-slot="data-table-column-header"
      className={cn("flex items-center gap-2", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="-ms-3 h-8 data-[state=open]:bg-accent"
            />
          }
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => column.toggleVisibility(false)}
              >
                <EyeOff />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ---------------------------------------------------------------------------
// DataTablePagination
// ---------------------------------------------------------------------------

/**
 * Localizable strings for the built-in pagination footer.
 *
 * All entries are optional — anything omitted falls back to English.
 * Numeric labels accept a function so translated sentences can keep their
 * own word order:
 *
 * ```tsx
 * <DataTable
 *   paginationLabels={{
 *     selectedRows: (selected, total) => `${selected} מתוך ${total} שורות נבחרו.`,
 *     rowsPerPage: "שורות בעמוד",
 *     pageStatus: (page, pageCount) => `עמוד ${page} מתוך ${pageCount}`,
 *   }}
 *   // ...
 * />
 * ```
 */
export interface DataTablePaginationLabels {
  /** Selection summary. Receives `(selected, total)`. Default: `"0 of 9 row(s) selected."` */
  selectedRows?: string | ((selected: number, total: number) => string)
  /** Label before the page-size select. Default: "Rows per page". */
  rowsPerPage?: React.ReactNode
  /** Page indicator. Receives `(page, pageCount)`. Default: `"Page 1 of 2"`. */
  pageStatus?: string | ((page: number, pageCount: number) => string)
  /** Screen-reader label for the go-to-first-page button. */
  goToFirstPage?: string
  /** Screen-reader label for the previous-page button. */
  goToPreviousPage?: string
  /** Screen-reader label for the next-page button. */
  goToNextPage?: string
  /** Screen-reader label for the go-to-last-page button. */
  goToLastPage?: string
}

export interface DataTablePaginationProps<TData extends RowData> {
  table: Table<TData>
  /** Localizable footer strings — English defaults. */
  labels?: DataTablePaginationLabels
  className?: string
}

export function DataTablePagination<TData extends RowData>({
  table,
  labels,
  className,
}: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length
  const page = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()
  const canPrevious = table.getCanPreviousPage()
  const canNext = table.getCanNextPage()

  const selectedRowsLabel = labels?.selectedRows
  const selectedRowsText =
    typeof selectedRowsLabel === "function"
      ? selectedRowsLabel(selectedCount, totalCount)
      : (selectedRowsLabel ?? `${selectedCount} of ${totalCount} row(s) selected.`)
  const pageStatusLabel = labels?.pageStatus
  const pageStatusText =
    typeof pageStatusLabel === "function"
      ? pageStatusLabel(page, pageCount)
      : (pageStatusLabel ?? `Page ${page} of ${pageCount}`)

  return (
    <div
      data-slot="data-table-pagination"
      className={cn("flex items-center justify-between gap-4 px-2", className)}
    >
      {/* The default labels are English runs: isolate each run with
          dir="ltr" on a SPAN so digits/punctuation are not re-ordered by the
          surrounding bidi paragraph, while the container itself keeps the
          page direction — setting dir on the container would flip the text
          alignment and push the label flush against the controls in RTL. */}
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRowsLabel === undefined ? (
          <span dir="ltr">{selectedRowsText}</span>
        ) : (
          selectedRowsText
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{labels?.rowsPerPage ?? "Rows per page"}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {/* Include the active page size in the options — otherwise a
                  consumer running e.g. pageSize 5 or 8 renders a trigger with
                  a value that matches no SelectItem and shows up blank. */}
              {Array.from(
                new Set([
                  10,
                  20,
                  25,
                  30,
                  40,
                  50,
                  table.getState().pagination.pageSize,
                ])
              )
                .sort((a, b) => a - b)
                .map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex min-w-[100px] items-center justify-center whitespace-nowrap text-sm font-medium">
          {pageStatusLabel === undefined ? (
            <span dir="ltr">{pageStatusText}</span>
          ) : (
            pageStatusText
          )}
        </div>
        {/* Navigation buttons are only meaningful when there is more than one
            page — on a single-page table every button would be disabled, and a
            row of faded ghost controls reads as a broken footer. */}
        {canPrevious || canNext ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!canPrevious}
            >
              <span className="sr-only">{labels?.goToFirstPage ?? "Go to first page"}</span>
              <ChevronsLeft className="rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!canPrevious}
            >
              <span className="sr-only">{labels?.goToPreviousPage ?? "Go to previous page"}</span>
              <ChevronLeft className="rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!canNext}
            >
              <span className="sr-only">{labels?.goToNextPage ?? "Go to next page"}</span>
              <ChevronRight className="rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!canNext}
            >
              <span className="sr-only">{labels?.goToLastPage ?? "Go to last page"}</span>
              <ChevronsRight className="rtl:rotate-180" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// DataTableViewOptions
// ---------------------------------------------------------------------------

export interface DataTableViewOptionsProps<TData extends RowData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData extends RowData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div data-slot="data-table-view-options">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="ms-auto hidden h-8 lg:flex"
            />
          }
        >
          <Settings2 />
          View
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" &&
                column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
