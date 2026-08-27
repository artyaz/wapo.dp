"use client";

/**
 * DisplacementSection — Materials §4 "Displacement maps".
 *
 * The technical heart of the Chromium tier: the R/G offset encoding, a live
 * map visualiser (the real generateDisplacementMap bitmap plus a probeField
 * vector overlay on a 12×6 grid), the chromatic-aberration filter
 * construction, the url() failure mode that forces the two-layer split, and a
 * live GlassSurface proof. Deterministic — every canvas pixel comes from the
 * same pure functions the runtime uses; there is no randomness anywhere.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { CodeBlock } from "@/components/site/CodeBlock";
import { DemoStage } from "@/components/site/DemoStage";
import { StrategyBadge } from "@/components/site/StrategyBadge";
import { Labeled, Note, Token } from "@/components/site/DocPage";
import {
  GlassSurface,
  INTENSITY_BASE_SCALE,
  generateDisplacementMap,
  probeField,
  type DisplacementMapSpec,
  type RefractionIntensity,
} from "@/lib/glass";

/* ------------------------------------------------------------------ */
/* Intro — what a displacement map is                                  */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
      <p>
        A displacement map is an image that is read rather than seen. Its red
        and green channels encode a two-dimensional offset field — one axis per
        channel — and <Token>feDisplacementMap</Token> consults that field to
        decide, for every pixel it paints, which part of the backdrop to sample
        instead:{" "}
        <span className="font-medium text-default-font">
          P(x + s·(R/255 − ½), y + s·(G/255 − ½))
        </span>
        , with <Token>s</Token> the displacement scale. Neutral gray cancels the
        formula to zero and samples dead-on; every other value pulls the sample
        sideways, and the direction of that pull is the entire optical effect.
      </p>
      <p>
        The convention is fixed (kube.io encoding): the interior is{" "}
        <Token>#808080</Token> — 128 on both channels, the neutral value.
        Vectors are normalized to unit length and stored as{" "}
        <span className="font-medium text-default-font">
          R = 128 + x·127, G = 128 + y·127
        </span>
        . Along the left edge the map points +X, along the right −X, along the
        top +Y and along the bottom −Y. Read through the formula, all four
        edges sample from deeper inside the surface, so the backdrop compresses
        toward the boundary — inward compression on all four edges, a convex
        lens. Because the vectors are normalized against the maximum
        displacement, that maximum is re-imposed directly as the{" "}
        <Token>feDisplacementMap scale</Token> — the map stores directions and
        unit magnitudes, the scale stores pixels.
      </p>
      <p>
        The magnitudes are not a smoothstep guess — they are ray-traced. For
        each distance from the border, a vertical ray enters the glass surface
        (a convex squircle cross-section, Apple&apos;s profile), refracts via
        Snell–Descartes (n(air) = 1, n(glass) = 1.5) and lands on the background
        plane; the displacement is the gap between entry and landing. The field
        is pre-calculated once along the bezel radius — 127 samples, matching
        the 8-bit channel resolution — and rotated around the boundary by the
        SDF gradient, so corners receive true radial vectors and edges receive
        true normals. Maps are generated at runtime, per element — at that
        element&apos;s measured size and border radius, when it mounts — and
        cached by geometry key.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The encoding table                                                  */
/* ------------------------------------------------------------------ */

const ENCODING_ROWS = [
  { hex: "#808080", where: "interior", meaning: "128 · 128 — neutral, samples dead-on" },
  { hex: "#ff8080", where: "left edge", meaning: "+X — samples from further right" },
  { hex: "#008080", where: "right edge", meaning: "−X — samples from further left" },
  { hex: "#80ff80", where: "top edge", meaning: "+Y — samples from below" },
  { hex: "#800080", where: "bottom edge", meaning: "−Y — samples from above" },
] as const;

