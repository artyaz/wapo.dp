"use client"

// EVAL page — mention p1 — volunteer shift coordinator — 768x1024 dark

import { HandHeartIcon, SendIcon, TriangleAlertIcon } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MentionChip, MentionInput } from "@/components/ui/mention"
import { Separator } from "@/components/ui/separator"

const VOLUNTEERS = [
  { id: "v-maya", value: "maya", label: "Maya Okafor", description: "Intake lead" },
  { id: "v-marcus", value: "marcus", label: "Marcus Webb", description: "Dish pit" },
  { id: "v-maggie", value: "maggie", label: "Maggie Torres", description: "Serving line" },
  { id: "v-priya", value: "priya", label: "Priya Raman", description: "Serving line" },
  { id: "v-dana", value: "dana", label: "Dana Whitfield", description: "Dessert station" },
  { id: "v-tomas", value: "tomas", label: "Tomás Aguilar", description: "Greeter" },
]

const ROSTER = [
  { name: "Maya Okafor", role: "Intake lead", initials: "MO", here: true },
  { name: "Marcus Webb", role: "Dish pit", initials: "MW", here: true },
  { name: "Priya Raman", role: "Serving line", initials: "PR", here: true },
  { name: "Dana Whitfield", role: "Dessert station", initials: "DW", here: false },
]

const COVERAGE = [
  { station: "Dining room", filled: "6/6", warn: false },
  { station: "Intake", filled: "4/4", warn: false },
  { station: "Dish pit", filled: "3/4", warn: false },
  { station: "Dessert", filled: "1/2", warn: true },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col gap-5 px-5 py-5">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm">
              <HandHeartIcon className="size-5" />
            </div>
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Shift notes
              </h1>
              <p className="text-muted-foreground mt-1 text-xs">
                Harborline Community Kitchen · Saturday dinner service · Nov
                14, <span className="font-code">16:00–20:00</span>
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="mt-1">
            Live
          </Badge>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_232px]">
          {/* Main column */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* Composer */}
            <Card className="gap-4 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">End-of-shift notes</CardTitle>
                <CardDescription className="text-xs">
                  Thank volunteers and flag anything the Sunday coordinator
                  should know. Mentions notify the volunteer directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <MentionInput
                  aria-label="End-of-shift notes"
                  placeholder="Write a note… use @ to mention a volunteer"
                  mentions={[
                    { trigger: "@", label: "Volunteers", data: VOLUNTEERS },
                  ]}
                  defaultValue={[
                    "Great service tonight — 212 meals served. ",
                    { trigger: "@", value: "maya", label: "Maya Okafor" },
                    " trained both new intake volunteers, and ",
                  ]}
                  defaultQuery={{ trigger: "@", query: "ma" }}
                  showHints
                />
              </CardContent>
              <CardFooter className="gap-2 px-4">
                <Button size="sm">
                  <SendIcon />
                  Post note
                </Button>
                <Button size="sm" variant="outline">
                  Save draft
                </Button>
                <span className="text-muted-foreground ms-auto font-code text-xs">
                  212 meals · 46 guests
                </span>
              </CardFooter>
            </Card>

            {/* Earlier notes */}
            <section aria-labelledby="earlier-notes" className="flex flex-col gap-3">
              <h2
                id="earlier-notes"
                className="font-heading-3 text-heading-3 text-foreground"
              >
                Earlier tonight
              </h2>

              <div className="bg-card flex items-start gap-3 rounded-lg border px-4 py-3">
                <Avatar size="sm">
                  <AvatarFallback>NF</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2 text-sm">
                    <span className="font-medium text-foreground">
                      Nadia Ferrand
                    </span>
                    <span className="text-muted-foreground font-code text-xs">
                      19:42
                    </span>
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-5">
                    Dish pit ran 20 minutes behind after second seating —{" "}
                    <MentionChip trigger="@">Marcus Webb</MentionChip> needs a
                    second runner on Saturdays.
                  </p>
                </div>
              </div>

              <div className="bg-card flex items-start gap-3 rounded-lg border px-4 py-3">
                <Avatar size="sm">
                  <AvatarFallback>NF</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2 text-sm">
                    <span className="font-medium text-foreground">
                      Nadia Ferrand
                    </span>
                    <span className="text-muted-foreground font-code text-xs">
                      18:15
                    </span>
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-5">
                    <MentionChip trigger="@">Dana Whitfield</MentionChip> prepped
                    60 dessert boxes for tomorrow&apos;s pickup run — freezer
                    shelf B is full.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right rail */}
          <div className="flex min-w-0 flex-col gap-5">
            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">On shift now</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                {ROSTER.map((person) => (
                  <div key={person.name} className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback>{person.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">
                        {person.name}
                      </p>
                      <p className="text-muted-foreground truncate text-[11px]">
                        {person.role}
                      </p>
                    </div>
                    {person.here ? (
                      <Badge variant="secondary" className="text-[10px]">
                        Here
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">
                        Left
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Coverage</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-4">
                <p className="font-code text-foreground text-sm tabular-nums">
                  18<span className="text-muted-foreground">/22 slots</span>
                </p>
                <Separator />
                {COVERAGE.map((row) => (
                  <div
                    key={row.station}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground">{row.station}</span>
                    <span
                      className={`font-code tabular-nums ${
                        row.warn
                          ? "text-amber-500 dark:text-amber-400"
                          : "text-foreground"
                      }`}
                    >
                      {row.filled}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Alert>
              <TriangleAlertIcon />
              <AlertTitle>Dessert station uncovered</AlertTitle>
              <AlertDescription>
                <span className="font-code">18:00–19:00</span> still has no
                signed-up volunteer. Ask a floater before the second seating.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <footer className="text-muted-foreground mt-auto flex items-center justify-between pt-2 text-[11px]">
          <span>Coordinator: Nadia Ferrand · n.ferrand@harborline.org</span>
          <span className="font-code">SHIFT-1126-EVE</span>
        </footer>
      </div>
    </EvalShell>
  )
}
