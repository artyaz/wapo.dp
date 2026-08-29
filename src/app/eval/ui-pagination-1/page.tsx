"use client"

// EVAL page — pagination p1 — craft brewery tap list — 768x1024 light

import { Beer, Download, Plus } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: "Brews on record", value: "312" },
  { label: "On tap now", value: "14" },
  { label: "Seasonal taps", value: "9" },
  { label: "In barrel program", value: "23" },
]

type BrewStatus = "On tap" | "Seasonal" | "Barrel-aged" | "Retired"

const BREWS: {
  batch: string
  name: string
  style: string
  abv: string
  ibu: string
  tapped: string
  status: BrewStatus
}[] = [
  {
    batch: "B-0147",
    name: "Kestrel Pale",
    style: "American Pale Ale",
    abv: "5.2%",
    ibu: "38",
    tapped: "Mar 02, 2025",
    status: "On tap",
  },
  {
    batch: "B-0146",
    name: "Cinder & Oat",
    style: "Oatmeal Stout",
    abv: "6.1%",
    ibu: "32",
    tapped: "Feb 26, 2025",
    status: "On tap",
  },
  {
    batch: "B-0145",
    name: "Henge Bitter",
    style: "Best Bitter",
    abv: "4.3%",
    ibu: "28",
    tapped: "Feb 21, 2025",
    status: "On tap",
  },
  {
    batch: "B-0144",
    name: "Blackberry Gose",
    style: "Fruited Gose",
    abv: "4.6%",
    ibu: "8",
    tapped: "Feb 14, 2025",
    status: "Seasonal",
  },
  {
    batch: "B-0143",
    name: "Mill Race Mild",
    style: "English Mild",
    abv: "3.9%",
    ibu: "18",
    tapped: "Feb 07, 2025",
    status: "Retired",
  },
  {
    batch: "B-0142",
    name: "Northern Lark",
    style: "Vienna Lager",
    abv: "5.0%",
    ibu: "22",
    tapped: "Jan 30, 2025",
    status: "On tap",
  },
  {
    batch: "B-0141",
    name: "Barn Owl Barleywine",
    style: "English Barleywine",
    abv: "9.4%",
    ibu: "55",
    tapped: "Jan 18, 2025",
    status: "Barrel-aged",
  },
  {
    batch: "B-0140",
    name: "Rook Porter",
    style: "Robust Porter",
    abv: "5.8%",
    ibu: "34",
    tapped: "Jan 10, 2025",
    status: "Retired",
  },
]

function StatusBadge({ status }: { status: BrewStatus }) {
  if (status === "On tap") {
    return (
      <Badge className="border-transparent bg-success-100 text-success-700">
        On tap
      </Badge>
    )
  }
  if (status === "Retired") {
    return <Badge variant="secondary">Retired</Badge>
  }
  return <Badge variant="outline">{status}</Badge>
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* Top bar -------------------------------------------------- */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-default-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              <Beer className="size-5" />
            </div>
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Harrow Lane Brewing
              </h1>
              <p className="mt-0.5 text-caption font-caption text-muted-foreground">
                Tap list archive · Raleigh, NC · est. 2016
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Input
              type="search"
              placeholder="Search brews…"
              aria-label="Search brews by name or style"
              className="h-8 w-52"
            />
            <Button variant="outline" size="sm">
              <Download className="size-4" aria-hidden="true" />
              Export CSV
            </Button>
          </div>
        </header>

        {/* Main ----------------------------------------------------- */}
        <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-5 px-6 py-5">
          {/* Archive summary */}
          <section
            className="grid grid-cols-4 gap-3"
            aria-label="Brew log summary"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-default-border bg-card px-3.5 py-3"
              >
                <p className="font-code text-xl font-medium text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 truncate text-caption font-caption text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          {/* Tap list archive */}
          <Card className="gap-0 py-0">
            <CardHeader className="border-b border-default-border px-5 py-4">
              <CardTitle className="font-heading-3 text-heading-3">
                Past brews log
              </CardTitle>
              <CardDescription>
                312 brews since March 2016 · sorted by tap date, newest first
              </CardDescription>
              <CardAction>
                <Button size="sm">
                  <Plus className="size-4" aria-hidden="true" />
                  Log brew
                </Button>
              </CardAction>
            </CardHeader>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="ps-5">Batch</TableHead>
                  <TableHead>Brew</TableHead>
                  <TableHead>ABV</TableHead>
                  <TableHead>IBU</TableHead>
                  <TableHead>Tapped</TableHead>
                  <TableHead className="pe-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BREWS.map((brew) => (
                  <TableRow key={brew.batch}>
                    <TableCell className="ps-5 font-code text-xs text-muted-foreground">
                      {brew.batch}
                    </TableCell>
                    <TableCell>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">
                          {brew.name}
                        </span>
                        <span className="text-caption font-caption text-muted-foreground">
                          {brew.style}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="font-code text-xs text-foreground">
                      {brew.abv}
                    </TableCell>
                    <TableCell className="font-code text-xs text-muted-foreground">
                      {brew.ibu}
                    </TableCell>
                    <TableCell className="font-code text-xs text-muted-foreground">
                      {brew.tapped}
                    </TableCell>
                    <TableCell className="pe-5">
                      <StatusBadge status={brew.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination footer ------------------------------------ */}
            <div className="flex flex-col gap-3 border-t border-default-border px-5 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-code text-xs text-muted-foreground">
                  Showing brews 25–32 of 312 · page 4 of 39
                </p>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="brews-per-page"
                    className="text-caption font-caption text-muted-foreground"
                  >
                    Rows per page
                  </label>
                  <Select defaultValue="8">
                    <SelectTrigger
                      id="brews-per-page"
                      size="sm"
                      className="w-[72px]"
                      aria-label="Rows per page"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectGroup>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="32">32</SelectItem>
                        <SelectItem value="64">64</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">39</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </main>

        {/* Footer --------------------------------------------------- */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t border-default-border px-6">
          <p className="font-code text-xs text-muted-foreground">
            Harrow Lane Brewing · brew log v2.4
          </p>
          <p className="font-code text-xs text-muted-foreground">
            Synced 08:42 · 312 records
          </p>
        </footer>
      </div>
    </EvalShell>
  )
}
