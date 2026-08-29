"use client"

import * as React from "react"

import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperSeparator,
} from "@/components/ui/stepper"

/**
 * Vertical — compound API (items + separators authored by hand) with inline
 * step content nested under each item. The active step's panel is revealed in
 * the label column; inactive panels stay mounted but hidden.
 */
export function StepperVertical() {
  const [activeStep, setActiveStep] = React.useState(1)

  return (
    <div className="flex w-full max-w-[640px] flex-col py-4">
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
        onStepChange={setActiveStep}
        label="Publication progress"
      >
        <StepperItem index={0} label="Draft" description="Copy locked in the editor">
          <StepperContent value={0}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              “Field Notes: The Return of the Night Market” — 1,840 words,
              12 sources, 6 of 6 fact-check queries resolved.
            </p>
          </StepperContent>
        </StepperItem>
        <StepperSeparator />
        <StepperItem index={1} label="Review" description="Editor sign-off pending">
          <StepperContent value={1}>
            <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
              <p className="text-sm font-medium">Editor notes</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tighten the lede and confirm the vendor list with fact-check
                before this moves to scheduling.
              </p>
              <p className="mt-1 font-code text-xs text-muted-foreground">
                R. Okafor · 09:24
              </p>
            </div>
          </StepperContent>
        </StepperItem>
        <StepperSeparator />
        <StepperItem
          index={2}
          label="Scheduled"
          description="Publishes Thursday 07:00 ET"
        />
        <StepperSeparator />
        <StepperItem index={3} label="Published" description="Live on the site" />
      </Stepper>
    </div>
  )
}
