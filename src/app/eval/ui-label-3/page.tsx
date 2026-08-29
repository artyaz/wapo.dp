"use client"
// EVAL page — label p3 — craft brewery tap list — 1440x900 light
// Label front and center: add-a-beer form labels with required marks,
// optional hints, unit hints and checkbox label rows; table column headers
// as labels. Co-stars: Table, Input, Select, Textarea, Checkbox, Switch,
// Badge, Button, Card, Progress, Separator.

import { Beer, Plus, UploadCloud } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

const taps = [
  {
    tap: "01",
    beer: "Zapfender Pils",
    style: "German Pilsner",
    abv: "4.8%",
    ibu: "28",
    keg: 62,
    status: "Pouring",
    statusVariant: "default" as const,
  },
  {
    tap: "02",
    beer: "Cloud Mirror",
    style: "Hefeweizen",
    abv: "5.2%",
    ibu: "12",
    keg: 34,
    status: "Pouring",
    statusVariant: "default" as const,
  },
  {
    tap: "03",
    beer: "Slate & Vine",
    style: "Table Beer",
    abv: "3.9%",
    ibu: "18",
    keg: 81,
    status: "Pouring",
    statusVariant: "default" as const,
  },
  {
    tap: "04",
    beer: "Night Fern",
    style: "Munich Dunkel",
    abv: "5.6%",
    ibu: "22",
    keg: 9,
    status: "Low keg",
    statusVariant: "outline" as const,
  },
  {
    tap: "05",
    beer: "—",
    style: "Empty tap",
    abv: "—",
    ibu: "—",
    keg: 0,
    status: "Available",
    statusVariant: "secondary" as const,
  },
]

const styles = [
  { label: "German Pilsner", value: "pils" },
  { label: "Hefeweizen", value: "hefe" },
  { label: "Munich Dunkel", value: "dunkel" },
  { label: "Table Beer", value: "table" },
  { label: "Cold IPA", value: "ipa" },
]

const freeTaps = [
  { label: "Tap 05 · empty", value: "5" },
  { label: "Tap 09 · kicked 14:05", value: "9" },
  { label: "Tap 12 · reserved for collab", value: "12" },
]

const servings = [
  { id: "serve-pint", label: "Pint · 16 oz", checked: true },
  { id: "serve-half", label: "Half pour · 10 oz", checked: true },
  { id: "serve-taster", label: "Taster flight · 4 oz", checked: false },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col gap-5 px-6 py-5">
        {/* App header */}
        <header className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg border">
            <Beer className="size-4 text-foreground" />
          </span>
          <span className="font-heading-3 text-heading-3 text-foreground">
            Fernweh Brewing
          </span>
          <span className="font-caption text-caption text-muted-foreground">
            tap room operations
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground">
              Fri Nov 14 · 16:40
            </span>
            <Button size="sm">
              <UploadCloud />
              Publish board
            </Button>
          </div>
        </header>

        {/* Page title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Friday tap board
            </h1>
            <p className="mt-1 font-caption text-caption text-muted-foreground">
              4 of 12 taps pouring · last keg changed 14:05 by Tobias
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-code font-normal">
              148 pints today
            </Badge>
            <Badge variant="secondary">2 empty taps</Badge>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_384px] items-start gap-5">
          {/* ---- Tap list ---- */}
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Taps</CardTitle>
              <CardDescription>
                Keg levels update from the flow meters every 15 minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14">Tap</TableHead>
                    <TableHead>Beer</TableHead>
                    <TableHead className="w-32">Style</TableHead>
                    <TableHead className="w-16 text-right">ABV</TableHead>
                    <TableHead className="w-16 text-right">IBU</TableHead>
                    <TableHead className="w-32">Keg level</TableHead>
                    <TableHead className="w-24 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taps.map((t) => (
                    <TableRow key={t.tap}>
                      <TableCell className="font-code text-xs text-muted-foreground">
                        {t.tap}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {t.beer}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.style}
                      </TableCell>
                      <TableCell className="text-right font-code text-xs">
                        {t.abv}
                      </TableCell>
                      <TableCell className="text-right font-code text-xs">
                        {t.ibu}
                      </TableCell>
                      <TableCell>
                        {t.keg > 0 ? (
                          <div className="flex flex-col gap-1">
                            <Progress value={t.keg} aria-label={`Keg level ${t.keg}%`} />
                            <span className="font-code text-xs text-muted-foreground">
                              {t.keg}%
                            </span>
                          </div>
                        ) : (
                          <span className="font-caption text-caption text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={t.statusVariant}>{t.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* ---- Add a beer ---- */}
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Add a beer to tap</CardTitle>
              <CardDescription>
                Tap 05 is open — the collab with Löwenbräu Keller lands next
                week.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="beer-name">
                  Beer name
                  <span aria-hidden="true" className="text-foreground">
                    *
                  </span>
                </Label>
                <Input id="beer-name" placeholder="e.g. Zapfender Pils" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="beer-style">
                  Style
                  <span aria-hidden="true" className="text-foreground">
                    *
                  </span>
                </Label>
                <Select items={styles} defaultValue="pils">
                  <SelectTrigger id="beer-style" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {styles.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="beer-abv">
                    ABV (%)
                    <span aria-hidden="true" className="text-foreground">
                      *
                    </span>
                  </Label>
                  <Input
                    id="beer-abv"
                    placeholder="4.9"
                    className="font-code"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="beer-ibu">
                    IBU
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </Label>
                  <Input id="beer-ibu" placeholder="26" className="font-code" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="beer-tap">
                  Tap
                  <span className="font-code text-xs font-normal text-muted-foreground">
                    2 open
                  </span>
                </Label>
                <Select items={freeTaps} defaultValue="5">
                  <SelectTrigger id="beer-tap" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {freeTaps.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex flex-col gap-2.5">
                <Label>Serving sizes</Label>
                {servings.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <Checkbox id={s.id} defaultChecked={s.checked} />
                    <Label htmlFor={s.id} className="font-normal">
                      {s.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="beer-notes">
                  Brew notes
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="beer-notes"
                  rows={2}
                  placeholder="Decoction mash, 60-minute boil, lagered 5 weeks…"
                  className="resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="pouring-tonight">Pouring tonight</Label>
                  <span className="font-caption text-caption text-muted-foreground">
                    Goes live when you publish the board.
                  </span>
                </div>
                <Switch id="pouring-tonight" defaultChecked />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Plus />
                  Add to board
                </Button>
                <Button variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Fernweh Brewing · Lindenstraße 8, Freiburg — tap list syncs to the
            website and Untappd
          </span>
          <span className="font-code text-xs text-muted-foreground">
            board v41 · published 11:02
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
