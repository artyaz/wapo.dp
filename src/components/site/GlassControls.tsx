"use client";

/**
 * GlassControls — live Liquid Glass settings for a component preview.
 *
 * Wraps the preview in GlassOverrideContext, so every GlassSurface inside it
 * takes these values in preference to its own props. That is what makes the
 * sliders work on components that hardcode their material (GlassChip pins
 * "regular", CrosshairTag pins stretchable={false}) without touching them.
 *
 * The panel also names the negotiated tier, because which knob does anything
 * depends on it: `refraction` only bites on the WebGL tier and only with a
 * backdrop image to refract, `intensity` only on the Chromium displacement
 * tier, `frost` on the universal base. Without that label a dead slider looks
 * like a broken slider.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import {
  GlassOverrideContext,
  FINISH_DEFAULTS,
  MATERIAL_RAMP,
  useGlassRuntime,
  type GlassOverrides,
  type MaterialLevel,
  type RefractionIntensity,
  type ResolvedFinish,
} from "@/lib/glass";

const LEVELS: MaterialLevel[] = ["ultrathin", "thin", "regular", "thick"];
const INTENSITIES: RefractionIntensity[] = ["subtle", "medium", "strong"];

/**
 * The finish knobs. These are paint, not filters, so every one of them bites
 * on every tier — no texture, no WebGL, no engine negotiation involved.
 */
const FINISH_SLIDERS: Array<{
  key: keyof ResolvedFinish;
  label: string;
  min: number;
  max: number;
  step: number;
}> = [
  { key: "sheen", label: "sheen", min: 0, max: 1, step: 0.02 },
  { key: "lightAngle", label: "light", min: 0, max: 360, step: 5 },
  { key: "rim", label: "rim", min: 0, max: 1, step: 0.02 },
  { key: "tint", label: "tint", min: 0, max: 0.3, step: 0.01 },
  { key: "inner", label: "inner", min: 0, max: 1.6, step: 0.05 },
  { key: "shadow", label: "shadow", min: 0, max: 2, step: 0.05 },
];

const TIER_LABEL: Record<string, string> = {
  "svg-displacement": "svg displacement",
  "webgl-refraction": "webgl refraction",
  "backdrop-filter": "base frost",
};

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <label className="flex items-center gap-2.5">
      <span className="w-16 flex-none font-code text-[10px] tracking-[0.1em] text-neutral-400 uppercase">
        {label}
      </span>
      <span className="flex flex-wrap items-center gap-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={twClassNames(
              "cursor-pointer rounded-[9999px] border px-2.5 py-1 text-[11px] transition-colors",
              option === value
                ? "border-default-border bg-default-font/[0.07] text-default-font"
                : "border-transparent text-neutral-500 hover:text-default-font"
            )}
          >
            {option}
          </button>
        ))}
      </span>
    </label>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <label className="flex items-center gap-2.5">
      <span className="w-16 flex-none font-code text-[10px] tracking-[0.1em] text-neutral-400 uppercase">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 min-w-0 flex-1 cursor-pointer accent-default-font"
      />
      <span className="w-10 flex-none text-right font-code text-[11px] text-default-font">
        {step < 1 ? value.toFixed(2) : Math.round(value)}
      </span>
    </label>
  );
}

