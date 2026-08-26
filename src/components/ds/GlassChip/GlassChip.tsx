"use client";

/**
 * GlassChip — the canonical laid-object capsule: a pill of panel glass
 * (bg-panel/60 · backdrop-blur-2xl · backdrop-saturate-150) with a hairline
 * rim, specular inset shadows and dual gradient sheens. Actions and Rules
 * compose inside it to form floating toolbars and command strips.
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
        "group/6162f87c flex flex-none cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[9999px] px-2.5 py-1.5 transition-colors hover:bg-default-font/[0.05] active:bg-default-font/[0.09]",
        {
          "opacity-40 pointer-events-none hover:bg-transparent": disabled,
          "text-destructive-500 hover:bg-destructive-500/[0.07] active:bg-destructive-500/[0.12]":
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
            "font-body text-[13px] font-[400] leading-[13px] text-default-font select-none",
            { "text-destructive-500": tone === "destructive" }
          )}
        >
          {glyph}
        </span>
      ) : null}
      {label ? (
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[13px] font-[600] leading-[13px] text-default-font select-none",
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

export interface GlassChipRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const GlassChipRoot = React.forwardRef<HTMLDivElement, GlassChipRootProps>(
  function GlassChipRoot(
    { children, className, ...otherProps }: GlassChipRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "items-center gap-1 rounded-[9999px] border border-solid border-[#ffffff33] px-2 py-1.5 shadow-[0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_0px_#ffffff42,inset_0px_-1px_0px_0px_#ffffff1a] relative inline-flex max-w-full min-w-0 bg-panel/60 backdrop-blur-2xl backdrop-saturate-150",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex items-start rounded-[9999px] pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_26%,rgba(255,255,255,0.04)_44%,rgba(255,255,255,0)_60%)]" />
        <div className="flex items-start rounded-[9999px] pointer-events-none absolute inset-0 bg-[linear-gradient(340deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.07)_22%,rgba(255,255,255,0)_42%)]" />
        {children ? (
          <div className="flex flex-wrap items-center justify-center gap-1 relative min-w-0">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const GlassChip = Object.assign(GlassChipRoot, {
  Action,
  Rule,
});
