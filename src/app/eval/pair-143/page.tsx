"use client";

/**
 * EVAL page (pair-143) — image gallery with metadata.
 * Components: ds:PanelTile, ds:CanvasNode, ds:DrawerLayout
 * Conditions: viewport 1280x800, light theme, ltr, no-scroll.
 *
 * Scenario: the "Lumen Studio" photo library. The left rail lists the
 * Nordic Light collection as a filmstrip of frames (IMG_4821 selected).
 * The workspace shows the selected frame's develop pipeline as a node
 * graph (CanvasNode: RAW import → Color grade → Publish), compact
 * metadata panels beneath it (PanelTile: develop recipe + file facts),
 * and the frame's full metadata sheet docked open on the right
 * (DrawerLayout, non-modal, open on load).
 */

import React from "react";
import { Aperture } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import * as SubframeCore from "@/lib/subframe/core";
import { PanelTile } from "@/components/ds/PanelTile";
import { CanvasNode } from "@/components/ds/CanvasNode";
import { DrawerLayout } from "@/components/ds/DrawerLayout";

/** Filmstrip of the collection — quiet gradient stand-ins for frames. */
const FRAMES = [
  { id: "IMG_4817", gradient: "linear-gradient(160deg, #d9dfe4 0%, #a9b6c1 100%)", selected: false },
  { id: "IMG_4818", gradient: "linear-gradient(160deg, #cfd9d1 0%, #9db2a7 100%)", selected: false },
  { id: "IMG_4819", gradient: "linear-gradient(160deg, #e3ded3 0%, #c4b9a3 100%)", selected: false },
  { id: "IMG_4820", gradient: "linear-gradient(160deg, #c9d8d2 0%, #74918b 100%)", selected: false },
  { id: "IMG_4821", gradient: "linear-gradient(160deg, #b3bdd1 0%, #56678b 100%)", selected: true },
];

/** Full metadata rows shown inside the open details sheet. */
const DETAILS = [
  { label: "Captured", value: "Aug 14, 2025 · 21:42" },
  { label: "Camera", value: "Nikon Z8 · 24–70mm f/2.8" },
  { label: "Exposure", value: "1/250 s · f/8 · ISO 400" },
  { label: "Resolution", value: "6048 × 4024 · 45.7 MP" },
  { label: "License", value: "Editorial · rights managed" },
];

