"use client"

// EVAL page — chart p2 — scientific lab sample tracker — 834x1112 dark
// Chart family (line + stacked bar + monitoring line) + Card, Badge, Button,
// Table, Avatar. Charts are in-flow laid content: flat panel + hairline
// border, series colors from the --chart-1..5 neutral tokens (tuned for dark
// surfaces). Semantic red only on QC flags — meaning, not decoration.

import {
  ArrowUpRight,
  Download,
  FlaskConical,
  Plus,
  Snowflake,
  TestTube,
  Timer,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// --- mock data: Lab 4B intake desk, Thursday shift -----------------------

const throughput = [
  { day: "Mon", received: 78, reported: 64 },
  { day: "Tue", received: 82, reported: 70 },
  { day: "Wed", received: 75, reported: 61 },
  { day: "Thu", received: 91, reported: 73 },
  { day: "Fri", received: 84, reported: 77 },
  { day: "Sat", received: 62, reported: 58 },
  { day: "Sun", received: 86, reported: 61 },
]

const queueByAssay = [
  { assay: "PCR", active: 8, queued: 4 },
  { assay: "ELISA", active: 4, queued: 2 },
  { assay: "HPLC", active: 3, queued: 1 },
  { assay: "Spectro", active: 1, queued: 1 },
  { assay: "Culture", active: 1, queued: 0 },
]

const freezerLog = [
  { time: "13:00", temp: -20.6 },
  { time: "14:00", temp: -20.4 },
  { time: "15:00", temp: -20.5 },
  { time: "16:00", temp: -20.1 },
  { time: "17:00", temp: -19.4 },
  { time: "18:00", temp: -19.8 },
  { time: "19:00", temp: -20.2 },
  { time: "20:00", temp: -20.5 },
  { time: "21:00", temp: -20.7 },
  { time: "22:00", temp: -20.8 },
  { time: "23:00", temp: -20.9 },
  { time: "00:00", temp: -21.0 },
]

const samples = [
  {
    id: "HLX-2417",
    assay: "PCR panel · respiratory",
    analyst: "M. Reyes",
    initials: "MR",
    received: "08:42",
    status: "Processing",
    variant: "default" as const,
  },
  {
    id: "HLX-2418",
    assay: "ELISA · vitamin D",
    analyst: "J. Okafor",
    initials: "JO",
    received: "09:05",
    status: "Queued",
    variant: "outline" as const,
  },
  {
    id: "HLX-2421",
    assay: "HPLC · heavy metals",
    analyst: "A. Lindqvist",
    initials: "AL",
    received: "09:31",
    status: "QC hold",
    variant: "outline" as const,
  },
  {
    id: "HLX-2422",
    assay: "Blood culture · 2 bottles",
    analyst: "M. Reyes",
    initials: "MR",
    received: "10:12",
    status: "STAT",
    variant: "default" as const,
  },
]

const throughputConfig = {
  received: { label: "Received", color: "var(--chart-1)" },
  reported: { label: "Reported", color: "var(--chart-5)" },
} satisfies ChartConfig

const queueConfig = {
  active: { label: "In progress", color: "var(--chart-1)" },
  queued: { label: "Waiting", color: "var(--chart-2)" },
} satisfies ChartConfig

const freezerConfig = {
  temp: { label: "Freezer C2", color: "var(--chart-1)" },
} satisfies ChartConfig

const kpis = [
  {
    icon: TestTube,
    label: "Received today",
    value: "86",
    sub: "vs 78 rolling average",
  },
  {
    icon: FlaskConical,
    label: "Reported",
    value: "61",
    sub: "median turnaround 5.4\u00A0h",
  },
  {
    icon: Timer,
    label: "In queue",
    value: "25",
    sub: "3 due within the hour",
  },
  {
    icon: Snowflake,
    label: "QC flags",
    value: "3",
    sub: "+2 vs yesterday",
    danger: true,
  },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[834px] flex-col gap-4 px-6 py-5">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-caption text-caption text-muted-foreground">
              Helix Diagnostics · Building C · Lab 4B · shift B
            </p>
            <h1 className="font-heading-1 text-heading-1 text-foreground">
              Sample tracker
            </h1>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Button variant="outline" size="sm">
              <Download />
              Export CSV
            </Button>
            <Button size="sm">
              <Plus />
              Register sample
            </Button>
          </div>
        </header>

        {/* Intake KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Card key={k.label} className="gap-2 py-4">
              <CardContent className="px-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <k.icon className="size-3.5" />
                  <span className="font-caption text-caption">{k.label}</span>
                </div>
                <p
                  className={
                    k.danger
                      ? "font-code text-2xl leading-none text-destructive-500"
                      : "font-code text-2xl leading-none text-foreground"
                  }
                >
                  {k.value}
                </p>
                <p className="font-caption text-caption text-muted-foreground">
                  {k.danger ? (
                    <span className="inline-flex items-center gap-0.5">
                      <ArrowUpRight className="size-3" />
                      {k.sub}
                    </span>
                  ) : (
                    k.sub
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Throughput + queue */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="text-sm">Throughput · last 7 days</CardTitle>
              <CardDescription>Samples received vs reported</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <ChartContainer
                config={throughputConfig}
                className="h-[188px] w-full aspect-auto"
              >
                <LineChart accessibilityLayer data={throughput} margin={{ left: 0, right: 6 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    domain={[40, 100]}
                    ticks={[40, 60, 80, 100]}
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tickMargin={4}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    defaultIndex={3}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    dataKey="received"
                    type="monotone"
                    stroke="var(--color-received)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="reported"
                    type="monotone"
                    stroke="var(--color-reported)"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    dot={{ r: 2.5, strokeWidth: 0, fill: "var(--color-reported)" }}
                    activeDot={{ r: 3.5, strokeWidth: 0 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="gap-3 py-4">
            <CardHeader>
              <CardTitle className="text-sm">Queue by assay</CardTitle>
              <CardDescription>
                PCR holds 48% of the open queue
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <ChartContainer
                config={queueConfig}
                className="h-[188px] w-full aspect-auto"
              >
                <BarChart
                  accessibilityLayer
                  data={queueByAssay}
                  margin={{ left: 0, right: 6 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="assay"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    domain={[0, 12]}
                    ticks={[0, 4, 8, 12]}
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                    tickMargin={4}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="active" stackId="a" fill="var(--color-active)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="queued" stackId="a" fill="var(--color-queued)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Cold chain monitoring */}
        <Card className="gap-3 py-4">
          <CardHeader>
            <CardTitle className="text-sm">Cold chain · Freezer C2</CardTitle>
            <CardDescription>
              Hourly log · alarm limit −18.0°C · door openings 09:15, 14:40
            </CardDescription>
            <CardAction>
              <Badge variant="outline">Nominal</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer
              config={freezerConfig}
              className="h-[150px] w-full aspect-auto"
            >
              <LineChart accessibilityLayer data={freezerLog} margin={{ left: 0, right: 6 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={2}
                />
                <YAxis
                  domain={[-22, -17]}
                  ticks={[-22, -20, -18]}
                  tickLine={false}
                  axisLine={false}
                  width={52}
                  tickMargin={4}
                  tickFormatter={(value: number) => `${value}°`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine
                  y={-18}
                  stroke="var(--border)"
                  strokeDasharray="4 3"
                />
                <Line
                  dataKey="temp"
                  type="monotone"
                  stroke="var(--color-temp)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Active samples */}
        <Card className="gap-3 py-4">
          <CardHeader>
            <CardTitle className="text-sm">Active samples · rack B</CardTitle>
            <CardDescription>
              4 of 25 in queue · priority order applied
            </CardDescription>
            <CardAction>
              <Badge variant="outline">Updated 14:38</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Sample</TableHead>
                  <TableHead>Assay</TableHead>
                  <TableHead>Analyst</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="py-2.5 pl-6 font-code text-xs text-foreground">
                      {s.id}
                    </TableCell>
                    <TableCell className="py-2.5 text-sm text-muted-foreground">
                      {s.assay}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <span className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">
                            {s.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{s.analyst}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 text-right font-code text-xs text-muted-foreground">
                      {s.received}
                    </TableCell>
                    <TableCell className="py-2.5 pr-6 text-right">
                      <Badge
                        variant={s.variant}
                        className={
                          s.status === "QC hold"
                            ? "border-destructive-600 text-destructive-400"
                            : undefined
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-code text-xs text-muted-foreground">
            LIMS v4.2.1 · last sync 14:38:12 · 3 analysts on shift
          </span>
          <Button variant="ghost" size="sm">
            Audit log
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
