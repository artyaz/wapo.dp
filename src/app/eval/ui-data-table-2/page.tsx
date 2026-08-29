"use client"
// EVAL page — data-table p2 — scientific lab sample tracker — 1280x800 dark
// DataTable front and center: sortable headers, global + status filtering,
// pagination, and a row-actions dropdown open on the newest sample.
// Co-stars: Input, Select, Button, Badge, Card, Progress, Alert.

import * as React from "react"
import {
  ArrowLeftRight,
  FlaskConical,
  History,
  MoreHorizontal,
  Printer,
  Search,
  ShieldAlert,
  Thermometer,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

type SampleStatus = "received" | "processing" | "complete" | "failed" | "hold"

type Sample = {
  id: string
  type: string
  subject: string
  collected: string // ISO datetime
  status: SampleStatus
  storage: string
}

const samples: Sample[] = [
  { id: "LX-2608-0147", type: "Blood plasma", subject: "SUBJ-0412", collected: "2026-08-28T09:14", status: "processing", storage: "Freezer B · −20 °C" },
  { id: "LX-2608-0148", type: "PCR swab", subject: "SUBJ-0412", collected: "2026-08-28T09:20", status: "complete", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0151", type: "Tissue biopsy", subject: "SUBJ-0388", collected: "2026-08-28T11:02", status: "received", storage: "LN2 tank · −196 °C" },
  { id: "LX-2608-0152", type: "Urine panel", subject: "SUBJ-0391", collected: "2026-08-28T11:45", status: "complete", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0155", type: "Blood serum", subject: "SUBJ-0407", collected: "2026-08-29T08:30", status: "failed", storage: "Freezer B · −20 °C" },
  { id: "LX-2608-0156", type: "Saliva kit", subject: "SUBJ-0415", collected: "2026-08-29T08:52", status: "processing", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0159", type: "Tissue biopsy", subject: "SUBJ-0401", collected: "2026-08-29T10:11", status: "received", storage: "LN2 tank · −196 °C" },
  { id: "LX-2608-0160", type: "Whole blood", subject: "SUBJ-0418", collected: "2026-08-29T10:40", status: "complete", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0163", type: "PCR swab", subject: "SUBJ-0420", collected: "2026-08-29T13:05", status: "received", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0164", type: "Blood plasma", subject: "SUBJ-0421", collected: "2026-08-29T13:22", status: "hold", storage: "Freezer B · −20 °C" },
  { id: "LX-2608-0167", type: "Stool kit", subject: "SUBJ-0399", collected: "2026-08-30T07:48", status: "processing", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0168", type: "Buffy coat", subject: "SUBJ-0423", collected: "2026-08-30T08:05", status: "received", storage: "Freezer C · −80 °C" },
  { id: "LX-2608-0171", type: "PCR swab", subject: "SUBJ-0425", collected: "2026-08-30T08:41", status: "received", storage: "Fridge A · 4 °C" },
  { id: "LX-2608-0172", type: "Tissue biopsy", subject: "SUBJ-0404", collected: "2026-08-30T09:03", status: "received", storage: "LN2 tank · −196 °C" },
]

const statusMeta: Record<
  SampleStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  received: { label: "Received", variant: "outline" },
  processing: { label: "Processing", variant: "secondary" },
  complete: { label: "Complete", variant: "outline" },
  failed: { label: "Failed", variant: "destructive" },
  hold: { label: "On hold", variant: "outline" },
}

const freezers = [
  { label: "Fridge A · 4 °C", value: 92 },
  { label: "Freezer B · −20 °C", value: 78 },
  { label: "Freezer C · −80 °C", value: 34 },
  { label: "LN2 tank · −196 °C", value: 41 },
]

function fmtDateTime(iso: string) {
  const date = new Date(`${iso}:00`)
  const day = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  const time = iso.slice(11)
  return `${day} · ${time}`
}

const columnHelper = createColumnHelper<Sample>()

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sample ID" />
    ),
    cell: ({ row }) => (
      <span className="font-code text-code text-foreground">{row.original.id}</span>
    ),
    size: 140,
  }),
  columnHelper.accessor("type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.type}</span>
    ),
    size: 130,
  }),
  columnHelper.accessor("subject", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => (
      <span className="font-code text-code text-muted-foreground">
        {row.original.subject}
      </span>
    ),
    size: 115,
  }),
  columnHelper.accessor("collected", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Collected" />
    ),
    cell: ({ row }) => (
      <span className="font-code text-code text-muted-foreground">
        {fmtDateTime(row.original.collected)}
      </span>
    ),
    size: 150,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const meta = statusMeta[row.original.status]
      return <Badge variant={meta.variant}>{meta.label}</Badge>
    },
    filterFn: "equals",
    size: 110,
  }),
  columnHelper.accessor("storage", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Storage" />
    ),
    cell: ({ row }) => (
      <span className="font-code text-code text-muted-foreground">
        {row.original.storage}
      </span>
    ),
    size: 165,
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const sample = row.original
      return (
        // defaultOpen on the newest sample (sorted collected descending) so
        // the static capture includes an open row-actions menu.
        <DropdownMenu defaultOpen={sample.id === "LX-2608-0172"}>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" />}
          >
            <span className="sr-only">Open sample menu</span>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 shadow-lg dark:shadow-xl">
            <DropdownMenuLabel className="font-code text-xs font-normal">
              {sample.id}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <History />
              View chain of custody
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer />
              Print cryo label
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowLeftRight />
              Transfer storage
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <ShieldAlert />
              Mark as compromised
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 52,
  }),
])

