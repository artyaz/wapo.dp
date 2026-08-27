"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { ReasoningLog } from "@/components/ds/ReasoningLog";
import { InlineChips } from "@/components/ds/InlineChips";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  ApertureIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  StarIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Roll data — monochrome film frames (gradient stands in for the     */
/* scanned negative; tones are all neutral so the page stays calm).   */
/* ------------------------------------------------------------------ */

type Frame = {
  file: string;
  subject: string;
  time: string;
  gradient: string;
  starred: boolean;
  selected?: boolean;
};

const FRAMES: Frame[] = [
  {
    file: "R12-0038.tif",
    subject: "Nishiki arcade, opening hour",
    time: "07:12",
    gradient: "from-neutral-100 via-neutral-200 to-neutral-400",
    starred: false,
  },
  {
    file: "R12-0041.tif",
    subject: "Tofu shop curtain",
    time: "07:24",
    gradient: "from-neutral-200 via-neutral-300 to-neutral-600",
    starred: true,
  },
  {
    file: "R12-0044.tif",
    subject: "Daitoku-ji, north garden",
    time: "07:42",
    gradient: "from-neutral-50 via-neutral-100 to-neutral-500",
    starred: true,
    selected: true,
  },
  {
    file: "R12-0047.tif",
    subject: "Tram window, rain",
    time: "07:58",
    gradient: "from-neutral-200 via-neutral-400 to-neutral-700",
    starred: false,
  },
  {
    file: "R12-0050.tif",
    subject: "Bicycle, Kamo river",
    time: "08:15",
    gradient: "from-neutral-300 via-neutral-400 to-neutral-600",
    starred: false,
  },
  {
    file: "R12-0053.tif",
    subject: "Vendor's hands, persimmons",
    time: "08:31",
    gradient: "from-neutral-100 via-neutral-300 to-neutral-500",
    starred: false,
  },
];

const EXIF: Array<[string, string]> = [
  ["camera", "Leica M6"],
  ["film", "Tri-X 400"],
  ["dev", "HC-110 B"],
  ["lens", "35mm Summicron"],
  ["exposure", "1/250s · f/5.6"],
  ["flash", "none"],
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-code text-[11px] tracking-[0.04em] text-neutral-500">
      {children}
    </span>
  );
}

/* A deterministic "photo" — neutral gradient + soft specular highlight. */
function FramePlate({
  gradient,
  className = "",
  children,
}: {
  gradient: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br shadow-glass-hairline ${gradient} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_18%_8%,rgb(255_255_255/0.26),transparent_55%)]" />
      {children}
    </div>
  );
}

