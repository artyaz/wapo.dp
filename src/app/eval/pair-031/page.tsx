"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { RecordHeader } from "@/components/ds/RecordHeader";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";

/**
 * Scenario: a document editor header bar on a phone — the RecordHeader carries
 * the document identity (breadcrumb / title / doc-id chip / meta) plus the
 * Share + Publish actions; below it a "Publishing" schedule sheet uses Label
 * fields with full-width DatePicker triggers, and a quiet contract preview.
 */

// Pinned date so the screenshot is fully deterministic.
const PUBLISH_DATE = new Date(2025, 8, 16); // Tue, September 16, 2025

const CLAUSES: { heading: string; body: string }[] = [
  {
    heading: "1 · Services",
    body: "Contractor will provide the platform services described in Exhibit A, including onboarding support and quarterly usage reporting.",
  },
  {
    heading: "9 · Term and termination",
    body: "This Agreement begins on the Effective Date and continues for 24 months. Either party may terminate for material breach upon 30 days' written notice.",
  },
  {
    heading: "12 · Governing law",
    body: "This Agreement is governed by the laws of the State of Oregon, excluding its conflict-of-law rules.",
  },
];

export default function Page() {
  const [publishDate, setPublishDate] = React.useState<Date | undefined>(
    PUBLISH_DATE
  );
  const [reviewDate, setReviewDate] = React.useState<Date | undefined>(
    undefined
  );

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col">
        {/* ── document editor header bar ─────────────────────────── */}
        <RecordHeader
          breadcrumb="Workspace / Legal / Contracts"
          title="Master Services Agreement"
          recordId="DOC-0847"
          meta="Draft · edited 4 min ago by Mara Ellis · 14 sections"
          secondaryAction="Share"
          primaryAction="Publish"
        />

        {/* ── publishing schedule ────────────────────────────────── */}
        <section className="flex flex-col gap-4 border-b border-solid border-default-border px-5 py-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[13px] font-semibold leading-[18px] text-default-font">
              Publishing
            </h2>
            <p className="text-[12px] leading-[16px] text-muted-foreground">
              Schedule when this draft goes live and when legal review is due.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="doc-publish-date">Publish date</Label>
            <DatePicker
              id="doc-publish-date"
              value={publishDate}
              onValueChange={setPublishDate}
              format="EEE, MMMM d, yyyy"
              buttonClassName="h-11 w-full"
            />
            <p className="text-[12px] leading-[16px] text-muted-foreground">
              The contract becomes visible to all workspace members at 09:00
              UTC.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="doc-review-date">Review due</Label>
            <DatePicker
              id="doc-review-date"
              value={reviewDate}
              onValueChange={setReviewDate}
              placeholder="Pick a date"
              buttonClassName="h-11 w-full"
            />
            <p className="text-[12px] leading-[16px] text-muted-foreground">
              Reviewers get a reminder 24 hours before this deadline.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Checkbox id="doc-notify" defaultChecked />
            <Label htmlFor="doc-notify" className="font-normal">
              Notify reviewers when published
            </Label>
          </div>
        </section>

        {/* ── document preview ───────────────────────────────────── */}
        <main className="flex flex-1 flex-col gap-3 px-5 py-5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-muted-foreground">
              <FileText className="size-3.5" />
              Preview
            </span>
            <span className="font-code text-[11px] leading-4 text-muted-foreground">
              page 1 of 6
            </span>
          </div>

          <article className="flex flex-col gap-3 rounded-xl border border-solid border-default-border bg-panel/40 px-4 py-4">
            {CLAUSES.map((clause) => (
              <div key={clause.heading} className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold leading-[16px] text-default-font">
                  {clause.heading}
                </span>
                <p className="text-[13px] leading-[19px] text-default-font/80">
                  {clause.body}
                </p>
              </div>
            ))}
          </article>

          <p className="font-code text-[11px] leading-4 text-muted-foreground">
            2,140 words · 6 pages · autosaved 14:02
          </p>
        </main>
      </div>
    </EvalShell>
  );
}
