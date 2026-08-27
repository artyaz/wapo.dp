"use client";

/**
 * EVAL page (pair-026) — components: ui:field, ui:sidebar, ds:SlaTimer
 * Conditions: tablet-portrait 768x1024, light theme, ltr, no constraint.
 *
 * Scenario: support operations triage console. The Sidebar is the agent's
 * workspace navigation (queues with live counts); the main area holds an
 * escalation form built from Field parts, and SlaTimer chips track the
 * remaining response time per ticket (shift clock in the header).
 */

import React from "react";
import {
  BookOpen,
  Check,
  Flame,
  Inbox,
  LifeBuoy,
  Settings,
  Zap,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { SlaTimer } from "@/components/ds/SlaTimer";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const queueNav = [
  { title: "All tickets", icon: Inbox, badge: "24", active: true },
  { title: "My assignments", icon: Check, badge: "6", active: false },
  { title: "Breaches", icon: Flame, badge: "2", active: false, danger: true },
];

const opsNav = [
  { title: "Runbooks", icon: BookOpen },
  { title: "Macros", icon: Zap },
  { title: "Settings", icon: Settings },
];

const queue = [
  {
    id: "INC-1058",
    title: "Checkout payment failures",
    meta: "P1 · Payments · assigned to you",
    tone: "breach" as const,
    timecode: "00:00:18",
    showDot: true,
  },
  {
    id: "INC-1052",
    title: "Card auth timeouts at EU gateway",
    meta: "P2 · Payments · waiting on you",
    tone: "warning" as const,
    timecode: "00:04:32",
    showDot: true,
  },
  {
    id: "INC-1044",
    title: "Refund webhook retries failing",
    meta: "P3 · Billing · assigned to Sam",
    tone: "neutral" as const,
    timecode: "00:14:52",
    showDot: true,
  },
  {
    id: "CHAT-221",
    title: "Live chat · upgrade question",
    meta: "Chat · unassigned",
    tone: "neutral" as const,
    timecode: "00:30:00",
    showDot: false,
  },
];

export default function Page() {
  const [priority, setPriority] = React.useState("P2");

  return (
    <EvalShell theme="light" dir="ltr">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="bg-background flex aspect-square size-8 items-center justify-center rounded-lg border">
                    <LifeBuoy className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Praxis Desk</span>
                    <span className="text-xs">Support operations</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Queue</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {queueNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={item.active}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge
                        className={
                          item.danger
                            ? "bg-destructive/10 text-destructive"
                            : undefined
                        }
                      >
                        {item.badge}
                      </SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Operations</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {opsNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 rounded-md border p-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
                MK
              </div>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm font-medium">
                  Mara Keller
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  Tier 2 · On shift
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <div className="ml-1 flex min-w-0 items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Queue</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="truncate font-medium">Triage</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-muted-foreground hidden text-xs sm:inline">
                Shift SLA
              </span>
              <SlaTimer tone="neutral" timecode="01:12:40" showDot />
            </div>
          </header>

          <div className="flex flex-col gap-6 p-4 sm:p-6">
            {/* Escalation form */}
            <section aria-label="Escalate ticket">
              <div className="mb-3 flex flex-col gap-0.5">
                <h1 className="text-base font-semibold leading-none">
                  Escalate INC-1058
                </h1>
                <p className="text-muted-foreground text-sm">
                  Raise this P1 to Tier 2 and route the response clock.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="subject">Subject</FieldLabel>
                    <Input
                      id="subject"
                      type="text"
                      defaultValue="Checkout payment failures"
                    />
                    <FieldDescription>
                      Copied from the source ticket; edit only if the scope
                      changed.
                    </FieldDescription>
                  </Field>

                  <Field data-invalid>
                    <FieldLabel htmlFor="customer-email">
                      Customer email
                    </FieldLabel>
                    <Input
                      id="customer-email"
                      type="email"
                      aria-invalid
                      placeholder="name@company.com"
                    />
                    <FieldError>
                      Enter the customer&rsquo;s work email so the escalation
                      notice can be delivered.
                    </FieldError>
                  </Field>

                  <FieldSeparator />

                  <FieldSet>
                    <FieldLegend>Routing</FieldLegend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Priority</FieldLabel>
                        <div className="flex gap-1.5">
                          {["P1", "P2", "P3"].map((p) => (
                            <button
                              key={p}
                              type="button"
                              aria-pressed={priority === p}
                              onClick={() => setPriority(p)}
                              className={
                                priority === p
                                  ? "h-9 flex-1 rounded-md border border-foreground bg-foreground text-sm font-medium text-background"
                                  : "bg-background text-muted-foreground h-9 flex-1 rounded-md border border-input text-sm transition-colors hover:bg-accent"
                              }
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                        <FieldDescription>
                          P1 pages the on-call engineer immediately.
                        </FieldDescription>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="assignee">Assign to</FieldLabel>
                        <Input
                          id="assignee"
                          type="text"
                          placeholder="Search agents…"
                        />
                        <FieldDescription>
                          Leave empty to auto-route by workload.
                        </FieldDescription>
                      </Field>
                    </div>
                  </FieldSet>
                </FieldGroup>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="text-muted-foreground hover:bg-accent h-9 rounded-md px-3 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-md bg-foreground px-4 text-sm font-medium text-background"
                  >
                    Escalate ticket
                  </button>
                </div>
              </div>
            </section>

            {/* Live queue */}
            <section aria-label="Live triage queue">
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-base font-semibold leading-none">
                    Live triage queue
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Remaining first-response time per ticket.
                  </p>
                </div>
                <SlaTimer tone="warning" timecode="00:04:32" showDot />
              </div>
              <ul className="divide-y rounded-xl border bg-card">
                {queue.map((row) => (
                  <li
                    key={row.id}
                    className="flex items-center justify-between gap-3 p-3 sm:px-4"
                  >
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-code text-xs text-neutral-500">
                          {row.id}
                        </span>
                        <span className="truncate text-sm font-medium">
                          {row.title}
                        </span>
                      </div>
                      <span className="text-muted-foreground truncate text-xs">
                        {row.meta}
                      </span>
                    </div>
                    <SlaTimer
                      tone={row.tone}
                      timecode={row.timecode}
                      showDot={row.showDot}
                      className="shrink-0"
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </EvalShell>
  );
}
