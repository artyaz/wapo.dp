"use client";

/**
 * UserMessage — the user's side of an AI chat thread.
 *
 * A right-aligned pill bubble in dark slate (#262626-class neutral-800)
 * anchored against the near-black chat canvas. High border-radius (18px with
 * a flattened bottom-right corner), 8px 16px internal padding, and a hard
 * ~78% width cap keep prompts compact and visually distinct from the agent's
 * left-anchored workspace — user intent reads as a series of quiet insets,
 * never as full-width blocks competing with the transcript.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface UserMessageRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders a compact 6px 12px variant for very short prompts. */
  density?: "regular" | "compact";
  /** Maximum width class before the bubble wraps. Defaults to 78% of canvas. */
  maxWidthClass?: string;
  children?: React.ReactNode;
  className?: string;
}

const UserMessageRoot = React.forwardRef<HTMLDivElement, UserMessageRootProps>(
  function UserMessageRoot(
    {
      density = "regular",
      maxWidthClass = "max-w-[78%]",
      children,
      className,
      ...otherProps
    }: UserMessageRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full justify-end",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          // isolate the message's own direction from the page's, so LTR
          // prompts keep trailing punctuation at the end under RTL locales
          // (and RTL prompts render correctly under LTR ones)
          dir="auto"
          className={SubframeUtils.twClassNames(
            // dark-slate pill over the near-black canvas; the flattened
            // bottom-right corner anchors it to the user's edge
            "rounded-[18px] rounded-br-[8px] bg-neutral-800 text-neutral-100",
            "w-fit min-w-0 whitespace-pre-wrap break-words",
            maxWidthClass,
            density === "compact"
              ? "px-3 py-1.5 text-[13px] leading-[20px]"
              : "px-4 py-2 text-[14px] leading-[22px]"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

export const UserMessage = UserMessageRoot;
