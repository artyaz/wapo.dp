"use client";

/**
 * EVAL page pair-004 — ui:avatar + ui:command + ui:progress
 * Conditions: viewport 1280x800, dark theme, direction rtl, constraint dense-content.
 * Scenario: RTL workspace "sprint command center" — team presence header,
 * inline quick-switcher (command palette) and a dense sprint-progress board.
 */

import React from "react";
import {
  AlertTriangleIcon,
  CheckIcon,
  GitMergeIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldAlertIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Progress } from "@/components/ui/progress";

const epics = [
  {
    initials: "NO",
    online: true,
    title: "Unified Customer Graph — Phase 2 of 3",
    meta: "Consolidate legacy CRM records, deduplicate 2.4M contacts and backfill enrichment attributes across regional tenants",
    value: 72,
    status: "On track · 31 of 43 story points accepted",
    atRisk: false,
  },
  {
    initials: "TL",
    online: true,
    title: "Partner Portal SSO — SAML & OIDC onboarding",
    meta: "Automated metadata refresh, just-in-time provisioning and per-tenant audit logging for the reseller program",
    value: 45,
    status: "At risk · blocked on the vendor sandbox since March 12",
    atRisk: true,
  },
  {
    initials: "AS",
    online: false,
    title: "Mobile Onboarding Revamp — deferred deep links",
    meta: "Campaign install attribution, localized empty states and a reduced three-step signup flow for Android and iOS",
    value: 61,
    status: "On track · design QA in progress with the brand team",
    atRisk: false,
  },
  {
    initials: "RM",
    online: false,
    title: "SOC 2 Type II Readiness — evidence collection",
    meta: "Quarterly access reviews, policy documentation and vendor risk assessments ahead of the auditor fieldwork",
    value: 18,
    status: "Needs attention · 0 of 12 controls closed this week",
    atRisk: false,
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6">
        {/* Header — team presence */}
        <header className="flex items-center justify-between gap-6 rounded-xl border border-border bg-card/40 p-4 backdrop-blur">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
              Sprint 42 · Unified Customer Graph · 9 days remaining
            </p>
            <h1 className="text-lg font-semibold text-foreground">
              Meridian Workspace — Command Center
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>NO</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
              <Avatar>
                <AvatarFallback>TL</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800">
                  <CheckIcon />
                </AvatarBadge>
              </Avatar>
              <Avatar>
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+6</AvatarGroupCount>
            </AvatarGroup>
            <p className="text-xs text-muted-foreground">
              2 online · 10 members in this workspace
            </p>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Quick switcher — inline command palette */}
          <section className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">
                Quick switcher
              </h2>
              <span className="text-xs text-muted-foreground">
                ⌘K to focus search
              </span>
            </div>
            <Command
              dir="rtl"
              className="rounded-xl border border-border bg-popover/80 shadow-2xl shadow-black/30 backdrop-blur"
            >
              <CommandInput
                dir="rtl"
                placeholder="Search tasks, people, or jump anywhere…"
              />
              <CommandList className="max-h-[560px]">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Recent work items">
                  <CommandItem>
                    <GitMergeIcon />
                    <span>
                      MIG-2841 · Deduplicate overlapping household records across
                      the unified customer graph
                    </span>
                    <CommandShortcut>⌘1</CommandShortcut>
                  </CommandItem>
                  <CommandItem disabled>
                    <ShieldAlertIcon />
                    <span>
                      MIG-2907 · Backfill enrichment attributes for the legacy
                      CRM segment (blocked by vendor)
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <KeyRoundIcon />
                    <span>
                      PP-1193 · Rotate partner SAML signing certificates before
                      the quarterly expiry window
                    </span>
                    <CommandShortcut>⌘2</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Team">
                  <CommandItem>
                    <Avatar size="sm">
                      <AvatarFallback>NO</AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">Nofar Oshri</span>
                      <span className="truncate text-xs text-muted-foreground">
                        Staff Data Engineer · owns Unified Customer Graph
                      </span>
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <Avatar size="sm">
                      <AvatarFallback>TL</AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">Tal Levi</span>
                      <span className="truncate text-xs text-muted-foreground">
                        Backend Lead · owns Partner Portal SSO
                      </span>
                    </span>
                  </CommandItem>
                  <CommandItem>
                    <Avatar size="sm">
                      <AvatarFallback>RM</AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">Rachel Mizrahi</span>
                      <span className="truncate text-xs text-muted-foreground">
                        Security &amp; Compliance · owns SOC 2 readiness
                      </span>
                    </span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigate">
                  <CommandItem>
                    <LayoutDashboardIcon />
                    <span>
                      Open the sprint board for Sprint 42 “Unified Customer
                      Graph”
                    </span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <AlertTriangleIcon />
                    <span>
                      Jump to the incident review — postmortem draft for the
                      March 12 API degradation
                    </span>
                    <CommandShortcut>⌘I</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <SettingsIcon />
                    <span>
                      Workspace settings — members, integrations, SSO and the
                      audit log
                    </span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </section>

          {/* Sprint progress board */}
          <section className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">
                Sprint progress
              </h2>
              <span className="text-xs text-muted-foreground">
                4 active epics · updated 2 minutes ago
              </span>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/40 p-5 backdrop-blur">
              <div className="flex flex-col gap-2 rounded-lg border border-border/60 bg-background/30 p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">
                    Sprint 42 — overall completion
                  </p>
                  <span className="text-sm font-medium tabular-nums text-foreground">
                    66%
                  </span>
                </div>
                <Progress value={66} />
                <p className="text-xs text-muted-foreground">
                  31 of 47 story points accepted · velocity trending +12%
                  quarter-over-quarter
                </p>
              </div>

              {epics.map((epic) => (
                <div
                  key={epic.initials}
                  className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/30 p-3"
                >
                  <Avatar>
                    <AvatarFallback>{epic.initials}</AvatarFallback>
                    {epic.online ? (
                      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    ) : null}
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-medium leading-snug text-foreground">
                        {epic.title}
                      </p>
                      <span className="shrink-0 text-sm font-medium tabular-nums text-foreground">
                        {epic.value}%
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {epic.meta}
                    </p>
                    <Progress value={epic.value} />
                    <p
                      className={`text-xs ${
                        epic.atRisk
                          ? "text-amber-500 dark:text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {epic.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </EvalShell>
  );
}
