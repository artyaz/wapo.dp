"use client";

import React from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react";
import { EvalShell } from "@/eval/EvalShell";
import * as SubframeCore from "@/lib/subframe/core";
import { Sheet } from "@/components/ds/Sheet";
import { UserMessage } from "@/components/ds/UserMessage";
import {
  Sheet as UiSheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SOURCES = [
  "Notion · Product workspace · 1,240 docs · connected 2h ago",
  "Linear · Acme team · 860 issues · connected 2h ago",
  "Google Drive · Shared drive · 3.2 GB · connected 1h ago",
  "Notion · Design space · 214 docs · connected 2h ago",
  "Linear · Roadmap project · 132 issues · connected 1h ago",
  "Google Drive · Brand kit · 410 MB · connected 1h ago",
  "Notion · Meeting notes · 96 docs · connected 2h ago",
  "Linear · Bugs triage · 57 issues · connected 1h ago",
];

const WIZARD_STEPS = ["Account", "Workspace", "Import", "Invite"];

export default function Page() {
  const [importOpen, setImportOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      {/* ---------- product surface behind the onboarding sheet ---------- */}
      <div className="flex h-screen w-full flex-col bg-default-background text-default-font">
        <header className="flex items-center justify-between border-b border-solid border-default-border px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-default-font text-default-background">
              <span className="text-caption font-caption font-medium">P</span>
            </div>
            <span className="text-body-medium font-medium">Praxis</span>
          </div>
          <nav className="flex items-center gap-5">
            {["Dashboard", "Projects", "Reports"].map((item) => (
              <span
                key={item}
                className={
                  item === "Dashboard"
                    ? "text-body-medium text-default-font"
                    : "text-body-medium text-neutral-500"
                }
              >
                {item}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex w-40 items-center gap-2 rounded-md border border-solid border-default-border px-3 py-1.5">
              <SearchIcon className="size-3.5 text-neutral-400" />
              <span className="text-caption font-caption text-neutral-400">
                Search
              </span>
            </div>
            <div className="flex size-7 items-center justify-center rounded-full bg-neutral-300 text-caption font-caption font-medium text-neutral-600">
              MC
            </div>
          </div>
        </header>

        <main className="flex w-full max-w-[720px] flex-1 flex-col justify-center gap-6 px-8 py-10">
          <div>
            <p className="text-caption font-caption text-neutral-500">
              Acme Inc · Workspace
            </p>
            <h1 className="mt-1 text-[28px] font-semibold leading-9">
              Welcome back, Maya
            </h1>
            <p className="mt-1 text-body text-neutral-500">
              Finish the guided setup to unlock imports, automations and your
              team.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              ["Projects", "0 active"],
              ["Documents", "0 imported"],
              ["Members", "1 admin"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-solid border-default-border bg-panel p-5"
              >
                <p className="text-caption font-caption text-neutral-500">
                  {label}
                </p>
                <p className="mt-1 text-body-medium font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-solid border-default-border bg-panel p-5">
            <p className="text-caption font-caption text-neutral-500">
              Recent activity
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {[
                "M. Chen joined Acme Inc as admin",
                "Workspace created · 2 hours ago",
              ].map((row) => (
                <li
                  key={row}
                  className="flex items-center gap-2 text-body-medium text-neutral-500"
                >
                  <span className="size-1.5 rounded-full bg-neutral-400" />
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>

      {/* ---------- onboarding wizard running in a side sheet (ui:sheet) ---------- */}
      <UiSheet defaultOpen>
        <SheetContent side="right" className="sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="text-lg">
              Set up your workspace
            </SheetTitle>
            <SheetDescription>
              Step 3 of 4 — import existing work from your connected tools.
            </SheetDescription>
            <div aria-label={`Step 3 of 4: ${WIZARD_STEPS[2]}`} className="mt-3 flex gap-1.5">
              <span className="h-1 flex-1 rounded-full bg-default-font" />
              <span className="h-1 flex-1 rounded-full bg-default-font" />
              <span className="h-1 flex-1 rounded-full bg-default-font/40" />
              <span className="h-1 flex-1 rounded-full bg-default-border" />
            </div>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-4 px-4">
            {/* connected sources with an inline confirm bottom sheet (ds:Sheet) */}
            <section className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <h2 className="text-body-medium font-medium text-default-font">
                  Connected sources
                </h2>
                <span className="text-caption font-caption text-neutral-500">
                  3 tools found
                </span>
              </div>
              <div className="relative h-[240px] w-full overflow-hidden rounded-lg border border-solid border-default-border bg-neutral-100">
                <div aria-hidden="true" className="absolute inset-0 select-none p-4">
                  <div className="flex h-full flex-col gap-2 overflow-hidden">
                    {SOURCES.map((source) => (
                      <p
                        key={source}
                        className="truncate text-caption font-caption text-neutral-500"
                      >
                        {source}
                      </p>
                    ))}
                  </div>
                </div>

                <Sheet
                  open={importOpen}
                  onOpenChange={setImportOpen}
                  modal={false}
                  className="absolute inset-0"
                >
                  <Sheet.Content
                    aria-describedby={undefined}
                    onPointerDownOutside={(event: Event) =>
                      event.preventDefault()
                    }
                  >
                    <SubframeCore.Dialog.Title className="w-full text-body-medium text-default-font">
                      Import 1,240 items from Notion?
                    </SubframeCore.Dialog.Title>
                    <p className="w-full text-body text-default-font">
                      Docs, databases and comments from the Product workspace
                      will be copied over. Templates are skipped by default.
                    </p>
                    <div className="flex w-full items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setImportOpen(false)}
                        className="cursor-pointer rounded-md px-3 py-1.5 text-caption font-caption text-default-font hover:bg-neutral-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => setImportOpen(false)}
                        className="cursor-pointer rounded-md border border-solid border-default-border bg-default-font px-3 py-1.5 text-caption font-caption text-default-background hover:opacity-90"
                      >
                        Import now
                      </button>
                    </div>
                  </Sheet.Content>
                </Sheet>
              </div>
            </section>

            {/* setup copilot transcript (ds:UserMessage) */}
            <section className="flex flex-col gap-3 rounded-lg border border-solid border-default-border bg-neutral-100 p-4">
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-3.5 text-neutral-500" />
                <span className="text-caption font-caption text-neutral-500">
                  Setup copilot
                </span>
              </div>
              <p className="max-w-[92%] text-body-medium text-default-font">
                I found 3 sources connected to acme.com — Notion, Linear and
                Google Drive. Which should I bring over first?
              </p>
              <UserMessage>
                Start with Notion — it has all the kickoff docs.
              </UserMessage>
              <UserMessage density="compact">
                Skip the templates folder.
              </UserMessage>
              <div className="mt-1 flex items-center gap-2 rounded-md border border-solid border-default-border bg-panel px-3 py-2">
                <span className="text-caption font-caption text-neutral-400">
                  Ask the copilot anything…
                </span>
              </div>
            </section>
          </div>

          <SheetFooter className="flex-row items-center justify-between border-t border-solid border-default-border">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon /> Back
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-caption font-caption text-neutral-500">
                3 of 4
              </span>
              <Button size="sm">
                Continue <ArrowRightIcon />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </UiSheet>
    </EvalShell>
  );
}
