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
  // Phone (<30rem): the 32px small buttons fall under the 40px touch-target
  // guideline — grow each button's hit area with an invisible ::after instead
  // of changing its visual size (same idiom as ui/sidebar's group action).
  const phoneHitArea =
    "mobile:relative mobile:after:absolute mobile:after:-inset-x-1 mobile:after:-inset-y-1.5 mobile:after:content-['']";
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
        {/* mobile:flex-wrap + title w-full: below 30rem the record-id chip
            drops to its own line so the heading gets the full row width
            instead of being squeezed into a mid-word ellipsis. */}
        <div className="flex w-full min-w-0 items-center gap-2.5 overflow-hidden mobile:flex-wrap">
          {title ? (
            // line-clamp: let the heading wrap before it truncates — a
            // single-line ellipsis wasted the free vertical space under the
            // header. On phones (<30rem) the id-chip wraps below and the
            // title wraps freely; ≥30rem it clamps at two lines.
            <span className="min-w-[0px] flex-1 text-heading-1 font-heading-1 text-default-font line-clamp-2 mobile:line-clamp-none mobile:flex-none mobile:w-full">
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
        <Button variant="secondary" size="small" className={phoneHitArea}>
          {secondaryAction}
        </Button>
        <Button variant="primary" size="small" className={phoneHitArea}>
          {primaryAction}
        </Button>
      </div>
    </div>
  );
});

export const RecordHeader = RecordHeaderRoot;
