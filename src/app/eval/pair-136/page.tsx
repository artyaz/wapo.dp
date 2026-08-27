"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { GlassDisplacement } from "@/components/ds/GlassDisplacement";
import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import { TerminalLine } from "@/components/ds/TerminalLine";
import {
  Activity,
  Check,
  Loader2,
  Pause,
  RotateCcw,
  ShieldCheck,
  Terminal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data — the tail of a production deploy session (canary rollout in progress)
// ---------------------------------------------------------------------------

type TranscriptLine =
  | { variant: "prompt"; path: string; command: string }
  | { variant: "stdout" | "stderr" | "spinner" | "success"; text: string };

const TRANSCRIPT: TranscriptLine[] = [
  { variant: "prompt", path: "~/praxis", command: "deploy --env production --canary 5" },
  { variant: "stdout", text: "resolving workspace · 214 packages up to date" },
  { variant: "stdout", text: "lockfile verified · sha 9f31c0a" },
  { variant: "stdout", text: "building 42 modules · tree-shaken to 1.18 MB" },
  { variant: "stdout", text: "prerendering 6 routes · 1.9s" },
  { variant: "stdout", text: "vitest 148/148 green · 9.8s" },
  { variant: "stdout", text: "typecheck clean · 3.1s" },
  { variant: "stdout", text: "uploading 3 shards → cdn.prd.praxis.dev" },
  { variant: "stdout", text: "shard 1/3 · 412 KB · 96 ms" },
  { variant: "stdout", text: "shard 2/3 · 388 KB · 89 ms" },
  { variant: "stdout", text: "shard 3/3 · 501 KB · 121 ms" },
  { variant: "stderr", text: "error: edge region euw-2 unreachable — retry 1/3" },
  { variant: "stdout", text: "backoff 2.4s · re-dialing euw-2" },
  { variant: "stderr", text: "error: edge region euw-2 unreachable — retry 2/3" },
  { variant: "stdout", text: "backoff 4.8s · re-dialing euw-2" },
  { variant: "stdout", text: "handshake ok · euw-2 · rtt 38 ms" },
  { variant: "success", text: "edge release complete · 12.4s" },
  { variant: "prompt", path: "~/praxis", command: "promote --canary" },
  { variant: "stdout", text: "canary scheduled · 5% → 25% → 100%" },
  { variant: "spinner", text: "error-rate gate · 0.02% of 0.50% budget" },
  { variant: "spinner", text: "streaming metrics from euw-2 · 71%" },
];

type StageState = "done" | "running";

const STAGES: { name: string; meta: string; state: StageState }[] = [
  { name: "Install & resolve", meta: "12.1s", state: "done" },
  { name: "Build & typecheck", meta: "41.0s", state: "done" },
  { name: "Test · vitest 148", meta: "9.8s", state: "done" },
  { name: "Edge deploy · euw-2", meta: "12.4s", state: "done" },
  { name: "Promote canary", meta: "live", state: "running" },
];

const DETAILS: [string, string][] = [
  ["Commit", "9f31c0a"],
  ["Author", "Mira Kim"],
  ["Branch", "release-2.14"],
  ["Trigger", "merge #1183"],
  ["Started", "14:02 UTC · 4m ago"],
];

// ---------------------------------------------------------------------------
// Page — CI deploy console (desktop, light): a streaming terminal whose tail
// defocuses under an AtmosphereScrim, with a GlassDisplacement action dock
// floating on the blur field, plus a pipeline / run-details rail.
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col px-6 py-6">
        {/* header */}
        <header className="flex items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-1.5 text-caption uppercase tracking-[0.14em] text-neutral-400">
              <Activity className="size-3.5" />
              Praxis CI · Pipelines
            </p>
            <h1 className="mt-1 text-heading-1 text-default-font">
              Deploy · release-2.14
            </h1>
            <p className="mt-1 text-caption text-neutral-500">
              Run #4021 · production · triggered by merge #1183
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 rounded-full border border-solid border-default-border bg-panel px-4 py-2 text-caption text-neutral-600">
            <span className="size-1.5 rounded-full bg-success-500" />
            Live · canary 5%
            <span className="h-3.5 w-px bg-default-border" />
            <span className="tabular-nums">04:12</span>
          </div>
        </header>

        {/* body */}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_300px] items-start gap-5">
          {/* console panel — log tail fades under the scrim, glass dock on top */}
          <section className="relative flex h-[560px] flex-col overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
            <div className="flex flex-none items-center justify-between border-b border-solid border-default-border px-5 py-3">
              <span className="flex items-center gap-2 text-caption font-medium text-default-font">
                <Terminal className="size-4 text-neutral-500" />
                Console · edge deploy
              </span>
              <span className="flex items-center gap-1.5 text-caption text-neutral-400">
                <span className="size-1.5 rounded-full bg-warning-500" />
                euw-2 · tail -f
              </span>
            </div>

            {/* transcript, anchored to the tail like a scrolled-to-bottom console */}
            <div className="relative min-h-0 flex-1">
              <div className="absolute inset-x-0 bottom-0 z-0 flex flex-col gap-0.5 px-5 pb-6">
                {TRANSCRIPT.map((line, i) =>
                  line.variant === "prompt" ? (
                    <TerminalLine
                      key={i}
                      variant="prompt"
                      path={line.path}
                      command={line.command}
                    />
                  ) : (
                    <TerminalLine key={i} variant={line.variant} text={line.text} />
                  )
                )}
              </div>
            </div>

            {/* progressive blur field over the log tail */}
            <AtmosphereScrim />

            {/* glass action dock riding on the blur field */}
            <GlassDisplacement
              radius="pill"
              intensity="medium"
              className="absolute bottom-5 left-1/2 z-10 w-[420px] -translate-x-1/2"
            >
              <div className="flex w-full items-center justify-between gap-2 px-3 py-1.5">
                <span className="flex items-center gap-2 text-caption text-neutral-600">
                  <span className="size-1.5 flex-none rounded-full bg-success-500" />
                  canary 5% · 2m 14s
                </span>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption text-default-font transition-colors hover:bg-foreground/10"
                  >
                    <Pause className="size-3.5" />
                    Pause
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption text-destructive-600 transition-colors hover:bg-destructive-600/10"
                  >
                    <RotateCcw className="size-3.5" />
                    Rollback
                  </button>
                </span>
              </div>
            </GlassDisplacement>
          </section>

          {/* right rail */}
          <aside className="flex h-[560px] flex-col gap-5">
            <div className="rounded-xl border border-solid border-default-border bg-panel px-4 py-4">
              <h2 className="text-heading-3 text-default-font">Pipeline</h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {STAGES.map((stage) => (
                  <li
                    key={stage.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-2.5 text-caption text-default-font">
                      {stage.state === "done" ? (
                        <Check className="size-3.5 flex-none text-success-600" />
                      ) : (
                        <Loader2 className="size-3.5 flex-none text-neutral-500" />
                      )}
                      {stage.name}
                    </span>
                    <span className="text-caption tabular-nums text-neutral-400">
                      {stage.meta}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-solid border-default-border bg-panel px-4 py-4">
              <h2 className="text-heading-3 text-default-font">Run details</h2>
              <dl className="mt-3 flex flex-col gap-2">
                {DETAILS.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3"
                  >
                    <dt className="text-caption text-neutral-400">{label}</dt>
                    <dd className="text-caption text-default-font">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-auto flex items-center gap-2 text-caption text-neutral-400">
              <ShieldCheck className="size-3.5 flex-none text-success-600" />
              Auto-rollback armed · error-rate gate 0.50% · window 15m
            </p>
          </aside>
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between pt-5 text-caption text-neutral-400">
          <span>praxis.dev/pipelines/deploy/4021</span>
          <span>Next canary check in 3m 46s</span>
        </div>
      </div>
    </EvalShell>
  );
}
