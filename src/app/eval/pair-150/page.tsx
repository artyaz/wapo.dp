"use client";

/**
 * EVAL page (pair-150) — user profile page, RTL.
 * Components: ui:Spinner, ds:ThoughtHeader, ds:TextField
 * Conditions: viewport 1024x768, light theme, direction rtl, no constraint.
 *
 * Scenario: the Praxis Workspace profile editor for Nadia Haddad. The
 * start-side column (right in RTL) carries her identity card — avatar with
 * camera affordance plus contact meta — above the Profile assistant card,
 * where two ThoughtHeaders disclose the assistant's reasoning log (the
 * latest run expanded, the previous one collapsed). The main column is the
 * profile form: display name, work email with a Spinner verifying in the
 * TextField's trailing slot, a recovery email in the error state, and an
 * About TextArea — closed by a Saving… primary button (Spinner) with a
 * Syncing badge (Spinner) in the top bar.
 */

import React from "react";
import {
  AtSign,
  Calendar,
  Camera,
  Globe,
  Mail,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { AgentActivity } from "@/components/ds/AgentActivity";
import { TextField } from "@/components/ds/TextField";

/** Contact meta rows rendered under the identity block. */
const META = [
  { icon: Mail, text: "nadia.haddad@praxis.io" },
  { icon: MapPin, text: "Dubai, UAE · Remote-friendly" },
  { icon: Globe, text: "GMT+4 · Arabia Standard Time" },
  { icon: Calendar, text: "Joined March 2023 · 214 documents" },
];

/** One reasoning-log line inside the assistant card (adapted ThoughtHeader demo). */
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
            ? "mt-[7px] h-[5px] w-[5px] flex-none rounded-full bg-neutral-400"
            : "mt-[6px] h-[7px] w-[7px] flex-none animate-pulse rounded-full bg-neutral-600 motion-reduce:animate-none"
        }
      />
      <p
        className={
          state === "done"
            ? "min-w-0 text-[13px] leading-[20px] text-neutral-500"
            : "min-w-0 text-[13px] leading-[20px] text-neutral-700"
        }
      >
        {children}
      </p>
    </div>
  );
}

/** Quiet label/value row used inside the identity card. */
function MetaRow({ icon: Icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 flex-none text-neutral-400" />
      <span className="min-w-0 truncate text-[13px] leading-[18px] text-neutral-600">
        {text}
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-default-background font-body text-default-font">
        {/* ── Top bar ──────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center justify-between border-b border-solid border-default-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-default-font text-default-background">
              <Sparkles className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3 text-default-font">
              Praxis Workspace
            </span>
            <span className="h-4 w-px bg-default-border" />
            <span className="font-caption text-caption text-neutral-500">
              Settings / Profile
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">
              <Spinner data-icon="inline-start" />
              Syncing
            </Badge>
            <span className="h-4 w-px bg-default-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-200 text-[10px] font-semibold text-neutral-700">
                NH
              </div>
              <span className="font-caption text-caption text-neutral-600">
                Nadia Haddad
              </span>
            </div>
          </div>
        </header>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="flex min-h-0 grow gap-6 overflow-y-auto p-6">
          {/* Start column — identity + assistant (renders on the right in RTL) */}
          <aside className="flex w-[320px] flex-none flex-col gap-6">
            {/* Identity card */}
            <section className="flex flex-col gap-4 rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="flex items-center gap-4">
                <div className="relative flex-none">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 font-heading-2 text-heading-2 text-neutral-700">
                    NH
                  </div>
                  <span className="absolute -bottom-0.5 -start-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-solid border-panel bg-default-font text-default-background">
                    <Camera className="size-3" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-heading-3 text-heading-3 text-default-font">
                    Nadia Haddad
                  </span>
                  <span className="font-caption text-caption text-neutral-500">
                    Product Designer · Design Systems
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 border-t border-solid border-default-border pt-4">
                {META.map((row) => (
                  <MetaRow key={row.text} icon={row.icon} text={row.text} />
                ))}
              </div>
            </section>

            {/* Profile assistant card */}
            <section className="flex flex-col gap-3 rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-neutral-500" />
                  <span className="font-body-medium text-body-medium text-default-font">
                    Profile assistant
                  </span>
                </div>
                <span className="font-caption text-caption text-neutral-500">
                  Today · 09:24
                </span>
              </div>

              <AgentActivity label="Worked for 1m 12s" defaultOpen>
                <div className="flex flex-col gap-2.5">
                  <LogLine state="done">
                    Scanned your profile — the About section is empty and
                    pronouns are missing
                  </LogLine>
                  <LogLine state="done">
                    Drafted a headline from your last three shipped projects
                  </LogLine>
                  <LogLine state="active">
                    Polishing the summary it drafted for your About section
                  </LogLine>
                </div>
              </AgentActivity>

              <AgentActivity label="Worked for 22s" />
            </section>
          </aside>

          {/* Main column — profile form */}
          <main className="flex min-w-0 grow flex-col">
            <section className="flex grow flex-col gap-5 rounded-lg border border-solid border-default-border bg-panel p-5">
              <div className="flex flex-col gap-1">
                <span className="font-heading-3 text-heading-3 text-default-font">
                  Profile details
                </span>
                <span className="font-caption text-caption text-neutral-500">
                  How you appear across the workspace — comments, mentions, and
                  shared links.
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <TextField
                  label="Display name"
                  helpText="Shown on comments, mentions, and shared documents."
                  leading={<User className="size-4" />}
                >
                  <TextField.Input
                    defaultValue="Nadia Haddad"
                    placeholder="Your name"
                  />
                </TextField>

                <TextField
                  label="Work email"
                  helpText="Verifying your address — this can take a minute."
                  leading={<AtSign className="size-4" />}
                  trailing={<Spinner />}
                >
                  <TextField.Input
                    type="email"
                    defaultValue="nadia.haddad@praxis.io"
                  />
                </TextField>

                <TextField
                  label="Recovery email"
                  error
                  helpText="That address is missing its domain — try name@example.com."
                  leading={<Mail className="size-4" />}
                >
                  <TextField.Input
                    type="email"
                    defaultValue="nadia.haddad@"
                  />
                </TextField>

                <TextField
                  label="About"
                  helpText="Two or three sentences. The assistant drafted a summary for you."
                >
                  <TextField.TextArea
                    defaultValue="Design systems lead on the Praxis workspace. I care about tokens, docs, and the quiet details that make a UI feel calm — mostly seen in the component library 40+ teams ship from. Previously at Lantern."
                    className="min-h-[96px]"
                  />
                </TextField>
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-solid border-default-border pt-4">
                <span className="font-caption text-caption text-neutral-500">
                  Last saved 4 minutes ago · autosave on
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-9 flex-none items-center rounded-md border border-solid border-default-border px-4 font-caption text-caption text-neutral-600 transition-colors hover:text-default-font"
                  >
                    Discard changes
                  </button>
                  <button
                    type="button"
                    className="flex h-9 flex-none items-center gap-2 rounded-md bg-default-font px-4 font-caption text-caption text-default-background"
                  >
                    <Spinner className="size-3.5" />
                    Saving changes…
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
