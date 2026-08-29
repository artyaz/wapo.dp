"use client"
// EVAL page — toast p3 — analytics dashboard for a specialty coffee chain —
// 834x1112 light — action toasts: four stacked notifications pinned open,
// each with an action (Undo / View / Reorder / Retry) plus close buttons —
// success, info, warning and a filled destructive variant. Dispatched a beat
// after mount through the app-level <Toaster /> (root layout).
// Co-stars: Card, Badge, Button, Progress, Table, Avatar.

import React from "react"
import {
  ChartPie,
  CircleAlert,
  CircleCheck,
  Coffee,
  FileText,
  RefreshCw,
  TriangleAlert,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { toast } from "@/components/ui/toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const KPIS = [
  { label: "Revenue", value: "$184,320", delta: "+8.2%", up: true, icon: TrendingUp },
  { label: "Avg ticket", value: "$9.14", delta: "+2.1%", up: true, icon: TrendingUp },
  { label: "Orders", value: "20,146", delta: "+5.4%", up: true, icon: TrendingUp },
  { label: "Loyalty signups", value: "1,032", delta: "−3.0%", up: false, icon: TrendingDown },
]

const CHANNELS = [
  { name: "In-store", share: 62 },
  { name: "App pickup", share: 21 },
  { name: "Delivery", share: 14 },
  { name: "Catering", share: 3 },
]

const DRINKS = [
  { name: "Cortado · Fulton", sold: "1,842", revenue: "$9,394" },
  { name: "Cold brew nitro", sold: "1,610", revenue: "$9,016" },
  { name: "Cardamom latte", sold: "1,284", revenue: "$8,219" },
  { name: "Espresso tonic", sold: "972", revenue: "$5,734" },
  { name: "Pour-over single origin", sold: "655", revenue: "$4,851" },
]

export default function Page() {
  // Morning-ops notifications for the regional manager: a completed reorder,
  // the weekly report, a low-stock warning and a POS sync failure. Each one
  // carries an action and stays open for the capture.
  React.useEffect(() => {
    const t1 = window.setTimeout(() => {
      toast.add({
        type: "success",
        icon: <CircleCheck className="size-4 text-success-500" />,
        title: "Reorder placed",
        description: "Oat milk · 24 cases to Fulton Market — arrives Thursday.",
        actionProps: { children: "Undo" },
        duration: 600000,
      })
    }, 300)
    const t2 = window.setTimeout(() => {
      toast.add({
        type: "error",
        icon: <CircleAlert className="size-4" />,
        title: "Register 04 offline",
        description: "Fulton Market POS hasn't synced since 09:42 — 3 orders queued.",
        actionProps: { children: "Retry" },
        duration: 600000,
      })
    }, 450)
    const t3 = window.setTimeout(() => {
      toast.add({
        type: "warning",
        icon: <TriangleAlert className="size-4 text-warning-500" />,
        title: "Low stock at Fulton",
        description: "Oat milk at 1.2 days of cover at the current run rate.",
        actionProps: { children: "Reorder" },
        duration: 600000,
      })
    }, 600)
    const t4 = window.setTimeout(() => {
      toast.add({
        type: "info",
        icon: <FileText className="size-4 text-muted-foreground" />,
        title: "Weekly report ready",
        description: "Metro North performance, Feb 3–9 — PDF, 12 pages.",
        actionProps: { children: "View" },
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
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[770px] flex-col px-6 py-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Coffee className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Roast &amp; Bloom</p>
            <p className="font-caption text-caption text-muted-foreground">
              Store analytics
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="font-code text-[10px]">
              FEB 3 – FEB 9
            </Badge>
            <Button variant="ghost" size="icon-sm" aria-label="Refresh data">
              <RefreshCw />
            </Button>
            <Avatar>
              <AvatarFallback>PN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page heading */}
        <div className="mt-5">
          <h1 className="font-heading-1 text-heading-1 text-foreground">
            Metro North weekly review
          </h1>
          <p className="font-caption text-caption text-muted-foreground">
            12 locations · week 6 of 2026 · comparable to week 5
          </p>
        </div>

        {/* KPI grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {KPIS.map((kpi) => (
            <Card key={kpi.label} className="gap-1.5 rounded-lg px-4 py-4">
              <p className="font-caption text-caption text-muted-foreground">
                {kpi.label}
              </p>
              <p className="font-code text-2xl text-foreground">{kpi.value}</p>
              <p className="flex items-center gap-1 font-code text-xs text-muted-foreground">
                <kpi.icon className="size-3.5" />
                {kpi.delta} vs last week
              </p>
            </Card>
          ))}
        </div>

        {/* Sales by channel */}
        <Card className="mt-4 rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ChartPie className="size-4 text-muted-foreground" />
              Sales by channel
            </CardTitle>
            <CardDescription>
              Share of net revenue across the region
            </CardDescription>
          </CardHeader>
          <div className="flex flex-col gap-3 px-6 pb-6">
            {CHANNELS.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm text-foreground">{c.name}</span>
                <Progress
                  value={c.share}
                  className="h-2 flex-1"
                  aria-label={`${c.name}, ${c.share}% of revenue`}
                />
                <span className="w-10 text-right font-code text-xs text-muted-foreground">
                  {c.share}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top drinks */}
        <Card className="mt-4 gap-0 rounded-lg py-0">
          <div className="px-6 pt-6">
            <CardTitle className="text-sm">Top drinks this week</CardTitle>
            <CardDescription className="mt-1">
              Units sold and net revenue, all locations
            </CardDescription>
          </div>
          <div className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drink</TableHead>
                  <TableHead className="text-right">Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DRINKS.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell className="text-sm text-foreground">{d.name}</TableCell>
                    <TableCell className="text-right font-code text-xs text-muted-foreground">
                      {d.sold}
                    </TableCell>
                    <TableCell className="text-right font-code text-xs text-foreground">
                      {d.revenue}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-4 flex items-center justify-between border-t pt-3">
          <p className="font-caption text-caption text-muted-foreground">
            Data refreshed 14:12 · POS sync every 15 min
          </p>
          <p className="font-code text-xs text-muted-foreground">RB-OPS v4.2</p>
        </footer>
      </div>
    </EvalShell>
  )
}
