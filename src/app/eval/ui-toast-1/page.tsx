"use client"
// EVAL page — toast p1 — scientific lab sample tracker — 1280x800 dark
// Toast front and center: four stacked notifications (success, info, warning,
// destructive) fired on mount and pinned open so the screenshot captures the
// full stack — icons, titles, descriptions, actions and close buttons.
// Rendered by the app-level <Toaster /> mounted in the root layout; the store
// dispatch happens slightly after mount so the Toaster's listener has
// subscribed (StrictMode is off, so the effect runs exactly once).
// Co-stars: Card, Badge, Button, Table, Input, Avatar.

import React from "react"
import {
  CircleAlert,
  CircleCheck,
  FileBarChart2,
  Info,
  LayoutDashboard,
  ListChecks,
  Menu,
  Microscope,
  Search,
  TestTubes,
  TriangleAlert,
  Users,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { toast } from "@/components/ui/toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Samples", icon: TestTubes, active: true },
  { label: "Instruments", icon: Microscope },
  { label: "Protocols", icon: ListChecks },
  { label: "Reports", icon: FileBarChart2 },
  { label: "Team", icon: Users },
]

const KPIS = [
  { label: "In transit", value: "12", meta: "3 couriers" },
  { label: "Processing", value: "38", meta: "6 benches" },
  { label: "Awaiting QC", value: "7", meta: "SLA 4 h" },
  { label: "Flagged", value: "3", meta: "1 critical" },
]

type Status = "In transit" | "Processing" | "Complete" | "Awaiting QC" | "Flagged"

const SAMPLES: {
  id: string
  protocol: string
  client: string
  temp: string
  status: Status
  updated: string
}[] = [
  { id: "SPL-88213", protocol: "Plasma prep v4", client: "Fulton Biologics", temp: "4.1 °C", status: "In transit", updated: "14:02" },
  { id: "SPL-88197", protocol: "RNA extraction", client: "Nordmark Univ.", temp: "−20.3 °C", status: "Processing", updated: "13:47" },
  { id: "SPL-88164", protocol: "Centrifuge BR-1142", client: "HelixDx QC", temp: "4.0 °C", status: "Complete", updated: "13:12" },
  { id: "SPL-88150", protocol: "Assay dilution", client: "Invenira", temp: "4.2 °C", status: "Awaiting QC", updated: "12:58" },
  { id: "SPL-88141", protocol: "Genomic prep v2", client: "Fulton Biologics", temp: "4.4 °C", status: "Processing", updated: "12:31" },
  { id: "SPL-88122", protocol: "Aliquot · 96-well", client: "Nordmark Univ.", temp: "4.0 °C", status: "Flagged", updated: "11:49" },
  { id: "SPL-88109", protocol: "Serum spin", client: "Invenira", temp: "4.1 °C", status: "Complete", updated: "11:20" },
]

function statusBadge(status: Status) {
  if (status === "Flagged") return <Badge variant="destructive">Flagged</Badge>
  if (status === "Processing") return <Badge variant="secondary">Processing</Badge>
  return <Badge variant="outline">{status}</Badge>
}

