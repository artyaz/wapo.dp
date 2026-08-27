"use client";

/**
 * EVAL page (pair-168) — ds:RecordHeader + ds:TrackHeader + ds:PlayerBar
 * Conditions: desktop 1280x800, dark theme, RTL direction, no constraint.
 *
 * Scenario: "Meridian Status" — the live system status page of a streaming
 * platform during an active incident. A slim status bar carries the brand and
 * the "all systems degraded" banner; the ds:RecordHeader identifies the open
 * incident record (INC-4412, audio transcoding latency spike). The main
 * column monitors three live signal channels as timeline tracks, each
 * labelled by a ds:TrackHeader (voice bridge / NOC camera / deploy log) with
 * a telemetry lane and a shared time axis, followed by the incident update
 * timeline. The side column carries a ds:PlayerBar playing the live on-call
 * bridge recording, a component-health list and the subscription row.
 */

import React from "react";
import { Activity, AudioLines, Bell, History, RefreshCw } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { RecordHeader } from "@/components/ds/RecordHeader";
import { TrackHeader } from "@/components/ds/TrackHeader";
import { PlayerBar } from "@/components/ds/PlayerBar";

/* ---------- deterministic telemetry data (no randomness) ---------- */

// Voice-bridge audio level, oldest sample first (RTL: right → left, "now" at left)
const VOICE_BARS = Array.from({ length: 84 }, (_, i) => {
  const t = i / 83;
  let h = 0.3 + 0.2 * Math.abs(Math.sin(i * 0.55)) + 0.14 * Math.abs(Math.sin(i * 0.21 + 1.3));
  let spike = false;
  if (t >= 0.42 && t < 0.6) {
    h = 0.74 + 0.26 * Math.abs(Math.sin(i * 1.9));
    spike = true; // 14:21 spike window — semantic red
  } else if (t >= 0.6) {
    h = 0.18 + 0.14 * Math.abs(Math.sin(i * 0.4)); // recovery
  }
  return { h: Math.min(1, h), spike };
});

// NOC camera filmstrip — fill levels per frame, index 5 is the glitch frame
const VIDEO_FRAMES = [0.45, 0.3, 0.55, 0.38, 0.7, 0.92, 0.8, 0.58, 0.42, 0.28];

// Deploy log stream — redacted line widths, index 2 is an error line
const LOG_LINES = [
  { w: "82%", tone: "n" },
  { w: "58%", tone: "n" },
  { w: "94%", tone: "d" },
  { w: "41%", tone: "n" },
  { w: "67%", tone: "n" },
];

const TRACKS: {
  name: string;
  type: "audio" | "video" | "text";
  muted?: boolean;
  solo?: boolean;
  locked?: boolean;
}[] = [
  { name: "Voice bridge · A1", type: "audio", solo: true },
  { name: "NOC camera · V1", type: "video", locked: true },
  { name: "Deploy log · T1", type: "text", muted: true },
];

const UPDATES = [
  { time: "14:32", text: "Transcoding pool scaled to 12 instances; error rate falling steadily." },
  { time: "14:24", text: "Root cause isolated to a stale encoder cache on nodes eu-c1-04 … eu-c1-07." },
  { time: "14:21", text: "Latency spike detected on audio transcoding; p95 above 2.4 s. Investigating." },
];

const HEALTH = [
  { name: "Web player", status: "Operational", tone: "success" },
  { name: "Audio transcoding", status: "Degraded", tone: "warning" },
  { name: "Ingest API", status: "Operational", tone: "success" },
  { name: "Webhooks", status: "Major outage", tone: "destructive" },
] as const;

const TONE_DOT: Record<string, string> = {
  success: "bg-success-500",
  warning: "bg-warning-500",
  destructive: "bg-destructive-500",
};
const TONE_TEXT: Record<string, string> = {
  success: "text-neutral-500",
  warning: "text-warning-500",
  destructive: "text-destructive-500",
};

/* ---------- supporting chrome ---------- */

function SectionHead({
  icon: Icon,
  title,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold leading-5 text-default-font">
        <Icon className="size-3.5 text-neutral-500" />
        {title}
      </h2>
      <span className="text-[11px] leading-4 text-neutral-500">{note}</span>
    </div>
  );
}

