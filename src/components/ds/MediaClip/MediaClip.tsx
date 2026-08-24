"use client";

/**
 * MediaClip — a timeline clip block that stretches to its lane: waveform body
 * for audio, filmstrip blocks for video, a caption line for text, with label
 * and duration chips pinned to opposite corners. Selected clips gain a 2px
 * brand border plus col-resize rails; locked clips dim under a 45° hatch.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { WaveformStrip } from "@/components/ds/WaveformStrip";

export interface MediaClipRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "audio" | "video" | "text";
  state?: "default" | "selected" | "locked";
  label?: React.ReactNode;
  duration?: React.ReactNode;
  caption?: React.ReactNode;
  className?: string;
}

const MediaClipRoot = React.forwardRef<HTMLDivElement, MediaClipRootProps>(
  function MediaClipRoot(
    {
      kind = "audio",
      state = "default",
      label,
      duration,
      caption,
      className,
      ...otherProps
    }: MediaClipRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/7e3041e1 flex h-full min-w-[200px] items-start overflow-hidden rounded-[3px] border border-solid border-default-border bg-panel group/mediaclip cursor-grab transition-all duration-150 relative focus-within:border-neutral-600",
          {
            "opacity-60": state === "locked",
            "border-2 border-solid border-brand-primary bg-default-background":
              state === "selected",
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "flex items-center py-1 absolute inset-0",
            { hidden: kind === "text" || kind === "video" }
          )}
        >
          <WaveformStrip />
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden items-center gap-1 px-1 py-1 absolute inset-0",
            { flex: kind === "video" }
          )}
        >
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-[26px] w-[46px] flex-none items-start rounded-[1px] bg-neutral-200" />
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden items-center gap-1.5 bg-neutral-100 px-2 py-1 absolute inset-0",
            { flex: kind === "text" }
          )}
        >
          <span className="text-caption font-caption text-neutral-500">¶</span>
          {caption ? (
            <span className="whitespace-nowrap text-caption font-caption text-default-font">
              {caption}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden items-start absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent_0px_3px,var(--color-neutral-300)_3px_4px)]",
            { flex: state === "locked" }
          )}
        />
        <div className="flex items-center rounded-[2px] bg-panel px-1.5 py-0.5 absolute top-1 left-1 max-w-[70%] z-10">
          {label ? (
            <span className="whitespace-nowrap font-body text-[11px] font-[600] leading-[14px] text-default-font">
              {label}
            </span>
          ) : null}
        </div>
        <div className="flex items-center rounded-[2px] bg-panel px-1.5 py-0.5 absolute top-1 right-1 z-10">
          {duration ? (
            <span className="font-code text-[10px] font-[400] leading-[14px] text-neutral-500 tabular-nums">
              {duration}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-1.5 flex-none items-center justify-center bg-brand-primary absolute left-0 top-0 bottom-0 cursor-col-resize z-20",
            { flex: state === "selected" }
          )}
        >
          <div className="flex h-4 w-px flex-none items-start bg-brand-primary-foreground" />
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-1.5 flex-none items-center justify-center bg-brand-primary absolute right-0 top-0 bottom-0 cursor-col-resize z-20",
            { flex: state === "selected" }
          )}
        >
          <div className="flex h-4 w-px flex-none items-start bg-brand-primary-foreground" />
        </div>
      </div>
    );
  }
);

export const MediaClip = MediaClipRoot;
