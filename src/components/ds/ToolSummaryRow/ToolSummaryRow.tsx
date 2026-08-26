"use client";

/**
 * ToolSummaryRow — the macro level of an agent's tool activity.
 *
 * A block-level summary line that collapses multi-step autonomous actions
 * ("Used Superblocks integration, loaded a tool, ran a command") into one
 * readable event, prefixed with a semantic line icon. Muted text keeps long
 * workflows quiet; the nested micro level (ActionTraces) provides the
 * fine-grained audit trail underneath.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface ToolSummaryRowRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic kind — selects the leading line icon. */
  kind?: "integration" | "edits" | "command" | "api" | "skill";
  /** Summary line content, e.g. "Used Superblocks integration and ran a command". */
  children?: React.ReactNode;
  /** Nested micro-level traces (ActionTraces) rendered indented below. */
  traces?: React.ReactNode;
  className?: string;
}

/** 12px semantic line icons — 1.4px stroke, currentColor, no fill. */
function KindIcon({ kind }: { kind: NonNullable<ToolSummaryRowRootProps["kind"]> }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 12 12",
    fill: "none" as const,
    "aria-hidden": true,
    className: "flex-none text-neutral-500",
  };
  switch (kind) {
    case "integration":
      // ⚯ — two interlocking links
      return (
        <svg {...common}>
          <path
            d="M4.6 7.4 7.4 4.6M3.5 6.3 2.4 7.4a1.9 1.9 0 0 0 2.7 2.7l1.1-1.1M8.5 5.7l1.1-1.1a1.9 1.9 0 0 0-2.7-2.7L5.8 3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "edits":
      // ✎ — pencil
      return (
        <svg {...common}>
          <path
            d="M8.8 1.9a1.1 1.1 0 0 1 1.3 1.3L9 4.3 7.7 3l1.1-1.1ZM7.7 3 3 7.7l-.6 1.9 1.9-.6L9 4.3 7.7 3Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "command":
      // >_ — terminal prompt
      return (
        <svg {...common}>
          <path
            d="M2.5 3.5 5 6l-2.5 2.5M6.5 8.5h3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "api":
      // connection node
      return (
        <svg {...common}>
          <circle cx="3" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="9" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M4.4 5.4 7.6 3.6M4.4 6.6l3.2 1.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "skill":
      // wrench
      return (
        <svg {...common}>
          <path
            d="M9.8 3.6a2.4 2.4 0 0 1-3.2 3L3.5 9.7a1.1 1.1 0 0 1-1.6-1.6L5 5a2.4 2.4 0 0 1 3-3.2L6.4 3.4l1.7 1.7 1.7-1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

const ToolSummaryRowRoot = React.forwardRef<
  HTMLDivElement,
  ToolSummaryRowRootProps
>(function ToolSummaryRowRoot(
  { kind = "integration", children, traces, className, ...otherProps },
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames("w-full min-w-0", className)}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-baseline gap-2 py-1">
        <span className="flex h-[18px] flex-none items-center">
          <KindIcon kind={kind} />
        </span>
        <p className="min-w-0 text-[13px] leading-[18px] text-neutral-400">
          {children}
        </p>
      </div>
      {traces ? <div className="pb-1">{traces}</div> : null}
    </div>
  );
});

export const ToolSummaryRow = ToolSummaryRowRoot;
