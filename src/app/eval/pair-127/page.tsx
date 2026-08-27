"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Dialog } from "@/components/ds/Dialog";
import { FormSection } from "@/components/ds/FormSection";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";

import { ChevronRight, Database, Info, ShieldCheck } from "lucide-react";

/**
 * pair-127 — Aster Console · workspace settings / data governance,
 * 1440×900 desktop, light, ltr, dense content.
 *
 * Layout: a full-width page header carries the policy identity + live stats;
 * the left column is the retention & export policy form (ds:FormSection)
 * with three ui:combobox fields — a closed single-select showing a long
 * selected value, a multi-select chips picker, and a grouped region picker
 * rendered with its listbox open (defaultOpen + autoHighlight). The right
 * rail is the "Deletion safeguards" section: an open ds:Dialog confirmation
 * composed inside a clipped frame (non-modal, demo pattern) over a dimmed
 * policy amendment log.
 */

const approvingTeams = [
  "Legal & Compliance — Quarterly Review Board",
  "Data Governance Office — Retention Subcommittee",
  "Clinical Ethics & Privacy Council",
  "Platform Reliability Engineering Guild",
  "External Auditors (Rowan & Fitch) — Annual Attestation",
] as const;

const reviewerGroups = [
  "Biostatistics",
  "Regulatory Affairs",
  "Data Curation",
  "Safety & Pharmacovigilance",
  "Clinical Operations",
  "Quality Assurance",
  "Medical Writing",
  "Site Management",
] as const;

const defaultReviewers = [
  "Biostatistics",
  "Regulatory Affairs",
  "Data Curation",
  "Safety & Pharmacovigilance",
] as const;

const residencyRegions = [
  {
    value: "Americas",
    items: [
      "(GMT-5) Virginia, US East — primary",
      "(GMT-3) São Paulo, Brazil",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London, United Kingdom",
      "(GMT+1) Frankfurt, Germany",
    ],
  },
  {
    value: "Asia-Pacific",
    items: [
      "(GMT+8) Singapore",
      "(GMT+10) Sydney, Australia",
    ],
  },
] as const;

const policyStats = [
  { label: "Retention window", value: "90 days" },
  { label: "Transcripts in scope", value: "1,240" },
  { label: "Export bundles YTD", value: "46" },
];

