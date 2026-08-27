"use client";

/**
 * CrosshairTag — a chart inspection frame: crisp panel, hairline gridlines,
 * a quiet bar series and a full-height crosshair with a floating glass value
 * tag anchored above it. The frame itself stays plain (no blur) — glass is
 * reserved for the floating tag, per the system doctrine.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { GlassSurface, type GlassMaterialControls } from "@/lib/glass";

export interface CrosshairTagRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlassMaterialControls {
  value?: React.ReactNode;
  glyph?: React.ReactNode;
  timestamp?: React.ReactNode;
  /**
   * Horizontal anchor shared by the crosshair guideline and the glass value
   * tag — any CSS `left` value (a number is treated as px, a string is used
   * as-is, e.g. "62%" or "161px"). Defaults to the built-in "62%" anchor,
   * which sits on the tall bar of the fixed illustrative series in the
   * 260px frame; pass a bar-center position to snap the read-out to a
   * specific data bar.
   */
  crosshairPosition?: string | number;
  className?: string;
}

const CrosshairTagRoot = React.forwardRef<
  HTMLDivElement,
  CrosshairTagRootProps
>(function CrosshairTagRoot(
  {
    value,
    glyph,
    timestamp,
    crosshairPosition,
    className,
    material = "thick",
    intensity,
    stretchable = false,
    bounce,
    refraction,
    frost,
    finish,
    backdrop,
    ...otherProps
  }: CrosshairTagRootProps,
  ref
) {
  // Only override the default class-based anchor (`left-[62%]`) when a
  // position is supplied — an inline style wins over the utility class.
  const anchorStyle =
    crosshairPosition === undefined
      ? undefined
      : { left: crosshairPosition };
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-[150px] w-[260px] items-start overflow-hidden rounded-lg border border-solid border-default-border bg-panel relative",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-px grow shrink-0 basis-0 items-start bg-default-border absolute left-0 right-0 top-1/4" />
      <div className="flex h-px grow shrink-0 basis-0 items-start bg-default-border absolute left-0 right-0 top-1/2" />
      <div className="flex h-px grow shrink-0 basis-0 items-start bg-default-border absolute left-0 right-0 top-3/4" />
      <div className="flex h-7 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[30px]" />
      <div className="flex h-4 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute bottom-[20px] left-[44px]" />
      <div className="flex h-[34px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[58px]" />
      <div className="flex h-5 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute bottom-[20px] left-[72px]" />
      <div className="flex h-[26px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[86px]" />
      <div className="flex h-3.5 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute bottom-[20px] left-[100px]" />
      <div className="flex h-[30px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[114px]" />
      <div className="flex h-[18px] w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute bottom-[20px] left-[128px]" />
      <div className="flex h-[22px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[142px]" />
      <div className="flex h-[38px] w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[156px]" />
      <div className="flex h-3 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute bottom-[20px] left-[170px]" />
      <div className="flex h-6 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[184px]" />
      <div className="flex h-4 w-2.5 flex-none items-start rounded-[1px] bg-destructive-200 absolute bottom-[20px] left-[198px]" />
      <div className="flex h-8 w-2.5 flex-none items-start rounded-[1px] bg-success-200 absolute bottom-[20px] left-[212px]" />
      <div
        className="flex w-px flex-none items-start self-stretch bg-neutral-400 absolute left-[62%] top-0 bottom-0 -translate-x-1/2"
        style={anchorStyle}
      />
      <GlassSurface
        shape="free"
        radius={10}
        material={material}
        intensity={intensity}
        bounce={bounce}
        refraction={refraction}
        frost={frost}
        finish={finish}
        backdrop={backdrop}
        className="flex min-w-[96px] whitespace-nowrap flex-col items-start gap-0.5 px-3 py-2 absolute left-[62%] top-[26px] -translate-x-1/2"
        style={anchorStyle}
        stretchable={stretchable}
      >
        <div className="flex w-full gap-1 items-baseline relative">
          {value ? (
            <span className="font-code text-[16px] font-[700] leading-[24px] text-default-font tabular-nums">
              {value}
            </span>
          ) : null}
          {glyph ? (
            <span className="font-code text-[10px] font-[400] leading-[10px] text-success-600">
              {glyph}
            </span>
          ) : null}
        </div>
        {timestamp ? (
          <span className="w-full font-code text-[13px] font-[400] leading-[19px] text-neutral-500 tabular-nums relative">
            {timestamp}
          </span>
        ) : null}
        <div className="flex h-[9px] w-[9px] flex-none items-start border-r border-b border-solid border-[#ffffff33] bg-panel/72 absolute -bottom-[5px] left-1/2 -translate-x-1/2 rotate-45" />
      </GlassSurface>
    </div>
  );
});

export const CrosshairTag = CrosshairTagRoot;
