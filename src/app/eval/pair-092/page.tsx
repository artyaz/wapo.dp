"use client";

/**
 * pair-092 — "Vela" release-copilot chat sheet (dark, 390×420, ltr, no-scroll).
 *
 * A compact bottom-sheet conversation occupying the lower half of a phone:
 * a slim app bar, the transcript (vertical ScrollArea) holding the user's
 * question and the assistant's structured verdict (AssistantMessage with a
 * paragraph, a bullet list and a policy quote), a horizontally scrollable
 * row of suggested follow-ups (ScrollArea + always-visible horizontal
 * ScrollBar), and a chat composer built from InputGroup (attach addon,
 * input, send button). Everything fits the 420px viewport with no page scroll.
 */

import React from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AssistantMessage } from "@/components/ds/AssistantMessage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const SUGGESTIONS = [
  "Show flaky e2e details",
  "Draft release notes",
  "Open rollback plan",
  "Compare v2.6 → v2.7",
  "Ping SRE on-call",
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Sheet header */}
        <header className="flex h-10 shrink-0 items-center gap-2.5 border-b border-border px-4">
          <div className="flex size-6 items-center justify-center rounded-md border border-border bg-primary/10">
            <Sparkles className="size-3.5" />
          </div>
          <div className="flex min-w-0 flex-col leading-none">
            <span className="text-[13px] font-semibold tracking-tight">
              Vela
            </span>
            <span className="mt-1 text-[10px] text-muted-foreground">
              release copilot
            </span>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            v2.7 · ready
          </span>
        </header>

        {/* Transcript */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-2.5 px-4 py-3">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-neutral-800 px-3.5 py-2 text-[13px] leading-[18px] text-neutral-100">
                Can we ship v2.7 to prod tonight?
              </p>
            </div>

            <AssistantMessage className="gap-3">
              <AssistantMessage.Paragraph>
                Yes — v2.7 is green except one flaky e2e test. CI is 47/48 and
                the retry passes locally.
              </AssistantMessage.Paragraph>
              <AssistantMessage.List
                items={[
                  "Bundle size down 6% vs v2.6",
                  "No new accessibility issues",
                  "Changelog drafted — 3 entries",
                ]}
              />
              <AssistantMessage.Quote>
                The prod-deploy gate requires 48/48 green checks.
              </AssistantMessage.Quote>
            </AssistantMessage>
          </div>
        </ScrollArea>

        {/* Suggested follow-ups + composer dock */}
        <div className="shrink-0 border-t border-border">
          <ScrollArea type="always" className="h-12">
            <div className="flex w-max items-center gap-2 px-3 pt-0.5">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="flex h-9 shrink-0 items-center rounded-full border border-border bg-card px-3.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="border-t border-border/60 p-2.5">
            <InputGroup className="h-11 rounded-lg">
              <InputGroupAddon>
                <Paperclip className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Ask about the release…"
                aria-label="Message Vela"
              />
              <InputGroupButton
                size="icon"
                variant="default"
                align="end"
                aria-label="Send message"
                className="me-1"
              >
                <ArrowUp />
              </InputGroupButton>
            </InputGroup>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