/** Compact label/value row used inside the PanelTiles. */
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
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-default-background font-body text-default-font">
        {/* ── Top bar ──────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-solid border-default-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-default-font text-default-background">
              <Aperture className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3 text-default-font">
              Lumen Studio
            </span>
            <span className="h-4 w-px bg-default-border" />
            <span className="font-caption text-caption text-neutral-500">
              Library / Nordic Light
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            <span className="font-caption text-caption text-neutral-600">
              Synced · 2 min ago
            </span>
            <span className="h-4 w-px bg-default-border" />
            <span className="font-caption text-caption text-neutral-600">
              Maya Lenskaya
            </span>
          </div>
        </header>

        <div className="flex min-h-0 grow">
          {/* ── Collection rail (filmstrip) ─────────────────────────── */}
          <aside className="flex w-[164px] flex-none flex-col gap-3 border-r border-solid border-default-border px-4 pb-4 pt-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-caption text-caption uppercase tracking-[0.1em] text-neutral-500">
                Collection
              </span>
              <span className="font-body-medium text-body-medium text-default-font">
                Nordic Light
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {FRAMES.map((frame) => (
                <div key={frame.id} className="flex flex-col gap-1">
                  <div
                    className={
                      "h-[88px] w-full rounded-md border border-solid " +
                      (frame.selected
                        ? "border-2 border-brand-primary"
                        : "border-default-border")
                    }
                    style={{ background: frame.gradient }}
                  />
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={
                        "min-w-0 truncate font-code text-[10px] leading-4 " +
                        (frame.selected
                          ? "font-semibold text-default-font"
                          : "text-neutral-500")
                      }
                    >
                      {frame.id}
                    </span>
                    {frame.selected ? (
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-primary" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-1.5 border-t border-solid border-default-border pt-3">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-success-500" />
              <span className="font-caption text-caption text-neutral-500">
                214 items · synced
              </span>
            </div>
          </aside>

          {/* ── Workspace (the details sheet docks over this pane) ──── */}
          <main className="relative min-w-0 grow">
            <div
              aria-hidden="true"
              className="flex h-full flex-col gap-4 p-5"
            >
              {/* frame heading */}
              <div className="flex flex-none flex-col gap-1.5 pr-[340px]">
                <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                  Library / Nordic Light / IMG_4821.cr3
                </span>
                <div className="flex items-baseline justify-between gap-4">
                  <h1 className="font-heading-2 text-heading-2 text-default-font">
                    Fjord at dusk
                  </h1>
                  <span className="font-caption text-caption text-default-font/60">
                    Grading in progress · edited 12 min ago
                  </span>
                </div>
              </div>

              {/* develop pipeline canvas */}
              <div
                className="relative min-h-0 grow overflow-hidden rounded-lg border border-solid border-default-border bg-default-background"
                style={{
                  backgroundImage:
                    "radial-gradient(rgb(214 210 199) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              >
                <span className="pointer-events-none absolute left-3 top-2.5 font-code text-[11px] tracking-[0.04em] text-neutral-500">
                  develop · pipeline · v3
                </span>
                <span className="pointer-events-none absolute bottom-2.5 left-3 font-code text-[10px] text-neutral-400">
                  drag to pan · scroll to zoom
                </span>
                <span className="pointer-events-none absolute bottom-2.5 right-[340px] font-code text-[10px] text-neutral-400">
                  3 stages · zoom 100%
                </span>

                {/* node chain — centered in the area left of the sheet */}
                <div className="flex h-full items-center justify-center pl-2 pr-[340px]">
                  <div className="flex items-center">
                    <CanvasNode
                      title="RAW import"
                      statusTone="success"
                      footer={
                        <span className="font-code text-[11px] text-neutral-400">
                          src/IMG_4821.cr3
                        </span>
                      }
                    >
                      <span className="text-code font-code text-default-font">
                        6048 × 4024 px
                      </span>
                      <span className="text-code font-code text-neutral-500">
                        14-bit · 68.4 MB
                      </span>
                    </CanvasNode>
                    <div className="h-px w-4 flex-none bg-neutral-300" />
                    <CanvasNode
                      variant="selected"
                      title="Color grade"
                      statusTone="live"
                      footer={
                        <span className="font-code text-[11px] text-neutral-400">
                          recipe/fjord-dusk
                        </span>
                      }
                    >
                      <span className="text-code font-code text-default-font">
                        WB · 5600 K
                      </span>
                      <span className="text-code font-code text-neutral-500">
                        exp · +0.35 EV
                      </span>
                    </CanvasNode>
                    <div className="h-px w-4 flex-none bg-neutral-300" />
                    <CanvasNode
                      title="Publish"
                      statusTone="idle"
                      footer={
                        <span className="font-code text-[11px] text-neutral-400">
                          dst/gallery/web
                        </span>
                      }
                    >
                      <span className="text-code font-code text-default-font">
                        2048 px · JPEG 9
                      </span>
                      <span className="text-code font-code text-neutral-500">
                        sRGB · 1.8 MB
                      </span>
                    </CanvasNode>
                  </div>
                </div>
              </div>

              {/* metadata panels */}
              <div className="flex flex-none gap-4 pr-[340px]">
                <div className="min-w-0 flex-1">
                  <PanelTile title="Develop recipe · fjord-dusk">
                    <div className="flex w-full flex-col gap-2.5">
                      <Row label="White balance" value="5600 K" />
                      <Row label="Exposure" value="+0.35 EV" />
                      <Row label="Contrast" value="+12" />
                      <Row label="Profile" value="Camera Neutral" />
                    </div>
                  </PanelTile>
                </div>
                <div className="min-w-0 flex-1">
                  <PanelTile variant="focused" title="File · IMG_4821.cr3">
                    <div className="flex w-full flex-col gap-2.5">
                      <Row label="Format" value="NEF · 14-bit" />
                      <Row label="Dimensions" value="6048 × 4024" />
                      <Row label="Size" value="68.4 MB" />
                      <Row label="Color" value="Adobe RGB" />
                    </div>
                  </PanelTile>
                </div>
              </div>
            </div>

            {/* ── Image details sheet (open on load) ─────────────────── */}
            <DrawerLayout
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              direction="right"
              modal={false}
              className="absolute inset-0"
            >
              <div className="flex w-[320px] max-w-full flex-col items-start gap-1.5 px-6 pt-6">
                <SubframeCore.Drawer.Title className="font-heading-2 text-heading-2 text-default-font">
                  Image details
                </SubframeCore.Drawer.Title>
                <SubframeCore.Drawer.Description className="font-caption text-caption text-neutral-500">
                  Fjord at dusk · IMG_4821.cr3
                </SubframeCore.Drawer.Description>
              </div>

              <div className="flex w-[320px] max-w-full flex-col items-start px-6">
                <div
                  className="h-[112px] w-full rounded-md border border-solid border-default-border"
                  style={{ background: FRAMES[4].gradient }}
                />
              </div>

              <div className="flex w-[320px] max-w-full flex-col items-start px-6">
                {DETAILS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-2.5 first:border-t-0 first:pt-0"
                  >
                    <span className="font-caption text-caption uppercase tracking-[0.1em] text-neutral-500">
                      {label}
                    </span>
                    <span className="font-body text-body text-default-font">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-[320px] max-w-full flex-col items-start gap-2 px-6 pb-6">
                <div className="flex w-full items-center gap-2">
                  <button
                    type="button"
                    className="flex h-8 flex-none items-center rounded-md bg-default-font px-3 font-caption text-caption text-default-background"
                  >
                    Add to album
                  </button>
                  <button
                    type="button"
                    className="flex h-8 flex-none items-center rounded-md border border-solid border-default-border px-3 font-caption text-caption text-neutral-500"
                  >
                    Download original
                  </button>
                </div>
                <span className="font-caption text-caption text-neutral-500">
                  NEF original · 68.4 MB
                </span>
              </div>
            </DrawerLayout>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
