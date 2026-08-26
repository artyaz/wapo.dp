"use client";

/**
 * ThoughtHeader — progressive disclosure for agent execution traces.
 *
 * A collapsible horizontal control bar: muted grey duration text
 * ("Worked for 3m 51s") plus a toggle chevron, sitting on a subtle bottom
 * divider rule. No background fill, no heavy container borders — the header
 * stays quiet so the response reads clean by default, while technical users
 * can audit execution time and expand the reasoning log on demand.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface ThoughtHeaderRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  /** Muted summary label, e.g. "Worked for 3m 51s". */
  label?: React.ReactNode;
  /** Controlled open state of the disclosure. */
  open?: boolean;
  /** Uncontrolled default open state. */
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  /** Reasoning log content revealed when expanded. */
  children?: React.ReactNode;
  className?: string;
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
        "flex-none text-neutral-500 transition-transform duration-200",
        open ? "rotate-90" : "rotate-0"
      )}
    >
      {/* › collapsed → rotates to ∨-expanded as the log unfolds */}
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

const ThoughtHeaderRoot = React.forwardRef<
  HTMLDivElement,
  ThoughtHeaderRootProps
>(function ThoughtHeaderRoot(
  {
    label = "Worked for 3m 51s",
    open: openProp,
    defaultOpen = false,
    onToggle,
    children,
    className,
    ...otherProps
  }: ThoughtHeaderRootProps,
  ref
) {
  const [openUncontrolled, setOpenUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openUncontrolled;

  const handleClick = () => {
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
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        className={SubframeUtils.twClassNames(
          "group/th flex w-full cursor-pointer items-center gap-2",
          "border-b border-neutral-800 pb-2.5 text-left",
          "transition-colors hover:text-neutral-300"
        )}
      >
        <Chevron open={open} />
        <span className="min-w-0 truncate text-[13px] leading-[18px] font-medium text-neutral-500 group-hover/th:text-neutral-400">
          {label}
        </span>
      </button>
      {open && children ? (
        <div className="pt-3">{children}</div>
      ) : null}
    </div>
  );
});

export const ThoughtHeader = ThoughtHeaderRoot;
