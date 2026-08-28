"use client"

// EVAL page — combobox p1 — fitness class scheduler — 834x1112 light
// Combobox (grouped catalog, open at initial render; multi-select instructor
// chips) + Card, Tabs, Checkbox, Badge, Button, Separator, Avatar, Progress,
// Label. Flat panels + hairlines; popover shadow is allowed (true overlay).

import {
  CalendarDays,
  Flame,
  Ticket,
  Users,
} from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const classCatalog = [
  {
    value: "Strength",
    items: [
      { label: "Barbell Fundamentals", time: "07:00", spots: 3 },
      { label: "Kettlebell Conditioning", time: "12:15", spots: 8 },
      { label: "Total Body Pump", time: "17:30", spots: 12 },
    ],
  },
  {
    value: "Cardio",
    items: [
      { label: "Spin Interval 45", time: "06:30", spots: 5 },
      { label: "Row + Run Circuit", time: "18:00", spots: 9 },
    ],
  },
  {
    value: "Mobility & Recovery",
    items: [
      { label: "Sunrise Vinyasa", time: "06:45", spots: 2 },
      { label: "Deep Stretch & Breathwork", time: "20:15", spots: 14 },
    ],
  },
]

const instructors = [
  "Maya Chen",
  "Dario Puente",
  "Ingrid Halvorsen",
  "Sam Okafor",
  "Lena Fischer",
  "Tomás Ribeiro",
]

const todaySessions = [
  {
    time: "06:45",
    name: "Sunrise Vinyasa",
    coach: "Maya Chen",
    spots: "2 left",
    state: "outline" as const,
  },
  {
    time: "12:15",
    name: "Kettlebell Conditioning",
    coach: "Sam Okafor",
    spots: "8 left",
    state: "secondary" as const,
  },
  {
    time: "18:00",
    name: "Row + Run Circuit",
    coach: "Ingrid Halvorsen",
    spots: "Waitlist",
    state: "destructive" as const,
  },
]

export default function Page() {
  const instructorAnchor = useComboboxAnchor()

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[780px] flex-col gap-4 px-6 py-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-caption text-caption text-muted-foreground">
              Fernhall Studio · Riverside · Spring term
            </p>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Class scheduler
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <CalendarDays />
              My passes
            </Button>
            <Button size="sm">
              <Ticket />
              Renew pass
            </Button>
          </div>
        </header>

        {/* Term stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="gap-1.5 py-4">
            <CardContent className="px-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Flame className="size-3.5" />
                <span className="font-caption text-caption">
                  Current streak
                </span>
              </div>
              <p className="font-code text-2xl text-foreground">3 weeks</p>
              <p className="font-caption text-caption text-muted-foreground">
                11 classes since Feb 17
              </p>
            </CardContent>
          </Card>
          <Card className="gap-1.5 py-4">
            <CardContent className="px-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="size-3.5" />
                <span className="font-caption text-caption">
                  Favorite coaches
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <Avatar size="sm">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>SO</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>IH</AvatarFallback>
                </Avatar>
                <span className="ms-1 text-sm text-foreground">of 14</span>
              </div>
              <p className="font-caption text-caption text-muted-foreground">
                Most booked: Maya Chen
              </p>
            </CardContent>
          </Card>
          <Card className="gap-1.5 py-4">
            <CardContent className="px-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Ticket className="size-3.5" />
                <span className="font-caption text-caption">
                  Passes remaining
                </span>
              </div>
              <p className="font-code text-2xl text-foreground">7 of 20</p>
              <Progress
                value={35}
                aria-label="Passes used this term"
                className="mt-1"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Booking form */}
          <Card className="col-span-7 gap-4">
            <CardHeader>
              <CardTitle className="text-sm">New booking</CardTitle>
              <CardDescription>
                Week of March 10 · Riverside studios
              </CardDescription>
              <CardAction>
                <Badge variant="outline">Spring term</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Tabs defaultValue="thu">
                <TabsList className="w-full">
                  <TabsTrigger value="mon">Mon 10</TabsTrigger>
                  <TabsTrigger value="tue">Tue 11</TabsTrigger>
                  <TabsTrigger value="wed">Wed 12</TabsTrigger>
                  <TabsTrigger value="thu">Thu 13</TabsTrigger>
                  <TabsTrigger value="fri">Fri 14</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Class picker — grouped, searchable, open at render */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="class-combobox">Class</Label>
                <Combobox items={classCatalog} defaultOpen autoHighlight>
                  <ComboboxInput
                    id="class-combobox"
                    placeholder="Search classes…"
                    showClear
                  />
                  <ComboboxContent className="shadow-lg">
                    <ComboboxEmpty>No classes match.</ComboboxEmpty>
                    <ComboboxList className="max-h-none pb-1">
                      {(group, index) => (
                        <ComboboxGroup
                          key={group.value}
                          items={group.items}
                        >
                          <ComboboxLabel>{group.value}</ComboboxLabel>
                          <ComboboxCollection>
                            {(item) => (
                              <ComboboxItem
                                key={item.label}
                                value={item}
                                className="gap-3"
                              >
                                <span className="truncate text-sm">
                                  {item.label}
                                </span>
                                <span className="ms-auto flex shrink-0 items-center gap-2 font-code text-xs text-muted-foreground">
                                  <span>{item.time}</span>
                                  <span aria-hidden>·</span>
                                  <span>
                                    {item.spots === 1
                                      ? "1 spot"
                                      : `${item.spots} spots`}
                                  </span>
                                </span>
                              </ComboboxItem>
                            )}
                          </ComboboxCollection>
                          {index < classCatalog.length - 1 && (
                            <ComboboxSeparator />
                          )}
                        </ComboboxGroup>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              {/* Instructor preference — multi-select chips */}
              <div className="flex flex-col gap-2">
                <Label>Preferred coaches</Label>
                <Combobox
                  items={instructors}
                  multiple
                  defaultValue={["Maya Chen", "Sam Okafor"]}
                >
                  <ComboboxChips ref={instructorAnchor}>
                    <ComboboxValue>
                      {(values) => (
                        <>
                          {values.map((value) => (
                            <ComboboxChip key={value}>{value}</ComboboxChip>
                          ))}
                          <ComboboxChipsInput placeholder="Add coach…" />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent anchor={instructorAnchor}>
                    <ComboboxEmpty>No coaches match.</ComboboxEmpty>
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

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Checkbox id="mat" defaultChecked />
                  <Label htmlFor="mat" className="text-sm font-normal">
                    Reserve a mat ($2)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="waitlist" />
                  <Label htmlFor="waitlist" className="text-sm font-normal">
                    Join waitlist if the class is full
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's schedule */}
          <Card className="col-span-5 gap-3">
            <CardHeader>
              <CardTitle className="text-sm">Today · Thu, Mar 13</CardTitle>
              <CardDescription>Riverside schedule</CardDescription>
              <CardAction>
                <Badge variant="secondary">3 sessions</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col">
              {todaySessions.map((session, index) => (
                <div key={session.time}>
                  {index > 0 && <Separator className="my-3" />}
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {session.name}
                      </p>
                      <p className="truncate font-caption text-caption text-muted-foreground">
                        <span className="font-code">{session.time}</span>
                        {" · "}
                        {session.coach}
                      </p>
                    </div>
                    <Badge
                      variant={session.state}
                      className="mt-0.5 shrink-0"
                    >
                      {session.spots}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-code text-xs text-muted-foreground">
            11 classes booked this term · next pass billing Apr 1
          </span>
          <Button variant="ghost" size="sm">
            Booking history
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}
