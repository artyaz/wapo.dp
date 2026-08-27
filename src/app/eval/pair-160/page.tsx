"use client";

/**
 * EVAL page (pair-160) — components: ui:data-table, ds:AssetCard, ds:DefaultPageLayout
 * Conditions: phone 390x844, dark theme, ltr, no constraint, scenario: a settings panel.
 *
 * Scenario: the "Media & storage" settings panel of a recording app on a phone.
 * DefaultPageLayout is the page scaffold (header band / body / footer band).
 * The body holds a "Storage by type" card whose DataTable breaks the library
 * down into audio / video / image usage (files + disk used), and a
 * "Default assets" card with the two AssetCards (room-tone audio master +
 * intro-sting video) that get applied to every new recording.
 */

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import { DefaultPageLayout } from "@/components/ds/DefaultPageLayout";
import { AssetCard } from "@/components/ds/AssetCard";
import { createColumnHelper, DataTable } from "@/components/ui/data-table";

// ---------------------------------------------------------------------------
// Storage table data
// ---------------------------------------------------------------------------

type StorageRow = {
  type: string;
  files: number;
  used: string;
};

const storageRows: StorageRow[] = [
  { type: "Audio", files: 214, used: "7.8 GB" },
  { type: "Video", files: 86, used: "5.2 GB" },
  { type: "Images & docs", files: 121, used: "1.2 GB" },
];

const helper = createColumnHelper<StorageRow>();

const storageColumns = helper.columns([
  helper.accessor("type", {
    header: "Type",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue<string>("type")}</span>
    ),
  }),
  helper.accessor("files", {
    header: "Files",
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {row.getValue<number>("files")}
      </span>
    ),
  }),
  helper.accessor("used", {
    size: 84,
    header: () => <div className="text-right">Used</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {row.getValue<string>("used")}
      </div>
    ),
  }),
]);

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------

// NOTE: the DS neutral ramp inverts in dark theme (neutral-900 = lightest,
// neutral-200 = darkest), so on the dark `bg-panel` cards the readable choices
// are `text-default-font` / high neutrals; on DefaultPageLayout's white column
// (hardcoded light surface) the readable choices are the low neutrals.
function SectionHeading({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) {
  return (
    <div className="flex w-full items-baseline justify-between gap-3">
      <h2 className="text-body-medium font-body-medium text-default-font">
        {title}
      </h2>
      <span className="text-caption font-caption text-neutral-500">
        {caption}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <DefaultPageLayout>
        {/* Header band — page identity */}
        <header className="flex w-full shrink-0 flex-col gap-1 border-b border-solid border-default-border px-5 py-4">
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            Settings / Media library
          </span>
          <span className="text-heading-3 font-heading-3 text-neutral-200">
            Media &amp; storage
          </span>
        </header>

        {/* Body — settings sections */}
        <main className="flex w-full flex-col gap-4 px-4 py-5">
          {/* Storage by type — ui:data-table */}
          <section
            aria-label="Storage by type"
            className="flex w-full flex-col gap-3 rounded-lg border border-solid border-default-border bg-panel p-4"
          >
            <SectionHeading title="Storage by type" caption="421 files" />
            <DataTable
              columns={storageColumns}
              data={storageRows}
              showPagination={false}
              footer={
                <div className="flex items-center justify-between px-1">
                  <span className="text-caption font-caption text-neutral-500">
                    Synced yesterday
                  </span>
                  <span className="font-code text-[11px] text-neutral-500">
                    14.2 GB of 100 GB
                  </span>
                </div>
              }
            />
          </section>

          {/* Default assets — ds:AssetCard */}
          <section
            aria-label="Default assets"
            className="flex w-full flex-col gap-3 rounded-lg border border-solid border-default-border bg-panel p-4"
          >
            <SectionHeading
              title="Default assets"
              caption="applied to new recordings"
            />
            <div className="flex w-full flex-col gap-3">
              <AssetCard
                kind="audio"
                title="room-tone.wav"
                duration="00:48"
                meta="WAV · 48 kHz · 24-bit"
              />
              <AssetCard
                kind="video"
                title="intro-sting.mp4"
                duration="00:12"
                meta="MP4 · 1080p · H.264"
              />
            </div>
          </section>
        </main>

        {/* Footer band — status */}
        <footer className="mt-auto flex w-full shrink-0 items-center justify-between gap-x-4 border-t border-solid border-default-border px-5 py-3">
          <span className="text-caption font-caption text-neutral-400">
            Media library · 2 default assets
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            synced 2 min ago
          </span>
        </footer>
      </DefaultPageLayout>
    </EvalShell>
  );
}
