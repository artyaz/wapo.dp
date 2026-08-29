"use client"
// EVAL page — resizable p1 — farm IoT sensor dashboard — 834x1112 light
// Resizable front and center: an IDE-style telemetry console. Outer horizontal
// group splits the sensor rack (left) from the focus column (right); a nested
// vertical group splits live telemetry (top) from the packet log (bottom).
// Visible withHandle grips in the system hairline style. Co-stars: Badge,
// Button, ScrollArea, Tabs, Table, Progress.

import {
  BatteryWarning,
  Download,
  Droplets,
  Gauge,
  Plus,
  RadioTower,
  RefreshCw,
  Thermometer,
  Waves,
  Wheat,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type NodeStatus = "ok" | "warn" | "alert"

const sensors: {
  id: string
  name: string
  metric: string
  value: string
  status: NodeStatus
  icon: typeof Droplets
  selected?: boolean
}[] = [
  { id: "PIVOT-E", name: "Pivot East", metric: "Flow", value: "214.6", status: "ok", icon: Gauge, selected: true },
  { id: "BARN-02", name: "Barn 2 · north bed", metric: "Soil moisture", value: "31.2", status: "ok", icon: Droplets },
  { id: "WELL-01", name: "Well head", metric: "Water level", value: "4.6", status: "warn", icon: Waves },
  { id: "SILO-01", name: "Grain silo", metric: "Core temp", value: "18.6", status: "alert", icon: Wheat },
  { id: "GH-03", name: "Greenhouse 3", metric: "Air temp", value: "24.1", status: "ok", icon: Thermometer },
  { id: "GH-03", name: "Greenhouse 3", metric: "Humidity", value: "68.2", status: "ok", icon: Droplets },
  { id: "FENCE-N", name: "North fence line", metric: "Battery", value: "11.9", status: "warn", icon: BatteryWarning },
]

const statusDot: Record<NodeStatus, string> = {
  ok: "bg-success-500",
  warn: "bg-warning-500",
  alert: "bg-destructive-500",
}

// 24 hourly flow samples, L/min — monochrome bars, weight = hierarchy.
const flow = [12, 18, 24, 31, 40, 52, 61, 58, 64, 72, 88, 96, 92, 85, 102, 118, 126, 121, 134, 148, 162, 158, 171, 188]

const packets: {
  time: string
  node: string
  metric: string
  value: string
  status: NodeStatus
  label: string
}[] = [
  { time: "09:41:07", node: "BARN-02", metric: "Soil moisture", value: "31.2 %vol", status: "ok", label: "OK" },
  { time: "09:40:52", node: "PIVOT-E", metric: "Flow", value: "214.6 L/min", status: "ok", label: "OK" },
  { time: "09:40:31", node: "SILO-01", metric: "Grain temp", value: "18.6 °C", status: "alert", label: "Alert" },
  { time: "09:39:58", node: "WELL-01", metric: "Water level", value: "4.6 m", status: "warn", label: "Low" },
  { time: "09:39:44", node: "GH-03", metric: "Air temp", value: "24.1 °C", status: "ok", label: "OK" },
  { time: "09:39:12", node: "FENCE-N", metric: "Battery", value: "11.9 V", status: "warn", label: "Low" },
  { time: "09:38:57", node: "GH-03", metric: "Humidity", value: "68.2 %", status: "ok", label: "OK" },
  { time: "09:38:20", node: "PIVOT-W", metric: "Flow", value: "0.0 L/min", status: "ok", label: "Idle" },
]

const stats = [
  { label: "Current flow", value: "214.6", unit: "L/min" },
  { label: "Pumped today", value: "38.2", unit: "m³" },
  { label: "24 h peak", value: "268.1", unit: "L/min" },
]

function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b px-5">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg border">
              <RadioTower className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading-3 text-heading-3 leading-tight">
                Hollow Pine Farm
              </span>
              <span className="font-caption text-caption text-muted-foreground">
                AgraSense · field telemetry
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success-500" />
              <span className="font-caption text-caption text-muted-foreground">
                Gateway GW-1 online · last packet 12 s ago
              </span>
            </span>
            <Button variant="outline" size="sm">
              <Download />
              Export
            </Button>
            <Button size="sm">
              <RefreshCw />
              Refresh
            </Button>
          </div>
        </header>

        {/* Resizable console */}
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-0 flex-1"
        >
          {/* Sensor rack */}
          <ResizablePanel defaultSize={30} minSize={22}>
            <div className="flex h-full flex-col">
              <div className="flex h-11 shrink-0 items-center justify-between border-b px-4">
                <span className="font-heading-3 text-heading-3">Sensors</span>
                <Button variant="outline" size="icon-xs" aria-label="Pair a sensor">
                  <Plus />
                </Button>
              </div>
              <ScrollArea className="min-h-0 flex-1">
                <ul className="divide-y">
                  {sensors.map((sensor, i) => (
                    <li
                      key={`${sensor.id}-${i}`}
                      className={
                        sensor.selected
                          ? "flex items-center gap-2.5 border-s-2 border-foreground bg-muted px-3.5 py-2.5"
                          : "flex items-center gap-2.5 px-4 py-2.5"
                      }
                    >
                      <sensor.icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium">
                          {sensor.name}
                        </span>
                        <span className="font-code text-code text-muted-foreground">
                          {sensor.id} · {sensor.metric}
                        </span>
                      </span>
                      <span className="flex flex-col items-end gap-1">
                        <span className="font-code text-code">{sensor.value}</span>
                        <span className={`size-1.5 rounded-full ${statusDot[sensor.status]}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="flex h-11 shrink-0 items-center justify-between border-t px-4">
                <span className="font-caption text-caption text-muted-foreground">
                  7 nodes · 2 alerts
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-code text-code text-muted-foreground">
                    GW-1 battery
                  </span>
                  <Progress value={81} className="h-1.5 w-14" aria-hidden="true" />
                </span>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Focus column */}
          <ResizablePanel defaultSize={70}>
            <ResizablePanelGroup direction="vertical">
              {/* Live telemetry */}
              <ResizablePanel defaultSize={62} minSize={40}>
                <div className="flex h-full flex-col">
                  <div className="flex h-14 shrink-0 items-center justify-between border-b px-5">
                    <div className="flex flex-col">
                      <span className="font-caption text-caption text-muted-foreground">
                        PIVOT-E · flow meter · SF9 · RSSI −87 dBm
                      </span>
                      <h2 className="font-heading-2 text-heading-2 leading-tight">
                        Irrigation flow — Pivot East
                      </h2>
                    </div>
                    <Tabs defaultValue="24h">
                      <TabsList>
                        <TabsTrigger value="24h">24 h</TabsTrigger>
                        <TabsTrigger value="7d">7 d</TabsTrigger>
                        <TabsTrigger value="30d">30 d</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="grid shrink-0 grid-cols-3 divide-x border-b">
                    {stats.map((stat) => (
                      <div key={stat.label} className="px-5 py-3">
                        <p className="font-caption text-caption text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="flex items-baseline gap-1.5">
                          <span className="font-code text-2xl text-foreground">
                            {stat.value}
                          </span>
                          <span className="font-code text-code text-muted-foreground">
                            {stat.unit}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 24 h monochrome bar chart */}
                  <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
                    <div className="flex min-h-0 flex-1 items-end gap-1.5">
                      {flow.map((v, i) => (
                        <div
                          key={i}
                          className={`w-full rounded-sm ${i === flow.length - 1 ? "bg-neutral-800" : "bg-neutral-300"}`}
                          style={{ height: `${(v / 200) * 100}%` }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2">
                      {["10:00", "13:00", "16:00", "19:00", "22:00", "01:00", "04:00", "07:00", "09:41"].map(
                        (label) => (
                          <span
                            key={label}
                            className="font-code text-code text-muted-foreground"
                          >
                            {label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Packet log */}
              <ResizablePanel defaultSize={38} minSize={24}>
                <div className="flex h-full flex-col">
                  <div className="flex h-11 shrink-0 items-center justify-between border-b px-5">
                    <span className="font-heading-3 text-heading-3">
                      Recent packets
                    </span>
                    <Button variant="ghost" size="sm">
                      View full log
                    </Button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="ps-5">Time</TableHead>
                          <TableHead>Node</TableHead>
                          <TableHead>Metric</TableHead>
                          <TableHead className="text-end">Value</TableHead>
                          <TableHead className="pe-5 text-end">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {packets.map((p) => (
                          <TableRow key={p.time}>
                            <TableCell className="ps-5 font-code text-code">
                              {p.time}
                            </TableCell>
                            <TableCell className="font-code text-code text-muted-foreground">
                              {p.node}
                            </TableCell>
                            <TableCell className="text-sm">{p.metric}</TableCell>
                            <TableCell className="text-end font-code text-code">
                              {p.value}
                            </TableCell>
                            <TableCell className="pe-5 text-end">
                              {p.status === "ok" ? (
                                <Badge variant="outline">{p.label}</Badge>
                              ) : p.status === "warn" ? (
                                <Badge variant="outline" className="border-warning-300 text-warning-600">
                                  {p.label}
                                </Badge>
                              ) : (
                                <Badge variant="destructive">{p.label}</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </EvalShell>
  )
}

export default Page
