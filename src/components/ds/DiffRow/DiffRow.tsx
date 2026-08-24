"use client";

/**
 * DiffRow — a unified-diff review card. The root frames and clips DiffLine
 * rows that carry paired old/new line-number gutters and +/− markers tinted
 * per lineType (context, added, removed, hunk-header).
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface DiffLineProps extends React.HTMLAttributes<HTMLDivElement> {
  lineType?: "context" | "added" | "removed" | "hunk-header";
  oldNumber?: React.ReactNode;
  newNumber?: React.ReactNode;
  code?: React.ReactNode;
  className?: string;
}

const DiffLine = React.forwardRef<HTMLDivElement, DiffLineProps>(
  function DiffLine(
    {
      lineType = "context",
      oldNumber,
      newNumber,
      code,
      className,
      ...otherProps
    }: DiffLineProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/a06650b7 flex h-6 w-full items-center bg-default-background",
          {
            "bg-neutral-50": lineType === "hunk-header",
            "bg-destructive-50": lineType === "removed",
            "bg-success-50": lineType === "added",
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "flex w-10 flex-none items-center justify-end self-stretch pr-1.5",
            { hidden: lineType === "hunk-header" }
          )}
        >
          {oldNumber ? (
            <span className="text-code font-code text-neutral-400 select-none">
              {oldNumber}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex w-10 flex-none items-center justify-end self-stretch pr-1.5",
            { hidden: lineType === "hunk-header" }
          )}
        >
          {newNumber ? (
            <span className="text-code font-code text-neutral-400 select-none">
              {newNumber}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex w-6 flex-none items-center justify-center self-stretch",
            { hidden: lineType === "hunk-header" }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "hidden text-code font-code text-destructive-700 select-none",
              { inline: lineType === "removed" }
            )}
          >
            −
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "hidden text-code font-code text-success-700 select-none",
              { inline: lineType === "added" }
            )}
          >
            +
          </span>
        </div>
        {code ? (
          <span
            className={SubframeUtils.twClassNames(
              "grow shrink-0 basis-0 whitespace-nowrap text-code font-code text-default-font overflow-hidden text-ellipsis",
              {
                "text-neutral-400 pl-3": lineType === "hunk-header",
                "text-destructive-700": lineType === "removed",
                "text-success-700": lineType === "added",
              }
            )}
          >
            {code}
          </span>
        ) : null}
      </div>
    );
  }
);

export interface DiffRowRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DiffRowRoot = React.forwardRef<HTMLDivElement, DiffRowRootProps>(
  function DiffRowRoot(
    { children, className, ...otherProps }: DiffRowRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full max-w-[520px] flex-col items-start overflow-hidden rounded-lg border border-solid border-default-border bg-default-background",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {children ? (
          <div className="flex w-full flex-col items-start">{children}</div>
        ) : null}
      </div>
    );
  }
);

export const DiffRow = Object.assign(DiffRowRoot, {
  DiffLine,
});
