"use client"
// EVAL page — stepper p1 — scientific lab sample tracker — 1024x768 dark

import * as React from "react"
import { FlaskConicalIcon, TriangleAlertIcon } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Stepper,
  StepperContent,
  StepperNavigation,
} from "@/components/ui/stepper"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const queue = [
  { id: "HX-2417-0139", type: "Plasma", temp: "−80 °C", status: "STORED" },
  { id: "HX-2417-0140", type: "Whole blood", temp: "4 °C", status: "STORED" },
  { id: "HX-2417-0141", type: "Serum", temp: "−20 °C", status: "PENDING" },
  { id: "HX-2417-0142", type: "Buffy coat", temp: "−80 °C", status: "LABELING" },
]

const intakeStats = [
  { label: "Samples received", value: "128" },
  { label: "Labeled", value: "121" },
  { label: "Stored", value: "112" },
]

export default function Page() {
  const [activeStep, setActiveStep] = React.useState(1)

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FlaskConicalIcon className="size-4" />
            </span>
            <div>
              <p className="text-sm leading-tight font-semibold">
                Helix Diagnostics
              </p>
              <p className="font-code text-[11px] text-muted-foreground">
                LIMS · SAMPLE INTAKE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-code text-[11px]">
              BATCH BX-2417
            </Badge>
            <p className="font-code text-[11px] text-muted-foreground">
              T. ADEYEMI · LAB 2
            </p>
          </div>
        </header>

        {/* Main */}
        <main className="grid flex-1 grid-cols-[minmax(0,1fr)_304px] items-start gap-6 px-6 py-6">
          {/* Intake wizard */}
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="font-heading-3 text-lg">
                Sample intake — Batch BX-2417
              </CardTitle>
              <CardDescription>
                Register each vial, print its label, and assign cold storage
                before the chain-of-custody signature.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Stepper
                activeStep={activeStep}
                onStepChange={setActiveStep}
                label="Sample intake progress"
                steps={[
                  { label: "Register", description: "Donor details" },
                  { label: "Label", description: "Barcode + vial" },
                  { label: "Storage", description: "Freezer slot" },
                  { label: "Confirm", description: "Custody sign-off" },
                ]}
              >
                <StepperContent value={0}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="sample-subject"
                      label="Subject ID"
                      defaultValue="PT-04428"
                      mono
                    />
                    <Field
                      id="sample-type"
                      label="Sample type"
                      defaultValue="Whole blood (EDTA)"
                    />
                    <Field
                      id="sample-time"
                      label="Collection time"
                      defaultValue="09:36"
                      mono
                    />
                    <Field
                      id="sample-collector"
                      label="Collected by"
                      defaultValue="T. Adeyemi"
                    />
                  </div>
                </StepperContent>
                <StepperContent value={1}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="sample-barcode"
                      label="Barcode ID"
                      defaultValue="HX-2417-0142"
                      mono
                    />
                    <Field
                      id="sample-vial"
                      label="Vial type"
                      defaultValue="Cryovial 2 mL"
                    />
                    <Field
                      id="sample-volume"
                      label="Volume"
                      defaultValue="450 µL"
                      mono
                    />
                    <Field
                      id="sample-template"
                      label="Label template"
                      defaultValue="STDX-BARCODE v3"
                      mono
                    />
                  </div>
                  <p className="font-code text-xs text-muted-foreground">
                    PRINT TO ZD621 · LAB 2 BENCH
                  </p>
                </StepperContent>
                <StepperContent value={2}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="sample-freezer"
                      label="Freezer"
                      defaultValue="F2 · −80 °C"
                      mono
                    />
                    <Field
                      id="sample-rack"
                      label="Rack / position"
                      defaultValue="R-07 · B-12"
                      mono
                    />
                    <Field
                      id="sample-handler"
                      label="Storage handler"
                      defaultValue="M. Kovač"
                    />
                    <Field
                      id="sample-retention"
                      label="Retention"
                      defaultValue="5 years"
                    />
                  </div>
                </StepperContent>
                <StepperContent value={3}>
                  <div className="flex flex-col gap-1 rounded-lg border bg-card p-4">
                    <p className="text-sm font-medium">
                      Batch BX-2417 · 4 vials · custody transfer
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Signing closes intake for this batch, locks the storage
                      manifest, and notifies the biorepository team.
                    </p>
                    <p className="mt-1 font-code text-xs text-muted-foreground">
                      3 OF 4 SIGNATURES COLLECTED
                    </p>
                  </div>
                </StepperContent>
                <StepperNavigation
                  nextLabel="Next step"
                  finishLabel="Close batch"
                  onFinish={() => setActiveStep(0)}
                />
              </Stepper>
            </CardContent>
          </Card>

          {/* Intake side rail */}
          <aside className="flex flex-col gap-4">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Today at intake</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 px-5">
                {intakeStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="font-code text-sm tabular-nums">
                      {stat.value}
                    </p>
                  </div>
                ))}
                <p className="mt-1 font-code text-[11px] text-muted-foreground">
                  112 OF 128 STORED · 87%
                </p>
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Cold storage queue</CardTitle>
                <p className="font-code text-[11px] text-muted-foreground">
                  UPDATED 11:42
                </p>
              </CardHeader>
              <CardContent className="px-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8 text-xs">Sample</TableHead>
                      <TableHead className="h-8 text-xs">Temp</TableHead>
                      <TableHead className="h-8 text-xs text-end">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queue.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="py-2.5">
                          <p className="font-code text-xs">{row.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {row.type}
                          </p>
                        </TableCell>
                        <TableCell className="font-code text-xs text-muted-foreground">
                          {row.temp}
                        </TableCell>
                        <TableCell className="text-end">
                          <Badge
                            variant={row.status === "STORED" ? "outline" : "secondary"}
                            className="font-code text-[10px]"
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Alert variant="destructive">
              <TriangleAlertIcon />
              <AlertTitle>Freezer F2 temperature excursion</AlertTitle>
              <AlertDescription>
                F2 drifted to −61 °C for 18 minutes starting 02:14. 14 samples
                quarantined pending review.
              </AlertDescription>
            </Alert>
          </aside>
        </main>

        {/* Footer */}
        <footer className="flex h-10 flex-none items-center justify-between border-t px-6">
          <p className="font-code text-[11px] text-muted-foreground">
            Helix LIMS v4.2 · 21 CFR Part 11
          </p>
          <p className="font-code text-[11px] text-muted-foreground">
            SYNCED 11:42 · UTC−05:00
          </p>
        </footer>
      </div>
    </EvalShell>
  )
}
