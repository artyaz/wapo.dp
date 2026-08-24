"use client";

/**
 * GeometrySection — the geometry half of Foundations: the 4px spacing grid
 * (working ruler + extended large-format keys), the two working radii plus
 * the glass shape vocabulary, the elevation doctrine (one cast shadow for
 * true overlays; glass edges — never shadows — for laid objects), the pinned
 * backdrop-blur ladder, and the motion rule.
 */

import type { CSSProperties } from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import { DemoStage } from "@/components/site/DemoStage";
import {
  BLUR_SCALE,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  SPACING_SCALE,
} from "@/lib/docs/foundations-data";

/* ------------------------------------------------------------------------ */
/* Display data — literal utility strings only, so Tailwind's scanner sees */
/* every class that can be applied.                                        */
/* ------------------------------------------------------------------------ */

/** The working steps of the 4px base grid, as drawn by the ruler. */
const SPACING_STEPS: { unit: string; px: number }[] = [
  { unit: "1", px: 4 },
  { unit: "2", px: 8 },
  { unit: "3", px: 12 },
  { unit: "4", px: 16 },
  { unit: "6", px: 24 },
  { unit: "8", px: 32 },
  { unit: "12", px: 48 },
  { unit: "16", px: 64 },
];

/** Utility class per blur stop of the pinned ladder. */
const BLUR_CLASSES: Record<string, string> = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

/** Utility class per shadow token. */
const SHADOW_CLASSES: Record<string, string> = {
  default: "shadow-default",
  "glass-specular": "shadow-glass-specular",
  "glass-hairline": "shadow-glass-hairline",
  "glass-surface": "shadow-glass-surface",
};

/** Token value lookup from the foundations data. */
const radiusValue = (name: string): string =>
  RADIUS_TOKENS.find((token) => token.name === name)?.value ?? "";

interface RadiusDemo {
  /** Token names shown above the box, e.g. "sm · md". */
  label: string;
  /** Value rendered inside the box. */
  value: string;
  /** Literal radius utility for the box itself. */
  className: string;
  /** Inline radius for shapes outside the token scale ("free"). */
  style?: CSSProperties;
  /** One-line role under the box. */
  role: string;
}

/** The two working radii (with their aliases), shown as bordered boxes. */
const WORKING_RADII: RadiusDemo[] = [
  {
    label: "sm · md",
    value: radiusValue("sm"),
    className: "rounded-sm",
    role: "Tight inline elements — badges, method chips, toolbar members.",
  },
  {
    label: "lg · xl",
    value: radiusValue("lg"),
    className: "rounded-lg",
    role: "Surfaces — cards, panels, fields and code panes.",
  },
];

/** The glass shape vocabulary (SHAPE_RADIUS: capsule / card / free). */
const GLASS_RADII: RadiusDemo[] = [
  {
    label: "capsule",
    value: radiusValue("capsule"),
    className: "rounded-[9999px]",
    role: "Laid objects and pills — never in-flow containers.",
  },
  {
    label: "card",
    value: radiusValue("card"),
    className: "rounded-[16px]",
    role: "The roundest anchored silhouette in the shape system.",
  },
  {
    label: "free",
    value: "custom px",
    className: "",
    style: { borderRadius: "24px" },
    role: "No pinned value — the surface's radius prop passes through.",
  },
];

/** shadow-default is the only token whose value forks between modes. */
const defaultShadow = SHADOW_TOKENS.find((token) => token.name === "default");

/** Widest extended spacing key, for the proportional bars. */
const maxExtendedPx =
  SPACING_SCALE.extended[SPACING_SCALE.extended.length - 1]?.px ?? 1280;

/** One bordered radius box with the value inside and its role beneath. */
function RadiusBox({ label, value, className, style, role }: RadiusDemo) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 font-code text-[11px] font-medium text-neutral-500">
        {label}
      </div>
      <div
        className={twClassNames(
          "flex h-20 items-center justify-center border border-default-border bg-panel",
          className
        )}
        style={style}
      >
        <span className="font-code text-[13px] text-neutral-500">{value}</span>
      </div>
      <p className="mt-2 text-caption text-neutral-400">{role}</p>
    </div>
  );
}

