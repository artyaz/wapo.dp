"use client";

/**
 * EVAL page pair-005 — media player with its playlist.
 * Components: ds:MiniMap, ui:card, ds:PanelTile
 * Conditions: desktop-wide 1440x900, light theme, ltr.
 *
 * Scenario: "Glasswave" desktop player for a long-form episode.
 *  - Now-playing hero card (ui:card) with artwork, scrubber, transport.
 *  - Zoomed waveform timeline + ds:MiniMap episode map (chapters + window frame).
 *  - ds:PanelTile sidebar: chapter list + focused "up next" playlist queue.
 */

import React from "react";
import {
  AudioLines,
  AudioWaveform,
  Headphones,
  Play,
  Plus,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { MiniMap } from "@/components/ds/MiniMap";
import { PanelTile } from "@/components/ds/PanelTile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ---------- deterministic episode data ---------- */

const PLAYED_PCT = 35.2; // 47:12 of 2:14:03
const WINDOW_FROM = 28; // zoom window: 28%..58% of the episode
const WINDOW_TO = 58;
const PLAYHEAD_IN_WINDOW = ((PLAYED_PCT - WINDOW_FROM) / (WINDOW_TO - WINDOW_FROM)) * 100; // 24%

const CHAPTERS: Array<{
  n: string;
  name: string;
  start: string;
  dur: string;
  mapLeft: string;
  mapWidth: string;
  current?: boolean;
}> = [
  { n: "01", name: "Intro", start: "0:00", dur: "5:22", mapLeft: "1%", mapWidth: "2.5%" },
  { n: "02", name: "Glass Fields", start: "5:22", dur: "24:06", mapLeft: "5%", mapWidth: "16%" },
  { n: "03", name: "Slow Tide", start: "29:28", dur: "32:12", mapLeft: "23%", mapWidth: "21%", current: true },
  { n: "04", name: "Neon Rain", start: "1:01:40", dur: "29:29", mapLeft: "47.5%", mapWidth: "19%" },
  { n: "05", name: "Blue Hour", start: "1:31:09", dur: "26:49", mapLeft: "69%", mapWidth: "17.5%" },
  { n: "06", name: "Outro", start: "1:57:58", dur: "16:05", mapLeft: "89%", mapWidth: "10%" },
];

const UP_NEXT: Array<{ name: string; sub: string; dur: string }> = [
  { name: "Cities at Night", sub: "Field Notes · EP 84", dur: "58:12" },
  { name: "Low Light, Deep Focus", sub: "Glasswave Radio · EP 127", dur: "1:47:30" },
  { name: "Rain on Glass", sub: "Ambient Works · Vol. 2", dur: "2:05:00" },
  { name: "An Interview with Anna Reyes", sub: "Sound & Space · EP 12", dur: "43:18" },
];

/** Deterministic waveform bar heights (pure function of index — no randomness). */
const BAR_COUNT = 108;
const PLAY_BAR = Math.floor((PLAYHEAD_IN_WINDOW / 100) * BAR_COUNT);
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const envelope = 0.55 + 0.45 * Math.sin((i / BAR_COUNT) * Math.PI);
  const h =
    Math.abs(Math.sin(i * 0.62)) * 0.6 + Math.abs(Math.sin(i * 0.23 + 1.2)) * 0.4;
  return Math.round(16 + 78 * h * envelope);
});

