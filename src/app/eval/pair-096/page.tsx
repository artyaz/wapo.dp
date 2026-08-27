"use client";

import React from "react";
import {
  AudioWaveform,
  BookmarkPlus,
  Check,
  MessageSquarePlus,
  Play,
  Repeat,
  Share2,
  TriangleAlert,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Card } from "@/components/ds/Card";
import { TransportBar } from "@/components/ds/TransportBar";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

/* ---- deterministic session data ---- */

const TOTAL_SECONDS = 34 * 60 + 12; // 34:12
const CURRENT_SECONDS = 7 * 60 + 31; // 07:31
const PROGRESS = CURRENT_SECONDS / TOTAL_SECONDS;

// Speech-like waveform: slow envelope × fast detail, fully deterministic.
const BARS = Array.from({ length: 76 }, (_, i) => {
  const envelope = Math.sin((i / 75) * Math.PI) ** 0.6;
  const clusters = 0.55 + 0.45 * Math.sin(i * 0.31 + 2.1);
  const fine = 0.6 + 0.4 * Math.sin(i * 1.7 + 0.6);
  return 0.1 + 0.9 * (envelope * (0.7 * clusters + 0.3 * fine));
});

const AXIS_TICKS = ["00:00", "08:33", "17:06", "25:39", "34:12"];

