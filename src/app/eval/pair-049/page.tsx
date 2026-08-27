"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { WaveformStrip } from "@/components/ds/WaveformStrip";
import { DiffRow } from "@/components/ds/DiffRow";
import { CodePane } from "@/components/ds/CodePane";
import {
  AudioLinesIcon,
  CodeXmlIcon,
  FileDiffIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

const FILTERS = [
  { id: "all", label: "All", count: 12, active: true },
  { id: "audio", label: "Audio", count: 3, active: false },
  { id: "diffs", label: "Diffs", count: 5, active: false },
  { id: "code", label: "Code", count: 4, active: false },
];

const CHANNELS = ["L", "R"] as const;
const TICKS = ["00:00", "00:12", "00:24", "00:36", "00:48"];

function ResultLabel({
  icon,
  kind,
  meta,
}: {
  icon: React.ReactNode;
  kind: string;
  meta: string;
}) {
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-neutral-500">
        {icon}
        <span className="font-code text-[10px] uppercase tracking-[0.08em]">
          {kind}
        </span>
      </span>
      <span className="truncate font-code text-[10px] text-neutral-400">
        {meta}
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col gap-3 px-4 pb-5 pt-4">
        {/* Toolbar header */}
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="text-sm font-semibold tracking-tight">
              Workspace search
            </h1>
            <p className="text-xs text-muted-foreground">
              12 matches in project · voice-ledger
            </p>
          </div>
          <button
            type="button"
            aria-label="Filters"
            className="flex h-7 w-7 flex-none items-center justify-center rounded-md border border-solid border-default-border text-neutral-500"
          >
            <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          </button>
        </header>

        {/* Search & filter toolbar */}
        <div className="flex h-9 items-center gap-2 rounded-lg border border-solid border-default-border bg-panel px-3">
          <SearchIcon className="h-3.5 w-3.5 flex-none text-neutral-400" />
          <span className="font-code text-xs text-default-font">ledger</span>
          <span className="ml-auto font-code text-[10px] text-neutral-400">
            ⌘K
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {FILTERS.map((filter) => (
            <span
              key={filter.id}
              className={
                "flex flex-none items-center gap-1 rounded-full border px-2.5 py-1 font-code text-[10px] " +
                (filter.active
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-default-border bg-panel text-neutral-500")
              }
            >
              {filter.label}
              <span className={filter.active ? "text-neutral-300" : ""}>
                {filter.count}
              </span>
            </span>
          ))}
        </div>

        {/* Result 1 — audio transcript match */}
        <section>
          <ResultLabel
            icon={<AudioLinesIcon className="h-3.5 w-3.5" />}
            kind="Audio match"
            meta="take-03 · ledger-prompt.wav"
          />
          <div className="rounded-lg border border-solid border-default-border bg-panel p-3">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-code text-[10px] text-neutral-500">
                transcript · 00:12–00:19
              </span>
              <span className="font-code text-[10px] text-neutral-400">
                00:48.000
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {CHANNELS.map((channel) => (
                <div key={channel} className="flex items-center gap-2">
                  <span className="w-3 flex-none font-code text-[10px] text-neutral-400">
                    {channel}
                  </span>
                  <div className="h-10 grow">
                    <WaveformStrip />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 ml-5 flex justify-between border-t border-solid border-default-border pt-1.5">
              {TICKS.map((tick) => (
                <span
                  key={tick}
                  className="font-code text-[10px] text-neutral-400"
                >
                  {tick}
                </span>
              ))}
            </div>
            <p className="mt-2 font-code text-[11px] leading-relaxed text-neutral-500">
              “…create a new{" "}
              <mark className="bg-neutral-200 text-neutral-900">ledger</mark>{" "}
              entry with the given input…”
            </p>
          </div>
        </section>

        {/* Result 2 — source diff match */}
        <section>
          <ResultLabel
            icon={<FileDiffIcon className="h-3.5 w-3.5" />}
            kind="Diff match"
            meta="src/services/retention.ts"
          />
          <DiffRow>
            <DiffRow.DiffLine
              lineType="hunk-header"
              code="@@ -41,3 +41,3 @@ export function shouldArchive"
            />
            <DiffRow.DiffLine
              lineType="context"
              oldNumber="41"
              newNumber="41"
              code="const RETENTION_DAYS = 90;"
            />
            <DiffRow.DiffLine
              lineType="context"
              oldNumber="42"
              newNumber="42"
              code="export function shouldArchive(record: LedgerRecord) {"
            />
            <DiffRow.DiffLine
              lineType="removed"
              oldNumber="43"
              code={
                <span className="pl-4">
                  return record.age &gt; RETENTION_DAYS;
                </span>
              }
            />
            <DiffRow.DiffLine
              lineType="added"
              newNumber="43"
              code={
                <span className="pl-4">
                  return record.age &gt;= RETENTION_DAYS || record.status ===
                  "settled";
                </span>
              }
            />
            <DiffRow.DiffLine
              lineType="context"
              oldNumber="44"
              newNumber="44"
              code="}"
            />
          </DiffRow>
        </section>

        {/* Result 3 — code definition match */}
        <section>
          <ResultLabel
            icon={<CodeXmlIcon className="h-3.5 w-3.5" />}
            kind="Code match"
            meta="src/services/ledger.ts · 1 of 4"
          />
          <CodePane>
            <CodePane.CodeLine lineNumber="1">
              {'import { validateEntry } from "./validate";'}
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="2">
              {'import type { LedgerEntry } from "./types";'}
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="3" />
            <CodePane.CodeLine lineNumber="4" currentLine={true}>
              export async function createLedgerEntry(
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="5">
              <span className="pl-4">input: CreateEntryInput</span>
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="6">
              {'): Promise<LedgerEntry> {'}
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="7">
              <span className="pl-4">validateEntry(input);</span>
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="8">
              <span className="pl-4">await wal.append(entry);</span>
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="9">
              <span className="pl-4">return entry;</span>
            </CodePane.CodeLine>
            <CodePane.CodeLine lineNumber="10">{'}'}</CodePane.CodeLine>
          </CodePane>
        </section>

        <footer className="mt-auto flex items-center justify-between border-t border-solid border-default-border pt-2">
          <span className="font-code text-[10px] text-neutral-400">
            showing top 3 of 12
          </span>
          <span className="font-code text-[10px] text-neutral-400">0.04 s</span>
        </footer>
      </div>
    </EvalShell>
  );
}
