"use client";

/**
 * EVAL page (pair-002) — components: ds:AskBar, ds:DefaultPageLayout, ui:command
 * Conditions: phone-small 360x640, light theme, ltr.
 *
 * Scenario: on-call "incident assistant" screen. DefaultPageLayout is the page
 * scaffold; the Command palette is the inline search / quick-action surface;
 * AskBar is the pinned prompt at the bottom.
 */

import React from "react";
import {
  BellRingIcon,
  DatabaseIcon,
  FileTextIcon,
  ZapIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AskBar } from "@/components/ds/AskBar";
import { DefaultPageLayout } from "@/components/ds/DefaultPageLayout";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const quickActions = [
  { icon: ZapIcon, label: "Summarize incident timeline" },
  { icon: BellRingIcon, label: "Acknowledge & page on-call" },
];

const recentRecords = [
  { icon: FileTextIcon, label: "INC-1041 · Card auth timeouts", meta: "2h ago" },
  { icon: DatabaseIcon, label: "RUN-88 · Nightly ingest failed", meta: "1d ago" },
  { icon: FileTextIcon, label: "RUN-87 · Weekly billing export", meta: "1w ago" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <DefaultPageLayout className="h-auto min-h-screen">
        <header className="flex w-full shrink-0 flex-col gap-1 px-5 pt-6">
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            Workspace / Assistant
          </span>
          <span className="text-heading-3 font-heading-3 text-default-font">
            Incident assistant
          </span>
          <span className="text-caption font-caption text-neutral-500">
            INC-1042 · Checkout payment failures · P1 · 14m ago
          </span>
        </header>

        <section
          aria-label="Search and quick actions"
          className="flex w-full flex-col px-5"
        >
          <Command className="border border-solid border-default-border shadow-sm">
            <CommandInput placeholder="Search records, runs, runbooks…" />
            <CommandList className="max-h-none">
              <CommandEmpty>No matching records.</CommandEmpty>
              <CommandGroup heading="Quick actions">
                {quickActions.map(({ icon: Icon, label }) => (
                  <CommandItem key={label} className="py-3">
                    <Icon />
                    <span>{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Recent records">
                {recentRecords.map(({ icon: Icon, label, meta }) => (
                  <CommandItem key={label} className="py-3">
                    <Icon />
                    <span>{label}</span>
                    <CommandShortcut>{meta}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </section>

        <footer className="mt-auto w-full shrink-0 border-t border-solid border-default-border">
          <AskBar
            placeholder="Ask about INC-1042…"
            statusText="Answers cite the linked record and its activity log."
          />
        </footer>
      </DefaultPageLayout>
    </EvalShell>
  );
}
