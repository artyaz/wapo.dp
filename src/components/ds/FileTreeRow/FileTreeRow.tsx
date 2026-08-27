"use client";

/**
 * FileTreeRow — a single row of an IDE file-tree sidebar: depth rails,
 * folder/file glyph, expand caret, git-status dot and unsaved-changes dot.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface FileTreeRowRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name?: React.ReactNode;
  nodeType?: "folder" | "ts" | "json" | "md" | "yml";
  depth?: "0" | "1" | "2" | "3" | "4";
  expanded?: boolean;
  selected?: boolean;
  gitStatus?: "none" | "modified" | "added" | "deleted";
  dirty?: boolean;
  disabled?: boolean;
  className?: string;
}

const FileTreeRowRoot = React.forwardRef<HTMLDivElement, FileTreeRowRootProps>(
  function FileTreeRowRoot(
    {
      name,
      nodeType = "ts",
      depth = "0",
      expanded = false,
      selected = false,
      gitStatus = "none",
      dirty = false,
      disabled = false,
      className,
      ...otherProps
    }: FileTreeRowRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/780ea589 relative flex h-7 w-full cursor-pointer items-center border-s-2 border-solid border-transparent hover:bg-default-background focus-within:border-neutral-600",
          {
            "opacity-40": disabled,
            "bg-brand-primary/5": selected,
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {/* Selected indicator: inset rounded bar at the leading edge (not a
            flush border) so it never collides with the container border. */}
        {selected ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-[3px] start-[3px] w-0.5 rounded-full bg-brand-primary"
          />
        ) : null}
        <div
          className={SubframeUtils.twClassNames(
            "flex items-center self-stretch",
            {
              "w-20 flex-none": depth === "4",
              "w-[60px] flex-none": depth === "3",
              "w-10 flex-none": depth === "2",
              "w-5 flex-none": depth === "1",
            }
          )}
        >
          <div
            className={SubframeUtils.twClassNames(
              "hidden w-5 flex-none items-start self-stretch border-e border-solid border-default-border",
              {
                flex:
                  depth === "4" ||
                  depth === "3" ||
                  depth === "2" ||
                  depth === "1",
              }
            )}
          />
          <div
            className={SubframeUtils.twClassNames(
              "hidden w-5 flex-none items-start self-stretch border-e border-solid border-default-border",
              { flex: depth === "4" || depth === "3" || depth === "2" }
            )}
          />
          <div
            className={SubframeUtils.twClassNames(
              "hidden w-5 flex-none items-start self-stretch border-e border-solid border-default-border",
              { flex: depth === "4" || depth === "3" }
            )}
          />
          <div
            className={SubframeUtils.twClassNames(
              "hidden w-5 flex-none items-start self-stretch border-e border-solid border-default-border",
              { flex: depth === "4" }
            )}
          />
        </div>
        {/* Expand caret — exactly one glyph per state: ▾ only while a folder
            is expanded, ▸ only while it is collapsed; files show none. */}
        <div className="flex w-5 flex-none items-center justify-center self-stretch">
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-body text-[11px] font-[400] leading-[11px] text-neutral-400 select-none",
              { inline: nodeType === "folder" && expanded }
            )}
          >
            ▾
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-body text-[11px] font-[400] leading-[11px] text-neutral-400 select-none",
              { inline: nodeType === "folder" && !expanded }
            )}
          >
            ▸
          </span>
        </div>
        {/* ms-1 keeps the glyph box clear of the previous depth's guide
            line, which otherwise runs collinear with its border. */}
        <div
          className={SubframeUtils.twClassNames(
            "ms-1 flex h-4 w-4 flex-none items-center justify-center rounded-[3px] border border-solid border-default-border",
            { hidden: nodeType === "folder" }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "font-code text-[10px] font-[400] leading-[10px] text-neutral-400 select-none",
              {
                hidden:
                  nodeType === "yml" ||
                  nodeType === "md" ||
                  nodeType === "json",
              }
            )}
          >
            #
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-code text-[10px] font-[400] leading-[10px] text-neutral-400 select-none",
              { inline: nodeType === "json" }
            )}
          >
            &#123; &#125;
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-code text-[10px] font-[400] leading-[10px] text-neutral-400 select-none",
              { inline: nodeType === "md" }
            )}
          >
            ¶
          </span>
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-code text-[10px] font-[400] leading-[10px] text-neutral-400 select-none",
              { inline: nodeType === "yml" }
            )}
          >
            ≡
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "ms-1 hidden h-4 w-4 flex-none items-center justify-center",
            { flex: nodeType === "folder" }
          )}
        >
          <span className="font-body text-[13px] font-[400] leading-[13px] text-neutral-400 select-none">
            ▪
          </span>
        </div>
        {name ? (
          <span
            className={SubframeUtils.twClassNames(
              "grow shrink-0 basis-0 whitespace-nowrap text-code font-code text-default-font overflow-hidden text-ellipsis ms-1.5 select-none",
              {
                "font-body font-[500] leading-[19px]":
                  nodeType === "folder",
              }
            )}
          >
            {name}
          </span>
        ) : null}
        <div className="flex items-center gap-1.5 self-stretch pe-2.5">
          <div
            className={SubframeUtils.twClassNames(
              "hidden h-1.5 w-1.5 flex-none items-start rounded-[9999px] bg-destructive-500",
              {
                flex: gitStatus === "deleted",
                "flex bg-success-500": gitStatus === "added",
                "flex bg-warning-500": gitStatus === "modified",
              }
            )}
          />
          <div
            className={SubframeUtils.twClassNames(
              "hidden h-1.5 w-1.5 flex-none items-start rounded-[9999px] bg-default-font",
              { flex: dirty }
            )}
          />
        </div>
      </div>
    );
  }
);

export const FileTreeRow = FileTreeRowRoot;
