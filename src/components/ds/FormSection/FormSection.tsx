"use client";

/**
 * FormSection — a labeled group of form fields: an uppercase caption label,
 * an optional hint line, and a column of children (typically TextFields).
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface FormSectionRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sectionLabel?: React.ReactNode;
  hint?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const FormSectionRoot = React.forwardRef<HTMLDivElement, FormSectionRootProps>(
  function FormSectionRoot(
    {
      sectionLabel,
      hint,
      children,
      className,
      ...otherProps
    }: FormSectionRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-4",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-0.5">
          {sectionLabel ? (
            <span className="text-caption font-caption text-neutral-500 uppercase tracking-[0.1em]">
              {sectionLabel}
            </span>
          ) : null}
          {hint ? (
            <span className="text-caption font-caption text-neutral-400">
              {hint}
            </span>
          ) : null}
        </div>
        {children ? (
          <div className="flex w-full flex-col items-start gap-4">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const FormSection = FormSectionRoot;
