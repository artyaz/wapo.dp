"use client"

// EVAL page — button-group p1 — restaurant reservation system — 1280x800 dark

import {
  CalendarCheckIcon,
  CalendarPlusIcon,
  ChefHatIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CrownIcon,
  DownloadIcon,
  HourglassIcon,
  LayoutDashboardIcon,
  ListIcon,
  MapIcon,
  MoreHorizontalIcon,
  Rows3Icon,
  UserCheckIcon,
  UsersIcon,
  UtensilsCrossedIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAV = [
  { icon: LayoutDashboardIcon, label: "Overview", active: false },
  { icon: CalendarCheckIcon, label: "Reservations", active: true },
  { icon: MapIcon, label: "Floor plan", active: false },
  { icon: HourglassIcon, label: "Waitlist", active: false },
  { icon: UsersIcon, label: "Guests", active: false },
  { icon: UtensilsCrossedIcon, label: "Menus", active: false },
]

const STATUS_STYLES: Record<string, { variant: "outline"; className?: string }> =
  {
    Confirmed: { variant: "outline" },
    Seated: {
      variant: "outline",
      className: "border-success-200 bg-success-50 text-success-700",
    },
    Late: {
      variant: "outline",
      className: "border-warning-200 bg-warning-50 text-warning-700",
    },
    "No-show": {
      variant: "outline",
      className: "border-destructive-200 bg-destructive-50 text-destructive-600",
    },
  }

const BOOK = [
  {
    name: "Amelia Fontaine",
    phone: "+351 912 004 118",
    party: 8,
    time: "19:00",
    table: "T1 + T2 · Terrace",
    status: "Confirmed",
  },
  {
    name: "David Okafor",
    phone: "+351 913 552 840",
    party: 4,
    time: "18:30",
    table: "T7",
    status: "Seated",
  },
  {
    name: "Katarina Elm",
    phone: "+351 917 204 336",
    party: 2,
    time: "19:00",
    table: "T12",
    status: "Confirmed",
  },
  {
    name: "Sofia Marchetti",
    phone: "+351 916 771 509",
    party: 6,
    time: "19:15",
    table: "T3",
    status: "Seated",
  },
  {
    name: "Ruben Alvarez",
    phone: "+351 912 660 274",
    party: 2,
    time: "19:30",
    table: "T15",
    status: "Late",
  },
  {
    name: "Jonas Lindqvist",
    phone: "+351 918 340 552",
    party: 3,
    time: "20:00",
    table: "Counter A",
    status: "Seated",
  },
  {
    name: "Priya Raman",
    phone: "+351 915 887 631",
    party: 2,
    time: "20:15",
    table: "T9",
    status: "No-show",
  },
  {
    name: "Tomás Fonseca",
    phone: "+351 917 118 205",
    party: 5,
    time: "20:30",
    table: "T5",
    status: "Confirmed",
  },
]

const WAITLIST = [
  { name: "Nakamura", party: 2, quoted: "20:30" },
  { name: "García", party: 5, quoted: "21:00" },
  { name: "Whitfield", party: 2, quoted: "20:45" },
]

const NOTES = [
  { guest: "Elm", note: "Anniversary — candle with dessert." },
  { guest: "Okafor", note: "Nut allergy, flagged to kitchen." },
  { guest: "Fontaine", note: "Birthday cake out at 21:30." },
]

const STATS = [
  { label: "Covers booked", value: "84 / 120" },
  { label: "Seated", value: "37" },
  { label: "Tables open", value: "6" },
  { label: "No-shows", value: "2" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-sidebar flex w-60 shrink-0 flex-col border-e">
          <div className="px-5 pt-6 pb-5">
            <p className="font-heading-3 text-heading-3 text-foreground">
              Tavola Nostrana
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Ristorante · Chiado, Lisbon
            </p>
          </div>
          <nav className="flex flex-col gap-1 px-3">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm ${
                  item.active
                    ? "bg-secondary text-secondary-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-3 border-t px-5 py-4">
            <Avatar size="sm">
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium">Marco Bellini</p>
              <p className="text-muted-foreground text-xs">
                Floor host · <span className="font-code">17:00–23:00</span>
              </p>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-4 border-b px-6 py-4">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Friday · 14 March 2026
              </p>
              <h1 className="font-heading-1 text-heading-1 text-foreground mt-1">
                Reservations
              </h1>
            </div>
            <div className="ms-auto flex items-center gap-3">
              <ButtonGroup aria-label="Book view">
                <Button variant="default" size="icon-sm" aria-label="Timeline view">
                  <Rows3Icon />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Floor plan view"
                >
                  <MapIcon />
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="List view">
                  <ListIcon />
                </Button>
              </ButtonGroup>
              <ButtonGroup aria-label="Create a reservation">
                <Button size="sm">
                  <CalendarPlusIcon /> New reservation
                </Button>
                <DropdownMenu defaultOpen>
                  <DropdownMenuTrigger
                    render={
                      <Button size="icon-sm" aria-label="Choose reservation type">
                        <ChevronDownIcon />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Reservation type</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <CalendarPlusIcon /> Standard table
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UsersIcon /> Large party · 7+
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChefHatIcon /> Chef&rsquo;s counter
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CrownIcon /> Private buyout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <DownloadIcon /> Import from OpenTable
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </div>
          </header>

          {/* Toolbar */}
          <div className="flex items-center gap-4 border-b px-6 py-3">
            <ButtonGroup aria-label="Pick a day">
              <Button variant="outline" size="icon-sm" aria-label="Previous day">
                <ChevronLeftIcon />
              </Button>
              <Button variant="outline" size="sm">
                Fri 14 Mar
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Next day">
                <ChevronRightIcon />
              </Button>
            </ButtonGroup>
            <ButtonGroupSeparator />
            <ButtonGroup aria-label="Service filter">
              <Button variant="outline" size="sm">
                Lunch
              </Button>
              <Button variant="default" size="sm">
                Dinner
              </Button>
              <Button variant="outline" size="sm">
                Late
              </Button>
            </ButtonGroup>
            <Badge variant="outline" className="gap-1.5 px-2.5 py-1">
              <UsersIcon />
              <span className="font-code">84 / 120</span> covers booked
            </Badge>
            <p className="text-muted-foreground text-xs">
              synced <span className="font-code">19:02</span>
            </p>
          </div>

          <main className="flex min-h-0 flex-1 gap-6 p-6">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <Card className="gap-0 py-4">
                <CardContent className="grid grid-cols-4 divide-x px-0">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="px-5">
                      <p className="text-muted-foreground text-xs">
                        {stat.label}
                      </p>
                      <p className="font-code mt-1 text-lg text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="min-h-0 flex-1 gap-4 py-0">
                <CardHeader className="border-b px-6 py-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Tonight&rsquo;s book
                  </CardTitle>
                  <CardDescription>
                    Dinner service · <span className="font-code">18:00–23:00</span>{" "}
                    · 34 reservations
                  </CardDescription>
                  <CardAction>
                    <Badge variant="outline">
                      <ClockIcon /> 8 arriving next hour
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="px-2 pb-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="ps-4">Guest</TableHead>
                        <TableHead>Party</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Table</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="pe-4 text-end">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {BOOK.map((row) => {
                        const status = STATUS_STYLES[row.status]
                        return (
                          <TableRow key={row.name}>
                            <TableCell className="ps-4">
                              <span className="flex items-center gap-2.5">
                                <Avatar size="sm">
                                  <AvatarFallback>
                                    {row.name
                                      .split(" ")
                                      .map((part) => part[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="flex flex-col">
                                  <span className="font-medium">{row.name}</span>
                                  <span className="text-muted-foreground font-code text-xs">
                                    {row.phone}
                                  </span>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="font-code">{row.party}</TableCell>
                            <TableCell className="font-code">{row.time}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {row.table}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={status.variant}
                                className={status.className}
                              >
                                {row.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="pe-4">
                              <span className="flex justify-end">
                                <ButtonGroup aria-label={`Actions for ${row.name}`}>
                                  <Button
                                    variant="outline"
                                    size="icon-xs"
                                    aria-label={`Seat ${row.name}`}
                                  >
                                    <UserCheckIcon />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon-xs"
                                    aria-label={`More options for ${row.name}`}
                                  >
                                    <MoreHorizontalIcon />
                                  </Button>
                                </ButtonGroup>
                              </span>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="flex w-80 shrink-0 flex-col gap-6">
              <Card className="gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Service notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  {NOTES.map((note) => (
                    <p key={note.guest} className="text-sm">
                      <span className="font-medium">{note.guest}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {note.note}
                      </span>
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Waitlist
                  </CardTitle>
                  <CardDescription>3 parties waiting tonight</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  {WAITLIST.map((party) => (
                    <div
                      key={party.name}
                      className="flex items-center justify-between"
                    >
                      <span className="flex flex-col">
                        <span className="text-sm font-medium">{party.name}</span>
                        <span className="text-muted-foreground text-xs">
                          Party of {party.party} · quoted{" "}
                          <span className="font-code">{party.quoted}</span>
                        </span>
                      </span>
                      <Button variant="outline" size="xs">
                        Seat
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  )
}
