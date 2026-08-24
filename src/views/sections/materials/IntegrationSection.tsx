"use client";

/**
 * IntegrationSection — Materials §6 "Integration": the API reference for
 * consuming the material system. GlassSurface prop table with a live
 * three-shape example, the GlassRuntime / GlassMaterialProvider contract,
 * the corrected liquidGL facts (verified against v2.0.1), the honest
 * deviations note, and the layered mount contract as diagram + JSX.
 * Deterministic: every live value is read from the glass runtime after
 * mount, so SSR renders the same quiet base state the runtime promotes.
 */

import type { ReactNode } from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { CodeBlock } from "@/components/site/CodeBlock";
import { PropTable } from "@/components/site/PropTable";
import { DemoStage } from "@/components/site/DemoStage";
import { StrategyBadge } from "@/components/site/StrategyBadge";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import { GlassSurface, useGlassMaterial } from "@/lib/glass";
import type { PropDoc } from "@/lib/docs/types";

/* ------------------------------------------------------------------ */
/* 1 · Intro — runtime-agnostic components, app-side promotion         */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        Subframe-style components stay runtime-agnostic by construction. Every
        glass component carries the tier-3 base material itself — panel tint,
        frost, the 20% rim, the dual sheen — authored into its own classes, so
        it renders complete glass with no runtime at all. Around that base it
        keeps clean hook points: a root element that establishes isolation and
        clips to the radius, absolutely-positioned{" "}
        <Token>inset-0</Token> layer slots, and a content wrapper at{" "}
        <Token>z-10</Token>. That is the entire attachment surface a stronger
        tier needs. No component knows which browser it is running in; none
        ever should.
      </p>
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        Tier promotion is the application&rsquo;s job, and it happens once, at
        the root. The app wraps its shell in <Token>GlassRuntime</Token>; after
        hydration the runtime negotiates the strategy for the visiting engine
        and every <Token>GlassSurface</Token> beneath it swaps implementation —
        SVG displacement on Chromium, WebGL refraction on Safari and Firefox,
        plain backdrop-filter as the floor that always renders. This section is
        the reference for that contract: the <Token>GlassSurface</Token> API,
        the provider pair, the verified liquidGL facts the WebGL tier is built
        on, and the exact DOM a surface mounts.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · GlassSurface API                                                */
/* ------------------------------------------------------------------ */

const GLASS_SURFACE_PROPS: PropDoc[] = [
  {
    name: "material",
    type: '"ultrathin" | "thin" | "regular" | "thick"',
    default: "inherited",
    description:
      "Semantic thickness from the four-level ramp. Resolved per strategy into blur, saturate, tint and refraction strength. When omitted, inherits the level from GlassMaterialContext — the app root runs level=\"regular\".",
  },
  {
    name: "shape",
    type: '"capsule" | "card" | "free"',
    default: '"capsule"',
    description:
      "Preset geometry: capsule renders a 9999px pill, card a 16px radius. free defers to the radius prop for arbitrary corners.",
  },
  {
    name: "radius",
    type: "number",
    default: "—",
    description:
      'Corner radius in px, read only when shape="free". Feeds the CSS radius, the generated displacement-map geometry, and the WebGL shader\u2019s rounded-box SDF.',
  },
  {
    name: "intensity",
    type: '"subtle" | "medium" | "strong"',
    default: '"medium"',
    description:
      "Refraction fork for the displacement and WebGL tiers — the base B-channel displacement scale (subtle 5, medium 12, strong 20), with R \u00d71.25 and G \u00d70.83 derived from it.",
  },
  {
    name: "glass",
    type: "boolean",
    default: "true",
    description:
      "Opt into strategy promotion. false pins the surface to the tier-3 base material — exactly what SSR renders, and the escape hatch for reduced-transparency contexts.",
  },
  {
    name: "webglMode",
    type: '"full" | "edge"',
    default: '"edge"',
    description:
      'WebGL tier only. "edge" adds the bevel/refraction band over the live backdrop; "full" hands the whole material to the shader over a procedural backdrop (see backdrop).',
  },
  {
    name: "backdrop",
    type: "BackdropSpec",
    default: "—",
    description:
      'Procedural backdrop for webglMode="full": a base RGB fill plus two radial accents { x, y, radius, color }. Ignored on every other tier.',
  },
  {
    name: "as",
    type: '"div" | "header" | "nav" | "section" | "aside" | "footer"',
    default: '"div"',
    description:
      "Semantic element the root renders as — nav for docks, section for sheets, header for headers — without changing the material.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description:
      "Appended to the root\u2019s own surface classes (relative isolate overflow-hidden + tint) via twClassNames.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "—",
    description:
      "Content, mounted inside a relative z-10 flex wrapper above every material layer — crisp, never refracted.",
  },
  {
    name: "style",
    type: "CSSProperties",
    default: "—",
    description:
      "Spread onto the root after the surface\u2019s own borderRadius, tint and specular shadow, so overrides win.",
  },
];

