"use client";

/**
 * AssistantMessage — the agent's final response block.
 *
 * Left-aligned structured markdown output: high-contrast white text,
 * standard bullet points (•), and clean vertical spacing between lists and
 * concluding remarks. Renders the deliverable natively on the chat canvas
 * without boxy container borders — scannability and contrast first.
 *
 * Sub-exports give the common markdown shapes the right rhythm:
 *   AssistantMessage.Paragraph — a prose block
 *   AssistantMessage.List      — a •-bulleted list
 *   AssistantMessage.Quote     — an indented quotation strip
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface AssistantMessageRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AssistantMessageRoot = React.forwardRef<
  HTMLDivElement,
  AssistantMessageRootProps
>(function AssistantMessageRoot({ children, className, ...otherProps }, ref) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        // left-anchored, borderless — the deliverable sits directly on canvas
        "flex w-full min-w-0 flex-col items-start gap-4 text-left",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Paragraph                                                           */
/* ------------------------------------------------------------------ */

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function Paragraph({ className, children, ...otherProps }, ref) {
  return (
    <p
      ref={ref}
      className={SubframeUtils.twClassNames(
        "w-full min-w-0 text-[14px] leading-[24px] text-neutral-100",
        className
      )}
      {...otherProps}
    >
      {children}
    </p>
  );
});

/* ------------------------------------------------------------------ */
/* List — standard • bullets with hanging indent                       */
/* ------------------------------------------------------------------ */

export interface AssistantListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items?: React.ReactNode[];
}

const List = React.forwardRef<HTMLUListElement, AssistantListProps>(
  function List({ items, children, className, ...otherProps }, ref) {
    return (
      <ul
        ref={ref}
        className={SubframeUtils.twClassNames(
          "m-0 flex w-full min-w-0 list-none flex-col gap-2 p-0",
          className
        )}
        {...otherProps}
      >
        {items
          ? items.map((item, i) => (
              <li
                key={i}
                className="flex w-full min-w-0 items-start gap-2.5 text-[14px] leading-[24px] text-neutral-100"
              >
                {/* standard bullet point • */}
                <span
                  aria-hidden="true"
                  className="flex h-[24px] flex-none items-center text-neutral-500"
                >
                  •
                </span>
                <span className="min-w-0">{item}</span>
              </li>
            ))
          : children}
      </ul>
    );
  }
);

/* ------------------------------------------------------------------ */
/* Quote — quiet indented strip for cited output                       */
/* ------------------------------------------------------------------ */

const Quote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(function Quote({ className, children, ...otherProps }, ref) {
  return (
    <blockquote
      ref={ref}
      className={SubframeUtils.twClassNames(
        "w-full min-w-0 border-l-2 border-neutral-700 py-0.5 pl-4",
        "text-[13px] leading-[22px] text-neutral-400",
        className
      )}
      {...otherProps}
    >
      {children}
    </blockquote>
  );
});

export const AssistantMessage = Object.assign(AssistantMessageRoot, {
  Paragraph,
  List,
  Quote,
});
