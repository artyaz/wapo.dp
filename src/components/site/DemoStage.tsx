"use client";

/**
 * DemoStage — the canonical backdrop for demonstrating glass.
 *
 * Per MaterialTokens R5: a bg-neutral-300 base with warm-gray radials
 * (rgba(160,155,145,0.25) / rgba(140,138,130,0.20)) — visible enough to prove
 * refraction, monochrome enough to respect the doctrine. Variants add text or
 * grid content because displacement is only provable over busy content.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";

export type DemoStageVariant = "plain" | "text" | "grid";

export interface DemoStageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DemoStageVariant;
  /** stage height class, e.g. "h-64" */
  height?: string;
  /** dark stage (for dark-mode material demos) */
  dark?: boolean;
  children?: React.ReactNode;
}

export function DemoStage({
  variant = "plain",
  height = "h-64",
  dark = false,
  className,
  children,
  ...rest
}: DemoStageProps) {
  return (
    <div
      className={twClassNames(
        "relative flex w-full items-center justify-center overflow-hidden rounded-lg",
        height,
        dark ? "bg-neutral-900" : "bg-neutral-300",
        className
      )}
      {...rest}
    >
      {/* canonical warm-gray radials */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(160,155,145,0.25)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_60%,rgba(140,138,130,0.20)_0%,transparent_55%)]" />

      {variant === "grid" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: `linear-gradient(to right, ${
              dark ? "rgba(255,255,255,0.10)" : "rgba(21,20,15,0.10)"
            } 1px, transparent 1px), linear-gradient(to bottom, ${
              dark ? "rgba(255,255,255,0.10)" : "rgba(21,20,15,0.10)"
            } 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      ) : null}

      {variant === "text" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none p-6"
        >
          <div className="grid h-full grid-cols-2 gap-x-8 gap-y-2 overflow-hidden sm:grid-cols-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <p
                key={i}
                className="truncate text-[12px] leading-[1.6] text-default-font/70"
              >
                The quick brown fox jumps over the lazy dog — specimen line{" "}
                {String(i + 1).padStart(2, "0")}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {children ? (
        <div className="relative flex items-center justify-center p-6">
          {children}
        </div>
      ) : null}
    </div>
  );
}
