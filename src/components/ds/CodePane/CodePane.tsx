"use client";

/**
 * CodePane — a bordered code surface with numbered CodeLine rows (optional
 * currentLine highlight) and a HoverDocCard rendered below the snippet,
 * docked to the pane's trailing edge, modeling the editor's
 * hover-documentation moment without covering the code.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface HoverDocCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HoverDocCard = React.forwardRef<HTMLDivElement, HoverDocCardProps>(
  function HoverDocCard({ className, ...otherProps }: HoverDocCardProps, ref) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex max-w-[min(240px,60%)] flex-col items-start gap-2 rounded-xl border border-solid border-default-border bg-panel px-3 py-3 shadow-default",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-0.5">
          <span className="text-code font-code text-default-font">
            function createLedgerEntry(
          </span>
          <span className="text-code font-code text-default-font pl-4">
            input: CreateEntryInput
          </span>
          <span className="text-code font-code text-default-font">
            ): Promise&lt;LedgerEntry&gt;
          </span>
        </div>
        <span className="text-caption font-caption text-neutral-500">
          Creates a new ledger entry with the given input, validates balances,
          and persists to the write-ahead log.
        </span>
        <div className="flex w-full items-start border-t border-solid border-default-border pt-2">
          <span className="text-code font-code text-neutral-400">
            src/services/ledger.ts · ↵ for details
          </span>
        </div>
      </div>
    );
  }
);

export interface CodeLineProps extends React.HTMLAttributes<HTMLDivElement> {
  lineNumber?: React.ReactNode;
  currentLine?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const CodeLine = React.forwardRef<HTMLDivElement, CodeLineProps>(
  function CodeLine(
    {
      lineNumber,
      currentLine = false,
      children,
      className,
      ...otherProps
    }: CodeLineProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/3f0ae4b4 flex min-h-6 w-full items-center group/codeline",
          { "bg-brand-primary/[0.04]": currentLine },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex w-12 flex-none items-center justify-end self-stretch pr-3">
          {lineNumber ? (
            <span
              className={SubframeUtils.twClassNames(
                "text-code font-code text-neutral-400 select-none",
                { "font-[600] text-default-font": currentLine }
              )}
            >
              {lineNumber}
            </span>
          ) : null}
        </div>
        {children ? (
          <div className="flex items-center overflow-hidden pl-3 flex-1">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export interface CodePaneRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const CodePaneRoot = React.forwardRef<HTMLDivElement, CodePaneRootProps>(
  function CodePaneRoot(
    { children, className, ...otherProps }: CodePaneRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full max-w-[720px] flex-col items-start overflow-hidden rounded-lg border border-solid border-default-border bg-panel relative",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {children ? (
          <div className="flex w-full flex-col items-start py-3">
            {children}
          </div>
        ) : null}
        {/* Rendered in flow (not absolutely positioned over the code) so the
            doc card never obscures the lines it documents. */}
        <HoverDocCard className="mb-3 self-end me-3" />
      </div>
    );
  }
);

export const CodePane = Object.assign(CodePaneRoot, {
  HoverDocCard,
  CodeLine,
});
