"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { MethodChip } from "@/components/ds/MethodChip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Disc3,
  ListMusic,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

/**
 * pair-101 — compact media player dock (390×420, light, ltr).
 * Wavecast: a mini player for a self-hosted media-api. The queue lists each
 * track with the HTTP method that resolves its source endpoint (MethodChip),
 * the playlist is chosen with a Select, and Separator divides player / queue /
 * rows.
 */

const queue = [
  {
    method: "get" as const,
    title: "Neon Rain",
    path: "/stream/neon-rain.flac",
    duration: "2:58",
  },
  {
    method: "post" as const,
    title: "City Lights — rough cut",
    path: "/uploads/city-lights.wav",
    duration: "3:15",
  },
  {
    method: "patch" as const,
    title: "Afterglow (remaster)",
    path: "/library/afterglow.flac",
    duration: "4:02",
  },
];

const controlButton =
  "flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-dvh flex-col gap-3 overflow-hidden px-4 pb-4 pt-3.5">
        {/* Brand + playlist picker */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
              <Disc3 className="size-4" />
            </span>
            <span className="text-[13px] font-semibold tracking-tight">
              Wavecast
            </span>
          </div>
          <Select defaultValue="late-night">
            <SelectTrigger
              size="sm"
              aria-label="Choose playlist"
              className="h-8 gap-1.5 px-2.5 text-xs"
            >
              <ListMusic className="size-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Your playlists</SelectLabel>
                <SelectItem value="late-night">Late Night Drive</SelectItem>
                <SelectItem value="focus">Focus Flow</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Auto</SelectLabel>
                <SelectItem value="liked">Liked from radio</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </header>

        <Separator />

        {/* Now playing */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
              <Disc3 className="size-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-5">
                Midnight Drive
              </p>
              <p className="truncate text-xs leading-4 text-muted-foreground">
                Neon District · Late Night Drive
              </p>
            </div>
            <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Hi-Fi
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-8 text-right text-[10px] tabular-nums leading-none text-muted-foreground">
              1:12
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[38%] rounded-full bg-foreground" />
            </div>
            <span className="w-8 text-[10px] tabular-nums leading-none text-muted-foreground">
              3:42
            </span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <button type="button" className={controlButton} aria-label="Shuffle">
              <Shuffle className="size-4" />
            </button>
            <button type="button" className={controlButton} aria-label="Previous track">
              <SkipBack className="size-4 fill-current" />
            </button>
            <button
              type="button"
              aria-label="Play or pause"
              className="flex size-10 items-center justify-center rounded-full bg-foreground text-background"
            >
              <Play className="size-4 fill-current" />
            </button>
            <button type="button" className={controlButton} aria-label="Next track">
              <SkipForward className="size-4 fill-current" />
            </button>
            <button type="button" className={controlButton} aria-label="Repeat">
              <Repeat className="size-4" />
            </button>
          </div>
        </section>

        <Separator />

        {/* Queue */}
        <section className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Up next
            </h2>
            <span className="text-[11px] text-muted-foreground">
              sources · media-api
            </span>
          </div>
          <div className="mt-2.5 flex flex-col">
            {queue.map((track, i) => (
              <React.Fragment key={track.title}>
                {i > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-2.5">
                  <MethodChip method={track.method} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium leading-[18px]">
                      {track.title}
                    </p>
                    <p className="truncate font-code text-[11px] leading-[15px] text-muted-foreground">
                      {track.path}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                    {track.duration}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
