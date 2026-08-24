"use client";

/**
 * SlaTimer — a compact timecode chip for SLA countdowns and response clocks.
 * Tone drives the status dot and text color; tabular numerals keep the
 * digits stable as the clock ticks.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface SlaTimerRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "warning" | "breach";
  timecode?: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

const SlaTimerRoot = React.forwardRef<HTMLDivElement, SlaTimerRootProps>(
  function SlaTimerRoot(
    {
      tone = "neutral",
      timecode,
      showDot = false,
      className,
      ...otherProps
    }: SlaTimerRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/7b8b064a h-[26px] items-center gap-1.5 rounded-sm border border-solid border-default-border bg-panel px-2 group/slatimer inline-flex",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "hidden h-[7px] w-[7px] flex-none items-start rounded-[9999px] bg-neutral-400",
            {
              flex: showDot,
              "bg-destructive-500": tone === "breach",
              "bg-warning-500": tone === "warning",
            }
          )}
        />
        {timecode ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-code font-code text-neutral-500 tabular-nums",
              {
                "text-destructive-600": tone === "breach",
                "text-warning-600": tone === "warning",
              }
            )}
          >
            {timecode}
          </span>
        ) : null}
      </div>
    );
  }
);

export const SlaTimer = SlaTimerRoot;
