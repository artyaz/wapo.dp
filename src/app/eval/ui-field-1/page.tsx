"use client"
// EVAL page — field p1 — gym workout tracker — 834x1112 dark (tablet)
// Field family front and center: labels, descriptions, errors, required
// marks, fieldsets, groups, switch/checkbox/slider compositions.
// Co-stars: Card, Button, Badge, Avatar, Progress, Input, Select,
// Switch, Checkbox, Textarea, Slider.

import * as React from "react"
import { Dumbbell, Save } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const programs = [
  { label: "Hypertrophy block — Week 3", value: "hypertrophy" },
  { label: "5/3/1 strength cycle", value: "strength" },
  { label: "Deload week", value: "deload" },
  { label: "Hybrid endurance", value: "hybrid" },
]

const units = [
  { label: "Kilograms (kg)", value: "kg" },
  { label: "Pounds (lb)", value: "lb" },
]

const weekDays = [
  { day: "Mon", focus: "Push", checked: true },
  { day: "Tue", focus: "Pull", checked: true },
  { day: "Wed", focus: "Rest", checked: false },
  { day: "Thu", focus: "Legs", checked: true },
  { day: "Fri", focus: "Rest", checked: false },
  { day: "Sat", focus: "Conditioning", checked: true },
  { day: "Sun", focus: "Mobility", checked: false },
]

function RequiredMark() {
  return (
    <span>
      <span aria-hidden="true" className="text-foreground">
        {" *"}
      </span>
      <span className="sr-only">(required)</span>
    </span>
  )
}

