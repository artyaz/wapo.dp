"use client"

// EVAL page — combobox p2 — flight booking flow — 1280x800 dark
// Combobox (grouped destination search open at render, closed origin search,
// multi-select airline chips) + Card, Tabs, Input, RadioGroup, Switch, Badge,
// Button, Separator, Avatar, Progress, Table, Label.

import { PlaneTakeoff, Search } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const origins = [
  { label: "SFO · San Francisco" },
  { label: "OAK · Oakland" },
  { label: "SJC · San Jose" },
  { label: "LAX · Los Angeles" },
]

const destinations = [
  {
    value: "Japan",
    items: [
      { label: "Tokyo Haneda", code: "HND" },
      { label: "Tokyo Narita", code: "NRT" },
      { label: "Osaka Kansai", code: "KIX" },
    ],
  },
  {
    value: "East Asia",
    items: [
      { label: "Seoul Incheon", code: "ICN" },
      { label: "Taipei Taoyuan", code: "TPE" },
      { label: "Hong Kong Intl", code: "HKG" },
    ],
  },
]

const carriers = [
  "Meridian Air",
  "CoastalJet",
  "Sky Alliance",
  "Polaris Pacific",
  "Aurora Airways",
]

const fares = [
  {
    flight: "MA 821",
    carrier: "Meridian Air",
    depart: "11:20",
    arrive: "15:05 +1",
    duration: "11h 45m",
    stops: "Nonstop",
    price: "$842",
    best: false,
  },
  {
    flight: "CJ 47",
    carrier: "CoastalJet",
    depart: "06:50",
    arrive: "13:30 +1",
    duration: "12h 40m",
    stops: "1 stop · SEA",
    price: "$698",
    best: true,
  },
  {
    flight: "SA 2211",
    carrier: "Sky Alliance",
    depart: "13:15",
    arrive: "19:55 +1",
    duration: "14h 40m",
    stops: "1 stop · ICN",
    price: "$756",
    best: false,
  },
  {
    flight: "PP 9",
    carrier: "Polaris Pacific",
    depart: "22:40",
    arrive: "04:30 +2",
    duration: "13h 50m",
    stops: "Nonstop",
    price: "$913",
    best: false,
  },
]

