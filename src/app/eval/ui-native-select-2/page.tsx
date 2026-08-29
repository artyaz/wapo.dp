"use client";

/**
 * EVAL page — native-select p2 — craft brewery tap list — 1180x820 dark.
 * Hero: NativeSelect (tap wall filters + assign-handle form). Supporting:
 * Table, Card, Badge, Button, Progress, Switch.
 */

import {
  BeerIcon,
  GaugeIcon,
  FlaskConicalIcon,
  ReceiptIcon,
  PlusIcon,
  ArrowDownUpIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/ui/native-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const nav = [
  { label: "Tap wall", icon: BeerIcon, active: true },
  { label: "Keg room", icon: GaugeIcon, active: false },
  { label: "Brew log", icon: FlaskConicalIcon, active: false },
  { label: "Sales", icon: ReceiptIcon, active: false },
];

const taps = [
  {
    handle: "1",
    beer: "Rolling Boiler",
    style: "Vienna Lager",
    abv: "5.2",
    ibu: "18",
    keg: 72,
    status: "On tap",
    badge: "secondary" as const,
  },
  {
    handle: "2",
    beer: "Magnetic North",
    style: "Hazy IPA",
    abv: "6.8",
    ibu: "42",
    keg: 24,
    status: "Low",
    badge: "outline" as const,
  },
  {
    handle: "3",
    beer: "Quench Zone",
    style: "Bavarian Hefeweizen",
    abv: "5.4",
    ibu: "12",
    keg: 81,
    status: "On tap",
    badge: "secondary" as const,
  },
  {
    handle: "7",
    beer: "Pig Iron Stout",
    style: "Oatmeal Stout",
    abv: "6.1",
    ibu: "32",
    keg: 9,
    status: "Low",
    badge: "outline" as const,
  },
  {
    handle: "9",
    beer: "Stray Voltage",
    style: "Table Beer",
    abv: "3.9",
    ibu: "15",
    keg: 0,
    status: "Kicked",
    badge: "destructive" as const,
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Sidebar */}
        <aside className="flex w-56 shrink-0 flex-col border-e bg-card">
          <div className="border-b px-4 py-4">
            <p className="font-code text-[10px] uppercase tracking-wide text-muted-foreground">
              Est. 2017 · Pittsburgh
            </p>
            <p className="font-heading-1 text-lg font-semibold leading-tight">
              Ferrous Wheel
            </p>
            <p className="text-xs text-muted-foreground">Brewing Co.</p>
          </div>
          <nav className="flex flex-col gap-1 p-2" aria-label="Brewery sections">
            {nav.map((item) => (
              <span
                key={item.label}
                aria-current={item.active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm ${
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto border-t px-4 py-3">
            <p className="font-code text-[10px] text-muted-foreground">
              taplist v4.2 · kegerators 3
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-start justify-between gap-4 border-b px-6 py-5">
            <div>
              <h1 className="font-heading-1 text-2xl font-semibold leading-tight">
                Tap wall
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                12 handles across main bar &amp; annex · keg levels sync every
                pour · updated 4 min ago
              </p>
            </div>
            <Button>
              <PlusIcon aria-hidden="true" />
              Add beer
            </Button>
          </header>

          <main className="grid gap-6 p-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            {/* Tap list */}
            <Card className="gap-0 py-0">
              <CardHeader className="border-b py-4 [.border-b]:pb-4">
                <CardTitle className="text-sm">Handles on deck</CardTitle>
                <CardDescription className="text-xs">
                  Showing 5 of 12 handles · 4 on tap · 2 low · 1 kicked
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Filter toolbar — dense native selects fit a data screen */}
                <div className="flex flex-wrap items-center gap-2 border-b px-4 py-3">
                  <NativeSelect
                    aria-label="Filter by style"
                    className="h-8 w-[150px] text-xs"
                  >
                    <NativeSelectOption value="">All styles</NativeSelectOption>
                    <NativeSelectOption value="lager">Lagers</NativeSelectOption>
                    <NativeSelectOption value="ipa">IPAs</NativeSelectOption>
                    <NativeSelectOption value="stout">Stouts</NativeSelectOption>
                    <NativeSelectOption value="sour">Sours</NativeSelectOption>
                  </NativeSelect>
                  <NativeSelect
                    aria-label="Filter by location"
                    className="h-8 w-[140px] text-xs"
                  >
                    <NativeSelectOption value="">All locations</NativeSelectOption>
                    <NativeSelectOption value="main">Main bar</NativeSelectOption>
                    <NativeSelectOption value="annex">Annex</NativeSelectOption>
                    <NativeSelectOption value="patio">Patio</NativeSelectOption>
                  </NativeSelect>
                  <NativeSelect
                    aria-label="Filter by status"
                    className="h-8 w-[120px] text-xs"
                  >
                    <NativeSelectOption value="">Any status</NativeSelectOption>
                    <NativeSelectOption value="on">On tap</NativeSelectOption>
                    <NativeSelectOption value="low">Low</NativeSelectOption>
                    <NativeSelectOption value="kicked">Kicked</NativeSelectOption>
                  </NativeSelect>
                  <Button variant="outline" size="sm" className="h-8">
                    <ArrowDownUpIcon aria-hidden="true" />
                    Sort
                  </Button>
                  <span className="ms-auto font-code text-[10px] text-muted-foreground">
                    last pour 14:07 · tap 3
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14 ps-4">Tap</TableHead>
                      <TableHead>Beer</TableHead>
                      <TableHead>Style</TableHead>
                      <TableHead className="text-end">ABV</TableHead>
                      <TableHead className="text-end">IBU</TableHead>
                      <TableHead className="w-36">Keg level</TableHead>
                      <TableHead className="pe-4 text-end">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taps.map((t) => (
                      <TableRow key={t.handle}>
                        <TableCell className="ps-4 font-code text-xs text-muted-foreground">
                          #{t.handle}
                        </TableCell>
                        <TableCell className="font-medium">{t.beer}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {t.style}
                        </TableCell>
                        <TableCell className="text-end font-code text-xs">
                          {t.abv}%
                        </TableCell>
                        <TableCell className="text-end font-code text-xs">
                          {t.ibu}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={t.keg} className="h-1.5 w-20" />
                            <span className="font-code text-[10px] text-muted-foreground">
                              {t.keg}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="pe-4 text-end">
                          <Badge variant={t.badge}>{t.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Assign a handle */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-sm">Assign a handle</CardTitle>
                <CardDescription className="text-xs">
                  Tap 9 kicked 40 min ago — cold storage has 6 kegs ready.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="handle" className="text-sm font-medium">
                    Tap handle
                  </label>
                  <NativeSelect id="handle" className="h-10" defaultValue="9">
                    <NativeSelectOptGroup label="Main bar">
                      {["5", "6", "7", "8"].map((h) => (
                        <NativeSelectOption key={h} value={h}>
                          Tap {h}
                        </NativeSelectOption>
                      ))}
                    </NativeSelectOptGroup>
                    <NativeSelectOptGroup label="Annex">
                      <NativeSelectOption value="9">Tap 9 — available</NativeSelectOption>
                      <NativeSelectOption value="10">Tap 10</NativeSelectOption>
                      <NativeSelectOption value="12">Tap 12</NativeSelectOption>
                    </NativeSelectOptGroup>
                  </NativeSelect>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="keg" className="text-sm font-medium">
                    Keg from cold storage
                  </label>
                  <NativeSelect id="keg" defaultValue="amber">
                    <NativeSelectOption value="amber">
                      Redline Amber Ale · 4.8%
                    </NativeSelectOption>
                    <NativeSelectOption value="brown">
                      Cinderblock Brown · 5.6%
                    </NativeSelectOption>
                    <NativeSelectOption value="ipa">
                      Hop Cache IPA · 6.9%
                    </NativeSelectOption>
                    <NativeSelectOption value="sour">
                      Solera Sour — Cherry · 5.1%
                    </NativeSelectOption>
                  </NativeSelect>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">Publish to digital menu</p>
                    <p className="text-xs text-muted-foreground">
                      Website &amp; Untappd sync
                    </p>
                  </div>
                  <Switch defaultChecked aria-label="Publish to digital menu" />
                </div>
                <Button className="w-full">Assign keg to tap 9</Button>
              </CardContent>
            </Card>
          </main>

          <footer className="mt-auto border-t px-6 py-2.5">
            <p className="font-code text-[10px] text-muted-foreground">
              pours today 211 · pints 189 · tallest pour 0.9 L · cellar temp 4.1°C
            </p>
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
