"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  ArchiveIcon,
  FileTextIcon,
  PlusIcon,
  RefreshCwIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

import { AskBar } from "@/components/ds/AskBar";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Scenario: "Atlas" — a team knowledge workspace for a freshly created
 * project ("Meridian Launch"). The team directory in the sidebar is still
 * syncing (skeleton placeholders), the notes canvas is empty (empty state
 * with the avatar group of members who already have access), and the Atlas
 * assistant prompt bar is docked to the foot of the main column.
 */

const teamRows = [
  { name: "w-[132px]", role: "w-[84px]" },
  { name: "w-[104px]", role: "w-[64px]" },
  { name: "w-[118px]", role: "w-[76px]" },
  { name: "w-[92px]", role: "w-[56px]" },
];

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] ${
        active
          ? "bg-neutral-100 font-medium text-default-font"
          : "text-neutral-500 hover:bg-neutral-100"
      }`}
    >
      <span className="[&_svg]:size-4 [&_svg]:shrink-0">{icon}</span>
      {label}
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden">
        {/* ---------------- Sidebar ---------------- */}
        <aside className="flex w-[280px] shrink-0 flex-col border-r border-default-border bg-panel">
          <div className="flex h-16 items-center gap-2.5 border-b border-default-border px-5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-primary text-brand-primary-foreground">
              <SparklesIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-medium leading-tight">
                Atlas
              </div>
              <div className="text-[12px] leading-tight text-neutral-500">
                Meridian Launch
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-0.5 px-3 pt-4">
            <div className="px-2.5 pb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              Workspace
            </div>
            <NavItem icon={<FileTextIcon />} label="All notes" active />
            <NavItem icon={<UsersIcon />} label="Shared with me" />
            <NavItem icon={<ArchiveIcon />} label="Archive" />
          </nav>

          <Separator className="my-4" />

          <div className="px-3">
            <div className="flex items-center justify-between px-2.5 pb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                Team
              </span>
              <span className="text-[11px] text-neutral-500">Syncing…</span>
            </div>
            <div className="flex flex-col gap-4 px-2.5">
              {teamRows.map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-full" />
                  <div className="grid w-full gap-1.5">
                    <Skeleton className={`h-3 ${row.name}`} />
                    <Skeleton className={`h-3 ${row.role}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 border-t border-default-border px-5 py-3 text-[12px] text-neutral-500">
            <RefreshCwIcon className="size-3.5 shrink-0" />
            Syncing 3 of 7 members
          </div>
        </aside>

        {/* ---------------- Main column ---------------- */}
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-default-border px-8">
            <div className="flex items-baseline gap-2.5">
              <h1 className="text-[15px] font-medium">Notes</h1>
              <span className="text-[13px] text-neutral-500">
                Meridian Launch
              </span>
            </div>
            <span className="text-[12px] text-neutral-500">
              All changes saved
            </span>
          </header>

          <div className="flex min-h-0 flex-1 flex-col p-6">
            <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-default-border bg-panel">
              <Empty className="flex-1">
                <EmptyHeader>
                  <EmptyMedia>
                    <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-panel">
                      <Avatar>
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>JR</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>AL</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>+4</AvatarFallback>
                      </Avatar>
                    </div>
                  </EmptyMedia>
                  <EmptyTitle>No notes yet</EmptyTitle>
                  <EmptyDescription>
                    Maya, Jordan, Alex and 4 teammates already have access.
                    Capture research, decisions, and launch updates in one
                    place — or ask Atlas to draft the first note for you.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm">
                    <PlusIcon />
                    New note
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          </div>

          {/* Assistant prompt bar, docked to the foot of the main column */}
          <AskBar
            placeholder="Ask Atlas to draft, summarize, or find notes…"
            statusText="Answers cite your team's notes and the workspace activity log."
          />
        </main>
      </div>
    </EvalShell>
  );
}
