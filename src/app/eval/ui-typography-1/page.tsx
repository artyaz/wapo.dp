"use client"

// EVAL page — typography p1 — veterinary clinic patient records — 1440x900 light
// The three Praxis type roles on one screen: Inter for UI chrome (header,
// badges, labels), Source Serif for the clinical prose (Typography
// variant="reading" with per-instance variable overrides), IBM Plex Mono for
// data (IDs, vitals, doses, timestamps). Plus Badge, Button, Card, Tabs,
// Separator, Avatar, Alert. Flat panels + hairlines only.

import {
  CalendarClock,
  FileText,
  MessageSquare,
  PawPrint,
  Pill,
  Plus,
  Printer,
  Search,
  TriangleAlert,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Typography } from "@/components/ui/typography"

const vitals = [
  { date: "2026-08-29", temp: "38.9", hr: "96", wt: "28.4" },
  { date: "2026-05-14", temp: "38.6", hr: "88", wt: "29.1" },
  { date: "2026-02-03", temp: "38.7", hr: "92", wt: "29.8" },
]

const prescriptions = [
  { drug: "Carprofen 75 mg", sig: "1 tab · PO · BID × 7 d", state: "New today" },
  { drug: "Apoquel 5.4 mg", sig: "0.5 tab · PO · BID × 10 d", state: "Active" },
  { drug: "Gabapentin 100 mg", sig: "1 cap · PO · q12h PRN", state: "Active" },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col">
        {/* ── App header — Inter interface role ─────────────────────── */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-2.5">
            <PawPrint className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold tracking-tight">
              Pawhaven Veterinary Clinic
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              118 Alder Row · Beacon Hill
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-8 w-56 items-center gap-2 rounded-md border px-2.5 text-muted-foreground">
              <Search className="size-3.5" />
              <span className="text-sm">Search patients, owners…</span>
              <kbd className="ml-auto font-code text-[10px] text-muted-foreground">⌘K</kbd>
            </div>
            <Button variant="outline" size="sm">
              <Printer />
              Print
            </Button>
            <Button size="sm">
              <Plus />
              New note
            </Button>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[300px_minmax(0,1fr)_340px] gap-6 px-6 py-5">
          {/* ── Patient summary — Inter labels, mono data ─────────────── */}
          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-4 pt-5">
                <div className="flex items-start gap-3">
                  <Avatar className="size-11 rounded-lg">
                    <AvatarFallback className="rounded-lg">M</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold leading-tight">Maple</h2>
                    <p className="font-caption text-caption text-muted-foreground">
                      Canine · Golden Retriever · F · 7 yr
                    </p>
                    <p className="mt-1 font-code text-xs text-muted-foreground">
                      PV-2019-0447
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    In treatment
                  </Badge>
                </div>

                <Separator />

                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {[
                    ["Weight", "28.4 kg"],
                    ["Temp", "38.9 °C"],
                    ["Heart rate", "96 bpm"],
                    ["Born", "2019-03-12"],
                    ["Insurance", "Petplan · PL-88231"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <dt className="font-caption text-caption text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="font-code text-xs">{value}</dd>
                    </div>
                  ))}
                </dl>

                <Separator />

                <div className="flex items-center gap-2.5">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[11px]">DW</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">Dana Whitfield</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      Owner · +1 (206) 555-0184
                    </p>
                  </div>
                  <Button variant="ghost" size="icon-sm" aria-label="Message owner">
                    <MessageSquare />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Pill className="size-3.5 text-muted-foreground" />
                  Active prescriptions
                </CardTitle>
                <CardDescription>3 of 5 current · 1 added today</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                {prescriptions.map((rx, i) => (
                  <div key={rx.drug}>
                    {i > 0 && <Separator className="my-3" />}
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium">{rx.drug}</p>
                      <Badge variant="outline" className="text-[10px]">
                        {rx.state}
                      </Badge>
                    </div>
                    <p className="mt-0.5 font-code text-xs text-muted-foreground">
                      {rx.sig}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Alert variant="destructive">
              <TriangleAlert />
              <AlertTitle>Drug allergy — penicillin</AlertTitle>
              <AlertDescription>
                Anaphylaxis 2023-06-11. Avoid beta-lactams; see reaction notes.
              </AlertDescription>
            </Alert>
          </aside>

          {/* ── Clinical notes — Source Serif prose role ──────────────── */}
          <main className="flex min-w-0 flex-col gap-4">
            <Tabs defaultValue="notes" className="gap-4">
              <TabsList>
                <TabsTrigger value="notes">Visit notes</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="labs">Lab results</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="mt-0">
                <Typography
                  variant="reading"
                  className="[--typeset-flow:1.6em] [--typeset-size:16px] [--typeset-leading:1.8]"
                >
                  <h1>Visit note — Saturday, August 29, 2026</h1>
                  <p className="font-caption text-caption text-muted-foreground">
                    Presented 13:58 · attending Dr. Priya Natarajan, DVM · exam room 3
                  </p>
                  <h2>Subjective</h2>
                  <p>
                    Maple presented with a three-day history of intermittent left
                    hind lameness, worse after rest and stiff on rising. Exercise
                    was curtailed to leash walks on Thursday; no known trauma, no
                    swelling reported at home. Appetite, thirst, and elimination
                    remain normal.
                  </p>
                  <blockquote>
                    <p>
                      She still wants to chase the ball, but pulls up after a few
                      strides and holds the leg up when she stops.
                    </p>
                  </blockquote>
                  <h2>Objective</h2>
                  <p>
                    Ambulatory with a grade 2/4 left hind lameness at the trot.
                    Weight-bearing, but shifts off the left pelvic limb when
                    standing. Mild effusion of the left stifle with a positive
                    cranial drawer and mild medial buttress; right stifle normal.
                    Meniscal click not appreciated. Temperature, pulse, and
                    respiration within normal limits; body condition score 6/9.
                  </p>
                  <h2>Assessment</h2>
                  <p>
                    Findings are consistent with a <strong>partial cranial
                    cruciate ligament rupture</strong> of the left stifle. Early
                    osteoarthritic change is suspected but not yet radiographically
                    confirmed. The effusion and drawer sign outweigh what a
                    straightforward sprain would explain.
                  </p>
                  <h2>Plan</h2>
                  <ol>
                    <li>
                      Strict rest for 14 days: leash elimination walks only, no
                      stairs, no jumping.
                    </li>
                    <li>
                      Carprofen <code>75 mg PO BID × 7 d</code> with food; dispense
                      14 tablets. Gabapentin <code>100 mg q12h PRN</code> for
                      breakthrough discomfort.
                    </li>
                    <li>
                      Sedated orthogonal radiographs of both stifles on{" "}
                      <strong>September 3</strong> to grade osseous change.
                    </li>
                    <li>
                      Recheck with the same examiner on <strong>September 8</strong>;
                      discuss surgical referral if the drawer sign persists.
                    </li>
                  </ol>
                  <div className="not-typeset flex items-center gap-2">
                    <Button size="sm">
                      <CalendarClock />
                      Book recheck — Sep 8
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText />
                      Print prescription
                    </Button>
                  </div>
                  <figcaption className="font-caption text-caption">
                    Signed electronically by P. Natarajan, DVM · 2026-08-29 14:22 ·
                    pending co-sign by M. Okafor, DVM, MS
                  </figcaption>
                </Typography>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <p className="text-sm text-muted-foreground">
                  2 documents on file: insurance claim PL-88231-A (Aug 12), waiver
                  of 2024-11-03.
                </p>
              </TabsContent>

              <TabsContent value="labs" className="mt-0">
                <p className="text-sm text-muted-foreground">
                  CBC/chemistry panel of 2026-08-29 within reference ranges; full
                  table in the lab information system.
                </p>
              </TabsContent>
            </Tabs>
          </main>

          {/* ── Vitals & schedule — IBM Plex Mono data role ───────────── */}
          <aside className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Vitals — last 3 visits</CardTitle>
                <CardDescription>Recorded at check-in</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="compact">
                  <table className="font-code text-xs">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Temp °C</th>
                        <th scope="col">HR</th>
                        <th scope="col">Wt kg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitals.map((v) => (
                        <tr key={v.date}>
                          <td>{v.date}</td>
                          <td>{v.temp}</td>
                          <td>{v.hr}</td>
                          <td>{v.wt}</td>
                        </tr>
                      ))}
                    </tbody>
                    <caption className="font-caption text-caption">
                      Trend: −1.4 kg since February · temp stable
                    </caption>
                  </table>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upcoming</CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                {[
                  ["Radiographs — both stifles", "2026-09-03 · 09:15"],
                  ["Recheck exam · Dr. Natarajan", "2026-09-08 · 10:40"],
                  ["Bordetella booster due", "2026-09-27"],
                ].map(([what, when], i) => (
                  <div key={what}>
                    {i > 0 && <Separator className="my-3" />}
                    <p className="text-sm">{what}</p>
                    <p className="mt-0.5 font-code text-xs text-muted-foreground">
                      {when}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* ── Footer — mono metadata ─────────────────────────────────── */}
        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-6">
          <span className="font-code text-xs text-muted-foreground">
            Maple · PV-2019-0447 · record synced 14:41:07
          </span>
          <span className="font-caption text-caption text-muted-foreground">
            Pawhaven Vet Cloud · v3.2 · audit-logged
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
