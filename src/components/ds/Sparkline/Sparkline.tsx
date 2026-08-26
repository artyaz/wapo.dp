"use client";

/**
 * Sparkline — a three-variant micro-chart row (Neutral / Positive /
 * Negative): thirty 2px bars per column over a shared hairline, each column
 * captioned and closed by an emphasized final bar. Stretches to fill its
 * container (w-full); fully static and deterministic.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface SparklineRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SparklineRoot = React.forwardRef<HTMLDivElement, SparklineRootProps>(
  function SparklineRoot(
    { className, ...otherProps }: SparklineRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full items-start gap-4",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex flex-col items-start gap-1.5 flex-1">
          <span className="text-caption font-caption text-neutral-400 uppercase tracking-[0.14em]">
            Neutral
          </span>
          <div className="flex w-full flex-col items-start gap-[3px]">
            <div className="flex h-8 w-full flex-none items-end justify-between gap-[1px]">
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-brand-primary" />
            </div>
            <div className="flex h-px w-full flex-none items-start bg-default-border" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1.5 flex-1">
          <span className="text-caption font-caption text-neutral-400 uppercase tracking-[0.14em]">
            Positive
          </span>
          <div className="flex w-full flex-col items-start gap-[3px]">
            <div className="flex h-8 w-full flex-none items-end justify-between gap-[1px]">
              <div className="flex h-1 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-1 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-8 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-success-600" />
            </div>
            <div className="flex h-px w-full flex-none items-start bg-default-border" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1.5 flex-1">
          <span className="text-caption font-caption text-neutral-400 uppercase tracking-[0.14em]">
            Negative
          </span>
          <div className="flex w-full flex-col items-start gap-[3px]">
            <div className="flex h-8 w-full flex-none items-end justify-between gap-[1px]">
              <div className="flex h-8 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-8 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-7 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-6 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-5 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-4 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-3 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-1 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-2 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-300" />
              <div className="flex h-1 flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-destructive-600" />
            </div>
            <div className="flex h-px w-full flex-none items-start bg-default-border" />
          </div>
        </div>
      </div>
    );
  }
);

export const Sparkline = SparklineRoot;
