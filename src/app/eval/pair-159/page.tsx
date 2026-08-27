"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MediaClip } from "@/components/ds/MediaClip";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  ChevronLeft,
  Lock,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";

const TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];
const PLAYHEAD = "25%";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-4 p-4">
        {/* App header */}
        <header className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Back to episodes"
            className="flex size-9 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel text-default-font"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold leading-tight text-default-font">
              Field Notes · Ep. 12
            </h1>
            <p className="truncate text-xs text-neutral-500">
              Harbor ambience — rough cut
            </p>
          </div>
          <span className="ml-auto flex-none rounded-full border border-solid border-default-border bg-panel px-2.5 py-1 font-code text-[11px] text-neutral-500">
            01:00
          </span>
        </header>

        {/* Timeline */}
        <section className="rounded-xl border border-solid border-default-border bg-panel p-3">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
              sequence · ambience-edit
            </span>
            <span className="flex items-center gap-1 font-code text-[11px] text-neutral-400">
              <Lock className="size-3" aria-hidden="true" />
              b-roll locked
            </span>
          </div>

          <div className="relative">
            {/* Ruler */}
            <div className="flex h-4 items-start justify-between border-b border-solid border-default-border">
              {TICKS.map((tick) => (
                <span
                  key={tick}
                  className="font-code text-[10px] text-neutral-400"
                >
                  {tick}
                </span>
              ))}
            </div>

            {/* Playhead */}
            <div
              className="pointer-events-none absolute inset-y-0 z-30 w-px bg-brand-primary"
              style={{ left: PLAYHEAD }}
            />

            {/* Lanes */}
            <div className="relative mt-2 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
              <MediaClip
                kind="audio"
                state="selected"
                label="intro-theme.wav"
                duration="00:18"
                className="absolute"
                style={{ left: "8%", width: "56%" }}
              />
            </div>
            <div className="relative mt-1.5 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
              <MediaClip
                kind="video"
                state="locked"
                label="b-roll-harbor.mp4"
                duration="00:12"
                className="absolute"
                style={{ left: "40%", width: "45%" }}
              />
            </div>
            <div className="relative mt-1.5 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
              <MediaClip
                kind="text"
                state="default"
                label="intro-card"
                duration="00:06"
                caption="Welcome back to Field Notes — recorded at the harbor."
                className="absolute"
                style={{ left: "20%", width: "60%" }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between font-code text-[10px] text-neutral-500">
            <span>in 00:08.000</span>
            <span>out 00:42.000</span>
          </div>
        </section>

        {/* Inspector */}
        <section className="rounded-xl border border-solid border-default-border bg-panel p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-default-font">
              Clip settings
            </h2>
            <span className="font-code text-[10px] uppercase tracking-[0.06em] text-neutral-400">
              audio · A1
            </span>
          </div>
          <p className="mt-0.5 text-xs text-neutral-500">
            Selected: intro-theme.wav
          </p>

          <div className="mt-3 space-y-3">
            <div className="grid gap-1.5">
              <Label htmlFor="pair-159-clip-name">Clip name</Label>
              <Input id="pair-159-clip-name" defaultValue="intro-theme.wav" />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="pair-159-snap">Snapping</Label>
              <ToggleGroup
                id="pair-159-snap"
                type="single"
                defaultValue="grid"
                variant="outline"
              >
                <ToggleGroupItem value="off">Off</ToggleGroupItem>
                <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
                <ToggleGroupItem value="edges">Edges</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="pair-159-zoom">Timeline zoom</Label>
              <ToggleGroup
                id="pair-159-zoom"
                type="single"
                defaultValue="2x"
                variant="outline"
              >
                <ToggleGroupItem value="1x">1×</ToggleGroupItem>
                <ToggleGroupItem value="2x">2×</ToggleGroupItem>
                <ToggleGroupItem value="4x">4×</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </section>

        {/* Transport */}
        <footer className="mt-auto flex items-center gap-3 rounded-xl border border-solid border-default-border bg-panel px-3 py-2.5">
          <button
            type="button"
            aria-label="Skip back"
            className="flex size-8 items-center justify-center rounded-md text-default-font"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Play"
            className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground"
          >
            <Play className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Skip forward"
            className="flex size-8 items-center justify-center rounded-md text-default-font"
          >
            <SkipForward className="size-4" />
          </button>
          <span className="ml-auto font-code text-[11px] text-neutral-500">
            00:15 / 01:00
          </span>
        </footer>
      </main>
    </EvalShell>
  );
}
