"use client";

/**
 * AgentActivity — the single expanding object for agent execution
 * transparency.
 *
 * Replaces the four separate primitives:
 *   ThoughtHeader            → level 1 (the disclosure header)
 *   ToolSummaryRow           → level 2 (macro step rows)
 *   ActionTraces             → level 2 (micro trace sub-lists)
 *   ReasoningLog             → removed (its content folds into level 2)
 * plus a NEW level 3: the command execution view — the exact code a tool
 * ran, its exit status and captured output.
 *
 * Structure:
 *   level 1 — "Worked for 3m 51s" header; click to expand
 *   level 2 — tool summary rows (icon + sentence), each optionally carrying
 *             an indented trace sub-list and, when the step executed code,
 *             an expandable command affordance
 *   level 3 — command execution UI: $ code, exit-code status, duration and
 *             captured output (if applicable)
 *
 * Levels only exist when applicable: a step without a command never shows
 * the level-3 affordance, and the root without steps is just the header.
 *
 * Data-driven via `steps`, or composed via `AgentActivity.Step` /
 * `AgentActivity.Trace` / `AgentActivity.Command` children.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type AgentStepKind = "integration" | "edits" | "command" | "api" | "skill";
export type AgentTraceKind = "skill" | "command" | "api";

export interface AgentTraceItem {
  /** Contextual kind — selects the prefix icon. */
  kind: AgentTraceKind;
  /** Trace text, e.g. "pwd; rg -n contrast src/components/ds". */
  label: React.ReactNode;
}

export interface AgentCommand {
  /** The exact code the tool executed. */
  code: string;
  /** Exit status — null/undefined renders as "running". */
  exitCode?: number | null;
  /** Captured output (stdout/stderr), rendered in a scrollable block. */
  output?: string;
  /** Duration label, e.g. "1.8s". */
  duration?: React.ReactNode;
}

export interface AgentStepData {
  /** Semantic kind — selects the leading line icon. */
  kind?: AgentStepKind;
  /** Summary sentence, e.g. "Used Superblocks integration and ran a command". */
  summary?: React.ReactNode;
  /** Micro-level trace items rendered indented under the summary. */
  traces?: AgentTraceItem[];
  /** When set, the step expands into the command execution view (level 3). */
  command?: AgentCommand;
}

export interface AgentActivityRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  /** Level-1 label, e.g. "Worked for 3m 51s". */
  label?: React.ReactNode;
  /** Structured steps (level 2). Alternative to composed children. */
  steps?: AgentStepData[];
  /** Controlled open state of the level-1 disclosure. */
  open?: boolean;
  /** Uncontrolled default open state of the level-1 disclosure. */
  defaultOpen?: boolean;
  /** Called with the next open state on header click. */
  onToggle?: (open: boolean) => void;
  /** Composed level-2 steps (AgentActivity.Step). */
  children?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

