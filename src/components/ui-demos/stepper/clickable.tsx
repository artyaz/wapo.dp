"use client"

import * as React from "react"

import { Stepper, StepperNavigation } from "@/components/ui/stepper"

const steps = [
  { label: "Received", description: "Order confirmed and paid" },
  { label: "Packed", description: "Items picked and boxed" },
  { label: "Shipped", description: "Handed to the carrier" },
  { label: "Delivered", description: "Signed for by the customer" },
]

/**
 * Clickable — with `clickable`, completed and current steps render as
 * keyboard-operable buttons so support agents can jump back through the
 * fulfillment trail. Upcoming steps stay disabled.
 */
export function StepperClickable() {
  const [activeStep, setActiveStep] = React.useState(2)

  return (
    <div className="flex w-full max-w-[640px] flex-col gap-6 py-4">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        clickable
        label="Fulfillment progress"
      >
        <StepperNavigation onFinish={() => setActiveStep(0)} />
      </Stepper>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Click a completed step to jump back — the order trail keeps its state,
        and upcoming steps cannot be skipped ahead to.
      </p>
    </div>
  )
}
