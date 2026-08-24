"use client";

/**
 * Card — the baseline container of the document canvas: a bordered,
 * panel-colored surface with 18px interior padding that stacks an optional
 * header, free-form body content, and a right-aligned footer row.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "quiet" | "interactive";
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  function CardRoot(
    {
      variant = "default",
      header,
      children,
      footer,
      className,
      ...otherProps
    }: CardRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/719251f6 flex flex-col items-start gap-3 rounded-lg border border-solid border-default-border bg-panel px-[18px] py-[18px]",
          {
            "hover:bg-neutral-100 active:bg-neutral-200":
              variant === "interactive",
            "border border-solid border-transparent bg-transparent":
              variant === "quiet",
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {header ? (
          <div className="flex w-full flex-col items-start">{header}</div>
        ) : null}
        {children ? (
          <div className="flex w-full flex-col items-start">{children}</div>
        ) : null}
        {footer ? (
          <div className="flex w-full items-center justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </div>
    );
  }
);

export const Card = CardRoot;
