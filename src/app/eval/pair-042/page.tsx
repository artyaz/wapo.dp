"use client";

/**
 * EVAL page (pair-042) — ds:CrosshairTag + ds:FloatingToolbar + ui:sidebar
 * Conditions: phone 390x844, light theme, ltr, no constraint.
 *
 * Scenario: "Meridian Terminal" — a phone-sized markets workspace. The
 * ui:sidebar renders inline (collapsible="none", full-width band — the mobile
 * shape of the workspace nav) with watchlist groups, live counts and the
 * session status. Below it, the active watchlist ("FX majors") shows the
 * inspected instrument card: ds:CrosshairTag carries the 1-minute USD/JPY
 * chart with its glass crosshair value tag, and ds:FloatingToolbar straddles
 * the card's bottom edge as the floating action capsule for the current
 * crosshair selection (share / alert / clear).
 */

import React from "react";
import {
  ArrowLeftRight,
  BellPlus,
  BellRing,
  Globe,
  LayoutGrid,
  Settings,
  Share2,
  TrendingUp,
  X,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { CrosshairTag } from "@/components/ds/CrosshairTag";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const watchlists = [
  { title: "All markets", icon: LayoutGrid, badge: "12", active: false },
  { title: "FX majors", icon: ArrowLeftRight, badge: "6", active: true },
  { title: "Indices", icon: TrendingUp, badge: "4", active: false },
];

const workspaceNav = [
  { title: "Alerts", icon: BellRing, badge: "3", danger: true },
  { title: "Settings", icon: Settings, badge: null, danger: false },
];

const stats = [
  { label: "Open", value: "149.61" },
  { label: "High", value: "150.04" },
  { label: "Low", value: "149.55" },
  { label: "Spread", value: "0.6" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <SidebarProvider className="flex-col">
        {/* Workspace nav — inline (drawer contents pinned open) on phone */}
        <Sidebar
          collapsible="none"
          className="h-auto w-full border-b border-sidebar-border"
        >
          <SidebarHeader className="px-3 pb-1 pt-3">
            <div className="flex items-center justify-between gap-3 px-1">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-8 flex-none items-center justify-center rounded-lg border border-sidebar-border bg-background">
                  <Globe className="size-4 text-sidebar-foreground" />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                  <span className="truncate text-sm font-semibold text-sidebar-foreground">
                    Meridian Terminal
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Markets workspace
                  </span>
                </div>
              </div>
              <span className="flex flex-none items-center gap-1.5 rounded-full border border-sidebar-border bg-background px-2.5 py-1 text-[11px] leading-none text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success-500" />
                Tokyo · open
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Watchlists</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {watchlists.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={item.active}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {workspaceNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge ? (
                        <SidebarMenuBadge
                          className={
                            item.danger
                              ? "bg-destructive/10 text-destructive"
                              : undefined
                          }
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Active watchlist detail */}
        <main className="flex flex-1 flex-col gap-4 px-4 pb-10 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="font-body-medium text-body-medium text-default-font">
              FX majors
            </h1>
            <span className="font-caption text-caption text-neutral-500">
              6 instruments
            </span>
          </div>

          <section className="relative flex flex-col rounded-lg border border-solid border-default-border bg-panel p-4 pb-14">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-heading-3 text-heading-3 text-default-font">
                  USD / JPY
                </h2>
                <p className="mt-0.5 font-caption text-caption text-neutral-500">
                  FX major · 1-minute candles
                </p>
              </div>
              <div className="flex flex-none flex-col items-end gap-0.5 pt-0.5">
                <span className="font-code text-[22px] font-[600] leading-none text-default-font tabular-nums">
                  149.98
                </span>
                <span className="font-code text-[11px] leading-none text-success-600 tabular-nums">
                  +0.42 (+0.28%)
                </span>
              </div>
            </div>

            {/* Inspected point on the chart — glass value tag on the crosshair */}
            <div className="mt-4 flex justify-center">
              <CrosshairTag
                value="149.98"
                glyph="+0.28%"
                timestamp="2025-06-11 14:32:05"
              />
            </div>

            <div className="mt-4 border-t border-solid border-default-border pt-3">
              <dl className="grid grid-cols-4 gap-x-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex min-w-0 flex-col gap-1">
                    <dt className="font-caption text-caption text-neutral-500">
                      {stat.label}
                    </dt>
                    <dd className="font-code text-[14px] font-[500] leading-[18px] text-default-font tabular-nums">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 font-caption text-caption text-neutral-500">
                Data delayed 15 minutes · Last tick 14:32:05 JST
              </p>
            </div>

            {/* Floating action capsule for the crosshair selection */}
            <FloatingToolbar className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
              <FloatingToolbar.Action
                glyph={<Share2 className="size-3.5" />}
                label="Share"
                className="py-2.5"
              />
              <FloatingToolbar.Action
                glyph={<BellPlus className="size-3.5" />}
                label="Alert"
                className="py-2.5"
              />
              <FloatingToolbar.Rule />
              <FloatingToolbar.Action
                glyph={<X className="size-3.5" />}
                label="Clear"
                tone="destructive"
                className="py-2.5"
              />
            </FloatingToolbar>
          </section>
        </main>
      </SidebarProvider>
    </EvalShell>
  );
}