const MARKERS = [
  { time: "00:42", label: "Cold open — retake approved", tone: "ok" as const },
  { time: "07:31", label: "Second theme enters", tone: "now" as const },
  { time: "21:05", label: "Level dip on left channel", tone: "warn" as const },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex h-dvh w-full max-w-[1200px] flex-col px-6 py-6">
        {/* ---------- app header ---------- */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card shadow-xs">
              <AudioWaveform className="size-4.5 text-foreground" />
            </div>
            <div>
              <p className="text-[15px] font-semibold leading-tight text-foreground">
                Cadence Studio
              </p>
              <p className="pt-0.5 text-xs text-muted-foreground">
                Shows · Field Notes · Episode 12
              </p>
            </div>
          </div>
          <ButtonGroup aria-label="Workspace mode">
            <Button size="sm" variant="secondary">
              Edit
            </Button>
            <Button size="sm">Review</Button>
            <ButtonGroupSeparator />
            <Button
              size="icon-sm"
              variant="secondary"
              aria-label="Share session"
            >
              <Share2 />
            </Button>
          </ButtonGroup>
        </header>

        {/* ---------- main ---------- */}
        <main className="mt-6 grid min-h-0 flex-1 grid-cols-12 gap-6">
          {/* ===== playback stage ===== */}
          <section
            aria-label="Playback stage"
            className="relative col-span-8 flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-neutral-50"
          >
            {/* studio backdrop */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(0,0,0,0.045)_0%,transparent_62%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-44 w-[540px] -translate-x-1/2 rounded-full bg-gradient-to-r from-neutral-300/50 via-neutral-200/60 to-neutral-300/50 blur-2xl" />

            {/* stage header */}
            <div className="relative z-[1] flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Now reviewing
                </p>
                <h2 className="pt-1 text-lg font-semibold leading-tight text-foreground">
                  “The Quiet Web” — narration, take 3
                </h2>
                <p className="pt-1 text-xs text-muted-foreground">
                  48 kHz · 24-bit · imported 2 h ago by Mara Lindqvist
                </p>
              </div>
              <ButtonGroup aria-label="Stage tools" className="mt-0.5 shrink-0">
                <Button
                  size="icon-sm"
                  variant="secondary"
                  aria-label="Drop a marker at playhead"
                >
                  <BookmarkPlus />
                </Button>
                <Button
                  size="icon-sm"
                  variant="secondary"
                  aria-label="Loop selection"
                >
                  <Repeat />
                </Button>
                <Button
                  size="icon-sm"
                  variant="secondary"
                  aria-label="Add timecoded comment"
                >
                  <MessageSquarePlus />
                </Button>
              </ButtonGroup>
            </div>

            {/* waveform */}
            <div className="relative z-[1] flex min-h-0 flex-1 items-center px-6 py-8">
              <div className="relative flex h-44 w-full items-end justify-between gap-[3px]">
                {BARS.map((value, i) => (
                  <span
                    key={i}
                    className={
                      i / 75 <= PROGRESS
                        ? "w-[6px] shrink-0 rounded-full bg-neutral-800"
                        : "w-[6px] shrink-0 rounded-full bg-neutral-300"
                    }
                    style={{ height: `${Math.round(value * 100)}%` }}
                  />
                ))}
                <span
                  className="pointer-events-none absolute inset-y-0 w-px bg-neutral-900"
                  style={{ left: `${(PROGRESS * 100).toFixed(2)}%` }}
                >
                  <span className="absolute -top-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-neutral-900" />
                </span>
              </div>
            </div>

            {/* time axis */}
            <div className="relative z-[1] flex items-center justify-between px-6 text-[10px] tabular-nums text-muted-foreground">
              {AXIS_TICKS.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>

            {/* floating transport */}
            <div className="relative z-[1] flex items-center justify-center pb-7 pt-6">
              <TransportBar
                currentTime="07:31"
                totalTime="34:12"
                speed="1.25×"
              />
            </div>
          </section>

          {/* ===== review rail ===== */}
          <div className="col-span-4 flex min-h-0 flex-col gap-6">
            <Card
              header={
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="text-body-medium text-default-font">
                    Session review · Ep. 12
                  </span>
                  <span className="text-caption font-caption text-neutral-500">
                    narration take 3 · reviewer Mara · due Friday
                  </span>
                </div>
              }
              footer={
                <>
                  <span className="text-caption font-caption text-neutral-500">
                    rev 4 · autosaved
                  </span>
                  <ButtonGroup aria-label="Review actions">
                    <Button size="sm" variant="secondary">
                      Save
                    </Button>
                    <ButtonGroupSeparator />
                    <Button size="sm">Approve</Button>
                  </ButtonGroup>
                </>
              }
            >
              <p className="w-full text-body text-default-font">
                Narration sits about 2 dB under the ambience bed once the second
                theme enters. The retake at 00:42 matches reference loudness;
                only the left-channel dip at 21:05 still needs a pass before
                this episode can go to mixdown.
              </p>
              <dl className="grid w-full grid-cols-3 gap-2 border-t border-default-border pt-3">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                    loudness
                  </dt>
                  <dd className="pt-0.5 font-code text-[13px] tabular-nums text-default-font">
                    −16.2 LUFS
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                    peak
                  </dt>
                  <dd className="pt-0.5 font-code text-[13px] tabular-nums text-default-font">
                    −1.2 dBFS
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                    markers
                  </dt>
                  <dd className="pt-0.5 font-code text-[13px] tabular-nums text-default-font">
                    3
                  </dd>
                </div>
              </dl>
            </Card>

            <Card
              className="min-h-0 flex-1"
              header={
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="text-body-medium text-default-font">
                    Markers
                  </span>
                  <span className="text-caption font-caption text-neutral-500">
                    3 pinned · select a row to seek
                  </span>
                </div>
              }
              footer={
                <span className="text-caption font-caption text-neutral-500">
                  synced with the waveform playhead
                </span>
              }
            >
              <ul className="w-full divide-y divide-default-border">
                {MARKERS.map((marker) => (
                  <li
                    key={marker.time}
                    className={
                      marker.tone === "now"
                        ? "-mx-2 flex w-[calc(100%+16px)] items-center gap-3 rounded-md bg-neutral-100 px-2 py-2.5"
                        : "flex w-full items-center gap-3 py-2.5"
                    }
                  >
                    <span className="w-[52px] shrink-0 rounded-md border border-default-border bg-panel px-1.5 py-1 text-center font-code text-[11px] tabular-nums text-neutral-500">
                      {marker.time}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-body text-default-font">
                      {marker.label}
                    </span>
                    {marker.tone === "ok" ? (
                      <Check className="size-3.5 shrink-0 text-emerald-600" />
                    ) : null}
                    {marker.tone === "now" ? (
                      <Play className="size-3.5 shrink-0 fill-neutral-900 text-neutral-900" />
                    ) : null}
                    {marker.tone === "warn" ? (
                      <TriangleAlert className="size-3.5 shrink-0 text-amber-600" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
