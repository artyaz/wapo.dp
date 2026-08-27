"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { EditorTab } from "@/components/ds/EditorTab";
import { Card } from "@/components/ds/Card";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, CircleDashed, X } from "lucide-react";

/**
 * Eval page pair-033 — "Release workspace" on a portrait tablet (768×1024).
 *
 * Scenario: a design-system maintainer reviews the release notes file in the
 * editor pane (EditorTab strip with active / split / dirty / trailing states),
 * hovers the release owner handle (@mira → HoverCard profile, forced open for
 * the screenshot), and reads the promotion checklist for build #482 in a Card
 * before promoting it to staging.
 */

const NOTE_LINES: React.ReactNode[] = [
  <span key="l1"># v2.4.0 — Liquid glass</span>,
  <span key="l3">- editor: tab strip gains split + dirty states</span>,
  <span key="l4">- tokens: migration to the new material system</span>,
  <span key="l5">- docs: hover previews for maintainer profiles</span>,
  <span key="l6">- card: quiet and interactive variants documented</span>,
  <span key="l7">- a11y: focus rings audited across overlays</span>,
  <span key="l8">- chore: bump plex-mono to 7.3</span>,
  <span key="l9">Preview build #482 is warming on staging;</span>,
  <span key="l10">promotion opens after two pending reviews.</span>,
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="min-h-screen bg-default-background px-10 py-10 font-body text-body text-default-font antialiased">
        <div className="mx-auto flex w-full max-w-[656px] flex-col gap-6">
          {/* page chrome */}
          <header className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <h1 className="text-heading-2 text-default-font">
                Release workspace
              </h1>
              <span className="font-code text-[11px] leading-[16px] text-neutral-400">
                praxis-ds / v2.4.0
              </span>
            </div>
            <p className="text-body-medium text-neutral-500">
              Review the notes and the owner sign-off, then promote build #482
              to staging.
            </p>
          </header>

          {/* editor window — EditorTab strip over the notes pane */}
          <section className="w-full overflow-hidden rounded-lg border border-solid border-default-border bg-default-background">
            <div className="flex w-full items-stretch">
              <EditorTab label="release-notes.md" glyph="¶" active split />
              <EditorTab label="changelog.tsx" glyph="ts" dirty />
              <EditorTab
                label="deploy.config"
                glyph="yml"
                trailing={
                  <X size={12} strokeWidth={2} className="text-neutral-400" />
                }
              />
              <div className="h-9 grow border-b border-solid border-default-border" />
            </div>
            <div className="flex flex-col gap-1 bg-panel px-4 py-3">
              {/* line 1 */}
              <div className="flex items-baseline gap-3">
                <span className="w-4 flex-none text-right font-code text-[10px] leading-[18px] text-neutral-400 tabular-nums">
                  1
                </span>
                <span className="font-code text-[12px] leading-[18px] text-neutral-600">
                  # v2.4.0 — Liquid glass
                </span>
              </div>
              {/* line 2 — the release owner handle carries the hover card */}
              <div className="flex items-baseline gap-3">
                <span className="w-4 flex-none text-right font-code text-[10px] leading-[18px] text-neutral-400 tabular-nums">
                  2
                </span>
                <span className="font-code text-[12px] leading-[18px] text-neutral-600">
                  Release owner:{" "}
                  <HoverCard open openDelay={0} closeDelay={0}>
                    <HoverCardTrigger
                      render={
                        <button
                          type="button"
                          className="cursor-pointer appearance-none bg-transparent p-0 font-code text-[12px] leading-[18px] text-default-font underline decoration-neutral-300 underline-offset-[3px] outline-none hover:decoration-neutral-500"
                        >
                          @mira
                        </button>
                      }
                    />
                    <HoverCardContent
                      side="bottom"
                      align="start"
                      sideOffset={6}
                      className="flex w-72 flex-col gap-2.5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="font-code text-[11px] text-neutral-600">
                            MK
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                          <span className="text-body-medium font-medium text-default-font">
                            Mira Kettunen
                          </span>
                          <span className="text-caption font-caption text-neutral-500">
                            Release owner · design systems
                          </span>
                        </div>
                      </div>
                      <p className="text-body-medium text-neutral-600">
                        Authored 14 of 21 commits in this release and signed
                        off on the token migration.
                      </p>
                      <div className="flex items-center justify-between border-t border-solid border-default-border pt-2.5">
                        <span className="text-caption font-caption text-neutral-400">
                          Joined Mar 2021
                        </span>
                        <span className="text-caption font-caption text-neutral-400">
                          14 commits · 2 reviews
                        </span>
                      </div>
                    </HoverCardContent>
                  </HoverCard>{" "}
                  · sign-off pending
                </span>
              </div>
              {/* remaining lines */}
              {NOTE_LINES.map((line, index) => (
                <div key={index} className="flex items-baseline gap-3">
                  <span className="w-4 flex-none text-right font-code text-[10px] leading-[18px] text-neutral-400 tabular-nums">
                    {index + 3}
                  </span>
                  <span className="font-code text-[12px] leading-[18px] text-neutral-600">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* promotion checklist — Card */}
          <Card
            header={
              <div className="flex w-full flex-col items-start gap-0.5">
                <span className="text-body-medium text-default-font">
                  Promote to staging · build #482
                </span>
                <span className="text-caption font-caption text-neutral-500">
                  praxis-ds · queued from main · 4 minutes ago
                </span>
              </div>
            }
            footer={
              <>
                <span className="text-caption font-caption text-neutral-400">
                  main @ a1b2c3d
                </span>
                <span className="text-caption font-caption text-neutral-400">
                  96s build · 214 checks passed
                </span>
              </>
            }
          >
            <p className="w-full text-body text-default-font">
              Compilation finished with no warnings and the preview URL is
              warm. Two checks are still pending review before this build can
              leave the queue.
            </p>
            <div className="flex w-full flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <Check size={14} strokeWidth={2} className="text-neutral-500" />
                <span className="text-body-medium text-neutral-600">
                  Unit suite — 214 passed, 0 flaky
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} strokeWidth={2} className="text-neutral-500" />
                <span className="text-body-medium text-neutral-600">
                  Visual snapshots — 48 of 48 matched
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDashed
                  size={14}
                  strokeWidth={2}
                  className="text-neutral-400"
                />
                <span className="text-body-medium text-neutral-500">
                  Preview smoke — 2 pending review
                </span>
              </div>
            </div>
          </Card>

          {/* quiet footer chrome */}
          <p className="text-caption font-caption text-neutral-400">
            Staging promotion requires two approvals · next window 16:00 UTC
          </p>
        </div>
      </div>
    </EvalShell>
  );
}
