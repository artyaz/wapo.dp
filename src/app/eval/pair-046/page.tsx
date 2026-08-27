"use client";

/**
 * EVAL page (pair-046) — mobile notification center (RTL locale).
 * Components: ds:PanelTile, ds:Sparkline, ds:FileTreeRow
 * Conditions: viewport 390x844, light theme, rtl direction.
 *
 * Scenario: an on-call engineer opens the Praxis Cloud notification center on
 * their phone. The active alert for checkout-api is expanded at the top
 * (focused PanelTile carrying severity facts and quick actions), its signal
 * trends for the last 30 samples sit beneath it (Sparkline), followed by the
 * changed files that shipped with the failing deploy #4217 (FileTreeRow list)
 * and two dimmed, already-read notifications.
 */

import React from "react";
import {
  CheckCheckIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  UserPlusIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { PanelTile } from "@/components/ds/PanelTile";
import { Sparkline } from "@/components/ds/Sparkline";
import { FileTreeRow } from "@/components/ds/FileTreeRow";

/** Quiet stat captions aligned beneath each Sparkline column. */
const SIGNAL_STATS = [
  { label: "latency p50", value: "12.4ms", note: "±0.3" },
  { label: "throughput", value: "1.9k/s", note: "+18.2%" },
  { label: "error rate", value: "0.12%", note: "−22.5%" },
] as const;

/** Files shipped with deploy #4217 — the trigger of the alert above. */
const CHANGED_FILES = [
  { name: "src", nodeType: "folder" as const, depth: "0" as const, expanded: true, selected: true },
  { name: "checkout", nodeType: "folder" as const, depth: "1" as const, expanded: true },
  { name: "session.ts", nodeType: "ts" as const, depth: "2" as const, gitStatus: "modified" as const },
  { name: "cart.json", nodeType: "json" as const, depth: "2" as const },
  { name: "tests", nodeType: "folder" as const, depth: "1" as const },
  { name: "deploy.yml", nodeType: "yml" as const, depth: "0" as const, gitStatus: "added" as const },
  { name: "package.json", nodeType: "json" as const, depth: "0" as const, dirty: true },
];

/** Already-read notifications at the bottom of the feed. */
const EARLIER = [
  {
    icon: CheckCircle2Icon,
    title: "Backup completed · vault-2",
    time: "12:04",
    tone: "success" as const,
  },
  {
    icon: UserPlusIcon,
    title: "Dana Haddad joined the workspace",
    time: "09:31",
    tone: "neutral" as const,
  },
];

function SectionLabel({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-body text-[11px] font-[700] uppercase leading-[14px] tracking-[0.08em] text-neutral-500">
        {children}
      </h2>
      {meta ? (
        <span className="flex items-center gap-1.5 font-code text-[11px] leading-[14px] text-neutral-400">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex w-full items-baseline justify-between gap-4">
      <span className="flex-none text-caption font-caption text-neutral-500">
        {label}
      </span>
      <span className="min-w-0 truncate font-code text-[13px] leading-[16px] text-default-font tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-2 px-4 py-3">
        {/* Header — app bar */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Back"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel text-neutral-500"
            >
              <ChevronRightIcon className="size-4" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-heading-3 font-heading-3 leading-[22px] text-default-font">
                Notification center
              </h1>
              <p className="truncate text-caption font-caption leading-[14px] text-neutral-500">
                Praxis Cloud · 3 unread · 1 firing
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-9 flex-none items-center gap-1.5 rounded-md border border-solid border-default-border bg-panel px-2.5 text-caption font-caption text-neutral-500"
          >
            <CheckCheckIcon className="size-3.5" />
            Mark read
          </button>
        </header>

        {/* Active alert — expanded notification detail */}
        <section className="flex flex-col gap-2">
          <SectionLabel
            meta={
              <span dir="ltr" className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-destructive-500" />
                firing · 14:32 UTC
              </span>
            }
          >
            Active alert
          </SectionLabel>
          <PanelTile variant="focused" title="checkout-api · us-east-1">
            <p className="w-full text-body-medium font-body-medium leading-[19px] text-default-font">
              Error rate crossed 1% for five minutes — deploy{" "}
              <span dir="ltr" className="font-code">
                #4217
              </span>{" "}
              was rolled back automatically.
            </p>
            <div className="mt-2.5 flex w-full flex-col gap-2">
              <Row
                label="Severity"
                value={<span className="text-destructive-600">Critical</span>}
              />
              <Row
                label="Trigger"
                value={<span dir="ltr">error_rate &gt; 1%</span>}
              />
              <Row label="Since" value={<span dir="ltr">14:32 UTC</span>} />
            </div>
            <div className="mt-3 flex w-full items-center gap-2">
              <button
                type="button"
                className="flex h-8 items-center rounded-md bg-default-font px-3 text-caption font-caption text-default-background"
              >
                Open runbook
              </button>
              <button
                type="button"
                className="flex h-8 items-center rounded-md border border-solid border-default-border px-3 text-caption font-caption text-neutral-500"
              >
                Mute 1 hour
              </button>
            </div>
          </PanelTile>
        </section>

        {/* Signal trends — the metrics behind the alert */}
        <section className="flex flex-col gap-2">
          <SectionLabel meta={<span dir="ltr">last 30 samples</span>}>
            Signal trends
          </SectionLabel>
          <div className="w-full rounded-lg border border-solid border-default-border bg-panel p-3.5">
            <div className="flex items-baseline justify-between">
              <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
                signals
              </span>
              <span dir="ltr" className="font-code text-[11px] text-neutral-400">
                checkout-api
              </span>
            </div>
            <div className="mt-3">
              <Sparkline />
            </div>
            <div className="mt-3 flex items-start gap-4 border-t border-solid border-default-border pt-2">
              {SIGNAL_STATS.map((stat) => (
                <span
                  key={stat.label}
                  dir="ltr"
                  className="flex-1 font-code text-[10px] leading-[13px] text-neutral-400 tabular-nums"
                >
                  {stat.label} {stat.value} {stat.note}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trigger — changed files in the failing deploy */}
        <section className="flex flex-col gap-2">
          <SectionLabel meta={<span dir="ltr">7 files · deploy #4217</span>}>
            Trigger · changed files
          </SectionLabel>
          <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            {CHANGED_FILES.map((file) => (
              <FileTreeRow key={file.name} {...file} />
            ))}
          </div>
        </section>

        {/* Earlier — read notifications */}
        <section className="flex flex-col gap-2">
          <SectionLabel>Earlier · read</SectionLabel>
          <div className="flex w-full flex-col">
            {EARLIER.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 border-t border-solid border-default-border py-2"
              >
                <item.icon
                  className={`size-4 flex-none ${
                    item.tone === "success"
                      ? "text-success-600"
                      : "text-neutral-400"
                  }`}
                />
                <p className="min-w-0 flex-1 truncate text-body-medium font-body-medium leading-[17px] text-neutral-500">
                  {item.title}
                </p>
                <span
                  dir="ltr"
                  className="flex-none text-caption font-caption text-neutral-400"
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </EvalShell>
  );
}
