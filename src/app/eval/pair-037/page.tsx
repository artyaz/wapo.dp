"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import {
  ChevronDownIcon,
  CopyIcon,
  LayersIcon,
  Link2Icon,
  MessageSquareIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react";

/**
 * pair-037 — "Atlas" docs review workspace (dark, 1440×900, ltr).
 *
 * A reviewer is reading "Liquid Glass Motion Guidelines" and has selected a
 * phrase in the document: the FloatingToolbar hovers glass-over-content above
 * the selection. The author byline in the document header has its HoverCard
 * profile open, and the right-hand inspector uses Collapsibles for document
 * details (open) and version history (collapsed), plus reviewer rows that are
 * themselves hover-card triggers.
 */

const REVIEWERS = [
  { initials: "MK", name: "Mara Kim", role: "Motion Engineer" },
  { initials: "JO", name: "Jonas Okafor", role: "Design Systems" },
  { initials: "SL", name: "Sofia Lind", role: "Accessibility" },
];

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card/40 px-6">
          <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-primary/10">
            <LayersIcon className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Atlas</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm text-muted-foreground">Docs</span>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share2Icon />
              Share
            </Button>
            <AvatarGroup>
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">DW</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">MK</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">JO</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </header>

        <main className="flex flex-1 items-start gap-6 p-6">
          {/* Document surface */}
          <article className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Chapter 3 · Motion
            </p>
            <h1 className="mb-3 text-[28px] font-semibold leading-tight tracking-tight">
              Liquid Glass Motion Guidelines
            </h1>

            {/* Byline — author hover card (forced open for the audit) */}
            <div className="mb-6 flex min-h-8 items-center gap-2.5">
              <HoverCard defaultOpen openDelay={100} closeDelay={200}>
                <HoverCardTrigger
                  render={
                    <Button
                      variant="link"
                      className="h-auto gap-1.5 px-0.5 text-sm font-medium"
                    />
                  }
                >
                  <Avatar size="sm">
                    <AvatarFallback className="text-[10px]">DW</AvatarFallback>
                  </Avatar>
                  Dana Whitfield
                </HoverCardTrigger>
                <HoverCardContent align="start" sideOffset={8} className="w-72">
                  <div className="flex items-start gap-3">
                    <Avatar size="lg">
                      <AvatarFallback>DW</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
                      <div className="text-sm font-semibold">
                        Dana Whitfield
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        @dana · Staff Product Designer
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Owns the glass motion language and this chapter. Ask her
                    about easing curves — just not before coffee.
                  </p>
                  <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span>
                      <strong className="font-semibold text-foreground">24</strong>{" "}
                      docs
                    </span>
                    <span>
                      <strong className="font-semibold text-foreground">156</strong>{" "}
                      reviews
                    </span>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <span className="text-sm text-muted-foreground">
                · Updated 2 h ago
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                In review
              </span>
            </div>

            <div className="mb-7 h-px bg-border" />

            <div className="space-y-7 text-[15px] leading-7 text-foreground/90">
              <p>
                Surfaces enter the viewport on a 200 ms ease-out curve and
                leave on a 150 ms ease-in. Nothing bounces and nothing spins —
                motion in Atlas communicates hierarchy, never personality.
              </p>
              <p>
                Durations cluster around three tokens — instant (80 ms) for
                hover and press feedback, quick (160 ms) for tooltips and
                popovers, and considered (240 ms) for sheets and page-level
                transitions. Anything longer has to justify itself in review,
                and if it survives, it graduates into a full choreography
                sequence with its own budget.
              </p>

              {/* Selected phrase with the floating toolbar above it */}
              <div className="relative">
                <div className="absolute -top-11 left-6 z-20">
                  <FloatingToolbar>
                    <FloatingToolbar.Action
                      glyph={<MessageSquareIcon size={13} />}
                      label="Comment"
                    />
                    <FloatingToolbar.Action
                      glyph={<Link2Icon size={13} />}
                      label="Link"
                    />
                    <FloatingToolbar.Action
                      glyph={<CopyIcon size={13} />}
                      label="Copy"
                    />
                    <FloatingToolbar.Rule />
                    <FloatingToolbar.Action
                      glyph={<Trash2Icon size={13} />}
                      label="Delete"
                      tone="destructive"
                    />
                  </FloatingToolbar>
                </div>
                <p>
                  The{" "}
                  <span className="rounded-[3px] bg-primary/25 px-0.5 box-decoration-clone">
                    reduced-motion fallbacks
                  </span>{" "}
                  swap every transition for a plain opacity crossfade when
                  prefers-reduced-motion is enabled, so hierarchy still reads
                  without any movement at all.
                </p>
              </div>

              <p>
                One last rule: the container always finishes before the content
                starts. Overlapping entrances read as chaos, and chaos is the
                one thing this system is not allowed to be.
              </p>
            </div>
          </article>

          {/* Inspector panel */}
          <aside className="w-[340px] shrink-0 rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Overview</h2>
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                v0.9
              </span>
            </div>

            <Collapsible defaultOpen>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group/button mb-1 w-full justify-between px-2.5 font-medium"
                  >
                    Document details
                    <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/button:rotate-180" />
                  </Button>
                }
              />
              <CollapsibleContent className="px-2.5 pb-2">
                <DetailRow label="Status" value="In review" />
                <DetailRow label="Owner" value="D. Whitfield" />
                <DetailRow label="Scope" value="Chapter 3 · Motion" />
                <DetailRow label="Last edit" value="2 h ago" />
                <DetailRow label="Progress" value="3 of 5 sections" />
              </CollapsibleContent>
            </Collapsible>

            <div className="my-1 h-px bg-border" />

            <Collapsible>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group/button my-1 w-full justify-between px-2.5 font-medium"
                  >
                    Version history
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                        12
                      </span>
                      <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/button:rotate-180" />
                    </span>
                  </Button>
                }
              />
              <CollapsibleContent className="px-2.5 pb-2">
                <div className="py-1.5 text-xs text-muted-foreground">
                  v0.9 — Motion tokens · 2 h ago
                </div>
                <div className="py-1.5 text-xs text-muted-foreground">
                  v0.8 — Glass surfaces · yesterday
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="my-4 h-px bg-border" />

            <p className="mb-2 px-2.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Reviewers
            </p>
            <div className="flex flex-col gap-1">
              {REVIEWERS.map((reviewer) => (
                <HoverCard key={reviewer.initials} openDelay={100} closeDelay={150}>
                  <HoverCardTrigger
                    render={
                      <button
                        type="button"
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent/60"
                      >
                        <Avatar size="sm">
                          <AvatarFallback className="text-[10px]">
                            {reviewer.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium">
                            {reviewer.name}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {reviewer.role}
                          </span>
                        </span>
                      </button>
                    }
                  />
                  <HoverCardContent align="start" sideOffset={6} className="w-64">
                    <div className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback>{reviewer.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <div className="truncate text-sm font-semibold">
                          {reviewer.name}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          {reviewer.role}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Left 4 notes on this chapter
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
