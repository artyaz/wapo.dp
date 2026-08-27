"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { RecordHeader } from "@/components/ds/RecordHeader";
import { TransportBar } from "@/components/ds/TransportBar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Activity,
  AudioLines,
  CircleCheck,
  Clock,
  FileText,
  MessageSquare,
  ShieldAlert,
  TriangleAlert,
  Users,
} from "lucide-react";

/**
 * pair-103 — Incident evidence room on a tiny 320px phone.
 *
 * Scenario: an on-call engineer reviews incident INC-2417 ("checkout latency
 * spike"). The RecordHeader identifies the record, the TransportBar plays the
 * 12-minute bridge-call excerpt (glass pill floating over the waveform), and
 * the ui:sidebar is the evidence locker with a transcript excerpt beside it.
 * Content is intentionally dense/long to expose wrap/truncate behavior.
 */

// Static waveform — 48 bars; first 18 are "played" (04:42 of 12:08 ≈ 39%).
const WAVEFORM_HEIGHTS = [
  104, 128, 92, 136, 116, 140, 96, 124, 132, 108, 88, 126, 138, 112, 120, 94,
  134, 110, 142, 100, 130, 90, 122, 114, 136, 104, 92, 128, 118, 140, 98, 126,
  132, 88, 116, 134, 106, 124, 96, 138, 112, 100, 130, 120, 94, 136, 108, 126,
];
const PLAYED_BARS = 18;

const TRANSCRIPT = [
  {
    t: "04:38",
    speaker: "Priya · SRE",
    text: "p99 on checkout-api just crossed 2.4 seconds — we're shedding traffic at the edge gateway.",
  },
  {
    t: "04:41",
    speaker: "Marcus · Payments",
    text: "Confirmed. Card-auth queue depth is climbing and the mobile client retry storm is amplifying it.",
  },
  {
    t: "04:44",
    speaker: "Dana · Support",
    text: "First customer reports are arriving on the flash-sale checkout page — ticket volume rising fast.",
  },
];

const EVIDENCE_ITEMS = [
  { icon: AudioLines, label: "Bridge call excerpt" },
  { icon: MessageSquare, label: "Slack export #incident-2417" },
  { icon: Activity, label: "APM traces · checkout-api" },
  { icon: FileText, label: "Postmortem draft v3" },
  { icon: Users, label: "Responder handoff notes" },
];

const TIMELINE_ITEMS = [
  { icon: Clock, label: "14:02 · Detection" },
  { icon: TriangleAlert, label: "14:11 · Sev-2 declared" },
  { icon: CircleCheck, label: "15:40 · Mitigated" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-svh flex-col bg-default-background font-body text-default-font">
        {/* 1. Record identity */}
        <RecordHeader
          breadcrumb="Incidents / 2025 / Q3 / Payments Platform"
          title="Checkout latency spike during flash-sale checkout window"
          recordId="INC-2417"
          meta="Opened Aug 24, 2025 · Severity 2 · Owner: Platform Reliability · 12 evidence items · 6 responders"
          secondaryAction="Export"
          primaryAction="Escalate"
        />

        {/* 2. Now playing — evidence 01, bridge call excerpt */}
        <section className="px-3 pb-3 pt-3">
          <div className="flex items-baseline justify-between gap-2 px-0.5 pb-2">
            <span className="min-w-0 truncate text-caption font-caption uppercase tracking-[0.08em] text-neutral-500">
              Evidence 01 · Bridge call excerpt
            </span>
            <span className="flex-none font-code text-[10px] tabular-nums text-neutral-400">
              12:08 · 8 channels
            </span>
          </div>

          <div className="relative h-44 overflow-hidden rounded-2xl border border-solid border-default-border bg-neutral-100">
            <div className="flex h-full items-center justify-between px-3">
              {WAVEFORM_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className={`w-[3px] rounded-full ${
                    i < PLAYED_BARS ? "bg-neutral-500" : "bg-neutral-300"
                  }`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            {/* Transport cluster, floating over the media surface */}
            <div className="absolute inset-0 flex items-center justify-center p-1.5">
              <TransportBar currentTime="04:42" totalTime="12:08" speed="1.0×" />
            </div>
          </div>
        </section>

        {/* 3. Evidence locker (sidebar) + transcript (main) */}
        <SidebarProvider
          style={{ "--sidebar-width": "9.5rem" } as React.CSSProperties}
        >
          <Sidebar
            collapsible="none"
            className="border-r border-solid border-sidebar-border"
          >
            <SidebarHeader>
              <div className="flex items-center gap-2 px-1.5 py-1">
                <div className="flex size-7 flex-none items-center justify-center rounded-md bg-neutral-900 text-white">
                  <ShieldAlert className="size-4" />
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[12px] font-semibold text-default-font">
                    Evidence locker
                  </p>
                  <p className="truncate font-code text-[10px] text-neutral-500">
                    INC-2417 · 12 items
                  </p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarSeparator />

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Evidence</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {EVIDENCE_ITEMS.map((item, i) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton isActive={i === 0}>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Timeline</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {TIMELINE_ITEMS.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarSeparator />
              <div className="flex items-center gap-2 px-1.5 py-1">
                <div className="flex size-7 flex-none items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700">
                  PS
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[12px] font-medium text-default-font">
                    Priya Sharma
                  </p>
                  <p className="truncate text-[10px] text-neutral-500">
                    On-call · SRE
                  </p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <div className="flex flex-col gap-3 px-3 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-caption font-caption uppercase tracking-[0.08em] text-neutral-500">
                  Transcript
                </span>
                <span className="flex-none font-code text-[10px] text-neutral-400">
                  EN
                </span>
              </div>

              {TRANSCRIPT.map((entry) => (
                <div
                  key={entry.t}
                  className="border-l-2 border-solid border-neutral-200 pl-2"
                >
                  <div className="flex items-baseline gap-1.5 pb-0.5">
                    <span className="flex-none font-code text-[10px] tabular-nums text-neutral-400">
                      {entry.t}
                    </span>
                    <span className="min-w-0 truncate text-[11px] font-semibold leading-[14px] text-neutral-700">
                      {entry.speaker}
                    </span>
                  </div>
                  <p className="text-[11px] leading-[16px] text-neutral-600">
                    {entry.text}
                  </p>
                </div>
              ))}

              <p className="pt-1 text-[10px] text-neutral-400">
                + 412 more lines
              </p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </EvalShell>
  );
}
