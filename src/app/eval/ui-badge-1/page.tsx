"use client"

// EVAL page — badge p1 — veterinary clinic patient records — 1920x1080 light

import {
  Activity,
  BadgeCheck,
  CalendarDays,
  Download,
  FlaskConical,
  Pill,
  Plus,
  Receipt,
  Search,
  Stethoscope,
  Users,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type PatientStatus =
  | "critical"
  | "recovering"
  | "follow-up"
  | "stable"
  | "boarding"
  | "discharge"

type Patient = {
  id: string
  name: string
  initials: string
  species: string
  owner: string
  weight: string
  temp: string
  pulse: string
  lastSeen: string
  status: PatientStatus
  vet: string
}

const PATIENTS: Patient[] = [
  {
    id: "PT-0814",
    name: "Mochi",
    initials: "MO",
    species: "Canine · Golden Retriever",
    owner: "Dana Whitfield",
    weight: "31.4 kg",
    temp: "39.1 °C",
    pulse: "96 bpm",
    lastSeen: "Today 08:12",
    status: "critical",
    vet: "Dr. Osei",
  },
  {
    id: "PT-0671",
    name: "Waffles",
    initials: "WA",
    species: "Canine · French Bulldog",
    owner: "Priya Raman",
    weight: "11.2 kg",
    temp: "39.8 °C",
    pulse: "132 bpm",
    lastSeen: "Today 07:45",
    status: "critical",
    vet: "Dr. Kimura",
  },
  {
    id: "PT-1102",
    name: "Basil",
    initials: "BA",
    species: "Feline · Domestic Shorthair",
    owner: "Marcus Lee",
    weight: "4.2 kg",
    temp: "38.6 °C",
    pulse: "156 bpm",
    lastSeen: "Yesterday",
    status: "recovering",
    vet: "Dr. Osei",
  },
  {
    id: "PT-0450",
    name: "Duke",
    initials: "DU",
    species: "Canine · German Shepherd",
    owner: "Elena Vargas",
    weight: "34.6 kg",
    temp: "38.4 °C",
    pulse: "74 bpm",
    lastSeen: "3 days ago",
    status: "recovering",
    vet: "Dr. Kimura",
  },
  {
    id: "PT-0788",
    name: "Hobbes",
    initials: "HO",
    species: "Feline · Maine Coon",
    owner: "Grace Lindqvist",
    weight: "7.9 kg",
    temp: "38.7 °C",
    pulse: "148 bpm",
    lastSeen: "1 week ago",
    status: "follow-up",
    vet: "Dr. Delgado",
  },
  {
    id: "PT-0321",
    name: "Rosco",
    initials: "RO",
    species: "Canine · Beagle",
    owner: "Sam Delacroix",
    weight: "12.8 kg",
    temp: "38.5 °C",
    pulse: "92 bpm",
    lastSeen: "2 weeks ago",
    status: "follow-up",
    vet: "Dr. Delgado",
  },
  {
    id: "PT-1207",
    name: "Clementine",
    initials: "CL",
    species: "Avian · African Grey",
    owner: "Nia Achebe",
    weight: "0.51 kg",
    temp: "40.6 °C",
    pulse: "340 bpm",
    lastSeen: "3 weeks ago",
    status: "stable",
    vet: "Dr. Kimura",
  },
  {
    id: "PT-1043",
    name: "Pretzel",
    initials: "PR",
    species: "Lapine · Holland Lop",
    owner: "Owen Fitzgerald",
    weight: "1.8 kg",
    temp: "38.9 °C",
    pulse: "180 bpm",
    lastSeen: "4 days ago",
    status: "boarding",
    vet: "Dr. Osei",
  },
  {
    id: "PT-0566",
    name: "Nala",
    initials: "NA",
    species: "Feline · Siamese",
    owner: "Julia Moreau",
    weight: "3.9 kg",
    temp: "38.3 °C",
    pulse: "160 bpm",
    lastSeen: "Today 09:05",
    status: "discharge",
    vet: "Dr. Delgado",
  },
]

const WARD_WATCH = [
  {
    name: "Mochi",
    chart: "PT-0814",
    reason: "Post-op monitoring · hour 4 of 6",
    progress: 62,
    vitals: "39.1 °C · 96 bpm · SpO₂ 97%",
  },
  {
    name: "Waffles",
    chart: "PT-0671",
    reason: "Oxygen therapy · flow 1.5 L/min",
    progress: 35,
    vitals: "39.8 °C · 132 bpm · SpO₂ 91%",
  },
]

const SCHEDULE = [
  { time: "09:30", label: "Hobbes — glucose curve", status: "follow-up" as const },
  { time: "10:15", label: "Pepper — stitch removal", status: "follow-up" as const },
  { time: "11:00", label: "Mochi — post-op evaluation", status: "critical" as const },
  { time: "13:30", label: "Clementine — beak & nail trim", status: "stable" as const },
  { time: "15:00", label: "Nala — discharge paperwork", status: "discharge" as const },
]

/* ------------------------------------------------------------------ */
/* Status badge — semantic color as a budget:                          */
/* critical = destructive, recovering = success, follow-up = warning,  */
/* every neutral state stays monochrome.                               */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: PatientStatus }) {
  switch (status) {
    case "critical":
      return <Badge variant="destructive">Critical</Badge>
    case "recovering":
      return (
        <Badge className="border-transparent bg-success-100 text-success-700">
          Recovering
        </Badge>
      )
    case "follow-up":
      return (
        <Badge className="border-transparent bg-warning-100 text-warning-700">
          Follow-up
        </Badge>
      )
    case "stable":
      return <Badge variant="secondary">Stable</Badge>
    case "boarding":
      return <Badge variant="outline">Boarding</Badge>
    case "discharge":
      return (
        <Badge variant="outline">
          <BadgeCheck />
          Discharge ready
        </Badge>
      )
  }
}

