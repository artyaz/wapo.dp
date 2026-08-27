"use client";

/**
 * EVAL page (pair-034) — components: ds:FormSection, ds:CodePane, ds:DefaultPageLayout
 * Conditions: laptop 1024x768, dark theme, ltr, no-scroll.
 *
 * Scenario: a user profile page on a developer platform. DefaultPageLayout is
 * the page scaffold (header band, body, footer band); the left card edits the
 * profile with FormSection-grouped TextFields; the right card shows the
 * member's pinned snippet in a CodePane with its hover-documentation card.
 */

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import { FormSection } from "@/components/ds/FormSection";
import { CodePane } from "@/components/ds/CodePane";
import { DefaultPageLayout } from "@/components/ds/DefaultPageLayout";
import { TextField } from "@/components/ds/TextField";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <DefaultPageLayout>
        <header className="flex w-full shrink-0 items-center gap-4 border-b border-solid border-default-border px-8 py-3">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-solid border-default-border bg-panel">
            <span className="text-body-medium font-body-medium text-default-font">
              AC
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
              Workspace / Profile
            </span>
            <span className="text-heading-3 font-heading-3 text-neutral-200">
              Amara Chen
            </span>
            <span className="text-caption font-caption text-neutral-500">
              Staff Engineer · Platform · Lisbon
            </span>
          </div>
        </header>

        <main className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-4 px-8">
          <section
            aria-label="Edit profile"
            className="w-full rounded-lg border border-solid border-default-border bg-panel p-6"
          >
            <FormSection
              sectionLabel="Profile"
              hint="Shown on your public profile page."
            >
              <TextField label="Display name">
                <TextField.Input
                  defaultValue="Amara Chen"
                  placeholder="Your name"
                />
              </TextField>
              <TextField
                label="Email"
                helpText="Used for sign-in and security notices."
              >
                <TextField.Input
                  type="email"
                  defaultValue="amara.chen@praxis.dev"
                  placeholder="you@company.com"
                />
              </TextField>
            </FormSection>

            <div className="mt-6">
              <FormSection
                sectionLabel="Preferences"
                hint="Used to localize timestamps and notifications."
              >
                <TextField label="Time zone">
                  <TextField.Input defaultValue="Europe/Lisbon (UTC+01:00)" />
                </TextField>
                <TextField label="Display language">
                  <TextField.Input defaultValue="English (UK)" />
                </TextField>
              </FormSection>
            </div>

            <div className="mt-4 flex w-full items-center justify-between">
              <span className="text-caption font-caption text-neutral-500">
                Autosaved just now
              </span>
              <span className="cursor-pointer text-caption font-caption text-neutral-400">
                Discard changes
              </span>
            </div>
          </section>

          <section
            aria-label="Pinned snippet"
            className="w-full rounded-lg border border-solid border-default-border bg-panel p-6"
          >
            <div className="flex w-full flex-col items-start gap-0.5">
              <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                Pinned snippet
              </span>
              <span className="text-caption font-caption text-neutral-400">
                src/services/ledger.ts · 218 stars
              </span>
            </div>
            <div className="mt-4">
              <CodePane>
                <CodePane.CodeLine lineNumber="1">
                  {'import { validateEntry } from "./validate";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="2">
                  {'import type { CreateEntryInput } from "./types";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="3">
                  {'import type { LedgerEntry } from "./types";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="4" />
                <CodePane.CodeLine lineNumber="5" currentLine={true}>
                  export async function createLedgerEntry(
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="6">
                  <span className="pl-4">input: CreateEntryInput</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="7">
                  {'): Promise<LedgerEntry> {'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="8">
                  <span className="pl-4">validateEntry(input);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="9">
                  <span className="pl-4">
                    const entry = {"{ ...input, id: nextId() }"};
                  </span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="10">
                  <span className="pl-4">await wal.append(entry);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="11">
                  <span className="pl-4">return entry;</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="12">{'}'}</CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="13" />
                <CodePane.CodeLine lineNumber="14">
                  export async function listEntries(
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="15">
                  <span className="pl-4">owner: string</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="16">
                  {'): Promise<LedgerEntry[]> {'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="17">
                  <span className="pl-4">return wal.readAll(owner);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="18">{'}'}</CodePane.CodeLine>
              </CodePane>
            </div>
          </section>
        </main>

        <footer className="mt-auto flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 border-t border-solid border-default-border px-8 py-3">
          <span className="text-caption font-caption text-neutral-500">
            Member since March 2021 · 2FA enabled
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            Profile updated Aug 14, 2025
          </span>
        </footer>
      </DefaultPageLayout>
    </EvalShell>
  );
}
