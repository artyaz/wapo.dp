"use client";

import React from "react";
import {
  BookmarkIcon,
  BookOpenIcon,
  ClockIcon,
  CloudOffIcon,
  HighlighterIcon,
  ListOrderedIcon,
  RulerIcon,
  TypeIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Drawer } from "@/components/ds/Drawer";
import * as SubframeCore from "@/lib/subframe/core";

const paragraphs = [
  "The team reached the lower transect at 07:40, roughly forty minutes behind schedule after the detour around the washout. Fog sat low over the meadow until mid-morning, which kept the pollinator counts quiet for the first hour.",
  "Bee activity picked up sharply once the sun cleared the ridge — mostly bumblebees on the monkshood along the north fence line, with a few solitary leafcutters near the survey plot markers we placed in June.",
  "Vegetation height in the ungrazed section is a full hand taller than last year's measurements, which matches what the rancher reported in July. A second pass is needed to confirm whether the difference holds across the east transect before it goes in the write-up.",
  "Notes and sample bags are labeled with the new prefix; the old labels confused the lab twice this season, so double-check the stickers before sealing anything.",
];

const sessionStats = [
  { icon: ListOrderedIcon, label: "Progress", value: "12 of 18 sections" },
  { icon: HighlighterIcon, label: "Highlights", value: "7 notes" },
  { icon: BookmarkIcon, label: "Bookmarks", value: "2 markers" },
  { icon: ClockIcon, label: "Est. time left", value: "14 min" },
];

export default function Page() {
  const [open, setOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex shrink-0 items-center gap-4 border-b border-border px-6 py-3.5">
          <BookOpenIcon className="size-5 shrink-0 text-muted-foreground" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">Field Notes</span>
            <span className="truncate text-xs text-muted-foreground">
              Surveys / Alpine meadow · Day 2
            </span>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <span className="ml-auto shrink-0 text-xs text-muted-foreground">
            62% read · offline copy
          </span>
        </header>

        {/* Body: article underneath, options sheet over it */}
        <div className="relative flex-1 overflow-hidden">
          {/* Article under the scrim */}
          <div className="absolute inset-0 px-10 py-8">
            <article className="mx-auto flex max-w-[42ch] flex-col gap-4 text-sm leading-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                Field log · Aug 14
              </span>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight">
                Alpine meadow survey — Day 2
              </h1>
              <p>{paragraphs[0]}</p>
              <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground">
                Count steady through noon; drop-off begins the moment the shadow
                crosses plot C.
              </blockquote>
              {paragraphs.slice(1).map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </article>
          </div>

          {/* Reading options sheet */}
          <Drawer open={open} onOpenChange={setOpen} direction="right" modal={false}>
            <Drawer.Content aria-describedby={undefined}>
              <div className="flex h-full w-[300px] max-w-full flex-col gap-6 p-6">
                <div className="flex flex-col gap-1.5">
                  <SubframeCore.Drawer.Title className="text-lg font-semibold tracking-tight text-foreground">
                    Reading options
                  </SubframeCore.Drawer.Title>
                  <span className="text-xs text-muted-foreground">
                    Alpine meadow survey · saved offline
                  </span>
                </div>

                {/* Reading mode toggles */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    Reading mode
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <Toggle variant="outline" pressed aria-label="Serif typeface">
                      <TypeIcon />
                      Serif
                    </Toggle>
                    <Toggle variant="outline" aria-label="Reading ruler">
                      <RulerIcon />
                      Ruler
                    </Toggle>
                    <Toggle variant="outline" pressed aria-label="Show highlights">
                      <HighlighterIcon />
                      Notes
                    </Toggle>
                    <Toggle
                      variant="outline"
                      disabled
                      aria-label="Sync highlights — unavailable offline"
                    >
                      <CloudOffIcon />
                      Sync
                    </Toggle>
                  </div>
                </div>

                <Separator />

                {/* Session stats */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    This session
                  </span>
                  <div className="flex w-full flex-col gap-2.5 text-sm">
                    {sessionStats.map(({ icon: Icon, label, value }, index) => (
                      <React.Fragment key={label}>
                        <dl className="flex items-center justify-between gap-3">
                          <dt className="flex items-center gap-2">
                            <Icon className="size-4 text-muted-foreground" />
                            {label}
                          </dt>
                          <dd className="text-right text-muted-foreground">{value}</dd>
                        </dl>
                        {index < sessionStats.length - 1 ? <Separator /> : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  Drag the sheet left or press Escape to dismiss.
                </p>
              </div>
            </Drawer.Content>
          </Drawer>
        </div>
      </div>
    </EvalShell>
  );
}
