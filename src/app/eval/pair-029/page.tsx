"use client";

/**
 * EVAL page (pair-029) — ds:AssetCard + ui:native-select + ds:AskBar
 * Conditions: phone 390x844, light theme, LTR, no constraint.
 * Scenario: an image gallery with metadata — the mobile "Studio Library"
 * browser for a coastal shoot: collection/sort filters (NativeSelect), a
 * 2-column asset grid where every card carries filename + format metadata
 * (AssetCard), and a shoot-assistant prompt docked at the bottom (AskBar).
 */

import React from "react";
import {
  CheckCheckIcon,
  ChevronLeftIcon,
  ImagesIcon,
  MoreHorizontalIcon,
  SearchIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AssetCard } from "@/components/ds/AssetCard";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/ui/native-select";
import { AskBar } from "@/components/ds/AskBar";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-default-background">
        {/* ---- top bar ---- */}
        <header className="flex items-center gap-3 border-b border-solid border-default-border px-4 py-3">
          <ChevronLeftIcon className="h-5 w-5 flex-none text-neutral-500" />
          <div className="min-w-0 flex-1">
            <h1 className="text-heading-2 font-heading-2 text-default-font">
              Studio Library
            </h1>
            <p className="truncate text-caption font-caption text-neutral-500">
              Coastal Shoot · Apr 12 · 24 assets · 12.6 GB
            </p>
          </div>
          <div className="flex flex-none items-center gap-3 text-neutral-500">
            <SearchIcon className="h-5 w-5" />
            <MoreHorizontalIcon className="h-5 w-5" />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 px-4 pt-4">
          {/* ---- collection & sort filters (ui:native-select) ---- */}
          <section
            className="grid grid-cols-2 gap-3"
            aria-label="Gallery filters"
          >
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="text-caption font-caption text-neutral-500">
                Collection
              </span>
              <NativeSelect
                defaultValue="dunes"
                aria-label="Filter by collection"
              >
                <NativeSelectOptGroup label="Coastal Shoot · Apr 12">
                  <NativeSelectOption value="dunes">
                    Dunes at dawn
                  </NativeSelectOption>
                  <NativeSelectOption value="tide-pools">
                    Tide pools at dusk
                  </NativeSelectOption>
                  <NativeSelectOption value="harbor">
                    Harbor, blue hour
                  </NativeSelectOption>
                </NativeSelectOptGroup>
                <NativeSelectOptGroup label="Studio · Apr 8">
                  <NativeSelectOption value="product">
                    Product table
                  </NativeSelectOption>
                  <NativeSelectOption value="backdrop">
                    Black backdrop
                  </NativeSelectOption>
                </NativeSelectOptGroup>
              </NativeSelect>
            </label>
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="text-caption font-caption text-neutral-500">
                Sort
              </span>
              <NativeSelect defaultValue="newest" aria-label="Sort order">
                <NativeSelectOption value="newest">
                  Newest first
                </NativeSelectOption>
                <NativeSelectOption value="oldest">
                  Oldest first
                </NativeSelectOption>
                <NativeSelectOption value="longest">
                  Longest duration
                </NativeSelectOption>
                <NativeSelectOption value="name">
                  Filename A–Z
                </NativeSelectOption>
              </NativeSelect>
            </label>
          </section>

          {/* ---- asset grid with per-asset metadata (ds:AssetCard) ---- */}
          <section className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="flex items-center gap-1.5 font-body text-[13px] font-[600] leading-[19px] text-default-font">
                <ImagesIcon className="h-4 w-4 flex-none text-neutral-500" />
                Gallery — showing 6 of 24
              </h2>
              <span className="flex flex-none items-center gap-1 text-caption font-caption text-neutral-400">
                <CheckCheckIcon className="h-3.5 w-3.5" />
                synced
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <AssetCard
                kind="video"
                title="DSC_0412.MP4"
                duration="01:24"
                meta="4K UHD · 3840×2160 · 24 fps"
              />
              <AssetCard
                kind="video"
                title="aerial-coastline-pass-04-take2.mp4"
                duration="00:47"
                meta="4K DCI · 4096×2160 · 30 fps"
              />
              <AssetCard
                kind="video"
                title="golden-hour-timelapse.MOV"
                duration="02:13"
                meta="FHD · 1920×1080 · 60 fps"
              />
              <AssetCard
                kind="video"
                title="interview-mira-take-3.MOV"
                duration="04:38"
                meta="4K ProRes · 3840×2160 · 25 fps"
              />
              <AssetCard
                kind="audio"
                title="waves-ambience-loop.wav"
                duration="00:52"
                meta="WAV · 48 kHz · 24-bit stereo"
              />
              <AssetCard
                kind="text"
                title="field-notes-day-1.txt"
                duration="1.8 KB"
                meta="TXT · edited 08:15 · 42 lines"
              />
            </div>
            <p className="text-caption font-caption leading-[16px] text-neutral-400">
              Filenames, formats and timecodes sync from the camera roll —
              long names truncate to a single line.
            </p>
          </section>
        </main>

        {/* ---- shoot assistant (ds:AskBar) ---- */}
        <AskBar
          placeholder="Ask about this shoot…"
          statusText="Answers cite filenames and metadata from this collection."
        />
      </div>
    </EvalShell>
  );
}
