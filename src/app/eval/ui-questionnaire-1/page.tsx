"use client"
// EVAL page — questionnaire p1 — pet adoption center — 430x932 dark (phone)
// Questionnaire front and center: adoption application for a specific dog,
// multi-step intake with progress, single + multiple selection, shortcuts.
// Co-stars: Card, Badge, Button, Avatar, Alert, Separator, Progress.

import { DogIcon, PawPrint, ShieldCheck } from "lucide-react"

import * as React from "react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  { name: "home", required: true },
  { name: "experience", required: true },
  { name: "household", required: true },
  { name: "schedule", required: true },
  { name: "notes" },
] as const

const checklist = [
  { label: "Home type", state: "done" },
  { label: "Dog experience", state: "done" },
  { label: "Household", state: "current" },
  { label: "Daily schedule", state: "todo" },
  { label: "Anything else", state: "todo" },
] as const

function Page() {
  const [item, setItem] = React.useState<string>(
    "household"
  )

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col gap-4 px-4 py-4">
        {/* App header */}
        <header className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border">
            <PawPrint className="size-4 text-foreground" />
          </span>
          <div className="flex flex-col">
            <span className="font-heading-3 text-heading-3 text-foreground">
              Harbor Paws
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Adoption center · Portland, OR
            </span>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <Badge variant="outline" className="font-code font-normal">
              App #4821
            </Badge>
            <Avatar className="size-8">
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page title */}
        <div>
          <h1 className="font-heading-2 text-heading-2 text-foreground">
            Adoption application
          </h1>
          <p className="mt-1 font-caption text-caption text-muted-foreground">
            Five questions · takes about 4 minutes · saved as draft
          </p>
        </div>

        {/* Pet spotlight */}
        <Card className="gap-3 py-4">
          <CardHeader className="flex-row items-center gap-3 px-4">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-muted"
            >
              <DogIcon className="size-6 text-muted-foreground" />
            </span>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-sm">Meet Pepper</CardTitle>
              <CardDescription>
                Australian cattle dog mix · 2 yrs · 18 kg · kennel 12
              </CardDescription>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <Badge variant="secondary">Vaccinated</Badge>
                <Badge variant="secondary">Spayed</Badge>
                <Badge variant="secondary">Good with kids</Badge>
              </div>
            </div>
            <CardAction className="self-start">
              <span className="font-code text-xs text-muted-foreground">
                41 days
              </span>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 px-4">
            <div className="flex items-center justify-between">
              <span className="font-caption text-caption text-muted-foreground">
                Application completeness
              </span>
              <span className="font-code text-xs text-foreground">60%</span>
            </div>
            <Progress value={60} aria-label="Application completeness" />
          </CardContent>
        </Card>

        {/* Adoption application — the questionnaire */}
        <Card className="gap-4 py-5">
          <Questionnaire
            items={items}
            item={item}
            onItemChange={setItem}
            shortcuts="numbers"
          >
            {/* Step 1 — answered before this view */}
            <QuestionnaireItem name="home" required>
              <QuestionnaireTitle>
                Which best describes your home?
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="apartment" defaultChecked>
                  Apartment, third floor
                </QuestionnaireChoice>
                <QuestionnaireChoice value="townhouse">
                  Townhouse with a small patio
                </QuestionnaireChoice>
                <QuestionnaireChoice value="house-fenced">
                  House with a fenced yard
                </QuestionnaireChoice>
                <QuestionnaireChoice value="house-open">
                  House with an unfenced yard
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            {/* Step 2 — answered before this view */}
            <QuestionnaireItem name="experience" required>
              <QuestionnaireTitle>
                Have you owned a dog before?
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="current" defaultChecked>
                  Yes — we have a dog now
                </QuestionnaireChoice>
                <QuestionnaireChoice value="past">
                  Yes, in the past
                </QuestionnaireChoice>
                <QuestionnaireChoice value="first">
                  No, Pepper would be our first
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            {/* Step 3 — the active step */}
            <QuestionnaireItem name="household" required multiple>
              <CardHeader className="gap-1.5 px-4">
                <QuestionnaireTitle className="font-heading-3">
                  Who shares your home?
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                  Select everyone who lives with you. Pepper is herdy — young
                  children are assessed separately.
                </QuestionnaireDescription>
                <CardAction>
                  <QuestionnaireProgress />
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="partner">
                    <span>Partner</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Home weekdays from 18:00
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="kids-u10">
                    <span>Children under 10</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Requires a supervised intro visit
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="kids-10" defaultChecked>
                    <span>Children 10 and older</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      One, age 12
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="other-dog" defaultChecked>
                    <span>Another dog</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Mika — 6 yr labrador, spayed
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="cats">
                    <span>Cats</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Pepper has not been cat-tested
                    </span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </CardContent>
            </QuestionnaireItem>

            {/* Step 4 */}
            <QuestionnaireItem name="schedule" required>
              <QuestionnaireTitle>
                How long is Pepper alone on a typical workday?
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="under-4">
                  Under 4 hours
                </QuestionnaireChoice>
                <QuestionnaireChoice value="4-6">4–6 hours</QuestionnaireChoice>
                <QuestionnaireChoice value="6-8">6–8 hours</QuestionnaireChoice>
                <QuestionnaireChoice value="over-8">
                  More than 8 hours
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            {/* Step 5 */}
            <QuestionnaireItem name="notes">
              <QuestionnaireTitle>
                Anything else we should know?
              </QuestionnaireTitle>
              <QuestionnaireDescription>
                Garden, allergies, fence height, work-from-home days — anything
                that helps the match.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireInput
                  placeholder="e.g. WFH Tuesdays and Thursdays, 6 ft cedar fence…"
                  aria-label="Additional notes for the shelter"
                />
              </QuestionnaireChoices>
            </QuestionnaireItem>

            <div className="flex flex-col gap-3 px-4 pb-1">
              <Separator />
              <QuestionnaireActions className="mobile:flex-row">
                <QuestionnairePrevious />
                <QuestionnaireSkip />
                {item === "notes" ? (
                  <QuestionnaireSubmit>Submit application</QuestionnaireSubmit>
                ) : (
                  <QuestionnaireNext>Next</QuestionnaireNext>
                )}
              </QuestionnaireActions>
            </div>
          </Questionnaire>
        </Card>

        {/* Shelter note */}
        <Alert>
          <ShieldCheck />
          <AlertTitle>A counselor reviews every application</AlertTitle>
          <AlertDescription>
            Replies within 2 business days. Kennel 12 hold expires{" "}
            <span className="font-code">Nov 21</span> — answers are saved as a
            draft on this device.
          </AlertDescription>
        </Alert>

        {/* Checklist */}
        <div className="flex flex-col gap-2.5">
          <p className="font-caption text-caption text-muted-foreground">
            Application checklist
          </p>
          <div className="flex flex-col gap-1.5">
            {checklist.map((entry) => (
              <div
                key={entry.label}
                className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2"
              >
                <span className="text-sm text-foreground">{entry.label}</span>
                {entry.state === "done" ? (
                  <Badge variant="secondary">Answered</Badge>
                ) : entry.state === "current" ? (
                  <Badge>Current step</Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Harbor Paws — applications stay on file for 90 days
          </span>
          <Button variant="ghost" size="sm">
            Save draft
          </Button>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
