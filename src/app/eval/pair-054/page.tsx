"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { AssetCard } from "@/components/ds/AssetCard";
import { TimeScrubber } from "@/components/ds/TimeScrubber";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CloudOffIcon, MicIcon } from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-5 px-4 py-6">
        {/* App header */}
        <header className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-solid border-default-border bg-panel text-default-font">
            <MicIcon className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-body text-[15px] font-[500] leading-[20px] text-default-font">
              Field Tape · EP 042
            </span>
            <span className="font-code text-[11px] leading-[16px] text-neutral-500">
              Harbor interviews · 4 assets
            </span>
          </div>
        </header>

        {/* Sync status alert */}
        <Alert>
          <CloudOffIcon />
          <AlertTitle>Sync paused</AlertTitle>
          <AlertDescription>
            2 assets are waiting to upload. Reconnect to Wi-Fi to resume the
            session backup.
          </AlertDescription>
          <AlertAction>
            <Button size="xs" variant="default">
              Retry
            </Button>
          </AlertAction>
        </Alert>

        {/* Session activity range */}
        <section className="flex w-full flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
              session activity · rec-042
            </span>
            <span className="font-code text-[11px] text-neutral-400">
              13:12 – 20:24
            </span>
          </div>
          <TimeScrubber
            activeRange="1-d"
            rangeStart="13:12"
            rangeEnd="20:24"
          />
        </section>

        {/* Session assets */}
        <section className="flex w-full flex-col gap-3">
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
            assets · today
          </span>
          <div className="grid w-full grid-cols-2 gap-3">
            <AssetCard
              kind="audio"
              title="room-tone.wav"
              duration="00:48"
              meta="WAV · 48 kHz · 24-bit"
            />
            <AssetCard
              kind="video"
              title="b-roll-harbor.mov"
              duration="01:12"
              meta="ProRes · 4K · 24 fps"
            />
            <AssetCard
              kind="text"
              title="interview-notes.md"
              meta="Markdown · 2.4 KB"
            />
            <AssetCard
              kind="audio"
              title="vox-pop-07.mp3"
              duration="03:26"
              meta="MP3 · 320 kbps"
            />
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