const USAGE_CODE = `import { GlassSurface } from "@/lib/glass";
import { DemoStage } from "@/components/site/DemoStage";

<DemoStage variant="text" height="h-72">
  <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
    <GlassSurface material="regular" shape="capsule" className="h-12">
      <span className="w-full text-center font-code text-[11px] uppercase">
        Regular · capsule
      </span>
    </GlassSurface>

    <GlassSurface material="thick" shape="card" className="h-12">
      <span className="w-full text-center font-code text-[11px] uppercase">
        Thick · card
      </span>
    </GlassSurface>

    <GlassSurface material="thin" shape="free" radius={8} className="h-12">
      <span className="w-full text-center font-code text-[11px] uppercase">
        Thin · free r8
      </span>
    </GlassSurface>
  </div>
</DemoStage>`;

function SurfaceFigure({
  caption,
  surface,
}: {
  caption: string;
  surface: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {surface}
      <span className="font-code text-[11px] leading-4 text-neutral-400 tabular-nums select-none">
        {caption}
      </span>
    </div>
  );
}

function GlassSurfaceExample() {
  return (
    <DemoStage variant="text" height="h-72">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <SurfaceFigure
          caption='material="regular" · shape="capsule"'
          surface={
            <GlassSurface
              material="regular"
              shape="capsule"
              className="h-12 w-full"
            >
              <span className="w-full text-center font-code text-[11px] font-medium tracking-[0.1em] text-default-font/80 uppercase select-none">
                Regular · capsule
              </span>
            </GlassSurface>
          }
        />
        <SurfaceFigure
          caption='material="thick" · shape="card"'
          surface={
            <GlassSurface material="thick" shape="card" className="h-12 w-full">
              <span className="w-full text-center font-code text-[11px] font-medium tracking-[0.1em] text-default-font/80 uppercase select-none">
                Thick · card
              </span>
            </GlassSurface>
          }
        />
        <SurfaceFigure
          caption='material="thin" · shape="free" · radius={8}'
          surface={
            <GlassSurface
              material="thin"
              shape="free"
              radius={8}
              className="h-12 w-full"
            >
              <span className="w-full text-center font-code text-[11px] font-medium tracking-[0.1em] text-default-font/80 uppercase select-none">
                Thin · free r8
              </span>
            </GlassSurface>
          }
        />
      </div>
    </DemoStage>
  );
}

function GlassSurfaceApi() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        One component implements all three tiers. <Token>GlassSurface</Token>{" "}
        takes semantic props — <Token>material</Token>, <Token>shape</Token>,{" "}
        <Token>intensity</Token> — and resolves them against the negotiated
        strategy; every prop means the same thing at every tier, because the
        system swaps implementation, never semantics. Standard div attributes
        (<Token>id</Token>, <Token>data-*</Token>, <Token>aria-*</Token>) pass
        through to the root; <Token>children</Token> is re-typed to{" "}
        <Token>ReactNode</Token> and mounted in the crisp content layer.
      </p>
      <Labeled label="Props — GlassSurfaceProps">
        <PropTable props={GLASS_SURFACE_PROPS} />
      </Labeled>
      <Labeled label="Live — three surfaces over busy content">
        <div className="flex flex-col gap-3">
          <GlassSurfaceExample />
          <p className="text-caption text-neutral-500">
            Material levels are set explicitly per surface; the strategy is
            whichever tier this browser promoted after mount — each root
            records it on <Token>data-glass-surface</Token>.
          </p>
        </div>
      </Labeled>
      <Labeled label="Usage">
        <CodeBlock code={USAGE_CODE} filename="usage.tsx" />
      </Labeled>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Provider contract                                               */
