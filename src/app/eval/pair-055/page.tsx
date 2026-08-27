"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";

import { FileTreeRow } from "@/components/ds/FileTreeRow";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BadgeCheckIcon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  CreditCardIcon,
  LinkIcon,
  LogOutIcon,
  MapPinIcon,
} from "lucide-react";

const bio =
  "Senior design engineer on the Praxis design system. I care about design tokens, theming and the small details that make tools feel calm. Previously built infrastructure tooling at Northwind — now writing about dark-mode contrast and liquid-glass interfaces.";

const stats = [
  { value: "12", label: "Projects" },
  { value: "1.2k", label: "Followers" },
  { value: "86", label: "Following" },
  { value: "4.8k", label: "File views" },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col">
        {/* ---------- top bar ---------- */}
        <header className="flex h-16 flex-none items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                Praxis Workspace
              </span>
              <span className="text-xs leading-tight text-muted-foreground">
                Profile
              </span>
            </div>
          </div>

          {/* account menu — open by default so the menu surface is visible */}
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-10 gap-2 rounded-full px-2">
                  <Avatar>
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Lena Ríos</span>
                  <ChevronDownIcon className="size-4 text-muted-foreground" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>Lena Ríos</span>
                <span className="text-xs font-normal text-muted-foreground">
                  lena.rios@praxis.dev
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                  <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                  <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* ---------- identity (kept left so the open account menu has room) ---------- */}
        <section className="px-6 pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg font-medium">LR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-semibold tracking-tight">
                  Lena Ríos
                </h1>
                <BadgeCheckIcon className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                @lena.rios · Senior Design Engineer, Design Systems
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon className="size-3.5" />
                  Berlin, DE
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="size-3.5" />
                  Joined Mar 2021
                </span>
                <span className="inline-flex items-center gap-1">
                  <LinkIcon className="size-3.5" />
                  lena.rios.dev
                </span>
              </div>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Building calm, token-driven interfaces. The portfolio files
                below are synced to your public profile.
              </p>
            </div>
          </div>

          <div className="mt-5 flex max-w-md items-start justify-between border-t border-border pt-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="text-base font-semibold leading-none">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- editable bio ---------- */}
        <section className="px-6 pt-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold">About</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Shown on your public profile · Markdown supported
                </p>
              </div>
              <span className="flex-none text-xs text-muted-foreground">
                Public
              </span>
            </div>
            <div className="mt-3">
              <Textarea
                aria-label="Profile bio"
                defaultValue={bio}
                className="min-h-24 resize-none"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {bio.length} / 400 characters
              </p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save changes</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- shared portfolio files ---------- */}
        <section className="px-6 pt-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold">Shared files</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Portfolio files synced from your public workspace
                </p>
              </div>
              <span className="flex-none text-xs text-muted-foreground">
                Updated 2h ago
              </span>
            </div>
            <div className="mt-4 flex flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
              <FileTreeRow
                name="portfolio"
                nodeType="folder"
                depth="0"
                expanded
                selected
              />
              <FileTreeRow
                name="case-studies"
                nodeType="folder"
                depth="1"
                expanded
              />
              <FileTreeRow
                name="bank-redesign.md"
                nodeType="md"
                depth="2"
                gitStatus="modified"
              />
              <FileTreeRow name="drafts" nodeType="folder" depth="2" />
              <FileTreeRow
                name="impact-metrics.json"
                nodeType="json"
                depth="2"
              />
              <FileTreeRow
                name="open-source"
                nodeType="folder"
                depth="1"
                expanded
              />
              <FileTreeRow name="tokens.ts" nodeType="ts" depth="2" dirty />
              <FileTreeRow
                name="ci-publish.yml"
                nodeType="yml"
                depth="2"
                gitStatus="added"
              />
              <FileTreeRow name="resume.md" nodeType="md" depth="0" />
              <FileTreeRow name="profile.json" nodeType="json" depth="0" dirty />
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-warning-500" />
                modified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-success-500" />
                added
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-default-font" />
                unsaved
              </span>
            </div>
          </div>
        </section>

        {/* ---------- footer ---------- */}
        <footer className="mt-auto px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Praxis profile · Visibility: public · Last saved just now
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
