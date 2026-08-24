"use client";

/**
 * ReasoningLog — a vertical trace of reasoning beats: each Beat pairs a bold
 * job line with a quiet neutral thought beneath it, and an inflight beat
 * sweeps a monochrome shimmer across the job text while it runs.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface BeatProps extends React.HTMLAttributes<HTMLDivElement> {
  job?: React.ReactNode;
  thought?: React.ReactNode;
  inflight?: boolean;
  className?: string;
}

const Beat = React.forwardRef<HTMLDivElement, BeatProps>(function Beat(
  { job, thought, inflight = false, className, ...otherProps }: BeatProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/d20e8c3d flex flex-col items-start list-none",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {/* The shimmer-text keyframes lived in Subframe's runtime CSS; declared
          here (deduped + hoisted by React) so the inflight sweep keeps working.
          Same pattern as StatusBadge's pulse-dot. */}
      <style
        href="praxis-shimmer-text"
        precedence="medium"
      >{`@keyframes shimmer-text {
  0%, 100% { background-position: 200% 0; }
  50% { background-position: -200% 0; }
}`}</style>
      {job ? (
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[14px] font-[600] leading-[20px] text-default-font",
            {
              "text-transparent animate-[shimmer-text_2s_ease-in-out_infinite] bg-[length:200%_100%] bg-clip-text bg-gradient-to-r from-default-font via-neutral-400 to-default-font motion-reduce:animate-none motion-reduce:text-default-font motion-reduce:bg-none":
                inflight,
            }
          )}
        >
          {job}
        </span>
      ) : null}
      {thought ? (
        <span className="font-body text-[14px] font-[400] leading-[21px] text-neutral-500 mt-1">
          {thought}
        </span>
      ) : null}
    </div>
  );
});

export interface ReasoningLogRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showMoreLabel?: React.ReactNode;
  className?: string;
}

const ReasoningLogRoot = React.forwardRef<
  HTMLDivElement,
  ReasoningLogRootProps
>(function ReasoningLogRoot(
  { children, showMoreLabel, className, ...otherProps }: ReasoningLogRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex flex-col items-start",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? (
        <div className="flex w-full flex-col items-start gap-2.5 list-none m-0">
          {children}
        </div>
      ) : null}
      {showMoreLabel ? (
        <span className="text-caption font-caption text-neutral-500 underline mt-2.5 underline-offset-[3px] cursor-pointer">
          {showMoreLabel}
        </span>
      ) : null}
    </div>
  );
});

export const ReasoningLog = Object.assign(ReasoningLogRoot, {
  Beat,
});
