"use client"

// EVAL page — kanban p2 — home renovation budget planner — 1440x900 light

import { DownloadIcon, PlusIcon } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { KanbanBoard } from "@/components/ui/kanban"

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      {/* Hide the Next.js dev-tools indicator — a dev-server artifact that
          floats bottom-left and can overlap page content in screenshots. */}
      <style>{"nextjs-portal{display:none!important}"}</style>
      <div className="mx-auto flex min-h-screen w-full max-w-[1360px] flex-col gap-4 px-8 pb-10 pt-5">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-code flex h-9 w-9 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              1428
            </span>
            <div>
              <h1 className="font-heading-2 text-heading-2">
                Maple Ave renovation
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Tasks by trade · week 6 of 14 · permits filed Apr 02
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AvatarGroup className="-space-x-1">
              <Avatar size="sm" title="Rosa Delgado — plumbing">
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <Avatar size="sm" title="Amara Okafor — electrical">
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <Avatar size="sm" title="Theo Lindqvist — tiling">
                <AvatarFallback>TL</AvatarFallback>
              </Avatar>
              <Avatar size="sm" title="Ray Whitfield — framing">
                <AvatarFallback>RW</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Export
            </Button>
            <Button size="sm">
              <PlusIcon />
              Add task
            </Button>
          </div>
        </header>

        {/* Budget summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="gap-2 py-3.5">
            <CardContent className="flex flex-col gap-2 px-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Total budget
                </span>
                <span className="font-code text-xs text-muted-foreground">
                  48% committed
                </span>
              </div>
              <span className="font-code text-2xl tabular-nums">$86,400</span>
              <Progress value={48} aria-label="48 percent of budget committed" />
            </CardContent>
          </Card>
          <Card className="gap-2 py-3.5">
            <CardContent className="flex flex-col gap-2 px-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Committed
                </span>
                <span className="font-code text-xs text-muted-foreground">
                  incl. cabinets + HVAC
                </span>
              </div>
              <span className="font-code text-2xl tabular-nums">$41,280</span>
              <span className="text-xs text-muted-foreground">
                Awaiting invoices: $6,120
              </span>
            </CardContent>
          </Card>
          <Card className="gap-2 py-3.5">
            <CardContent className="flex flex-col gap-2 px-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Open tasks
                </span>
                <span className="font-code text-xs text-muted-foreground">
                  9 scheduled
                </span>
              </div>
              <span className="font-code text-2xl tabular-nums">9</span>
              <Badge className="w-fit border-warning-300 bg-warning-50 text-warning-700">
                Painting phase not scheduled
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Board — tasks by trade */}
        <KanbanBoard
          aria-label="Renovation tasks by trade"
          className="h-[560px]"
          columnClassName="w-60"
          defaultColumns={[
            {
              id: "framing",
              title: "Demo & Framing",
              wipLimit: 3,
              cards: [
                {
                  id: "frm-03",
                  label: "FRM-03",
                  title: "Frame pantry niche + kitchen bulkhead",
                  description: "Quote $940 · blocking for shelving included.",
                  assignee: { name: "Ray Whitfield" },
                  tags: ["Kitchen"],
                  progress: 60,
                },
                {
                  id: "frm-07",
                  label: "FRM-07",
                  title: "Sister joists above studio",
                  description: "Engineer letter required before drywall · $2,150.",
                  assignee: { name: "Ray Whitfield" },
                  tags: ["Studio"],
                  priority: "high",
                  dueDate: "Sep 02",
                },
              ],
            },
            {
              id: "plumbing",
              title: "Plumbing",
              wipLimit: 3,
              cards: [
                {
                  id: "plb-01",
                  label: "PLB-01",
                  title: "Reroute main bath supply lines",
                  description: "Quote $1,680 · PEX-A, shutoffs at manifold.",
                  assignee: { name: "Rosa Delgado" },
                  tags: ["Main bath"],
                  priority: "high",
                  dueDate: "Aug 26",
                  progress: 30,
                },
                {
                  id: "plb-04",
                  label: "PLB-04",
                  title: "Set guest bath vanity + faucets",
                  description: "Vanity on site · quote $1,240 labor.",
                  assignee: { name: "Rosa Delgado" },
                  tags: ["Guest bath"],
                  dueDate: "Sep 04",
                },
              ],
            },
            {
              id: "electrical",
              title: "Electrical",
              wipLimit: 2,
              cards: [
                {
                  id: "ele-02",
                  label: "ELE-02",
                  title: "Panel upgrade to 200 A",
                  description: "Permit #B-4417 · quote $2,900 · city inspection Thu.",
                  assignee: { name: "Amara Okafor" },
                  tags: ["House"],
                  priority: "urgent",
                  dueDate: "Aug 24",
                },
                {
                  id: "ele-05",
                  label: "ELE-05",
                  title: "Recessed lights, kitchen + hallway",
                  description: "12 fixtures · quote $1,150.",
                  assignee: { name: "Amara Okafor" },
                  tags: ["Kitchen"],
                  progress: 45,
                },
                {
                  id: "ele-08",
                  label: "ELE-08",
                  title: "Porch sconces on dimmer",
                  description: "Wet-rated pair · quote $380.",
                  assignee: { name: "Amara Okafor" },
                  tags: ["Porch"],
                },
              ],
            },
            {
              id: "tiling",
              title: "Tiling & Flooring",
              wipLimit: 4,
              cards: [
                {
                  id: "til-02",
                  label: "TIL-02",
                  title: "Heated floor, main bath",
                  description: "Quote $2,300 · thermostat by door.",
                  assignee: { name: "Theo Lindqvist" },
                  tags: ["Main bath"],
                  dueDate: "Sep 08",
                },
                {
                  id: "til-06",
                  label: "TIL-06",
                  title: "Engineered oak, living + dining",
                  description: "280 sq ft · quote $5,600 incl. underlayment.",
                  assignee: { name: "Theo Lindqvist" },
                  tags: ["Living"],
                  priority: "medium",
                  dueDate: "Sep 15",
                },
              ],
            },
            {
              id: "painting",
              title: "Painting",
              wipLimit: 3,
              cards: [],
            },
          ]}
        />

        {/* Footer */}
        <footer className="mt-auto">
          <Separator className="mb-3" />
          <div className="flex items-center justify-between">
            <span className="font-code text-xs text-muted-foreground">
              estimates = avg of 3 bids · contingency 12% · updated Aug 18
            </span>
            <span className="font-code text-xs text-muted-foreground">
              next milestone: rough-in inspection · Aug 28
            </span>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
