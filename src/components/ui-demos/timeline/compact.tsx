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
 * Compact — dense version-history / audit log: tighter rhythm, smaller dots,
 * caption-size text, timestamps and build numbers in the mono data font.
 */
export function TimelineCompact() {
  return (
    <Timeline density="compact" aria-label="Version history">
      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="v2.7.0 — hotfix" timestamp="Aug 27 · 14:32" />
          <TimelineDescription>
            Session expiry loop on Safari · deploy #2841 by j.moreau
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="v2.7.0-rc2" timestamp="Aug 26 · 18:05" />
          <TimelineDescription>
            Release candidate cut from main @ 9c41f0a
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="v2.6.2" timestamp="Aug 19 · 09:12" />
          <TimelineDescription>
            Pricing page hydration fix @ 4d8e117
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="v2.6.1" timestamp="Aug 11 · 16:40" />
          <TimelineDescription>
            Dependency bumps — 16 packages @ f10c9b3
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineDot />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="v2.6.0" timestamp="Aug 02 · 11:20" />
          <TimelineDescription>
            Filter bar + saved views API @ c72aa8e
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
