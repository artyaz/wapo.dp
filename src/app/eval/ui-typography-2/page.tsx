"use client"

// EVAL page — typography p2 — construction project management board — 768x1024 light (portrait tablet)
// Single-column tablet board: Inter UI chrome, Source Serif site-log prose
// (Typography variant="reading" tuned per instance), IBM Plex Mono for
// quantities, order numbers and dates (typeset table with font-code).
// Plus Card, Badge, Button, Progress, Separator. Flat panels + hairlines.

import {
  CalendarPlus,
  CloudRain,
  Download,
  HardHat,
  Users,
} from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

const deliveries = [
  { item: "Glulam beam GL-240", qty: "1 pc · 4.8 m", order: "PO-1041", eta: "Fri 08:00" },
  { item: "Cement board 12 mm", qty: "42 sheets", order: "PO-1038", eta: "received" },
  { item: "Oak flooring", qty: "96 m²", order: "PO-1044", eta: "Sep 02" },
  { item: "MVHR ducting kit", qty: "3 boxes", order: "PO-1047", eta: "Sep 05" },
]

const milestones = [
  { name: "Structural opening signed off", state: "Complete", date: "2026-08-14" },
  { name: "Dormer watertight", state: "In progress", date: "due 2026-09-04" },
  { name: "First fix complete", state: "Scheduled", date: "2026-09-18" },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[660px] flex-col gap-4 px-5 py-5">
        {/* ── Project header — Inter chrome, serif page title ────────── */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardHat className="size-4 text-muted-foreground" />
              <span className="text-sm font-semibold tracking-tight">
                Kestrel Build · Site Board
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download />
                Weekly report
              </Button>
              <Button size="sm">
                <CalendarPlus />
                Add entry
              </Button>
            </div>
          </div>
          <div>
            <p className="font-caption text-caption text-muted-foreground">
              Project RN-2214 · Client: Halloway &amp; Sons · Foreman A. Osei
            </p>
            <h1 className="font-heading-1 text-heading-1 text-foreground">
              Riverside Loft Conversion
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Phase 3 — Fit-out</Badge>
            <Badge variant="outline">Week 32</Badge>
            <Badge variant="outline">2 RFIs open</Badge>
            <span className="ml-auto font-code text-xs text-muted-foreground">
              68% · 63 days to handover
            </span>
          </div>
        </header>

        {/* ── Site log — Source Serif prose role ─────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Daily site log</CardTitle>
            <CardDescription>
              Thursday, 27 August 2026 · entered by A. Osei at 17:12
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Typography
              variant="reading"
              className="[--typeset-size:15px] [--typeset-leading:1.7] [--typeset-flow:1.3em]"
            >
              <h3>Conditions &amp; manpower</h3>
              <p>
                Light rain until 11:00, then dry — scaffold wraps stayed up on the
                north face. Nine on site: two carpenters, three electricians, two
                plumbers, plus the crane banksman and a labourer clearing the rear
                elevation after the scaffold strike.
              </p>
              <h3>Completed today</h3>
              <ul>
                <li>Steels for the dormer pocket installed and torqued.</li>
                <li>First-fix wiring pulled to the east wall, board 4 of 6.</li>
                <li>Rear scaffold struck, area cleared and inspected.</li>
              </ul>
              <blockquote>
                <p>
                  The oak glulam delivery slipped to Friday morning — roof team
                  redeployed to battening so the day is not lost.
                </p>
              </blockquote>
              <h3>Tomorrow</h3>
              <ol>
                <li>Glulam beam lift at 08:30 with the 20 t crane; road closure booked.</li>
                <li>Second-fix plumbing to the en-suite.</li>
                <li>Building control site visit at 14:00 for the dormer inspection.</li>
              </ol>
            </Typography>
          </CardContent>
        </Card>

        {/* ── Deliveries — IBM Plex Mono data role ───────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Deliveries this week</CardTitle>
            <CardDescription>Confirmed with suppliers at 16:40</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="compact">
              <table className="font-code text-xs">
                <thead>
                  <tr>
                    <th scope="col">Material</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Order</th>
                    <th scope="col">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((d) => (
                    <tr key={d.order}>
                      <td>{d.item}</td>
                      <td>{d.qty}</td>
                      <td>{d.order}</td>
                      <td>{d.eta}</td>
                    </tr>
                  ))}
                </tbody>
                <caption className="font-caption text-caption">
                  Glulam lift requires exclusion zone · crane hire ref CR-88
                </caption>
              </table>
            </Typography>
          </CardContent>
        </Card>

        {/* ── Milestones & progress ──────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Milestones</CardTitle>
            <CardDescription>Baseline programme v4 · revised Jul 30</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Programme completion</span>
                <span className="font-code text-xs text-muted-foreground">
                  68% · 168 of 247 tasks
                </span>
              </div>
              <Progress value={68} aria-label="Programme completion" />
            </div>
            <div className="flex flex-col">
              {milestones.map((m, i) => (
                <div key={m.name}>
                  {i > 0 && <Separator className="my-2.5" />}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="truncate text-sm">{m.name}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="font-code text-xs text-muted-foreground">
                        {m.date}
                      </span>
                      {m.state === "Complete" ? (
                        <Badge>Complete</Badge>
                      ) : m.state === "In progress" ? (
                        <Badge variant="secondary">In progress</Badge>
                      ) : (
                        <Badge variant="outline">Scheduled</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="flex items-center gap-3 font-code text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CloudRain className="size-3" /> 14°C
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3" /> 9 on site
            </span>
          </span>
          <span className="font-caption text-caption text-muted-foreground">
            Budget £171,540 of £248,600 · no new risks logged
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
