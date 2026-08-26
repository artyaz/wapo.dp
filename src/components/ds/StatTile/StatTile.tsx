"use client";

/**
 * StatTile — a compact metric surface: uppercase caption label, large
 * tabular-numeral value in the code face, an optional sign-colored delta chip,
 * a quiet footer note, and an optional sparkline slot.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface StatTileRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  value?: React.ReactNode;
  delta?: React.ReactNode;
  sign?: "positive" | "negative" | "neutral";
  footer?: React.ReactNode;
  sparkline?: React.ReactNode;
  className?: string;
}

const StatTileRoot = React.forwardRef<HTMLDivElement, StatTileRootProps>(
  function StatTileRoot(
    {
      label,
      value,
      delta,
      sign = "neutral",
      footer,
      sparkline,
      className,
      ...otherProps
    }: StatTileRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/190884bb flex w-full flex-col items-start gap-1.5 rounded-lg border border-solid border-default-border bg-panel px-4 py-4",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {label ? (
          <span className="w-full text-caption font-caption text-neutral-500 uppercase tracking-[0.1em]">
            {label}
          </span>
        ) : null}
        <div className="flex w-full flex-wrap gap-2 items-baseline">
          {value ? (
            <span
              className={SubframeUtils.twClassNames(
                "font-code text-[28px] font-[600] leading-[28px] text-default-font tabular-nums",
                { "text-destructive-700": sign === "negative" }
              )}
            >
              {value}
            </span>
          ) : null}
          {delta ? (
            <span
              className={SubframeUtils.twClassNames(
                "font-code text-[13px] font-[500] leading-[20px] text-neutral-600 inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-1.5 py-[2px] tabular-nums bg-neutral-100",
                {
                  "text-destructive-700 bg-destructive-100":
                    sign === "negative",
                  "text-success-700 bg-success-100": sign === "positive",
                }
              )}
            >
              {delta}
            </span>
          ) : null}
        </div>
        {footer ? (
          <span className="w-full text-caption font-caption text-neutral-400">
            {footer}
          </span>
        ) : null}
        {sparkline ? (
          <div className="flex w-full items-start pt-1">{sparkline}</div>
        ) : null}
      </div>
    );
  }
);

export const StatTile = StatTileRoot;
