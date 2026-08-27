"use client";

/**
 * EVAL page pair-009 — Praxis DS visual QA.
 * Components: ui:message-scroller, ui:button, ui:scroll-area
 * Conditions: desktop 1280x800, dark theme, ltr, no-scroll.
 * Scenario: "Support Copilot — live ticket session" — a support agent's
 * console: chat transcript (message-scroller), pinned session files strip
 * (horizontal scroll-area), header/composer/sidebar actions (button).
 */

import React from "react";
import {
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  ExternalLinkIcon,
  FileCodeIcon,
  FileJsonIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PaperclipIcon,
  SendIcon,
  SettingsIcon,
  Share2Icon,
  type LucideIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type SystemEntry = { kind: "system"; id: string; text: string };

type MessageEntry = {
  kind: "message";
  id: string;
  role: "user" | "assistant";
  author: string;
  time: string;
  paragraphs: string[];
  draft?: Array<{ label: string; value: string }>;
};

type Entry = SystemEntry | MessageEntry;

const transcript: Entry[] = [
  { kind: "system", id: "sys-1", text: "Session started · Today at 09:41" },
  {
    kind: "message",
    id: "msg-1",
    role: "user",
    author: "Mara Jensen",
    time: "09:42",
    paragraphs: [
      "Hi — invoice INV-2056 for March charges us $1,240, but the usage dashboard shows $985. Where does the $255 gap come from?",
    ],
  },
  {
    kind: "message",
    id: "msg-2",
    role: "assistant",
    author: "Praxis Copilot",
    time: "09:42",
    paragraphs: [
      "Hi Mara — I can see the invoice from here. Give me a second to line it up against your March usage.",
      "A gap like this almost always comes from one of three places: plan overage, a mid-cycle seat change, or a regional tax adjustment. Checking each now.",
    ],
  },
  {
    kind: "message",
    id: "msg-3",
    role: "assistant",
    author: "Praxis Copilot",
    time: "09:43",
    paragraphs: [
      "Here's the breakdown for INV-2056:",
      "Seats — 12 × $79 → $948\nPlatform fee → $37\nAPI usage (metered) → $237\nRegional tax → $18\n\nTotal → $1,240",
      "Your dashboard's $985 total only counts seats and the platform fee. The API block is metered separately and lands on the invoice at the end of the cycle — together with the tax, that's the missing $255.",
    ],
  },
  {
    kind: "message",
    id: "msg-4",
    role: "user",
    author: "Mara Jensen",
    time: "09:44",
    paragraphs: [
      "That explains it — our API traffic did spike in March. Where can I see the overage itself?",
    ],
  },
  {
    kind: "message",
    id: "msg-5",
    role: "assistant",
    author: "Praxis Copilot",
    time: "09:44",
    paragraphs: [
      "I've pinned the March usage export to this session so you can open it alongside the chat — see “Pinned session files” below.",
      "Short version: your Scale plan includes 3.1M API calls and you made 4.6M. The extra 1.5M calls fall into the overage tier — that's the $237 block, plus $18 regional tax.",
    ],
  },
  { kind: "system", id: "sys-2", text: "Copilot pinned 4 files · 09:45" },
  {
    kind: "message",
    id: "msg-6",
    role: "user",
    author: "Mara Jensen",
    time: "09:47",
    paragraphs: [
      "The spike was a load test our platform team forgot to gate. Could you draft a credit request for the $255 so I can send it to billing?",
    ],
  },
  {
    kind: "message",
    id: "msg-7",
    role: "assistant",
    author: "Praxis Copilot",
    time: "09:48",
    paragraphs: ["Sure — here's a draft prefilled from the numbers above:"],
    draft: [
      { label: "To", value: "billing@northwind.io" },
      { label: "Subject", value: "Credit request — invoice INV-2056" },
      { label: "Amount", value: "$255.00 · one-time credit" },
      {
        label: "Reason",
        value:
          "1.5M extra API calls from an ungated load test on Mar 18–19. Requesting a one-time credit under the Scale-plan goodwill policy.",
      },
    ],
  },
  {
    kind: "message",
    id: "msg-8",
    role: "assistant",
    author: "Praxis Copilot",
    time: "09:49",
    paragraphs: [
      "Edit anything before I send it. Once billing approves, the credit posts as its own line on the April invoice — median approval time for requests like this is two business days.",
      "While you review, two side notes from the audit:",
      "1. Your renewal on Apr 1 drops seats from $79 to $72 on the annual term, which offsets about $84 of this gap next cycle.\n\n2. The API meter resets on the 1st — with the load tests gated, April should land back under the included 3.1M calls.",
    ],
  },
  { kind: "system", id: "sys-3", text: "Draft ready for review · 09:52" },
];

const pinnedFiles: Array<{ name: string; meta: string; icon: LucideIcon }> = [
  { name: "march-usage-export.csv", meta: "CSV · 2.4 MB", icon: FileSpreadsheetIcon },
  { name: "INV-2056-march.pdf", meta: "PDF · 118 KB", icon: FileTextIcon },
  { name: "api-meter-march.json", meta: "JSON · 84 KB", icon: FileJsonIcon },
  { name: "rate-card-2025.pdf", meta: "PDF · 96 KB", icon: FileTextIcon },
  { name: "loadtest-report-18.md", meta: "Markdown · 12 KB", icon: FileCodeIcon },
  { name: "credit-policy.pdf", meta: "PDF · 210 KB", icon: FileTextIcon },
];

const sessionDetails: Array<[string, string]> = [
  ["Customer", "Northwind Analytics"],
  ["Contact", "Mara Jensen"],
  ["Plan", "Scale · 12 seats"],
  ["Region", "EU-West"],
  ["Started", "Today · 09:41"],
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden">
        {/* ---- Top bar ---- */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-card">
              <BotIcon className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-medium leading-tight">
                Praxis Support Copilot
              </h1>
              <p className="truncate text-xs leading-tight text-muted-foreground">
                Ticket #4821 · Billing — invoice discrepancy
              </p>
            </div>
            <span className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500/80" />
              Live
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="icon-sm" aria-label="Session settings">
              <SettingsIcon />
            </Button>
            <Button variant="outline" size="sm">
              <Share2Icon />
              Share
            </Button>
            <a
              href="#"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              <ExternalLinkIcon />
              Open ticket
            </a>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ---- Main column ---- */}
          <main className="flex min-w-0 flex-1 flex-col">
            {/* Transcript */}
            <MessageScrollerProvider defaultScrollPosition="last-anchor">
              <MessageScroller className="min-h-0 flex-1">
                <MessageScrollerViewport>
                  <MessageScrollerContent className="mx-auto w-full max-w-2xl gap-4 px-6 py-5">
                    {transcript.map((entry) => {
                      if (entry.kind === "system") {
                        return (
                          <MessageScrollerItem
                            key={entry.id}
                            className="flex justify-center"
                          >
                            <div className="inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
                              <span className="size-1 rounded-full bg-muted-foreground/60" />
                              {entry.text}
                            </div>
                          </MessageScrollerItem>
                        );
                      }

                      const isUser = entry.role === "user";

                      return (
                        <MessageScrollerItem
                          key={entry.id}
                          messageId={entry.id}
                          scrollAnchor={isUser}
                        >
                          <div
                            className={
                              isUser
                                ? "flex flex-col items-end gap-1.5"
                                : "flex flex-col items-start gap-1.5"
                            }
                          >
                            <p className="px-0.5 text-xs text-muted-foreground">
                              {entry.author} · {entry.time}
                            </p>
                            <div
                              className={
                                isUser
                                  ? "max-w-[85%] space-y-3 rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground"
                                  : "max-w-[85%] space-y-3 rounded-2xl rounded-bl-md border bg-card px-4 py-3 text-sm leading-relaxed text-card-foreground"
                              }
                            >
                              {entry.paragraphs.map((paragraph, index) => (
                                <p key={index} className="whitespace-pre-line">
                                  {paragraph}
                                </p>
                              ))}
                              {entry.draft ? (
                                <div className="rounded-lg border border-border/60 bg-background/50 p-3.5">
                                  <dl className="grid gap-2 text-[13px] leading-relaxed">
                                    {entry.draft.map((row) => (
                                      <div
                                        key={row.label}
                                        className="grid grid-cols-[76px_1fr] gap-3"
                                      >
                                        <dt className="text-muted-foreground">
                                          {row.label}
                                        </dt>
                                        <dd className="min-w-0">{row.value}</dd>
                                      </div>
                                    ))}
                                  </dl>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </MessageScrollerItem>
                      );
                    })}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </MessageScrollerProvider>

            {/* Pinned session files — horizontal scroll strip */}
            <section className="shrink-0 border-t">
              <div className="flex items-center justify-between gap-4 px-6 pb-1.5 pt-3">
                <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Pinned session files
                </h2>
                <a
                  href="#"
                  className={buttonVariants({ variant: "link", size: "sm" })}
                >
                  Manage files
                </a>
              </div>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max gap-3 px-6 pb-4 pt-1">
                  {pinnedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex w-56 shrink-0 items-center gap-3 rounded-lg border bg-card/60 px-3 py-2.5"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-foreground">
                        <file.icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium leading-snug">
                          {file.name}
                        </p>
                        <p className="truncate text-xs leading-snug text-muted-foreground">
                          {file.meta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            {/* Composer */}
            <footer className="shrink-0 border-t px-6 py-4">
              <div className="mx-auto flex w-full max-w-2xl items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Attach a file">
                  <PaperclipIcon />
                </Button>
                <input
                  aria-label="Message Praxis Copilot"
                  placeholder="Ask about ticket #4821…"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-input bg-background/60 px-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Button className="h-10 px-4">
                  <SendIcon />
                  Send
                </Button>
              </div>
            </footer>
          </main>

          {/* ---- Session sidebar ---- */}
          <aside className="hidden w-72 shrink-0 flex-col gap-6 border-l bg-card/40 p-5 lg:flex">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium">
                PC
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Praxis Copilot</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground/70" />
                  Assisting · replies in ~4s
                </p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <section className="grid gap-3">
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Session
              </h2>
              <dl className="grid gap-2.5 text-sm">
                {sessionDetails.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[88px_1fr] gap-3">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="min-w-0 truncate">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="h-px bg-border" />

            <section className="grid gap-3">
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Next actions
              </h2>
              <div className="grid gap-2">
                <Button size="sm" className="w-full">
                  <CheckIcon />
                  Mark resolved
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowUpRightIcon />
                  Escalate to billing
                </Button>
              </div>
            </section>

            <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
              First response 2m 14s · Resolution SLA 12h remaining
            </p>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
