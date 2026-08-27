"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";
import { Switch } from "@/components/ui/switch";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import {
  AudioLinesIcon,
  ChevronLeftIcon,
  Disc3Icon,
  HeartIcon,
  PauseIcon,
  Share2Icon,
  SkipBackIcon,
  SkipForwardIcon,
  UsersIcon,
} from "lucide-react";

/**
 * pair-177 — "Praxis Audio" now-playing screen (light, 360×640, ltr).
 *
 * A phone media player with its playlist: album art with a glass
 * FloatingToolbar hovering over its bottom edge (transport + like/share),
 * track info and progress, the "Up next" queue for the playlist, a compact
 * listening-room chat rendered with bubbles, and playback preferences
 * (autoplay / crossfade) as switch rows.
 */

const UP_NEXT = [
  { title: "Static Bloom", artist: "Mira Vale", duration: "3:41" },
  { title: "Paper Sky", artist: "Ondo Fields", duration: "4:12" },
  { title: "Low Tide Radio", artist: "Kaito Ren", duration: "2:58" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="min-h-screen bg-background pb-8 text-foreground">
        {/* Top bar */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
          <ChevronLeftIcon className="size-[18px] text-muted-foreground" />
          <span className="text-sm font-semibold tracking-tight">
            Now Playing
          </span>
          <span className="ml-auto text-[11px] text-muted-foreground">
            Low Static · 12 tracks
          </span>
        </header>

        <main className="px-4">
          {/* Album art with the glass FloatingToolbar floating over its edge */}
          <div className="relative mt-4">
            <div className="relative h-[150px] overflow-hidden rounded-2xl border border-border bg-muted">
              <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_55%)]" />
              <Disc3Icon className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-foreground/10" />
              <span className="absolute left-3 top-3 rounded-full border border-border/70 bg-background/70 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
                From playlist · Low Static
              </span>
            </div>
            <div className="absolute -bottom-[18px] inset-x-0 z-20 flex justify-center">
              <FloatingToolbar>
                <FloatingToolbar.Action
                  glyph={<SkipBackIcon size={13} fill="currentColor" />}
                  aria-label="Previous track"
                />
                <FloatingToolbar.Action
                  glyph={<PauseIcon size={13} fill="currentColor" />}
                  label="Pause"
                />
                <FloatingToolbar.Action
                  glyph={<SkipForwardIcon size={13} fill="currentColor" />}
                  aria-label="Next track"
                />
                <FloatingToolbar.Rule />
                <FloatingToolbar.Action
                  glyph={<HeartIcon size={13} />}
                  aria-label="Save to liked songs"
                />
                <FloatingToolbar.Action
                  glyph={<Share2Icon size={13} />}
                  aria-label="Share track"
                />
              </FloatingToolbar>
            </div>
          </div>

          {/* Track info + progress */}
          <div className="mt-7">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h1 className="truncate text-[15px] font-semibold leading-tight tracking-tight">
                  Glass Horizon
                </h1>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Mira Vale · Low Static
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">
                <AudioLinesIcon className="size-3" />
                Playing
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-7 text-right text-[10px] tabular-nums text-muted-foreground">
                1:24
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[38%] rounded-full bg-foreground/75" />
              </div>
              <span className="w-7 text-[10px] tabular-nums text-muted-foreground">
                3:56
              </span>
            </div>
          </div>

          {/* Playlist — Up next */}
          <section className="mt-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Up next
              </h2>
              <span className="text-[10px] text-muted-foreground">
                48 min remaining
              </span>
            </div>
            <div className="mt-1 divide-y divide-border/70">
              <div className="flex items-center gap-3 py-2">
                <AudioLinesIcon className="size-3.5 shrink-0 text-foreground/70" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-muted-foreground">
                    Glass Horizon
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground/80">
                    Mira Vale · now playing
                  </p>
                </div>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  3:56
                </span>
              </div>
              {UP_NEXT.map((track, i) => (
                <div key={track.title} className="flex items-center gap-3 py-2">
                  <span className="w-3.5 shrink-0 text-center text-[11px] tabular-nums text-muted-foreground/70">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">
                      {track.title}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {track.artist}
                    </p>
                  </div>
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Listening room — live chat about the track */}
          <section className="mt-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Listening room
              </h2>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <UsersIcon className="size-3" />
                4 in room
              </span>
            </div>
            <BubbleGroup className="mt-2">
              <Bubble variant="secondary">
                <span className="pl-1 text-[10px] font-medium text-muted-foreground">
                  Maya · 2 min
                </span>
                <BubbleContent className="px-3 py-2 text-[13px]">
                  That key change at 2:10 is unreal.
                </BubbleContent>
              </Bubble>
              <Bubble variant="primary" align="end">
                <BubbleContent className="px-3 py-2 text-[13px]">
                  Looping this all week.
                </BubbleContent>
              </Bubble>
              <Bubble variant="primary" align="end">
                <BubbleContent className="px-3 py-2 text-[13px]">
                  Putting the whole album on repeat.
                </BubbleContent>
              </Bubble>
            </BubbleGroup>
          </section>

          {/* Playback preferences */}
          <section className="mt-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Playback
            </h2>
            <div className="mt-2 divide-y divide-border/70 rounded-xl border border-border bg-card/50">
              <label
                htmlFor="sw-autoplay"
                className="flex cursor-pointer items-center gap-3 px-3.5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium">Autoplay</div>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    Keep the queue rolling when Low Static ends
                  </p>
                </div>
                <Switch id="sw-autoplay" defaultChecked aria-label="Autoplay" />
              </label>
              <label
                htmlFor="sw-crossfade"
                className="flex cursor-pointer items-center gap-3 px-3.5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium">Crossfade</div>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    Blend 4-second transitions between tracks
                  </p>
                </div>
                <Switch id="sw-crossfade" aria-label="Crossfade" />
              </label>
            </div>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
