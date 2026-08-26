"use client";

/**
 * WaveformStrip — a deterministic waveform read-out: sixty fixed bars spread
 * along a flex row, mirrored around a center hairline and tinted through the
 * neutral ramp. Stretches to fill its container (h-full w-full).
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface WaveformStripRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const WaveformStripRoot = React.forwardRef<
  HTMLDivElement,
  WaveformStripRootProps
>(function WaveformStripRoot(
  { className, ...otherProps }: WaveformStripRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-full items-center overflow-hidden relative",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-px items-start bg-default-border absolute inset-x-0 top-1/2 -translate-y-1/2" />
      <div className="flex grow shrink-0 basis-0 items-center justify-between self-stretch gap-[1px]">
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[10%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[14%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[8%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[18%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[12%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[22%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[35%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[55%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[72%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[88%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[78%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[65%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[82%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[92%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[70%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[58%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[38%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[20%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[12%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[9%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[15%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[10%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[18%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[42%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[68%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[85%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[75%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[90%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[60%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[78%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[95%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[82%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[62%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[48%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[25%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[15%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[20%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[13%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[25%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[45%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[72%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[58%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[80%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[93%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[70%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[55%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-800 h-[85%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[65%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[42%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[28%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[18%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[10%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[15%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[8%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[22%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[35%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-700 h-[50%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-400 h-[30%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[12%]" />
        <div className="flex flex-1 min-w-0 max-w-[2px] items-start rounded-[1px] bg-neutral-300 h-[9%]" />
      </div>
    </div>
  );
});

export const WaveformStrip = WaveformStripRoot;