/** 12px semantic step icons — 1.2px stroke, currentColor, no fill. */
function StepIcon({ kind }: { kind: AgentStepKind }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 12 12",
    fill: "none" as const,
    "aria-hidden": true,
    className: "flex-none text-muted-foreground",
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
          <path d="M4.4 5.4 7.6 3.6M4.4 6.6l3.2 1.8" stroke="currentColor" strokeWidth="1.2" />
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

/** 11px contextual trace icons — currentColor, monochrome. */
function TraceGlyph({ kind }: { kind: AgentTraceKind }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 11 11",
    fill: "none" as const,
    "aria-hidden": true,
    className: "flex-none text-muted-foreground",
  };
  switch (kind) {
    case "skill":
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={SubframeUtils.twClassNames(
        "flex-none text-muted-foreground transition-transform duration-200",
        open ? "rotate-90" : "rotate-0"
      )}
    >
      <path
        d="M3 1.5L7 5l-4 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Level 3 — the command execution view                                */
/* ------------------------------------------------------------------ */

export interface AgentCommandViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  command: AgentCommand;
  className?: string;
}

function CommandStatus({ exitCode }: { exitCode?: number | null }) {
  return (
    <>
      {/* pulse-dot keyframes — declared inline (deduped + hoisted by React),
          same pattern as StatusBadge */}
      <style
        href="praxis-pulse-dot"
        precedence="medium"
      >{`@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}`}</style>
      {exitCode === null || exitCode === undefined ? (
        <span className="inline-flex items-center gap-1.5 font-code text-[10px] font-medium tracking-[0.08em] uppercase text-muted-foreground">
          <span className="h-[6px] w-[6px] animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-neutral-400 motion-reduce:animate-none" />
          running
        </span>
      ) : exitCode === 0 ? (
        <span className="font-code text-[10px] font-medium tracking-[0.08em] uppercase text-success-600">
          exit 0
        </span>
      ) : (
        <span className="font-code text-[10px] font-medium tracking-[0.08em] uppercase text-destructive-500">
          exit {exitCode}
        </span>
      )}
    </>
  );
}

/**
 * AgentActivity.Command — level 3: what the tool actually executed.
 * A quiet terminal inset: prompt + code, exit status, optional output.
 */
const CommandView = React.forwardRef<HTMLDivElement, AgentCommandViewProps>(
  function CommandView({ command, className, ...otherProps }, ref) {
    const { code, exitCode, output, duration } = command;
    return (
      <div
        ref={ref}
        dir="ltr"
        className={SubframeUtils.twClassNames(
          // terminal inset — neutral-100 stays a soft inset surface in both
          // themes (the DS neutral scale inverts, so this is theme-aware)
          "w-full min-w-0 overflow-hidden rounded-lg border border-default-border bg-neutral-100",
          className
        )}
        {...otherProps}
      >
        {/* prompt + code line */}
        <div className="flex w-full min-w-0 items-start gap-2 px-3 pt-2.5">
          <span
            aria-hidden="true"
            className="flex h-[18px] flex-none items-center font-code text-[12px] font-semibold text-muted-foreground"
          >
            $
          </span>
          <code className="min-w-0 flex-1 whitespace-pre-wrap break-words font-code text-[12px] leading-[18px] text-default-font">
            {code}
          </code>
        </div>
        {/* status row */}
        <div className="flex w-full items-center gap-3 px-3 pb-2.5 pt-1.5">
          <CommandStatus exitCode={exitCode} />
          {duration ? (
            <span className="font-code text-[10px] tracking-[0.04em] text-muted-foreground tabular-nums">
              {duration}
            </span>
          ) : null}
        </div>
        {/* captured output */}
        {output ? (
          <>
            <div className="border-t border-default-border" />
            <div className="max-h-[160px] overflow-y-auto px-3 py-2">
              <pre className="m-0 whitespace-pre-wrap break-words font-code text-[11px] leading-[17px] text-muted-foreground">
                {output}
              </pre>
            </div>
          </>
        ) : null}
      </div>
    );
  }
);

/* ------------------------------------------------------------------ */
/* Level 2 — trace sub-list (ActionTraces semantics)                   */
/* ------------------------------------------------------------------ */

export interface AgentTraceListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: AgentTraceItem[];
  children?: React.ReactNode;
  className?: string;
}

const TraceList = React.forwardRef<HTMLDivElement, AgentTraceListProps>(
  function TraceList({ items, children, className, ...otherProps }, ref) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          // indented vertical sub-list with a guide rail — logical utilities
          // (ms/ps/border-s) so the rail mirrors in RTL
          "ms-[18px] flex w-[calc(100%-18px)] min-w-0 flex-col gap-1.5",
          "border-s border-solid border-default-border ps-3",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {items
          ? items.map((item, i) => (
              <div key={i} className="flex w-full items-baseline gap-2">
                <span className="flex h-[16px] flex-none items-center">
                  <TraceGlyph kind={item.kind} />
                </span>
                {/* Inner span dir="ltr": labels are inherently-LTR machine
                    output — isolate the bidi run so punctuation keeps its
                    order in RTL pages. */}
                <code className="min-w-0 whitespace-pre-wrap break-words font-code text-[12px] leading-[16px] text-muted-foreground">
                  <span dir="ltr">{item.label}</span>
                </code>
              </div>
            ))
          : children}
      </div>
    );
  }
);

/* ------------------------------------------------------------------ */
/* Level 2 — the step row (ToolSummaryRow + ActionTraces semantics)    */
/* ------------------------------------------------------------------ */

export interface AgentStepRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onToggle"> {
  /** Semantic kind — selects the leading line icon. */
  kind?: AgentStepKind;
  /** Summary sentence (level-2 content). */
  summary?: React.ReactNode;
  /** Structured micro-level traces rendered indented under the summary. */
  traces?: AgentTraceItem[];
  /** Level-3 command execution data — adds the expandable code view. */
  command?: AgentCommand;
  /** Composed content: AgentActivity.Trace / AgentActivity.Command. */
  children?: React.ReactNode;
  /** Controlled open state of the level-3 disclosure. */
  open?: boolean;
  /** Uncontrolled default open state of the level-3 disclosure. */
  defaultOpen?: boolean;
  /** Called with the next open state on the level-3 toggle. */
  onToggle?: (open: boolean) => void;
  className?: string;
}

