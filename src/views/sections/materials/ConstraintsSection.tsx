"use client";

/**
 * ConstraintsSection — Materials §5 "Constraints & accessibility".
 *
 * The engineering reference for shipping glass: verified WCAG results per
 * material level (Thick passes AA everywhere with margin; Thin is the only
 * tier that can fail — 4.42:1 over black in light mode), the eight
 * operational constraints inherited from the liquidGL contract, the
 * prefers-reduced-transparency escape hatch, and the open dark-mode rim
 * question. Deterministic and monochrome — pass/risk marks carry warning
 * tones only as background tints, never as text color.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { CodeBlock } from "@/components/site/CodeBlock";
import { DemoStage } from "@/components/site/DemoStage";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import { GlassSurface } from "@/lib/glass";
import {
  MATERIAL_RAMP_DOCS,
  type MaterialLevelName,
} from "@/lib/docs/foundations-data";

/* ------------------------------------------------------------------ */
/* Intro — glass is an effect with operational costs                   */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
      <p>
        Glass is an effect, not a free material. Every translucent surface
        borrows legibility from whatever happens to sit behind it, GPU time
        from the compositor, and cooperation from the platform&rsquo;s
        rendering pipeline — and each of those loans can be called in. The
        material ramp buys contrast back with tint and blur, but it cannot
        repeal the physics: at the thin end of the ramp a near-black canvas
        drags default-font contrast below the WCAG AA bar, and at every
        rendering tier the platform imposes hard limits — snapshot timing,
        texture budgets, stacking orders — that no amount of token polish
        removes. This section is the bill for the effect, itemised.
      </p>
      <p>
        Everything below comes from the multi-round reviews of the material
        system — the same reviews that corrected the displacement-map
        encoding, pinned the Regular anchor and moved the{" "}
        <Token>url()</Token> filter onto its own failure domain. Each row was
        caught in a real browser, not reasoned about on paper. Read this
        section before shipping glass in production: the system is built so
        that respecting these limits is a matter of choosing the right level
        and the right tier, never of abandoning the material.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WCAG results — default-font contrast per material level             */
/* ------------------------------------------------------------------ */

/** HIG-style display names, matching the ramp table upstream. */
const LEVEL_NAMES: Record<MaterialLevelName, string> = {
  ultrathin: "UltraThin",
  thin: "Thin",
  regular: "Regular",
  thick: "Thick",
};

/** One level × mode cell of the WCAG table. */
interface WcagCell {
  /** Verified contrast ratio; "—" where the review did not quantify the cell. */
  ratio: string;
  /** One-line basis / pass-fail note. */
  note: string;
  verdict: "pass" | "risk";
  /** The single verified AA failure gets a quiet warning tint on the cell. */
  failed?: boolean;
}

/**
 * Verified findings from the material-system reviews. Thick: canonical font
 * 8.83–17.57:1, pessimistic bound 4.65–9.24:1, worst case a black backdrop —
 * AA everywhere with margin. Thin: 4.42:1 over black in light mode, the only
 * tier that can fail. Regular and UltraThin sit between the endpoints.
 */
const WCAG_RESULTS: Record<MaterialLevelName, { light: WcagCell; dark: WcagCell }> = {
  ultrathin: {
    light: { ratio: "—", note: "scrim tier — not a text surface", verdict: "risk" },
    dark: { ratio: "—", note: "scrim tier — not a text surface", verdict: "risk" },
  },
  thin: {
    light: {
      ratio: "4.42 : 1",
      note: "over black — below AA's 4.5 : 1",
      verdict: "risk",
      failed: true,
    },
    dark: {
      ratio: "—",
      note: "no verified failure — the case is light-mode-specific",
      verdict: "pass",
    },
  },
  regular: {
    light: { ratio: "—", note: "sits between Thin and Thick", verdict: "pass" },
    dark: { ratio: "—", note: "sits between Thin and Thick", verdict: "pass" },
  },
  thick: {
    light: {
      ratio: "9.24 : 1",
      note: "pessimistic bound · canonical font 17.57 : 1",
      verdict: "pass",
    },
    dark: {
      ratio: "4.65 : 1",
      note: "pessimistic bound · canonical font 8.83 : 1",
      verdict: "pass",
    },
  },
};

