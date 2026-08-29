"use client"
// EVAL page — item p1 — warehouse inventory console — 834x1112 light
// "Northline Fulfillment" Zone B tablet console. Item family showcase:
// replenishment queue (icon media + actionable rows), cycle-count team
// (avatar media), received pallets (image media), section header rows
// (ItemHeader), an open "Assign picker" DropdownMenu with Item rows.
// Co-stars: Card, Badge, Button, Avatar, InputGroup, Kbd, DropdownMenu,
// Progress, Separator. Flat panels + hairlines; shadow only on the menu.

import {
  BarcodeIcon,
  BoxesIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  ForkliftIcon,
  PackageIcon,
  ScanBarcodeIcon,
  SearchIcon,
  ShirtIcon,
  TagsIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Pallet thumbnails — inline neutral SVGs (offline-safe, monochrome).
const palletSvgs = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%23e9e7e2'/><rect x='14' y='34' width='30' height='30' fill='%23b5b0a8'/><rect x='50' y='34' width='32' height='30' fill='%23c8c4bc'/><rect x='14' y='68' width='68' height='10' fill='%238f8a82'/><rect x='30' y='16' width='38' height='14' fill='%23a19c94'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%23e9e7e2'/><rect x='20' y='40' width='56' height='30' fill='%23c8c4bc'/><rect x='20' y='40' width='56' height='8' fill='%238f8a82'/><rect x='26' y='52' width='20' height='14' fill='%23e9e7e2'/><rect x='50' y='52' width='20' height='14' fill='%23b5b0a8'/><rect x='20' y='74' width='56' height='8' fill='%23a19c94'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%23e9e7e2'/><rect x='26' y='22' width='44' height='52' fill='%23b5b0a8'/><rect x='32' y='28' width='32' height='10' fill='%23e9e7e2'/><rect x='32' y='44' width='32' height='8' fill='%23e9e7e2'/><rect x='32' y='58' width='32' height='8' fill='%23e9e7e2'/><rect x='26' y='78' width='44' height='8' fill='%238f8a82'/></svg>",
]

const queue = [
  {
    sku: "NB-2214",
    name: "Wireless barcode scanner",
    bin: "B-14-2",
    min: 24,
    onHand: 6,
    status: "below" as const,
    icon: ScanBarcodeIcon,
  },
  {
    sku: "LB-1107",
    name: "Thermal label roll 4\u00d76\u2033",
    bin: "B-03-1",
    min: 20,
    onHand: 18,
    status: "low" as const,
    icon: TagsIcon,
  },
  {
    sku: "HV-9901",
    name: "Heated vest — cold store",
    bin: "D-01-3",
    min: 6,
    onHand: 2,
    status: "below" as const,
    icon: ShirtIcon,
  },
  {
    sku: "PK-0388",
    name: "Packing tape 48 mm",
    bin: "A-02-7",
    min: 120,
    onHand: 412,
    status: "ok" as const,
    icon: PackageIcon,
  },
  {
    sku: "WR-5500",
    name: "Stretch wrap 20 \u00b5m",
    bin: "C-11-4",
    min: 40,
    onHand: 96,
    status: "ok" as const,
    icon: BoxesIcon,
  },
]

const receipts = [
  {
    id: "RCV-4471",
    carrier: "Vantage Freight · 4 pallets",
    time: "10:42",
    svg: palletSvgs[0],
  },
  {
    id: "RCV-4468",
    carrier: "Northline shuttle · 2 pallets",
    time: "09:58",
    svg: palletSvgs[1],
  },
  {
    id: "RCV-4462",
    carrier: "Returns cart · 1 pallet",
    time: "08:15",
    svg: palletSvgs[2],
  },
]

const pickers = [
  {
    initials: "DO",
    name: "Dara Okafor",
    detail: "Aisles 1–12 · 2 open counts",
    badge: "On shift",
    active: true,
  },
  {
    initials: "MS",
    name: "Miguel Santos",
    detail: "Aisles 13–24 · 4 open counts",
    badge: "On shift",
    active: true,
  },
  {
    initials: "PR",
    name: "Priya Raman",
    detail: "Cold store · zone D",
    badge: "On break",
    active: false,
  },
]

