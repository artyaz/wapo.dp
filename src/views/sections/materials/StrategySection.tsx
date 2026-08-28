"use client";

/**
 * StrategySection — Materials §2 "Rendering strategies".
 *
 * The three-tier negotiation chain (SVG displacement → WebGL refraction →
 * backdrop-filter), a live detection panel reading the current browser, tier
 * comparison cards, the corrected negotiation contract, the degradation rule,
 * and the Chromium-tier layer anatomy. Monochrome and deterministic — every
 * "live" value is read from the glass runtime after mount, so SSR renders the
 * same quiet base state the runtime then promotes.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Link } from "@/components/site/HashRouter";
import { CodeBlock } from "@/components/site/CodeBlock";
import { StrategyBadge } from "@/components/site/StrategyBadge";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import {
  useGlassRuntime,
  isChromium,
  isSafari,
  isFirefox,
  webglAvailable,
  describeStrategy,
} from "@/lib/glass";
import type { GlassStrategy } from "@/lib/glass";

/* ------------------------------------------------------------------ */
/* Intro — the three-tier chain                                        */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
      <p>
        Liquid glass renders through a three-tier chain, negotiated per engine at
        runtime. Tier ① is{" "}
        <span className="font-medium text-default-font">SVG displacement</span>: on
        Chromium, an <Token>feDisplacementMap</Token> filter referenced from{" "}
        <Token>backdrop-filter: url(#…)</Token> bends the backdrop at the surface's
        edges — the kube.io technique — with chromatic aberration from per-channel
        displacement scales. Tier ② is{" "}
        <span className="font-medium text-default-font">WebGL refraction</span>: a
        shader lens built on the liquidGL contract — the primary tier on Safari and
        Firefox, and the universal middle tier for any engine that can hand us a GPU
        context. Tier ③ is plain <Token>backdrop-filter</Token> — blur and saturate
        only, the last resort everywhere.
      </p>
      <p>
        The negotiation is engine-gated with a safe fail direction. Detection reads
        user-agent client hints — <Token>isChromium()</Token>, <Token>isSafari()</Token>,{" "}
        <Token>isFirefox()</Token> — plus one WebGL context probe, and an engine that
        goes undetected falls through to the universal tiers rather than off a cliff:
        the chain always ends on a tier that renders. What the negotiation never does
        is ask <Token>CSS.supports("backdrop-filter", "url(#f)")</Token>. A support
        query tests parsing, not renderability — Safari parses url() filters happily
        and still won't render them inside backdrop-filter, so the query answers yes
        while the pixels stay flat.
      </p>
      <p>
        All three tiers implement one semantic contract: <Token>material</Token>,{" "}
        <Token>shape</Token> and <Token>intensity</Token> mean the same thing at every
        level, and only the implementation swaps. The panel below shows what the
        browser reading this page negotiated moments ago.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live detection panel                                                */
/* ------------------------------------------------------------------ */

interface EngineProbe {
  chromium: boolean;
  safari: boolean;
  firefox: boolean;
  webgl: boolean;
}

function BoolValue({ value }: { value: boolean | null }) {
  return (
    <span
      className={twClassNames(
        "font-code text-[12px] tabular-nums",
        value ? "text-default-font" : "text-neutral-400"
      )}
    >
      {value === null ? "—" : value ? "yes" : "no"}
    </span>
  );
}

function LiveDetectionPanel() {
  const strategy = useGlassRuntime((s) => s.strategy);
  const [probe, setProbe] = React.useState<EngineProbe | null>(null);

  React.useEffect(() => {
    setProbe({
      chromium: isChromium(),
      safari: isSafari(),
      firefox: isFirefox(),
      webgl: webglAvailable(),
    });
  }, []);

  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: "negotiated strategy", value: <StrategyBadge active /> },
    { label: "engine · chromium", value: <BoolValue value={probe?.chromium ?? null} /> },
    { label: "engine · safari", value: <BoolValue value={probe?.safari ?? null} /> },
    { label: "engine · firefox", value: <BoolValue value={probe?.firefox ?? null} /> },
    { label: "webgl context", value: <BoolValue value={probe?.webgl ?? null} /> },
  ];

  return (
    <Labeled label="This browser">
      <div className="max-w-xl rounded-lg border border-default-border bg-panel/60 px-5 py-4">
        <div className="flex flex-col divide-y divide-default-border">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
            >
              <span className="font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase select-none">
                {row.label}
              </span>
              {row.value}
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-default-border pt-3 font-code text-[11px] tracking-[0.04em] text-neutral-500 dark:text-neutral-500">
          {describeStrategy(strategy)}
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Tier comparison                                                     */
/* ------------------------------------------------------------------ */

interface TierCard {
  strategy: GlassStrategy;
  tier: string;
  name: string;
  engines: string;
  renders: string;
  surface: string;
  href: string;
}

const TIERS: TierCard[] = [
  {
    strategy: "svg-displacement",
    tier: "Tier ①",
    name: "SVG displacement",
    engines: "Chromium only — Chrome, Edge, Opera, Brave, Arc.",
    renders:
      "Displacement + chromatic aberration: an SVG filter bends the backdrop at the edges, per channel.",
    surface: "GlassDisplacement",
    href: "/components/glass-displacement",
  },
  {
    strategy: "webgl-refraction",
    tier: "Tier ②",
    name: "WebGL refraction",
    engines: "Safari and Firefox primary — and the universal middle tier for any engine with a WebGL context.",
    renders:
      "Shader lens + bevel over a rasterised backdrop, on the liquidGL contract.",
    surface: "GlassRefraction",
    href: "/components/glass-refraction",
  },
  {
    strategy: "backdrop-filter",
    tier: "Tier ③",
    name: "Backdrop filter",
    engines: "Everywhere — the last resort when nothing above negotiated.",
    renders: "Blur + saturate only. No displacement, no lens — still the same material.",
    surface: "GlassChip",
    href: "/components/glass-chip",
  },
];

function TierCards() {
  const live = useGlassRuntime((s) => s.strategy);

  return (
    <Labeled label="The three tiers">
      <div className="grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => {
          const active = live === t.strategy;
          return (
            <div
              key={t.strategy}
              className={twClassNames(
                "flex flex-col gap-4 rounded-lg border p-5",
                active ? "border-neutral-400" : "border-default-border",
                "bg-panel/60"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                  {t.tier}
                </span>
                <StrategyBadge strategy={t.strategy} active={active} />
              </div>
              <h3 className="text-heading-3 font-heading-3 text-default-font">
                {t.name}
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="font-code text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                    Engine coverage
                  </div>
                  <p className="mt-1 text-body-medium text-neutral-600 dark:text-neutral-500">
                    {t.engines}
                  </p>
                </div>
                <div>
                  <div className="font-code text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                    Renders
                  </div>
                  <p className="mt-1 text-body-medium text-neutral-600 dark:text-neutral-500">
                    {t.renders}
                  </p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-default-border pt-4">
                <span className="font-code text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                  Canonical surface
                </span>
                <Link
                  to={t.href}
                  className="inline-flex items-center gap-1.5 font-code text-[12px] font-medium text-default-font underline decoration-default-border underline-offset-4 hover:decoration-default-font"
                >
                  {t.surface}
                  <span aria-hidden="true" className="text-neutral-400">
                    →
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* The negotiation code                                                */
/* ------------------------------------------------------------------ */

const NEGOTIATION_CODE = `let strategy = 'backdrop-filter';
if (isChromium()) {
  strategy = 'svg-displacement';
} else {
  try {
    const lens = createLiquidGlass({ target: el, snapshot: 'body' });
    strategy = 'webgl-refraction';
  } catch {
    // WebGL unavailable OR shader failed → stay on backdrop-filter
  }
}`;

function NegotiationCode() {
  return (
    <Labeled label="The negotiation">
      <div className="flex flex-col gap-4">
        <CodeBlock code={NEGOTIATION_CODE} filename="negotiate.ts" />
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          SSR renders the base tier; the runtime promotes after hydration. There is
          no navigator and no GPU on the server, so the first paint ships blur-based
          glass as the base state and opts into url() refraction only on a
          Chromium-positive signal — one promotion pass once the tree is live, no
          flash of missing material, no layout shift. The <Token>try/catch</Token>{" "}
          matters as much as the gate: a thrown{" "}
          <Token>liquidGL: WebGL unavailable</Token> or{" "}
          <Token>Shader failed</Token> leaves the surface on the frost it already
          has.
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Degradation rule                                                    */
/* ------------------------------------------------------------------ */

function DegradationRule() {
  return (
    <Note>
      <span className="font-medium text-default-font">
        Swap implementation, never semantics.
      </span>{" "}
      The material level stays constant across tiers — Regular is Regular whether
      the light bends through SVG, WebGL, or plain blur. Strategy-aware styling
      strips the CSS frost only when a tier fully owns rendering; a failed url()
      reference voids only its own layer, because the blur layer is declared
      separately underneath.
    </Note>
  );
}

/* ------------------------------------------------------------------ */
/* Layer anatomy — Chromium tier                                       */
/* ------------------------------------------------------------------ */

interface LayerBar {
  name: string;
  spec: string;
  kind: "content" | "light" | "displacement" | "base";
}

/** Top of the stack first — matches z-order, content floating at z-10. */
const LAYERS: LayerBar[] = [
  { name: "content", spec: "z-10", kind: "content" },
  { name: "rim + border ring", spec: "1px · lit", kind: "light" },
  { name: "dual sheen", spec: "2 gradients", kind: "light" },
  { name: "displacement layer", spec: "url(#)", kind: "displacement" },
  { name: "progressive frost", spec: "core 0.1x · rim 1x", kind: "base" },
];

function LayerAnatomy() {
  const last = LAYERS.length - 1;

  return (
    <Labeled label="Layer anatomy · Chromium tier">
      <div className="max-w-2xl">
        <div className="flex flex-col gap-1.5">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.name}
              className={twClassNames(
                "flex items-center justify-between gap-4 rounded-lg border px-4 py-2.5",
                layer.kind === "content" && "border-dashed border-neutral-400",
                layer.kind === "light" && "border-default-border bg-panel",
                layer.kind === "displacement" && "border-neutral-400 bg-panel",
                layer.kind === "base" && "border-default-border bg-panel"
              )}
              /* each rectangle nests inside the one below — the stack widens
                 toward its foundation */
              style={{ marginInline: `${(last - i) * 14}px` }}
            >
              <span className="flex items-baseline gap-2.5 font-code text-[12px] text-neutral-500 dark:text-neutral-500">
                <span className="text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                {layer.name}
              </span>
              <span className="font-code text-[12px] text-default-font">
                {layer.spec}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-caption text-neutral-500">
          Top of the stack first. Only the base blur and the displacement layer read
          the backdrop; rim and sheen draw light on top of it; content floats above
          the material at z-10.
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */

export function StrategySection() {
  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <LiveDetectionPanel />
      <TierCards />
      <NegotiationCode />
      <DegradationRule />
      <LayerAnatomy />
    </div>
  );
}
