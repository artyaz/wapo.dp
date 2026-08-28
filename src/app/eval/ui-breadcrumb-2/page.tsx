"use client"

// EVAL page — breadcrumb p2 — gym workout tracker — 430x932 dark

import {
  Bell,
  ChevronRight,
  Dumbbell,
  Pause,
  Play,
  Settings,
  Timer,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const EXERCISES = [
  {
    name: "Barbell Bench Press",
    prescription: "4 × 8 · 82.5 kg · RPE 8",
    done: 3,
    sets: 4,
    pr: true,
    state: "in-progress" as const,
  },
  {
    name: "Seated Overhead Press",
    prescription: "4 × 10 · 42.5 kg · RPE 7",
    done: 2,
    sets: 4,
    pr: false,
    state: "in-progress" as const,
  },
  {
    name: "Incline Dumbbell Press",
    prescription: "3 × 12 · 24 kg · RPE 8",
    done: 0,
    sets: 3,
    pr: false,
    state: "next" as const,
  },
  {
    name: "Cable Lateral Raise",
    prescription: "3 × 15 · 10 kg · RPE 9",
    done: 0,
    sets: 3,
    pr: false,
    state: "queued" as const,
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* App bar --------------------------------------------------- */}
        <header className="flex shrink-0 items-center justify-between border-b border-default-border px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Dumbbell className="size-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Ironbook</p>
              <p className="mt-1 text-caption font-caption text-muted-foreground">
                Tuesday · Push Day
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <Bell className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Settings">
              <Settings className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </header>

        {/* Scrollable session ---------------------------------------- */}
        <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-4 pb-2">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Gym</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Programs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Iron Block · W7</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Push Day A</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Session header */}
          <section className="rounded-lg border border-default-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  Push Day A
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Week 7 of 12</Badge>
                  <Badge variant="outline">Day 2 of 4</Badge>
                </div>
              </div>
              <div className="shrink-0 text-end">
                <p className="font-code text-2xl leading-none text-foreground">
                  41:36
                </p>
                <p className="mt-1.5 text-caption font-caption text-muted-foreground">
                  started 18:24
                </p>
              </div>
            </div>
            <div className="mt-3.5 flex flex-col gap-1.5">
              <Progress value={62} aria-label="Session sets completed" />
              <div className="flex items-center justify-between">
                <p className="font-code text-xs text-muted-foreground">
                  13 of 21 sets logged
                </p>
                <p className="font-code text-xs text-muted-foreground">
                  3,240 kg volume
                </p>
              </div>
            </div>
          </section>

          {/* Rest timer */}
          <section
            className="flex items-center justify-between gap-3 rounded-lg border border-default-border bg-card px-4 py-3"
            aria-label="Rest timer"
          >
            <span className="flex items-center gap-2.5">
              <Timer className="size-4 text-muted-foreground" aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium leading-none">
                  Rest · 0:47
                </span>
                <span className="mt-1 block font-code text-xs text-muted-foreground">
                  of 1:30 · set 4 of 4, bench
                </span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Button variant="outline" size="icon-sm" aria-label="Pause rest timer">
                <Pause className="size-4" aria-hidden="true" />
              </Button>
              <Button size="sm">
                <Play className="size-4" aria-hidden="true" />
                Skip
              </Button>
            </span>
          </section>

          {/* Exercises */}
          <div className="flex flex-col gap-3">
            {EXERCISES.map((exercise) => (
              <Card key={exercise.name} className="gap-3 py-4">
                <CardContent className="flex flex-col gap-3 px-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-none">
                        {exercise.name}
                      </p>
                      <p className="mt-1.5 font-code text-xs text-muted-foreground">
                        {exercise.prescription}
                      </p>
                    </div>
                    {exercise.pr ? (
                      <Badge className="border-transparent bg-success-100 text-success-700">
                        PR · 87.5 kg
                      </Badge>
                    ) : exercise.state === "next" ? (
                      <Badge variant="secondary">Next up</Badge>
                    ) : (
                      <span className="font-code text-xs text-muted-foreground">
                        {exercise.sets - exercise.done} sets left
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3"
                    role="group"
                    aria-label={`${exercise.name} sets`}
                  >
                    {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                      <span key={setIndex} className="flex items-center gap-1.5">
                        <Checkbox
                          checked={setIndex < exercise.done}
                          aria-label={`Set ${setIndex + 1} of ${exercise.name}`}
                        />
                        <span className="font-code text-xs text-muted-foreground">
                          {setIndex + 1}
                        </span>
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="bg-default-border" />

          <p className="text-center text-caption font-caption text-muted-foreground">
            Coach note: keep bench pauses to 1:30 — hit 87.5 kg only if set 4
            feels clean.
          </p>
        </main>

        {/* Footer ------------------------------------------------------ */}
        <footer className="shrink-0 border-t border-default-border bg-card px-4 py-3">
          <Button className="w-full" size="lg">
            <ChevronRight className="size-4" aria-hidden="true" />
            Finish workout
          </Button>
          <p className="mt-2 text-center font-code text-xs text-muted-foreground">
            5 exercises · 21 sets · auto-log on finish
          </p>
        </footer>
      </div>
    </EvalShell>
  )
}
