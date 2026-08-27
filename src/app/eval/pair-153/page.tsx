"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { AssistantMessage } from "@/components/ds/AssistantMessage";
import { EditorTab } from "@/components/ds/EditorTab";
import { SparklesIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data — the findings file open in the editor pane                    */
/* ------------------------------------------------------------------ */

const FINDING_LINES = [
  "# RTL dark-theme contrast audit — sprint 47",
  "[P1] AssistantMessage.Quote falls to 3.9:1 on neutral-900 canvases",
  "[P2] EditorTab inactive label sits at 4.2:1; spec floor is 4.5:1",
  "[PASS] Radio indicator ring keeps 3.2:1 against --panel at 100%",
  "[P3] Hairline tab separators vanish at 150% zoom on HiDPI tablets",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-code text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="flex min-h-screen w-full flex-col bg-default-background px-5 pb-3 pt-3.5 font-body text-default-font text-body antialiased">
        {/* ── workspace header ─────────────────────────────────────── */}
        <header className="flex h-8 flex-none items-center gap-2.5">
          <span className="flex size-8 flex-none items-center justify-center rounded-lg border border-default-border bg-panel">
            <SparklesIcon className="size-4 text-neutral-400" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h1 className="truncate font-heading-3 text-[15px] leading-[18px]">
              Praxis Copilot — סקירת שחרור RTL
            </h1>
            <span className="font-code text-[10px] leading-[10px] text-neutral-500">
              release review · accessibility guild
            </span>
          </div>
          <span className="ms-auto flex-none rounded border border-default-border bg-panel px-1.5 py-1 font-code text-[10px] text-neutral-400">
            dark · rtl
          </span>
        </header>

        {/* ── editor pane (ds:EditorTab) ───────────────────────────── */}
        <section className="mt-3 flex-none overflow-hidden rounded-lg border border-solid border-default-border">
          <div className="flex w-full items-stretch">
            <EditorTab
              label="contrast-audit-rtl.findings.md"
              glyph="md"
              active
            />
            <EditorTab label="release-notes.he-IL.md" glyph="md" dirty />
            <EditorTab label="tokens.dark.json" glyph="{}" split />
            <div className="h-9 grow border-b border-solid border-default-border" />
          </div>
          <div className="flex flex-col gap-1 bg-panel px-4 py-2.5">
            {FINDING_LINES.map((line, index) => (
              <div key={index} className="flex items-baseline gap-3">
                <span className="w-4 flex-none text-end font-code text-[10px] leading-[18px] text-neutral-600 tabular-nums">
                  {index + 1}
                </span>
                <span
                  className={
                    index === 0
                      ? "font-code text-[12px] leading-[18px] text-neutral-400"
                      : "font-code text-[12px] leading-[18px] text-neutral-600"
                  }
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── copilot answer (ds:AssistantMessage) ─────────────────── */}
        <section className="mt-3.5 flex-none">
          <div className="flex items-baseline gap-2">
            <SectionLabel>copilot · final answer</SectionLabel>
            <span className="font-code text-[10px] text-neutral-600">
              run 4471 · 38 s
            </span>
          </div>

          {/* user prompt echo */}
          <div className="ms-auto mt-1.5 max-w-[85%] rounded-lg border border-solid border-default-border bg-panel px-3 py-1.5 text-[13px] leading-[20px] text-neutral-300">
            תרוצו את מטריצת הקונטרסט המלאה על הערכה הכהה בכיוון RTL, ותגידו לי
            מה עולה הלילה לפני רכבת השחרור של 04:00 UTC.
          </div>

          <div className="mt-3">
            <AssistantMessage>
              <AssistantMessage.Paragraph>
                The right-to-left dark-theme audit is complete: fourteen
                low-contrast nodes were found across the library, eleven are
                patched on this branch, and the remaining three are tracked as
                follow-ups before the 04:00 UTC release train departs.
              </AssistantMessage.Paragraph>
              <AssistantMessage.List
                items={[
                  "Raised AssistantMessage.Quote from 3.9:1 to 5.2:1 on neutral-900 canvases across all six dark themes",
                  "EditorTab inactive labels moved from neutral-500 to neutral-600 — 4.6:1 at 13px mono, above the AA floor",
                  "Re-verified mirrored layouts at 390px, 768px and 1440px with dir=rtl enabled end-to-end in Playwright",
                  "Filed a P3 follow-up: hairline tab separators vanish at 150% zoom on HiDPI tablets — needs a 2px variant",
                ]}
              />
              <AssistantMessage.Quote>
                WCAG 2.1 AA requires 4.5:1 for normal text and 3:1 for large
                text. Mirrored layouts must re-run the full contrast matrix,
                because hairlines and shadows do not flip with direction.
              </AssistantMessage.Quote>
              <AssistantMessage.Paragraph>
                Ready to ship — pick a publish action below and I will tag the
                build and open the Hebrew release-note draft.
              </AssistantMessage.Paragraph>
            </AssistantMessage>
          </div>
        </section>

        {/* ── publish action (ui:radio-group choice cards) ────────── */}
        <section className="mt-4 flex-none border-t border-solid border-default-border pt-3">
          <div className="flex items-baseline gap-2">
            <SectionLabel>publish action</SectionLabel>
            <span className="font-code text-[10px] text-neutral-600">
              fix/rtl-contrast-matrix · 11 commits
            </span>
          </div>
          <RadioGroup defaultValue="train" className="mt-2">
            <FieldLabel htmlFor="act-staging" className="cursor-pointer">
              <Field
                orientation="horizontal"
                className="rounded-lg border border-solid border-default-border bg-panel px-3.5 py-2.5"
              >
                <FieldContent>
                  <FieldTitle>Publish to staging tonight</FieldTitle>
                  <FieldDescription>
                    Push the eleven contrast patches to staging now and run the
                    full axe-core sweep against every mirrored layout before
                    the rest of the team wakes up.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="staging" id="act-staging" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="act-train" className="cursor-pointer">
              <Field
                orientation="horizontal"
                className="rounded-lg border border-solid border-default-border bg-panel px-3.5 py-2.5"
              >
                <FieldContent>
                  <FieldTitle>Hold for the 04:00 UTC release train</FieldTitle>
                  <FieldDescription>
                    Keep the branch queued until the overnight train so the
                    RTL locale QA crew in Tel Aviv can smoke-test during their
                    morning standup — no hotfix on a Friday.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="train" id="act-train" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="act-hold" className="cursor-pointer">
              <Field
                orientation="horizontal"
                className="rounded-lg border border-solid border-default-border bg-panel px-3.5 py-2.5"
              >
                <FieldContent>
                  <FieldTitle>Hold for human accessibility review</FieldTitle>
                  <FieldDescription>
                    Keep everything local and request a second pair of eyes
                    from Noa&apos;s accessibility guild before anything leaves
                    the building — the P3 zoom finding worries her.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="hold" id="act-hold" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </section>

        {/* ── footer hints ─────────────────────────────────────────── */}
        <footer className="mt-auto flex flex-none items-center justify-between pt-2.5 font-code text-[10px] text-neutral-600">
          <span>⌘↵ publish · esc hold · ⇥ next pane</span>
          <span>praxis ds · v4.7.0 · dark · rtl</span>
        </footer>
      </div>
    </EvalShell>
  );
}
