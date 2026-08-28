"use client"
// EVAL page — checkbox p2 — hospital appointment booking — 1024x768 light
// Checkbox front and center: consent form (required + aria-invalid),
// reminder opt-ins, availability windows, and a "bring to your visit"
// packing checklist. Co-stars: Card, Badge, Button, Avatar, Progress,
// Separator.

import { CalendarCheck, Phone } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const reminders = [
  { id: "rem-sms", label: "SMS to +1 (415) 555-0176", checked: true },
  { id: "rem-email", label: "Email to m.torres@fastmail.com", checked: true },
  { id: "rem-call", label: "Voice call the day before", checked: false },
]

const windows = [
  { id: "win-early", label: "Early morning", time: "07:30–09:30", checked: true },
  { id: "win-mid", label: "Midday", time: "11:00–13:30", checked: true },
  { id: "win-late", label: "Late afternoon", time: "15:00–17:00", checked: false },
]

const bringItems = [
  { id: "bring-id", label: "Photo ID", checked: true },
  { id: "bring-ins", label: "Insurance card", checked: true },
  { id: "bring-ref", label: "Referral letter from Dr. Whitfield", checked: true },
  { id: "bring-med", label: "Current medication list", checked: false },
]

function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col gap-4 px-6 py-4">
        {/* Hospital header */}
        <header className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border">
              <CalendarCheck className="size-4 text-foreground" />
            </span>
            <div>
              <p className="font-heading-3 text-title leading-tight text-foreground">
                St. Aurelia Medical Center
              </p>
              <p className="font-caption text-caption text-muted-foreground">
                Patient portal · Cardiology
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden items-center gap-1.5 font-code text-xs text-muted-foreground sm:flex">
              <Phone className="size-3.5" />
              (415) 555-0138
            </span>
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="outline" size="sm">
              Sign in
            </Button>
          </div>
        </header>

        {/* Step header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-caption text-caption text-muted-foreground">
              Booking · step 3 of 4
            </p>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Consents &amp; preferences
            </h1>
          </div>
          <div className="flex w-52 items-center gap-3 pb-1">
            <Progress value={75} aria-label="Booking progress" />
            <span className="font-code text-xs text-foreground">75%</span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_300px] items-start gap-4">
          {/* Main column */}
          <div className="flex flex-col gap-4">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Consent to care</CardTitle>
                <CardDescription>
                  Reviewed by the cardiology care team before your visit
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox id="consent-treatment" aria-invalid />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      I consent to evaluation and treatment by the cardiology
                      care team
                    </span>
                    <span className="mt-0.5 block font-caption text-caption text-destructive">
                      Required before we can confirm your visit
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox id="consent-share" defaultChecked />
                  <span className="flex-1 text-sm leading-snug text-foreground">
                    Share visit notes with my primary care doctor — Alana
                    Whitfield, MD · Sutter Health
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox id="consent-financial" defaultChecked />
                  <span className="flex-1 text-sm leading-snug text-foreground">
                    I&apos;ve read the financial policy, including the $25
                    no-show fee
                  </span>
                </label>
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">
                  Reminders &amp; availability
                </CardTitle>
                <CardDescription>
                  New-patient visits run 45 minutes. Pick every window you can
                  attend — earlier openings are offered by text.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                {reminders.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      id={item.id}
                      defaultChecked={item.checked}
                      aria-label={item.label}
                    />
                    <span className="text-sm text-foreground">
                      {item.label}
                    </span>
                  </label>
                ))}
                <Separator className="my-1" />
                <div className="grid grid-cols-3 gap-3">
                  {windows.map((win) => (
                    <label
                      key={win.id}
                      className="flex cursor-pointer flex-col gap-2 rounded-lg border p-3"
                    >
                      <Checkbox
                        id={win.id}
                        defaultChecked={win.checked}
                        aria-label={`${win.label} appointments, ${win.time}`}
                      />
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {win.label}
                        </span>
                        <span className="mt-0.5 block font-code text-xs text-muted-foreground">
                          {win.time}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                <label className="flex cursor-pointer items-center gap-3">
                  <Checkbox id="waitlist" defaultChecked />
                  <span className="text-sm text-foreground">
                    Add me to the waitlist for earlier cancellations
                  </span>
                </label>
              </CardContent>
              <CardFooter className="justify-end gap-2 px-5">
                <Button variant="outline" size="sm">
                  Back
                </Button>
                <Button size="sm">Review booking</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardDescription>Your appointment</CardDescription>
                <CardTitle className="flex items-center gap-3 text-sm">
                  <Avatar size="lg">
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <span>
                    <span className="block">Elena Márquez, MD</span>
                    <span className="mt-0.5 block font-caption text-caption font-normal text-muted-foreground">
                      Cardiology · English, Spanish
                    </span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-5">
                <Badge variant="outline" className="w-fit">
                  In network · Aetna PPO
                </Badge>
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Visit type</dt>
                    <dd className="text-right font-medium text-foreground">
                      New patient consultation
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="font-code text-xs text-foreground">45 min</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">When</dt>
                    <dd className="font-code text-xs text-foreground">
                      Thu, Jun 12 · 09:15
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Where</dt>
                    <dd className="text-right text-foreground">
                      Cambridge Campus · Suite 4C
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Estimate</dt>
                    <dd className="font-code text-xs text-foreground">
                      $180 before insurance
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Bring to your visit</CardTitle>
                <CardDescription>
                  Check items as you pack them
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                {bringItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      id={item.id}
                      defaultChecked={item.checked}
                      aria-label={item.label}
                    />
                    <span className="flex-1 text-sm text-foreground">
                      {item.label}
                    </span>
                  </label>
                ))}
              </CardContent>
              <CardFooter className="px-5">
                <span className="font-caption text-caption text-muted-foreground">
                  3 of 4 packed
                </span>
              </CardFooter>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            St. Aurelia Medical Center · 2200 Cambridge St · Your data is
            covered by HIPAA
          </span>
          <span className="font-code text-xs text-muted-foreground">
            appt #A-4471
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