export default function Page() {
  const selected = FRAMES.find((f) => f.selected) ?? FRAMES[0];

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-default-background text-default-font">
        {/* ---------------- top bar ---------------- */}
        <header className="flex h-14 flex-none items-center gap-4 border-b border-default-border px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 shadow-glass-hairline">
              <ApertureIcon className="size-[18px]" />
            </span>
            <div className="leading-tight">
              <p className="font-heading-3 text-[15px] text-default-font">
                Silverhalide
              </p>
              <p className="font-caption text-[11px] text-neutral-500">
                Film scan library · Roll 12 — Kyoto
              </p>
            </div>
          </div>

          <div className="ml-auto w-[420px]">
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="frame-search"
                type="search"
                aria-label="Search frames"
                placeholder="Search frames, subjects, places…"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText className="font-code text-[11px]">
                  ⌘K
                </InputGroupText>
                <InputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Filters"
                >
                  <SlidersHorizontalIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ---------------- gallery ---------------- */}
          <main className="flex min-w-0 flex-1 flex-col overflow-y-auto px-6 py-5">
            <div className="mb-4 flex items-baseline justify-between">
              <h1 className="font-heading-3 text-heading-3 text-default-font">
                Roll 12 — Kyoto, morning
              </h1>
              <nav className="flex items-center gap-4 font-caption text-[13px]">
                <span className="cursor-pointer text-default-font underline decoration-neutral-600 underline-offset-[6px]">
                  All
                </span>
                <span className="cursor-pointer text-neutral-500">Street</span>
                <span className="cursor-pointer text-neutral-500">Garden</span>
                <span className="cursor-pointer text-neutral-500">
                  Still life
                </span>
              </nav>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {FRAMES.map((frame) => (
                <figure key={frame.file} className="min-w-0">
                  <FramePlate
                    gradient={frame.gradient}
                    className={`aspect-[4/3] ${
                      frame.selected
                        ? "ring-2 ring-white/70"
                        : "ring-1 ring-white/10"
                    }`}
                  >
                    {frame.selected ? (
                      <span className="absolute left-2 top-2 rounded-[3px] bg-black/55 px-1.5 py-0.5 font-code text-[10px] uppercase tracking-[0.06em] text-white backdrop-blur-sm">
                        selected
                      </span>
                    ) : null}
                  </FramePlate>
                  <figcaption className="mt-1.5 flex items-baseline justify-between gap-2">
                    <span className="truncate font-code text-[11px] text-neutral-500">
                      {frame.file}
                    </span>
                    {frame.starred ? (
                      <StarIcon className="size-3.5 flex-none fill-current text-neutral-600" />
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-auto pt-4 font-caption text-[12px] text-neutral-500">
              2,304 frames in library · last sync 07:58 · negatives scanned at
              4800 dpi
            </p>
          </main>

          {/* ---------------- metadata inspector ---------------- */}
          <aside className="flex w-[380px] flex-none flex-col gap-3 overflow-y-auto border-l border-default-border bg-panel/60 px-4 py-3">
            {/* selected frame */}
            <div>
              <FramePlate
                gradient={selected.gradient}
                className="h-24 ring-1 ring-white/15"
              >
                {selected.starred ? (
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-[3px] bg-black/55 px-1.5 py-0.5 font-code text-[10px] text-white backdrop-blur-sm">
                    <StarIcon className="size-3 fill-current" />
                    starred
                  </span>
                ) : null}
              </FramePlate>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <span className="font-code text-[13px] font-[600] text-default-font">
                  {selected.file}
                </span>
                <span className="font-caption text-[12px] text-neutral-500">
                  {selected.time} · frame 44/36
                </span>
              </div>
              <p className="font-caption text-[13px] text-neutral-600">
                {selected.subject}
              </p>
            </div>

            {/* auto-generated metadata prose, with inline chips */}
            <section className="flex flex-col gap-1.5">
              <SectionLabel>auto-metadata · run 4471</SectionLabel>
              <p className="text-[14px] leading-[24px] text-neutral-600">
                Captioned via{" "}
                <InlineChips.IntegrationAvatar glyph="L" /> Lightroom from{" "}
                <InlineChips.FileRef kind="json">exif.json</InlineChips.FileRef>
                , graded <InlineChips.CodePill>Tri-X 400 · HC-110 B</InlineChips.CodePill>{" "}
                and logged in{" "}
                <InlineChips.FileRef kind="md" path="roll-12">
                  field-notes.md
                </InlineChips.FileRef>
                .
              </p>
            </section>

            {/* exif strip */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-1.5 border-y border-default-border py-2">
              {EXIF.map(([key, value]) => (
                <div key={key} className="flex min-w-0 flex-col">
                  <span className="font-code text-[10px] uppercase tracking-[0.06em] text-neutral-500">
                    {key}
                  </span>
                  <span className="truncate font-code text-[12px] text-neutral-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* captioning trace */}
            <section className="flex flex-col gap-2">
              <SectionLabel>caption trace · run 4471</SectionLabel>
              <ReasoningLog showMoreLabel="Show 9 earlier steps">
                <ReasoningLog.Beat
                  job="Scan frame & mask dust"
                  thought="14 specks found; two kept as grain."
                />
                <ReasoningLog.Beat
                  job="Match scene to reference plates"
                  thought="Gravel matches Daitoku-ji garden."
                />
                <ReasoningLog.Beat
                  job="Draft caption & keywords"
                  thought="“Morning stillness” + 5 keywords."
                />
              </ReasoningLog>
            </section>

            {/* caption editor */}
            <section className="mt-auto flex flex-col gap-1.5">
              <SectionLabel>refine caption</SectionLabel>
              <InputGroup className="h-auto">
                <InputGroupTextarea
                  id="caption-edit"
                  aria-label="Edit caption"
                  defaultValue="Morning stillness — Daitoku-ji, north garden, 07:42."
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>64/140</InputGroupText>
                  <InputGroupButton
                    variant="default"
                    size="sm"
                    className="ml-auto"
                  >
                    Save
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </section>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
