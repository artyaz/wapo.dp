"use client";

import React from "react";
import { Download, Mic, Pause, Square } from "lucide-react";
import { EvalShell } from "@/eval/EvalShell";
import { MediaClip } from "@/components/ds/MediaClip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Scenario — "MemoCue" voice memo recorder on a 1280×800 desktop window:
 * a session timeline built from ds:MediaClip lanes (selected main take, locked
 * room tone, transcript marker), the memo library with ui:pagination at the
 * bottom, and the ui:dialog export sheet open over the studio via defaultOpen.
 */

const TICKS = ["00:00", "03:45", "07:30", "11:15", "15:00"];
const CHAPTERS = ["00:36 intro", "02:14 roadmap", "04:57 design review", "07:48 action items", "09:18 wrap"];

const MEMOS = [
  {
    title: "Weekly sync — product design standup, take 02 (unedited safety copy)",
    meta: "09:54 · today 09:14 · 29.7 MB · transcript",
  },
  {
    title: "Interview prep — accessibility audit questions for Marguerite",
    meta: "26:05 · yesterday 17:52 · 79.1 MB",
  },
  {
    title: "Song idea — chorus melody hummed on the 22 bus, very loud street noise",
    meta: "01:58 · monday 08:31 · 6.0 MB",
  },
  {
    title: "Grocery list and reminder to call the dentist about the temporary crown",
    meta: "00:47 · monday 07:58 · 2.4 MB",
  },
  {
    title: "Quarterly planning offsite — day 2 of 3, afternoon breakout notes",
    meta: "48:33 · 12 nov · 147 MB · transcript",
  },
  {
    title: "Reading notes — chapter 4, The Timeless Way of Building",
    meta: "18:21 · 10 nov · 55.3 MB",
  },
  {
    title: "Boiler-room hum investigation for the super, two visits",
    meta: "11:06 · 08 nov · 33.8 MB",
  },
  {
    title: "Voicemail draft for the insurance adjuster, third attempt",
    meta: "02:34 · 07 nov · 7.7 MB",
  },
];

