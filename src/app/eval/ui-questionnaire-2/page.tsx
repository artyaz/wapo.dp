"use client"
// EVAL page — questionnaire p2 — software bug tracker — 390x844 light (phone)
// Questionnaire front and center: structured bug intake for the checkout
// squad — area, frequency, impact (multi-select), environment freeform.
// Co-stars: Card, Badge, Button, Avatar, Alert, Separator, Kbd.

import { BugIcon, SearchIcon } from "lucide-react"

import * as React from "react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"
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
  { name: "area", required: true },
  { name: "frequency", required: true },
  { name: "impact", required: true },
  { name: "environment" },
] as const

const recentIssues = [
  {
    id: "CHK-1187",
    title: "3-D Secure loop on Safari 17",
    severity: "critical",
  },
  {
    id: "CHK-1183",
    title: "Tax total rounds down for EUR",
    severity: "high",
  },
  {
    id: "CHK-1179",
    title: "Gift note field loses focus on blur",
    severity: "low",
  },
] as const

function severityBadge(severity: string) {
  if (severity === "critical") return <Badge variant="destructive">Critical</Badge>
  if (severity === "high") return <Badge>High</Badge>
  return <Badge variant="outline">Low</Badge>
}

function Page() {
  const [item, setItem] = React.useState<string>(
    "frequency"
  )

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col gap-4 px-4 py-4">
        {/* App header */}
        <header className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border">
            <BugIcon className="size-4 text-foreground" />
          </span>
          <div className="flex flex-col">
            <span className="font-heading-3 text-heading-3 text-foreground">
              Cricket
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Checkout squad · sprint 41
            </span>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <Button variant="secondary" size="sm" aria-label="Search issues">
              <SearchIcon />
              Search
            </Button>
            <Avatar className="size-8">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Known-issue notice */}
        <Alert>
          <AlertTitle>Payment step is under active monitoring</AlertTitle>
          <AlertDescription>
            Two related tickets are open after the{" "}
            <span className="font-code">v4.12.0</span> release — your report is
            cross-linked automatically.
          </AlertDescription>
        </Alert>

        {/* Bug intake — the questionnaire */}
        <Card className="gap-4 py-5">
          <Questionnaire
            items={items}
            item={item}
            onItemChange={setItem}
            shortcuts="letters"
          >
            {/* Step 1 — answered before this view */}
            <QuestionnaireItem name="area" required>
              <QuestionnaireTitle>Where did the bug occur?</QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="cart">Cart page</QuestionnaireChoice>
                <QuestionnaireChoice value="payment" defaultChecked>
                  Payment step
                </QuestionnaireChoice>
                <QuestionnaireChoice value="confirmation">
                  Order confirmation
                </QuestionnaireChoice>
                <QuestionnaireChoice value="search">
                  Search results
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            {/* Step 2 — the active step */}
            <QuestionnaireItem name="frequency" required>
              <CardHeader className="gap-1.5 px-4">
                <QuestionnaireTitle className="font-heading-3">
                  How often does it happen?
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                  Pick the closest match — repro rate drives triage priority.
                </QuestionnaireDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                <QuestionnaireProgress />
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="always">
                    <span>Every time</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      5 of 5 attempts today
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="sometimes">
                    <span>Sometimes — about half the time</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Seems tied to saved cards
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="rarely">
                    <span>Rarely</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Twice in the last two weeks
                    </span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="once">
                    <span>Only once so far</span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Cannot reproduce yet
                    </span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </CardContent>
            </QuestionnaireItem>

            {/* Step 3 */}
            <QuestionnaireItem name="impact" required>
              <QuestionnaireTitle>What actually breaks?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Select everything you observed — multiple choices are welcome.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="error">
                  An error message is shown
                </QuestionnaireChoice>
                <QuestionnaireChoice value="wrong-total">
                  The order total is wrong
                </QuestionnaireChoice>
                <QuestionnaireChoice value="freeze">
                  The page freezes or reloads
                </QuestionnaireChoice>
                <QuestionnaireChoice value="visual">
                  Visual glitch only
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            {/* Step 4 */}
            <QuestionnaireItem name="environment">
              <QuestionnaireTitle>Which device and browser?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Optional — the console log is attached automatically.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireInput
                  placeholder="e.g. iPhone 13 · Safari 17.4 · guest checkout"
                  aria-label="Device and browser"
                />
              </QuestionnaireChoices>
            </QuestionnaireItem>

            <div className="flex flex-col gap-3 px-4 pb-1">
              {item !== "environment" ? (
                <p className="flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                  Press <Kbd>A</Kbd>–<Kbd>D</Kbd> to answer without leaving
                  the keyboard.
                </p>
              ) : null}
              <Separator />
              <QuestionnaireActions className="mobile:flex-row">
                <QuestionnairePrevious />
                <QuestionnaireSkip />
                {item === "environment" ? (
                  <QuestionnaireSubmit>File issue CHK-1191</QuestionnaireSubmit>
                ) : (
                  <QuestionnaireNext>Next</QuestionnaireNext>
                )}
              </QuestionnaireActions>
            </div>
          </Questionnaire>
        </Card>

        {/* Recent issues from this squad */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <p className="font-caption text-caption text-muted-foreground">
              Open in Checkout squad
            </p>
            <span className="font-code text-xs text-muted-foreground">
              3 of 27
            </span>
          </div>
          <div className="flex flex-col divide-y rounded-lg border bg-card">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center gap-3 px-3 py-2.5"
              >
                <span className="font-code text-xs text-muted-foreground">
                  {issue.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {issue.title}
                </span>
                {severityBadge(issue.severity)}
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Cricket — reports filed on this device stay queued offline
          </span>
          <span className="font-code text-xs text-muted-foreground">
            sync 14:08
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
