"use client";

/**
 * PlayerBar — a 28px-radius floating glass card (panel/60, 40px blur, 150%
 * saturation) for audio-style playback: a StatusBadge header row with position,
 * a two-line serif excerpt, prev / play / next controls and an outlined
 * "explain" action. It composes StatusBadge from the indicators family. The
 * card is fluid (w-full up to its max-width) so it never clips in narrow
 * specimen stages.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { StatusBadge } from "@/components/ds/StatusBadge";

export interface PlayerBarRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "live" | "idle";
  position?: React.ReactNode;
  excerpt?: React.ReactNode;
  explainLabel?: React.ReactNode;
  error?: React.ReactNode;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

const PlayerBarRoot = React.forwardRef<HTMLDivElement, PlayerBarRootProps>(
  function PlayerBarRoot(
    {
      tone = "live",
      position,
      excerpt,
      explainLabel,
      error,
      previousDisabled = false,
      nextDisabled = false,
      className,
      ...otherProps
    }: PlayerBarRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/f240b0b5 flex w-full max-w-[576px] flex-col items-start gap-2 rounded-[28px] border border-solid border-[#ffffff33] px-[18px] py-3.5 shadow-glass-surface bg-panel/60 backdrop-blur-[40px] backdrop-saturate-[150%] relative",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex items-start rounded-[28px] absolute inset-0 pointer-events-none bg-[linear-gradient(160deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_26%,rgba(255,255,255,0.04)_44%,transparent_60%)]" />
        <div className="flex items-start rounded-[28px] absolute inset-0 pointer-events-none bg-[linear-gradient(340deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.07)_22%,transparent_42%)]" />
        <div className="flex w-full flex-col items-start gap-2 relative z-[1]">
          <div className="flex w-full items-center gap-2.5">
            <StatusBadge tone="live">Live</StatusBadge>
            {position ? (
              <span className="font-body text-[11px] font-[400] leading-[14px] tracking-[0.08em] text-brand-secondary tabular-nums">
                {position}
              </span>
            ) : null}
            <div className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9999px] ml-auto cursor-pointer bg-brand-primary/[0.07] text-brand-secondary">
              <svg
                className="font-body text-[13px] font-[400] leading-[20px] text-brand-secondary"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 6 6 18M6 6l12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="1"
                />
              </svg>
            </div>
          </div>
          {excerpt ? (
            <p className="line-clamp-2 w-full font-prose text-[14px] font-[400] leading-[21px] text-default-font m-0 min-h-[2.9em]">
              {excerpt}
            </p>
          ) : null}
          <div className="flex w-full flex-wrap items-center gap-2.5">
            <div
              className={SubframeUtils.twClassNames(
                "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[9999px] border-2 border-solid border-default-border cursor-pointer text-default-font",
                { "opacity-30 cursor-default": previousDisabled }
              )}
            >
              <svg
                className="font-body text-[14px] font-[400] leading-[21px] text-default-font"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 12H5m0 0 5-5m-5 5 5 5M6 5v14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="1"
                />
              </svg>
            </div>
            <div className="flex h-[54px] w-[54px] flex-none items-center justify-center rounded-[9999px] border-2 border-solid border-brand-primary bg-brand-primary cursor-pointer text-brand-primary-foreground">
              <svg
                className="font-body text-[17px] font-[400] leading-[26px] text-brand-primary-foreground"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8 5.14v14l11-7z"
                  fill="currentColor"
                  fillOpacity="1"
                />
              </svg>
            </div>
            <div
              className={SubframeUtils.twClassNames(
                "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[9999px] border-2 border-solid border-default-border cursor-pointer text-default-font",
                { "opacity-30 cursor-default": nextDisabled }
              )}
            >
              <svg
                className="font-body text-[14px] font-[400] leading-[21px] text-default-font"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14m0 0-5-5m5 5-5 5m4-12v14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="1"
                />
              </svg>
            </div>
            <div className="flex grow shrink-0 basis-0 items-start min-w-0" />
            <div className="flex items-center gap-[7px] rounded-[22px] border-2 border-solid border-default-border px-4 py-[11px] cursor-pointer whitespace-nowrap">
              <svg
                className="font-body text-[14px] font-[400] leading-[21px] text-default-font"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  d="m12 2 1.09 3.26L16.36 4l-1.27 3.09 3.27.91-3.27 1.09L16.36 12l-3.09-1.27L12 14l-1.09-3.27L7.64 12l1.27-3.09L5.64 8l3.27-1.09L7.64 4l3.09 1.26z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="1"
                />
              </svg>
              {explainLabel ? (
                <span className="font-body text-[13px] font-[600] leading-[16px] text-default-font">
                  {explainLabel}
                </span>
              ) : null}
            </div>
          </div>
          {error ? (
            <span className="font-body text-[12px] font-[400] leading-[17px] text-destructive-500">
              {error}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

export const PlayerBar = PlayerBarRoot;
