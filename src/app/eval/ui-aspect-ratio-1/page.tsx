"use client";

/**
 * EVAL page — aspect-ratio p1 — customer support ticket inbox — 1024x768 light.
 * AspectRatio drives: ticket-row attachment thumbs (1:1), the 16:9 customer
 * screenshot in the detail pane, and the attachment strip (4:3 + 1:1).
 * Co-stars: Tabs, Badge, Button, Avatar(+AvatarGroup), Separator, Input.
 */

import React from "react";
import {
  CheckCheckIcon,
  InboxIcon,
  LifeBuoyIcon,
  PaperclipIcon,
  SearchIcon,
  SendIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Status = "urgent" | "open" | "pending";

const statusMeta: Record<
  Status,
  { label: string; variant: "destructive" | "secondary" | "outline" }
> = {
  urgent: { label: "Urgent", variant: "destructive" },
  open: { label: "Open", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
};

const queues = [
  { label: "All inboxes", count: 23, active: true },
  { label: "Assigned to me", count: 4 },
  { label: "Waiting on customer", count: 7 },
  { label: "SLA at risk", count: 2 },
];

const savedViews = ["Billing", "Enterprise", "Mobile app"];

const tickets: {
  id: number;
  subject: string;
  customer: string;
  queue: string;
  status: Status;
  time: string;
  thumb: string;
}[] = [
  {
    id: 4829,
    subject: "Card declined at checkout for annual plan",
    customer: "Nadia Kettler",
    queue: "Billing",
    status: "urgent",
    time: "14:02",
    thumb: "https://picsum.photos/seed/t4829/96/96",
  },
  {
    id: 4827,
    subject: "Cannot upload profile photo over 5 MB",
    customer: "Marcus Lee",
    queue: "Mobile",
    status: "open",
    time: "13:47",
    thumb: "https://picsum.photos/seed/t4827/96/96",
  },
  {
    id: 4826,
    subject: "Duplicate charge on invoice #INV-20941",
    customer: "Priya Raman",
    queue: "Billing",
    status: "pending",
    time: "12:15",
    thumb: "https://picsum.photos/seed/t4826/96/96",
  },
  {
    id: 4825,
    subject: "SSO login loop after password reset",
    customer: "Tomás Álvarez",
    queue: "Access",
    status: "open",
    time: "11:58",
    thumb: "https://picsum.photos/seed/t4825/96/96",
  },
  {
    id: 4824,
    subject: "CSV export missing the “Seats” column",
    customer: "Grace Osei",
    queue: "Reports",
    status: "pending",
    time: "11:30",
    thumb: "https://picsum.photos/seed/t4824/96/96",
  },
];

const team = [{ initials: "AO" }, { initials: "JW" }, { initials: "RS" }];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* ---------- App header ---------- */}
        <header className="flex h-12 shrink-0 items-center gap-4 border-b border-default-border bg-background px-4">
          <div className="flex items-center gap-2">
            <LifeBuoyIcon className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold tracking-tight">Praxis Desk</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="relative hidden w-64 md:block">
            <SearchIcon className="absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tickets, customers…"
              className="h-8 ps-8 text-sm"
              aria-label="Search tickets"
            />
          </div>
          <div className="ms-auto flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground">
              Queue: EU · 09:00–17:00
            </span>
            <AvatarGroup>
              {team.map((m) => (
                <Avatar key={m.initials}>
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+6</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </header>

        {/* ---------- Body ---------- */}
        <div className="flex min-h-0 flex-1">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 flex-col gap-5 border-e border-default-border p-4 lg:flex">
            <nav aria-label="Queues" className="flex flex-col gap-0.5">
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Queues
              </p>
              {queues.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                    q.active
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <InboxIcon className="size-3.5" />
                    {q.label}
                  </span>
                  <span className="font-code text-xs text-muted-foreground">{q.count}</span>
                </button>
              ))}
            </nav>
            <div>
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Saved views
              </p>
              <ul className="flex flex-col gap-0.5">
                {savedViews.map((v) => (
                  <li key={v}>
                    <button
                      type="button"
                      className="w-full rounded-md px-2 py-1.5 text-start text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                    >
                      {v}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Ticket list */}
          <section className="flex w-80 shrink-0 flex-col border-e border-default-border">
            <div className="flex shrink-0 items-center justify-center gap-2 border-b border-default-border px-4 py-2.5">
              <Tabs defaultValue="open">
                <TabsList className="h-7">
                  <TabsTrigger value="open" className="px-2 text-xs">
                    Open · 12
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="px-2 text-xs">
                    Pending · 7
                  </TabsTrigger>
                  <TabsTrigger value="all" className="px-2 text-xs">
                    All
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {tickets.map((t, i) => (
                <React.Fragment key={t.id}>
                  <button
                    type="button"
                    className={`flex w-full items-start gap-3 px-4 py-3 text-start transition-colors ${
                      t.id === 4829 ? "bg-accent" : "hover:bg-accent/60"
                    }`}
                  >
                    {/* 1:1 attachment thumb — width constrained on the parent */}
                    <span className="w-9 shrink-0">
                      <AspectRatio
                        ratio={1 / 1}
                        className="overflow-hidden rounded-md border border-default-border bg-muted"
                      >
                        <img
                          src={t.thumb}
                          alt={`${t.customer} attachment preview`}
                          className="size-full object-cover grayscale"
                        />
                      </AspectRatio>
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-code text-[11px] text-muted-foreground">
                          #{t.id} · {t.queue}
                        </span>
                        <span className="font-code text-[11px] text-muted-foreground">
                          {t.time}
                        </span>
                      </span>
                      <span className="truncate text-sm font-medium">{t.subject}</span>
                      <span className="flex items-center gap-2">
                        <Badge variant={statusMeta[t.status].variant}>
                          {statusMeta[t.status].label}
                        </Badge>
                        <span className="truncate text-xs text-muted-foreground">
                          {t.customer}
                        </span>
                      </span>
                    </span>
                  </button>
                  {i < tickets.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Ticket detail */}
          <section className="flex min-w-0 flex-1 flex-col overflow-y-auto">
            <div className="flex flex-col gap-4 p-5">
              {/* Detail header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-code text-xs text-muted-foreground">
                    #4829 · Billing · Plan: Scale
                  </span>
                  <span className="ms-auto flex items-center gap-1.5">
                    <Badge variant="destructive">Urgent</Badge>
                    <Badge variant="outline">SLA 1h 12m</Badge>
                  </span>
                </div>
                <h1 className="font-heading-2 text-2xl leading-snug text-foreground">
                  Card declined at checkout for annual plan
                </h1>
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarFallback>NK</AvatarFallback>
                  </Avatar>
                  <span className="shrink-0 text-sm font-medium">Nadia Kettler</span>
                  <span className="truncate font-code text-xs text-muted-foreground">
                    nadia.kettler@brightloop.io
                  </span>
                  <span className="ms-auto shrink-0 whitespace-nowrap font-code text-xs text-muted-foreground">
                    Customer since 2021
                  </span>
                </div>
              </div>

              {/* 16:9 customer screenshot */}
              <div className="flex max-w-[420px] flex-col gap-1.5">
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-lg border border-default-border bg-muted"
                >
                  <img
                    src="https://picsum.photos/seed/checkout4829/1280/720"
                    alt="Customer screenshot of the checkout error"
                    className="size-full object-cover grayscale"
                  />
                </AspectRatio>
                <p className="font-code text-[11px] text-muted-foreground">
                  checkout-error.png · 1280 × 720 · 1.2 MB
                </p>
              </div>

              {/* Message */}
              <div className="flex max-w-[560px] flex-col gap-2 text-sm leading-relaxed">
                <p className="font-medium">Reproduced on Chrome 131 / macOS, incognito included.</p>
                <p className="text-muted-foreground">
                  Every attempt to pay for the annual plan fails with “Your card was
                  declined”, but the same card works for the monthly plan and my bank
                  shows no attempts. Screenshot attached — the error references
                  <span className="font-code text-xs"> code=insufficient_scope</span>.
                </p>
              </div>

              {/* Attachment strip: 4:3, 4:3, 1:1 */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Attachments · 3
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-24">
                    <AspectRatio
                      ratio={4 / 3}
                      className="overflow-hidden rounded-md border border-default-border bg-muted"
                    >
                      <img
                        src="https://picsum.photos/seed/card4829/480/360"
                        alt="Card artwork on file"
                        className="size-full object-cover grayscale"
                      />
                    </AspectRatio>
                    <p className="mt-1 truncate font-code text-[10px] text-muted-foreground">
                      card.png
                    </p>
                  </div>
                  <div className="w-24">
                    <AspectRatio
                      ratio={4 / 3}
                      className="overflow-hidden rounded-md border border-default-border bg-muted"
                    >
                      <img
                        src="https://picsum.photos/seed/receipt4829/480/360"
                        alt="Failed charge receipt"
                        className="size-full object-cover grayscale"
                      />
                    </AspectRatio>
                    <p className="mt-1 truncate font-code text-[10px] text-muted-foreground">
                      receipt.pdf
                    </p>
                  </div>
                  <div className="w-16">
                    <AspectRatio
                      ratio={1 / 1}
                      className="overflow-hidden rounded-md border border-default-border bg-muted"
                    >
                      <img
                        src="https://picsum.photos/seed/workspace4829/240/240"
                        alt="Workspace settings crop"
                        className="size-full object-cover grayscale"
                      />
                    </AspectRatio>
                    <p className="mt-1 truncate font-code text-[10px] text-muted-foreground">
                      ws.png
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply composer */}
              <div className="rounded-lg border border-default-border bg-card">
                <Input
                  placeholder="Write a reply to Nadia…"
                  className="h-10 rounded-b-none border-0 border-b border-default-border shadow-none focus-visible:ring-0"
                  aria-label="Reply message"
                />
                <div className="flex items-center justify-between px-2.5 py-2">
                  <Button variant="ghost" size="icon-xs" aria-label="Attach file">
                    <PaperclipIcon />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCheckIcon className="size-3.5" />
                      Resolve
                    </Button>
                    <Button size="sm">
                      <SendIcon className="size-3.5" />
                      Send reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Status bar ---------- */}
        <footer className="flex h-8 shrink-0 items-center justify-between border-t border-default-border px-4">
          <span className="font-code text-[11px] text-muted-foreground">
            8 agents online · median first response 11m 40s
          </span>
          <span className="font-code text-[11px] text-muted-foreground">
            SLA compliance 96.4%
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
