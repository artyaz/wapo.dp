"use client"

import { Stepper } from "@/components/ui/stepper"

/**
 * Basic — declarative `steps` array, horizontal track, second step active.
 * Completed steps fill with a check, the current step is outlined with a
 * primary ring, upcoming steps stay muted.
 */
export function StepperBasic() {
  return (
    <div className="flex w-full max-w-[640px] flex-col py-4">
      <Stepper
        activeStep={1}
        steps={[
          { label: "Account", description: "Email and password" },
          { label: "Workspace", description: "Team name and URL" },
          { label: "Invite", description: "Add collaborators" },
          { label: "Review", description: "Confirm and create" },
        ]}
      />
    </div>
  )
}
