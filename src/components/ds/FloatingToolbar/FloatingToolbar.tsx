"use client";

/**
 * FloatingToolbar — a compact capsule (22px radius) of glass that floats over
 * content. Actions are rounded-sm so members keep their own identity inside
 * the pill-shaped toolbar (per the laid-objects doctrine); Rule separates
 * action groups with a hairline divider.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface ActionProps extends React.HTMLAttributes<HTMLDivElement> {
  glyph?: React.ReactNode;
  label?: React.ReactNode;
  tone?: "default" | "destructive";
  disabled?: boolean;
  className?: string;
}

const Action = React.forwardRef<HTMLDivElement, ActionProps>(function Action(
  {
    glyph,
    label,
    tone = "default",
    disabled = false,
    className,
    ...otherProps
  }: ActionProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/644741c6 flex flex-none cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-1.5 hover:bg-default-font/[0.05] active:bg-default-font/[0.09]",
        {
          "opacity-40 hover:bg-transparent": disabled,
          "text-destructive-500 hover:bg-destructive-500/[0.05] active:bg-destructive-500/[0.08]":
            tone === "destructive",
        },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {glyph ? (
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[13px] font-[400] leading-[13px] text-default-font",
            { "text-destructive-500": tone === "destructive" }
          )}
        >
          {glyph}
        </span>
      ) : null}
      {label ? (
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[13px] font-[600] leading-[13px] text-default-font",
            { "text-destructive-500": tone === "destructive" }
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
});

export interface RuleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Rule = React.forwardRef<HTMLDivElement, RuleProps>(function Rule(
  { className, ...otherProps }: RuleProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-5 w-px items-start bg-default-border",
        className
      )}
      ref={ref}
      {...otherProps}
    />
  );
});

export interface FloatingToolbarRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const FloatingToolbarRoot = React.forwardRef<
  HTMLDivElement,
  FloatingToolbarRootProps
>(function FloatingToolbarRoot(
  { children, className, ...otherProps }: FloatingToolbarRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex items-center gap-1 rounded-[22px] border border-solid border-[#ffffff33] px-2 py-1.5 shadow-glass-surface relative max-w-full min-w-0 bg-panel/50 backdrop-blur-[28px] backdrop-saturate-[135%]",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex items-start rounded-[22px] pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_26%,rgba(255,255,255,0.04)_44%,rgba(255,255,255,0)_60%)]" />
      <div className="flex items-start rounded-[22px] pointer-events-none absolute inset-0 bg-[linear-gradient(340deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.07)_22%,rgba(255,255,255,0)_42%)]" />
      {children ? (
        <div className="flex flex-wrap items-center justify-center gap-1 relative z-[1] min-w-0">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const FloatingToolbar = Object.assign(FloatingToolbarRoot, {
  Action,
  Rule,
});
