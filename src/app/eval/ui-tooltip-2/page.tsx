"use client"

// EVAL page — tooltip p2 — warehouse inventory console — 1920x1080 dark

import {
  ArrowLeftRight,
  Bell,
  Boxes,
  ChartColumn,
  ClipboardList,
  Eye,
  House,
  Info,
  Printer,
  RefreshCw,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
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

const RAIL = [
  { icon: House, label: "Overview", active: false },
  { icon: Boxes, label: "Inventory", active: true },
  { icon: ClipboardList, label: "Pick tasks", active: false },
  { icon: Users, label: "Crew", active: false },
  { icon: ChartColumn, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
]

const KPIS = [
  {
    label: "On-hand SKUs",
    value: "12,482",
    sub: "across 8 zones · 214 quarantined units excluded",
    info: "214 units held in quarantine at Dock C pending quality re-check",
  },
  { label: "Below reorder point", value: "37", sub: "SKUs need replenishment" },
  { label: "Open pick tasks", value: "128", sub: "34 due within 1 hour" },
  { label: "Dock doors active", value: "6 / 8", sub: "D4 + D7 in maintenance" },
]

type Status = "In stock" | "Low" | "Critical"

const INVENTORY: {
  sku: string
  item: string
  loc: string
  onHand: string
  reserved: string
  status: Status
  updated: string
  openLabel?: boolean
}[] = [
  {
    sku: "BAT-3S1P-2100",
    item: "Li-ion battery pack 3S1P · 2100 mAh",
    loc: "B · 04 · 112",
    onHand: "1,284",
    reserved: "96",
    status: "In stock",
    updated: "14:32",
  },
  {
    sku: "MTR-NEMA23-05",
    item: "Stepper motor NEMA 23 · 1.8° · 5 A",
    loc: "B · 04 · 047",
    onHand: "62",
    reserved: "40",
    status: "Low",
    updated: "14:29",
  },
  {
    sku: "CBL-USB-C-2M",
    item: "USB-C cable 2 m · braided",
    loc: "B · 07 · 213",
    onHand: "4,320",
    reserved: "1,150",
    status: "In stock",
    updated: "14:18",
  },
  {
    sku: "SNS-TOF-VL53",
    item: "Time-of-flight sensor VL53L1X",
    loc: "B · 02 · 008",
    onHand: "18",
    reserved: "12",
    status: "Critical",
    updated: "14:11",
  },
  {
    sku: "ENC-4K-H265",
    item: "4K H.265 encoder module",
    loc: "B · 11 · 096",
    onHand: "210",
    reserved: "44",
    status: "In stock",
    updated: "13:58",
  },
  {
    sku: "PSU-12V-5A",
    item: "Power supply 12 V · 5 A · DIN rail",
    loc: "B · 11 · 140",
    onHand: "340",
    reserved: "288",
    status: "In stock",
    updated: "13:47",
  },
  {
    sku: "ACT-LIN-150",
    item: "Linear actuator 150 mm stroke",
    loc: "B · 12 · 021",
    onHand: "7",
    reserved: "0",
    status: "Low",
    updated: "13:40",
    openLabel: true,
  },
]

const REPLENISH = [
  { sku: "MTR-NEMA23-05", po: "PO-8814", qty: 250, eta: "Mar 9", pct: 40 },
  { sku: "SNS-TOF-VL53", po: "PO-8815", qty: 500, eta: "Mar 11", pct: 15 },
  { sku: "ACT-LIN-150", po: "PO-8821", qty: 60, eta: "Mar 14", pct: 5 },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Icon rail */}
        <nav className="flex w-14 shrink-0 flex-col items-center gap-1 border-r bg-card py-3">
          {RAIL.map((r) => (
            <Tooltip key={r.label}>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label={r.label}
                    aria-current={r.active ? "page" : undefined}
                    className={
                      r.active
                        ? "flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"
                        : "flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                    }
                  />
                }
              >
                <r.icon className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{r.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-6">
            <div className="relative w-80">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search SKU, item, or bin…"
                className="pl-8 pr-16"
                aria-label="Search inventory"
              />
              <span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-0.5">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </div>
            <span className="ms-auto" />
            <Tooltip defaultOpen>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Refresh inventory data"
                  />
                }
              >
                <RefreshCw className="size-4" />
              </TooltipTrigger>
              {/* Opens to the LEFT over the empty header run between the
                  search box and the bell — tight against the button (negative
                  sideOffset compensates Radix's ~10px arrow-height offset)
                  without crossing the header's bottom hairline the way a
                  bottom-open tooltip inevitably would inside a 56px bar. */}
              <TooltipContent side="left" sideOffset={-9}>
                <p>
                  Last synced <span className="font-code">14:32</span> ·
                  auto-refresh every 5 min
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Alerts"
                    className="relative"
                  />
                }
              >
                <Bell className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>3 unread alerts</p>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <div className="flex items-center gap-2.5">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">KO</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm leading-tight font-medium">
                  Kwame Osei
                </span>
                <span className="text-xs text-muted-foreground">
                  Inventory lead · Night shift
                </span>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="font-heading-2 text-heading-2">
                  Zone B · Inventory
                </h1>
                <p className="text-sm text-muted-foreground">
                  Aisles 01–12 · electronics &amp; actuation
                </p>
              </div>
              <Badge variant="outline" className="font-code">
                Updated 14:32:07
              </Badge>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-4 gap-4">
              {KPIS.map((k) => (
                <Card key={k.label} className="gap-1.5 py-4">
                  <CardContent className="flex flex-col gap-1 px-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {k.label}
                      {k.info ? (
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                aria-label={`${k.label} details`}
                                className="text-muted-foreground hover:text-foreground"
                              />
                            }
                          >
                            <Info className="size-3" />
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="w-56">
                            <p>{k.info}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </span>
                    <span className="font-code text-2xl leading-none font-semibold">
                      {k.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {k.sub}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Table + right rail */}
            <div className="grid flex-1 grid-cols-12 items-start gap-4">
              <Card className="col-span-8 gap-0 py-0">
                <CardHeader className="flex flex-row items-center justify-between border-b py-3">
                  <CardTitle className="font-heading-3 text-sm">
                    Stock on hand · 1,284 lines
                  </CardTitle>
                  <Button variant="outline" size="xs">
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Bin</TableHead>
                        <TableHead className="text-right">
                          On hand
                        </TableHead>
                        <TableHead className="text-right">
                          Reserved
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead className="w-28 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {INVENTORY.map((row) => (
                        <TableRow key={row.sku}>
                          <TableCell className="font-code text-xs">
                            {row.sku}
                          </TableCell>
                          <TableCell className="max-w-56 truncate text-sm">
                            {row.item}
                          </TableCell>
                          <TableCell className="font-code text-xs text-muted-foreground">
                            {row.loc}
                          </TableCell>
                          <TableCell className="text-right font-code text-sm">
                            {row.onHand}
                          </TableCell>
                          <TableCell className="text-right font-code text-sm text-muted-foreground">
                            {row.reserved}
                          </TableCell>
                          <TableCell>
                            {row.status === "In stock" ? (
                              <Badge variant="outline">{row.status}</Badge>
                            ) : row.status === "Low" ? (
                              <Badge
                                variant="outline"
                                className="border-warning-500/40 text-warning-400"
                              >
                                {row.status}
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                {row.status}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-code text-xs text-muted-foreground">
                            {row.updated}
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center justify-end gap-0.5">
                              <Tooltip>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="icon-xs"
                                      aria-label={`View ${row.sku}`}
                                    />
                                  }
                                >
                                  <Eye className="size-3.5" />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>View item</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip defaultOpen={row.openLabel}>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="icon-xs"
                                      aria-label={`Print bin label for ${row.sku}`}
                                    />
                                  }
                                >
                                  <Printer className="size-3.5" />
                                </TooltipTrigger>
                                {/* The open (defaultOpen) instance sits on the
                                    LAST table row: opening downward left the
                                    card's bottom hairline passing through the
                                    trigger–tooltip gap (read as "unanchored").
                                    Opening UP over the row above is standard
                                    table-overlay behavior: the caret hugs the
                                    printer icon and no border is bisected. */}
                                <TooltipContent
                                  side="top"
                                  align={row.openLabel ? "end" : undefined}
                                  sideOffset={row.openLabel ? -9 : 6}
                                >
                                  {/* SKU included so the open bubble — which
                                      floats UP over the rows above the last
                                      one — is unambiguously attributable to
                                      ITS row, not the row it overlaps.
                                      Two lines keep the type roles legible:
                                      instruction in Inter, identifiers in
                                      IBM Plex Mono (probe: <p> renders
                                      Inter — the "all mono" eval claim was
                                      a misread). */}
                                  <div className="flex flex-col gap-0.5">
                                    <p>Print bin label</p>
                                    <p className="font-code">
                                      {row.sku} · {row.loc}
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="icon-xs"
                                      aria-label={`Transfer ${row.sku}`}
                                    />
                                  }
                                >
                                  <ArrowLeftRight className="size-3.5" />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>Transfer stock</p>
                                </TooltipContent>
                              </Tooltip>
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Right rail */}
              <div className="col-span-4 flex flex-col gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading-3 text-sm">
                      Replenishment queue
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {REPLENISH.map((r) => (
                      <div key={r.sku} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-code text-xs">{r.sku}</span>
                          <span className="text-xs text-muted-foreground">
                            +{r.qty} · {r.eta}
                          </span>
                        </div>
                        <Progress value={r.pct} />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{r.po} · confirmed</span>
                          <span className="font-code">{r.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading-3 text-sm">
                      Scanner link
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm">Zebra MC3300</span>
                      <span className="font-code text-xs text-muted-foreground">
                        192.168.4.71 · connected
                      </span>
                    </div>
                    <Switch defaultChecked aria-label="Scanner link" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  )
}