/** Rows in ramp order (UltraThin → Thick), tint pulled from the ramp data. */
const WCAG_ROWS: Array<{
  level: MaterialLevelName;
  tint: number;
  light: WcagCell;
  dark: WcagCell;
}> = MATERIAL_RAMP_DOCS.map((doc) => ({
  level: doc.level,
  tint: doc.tint,
  light: WCAG_RESULTS[doc.level].light,
  dark: WCAG_RESULTS[doc.level].dark,
}));

/** PASS/RISK mark — text in the default font color; warning tones appear
 *  only as background tints, never as text color. */
function VerdictMark({ verdict }: { verdict: "pass" | "risk" }) {
  return (
    <span
      className={twClassNames(
        "inline-flex items-center rounded-[4px] px-1.5 py-0.5 font-code text-[10px] font-medium tracking-[0.12em] text-default-font uppercase",
        verdict === "pass"
          ? "bg-default-font/[0.08]"
          : "bg-warning-700/15 dark:bg-warning-300/25"
      )}
    >
      {verdict === "pass" ? "PASS" : "RISK"}
    </span>
  );
}

function WcagCellTd({ cell }: { cell: WcagCell }) {
  return (
    <td
      className={twClassNames(
        "border-t border-solid border-default-border px-3 py-3 align-top",
        cell.failed && "bg-warning-50 dark:bg-warning-900/20"
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="font-code text-[12.5px] font-medium text-default-font tabular-nums">
          {cell.ratio}
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <VerdictMark verdict={cell.verdict} />
          <span className="text-caption text-neutral-500">{cell.note}</span>
        </div>
      </div>
    </td>
  );
}

function WcagResults() {
  return (
    <Labeled label="WCAG results — default-font contrast per level">
      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto rounded-lg border border-solid border-default-border">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-neutral-100">
                {["Level", "Light mode", "Dark mode"].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-solid border-default-border px-3 py-2.5 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WCAG_ROWS.map((row) => (
                <tr key={row.level}>
                  <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 align-top">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-body-medium font-medium text-default-font">
                        {LEVEL_NAMES[row.level]}
                      </span>
                      <span className="font-code text-[11px] text-neutral-400 tabular-nums">
                        panel/{row.tint}
                      </span>
                    </div>
                  </td>
                  <WcagCellTd cell={row.light} />
                  <WcagCellTd cell={row.dark} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-2xl text-caption text-neutral-500">
          Contrast of default-font text on the composited material over the
          worst-case backdrop — a black canvas under a light-mode surface.
          WCAG AA is 4.5 : 1 for body text (3 : 1 for large). Values are the
          review&rsquo;s verified measurements; Regular and UltraThin sit
          between the verified endpoints, and Thin is the only tier that can
          fail.
        </p>
        <Note>
          <span className="font-medium text-default-font">
            Thick-as-floor is a measured result, not a nickname.
          </span>{" "}
          It is the rationale for the legibility floor: Thick is the one level
          that clears AA everywhere — canonical font 8.83–17.57 : 1,
          pessimistic bound 4.65–9.24 : 1, worst case a black backdrop — which
          is why the ramp&rsquo;s contract reserves it for dialogs, drawers
          and anything that must be read. The review&rsquo;s standing
          guidance: don&rsquo;t put text-bearing Thin over near-black canvas
          in light mode — step the tint up, or move dense readouts to Thick.
        </Note>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Operational constraints — inherited from the liquidGL contract      */
/* ------------------------------------------------------------------ */

interface OperationalConstraint {
  /** The condition you will hit. */
  constraint: string;
  /** Why it happens. */
  detail: string;
  /** The rule that keeps you clear of it. */
  guidance: string;
}

const OPERATIONAL_CONSTRAINTS: OperationalConstraint[] = [
  {
    constraint: "Safari instability past ~50% of the viewport",
    detail:
      "Liquid elements wider or taller than roughly half the viewport destabilise Safari's compositing.",
    guidance:
      "Keep glass elements small — chips, toolbars, HUDs. Full-width surfaces run on the backdrop-filter tier.",
  },
  {
    constraint: "Instances must share z-index",
    detail:
      "Every liquidGL instance shares one z-index budget — shadow at −2, tilt at −1 — so the lens layers stack in a fixed order.",
    guidance:
      "Avoid stacking conflicts: don't nest liquid instances, and don't park unrelated layers on those indices.",
  },
  {
    constraint: "Fixed-position elements ignored during snapshotting",
    detail:
      "The backdrop snapshot walks the document but skips position: fixed chrome.",
    guidance:
      "Keep glass away from fixed chrome — fixed headers and toolbars never appear in the refracted backdrop.",
  },
  {
    constraint: "CSS animations are not refracted in real time",
    detail:
      "The snapshot is a still frame; content animating behind the lens does not update it.",
    guidance:
      "Register animated backdrops with registerDynamic(), or animate outside the glass.",
  },
  {
    constraint: "Images need CORS headers",
    detail:
      "Cross-origin imagery without CORS headers taints the snapshot canvas.",
    guidance:
      "Serve assets same-origin, or set crossOrigin attributes so the sample stays readable.",
  },
  {
    constraint: "Initialise after DOMContentLoaded",
    detail:
      "The snapshot needs the laid-out document; there is nothing to refract before it exists.",
    guidance:
      "The runtime mounts post-hydration — glass initialises after DOMContentLoaded, never during SSR.",
  },
  {
    constraint: "Very long pages can exceed GPU texture limits",
    detail: "A page long enough blows past the GPU's maximum texture size.",
    guidance:
      "Clamp resolution — cap the snapshot so the backing texture stays within limits.",
  },
  {
    constraint: "Platforms strip custom data-* attributes",
    detail:
      "Subframe-style platforms strip custom data-* attributes, so a marker the runtime writes into the DOM may not survive.",
    guidance:
      "The canvas slot marker is applied at integration time, not by the glass runtime.",
  },
];

function OperationalConstraints() {
  return (
    <Labeled label="Operational constraints — the liquidGL inheritance">
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The WebGL tier is built on the liquidGL contract and inherits its
          operational limits wholesale. These are the eight that survived the
          reviews into production doctrine — each phrased as the condition
          you will hit and the rule that keeps you clear of it. None of them
          is a style preference; they are facts about how browsers composite.
        </p>
        <div className="overflow-x-auto rounded-lg border border-solid border-default-border">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-neutral-100">
                {["Constraint", "Guidance"].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-solid border-default-border px-3 py-2.5 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OPERATIONAL_CONSTRAINTS.map((row) => (
                <tr key={row.constraint}>
                  <td className="border-t border-solid border-default-border px-3 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="font-body text-body-medium font-medium text-default-font">
                        {row.constraint}
                      </span>
                      <span className="max-w-md text-caption text-neutral-500">
                        {row.detail}
                      </span>
                    </div>
                  </td>
                  <td className="border-t border-solid border-default-border px-3 py-3 align-top text-body-medium text-neutral-600 dark:text-neutral-500">
                    {row.guidance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* prefers-reduced-transparency — the escape hatch                     */
/* ------------------------------------------------------------------ */

/** The rule, verbatim from src/app/globals.css. */
const REDUCED_TRANSPARENCY_CSS = `/* Honor reduced transparency where supported */
@media (prefers-reduced-transparency: reduce) {
  .praxis-glass-tint {
    background-color: color-mix(in srgb, var(--ds-color-panel) 92%, transparent) !important;
  }
}`;

function ReducedTransparencyDemo() {
  const [reduced, setReduced] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <DemoStage variant="text" height="h-80">
        <div className="flex w-full max-w-2xl flex-wrap items-stretch justify-center gap-5">
          <GlassSurface
            material="regular"
            shape="card"
            className="min-w-[190px] flex-1 p-4"
          >
            <div className="flex w-full flex-col gap-2">
              <span className="font-code text-[10px] font-medium tracking-[0.12em] text-default-font/60 uppercase">
                regular · panel/60
              </span>
              <p className="text-body-medium text-default-font">
                The material as authored — translucent over live content.
              </p>
            </div>
          </GlassSurface>
          <GlassSurface
            material="regular"
            shape="card"
            className="min-w-[190px] flex-1 p-4"
            /* the same mix the media-query rule applies — simulates the
               reduced-transparency outcome deterministically */
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--ds-color-panel) 92%, transparent)",
            }}
          >
            <div className="flex w-full flex-col gap-2">
              <span className="font-code text-[10px] font-medium tracking-[0.12em] text-default-font/60 uppercase">
                reduced transparency · panel/92
              </span>
              <p className="text-body-medium text-default-font">
                The same material under the query — semantics stay,
                translucency reduces.
              </p>
            </div>
          </GlassSurface>
        </div>
      </DemoStage>
      <div className="flex flex-col gap-1.5">
        <p className="font-code text-[11px] text-neutral-400 tabular-nums select-none">
          media query · this browser:{" "}
          {reduced === null ? "—" : reduced ? "on" : "off"}
        </p>
        <p className="max-w-2xl text-caption text-neutral-500">
          The right card simulates the query by applying the same 92% mix
          inline. With the preference enabled in your OS, both cards flatten
          to <Token>panel/92</Token> — the stylesheet rule outranks every
          inline tint, which is the whole point.
        </p>
      </div>
    </div>
  );
}

function ReducedTransparency() {
  return (
    <Labeled label="prefers-reduced-transparency — the escape hatch">
      <div className="flex flex-col gap-6">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Translucency is a comfort budget, not a contract. The base tier
          honors <Token>prefers-reduced-transparency</Token>: when the OS
          reports that a user wants less translucency, a single rule in{" "}
          <Token>globals.css</Token> raises the panel tint of every{" "}
          <Token>.praxis-glass-tint</Token> surface to 92% opacity, and the
          material becomes effectively opaque. The philosophy is the same as{" "}
          <Token>prefers-reduced-motion</Token> — reduce the stimulus, keep
          the semantics. A surface under the query still declares its{" "}
          <Token>material</Token>, <Token>shape</Token> and level; blur,
          saturation, sheen and rim all remain on it. Material semantics
          stay; translucency reduces.
        </p>
        <CodeBlock
          code={REDUCED_TRANSPARENCY_CSS}
          filename="globals.css"
          className="max-w-2xl"
        />
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The <Token>!important</Token> is load-bearing. GlassSurface applies
          each level&rsquo;s tint as an inline style —{" "}
          <Token>panel/40</Token> through <Token>panel/72</Token> — so a
          stylesheet rule that wants to flatten the whole ramp at once has to
          outrank all four. One selector, every level, 92%.
        </p>
        <ReducedTransparencyDemo />
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Dark mode — the open question                                       */
/* ------------------------------------------------------------------ */

function DarkModeOpenItem() {
  return (
    <Note tone="warning">
      <span className="font-medium text-default-font">
        Dark mode is an open question, judged per surface.
      </span>{" "}
      The 20% white rim that gives a glass surface its lit edge can bloom
      over dark content at demo scale — the same hairline that reads as an
      edge on a busy backdrop reads as a halo on a near-black one. §8.1&rsquo;s
      formal dark-mode visual pass — the rim-bloom judgment plus measured
      WCAG confirmation — remains the system architect&rsquo;s open item.
      Until it lands, consumers should eyeball rim weight per product
      surface.
    </Note>
  );
}

/* ------------------------------------------------------------------ */

export function ConstraintsSection() {
  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <WcagResults />
      <OperationalConstraints />
      <ReducedTransparency />
      <DarkModeOpenItem />
    </div>
  );
}
