"use client";

/**
 * EditorTab — a file tab for the IDE pane: mono label, 16px glyph square,
 * optional split indicator, dirty dot and trailing slot. The active tab lifts
 * onto the panel background with hairline side separators and a brand rule
 * along its top edge; inactive tabs sit quiet in neutral-500.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface GlyphSquareProps extends React.HTMLAttributes<HTMLDivElement> {
  glyph?: React.ReactNode;
  className?: string;
}

const GlyphSquare = React.forwardRef<HTMLDivElement, GlyphSquareProps>(
  function GlyphSquare(
    { glyph, className, ...otherProps }: GlyphSquareProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex h-4 w-4 items-center justify-center rounded-[3px] border border-solid border-default-border",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {glyph ? (
          <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-400 select-none">
            {glyph}
          </span>
        ) : null}
      </div>
    );
  }
);

export interface EditorTabRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  glyph?: React.ReactNode;
  active?: boolean;
  dirty?: boolean;
  split?: boolean;
  trailing?: React.ReactNode;
  className?: string;
}

const EditorTabRoot = React.forwardRef<HTMLDivElement, EditorTabRootProps>(
  function EditorTabRoot(
    {
      label,
      glyph,
      active = false,
      dirty = false,
      split = false,
      trailing,
      className,
      ...otherProps
    }: EditorTabRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/5c17f3ef flex h-9 min-w-0 cursor-pointer items-center gap-2 border-b border-solid border-default-border px-3 relative text-neutral-500 hover:text-neutral-700",
          {
            "bg-panel border-solid border-default-border text-default-font border-b-0":
              active,
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "hidden h-0.5 items-start bg-brand-primary absolute top-0 left-0 right-0",
            { block: active }
          )}
        />
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-px flex-none items-start bg-default-border absolute top-0 bottom-0 left-0",
            { block: active }
          )}
        />
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-px flex-none items-start bg-default-border absolute top-0 bottom-0 right-0",
            { block: active }
          )}
        />
        <GlyphSquare glyph={glyph} />
        {label ? (
          <span
            className={SubframeUtils.twClassNames(
              "max-w-[160px] whitespace-nowrap font-code text-[13px] font-[400] leading-[13px] text-neutral-500 select-none overflow-hidden text-ellipsis",
              { "text-default-font": active }
            )}
          >
            {label}
          </span>
        ) : null}
        <span
          className={SubframeUtils.twClassNames(
            "hidden font-code text-[13px] font-[400] leading-[13px] text-neutral-400 select-none",
            { inline: split }
          )}
        >
          ⧉
        </span>
        <div
          className={SubframeUtils.twClassNames(
            "hidden h-1.5 w-1.5 flex-none items-start rounded-[9999px] bg-default-font",
            { flex: dirty }
          )}
        />
        {trailing ? (
          <div
            className={SubframeUtils.twClassNames("flex items-center", {
              hidden: dirty,
            })}
          >
            {trailing}
          </div>
        ) : null}
      </div>
    );
  }
);

export const EditorTab = Object.assign(EditorTabRoot, {
  GlyphSquare,
});