const NAV = [
  { label: "Patients", icon: Users, count: "9", active: true },
  { label: "Appointments", icon: CalendarDays, count: "3", active: false },
  { label: "Treatments", icon: Stethoscope, active: false },
  { label: "Pharmacy", icon: Pill, active: false },
  { label: "Lab results", icon: FlaskConical, active: false },
  { label: "Billing", icon: Receipt, active: false },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full bg-default-background">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-default-border bg-card">
          <div className="px-5 pt-6 pb-5">
            <p className="font-heading-3 text-heading-3 text-foreground">
              Rosewood
            </p>
            <p className="text-caption font-caption text-muted-foreground">
              Veterinary Clinic · Ward 2
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-0.5 px-3">
            {NAV.map((item) => (
              <div
                key={item.label}
                className={`flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm ${
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <Badge variant={item.active ? "default" : "secondary"}>
                    {item.count}
                  </Badge>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="border-t border-default-border px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="text-caption font-caption text-muted-foreground">
                On duty
              </p>
              <Badge variant="secondary">3 vets</Badge>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <AvatarGroup>
                <Avatar size="sm">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>KK</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <p className="text-caption font-caption text-muted-foreground">
                Shift ends 18:00
              </p>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center gap-4 border-b border-default-border px-8 py-4">
            <div className="min-w-0">
              <p className="text-caption font-caption text-muted-foreground">
                Internal medicine · Tuesday, 4 March
              </p>
              <h1 className="font-heading-1 text-heading-1 text-foreground">
                Patient records
              </h1>
            </div>
            <div className="ms-auto flex items-center gap-2.5">
              <div className="relative">
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients, owners, chart IDs"
                  className="w-72 pl-9"
                  aria-label="Search patients"
                />
              </div>
              <Button variant="outline">
                <Download />
                Export census
              </Button>
              <Button>
                <Plus />
                New patient
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="flex min-h-0 flex-1 gap-6 p-6">
            {/* Left: census strip + records table */}
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              {/* Census strip — flat panel, no shadow */}
              <div className="grid grid-cols-4 rounded-lg border border-default-border bg-card">
                {[
                  {
                    label: "Critical care",
                    value: "2",
                    badge: <Badge variant="destructive">Critical</Badge>,
                  },
                  {
                    label: "Recovering",
                    value: "2",
                    badge: (
                      <Badge className="border-transparent bg-success-100 text-success-700">
                        Improving
                      </Badge>
                    ),
                  },
                  {
                    label: "Follow-ups due",
                    value: "2",
                    badge: (
                      <Badge className="border-transparent bg-warning-100 text-warning-700">
                        This week
                      </Badge>
                    ),
                  },
                  {
                    label: "Active records",
                    value: "9",
                    badge: <Badge variant="secondary">Ward 2</Badge>,
                  },
                ].map((tile, i) => (
                  <div
                    key={tile.label}
                    className={`flex flex-col gap-1.5 px-5 py-4 ${
                      i > 0 ? "border-l border-default-border" : ""
                    }`}
                  >
                    <p className="text-caption font-caption text-muted-foreground">
                      {tile.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-code text-code text-foreground">
                        {tile.value}
                      </p>
                      {tile.badge}
                    </div>
                  </div>
                ))}
              </div>

              {/* Records table */}
              <Card className="min-h-0 flex-1 gap-0 rounded-lg py-0 shadow-none">
                <CardHeader className="border-b border-default-border px-6 py-4 [.border-b]:pb-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Active patients
                  </CardTitle>
                  <CardDescription>
                    Census for ward 2 — status reviewed at morning rounds, 08:30
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="ps-0">Patient</TableHead>
                        <TableHead>Species · Breed</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Temp</TableHead>
                        <TableHead>Pulse</TableHead>
                        <TableHead>Last seen</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="pe-0">Attending</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PATIENTS.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="ps-0">
                            <div className="flex items-center gap-2.5">
                              <Avatar size="sm">
                                <AvatarFallback>{p.initials}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">
                                  {p.name}
                                </span>
                                <span className="font-code text-xs text-muted-foreground">
                                  {p.id}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {p.species}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {p.owner}
                          </TableCell>
                          <TableCell className="font-code text-code text-foreground">
                            {p.weight}
                          </TableCell>
                          <TableCell className="font-code text-code text-foreground">
                            {p.temp}
                          </TableCell>
                          <TableCell className="font-code text-code text-foreground">
                            {p.pulse}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {p.lastSeen}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={p.status} />
                          </TableCell>
                          <TableCell className="pe-0 text-sm text-muted-foreground">
                            {p.vet}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Right rail */}
            <div className="flex w-80 shrink-0 flex-col gap-6">
              {/* Ward watch */}
              <Card className="gap-0 rounded-lg shadow-none">
                <CardHeader className="px-5 py-4">
                  <CardTitle className="flex items-center gap-2 font-heading-3 text-heading-3">
                    Ward watch
                    <Badge variant="destructive">
                      <Activity />
                      2 critical
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Continuous care · telemetry refreshed 09:38
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  {WARD_WATCH.map((w) => (
                    <div
                      key={w.chart}
                      className="flex flex-col gap-2 rounded-lg border border-default-border px-4 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {w.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {w.name}
                            </span>
                            <span className="font-code text-xs text-muted-foreground">
                              {w.chart}
                            </span>
                          </div>
                        </div>
                        <StatusBadge status="critical" />
                      </div>
                      <p className="text-caption font-caption text-muted-foreground">
                        {w.reason}
                      </p>
                      <Progress
                        value={w.progress}
                        aria-label={`${w.name} treatment progress`}
                      />
                      <div className="flex items-center justify-between">
                        <p className="font-code text-xs text-muted-foreground">
                          {w.vitals}
                        </p>
                        <p className="font-code text-xs text-foreground">
                          {w.progress}%
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Today's schedule */}
              <Card className="gap-0 rounded-lg shadow-none">
                <CardHeader className="px-5 py-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Today
                  </CardTitle>
                  <CardDescription>
                    5 appointments · 2 open slots
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col px-5">
                  {SCHEDULE.map((s, i) => (
                    <div
                      key={s.time}
                      className={`flex items-center gap-3 py-2.5 ${
                        i < SCHEDULE.length - 1
                          ? "border-b border-default-border"
                          : ""
                      }`}
                    >
                      <span className="w-10 shrink-0 font-code text-code text-foreground">
                        {s.time}
                      </span>
                      <span className="flex-1 text-sm text-foreground">
                        {s.label}
                      </span>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between border-t border-default-border px-8 py-3">
            <p className="text-caption font-caption text-muted-foreground">
              Rosewood Veterinary Clinic — patient management system
            </p>
            <div className="flex items-center gap-3">
              <p className="font-code text-xs text-muted-foreground">
                Census synced 09:41
              </p>
              <Badge variant="outline">Clinic open · closes 18:00</Badge>
            </div>
          </footer>
        </div>
      </div>
    </EvalShell>
  )
}
