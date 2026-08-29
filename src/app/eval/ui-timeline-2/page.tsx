"use client"

// EVAL page — timeline p2 — plant care reminder app — 430x932 light (phone)

import {
  CameraIcon,
  DropletsIcon,
  LeafIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
  TimelineTimestamp,
  TimelineTitle,
} from "@/components/ui/timeline"

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col gap-5 px-4 pb-6 pt-5">
        {/* Header */}
        <header className="flex items-end justify-between gap-3">
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Good morning, Maya
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Tuesday, August 18 · 3 plants in your care
            </p>
          </div>
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>FL</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </header>

        {/* Plant hero */}
        <Card className="gap-4 py-4">
          <CardHeader className="px-4">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback className="[&_svg]:size-4">
                  <LeafIcon aria-hidden="true" />
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-sm">
                  Monstera deliciosa
                </CardTitle>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Living room · south window, sheer curtain
                </p>
              </div>
              <Badge variant="outline">2 yrs old</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">
                Soil moisture
              </span>
              <span className="font-code text-sm tabular-nums text-foreground">
                22%
              </span>
            </div>
            <Progress value={22} aria-label="Soil moisture 22 percent" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                Last watered Aug 16 · 400 ml
              </span>
              <Badge className="border-warning-300 bg-warning-50 text-warning-700">
                Watering due today
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Care history */}
        <section aria-labelledby="care-history" className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h2
              id="care-history"
              className="font-heading-3 text-heading-3 text-foreground"
            >
              Care history
            </h2>
            <span className="font-code text-xs text-muted-foreground">
              5 events
            </span>
          </div>
          <Timeline aria-label="Care history for Monstera deliciosa">
            <TimelineItem state="complete">
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader title="Repotted" timestamp="Jun 14" />
                <TimelineDescription>
                  24 cm terracotta pot · fresh chunky bark mix.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem state="complete">
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader title="Fertilized" timestamp="Aug 02" />
                <TimelineDescription>
                  20-20-20 at half strength, 250 ml.
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
                  title="Watered"
                  timestamp="Aug 16 · 08:20"
                />
                <TimelineDescription>
                  400 ml filtered · moisture back to 64%.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem state="current">
              <TimelineMarker>
                <TimelineDot />
                <TimelineSeparator />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>Watering due</TimelineTitle>
                  <span className="flex items-center gap-2">
                    <Badge className="border-warning-300 bg-warning-50 text-warning-700">
                      Due today
                    </Badge>
                    <TimelineTimestamp>Today</TimelineTimestamp>
                  </span>
                </TimelineHeader>
                <TimelineDescription>
                  Soil at 22% — the two lowest leaves are starting to droop.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineMarker>
                <TimelineDot />
              </TimelineMarker>
              <TimelineContent>
                <TimelineHeader title="Fertilize" timestamp="est. Sep 01" />
                <TimelineDescription>
                  Scheduled — next feeding four weeks after the last.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </section>

        {/* Bottom actions */}
        <footer className="mt-auto">
          <Separator className="mb-4" />
          <div className="flex items-center gap-3">
            <Button className="flex-1">
              <DropletsIcon />
              Log watering
            </Button>
            <Button variant="outline" size="icon" aria-label="Add a photo">
              <CameraIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Care schedule settings"
            >
              <SlidersHorizontalIcon />
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
