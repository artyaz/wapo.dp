"use client"

// EVAL page — chart p1 — farm IoT sensor dashboard — 430x932 light
// Chart family (area + bar + sparkline compositions) + Card, Badge, Button,
// Alert, Tabs, Separator. Charts are in-flow laid content: flat panel +
// hairline border, colors from the --chart-1..5 neutral tokens. Semantic
// color only where meaning demands (frost advisory, moisture deficit, solar).

import {
  ArrowDownRight,
  ArrowUpRight,
  Battery,
  Download,
  Droplets,
  RefreshCw,
  Signal,
  Thermometer,
  TriangleAlert,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- mock data: sensor S-114, North Field, last 24 h --------------------

const moisture24h = [
  { time: "00:00", moisture: 33.8 },
  { time: "03:00", moisture: 33.1 },
  { time: "06:00", moisture: 32.4 },
  { time: "09:00", moisture: 30.9 },
  { time: "12:00", moisture: 29.2 },
  { time: "15:00", moisture: 29.8 },
  { time: "18:00", moisture: 30.6 },
  { time: "21:00", moisture: 31.4 },
]

const irrigationZones = [
  { zone: "Zone A", yesterday: 412, average: 386 },
  { zone: "Zone B", yesterday: 356, average: 371 },
  { zone: "Zone C", yesterday: 289, average: 340 },
  { zone: "Zone D", yesterday: 385, average: 362 },
]

const batteryTrend = [
  { hour: "08", level: 71 },
  { hour: "10", level: 74 },
  { hour: "12", level: 79 },
  { hour: "14", level: 83 },
  { hour: "16", level: 84 },
]

const moistureConfig = {
  moisture: { label: "Soil moisture", color: "var(--chart-1)" },
} satisfies ChartConfig

const irrigationConfig = {
  yesterday: { label: "Yesterday", color: "var(--chart-1)" },
  average: { label: "7-day avg", color: "var(--chart-2)" },
} satisfies ChartConfig

const batteryConfig = {
  battery: { label: "Gateway battery", color: "var(--chart-1)" },
} satisfies ChartConfig

const stats = [
  {
    icon: Droplets,
    label: "Soil moisture",
    value: "31.4%",
    sub: "30 cm depth · field capacity 38%",
    delta: "-2.1 pts vs 7d",
    trend: "down" as const,
  },
  {
    icon: Thermometer,
    label: "Soil temp",
    value: "18.2°",
    sub: "Rising 0.3°/h since noon",
    delta: "+0.4° vs 7d",
    trend: "up" as const,
  },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col gap-3 px-4 py-4">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="font-caption text-caption text-muted-foreground">
              Willow Creek Farm · North Field · Block 7
            </p>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Sensor dashboard
            </h1>
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <Button variant="ghost" size="icon-sm" aria-label="Refresh readings">
              <RefreshCw />
            </Button>
            <Button variant="outline" size="sm">
              <Download />
              Export
            </Button>
          </div>
        </header>

        {/* Frost advisory — warning amber, meaning-bearing */}
        <Alert className="border-warning-300 text-warning-600">
          <TriangleAlert />
          <AlertTitle>Frost advisory tonight · 01:00–06:00</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Forecast low 1.2°C. Irrigation auto-paused on Zone C; row covers
            recommended for beds 12–18.
          </AlertDescription>
        </Alert>

        {/* Field readings — 2×2 in one flat panel */}
        <Card className="gap-4 py-4">
          <CardContent className="grid grid-cols-2 gap-x-4 gap-y-4 px-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <s.icon className="size-3.5" />
                  <span className="font-caption text-caption">{s.label}</span>
                </div>
                <p className="font-code text-2xl leading-none text-foreground">
                  {s.value}
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-caption text-caption text-muted-foreground">
                    {s.sub}
                  </span>
                </div>
                <span
                  className={
                    s.trend === "down"
                      ? "flex items-center gap-0.5 font-code text-xs text-destructive-600"
                      : "flex items-center gap-0.5 font-code text-xs text-success-600"
                  }
                >
                  {s.trend === "down" ? (
                    <ArrowDownRight className="size-3" />
                  ) : (
                    <ArrowUpRight className="size-3" />
                  )}
                  {s.delta}
                </span>
              </div>
            ))}
            <Separator className="col-span-2" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Battery className="size-3.5" />
                <span className="font-caption text-caption">
                  Gateway battery
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <p className="font-code text-2xl leading-none text-foreground">
                  84%
                </p>
                <span className="flex items-center gap-0.5 font-code text-xs text-success-600">
                  <ArrowUpRight className="size-3" />
                  +12% solar
                </span>
              </div>
              <ChartContainer
                config={batteryConfig}
                className="mt-1 h-9 w-full aspect-auto"
              >
                <AreaChart accessibilityLayer data={batteryTrend} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="hour" hide />
                  <YAxis domain={[60, 90]} hide />
                  <Area
                    dataKey="battery"
                    type="monotone"
                    stroke="var(--color-battery)"
                    strokeWidth={1.5}
                    fill="var(--color-battery)"
                    fillOpacity={0.12}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Signal className="size-3.5" />
                <span className="font-caption text-caption">LoRa signal</span>
              </div>
              <p className="font-code text-2xl leading-none text-foreground">
                −67
                <span className="text-sm text-muted-foreground"> dBm</span>
              </p>
              <span className="font-caption text-caption text-muted-foreground">
                14 nodes · 0 offline
              </span>
              <Badge variant="outline" className="w-fit">
                All sensors reporting
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Soil moisture — main area chart */}
        <Card className="gap-3 py-4">
          <CardHeader>
            <CardTitle className="text-sm">Soil moisture · S-114</CardTitle>
            <CardDescription>
              Volumetric water content (%) · 30 cm depth · last 24 h
            </CardDescription>
            <CardAction>
              <Tabs defaultValue="24h">
                <TabsList className="h-7">
                  <TabsTrigger value="24h" className="px-2 text-xs">
                    24 h
                  </TabsTrigger>
                  <TabsTrigger value="7d" className="px-2 text-xs">
                    7 d
                  </TabsTrigger>
                  <TabsTrigger value="30d" className="px-2 text-xs">
                    30 d
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardAction>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer
              config={moistureConfig}
              className="h-[164px] w-full aspect-auto"
            >
              <AreaChart accessibilityLayer data={moisture24h} margin={{ left: 0, right: 6 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={2}
                />
                <YAxis
                  domain={[26, 36]}
                  ticks={[28, 31, 34]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  width={48}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  defaultIndex={3}
                />
                <ReferenceLine
                  y={28}
                  stroke="var(--chart-3)"
                  strokeDasharray="4 3"
                />
                <Area
                  dataKey="moisture"
                  type="monotone"
                  stroke="var(--color-moisture)"
                  strokeWidth={2}
                  fill="var(--color-moisture)"
                  fillOpacity={0.14}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-between px-4">
            <span className="font-caption text-caption text-muted-foreground">
              Irrigation threshold 28%
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Next cycle 05:30 · Zone A–B
            </span>
          </CardFooter>
        </Card>

        {/* Irrigation draw — grouped bar chart */}
        <Card className="gap-3 py-4">
          <CardHeader>
            <CardTitle className="text-sm">Irrigation draw by zone</CardTitle>
            <CardDescription>
              Liters per cycle · yesterday vs 7-day average
            </CardDescription>
            <CardAction>
              <Badge variant="secondary">1,442 L total</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer
              config={irrigationConfig}
              className="h-[150px] w-full aspect-auto"
            >
              <BarChart
                accessibilityLayer
                data={irrigationZones}
                margin={{ left: 0, right: 6 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="zone"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  domain={[0, 450]}
                  ticks={[0, 150, 300, 450]}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tickFormatter={(value: number) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="yesterday"
                  fill="var(--color-yesterday)"
                  radius={3}
                />
                <Bar dataKey="average" fill="var(--color-average)" radius={3} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-between px-4">
            <span className="font-caption text-caption text-muted-foreground">
              Zone C held back · frost pause
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Pump pressure 2.8 bar
            </span>
          </CardFooter>
        </Card>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-code text-xs text-muted-foreground">
            Last sync 14:32:08 · gateway fw 2.7.1 · LoRa 868 MHz
          </span>
          <Button variant="ghost" size="sm">
            View logs
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
