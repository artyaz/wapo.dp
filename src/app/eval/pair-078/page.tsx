"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  CheckIcon,
  CircleHelpIcon,
  InboxIcon,
  PlusIcon,
  SunriseIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * pair-078 — "Praxis Tasks" morning triage screen on a tiny 320×480 phone
 * (light, ltr).
 *
 * Scenario: the user opens the capture inbox for the daily triage. A help
 * popover (open by default from the header button) explains the routine, the
 * project filter combobox (open by default, "Inbox" selected with the first
 * item highlighted) drives the task list, and — with "Inbox" selected and
 * empty — the main area shows the inbox-zero empty state.
 *
 * The two fixed-height spacers reserve room for the portaled overlays (the
 * open popover below the header, the open listbox below the filter input) so
 * no in-flow content is covered by them.
 */

const projects: { label: string; count: number }[] = [
  { label: "Inbox", count: 0 },
  { label: "Work", count: 5 },
  { label: "Home", count: 8 },
  { label: "Reading list", count: 3 },
];

const triageTips = ["Move each capture to a project", "Snoozed items return tomorrow"];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col">
        {/* ---------- Header ---------- */}
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex min-w-0 items-center gap-2">
            <InboxIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm font-semibold tracking-tight">
              Praxis Tasks
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              · Today
            </span>
          </div>

          <Popover defaultOpen>
            <PopoverTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Triage tips">
                  <CircleHelpIcon />
                </Button>
              }
            />
            <PopoverContent
              align="end"
              sideOffset={12}
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <PopoverHeader>
                <PopoverTitle>Daily triage</PopoverTitle>
                <PopoverDescription>
                  Clear your inbox once a day.
                </PopoverDescription>
              </PopoverHeader>
              <div className="mt-3 grid gap-1.5">
                {triageTips.map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <CheckIcon className="mt-0.5 size-3.5 shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
              <PopoverFooter className="mt-3">
                <span className="text-xs text-muted-foreground">
                  Inbox · 0 open
                </span>
                <span className="text-xs text-muted-foreground">
                  Resets 9:00
                </span>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </header>

        {/* Reserved vertical space for the open help popover */}
        <div aria-hidden="true" className="h-[196px] shrink-0" />

        {/* ---------- Project filter (combobox) ---------- */}
        <section className="px-4">
          <label
            htmlFor="pair-078-project-filter"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Show tasks from
          </label>
          <Combobox
            items={projects}
            defaultValue={projects[0]}
            open
            autoHighlight
          >
            <ComboboxInput
              id="pair-078-project-filter"
              placeholder="Search projects…"
              aria-label="Filter tasks by project"
            />
            <ComboboxContent>
              <ComboboxEmpty>No projects found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.label} value={item}>
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.count}
                    </span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </section>

        {/* Reserved vertical space for the open combobox listbox */}
        <div aria-hidden="true" className="h-[160px] shrink-0" />

        {/* ---------- Task list (empty: "Inbox" has 0 open) ---------- */}
        <section className="px-4 pb-3">
          <Empty className="min-h-[224px] flex-none border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SunriseIcon />
              </EmptyMedia>
              <EmptyTitle>Inbox zero</EmptyTitle>
              <EmptyDescription>
                You're all caught up — nothing to triage today.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">
                <PlusIcon />
                New capture
              </Button>
              <EmptyDescription className="text-xs">
                3 snoozed items return tomorrow at 9:00.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        </section>

        <footer className="mt-auto flex shrink-0 items-center justify-center border-t px-4 py-2.5">
          <span className="text-[11px] text-muted-foreground">
            Capture → triage → done
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
