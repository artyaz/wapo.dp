"use client"

// EVAL page — mention p3 — farm IoT sensor dashboard — 1180x820 light

import { RadioTowerIcon, SendIcon } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MentionInput, MentionTag } from "@/components/ui/mention"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SENSOR_TAGS = [
  {
    id: "g-soil-moisture",
    value: "soil-moisture",
    label: "soil-moisture",
    description: "Soil · 8 probes",
  },
  {
    id: "g-soil-north",
    value: "soil-north",
    label: "soil-north",
    description: "North pivot · SOIL-04",
  },
  {
    id: "g-soil-south",
    value: "soil-south",
    label: "soil-south",
    description: "South pivot · SOIL-07",
  },
  {
    id: "g-irrigation-north",
    value: "irrigation-north",
    label: "irrigation-north",
    description: "Pump + flow · FLOW-03",
  },
  {
    id: "g-barn-temp",
    value: "barn-temp",
    label: "barn-temp",
    description: "Barn 2 · TEMP-02",
  },
  {
    id: "g-frost-risk",
    value: "frost-risk",
    label: "frost-risk",
    description: "Forecast rule · 4 stations",
  },
]

const CREW = [
  { id: "c-elena", value: "elena", label: "Elena Rowan", description: "Owner · operator" },
  { id: "c-miguel", value: "miguel", label: "Miguel Santos", description: "Field technician" },
  { id: "c-june", value: "june", label: "June Park", description: "Agronomist" },
]

const SENSORS = [
  {
    id: "SOIL-04",
    zone: "North pivot",
    reading: "31% moisture",
    time: "06:40",
    status: "warning" as const,
    statusLabel: "Battery 11%",
  },
  {
    id: "SOIL-07",
    zone: "South pivot",
    reading: "28% moisture",
    time: "06:38",
    status: "ok" as const,
    statusLabel: "OK",
  },
  {
    id: "TEMP-02",
    zone: "Barn 2",
    reading: "12.4 °C",
    time: "06:41",
    status: "ok" as const,
    statusLabel: "OK",
  },
  {
    id: "FLOW-03",
    zone: "Irrigation north",
    reading: "41 L/min",
    time: "06:39",
    status: "fault" as const,
    statusLabel: "No link",
  },
  {
    id: "GATE-01",
    zone: "East gate",
    reading: "0% open",
    time: "23:12",
    status: "ok" as const,
    statusLabel: "OK",
  },
]

const RECENT_ALERTS = [
  {
    time: "Yesterday · 21:04",
    text: "Frost advisory issued — row covers staged by the equipment shed.",
    tags: ["frost-risk", "barn-temp"],
  },
  {
    time: "Nov 12 · 07:15",
    text: "Irrigation north pump cycled twice overnight — inspect the relay.",
    tags: ["irrigation-north"],
  },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1128px] flex-col gap-6 px-6 py-6">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm">
              <RadioTowerIcon className="size-5" />
            </div>
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Sensor ops
              </h1>
              <p className="text-muted-foreground mt-1 text-xs">
                Rowan Field Farm · Cedar Falls, IA · 6 zones · 24 sensors ·
                readings every 15 min
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-amber-500/40 text-amber-700"
            >
              1 sensor needs attention
            </Badge>
            <Button variant="outline" size="sm">
              Run diagnostics
            </Button>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_408px]">
          {/* Sensor table */}
          <Card className="gap-4 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Live readings</CardTitle>
              <CardDescription className="text-xs">
                Last sync 06:41 · gateway GW-1 via LoRa
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Sensor</TableHead>
                    <TableHead className="text-xs">Zone</TableHead>
                    <TableHead className="text-xs">Reading</TableHead>
                    <TableHead className="text-xs">Seen</TableHead>
                    <TableHead className="text-xs text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SENSORS.map((sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell className="font-code text-xs text-foreground">
                        {sensor.id}
                      </TableCell>
                      <TableCell className="text-xs">
                        {sensor.zone}
                      </TableCell>
                      <TableCell className="font-code text-xs tabular-nums text-foreground">
                        {sensor.reading}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-code text-xs tabular-nums">
                        {sensor.time}
                      </TableCell>
                      <TableCell className="text-right">
                        {sensor.status === "warning" ? (
                          <Badge
                            variant="outline"
                            className="border-amber-500/40 text-amber-700"
                          >
                            {sensor.statusLabel}
                          </Badge>
                        ) : sensor.status === "fault" ? (
                          <Badge
                            variant="outline"
                            className="border-destructive/40 text-destructive"
                          >
                            {sensor.statusLabel}
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            {sensor.statusLabel}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Alert composer */}
          <div className="flex min-w-0 flex-col gap-5">
            <Card className="gap-4 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Compose alert</CardTitle>
                <CardDescription className="text-xs">
                  Tag sensors or zones with <span className="font-code">#</span>{" "}
                  and page the crew with <span className="font-code">@</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <MentionInput
                  aria-label="Compose sensor alert"
                  placeholder="Describe the alert… # tags sensors, @ pages crew"
                  mentions={[
                    {
                      trigger: "#",
                      label: "Sensors & zones",
                      data: SENSOR_TAGS,
                    },
                    { trigger: "@", label: "Crew", data: CREW },
                  ]}
                  defaultValue={[
                    "Battery at 11% on ",
                    { trigger: "#", value: "soil-north", label: "soil-north" },
                    " — pinging ",
                    { trigger: "@", value: "elena", label: "Elena Rowan" },
                    " before tonight's frost window. Tagging ",
                  ]}
                  defaultQuery={{ trigger: "#", query: "so" }}
                  showHints
                />
              </CardContent>
              <CardFooter className="gap-2 px-4">
                <Button size="sm">
                  <SendIcon />
                  Send alert
                </Button>
                <Button size="sm" variant="outline">
                  Preview SMS
                </Button>
                <span className="text-muted-foreground ms-auto font-code text-xs">
                  3 recipients
                </span>
              </CardFooter>
            </Card>

            {/* Recent alerts */}
            <section aria-labelledby="recent-alerts" className="flex flex-col gap-3">
              <h2
                id="recent-alerts"
                className="text-sm font-medium text-foreground"
              >
                Recent alerts
              </h2>
              {RECENT_ALERTS.map((alert) => (
                <div
                  key={alert.time}
                  className="bg-card flex flex-col gap-1.5 rounded-lg border px-4 py-3"
                >
                  <p className="text-muted-foreground font-code text-[11px]">
                    {alert.time}
                  </p>
                  <p className="text-sm leading-5 text-foreground">
                    {alert.text}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {alert.tags.map((tag) => (
                      <MentionTag key={tag}>{tag}</MentionTag>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>

        <footer className="text-muted-foreground mt-auto flex items-center justify-between pt-2 text-[11px]">
          <span>Gateway GW-1 · uptime 14d 06h</span>
          <span className="font-code">v2.7.1 · LORA-915</span>
        </footer>
      </div>
    </EvalShell>
  )
}
