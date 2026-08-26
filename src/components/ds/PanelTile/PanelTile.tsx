"use client";

/**
 * PanelTile — a windowed panel surface with a compact 36px title bar carrying
 * overflow / expand / close affordances and a padded body region. The focused
 * variant raises a brand-primary rail along the top edge.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface PanelTileRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "focused";
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const PanelTileRoot = React.forwardRef<HTMLDivElement, PanelTileRootProps>(
  function PanelTileRoot(
    {
      variant = "default",
      title,
      children,
      className,
      ...otherProps
    }: PanelTileRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/b6010ce9 flex w-full flex-col items-start overflow-hidden rounded-lg border border-solid border-default-border bg-panel",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "hidden h-0.5 w-full flex-none items-start bg-brand-primary shrink-0",
            { flex: variant === "focused" }
          )}
        />
        <div className="flex h-9 w-full flex-none items-center justify-between border-b border-solid border-default-border px-3 shrink-0 gap-2">
          {title ? (
            <span className="min-w-[0px] whitespace-nowrap font-body text-[13px] font-[600] leading-[19px] text-default-font flex-1 overflow-hidden text-ellipsis">
              {title}
            </span>
          ) : null}
          <div className="flex items-center gap-0.5">
            <div className="group/icon flex h-6 w-6 flex-none items-center justify-center rounded-sm hover:bg-brand-50 cursor-pointer transition-colors">
              <span className="text-caption font-caption text-neutral-500 group-hover/icon:text-default-font">
                ⋯
              </span>
            </div>
            <div className="group/icon flex h-6 w-6 flex-none items-center justify-center rounded-sm hover:bg-brand-50 cursor-pointer transition-colors">
              <span className="text-caption font-caption text-neutral-500 group-hover/icon:text-default-font">
                ⤢
              </span>
            </div>
            <div className="group/icon flex h-6 w-6 flex-none items-center justify-center rounded-sm hover:bg-brand-50 cursor-pointer transition-colors">
              <span className="text-caption font-caption text-neutral-500 group-hover/icon:text-default-font">
                ✕
              </span>
            </div>
          </div>
        </div>
        {children ? (
          <div className="flex min-h-[0px] w-full min-w-0 flex-col items-start px-3 py-3 flex-1">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const PanelTile = PanelTileRoot;
