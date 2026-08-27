"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { FileTreeRow } from "@/components/ds/FileTreeRow";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Captions,
  FolderTree,
  MessageSquareText,
  SlidersHorizontal,
} from "lucide-react";

const cues = [
  {
    t: "00:46:31",
    initials: "PN",
    speaker: "Priya N.",
    role: "Host",
    text: "Good evening, and welcome to the Q3 product deep-dive. I'm Priya, and tonight we're unpacking everything that shipped this quarter.",
  },
  {
    t: "00:46:48",
    initials: "MT",
    speaker: "Marcus T.",
    role: "Product",
    text: "Thanks, Priya. Quick agenda: three releases, one retirement, and a live demo of the new transcript editor.",
  },
  {
    t: "00:47:12",
    initials: "MT",
    speaker: "Marcus T.",
    role: "Product",
    text: "The headline is the editor itself — it now follows the active speaker and suggests punctuation while you type.",
  },
  {
    t: "00:47:35",
    initials: "DK",
    speaker: "Dana K.",
    role: "Engineering",
    text: "One thing to flag: the German track is machine-translated, so expect a short delay while segments sync up.",
  },
  {
    t: "00:47:58",
    initials: "PN",
    speaker: "Priya N.",
    role: "Host",
    text: "Perfect. Let's start with the release timeline, Marcus — over to you.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-border bg-card px-4">
          <div className="flex size-8 flex-none items-center justify-center rounded-md bg-foreground text-background">
            <Captions className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-semibold leading-none">
              Caption Desk
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              Acme Q3 Product Deep-Dive · Studio B
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-destructive">
              <span className="size-1.5 rounded-full bg-destructive" />
              Live
            </span>
            <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              EN native · DE auto
            </span>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">
              00:47:12
            </span>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ── Left: session files (FileTreeRow) ─────────────────── */}
          <aside className="flex w-[264px] flex-none flex-col border-r border-border bg-card">
            <div className="flex h-10 flex-none items-center gap-2 border-b border-border px-3">
              <FolderTree className="size-3.5 text-muted-foreground" />
              <SectionHeading>Session files</SectionHeading>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
                <FileTreeRow name="assets" nodeType="folder" depth="0" expanded />
                <FileTreeRow name="captions" nodeType="folder" depth="1" expanded />
                <FileTreeRow
                  name="live-en.vtt"
                  nodeType="yml"
                  depth="2"
                  selected
                  dirty
                />
                <FileTreeRow name="live-de.vtt" nodeType="yml" depth="2" />
                <FileTreeRow name="live-fr.vtt" nodeType="yml" depth="2" disabled />
                <FileTreeRow
                  name="glossary.md"
                  nodeType="md"
                  depth="2"
                  gitStatus="modified"
                />
                <FileTreeRow name="exports" nodeType="folder" depth="1" expanded />
                <FileTreeRow name="q2-replay.vtt" nodeType="yml" depth="2" />
                <FileTreeRow name="transcript-final.md" nodeType="md" depth="2" />
                <FileTreeRow name="translate" nodeType="folder" depth="1" />
                <FileTreeRow
                  name="speakers.json"
                  nodeType="json"
                  depth="1"
                  gitStatus="added"
                />
                <FileTreeRow name="stream-notes.md" nodeType="md" depth="0" />
              </div>
            </div>
            <div className="flex-none border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
              Synced 2s ago · v42
            </div>
          </aside>

          {/* ── Center: live transcript feed ──────────────────────── */}
          <main className="flex min-w-0 flex-1 flex-col bg-background">
            <div className="flex h-12 flex-none items-center gap-2 border-b border-border px-5">
              <MessageSquareText className="size-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Live transcript</h1>
              <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                English · auto
              </span>
              <span className="ml-auto text-[11px] text-muted-foreground">
                Auto-scroll on
              </span>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-mono tabular-nums">00:46:00</span>
                  <span className="h-px flex-1 bg-border" />
                  <span>Captions enabled · English (auto-generated)</span>
                </div>

                {cues.map((cue) => (
                  <article
                    key={cue.t}
                    className="flex gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    <time className="w-[64px] flex-none pt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                      {cue.t}
                    </time>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                          {cue.initials}
                        </span>
                        <span className="text-sm font-medium leading-none">
                          {cue.speaker}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {cue.role}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{cue.text}</p>
                    </div>
                  </article>
                ))}

                {/* Interim (unfinalised) line being typed live */}
                <article className="flex gap-4 rounded-lg border border-dashed border-border bg-card/50 p-4">
                  <time className="w-[64px] flex-none pt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                    00:48:04
                  </time>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                        MT
                      </span>
                      <span className="text-sm font-medium leading-none">
                        Marcus T.
                      </span>
                      <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                        Interim
                      </span>
                    </div>
                    <p className="text-sm italic leading-relaxed text-muted-foreground">
                      Right — so, if we look at the quarter as a whole, three
                      releases went out and the editor rewrite landed ahead of
                      sche
                      <span className="animate-pulse">▍</span>
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </main>

          {/* ── Right: caption settings (Field + Label) ───────────── */}
          <aside className="flex w-[320px] flex-none flex-col border-l border-border bg-card">
            <div className="flex h-10 flex-none items-center gap-2 border-b border-border px-4">
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
              <SectionHeading>Caption settings</SectionHeading>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-5 p-4">
                {/* Output */}
                <section className="flex flex-col gap-3">
                  <SectionHeading>Output</SectionHeading>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="cap-track">Caption track</FieldLabel>
                      <Input id="cap-track" defaultValue="live-en.vtt" />
                      <FieldDescription>
                        Rewritten to assets/captions as WebVTT every 15
                        seconds.
                      </FieldDescription>
                    </Field>
                    <Field invalid>
                      <FieldLabel htmlFor="cap-line-length">
                        Max line length
                      </FieldLabel>
                      <Input
                        id="cap-line-length"
                        defaultValue="52"
                        aria-invalid
                      />
                      <FieldError>
                        Exceeds the 42-character broadcast-safe limit.
                      </FieldError>
                    </Field>
                  </FieldGroup>
                </section>

                {/* Feed */}
                <section className="flex flex-col gap-3">
                  <SectionHeading>Feed</SectionHeading>
                  <FieldGroup>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="feed-autoscroll" defaultChecked />
                      <Label htmlFor="feed-autoscroll" className="font-normal">
                        Auto-scroll to the live line
                      </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="feed-interim" defaultChecked />
                      <Label htmlFor="feed-interim" className="font-normal">
                        Show interim (unfinalised) lines
                      </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="feed-timestamps" defaultChecked />
                      <Label htmlFor="feed-timestamps" className="font-normal">
                        Timestamps
                      </Label>
                    </Field>
                  </FieldGroup>
                </section>

                {/* Speakers */}
                <section className="flex flex-col gap-3">
                  <SectionHeading>Speakers in feed</SectionHeading>
                  <FieldGroup>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="sp-priya" defaultChecked />
                      <Label htmlFor="sp-priya" className="font-normal">
                        Priya N. — Host
                      </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="sp-marcus" defaultChecked />
                      <Label htmlFor="sp-marcus" className="font-normal">
                        Marcus T. — Product
                      </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="sp-dana" defaultChecked />
                      <Label htmlFor="sp-dana" className="font-normal">
                        Dana K. — Engineering
                      </Label>
                    </Field>
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox id="sp-audience" />
                      <Label htmlFor="sp-audience" className="font-normal">
                        Audience questions
                      </Label>
                    </Field>
                  </FieldGroup>
                </section>
              </div>
            </div>

            <div className="flex flex-none items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>1,284 words</span>
              <span>2 active tracks</span>
              <span className="font-mono tabular-nums">00:47:12</span>
            </div>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
