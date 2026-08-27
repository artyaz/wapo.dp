"use client";

/**
 * ActionTraces — the micro level of agent execution transparency.
 *
 * An indented vertical sub-list that nests inside ToolSummaryRow (macro).
 * Each trace is prefixed with a specialized contextual icon — wrench for
 * design skills, a terminal >_ prompt for shell commands, a connection node
 * for API queries — giving fine-grained visibility into the exact commands
 * and lookups the agent performed.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export type ActionTraceKind = "skill" | "command" | "api";

export interface ActionTraceItem {
  /** Contextual kind — selects the prefix icon. */
  kind: ActionTraceKind;
  /** Trace text, e.g. "pwd; rg -n contrast src/components/ds". */
  label: React.ReactNode;
}

export interface ActionTracesRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Structured trace items. */
  items?: ActionTraceItem[];
  /** Alternative to items: free-form trace children. */
  children?: React.ReactNode;
  className?: string;
}

/** 11px contextual prefix icons — currentColor, monochrome. */
function TraceIcon({ kind }: { kind: ActionTraceKind }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 11 11",
    fill: "none" as const,
    "aria-hidden": true,
    className: "flex-none text-neutral-600",
  };
  switch (kind) {
    case "skill":
      // wrench — design skill lookup
      return (
        <svg {...common}>
          <path
            d="M9 3.3a2.2 2.2 0 0 1-2.9 2.7L3.3 8.8a1 1 0 0 1-1.4-1.4L4.6 4.6A2.2 2.2 0 0 1 7.3 1.7L6 3l1.4 1.4L9 3.3Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "command":
      // >_ terminal prompt
      return (
        <svg {...common}>
          <path
            d="M2.2 3.2 4.5 5.5 2.2 7.8M5.9 8h3"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "api":
      // connection node
      return (
        <svg {...common}>
          <circle cx="2.7" cy="5.5" r="1.4" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="8.3" cy="2.7" r="1.4" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="8.3" cy="8.3" r="1.4" stroke="currentColor" strokeWidth="1.1" />
          <path d="M3.9 4.9 7.1 3.1M3.9 6.1l3.2 1.8" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
  }
}

const ActionTracesRoot = React.forwardRef<HTMLDivElement, ActionTracesRootProps>(
  function ActionTracesRoot(
    { items, children, className, ...otherProps },
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          // indented vertical sub-list — nested inside the macro summary row.
          // Logical utilities (ms/ps/border-s) so the guide rail mirrors in RTL.
          "ms-[18px] flex w-[calc(100%-18px)] min-w-0 flex-col gap-1.5",
          "border-s border-solid border-default-border ps-3",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {items
          ? items.map((item, i) => (
              <div
                key={i}
                className="flex w-full items-baseline gap-2"
              >
                <span className="flex h-[16px] flex-none items-center">
                  <TraceIcon kind={item.kind} />
                </span>
                {/* Inner span dir="ltr": labels are inherently-LTR machine
                    output (shell commands, HTTP requests) — isolate the bidi
                    run so punctuation keeps its order in RTL pages, while the
                    outer <code> keeps the inherited direction so text-align:
                    start keeps every row anchored to the icon (inline-start). */}
                <code className="min-w-0 whitespace-pre-wrap break-words font-code text-[12px] leading-[16px] text-neutral-500">
                  <span dir="ltr">{item.label}</span>
                </code>
              </div>
            ))
          : children}
      </div>
    );
  }
);

export const ActionTraces = ActionTracesRoot;
