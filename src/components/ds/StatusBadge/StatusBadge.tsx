"use client";

/**
 * StatusBadge — a 7px status dot paired with an uppercase, letter-spaced label.
 * The "live" tone pulses gently; the other tones hold a steady dot.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface StatusBadgeRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "live" | "idle" | "success" | "warning";
  children?: React.ReactNode;
  className?: string;
}

const StatusBadgeRoot = React.forwardRef<HTMLDivElement, StatusBadgeRootProps>(
  function StatusBadgeRoot(
    { tone = "live", children, className, ...otherProps }: StatusBadgeRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/f2aeadf1 items-center gap-1.5 inline-flex text-destructive-500",
          {
            "text-warning-500": tone === "warning",
            "text-success-500": tone === "success",
            "text-neutral-500": tone === "idle",
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {/* The pulse-dot keyframes lived in Subframe's runtime CSS; declared
            here (deduped + hoisted by React) so the live dot keeps its pulse. */}
        <style
          href="praxis-pulse-dot"
          precedence="medium"
        >{`@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}`}</style>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-[7px] w-[7px] flex-none items-start rounded-[9999px] bg-destructive-500 animate-[pulse-dot_1.6s_ease-in-out_infinite] motion-reduce:animate-none",
            {
              "bg-warning-500 animate-none": tone === "warning",
              "bg-success-500 animate-none": tone === "success",
              "bg-neutral-500 animate-none": tone === "idle",
            }
          )}
        />
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "font-body text-[11px] font-[700] leading-[14px] tracking-[0.14em] text-destructive-500 uppercase",
              {
                "text-warning-500": tone === "warning",
                "text-success-500": tone === "success",
                "text-neutral-500": tone === "idle",
              }
            )}
          >
            {children}
          </span>
        ) : null}
      </div>
    );
  }
);

export const StatusBadge = StatusBadgeRoot;
