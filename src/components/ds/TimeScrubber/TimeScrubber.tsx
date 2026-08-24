"use client";
/**
 * TimeScrubber — a time-range scrubber: a fixed bar backdrop (activity
 * histogram), selected-range shade with hairline handles at 55%/85%, mono
 * range tags pinned to the handles, and a 1H/1D/1W/1M range selector row.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface TimeScrubberRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activeRange?: "1-h" | "1-d" | "1-w" | "1-m";
  rangeStart?: React.ReactNode;
  rangeEnd?: React.ReactNode;
  className?: string;
}

const TimeScrubberRoot = React.forwardRef<
  HTMLDivElement,
  TimeScrubberRootProps
>(function TimeScrubberRoot(
  {
    activeRange = "1-d",
    rangeStart,
    rangeEnd,
    className,
    ...otherProps
  }: TimeScrubberRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/dc7534c2 flex w-full flex-col items-start gap-2 bg-panel px-3 py-2 group/timescrubber",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-12 w-full flex-none items-start relative">
        <div className="flex grow shrink-0 basis-0 items-end justify-between self-stretch gap-[2px]">
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-5 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-8 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-10 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-12 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-8 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-6 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-4 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-4 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-6 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-10 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-12 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-10 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-8 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-5 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-5 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-8 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-10 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-12 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-10 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-6 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-4 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-2 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-4 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-6 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-5 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-1 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
        </div>
        <div className="flex items-start self-stretch bg-brand-50 absolute left-0 top-0 w-[55%]" />
        <div className="flex items-start self-stretch bg-brand-50 absolute right-0 top-0 w-[15%]" />
        <div className="flex w-0.5 flex-none items-start self-stretch bg-brand-primary absolute top-0 left-[55%]" />
        <div className="flex w-0.5 flex-none items-start self-stretch bg-brand-primary absolute top-0 left-[85%]" />
        <div className="flex items-start absolute top-0.5 left-[55%] ml-1">
          {rangeStart ? (
            <span className="self-stretch whitespace-nowrap font-code text-[10px] font-[400] leading-[10px] text-brand-primary-foreground rounded-[3px] bg-brand-primary px-1 py-[1px] tabular-nums">
              {rangeStart}
            </span>
          ) : null}
        </div>
        <div className="flex items-start absolute top-0.5 left-[85%] -translate-x-full -ml-1">
          {rangeEnd ? (
            <span className="self-stretch whitespace-nowrap font-code text-[10px] font-[400] leading-[10px] text-brand-primary-foreground rounded-[3px] bg-brand-primary px-1 py-[1px] tabular-nums">
              {rangeEnd}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-1">
        <div className="flex items-center rounded-[3px] border border-solid border-brand-primary bg-brand-primary px-2 py-1 cursor-pointer transition-colors text-brand-primary-foreground hover:bg-brand-primary hover:text-brand-primary-foreground">
          <span className="font-code text-[13px] font-[400] leading-[19px] text-brand-primary-foreground tabular-nums">
            1D
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex items-center rounded-[3px] border border-solid border-transparent px-2 py-1 cursor-pointer transition-colors hover:bg-brand-50 hover:text-default-font",
            {
              "border border-solid border-brand-primary bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary hover:text-brand-primary-foreground":
                activeRange === "1-h",
            }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "font-code text-[13px] font-[400] leading-[19px] text-neutral-500 tabular-nums",
              { "text-brand-primary-foreground": activeRange === "1-h" }
            )}
          >
            1H
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex items-center rounded-[3px] border border-solid border-transparent px-2 py-1 cursor-pointer transition-colors hover:bg-brand-50 hover:text-default-font",
            {
              "border border-solid border-brand-primary bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary hover:text-brand-primary-foreground":
                activeRange === "1-w",
            }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "font-code text-[13px] font-[400] leading-[19px] text-neutral-500 tabular-nums",
              { "text-brand-primary-foreground": activeRange === "1-w" }
            )}
          >
            1W
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex items-center rounded-[3px] border border-solid border-transparent px-2 py-1 cursor-pointer transition-colors hover:bg-brand-50 hover:text-default-font",
            {
              "border border-solid border-brand-primary bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary hover:text-brand-primary-foreground":
                activeRange === "1-m",
            }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "font-code text-[13px] font-[400] leading-[19px] text-neutral-500 tabular-nums",
              { "text-brand-primary-foreground": activeRange === "1-m" }
            )}
          >
            1M
          </span>
        </div>
      </div>
    </div>
  );
});

export const TimeScrubber = TimeScrubberRoot;
