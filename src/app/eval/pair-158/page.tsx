"use client";

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import { RelationshipGrid } from "@/components/ds/RelationshipGrid";
import { TrackHeader } from "@/components/ds/TrackHeader";
import { WaveformStrip } from "@/components/ds/WaveformStrip";
import { Spinner } from "@/components/ui/spinner";
import {
  FileTextIcon,
  FileWarningIcon,
  MicIcon,
  PaperclipIcon,
  PauseIcon,
  RefreshCwIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col font-body">
        {/* ── App / recorder chrome ─────────────────────────────── */}
        <header className="flex flex-none items-center gap-4 border-b border-solid border-default-border bg-panel px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-neutral-900 text-white">
              <MicIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold text-default-font">
              Voice Memos
            </span>
          </div>
          <div className="h-4 w-px bg-default-border" />
          <div className="min-w-0 truncate text-sm text-neutral-500">
            Session · Incident review walkthrough — eu-edge-03
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-solid border-destructive/30 bg-destructive/5 px-3 py-1">
              <span className="size-2 rounded-full bg-destructive" />
              <span className="text-xs font-semibold tabular-nums text-destructive">
                REC 00:12:47
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Pause recording"
                className="flex size-7 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-default-font"
              >
                <PauseIcon className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Stop and save memo"
                className="flex size-7 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-default-font"
              >
                <SquareIcon className="size-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-start gap-5 p-5">
          {/* ── Left column: track stack + linked records ────────── */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* Recorder tracks — TrackHeader label column per lane */}
            <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
              <div className="flex items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
                <h2 className="text-sm font-semibold text-default-font">
                  Session tracks
                </h2>
                <span className="font-code text-[11px] text-neutral-500">
                  48 kHz · 24-bit · mono
                </span>
              </div>

              <div className="flex flex-col divide-y divide-solid divide-default-border">
                {/* Track 1 — live voice memo */}
                <div className="flex w-full items-stretch overflow-hidden">
                  <TrackHeader trackName="Voice · A1" trackType="audio" solo />
                  <div className="relative flex grow items-center overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-2">
                    <WaveformStrip />
                    <div className="absolute inset-y-0 left-[38%] w-px bg-brand-primary" />
                    <div className="absolute bottom-1 left-[38%] -translate-x-1/2 font-code text-[9px] text-neutral-500">
                      04:47
                    </div>
                  </div>
                </div>

                {/* Track 2 — room tone, muted */}
                <div className="flex w-full items-stretch overflow-hidden">
                  <TrackHeader
                    trackName="Room tone · A2"
                    trackType="audio"
                    muted
                  />
                  <div className="relative flex grow items-center overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-2">
                    <WaveformStrip className="opacity-40" />
                  </div>
                </div>

                {/* Track 3 — text markers, locked */}
                <div className="flex w-full items-stretch overflow-hidden">
                  <TrackHeader
                    trackName="Markers · T1"
                    trackType="text"
                    locked
                  />
                  <div className="relative flex grow items-center gap-2 overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-3">
                    <div className="flex h-5 items-center rounded-[3px] border border-solid border-default-border bg-panel px-2">
                      <span className="font-code text-[10px] text-neutral-500">
                        00:41 · “latency spike begins”
                      </span>
                    </div>
                    <div className="flex h-5 items-center rounded-[3px] border border-solid border-default-border bg-panel px-2">
                      <span className="font-code text-[10px] text-neutral-500">
                        07:12 · “BGP flap pattern”
                      </span>
                    </div>
                    <div className="flex h-5 items-center rounded-[3px] border border-solid border-default-border bg-panel px-2">
                      <span className="font-code text-[10px] text-neutral-500">
                        11:58 · “rollback plan”
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Linked records — RelationshipGrid */}
            <section className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-semibold text-default-font">
                  Linked records
                </h2>
                <span className="text-xs text-neutral-500">
                  Records that reference this memo · 7 items
                </span>
              </div>
              <RelationshipGrid />
            </section>
          </div>

          {/* ── Right column: memo attachments ───────────────────── */}
          <aside className="flex w-[340px] flex-none flex-col gap-5">
            <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
              <div className="flex items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
                <h2 className="text-sm font-semibold text-default-font">
                  Attachments
                </h2>
                <span className="font-code text-[11px] text-neutral-500">
                  3 files
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <AttachmentGroup>
                  {/* Live memo still uploading to the case record */}
                  <Attachment state="uploading">
                    <AttachmentMedia>
                      <Spinner />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>
                        incident-walkthrough.m4a
                      </AttachmentTitle>
                      <AttachmentDescription>
                        Uploading · 64%
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions className="opacity-100">
                      <AttachmentAction
                        variant="destructive"
                        aria-label="Cancel upload"
                      >
                        <XIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>

                  {/* Draft transcript attached to the memo */}
                  <Attachment state="done">
                    <AttachmentMedia>
                      <FileTextIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>transcript-draft.txt</AttachmentTitle>
                      <AttachmentDescription>
                        Attached · 12 KB
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions className="opacity-100">
                      <AttachmentAction
                        aria-label="Remove transcript-draft.txt"
                      >
                        <XIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>

                  {/* Failed field recording */}
                  <Attachment state="error">
                    <AttachmentMedia>
                      <FileWarningIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>field-take-02.wav</AttachmentTitle>
                      <AttachmentDescription>
                        Upload failed. Try again.
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions className="opacity-100">
                      <AttachmentAction aria-label="Retry upload">
                        <RefreshCwIcon />
                      </AttachmentAction>
                      <AttachmentAction
                        variant="destructive"
                        aria-label="Remove field-take-02.wav"
                      >
                        <XIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                </AttachmentGroup>

                <AttachmentTrigger>
                  <PaperclipIcon />
                  Attach audio, transcript or photo
                </AttachmentTrigger>
              </div>
            </section>

            {/* Session details — supporting chrome */}
            <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
              <div className="border-b border-solid border-default-border px-4 py-2.5">
                <h2 className="text-sm font-semibold text-default-font">
                  Session details
                </h2>
              </div>
              <dl className="flex flex-col px-4 py-1">
                {[
                  ["Recorded", "Aug 21, 2026 · 09:14"],
                  ["Duration", "12 min 47 s"],
                  ["Device", "Handheld field recorder"],
                  ["Location", "eu-edge-03 · POP floor"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-solid border-default-border py-2 last:border-b-0"
                  >
                    <dt className="text-xs text-neutral-500">{label}</dt>
                    <dd className="text-xs font-medium text-default-font">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