function TrackLane({ type }: { type: "audio" | "video" | "text" }) {
  if (type === "audio") {
    return (
      <div className="flex h-[52px] w-full items-center justify-between">
        {VOICE_BARS.map((b, i) => (
          <div
            key={i}
            className={`w-[3px] flex-none rounded-[1px] ${
              b.spike
                ? "bg-destructive-500"
                : i % 4 === 0
                  ? "bg-neutral-600"
                  : "bg-neutral-500"
            }`}
            style={{ height: `${Math.round(6 + b.h * 42)}px` }}
          />
        ))}
      </div>
    );
  }
  if (type === "video") {
    return (
      <div className="flex h-[48px] w-full items-stretch justify-between gap-1.5">
        {VIDEO_FRAMES.map((f, i) => (
          <div
            key={i}
            className={`h-full min-w-0 flex-1 rounded-[4px] ${
              i === 5 ? "bg-destructive-500" : "bg-neutral-600"
            }`}
            style={{ opacity: i === 5 ? 0.8 : 0.18 + f * 0.3 }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col gap-[7px]">
      {LOG_LINES.map((l, i) => (
        <div
          key={i}
          className={`h-[4px] rounded-full ${
            l.tone === "d"
              ? "bg-destructive-500/80"
              : i % 2 === 0
                ? "bg-neutral-600"
                : "bg-neutral-500"
          }`}
          style={{ width: l.w }}
        />
      ))}
    </div>
  );
}

/* ---------- page ---------- */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="flex min-h-screen flex-col bg-default-background text-default-font">
        {/* Status bar */}
        <header className="flex h-12 flex-none items-center justify-between border-b border-solid border-default-border px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-6 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel">
              <Activity className="size-3.5 text-default-font" />
            </div>
            <span className="text-[13px] font-semibold leading-none text-default-font">
              Meridian Status
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] leading-none text-neutral-500 sm:inline">
              Region eu-central-1
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-solid border-default-border px-2.5 py-1 text-[11px] leading-none text-warning-500">
              <span className="size-1.5 flex-none rounded-full bg-warning-500" />
              All systems degraded
            </span>
          </div>
        </header>

        {/* Incident record + monitoring workspace */}
        <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col px-6">
          <RecordHeader
            breadcrumb="Status / Incidents / 2025 / Q4"
            title="Audio transcoding latency spike"
            recordId="INC-4412"
            meta="Opened Nov 18, 2025 · 14:21 UTC · Severity 2 · Owner: Streaming Platform"
            secondaryAction="Export"
            primaryAction="Escalate"
          />

          <div className="mt-2 grid grid-cols-1 items-start gap-x-6 gap-y-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Main column — signal monitoring + incident timeline */}
            <section className="flex min-w-0 flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHead
                  icon={AudioLines}
                  title="Signal monitoring"
                  note="last 90 seconds"
                />
                <div className="overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
                  {TRACKS.map((t, i) => (
                    <div
                      key={t.name}
                      className={`flex items-stretch ${
                        i < TRACKS.length - 1
                          ? "border-b border-solid border-default-border"
                          : ""
                      }`}
                    >
                      <TrackHeader
                        trackName={t.name}
                        trackType={t.type}
                        muted={t.muted}
                        solo={t.solo}
                        locked={t.locked}
                      />
                      <div className="flex min-w-0 flex-1 items-center border-s border-solid border-default-border bg-neutral-50 px-2.5">
                        <TrackLane type={t.type} />
                      </div>
                    </div>
                  ))}
                  {/* Shared time axis — oldest at right (RTL), "now" at left */}
                  <div className="flex border-t border-solid border-default-border">
                    <div className="w-[180px] flex-none" />
                    <div className="flex flex-1 items-center justify-between px-3 py-1.5 text-[10px] leading-none text-neutral-500 tabular-nums">
                      <span>-90s</span>
                      <span>-60s</span>
                      <span>-30s</span>
                      <span>now</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <SectionHead icon={History} title="Incident timeline" note="today, UTC" />
                <ul className="flex flex-col divide-y divide-default-border rounded-xl border border-solid border-default-border bg-panel px-4 py-3">
                  {UPDATES.map((u) => (
                    <li key={u.time} className="flex items-baseline gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span className="w-[44px] flex-none text-[12px] leading-[18px] text-neutral-500 tabular-nums">
                        {u.time}
                      </span>
                      <span className="min-w-0 flex-1 text-[13px] leading-[18px] text-default-font">
                        {u.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Side column — live bridge player + component health */}
            <aside className="flex min-w-0 flex-col gap-4">
              <PlayerBar
                className="w-full"
                position="42:17 / 60:00"
                explainLabel="Explain"
                excerpt="We pinned the latency to a stale encoder cache in the eu-central-1 transcoding pool — buffers are draining, and p95 should fall back under 400 ms within the next ten minutes."
                error="Recorder re-syncing · the last 4 s of bridge audio were dropped."
              />

              <section className="rounded-xl border border-solid border-default-border bg-panel px-4 py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-sm font-semibold leading-5 text-default-font">
                    Component health
                  </h2>
                  <span className="text-[11px] leading-4 text-neutral-500">eu-central-1</span>
                </div>
                <ul className="mt-2 flex flex-col divide-y divide-default-border">
                  {HEALTH.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center justify-between gap-3 py-2.5 first:pt-1 last:pb-0"
                    >
                      <span className="text-[13px] leading-none text-default-font">{c.name}</span>
                      <span className="flex flex-none items-center gap-1.5 text-[12px] leading-none">
                        <span
                          className={`size-2 flex-none rounded-full ${TONE_DOT[c.tone]}`}
                        />
                        <span className={TONE_TEXT[c.tone]}>{c.status}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="flex items-center gap-2.5 rounded-xl border border-solid border-default-border bg-panel px-4 py-3">
                <Bell className="size-3.5 flex-none text-neutral-500" />
                <span className="text-[12px] leading-none text-neutral-500">
                  Email updates for INC-4412 · status@meridian.cloud
                </span>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-none items-center justify-between border-t border-solid border-default-border px-6 py-3 text-[11px] leading-none text-neutral-500">
          <span>Meridian Cloud · Status</span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="size-3" />
            Last updated 14:32:07 UTC · refreshes every 60 s
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
