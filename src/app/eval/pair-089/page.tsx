"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { ThoughtHeader } from "@/components/ds/ThoughtHeader";
import { Slider } from "@/components/ui/slider";
import { Typography } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
} from "lucide-react";

/** Reasoning-log line, styled after the ThoughtHeader demo. */
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
            ? "mt-[7px] h-[5px] w-[5px] flex-none rounded-full bg-neutral-600"
            : "mt-[6px] h-[7px] w-[7px] flex-none animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-neutral-400 motion-reduce:animate-none"
        }
      />
      <p
        className={
          state === "done"
            ? "min-w-0 text-[13px] leading-[20px] text-neutral-400"
            : "min-w-0 text-[13px] leading-[20px] text-neutral-200"
        }
      >
        {children}
      </p>
    </div>
  );
}

const STEPS = ["Workspace", "Assistant", "Integrations", "Review"];
const CURRENT_STEP = 1;

function Stepper() {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((step, index) => {
        const done = index < CURRENT_STEP;
        const current = index === CURRENT_STEP;
        return (
          <React.Fragment key={step}>
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="h-px w-6 flex-none bg-neutral-800"
              />
            ) : null}
            <li className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={
                  done
                    ? "flex size-4 flex-none items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-neutral-400"
                    : current
                      ? "flex size-4 flex-none items-center justify-center rounded-full border border-neutral-500 bg-neutral-100 text-neutral-900"
                      : "flex size-4 flex-none items-center justify-center rounded-full border border-neutral-800 text-neutral-600"
                }
              >
                {done ? (
                  <CheckIcon className="size-2.5" />
                ) : (
                  <span
                    className={
                      current
                        ? "size-1.5 rounded-full bg-neutral-900"
                        : "size-1 rounded-full bg-neutral-700"
                    }
                  />
                )}
              </span>
              <span
                className={
                  current
                    ? "text-[11.5px] font-medium text-neutral-200"
                    : "text-[11.5px] text-neutral-500"
                }
              >
                {step}
              </span>
            </li>
          </React.Fragment>
        );
      })}
    </ol>
  );
}

function automationLabel(value: number): string {
  if (value < 25) return "Suggest only";
  if (value < 50) return "Cautious";
  if (value < 75) return "Balanced";
  return "Autonomous";
}

export default function Page() {
  const [automation, setAutomation] = React.useState<number[]>([65]);
  const [digest, setDigest] = React.useState<number[]>([3, 12]);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col px-8 py-6 text-foreground">
        {/* ---- wizard chrome ---- */}
        <header className="flex items-center justify-between gap-6 border-b border-border pb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 flex-none items-center justify-center rounded-lg border border-border bg-muted/60">
              <SparklesIcon className="size-4 text-neutral-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Praxis Studio
              </p>
              <p className="text-[12.5px] font-medium text-neutral-300">
                Workspace onboarding
              </p>
            </div>
          </div>
          <Stepper />
        </header>

        {/* ---- step body ---- */}
        <main className="mt-6 grid flex-1 grid-cols-1 gap-8 md:grid-cols-[7fr_5fr]">
          {/* left — what this step does, typeset as document copy */}
          <section className="flex min-w-0 flex-col">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Step 2 of 4 · Preferences
            </p>
            <Typography variant="docs" className="mt-3 max-w-[54ch]">
              <h2>Assistant &amp; automation</h2>
              <p>
                During setup, the assistant can either suggest every change for
                your approval, or apply the safe ones immediately — token
                imports, digest schedules and notification defaults. You can
                retune this at any time from{" "}
                <em>Workspace settings → Automation</em>.
              </p>
              <ul>
                <li>
                  Imports your design tokens and registers the component
                  library
                </li>
                <li>Schedules the weekly digest email for Monday mornings</li>
                <li>Keeps every applied change reversible for 30 days</li>
              </ul>
              <blockquote>
                Nothing leaves your workspace — the assistant runs locally and
                records each action in the <code>activity log</code>.
              </blockquote>
            </Typography>

            <nav className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-neutral-300 transition-colors hover:border-neutral-700 hover:text-neutral-100"
              >
                <ArrowLeftIcon className="size-3.5" />
                Back
              </button>
              <p className="text-[11px] text-muted-foreground">
                Changes take effect when the wizard finishes
              </p>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3.5 py-2 text-[13px] font-medium text-neutral-900 transition-colors hover:bg-white"
              >
                Continue
                <ArrowRightIcon className="size-3.5" />
              </button>
            </nav>
          </section>

          {/* right — assistant trace + tuning controls */}
          <aside className="flex min-w-0 flex-col gap-5">
            <section className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-neutral-300">
                  Setup assistant
                </h3>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  1m 34s total
                </span>
              </div>
              <ThoughtHeader label="Prepared this step for 1m 12s" defaultOpen>
                <div className="flex flex-col gap-2.5">
                  <LogLine state="done">
                    Read your workspace profile — 14 collaborators, 3 connected
                    repositories, tokens last synced in March
                  </LogLine>
                  <LogLine state="done">
                    Drafted automation defaults and a weekly digest schedule
                    based on the team&apos;s activity
                  </LogLine>
                  <LogLine state="active">
                    Waiting on the tuning sliders before applying anything
                  </LogLine>
                </div>
              </ThoughtHeader>
              <div className="mt-4">
                <ThoughtHeader label="Verified SSO &amp; role mapping · 22s" />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-neutral-300">
                  Assistant tuning
                </h3>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  applies to this workspace
                </span>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="wizard-automation">Automation level</Label>
                    <span className="text-[12px] tabular-nums text-neutral-400">
                      {automation[0]} · {automationLabel(automation[0])}
                    </span>
                  </div>
                  <Slider
                    id="wizard-automation"
                    value={automation}
                    onValueChange={(value) =>
                      setAutomation(value as number[])
                    }
                    min={0}
                    max={100}
                    step={5}
                    aria-label="Automation level"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Suggest only</span>
                    <span>Fully autonomous</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="wizard-digest">Weekly digest size</Label>
                    <span className="text-[12px] tabular-nums text-neutral-400">
                      {digest[0]}–{digest[1]} of 20 items
                    </span>
                  </div>
                  <Slider
                    id="wizard-digest"
                    value={digest}
                    onValueChange={(value) => setDigest(value as number[])}
                    min={0}
                    max={20}
                    step={1}
                    aria-label="Weekly digest size range"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    How much activity lands in the Monday summary email
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