/* ------------------------------------------------------------------ */

const PROVIDER_CODE = `// app root
<GlassRuntime level="regular">
  <AppShell>{children}</AppShell>
</GlassRuntime>

// any consumer — inherits level, reads the live tier
const { strategy, level } = useGlassMaterial();`;

function ProviderReadout() {
  const { strategy, level } = useGlassMaterial();

  return (
    <Labeled label="Live readout — this page">
      <div className="max-w-xl rounded-lg border border-default-border bg-panel/60 px-5 py-4">
        <div className="flex flex-col divide-y divide-default-border">
          <div className="flex items-center justify-between gap-4 py-2.5 first:pt-0">
            <span className="font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase select-none">
              useGlassMaterial().strategy
            </span>
            <span className="flex items-center gap-3">
              <span className="font-code text-[12px] text-default-font tabular-nums">
                {strategy}
              </span>
              <StrategyBadge active />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-2.5 last:pb-0">
            <span className="font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase select-none">
              useGlassMaterial().level
            </span>
            <span className="font-code text-[12px] text-default-font tabular-nums">
              {level}
            </span>
          </div>
        </div>
        <p className="mt-4 border-t border-default-border pt-3 font-code text-[11px] tracking-[0.04em] text-neutral-500 dark:text-neutral-500">
          app root — &lt;GlassRuntime level=&quot;regular&quot;&gt; · context
          value read live
        </p>
      </div>
    </Labeled>
  );
}

function ProviderContract() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        The provider pair is two components sharing one context.{" "}
        <Token>GlassRuntime</Token> mounts once at the app root: it negotiates
        the strategy in a post-hydration effect, exposes{" "}
        <Token>{"{ strategy, level }"}</Token> through{" "}
        <Token>GlassMaterialContext</Token>, and hosts{" "}
        <Token>{"<GlassFilters />"}</Token> — the page-level SVG defs the
        Chromium tier references. <Token>GlassMaterialProvider</Token> is the
        scoped sibling — the Subframe-ported component — for islands and demos
        that want to pin a level or override the strategy without touching the
        root; an explicit <Token>strategy</Token> prop wins, otherwise the
        negotiated one flows through. Any consumer reads the live pair with{" "}
        <Token>useGlassMaterial()</Token>; <Token>GlassSurface</Token> reads it
        too, so an omitted <Token>material</Token> inherits the
        provider&rsquo;s level.
      </p>
      <CodeBlock code={PROVIDER_CODE} filename="provider.tsx" />
      <ProviderReadout />
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        SSR renders the base tier, and that is the whole trick: there is no
        navigator and no GPU on the server, so first paint ships the tier-3
        frost — blur, saturate, tint, rim, sheen — which every engine draws
        identically. The promotion pass runs once the tree is live and swaps
        material implementations only where the negotiated tier wins; the
        content layer never moves, so there is never an unstyled flash and
        never a layout shift. Even the liquidGL contract&rsquo;s
        initialise-after-DOMContentLoaded requirement comes free: the React
        runtime mounts post-hydration by definition.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · The corrected liquidGL contract                                 */
/* ------------------------------------------------------------------ */

