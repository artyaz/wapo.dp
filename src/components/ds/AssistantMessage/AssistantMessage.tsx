"use client";

/**
 * AssistantMessage — the agent's final response block.
 *
 * Start-aligned structured markdown output: high-contrast theme-aware text
 * (the default-font ink over the default-background canvas token), standard
 * bullet points (•), and clean vertical spacing between lists and
 * concluding remarks. The root paints the chat-canvas token itself, so the
 * copy keeps its contrast in both themes no matter what surface the page
 * mounts it on — scannability and contrast first. The root also carries
 * dir="auto", so the transcript resolves its own base direction from the
 * first strong character (English messages read LTR with correct terminal
 * punctuation even on RTL pages; Hebrew/Arabic messages mirror fully).
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
        // start-anchored, borderless — the deliverable sits directly on the
        // canvas token (bg-default-background), which keeps the theme-aware
        // default-font ink legible in both light and dark
        "flex w-full min-w-0 flex-col items-start gap-4 rounded-lg",
        "bg-default-background text-start text-default-font",
        className
      )}
      ref={ref}
      // dir="auto" isolates the message as a directional island: Latin copy
      // keeps its trailing punctuation on the correct side inside RTL pages
      // (and vice versa); a consumer-passed dir still wins via otherProps
      dir="auto"
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
        "w-full min-w-0 text-[14px] leading-[24px] text-default-font",
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
                className="flex w-full min-w-0 items-start gap-2.5 text-[14px] leading-[24px] text-default-font"
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
        // border-s/ps mirror the accent strip to the inline-start edge in RTL;
        // neutral-600 keeps AA contrast on the canvas token in both themes
        "w-full min-w-0 border-s-2 border-neutral-700 py-0.5 ps-4",
        "text-[13px] leading-[22px] text-neutral-600",
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
