"use client";

/**
 * MediaClip — a timeline clip block that stretches to its lane: waveform body
 * for audio, filmstrip blocks for video, a caption line for text. Audio/video
 * clips reserve a header row for the label and duration chips above the media
 * body, so chip text never sits on the waveform or filmstrip; the label chip
 * shares that row with the duration chip and truncates only once the row is
 * genuinely full — no arbitrary width caps, no wasted space. Text clips render
 * ¶, label, caption and duration as inline chips in one centered caption row,
 * so no text ever stacks on text. The clip keeps a 140px floor. Selected clips
 * gain a 2px brand border plus col-resize rails; locked clips dim under a 45°
 * hatch.
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

const FILMSTRIP_FRAMES = 8;

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
          "group/7e3041e1 flex h-full max-w-full min-w-[140px] flex-col overflow-hidden rounded-[3px] border border-solid border-default-border bg-panel group/mediaclip cursor-grab transition-all duration-150 relative focus-within:border-neutral-600",
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
        {/* header row — label + duration chips live above the media body */}
        {kind !== "text" && (label || duration) ? (
          <div className="flex flex-none items-center gap-1 px-1 pt-1 z-10">
            {label ? (
              <div className="flex min-w-0 items-center rounded-[2px] border border-solid border-default-border bg-panel px-1.5 py-0.5">
                <span className="truncate font-body text-[11px] font-[600] leading-[14px] text-default-font">
                  {label}
                </span>
              </div>
            ) : null}
            {duration ? (
              <div className="ms-auto flex flex-none items-center rounded-[2px] border border-solid border-default-border bg-panel px-1.5 py-0.5">
                <span className="font-code text-[10px] font-[400] leading-[14px] text-neutral-500 tabular-nums">
                  {duration}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
        <div
          className={SubframeUtils.twClassNames(
            "flex min-h-0 flex-1 items-center pb-1",
            { hidden: kind === "text" || kind === "video" }
          )}
        >
          <WaveformStrip />
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden min-h-0 flex-1 items-center gap-1 px-1 pb-1",
            { flex: kind === "video" }
          )}
        >
          {Array.from({ length: FILMSTRIP_FRAMES }).map((_, i) => (
            <div
              key={i}
              className="h-full min-w-0 max-w-[46px] flex-1 rounded-[1px] bg-neutral-200"
            />
          ))}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden min-h-0 flex-1 items-center gap-1.5 bg-neutral-100 px-2 py-1 z-10",
            { flex: kind === "text" }
          )}
        >
          <span className="flex-none text-caption font-caption text-neutral-500">
            ¶
          </span>
          {label ? (
            <span className="min-w-0 truncate rounded-[2px] border border-solid border-default-border bg-panel px-1.5 py-0.5 font-body text-[11px] font-[600] leading-[14px] text-default-font">
              {label}
            </span>
          ) : null}
          {caption ? (
            <span className="min-w-0 truncate text-caption font-caption text-default-font">
              {caption}
            </span>
          ) : null}
          {duration ? (
            <span className="ms-auto flex-none rounded-[2px] border border-solid border-default-border bg-panel px-1.5 py-0.5 font-code text-[10px] font-[400] leading-[14px] text-neutral-500 tabular-nums">
              {duration}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "hidden items-start absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent_0px_3px,var(--color-neutral-300)_3px_4px)]",
            { flex: state === "locked" }
          )}
        />
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
