"use client";

/**
 * pair-088 — "Pallas" document editor (dark, 1440×900, ltr, no-scroll).
 *
 * Scenario: a document editor header bar. The header is the hero — the top
 * bar carries the document crumb (IntegrationAvatar + FileRef + Draft badge)
 * and the contextual toolbar row centers the page navigator (ui:pagination)
 * for the paginated spec. The main area shows the current document page and
 * a live activity rail whose prose weaves in the InlineChips atoms; the
 * JumpToLatest FAB floats over the faded tail of the feed ("3 new events"
 * below the fold). A slim status bar closes the editor chrome.
 */

import React from "react";
import {
  Bold,
  History,
  Italic,
  Link2,
  List,
  ListOrdered,
  ListTree,
  MessageSquare,
  Share2,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { JumpToLatest } from "@/components/ds/JumpToLatest";
import { InlineChips } from "@/components/ds/InlineChips";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Activity feed (oldest → newest; the newest events sit below the fold, which
// is exactly what the JumpToLatest FAB jumps to)
// ---------------------------------------------------------------------------

type ActivityRow = {
  at: string;
  body: React.ReactNode;
};

const ACTIVITY: ActivityRow[] = [
  {
    at: "09:12",
    body: <>Mara Osei opened the draft for review.</>,
  },
  {
    at: "09:18",
    body: (
      <>Jonas Park renamed the section to “Rollout plan” and tightened the intro copy.</>
    ),
  },
  {
    at: "09:24",
    body: (
      <>
        <InlineChips.IntegrationAvatar glyph="S" /> Copilot linked{" "}
        <InlineChips.FileRef kind="json">design-tokens.json</InlineChips.FileRef> and
        verified types with <InlineChips.CodePill>bunx tsc --noEmit</InlineChips.CodePill>.
      </>
    ),
  },
  {
    at: "09:31",
    body: (
      <>
        Mara attached{" "}
        <InlineChips.FileRef kind="tsx" path="src/components/ds">
          GlassChip.tsx
        </InlineChips.FileRef>{" "}
        as the reference surface for the new panels.
      </>
    ),
  },
  {
    at: "09:38",
    body: (
      <>
        Copilot ran{" "}
        <InlineChips.CodePill>bunx eslint docs --max-warnings 0</InlineChips.CodePill> — no
        warnings.
      </>
    ),
  },
  {
    at: "09:44",
    body: (
      <>Jonas commented: “Ship the Pallas copy before Thursday’s partner review.”</>
    ),
  },
  {
    at: "09:49",
    body: <>Mara suggested an edit in Highlights — second paragraph, tone.</>,
  },
  {
    at: "09:53",
    body: (
      <>
        Copilot published the component set as{" "}
        <InlineChips.CodePill>@praxis/ai-elements</InlineChips.CodePill>.
      </>
    ),
  },
  {
    at: "09:57",
    body: (
      <>
        Jonas linked{" "}
        <InlineChips.FileRef kind="css">editor.css</InlineChips.FileRef> to the rollout
        checklist.
      </>
    ),
  },
  {
    at: "09:58",
    body: <>Autosave checkpoint created · v0.9.2.</>,
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* ── Header bar — tier 1: document identity ─────────────────────── */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-6 border-b border-border bg-card/40 px-6">
          <div className="flex min-w-0 items-center gap-3">
            <InlineChips.IntegrationAvatar glyph="P" size={28} />
            <InlineChips.FileRef kind="md" path="docs/release">
              release-notes.md
            </InlineChips.FileRef>
            <Badge variant="outline" className="text-[11px] font-normal text-muted-foreground">
              Draft
            </Badge>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-xs text-muted-foreground">Autosaved · just now</span>
            <Button variant="ghost" size="icon-sm" aria-label="Version history">
              <History />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 />
              Share
            </Button>
          </div>
        </header>

        {/* ── Header bar — tier 2: contextual toolbar with page navigator ── */}
        <div className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border px-6">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Bold">
              <Bold />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Italic">
              <Italic />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Bulleted list">
              <List />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Numbered list">
              <ListOrdered />
            </Button>
            <span className="mx-2 h-5 w-px bg-border" aria-hidden />
            <Button variant="ghost" size="icon-sm" aria-label="Insert link">
              <Link2 />
            </Button>
          </div>

          <Pagination className="mx-0 w-auto" aria-label="Document pages">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">6</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Outline">
              <ListTree />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Comments">
              <MessageSquare />
            </Button>
          </div>
        </div>

        {/* ── Main: document canvas + activity rail ──────────────────────── */}
        <main className="flex min-h-0 flex-1">
          {/* Document canvas — the current page of the paginated spec */}
          <section className="relative min-w-0 flex-1 overflow-hidden">
            <div className="mx-auto my-8 flex h-[calc(100%-64px)] w-[680px] max-w-full flex-col overflow-hidden rounded-xl border border-border bg-card p-10 shadow-2xl shadow-black/40">
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Pallas — Release Notes
                </h1>
                <span className="font-mono text-[11px] text-muted-foreground">v2.4.0</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Draft · updated 3 min ago · owners @mara · @jonas
              </p>

              <div className="my-6 h-px bg-border" />

              <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Highlights
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/85">
                Pallas 2.4 focuses on the document canvas: a calmer typographic
                scale, a softer glass surface for panels, and a paginated editor
                that keeps long specifications readable. Pages break on section
                boundaries so tables and code blocks never split across a fold.
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/85">
                The header bar now carries the page navigator, so moving between
                sections no longer means scrolling to the end of the document —
                reviewers jump straight to the section they own.
              </p>

              <h2 className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Rollout plan
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/85">
                We ship 2.4 behind the docs-v2 flag to the Praxis workspace
                first, then widen to early-access partners over the following
                week. The flag retires once the embedded-attachment migration
                lands.
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {[
                  ["Feb 12", "Praxis workspace (this document) at 100%"],
                  ["Feb 15", "Early-access partners, 25% of traffic"],
                  ["Feb 19", "General availability · docs-v2 flag retired"],
                ].map(([date, text]) => (
                  <li key={date} className="flex items-baseline gap-3 text-sm leading-6">
                    <span className="w-12 shrink-0 font-mono text-[11px] text-muted-foreground">
                      {date}
                    </span>
                    <span className="text-foreground/80">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Activity rail — live feed, newest events below the fold */}
          <aside className="relative flex w-[340px] shrink-0 flex-col border-l border-border">
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-5">
              <h2 className="text-sm font-semibold tracking-tight">Activity</h2>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden px-5 py-4">
              <ol className="flex flex-col gap-4">
                {ACTIVITY.map((row) => (
                  <li key={row.at} className="flex gap-3">
                    <span className="w-9 shrink-0 pt-0.5 font-mono text-[11px] leading-6 text-muted-foreground/80">
                      {row.at}
                    </span>
                    <p className="min-w-0 text-[13px] leading-6 text-foreground/80">
                      {row.body}
                    </p>
                  </li>
                ))}
              </ol>

              {/* fade + floating jump control over the older part of the feed */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/85 to-transparent" />
              <div className="absolute right-4 bottom-4 flex items-center gap-2.5">
                <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-lg shadow-black/30">
                  3 new events
                </span>
                <JumpToLatest label="Jump to latest activity" />
              </div>
            </div>
          </aside>
        </main>

        {/* ── Status bar ─────────────────────────────────────────────────── */}
        <footer className="flex h-9 shrink-0 items-center justify-between border-t border-border bg-card/30 px-6 text-[11px] text-muted-foreground">
          <span>Page 5 of 12 · 2,481 words · All changes saved</span>
          <span>Markdown · UTF-8 · LF · Praxis workspace</span>
        </footer>
      </div>
    </EvalShell>
  );
}