export function GlassControls({ children }: { children: React.ReactNode }) {
  const strategy = useGlassRuntime((state) => state.strategy);
  const webglTexture = useGlassRuntime((state) => state.webglTexture);
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = React.useState<MaterialLevel>("regular");
  const [intensity, setIntensity] = React.useState<RefractionIntensity>("medium");
  const [stretchable, setStretchable] = React.useState(true);
  const [bounce, setBounce] = React.useState(MATERIAL_RAMP.regular.bounce);
  const [frost, setFrost] = React.useState({
    blur: MATERIAL_RAMP.regular.cssBlur,
    saturate: MATERIAL_RAMP.regular.cssSaturate,
  });
  const [finish, setFinish] = React.useState<ResolvedFinish>({
    ...FINISH_DEFAULTS,
    tint: MATERIAL_RAMP.regular.tint / 100,
  });

  /** Thickness carries its own constant set, so switching it reloads the sliders. */
  const applyLevel = React.useCallback((next: MaterialLevel) => {
    setLevel(next);
    setBounce(MATERIAL_RAMP[next].bounce);
    setFrost({
      blur: MATERIAL_RAMP[next].cssBlur,
      saturate: MATERIAL_RAMP[next].cssSaturate,
    });
    setFinish({ ...FINISH_DEFAULTS, tint: MATERIAL_RAMP[next].tint / 100 });
  }, []);

  const overrides = React.useMemo<GlassOverrides>(
    () => ({ material: level, intensity, finish, frost, bounce, stretchable }),
    [level, intensity, finish, frost, bounce, stretchable]
  );

  const setFinishField = (key: keyof ResolvedFinish, value: number) =>
    setFinish((previous) => ({ ...previous, [key]: value }));

  const baseTier = TIER_LABEL[strategy] ?? strategy;
  const intensityLive = strategy === "svg-displacement";
  // The WebGL tier being live is not the same as it having anything to
  // refract: with no backdrop image the shader draws nothing and the CSS
  // material carries the surface.
  const liveTier =
    strategy === "webgl-refraction" && webglTexture === false
      ? "webgl · no image, showing frost"
      : baseTier;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-default-border bg-panel">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5">
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="cursor-pointer text-[13px] font-medium text-default-font"
          >
            {open ? "▾" : "▸"} Liquid Glass
          </button>
          <span className="flex items-center gap-3">
            <span className="font-code text-[10px] tracking-[0.1em] text-neutral-400 uppercase">
              live tier · {liveTier}
            </span>
            <button
              type="button"
              onClick={() => {
                applyLevel("regular");
                setIntensity("medium");
                setStretchable(true);
              }}
              className="cursor-pointer font-code text-[10px] tracking-[0.1em] text-neutral-500 uppercase hover:text-default-font"
            >
              reset
            </button>
          </span>
        </div>

        {open ? (
          <div className="grid gap-x-8 gap-y-2.5 border-t border-default-border px-4 py-3.5 sm:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <Segmented
                label="thickness"
                options={LEVELS}
                value={level}
                onChange={applyLevel}
              />
              <Segmented
                label="intensity"
                options={INTENSITIES}
                value={intensity}
                onChange={setIntensity}
              />
              {!intensityLive ? (
                <p className="text-[11px] text-neutral-500">
                  Intensity scales the displacement lens — Chromium tier only.
                </p>
              ) : null}
              <Slider
                label="frost"
                min={0}
                max={24}
                step={0.5}
                value={frost.blur}
                onChange={(blur) => setFrost((previous) => ({ ...previous, blur }))}
              />
              <Slider
                label="saturate"
                min={1}
                max={2}
                step={0.05}
                value={frost.saturate}
                onChange={(saturate) =>
                  setFrost((previous) => ({ ...previous, saturate }))
                }
              />
              <Slider
                label="bounce"
                min={0}
                max={0.9}
                step={0.02}
                value={bounce}
                onChange={setBounce}
              />
              <label className="flex items-center gap-2.5">
                <span className="w-16 flex-none font-code text-[10px] tracking-[0.1em] text-neutral-400 uppercase">
                  stretch
                </span>
                <input
                  type="checkbox"
                  checked={stretchable}
                  onChange={(event) => setStretchable(event.target.checked)}
                  className="h-3.5 w-3.5 cursor-pointer accent-default-font"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="font-code text-[10px] tracking-[0.1em] text-neutral-400 uppercase">
                finish · every tier
              </span>
              {FINISH_SLIDERS.map((slider) => (
                <Slider
                  key={slider.key}
                  label={slider.label}
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={finish[slider.key]}
                  onChange={(value) => setFinishField(slider.key, value)}
                />
              ))}
              <p className="text-[11px] text-neutral-500">
                Sheen, rim, tint, inner shading and shadow are paint, so they
                bite on every tier. Light rotates both sheen gradients, so the
                highlight can sit on any corner.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <GlassOverrideContext.Provider value={overrides}>
        {children}
      </GlassOverrideContext.Provider>
    </div>
  );
}
