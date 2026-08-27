"use client";

import React from "react";
import { Sparkles } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AssistantMessage } from "@/components/ds/AssistantMessage";
import { Sheet } from "@/components/ds/Sheet";
import { ActionTraces } from "@/components/ds/ActionTraces";
import * as SubframeCore from "@/lib/subframe/core";

/**
 * Scenario — "Agent run review" on a tiny 320×480 dark phone:
 * the assistant's contrast-audit summary sits on its paper chat canvas
 * (ds:AssistantMessage), a delivery sheet is docked over the scrim asking
 * whether to ship the branch (ds:Sheet), and the exact actions the agent
 * executed — skill load, shell command, API call — are the run log inside
 * the sheet (ds:ActionTraces). Everything fits the viewport: no scrolling.
 */
export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* Session header — quiet app chrome */}
        <header className="flex items-center gap-2.5 px-4 pb-2.5 pt-3">
          <span className="flex size-7 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel">
            <Sparkles className="size-3.5 text-default-font" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium leading-[17px] text-default-font">
              Contrast audit
            </p>
            <p className="truncate font-code text-[11px] leading-[14px] text-neutral-500">
              run #482 · finished · 2m
            </p>
          </div>
          <span className="flex flex-none items-center gap-1.5 rounded-full border border-solid border-default-border px-2 py-1">
            <span className="size-1.5 rounded-full bg-success-500" aria-hidden="true" />
            <span className="text-[11px] font-medium leading-none text-neutral-500">
              done
            </span>
          </span>
        </header>

        {/* The agent's deliverable on its paper chat canvas */}
        <section className="mx-3 mt-2.5 rounded-xl bg-neutral-900 p-4 shadow-default">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex size-6 flex-none items-center justify-center rounded-md bg-neutral-800 text-neutral-300">
                <Sparkles className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-[12px] font-medium text-neutral-300">
                Agent summary
              </span>
            </div>
            <span className="font-code text-[11px] leading-none text-neutral-400">
              09:41
            </span>
          </div>
          <AssistantMessage>
            <AssistantMessage.Paragraph>
              Audit finished — three fixes staged on fix/contrast-aa.
            </AssistantMessage.Paragraph>
            <AssistantMessage.List
              items={["12 labels raised to 4.5:1+", "Destructive captions at 4.8:1"]}
            />
            <AssistantMessage.Quote>
              WCAG 2.1 AA needs 4.5:1 for text.
            </AssistantMessage.Quote>
          </AssistantMessage>
        </section>

        {/* Delivery sheet — docked over the scrim, open in this static
            review state (non-modal, per the Sheet demo pattern) */}
        <Sheet open modal={false} className="absolute inset-0">
          <Sheet.Content
            aria-describedby={undefined}
            onPointerDownOutside={(event: Event) => event.preventDefault()}
            className="gap-3 px-4 py-4"
          >
            <SubframeCore.Dialog.Title className="w-full text-body-medium text-default-font">
              Run details · 3 actions
            </SubframeCore.Dialog.Title>
            <ActionTraces
              items={[
                { kind: "skill", label: "load skill charts/contrast-audit" },
                { kind: "command", label: "rg -n contrast src/components/ds" },
                { kind: "api", label: "POST /v1/reports — 201 (412ms)" },
              ]}
            />
            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                className="h-11 flex-1 cursor-pointer rounded-md border border-solid border-default-border text-caption font-caption text-default-font hover:opacity-90"
              >
                Review diff
              </button>
              <button
                type="button"
                className="h-11 flex-1 cursor-pointer rounded-md bg-default-font text-caption font-medium font-caption text-default-background hover:opacity-90"
              >
                Ship fixes
              </button>
            </div>
          </Sheet.Content>
        </Sheet>
      </div>
    </EvalShell>
  );
}