export default function Page() {
  const carrierAnchor = useComboboxAnchor()

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col gap-4 px-6 py-4">
        <header className="flex h-12 items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <PlaneTakeoff className="size-5 text-foreground" />
            <span className="font-heading-3 text-heading-3 text-foreground">
              Meridian Air
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <span className="font-medium text-foreground">Flights</span>
            <span className="text-muted-foreground">Stays</span>
            <span className="text-muted-foreground">Miles</span>
            <span className="text-muted-foreground">Check-in</span>
          </nav>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Gold · 18,400 mi</Badge>
            <Avatar size="sm">
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-4">
          {/* Search form */}
          <Card className="col-span-8 gap-4">
            <CardHeader>
              <CardTitle className="text-sm">Find flights</CardTitle>
              <CardDescription>
                San Francisco Bay Area · spring saver fares
              </CardDescription>
              <CardAction>
                <Badge variant="outline">SPRING26 applied</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="round">Round trip</TabsTrigger>
                  <TabsTrigger value="one">One way</TabsTrigger>
                  <TabsTrigger value="multi">Multi-city</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-2 gap-3">
                {/* Origin — closed, selection shown */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="origin-combobox">From</Label>
                  <Combobox items={origins} defaultValue={origins[0]}>
                    <ComboboxInput id="origin-combobox" />
                    <ComboboxContent>
                      <ComboboxEmpty>No airports match.</ComboboxEmpty>
                      <ComboboxList className="max-h-[200px]">
                        {(item) => (
                          <ComboboxItem key={item.label} value={item}>
                            <span className="truncate text-sm">
                              {item.label}
                            </span>
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>

                {/* Destination — grouped, searchable, open at render */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="dest-combobox">To</Label>
                  <Combobox items={destinations} defaultOpen autoHighlight>
                    <ComboboxInput
                      id="dest-combobox"
                      placeholder="Search destinations…"
                      showClear
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No destinations match.</ComboboxEmpty>
                      <ComboboxList className="max-h-none">
                        {(group, index) => (
                          <ComboboxGroup
                            key={group.value}
                            items={group.items}
                            className={
                              index === destinations.length - 1
                                ? "pb-0"
                                : undefined
                            }
                          >
                            <ComboboxLabel>{group.value}</ComboboxLabel>
                            <ComboboxCollection>
                              {(item) => (
                                <ComboboxItem
                                  key={item.code}
                                  value={item}
                                  className="gap-3"
                                >
                                  <span className="w-9 shrink-0 font-code text-xs text-muted-foreground">
                                    {item.code}
                                  </span>
                                  <span className="truncate text-sm">
                                    {item.label}
                                  </span>
                                </ComboboxItem>
                              )}
                            </ComboboxCollection>
                            {index < destinations.length - 1 && (
                              <ComboboxSeparator />
                            )}
                          </ComboboxGroup>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="depart">Depart</Label>
                <Input
                  id="depart"
                  defaultValue="Tue, Mar 24, 2026"
                  className="font-code"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Cabin</Label>
                <RadioGroup
                  defaultValue="economy"
                  className="flex-row flex-wrap gap-5"
                >
                  {[
                    { value: "economy", label: "Economy · Saver" },
                    { value: "premium", label: "Premium Economy" },
                    { value: "business", label: "Business" },
                  ].map((cabin) => (
                    <div key={cabin.value} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={cabin.value}
                        id={`cabin-${cabin.value}`}
                      />
                      <Label
                        htmlFor={`cabin-${cabin.value}`}
                        className="text-sm font-normal"
                      >
                        {cabin.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Carrier preference — multi-select chips */}
              <div className="flex flex-col gap-2">
                <Label>Preferred carriers</Label>
                <Combobox
                  items={carriers}
                  multiple
                  defaultValue={["Meridian Air", "CoastalJet"]}
                >
                  <ComboboxChips ref={carrierAnchor}>
                    <ComboboxValue>
                      {(values) => (
                        <>
                          {values.map((value) => (
                            <ComboboxChip key={value}>{value}</ComboboxChip>
                          ))}
                          <ComboboxChipsInput placeholder="Add carrier…" />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent anchor={carrierAnchor}>
                    <ComboboxEmpty>No carriers match.</ComboboxEmpty>
                    <ComboboxList className="max-h-[200px]">
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="flex items-center justify-between gap-4">
                <Button>
                  <Search />
                  Search flights
                </Button>
                <div className="flex items-center gap-2">
                  <Switch id="flex" defaultChecked />
                  <Label htmlFor="flex" className="text-sm font-normal">
                    Flexible dates (± 3 days)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip summary + miles */}
          <div className="col-span-4 flex flex-col gap-4">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle className="text-sm">Trip summary</CardTitle>
                <CardDescription>SFO → Tokyo · one way</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {[
                  { label: "Date", value: "Mar 24, 2026" },
                  { label: "Travelers", value: "2 adults" },
                  { label: "Cabin", value: "Economy · Saver" },
                  { label: "Carriers", value: "Meridian, CoastalJet" },
                ].map((row, index) => (
                  <div key={row.label}>
                    {index > 0 && <Separator className="mb-3" />}
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-caption text-caption text-muted-foreground">
                        {row.label}
                      </span>
                      <span className="font-code text-sm text-foreground">
                        {row.value}
                      </span>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex items-end justify-between gap-4">
                  <span className="font-caption text-caption text-muted-foreground">
                    Total · incl. taxes
                  </span>
                  <span className="font-code text-xl text-foreground">
                    $1,396.00
                  </span>
                </div>
                <Button className="w-full">Continue to seats</Button>
              </CardContent>
            </Card>

            <Card className="gap-2 py-4">
              <CardContent className="flex flex-col gap-2 px-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-caption text-caption text-muted-foreground">
                    Aurora Miles · Gold renewal
                  </span>
                  <Badge variant="secondary">On track</Badge>
                </div>
                <Progress value={72} aria-label="Miles toward Gold renewal" />
                <p className="font-code text-xs text-muted-foreground">
                  18,400 / 25,000 award miles · resets Dec 31
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fare results */}
        <Card className="gap-0 py-0">
          <CardContent className="px-0 pb-1">
            <Table>
              <TableCaption className="px-6 pb-2 pt-4 text-left">
                Lowest one-way fares · San Francisco → Tokyo · Tue, Mar 24
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Flight</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Depart → Arrive</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Stops</TableHead>
                  <TableHead className="pr-6 text-right">Fare</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fares.map((fare) => (
                  <TableRow key={fare.flight}>
                    <TableCell className="py-3 pl-6 font-code text-sm">
                      {fare.flight}
                    </TableCell>
                    <TableCell className="text-sm">{fare.carrier}</TableCell>
                    <TableCell className="py-3 font-code text-sm">
                      {fare.depart} → {fare.arrive}
                    </TableCell>
                    <TableCell className="font-code text-sm text-muted-foreground">
                      {fare.duration}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {fare.stops}
                    </TableCell>
                    <TableCell className="py-3 pr-6 text-right">
                      <span className="font-code text-sm text-foreground">
                        {fare.price}
                      </span>
                      {fare.best && (
                        <Badge variant="secondary" className="ms-2">
                          Lowest
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-code text-xs text-muted-foreground">
            Fares incl. taxes and fees · updated 14:02 UTC
          </span>
          <Button variant="ghost" size="sm">
            Refund rules
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