function Page() {
  const [sessionLength, setSessionLength] = React.useState([75])

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[810px] flex-col gap-5 px-6 py-5">
        {/* App header */}
        <header className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg border">
              <Dumbbell className="size-4 text-foreground" />
            </span>
            <span className="font-heading-3 text-heading-3 text-foreground">
              Ironlog
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              workout tracker
            </span>
          </div>
          <Badge variant="outline" className="font-code font-normal">
            v3.2.0
          </Badge>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden font-caption text-caption text-muted-foreground sm:block">
              Maya Okafor · Iron District, Brooklyn
            </span>
            <Avatar>
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
            <Button size="sm">
              <Save />
              Save changes
            </Button>
          </div>
        </header>

        {/* Page title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Profile &amp; training settings
            </h1>
            <p className="mt-1 font-caption text-caption text-muted-foreground">
              Mid-block review — changes apply to workouts logged after today.
            </p>
          </div>
          <span className="font-code text-xs text-muted-foreground">
            edited 09:41
          </span>
        </div>

        <div className="grid flex-1 grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_252px]">
          {/* ---- Form column ---- */}
          <div className="flex flex-col gap-5">
            {/* Profile */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Athlete profile</CardTitle>
                <CardDescription>
                  How you appear on the leaderboard and to training partners.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="display-name">
                      Display name
                      <RequiredMark />
                    </FieldLabel>
                    <Input
                      id="display-name"
                      defaultValue="Maya O."
                      aria-required
                    />
                    <FieldDescription>
                      4–24 characters. Shown next to every logged lift.
                    </FieldDescription>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="body-weight">
                        Body weight (kg)
                      </FieldLabel>
                      <Input
                        id="body-weight"
                        defaultValue="68.5"
                        className="font-code"
                      />
                      <FieldDescription>
                        Last check-in Nov 12 · 07:15
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="height">Height (cm)</FieldLabel>
                      <Input id="height" defaultValue="171" />
                      <FieldDescription>Used for Wilks scoring.</FieldDescription>
                    </Field>
                  </div>
                  <Field invalid>
                    <FieldLabel htmlFor="squat-target">
                      Squat target (kg)
                      <RequiredMark />
                    </FieldLabel>
                    <Input
                      id="squat-target"
                      defaultValue="122.5"
                      aria-invalid
                      className="font-code"
                    />
                    <FieldError>
                      Target exceeds your ceiling by 7.5 kg — squat 1RM is 115
                      kg, and max programmed overload is +10 kg.
                    </FieldError>
                  </Field>
                  <FieldSeparator />
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor="public-prs">
                        Show PRs on leaderboard
                      </FieldLabel>
                      <FieldDescription>
                        Best lifts are visible to your gym community.
                      </FieldDescription>
                    </FieldContent>
                    <Switch id="public-prs" defaultChecked />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Training defaults — a FieldSet section */}
            <FieldSet className="gap-4 p-5">
              <FieldLegend>Training defaults</FieldLegend>
              <FieldDescription>
                Applied to every new workout you start.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="program">
                    Program
                    <RequiredMark />
                  </FieldLabel>
                  <Select items={programs} defaultValue="hypertrophy">
                    <SelectTrigger id="program" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Block ends Dec 6 — deload week is auto-scheduled.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldTitle>Session length</FieldTitle>
                  <FieldDescription>
                    Warm-up included ·{" "}
                    <span className="font-code font-medium text-foreground">
                      {sessionLength[0]}
                    </span>{" "}
                    min
                  </FieldDescription>
                  <Slider
                    value={sessionLength}
                    onValueChange={(value) => setSessionLength(value)}
                    min={30}
                    max={120}
                    step={5}
                    aria-label="Session length"
                    className="mt-2"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="rest-timer">Rest timer</FieldLabel>
                    <Input
                      id="rest-timer"
                      defaultValue="150"
                      className="font-code"
                    />
                    <FieldDescription>Seconds between sets.</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="units">Units</FieldLabel>
                    <Select items={units} defaultValue="kg">
                      <SelectTrigger id="units" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {units.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldDescription>Barbell plates at Iron District.</FieldDescription>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>

            {/* Coach notes */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Notes for your coach</CardTitle>
                <CardDescription>
                  Shared with Dan Rivera, CSCS · last edited 2 days ago.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                <Field>
                  <FieldLabel htmlFor="coach-notes" className="sr-only">
                    Coach notes
                  </FieldLabel>
                  <Textarea
                    id="coach-notes"
                    rows={3}
                    defaultValue="Sharp hip pinch on deep squats above 100 kg. Want a short mobility block on rest days, and to keep deadlifts at 4 plates until the pin feeling is gone."
                    className="resize-none"
                  />
                  <FieldDescription>
                    Your coach replies within 24 hours before each session.
                  </FieldDescription>
                </Field>
              </CardContent>
            </Card>
          </div>

          {/* ---- Side rail ---- */}
          <div className="flex flex-col gap-5">
            {/* Week status */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">This week</CardTitle>
                <CardDescription>Nov 11 – Nov 17</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5">
                <div className="flex items-center justify-between">
                  <Badge>23-day streak</Badge>
                  <span className="font-code text-xs text-muted-foreground">
                    2 PRs
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Weekly volume
                  </span>
                  <span className="font-code text-sm text-foreground">
                    42,340 kg
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Sessions · 4 of 5
                    </span>
                    <span className="font-code text-xs text-foreground">
                      80%
                    </span>
                  </div>
                  <Progress value={80} aria-label="Weekly sessions" />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Notifications</CardTitle>
                <CardDescription>Where Ironlog reaches you.</CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                <FieldGroup>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor="reminder">Workout reminder</FieldLabel>
                      <FieldDescription>Weekdays · 06:30</FieldDescription>
                    </FieldContent>
                    <Switch id="reminder" defaultChecked />
                  </Field>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor="pr-alert">PR attempts</FieldLabel>
                      <FieldDescription>
                        Ping partners on a new 1RM
                      </FieldDescription>
                    </FieldContent>
                    <Switch id="pr-alert" defaultChecked />
                  </Field>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor="digest">Weekly digest</FieldLabel>
                      <FieldDescription>Sunday recap email</FieldDescription>
                    </FieldContent>
                    <Switch id="digest" />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Training week */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Training week</CardTitle>
                <CardDescription>Drag-and-drop days on the plan.</CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                <FieldGroup data-slot="checkbox-group" className="gap-2.5">
                  {weekDays.map((item) => (
                    <Field
                      key={item.day}
                      orientation="horizontal"
                      className="gap-2.5"
                    >
                      <Checkbox
                        id={`day-${item.day}`}
                        defaultChecked={item.checked}
                      />
                      <FieldLabel
                        htmlFor={`day-${item.day}`}
                        className="font-normal"
                      >
                        <span className="w-9 shrink-0 text-foreground">
                          {item.day}
                        </span>
                        <span className="font-caption text-caption text-muted-foreground">
                          {item.focus}
                        </span>
                      </FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Ironlog — settings sync across all your devices
          </span>
          <span className="font-code text-xs text-muted-foreground">
            autosaved 09:41 · 2 unsaved edits
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
