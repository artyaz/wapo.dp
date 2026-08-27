"use client";

/**
 * GlassMaterialProvider — the real {strategy, level} context provider from the
 * MaterialTokens spec. Reads the negotiated strategy from the glass runtime
 * (an explicit `strategy` prop overrides it) and exposes the pair through
 * GlassMaterialContext; GlassSurface inherits the level and useGlassMaterial()
 * lets any consumer read both values. The provider itself renders as a plain
 * invisible wrapper — consumers own composition.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";
import {
  GlassMaterialContext,
  useGlassRuntime,
  type GlassStrategy,
  type MaterialLevel,
} from "@/lib/glass";

export interface StrategyBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  strategy?: GlassStrategy;
  active?: boolean;
  className?: string;
}

const StrategyBadge = React.forwardRef<HTMLDivElement, StrategyBadgeProps>(
  function StrategyBadge(
    {
      strategy = "backdrop-filter",
      active = false,
      className,
      ...otherProps
    }: StrategyBadgeProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/34ba0067 items-center gap-1.5 rounded-[9999px] border border-solid border-default-border px-2.5 py-1 inline-flex",
          { "border border-solid border-neutral-400": active },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "flex h-[5px] w-[5px] flex-none items-start rounded-[9999px] bg-muted-foreground",
            { "bg-default-font": active }
          )}
        />
        <span
          className={SubframeUtils.twClassNames(
            "font-body text-[11px] font-[600] leading-[14px] tracking-[0.1em] text-muted-foreground uppercase select-none",
            { "text-default-font": active }
          )}
        >
          {strategy === "webgl-refraction"
            ? "WEBGL-REFRACTION"
            : strategy === "svg-displacement"
            ? "SVG-DISPLACEMENT"
            : "BACKDROP-FILTER"}
        </span>
      </div>
    );
  }
);

export interface GlassMaterialProviderRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level?: MaterialLevel;
  /** optional override; otherwise the runtime-negotiated strategy */
  strategy?: GlassStrategy;
  children?: React.ReactNode;
  className?: string;
}

const GlassMaterialProviderRoot = React.forwardRef<
  HTMLDivElement,
  GlassMaterialProviderRootProps
>(function GlassMaterialProviderRoot(
  {
    level = "regular",
    strategy: strategyProp,
    children,
    className,
    ...otherProps
  }: GlassMaterialProviderRootProps,
  ref
) {
  const runtimeStrategy = useGlassRuntime((s) => s.strategy);

  const value = React.useMemo(
    () => ({ strategy: strategyProp ?? runtimeStrategy, level }),
    [strategyProp, runtimeStrategy, level]
  );

  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <GlassMaterialContext.Provider value={value}>
        {children ? (
          <div className="flex w-full flex-col items-start">{children}</div>
        ) : null}
      </GlassMaterialContext.Provider>
    </div>
  );
});

export const GlassMaterialProvider = Object.assign(GlassMaterialProviderRoot, {
  StrategyBadge,
});
