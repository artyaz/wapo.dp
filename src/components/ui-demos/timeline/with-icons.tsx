"use client"

import {
  ActivityIcon,
  AlertTriangleIcon,
  FlaskConicalIcon,
  PackageIcon,
  RefreshCwIcon,
  RocketIcon,
} from "lucide-react"

import {
  Timeline,
  TimelineBadge,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
} from "@/components/ui/timeline"

/**
 * With icons — icons sit in the marker rail (TimelineBadge) and inherit the
 * item state: primary fill for complete, primary ring for current,
 * destructive tint for error, muted for pending.
 */
export function TimelineWithIcons() {
  return (
    <Timeline aria-label="Release pipeline — Orbit CMS v3.2">
      <TimelineItem state="complete">
        <TimelineMarker>
          <TimelineBadge>
            <PackageIcon />
          </TimelineBadge>
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Build compiled" timestamp="16:04" />
          <TimelineDescription>
            1,284 modules bundled in 41s · artifact 4.2 MB.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="complete">
        <TimelineMarker>
          <TimelineBadge>
            <FlaskConicalIcon />
          </TimelineBadge>
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Unit tests passed" timestamp="16:06" />
          <TimelineDescription>
            2,914 tests · 0 failures · coverage 87.3%.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="error">
        <TimelineMarker>
          <TimelineBadge>
            <AlertTriangleIcon />
          </TimelineBadge>
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="E2E smoke test failed" timestamp="16:09" />
          <TimelineDescription>
            Checkout spec timed out on Safari 17 · attempt 2 of 3.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem state="current">
        <TimelineMarker>
          <TimelineBadge>
            <RefreshCwIcon />
          </TimelineBadge>
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Retry queued" timestamp="now" />
          <TimelineDescription>
            Fresh runner spins up in ~90s on the ci-2 pool.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineBadge>
            <RocketIcon />
          </TimelineBadge>
          <TimelineSeparator />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Deploy to production" timestamp="waiting" />
          <TimelineDescription>
            Blocked until all checks pass.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineMarker>
          <TimelineBadge>
            <ActivityIcon />
          </TimelineBadge>
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader title="Health check" timestamp="—" />
          <TimelineDescription>
            10 minutes of synthetic traffic against the new release.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
