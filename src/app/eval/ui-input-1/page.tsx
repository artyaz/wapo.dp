"use client";

/**
 * EVAL page — input p1 — craft brewery tap list — 834x1112 dark
 *
 * Scenario: "Fermenterra Brewing" taproom tablet — the tap-list board staff
 * keep behind the bar. Search + filter row, KPI strip, live tap list with
 * inline price edit, guest "tap request" form (invalid email state), and the
 * "add beer to the tap list" form with input-group addons, file + disabled
 * inputs. Co-stars: Card, Badge, Button, Progress, Separator, InputGroup.
 */

import {
  Beer,
  CalendarClock,
  Check,
  Printer,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const TAPS = [
  {
    name: "Half-Light",
    style: "Czech-style pale lager",
    abv: "4.8%",
    ibu: "18 IBU",
    keg: 72,
    price: "6.50",
    editing: true,
  },
  {
    name: "Static Bloom",
    style: "Hazy IPA",
    abv: "6.8%",
    ibu: "45 IBU",
    keg: 88,
    price: "$8.00",
  },
  {
    name: "Rooks & Crows",
    style: "London porter",
    abv: "5.6%",
    ibu: "32 IBU",
    keg: 41,
    price: "$7.00",
  },
  {
    name: "Kettle Song",
    style: "Plum kettle sour",
    abv: "5.2%",
    ibu: "10 IBU",
    keg: 34,
    price: "$7.50",
  },
  {
    name: "Ciderhouse 88",
    style: "Dry apple cider",
    abv: "6.2%",
    ibu: "dry",
    keg: 12,
    price: "$7.00",
    low: true,
  },
];

const KPIS = [
  { value: "12", label: "taps pouring", sub: "of 16 handles" },
  { value: "3", label: "kegs under 20%", sub: "reorder queued" },
  { value: "64", label: "pours since open", sub: "since 11:00" },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground mx-auto flex min-h-screen w-full max-w-[790px] flex-col gap-3 p-5">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted text-foreground flex size-11 items-center justify-center rounded-lg border">
              <Beer className="size-5" />
            </div>
            <div>
              <h1 className="font-heading-2 text-heading-2 leading-none">
                Fermenterra Brewing
              </h1>
              <p className="text-muted-foreground mt-1.5 font-code text-[10px] uppercase tracking-[0.14em]">
                Taproom No. 2 · North Kedzie Ave
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-code">
              12 taps
            </Badge>
            <Button variant="outline" size="sm">
              <Printer className="size-4" />
              Print menu
            </Button>
          </div>
        </header>

        {/* ── Search + filters ───────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <InputGroup className="flex-1">
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search beers, styles, breweries…" />
          </InputGroup>
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </div>

        {/* ── KPI strip ──────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-card rounded-lg border px-4 py-2.5"
            >
              <p className="font-code text-heading-3 leading-none">
                {kpi.value}
              </p>
              <p className="mt-1.5 text-sm">{kpi.label}</p>
              <p className="text-muted-foreground mt-0.5 font-code text-[10px] uppercase tracking-[0.12em]">
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main row: tap list + tap request ───────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-7 gap-3 py-4">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-heading-3">
                On tap now
              </CardTitle>
              <CardDescription className="font-code text-[10px] uppercase tracking-[0.12em]">
                Updated 14:32 · Dana R.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-5">
              {TAPS.map((tap) => (
                <div key={tap.name}>
                  <div className="flex flex-col gap-1.5 py-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm leading-none font-medium">
                        {tap.name}
                      </p>
                      {tap.editing ? (
                        <div className="flex w-28 shrink-0 items-center justify-end gap-1.5">
                          <InputGroup className="h-8 flex-1">
                            <InputGroupAddon
                              align="inline-start"
                              className="ps-2.5"
                            >
                              <InputGroupText className="text-muted-foreground font-code text-xs">
                                $
                              </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                              defaultValue="6.50"
                              className="h-8 px-2 font-code text-code"
                              aria-label="Half-Light price, 16 oz pour"
                            />
                          </InputGroup>
                          <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="Save price"
                          >
                            <Check className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <p className="w-28 shrink-0 text-right font-code text-code">
                          {tap.price}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-muted-foreground min-w-0 flex-1 truncate text-xs">
                        {tap.style}
                      </p>
                      <p className="text-muted-foreground shrink-0 font-code text-[11px]">
                        {tap.abv} · {tap.ibu}
                      </p>
                      <div className="flex w-32 shrink-0 items-center justify-end gap-1.5">
                        <Progress value={tap.keg} className="h-1.5 w-10" />
                        <span className="text-muted-foreground w-7 text-right font-code text-[11px]">
                          {tap.keg}%
                        </span>
                        {tap.low ? (
                          <Badge
                            variant="outline"
                            className="border-warning-500/40 px-1.5 text-warning-500"
                          >
                            Low
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {tap !== TAPS[TAPS.length - 1] ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="col-span-5 gap-3 py-4">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-heading-3">
                Tap request
              </CardTitle>
              <CardDescription>
                Guest alerts for beers not yet pouring.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5">
              <Field invalid>
                <FieldLabel htmlFor="tap-req-email">Email address</FieldLabel>
                <Input
                  id="tap-req-email"
                  type="email"
                  defaultValue="sam@@pouringnotes.com"
                  aria-invalid
                  required
                />
                <FieldError>
                  That address looks off — check for a double @.
                </FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="tap-req-beer">Beer to watch for</FieldLabel>
                <Input
                  id="tap-req-beer"
                  placeholder="e.g. Nightshift — imperial stout"
                />
                <FieldDescription>
                  One tap-ahead notice per beer; no marketing.
                </FieldDescription>
              </Field>
              <Button size="sm" className="w-fit">
                Notify me
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ── Add beer form ──────────────────────────────────────── */}
        <Card className="gap-3 py-4">
          <CardHeader className="px-5">
            <CardTitle className="font-heading-3 text-heading-3">
              Add a beer to the tap list
            </CardTitle>
            <CardDescription>
              New keg goes live across the board and the printed menu.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-x-4 gap-y-4 px-5">
            <Field>
              <FieldLabel htmlFor="add-name">Beer name</FieldLabel>
              <Input id="add-name" placeholder="Nightshift" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="add-style">Style</FieldLabel>
              <Input id="add-style" placeholder="Imperial stout" />
            </Field>
            <Field>
              <FieldLabel htmlFor="add-abv">ABV</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="add-abv"
                  inputMode="decimal"
                  placeholder="9.1"
                  className="font-code"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="font-code">%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="add-price">Price · 16 oz pour</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText className="font-code">$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="add-price"
                  inputMode="decimal"
                  placeholder="9.00"
                  className="font-code"
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="add-label">Label art</FieldLabel>
              <Input
                id="add-label"
                type="file"
                accept="image/png,image/svg+xml"
              />
              <FieldDescription>
                <Upload className="mr-1 inline size-3" />
                PNG or SVG · 400×400 px minimum
              </FieldDescription>
            </Field>
            <Field data-disabled>
              <FieldLabel htmlFor="add-tap">Tap handle</FieldLabel>
              <div className="flex items-center gap-2">
                <Input
                  id="add-tap"
                  defaultValue="Tap 13"
                  disabled
                  className="font-code text-sm"
                />
                <CalendarClock className="text-muted-foreground size-4 shrink-0" />
              </div>
              <FieldDescription>Handle assigned automatically on save.</FieldDescription>
            </Field>
          </CardContent>
          <CardFooter className="gap-2 px-5">
            <Button size="sm">Add to tap list</Button>
            <Button variant="outline" size="sm">
              Save draft
            </Button>
            <p className="text-muted-foreground ml-auto font-code text-[10px] uppercase tracking-[0.12em]">
              Drafts kept 7 days
            </p>
          </CardFooter>
        </Card>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
            PourLog v2.4 · synced 14:32
          </span>
          <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
            12 / 16 taps active
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
