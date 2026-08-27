"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/ds/FormSection";
import { GlassDisplacement } from "@/components/ds/GlassDisplacement";
import { TextField } from "@/components/ds/TextField";
import { Button } from "@/components/ui/button";
import {
  CloudOff,
  FileText,
  History,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";

/**
 * pair-022 — "Draft recovery" screen (empty-state + recovery flow).
 *
 * A sync failure left the drafts list empty. The left stage shows the
 * empty-state: ghost previews of the local cache with a liquid-glass
 * recovery card (GlassDisplacement) floating over them. The right card
 * is the recovery flow: a FormSection wrapping contact + description
 * fields (ui Textarea) that feed the snapshot search.
 */

const GHOST_DRAFTS = [
  { title: "Q3 pricing memo", meta: "Edited today · 14:32" },
  { title: "Interview loop — staff designer", meta: "Edited yesterday · 17:05" },
  { title: "Changelog draft v1.14", meta: "Edited Mon · 09:18" },
  { title: "Research notes: liquid glass", meta: "Edited Mon · 08:02" },
  { title: "Onboarding checklist", meta: "Edited Sun · 21:44" },
  { title: "Brand palette audit", meta: "Edited Sat · 11:27" },
  { title: "Weekly sync agenda", meta: "Edited Fri · 16:40" },
  { title: "API migration plan", meta: "Edited Fri · 10:12" },
  { title: "Customer story — Meridian", meta: "Edited Thu · 15:55" },
  { title: "Pricing experiments log", meta: "Edited Thu · 12:03" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col gap-6 px-8 py-7">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-default-border bg-panel">
              <FileText className="h-4 w-4 text-default-font/80" />
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-sm font-medium text-default-font">
                Praxis Notes
              </span>
              <span className="text-default-font/30">/</span>
              <span className="text-sm text-neutral-500">Drafts</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-caption font-caption text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Sync paused — working offline
          </div>
        </header>

        <main className="grid flex-1 grid-cols-[1fr_400px] items-start gap-6">
          {/* ---------------- Empty state stage ---------------- */}
          <section className="relative h-[560px] overflow-hidden rounded-lg border border-default-border bg-neutral-200/70">
            {/* warm-gray radials (canonical glass backdrop) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(160,155,145,0.25)_0%,transparent_60%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_60%,rgba(140,138,130,0.20)_0%,transparent_55%)]"
            />

            {/* ghost previews of the unrecovered drafts */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 pb-16"
            >
              {GHOST_DRAFTS.map((draft) => (
                <div
                  key={draft.title}
                  className="flex items-center gap-3 opacity-40"
                >
                  <FileText className="h-4 w-4 shrink-0 text-neutral-600" />
                  <div className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                    <span className="truncate text-sm text-neutral-700">
                      {draft.title}
                    </span>
                    <span className="shrink-0 text-caption font-caption text-neutral-500">
                      {draft.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* floating glass empty-state card (status pills live inside it) */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <GlassDisplacement radius="lg" intensity="medium" className="w-[420px]">
                <div className="flex w-full flex-col items-center gap-4 px-8 py-9 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-default-border bg-panel/70">
                    <CloudOff className="h-5 w-5 text-default-font/70" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-lg font-medium text-default-font">
                      No drafts recovered
                    </h2>
                    <p className="mx-auto max-w-[280px] text-caption font-caption leading-relaxed text-neutral-500">
                      Your last sync failed 2 minutes ago. Nothing was lost —
                      the local cache is intact and waiting to be restored.
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2.5">
                    <Button size="sm">
                      <RefreshCw />
                      Retry sync
                    </Button>
                    <Button size="sm" variant="outline">
                      Browse snapshots
                    </Button>
                  </div>
                  <div className="mt-2 h-px w-full bg-neutral-300/70" />
                  <div className="flex items-center gap-2.5">
                    <GlassDisplacement
                      radius="pill"
                      intensity="subtle"
                      className="h-9 w-[172px]"
                    >
                      <span className="flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap text-caption font-caption text-default-font/80">
                        <History className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                        Snapshot · 3 days
                      </span>
                    </GlassDisplacement>
                    <GlassDisplacement
                      radius="pill"
                      intensity="subtle"
                      className="h-9 w-[172px]"
                    >
                      <span className="flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap text-caption font-caption text-default-font/80">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                        Auto-recovery on
                      </span>
                    </GlassDisplacement>
                  </div>
                </div>
              </GlassDisplacement>
            </div>

            <p className="absolute bottom-4 left-6 text-caption font-caption text-neutral-500">
              Local cache · 10 fragments previewed
            </p>
          </section>

          {/* ---------------- Recovery flow ---------------- */}
          <section className="flex w-full flex-col gap-5 rounded-lg border border-default-border bg-panel p-6 shadow-xs">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-lg font-medium text-default-font">
                Recover your work
              </h1>
              <p className="text-caption font-caption leading-relaxed text-neutral-500">
                We&apos;ll search server-side snapshots from the last 30 days
                and match them against your local cache.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-200" />

            <FormSection
              sectionLabel="Snapshot search"
              hint="The more detail you give, the better the match."
            >
              <TextField
                label="Workspace email"
                helpText="Results are sent here, usually within 10 minutes."
              >
                <TextField.Input type="email" placeholder="you@studio.com" />
              </TextField>

              <div className="flex w-full flex-col items-start gap-1.5">
                <span className="text-caption font-caption text-neutral-500">
                  What were you working on?
                </span>
                <Textarea defaultValue="Q3 pricing memo — three sections and one plan-comparison table. Last edited today around 14:30." />
              </div>

              <div className="flex w-full flex-col items-start gap-1.5">
                <span className="text-caption font-caption text-neutral-500">
                  Keywords or phrases
                </span>
                <Textarea placeholder="e.g. “annual revenue”, “tier 2 rollout”, section headings…" />
              </div>
            </FormSection>

            <div className="mt-1 flex items-center gap-2.5">
              <Button size="sm">
                <Search />
                Search snapshots
              </Button>
              <Button size="sm" variant="ghost">
                Not now
              </Button>
            </div>

            <p className="text-caption font-caption text-neutral-400">
              Searches run server-side and are queued — you can close this tab
              and matches will land in your inbox.
            </p>
          </section>
        </main>
      </div>
    </EvalShell>
  );
}
