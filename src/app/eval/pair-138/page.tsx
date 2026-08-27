"use client";

/**
 * pair-138 — "Praxis Audio" desktop media player with its playlist.
 * Stars: ui:badge (format / status pills), ui:context-menu (per-track
 * right-click actions — opened via a synthetic `contextmenu` event so the
 * screenshot shows it in its open state), ui:marker (playlist section
 * separators, stream-quality strip, interaction hint).
 * Conditions: 1024x768 laptop, dark theme, ltr.
 */

import React from "react";
import {
  AudioLinesIcon,
  CheckIcon,
  HardDriveDownloadIcon,
  ListMusicIcon,
  ListPlusIcon,
  MousePointerClickIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Trash2Icon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";

type Track = {
  title: string;
  artist: string;
  duration: string;
  tag?: { label: string; variant: "outline" | "secondary" };
  downloaded?: boolean;
};

const nowPlaying: Track = {
  title: "Glasshouse",
  artist: "Kira Vale",
  duration: "4:03",
  downloaded: true,
};

const upNext: Track[] = [
  {
    title: "Neon Rain",
    artist: "Ashgrove",
    duration: "3:47",
    tag: { label: "Explicit", variant: "secondary" },
    downloaded: true,
  },
  { title: "Slow Tide", artist: "Fern Motel", duration: "5:12", tag: { label: "Hi-Res", variant: "secondary" } },
  { title: "Paper Planes at Dawn", artist: "Lumen Fields", duration: "4:28" },
];

const suggested: Track[] = [
  { title: "Meridian", artist: "Halcyon Drift", duration: "6:02", tag: { label: "Lossless", variant: "outline" }, downloaded: true },
  { title: "Static Bloom", artist: "Nova Crescent", duration: "3:33", tag: { label: "Explicit", variant: "secondary" } },
  { title: "Night Bus", artist: "Marrow & Pine", duration: "4:15" },
  { title: "Copper Sky", artist: "Sage Harbour", duration: "5:40", tag: { label: "Hi-Res", variant: "secondary" } },
];

const transportButton =
  "flex size-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-muted hover:text-foreground";

const sectionMarkerContent = "font-medium uppercase tracking-[0.14em]";

function TrackRow({
  track,
  index,
  playing = false,
  rowRef,
}: {
  track: Track;
  index: number;
  playing?: boolean;
  rowRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={rowRef}
          className={`group flex w-full cursor-default items-center gap-3 rounded-lg px-3 py-2 ${
            playing ? "bg-muted/60" : "hover:bg-muted/40"
          }`}
        >
          {playing ? (
            <span className="flex w-5 shrink-0 items-end justify-center gap-[3px]" aria-hidden="true">
              <span className="h-1.5 w-[3px] rounded-[1px] bg-foreground" />
              <span className="h-3 w-[3px] rounded-[1px] bg-foreground" />
              <span className="h-2 w-[3px] rounded-[1px] bg-foreground" />
            </span>
          ) : (
            <span className="w-5 shrink-0 text-right font-caption text-caption tabular-nums text-neutral-500">
              {index}
            </span>
          )}
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-medium text-foreground">{track.title}</span>
            <span className="truncate font-caption text-caption text-neutral-500">{track.artist}</span>
          </span>
          {playing && <Badge>Playing</Badge>}
          {track.tag && <Badge variant={track.tag.variant}>{track.tag.label}</Badge>}
          <span className="w-9 shrink-0 text-right font-caption text-caption tabular-nums text-neutral-500">
            {track.duration}
          </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel className="truncate">{track.title}</ContextMenuLabel>
        <ContextMenuGroup>
          <ContextMenuItem>
            <PlayIcon />
            Play next
            <ContextMenuShortcut>⇧N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <ListPlusIcon />
            Add to queue
            <ContextMenuShortcut>⇧Q</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked={track.downloaded}>Downloaded</ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ListMusicIcon />
            Add to playlist
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Deep Focus</ContextMenuItem>
            <ContextMenuItem>Late Coding</ContextMenuItem>
            <ContextMenuItem>New playlist…</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          Remove from playlist
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default function Page() {
  const contextRowRef = React.useRef<HTMLDivElement>(null);

  // Radix's ContextMenu opens on the `contextmenu` event at the pointer
  // coordinates — synthesize one on the "Neon Rain" row so the menu is
  // deterministically open in the captured screenshot.
  React.useEffect(() => {
    const el = contextRowRef.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const x = Math.max(12, Math.min(rect.left + rect.width * 0.5, window.innerWidth - 288));
      const y = Math.max(12, Math.min(rect.top + rect.height * 0.55, window.innerHeight - 340));
      el.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          button: 2,
          buttons: 2,
          clientX: x,
          clientY: y,
        })
      );
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full min-h-0 flex-col overflow-hidden bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-default-border px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <AudioLinesIcon className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Praxis Audio</span>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <HardDriveDownloadIcon />
            Downloads
          </Badge>
        </header>

        <main className="flex min-h-0 flex-1">
          {/* Now playing */}
          <section className="flex w-[58%] min-w-0 flex-col items-center justify-center gap-6 border-r border-default-border px-10 py-6">
            {/* Album cover */}
            <div className="relative flex size-52 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-700/40 via-neutral-800 to-neutral-950 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
              <span className="absolute left-4 top-3.5 font-caption text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                Praxis Records
              </span>
              <span className="flex size-28 items-center justify-center rounded-full border border-white/10 bg-black/30">
                <span className="size-2.5 rounded-full bg-neutral-400" />
              </span>
              <span className="absolute bottom-3.5 right-4 font-caption text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                PRX·014
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="font-heading-2 text-heading-2 text-default-font">Glasshouse</h1>
              <p className="font-caption text-caption text-neutral-500">Kira Vale — Night Drive · 2025</p>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="outline">Lossless</Badge>
                <Badge variant="secondary">Hi-Res</Badge>
                <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">Spatial</Badge>
              </div>
            </div>

            {/* Seek bar */}
            <div className="w-full max-w-sm">
              <div className="relative h-1 rounded-full bg-border">
                <div className="absolute inset-y-0 left-0 w-[55%] rounded-full bg-foreground/80" />
                <div className="absolute top-1/2 left-[55%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
              </div>
              <div className="mt-2 flex justify-between font-caption text-caption tabular-nums text-neutral-500">
                <span>2:14</span>
                <span>1:49</span>
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex items-center gap-1.5">
              <button type="button" aria-label="Shuffle" className={transportButton}>
                <ShuffleIcon className="size-4" />
              </button>
              <button type="button" aria-label="Previous track" className={transportButton}>
                <SkipBackIcon className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Play or pause"
                className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-[1.04]"
              >
                <PlayIcon className="size-5 fill-current" />
              </button>
              <button type="button" aria-label="Next track" className={transportButton}>
                <SkipForwardIcon className="size-5" />
              </button>
              <button type="button" aria-label="Repeat" className={`${transportButton} text-neutral-300`}>
                <RepeatIcon className="size-4" />
              </button>
            </div>

            {/* Stream quality — ui:marker (border variant) */}
            <div className="w-full max-w-sm">
              <Marker variant="border" className="justify-center">
                <MarkerIcon>
                  <AudioLinesIcon />
                </MarkerIcon>
                <MarkerContent>FLAC · 24-bit / 96 kHz · lossless stream</MarkerContent>
              </Marker>
            </div>
          </section>

          {/* Playlist */}
          <aside className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-default-border px-5 pb-3.5 pt-4">
              <div className="flex flex-col gap-1">
                <p className="font-caption text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                  Playlist
                </p>
                <h2 className="font-heading-3 text-heading-3 text-default-font">Night Drive</h2>
                <p className="font-caption text-caption text-neutral-500">12 tracks · 47 min · updated Tue</p>
              </div>
              <Badge variant="outline" className="mt-1 gap-1.5">
                <CheckIcon />
                Synced
              </Badge>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              {/* ui:marker (separator variant) */}
              <Marker variant="separator" className="px-2">
                <MarkerContent className={sectionMarkerContent}>Now playing</MarkerContent>
              </Marker>
              <TrackRow track={nowPlaying} index={1} playing />

              <Marker variant="separator" className="mt-2 px-2">
                <MarkerContent className={sectionMarkerContent}>Up next</MarkerContent>
              </Marker>
              <TrackRow track={upNext[0]} index={2} rowRef={contextRowRef} />
              <TrackRow track={upNext[1]} index={3} />
              <TrackRow track={upNext[2]} index={4} />

              <Marker variant="separator" className="mt-2 px-2">
                <MarkerContent className={sectionMarkerContent}>Suggested</MarkerContent>
              </Marker>
              {suggested.map((track, i) => (
                <TrackRow key={track.title} track={track} index={5 + i} />
              ))}
            </div>

            <footer className="shrink-0 border-t border-default-border px-4 py-3">
              {/* ui:marker (default variant) */}
              <Marker>
                <MarkerIcon>
                  <MousePointerClickIcon />
                </MarkerIcon>
                <MarkerContent>Right-click any track for actions</MarkerContent>
              </Marker>
            </footer>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
