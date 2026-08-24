"use client";

/**
 * MethodChip — HTTP verb indicator for API and endpoint listings.
 * Renders the method label (GET/POST/PUT/PATCH/DEL) in monospace with a
 * weight-coded border; POST inverts to ink-filled.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface MethodChipRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  method?: "get" | "post" | "put" | "delete" | "patch";
  disabled?: boolean;
  className?: string;
}

const MethodChipRoot = React.forwardRef<HTMLDivElement, MethodChipRootProps>(
  function MethodChipRoot(
    {
      method = "get",
      disabled = false,
      className,
      ...otherProps
    }: MethodChipRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/ae719e43 flex items-center justify-center rounded-[3px] border-2 border-solid border-brand-primary px-2 py-0.5 group/methodchip w-fit focus-within:border-brand-primary",
          {
            "opacity-40 pointer-events-none": disabled,
            "border-2 border-solid border-warning-500 focus-within:border-warning-700":
              method === "patch",
            "border-2 border-solid border-destructive-500 focus-within:border-destructive-700":
              method === "delete",
            "border-2 border-solid border-neutral-300 focus-within:border-neutral-700":
              method === "put",
            "bg-brand-primary": method === "post",
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <span
          className={SubframeUtils.twClassNames(
            "font-code text-[11px] font-[700] leading-[14px] tracking-[0.08em] text-brand-primary uppercase select-none",
            {
              "text-warning-600": method === "patch",
              "text-destructive-600": method === "delete",
              "text-neutral-500": method === "put",
              "text-brand-primary-foreground": method === "post",
            }
          )}
        >
          {method === "patch"
            ? "PATCH"
            : method === "delete"
            ? "DEL"
            : method === "put"
            ? "PUT"
            : method === "post"
            ? "POST"
            : "GET"}
        </span>
      </div>
    );
  }
);

export const MethodChip = MethodChipRoot;
