"use client"

// EVAL page — timeline p1 — insurance claims portal — 390x844 dark (phone)

import {
  ChevronLeftIcon,
  ClockIcon,
  ImagePlusIcon,
  MessageSquareIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
} from "@/components/ui/timeline"

const figures = [
  { label: "Estimate", value: "$8,420" },
  { label: "Deductible", value: "$1,000" },
  { label: "Est. payout", value: "$7,420" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-5 px-4 pb-6 pt-4">
        {/* App bar */}
        <header className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Back to claims">
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="font-code text-sm leading-none text-foreground">
              CLM-84102
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Homeowners · Policy HO-4471-2
            </p>
          </div>
          <Badge variant="secondary">In review</Badge>
        </header>

        {/* Claim summary */}
        <Card className="gap-4 py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-sm">Hail damage — roof</CardTitle>
            <CardDescription className="text-xs">
              Filed Aug 14, 2026 · 214 Alder St, Boulder, CO
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2 px-4">
            {figures.map((figure) => (
              <div
                key={figure.label}
                className="flex flex-col gap-1 rounded-lg border bg-muted/40 px-2.5 py-2"
              >
                <span className="text-[11px] text-muted-foreground">
                  {figure.label}
                </span>
                <span className="font-code text-sm tabular-nums text-foreground">
                  {figure.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Alert>
          <ClockIcon />
          <AlertTitle>Review typically takes 5–7 business days</AlertTitle>
          <AlertDescription>
            Your adjuster may schedule a roof inspection before the coverage
            decision.
          </AlertDescription>
        </Alert>

        {/* Adjuster */}
        <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
          <Avatar>
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              Dana Whitfield
            </p>
            <p className="text-xs text-muted-foreground">
              Senior adjuster · replies in ~4h
            </p>
          </div>
          <Button variant="outline" size="xs">
            <MessageSquareIcon />
            Message
          </Button>
        </div>

        {/* Claim progress */}
        <section aria-labelledby="claim-progress" className="flex flex-col gap-3">
          <h2
            id="claim-progress"
            className="font-heading-3 text-heading-3 text-foreground"
          >
            Claim progress
          </h2>
          <Timeline aria-label="Claim status history">
            <TimelineItem state="complete">
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader
                  title="Claim filed"
                  timestamp="Aug 14 · 09:41"
                />
                <TimelineDescription>
                  Submitted online with 14 photos and the roofer&rsquo;s
                  estimate.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem state="complete">
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader
                  title="Documents verified"
                  timestamp="Aug 15 · 11:08"
                />
                <TimelineDescription>
                  Photos, invoice and policy declaration matched.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem state="current">
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader title="Under review" timestamp="Aug 18 · now" />
                <TimelineDescription>
                  Dana is assessing coverage — a roof inspection may be
                  scheduled this week.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader
                  title="Coverage decision"
                  timestamp="est. Aug 25"
                />
                <TimelineDescription>
                  Pending — written decision sent by email and mail.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineMarker>
                <TimelineDot />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader
                  title="Payment issued"
                  timestamp="est. +3 days"
                />
                <TimelineDescription>
                  Pending — direct deposit ending 4417.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </section>

        {/* Bottom actions */}
        <footer className="mt-auto">
          <Separator className="mb-4" />
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1">
              <MessageSquareIcon />
              Message adjuster
            </Button>
            <Button className="flex-1">
              <ImagePlusIcon />
              Upload photos
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
