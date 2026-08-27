"use client";

import React from "react";
import {
  ClapperboardIcon,
  FilePlus2Icon,
  FileWarningIcon,
  FolderSearchIcon,
  HardDriveDownloadIcon,
  HistoryIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { TrackHeader } from "@/components/ds/TrackHeader";

/* Offline clips shown as ghost chips inside the recovered (but empty) lanes. */
function OfflineChip({ label }: { label: string }) {
  return (
    <div className="flex h-6 max-w-full shrink-0 items-center gap-1.5 rounded-[4px] border border-dashed border-neutral-300 bg-panel px-2">
      <FileWarningIcon className="size-3 shrink-0 text-neutral-400" />
      <span className="truncate font-code text-[10px] text-neutral-500">
        {label}
      </span>
    </div>
  );
}

const RULER_LABELS = ["00:00", "03:00", "06:00", "09:00", "12:00"];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden font-body">
        {/* ── Editor chrome ─────────────────────────────────────── */}
        <header className="flex flex-none items-center gap-4 border-b border-solid border-default-border bg-panel px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-neutral-900 text-white">
              <ClapperboardIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold text-default-font">
              Praxis Cut
            </span>
          </div>
          <div className="h-4 w-px bg-default-border" />
          <div className="min-w-0 truncate text-sm text-neutral-500">
            Field Notes — interview edit
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-solid border-warning-200 bg-warning-50 px-2.5 py-1">
              <TriangleAlertIcon className="size-3.5 text-warning-600" />
              <span className="text-xs font-medium text-warning-700">
                Recovered after unexpected quit · 14:32
              </span>
            </div>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 gap-5 p-5">
          {/* ── Timeline: track layout recovered, media offline ──── */}
          <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
            <div className="flex flex-none items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
              <h2 className="text-sm font-semibold text-default-font">
                Timeline
              </h2>
              <span className="font-code text-[11px] text-neutral-500">
                3 clips offline · 00:12:47
              </span>
            </div>

            {/* time ruler */}
            <div className="flex h-6 flex-none items-stretch overflow-hidden border-b border-solid border-default-border bg-neutral-50">
              <div className="w-[180px] flex-none border-r border-solid border-default-border" />
              <div className="relative grow">
                {Array.from({ length: 13 }, (_, i) => (
                  <div
                    key={i}
                    className={`absolute bottom-0 w-px ${
                      i % 3 === 0 ? "h-2.5 bg-neutral-400" : "h-1.5 bg-neutral-300"
                    }`}
                    style={{ left: `${(i / 12) * 100}%` }}
                  />
                ))}
                {RULER_LABELS.map((label, i) => (
                  <span
                    key={label}
                    className="absolute bottom-2.5 font-code text-[9px] leading-none text-neutral-400"
                    style={{
                      left: `${(i / 4) * 100}%`,
                      transform:
                        i === 0
                          ? "none"
                          : i === RULER_LABELS.length - 1
                            ? "translateX(-100%)"
                            : "translateX(-50%)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* track rows — empty lanes holding offline placeholders */}
            <div className="flex flex-col divide-y divide-solid divide-default-border">
              <div className="flex w-full items-stretch overflow-hidden">
                <TrackHeader trackName="Interview · A1" trackType="audio" />
                <div className="flex grow items-center overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-2.5">
                  <OfflineChip label="interview-take-3.wav · offline" />
                </div>
              </div>
              <div className="flex w-full items-stretch overflow-hidden">
                <TrackHeader trackName="B-Roll · V1" trackType="video" />
                <div className="flex grow items-center overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-2.5">
                  <OfflineChip label="field-notes-4k.mov · offline" />
                </div>
              </div>
              <div className="flex w-full items-stretch overflow-hidden">
                <TrackHeader trackName="Captions · T1" trackType="text" />
                <div className="flex grow items-center overflow-hidden border-l border-solid border-default-border bg-neutral-50 px-2.5">
                  <OfflineChip label="transcript.srt · offline" />
                </div>
              </div>
            </div>

            {/* empty state */}
            <div className="m-4 flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50/60 px-6 text-center">
              <div className="flex size-10 items-center justify-center rounded-full border border-solid border-default-border bg-panel">
                <FolderSearchIcon className="size-5 text-neutral-400" />
              </div>
              <h3 className="mt-1 text-sm font-semibold text-default-font">
                All media is offline
              </h3>
              <p className="max-w-[360px] text-[13px] leading-relaxed text-neutral-500">
                The track layout was recovered from the session file, but none
                of the linked clips could be found on this machine.
              </p>
              <p className="font-code text-[10px] text-neutral-400">
                autosave RU-2847 · written 14:20 · restore from the recovery
                panel
              </p>
            </div>
          </section>

          {/* ── Recovery flow ────────────────────────────────────── */}
          <aside className="flex w-[384px] flex-none flex-col overflow-hidden rounded-xl border border-solid border-default-border bg-panel">
            <div className="flex flex-none items-center justify-between border-b border-solid border-default-border px-4 py-2.5">
              <h2 className="text-sm font-semibold text-default-font">
                Session recovery
              </h2>
              <span className="font-code text-[11px] text-neutral-500">
                RU-2847
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
              <p className="text-[13px] leading-relaxed text-neutral-600">
                Praxis Cut quit unexpectedly at{" "}
                <span className="font-medium text-default-font">14:32</span>{" "}
                while editing “Field Notes”. An autosave written twelve minutes
                before the crash is available.
              </p>

              <ItemGroup className="gap-3">
                <Item variant="muted" size="sm">
                  <ItemMedia variant="icon">
                    <HistoryIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Restore autosave</ItemTitle>
                    <ItemDescription>
                      Saved 14:20, just before the crash
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm">
                      Restore{" "}
                      <Kbd data-icon="inline-end" className="translate-x-0.5">
                        ⏎
                      </Kbd>
                    </Button>
                  </ItemActions>
                </Item>

                <Item variant="outline" size="sm">
                  <ItemMedia variant="icon">
                    <HardDriveDownloadIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Relink from backup</ItemTitle>
                    <ItemDescription>
                      2 offline files found on “Archive SSD”
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="outline">
                      Relink
                    </Button>
                  </ItemActions>
                </Item>

                <Item variant="outline" size="sm">
                  <ItemMedia variant="icon">
                    <FilePlus2Icon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Start a blank session</ItemTitle>
                    <ItemDescription>
                      Discard the autosave and start fresh
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="outline">
                      Start blank
                    </Button>
                  </ItemActions>
                </Item>
              </ItemGroup>

              {/* what the autosave holds */}
              <div className="mt-auto flex flex-col gap-2 rounded-lg border border-solid border-default-border bg-neutral-50 px-3.5 py-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                  In the autosave
                </span>
                <dl className="flex flex-col gap-1.5">
                  {[
                    ["Contents", "3 clips · 7 markers · 12:47"],
                    ["Written", "14:20:07 · today"],
                    ["Retention", "kept for 7 days"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <dt className="text-xs text-neutral-500">{k}</dt>
                      <dd className="text-xs font-medium text-default-font">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* keyboard hints */}
              <div className="flex flex-none items-center justify-end border-t border-solid border-default-border pt-3">
                <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <KbdGroup>
                      <Kbd>↑</Kbd>
                      <Kbd>↓</Kbd>
                    </KbdGroup>
                    review
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Kbd>⏎</Kbd> confirm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Kbd>Esc</Kbd> dismiss
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
