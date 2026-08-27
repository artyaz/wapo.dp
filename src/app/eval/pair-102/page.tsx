"use client";

/**
 * EVAL page (pair-102) — workspace notification preferences, mobile.
 * Components: ui:toggle, ui:dropdown-menu, ui:tooltip
 * Conditions: phone 390x844, dark theme, ltr, dense content.
 *
 * Scenario: Mariam reviews how the Aurora team workspace reaches her phone:
 * filter chips (toggles) pick which events break through, the account menu
 * (dropdown, rendered open via defaultOpen) hangs off the avatar in the top
 * bar, and the schedule card explains its locked options with tooltips
 * (rendered open via defaultOpen).
 */

import React from "react";
import {
  AtSignIcon,
  BellIcon,
  CalendarRangeIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  InfoIcon,
  ListChecksIcon,
  LockIcon,
  LogOutIcon,
  MessageCircleIcon,
  MoonIcon,
  SendIcon,
  SettingsIcon,
  SirenIcon,
  UserPlusIcon,
  Volume2Icon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Toggle } from "@/components/ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-background text-foreground">
        {/* Top bar — account menu rendered open for the audit */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              aria-label="Back to settings"
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-foreground/80"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <h1 className="truncate text-base font-semibold tracking-tight">
              Notifications
            </h1>
          </div>

          <DropdownMenu defaultOpen modal={false}>
            <DropdownMenuTrigger className="flex h-10 flex-none items-center gap-1.5 rounded-full border border-border bg-card pl-1 pr-2.5 outline-none">
              <Avatar>
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <ChevronDownIcon className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={8}
              className="w-72"
            >
              <DropdownMenuLabel>
                <span className="block text-sm font-medium leading-5">
                  Mariam Kessler
                </span>
                <span className="block text-xs font-normal leading-4 text-muted-foreground">
                  mariam@aurora.dev · Admin
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Workspace settings
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing, plans &amp; invoices
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notification routing
                  <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <UserPlusIcon />
                  Invite teammates · seats full
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Sign out of all devices
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 px-4 py-4">
          {/* Intro — dense supporting copy */}
          <section>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Aurora · Team workspace
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              Choose which workspace events reach this phone. Everything you
              skip waits in a twice-daily digest — critical alerts still break
              through, even during quiet hours.
            </p>
          </section>

          {/* Alert filters — ui:toggle as wrapping filter chips */}
          <section className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Alert filters</h2>
              <span className="text-xs text-muted-foreground">
                3 of 6 active
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Only picked events arrive in real time. Filters apply to every
              channel — mobile push, desktop and the email digest.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Toggle
                variant="outline"
                size="lg"
                defaultPressed
                aria-label="Toggle comments and replies"
              >
                <MessageCircleIcon />
                Comments &amp; replies
              </Toggle>
              <Toggle
                variant="outline"
                size="lg"
                defaultPressed
                aria-label="Toggle mentions"
              >
                <AtSignIcon />
                Mentions
              </Toggle>
              <Toggle
                variant="outline"
                size="lg"
                aria-label="Toggle direct messages"
              >
                <SendIcon />
                Direct messages
              </Toggle>
              <Toggle
                variant="outline"
                size="lg"
                aria-label="Toggle task updates"
              >
                <ListChecksIcon />
                Task updates
              </Toggle>
              <Toggle
                variant="outline"
                size="lg"
                aria-label="Toggle weekly digest"
              >
                <CalendarRangeIcon />
                Weekly digest
              </Toggle>
              <Toggle
                variant="outline"
                size="lg"
                defaultPressed
                aria-label="Toggle incident pages"
              >
                <SirenIcon />
                Incident pages
              </Toggle>
              <Toggle size="lg" disabled aria-label="Everything, unfiltered">
                <Volume2Icon />
                Everything, unfiltered
              </Toggle>
            </div>
          </section>

          {/* Delivery schedule — ui:toggle rows + ui:tooltip (open) */}
          <section className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Delivery schedule</h2>
              <Tooltip defaultOpen>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Digest timing details"
                      className="flex size-10 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                    >
                      <InfoIcon className="size-4" />
                    </button>
                  }
                />
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="max-w-[250px]"
                >
                  <p>
                    All times follow Europe/Berlin. Digests go out at 09:00 and
                    17:00.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              The morning digest lands at 09:00 with overnight activity; the
              17:00 edition catches replies and review requests. Incident
              pages ignore quiet hours.
            </p>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-5">
                  Quiet hours
                </p>
                <p className="text-xs leading-4 text-muted-foreground">
                  22:00 – 07:00 · every night
                </p>
              </div>
              <Toggle
                variant="outline"
                size="lg"
                defaultPressed
                aria-label="Quiet hours enabled"
                className="shrink-0"
              >
                <MoonIcon />
              </Toggle>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-5">
                  Custom delivery windows
                </p>
                <p className="text-xs leading-4 text-muted-foreground">
                  Per-channel schedules · Team plan
                </p>
              </div>
              <Tooltip defaultOpen>
                <TooltipTrigger
                  render={
                    <span className="inline-flex shrink-0">
                      <Toggle size="lg" disabled aria-label="Locked">
                        <LockIcon />
                      </Toggle>
                    </span>
                  }
                />
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="max-w-[260px]"
                >
                  <p>
                    Custom delivery windows are locked on the Free plan —
                    upgrade to Team to schedule per-channel digests and
                    follow-me time zones.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </section>
        </main>

        <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Aurora · Notification preferences
          </span>
          <span className="text-xs text-muted-foreground">
            Synced 2 min ago
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
