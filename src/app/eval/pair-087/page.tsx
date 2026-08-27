"use client";

/**
 * pair-087 — kanban board card detail (dark, 768×1024 portrait tablet, ltr).
 *
 * An engineer taps a card on the Launch board and lands on its detail page:
 * a top bar with the board breadcrumb, a card header row that pairs the card
 * id + a live "In Progress" StatusBadge with a Menubar command strip
 * (Card / View / Automations), then an EntityTabs strip over the Details
 * panel — description, field grid, and a "Linked checks" block whose rows
 * carry success / warning / idle StatusBadges.
 */

import React from "react";
import {
  Archive,
  ArrowLeft,
  Link2,
  MoveRight,
  Settings2,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { EntityTabs } from "@/components/ds/EntityTabs";
import { StatusBadge } from "@/components/ds/StatusBadge";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FIELDS: Array<{ label: string; value: string }> = [
  { label: "Assignee", value: "Mara Osei" },
  { label: "Reporter", value: "Jonas Park" },
  { label: "Column", value: "In Progress · wip 3/5" },
  { label: "Due", value: "Fri, Mar 21" },
  { label: "Estimate", value: "5 points" },
  { label: "Watchers", value: "3 members" },
];

const CHECKS: Array<{
  name: string;
  detail: string;
  tone: "success" | "warning" | "idle";
  label: string;
}> = [
  {
    name: "CI pipeline",
    detail: "run #4821 · 2 min ago · 14 checks",
    tone: "success",
    label: "Passing",
  },
  {
    name: "Staging deploy",
    detail: "rollout paused at 60% · p99 840 ms",
    tone: "warning",
    label: "Degraded",
  },
  {
    name: "Preview build",
    detail: "stale since Monday · no open sessions",
    tone: "idle",
    label: "Idle",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Top bar — board breadcrumb */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card/40 px-5">
          <button
            type="button"
            aria-label="Back to Launch Board"
            className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="text-sm font-semibold tracking-tight">
            Launch Board
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-sm text-muted-foreground">Sprint 14</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-mono text-xs text-muted-foreground">
            CARD-2071
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-medium text-muted-foreground">
              MO
            </div>
            <div className="flex size-6 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-medium text-muted-foreground">
              NR
            </div>
            <div className="flex size-6 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-medium text-muted-foreground">
              +1
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[688px] flex-1 flex-col px-5 pb-10 pt-6">
          {/* Card header — id, live status, command strip */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                CARD-2071
              </span>
              <StatusBadge tone="live">In Progress</StatusBadge>
            </div>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Card</MenubarTrigger>
                <MenubarContent className="w-56">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <MoveRight />
                      Move to
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarRadioGroup value="in-progress">
                        <MenubarRadioItem value="backlog">
                          Backlog
                        </MenubarRadioItem>
                        <MenubarRadioItem value="in-progress">
                          In Progress
                        </MenubarRadioItem>
                        <MenubarRadioItem value="review">
                          In Review
                        </MenubarRadioItem>
                        <MenubarRadioItem value="done">Done</MenubarRadioItem>
                      </MenubarRadioGroup>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <Link2 />
                    Copy link
                    <MenubarShortcut>⌘L</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem variant="destructive">
                    <Archive />
                    Archive card
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent className="w-56">
                  <MenubarCheckboxItem checked>
                    Show subtasks
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem>
                    Show empty fields
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked>
                    Compact density
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarItem inset>
                    Reload preview
                    <MenubarShortcut>⌘R</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Automations</MenubarTrigger>
                <MenubarContent className="w-60">
                  <MenubarCheckboxItem checked>
                    Auto-link CI runs
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked>
                    Notify watchers on move
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem>
                    Escalate when due date slips
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Settings2 />
                    Manage automations…
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          {/* Title + meta */}
          <h1 className="mt-4 text-xl font-semibold tracking-tight">
            Fix checkout latency spike before Friday cutoff
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[9px] font-medium text-muted-foreground">
                MO
              </span>
              Mara Osei
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span>Due Fri, Mar 21</span>
            <span className="text-muted-foreground/40">·</span>
            <span>5 points</span>
            <span className="text-muted-foreground/40">·</span>
            <span>moved from Backlog 2 days ago</span>
          </p>

          {/* Record tabs over the detail panel */}
          <div className="mt-6">
            <EntityTabs />
          </div>

          {/* Details tab content */}
          <div className="flex flex-col gap-7 pt-5">
            <section>
              <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Description
              </h2>
              <p className="max-w-[62ch] text-[13px] leading-relaxed text-foreground/80">
                Checkout p99 crossed 1.2 s during yesterday&apos;s flash sale.
                Trace points to a synchronous inventory lookup added in
                #4791 — this card covers moving it behind the cache and
                adding a regression budget to the release gate.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Fields
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                {FIELDS.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-baseline justify-between gap-3 border-b border-dashed border-border/60 pb-2"
                  >
                    <span className="text-[12px] text-muted-foreground">
                      {field.label}
                    </span>
                    <span className="text-right text-[12px] text-foreground/90">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Linked checks
              </h2>
              <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                {CHECKS.map((check, index) => (
                  <div
                    key={check.name}
                    className={
                      "flex flex-wrap items-center justify-between gap-2 px-4 py-3" +
                      (index > 0 ? " border-t border-border" : "")
                    }
                  >
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-[13px] font-medium">
                        {check.name}
                      </span>
                      <span className="truncate font-mono text-[11px] text-muted-foreground">
                        {check.detail}
                      </span>
                    </div>
                    <StatusBadge tone={check.tone}>{check.label}</StatusBadge>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <p className="mt-8 border-t border-border pt-4 text-[11px] text-muted-foreground">
            Edited 2 hours ago by m.ohara · child records 12 · activity 47 ·
            audit 3
          </p>
        </main>
      </div>
    </EvalShell>
  );
}
