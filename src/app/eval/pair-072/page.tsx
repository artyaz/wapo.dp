"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { MaterialTokens } from "@/components/ds/MaterialTokens";
import { JumpToLatest } from "@/components/ds/JumpToLatest";
import { PanelTile } from "@/components/ds/PanelTile";
import { ChevronLeftIcon } from "lucide-react";

/**
 * pair-072 — "Pocket Inspector" on a 320px phone (light, ltr).
 *
 * Scenario: a designer remotely inspects a desktop design-tool session from
 * their phone — the windowed panel currently under review (PanelTile), the
 * glass material-ramp reference it is measured against (MaterialTokens), and
 * the streaming build audit whose tail is covered by the jump-to-latest
 * affordance (JumpToLatest).
 */

const SURFACE = [
  { label: "Level", value: "regular" },
  { label: "Tint", value: "panel/60" },
  { label: "Blur", value: "40px" },
  { label: "Saturate", value: "150%" },
  { label: "Rim", value: "#ffffff33" },
];

const STREAM = [
  { t: "12:01:02", line: "build 4471 — glass audit started" },
  { t: "12:01:04", line: "detail-sheet · tint panel/60 ok" },
  { t: "12:01:06", line: "backdrop blur 40px ≤ budget 56px" },
  { t: "12:01:09", line: "rim #fff/20 · specular inset pass" },
  { t: "12:01:12", line: "saturate 150% — within ramp" },
  { t: "12:01:15", line: "checking layer 03 / 04 …" },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-baseline justify-between gap-4">
      <span className="min-w-0 truncate text-caption font-caption text-neutral-500">
        {label}
      </span>
      <span className="min-w-0 truncate font-code text-[13px] text-default-font tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-dvh w-full flex-col">
        {/* app bar */}
        <header className="flex h-12 flex-none items-center gap-2 border-b border-solid border-default-border px-2">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md text-neutral-600">
            <ChevronLeftIcon className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold leading-[18px] text-default-font">
              Pocket Inspector
            </span>
            <span className="truncate font-code text-[10px] leading-[14px] text-neutral-500">
              praxis studio · remote session
            </span>
          </div>
          <div className="flex flex-none items-center gap-1.5 pr-1">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            <span className="font-code text-[10px] text-neutral-500">4471</span>
          </div>
        </header>

        <main className="flex flex-col gap-4 px-3 pb-10 pt-3">
          {/* windowed panel under inspection */}
          <PanelTile variant="focused" title="Panel · detail-sheet">
            <div className="flex w-full flex-col gap-2.5">
              {SURFACE.map((row) => (
                <Row key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
          </PanelTile>

          {/* material ramp the surface is measured against */}
          <section className="flex w-full flex-col gap-2">
            <span className="font-code text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              Material ramp
            </span>
            <MaterialTokens className="w-full" />
          </section>

          {/* streaming build audit — FAB covers the trace tail */}
          <section className="flex w-full flex-col gap-2">
            <span className="font-code text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              Audit stream · 6 events
            </span>
            <div className="relative flex h-[150px] w-full flex-col gap-1.5 overflow-hidden rounded-lg border border-solid border-neutral-800 bg-neutral-950 p-3">
              {STREAM.map((e) => (
                <div key={e.t} className="flex items-baseline gap-2">
                  <span className="flex-none font-code text-[10px] leading-[14px] text-neutral-600 tabular-nums">
                    {e.t}
                  </span>
                  <span className="min-w-0 truncate font-code text-[10px] leading-[14px] text-neutral-400">
                    {e.line}
                  </span>
                </div>
              ))}
              {/* floats over the tail of the trace — jumps to newest output */}
              <div className="absolute bottom-3 right-3">
                <JumpToLatest size={36} label="Jump to latest output" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
