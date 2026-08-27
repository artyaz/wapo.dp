"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { PlayerBar } from "@/components/ds/PlayerBar";
import { ActivityEvent } from "@/components/ds/ActivityEvent";
import { StatusBadge } from "@/components/ds/StatusBadge";

/**
 * pair-057 — "Listening Room" session review (portrait tablet, dark, ltr).
 * A producer reviews a live field-recording session: pipeline status cluster
 * (StatusBadge), the session activity thread (ActivityEvent), and the excerpt
 * player docked at the bottom (PlayerBar). Everything fits 768×1024, no scroll.
 */
export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* ambient light — quiet top sheen, consistent with the glass language */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_55%_at_50%_-12%,rgba(255,255,255,0.07),transparent_62%)]" />

        <div className="relative z-[1] flex h-full w-full flex-col gap-7 px-8 py-8">
          {/* Header — session identity + live pipeline status */}
          <header className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-body text-[11px] font-[400] uppercase leading-[14px] tracking-[0.22em] text-neutral-500">
                Praxis · Listening Room
              </span>
              <div className="flex items-center gap-5">
                <StatusBadge tone="live">On Air</StatusBadge>
                <StatusBadge tone="success">Synced</StatusBadge>
                <StatusBadge tone="warning">Uplink low</StatusBadge>
              </div>
            </div>
            <h1 className="m-0 font-prose text-[28px] font-[400] leading-[36px] text-default-font">
              The Glass Meridian — Episode 12, ridge take
            </h1>
            <p className="m-0 font-body text-[13px] font-[400] leading-[18px] text-neutral-500 tabular-nums">
              Session 0447 · North Ridge shelter · 18 min 40 s · 2 speakers
            </p>
          </header>

          {/* Activity thread — centered between header and player dock */}
          <section className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="flex w-full flex-col rounded-[24px] border border-solid border-default-border bg-panel/40 px-7 py-6 backdrop-blur-[24px] backdrop-saturate-[125%]">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="m-0 font-body text-[12px] font-[700] uppercase leading-[16px] tracking-[0.16em] text-default-font">
                  Session activity
                </h2>
                <span className="font-code text-[11px] font-[400] leading-[16px] text-neutral-500">
                  0447 · activity.log
                </span>
              </div>
              <div className="mt-2.5 flex flex-col">
                <ActivityEvent
                  author="Mara · producer"
                  timestamp="09:41:07"
                  body="Ridge take is clean — wind buffer trimmed, levels sitting near −12 dBFS."
                  isFirst
                />
                <ActivityEvent
                  variant="system"
                  body="Transcript indexed — 12,408 tokens across 38 segments."
                />
                <ActivityEvent
                  variant="email"
                  subject="archive@northwind.fm"
                  timestamp="09:44:52"
                  body="Master WAV attached to session 0447 — 24-bit / 48 kHz, 214 MB."
                />
                <ActivityEvent
                  author="Dev · engineer"
                  timestamp="09:58:30"
                  body="Room tone tail preserved under the credits; fade closes at 18:02."
                />
                <ActivityEvent
                  author="You"
                  timestamp="10:03:11"
                  body="Approved for the cut — queue the explained excerpt next."
                  isLast
                />
              </div>
            </div>
          </section>

          {/* Player dock — full-width at the tablet footer */}
          <footer className="flex w-full">
            <PlayerBar
              className="max-w-none"
              position="03:12 / 18:40"
              explainLabel="Explain"
              excerpt="The ridge shelter held the wind at bay while the recorder turned — listen for the glass harmonica phrase she names at minute three."
            />
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