export default function Page() {
  const [confirmOpen, setConfirmOpen] = React.useState(true);
  const frameRef = React.useRef<HTMLDivElement>(null);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-default-font">
        {/* ── top bar ─────────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-solid border-default-border bg-panel px-5">
          <div className="flex size-7 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-background">
            <Database className="size-4 text-neutral-700" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            Aster Console
          </span>
          <span className="text-caption font-caption text-neutral-400">
            Research data platform
          </span>

          <div className="mx-2 flex items-center gap-1.5 text-caption font-caption text-neutral-400">
            <span>Workspace</span>
            <ChevronRight className="size-3.5" />
            <span>Settings</span>
            <ChevronRight className="size-3.5" />
            <span className="text-neutral-600">Data governance</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <span className="font-code text-[11px] text-neutral-400">
              Policy v4.2 · 214 members
            </span>
            <span className="flex items-center gap-1.5 text-caption font-caption text-neutral-500">
              <span className="size-1.5 flex-none rounded-full bg-success-600" />
              Autosaved just now
            </span>
          </div>
        </header>

        {/* ── page header ─────────────────────────────────────────── */}
        <div className="flex flex-none items-start justify-between gap-8 border-b border-solid border-default-border bg-default-background px-6 py-4">
          <div className="max-w-[700px]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-neutral-500" />
              <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                Workspace settings
              </span>
            </div>
            <h1 className="mt-1.5 text-[22px] font-[600] leading-7 tracking-[-0.01em] text-neutral-900">
              Data retention &amp; export policy
            </h1>
            <p className="mt-1.5 text-body font-body leading-relaxed text-neutral-500">
              Changes apply to every member of Aster Research and take effect
              at the next scheduled export run. Policies are versioned and
              countersigned in the governance ledger.
            </p>
          </div>

          <dl className="flex flex-none rounded-lg border border-solid border-default-border bg-panel">
            {policyStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-1 px-5 py-4 ${
                  index > 0
                    ? "border-l border-solid border-default-border"
                    : ""
                }`}
              >
                <dd className="text-[20px] font-[600] leading-6 text-neutral-900">
                  {stat.value}
                </dd>
                <dt className="text-caption font-caption text-neutral-500">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ── main ────────────────────────────────────────────────── */}
        <main className="flex flex-1 items-stretch">
          {/* left column — policy form */}
          <div className="flex min-w-0 flex-1 flex-col p-6">
            <FormSection
              sectionLabel="Retention & export policy"
              hint="Applies to transcripts, derived datasets and scheduled export jobs. Escalation contacts inherit these rules."
              className="max-w-[840px]"
            >
              {/* row 1 — approving team + export reviewers */}
              <div className="grid w-full grid-cols-2 gap-5">
                <div className="flex w-full flex-col items-start gap-1.5">
                  <span className="text-caption font-caption text-neutral-500">
                    Approving team
                  </span>
                  <Combobox items={approvingTeams} defaultValue={approvingTeams[0]}>
                    <ComboboxInput
                      aria-label="Approving team"
                      placeholder="Select the approving team"
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No teams found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>

                <div className="flex w-full flex-col items-start gap-1.5">
                  <span className="text-caption font-caption text-neutral-500">
                    Export reviewers
                  </span>
                  <Combobox
                    items={reviewerGroups}
                    multiple
                    defaultValue={defaultReviewers}
                  >
                    <ComboboxChips>
                      <ComboboxValue>
                        {(values) =>
                          values.map((value) => (
                            <ComboboxChip key={value}>{value}</ComboboxChip>
                          ))
                        }
                      </ComboboxValue>
                      <ComboboxChipsInput
                        aria-label="Export reviewers"
                        placeholder="Add reviewer group"
                      />
                    </ComboboxChips>
                    <ComboboxContent>
                      <ComboboxEmpty>No reviewer groups found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
              </div>

              {/* row 2 — region picker with the listbox open */}
              <div className="flex w-full flex-col items-start gap-1.5">
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="text-caption font-caption text-neutral-500">
                    Data residency region
                  </span>
                  <span className="text-caption font-caption text-neutral-400">
                    The primary region stores the canonical dataset; failover
                    regions receive encrypted replicas every six hours.
                  </span>
                </div>
                <Combobox items={residencyRegions} defaultOpen autoHighlight>
                  <ComboboxInput
                    aria-label="Data residency region"
                    placeholder="Select the primary storage region"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No regions found.</ComboboxEmpty>
                    <ComboboxList className="max-h-[340px]">
                      {(group, index) => (
                        <ComboboxGroup
                          key={group.value}
                          items={group.items}
                        >
                          <ComboboxLabel>{group.value}</ComboboxLabel>
                          <ComboboxCollection>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxCollection>
                          {index < residencyRegions.length - 1 && (
                            <ComboboxSeparator />
                          )}
                        </ComboboxGroup>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </FormSection>

            {/* propagation note */}
            <div className="mt-auto flex w-full max-w-[840px] items-start gap-2.5 rounded-lg border border-solid border-default-border bg-panel px-4 py-3">
              <Info className="mt-0.5 size-4 flex-none text-neutral-400" />
              <p className="text-caption font-caption leading-relaxed text-neutral-500">
                Amendments propagate to scheduled export jobs at 02:00 UTC;
                in-flight jobs keep the prior version.
              </p>
            </div>
          </div>

          {/* right rail — deletion safeguards */}
          <aside className="flex w-[440px] flex-none flex-col gap-4 border-l border-solid border-default-border bg-neutral-50 p-6">
            <FormSection
              sectionLabel="Deletion safeguards"
              hint="Destructive actions are irreversible and are reported to the Data Governance Office."
            >
              <p className="text-body font-body leading-relaxed text-neutral-500">
                Deleting export history removes signed submission bundles from
                every shared drive and releases retention holds on active
                studies.
              </p>

              <div
                ref={frameRef}
                className="relative h-[312px] w-full overflow-hidden rounded-lg border border-solid border-default-border bg-default-background"
              >
                {/* quiet policy amendment log under the scrim */}
                <div className="absolute inset-0 flex flex-col gap-3 p-6">
                  <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                    Retention policy / amendment log
                  </span>
                  <p className="text-body font-body text-default-font/60">
                    Retention window extended from 60 to 90 days pending legal
                    review of the EU submission trail.
                  </p>
                  <p className="text-body font-body text-default-font/60">
                    Export bundles are frozen after countersignature;
                    amendments require a fresh approval cycle.
                  </p>
                  <p className="text-body font-body text-default-font/60">
                    Failover replicas in the secondary region are pruned seven
                    days after the primary archive completes.
                  </p>
                </div>

                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen} modal={false}>
                  <Dialog.Content
                    aria-describedby={undefined}
                    onOpenAutoFocus={(event: Event) => event.preventDefault()}
                    onPointerDownOutside={(event) => {
                      // non-modal: only dismiss for interactions inside the
                      // preview frame, never for stray page clicks
                      if (!frameRef.current?.contains(event.target as Node)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <div className="flex w-full max-w-[368px] flex-col items-start gap-5 p-6">
                      <div className="flex w-full flex-col items-start gap-1.5">
                        <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                          Delete export history?
                        </SubframeCore.Dialog.Title>
                        <span className="text-body font-body text-neutral-500">
                          All 46 exports created since January 2024 —
                          including the signed FDA submission bundles — will
                          be removed permanently from shared drives and the
                          audit ledger.
                        </span>
                      </div>
                      <div className="flex w-full items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => setConfirmOpen(false)}
                        >
                          Keep exports
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setConfirmOpen(false)}
                        >
                          Delete permanently
                        </Button>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setConfirmOpen(true)}
                >
                  Preview confirmation
                </Button>
                <span className="text-caption font-caption text-neutral-500">
                  Click the scrim or press Escape to dismiss.
                </span>
              </div>
            </FormSection>

            <p className="mt-auto text-caption font-caption leading-relaxed text-neutral-400">
              Deletion requests queue for 24 hours — revocable from the audit
              ledger.
            </p>
          </aside>
        </main>

        {/* ── status bar ──────────────────────────────────────────── */}
        <footer className="flex h-9 flex-none items-center justify-between border-t border-solid border-default-border bg-panel px-5">
          <span className="text-caption font-caption text-neutral-500">
            Retention window 90 days · 1,240 transcripts · 46 export bundles
            under governance
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            approved by the Data Governance Office · synced 2 h ago
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
