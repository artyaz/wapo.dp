"use client";

import React from "react";
import {
  ApertureIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileWarningIcon,
  LayersIcon,
  RefreshCwIcon,
  Redo2Icon,
  RocketIcon,
  RotateCcwIcon,
  SaveIcon,
  Undo2Icon,
  UploadIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";

const shots = {
  hero: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  desk: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  office: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
};

const img = (id: string, w: number) =>
  `${id}?w=${w}&auto=format&fit=crop&q=80`;

const exportFormats = [
  {
    name: "Story",
    ratio: "9 : 16",
    r: 9 / 16,
    width: "w-[54px]",
    src: img(shots.desk, 400),
    alt: "Story crop preview",
  },
  {
    name: "Feed",
    ratio: "1 : 1",
    r: 1 / 1,
    width: "w-24",
    src: img(shots.hero, 400),
    alt: "Feed crop preview",
  },
  {
    name: "Wide",
    ratio: "3 : 2",
    r: 3 / 2,
    width: "w-36",
    src: img(shots.office, 400),
    alt: "Wide crop preview",
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* ---------- Top bar ---------- */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
              <ApertureIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Atlas Studio
            </span>
            <span className="text-muted-foreground/50">/</span>
            <span className="truncate text-sm text-muted-foreground">
              Aurora Headphones — Launch
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <ButtonGroup aria-label="Workspace mode">
              <Button variant="secondary" size="sm">
                Preview
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                Assets
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                Publish
              </Button>
            </ButtonGroup>

            <ButtonGroup aria-label="Edit history">
              <Button variant="outline" size="icon-sm" aria-label="Undo">
                <Undo2Icon />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Redo"
                disabled
              >
                <Redo2Icon />
              </Button>
              <ButtonGroupSeparator />
              <Button variant="outline" size="icon-sm" aria-label="Reset layout">
                <RotateCcwIcon />
              </Button>
            </ButtonGroup>
          </div>
        </header>

        {/* ---------- Body ---------- */}
        <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_360px] p-6">
          {/* Preview canvas */}
          <section className="flex min-w-0 flex-col pe-8">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Launch teaser — hero preview
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Rendered from aurora-hero.png
              </p>
            </div>

            <div className="mt-5 flex w-full max-w-[740px] flex-col gap-3">
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl border border-border bg-muted shadow-xs"
              >
                <img
                  src={img(shots.hero, 1600)}
                  alt="Aurora headphones on a dark studio desk"
                  className="size-full object-cover grayscale dark:brightness-90"
                />
              </AspectRatio>

              <div className="flex items-center justify-between gap-4">
                <p className="truncate text-xs text-muted-foreground">
                  aurora-hero.png · 1920 × 1080 · 16 : 9
                </p>
                <ButtonGroup aria-label="Preview zoom">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Zoom out"
                  >
                    <ZoomOutIcon />
                  </Button>
                  <ButtonGroupText>100%</ButtonGroupText>
                  <Button variant="outline" size="icon-sm" aria-label="Zoom in">
                    <ZoomInIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <LayersIcon className="size-3.5" />
                Export formats
              </div>
              <div className="mt-3 flex items-start gap-5">
                {exportFormats.map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <div className={f.width}>
                      <AspectRatio
                        ratio={f.r}
                        className="overflow-hidden rounded-lg border border-border bg-muted"
                      >
                        <img
                          src={f.src}
                          alt={f.alt}
                          className="size-full object-cover grayscale dark:brightness-90"
                        />
                      </AspectRatio>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {f.name}
                      </span>{" "}
                      · {f.ratio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Source files rail */}
          <aside className="flex min-w-0 flex-col rounded-xl border border-border bg-card/40 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Source files</h2>
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                5 files
              </span>
            </div>

            <AttachmentGroup className="mt-4">
              {/* Hero source — uploaded, opens the raw file */}
              <Attachment state="done" orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src={img(shots.hero, 800)}
                    alt="Aurora headphones hero source"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>aurora-hero.png</AttachmentTitle>
                  <AttachmentDescription>
                    PNG · 2.4 MB · Uploaded
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Remove aurora-hero.png">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
                <AttachmentTrigger
                  render={
                    <a
                      href={img(shots.hero, 1600)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open aurora-hero.png"
                    />
                  }
                />
              </Attachment>

              {/* Still uploading */}
              <Attachment state="uploading">
                <AttachmentMedia>
                  <Spinner />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>studio-desk.jpg</AttachmentTitle>
                  <AttachmentDescription>
                    Uploading · 64%
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Cancel upload of studio-desk.jpg">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>

              {/* Processing */}
              <Attachment state="processing">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>copy-notes.pdf</AttachmentTitle>
                  <AttachmentDescription>
                    Processing · extracting copy
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Remove copy-notes.pdf">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>

              {/* Failed */}
              <Attachment state="error">
                <AttachmentMedia>
                  <FileWarningIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>voiceover-take3.mp3</AttachmentTitle>
                  <AttachmentDescription>
                    Failed · exceeds 25 MB
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Retry upload of voiceover-take3.mp3">
                    <RefreshCwIcon />
                  </AttachmentAction>
                  <AttachmentAction aria-label="Remove voiceover-take3.mp3">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>

              {/* Uploaded spreadsheet */}
              <Attachment state="done">
                <AttachmentMedia>
                  <FileSpreadsheetIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>budget-q3.xlsx</AttachmentTitle>
                  <AttachmentDescription>
                    XLSX · 88 KB · Uploaded
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Remove budget-q3.xlsx">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </AttachmentGroup>

            <AttachmentTrigger className="mt-3">
              <UploadIcon />
              Add files or drop them here
            </AttachmentTrigger>

            <div className="mt-auto pt-5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Campaign storage</span>
                <span>6.2 / 50 MB</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[12%] rounded-full bg-muted-foreground/70" />
              </div>
            </div>
          </aside>
        </main>

        {/* ---------- Action bar ---------- */}
        <footer className="flex h-16 shrink-0 items-center justify-between border-t border-border px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[var(--ds-color-success-500)]" />
            Draft · autosaved 2 min ago
          </div>
          <div className="flex items-center gap-3">
            <ButtonGroup aria-label="Draft actions">
              <Button variant="outline" size="sm">
                <SaveIcon />
                Save draft
              </Button>
              <ButtonGroupSeparator />
              <Button variant="outline" size="sm">
                <DownloadIcon />
                Export
              </Button>
            </ButtonGroup>
            <Button size="sm">
              <RocketIcon />
              Publish campaign
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
