"use client";

/**
 * EVAL page (pair-067) — "Praxis CI · live production deploy runner".
 * Components: ds:FloatingToolbar, ds:TerminalLine, ui:progress.
 * Conditions: 1024x768 (laptop), dark theme, ltr, no constraint.
 *
 * Story: a laptop-width operations screen watching pipeline #1284 deploy
 * praxis-core to production. The left panel is the live terminal transcript
 * (TerminalLine: the prompt, build stdout, a retry warning, the completed
 * build and the in-flight asset upload). A FloatingToolbar floats over the
 * transcript with the runner's contextual actions (rerun, share · save logs,
 * stop). The terminal footer and the right-rail stage list carry ui:progress
 * bars for build / test / deploy.
 */

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";
import { TerminalLine } from "@/components/ds/TerminalLine";
import { Progress } from "@/components/ui/progress";

const stages = [
  { name: "build", detail: "42 modules · 12.4s", value: 100, state: "passed" },
  { name: "test", detail: "318 passed · 0 failed", value: 100, state: "passed" },
  { name: "deploy", detail: "euw-2 · assets 18/26", value: 68, state: "running" },
] as const;

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen min-h-0 flex-col bg-default-background">
        {/* App bar */}
        <header className="flex flex-none items-center justify-between border-b border-solid border-default-border px-6 py-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <span className="font-caption text-[15px] font-[600] text-default-font">
              Praxis CI
            </span>
            <span className="text-neutral-600">/</span>
            <h1 className="truncate font-caption text-caption text-default-font">
              praxis-core
            </h1>
            <span className="truncate font-code text-code text-neutral-500">
              #1284 · main → production
            </span>
          </div>
          <div className="flex flex-none items-center gap-2.5 font-code text-code text-neutral-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success-500" />
            <span>running · 02:14 · runner linux-arm64</span>
          </div>
        </header>

        {/* Main split: transcript + stage rail */}
        <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_292px] gap-6 p-6">
          {/* Terminal transcript panel */}
          <section className="relative flex min-h-0 flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            <div className="flex flex-none items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
              <span className="font-code text-code text-neutral-500">
                ~/praxis — zsh
              </span>
              <span className="font-code text-code text-neutral-600">
                tail -f deploy.log
              </span>
            </div>

            {/* Transcript — the FloatingToolbar floats over this content.
                The first line starts below the toolbar band (pt-14) so the
                glass capsule never covers log text. */}
            <div className="relative min-h-0 flex-1 px-4 pb-4 pt-14">
              <div className="flex flex-col gap-0.5">
                <TerminalLine
                  variant="prompt"
                  path="~/praxis"
                  command="deploy --env production"
                />
                <TerminalLine variant="stdout" text="resolving lockfile · 214 packages up to date" />
                <TerminalLine variant="stdout" text="building 42 modules · bundle 1.2 MB" />
                <TerminalLine variant="stderr" text="warn: edge region euw-2 slow to ack — retry 1/3" />
                <TerminalLine variant="success" text="build complete · 12.4s" />
                <TerminalLine variant="spinner" text="uploading assets to cdn · 18/26" />
              </div>

              {/* Floating action toolbar for the running job */}
              <div className="absolute right-4 top-3 z-10">
                <FloatingToolbar>
                  <FloatingToolbar.Action glyph="⟲" label="Rerun" />
                  <FloatingToolbar.Action glyph="⌘" label="Share" />
                  <FloatingToolbar.Rule />
                  <FloatingToolbar.Action glyph="↓" label="Export" />
                  <FloatingToolbar.Action glyph="■" label="Stop" tone="destructive" />
                </FloatingToolbar>
              </div>
            </div>

            {/* Deploy progress footer */}
            <div className="flex-none border-t border-solid border-default-border px-4 py-3.5">
              <div className="flex items-baseline justify-between">
                <span className="font-caption text-caption text-default-font">
                  deploy · euw-2 → production
                </span>
                <span className="font-code text-code text-neutral-500">68%</span>
              </div>
              <Progress value={68} className="mt-2.5 h-1.5" />
            </div>
          </section>

          {/* Stage rail */}
          <aside className="flex min-h-0 flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-caption text-caption font-[600] text-default-font">
                Pipeline stages
              </h2>
              <span className="font-code text-code text-neutral-600">3</span>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-solid border-default-border bg-panel p-4">
              {stages.map((stage) => (
                <div key={stage.name} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="flex items-baseline gap-2 font-caption text-caption text-default-font">
                      {stage.state === "passed" ? (
                        <span className="font-code text-code text-success-600">✓</span>
                      ) : (
                        <span className="font-code text-code text-neutral-500">⟳</span>
                      )}
                      {stage.name}
                    </span>
                    <span className="truncate font-code text-code text-neutral-500">
                      {stage.detail}
                    </span>
                  </div>
                  <Progress
                    value={stage.value}
                    aria-label={`${stage.name} progress`}
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>

            {/* Run meta */}
            <div className="mt-auto flex flex-col gap-1.5 rounded-lg border border-solid border-default-border p-4">
              <span className="font-caption text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                Commit
              </span>
              <span className="font-code text-code text-default-font">
                a3f9c12 · fix: relay retry backoff
              </span>
              <span className="font-code text-code text-neutral-600">
                @mira · triggered 02:14 ago
              </span>
            </div>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
