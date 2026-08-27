"use client";

/**
 * CanvasNode — a node editor card: a 220px panel with a grab-dots header,
 * title, StatusBadge, body/footer slots and input/output port dots centered
 * on the left and right edges.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { StatusBadge } from "@/components/ds/StatusBadge";

export interface CanvasNodeRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "selected" | "danger" | "disabled";
  title?: React.ReactNode;
  statusTone?: "live" | "idle" | "success" | "warning";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const CanvasNodeRoot = React.forwardRef<HTMLDivElement, CanvasNodeRootProps>(
  function CanvasNodeRoot(
    {
      variant = "default",
      title,
      statusTone = "idle",
      children,
      footer,
      className,
      ...otherProps
    }: CanvasNodeRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/9eb4b63f flex w-[220px] flex-col rounded-[3px] border border-solid border-default-border bg-panel group/canvasnode relative items-stretch",
          {
            // Disabled dims the chrome only (dashed hairline + muted title).
            // A root opacity-40 pushed body/metric/footer text to ~1.7–2.6:1
            // contrast on the light canvas, so the node content stays at full
            // strength instead.
            "border-dashed border-neutral-300": variant === "disabled",
            "border border-solid border-destructive-500": variant === "danger",
            "border-2 border-solid border-brand-primary bg-brand-primary/[0.03]":
              variant === "selected",
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex h-2 w-2 flex-none items-start rounded-[9999px] border border-solid border-neutral-300 bg-panel absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:border-brand-primary" />
        <div className="flex h-2 w-2 flex-none items-start rounded-[9999px] border border-solid border-neutral-300 bg-panel absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 hover:border-brand-primary" />
        <div className="flex w-full items-center gap-2 border-b border-solid border-default-border px-3 py-2.5">
          <div className="flex flex-col items-start gap-[3px] cursor-grab">
            <div className="flex items-center gap-[3px]">
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
            </div>
            <div className="flex items-center gap-[3px]">
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
            </div>
          </div>
          {title ? (
            <span
              className={SubframeUtils.twClassNames(
                "whitespace-nowrap font-body text-[13px] font-[600] leading-[19px] text-default-font flex-1 overflow-hidden text-ellipsis",
                // Still ≥5:1 contrast in both themes; a subtle muted cue for
                // the disabled variant (replaces the old whole-node dimming).
                { "text-neutral-600": variant === "disabled" }
              )}
            >
              {title}
            </span>
          ) : null}
          <StatusBadge
            tone={
              statusTone === "warning"
                ? "warning"
                : statusTone === "success"
                ? "success"
                : statusTone === "live"
                ? "live"
                : "idle"
            }
          />
        </div>
        {children ? (
          <div className="flex w-full flex-col items-start px-3 py-3">
            {children}
          </div>
        ) : null}
        {footer ? (
          <div className="flex w-full items-center justify-end gap-2 border-t border-solid border-default-border px-3 py-2">
            {footer}
          </div>
        ) : null}
      </div>
    );
  }
);

export const CanvasNode = CanvasNodeRoot;
