"use client";

/**
 * Glass tier verification stage — /glass-check?tier=svg|webgl|base
 *
 * One page, three forced tiers. The negotiated strategy is overridden in the
 * store AFTER GlassRuntime's own promotion pass (child effects run first, so
 * a plain mount-order override would be clobbered — the timeout loses the
 * race on purpose). Everything else is the real runtime: real map
 * generation, real engine creation, real finish paint.
 *
 * The stage carries a busy background IMAGE (not a gradient — the WebGL
 * engine discovers url() images only), so every tier has something to bend:
 *
 *   row 1  material ramp    ultrathin / thin / regular / thick
 *   row 2  frost knob      frost 0 / default / 18 / 24
 *   row 3  finish knobs    border 0 / .5 / 1 · shadow 0 / 1 / 2
 *
 * Screenshot each ?tier= variant; the look should stay recognisably the
 * same family across all three, which is the whole point of the tier
 * contract.
 */

import React from "react";
import { GlassRuntime, GlassSurface, useGlassRuntime } from "@/lib/glass";
import type { GlassStrategy, MaterialLevel } from "@/lib/glass";

const TIERS: Record<string, GlassStrategy> = {
  svg: "svg-displacement",
  webgl: "webgl-refraction",
  base: "backdrop-filter",
};

const TIER_CAPTION: Record<GlassStrategy, string> = {
  "svg-displacement": "svg displacement · Chromium tier",
  "webgl-refraction": "webgl refraction · Safari/Firefox tier",
  "backdrop-filter": "backdrop filter · universal base tier",
};

const MATERIALS: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];

function useForcedTier() {
  const [tier, setTier] = React.useState<string>("svg");
  const setStrategy = useGlassRuntime((s) => s.setStrategy);
  const live = useGlassRuntime((s) => s.strategy);
  const webglTexture = useGlassRuntime((s) => s.webglTexture);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("tier") ?? "svg";
    setTier(next);
    const forced = TIERS[next];
    if (forced) {
      // Run after GlassRuntime's own promotion pass (mount effects run
      // children-first) so the override actually sticks.
      const t = setTimeout(() => useGlassRuntime.getState().setStrategy(forced), 120);
      return () => clearTimeout(t);
    }
  }, [setStrategy]);

  return { tier, live, webglTexture };
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 mix-blend-difference">
      {children}
    </div>
  );
}

export default function GlassCheckPage() {
  const { tier, live, webglTexture } = useForcedTier();

  return (
    <GlassRuntime level="regular">
      <main className="min-h-screen bg-neutral-950 text-white">
        <header className="flex flex-wrap items-baseline gap-x-6 gap-y-1 px-8 pt-8 pb-4">
          <h1 className="text-lg font-semibold">Glass tier check</h1>
          <Caption>
            forced · {tier} — live · {live}
            {live === "webgl-refraction"
              ? webglTexture === true
                ? " · texture loaded"
                : webglTexture === false
                  ? " · no texture"
                  : ""
              : ""}
          </Caption>
          <Caption>?tier=svg | webgl | base</Caption>
        </header>

        {/* the stage — its background IMAGE is what the WebGL engine
            discovers and refracts */}
        <div
          className="relative mx-8 mb-10 overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "url(/glass-check-backdrop.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-10 px-10 py-10">
            {/* row 1 — the material ramp */}
            <section className="flex flex-col gap-3">
              <Caption>material ramp · regular defaults</Caption>
              <div className="flex flex-wrap items-end gap-6">
                {MATERIALS.map((material) => (
                  <GlassSurface
                    key={material}
                    material={material}
                    shape="card"
                    className="h-28 w-48 px-4 py-3"
                  >
                    <span className="font-mono text-[11px] text-white mix-blend-difference">
                      {material}
                    </span>
                  </GlassSurface>
                ))}
              </div>
            </section>

            {/* row 2 — the frost knob */}
            <section className="flex flex-col gap-3">
              <Caption>frost.blur — 0 / default(10) / 18 / 24</Caption>
              <div className="flex flex-wrap items-end gap-6">
                {[0, 10, 18, 24].map((blur) => (
                  <GlassSurface
                    key={blur}
                    material="regular"
                    shape="card"
                    frost={{ blur, saturate: 1.5 }}
                    className="h-28 w-48 px-4 py-3"
                  >
                    <span className="font-mono text-[11px] text-white mix-blend-difference">
                      frost {blur}
                    </span>
                  </GlassSurface>
                ))}
              </div>
            </section>

            {/* row 3 — border + shadow knobs */}
            <section className="flex flex-col gap-3">
              <Caption>finish.border 0/.5/1 · finish.shadow 0/1/2</Caption>
              <div className="flex flex-wrap items-end gap-6">
                <GlassSurface
                  material="regular"
                  shape="card"
                  finish={{ border: 0, shadow: 1 }}
                  className="h-28 w-48 px-4 py-3"
                >
                  <span className="font-mono text-[11px] text-white mix-blend-difference">
                    border 0
                  </span>
                </GlassSurface>
                <GlassSurface
                  material="regular"
                  shape="card"
                  finish={{ border: 1, shadow: 1 }}
                  className="h-28 w-48 px-4 py-3"
                >
                  <span className="font-mono text-[11px] text-white mix-blend-difference">
                    border 1
                  </span>
                </GlassSurface>
                <GlassSurface
                  material="regular"
                  shape="card"
                  finish={{ border: 0.5, shadow: 0 }}
                  className="h-28 w-48 px-4 py-3"
                >
                  <span className="font-mono text-[11px] text-white mix-blend-difference">
                    shadow 0
                  </span>
                </GlassSurface>
                <GlassSurface
                  material="regular"
                  shape="card"
                  finish={{ border: 0.5, shadow: 2 }}
                  className="h-28 w-48 px-4 py-3"
                >
                  <span className="font-mono text-[11px] text-white mix-blend-difference">
                    shadow 2
                  </span>
                </GlassSurface>
              </div>
            </section>

            {/* row 4 — a capsule with content (the classic shape) */}
            <section className="flex flex-col gap-3">
              <Caption>capsule · content z-10 · everything default</Caption>
              <GlassSurface material="regular" shape="capsule" className="h-14 w-[420px] px-6">
                <span className="flex items-center gap-3 font-mono text-[12px] text-white/95">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                  liquid glass capsule — pull me
                </span>
              </GlassSurface>
            </section>
          </div>
        </div>

        <footer className="px-8 pb-10">
          <Caption>{TIER_CAPTION[live] ?? live}</Caption>
        </footer>
      </main>
    </GlassRuntime>
  );
}