const StepRow = React.forwardRef<HTMLDivElement, AgentStepRowProps>(
  function StepRow(
    {
      kind = "integration",
      summary,
      traces,
      command,
      children,
      open: openProp,
      defaultOpen = false,
      onToggle,
      className,
      ...otherProps
    }: AgentStepRowProps,
    ref
  ) {
    const [openUncontrolled, setOpenUncontrolled] = React.useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : openUncontrolled;

    const hasCommand = command !== undefined;
    const hasTraces = traces !== undefined && traces.length > 0;

    const handleToggle = () => {
      const next = !open;
      if (!isControlled) setOpenUncontrolled(next);
      onToggle?.(next);
    };

    return (
      <div
        className={SubframeUtils.twClassNames("w-full min-w-0", className)}
        ref={ref}
        {...otherProps}
      >
        {/* the summary line — clickable only when a command view exists */}
        {summary !== undefined && summary !== null ? (
          hasCommand ? (
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={open}
              className="group/stap flex w-full cursor-pointer items-baseline gap-2 py-1 text-start"
            >
              <span className="flex h-[18px] flex-none items-center">
                <StepIcon kind={kind} />
              </span>
              <span className="min-w-0 flex-1 text-[13px] leading-[18px] text-muted-foreground transition-colors group-hover/stap:text-neutral-400 dark:group-hover/stap:text-neutral-600">
                {summary}
              </span>
              <span className="flex h-[18px] flex-none items-center self-center">
                <Chevron open={open} />
              </span>
            </button>
          ) : (
            <div className="flex w-full items-baseline gap-2 py-1">
              <span className="flex h-[18px] flex-none items-center">
                <StepIcon kind={kind} />
              </span>
              <p className="min-w-0 text-[13px] leading-[18px] text-muted-foreground">
                {summary}
              </p>
            </div>
          )
        ) : null}

        {/* level-2 traces */}
        {hasTraces ? <div className="pb-1 pt-1">{<TraceList items={traces} />}</div> : null}

        {/* composed level-2/3 content */}
        {children ? <div className="pb-1">{children}</div> : null}

        {/* level 3 — the command execution view */}
        {hasCommand && open ? (
          <div className="pb-2 pt-1">
            <CommandView command={command} />
          </div>
        ) : null}
      </div>
    );
  }
);

/* ------------------------------------------------------------------ */
/* Level 1 — the root disclosure (ThoughtHeader semantics)             */
/* ------------------------------------------------------------------ */

const AgentActivityRoot = React.forwardRef<
  HTMLDivElement,
  AgentActivityRootProps
>(function AgentActivityRoot(
  {
    label = "Worked for 3m 51s",
    steps,
    open: openProp,
    defaultOpen = false,
    onToggle,
    children,
    className,
    ...otherProps
  }: AgentActivityRootProps,
  ref
) {
  const [openUncontrolled, setOpenUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openUncontrolled;

  const handleToggle = () => {
    const next = !open;
    if (!isControlled) setOpenUncontrolled(next);
    onToggle?.(next);
  };

  return (
    <div
      className={SubframeUtils.twClassNames("w-full min-w-0", className)}
      ref={ref}
      {...otherProps}
    >
      {/* level 1 — header */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className={SubframeUtils.twClassNames(
          "group/act flex w-full cursor-pointer items-center gap-2",
          "border-b border-default-border pb-2.5 text-start",
          "transition-colors hover:text-neutral-400 dark:hover:text-neutral-600"
        )}
      >
        <Chevron open={open} />
        <span className="min-w-0 truncate text-[13px] leading-[18px] font-medium text-muted-foreground group-hover/act:text-neutral-400 dark:group-hover/act:text-neutral-600">
          {label}
        </span>
      </button>

      {/* levels 2–3 — steps */}
      {open ? (
        <div className="flex w-full min-w-0 flex-col gap-1 pt-3">
          {steps
            ? steps.map((step, i) => (
                <StepRow
                  key={i}
                  kind={step.kind}
                  summary={step.summary}
                  traces={step.traces}
                  command={step.command}
                />
              ))
            : children}
        </div>
      ) : null}
    </div>
  );
});

export const AgentActivity = Object.assign(AgentActivityRoot, {
  Step: StepRow,
  Trace: TraceList,
  Command: CommandView,
});
