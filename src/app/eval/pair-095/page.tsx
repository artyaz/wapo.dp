"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  MoreVertical,
  Play,
} from "lucide-react";

const PLAYBACK_OPTIONS = [
  { id: "p095-autoplay", label: "Autoplay next episode", checked: true },
  { id: "p095-wifi", label: "Download over Wi-Fi only", checked: true },
  { id: "p095-subtitles", label: "Show subtitles", checked: false },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-2">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full text-foreground/80"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="text-sm font-medium tracking-tight">Watchlist</div>
          <button
            type="button"
            aria-label="More options"
            className="flex size-10 items-center justify-center rounded-full text-foreground/80"
          >
            <MoreVertical className="size-5" />
          </button>
        </header>

        <main className="flex-1 px-4 pb-4 pt-3">
          {/* Trailer frame */}
          <AspectRatio
            ratio={16 / 9}
            className="w-full overflow-hidden rounded-xl border border-border bg-muted"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200/80 to-neutral-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-black/5 bg-white/75 text-neutral-800 shadow-sm backdrop-blur-sm">
                <Play className="size-5 fill-current" />
              </span>
            </div>
            <span className="absolute left-2.5 top-2.5 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white">
              Trailer
            </span>
            <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] tabular-nums text-white">
              24:18
            </span>
          </AspectRatio>

          {/* Episode meta */}
          <div className="mt-3">
            <h1 className="text-lg font-semibold leading-snug tracking-tight">
              Designing calm interfaces
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              S2 · E4 · 24 min · Available offline
            </p>
          </div>

          {/* Publisher row — hover card open by default */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <HoverCard defaultOpen openDelay={10} closeDelay={150}>
              <HoverCardTrigger
                render={
                  <button
                    type="button"
                    className="flex min-w-0 items-center gap-3 rounded-lg text-left"
                  >
                    <Avatar>
                      <AvatarFallback>ND</AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col">
                      <span className="flex items-center gap-1 text-sm font-medium leading-5">
                        Nordic Design Studio
                        <BadgeCheck className="size-3.5 shrink-0 text-foreground/60" />
                      </span>
                      <span className="text-xs text-muted-foreground">
                        128k subscribers
                      </span>
                    </span>
                  </button>
                }
              />
              <HoverCardContent
                align="start"
                side="bottom"
                sideOffset={8}
                className="w-64 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>ND</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 pt-0.5">
                    <div className="text-sm font-semibold leading-5">
                      Nordic Design Studio
                    </div>
                    <div className="text-xs text-muted-foreground">
                      @nordicstudio
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  Calm interface field notes.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CalendarDays className="size-3" />
                  Joined March 2019
                </div>
              </HoverCardContent>
            </HoverCard>
            <Button variant="outline" size="sm" className="shrink-0">
              Follow
            </Button>
          </div>

          {/* Landing space for the open hover card */}
          <div aria-hidden className="h-[140px]" />

          {/* Playback options */}
          <section className="border-t border-border pt-3">
            <h2 className="text-sm font-medium">Playback options</h2>
            <div className="mt-1">
              {PLAYBACK_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  htmlFor={opt.id}
                  className="flex min-h-11 cursor-pointer items-center gap-3"
                >
                  <Checkbox
                    id={opt.id}
                    name={opt.id}
                    defaultChecked={opt.checked}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Up next */}
          <section className="mt-3 border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Up next</h2>
              <button
                type="button"
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                See all
              </button>
            </div>
            <div className="mt-2 flex items-start gap-3">
              <div className="w-11 shrink-0">
                <AspectRatio
                  ratio={9 / 16}
                  className="w-full overflow-hidden rounded-md border border-border bg-muted"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-neutral-300" />
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium tabular-nums text-neutral-500">
                    05
                  </span>
                </AspectRatio>
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  S2 · E5 · Tomorrow
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug">
                  Quiet motion: easing curves that breathe
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  18 min · Video
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
