"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ActivityEvent } from "@/components/ds/ActivityEvent";
import { ChevronLeft, Mic, MoreHorizontal, Pause, Square } from "lucide-react";

// Deterministic waveform bar heights (percent of the track height)
const WAVE = [
  28, 46, 62, 38, 74, 52, 88, 60, 34, 70, 94, 56, 44, 78, 36, 64, 90, 50, 30,
  68, 84, 46, 58, 76, 40, 66, 48, 82, 34, 60, 72, 42, 56, 86, 38, 62, 54, 74,
  32, 64, 48, 80, 44, 58,
];

export default function Page() {
  const [gain, setGain] = React.useState([0.6]);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col gap-4 px-5 pt-2 pb-8">
        {/* App bar */}
        <header className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Back to memos"
            className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <Mic className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold tracking-tight">
              Voice Memo
            </span>
          </div>
          <button
            type="button"
            aria-label="More options"
            className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </header>

        {/* Recorder card */}
        <section className="rounded-2xl border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500" aria-hidden />
              <span className="text-sm font-medium">Recording</span>
            </div>
            <span className="font-code text-sm tabular-nums text-muted-foreground">
              00:42
            </span>
          </div>

          {/* Live waveform */}
          <div
            className="mt-4 flex h-12 items-center justify-between"
            aria-hidden
          >
            {WAVE.map((h, i) => (
              <span
                key={i}
                className="w-[3px] flex-none rounded-full bg-foreground/25"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Transport */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Pause recording"
              className="flex size-11 items-center justify-center rounded-full border text-foreground transition-colors hover:bg-muted"
            >
              <Pause className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Stop and save"
              className="flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90"
            >
              <Square className="size-4 fill-current" />
            </button>
          </div>

          {/* Mic gain */}
          <div className="mt-5 border-t pt-4">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="mic-gain" className="text-sm font-medium">
                Mic gain
              </label>
              <span className="font-code text-sm tabular-nums text-muted-foreground">
                {Math.round(gain[0] * 100)}%
              </span>
            </div>
            <Slider
              id="mic-gain"
              className="mt-4"
              value={gain}
              onValueChange={(v) => setGain(v as number[])}
              min={0}
              max={1}
              step={0.05}
              aria-label="Microphone gain"
            />
          </div>
        </section>

        {/* Memo title */}
        <section className="rounded-2xl border bg-card p-4 shadow-xs">
          <label htmlFor="memo-title" className="text-sm font-medium">
            Memo title
          </label>
          <Input
            id="memo-title"
            className="mt-3 h-11"
            defaultValue="Friday standup"
            placeholder="Name this memo"
            autoComplete="off"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Saved automatically when you stop recording.
          </p>
        </section>

        {/* Session activity */}
        <section className="rounded-2xl border bg-card p-4 shadow-xs">
          <h2 className="text-sm font-medium">Activity</h2>
          <div className="mt-1 flex flex-col">
            <ActivityEvent
              variant="system"
              body="Session started — 44.1 kHz · mono · auto-transcribe on"
              isFirst
            />
            <ActivityEvent
              author="Transcriber"
              timestamp="09:41"
              body="Draft transcript ready — 214 words, 3 speakers detected."
            />
            <ActivityEvent
              variant="email"
              subject="dana@studio.co"
              timestamp="09:42"
              body="Memo link shared — access expires in 7 days."
              isLast
            />
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
