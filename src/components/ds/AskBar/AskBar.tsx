"use client";

/**
 * AskBar — the assistant prompt bar: an embedded TextField flanked by a
 * voice-capture toggle and a primary submit action, fading into the page
 * background below via a subtle bottom gradient.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { TextField } from "@/components/ds/TextField";

export interface AskBarRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder"> {
  placeholder?: React.ReactNode;
  statusText?: React.ReactNode;
  recording?: boolean;
  className?: string;
}

const AskBarRoot = React.forwardRef<HTMLDivElement, AskBarRootProps>(
  function AskBarRoot(
    {
      placeholder,
      statusText,
      recording = false,
      className,
      ...otherProps
    }: AskBarRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/5fc66882 flex w-full flex-col items-center px-4 pt-6 pb-[26px] bg-gradient-to-b from-transparent to-default-background",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {statusText ? (
          <span className="w-full text-caption font-caption text-neutral-500 pb-2">
            {statusText}
          </span>
        ) : null}
        <div className="flex w-full items-center gap-2">
          <TextField label="" helpText="" className="min-w-0 flex-1">
            <TextField.Input placeholder={placeholder} value="" />
          </TextField>
          <div
            className={SubframeUtils.twClassNames(
              "flex h-[46px] w-[46px] flex-none items-center justify-center rounded-sm border-2 border-solid border-default-border bg-panel relative cursor-pointer hover:bg-neutral-100 hover:border-neutral-400 active:bg-neutral-200",
              {
                "border-2 border-solid border-destructive-500 hover:bg-destructive-50 hover:border-destructive-500 active:bg-destructive-100":
                  recording,
              }
            )}
          >
            <span
              className={SubframeUtils.twClassNames(
                "font-body text-[15px] font-[400] leading-[15px] text-default-font",
                { invisible: recording }
              )}
            >
              ●
            </span>
            <span
              className={SubframeUtils.twClassNames(
                "font-body text-[15px] font-[400] leading-[15px] text-destructive-500 invisible absolute",
                { visible: recording }
              )}
            >
              ◼
            </span>
          </div>
          <div className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-sm border-2 border-solid border-brand-primary bg-brand-primary cursor-pointer hover:bg-neutral-800 hover:border-neutral-800 active:bg-neutral-700 active:border-neutral-700">
            <span className="font-body text-[19px] font-[400] leading-[19px] text-brand-primary-foreground">
              ↑
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export const AskBar = AskBarRoot;
