"use client"

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
import { Card } from "@/components/ui/card"

/**
 * Alternating — items flip around a center spine (parity from position).
 * Flat rounded-lg content cards, hairline connectors, no shadows.
 */
export function TimelineAlternating() {
  return (
    <Timeline side="alternating" aria-label="Lumen Analytics — milestones">
      <TimelineItem state="complete">
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <Card className="gap-1 px-3.5 py-3">
            <TimelineHeader title="Founded" timestamp="2018" />
            <TimelineDescription className="text-xs">
              Two founders, one garage desk and a spreadsheet addiction.
            </TimelineDescription>
          </Card>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="complete">
        <TimelineMarker>
          <TimelineSeparator />
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <Card className="gap-1 px-3.5 py-3">
            <TimelineHeader title="First 100 customers" timestamp="2019" />
            <TimelineDescription className="text-xs">
              $19/mo plans sold from a single Hacker News post.
            </TimelineDescription>
          </Card>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="complete">
        <TimelineMarker>
          <TimelineSeparator />
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <Card className="gap-1 px-3.5 py-3">
            <TimelineHeader title="Series A" timestamp="2021" />
            <TimelineDescription className="text-xs">
              $8M led by Foundry Park to build the real-time engine.
            </TimelineDescription>
          </Card>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="complete">
        <TimelineMarker>
          <TimelineSeparator />
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <Card className="gap-1 px-3.5 py-3">
            <TimelineHeader title="1M dashboards" timestamp="2024" />
            <TimelineDescription className="text-xs">
              Rendered in 190 countries · median load 240 ms.
            </TimelineDescription>
          </Card>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="current">
        <TimelineMarker>
          <TimelineSeparator />
          <TimelineDot />
        </TimelineMarker>
        <TimelineContent>
          <Card className="gap-1 px-3.5 py-3">
            <TimelineHeader title="Today" timestamp="2026" />
            <TimelineDescription className="text-xs">
              42 people, still strictly monochrome about charts.
            </TimelineDescription>
          </Card>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
