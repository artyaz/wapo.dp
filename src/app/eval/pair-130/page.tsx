"use client";

import React from "react";
import {
  ArrowLeftIcon,
  ClockIcon,
  FileTextIcon,
  FileWarningIcon,
  MicIcon,
  PaperclipIcon,
  RefreshCwIcon,
  SendIcon,
  ThumbsUpIcon,
  UploadIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";
import { Toggle } from "@/components/ui/toggle";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-dvh w-full max-w-md flex-col bg-background text-foreground">
        {/* Room header */}
        <header className="flex shrink-0 items-center gap-3 border-b border-input px-4 py-3">
          <ArrowLeftIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium leading-tight">
              Praxis Launch Room
            </p>
            <p className="text-xs text-muted-foreground">
              12 members · 3 online
            </p>
          </div>
          <UsersIcon className="size-4 shrink-0 text-muted-foreground" />
        </header>

        {/* Transcript */}
        <main className="flex min-h-0 flex-1 flex-col justify-end gap-4 overflow-hidden px-3 py-4">
          <p className="text-center text-[11px] text-muted-foreground">
            Today · 9:41 AM
          </p>

          <BubbleGroup className="gap-2">
            {/* Maya shares the deck */}
            <Bubble
              variant="secondary"
              align="start"
              className="w-[88%] max-w-[300px] gap-1.5"
            >
              <BubbleContent>
                Morning! The deck for tomorrow&apos;s launch review is ready.
              </BubbleContent>
              <Attachment state="done" size="sm">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>launch-review-deck.pdf</AttachmentTitle>
                  <AttachmentDescription>
                    Uploaded · 4.2 MB
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove launch-review-deck.pdf">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </Bubble>

            {/* Maya asks for notes */}
            <Bubble variant="secondary" align="start" className="max-w-[300px]">
              <BubbleContent>
                Notes on positioning belong on page 4 — please add yours.
              </BubbleContent>
              <BubbleReactions role="img" aria-label="2 thumbs up">
                <ThumbsUpIcon className="size-3" />
                <span>2</span>
              </BubbleReactions>
            </Bubble>

            {/* Your reply + failed upload */}
            <Bubble variant="primary" align="end" className="max-w-[300px]">
              <BubbleContent>On it — updating the pricing table now.</BubbleContent>
            </Bubble>

            <Bubble variant="primary" align="end" className="w-[88%] max-w-[300px]">
              <Attachment state="error" size="sm">
                <AttachmentMedia>
                  <FileWarningIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>pricing-notes-v2.docx</AttachmentTitle>
                  <AttachmentDescription>
                    Upload failed · over 10 MB limit
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Retry upload of pricing-notes-v2.docx">
                    <RefreshCwIcon />
                  </AttachmentAction>
                  <AttachmentAction aria-label="Remove pricing-notes-v2.docx">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </Bubble>

            <Bubble variant="primary" align="end" className="max-w-[300px]">
              <BubbleContent>
                Compressing it — smaller version in a minute.
              </BubbleContent>
            </Bubble>
          </BubbleGroup>
        </main>

        {/* Composer (files tray open: the Files toggle is pressed) */}
        <footer className="shrink-0 border-t border-input px-3 py-3">
          <AttachmentTrigger className="mb-2 h-8 text-xs">
            <UploadIcon />
            Drop files here or click to attach
          </AttachmentTrigger>

          <div className="flex items-center gap-2">
            <Toggle
              variant="outline"
              size="sm"
              defaultPressed
              aria-label="Toggle files tray"
            >
              <PaperclipIcon />
              Files
            </Toggle>
            <Toggle
              variant="outline"
              size="sm"
              aria-label="Toggle voice message mode"
            >
              <MicIcon />
              Voice
            </Toggle>
            <Toggle
              variant="outline"
              size="sm"
              disabled
              aria-label="Schedule send, disabled until a draft exists"
            >
              <ClockIcon />
              Schedule
            </Toggle>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-9 min-w-0 flex-1 items-center rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground">
              Message the room…
            </div>
            <button
              type="button"
              aria-label="Send message"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
              <SendIcon className="size-4" />
            </button>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
