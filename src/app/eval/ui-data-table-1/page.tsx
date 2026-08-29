"use client"
// EVAL page — data-table p1 — plant care reminder app — 1920x1080 light
// DataTable front and center: sortable headers, row-selection checkboxes,
// pagination, column visibility (View menu), and a row-actions dropdown
// open on the first row. Co-stars: Input, Select, Button, Badge, Progress,
// Checkbox, Avatar.

import * as React from "react"
import type { RowSelectionState } from "@tanstack/react-table"
import {
  Bell,
  CalendarClock,
  ClipboardList,
  Clock,
  Droplets,
  History,
  LayoutDashboard,
  MoreHorizontal,
  PencilLine,
  Plus,
  Search,
  Settings,
  Sprout,
  Trash2,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  createColumnHelper,
  DataTable,
  DataTableColumnHeader,
  DataTableViewOptions,
} from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// The app's "today" — pinned so the overdue/due-today logic renders
// identically on every capture.
const TODAY = "2026-08-30"

type Plant = {
  id: string
  name: string
  botanical: string
  room: string
  intervalDays: number
  lastWatered: string
  nextDue: string
  health: number
}

const plants: Plant[] = [
  { id: "p-01", name: "Monstera", botanical: "Monstera deliciosa", room: "Living room", intervalDays: 7, lastWatered: "2026-08-24", nextDue: "2026-08-31", health: 92 },
  { id: "p-02", name: "Fiddle-leaf fig", botanical: "Ficus lyrata", room: "Living room", intervalDays: 7, lastWatered: "2026-08-28", nextDue: "2026-09-04", health: 78 },
  { id: "p-03", name: "Peace lily", botanical: "Spathiphyllum wallisii", room: "Bathroom", intervalDays: 5, lastWatered: "2026-08-27", nextDue: "2026-09-01", health: 85 },
  { id: "p-04", name: "Snake plant", botanical: "Sansevieria trifasciata", room: "Bedroom", intervalDays: 14, lastWatered: "2026-08-21", nextDue: "2026-09-04", health: 95 },
  { id: "p-05", name: "Golden pothos", botanical: "Epipremnum aureum", room: "Kitchen", intervalDays: 6, lastWatered: "2026-08-26", nextDue: "2026-09-01", health: 88 },
  { id: "p-06", name: "ZZ plant", botanical: "Zamioculcas zamiifolia", room: "Office", intervalDays: 14, lastWatered: "2026-08-18", nextDue: "2026-09-01", health: 90 },
  { id: "p-07", name: "Moth orchid", botanical: "Phalaenopsis amabilis", room: "Bedroom", intervalDays: 7, lastWatered: "2026-08-30", nextDue: "2026-09-06", health: 66 },
  { id: "p-08", name: "Jade plant", botanical: "Crassula ovata", room: "Balcony", intervalDays: 10, lastWatered: "2026-08-23", nextDue: "2026-09-02", health: 71 },
  { id: "p-09", name: "Boston fern", botanical: "Nephrolepis exaltata", room: "Living room", intervalDays: 4, lastWatered: "2026-08-29", nextDue: "2026-09-02", health: 82 },
  { id: "p-10", name: "Rubber plant", botanical: "Ficus elastica", room: "Office", intervalDays: 8, lastWatered: "2026-08-20", nextDue: "2026-08-28", health: 74 },
  { id: "p-11", name: "Aloe vera", botanical: "Aloe barbadensis miller", room: "Kitchen", intervalDays: 12, lastWatered: "2026-08-27", nextDue: "2026-09-08", health: 91 },
  { id: "p-12", name: "English ivy", botanical: "Hedera helix", room: "Balcony", intervalDays: 5, lastWatered: "2026-08-25", nextDue: "2026-08-30", health: 68 },
]

const rooms = ["Living room", "Kitchen", "Bedroom", "Bathroom", "Office", "Balcony"]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Sprout, label: "Plant inventory", active: true },
  { icon: CalendarClock, label: "Watering schedule" },
  { icon: ClipboardList, label: "Care log" },
  { icon: Bell, label: "Reminders" },
  { icon: Settings, label: "Settings" },
]

function fmtDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

