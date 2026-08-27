"use client";

/**
 * EVAL page pair-013 — components: ds:UserMessage, ui:Skeleton, ui:Alert
 * Conditions: 768x1024 portrait tablet, dark theme, ltr, no constraint.
 * Scenario: Design Copilot chat panel — the connection dropped mid-reply, so
 * the copilot's streaming answer is frozen as a skeleton, the user's
 * follow-up is queued, and a reconnect alert sits above the composer.
 */

import React from "react";
import {
  Clock3Icon,
  HistoryIcon,
  PaperclipIcon,
  SendIcon,
  SparklesIcon,
  WifiOffIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { UserMessage } from "@/components/ds/UserMessage";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[680px] flex-col gap-4 p-6">
        {/* Panel header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800">
              <SparklesIcon className="size-5 text-neutral-300" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">
                Design Copilot
              </h1>
              <p className="text-xs text-neutral-400">
                Praxis DS · thread #214 · qa/contrast-fix
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Thread history">
            <HistoryIcon />
          </Button>
        </header>

        {/* Transcript */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-neutral-800" />
            <span className="text-[11px] uppercase tracking-wide text-neutral-500">
              Today · 09:38
            </span>
            <span className="h-px flex-1 bg-neutral-800" />
          </div>

          {/* Copilot's earlier reply — plain assistant text (supporting chrome) */}
          <div className="flex max-w-[78%] flex-col gap-1">
            <span className="text-[11px] text-neutral-500">Design Copilot</span>
            <p className="text-sm leading-[22px] text-neutral-300">
              Morning — the branch is up to date and the chat surfaces are
              staged. Where would you like me to start?
            </p>
          </div>

          <UserMessage>
            Audit the chat components for contrast issues and fix anything
            that falls below 4.5 to 1 — then push the branch when you are done.
          </UserMessage>

          {/* Copilot reply, frozen mid-stream while offline */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-neutral-500">
              Design Copilot · replying…
            </span>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-[240px]" />
                <Skeleton className="h-4 w-[180px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </div>
          </div>

          {/* Queued follow-up */}
          <div className="flex flex-col items-end gap-1">
            <UserMessage density="compact">
              How long will the audit take?
            </UserMessage>
            <span className="flex items-center gap-1 pr-1 text-[11px] text-neutral-500">
              <Clock3Icon className="size-3" />
              Queued — will send when reconnected
            </span>
          </div>
        </div>

        {/* Reconnect notice */}
        <Alert>
          <WifiOffIcon />
          <AlertTitle>Connection lost</AlertTitle>
          <AlertDescription>
            The copilot&apos;s reply was interrupted. It will resume as soon as
            you are back online.
          </AlertDescription>
          <AlertAction>
            <Button size="xs" variant="outline">
              Retry
            </Button>
          </AlertAction>
        </Alert>

        {/* Composer */}
        <footer className="flex items-center gap-2">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4">
            <PaperclipIcon className="size-4 text-neutral-500" />
            <span className="text-sm text-neutral-500">
              Message Design Copilot…
            </span>
          </div>
          <Button size="icon" variant="secondary" aria-label="Send">
            <SendIcon />
          </Button>
        </footer>
      </div>
    </EvalShell>
  );
}
