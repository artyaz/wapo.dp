"use client";

/**
 * EVAL page (pair-075) — "relay console · session #4471 recap" on a tiny phone.
 * Components: ds:ActivityEvent, ui:resizable, ds:UserMessage.
 * Conditions: 320x480 (phone-tiny), dark theme, ltr, no constraint.
 *
 * Story: an agent reviews a finished deploy-bot session on their phone. The
 * screen splits vertically: the user's chat prompts (UserMessage, quiet light
 * insets on the dark canvas) above, the session activity timeline
 * (ActivityEvent — comment, system, email) below, with a draggable
 * ResizableHandle to trade space between transcript and log.
 */

import React from "react";
import { HistoryIcon, MessageSquareIcon, TerminalIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { ActivityEvent } from "@/components/ds/ActivityEvent";
import { UserMessage } from "@/components/ds/UserMessage";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-dvh w-full flex-col overflow-hidden">
        {/* session header */}
        <header className="flex h-11 flex-none items-center gap-2 border-b border-solid border-default-border px-3">
          <TerminalIcon className="size-4 flex-none text-neutral-500" />
          <span className="min-w-0 flex-1 truncate font-body text-[13px] font-[600] leading-[20px] text-default-font">
            relay · session #4471
          </span>
          <span className="flex-none rounded-full border border-solid border-default-border px-2 py-[2px] font-caption text-caption text-neutral-500">
            exported
          </span>
        </header>

        {/* transcript ↔ activity split */}
        <ResizablePanelGroup direction="vertical" className="min-h-0 flex-1">
          {/* chat transcript — the user's prompts */}
          <ResizablePanel defaultSize={48} minSize={25} className="bg-panel">
            <div className="flex h-full flex-col gap-2 overflow-hidden px-3 py-2.5">
              <div className="flex flex-none items-center gap-1.5 font-caption text-caption text-neutral-500">
                <MessageSquareIcon className="size-3" />
                Chat · deploy bot
              </div>
              <UserMessage>
                Run the staging deploy, then export the transcript.
              </UserMessage>
              <UserMessage>Tail the logs too.</UserMessage>
              <UserMessage density="compact">Ship it.</UserMessage>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* session activity timeline */}
          <ResizablePanel defaultSize={52} minSize={25}>
            <div className="flex h-full flex-col overflow-hidden px-3 pb-2 pt-2">
              <div className="mb-0.5 flex flex-none items-center gap-1.5 font-caption text-caption text-neutral-500">
                <HistoryIcon className="size-3" />
                Activity
              </div>
              <ActivityEvent
                author="Indexer"
                timestamp="09:41:07"
                body="Transcript indexed — 12,408 tokens."
                isFirst
              />
              <ActivityEvent variant="system" body="Export queued → batch #4471" />
              <ActivityEvent
                variant="email"
                subject="ops@northwind"
                timestamp="09:44:52"
                body="Access granted — expires in 30 days."
                isLast
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </EvalShell>
  );
}
