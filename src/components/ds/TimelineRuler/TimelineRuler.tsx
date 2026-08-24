"use client";
/**
 * TimelineRuler — a fixed 2880px-wide time axis at 24 px/s: labeled major
 * ticks every 10 s (00:00-02:00), minor ticks every 2 s, and diamond event
 * markers above the baseline. Fully authored; nothing computed at runtime.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface TimelineRulerRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TimelineRulerRoot = React.forwardRef<
  HTMLDivElement,
  TimelineRulerRootProps
>(function TimelineRulerRoot(
  { className, ...otherProps }: TimelineRulerRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-[34px] w-[2880px] items-start shrink-0 relative",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[180px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[420px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[600px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[860px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[1100px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[1340px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[1620px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[1860px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[2140px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[2380px]">
        ◆
      </span>
      <span className="font-code text-[6px] font-[400] leading-[6px] text-neutral-400 absolute top-[2px] left-[2660px]">
        ◆
      </span>
      <div className="flex h-px items-start bg-default-border absolute bottom-0 inset-x-0" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-0" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-0 tabular-nums">
        00:00
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[48px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[96px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[144px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[192px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[240px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[240px] tabular-nums">
        00:10
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[288px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[336px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[384px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[432px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[480px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[480px] tabular-nums">
        00:20
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[528px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[576px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[624px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[672px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[720px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[720px] tabular-nums">
        00:30
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[768px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[816px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[864px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[912px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[960px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[960px] tabular-nums">
        00:40
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1008px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1056px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1104px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1152px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[1200px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[1200px] tabular-nums">
        00:50
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1248px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1296px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1344px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1392px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[1440px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[1440px] tabular-nums">
        01:00
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1488px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1536px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1584px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1632px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[1680px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[1680px] tabular-nums">
        01:10
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1728px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1776px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1824px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1872px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[1920px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[1920px] tabular-nums">
        01:20
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[1968px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2016px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2064px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2112px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[2160px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[2160px] tabular-nums">
        01:30
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2208px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2256px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2304px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2352px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[2400px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[2400px] tabular-nums">
        01:40
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2448px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2496px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2544px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2592px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[2640px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[2640px] tabular-nums">
        01:50
      </span>
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2688px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2736px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2784px]" />
      <div className="flex h-1.5 w-px flex-none items-start bg-neutral-300 absolute bottom-0 left-[2832px]" />
      <div className="flex h-3 w-px flex-none items-start bg-default-font absolute bottom-0 left-[2880px]" />
      <span className="font-code text-[10px] font-[400] leading-[10px] text-neutral-500 absolute bottom-[16px] left-[2880px] tabular-nums">
        02:00
      </span>
    </div>
  );
});

export const TimelineRuler = TimelineRulerRoot;