function MapEncoding() {
  return (
    <Labeled label="The encoding">
      <div className="max-w-xl overflow-hidden rounded-lg border border-default-border bg-panel/60">
        <div className="border-b border-default-border bg-neutral-100 px-5 py-3.5 font-code text-[12.5px] text-default-font">
          feDisplacementMap · P′(x, y) = P(x + s·(R/255 − ½), y + s·(G/255 −
          ½))
        </div>
        <div className="flex flex-col divide-y divide-default-border px-5">
          {ENCODING_ROWS.map((row) => (
            <div
              key={row.hex}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5"
            >
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 flex-none rounded-[4px] border border-default-border"
                style={{ backgroundColor: row.hex }}
              />
              <Token>{row.hex}</Token>
              <span className="w-24 flex-none font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                {row.where}
              </span>
              <span className="ml-auto text-right text-body-medium text-neutral-600 dark:text-neutral-500">
                {row.meaning}
              </span>
            </div>
          ))}
        </div>
        <p className="border-t border-default-border px-5 py-3 text-caption text-neutral-500 dark:text-neutral-500">
          Every edge samples from deeper inside the surface, pulling the
          backdrop toward the boundary — inward compression on all four edges,
          the signature of a convex lens.
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Live map visualizer                                                 */
/* ------------------------------------------------------------------ */

/** Fixed bezel band — the review-verified default of the runtime. */
const MAP_BEZEL = 24;
const GRID_COLS = 12;
const GRID_ROWS = 6;
/** Grid endpoints sit 2px inside the boundary: probeField is exactly neutral
 *  ON the edge (d = 0 falls outside the d < 0 branch), so the outermost
 *  probes must sit just inside, where the profile peaks. */
const GRID_INSET = 2;
/** Arrow length at profile = 1 (the bezel band is 24px, so this fits a cell). */
const ARROW_MAX = 14;

const SIZE_PRESETS = [
  { label: "card · 480×200", width: 480, height: 200 },
  { label: "tile · 320×240", width: 320, height: 240 },
  { label: "bar · 560×140", width: 560, height: 140 },
];

/**
 * Vector-field overlay — pure, deterministic. Probes the same SDF field the
 * runtime encodes, on a GRID_COLS × GRID_ROWS grid spanning the map: a quiet
 * dot marks every node (the neutral interior reads as a field at rest), and
 * each arrow points along the inward normal with length ∝ bezel profile.
 */
function drawVectorField(
  ctx: CanvasRenderingContext2D,
  spec: DisplacementMapSpec
) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let j = 0; j < GRID_ROWS; j++) {
    const y =
      GRID_INSET + (j * (spec.height - 2 * GRID_INSET)) / (GRID_ROWS - 1);
    for (let i = 0; i < GRID_COLS; i++) {
      const x =
        GRID_INSET + (i * (spec.width - 2 * GRID_INSET)) / (GRID_COLS - 1);
      const { nx, ny, profile } = probeField(spec, x, y);

      ctx.fillStyle = "rgba(21, 20, 15, 0.35)";
      ctx.beginPath();
      ctx.arc(x, y, 1.1, 0, Math.PI * 2);
      ctx.fill();

      const len = profile * ARROW_MAX;
      if (len < 1.5) continue;

      const tipX = x + nx * len;
      const tipY = y + ny * len;
      ctx.strokeStyle = "rgba(21, 20, 15, 0.8)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(tipX, tipY);
      if (len > 4) {
        const angle = Math.atan2(ny, nx);
        const head = 3.5;
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(
          tipX - head * Math.cos(angle - 0.5),
          tipY - head * Math.sin(angle - 0.5)
        );
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(
          tipX - head * Math.cos(angle + 0.5),
          tipY - head * Math.sin(angle + 0.5)
        );
      }
      ctx.stroke();
    }
  }

  ctx.restore();
}

