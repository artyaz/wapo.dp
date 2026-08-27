"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { TextField } from "@/components/ds/TextField";
import { StatTile } from "@/components/ds/StatTile";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * pair-109 — "Short insights" sheet, the bottom half of a phone (390×420).
 *
 * Scenario: a creator opens the compact insights dock for their latest
 * vertical short, checks how it is performing (plays, completion), and fixes
 * the video title before sharing it out.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex h-dvh w-full max-w-[390px] flex-col overflow-hidden px-4 pb-4 pt-3">
        {/* sheet grabber */}
        <div
          className="mx-auto mb-2.5 h-1 w-9 shrink-0 rounded-full bg-neutral-300"
          aria-hidden="true"
        />

        {/* header */}
        <header className="flex shrink-0 items-baseline justify-between gap-3 border-b border-default-border pb-2.5">
          <h2 className="text-[15px] font-semibold leading-[19px] text-default-font">
            Short insights
          </h2>
          <span className="text-caption font-caption text-neutral-500">
            Last 7 days
          </span>
        </header>

        {/* media + metrics */}
        <div className="mt-3 flex min-h-0 flex-1 gap-3">
          {/* vertical thumbnail, kept at 9:16 like the source clip */}
          <div className="flex w-[112px] shrink-0 flex-col gap-1.5 overflow-hidden">
            <AspectRatio
              ratio={9 / 16}
              className="w-full overflow-hidden rounded-lg border border-default-border bg-gradient-to-br from-neutral-200 to-neutral-300"
            >
              <Image
                src="https://avatar.vercel.sh/short-24"
                alt="Cover frame of Short #24"
                fill
                sizes="112px"
                className="object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 rounded-[4px] bg-black/60 px-1 py-px font-code text-[10px] leading-4 text-white">
                0:42
              </span>
              <span className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-[2px]">
                <Play className="size-3.5 fill-current" />
              </span>
            </AspectRatio>
            <p className="truncate text-caption font-caption text-neutral-500">
              Short #24
            </p>
          </div>

          {/* the two numbers that matter */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <StatTile
              label="Plays"
              value="12.4k"
              delta="+8.1%"
              sign="positive"
              footer="vs. prior 7 days"
              className="min-h-0 flex-1 justify-between"
            />
            <StatTile
              label="Completion"
              value="71%"
              delta="−2.4%"
              sign="negative"
              footer="watched to the end"
              className="min-h-0 flex-1 justify-between"
            />
          </div>
        </div>

        {/* title fix before sharing */}
        <div className="mt-3 shrink-0">
          <TextField
            label="Video title"
            trailing={
              <span className="font-code text-[11px] tabular-nums">26/60</span>
            }
          >
            <TextField.Input
              defaultValue="The Quiet Science of Sleep"
              placeholder="Name your short"
            />
          </TextField>
        </div>
      </div>
    </EvalShell>
  );
}
