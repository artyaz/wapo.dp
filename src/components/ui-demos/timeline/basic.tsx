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

/**
 * Basic — left-marker activity feed. States are left at their muted default
 * except the live item, which is flagged `current` (and receives
 * `aria-current="step"`).
 */
export function TimelineBasic() {
  return (
    <Timeline aria-label="Recent project activity">
      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader
            title="Merge request merged"
            timestamp="09:12"
          />
          <TimelineDescription>
            Priya N. merged #482 — fix date-picker focus trap into main.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Review comment added" timestamp="10:47" />
          <TimelineDescription>
            Deniz K. left 2 notes on “Auth flow review” — token refresh edge
            case.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Deployment succeeded" timestamp="14:02" />
          <TimelineDescription>
            praxis-web v2.4.0 live on production · 38s build · 0 regressions.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="current">
        <TimelineMarker>
          <TimelineDot />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Release notes in progress" timestamp="now" />
          <TimelineDescription>
            Sofia Álvarez is editing the v2.5 changelog draft.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