const FORMATS = [
  {
    name: "M4A · Apple Lossless",
    size: "29.7 MB",
    desc: "Keeps chapters and transcript metadata — imports straight into Voice Memos and the studio archive.",
    selected: true,
  },
  {
    name: "MP3 · 192 kbps",
    size: "14.2 MB",
    desc: "Smaller and plays on every device; chapter markers flatten into inline text notes.",
    selected: false,
  },
  {
    name: "WAV · 24-bit / 48 kHz",
    size: "82.9 MB",
    desc: "Uncompressed mono master for the editing timeline — no quality loss, no metadata.",
    selected: false,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <Dialog defaultOpen>
        <div className="flex min-h-screen flex-col font-body text-default-font">
          {/* App bar */}
          <header className="flex h-14 flex-none items-center justify-between gap-4 border-b border-solid border-default-border px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-neutral-900 text-neutral-50">
                <Mic className="size-4" />
              </span>
              <span className="text-[15px] font-semibold leading-none">MemoCue</span>
              <span className="truncate text-[13px] text-neutral-500">
                voice memo recorder · field studio
              </span>
            </div>
            <div className="flex flex-none items-center gap-4">
              <span className="flex items-center gap-1.5 rounded-full border border-solid border-default-border bg-panel px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-destructive-500" />
                <span className="font-code text-[11px] text-neutral-700">REC 00:12:47</span>
              </span>
              <span className="font-code text-[11px] text-neutral-500">
                261 memos · 4.2 GB
              </span>
            </div>
          </header>

          {/* Studio: session timeline + memo library */}
          <main className="flex flex-1 items-stretch gap-4 px-6 py-4">
            {/* Session timeline — ds:MediaClip */}
            <section className="flex min-w-0 flex-1 flex-col rounded-lg border border-solid border-default-border bg-panel p-4">
              <div className="mb-3 flex flex-none items-baseline justify-between gap-2">
                <span className="truncate font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  sequence · weekly-sync-product-design-standup
                </span>
                <span className="flex-none font-code text-[11px] text-neutral-400">15:00</span>
              </div>

              <div className="relative flex-none">
                {/* time ruler */}
                <div className="relative flex h-4 items-start justify-between border-b border-solid border-default-border">
                  {TICKS.map((tick) => (
                    <span key={tick} className="font-code text-[10px] text-neutral-400">
                      {tick}
                    </span>
                  ))}
                </div>

                {/* lane A1 — main take, selected */}
                <div className="relative mt-2 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                  <MediaClip
                    kind="audio"
                    state="selected"
                    label="A1 · weekly-sync-main-take-02.wav"
                    duration="09:54"
                    className="absolute"
                    style={{ left: "4%", width: "66%" }}
                  />
                </div>

                {/* lane A2 — room tone, locked */}
                <div className="relative mt-1.5 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                  <MediaClip
                    kind="audio"
                    state="locked"
                    label="A2 · room-tone-laundry-basement.flac"
                    duration="03:36"
                    className="absolute"
                    style={{ left: "6%", width: "24%" }}
                  />
                </div>

                {/* lane T1 — transcript marker */}
                <div className="relative mt-1.5 h-14 overflow-hidden rounded-[3px] border border-solid border-default-border bg-neutral-50">
                  <MediaClip
                    kind="text"
                    caption="Action item — rewrite the onboarding copy before Friday's design review"
                    duration="07:48"
                    className="absolute"
                    style={{ left: "8%", width: "52%" }}
                  />
                </div>

                {/* playhead */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-30 w-px bg-neutral-700"
                  style={{ left: "41%" }}
                >
                  <span className="absolute top-0 h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-700" />
                </div>
              </div>

              {/* in / playhead / out readouts */}
              <div className="relative mt-1.5 h-4 flex-none">
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: "4%" }}
                >
                  in 00:36.000
                </span>
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: "41%" }}
                >
                  playhead 06:09.500
                </span>
                <span
                  className="absolute font-code text-[10px] text-neutral-500"
                  style={{ left: "70%" }}
                >
                  out 10:30.000
                </span>
              </div>

              {/* chapter markers */}
              <div className="mb-4 mt-3 flex flex-none items-center gap-1.5 overflow-hidden">
                <span className="flex-none font-code text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                  chapters
                </span>
                {CHAPTERS.map((chapter) => (
                  <span
                    key={chapter}
                    className="flex-none rounded-full border border-solid border-default-border bg-neutral-50 px-2 py-0.5 font-code text-[10px] text-neutral-600"
                  >
                    {chapter}
                  </span>
                ))}
              </div>

              {/* transport */}
              <div className="mt-auto flex flex-none items-center justify-between gap-3 border-t border-solid border-default-border pt-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Button variant="outline" size="icon" aria-label="Pause recording">
                    <Pause className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Stop and save memo 262">
                    <Square className="size-4" />
                  </Button>
                  <span className="ml-1 truncate font-code text-[11px] text-neutral-500">
                    recording memo 262 · lavalier (USB) · 48 kHz / 24-bit · peak −12.4 dBFS
                  </span>
                </div>
                <DialogTrigger
                  render={
                    <Button variant="outline" className="flex-none">
                      <Download />
                      Export take 02…
                    </Button>
                  }
                />
              </div>
            </section>

            {/* Memo library */}
            <aside className="flex w-[340px] flex-none flex-col rounded-lg border border-solid border-default-border bg-panel p-4">
              <div className="mb-1 flex flex-none items-baseline justify-between gap-2">
                <span className="truncate font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  library · recent memos
                </span>
                <span className="flex-none font-code text-[11px] text-neutral-400">
                  newest first
                </span>
              </div>
              <ul className="flex-1">
                {MEMOS.map((memo) => (
                  <li
                    key={memo.title}
                    className="border-b border-solid border-default-border py-2.5 last:border-b-0"
                  >
                    <span className="block truncate text-[13px] font-medium leading-5">
                      {memo.title}
                    </span>
                    <span className="mt-0.5 block truncate font-code text-[10px] text-neutral-500">
                      {memo.meta}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-solid border-default-border pt-3">
                <div className="flex items-baseline justify-between font-code text-[10px] text-neutral-500">
                  <span>4.2 GB of 32 GB used</span>
                  <span>autobackup on</span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-neutral-200">
                  <div className="h-1 w-[13%] rounded-full bg-neutral-800" />
                </div>
              </div>
            </aside>
          </main>

          {/* Library pager — ui:pagination */}
          <footer className="flex flex-none items-center justify-between gap-4 border-t border-solid border-default-border px-6 py-3">
            <span className="truncate font-code text-[11px] text-neutral-500">
              showing 40–53 of 261 memos · 14 per page
            </span>
            <Pagination className="mx-0 w-auto flex-none">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive href="#">
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">19</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </footer>
        </div>

        {/* Export sheet — ui:dialog, open in this static review state via
            defaultOpen on the Dialog root (custom-close-button pattern). */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Export “Weekly sync — product design standup, take 02”
            </DialogTitle>
            <DialogDescription>
              Choose a format and destination for this 09:54 memo. Chapter
              markers and the auto-generated transcript ride along wherever the
              format allows.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label
              htmlFor="memo-title"
              className="text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500"
            >
              Memo name
            </Label>
            <Input
              id="memo-title"
              defaultValue="Weekly sync — product design standup, take 02 (trimmed)"
            />
          </div>
          <div className="grid gap-2" role="radiogroup" aria-label="Export format">
            {FORMATS.map((format) => (
              <div
                key={format.name}
                className={
                  format.selected
                    ? "flex items-start gap-3 rounded-md border-2 border-solid border-neutral-800 bg-neutral-50 px-3 py-2.5"
                    : "flex items-start gap-3 rounded-md border border-solid border-default-border px-3 py-2.5"
                }
              >
                <span
                  className={
                    format.selected
                      ? "mt-1 flex size-3.5 flex-none items-center justify-center rounded-full border border-neutral-800"
                      : "mt-1 flex size-3.5 flex-none items-center justify-center rounded-full border border-neutral-400"
                  }
                >
                  {format.selected ? (
                    <span className="size-1.5 rounded-full bg-neutral-900" />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13px] font-medium leading-5">
                      {format.name}
                    </span>
                    <span className="flex-none font-code text-[10px] text-neutral-500">
                      {format.size}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] leading-4 text-neutral-500">
                    {format.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] leading-4 text-neutral-500">
            The English transcript (auto-generated, 98% confidence) is attached
            as a sidecar .txt file; speaker labels stay editable after export
            from the memo detail view.
          </p>
          <DialogFooter className="sm:justify-between">
            <span className="self-center font-code text-[10px] text-neutral-500">
              estimated 29.7 MB · ready in ~40 s
            </span>
            <div className="flex gap-2">
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button>Export memo</Button>} />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EvalShell>
  );
}
