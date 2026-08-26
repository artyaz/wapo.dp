"use client";

/**
 * MaterialTokens — the live reference card for the material hierarchy:
 * a warm-gray test backdrop plus one glass Swatch per level (ultrathin,
 * thin, regular, thick) captioned with its exact tint · blur · saturate.
 * The busy backdrop (radial gradients + specimen text) renders as an
 * absolute layer BEHIND the swatches so every swatch demonstrates its
 * translucency over real content.
 */

import React from "react";
import * as SubframeUtils from "@/lib/subframe/utils";

export interface SwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: "ultrathin" | "thin" | "regular" | "thick";
  className?: string;
}

const Swatch = React.forwardRef<HTMLDivElement, SwatchProps>(function Swatch(
  { level = "thin", className, ...otherProps }: SwatchProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/63758c20 flex items-center gap-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div
        className={SubframeUtils.twClassNames(
          "flex h-10 w-48 mobile:w-36 flex-none items-center justify-center overflow-hidden rounded-[9999px] border border-solid border-[#ffffff33] shadow-glass-specular isolate relative bg-panel/50 backdrop-blur-[28px] backdrop-saturate-[135%]",
          {
            "bg-panel/72 backdrop-blur-[56px] backdrop-saturate-[165%]":
              level === "thick",
            "bg-panel/60 backdrop-blur-[40px] backdrop-saturate-[150%]":
              level === "regular",
            "bg-panel/40 backdrop-blur-[16px] backdrop-saturate-[120%]":
              level === "ultrathin",
          }
        )}
      >
        <div className="flex items-start rounded-[9999px] pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_26%,rgba(255,255,255,0.04)_44%,transparent_60%)]" />
        <div className="flex items-start rounded-[9999px] pointer-events-none absolute inset-0 bg-[linear-gradient(340deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.07)_22%,transparent_42%)]" />
      </div>
      <div className="flex flex-col items-start gap-0.5">
        <span className="font-body text-[11px] font-[600] leading-[14px] tracking-[0.14em] text-default-font uppercase select-none">
          {level === "thick"
            ? "THICK"
            : level === "regular"
            ? "REGULAR"
            : level === "ultrathin"
            ? "ULTRATHIN"
            : "THIN"}
        </span>
        <span className="font-code text-[11px] font-[400] leading-[16px] text-neutral-400 tabular-nums select-none">
          {level === "thick"
            ? "panel/72 · 56px · 165%"
            : level === "regular"
            ? "panel/60 · 40px · 150%"
            : level === "ultrathin"
            ? "panel/40 · 16px · 120%"
            : "panel/50 · 28px · 135%"}
        </span>
      </div>
    </div>
  );
});

export interface MaterialTokensRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const MaterialTokensRoot = React.forwardRef<
  HTMLDivElement,
  MaterialTokensRootProps
>(function MaterialTokensRoot(
  { className, ...otherProps }: MaterialTokensRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex flex-col items-start gap-6 rounded-2xl border border-solid border-default-border bg-neutral-100 px-8 py-7 mobile:px-5 mobile:py-5",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex flex-col items-start gap-1">
        <span className="text-heading-3 font-heading-3 text-default-font">
          Material Hierarchy
        </span>
        <span className="font-code text-[11px] font-[400] leading-[16px] text-neutral-400 tabular-nums select-none">
          backdrop-filter · laid-object surfaces
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-4 relative">
        {/* busy test backdrop — warm-gray radials + faint specimen text,
            layered BEHIND the swatches so translucency is provable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-2 -inset-y-2 flex-col gap-1.5 overflow-hidden rounded-lg bg-neutral-300/60 flex"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(160,155,145,0.25)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_60%,rgba(140,138,130,0.20)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-neutral-200/40" />
          <div className="relative flex flex-col gap-1.5 px-4 py-3">
            {[
              "specimen 01 — the quick brown fox",
              "specimen 02 — jumps over the lazy dog",
              "specimen 03 — laid-object surfaces",
              "specimen 04 — one substance, graded",
              "specimen 05 — tint · blur · saturate",
              "specimen 06 — quiet elevation by refraction",
            ].map((line) => (
              <span
                key={line}
                className="font-code text-[11px] font-[400] leading-[16px] text-default-font/50 select-none"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-3 relative">
          <Swatch level="ultrathin" />
          <Swatch level="thin" />
          <Swatch level="regular" />
          <Swatch level="thick" />
        </div>
      </div>
      <div className="flex w-full items-center border-t border-solid border-default-border pt-3">
        <span className="font-code text-[11px] font-[400] leading-[16px] text-neutral-400 tabular-nums select-none">
          tint · blur · saturate · rim 1px #fff/20% · specular inset · dual
          sheen
        </span>
      </div>
    </div>
  );
});

export const MaterialTokens = Object.assign(MaterialTokensRoot, {
  Swatch,
});
