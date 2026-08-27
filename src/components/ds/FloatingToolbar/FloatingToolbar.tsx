"use client";

/**
 * FloatingToolbar — a compact capsule (22px radius) of glass that floats over
 * content. Actions are rounded-sm so members keep their own identity inside
 * the pill-shaped toolbar (per the laid-objects doctrine); Rule separates
 * action groups with a hairline divider.
 *
 * Sizing: the root is `w-max` + `max-w-full`, so the capsule keeps its
 * single-row natural width even when centered with the common
 * `left-1/2 -translate-x-1/2` pattern (shrink-to-fit would otherwise cap the
 * available width at half the surface and wrap into ragged rows). It only
 * wraps — evenly, centered — when the surface itself is narrower than the
 * content.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import { GlassSurface, type GlassMaterialControls } from "@/lib/glass";

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
  extends React.HTMLAttributes<HTMLDivElement>,
    GlassMaterialControls {
  children?: React.ReactNode;
  className?: string;
}

const FloatingToolbarRoot = React.forwardRef<
  HTMLDivElement,
  FloatingToolbarRootProps
>(function FloatingToolbarRoot(
  {
    children,
    className,
    material,
    intensity,
    stretchable,
    bounce,
    refraction,
    frost,
    backdrop,
    ...otherProps
  }: FloatingToolbarRootProps,
  ref
) {
  return (
    // Shared GlassSurface runtime — kube.io liquid glass applied by default.
    <GlassSurface
      shape="free"
      radius={22}
      material={material}
      intensity={intensity}
      stretchable={stretchable}
      bounce={bounce}
      refraction={refraction}
      frost={frost}
      backdrop={backdrop}
      className={SubframeUtils.twClassNames(
        "flex w-max items-center gap-1 px-2 py-1.5 relative max-w-full min-w-0",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? (
        <div className="flex flex-wrap items-center justify-center gap-1 relative z-[1] min-w-0">
          {children}
        </div>
      ) : null}
    </GlassSurface>
  );
});

export const FloatingToolbar = Object.assign(FloatingToolbarRoot, {
  Action,
  Rule,
});
