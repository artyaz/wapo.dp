"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { MaterialTokens } from "@/components/ds/MaterialTokens";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Pinned session day (a Saturday) so the screenshot is fully deterministic.
const SESSION_DAY = new Date(2026, 1, 14);

const TRANSCRIPT: {
  speaker: string;
  role: string;
  time: string;
  text: string;
}[] = [
  {
    speaker: "Priya Raghavan",
    role: "Head of Platform",
    time: "10:24",
    text: "Thanks for joining, everyone. Before we get into the roadmap, I want to walk through where the platform landed last quarter — specifically the ingestion migration, and what it means for caption latency on small phones and congested networks.",
  },
  {
    speaker: "Marcus Webb",
    role: "Product Design",
    time: "10:26",
    text: "Quick design update: the live transcript view now follows our liquid-glass material hierarchy, so caption surfaces stay readable over busy video. We validated all four translucency levels with low-vision participants across nine device sizes.",
  },
  {
    speaker: "Ana Sofía Delgado",
    role: "Platform Engineering",
    time: "10:29",
    text: "From engineering: end-to-end caption delay dropped from roughly 2.8 seconds to under one second on congested mobile networks. The remaining work is buffering for very long sessions — the two-hour board review earlier this week exposed a regression we are fixing now.",
  },
  {
    speaker: "Priya Raghavan",
    role: "Head of Platform",
    time: "10:31",
    text: "That latency number is the headline for the board deck. Last thing before questions: the archive now keeps full transcripts for ninety days, so you can jump back to any session day and search everything that was said.",
  },
];

export default function Page() {
  const [day, setDay] = React.useState<Date | undefined>(SESSION_DAY);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col">
        {/* Header */}
        <header className="flex items-start justify-between gap-3 border-b border-default-border px-4 pb-3.5 pt-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-[15px] font-semibold leading-[20px] text-default-font">
              Live transcript
            </h1>
            <p className="text-[12px] leading-[16px] text-muted-foreground">
              Q4 Platform Review — All-hands · 14 attendees
            </p>
          </div>
          <span className="mt-0.5 flex flex-none items-center gap-1.5 rounded-full border border-default-border bg-panel/60 px-2.5 py-1">
            <span className="size-1.5 flex-none rounded-full bg-destructive" />
            <span className="font-code text-[11px] font-medium leading-none tracking-[0.08em] text-default-font">
              LIVE 01:07:22
            </span>
          </span>
        </header>

        {/* Search + jump-to-day controls */}
        <div className="border-b border-default-border px-4 py-4">
          <FieldGroup>
            <Field data-invalid>
              <FieldLabel htmlFor="transcript-search">
                Search spoken words
              </FieldLabel>
              <Input
                id="transcript-search"
                className="h-11"
                defaultValue="continer orcestration"
                placeholder="Keyword, phrase, or speaker name"
                aria-invalid
              />
              <FieldDescription>
                Matches highlight in the transcript below — try “migration”,
                “captions”, or a speaker name like Priya Raghavan.
              </FieldDescription>
              <FieldError>
                No matches for “continer orcestration”. Check the spelling —
                did you mean “container orchestration”?
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="transcript-day">
                Jump to another session day
              </FieldLabel>
              <DatePicker
                id="transcript-day"
                value={day}
                onValueChange={setDay}
                format="EEEE, MMMM d"
                buttonClassName="h-11 w-full"
              />
              <FieldDescription>
                Transcripts and captions are kept for 90 days after each
                session. The live day loads automatically while the meeting is
                still running.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>

        {/* Transcript feed */}
        <main className="flex flex-col gap-3 px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-code text-[11px] font-medium uppercase leading-4 tracking-[0.1em] text-muted-foreground">
              February 14, 2026
            </span>
            <span className="text-[11px] leading-4 text-muted-foreground">
              Auto-transcribed · English
            </span>
          </div>

          {TRANSCRIPT.map((entry) => (
            <article
              key={entry.time}
              className="flex flex-col gap-1.5 rounded-xl border border-default-border bg-panel/40 px-3.5 py-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold leading-[18px] text-default-font">
                  {entry.speaker}
                </span>
                <span className="font-code text-[11px] leading-4 tabular-nums text-muted-foreground">
                  {entry.time}
                </span>
              </div>
              <span className="text-[11px] leading-[15px] text-muted-foreground">
                {entry.role}
              </span>
              <p className="text-[13px] leading-[19px] text-default-font/85">
                {entry.text}
              </p>
            </article>
          ))}

          <div className="flex items-center gap-2 px-1 pt-1">
            <span className="size-1.5 flex-none rounded-full bg-destructive" />
            <span className="text-[11px] leading-4 text-muted-foreground">
              Ana Sofía Delgado is speaking — live captions keep streaming…
            </span>
          </div>
        </main>

        {/* Caption appearance settings */}
        <section className="mt-auto flex flex-col gap-3 border-t border-default-border px-4 pb-8 pt-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[13px] font-semibold leading-[18px] text-default-font">
              Caption appearance
            </h2>
            <p className="text-[12px] leading-[16px] text-muted-foreground">
              Caption panels use the system glass hierarchy — choose how
              strongly the surface refracts the video behind it.
            </p>
          </div>
          <MaterialTokens />
        </section>
      </div>
    </EvalShell>
  );
}