export default function Page() {
  // Four lab events land as a stacked toast column. Fired a beat after mount
  // (the root layout's <Toaster /> subscribes on its own effect pass) and
  // pinned open with a 10-minute duration so all of them are captured.
  React.useEffect(() => {
    const t1 = window.setTimeout(() => {
      toast.add({
        type: "success",
        icon: <CircleCheck className="size-4 text-success-500" />,
        title: "Centrifuge run BR-1142 complete",
        description: (
          <span>
            48 plasma samples spun at <span className="font-code text-xs">4 °C</span>{" "}
            · <span className="font-code text-xs">20 min</span> · ready for
            aliquoting.
          </span>
        ),
        duration: 600000,
      })
    }, 300)
    const t2 = window.setTimeout(() => {
      toast.add({
        type: "info",
        icon: <Info className="size-4 text-muted-foreground" />,
        title: "Instrument calibration due",
        description: (
          <span>
            Pipette <span className="font-code text-xs">P-217</span> (
            <span className="font-code text-xs">20–200 µL</span>) expires in 3
            days.
          </span>
        ),
        actionProps: { children: "Schedule" },
        duration: 600000,
      })
    }, 450)
    const t3 = window.setTimeout(() => {
      toast.add({
        type: "warning",
        icon: <TriangleAlert className="size-4 text-warning-500" />,
        title: "Incubator IN-03 drifting",
        description: (
          <span>
            <span className="font-code text-xs">38.2 °C</span> —{" "}
            <span className="font-code text-xs">0.7 °C</span> above setpoint
            for the last 12 min.
          </span>
        ),
        actionProps: { children: "Acknowledge" },
        duration: 600000,
      })
    }, 600)
    const t4 = window.setTimeout(() => {
      toast.add({
        type: "error",
        icon: <CircleAlert className="size-4" />,
        title: "Chain-of-custody break",
        description: (
          <>
            <span className="font-code text-xs">SPL-88213</span> (Fulton
            Biologics) left cold transit for 26 min.
          </>
        ),
        actionProps: { children: "Review log" },
        duration: 600000,
      })
    }, 750)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.clearTimeout(t4)
    }
  }, [])

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Lab navigation */}
        <aside className="hidden w-60 shrink-0 flex-col border-r bg-card md:flex">
          <div className="flex items-center gap-2 px-4 py-4">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <TestTubes className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">HelixDx</p>
              <p className="font-caption text-caption text-muted-foreground">
                LabOps · Building C
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5 px-2" aria-label="Lab sections">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-foreground"
                    : "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto border-t px-4 py-4">
            <p className="font-caption text-caption text-muted-foreground">
              Cold storage
            </p>
            <p className="mt-1 font-code text-xs text-foreground">
              +4 °C · 82% full
            </p>
            <p className="font-code text-xs text-foreground">−20 °C · 41% full</p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-4">
            <Button variant="ghost" size="icon-sm" aria-label="Open navigation" className="md:hidden">
              <Menu />
            </Button>
            <p className="font-caption text-caption text-muted-foreground">
              Samples <span className="text-foreground/40">/</span>{" "}
              <span className="text-foreground">Active runs</span>
            </p>
            <div className="relative ml-auto w-64">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search samples, runs, clients" />
            </div>
            <Avatar>
              <AvatarFallback>LO</AvatarFallback>
            </Avatar>
          </header>

          <main className="min-h-0 flex-1 overflow-auto p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  Sample tracker
                </h1>
                <p className="font-caption text-caption text-muted-foreground">
                  Tuesday, Feb 10 · 88 active samples · 4 benches online
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Export manifest</Button>
                <Button>New intake</Button>
              </div>
            </div>

            {/* Bench KPIs */}
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {KPIS.map((kpi) => (
                <Card key={kpi.label} className="gap-1 rounded-lg px-4 py-3">
                  <p className="font-caption text-caption text-muted-foreground">
                    {kpi.label}
                  </p>
                  <p className="font-code text-2xl text-foreground">{kpi.value}</p>
                  <p className="font-caption text-caption text-muted-foreground">
                    {kpi.meta}
                  </p>
                </Card>
              ))}
            </div>

            {/* Active sample table */}
            <Card className="mt-4 gap-0 rounded-lg py-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sample</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Cold chain</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAMPLES.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-code text-xs text-foreground">
                        {s.id}
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {s.protocol}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {s.client}
                      </TableCell>
                      <TableCell className="text-right font-code text-xs text-muted-foreground">
                        {s.temp}
                      </TableCell>
                      <TableCell>{statusBadge(s.status)}</TableCell>
                      <TableCell className="text-right font-code text-xs text-muted-foreground">
                        {s.updated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </main>
        </div>
      </div>
    </EvalShell>
  )
}
