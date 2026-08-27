"use client";

import React from "react";
import {
  ChevronLeft,
  Copy,
  MoreHorizontal,
  Play,
  Scissors,
  SkipBack,
  SkipForward,
  Trash2,
} from "lucide-react";
import { EvalShell } from "@/eval/EvalShell";
import { WaveformStrip } from "@/components/ds/WaveformStrip";
import { MediaClip } from "@/components/ds/MediaClip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Scenario — pocket scene editor on a 360×640 phone. The editor has the
 * "room-tone.wav" clip selected on the "ambience-edit" sequence: a clip
 * inspector pinned under the app bar, the clip-actions dropdown open from the
 * header ⋯ button (via defaultOpen so the menu is visible in the static
 * capture), a stereo take preview rendered with ds:WaveformStrip, sequence
 * lanes built from ds:MediaClip (selected audio / locked video / caption
 * text), and a transport bar at the bottom.
 */

const TAKE_TICKS = ["00:00", "00:12", "00:24", "00:36", "00:48"];
const SEQ_TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];
const IN_PCT = "25%"; // in 00:15.000 on a 01:00 sequence
const OUT_PCT = "70%"; // out 00:42.000
const PLAYHEAD_PCT = "30.4%"; // 00:18.240

const INSPECTOR: Array<[string, string]> = [
  ["clip", "room-tone.wav"],
  ["format", "WAV · 48 kHz"],
  ["in point", "00:15.000"],
  ["out point", "00:42.000"],
  ["peak", "−12.4 dBFS"],
  ["fades", "1.5s / 2.0s"],
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col font-body text-default-font">
        {/* app bar — ui:dropdown-menu open via defaultOpen */}
        <header className="flex h-12 flex-none items-center justify-between gap-2 border-b border-solid border-default-border px-2">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              aria-label="Back to scene list"
              className="flex size-10 flex-none items-center justify-center rounded-full text-neutral-600"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold leading-[16px]">
                Scene 04 · Ambience
              </div>
              <div className="truncate font-code text-[10px] leading-[13px] text-neutral-500">
                ambience-edit · 01:00
              </div>
            </div>
          </div>
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-lg" aria-label="Clip actions">
                  <MoreHorizontal className="size-5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="py-2">
                <span className="block text-[13px] font-medium leading-[16px]">
                  room-tone.wav
                </span>
                <span className="block font-code text-[10px] font-normal leading-[14px] text-neutral-500">
                  A1 · audio · 00:27.000
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Scissors />
                  Split at playhead
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy />
                  Duplicate clip
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem defaultChecked>
                Snap to grid
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 />
                Delete clip
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-3">
          {/* clip inspector — sits beneath the open actions menu */}
          <section className="rounded-lg border border-solid border-default-border bg-panel p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-code text-[10px] uppercase tracking-[0.08em] text-neutral-500">
                clip inspector
              </span>
              <span className="rounded-full border border-solid border-default-border bg-default-background px-1.5 py-0.5 font-code text-[9px] text-neutral-600">
                selected
              </span>
            </div>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {INSPECTOR.map(([key, value]) => (
                <div key={key} className="flex items-baseline justify-between gap-2">
                  <dt className="flex-none font-code text-[10px] uppercase text-neutral-400">
                    {key}
                  </dt>
                  <dd className="truncate font-code text-[11px] tabular-nums text-neutral-700">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 border-t border-solid border-default-border pt-2.5">
              <div className="flex items-baseline justify-between">
                <span className="font-code text-[10px] uppercase text-neutral-400">
                  gain
                </span>
                <span className="font-code text-[11px] tabular-nums text-neutral-700">
                  −6.2 dB
                </span>
              </div>
              <div className="relative mt-1.5 h-1 rounded-full bg-neutral-200">
                <div className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-neutral-800" />
              </div>
            </div>
          </section>

          {/* take preview — ds:WaveformStrip */}
          <section className="rounded-lg border border-solid border-default-border bg-panel p-3">
            <div className="mb-2.5 flex items-baseline justify-between gap-2">
              <span className="truncate font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                take-03 · room-tone.wav
              </span>
              <span className="flex-none font-code text-[11px] text-neutral-400">
                00:48.000
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {["L", "R"].map((channel) => (
                <div key={channel} className="flex items-center gap-2.5">
                  <span className="w-3 flex-none font-code text-[11px] text-neutral-400">
                    {channel}
                  </span>
                  <div className="h-10 grow">
                    <WaveformStrip />
                  </div>
                </div>
              ))}
            </div>
            <div className="ml-[22px] mt-2 flex justify-between border-t border-solid border-default-border pt-1.5">
              {TAKE_TICKS.map((tick) => (
                <span key={tick} className="font-code text-[10px] text-neutral-400">
                  {tick}
                </span>
              ))}
            </div>
          </section>

          {/* sequence timeline — ds:MediaClip */}
          <section className="rounded-lg border border-solid border-default-border bg-panel p-3">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <span className="truncate font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                sequence · ambience-edit
              </span>
              <span className="flex-none font-code text-[11px] text-neutral-400">
                01:00
              </span>
            </div>
            <div className="px-1">
              {/* time ruler with in / out / playhead markers */}
              <div className="relative flex h-4 items-start justify-between border-b border-solid border-default-border">
                {SEQ_TICKS.map((tick) => (
                  <span key={tick} className="font-code text-[10px] text-neutral-400">
                    {tick}
                  </span>
                ))}
                <div
                  className="absolute inset-y-0 w-px bg-neutral-700"
                  style={{ left: IN_PCT }}
                />
                <div
                  className="absolute inset-y-0 w-px bg-neutral-700"
                  style={{ left: OUT_PCT }}
                />
                <div
                  className="absolute inset-y-0 z-10 w-px bg-neutral-900"
                  style={{ left: PLAYHEAD_PCT }}
                >
                  <span className="absolute top-0 h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-900" />
                </div>
              </div>

              {/* lane A1 — selected audio clip */}
              <div className="relative mt-2 h-12 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                <MediaClip
                  kind="audio"
                  state="selected"
                  label="room-tone.wav"
                  duration="00:27"
                  className="absolute"
                  style={{ left: IN_PCT, width: "45%" }}
                />
              </div>

              {/* lane V1 — locked video clip */}
              <div className="relative mt-1.5 h-12 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                <MediaClip
                  kind="video"
                  state="locked"
                  label="b-roll-04.mp4"
                  duration="00:12"
                  className="absolute"
                  style={{ left: "34%", width: "54%" }}
                />
              </div>

              {/* lane T1 — caption text clip */}
              <div className="relative mt-1.5 h-12 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                <MediaClip
                  kind="text"
                  caption="Wind through the pines, distant traffic fades"
                  duration="00:11"
                  className="absolute"
                  style={{ left: "4%", width: "92%" }}
                />
              </div>

              {/* in / out readouts */}
              <div className="relative mt-1.5 h-4">
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: IN_PCT }}
                >
                  in 00:15.000
                </span>
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: OUT_PCT }}
                >
                  out 00:42.000
                </span>
              </div>
            </div>
          </section>

          {/* transport */}
          <footer className="mt-auto flex flex-none items-center justify-between gap-3 border-t border-solid border-default-border pt-3">
            <span className="truncate font-code text-[11px] tabular-nums text-neutral-500">
              00:18.240 / 01:00.000
            </span>
            <div className="flex flex-none items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous marker"
                className="flex size-10 items-center justify-center rounded-full border border-solid border-default-border text-neutral-600"
              >
                <SkipBack className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Play"
                className="flex size-10 items-center justify-center rounded-full bg-neutral-900 text-neutral-50"
              >
                <Play className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next marker"
                className="flex size-10 items-center justify-center rounded-full border border-solid border-default-border text-neutral-600"
              >
                <SkipForward className="size-4" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </EvalShell>
  );
}
