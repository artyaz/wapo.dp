"use client"
// EVAL page — stepper p2 — craft brewery tap list — 834x1112 light

import * as React from "react"
import { BeerIcon } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Stepper,
  StepperContent,
  StepperNavigation,
} from "@/components/ui/stepper"

function Field({
  id,
  label,
  defaultValue,
  mono,
}: {
  id: string
  label: string
  defaultValue: string
  mono?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        defaultValue={defaultValue}
        readOnly
        className={mono ? "font-code text-sm" : undefined}
      />
    </div>
  )
}

const taps = [
  {
    name: "Copper Kettle IPA",
    style: "American IPA",
    abv: "6.8%",
    level: 72,
    status: "ON TAP",
    live: true,
  },
  {
    name: "Prairie Wheat",
    style: "Wheat Ale",
    abv: "5.1%",
    level: 38,
    status: "ON TAP",
    live: true,
  },
  {
    name: "Blackline Porter",
    style: "Robust Porter",
    abv: "5.9%",
    level: 12,
    status: "KEG LOW",
    live: false,
  },
  {
    name: "Solstice Saison",
    style: "Farmhouse Ale",
    abv: "6.2%",
    level: 0,
    status: "CHANGEOVER",
    live: false,
  },
]

export default function Page() {
  const [activeStep, setActiveStep] = React.useState(2)

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BeerIcon className="size-4" />
            </span>
            <div>
              <p className="text-sm leading-tight font-semibold">
                Copper Kettle Brewing
              </p>
              <p className="font-code text-[11px] text-muted-foreground">
                TAPROOM OS · MAIN BAR
              </p>
            </div>
          </div>
          <Badge variant="outline" className="font-code text-[11px]">
            8 TAPS · 4 POURING
          </Badge>
        </header>

        {/* Main */}
        <main className="mx-auto flex w-full max-w-[760px] flex-1 flex-col gap-4 px-6 py-4">
          {/* New beer onboarding wizard */}
          <Card className="gap-4 py-4">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-lg">
                Add a new beer
              </CardTitle>
              <CardDescription>
                Batch BR-0921 · brewed Aug 24 · walk it from recipe card to the
                tap wall.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <Stepper
                orientation="vertical"
                activeStep={activeStep}
                onStepChange={setActiveStep}
                label="New beer onboarding"
                steps={[
                  { label: "Recipe", description: "Grain bill and hops locked" },
                  { label: "Batch", description: "Brew log and volumes" },
                  { label: "Pricing", description: "Pours and price list" },
                  { label: "Tap assignment", description: "Handle and line" },
                ]}
              >
                <StepperContent value={0}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field
                      id="beer-name"
                      label="Beer name"
                      defaultValue="Solstice Saison"
                    />
                    <Field
                      id="beer-style"
                      label="Style"
                      defaultValue="Farmhouse Ale"
                    />
                    <Field
                      id="beer-abv"
                      label="Target ABV"
                      defaultValue="6.2%"
                      mono
                    />
                  </div>
                </StepperContent>
                <StepperContent value={1}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field
                      id="batch-no"
                      label="Batch number"
                      defaultValue="BR-0921"
                      mono
                    />
                    <Field
                      id="batch-date"
                      label="Brew date"
                      defaultValue="Aug 24, 2026"
                    />
                    <Field
                      id="batch-volume"
                      label="Volume"
                      defaultValue="1,200 L"
                      mono
                    />
                  </div>
                </StepperContent>
                <StepperContent value={2}>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <Field
                      id="price-pint"
                      label="Pint"
                      defaultValue="$6.50"
                      mono
                    />
                    <Field
                      id="price-half"
                      label="Half-pour"
                      defaultValue="$4.00"
                      mono
                    />
                    <Field
                      id="price-flight"
                      label="Flight (4 × 5 oz)"
                      defaultValue="$14.00"
                      mono
                    />
                    <Field
                      id="price-growler"
                      label="Growler fill"
                      defaultValue="$18.00"
                      mono
                    />
                  </div>
                  <p className="font-code text-xs text-muted-foreground">
                    TARGET MARGIN 68% · MAIN BAR PRICE LIST
                  </p>
                </StepperContent>
                <StepperContent value={3}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="tap-handle"
                      label="Tap handle"
                      defaultValue="Tap 6 · Main bar"
                      mono
                    />
                    <Field
                      id="tap-line"
                      label="Line cleaned"
                      defaultValue="Aug 26, 2026"
                    />
                  </div>
                </StepperContent>
                <StepperNavigation
                  nextLabel="Next step"
                  finishLabel="Put on tap"
                  onFinish={() => setActiveStep(0)}
                />
              </Stepper>
            </CardContent>
          </Card>

          {/* Tap wall */}
          <Card className="gap-3 py-4">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-base">
                Tap wall — Main bar
              </CardTitle>
              <p className="font-code text-[11px] text-muted-foreground">
                LAST POUR 15:20 · KEG LEVELS LIVE
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5">
              {taps.map((tap) => (
                <div key={tap.name} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="min-w-0 truncate text-sm font-medium">
                      {tap.name}
                      <span className="ms-2 text-xs font-normal text-muted-foreground">
                        {tap.style}
                      </span>
                    </p>
                    <div className="flex shrink-0 items-baseline gap-3">
                      <span className="font-code text-xs text-muted-foreground tabular-nums">
                        {tap.abv}
                      </span>
                      <Badge
                        variant={tap.live ? "outline" : "secondary"}
                        className="font-code text-[10px]"
                      >
                        {tap.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={tap.level} className="h-1.5" />
                    <span className="w-9 shrink-0 text-end font-code text-[11px] text-muted-foreground tabular-nums">
                      {tap.level}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-between px-5">
              <p className="font-code text-[11px] text-muted-foreground">
                4 OF 8 TAPS POURING
              </p>
              <Button variant="outline" size="sm">
                Edit tap wall
              </Button>
            </CardFooter>
          </Card>
        </main>

        {/* Footer */}
        <footer className="flex h-10 flex-none items-center justify-between border-t px-6">
          <p className="font-code text-[11px] text-muted-foreground">
            Copper Kettle Brewing · Portland, OR
          </p>
          <p className="font-code text-[11px] text-muted-foreground">
            TAPROOM OS 2.8 · KIOSK MODE
          </p>
        </footer>
      </div>
    </EvalShell>
  )
}
