"use client";

import React from "react";
import { Trash2Icon } from "lucide-react";
import { EvalShell } from "@/eval/EvalShell";
import * as SubframeCore from "@/lib/subframe/core";
import { Drawer } from "@/components/ds/Drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";

/**
 * pair-108 — Praxis Desk support inbox on a laptop window (1024×768, light, ltr).
 *
 * Scenario: an agent reviews an escalated support session. The read-only
 * transcript (ui:bubble) sits beneath a right-anchored session-details sheet
 * (ds:Drawer); its "Delete transcript" action has just raised the destructive
 * confirmation dialog (ui:alert-dialog), which is open over the workspace.
 */

const SESSION_ROWS = [
  { label: "Customer", value: "Nadia Reyes · Pro workspace" },
  { label: "Channel", value: "Email → live chat escalation" },
  { label: "Started", value: "Aug 14, 2025 · 09:12 UTC" },
  { label: "Duration", value: "42 min · 11 messages" },
  { label: "Satisfaction", value: "Pending — awaiting confirmation" },
];

export default function Page() {
  const [mounted, setMounted] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [confirmOpen, setConfirmOpen] = React.useState(true);

  // vaul's Drawer.Content touches `document` during render — mount it
  // client-side only so prerender doesn't throw.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col gap-4 p-6">
        {/* ── app bar ──────────────────────────────────────────────── */}
        <header className="flex flex-none items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-sm font-semibold">
              P
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                Praxis Desk
              </span>
              <span className="text-xs text-muted-foreground">
                Support inbox / Conversations
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-border bg-background py-1 pl-1 pr-3.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-muted text-[11px] font-medium">
              AO
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-medium leading-tight">
                Amara Okafor
              </span>
              <span className="text-[10px] text-muted-foreground">
                On duty · 3 open sessions
              </span>
            </span>
          </div>
        </header>

        {/* ── workspace frame: transcript + details sheet ─────────── */}
        <main className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-xs">
          {/* read-only transcript, kept clear of the 320px sheet */}
          <div className="absolute inset-y-0 left-0 right-[352px] flex flex-col gap-5 px-8 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-semibold tracking-tight">
                  Scheduled export failing since Tuesday
                </h1>
                <p className="text-sm text-muted-foreground">
                  Nadia Reyes · Pro workspace · escalated from email
                </p>
              </div>
              <span className="mt-0.5 flex-none rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                Open
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                Today · 09:12 – 09:54 UTC
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-3">
              <BubbleGroup>
                <Bubble variant="muted">
                  <BubbleContent>
                    Hi Nadia — I&apos;ve looked into the connector. The
                    scheduled export stopped right after your security team
                    rotated the workspace API keys on Tuesday.
                  </BubbleContent>
                </Bubble>
              </BubbleGroup>

              <BubbleGroup>
                <Bubble align="end">
                  <BubbleContent>
                    That&apos;s right — every key in the workspace was rotated.
                  </BubbleContent>
                </Bubble>
                <Bubble align="end">
                  <BubbleContent>
                    Nobody mentioned the nightly export would break.
                  </BubbleContent>
                </Bubble>
              </BubbleGroup>

              <BubbleGroup>
                <Bubble variant="muted">
                  <BubbleContent>
                    All set — I&apos;ve re-linked the connector to the new key
                    and queued a manual run. Your 06:00 export should be back
                    on schedule tomorrow.
                  </BubbleContent>
                  <BubbleReactions aria-label="Reaction: thumbs up">
                    <span>👍</span>
                  </BubbleReactions>
                </Bubble>
              </BubbleGroup>

              <BubbleGroup>
                <Bubble align="end">
                  <BubbleContent>
                    Amazing — thank you! I&apos;ll confirm after tomorrow&apos;s
                    run.
                  </BubbleContent>
                </Bubble>
              </BubbleGroup>

              <BubbleGroup>
                <Bubble variant="muted">
                  <BubbleContent>
                    Perfect. I&apos;ll keep this session open until you confirm.
                  </BubbleContent>
                </Bubble>
              </BubbleGroup>
            </div>
          </div>

          {/* session details sheet over its own scrim */}
          {mounted && (
            <Drawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              direction="right"
              modal={false}
            >
              <Drawer.Content aria-describedby={undefined}>
                <div className="flex h-full w-[320px] max-w-full flex-col items-start gap-6 p-6">
                  <div className="flex w-full flex-col items-start gap-1.5">
                    <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
                      Session details
                    </SubframeCore.Drawer.Title>
                    <span className="text-caption font-caption text-neutral-500">
                      Session #4821 · escalated from email
                    </span>
                  </div>

                  <div className="flex w-full flex-col items-start">
                    {SESSION_ROWS.map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex w-full flex-col items-start gap-1 border-t border-solid border-default-border py-3 first:border-t-0 first:pt-0 last:pb-0"
                      >
                        <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                          {label}
                        </span>
                        <span className="text-body font-body text-default-font">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex w-full flex-col gap-3 border-t border-solid border-default-border pt-5">
                    <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
                      Transcript
                    </span>
                    <AlertDialog
                      open={confirmOpen}
                      onOpenChange={setConfirmOpen}
                    >
                      <AlertDialogTrigger
                        render={
                          <Button
                            variant="destructive"
                            className="w-full"
                          >
                            <Trash2Icon /> Delete transcript
                          </Button>
                        }
                      />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                          </AlertDialogMedia>
                          <AlertDialogTitle>
                            Delete this transcript?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This permanently removes session #4821, its 11
                            messages and the attached export logs from the
                            workspace archive. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel variant="outline">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction variant="destructive">
                            Delete transcript
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <span className="text-caption font-caption text-neutral-500">
                      Drag the sheet left or press Escape to dismiss.
                    </span>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer>
          )}
        </main>
      </div>
    </EvalShell>
  );
}
