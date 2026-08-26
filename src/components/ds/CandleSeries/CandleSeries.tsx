"use client";

/**
 * CandleSeries — a compact candlestick price chart: four hairline gridlines
 * with mono price labels over fourteen fixed OHLC candles (neutral wicks,
 * success/destructive bodies), a closing hairline, and a volume histogram
 * beneath. Authored at 224px wide — candles occupy the left ~190px and the
 * last ~34px form a quiet right-axis gutter for the price labels so gridline
 * text never collides with wicks or bodies. Fully static and deterministic.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface CandleSeriesRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CandleSeriesRoot = React.forwardRef<
  HTMLDivElement,
  CandleSeriesRootProps
>(function CandleSeriesRoot(
  { className, ...otherProps }: CandleSeriesRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex flex-col items-start gap-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-[130px] w-[224px] flex-none items-start relative">
        <div className="flex flex-col items-start justify-between absolute inset-0 pointer-events-none">
          <div className="flex h-px w-full flex-none items-center">
            <div className="flex h-px flex-1 items-start bg-default-border" />
            <span className="flex-none pl-[6px] font-code text-[9px] font-[400] leading-[9px] text-neutral-400 tabular-nums">
              108.0
            </span>
          </div>
          <div className="flex h-px w-full flex-none items-center">
            <div className="flex h-px flex-1 items-start bg-default-border" />
            <span className="flex-none pl-[6px] font-code text-[9px] font-[400] leading-[9px] text-neutral-400 tabular-nums">
              106.5
            </span>
          </div>
          <div className="flex h-px w-full flex-none items-center">
            <div className="flex h-px flex-1 items-start bg-default-border" />
            <span className="flex-none pl-[6px] font-code text-[9px] font-[400] leading-[9px] text-neutral-400 tabular-nums">
              105.0
            </span>
          </div>
          <div className="flex h-px w-full flex-none items-center">
            <div className="flex h-px flex-1 items-start bg-default-border" />
            <span className="flex-none pl-[6px] font-code text-[9px] font-[400] leading-[9px] text-neutral-400 tabular-nums">
              103.5
            </span>
          </div>
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[4px] top-0 bottom-0">
          <div className="flex h-16 w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[18px]" />
          <div className="flex h-5 w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[34px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[17px] top-0 bottom-0">
          <div className="flex h-[58px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[30px]" />
          <div className="flex h-4 w-2.5 flex-none items-start rounded-[1px] bg-destructive-500 absolute top-[42px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[30px] top-0 bottom-0">
          <div className="flex h-[70px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[22px]" />
          <div className="flex h-[26px] w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[30px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[43px] top-0 bottom-0">
          <div className="flex h-[52px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[40px]" />
          <div className="flex h-[18px] w-2.5 flex-none items-start rounded-[1px] bg-destructive-500 absolute top-[52px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[56px] top-0 bottom-0">
          <div className="flex h-[66px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[34px]" />
          <div className="flex h-[22px] w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[46px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[69px] top-0 bottom-0">
          <div className="flex h-[74px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[26px]" />
          <div className="flex h-7 w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[38px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[82px] top-0 bottom-0">
          <div className="flex h-14 w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[44px]" />
          <div className="flex h-3.5 w-2.5 flex-none items-start rounded-[1px] bg-destructive-500 absolute top-[56px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[95px] top-0 bottom-0">
          <div className="flex h-[62px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[38px]" />
          <div className="flex h-5 w-2.5 flex-none items-start rounded-[1px] bg-destructive-500 absolute top-[50px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[108px] top-0 bottom-0">
          <div className="flex h-[72px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[28px]" />
          <div className="flex h-6 w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[36px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[121px] top-0 bottom-0">
          <div className="flex h-20 w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[20px]" />
          <div className="flex h-[30px] w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[32px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[134px] top-0 bottom-0">
          <div className="flex h-[60px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[36px]" />
          <div className="flex h-[18px] w-2.5 flex-none items-start rounded-[1px] bg-destructive-500 absolute top-[48px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[147px] top-0 bottom-0">
          <div className="flex h-[68px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[30px]" />
          <div className="flex h-[22px] w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[40px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[160px] top-0 bottom-0">
          <div className="flex h-[54px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[42px]" />
          <div className="flex h-4 w-2.5 flex-none items-start rounded-[1px] bg-destructive-500 absolute top-[52px]" />
        </div>
        <div className="flex w-2.5 flex-none items-start absolute left-[173px] top-0 bottom-0">
          <div className="flex h-[76px] w-0.5 flex-none items-start bg-neutral-400 absolute left-[4px] top-[24px]" />
          <div className="flex h-[26px] w-2.5 flex-none items-start rounded-[1px] bg-success-500 absolute top-[34px]" />
        </div>
      </div>
      <div className="flex h-px w-[224px] flex-none items-start bg-default-border" />
      <div className="flex h-[18px] w-[224px] flex-none items-start relative">
        <div className="flex h-2.5 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[4px] bottom-0" />
        <div className="flex h-1.5 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute left-[17px] bottom-0" />
        <div className="flex h-3.5 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[30px] bottom-0" />
        <div className="flex h-2 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute left-[43px] bottom-0" />
        <div className="flex h-3 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[56px] bottom-0" />
        <div className="flex h-4 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[69px] bottom-0" />
        <div className="flex h-[5px] w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute left-[82px] bottom-0" />
        <div className="flex h-[9px] w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute left-[95px] bottom-0" />
        <div className="flex h-[11px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[108px] bottom-0" />
        <div className="flex h-[15px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[121px] bottom-0" />
        <div className="flex h-[7px] w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute left-[134px] bottom-0" />
        <div className="flex h-[13px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[147px] bottom-0" />
        <div className="flex h-1.5 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute left-[160px] bottom-0" />
        <div className="flex h-3 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute left-[173px] bottom-0" />
      </div>
    </div>
  );
});

export const CandleSeries = CandleSeriesRoot;
