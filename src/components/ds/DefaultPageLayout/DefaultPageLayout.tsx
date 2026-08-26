"use client";

/**
 * DefaultPageLayout — the base page scaffold of the system. A full-height,
 * full-width centered stage that holds one vertically-scrollable white content
 * column; pages compose their header/body/footer sections as its children.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLDivElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-center",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? (
        <div className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-[#ffffff]">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