const columnHelper = createColumnHelper<Plant>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all plants"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plant" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col py-0.5">
        <span className="text-sm font-medium text-foreground">
          {row.original.name}
        </span>
        <span className="font-caption text-caption text-muted-foreground italic">
          {row.original.botanical}
        </span>
      </div>
    ),
    size: 250,
  }),
  columnHelper.accessor("room", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.room}</span>
    ),
    filterFn: "equals",
    size: 130,
  }),
  columnHelper.accessor("intervalDays", {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Water every"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <span className="flex justify-end font-code text-code text-foreground">
        {row.original.intervalDays} d
      </span>
    ),
    size: 120,
  }),
  columnHelper.accessor("lastWatered", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last watered" />
    ),
    cell: ({ row }) => (
      <span className="font-code text-code text-foreground">
        {fmtDate(row.original.lastWatered)}
      </span>
    ),
    size: 140,
  }),
  columnHelper.accessor("nextDue", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next due" />
    ),
    cell: ({ row }) => {
      const due = row.original.nextDue
      if (due < TODAY) {
        return (
          <span className="flex items-center gap-2">
            <span className="font-code text-code text-foreground">
              {fmtDate(due)}
            </span>
            <Badge variant="destructive">Overdue</Badge>
          </span>
        )
      }
      if (due === TODAY) {
        return (
          <span className="flex items-center gap-2">
            <span className="font-code text-code text-foreground">
              {fmtDate(due)}
            </span>
            <Badge variant="secondary">Today</Badge>
          </span>
        )
      }
      return (
        <span className="font-code text-code text-foreground">
          {fmtDate(due)}
        </span>
      )
    },
    size: 170,
  }),
  columnHelper.accessor("health", {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Health"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <span className="flex items-center justify-end gap-2">
        <Progress
          value={row.original.health}
          className="h-1.5 w-16"
          aria-hidden="true"
        />
        <span className="font-code text-code text-foreground">
          {row.original.health}%
        </span>
      </span>
    ),
    size: 140,
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const plant = row.original
      return (
        // defaultOpen on the first row due (sorted next-due ascending) so the
        // static capture includes an open row-actions menu.
        <DropdownMenu defaultOpen={plant.id === "p-10"}>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" />}
          >
            <span className="sr-only">Open plant menu</span>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{plant.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Droplets />
              Log watering today
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Clock />
              Snooze reminder 1 d
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilLine />
              Edit care schedule
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History />
              View care history
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Remove from inventory
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 56,
  }),
])

const stats = [
  { label: "Plants in care", value: "12" },
  { label: "Due this week", value: "6" },
  { label: "Overdue", value: "1" },
  { label: "Avg. health", value: "82%" },
]

function Page() {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [roomFilter, setRoomFilter] = React.useState("all")
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>({ "p-01": true, "p-09": true })

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full">
        {/* App sidebar */}
        <aside className="flex w-60 shrink-0 flex-col gap-6 border-r px-4 py-5">
          <div className="flex items-baseline gap-2 px-2">
            <span className="font-heading-3 text-heading-3 text-foreground">
              Verdant
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              plant care
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-sm bg-muted px-2.5 py-2 text-sm font-medium text-foreground"
                    : "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
            <Avatar size="sm">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                Mara Keller
              </span>
              <span className="font-caption text-caption text-muted-foreground">
                12 plants · 6 rooms
              </span>
            </span>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 px-8 py-6">
          <header className="flex items-end justify-between gap-6">
            <div>
              <p className="font-caption text-caption text-muted-foreground">
                Home / Plant inventory
              </p>
              <h1 className="font-heading-1 text-heading-1 text-foreground">
                Plant inventory
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button size="sm">
                <Plus />
                Add plant
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border px-4 py-3">
                <p className="font-code text-xl text-foreground">
                  {stat.value}
                </p>
                <p className="font-caption text-caption text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <DataTable
            columns={columns}
            data={plants}
            getRowId={(plant) => plant.id}
            defaultSorting={[{ id: "nextDue", desc: false }]}
            defaultPagination={{ pageIndex: 0, pageSize: 10 }}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            toolbar={(table) => (
              <>
                <div className="relative w-64 max-w-full">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search plants…"
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) =>
                      table.setGlobalFilter(event.target.value)
                    }
                    className="h-9 pl-9"
                    aria-label="Search plants"
                  />
                </div>
                <Select
                  value={roomFilter}
                  onValueChange={(value) => {
                    setRoomFilter(value)
                    table
                      .getColumn("room")
                      ?.setFilterValue(value === "all" ? undefined : value)
                  }}
                >
                  <SelectTrigger className="w-40" aria-label="Filter by room">
                    <SelectValue placeholder="All rooms" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="all">All rooms</SelectItem>
                    {rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="ms-1">
                  <Droplets />
                  Log watering
                </Button>
                <DataTableViewOptions table={table} />
              </>
            )}
          />

          <footer className="mt-auto flex items-center justify-between border-t pt-3">
            <span className="font-caption text-caption text-muted-foreground">
              Verdant sends watering reminders every morning at 07:00
            </span>
            <span className="font-code text-code text-muted-foreground">
              last sync 08:42
            </span>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}

export default Page