/** Calm grayscale cover art as an inline SVG (no network dependency). */
const ARTWORK = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f4f3f0"/>
        <stop offset="1" stop-color="#c9cdd3"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.22" cy="0.2" r="0.9">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="300" fill="url(#bg)"/>
    <rect width="1200" height="300" fill="url(#glow)"/>
    <path d="M0 210 C 150 160, 300 250, 450 205 S 750 150, 900 210 S 1150 245, 1200 205" fill="none" stroke="#6f7580" stroke-opacity="0.45" stroke-width="2.5"/>
    <path d="M0 235 C 200 195, 350 265, 550 230 S 900 185, 1200 235" fill="none" stroke="#565b64" stroke-opacity="0.35" stroke-width="2"/>
    <path d="M0 262 C 250 232, 400 282, 650 255 S 1000 222, 1200 258" fill="none" stroke="#3f444c" stroke-opacity="0.28" stroke-width="1.5"/>
    <circle cx="985" cy="78" r="52" fill="none" stroke="#7c828c" stroke-opacity="0.5" stroke-width="2"/>
    <circle cx="985" cy="78" r="26" fill="#7c828c" fill-opacity="0.25"/>
  </svg>`
)}`;

/* ---------- page ---------- */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col gap-6 px-10 py-8">
        {/* App header */}
        <header className="flex flex-none items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-default-font text-default-background">
              <AudioWaveform size={18} />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold leading-tight text-default-font">
                Glasswave
              </span>
              <span className="text-caption font-caption text-neutral-500">
                Desktop player · local library
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-code text-[11px] text-neutral-500">
              Library · 248 episodes
            </span>
            <span className="h-6 w-px bg-default-border" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-solid border-default-border text-neutral-500">
              <Search size={14} />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-default-font/[0.08] text-[11px] font-semibold text-default-font">
              MV
            </span>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_360px] gap-6">
          {/* ---------- main: now playing + timeline ---------- */}
          <div className="flex min-w-0 flex-col gap-6">
            {/* Now playing hero — ui:card */}
            <Card className="overflow-hidden pt-0">
              <div className="relative">
                <img
                  src={ARTWORK}
                  alt="Episode cover art"
                  className="h-[190px] w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 font-code text-[10px] tracking-wide text-white backdrop-blur-sm">
                  GLASSWAVE RADIO · EP 128
                </span>
              </div>
              <CardHeader>
                <CardAction>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-solid border-default-border bg-default-font/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-default-font" />
                    Now playing
                  </span>
                </CardAction>
                <CardTitle className="text-xl">
                  The Quiet Hour — with Mara Voss
                </CardTitle>
                <CardDescription>
                  Glasswave Radio · EP 128 · Ambient works for late listening · 2 h 14 min
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="relative h-1.5 w-full rounded-full bg-default-font/[0.10]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-default-font/80"
                      style={{ width: `${PLAYED_PCT}%` }}
                    />
                    <div
                      className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-default-font ring-2 ring-panel"
                      style={{ left: `${PLAYED_PCT}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-code text-[11px] text-neutral-500">
                    <span className="text-default-font">47:12</span>
                    <span>−1:26:51</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center">
                  <div className="flex w-28 items-center gap-1 text-neutral-500">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-default-font/[0.05] hover:text-default-font">
                      <Shuffle size={15} />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-default-font/[0.05] hover:text-default-font">
                      <Repeat size={15} />
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full text-default-font transition-colors hover:bg-default-font/[0.05]">
                      <SkipBack size={18} />
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-default-font text-default-background">
                      <Play size={17} className="fill-current translate-x-[1px]" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full text-default-font transition-colors hover:bg-default-font/[0.05]">
                      <SkipForward size={18} />
                    </span>
                  </div>
                  <div className="flex w-28 items-center justify-end gap-2 text-neutral-500">
                    <Volume2 size={15} />
                    <div className="h-1 w-16 rounded-full bg-default-font/[0.15]">
                      <div className="h-full w-[60%] rounded-full bg-default-font/60" />
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Timeline: zoomed waveform + ds:MiniMap episode map */}
            <section className="flex flex-col gap-3">
              <div className="rounded-xl border border-solid border-default-border bg-panel p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-[13px] font-semibold text-default-font">
                      Waveform
                    </h2>
                    <span className="text-caption font-caption text-neutral-500">
                      Window 37:32 – 77:45 · 30% of episode
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-default-border">
                      <ZoomOut size={14} />
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-default-border">
                      <ZoomIn size={14} />
                    </span>
                  </div>
                </div>

                <div className="relative mt-3 h-[88px] pt-5">
                  <div className="flex h-full items-end gap-[2px]">
                    {BARS.map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-[1px] ${
                          i < PLAY_BAR ? "bg-default-font/45" : "bg-default-font/[0.15]"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  {/* playhead */}
                  <span className="absolute left-[24%] top-0 -translate-x-1/2 rounded-[4px] bg-default-font px-1.5 py-px font-code text-[10px] leading-[14px] text-default-background">
                    47:12
                  </span>
                  <div className="absolute bottom-0 top-5 left-[24%] w-px bg-default-font/60" />
                  {/* chapter boundary (Neon Rain starts at 46% of the episode) */}
                  <div className="absolute bottom-0 top-5 left-[60%] w-0 border-l border-dashed border-default-font/40" />
                </div>

                <div className="relative mt-2 h-4">
                  <span className="absolute left-0 font-code text-[10px] text-neutral-500">
                    37:32
                  </span>
                  <span className="absolute left-[60%] -translate-x-1/2 font-code text-[10px] text-neutral-500">
                    1:01:40 · Neon Rain
                  </span>
                  <span className="absolute right-0 font-code text-[10px] text-neutral-500">
                    77:45
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MiniMap showGrid>
                  {CHAPTERS.map((c) => (
                    <MiniMap.ContentBlock
                      key={c.n}
                      style={{
                        left: c.mapLeft,
                        top: "40%",
                        width: c.mapWidth,
                        height: "20%",
                      }}
                    />
                  ))}
                  <MiniMap.ViewportFrame
                    style={{ left: "28%", top: "10%", width: "30%", height: "80%" }}
                  />
                </MiniMap>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-default-font">
                    Episode map
                  </span>
                  <span className="text-caption font-caption text-neutral-500">
                    6 chapters · 2 h 14 min total
                  </span>
                  <span className="max-w-[280px] text-caption font-caption text-neutral-500">
                    The framed region is the 40-minute window zoomed into the waveform
                    above · playhead 47:12 in “Slow Tide”.
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* ---------- sidebar: playlist panels (ds:PanelTile) ---------- */}
          <div className="flex min-h-0 flex-col gap-4">
            <PanelTile title="Chapters · EP 128" className="flex-1">
              <div className="flex w-full flex-col gap-3">
                {CHAPTERS.map((c) => (
                  <div key={c.n} className="flex w-full items-center gap-3">
                    <span className="flex w-5 flex-none items-center justify-center">
                      {c.current ? (
                        <AudioLines size={14} className="text-default-font" />
                      ) : (
                        <span className="font-code text-[11px] text-neutral-500">
                          {c.n}
                        </span>
                      )}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span
                        className={`truncate text-[13px] leading-[17px] ${
                          c.current
                            ? "font-semibold text-default-font"
                            : "font-medium text-neutral-600"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="text-caption font-caption text-neutral-500">
                        {c.current ? "playing · 47:12" : `starts ${c.start} · ${c.dur}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </PanelTile>

            <PanelTile variant="focused" title="Up next · Late-night playlist" className="flex-1">
              <div className="flex w-full flex-col gap-3">
                {UP_NEXT.map((e) => (
                  <div key={e.name} className="flex w-full items-center gap-3">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-default-font/[0.04] text-neutral-500">
                      <Headphones size={13} />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[13px] leading-[17px] font-medium text-neutral-600">
                        {e.name}
                      </span>
                      <span className="truncate text-caption font-caption text-neutral-500">
                        {e.sub}
                      </span>
                    </div>
                    <span className="flex-none font-code text-[11px] text-neutral-500">
                      {e.dur}
                    </span>
                  </div>
                ))}
              </div>
              <span className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-md border border-solid border-default-border py-1.5 text-[12px] text-neutral-600 transition-colors hover:bg-default-font/[0.04]">
                <Plus size={13} />
                Add episode to queue
              </span>
            </PanelTile>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
