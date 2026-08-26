"use client";

/**
 * TrackHeader — the fixed 180px label column for a timeline track: a type
 * glyph tile (♪ audio / ▣ video / ¶ text), the track name, M / S / L toggle
 * squares that fill brand-primary when engaged, and a static twelve-bar level
 * meter tinted through the neutral ramp.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface TrackHeaderRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  trackName?: React.ReactNode;
  trackType?: "audio" | "video" | "text";
  muted?: boolean;
  solo?: boolean;
  locked?: boolean;
  className?: string;
}

const TrackHeaderRoot = React.forwardRef<HTMLDivElement, TrackHeaderRootProps>(
  function TrackHeaderRoot(
    {
      trackName,
      trackType = "audio",
      muted = false,
      solo = false,
      locked = false,
      className,
      ...otherProps
    }: TrackHeaderRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/299fd65c flex w-[180px] flex-col items-start gap-2 bg-panel px-3 py-2.5",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex w-full items-center gap-2">
          <div className="flex h-5 w-5 flex-none items-center justify-center rounded-[3px] border border-solid border-default-border bg-panel">
            <span
              className={SubframeUtils.twClassNames(
                "font-body text-[11px] font-[400] leading-[11px] text-default-font select-none",
                { hidden: trackType === "text" || trackType === "video" }
              )}
            >
              ♪
            </span>
            <span
              className={SubframeUtils.twClassNames(
                "hidden font-body text-[11px] font-[400] leading-[11px] text-default-font select-none",
                { inline: trackType === "video" }
              )}
            >
              ▣
            </span>
            <span
              className={SubframeUtils.twClassNames(
                "hidden font-body text-[11px] font-[400] leading-[11px] text-default-font select-none",
                { inline: trackType === "text" }
              )}
            >
              ¶
            </span>
          </div>
          {trackName ? (
            <span className="grow min-w-0 basis-0 truncate font-body text-[13px] font-[500] leading-[13px] text-default-font">
              {trackName}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={SubframeUtils.twClassNames(
              "flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[2px] border border-solid border-default-border cursor-pointer transition-colors duration-150 hover:border-neutral-400",
              {
                "bg-brand-primary border border-solid border-transparent hover:border-transparent":
                  muted,
              }
            )}
          >
            <span
              className={SubframeUtils.twClassNames(
                "font-body text-[9px] font-[600] leading-[9px] text-neutral-500 select-none",
                { "text-brand-primary-foreground": muted }
              )}
            >
              M
            </span>
          </div>
          <div
            className={SubframeUtils.twClassNames(
              "flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[2px] border border-solid border-default-border cursor-pointer transition-colors duration-150 hover:border-neutral-400",
              {
                "bg-brand-primary border border-solid border-transparent hover:border-transparent":
                  solo,
              }
            )}
          >
            <span
              className={SubframeUtils.twClassNames(
                "font-body text-[9px] font-[600] leading-[9px] text-neutral-500 select-none",
                { "text-brand-primary-foreground": solo }
              )}
            >
              S
            </span>
          </div>
          <div
            className={SubframeUtils.twClassNames(
              "flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[2px] border border-solid border-default-border cursor-pointer transition-colors duration-150 hover:border-neutral-400",
              {
                "bg-brand-primary border border-solid border-transparent hover:border-transparent":
                  locked,
              }
            )}
          >
            <span
              className={SubframeUtils.twClassNames(
                "font-body text-[9px] font-[600] leading-[9px] text-neutral-500 select-none",
                { "text-brand-primary-foreground": locked }
              )}
            >
              L
            </span>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-brand-primary" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-brand-primary" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-brand-primary" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-brand-primary" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-700" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-700" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-500" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-500" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-300" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-200" />
          <div className="flex h-3 w-0.5 flex-none items-start rounded-[1px] bg-neutral-200" />
        </div>
      </div>
    );
  }
);

export const TrackHeader = TrackHeaderRoot;
