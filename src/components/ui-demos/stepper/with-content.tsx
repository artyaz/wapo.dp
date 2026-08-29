"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Stepper,
  StepperContent,
  StepperNavigation,
} from "@/components/ui/stepper"

const steps = [
  { label: "Event details", description: "Name, date, and venue" },
  { label: "Tickets", description: "Tiers and pricing" },
  { label: "Review", description: "Final checks" },
]

function Field({
  id,
  label,
  defaultValue,
  hint,
}: {
  id: string
  label: string
  defaultValue: string
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} defaultValue={defaultValue} aria-describedby={hint ? `${id}-hint` : undefined} />
      {hint ? (
        <p id={`${id}-hint`} className="font-code text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/**
 * With content — the full wizard shape: declarative steps, one content panel
 * per step (kept mounted while hidden), and the built-in back / next row.
 */
export function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState(0)

  return (
    <div className="flex w-full max-w-[640px] flex-col py-4">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        label="Event setup"
      >
        <StepperContent value={0}>
          <div className="flex flex-col gap-4">
            <Field
              id="event-name"
              label="Event name"
              defaultValue="Riverside Jazz Night"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="event-date"
                label="Date"
                defaultValue="June 14, 2026"
              />
              <Field
                id="event-venue"
                label="Venue"
                defaultValue="Riverside Amphitheater"
              />
            </div>
          </div>
        </StepperContent>
        <StepperContent value={1}>
          <div className="flex flex-col gap-4">
            <Field
              id="tier-general"
              label="General admission"
              defaultValue="$38.00"
              hint="CAP 1,200"
            />
            <Field
              id="tier-reserved"
              label="Reserved seating"
              defaultValue="$64.00"
              hint="CAP 480"
            />
            <Field
              id="tier-vip"
              label="VIP deck"
              defaultValue="$120.00"
              hint="CAP 96"
            />
          </div>
        </StepperContent>
        <StepperContent value={2}>
          <div className="flex flex-col gap-2 rounded-lg border bg-card p-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium">Riverside Jazz Night</p>
              <p className="font-code text-xs text-muted-foreground">
                JUN 14 2026
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Riverside Amphitheater · 3 ticket tiers · doors 18:00
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Publishing sends the listing to the public calendar and opens
              sales at 10:00 tomorrow morning.
            </p>
          </div>
        </StepperContent>
        <StepperNavigation onFinish={() => setActiveStep(0)} />
      </Stepper>
    </div>
  )
}
