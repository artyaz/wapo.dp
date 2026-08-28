"use client"
// EVAL page — collapsible p2 — analytics dashboard for a specialty coffee
// chain — 1024x768 dark
// Collapsible front and center: report sections (loyalty & retention open,
// beverage mix open, wholesale closed) plus a filters panel in the rail.
// Co-stars: Card, Badge, Button, Table, Progress, Checkbox, Separator.

import {
  ChevronDownIcon,
  CoffeeIcon,
  DownloadIcon,
  RefreshCwIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const sectionTrigger =
  "group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 [&[data-state=open]>svg]:rotate-180"

const kpis = [
  { label: "Net revenue", value: "$1.28M", delta: "+6.2%", up: true },
  { label: "Transactions", value: "214,380", delta: "+3.1%", up: true },
  { label: "Avg. ticket", value: "$5.97", delta: "−1.4%", up: false },
  { label: "Loyalty members", value: "18,204", delta: "+9.8%", up: true },
]

const stores = [
  { name: "Hayes Valley", revenue: "$312,480", trend: "+11.2%" },
  { name: "Ferry Building", revenue: "$298,150", trend: "+7.4%" },
  { name: "Berkeley", revenue: "$241,920", trend: "+4.9%" },
  { name: "Palo Alto", revenue: "$227,660", trend: "−2.3%" },
  { name: "SFO · Terminal 2", revenue: "$196,410", trend: "+14.6%" },
]

const cohorts = [
  { label: "Enrolled Apr 2026", retained: 68, note: "6-wk retention" },
  { label: "Enrolled May 2026", retained: 74, note: "5-wk retention" },
  { label: "Enrolled Jun 2026", retained: 81, note: "2-wk retention" },
]

const beverageMix = [
  { label: "Espresso drinks", share: 38 },
  { label: "Brewed coffee", share: 24 },
  { label: "Cold brew & nitro", share: 18 },
  { label: "Pastries & food", share: 12 },
  { label: "Whole-bean retail", share: 8 },
]

const regions = [
  { id: "sf", label: "San Francisco (2)", checked: true },
  { id: "east", label: "East Bay (2)", checked: true },
  { id: "pen", label: "Peninsula (1)", checked: false },
  { id: "sfo", label: "Airport (1)", checked: true },
]

function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[980px] flex-col gap-3 px-6 py-3">
        {/* Dashboard header */}
        <header className="flex items-center gap-4">
          <span className="flex size-9 items-center justify-center rounded-lg border">
            <CoffeeIcon className="size-4 text-foreground" />
          </span>
          <div>
            <h1 className="font-heading-3 text-heading-3 text-foreground">
              Meridian Coffee Roasters
            </h1>
            <p className="font-caption text-caption text-muted-foreground">
              Chain analytics · 6 locations · POS synced 4 min ago
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="font-code font-normal">
              May 16 – Jun 12, 2026
            </Badge>
            <Button variant="ghost" size="icon-sm" aria-label="Refresh data">
              <RefreshCwIcon />
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Export
            </Button>
          </div>
        </header>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-3">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="gap-1.5 py-2.5">
              <CardContent className="flex flex-col gap-1 px-4">
                <span className="font-caption text-caption text-muted-foreground">
                  {kpi.label}
                </span>
                <span className="font-code text-lg text-foreground">
                  {kpi.value}
                </span>
                <span
                  className={`font-code text-xs ${
                    kpi.up ? "text-success-600" : "text-destructive-500"
                  }`}
                >
                  {kpi.delta} vs prior 28 days
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_300px] items-start gap-3">
          {/* Report sections driven by Collapsible — the hero column */}
          <Card className="gap-2 py-3.5">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Report sections</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-4">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className={sectionTrigger}>
                  Loyalty &amp; retention
                  <span className="font-code text-xs font-normal text-muted-foreground">
                    3 cohorts
                  </span>
                  <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 px-2 pt-1 pb-2">
                    {cohorts.map((cohort) => (
                      <div key={cohort.label} className="flex flex-col gap-1.5">
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                          <span className="text-foreground">
                            {cohort.label}
                          </span>
                          <span className="font-code text-xs text-muted-foreground">
                            {cohort.note} · {cohort.retained}%
                          </span>
                        </div>
                        <Progress
                          value={cohort.retained}
                          aria-label={`${cohort.label} retention`}
                        />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Separator />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className={sectionTrigger}>
                  Beverage mix
                  <span className="font-code text-xs font-normal text-muted-foreground">
                    5 lines
                  </span>
                  <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 px-2 pt-1 pb-2">
                    {beverageMix.map((line) => (
                      <div key={line.label} className="flex flex-col gap-1.5">
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                          <span className="text-foreground">{line.label}</span>
                          <span className="font-code text-xs text-muted-foreground">
                            {line.share}%
                          </span>
                        </div>
                        <Progress
                          value={line.share}
                          aria-label={`${line.label} share of sales`}
                        />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Separator />
              <Collapsible>
                <CollapsibleTrigger className={sectionTrigger}>
                  Wholesale &amp; roastery
                  <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="px-2 py-1 text-sm text-muted-foreground">
                    14 wholesale accounts · $186,300 in the window
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Rail: store table + filters */}
          <div className="flex flex-col gap-3">
            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Store performance</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="whitespace-nowrap text-right">
                        Trend
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stores.map((store) => (
                      <TableRow key={store.name}>
                        <TableCell className="font-medium">
                          {store.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right font-code text-xs">
                          {store.revenue}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right font-code text-xs">
                          <span
                            className={
                              store.trend.startsWith("−")
                                ? "text-destructive-500"
                                : "text-success-600"
                            }
                          >
                            {store.trend}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="gap-2 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Filters</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 px-4">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className={sectionTrigger}>
                    Regions
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      5 of 6 stores
                    </span>
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col gap-2 px-2 pt-1 pb-2">
                      {regions.map((region) => (
                        <label
                          key={region.id}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          <Checkbox
                            id={`region-${region.id}`}
                            defaultChecked={region.checked}
                            aria-label={region.label}
                          />
                          <span className="text-sm text-foreground">
                            {region.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-2.5">
          <span className="font-caption text-caption text-muted-foreground">
            Meridian Coffee Roasters · internal analytics · figures exclude
            taxes
          </span>
          <span className="font-code text-xs text-muted-foreground">
            report #R-0612
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
