"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { AgentActivity } from "@/components/ds/AgentActivity";
import { AssetCard } from "@/components/ds/AssetCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Scenario — Praxis Studio, project workspace: the media library of episode
 * "S2E12 — Field Notes" right after the ingest agent pulled tape from the
 * field kit. Breadcrumbs locate the screen, AssetCards are the ingested
 * media, and the agent activity rail (ToolSummaryRow macro rows with nested
 * ActionTraces) explains where the files came from.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-default-background">
        {/* Top bar — location */}
        <header className="flex items-center justify-between border-b border-default-border bg-panel px-10 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Studio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">S2E12 — Field Notes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Media library</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            <span className="text-[12px] leading-[18px] text-neutral-500">
              Ingest complete · 4 min ago
            </span>
          </div>
        </header>

        {/* Title block */}
        <div className="flex items-end justify-between px-10 pb-5 pt-6">
          <div>
            <h1 className="font-body text-[22px] font-[500] leading-[28px] text-default-font">
              Media library
            </h1>
            <p className="pt-1 text-[13px] leading-[18px] text-neutral-500">
              6 assets · pulled from Field Kit SSD by Praxis Agent · run #47
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-default-border bg-panel px-2.5 py-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="flex-none text-success-600"
            >
              <path
                d="M2.5 6.2 4.9 8.6 9.5 3.4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[12px] leading-[16px] text-neutral-600">
              Verified checksums · 6/6
            </span>
          </div>
        </div>

        {/* Body — asset grid + agent activity rail */}
        <main className="flex flex-1 items-start gap-10 px-10 pb-10">
          {/* Ingested assets */}
          <section className="min-w-0 flex-1">
            <p className="pb-3 text-[11px] font-[500] uppercase tracking-[0.08em] text-neutral-500">
              Ingested assets
            </p>
            <div className="grid grid-cols-3 gap-3">
              <AssetCard
                kind="audio"
                title="room-tone.wav"
                duration="00:48"
                meta="WAV · 48 kHz · 24-bit"
              />
              <AssetCard
                kind="video"
                title="interview-b-roll.mov"
                duration="12:04"
                meta="ProRes 422 HQ · 1080p24"
              />
              <AssetCard
                kind="text"
                title="field-notes.md"
                duration="2.4 KB"
                meta="Markdown · shot log"
              />
              <AssetCard
                kind="audio"
                title="market-ambience.mp3"
                duration="03:26"
                meta="MP3 · 320 kbps · stereo"
              />
              <AssetCard
                kind="video"
                title="drone-establishing.mp4"
                duration="00:32"
                meta="H.264 · 3840×2160 · 24 fps"
              />
              <AssetCard
                kind="text"
                title="transcript-draft.txt"
                duration="14 KB"
                meta="Plain text · interview"
              />
            </div>
          </section>

          {/* Agent activity rail */}
          <aside className="flex w-[360px] flex-none flex-col rounded-lg border border-default-border bg-panel p-5">
            <div className="flex items-baseline justify-between pb-3">
              <p className="text-[11px] font-[500] uppercase tracking-[0.08em] text-neutral-500">
                Agent activity
              </p>
              <span className="font-code text-[11px] leading-[16px] text-neutral-500">
                run #47 · 09:42
              </span>
            </div>
            <div className="flex flex-col divide-y divide-default-border border-t border-default-border">
              <div className="pb-2 pt-2">
                <AgentActivity.Step
                  kind="integration"
                  summary={
                    <>
                      Used Field Kit integration, mounted the tape drive, copied
                      6 assets
                    </>
                  }
                  traces={[
                    {
                      kind: "api",
                      label: "GET /v1/field-kit/sessions/88 — 200 OK (214ms)",
                    },
                    {
                      kind: "command",
                      label: 'rsync -av field-kit:/tape/ "S2E12/media/" --progress',
                    },
                    {
                      kind: "skill",
                      label: "Loaded ingest skill: broadcast safe-copy checklist",
                    },
                  ]}
                />
              </div>
              <div className="py-2">
                <AgentActivity.Step kind="api" summary="POST /v1/library/assets — 201 Created (6×)" />
              </div>
              <div className="py-2">
                <AgentActivity.Step kind="skill" summary="Applied Loudness skill: EBU R128 normalize to −16 LUFS" />
              </div>
              <div className="py-2">
                <AgentActivity.Step kind="edits" summary="Wrote waveform cache for 2 audio assets" />
              </div>
              <div className="pt-2">
                <AgentActivity.Step kind="command" summary="Ran ffprobe over 6 files — 6 probed, 0 failed" />
              </div>
            </div>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
