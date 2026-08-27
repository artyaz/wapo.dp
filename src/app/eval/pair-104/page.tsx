"use client";

/**
 * EVAL page (pair-104) — Pocket Studio publish review, tiny phone.
 * Components: ds:AssetCard, ds:MaterialTokens, ui:chart
 * Conditions: viewport 320x480 (extremely cramped), light theme, ltr,
 * dense-content (realistic long labels / multi-line content).
 *
 * Scenario: the creator does a final review of episode EP-142 "Harbor Fog"
 * on their phone before Friday's publish — the audio master asset, the two
 * supporting batch assets (vertical teaser video + auto transcript), the
 * 7-day listening trend since the teaser dropped, and the material ramp
 * used for the floating mini-player overlay.
 */

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { EvalShell } from "@/eval/EvalShell";
import { AssetCard } from "@/components/ds/AssetCard";
import { MaterialTokens } from "@/components/ds/MaterialTokens";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const listeningData = [
  { day: "Thu 05", plays: 412, downloads: 96 },
  { day: "Fri 06", plays: 538, downloads: 121 },
  { day: "Sat 07", plays: 291, downloads: 74 },
  { day: "Sun 08", plays: 347, downloads: 88 },
  { day: "Mon 09", plays: 604, downloads: 152 },
  { day: "Tue 10", plays: 731, downloads: 189 },
  { day: "Wed 11", plays: 665, downloads: 164 },
];

const chartConfig = {
  plays: {
    label: "Plays",
    color: "var(--chart-1)",
  },
  downloads: {
    label: "Downloads",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-3 px-3 pb-6 pt-4">
        {/* Header — episode identity */}
        <header>
          <p className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-400">
            Pocket Studio · publish review
          </p>
          <h1 className="mt-1 truncate text-heading-3 font-heading-3 text-default-font">
            EP-142 · “Harbor Fog” — night harbor field session
          </h1>
          <p className="mt-1 font-code text-[12px] leading-[16px] text-neutral-500">
            3 assets · scheduled Fri 09:00 · cut v3 final
          </p>
        </header>

        {/* Featured asset — ds:AssetCard (audio master) */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
              Audio master
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400">
              approved
            </span>
          </div>
          <div className="mt-2">
            <AssetCard
              kind="audio"
              title="ep-142-harbor-fog-master-mixdown-2448-stereo-final.wav"
              duration="01:24:37"
              meta="WAV · 48 kHz · 24-bit stereo · 142.8 MB · Zoom H6 + DPA 4060 pair"
            />
          </div>
        </section>

        {/* Batch assets — ds:AssetCard (video + text kinds) */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
              Also in this batch
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400">
              2 of 3
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <AssetCard
              kind="video"
              title="ep-142-vertical-teaser-9x16-v3-color.mov"
              duration="00:32"
              meta="ProRes 422 · 1080×1920 · 29.97 fps"
            />
            <AssetCard
              kind="text"
              title="ep-142-transcript-auto-generated-full-v2.md"
              duration="84 min"
              meta="Markdown · 12,480 words · 3 languages"
            />
          </div>
        </section>

        {/* Listening trend — ui:chart */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
              Listening trend — first 7 days
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400">
              peak 731
            </span>
          </div>
          <div className="mt-2 rounded-lg border border-solid border-default-border bg-panel p-3">
            <ChartContainer
              config={chartConfig}
              className="min-h-[170px] w-full"
            >
              <LineChart accessibilityLayer data={listeningData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="plays"
                  type="monotone"
                  stroke="var(--color-plays)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="downloads"
                  type="monotone"
                  stroke="var(--color-downloads)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </div>
        </section>

        {/* Mini-player surface — ds:MaterialTokens */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
              Mini-player surface
            </h2>
            <span className="font-code text-[11px] leading-[14px] text-neutral-400">
              glass ramp
            </span>
          </div>
          <p className="mt-1 text-caption font-caption text-neutral-400">
            The floating overlay uses this four-level material hierarchy.
          </p>
          <div className="mt-2 w-full">
            <MaterialTokens />
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-solid border-default-border pt-3">
          <span className="text-caption font-caption text-neutral-400">
            Synced from Pocket Studio library
          </span>
          <span className="text-caption font-caption text-neutral-500">
            2 min ago
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
