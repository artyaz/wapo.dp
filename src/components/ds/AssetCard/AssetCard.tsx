"use client";

/**
 * AssetCard — a media library card: an 88px preview well whose body swaps by
 * kind (waveform for audio, filmstrip blocks for video, a ¶ glyph for text),
 * a mono duration chip in the corner, a hover-revealed drag-handle dot grid,
 * and filename + meta lines beneath.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { WaveformStrip } from "@/components/ds/WaveformStrip";

export interface AssetCardRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  kind?: "audio" | "video" | "text";
  title?: React.ReactNode;
  duration?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}

const AssetCardRoot = React.forwardRef<HTMLDivElement, AssetCardRootProps>(
  function AssetCardRoot(
    {
      kind = "audio",
      title,
      duration,
      meta,
      className,
      ...otherProps
    }: AssetCardRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/edbd3739 flex w-full flex-col items-start gap-1.5 rounded-lg border border-solid border-default-border bg-panel px-1.5 py-1.5 group/assetcard cursor-grab transition-colors duration-150 hover:border-neutral-400",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex h-[88px] w-full flex-none items-center justify-center overflow-hidden rounded-[4px] bg-neutral-50 relative">
          <div
            className={SubframeUtils.twClassNames(
              "flex grow shrink-0 basis-0 items-center self-stretch px-3",
              { hidden: kind === "text" || kind === "video" }
            )}
          >
            <WaveformStrip />
          </div>
          <div
            className={SubframeUtils.twClassNames(
              "hidden items-center gap-1 px-3",
              { flex: kind === "video" }
            )}
          >
            <div className="flex h-7 w-[50px] flex-none items-start rounded-[1px] bg-neutral-200" />
            <div className="flex h-7 w-[50px] flex-none items-start rounded-[1px] bg-neutral-200" />
            <div className="flex h-7 w-[50px] flex-none items-start rounded-[1px] bg-neutral-200" />
          </div>
          <span
            className={SubframeUtils.twClassNames(
              "hidden font-body text-[22px] font-[400] leading-[22px] text-neutral-400",
              { inline: kind === "text" }
            )}
          >
            ¶
          </span>
          <div className="flex items-center rounded-[2px] border border-solid border-default-border bg-panel px-1 py-px absolute bottom-1 right-1">
            {duration ? (
              <span className="font-code text-[10px] font-[400] leading-[14px] text-neutral-600 tabular-nums">
                {duration}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-center gap-[3px] absolute top-1.5 right-1.5 opacity-0 transition-opacity duration-150 group-hover/edbd3739:opacity-100">
            <div className="flex items-center gap-[3px]">
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
            </div>
            <div className="flex items-center gap-[3px]">
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
            </div>
            <div className="flex items-center gap-[3px]">
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
              <div className="flex h-0.5 w-0.5 flex-none items-start rounded-[9999px] bg-neutral-400" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start px-0.5 pb-0.5">
          {title ? (
            <span className="w-full whitespace-nowrap font-body text-[13px] font-[500] leading-[19px] text-default-font overflow-hidden text-ellipsis">
              {title}
            </span>
          ) : null}
          {meta ? (
            <span className="font-body text-[11px] font-[400] leading-[16px] text-neutral-500">
              {meta}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

export const AssetCard = AssetCardRoot;