export function GeometrySection() {
  return (
    <div className="flex flex-col gap-12">
      {/* ------------------------------------------------------- Spacing */}
      <div className="flex flex-col gap-6">
        <h3 className="text-heading-3 font-heading-3 text-default-font">
          Spacing
        </h3>
        <p className="max-w-2xl text-body-medium text-neutral-600 dark:text-neutral-500">
          Every measurement in Praxis lands on a 4px base grid — Tailwind&apos;s
          standard spacing scale, where one utility unit is 4px (1 = 4px up to
          96 = 384px). Padding, gaps, sizing and layout offsets all snap to the
          same increments, so a dense table row and a spacious page sheet still
          share one rhythm. In practice the first sixteen units do almost all
          of the work; beyond 96 the scale exists for the large-format keys
          listed below.
        </p>

        <Labeled label="Base grid — 4px increments">
          <div className="flex flex-col gap-1.5">
            {SPACING_STEPS.map((step) => (
              <div key={step.px} className="flex items-center gap-3">
                <span className="w-10 shrink-0 text-right font-code text-[11px] text-neutral-400">
                  {step.px}px
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    className="h-3 rounded-[2px] bg-neutral-200"
                    style={{ width: step.px }}
                  />
                  <span className="font-code text-[11px] text-neutral-500">
                    {step.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 max-w-2xl text-caption text-neutral-400">
            {SPACING_SCALE.baseNote}
          </p>
        </Labeled>

        <Labeled label="Extended scale — 112 … 320">
          <div className="divide-y divide-default-border rounded-lg border border-default-border">
            {SPACING_SCALE.extended.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-4 px-4 py-2.5"
              >
                <span className="w-8 shrink-0 font-code text-[12px] text-default-font">
                  {entry.name}
                </span>
                <span className="w-14 shrink-0 font-code text-[12px] text-neutral-500">
                  {entry.value}
                </span>
                <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-[2px] bg-default-font/[0.06]">
                  <div
                    className="h-full rounded-[2px] bg-neutral-300"
                    style={{
                      width: `${(entry.px / maxExtendedPx) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right font-code text-[12px] text-neutral-400">
                  {entry.px}px
                </span>
              </div>
            ))}
          </div>
        </Labeled>
      </div>

      {/* -------------------------------------------------------- Radius */}
      <div className="flex flex-col gap-6">
        <h3 className="text-heading-3 font-heading-3 text-default-font">
          Radius
        </h3>
        <p className="max-w-2xl text-body-medium text-neutral-600 dark:text-neutral-500">
          Radii stay quiet. In-flow UI needs exactly two values:{" "}
          <Token>rounded-sm</Token> / <Token>rounded-md</Token> at 3px for tight
          inline elements, and <Token>rounded-lg</Token> /{" "}
          <Token>rounded-xl</Token> at 8px for surfaces. The glass vocabulary
          adds three shapes for laid objects — the capsule at 9999px, the card
          at 16px, and free, which passes through whatever radius the geometry
          demands. Capsules are reserved for laid objects and pills: a
          fully-rounded end says an object was placed on the page, not that the
          page grew around it.
        </p>

        <Labeled label="Working radii — in-flow UI">
          <div className="grid grid-cols-2 gap-4">
            {WORKING_RADII.map((radius) => (
              <RadiusBox key={radius.label} {...radius} />
            ))}
          </div>
        </Labeled>

        <Labeled label="Glass vocabulary — laid objects">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {GLASS_RADII.map((radius) => (
              <RadiusBox key={radius.label} {...radius} />
            ))}
          </div>
        </Labeled>
      </div>

      {/* --------------------------------------------- Elevation & shadows */}
      <div className="flex flex-col gap-6">
        <h3 className="text-heading-3 font-heading-3 text-default-font">
          Elevation &amp; shadows
        </h3>
        <p className="max-w-2xl text-body-medium text-neutral-600 dark:text-neutral-500">
          Elevation is rare, and it always means the same thing: a layer that
          genuinely floats. The one cast shadow, <Token>shadow-default</Token>,
          is reserved for true overlays — dialogs, popovers, menus. Laid glass
          objects cast no shadow at all: their height comes from refraction of
          the content behind them plus specular insets and a hairline rim —
          light catching an edge, never a shadow beneath it.{" "}
          <Token>shadow-default</Token> is also the only token in the system
          whose value forks between light and dark.
        </p>

        <Labeled label="Shadow tokens — on a neutral-100 field">
          <div className="rounded-lg bg-neutral-100 p-5">
            <p className="mb-4 font-code text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
              field · bg-neutral-100 · glass cards on a neutral-500/30 tint
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SHADOW_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className={twClassNames(
                    "rounded-lg p-4",
                    SHADOW_CLASSES[token.name],
                    token.name === "default" ? "bg-panel" : "bg-neutral-500/30"
                  )}
                >
                  <div className="font-code text-[12px] font-medium text-default-font">
                    shadow-{token.name}
                  </div>
                  <p className="mt-1.5 font-code text-[11px] leading-[1.7] break-words text-neutral-500">
                    {token.value}
                  </p>
                  <p className="mt-2.5 text-caption text-neutral-500">
                    {token.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Labeled>

        <Labeled label={"shadow-default — light & dark"}>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Forced light field — literal values, mode-independent. */}
            <div
              className="rounded-lg p-5"
              style={{ backgroundColor: "rgb(244 242 236)" }}
            >
              <div
                className="flex h-24 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "rgb(255 255 255)",
                  boxShadow: defaultShadow?.value,
                }}
              >
                <span
                  className="font-code text-[12px]"
                  style={{ color: "rgb(76 74 67)" }}
                >
                  light
                </span>
              </div>
              <p
                className="mt-3 font-code text-[11px] leading-[1.7] break-words"
                style={{ color: "rgb(110 107 98)" }}
              >
                {defaultShadow?.value}
              </p>
            </div>
            {/* Forced dark field — the .dark override value. */}
            <div
              className="rounded-lg p-5"
              style={{ backgroundColor: "rgb(21 21 19)" }}
            >
              <div
                className="flex h-24 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "rgb(42 41 38)",
                  boxShadow:
                    defaultShadow?.darkValue ?? defaultShadow?.value,
                }}
              >
                <span
                  className="font-code text-[12px]"
                  style={{ color: "rgb(196 192 182)" }}
                >
                  dark
                </span>
              </div>
              <p
                className="mt-3 font-code text-[11px] leading-[1.7] break-words"
                style={{ color: "rgb(168 164 155)" }}
              >
                {defaultShadow?.darkValue ?? defaultShadow?.value}
              </p>
            </div>
          </div>
        </Labeled>
      </div>

      {/* ------------------------------------------------- Backdrop blur */}
      <div className="flex flex-col gap-6">
        <h3 className="text-heading-3 font-heading-3 text-default-font">
          Backdrop blur
        </h3>
        <p className="max-w-2xl text-body-medium text-neutral-600 dark:text-neutral-500">
          Backdrop blur is pinned to a six-stop ladder — 4, 12, 16, 24, 40 and
          64px — instead of Tailwind&apos;s defaults, so CSS blur and the glass
          runtime&apos;s material ramp (16–56px, negotiated per engine) always
          speak the same units. Each square below sits over the same busy
          backdrop; the frosted stop is the only variable.
        </p>

        {/*
          The stage's content wrapper is a content-sized flex item, so a
          percentage-wide child would collapse it. The forwarded style makes
          the stage a block, which makes the inner w-full track definite while
          the six squares stay absolutely positioned across it.
        */}
        <DemoStage variant="text" height="h-56" style={{ display: "block" }}>
          <div className="relative h-44 w-full">
            {BLUR_SCALE.map((stop, index) => {
              const isAnchor = stop.name === "2xl";
              const left = `${(
                ((index + 0.5) / BLUR_SCALE.length) *
                100
              ).toFixed(2)}%`;
              return (
                <div
                  key={stop.name}
                  className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                  style={{ left }}
                >
                  <div
                    className={twClassNames(
                      "h-12 w-12 border shadow-glass-hairline",
                      BLUR_CLASSES[stop.name],
                      isAnchor
                        ? "border-default-font/60 bg-panel/60"
                        : "border-white/25 bg-panel/45"
                    )}
                  />
                  <span
                    className={twClassNames(
                      "font-code text-[10px] whitespace-nowrap",
                      isAnchor
                        ? "font-medium text-default-font"
                        : "text-default-font/70"
                    )}
                  >
                    {stop.name} · {stop.px}
                  </span>
                </div>
              );
            })}
          </div>
        </DemoStage>

        <Note>
          <Token>backdrop-blur-2xl</Token> (40px) is the Regular material
          anchor — the blur behind GlassChip, FloatingToolbar and most laid
          objects (Regular: blur 40 · saturation 150% · tint 60%). The runtime
          negotiates the material ramp per engine; this ladder is the pinned
          CSS scale beneath it.
        </Note>
      </div>

      {/* ------------------------------------------------------- Motion */}
      <Labeled label="Motion">
        <Note>
          Transitions touch color and opacity only — 150–200ms ease. Glass
          surfaces never animate blur or shadows: <Token>backdrop-filter</Token>{" "}
          and <Token>box-shadow</Token> stay off the transition list, and
          prefers-reduced-motion is respected throughout.
        </Note>
      </Labeled>
    </div>
  );
}