const CONTRACT_FACTS: Array<{ term: string; body: ReactNode }> = [
  {
    term: "createLiquidGlass({ target, snapshot })",
    body: (
      <>
        The factory form. <Token>target</Token> takes a selector string or an
        element reference; <Token>snapshot</Token> takes a selector string
        naming what would be rasterised —{" "}
        <Token>snapshot: &apos;body&apos;</Token> names the document body. It
        is not a boolean, and <Token>snapshot: true</Token> is not a call the
        library understands.
      </>
    ),
  },
  {
    term: "No internal fallback — it throws",
    body: (
      <>
        When every context type fails (webgl2 → webgl → experimental-webgl)
        the factory throws <Token>liquidGL: WebGL unavailable</Token>; a shader
        compile or link failure throws <Token>liquidGL: Shader failed</Token>.
        The library ships no CSS fallback of its own — degradation is 100% the
        integrator&rsquo;s job, via try/catch around the call.
      </>
    ),
  },
  {
    term: "window.__liquidGLNoWebGL__",
    body: (
      <>
        Does not exist. There is no global capability flag to poll — never
        gate on it. Capability is learned the honest way: call the factory
        and catch.
      </>
    ),
  },
  {
    term: "Radius is inherited, not configured",
    body: (
      <>
        Surfaces auto-inherit the target element&rsquo;s computed
        border-radius — including a radius that animates at runtime. The lens
        follows the geometry, re-reading and re-rendering as it changes.
      </>
    ),
  },
  {
    term: "Shared z-index rules",
    body: (
      <>
        The stacking slots around a lens are reserved: the shadow layer sits
        at <Token>z-index -2</Token>, the tilt layer at{" "}
        <Token>z-index -1</Token>. Keep those slots free when composing
        around a surface.
      </>
    ),
  },
];

const NEGOTIATION_CODE = `let strategy = 'backdrop-filter';
if (isChromium()) {
  strategy = 'svg-displacement';
} else {
  try {
    const lens = createLiquidGlass({ target: el, snapshot: 'body' });
    strategy = 'webgl-refraction';
  } catch {
    /* WebGL unavailable OR shader failed → stay on backdrop-filter */
  }
}`;

function LiquidGlContract() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        The WebGL tier is built on the liquidGL integration contract as
        verified against v2.0.1 — facts checked against the source, not the
        blog posts, each one correcting a piece of common misinformation. The
        API is small; every part of it bites.
      </p>
      <Labeled label="Verified facts">
        <div className="max-w-2xl divide-y divide-default-border rounded-lg border border-default-border bg-panel/60">
          {CONTRACT_FACTS.map((fact) => (
            <div key={fact.term} className="px-5 py-3.5">
              <div className="font-code text-[12px] font-medium text-default-font">
                {fact.term}
              </div>
              <p className="mt-1 text-body-medium text-neutral-600 dark:text-neutral-500">
                {fact.body}
              </p>
            </div>
          ))}
        </div>
      </Labeled>
      <CodeBlock code={NEGOTIATION_CODE} filename="negotiate.ts" />
      <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
        Our runtime adds one deliberate convenience: negotiation itself never
        throws. <Token>engine-detect</Token> probes WebGL with a throwaway
        canvas before a tier is chosen, so <Token>webgl-refraction</Token> is
        only picked when a context is known to exist — and every{" "}
        <Token>GlassSurface</Token> still wraps its own{" "}
        <Token>createLiquidGlass</Token> call in try/catch, because the
        contract is unambiguous: the factory throws, the integrator degrades.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Honest deviations                                               */
/* ------------------------------------------------------------------ */

