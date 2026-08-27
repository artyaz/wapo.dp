"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Typography } from "@/components/ui/typography";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { InlineChips } from "@/components/ds/InlineChips";
import {
  CommandIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data — top matches for the query `useGlass()`                       */
/* ------------------------------------------------------------------ */

type Match = {
  name: string;
  kind: "tsx" | "json" | "md";
  path: string;
  hits: number;
};

const MATCHES: Match[] = [
  { name: "GlassChip.tsx", kind: "tsx", path: "src/components/ds", hits: 12 },
  { name: "tokens.json", kind: "json", path: "src/styles", hits: 6 },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-code text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-default-background px-3.5 pb-2.5 pt-3 text-default-font">
        {/* ── sheet header ─────────────────────────────────────────── */}
        <header className="flex h-6 flex-none items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md border border-default-border bg-white">
            <CommandIcon className="size-3.5 text-neutral-500" />
          </span>
          <h1 className="font-heading-3 text-[15px] leading-none">
            Search &amp; filter
          </h1>
          <span className="ml-auto font-code text-[11px] text-neutral-500">
            18 matches
          </span>
        </header>

        {/* ── query field ──────────────────────────────────────────── */}
        <div className="mt-2.5 flex h-10 flex-none items-center gap-2 rounded-lg border border-default-border bg-white px-3">
          <SearchIcon className="size-4 flex-none text-neutral-400" />
          <input
            type="search"
            aria-label="Search code"
            placeholder="Search code, files, symbols…"
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-default-font outline-none placeholder:text-neutral-400"
          />
          <span className="flex-none rounded border border-default-border px-1 py-px font-code text-[10px] text-neutral-500">
            ⌘K
          </span>
        </div>

        {/* ── filter toolbar (ui:menubar) ──────────────────────────── */}
        <Menubar className="mt-2 w-full flex-none">
          <MenubarMenu>
            <MenubarTrigger>
              <SlidersHorizontalIcon className="size-3.5" />
              Filters
            </MenubarTrigger>
            <MenubarContent className="w-56">
              <MenubarCheckboxItem checked>
                Case sensitive
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Whole word</MenubarCheckboxItem>
              <MenubarCheckboxItem>Include forks</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Clear all <MenubarShortcut>⌘⇧K</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Scope</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="open-prs">
                <MenubarRadioItem value="all">All code</MenubarRadioItem>
                <MenubarRadioItem value="open-prs">
                  Open pull requests
                </MenubarRadioItem>
                <MenubarRadioItem value="mine">My repositories</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Sort</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Best match <MenubarShortcut>⌘1</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Recently updated <MenubarShortcut>⌘2</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Most reactions <MenubarShortcut>⌘3</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Saved</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>useGlass references</MenubarItem>
              <MenubarItem>TODOs in ds/</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Save current search…</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* ── active filter tokens (ds:InlineChips) ────────────────── */}
        <div className="mt-2 flex min-h-6 flex-none items-center gap-1">
          <SectionLabel>active</SectionLabel>
          <InlineChips.CodePill>is:open</InlineChips.CodePill>
          <InlineChips.CodePill>lang:ts</InlineChips.CodePill>
          <InlineChips.CodePill>-path:*.snap</InlineChips.CodePill>
          <button
            type="button"
            className="ml-auto flex-none text-[12px] text-neutral-500 underline decoration-neutral-300 underline-offset-2"
          >
            Clear all
          </button>
        </div>

        {/* ── search summary (ui:typography + inline chips) ────────── */}
        <section className="mt-3 flex-none">
          <SectionLabel>search summary · run 4471</SectionLabel>
          <Typography variant="compact" className="mt-1.5">
            <p>
              Scanned <strong>12 files</strong> through{" "}
              <InlineChips.IntegrationAvatar glyph="S" /> Superblocks — 18 hits
              for <InlineChips.CodePill>useGlass()</InlineChips.CodePill>, the
              newest in{" "}
              <InlineChips.FileRef kind="tsx" path="src/components/ds">
                GlassChip.tsx
              </InlineChips.FileRef>
              .
            </p>
            <p className="text-neutral-500">
              Indexed 2 min ago · 4 binary files skipped.
            </p>
          </Typography>
        </section>

        {/* ── top matches ──────────────────────────────────────────── */}
        <section className="mt-auto flex-none border-t border-default-border pt-2.5">
          <SectionLabel>top matches</SectionLabel>
          <ul className="mt-1">
            {MATCHES.map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-2 border-b border-default-border py-1.5 last:border-b-0"
              >
                <InlineChips.FileRef kind={m.kind} path={m.path}>
                  {m.name}
                </InlineChips.FileRef>
                <span className="ml-auto flex-none font-code text-[11px] text-neutral-500">
                  {m.hits} hits
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── sheet footer ─────────────────────────────────────────── */}
        <footer className="mt-2 flex flex-none items-center justify-between font-code text-[10px] text-neutral-500">
          <span>↑↓ navigate · ↵ open file · esc dismiss</span>
          <span>⌘⇧F advanced</span>
        </footer>
      </div>
    </EvalShell>
  );
}