function MapVisualizer() {
  const [presetIndex, setPresetIndex] = React.useState(0);
  const [radius, setRadius] = React.useState(24);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const preset = SIZE_PRESETS[presetIndex];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;

    // DPR only sharpens the raster; the geometry is a pure function of the
    // spec, so the render is deterministic for a given spec.
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(preset.width * dpr);
    canvas.height = Math.round(preset.height * dpr);
    canvas.style.width = `${preset.width}px`;
    canvas.style.height = `${preset.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const spec: DisplacementMapSpec = {
      width: preset.width,
      height: preset.height,
      radius,
      bezel: MAP_BEZEL,
    };

    const paint = (map: HTMLImageElement | null) => {
      if (cancelled) return;
      if (map) ctx.drawImage(map, 0, 0, preset.width, preset.height);
      drawVectorField(ctx, spec);
    };

    // The exact call GlassSurface makes at mount — cached by geometry key.
    const mapUrl = generateDisplacementMap(spec);
    if (!mapUrl) {
      paint(null);
      return;
    }
    const img = new Image();
    img.onload = () => paint(img);
    img.src = mapUrl;
    // Some engines decode data URLs synchronously — paint once if so; the
    // onload pass is idempotent.
    if (img.complete && img.naturalWidth > 0) paint(img);

    return () => {
      cancelled = true;
    };
  }, [preset.width, preset.height, radius]);

  return (
    <Labeled label="Live map visualizer">
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          This is the real generator, not a mock: the bitmap below is what{" "}
          <Token>generateDisplacementMap</Token> hands to <Token>feImage</Token>{" "}
          for the chosen geometry, and the arrows are <Token>probeField</Token>{" "}
          readings of the same field on a 12×6 grid — each arrow points where
          the map pulls its sample from, its length proportional to the bezel
          profile. Drag the radius and watch the corners turn radial; switch
          the preset and the whole field is re-derived for that aspect.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="flex items-center gap-3">
            <span className="select-none font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
              corner radius
            </span>
            <input
              type="range"
              min={0}
              max={60}
              step={1}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              aria-label="Corner radius in pixels"
              className="h-1.5 w-44 cursor-pointer accent-neutral-700 dark:accent-neutral-500"
            />
            <span className="w-10 font-code text-[12px] text-default-font tabular-nums">
              {radius}px
            </span>
          </label>

          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Map size preset"
          >
            {SIZE_PRESETS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPresetIndex(i)}
                className={twClassNames(
                  "rounded-md border px-2.5 py-1 font-code text-[11px] tracking-[0.04em] transition-colors",
                  i === presetIndex
                    ? "border-neutral-400 bg-default-font/[0.06] text-default-font"
                    : "border-default-border text-neutral-500 hover:text-default-font dark:text-neutral-500"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="mx-auto w-fit rounded-lg border border-default-border p-2">
            <canvas
              ref={canvasRef}
              width={preset.width}
              height={preset.height}
              role="img"
              aria-label={`Displacement map for a ${preset.width} by ${preset.height} surface with ${radius} pixel corner radius`}
              className="block"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-center">
          <p className="font-code text-[11px] tracking-[0.04em] text-neutral-500 tabular-nums dark:text-neutral-500">
            map {preset.width}×{preset.height} · r {radius}px · bezel{" "}
            {MAP_BEZEL}px
          </p>
          <p className="font-code text-[10.5px] tracking-[0.04em] text-neutral-400">
            R → X offset · G → Y offset · arrows point where each sample is
            pulled from
          </p>
        </div>

        <p className="max-w-2xl text-caption text-neutral-500 dark:text-neutral-500">
          Bitmaps are generated at reduced resolution — the long side is capped
          at 340px — and stretched back by <Token>feImage</Token> with{" "}
          <Token>preserveAspectRatio=&quot;none&quot;</Token>, exactly as the
          filter consumes them; the field is smooth enough that the downsample
          is invisible. Maps are cached by geometry key, so a row of identical
          chips shares one bitmap and one filter.
        </p>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* The filter — kube.io construction                                   */
/* ------------------------------------------------------------------ */

const INTENSITIES: RefractionIntensity[] = ["subtle", "medium", "strong"];

const FILTER_CODE = `<!-- exactly the kube.io construction:
     https://kube.io/blog/liquid-glass-css-svg/ -->
<filter id="glass-dsp-…" filterUnits="userSpaceOnUse"
        x="0" y="0" width="320" height="120"
        colorInterpolationFilters="sRGB">

  <!-- the map: ray-traced refraction, generated at runtime for this
       element's measured size, in ABSOLUTE px — percentage geometry
       resolves against the wrong viewport and voids the tier -->
  <feImage href="data:image/png;base64,…" result="displacement_map"
           x="0" y="0" width="320" height="120"
           preserveAspectRatio="none" />

  <!-- one refraction pass: scale IS the physical maximum
       displacement that the normalized map was divided by -->
  <feDisplacementMap in="SourceGraphic" in2="displacement_map"
                     scale="41" xChannelSelector="R"
                     yChannelSelector="G" result="displaced" />

  <!-- material saturation, folded into the chain -->
  <feColorMatrix in="displaced" type="saturate"
                 values="1.45" result="saturated" />

  <!-- specular rim — brightness keyed to the surface normal vs a
       fixed light direction, screened over the refraction -->
  <feImage href="data:image/png;base64,…" result="specular_map"
           x="0" y="0" width="320" height="120"
           preserveAspectRatio="none" />
  <feComponentTransfer in="specular_map" result="specular_scaled">
    <feFuncR type="linear" slope="0.5" />
    <feFuncG type="linear" slope="0.5" />
    <feFuncB type="linear" slope="0.5" />
  </feComponentTransfer>
  <feBlend in="saturated" in2="specular_scaled" mode="screen" />
</filter>`;

function ChromaticAberration() {
  // Derived from the live constants, not hardcoded prose: Regular material,
  // where the ramp refraction multiplier is exactly 1.
  const forks = INTENSITIES.map((name) => {
    const level = INTENSITY_BASE_SCALE[name];
    return {
      name,
      level,
      scale: Math.round(41 * level),
    };
  });

  return (
    <Labeled label="The filter · kube.io construction">
      <div className="flex flex-col gap-4">
        <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
          <p>
            The Chromium tier is built exactly like the{" "}
            <Token>kube.io</Token> reference: one{" "}
            <Token>feImage</Token> displacement map sized in absolute pixels
            to the element, one <Token>feDisplacementMap</Token> over
            SourceGraphic, and a specular rim map blended in with{" "}
            <Token>feBlend mode=&quot;screen&quot;</Token>. The old three-branch
            channel-isolation construction (red/green/blue displaced at
            different scales, screen-recombined) is retired: it was never part
            of the reference, its recombination could void the output on
            semi-transparent backdrops, and the fringe it produced read as
            neon rim noise rather than dispersion.
          </p>
          <p>
            The two numbers that matter stay physical. The map&apos;s vectors
            are <span className="font-medium text-default-font">normalized</span>{" "}
            against the maximum ray-traced displacement, and that maximum is
            re-imposed verbatim as the filter&apos;s{" "}
            <Token>scale</Token> — so the 8-bit map stores unit vectors while
            the scale carries pixels. The intensity forks and the material
            ramp multiply that scale (kube.io&apos;s “Refraction Level”
            slider), and pulling the surface boosts
            it live, which is why a stretched lens bends harder — the same
            behavior as the article&apos;s magnifying glass.
          </p>
        </div>

        <div className="max-w-xl overflow-hidden rounded-lg border border-default-border bg-panel/60">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-default-border">
                {[
                  "intensity",
                  "refraction level",
                  "scale (regular)",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-2.5 font-code text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forks.map((f) => (
                <tr key={f.name} className="border-b border-default-border last:border-b-0">
                  <td className="px-5 py-2.5 font-code text-[12px] text-default-font">
                    {f.name}
                  </td>
                  <td className="px-5 py-2.5 font-code text-[12px] text-neutral-500 tabular-nums">
                    ×{f.level.toFixed(2)}
                  </td>
                  <td className="px-5 py-2.5 font-code text-[12px] text-default-font tabular-nums">
                    {f.scale}px
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="max-w-2xl text-caption text-neutral-500 dark:text-neutral-500">
          Regular material shown with a 41px maximum — the scale also rides the
          material ramp (0.7 / 0.9 / 1.0 / 1.15 over ultrathin → thick), so
          Thick · strong tops out well past 70px of edge bend.
        </p>

        <CodeBlock
          code={FILTER_CODE}
          filename="GlassFilters.tsx · filter def — regular · medium"
        />
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Why separate layers                                                 */
/* ------------------------------------------------------------------ */

const LAYER_SPLIT_CODE = `<!-- one declaration — an unresolved url() voids the entire list -->
<div style="backdrop-filter: blur(3px) url(#glass-dsp-3c91a7)"></div>

<!-- the runtime's split — the url() layer voids only itself -->
<div style="backdrop-filter: blur(3px)"></div>
<div style="backdrop-filter: url(#glass-dsp-3c91a7)"></div>`;

function SeparateLayers() {
  return (
    <Labeled label="Why separate layers">
      <div className="flex flex-col gap-4">
        <div className="flex max-w-2xl flex-col gap-4 text-body text-neutral-600 dark:text-neutral-500">
          <p>
            The url() form of <Token>backdrop-filter</Token> fails as a unit.
            If a filter value list contains a reference that cannot be
            resolved — the element carrying that id was never mounted, was
            unmounted mid-frame, or the id was mistyped — the Filter Effects
            spec makes the whole property invalid at computed-value time, and
            it computes to <Token>none</Token>. Not &ldquo;the rest of the
            chain&rdquo;: none. A layer declaring{" "}
            <Token>blur(3px) url(#glass-dsp-…)</Token> loses its blur together
            with its lens and renders as a flat tinted rectangle.
          </p>
          <p>
            So the displacement layer carries only the bare url() — one
            function, one token, nothing to take down with it — while the
            frost lives on its own masked layer beneath. If the reference ever
            fails, that layer voids itself and the surface degrades to the
            blur tier instead of to nothing. The frost is now PROGRESSIVE:
            masked to the bezel band (a smoothstep ramp from the same SDF as
            the displacement map), so the center of the surface stays crisp
            and only the bent edges take frost — the old global 40px blur is
            what made the material read as bloom.
          </p>
        </div>

        <Note tone="warning">
          <span className="font-medium text-default-font">
            The failure is total and silent.
          </span>{" "}
          Per the Filter Effects spec, an unresolved url() reference in a
          filter list invalidates the entire declaration at computed-value
          time — the property simply computes to none. Never bundle url() with
          anything you cannot afford to lose.
        </Note>

        <CodeBlock
          code={LAYER_SPLIT_CODE}
          filename="GlassSurface.tsx · the two backdrop layers"
        />
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */
/* Live proof                                                          */
/* ------------------------------------------------------------------ */

function LiveProof() {
  return (
    <Labeled label="Live proof · GlassSurface">
      <div className="flex flex-col gap-4">
        <DemoStage variant="text" height="h-72">
          <GlassSurface
            shape="card"
            material="regular"
            intensity="strong"
            className="h-44 w-80"
          >
            <span className="w-full select-none text-center font-code text-[11px] font-medium tracking-[0.12em] text-default-font/70 uppercase">
              regular · strong
            </span>
          </GlassSurface>
        </DemoStage>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-caption text-neutral-500 dark:text-neutral-500">
            On Chromium you should see the letters bend near the edges of the
            card — at this Regular · strong setting the ray-traced displacement
            peaks past 60px along the bezel. Grab the glass anywhere and pull:
            the surface deforms elastically toward the pointer — it stretches
            along the pull and squashes across it, never quite reaching the
            cursor — and the bend intensifies while it is deformed, then
            springs back with a jelly settle. Content rides along purely
            visually; layout never moves. Other engines show the WebGL/base
            tier: the same material, negotiated without the SVG lens.
          </p>
          <StrategyBadge active />
        </div>
      </div>
    </Labeled>
  );
}

/* ------------------------------------------------------------------ */

export function DisplacementSection() {
  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <MapEncoding />
      <MapVisualizer />
      <ChromaticAberration />
      <SeparateLayers />
      <LiveProof />
    </div>
  );
}
