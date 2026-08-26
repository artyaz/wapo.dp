"use client";

/**
 * JumpToLatest — the floating navigation button of the AI chat canvas.
 *
 * A small circular FAB with a dark background, subtle border and shadow, and
 * a centered downward arrow (↓). It appears during long execution traces so
 * users can jump immediately to the latest stream output instead of
 * scrolling through the audit trail.
 *
 * Positioning is left to the parent — the component renders the button
 * itself, so demos can float it in a corner of a tall transcript frame.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface JumpToLatestRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button diameter in px. */
  size?: number;
  /** Accessible label for screen readers; also used as the title tooltip. */
  label?: React.ReactNode;
  /** Force visibility regardless of scroll state (for demos). */
  visible?: boolean;
  className?: string;
}

const JumpToLatestRoot = React.forwardRef<
  HTMLButtonElement,
  JumpToLatestRootProps
>(function JumpToLatestRoot(
  {
    size = 36,
    label = "Jump to latest output",
    visible = true,
    className,
    ...otherProps
  }: JumpToLatestRootProps,
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      title={typeof label === "string" ? label : undefined}
      aria-label={typeof label === "string" ? label : "Jump to latest output"}
      style={{ width: size, height: size }}
      className={SubframeUtils.twClassNames(
        // small circular button — dark bg, subtle border + shadow, ↓ arrow
        "inline-flex flex-none cursor-pointer items-center justify-center",
        "rounded-full border border-neutral-700 bg-neutral-800",
        "text-neutral-300 shadow-[0_2px_10px_rgba(0,0,0,0.45)]",
        "transition-all duration-200",
        "hover:border-neutral-600 hover:bg-[#2d2d2d] hover:text-neutral-100",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500",
        visible
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-90 opacity-0",
        className
      )}
      {...otherProps}
    >
      {/* centered downward arrow ↓ */}
      <svg
        width={Math.round(size * 0.42)}
        height={Math.round(size * 0.42)}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 2.5v9M3.5 8 7 11.5 10.5 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

export const JumpToLatest = JumpToLatestRoot;
