"use client";

/**
 * TransportBar — a wide pill of floating glass (panel/60, 40px blur, 150%
 * saturation) carrying a full transport cluster: skip-back, play, skip-forward,
 * a hairline divider, tabular time readout, a speed selector and a record
 * toggle. Inline-flex and width-fit so it centers over media content.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { GlassSurface, type GlassMaterialControls } from "@/lib/glass";

export interface TransportBarRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlassMaterialControls {
  currentTime?: React.ReactNode;
  totalTime?: React.ReactNode;
  speed?: React.ReactNode;
  recording?: boolean;
  skipBackDisabled?: boolean;
  skipForwardDisabled?: boolean;
  className?: string;
}

const TransportBarRoot = React.forwardRef<
  HTMLDivElement,
  TransportBarRootProps
>(function TransportBarRoot(
  {
    currentTime,
    totalTime,
    speed,
    recording = false,
    skipBackDisabled = false,
    skipForwardDisabled = false,
    className,
    material,
    intensity,
    stretchable,
    bounce,
    ...otherProps
  }: TransportBarRootProps,
  ref
) {
  return (
    <GlassSurface
      shape="free"
      radius={24}
      material={material}
      intensity={intensity}
      stretchable={stretchable}
      bounce={bounce}
      className={SubframeUtils.twClassNames(
        "group/4d642c3c min-h-[76px] py-2 items-center gap-2 sm:gap-2.5 px-4 sm:px-6 inline-flex w-fit max-w-full transition-colors duration-150 relative",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 relative z-[1]">
        <div
          className={SubframeUtils.twClassNames(
            "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[9999px] border-2 border-solid border-default-border cursor-pointer transition-colors duration-150 hover:border-neutral-400 hover:text-default-font",
            { "opacity-30 cursor-default": skipBackDisabled }
          )}
        >
          <span className="font-body text-[14px] font-[400] leading-[14px] text-neutral-500">
            ⏮︎
          </span>
        </div>
        <div className="flex h-[54px] w-[54px] flex-none items-center justify-center rounded-[9999px] bg-brand-primary cursor-pointer transition-colors duration-150 hover:bg-neutral-800">
          <span className="font-body text-[17px] font-[400] leading-[17px] text-brand-primary-foreground">
            ▶︎
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[9999px] border-2 border-solid border-default-border cursor-pointer transition-colors duration-150 hover:border-neutral-400 hover:text-default-font",
            { "opacity-30 cursor-default": skipForwardDisabled }
          )}
        >
          <span className="font-body text-[14px] font-[400] leading-[14px] text-neutral-500">
            ⏭︎
          </span>
        </div>
        <div className="flex h-8 w-px flex-none items-start bg-default-border mx-2" />
        <div className="flex items-center whitespace-nowrap">
          {currentTime ? (
            <span className="text-code font-code text-default-font tabular-nums">
              {currentTime}
            </span>
          ) : null}
          <span className="text-code font-code text-neutral-400 tabular-nums">
            {" "}
            /{" "}
          </span>
          {totalTime ? (
            <span className="text-code font-code text-neutral-500 tabular-nums">
              {totalTime}
            </span>
          ) : null}
        </div>
        <div className="flex h-9 items-center rounded-sm border border-solid border-default-border px-3 cursor-pointer transition-colors duration-150 hover:border-neutral-400 hover:text-default-font">
          {speed ? (
            <span className="whitespace-nowrap font-code text-[12px] font-[400] leading-[12px] text-neutral-500">
              {speed}
            </span>
          ) : null}
          <span className="font-code text-[12px] font-[400] leading-[12px] text-neutral-500 ml-1">
            ▾
          </span>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[9999px] border-2 border-solid border-default-border cursor-pointer transition-colors duration-150 hover:border-neutral-400 hover:text-default-font",
            {
              "border-2 border-solid border-destructive-500 text-destructive-500 hover:border-destructive-500 hover:text-destructive-500":
                recording,
            }
          )}
        >
          <span
            className={SubframeUtils.twClassNames(
              "font-body text-[14px] font-[400] leading-[14px] text-default-font",
              { "text-destructive-500": recording }
            )}
          >
            ◉
          </span>
        </div>
      </div>
    </GlassSurface>
  );
});

export const TransportBar = TransportBarRoot;