function DeviationsNote() {
  return (
    <Note>
      <span className="font-medium text-default-font">
        Deviations, stated plainly.
      </span>{" "}
      This site&rsquo;s WebGL tier does not rasterise arbitrary DOM like the
      commercial library. In <Token>full</Token> mode the shader refracts a
      procedural backdrop — a base fill with two radial accents, the same
      warm-gray gradients every demo stage carries — and in <Token>edge</Token>{" "}
      mode it renders only the bevel band over the live page, interior
      transparent, so the base material shows through beneath. The{" "}
      <Token>backdrop-filter</Token> tier is untouched and universal: whatever
      the negotiation lands on, the tier-3 frost renders.
    </Note>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Component wiring — the layered mount contract                   */
/* ------------------------------------------------------------------ */

const WIRING_CHILDREN = [
  { name: "base blur layer", spec: "inset-0 · blur + saturate", kind: "base" },
  { name: "displacement layer", spec: "inset-0 · url(#filter)", kind: "displacement" },
  { name: "rim", spec: "1px · white/20", kind: "light" },
  { name: "dual sheen", spec: "160° key · 340° counter", kind: "light" },
  { name: "content", spec: "relative z-10", kind: "content" },
] as const;

function WiringDiagram() {
  return (
    <div className="overflow-hidden rounded-lg border border-default-border">
      {/* the root — outermost, first in source */}
      <div className="flex items-center justify-between gap-4 border-b border-default-border bg-neutral-100 px-4 py-2.5">
        <span className="flex items-baseline gap-2.5 font-code text-[12px] text-neutral-500 dark:text-neutral-500">
          <span className="text-neutral-400">01</span>
          root
        </span>
        <span className="font-code text-[11px] text-default-font">
          isolate · overflow-hidden · radius
        </span>
      </div>
      {/* the layers — siblings inside the root, in mount order */}
      <div className="flex flex-col gap-1.5 bg-panel/60 p-3">
        {WIRING_CHILDREN.map((layer, i) => (
          <div
            key={layer.name}
            className={twClassNames(
              "flex items-center justify-between gap-4 rounded-lg border px-3.5 py-2",
              layer.kind === "content" && "border-dashed border-neutral-400",
              layer.kind === "displacement" && "border-neutral-400",
              layer.kind === "light" && "border-default-border",
              layer.kind === "base" && "border-default-border"
            )}
          >
            <span className="flex items-baseline gap-2.5 font-code text-[12px] text-neutral-500 dark:text-neutral-500">
              <span className="text-neutral-400">
                {String(i + 2).padStart(2, "0")}
              </span>
              {layer.name}
            </span>
            <span className="font-code text-[11px] whitespace-nowrap text-default-font">
              {layer.spec}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOUNT_CODE = `// the mount contract every tier renders — source order
<Tag
  ref={rootRef}
  className="relative isolate overflow-hidden praxis-glass-tint"
  style={{ borderRadius: cssRadius, backgroundColor: tint, boxShadow: specular }}
>
  {/* base blur — the tier-3 material, kept beneath every stronger tier */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{ backdropFilter: "blur(40px) saturate(150%)" }}
  />

  {/* displacement — Chromium tier; bare url() on its own layer so a
     failed reference voids only this layer */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{ backdropFilter: \`url(#\${filterId})\` }}
  />

  {/* rim — 20% white */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
  />

  {/* dual sheen — 160° key light, 340° counter-sheen */}
  <div className="praxis-sheen-primary pointer-events-none absolute inset-0" />
  <div className="praxis-sheen-counter pointer-events-none absolute inset-0" />

  {/* content — above every material layer, always crisp */}
  <div className="relative z-10 flex w-full items-center">{children}</div>
</Tag>`;

function MountContract() {
  return (
    <Labeled label="Component wiring — the layered mount contract">
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Every tier mounts the same DOM — the diagram and the JSX below are
          one structure, in source order, outermost first. The root
          establishes the stacking context and clips every layer to the
          radius; the two <Token>inset-0</Token> backdrop layers read the page
          beneath; rim and sheen draw light on top of the material; content
          floats above it all at <Token>z-10</Token>. The displacement layer
          exists only on the Chromium tier, and because it carries a bare{" "}
          <Token>url()</Token> on its own layer, a failed reference voids
          that layer alone — the base blur declared underneath is what makes
          the failure quiet.
        </p>
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <WiringDiagram />
          <CodeBlock code={MOUNT_CODE} filename="mount-contract.tsx" />
        </div>
        <p className="text-caption text-neutral-500">
          Source order, root first — the numbering matches the JSX. Only the
          two backdrop layers read the page; light layers draw on top of the
          material; content is never refracted.
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */

export function IntegrationSection() {
  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <GlassSurfaceApi />
      <ProviderContract />
      <LiquidGlContract />
      <DeviationsNote />
      <MountContract />
    </div>
  );
}