function Page() {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col gap-4 px-6 py-4">
        {/* App header */}
        <header className="flex items-center gap-5">
          <div className="flex items-baseline gap-2">
            <FlaskConical className="size-5 self-center text-foreground" />
            <span className="font-heading-3 text-heading-3 text-foreground">
              Lattice
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              sample tracker · bay 4
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="cursor-pointer">Runs</span>
            <span className="cursor-pointer text-foreground">Samples</span>
            <span className="cursor-pointer">Storage</span>
            <span className="cursor-pointer">Reports</span>
          </nav>
          <Button size="sm" className="ml-auto">
            Register sample
          </Button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_290px] gap-4">
          {/* Sample table */}
          <DataTable
            columns={columns}
            data={samples}
            defaultSorting={[{ id: "collected", desc: true }]}
            defaultPagination={{ pageIndex: 0, pageSize: 10 }}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            toolbar={(table) => (
              <>
                <div className="relative w-60 max-w-full">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search ID, subject, type…"
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) =>
                      table.setGlobalFilter(event.target.value)
                    }
                    className="h-9 pl-9"
                    aria-label="Search samples"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    table
                      .getColumn("status")
                      ?.setFilterValue(value === "all" ? undefined : value)
                  }}
                >
                  <SelectTrigger className="w-36" aria-label="Filter by status">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="all">All statuses</SelectItem>
                    {Object.entries(statusMeta).map(([key, meta]) => (
                      <SelectItem key={key} value={key}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DataTableViewOptions table={table} />
              </>
            )}
          />

          {/* Right rail */}
          <div className="flex flex-col gap-4">
            <Alert>
              <Thermometer />
              <AlertTitle className="font-heading-3 text-heading-3">
                Cold-chain excursion
              </AlertTitle>
              <AlertDescription>
                Freezer B door open 09:41–09:47 — 3 samples in this batch were
                above −20 °C for 6 min.
              </AlertDescription>
            </Alert>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3 leading-[23px]">
                  Storage capacity
                </CardTitle>
                <CardDescription>bay 4 · 14 samples on hand</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5 px-5">
                {freezers.map((unit) => (
                  <div key={unit.label} className="flex flex-col gap-1.5">
                    <span className="flex items-center justify-between">
                      <span className="font-caption text-caption text-foreground">
                        {unit.label}
                      </span>
                      <span className="font-code text-code text-muted-foreground">
                        {unit.value}%
                      </span>
                    </span>
                    <Progress value={unit.value} aria-hidden="true" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-3 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3 leading-[23px]">
                  Today’s intake
                </CardTitle>
                <CardDescription>08:00 – 09:05 · bench 2</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 px-5">
                <div className="rounded-lg border px-3 py-2.5">
                  <p className="font-code text-xl text-foreground">14</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    registered
                  </p>
                </div>
                <div className="rounded-lg border px-3 py-2.5">
                  <p className="font-code text-xl text-foreground">3</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    in quarantine
                  </p>
                </div>
                <div className="rounded-lg border px-3 py-2.5">
                  <p className="font-code text-xl text-foreground">9</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    assays queued
                  </p>
                </div>
                <div className="rounded-lg border px-3 py-2.5">
                  <p className="font-code text-xl text-destructive">1</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    failed QC
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Lattice LIMS v2.14 · GLP compliant · every transfer is signed
          </span>
          <span className="font-code text-code text-muted-foreground">
            last sync 14:22
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
