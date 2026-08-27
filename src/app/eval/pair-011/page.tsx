"use client";

/**
 * EVAL page (pair-011) — ui:message-scroller + ui:input-group + ds:DialogLayout
 * Conditions: desktop-wide 1440x900, light theme, ltr, no constraint.
 * Scenario: "Praxis Support" agent console — an agent reviews a customer's
 * double-billing conversation from the top of the transcript and confirms the
 * open escalation dialog that hands the thread to the billing team.
 */

import React from "react";
import { PaperclipIcon, SearchIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@/components/ui/message-scroller";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { DialogLayout } from "@/components/ds/DialogLayout";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";
import { cn } from "@/lib/utils";

type TranscriptMessage = {
  id: string;
  role: "customer" | "agent";
  sender: string;
  time: string;
  text: string;
};

const transcript: TranscriptMessage[] = [
  {
    id: "msg-1",
    role: "customer",
    sender: "Dana Kovács",
    time: "09:12",
    text: "Hi — we were double-charged for our October invoice. Two payments of $1,240 left our account on the same morning.",
  },
  {
    id: "msg-2",
    role: "agent",
    sender: "Mara · Support",
    time: "09:14",
    text: "Hi Dana, thanks for flagging this — sorry for the trouble. I can see both charges on the account from here. Let me pull up the invoice history and check what happened.",
  },
  {
    id: "msg-3",
    role: "customer",
    sender: "Dana Kovács",
    time: "09:18",
    text: "Thanks. We're on the Pro plan with annual billing — invoice #INV-2041, if that helps you find it faster.",
  },
  {
    id: "msg-4",
    role: "agent",
    sender: "Mara · Support",
    time: "09:21",
    text: "Found it. Invoice #INV-2041 was settled twice on 3 Oct: once by card and once by the backup ACH mandate left over from your previous billing profile. The second charge is a duplicate settlement, not a new invoice.",
  },
  {
    id: "msg-5",
    role: "customer",
    sender: "Dana Kovács",
    time: "09:33",
    text: "That matches what our finance team assumed. Can the duplicate be refunded to the original card?",
  },
  {
    id: "msg-6",
    role: "agent",
    sender: "Mara · Support",
    time: "09:35",
    text: "Yes — duplicate settlements are refunded by our billing team rather than regular support, so I'll need to hand this over to them. Nothing else changes on your subscription, and refunds usually land within 5 business days of their first reply.",
  },
  {
    id: "msg-7",
    role: "customer",
    sender: "Dana Kovács",
    time: "09:47",
    text: "Perfect, please go ahead. One more thing — keep the backup ACH mandate disabled so this can't repeat next month.",
  },
  {
    id: "msg-8",
    role: "agent",
    sender: "Mara · Support",
    time: "09:52",
    text: "Done — the backup ACH mandate is disabled and I've noted the request on the account. Escalating this conversation to Billing now so they can issue the refund to your card ending 4242.",
  },
];

const conversations = [
  {
    name: "Dana Kovács",
    snippet: "Double charge on October invoice…",
    time: "09:12",
    unread: true,
  },
  {
    name: "Tomas Fisher",
    snippet: "Refund status for INV-1988",
    time: "08:47",
    unread: true,
  },
  {
    name: "Amara Osei",
    snippet: "Cannot update payment method",
    time: "Yesterday",
    unread: false,
  },
  {
    name: "Louis Bernard",
    snippet: "Q3 export failed at 90%",
    time: "Yesterday",
    unread: false,
  },
  {
    name: "Priya Nair",
    snippet: "Seat count after downgrade",
    time: "Mon",
    unread: false,
  },
];

const activity = [
  { label: "Refund requested — $1,240 · card 4242", time: "09:58" },
  { label: "Backup ACH mandate disabled", time: "09:52" },
  { label: "Duplicate settlement confirmed", time: "09:41" },
  { label: "Conversation opened", time: "09:12" },
];

function ScrollStatus() {
  const { start, end } = useMessageScrollerScrollable();

  const label =
    start && end
      ? "You can scroll both ways."
      : end
        ? "At the oldest message — scroll down for the latest."
        : start
          ? "At the newest message — scroll up for history."
          : "All messages fit in view.";

  return <span>{label}</span>;
}

export default function Page() {
  const [escalateOpen, setEscalateOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-6 border-b px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-[4px] bg-primary font-code text-[12px] font-medium text-primary-foreground">
              P
            </div>
            <span className="text-sm font-semibold">Praxis Support</span>
          </div>
          <InputGroup className="w-80">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search conversations"
              aria-label="Search conversations"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText className="font-mono text-xs">⌘K</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-full bg-muted font-code text-[11px] text-muted-foreground">
              MC
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium leading-4">Mara Chen</span>
              <span className="text-[11px] leading-4 text-muted-foreground">
                Support · Tier 2
              </span>
            </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex min-h-0 flex-1">
          {/* Conversation list */}
          <aside className="flex w-[264px] shrink-0 flex-col border-r">
            <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Inbox
              </span>
              <span className="rounded-full border px-1.5 py-0.5 font-code text-[10px] text-muted-foreground">
                12 open
              </span>
            </div>
            <nav className="flex flex-col">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.name}
                  className={cn(
                    "flex flex-col gap-1 border-b px-4 py-3",
                    index === 0 && "bg-muted/60"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate text-sm font-medium">
                        {conversation.name}
                      </span>
                      {conversation.unread ? (
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      ) : null}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {conversation.snippet}
                  </p>
                </div>
              ))}
            </nav>
          </aside>

          {/* Conversation */}
          <main className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b px-6">
              <div className="flex min-w-0 items-baseline gap-2">
                <h1 className="truncate text-sm font-semibold">Dana Kovács</h1>
                <span className="truncate text-sm text-muted-foreground">
                  Duplicate charge on October invoice
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  Open
                </span>
                <span className="rounded-full border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  SLA 3h 58m
                </span>
              </div>
            </div>

            <MessageScrollerProvider defaultScrollPosition="start">
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-hidden">
                  <MessageScroller>
                    <MessageScrollerViewport aria-label="Conversation transcript">
                      <MessageScrollerContent>
                        <MessageScrollerItem className="flex justify-center">
                          <span className="rounded-full border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                            Today · 3 Oct
                          </span>
                        </MessageScrollerItem>
                        {transcript.map((message) => (
                          <MessageScrollerItem
                            key={message.id}
                            messageId={message.id}
                            scrollAnchor={message.role === "customer"}
                            className={cn(
                              "flex flex-col gap-1.5",
                              message.role === "customer"
                                ? "items-end"
                                : "items-start"
                            )}
                          >
                            <span className="px-1 text-[11px] font-medium text-muted-foreground">
                              {message.sender} · {message.time}
                            </span>
                            <div
                              className={cn(
                                "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm",
                                message.role === "customer"
                                  ? "bg-primary text-primary-foreground"
                                  : "border bg-card text-card-foreground"
                              )}
                            >
                              {message.text}
                            </div>
                          </MessageScrollerItem>
                        ))}
                      </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                  </MessageScroller>
                </div>
                <div className="flex h-10 shrink-0 items-center justify-between border-t px-6 text-xs text-muted-foreground">
                  <span>Conversation · 8 messages</span>
                  <ScrollStatus />
                </div>
              </div>
            </MessageScrollerProvider>

            {/* Composer */}
            <div className="shrink-0 border-t p-3">
              <InputGroup className="h-auto">
                <InputGroupAddon>
                  <InputGroupButton
                    size="icon-xs"
                    aria-label="Attach a file"
                    title="Attach a file"
                  >
                    <PaperclipIcon />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupTextarea
                  aria-label="Reply to Dana"
                  placeholder="Reply to Dana — she receives your response by email…"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-xs">0 / 2,000</InputGroupText>
                  <InputGroupButton
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                  >
                    Insert macro
                  </InputGroupButton>
                  <InputGroupButton variant="default" size="sm">
                    Send reply
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </main>

          {/* Customer panel */}
          <aside className="flex w-[312px] shrink-0 flex-col gap-6 border-l p-5">
            <section className="flex flex-col gap-4">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Customer
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-neutral-100 font-code text-[13px] text-neutral-500">
                  DK
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">Dana Kovács</p>
                  <p className="truncate text-xs text-muted-foreground">
                    dana@kovacslabs.io
                  </p>
                </div>
              </div>
              <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-2 text-xs">
                <dt className="text-muted-foreground">Company</dt>
                <dd className="truncate">Kovács Labs GmbH</dd>
                <dt className="text-muted-foreground">Plan</dt>
                <dd className="truncate">Pro · Annual</dd>
                <dt className="text-muted-foreground">Seats</dt>
                <dd>42</dd>
                <dt className="text-muted-foreground">Region</dt>
                <dd>EU · Berlin</dd>
                <dt className="text-muted-foreground">Since</dt>
                <dd>Mar 2023</dd>
              </dl>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Recent activity
              </h2>
              <ol className="flex flex-col gap-3">
                {activity.map((event) => (
                  <li key={event.label} className="flex items-start gap-2.5">
                    <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-neutral-300" />
                    <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                      <span className="text-xs">{event.label}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {event.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-auto flex flex-col gap-3 border-t pt-5">
              <p className="text-xs text-muted-foreground">
                Refunds above $500 need a billing specialist on the reply.
              </p>
              <Button
                className="w-full"
                onClick={() => setEscalateOpen(true)}
              >
                Escalate to billing
              </Button>
            </div>
          </aside>
        </div>

        {/* Escalation confirmation — open, non-modal, scoped to the console */}
        <DialogLayout
          open={escalateOpen}
          onOpenChange={setEscalateOpen}
          modal={false}
          className="absolute inset-0"
        >
          <div className="flex w-[104px] shrink-0 flex-col items-start gap-2 pt-1 max-sm:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-neutral-100 font-code text-[13px] text-neutral-500">
              DK
            </div>
            <span className="text-caption font-caption text-neutral-500">
              Dana Kovács
            </span>
            <span className="font-code text-[11px] text-neutral-400">
              Pro · 42 seats
            </span>
          </div>
          <div className="flex w-[296px] max-w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <SubframeCore.Dialog.Title className="text-heading-2 font-heading-2 text-default-font">
                Escalate to billing?
              </SubframeCore.Dialog.Title>
              <SubframeCore.Dialog.Description className="text-body font-body text-neutral-500">
                Dana is notified that her conversation moved to the billing
                queue. The transcript stays read-only for you until a billing
                specialist picks it up and issues the $1,240 refund.
              </SubframeCore.Dialog.Description>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-2">
              <Button variant="secondary" onClick={() => setEscalateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setEscalateOpen(false)}>Escalate</Button>
            </div>
          </div>
        </DialogLayout>
      </div>
    </EvalShell>
  );
}
