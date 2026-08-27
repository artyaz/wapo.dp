"use client";

/**
 * LayerTreeRow — a single row of a design-tool layer tree: depth rail,
 * node-type glyph (frame, group, component, text), expand caret and the
 * visibility/lock indicators that surface on hover or when set.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface LayerTreeRowRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name?: React.ReactNode;
  nodeType?: "frame" | "group" | "component" | "text";
  depth?: "0" | "1" | "2" | "3" | "4";
  expanded?: boolean;
  selected?: boolean;
  visible?: boolean;
  locked?: boolean;
  leaf?: boolean;
  className?: string;
}

const LayerTreeRowRoot = React.forwardRef<
  HTMLDivElement,
  LayerTreeRowRootProps
>(function LayerTreeRowRoot(
  {
    name,
    nodeType = "frame",
    depth = "0",
    expanded = false,
    selected = false,
    visible = false,
    locked = false,
    leaf = false,
    className,
    ...otherProps
  }: LayerTreeRowRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/34f92f71 flex h-8 w-full cursor-pointer items-center group/ltrow hover:bg-neutral-100",
        {
          "border-l-2 border-y-0 border-r-0 border-solid border-brand-primary bg-neutral-200 hover:bg-neutral-200":
            selected,
          // Root rows get a small start inset so the caret doesn't sit flush
          // against the panel's edge (logical property → mirrors in RTL).
          "ps-2": depth === "0",
        },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div
        className={SubframeUtils.twClassNames(
          "flex items-center self-stretch",
          {
            "w-20 flex-none border-r border-solid border-neutral-300/30":
              depth === "4",
            "w-[60px] flex-none border-r border-solid border-neutral-300/30":
              depth === "3",
            "w-10 flex-none border-r border-solid border-neutral-300/30":
              depth === "2",
            "w-5 flex-none border-r border-solid border-neutral-300/30":
              depth === "1",
          }
        )}
      />
      <div className="flex w-5 flex-none items-center justify-center self-stretch">
        <span
          className={SubframeUtils.twClassNames(
            "hidden font-body text-[11px] font-[400] leading-[11px] text-neutral-400 select-none",
            { inline: expanded }
          )}
        >
          ▾
        </span>
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[11px] font-[400] leading-[11px] text-neutral-400 select-none",
            { hidden: leaf || expanded }
          )}
        >
          ▸
        </span>
      </div>
      <div className="flex w-5 flex-none items-center justify-center self-stretch">
        <div
          className={SubframeUtils.twClassNames(
            "flex h-3 w-3 flex-none items-center justify-center rounded-sm border border-solid border-neutral-400",
            {
              "border border-dashed border-neutral-400":
                nodeType === "component",
              "rounded-[9999px]": nodeType === "group",
            }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-body text-[7px] font-[700] leading-[7px] text-neutral-400 select-none",
              { inline: nodeType === "text" }
            )}
          >
            T
          </span>
        </div>
      </div>
      {name ? (
        <span className="grow shrink-0 basis-0 whitespace-nowrap font-body text-[13px] font-[500] leading-[13px] text-default-font overflow-hidden text-ellipsis ml-1.5 select-none">
          {name}
        </span>
      ) : null}
      <div
        className={SubframeUtils.twClassNames(
          "hidden items-center gap-1 self-stretch pr-2 group-hover/34f92f71:flex",
          { flex: locked || visible || selected }
        )}
      >
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[11px] font-[400] leading-[11px] text-neutral-400 cursor-pointer select-none",
            { hidden: visible }
          )}
        >
          ○
        </span>
        <span
          className={SubframeUtils.twClassNames(
            "hidden font-body text-[11px] font-[400] leading-[11px] text-neutral-400 cursor-pointer select-none",
            { inline: visible }
          )}
        >
          ●
        </span>
        <span
          className={SubframeUtils.twClassNames(
            "hidden items-center justify-center text-neutral-400 cursor-pointer select-none",
            { inline: locked }
          )}
          aria-label="locked"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
});

export const LayerTreeRow = LayerTreeRowRoot;
