"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Typography } from "@/components/ui/typography";
import { TextField } from "@/components/ds/TextField";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookmarkIcon,
  MicIcon,
  MoreHorizontalIcon,
  PauseIcon,
  PlayIcon,
  SearchIcon,
  SettingsIcon,
  SquareIcon,
  TagIcon,
} from "lucide-react";

/** Deterministic waveform amplitudes (px) for the in-progress recording. */
const WAVEFORM = [
  8, 14, 22, 12, 30, 18, 26, 40, 24, 16, 34, 28, 12, 20, 38, 26, 44, 30, 18,
  10, 24, 36, 22, 14, 28, 42, 20, 12, 32, 24, 16, 26, 10, 18, 8, 14, 6, 10,
];

const RECORDINGS = [
  { title: "Design review — audio", length: "12:04" },
  { title: "Grocery list", length: "1:32" },
  { title: "Interview prep", length: "8:47" },
  { title: "Field notes — warehouse", length: "3:15" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-background pb-4 text-foreground">
        {/* ── App header ─────────────────────────────────────────── */}
        <header className="flex items-center gap-3 px-5 pb-3 pt-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-panel">
            <MicIcon className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading-1 text-lg font-semibold leading-tight">
              Voice Memos
            </h1>
            <p className="text-xs text-muted-foreground">
              Tuesday · 3 recordings today
            </p>
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <SettingsIcon className="size-4" />
          </button>
        </header>

        {/* ── Active recording ───────────────────────────────────── */}
        <section className="mx-4 rounded-2xl border border-border bg-panel p-4 shadow-sm">
          <TextField
            label="Memo title"
            helpText="Transcription starts automatically when you stop."
            leading={<TagIcon className="size-4" />}
          >
            <TextField.Input defaultValue="Tuesday standup — sync notes" />
          </TextField>

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="size-2 animate-pulse rounded-full bg-destructive" />
              Recording
            </span>
            <span className="font-code text-sm tabular-nums">00:42</span>
          </div>

          <div
            className="mt-3 flex h-12 items-center justify-between"
            aria-hidden="true"
          >
            {WAVEFORM.map((h, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full ${
                  i < 24 ? "bg-foreground/75" : "bg-foreground/20"
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Pause recording"
              className="flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground"
            >
              <PauseIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Stop and save memo"
              className="flex size-14 items-center justify-center rounded-full bg-foreground text-background"
            >
              <SquareIcon className="size-4 fill-current" />
            </button>
            <button
              type="button"
              aria-label="Add highlight marker"
              className="flex size-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground"
            >
              <BookmarkIcon className="size-4" />
            </button>
          </div>
        </section>

        {/* ── Live transcript ────────────────────────────────────── */}
        <section className="px-5 pt-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Live transcript
            </h2>
            <span className="font-code text-[10px] text-muted-foreground">
              en-US · 96%
            </span>
          </div>
          <div className="mt-2.5">
            <Typography variant="chat" className="text-[13px]">
              <p>
                Quick recap so I don&apos;t forget — the new memo export writes
                straight to the shared drive, and we keep the original{" "}
                <code>.m4a</code> files for thirty days.
              </p>
              <p className="streaming-cursor">
                Dana is confirming the storage quota with IT before the Friday
                pilot —
              </p>
              <h6>Extracted action items</h6>
              <ul>
                <li>
                  <input type="checkbox" defaultChecked readOnly /> Confirm
                  storage quota with IT
                </li>
                <li>
                  <input type="checkbox" readOnly /> Draft the pilot invite
                </li>
              </ul>
            </Typography>
          </div>
        </section>

        {/* ── Recording library ──────────────────────────────────── */}
        <section className="px-5 pt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent recordings
          </h2>
          <div className="mt-2.5">
            <TextField leading={<SearchIcon className="size-4" />}>
              <TextField.Input placeholder="Search recordings" />
            </TextField>
          </div>
          <div className="mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-9 text-xs">Title</TableHead>
                  <TableHead className="h-9 text-right text-xs">
                    Length
                  </TableHead>
                  <TableHead className="h-9 w-6">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECORDINGS.map((r) => (
                  <TableRow key={r.title}>
                    <TableCell className="max-w-[190px] truncate py-2.5 text-[13px] font-medium">
                      {r.title}
                    </TableCell>
                    <TableCell className="py-2.5 text-right font-code text-xs tabular-nums text-muted-foreground">
                      {r.length}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`Play ${r.title}`}
                          className="flex size-7 items-center justify-center rounded-md text-foreground"
                        >
                          <PlayIcon className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          aria-label={`More options for ${r.title}`}
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground"
                        >
                          <MoreHorizontalIcon className="size-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>Stored on device · synced to cloud</TableCaption>
            </Table>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="mt-auto px-5 pt-4">
          <p className="text-center text-[11px] text-muted-foreground">
            3.2 GB of 5 GB used · auto-delete after 30 days
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
