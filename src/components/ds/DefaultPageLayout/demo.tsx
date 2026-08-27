"use client";

/**
 * DefaultPageLayout demo — a quiet page composition (header band, session
 * rows, footer band) inside a fixed-height frame. The frame stands in for the
 * viewport: the root's h-screen is overridden to h-full via className so the
 * scaffold renders contained while the panel-themed column still owns its
 * scrolling.
 */

import React from "react";
import { DefaultPageLayout } from "@/components/ds/DefaultPageLayout";

const sessions = [
  { name: "Q3 planning session", meta: "Aug 14, 2025 · 42 min · 4 participants" },
  {
    name: "Weekly sync — infrastructure",
    meta: "Aug 12, 2025 · 28 min · 6 participants",
  },
  {
    name: "Design review: transcript editor",
    meta: "Aug 8, 2025 · 55 min · 3 participants",
  },
];

export default function Demo() {
  return (
    <div className="h-96 w-full max-w-[560px] overflow-hidden rounded-lg border border-solid border-default-border">
      <DefaultPageLayout className="h-full">
        <header className="flex w-full shrink-0 flex-col gap-1 border-b border-solid border-default-border px-6 py-4">
          <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
            Workspace / Sessions
          </span>
          <span className="text-heading-3 font-heading-3 text-default-font">
            Session archive
          </span>
        </header>
        <div className="flex w-full flex-col px-6 py-5">
          {sessions.map(({ name, meta }) => (
            <div
              key={name}
              className="flex w-full flex-col gap-1 border-b border-solid border-default-border py-3 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="text-body-medium font-body-medium text-default-font">
                {name}
              </span>
              <span className="text-caption font-caption text-neutral-500">
                {meta}
              </span>
            </div>
          ))}
        </div>
        <footer className="mt-auto flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 border-t border-solid border-default-border px-6 py-3">
          <span className="text-caption font-caption text-neutral-500">
            12 sessions · 8 h 14 m total
          </span>
          <span className="font-code text-[11px] text-neutral-400">
            updated Aug 14, 2025
          </span>
        </footer>
      </DefaultPageLayout>
    </div>
  );
}

export const demoSource = `<DefaultPageLayout className="h-full">
  <header className="flex w-full shrink-0 flex-col gap-1 border-b border-solid border-default-border px-6 py-4">
    <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-400">
      Workspace / Sessions
    </span>
    <span className="text-heading-3 font-heading-3 text-default-font">
      Session archive
    </span>
  </header>
  <div className="flex w-full flex-col px-6 py-5">
    <div className="flex w-full flex-col gap-1 border-b border-solid border-default-border py-3 first:pt-0 last:border-b-0 last:pb-0">
      <span className="text-body-medium font-body-medium text-default-font">
        Q3 planning session
      </span>
      <span className="text-caption font-caption text-neutral-500">
        Aug 14, 2025 · 42 min · 4 participants
      </span>
    </div>
    {/* …more session rows… */}
  </div>
  <footer className="mt-auto flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 border-t border-solid border-default-border px-6 py-3">
    <span className="text-caption font-caption text-neutral-500">
      12 sessions · 8 h 14 m total
    </span>
    <span className="font-code text-[11px] text-neutral-400">
      updated Aug 14, 2025
    </span>
  </footer>
</DefaultPageLayout>`;