const stats = [
  { label: "SKUs in zone", value: "1,284", note: "aisles 1–24" },
  { label: "Below minimum", value: "37", note: "−6 vs last week" },
  { label: "Open counts", value: "6", note: "2 due today" },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[790px] flex-col gap-4 px-5 py-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-caption text-caption text-muted-foreground">
              Northline Fulfillment · Zone B · Dock 4
            </p>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Inventory console
            </h1>
          </div>
          <Button variant="outline" size="sm">
            <DownloadIcon />
            Export
          </Button>
          <Button size="sm">
            <ClipboardCheckIcon />
            Start count
          </Button>
        </header>

        {/* Toolbar */}
        <div className="flex items-center gap-2.5">
          <InputGroup className="h-9 w-64">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Find SKU, bin or product…"
              aria-label="Find SKU, bin or product"
            />
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <span className="font-caption text-caption text-muted-foreground">
            2 counts in progress · scanner D-4 linked
          </span>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border bg-card px-3.5 py-3"
            >
              <p className="font-caption text-caption text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-0.5 font-code text-lg font-semibold text-foreground">
                {s.value}
              </p>
              <p className="font-caption text-[11px] text-muted-foreground">
                {s.note}
              </p>
            </div>
          ))}
          <div className="rounded-lg border bg-card px-3.5 py-3">
            <p className="font-caption text-caption text-muted-foreground">
              Dock utilization
            </p>
            <p className="mt-0.5 font-code text-lg font-semibold text-foreground">
              82%
            </p>
            <Progress value={82} aria-label="Dock utilization 82 percent" />
          </div>
        </div>

        {/* Main grid */}
        <div className="grid flex-1 grid-cols-12 gap-4">
          {/* Replenishment queue */}
          <Card className="col-span-7 gap-0 self-start py-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Replenishment queue
                </p>
                <p className="font-caption text-caption text-muted-foreground">
                  5 SKUs · cycle count due 16:00
                </p>
              </div>
              <DropdownMenu defaultOpen>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" size="sm">
                      Assign picker
                      <ChevronDownIcon />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" sideOffset={6}>
                  <DropdownMenuLabel>On shift now</DropdownMenuLabel>
                  {pickers.map((p) => (
                    <DropdownMenuItem key={p.name}>
                      <Item size="xs" className="w-full p-0">
                        <ItemMedia>
                          <Avatar size="sm">
                            <AvatarFallback className="font-code text-[10px] font-semibold">
                              {p.initials}
                            </AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemContent className="gap-0">
                          <ItemTitle>{p.name}</ItemTitle>
                          <ItemDescription className="leading-tight">
                            {p.detail}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ForkliftIcon />
                    Assign to forklift pool
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ItemGroup>
              <Item variant="muted" size="sm">
                <ItemHeader>
                  <span className="text-xs font-medium text-muted-foreground">
                    Priority picks · restock before 14:00
                  </span>
                  <Badge variant="outline" className="text-warning-700">
                    3 below min
                  </Badge>
                </ItemHeader>
              </Item>
              {queue.map((q) => (
                <Item key={q.sku} variant="outline">
                  <ItemMedia variant="icon">
                    <q.icon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{q.name}</ItemTitle>
                    <ItemDescription>
                      {q.sku} · Bin {q.bin} · min {q.min}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions className="flex-col items-end gap-1">
                    {q.status === "ok" ? (
                      <Badge
                        variant="outline"
                        className="justify-center text-success-700"
                      >
                        <CheckIcon />
                        In stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="justify-center text-warning-700"
                      >
                        <BarcodeIcon />
                        {q.status === "below" ? "Below min" : "Low"}
                      </Badge>
                    )}
                    <span className="font-code text-xs text-muted-foreground">
                      {q.onHand} on hand
                    </span>
                  </ItemActions>
                  <ItemActions>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Actions for ${q.sku}`}
                    >
                      <EllipsisVerticalIcon />
                    </Button>
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>
          </Card>

          {/* Side rail */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* Cycle count team */}
            <Card className="gap-0 py-0">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  Cycle count team
                </p>
                <span className="font-caption text-caption text-muted-foreground">
                  Shift 06:00–14:30
                </span>
              </div>
              <ItemGroup>
                {pickers.map((p) => (
                  <Item key={p.name} size="sm" variant="outline">
                    <ItemMedia>
                      <Avatar>
                        <AvatarFallback className="font-code text-[11px] font-semibold">
                          {p.initials}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{p.name}</ItemTitle>
                      <ItemDescription>{p.detail}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Badge
                        variant="outline"
                        className={
                          p.active
                            ? "justify-center text-success-700"
                            : "justify-center text-muted-foreground"
                        }
                      >
                        {p.badge}
                      </Badge>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </Card>

            {/* Received pallets */}
            <Card className="gap-0 py-0">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  Recently received
                </p>
                <span className="font-caption text-caption text-muted-foreground">
                  Bay 2 · putaway pending
                </span>
              </div>
              <ItemGroup>
                {receipts.map((r) => (
                  <Item key={r.id} size="sm" variant="outline">
                    <ItemMedia variant="image">
                      <img src={r.svg} alt={`${r.id} pallet thumbnail`} />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="font-code text-[13px]">
                        {r.id}
                      </ItemTitle>
                      <ItemDescription>{r.carrier}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <span className="font-code text-xs text-muted-foreground">
                        {r.time}
                      </span>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </Card>
          </div>
        </div>

        <Separator />

        <footer className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success-500" />
            Synced 2 min ago · scanner D-4 online
          </span>
          <span className="inline-flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
            Press
            <Kbd>C</Kbd>
            to start a count
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
