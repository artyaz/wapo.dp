"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { TransportBar } from "@/components/ds/TransportBar";
import { AudioLines, Flag, MessageSquarePlus } from "lucide-react";

type Segment = {
  time: string;
  speaker: string;
  role: string;
  text: string;
  flagged?: boolean;
};

const SEGMENTS: Segment[] = [
  {
    time: "06:58",
    speaker: "Dr. Amara Okafor",
    role: "Coastal geomorphologist · UEA",
    text: "If you compare the orthophotos from 2019 with yesterday’s drone pass, the dune toe has retreated nearly eleven metres in places — and that is after a comparatively quiet winter for storm surges.",
  },
  {
    time: "07:23",
    speaker: "Ren Fujikawa",
    role: "Coastal operations · Environment Agency",
    text: "That tracks with the EA lidar, but I would want a second ground-control point before we publish a number. The previous survey crew ran the GPS base station on the wrong datum for almost a week.",
    flagged: true,
  },
  {
    time: "07:41",
    speaker: "Dr. Amara Okafor",
    role: "Coastal geomorphologist · UEA",
    text: "Agreed — I will log it and re-run the diff once the corrected point cloud lands. While we wait, talk me through the sluice failure at the eastern outfall; that is the section listeners keep writing in about.",
  },
];

function Waveform({ playedUntil }: { playedUntil: number }) {
  const bars = Array.from({ length: 84 }, (_, i) => {
    const wave = Math.abs(
      Math.sin(i * 0.55) * 0.62 + Math.sin(i * 0.17 + 1.3) * 0.38
    );
    return 8 + Math.round(48 * Math.min(1, wave));
  });
  return (
    <div
      className="flex h-28 w-full items-center justify-center gap-[3px] px-8"
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className={
            i < playedUntil
              ? "w-1 flex-none rounded-full bg-foreground/75"
              : "w-1 flex-none rounded-full bg-foreground/20"
          }
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* ---------- App header ---------- */}
        <header className="flex flex-none items-start justify-between gap-6 border-b border-border px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <AudioLines className="size-3.5" />
              Episode review · The Shorelines Podcast
            </div>
            <h1 className="mt-1.5 truncate text-lg font-semibold leading-tight">
              Field Notes on Coastal Erosion — Session 12: Snettisham Beach,
              North Norfolk
            </h1>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              48:15 · recorded 02 Oct 2024, 06:40 GMT · 2 speakers · draft
              transcript at 94% confidence · producer review pass 3
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 pt-1">
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              In review
            </span>
            <span className="rounded-full border border-success-500/30 bg-success-500/10 px-3 py-1 text-xs text-success-500">
              Autosaved 17:42
            </span>
          </div>
        </header>

        {/* ---------- Workbench ---------- */}
        <main className="grid min-h-0 flex-1 grid-cols-[7fr_5fr] gap-4 p-4">
          {/* Media stage with floating transport */}
          <section className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-10%,rgba(255,255,255,0.06)_0%,transparent_55%)]" />
            <div className="relative z-[1] flex items-start justify-between gap-4 px-5 pt-5">
              <span className="max-w-full truncate rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground">
                SNETTISHAM_BEACH__2024-10-02__TAKE-03.WAV
              </span>
              <span className="flex flex-none items-center gap-1.5 text-xs text-muted-foreground">
                <AudioLines className="size-3.5" />
                stereo · 48 kHz · 24-bit
              </span>
            </div>

            <div className="relative z-[1] flex flex-1 items-center justify-center px-2">
              <Waveform playedUntil={13} />
            </div>

            <div className="relative z-[1] flex justify-center pb-6">
              <TransportBar
                currentTime="07:23"
                totalTime="48:15"
                speed="1.5×"
              />
            </div>
          </section>

          {/* Transcript / annotations panel */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex flex-none items-baseline justify-between gap-3 border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">
                Transcript — Segment 04 · Eastern outfall
              </h2>
              <span className="font-mono text-[11px] text-muted-foreground">
                6 / 214
              </span>
            </div>

            {/* Toolbar: view toggle group + filter toggle group + annotation popover */}
            <div className="flex-none space-y-3 border-b border-border p-4">
              <ToggleGroup
                type="single"
                defaultValue="both"
                variant="outline"
                size="sm"
                aria-label="Panel view"
              >
                <ToggleGroupItem value="transcript" className="px-2.5">
                  Transcript only
                </ToggleGroupItem>
                <ToggleGroupItem value="annotations" className="px-2.5">
                  Annotations
                </ToggleGroupItem>
                <ToggleGroupItem value="both" className="px-2.5">
                  Transcript + annotations
                </ToggleGroupItem>
              </ToggleGroup>

              <div className="flex items-center justify-between gap-3">
                <ToggleGroup
                  type="multiple"
                  defaultValue={["flagged"]}
                  variant="outline"
                  size="sm"
                  aria-label="Segment filters"
                >
                  <ToggleGroupItem value="flagged" className="px-2.5">
                    Flagged
                  </ToggleGroupItem>
                  <ToggleGroupItem value="unclear" className="px-2.5">
                    Unclear audio
                  </ToggleGroupItem>
                  <ToggleGroupItem value="offmic" className="px-2.5">
                    Off-mic
                  </ToggleGroupItem>
                </ToggleGroup>

                <Popover defaultOpen>
                  <PopoverTrigger
                    render={
                      <Button variant="outline" size="sm" className="flex-none">
                        <MessageSquarePlus />
                        Annotate 07:23
                      </Button>
                    }
                  />
                  <PopoverContent align="end" side="bottom" className="w-80">
                    <PopoverHeader>
                      <PopoverTitle className="text-base">
                        Annotation · 07:23
                      </PopoverTitle>
                      <PopoverDescription>
                        On “Ren Fujikawa — EA lidar &amp; ground-control
                        points”, segment 11 of 214.
                      </PopoverDescription>
                    </PopoverHeader>
                    <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/80">
                      <p>
                        Hold the eleven-metre retreat figure until the second
                        ground-control point is verified — the datum slip
                        affected every survey taken between 14 and 20
                        September.
                      </p>
                      <p className="text-muted-foreground">
                        Suggested copy: “the dune toe has retreated by up to
                        eleven metres (pending survey verification)”.
                      </p>
                    </div>
                    <PopoverFooter className="mt-3.5">
                      <span className="text-xs text-muted-foreground">
                        Added 14:02 · editors only
                      </span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        1 reply
                      </span>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Transcript body */}
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-4">
              {SEGMENTS.map((s) => (
                <div
                  key={s.time}
                  className={
                    s.flagged
                      ? "rounded-xl border border-border bg-background/50 px-3 py-2.5"
                      : "rounded-xl px-3 py-2.5"
                  }
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex min-w-0 items-baseline gap-2">
                      <span className="flex-none text-sm font-medium text-foreground">
                        {s.speaker}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {s.role}
                      </span>
                    </div>
                    <span className="flex-none font-mono text-xs tabular-nums text-muted-foreground">
                      {s.time}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                    “{s.text}”
                  </p>
                  {s.flagged ? (
                    <div className="mt-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-warning-500/30 bg-warning-500/10 px-2.5 py-0.5 text-[11px] text-warning-500">
                        <Flag className="size-3" />
                        Awaiting second survey — do not publish
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="mt-auto flex flex-none items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="truncate">
                  Showing 06:58 – 07:41 · auto-scroll follows playback
                </span>
                <span className="flex-none font-mono">209 earlier segments</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
