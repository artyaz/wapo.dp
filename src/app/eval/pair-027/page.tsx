"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Toggle } from "@/components/ui/toggle";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AgentActivity } from "@/components/ds/AgentActivity";
import {
  ArchiveRestoreIcon,
  FileTextIcon,
  HistoryIcon,
  RotateCcwIcon,
  SearchIcon,
  SearchXIcon,
  SparklesIcon,
} from "lucide-react";

/** Reasoning-log line, styled after the ThoughtHeader demo. */
function LogLine({
  state,
  children,
}: {
  state: "done" | "active";
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-2.5">
      <span
        aria-hidden="true"
        className={
          state === "done"
            ? "mt-[7px] h-[5px] w-[5px] flex-none rounded-full bg-neutral-600"
            : "mt-[6px] h-[7px] w-[7px] flex-none animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-neutral-400 motion-reduce:animate-none"
        }
      />
      <p
        className={
          state === "done"
            ? "min-w-0 text-[13px] leading-[20px] text-neutral-400"
            : "min-w-0 text-[13px] leading-[20px] text-neutral-200"
        }
      >
        {children}
      </p>
    </div>
  );
}

/** One recovered draft row: source icon, long wrapping title, meta, restore. */
function DraftRow({
  icon: Icon,
  title,
  source,
  match,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  source: string;
  match: string;
}) {
  return (
    <li className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex size-9 flex-none items-center justify-center rounded-lg border border-border bg-muted/60">
        <Icon className="size-4 text-neutral-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium leading-[18px] text-neutral-200">
          {title}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] leading-4 text-muted-foreground">
          <span>{source}</span>
          <span aria-hidden="true" className="text-neutral-600">
            ·
          </span>
          <span className="text-neutral-400">{match}</span>
        </p>
      </div>
      <button
        type="button"
        aria-label={`Restore ${title}`}
        className="mt-0.5 flex size-9 flex-none items-center justify-center rounded-lg border border-border text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-200"
      >
        <RotateCcwIcon className="size-4" />
      </button>
    </li>
  );
}

function SectionHeading({
  title,
  trailing,
}: {
  title: string;
  trailing: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[13px] font-semibold text-neutral-300">{title}</h3>
      <span className="text-[11px] text-muted-foreground">{trailing}</span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col text-foreground">
        {/* ---- app header ---- */}
        <header className="border-b border-border px-4 pb-4 pt-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Praxis Vault
              </p>
              <h1 className="mt-1 text-[19px] font-semibold leading-tight text-neutral-100">
                Archive search
              </h1>
            </div>
            <div className="flex size-9 flex-none items-center justify-center rounded-full border border-border bg-muted/60">
              <SparklesIcon className="size-4 text-neutral-400" />
            </div>
          </div>
          {/* the query that came up empty — long, so truncation is visible */}
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
            <SearchIcon className="size-3.5 flex-none text-muted-foreground" />
            <span className="min-w-0 truncate text-[12.5px] text-neutral-300">
              vendor contract redline v4 — negotiation copy for the Acme renewal
            </span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-5">
          {/* ---- empty state ---- */}
          <section className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 flex-none items-center justify-center rounded-full border border-border bg-muted">
                <SearchXIcon className="size-5 text-neutral-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold leading-5 text-neutral-100">
                  No documents match this search
                </h2>
                <p className="mt-1.5 text-[13px] leading-[19px] text-neutral-400">
                  We searched every connected archive — Personal, Legal Ops, the
                  Acme Corp shared drive and the retired 2022 backup vault — but
                  the exact phrase returned nothing. The recovery assistant is
                  widening the net to surface near-matches, older drafts and
                  unsaved copies.
                </p>
              </div>
            </div>
          </section>

          {/* ---- agent trace (ThoughtHeader × 2) ---- */}
          <section className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="mb-3">
              <SectionHeading
                title="Recovery assistant"
                trailing="2m 52s total"
              />
            </div>
            <AgentActivity label="Searched 4 archives for 2m 14s" defaultOpen>
              <div className="flex flex-col gap-2.5">
                <LogLine state="done">
                  Scanned 1,284 documents for the exact phrase — 0 matches in
                  Personal, Legal Ops or the Acme shared drive
                </LogLine>
                <LogLine state="done">
                  Relaxed the query to token-level matching and re-scanned
                  Trash, version history and unsaved auto-backups
                </LogLine>
                <LogLine state="active">
                  Recovering partially-matching drafts — 24 found so far,
                  showing the 3 closest below
                </LogLine>
              </div>
            </AgentActivity>
            <div className="mt-4">
              <AgentActivity label="Recovery sweep of Trash &amp; version history · 38s" />
            </div>
          </section>

          {/* ---- recovery filters (Toggle) ---- */}
          <section>
            <SectionHeading title="Widen the recovery net" trailing="2 active" />
            <div className="mt-3 flex flex-wrap gap-2">
              <Toggle
                size="lg"
                variant="outline"
                defaultPressed
                aria-label="Include archived drafts"
              >
                Include archived drafts
              </Toggle>
              <Toggle
                size="lg"
                variant="outline"
                defaultPressed
                aria-label="Fuzzy match"
              >
                Fuzzy match
              </Toggle>
              <Toggle size="lg" aria-label="Search shared workspaces">
                Shared workspaces
              </Toggle>
              <Toggle size="lg" aria-label="Scan attachments">
                Scan attachments
              </Toggle>
              <Toggle
                size="lg"
                variant="outline"
                disabled
                aria-label="Deep vault scan, currently offline"
              >
                Deep vault scan · offline
              </Toggle>
            </div>
          </section>

          {/* ---- recovered results + pagination ---- */}
          <section>
            <SectionHeading title="Recovered drafts" trailing="1–3 of 24" />
            <ul className="mt-1 divide-y divide-border border-b border-border">
              <DraftRow
                icon={FileTextIcon}
                title="Vendor Agreement — Acme Corp (redline v3, legal markup).docx"
                source="Trash · deleted 6 days ago"
                match="84% match"
              />
              <DraftRow
                icon={HistoryIcon}
                title="MSA Q3 2024 — vendor contract negotiation notes (working draft)"
                source="Version history · 3 versions"
                match="78% match"
              />
              <DraftRow
                icon={ArchiveRestoreIcon}
                title="Contract-Redline_v4_FINAL — unsaved editor copy"
                source="Auto-backup · yesterday 23:41"
                match="71% match"
              />
            </ul>

            <div className="mt-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      aria-disabled="true"
                      className="pointer-events-none opacity-50"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">8</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Page 1 of 8 · drafts restore to their original folders
              </p>
            </div>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
