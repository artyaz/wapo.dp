"use client";

/**
 * pair-084 — "Praxis Desk" FX copilot terminal (dark, 1280×800, ltr, no-scroll).
 *
 * A Tokyo-session USD/JPY workspace:
 *  • slim icon rail + top bar (terminal chrome)
 *  • market panel — timeframe Tabs (15m feed disabled) over a CrosshairTag
 *    chart pinned to the momentum-flip bar, with session stats, signal log
 *    and the open position card
 *  • copilot panel — an agent transcript whose prose is woven with the
 *    InlineChips atoms (IntegrationAvatar, CodePill, FileRef) exactly as the
 *    component intends, plus a run-summary strip and composer
 */

import React from "react";
import {
  Activity,
  Bot,
  CandlestickChart,
  MessageSquare,
  Paperclip,
  Send,
  Settings,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { InlineChips } from "@/components/ds/InlineChips";
import { CrosshairTag } from "@/components/ds/CrosshairTag";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/* ------------------------------------------------------------------ */
/* Copilot transcript                                                  */
/* ------------------------------------------------------------------ */

function CopilotMessage({
  time,
  children,
}: {
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-[680px] items-start gap-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-solid border-default-border bg-panel">
        <Sparkles className="size-3.5 text-neutral-500" />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-default-font">
            Copilot
          </span>
          <span className="font-code text-[11px] text-neutral-500 tabular-nums">
            {time}
          </span>
        </div>
        <p className="mt-1 text-[14px] leading-[24px] text-neutral-600">
          {children}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-solid border-default-border bg-card/40 px-5">
          <span className="text-sm font-semibold tracking-tight">
            Praxis Desk
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm text-muted-foreground">FX</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm font-medium">USD/JPY</span>
          <span className="ml-1 rounded-full border border-solid border-default-border px-2 py-0.5 font-code text-[10px] text-neutral-500">
            tokyo session
          </span>
          <div className="ml-auto flex items-center gap-5">
            <span className="font-code text-[11px] text-neutral-500 tabular-nums">
              fix 4.2 · 41 ms
            </span>
            <span className="flex items-center gap-1.5 font-code text-[11px] text-neutral-500">
              <span className="size-1.5 rounded-full bg-success-500" />
              live
            </span>
            <div className="flex size-7 items-center justify-center rounded-full border border-solid border-default-border bg-muted font-code text-[10px] text-neutral-600">
              KT
            </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex min-h-0 flex-1 gap-4 p-4">
          {/* Icon rail */}
          <nav className="flex h-full w-12 shrink-0 flex-col items-center rounded-2xl border border-solid border-default-border bg-card py-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="size-4" />
            </div>
            <div className="mt-3 h-px w-6 bg-default-border" />
            <div className="mt-3 flex flex-col items-center gap-1">
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground"
              >
                <CandlestickChart className="size-4" />
              </button>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
              >
                <MessageSquare className="size-4" />
              </button>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
              >
                <Terminal className="size-4" />
              </button>
            </div>
            <div className="mt-auto flex flex-col items-center gap-2">
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
              >
                <Settings className="size-4" />
              </button>
            </div>
          </nav>

          {/* Market panel */}
          <section className="flex h-full w-[380px] shrink-0 flex-col rounded-2xl border border-solid border-default-border bg-card p-4 min-h-0">
            <div className="flex items-baseline justify-between">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                USD/JPY · spot
              </span>
              <span className="font-code text-[11px] text-neutral-500">
                1m tape
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2.5">
              <span className="font-code text-[24px] font-bold leading-8 text-default-font tabular-nums">
                142.85
              </span>
              <span className="font-code text-[13px] text-success-600 tabular-nums">
                +0.42 · +0.29%
              </span>
            </div>

            <Tabs defaultValue="1m" className="mt-3 min-h-0 flex-1">
              <TabsList className="w-full">
                <TabsTrigger value="1m" className="font-code text-xs">
                  1m
                </TabsTrigger>
                <TabsTrigger value="5m" className="font-code text-xs">
                  5m
                </TabsTrigger>
                <TabsTrigger value="15m" disabled className="font-code text-xs">
                  15m
                </TabsTrigger>
                <TabsTrigger value="1h" className="font-code text-xs">
                  1h
                </TabsTrigger>
              </TabsList>
              <TabsContent value="1m" className="mt-2 flex min-h-0 flex-1">
                <CrosshairTag
                  value="142.85"
                  glyph="+0.42"
                  timestamp="2025-06-11 09:41:22"
                  className="h-full w-full"
                />
              </TabsContent>
              <TabsContent value="5m" className="mt-2 flex min-h-0 flex-1">
                <div className="flex h-full w-full items-center justify-center rounded-lg border border-solid border-default-border border-dashed font-code text-[11px] text-neutral-500">
                  aggregating candles…
                </div>
              </TabsContent>
              <TabsContent value="1h" className="mt-2 flex min-h-0 flex-1">
                <div className="flex h-full w-full items-center justify-center rounded-lg border border-solid border-default-border border-dashed font-code text-[11px] text-neutral-500">
                  aggregating candles…
                </div>
              </TabsContent>
            </Tabs>

            {/* Session stats */}
            <div className="mt-3">
              <p className="font-code text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                session stats
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(
                  [
                    ["open", "142.31"],
                    ["high", "143.10"],
                    ["low", "142.61"],
                    ["volume", "8,412"],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-solid border-default-border bg-panel px-3 py-2"
                  >
                    <p className="font-code text-[10px] uppercase tracking-[0.08em] text-neutral-500">
                      {label}
                    </p>
                    <p className="mt-0.5 font-code text-[14px] font-semibold text-default-font tabular-nums">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal log */}
            <div className="mt-3">
              <p className="font-code text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                signals
              </p>
              <div className="mt-1.5 flex flex-col gap-1">
                {(
                  [
                    ["09:38", "momentum flip · long"],
                    ["09:12", "volume spike 2.1×"],
                    ["08:57", "session open"],
                    ["08:32", "book drift 0.12% → trimmed"],
                  ] as const
                ).map(([time, note]) => (
                  <div
                    key={time}
                    className="flex items-baseline gap-3 font-code text-[11px]"
                  >
                    <span className="w-9 shrink-0 text-neutral-500 tabular-nums">
                      {time}
                    </span>
                    <span className="text-neutral-600">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open position */}
            <div className="mt-3 rounded-lg border border-solid border-default-border bg-panel p-3">
              <div className="flex items-center justify-between">
                <span className="font-code text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                  position · usd/jpy
                </span>
                <span className="font-code text-[10px] uppercase tracking-[0.08em] text-success-600">
                  long 12.5k
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between font-code text-[12px] tabular-nums">
                <span className="text-neutral-600">entry 142.41</span>
                <span className="text-[14px] font-bold text-success-600">
                  +$318.20
                </span>
                <span className="text-neutral-600">tp 143.10 · sl 142.05</span>
              </div>
            </div>
          </section>

          {/* Copilot panel */}
          <section className="flex min-w-0 flex-1 flex-col rounded-2xl border border-solid border-default-border bg-card p-4 min-h-0">
            <div className="flex items-center gap-2.5">
              <Bot className="size-4 text-neutral-500" />
              <h2 className="text-sm font-semibold tracking-tight">Copilot</h2>
              <span className="text-xs text-muted-foreground">
                USD/JPY desk · run #4821
              </span>
              <span className="ml-auto font-code text-[11px] text-neutral-500 tabular-nums">
                09:41 JST
              </span>
            </div>

            {/* Transcript */}
            <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
              {/* User */}
              <div className="flex flex-col items-end">
                <div className="max-w-[460px] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                  Rebalance the USD/JPY book and ship the strategy update
                  before the London open.
                </div>
                <span className="mt-1 font-code text-[10px] text-neutral-500 tabular-nums">
                  09:37 JST
                </span>
              </div>

              {/* Copilot replies */}
              <CopilotMessage time="09:38 JST">
                <InlineChips.IntegrationAvatar glyph="S" /> Pulled the session
                fills through the Superblocks integration, rebalanced the book
                to target with{" "}
                <InlineChips.CodePill>momentum.v2</InlineChips.CodePill>, and
                wrote the new weights to{" "}
                <InlineChips.FileRef kind="json">
                  weights.json
                </InlineChips.FileRef>
                .
              </CopilotMessage>

              <CopilotMessage time="09:39 JST">
                Backtested six Tokyo sessions, patched{" "}
                <InlineChips.FileRef kind="tsx" path="src/strategies">
                  MomentumGrid.tsx
                </InlineChips.FileRef>{" "}
                and verified with{" "}
                <InlineChips.CodePill>bunx tsc --noEmit</InlineChips.CodePill>{" "}
                — clean. Notes are in{" "}
                <InlineChips.FileRef kind="md">CHANGELOG.md</InlineChips.FileRef>
                , run log archived to{" "}
                <InlineChips.FileRef kind="generic">
                  run-4821.log
                </InlineChips.FileRef>
                .
              </CopilotMessage>

              <CopilotMessage time="09:40 JST">
                Momentum flipped long on the 1m tape at 09:38 — the chart
                crosshair is pinned to that bar. Canary deploy is queued behind{" "}
                <InlineChips.CodePill>gate: fx-london</InlineChips.CodePill>; I
                &apos;ll keep watching fills and ping you if drawdown breaks{" "}
                <InlineChips.CodePill>0.4%</InlineChips.CodePill>.
              </CopilotMessage>

              {/* Run summary */}
              <div className="flex items-center gap-2 rounded-lg border border-solid border-default-border bg-panel px-3 py-2 font-code text-[11px] text-neutral-500">
                <Zap className="size-3.5 shrink-0 text-neutral-500" />
                <span className="truncate">
                  run #4821 · 3 files changed · 41 s · canary queued
                </span>
                <span className="ml-auto shrink-0 text-success-600">
                  0 errors
                </span>
              </div>
            </div>

            {/* Composer */}
            <div className="mt-3 flex h-11 shrink-0 items-center gap-2.5 rounded-xl border border-solid border-default-border bg-background/60 px-3">
              <Paperclip className="size-4 shrink-0 text-neutral-500" />
              <span className="truncate text-sm text-muted-foreground">
                Ask the copilot about the book…
              </span>
              <span className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Send className="size-3.5" />
              </span>
            </div>
          </section>
        </div>
      </div>
    </EvalShell>
  );
}
