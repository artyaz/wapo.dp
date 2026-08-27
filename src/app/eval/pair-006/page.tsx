"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { DefaultPageLayout } from "@/components/ds/DefaultPageLayout";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
  SearchXIcon,
} from "lucide-react";

/**
 * pair-006 — Session archive search on a portrait tablet (768×1024, light, ltr).
 *
 * Scenario: the user has searched the workspace session archive for
 * "transcript export" and narrowed it with a #vega-migration tag filter.
 * Nothing matches, so the page shows an empty result state with recovery
 * actions. DefaultPageLayout provides the page scaffold (header band,
 * scrolling white body, footer band); InputGroup drives the search + tag
 * filters; Empty renders the no-results state.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <DefaultPageLayout>
        <header className="flex w-full shrink-0 flex-col gap-1 border-b border-solid border-default-border px-6 py-4">
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            Workspace / Sessions
          </span>
          <span className="text-heading-3 font-heading-3 text-default-font">
            Session archive
          </span>
        </header>

        <div className="flex w-full flex-1 flex-col gap-4 px-6 py-5">
          <div className="flex w-full flex-col gap-3">
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                defaultValue="transcript export"
                aria-label="Search sessions"
                placeholder="Search sessions…"
              />
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>tag:</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                defaultValue="vega-migration"
                aria-label="Filter by tag"
                placeholder="Filter by tag…"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Reset tag filter"
                  title="Reset tag filter"
                >
                  <RotateCcwIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Empty className="min-h-[420px] border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchXIcon />
              </EmptyMedia>
              <EmptyTitle>No matching sessions</EmptyTitle>
              <EmptyDescription>
                No sessions match “transcript export” with the tag
                #vega-migration. Try a different query or clear your filters.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcwIcon />
                  Clear filters
                </Button>
                <Button size="sm">
                  <PlusIcon />
                  New session
                </Button>
              </div>
              <EmptyDescription>
                Tip: search titles, participants, or transcript text — or
                browse all 12 sessions.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        </div>

        <footer className="mt-auto flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 border-t border-solid border-default-border px-6 py-3">
          <span className="text-caption font-caption text-neutral-500">
            0 of 12 sessions shown
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            updated Aug 14, 2025
          </span>
        </footer>
      </DefaultPageLayout>
    </EvalShell>
  );
}
