"use client";

/**
 * StrategyBadge — reads the live negotiated strategy from the glass runtime.
 * Same visual language as the Subframe GlassMaterialProvider.StrategyBadge.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { useGlassRuntime } from "@/lib/glass";
import type { GlassStrategy } from "@/lib/glass";

const LABELS: Record<GlassStrategy, string> = {
  "svg-displacement": "SVG-DISPLACEMENT",
  "webgl-refraction": "WEBGL-REFRACTION",
  "backdrop-filter": "BACKDROP-FILTER",
};

export function StrategyBadge({
  strategy,
  active = false,
  className,
}: {
  strategy?: GlassStrategy;
  active?: boolean;
  className?: string;
}) {
  const live = useGlassRuntime((s) => s.strategy);
  const value = strategy ?? live;

  return (
    <div
      className={twClassNames(
        "inline-flex items-center gap-1.5 rounded-[9999px] border border-default-border px-2.5 py-1",
        { "border-neutral-400": active },
        className
      )}
    >
      <div
        className={twClassNames(
          "h-[5px] w-[5px] flex-none rounded-[9999px] bg-neutral-400",
          { "bg-default-font": active }
        )}
      />
      <span
        className={twClassNames(
          "font-code text-[11px] font-medium leading-[14px] tracking-[0.1em] text-neutral-400 uppercase select-none",
          { "text-default-font": active }
        )}
      >
        {LABELS[value]}
      </span>
    </div>
  );
}
