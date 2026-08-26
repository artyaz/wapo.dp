"use client";

/**
 * RecordHeader — the identity block for record/detail pages: breadcrumb trail,
 * large title, bordered record-id chip and a quiet meta line, with secondary
 * and primary actions on the right.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { Button } from "@/components/ds/Button";

export interface RecordHeaderRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  breadcrumb?: React.ReactNode;
  title?: React.ReactNode;
  recordId?: React.ReactNode;
  meta?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

const RecordHeaderRoot = React.forwardRef<
  HTMLDivElement,
  RecordHeaderRootProps
>(function RecordHeaderRoot(
  {
    breadcrumb,
    title,
    recordId,
    meta,
    primaryAction,
    secondaryAction,
    className,
    ...otherProps
  }: RecordHeaderRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start justify-between gap-4 px-5 py-5 sm:flex-row border-b border-solid border-default-border bg-default-background",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full min-w-[0px] flex-col items-start gap-1 flex-1">
        {breadcrumb ? (
          <span className="whitespace-nowrap text-caption font-caption text-neutral-500 tracking-[0.08em] uppercase max-w-full overflow-hidden text-ellipsis">
            {breadcrumb}
          </span>
        ) : null}
        <div className="flex w-full min-w-0 items-center gap-2.5 overflow-hidden">
          {title ? (
            <span className="min-w-[0px] flex-1 whitespace-nowrap text-heading-1 font-heading-1 text-default-font overflow-hidden text-ellipsis">
              {title}
            </span>
          ) : null}
          {recordId ? (
            <span className="flex-none whitespace-nowrap text-code font-code text-neutral-500 rounded-[3px] border border-solid border-default-border px-2 py-0.5">
              {recordId}
            </span>
          ) : null}
        </div>
        {meta ? (
          <span className="text-caption font-caption text-neutral-500">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="flex items-start gap-2">
        <Button variant="secondary" size="small">
          {secondaryAction}
        </Button>
        <Button variant="primary" size="small">
          {primaryAction}
        </Button>
      </div>
    </div>
  );
});

export const RecordHeader = RecordHeaderRoot;
