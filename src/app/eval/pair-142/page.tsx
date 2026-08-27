"use client";

import React from "react";
import {
  CheckCheck,
  Clock3,
  LifeBuoy,
  PanelRight,
  Paperclip,
  SendHorizontal,
  Zap,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const inboxTickets = [
  {
    id: "#4821",
    subject: "Checkout latency after deploy",
    meta: "P1",
    time: "10:43",
    active: true,
  },
  { id: "#4818", subject: "Refund not received", meta: "P3", time: "09:02" },
  { id: "#4814", subject: "VAT invoice mismatch", meta: "P2", time: "Yesterday" },
  { id: "#4809", subject: "Login loop on SSO", meta: "P2", time: "Monday" },
];

const replyTemplates = [
  { label: "Latency acknowledged", meta: "Used 24x" },
  { label: "Incident status update", meta: "Used 11x" },
  { label: "Escalate to engineering", meta: "Used 6x" },
];

const ticketDetails = [
  ["Requester", "Marta Aydin — Acme Corp"],
  ["Assignee", "Dana Kim (you)"],
  ["Squad", "Billing platform"],
  ["Region", "eu-central-1"],
  ["Plan", "Enterprise"],
];

const ticketActivity = [
  ["10:40", "Rollback of deploy 14.02 started"],
  ["10:38", "Latency alert fired for checkout"],
  ["10:36", "Ticket escalated to P1"],
  ["09:12", "Ticket created from customer email"],
];

export default function Page() {
  const [detailsOpen, setDetailsOpen] = React.useState(true);

  return (
    <EvalShell theme="dark" dir="ltr">
      {/* Scenario: Meridian Desk support inbox — agent working a P1 billing
          incident: transcript on the left, ticket details in a right-side
          drawer (non-modal), reply-templates popover open above the composer. */}
      <div className="text-foreground flex h-screen w-full overflow-hidden">
        {/* Inbox list — supporting chrome */}
        <aside className="flex w-[220px] shrink-0 flex-col border-r">
          <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <LifeBuoy className="size-4" />
            <span className="text-sm font-semibold">Meridian Desk</span>
          </div>
          <p className="text-muted-foreground px-4 pt-4 pb-2 text-xs font-medium tracking-wide uppercase">
            Inbox · 4 open
          </p>
          <nav className="flex flex-col gap-1 px-2">
            {inboxTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`rounded-md px-2.5 py-2 ${
                  ticket.active ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground text-xs">{ticket.id}</span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <span
                      className={
                        ticket.active ? "text-destructive" : "text-muted-foreground"
                      }
                    >
                      {ticket.meta}
                    </span>
                    <span className="text-muted-foreground">{ticket.time}</span>
                  </span>
                </div>
                <p className="mt-1 truncate text-sm">{ticket.subject}</p>
              </div>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2 border-t p-4">
            <Avatar size="sm">
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-none">Dana Kim</p>
              <p className="text-muted-foreground mt-1.5 flex items-center gap-1.5 text-xs leading-none">
                <span className="size-1.5 rounded-full bg-success-500" />
                Online
              </p>
            </div>
          </div>
        </aside>

        {/* Conversation column */}
        <main className="flex w-[420px] shrink-0 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-none">
                Checkout latency after 14:02 deploy
              </p>
              <p className="text-muted-foreground mt-1.5 truncate text-xs leading-none">
                Ticket #4821 · Billing · Marta Aydin (Acme Corp)
              </p>
            </div>
            <Drawer
              direction="right"
              modal={false}
              dismissible={false}
              open={detailsOpen}
              onOpenChange={setDetailsOpen}
            >
              <DrawerTrigger
                render={
                  <Button
                    variant={detailsOpen ? "secondary" : "outline"}
                    size="sm"
                    aria-pressed={detailsOpen}
                  >
                    <PanelRight />
                    Details
                  </Button>
                }
              />
              <DrawerContent className="w-96 sm:max-w-96">
                <DrawerHeader className="border-b">
                  <DrawerTitle>Ticket #4821</DrawerTitle>
                  <DrawerDescription>
                    Checkout latency after 14:02 deploy · Billing platform
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg border bg-muted/40 p-2.5">
                      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                        Priority
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-destructive">
                        P1 · Urgent
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-2.5">
                      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                        SLA
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-warning-600">
                        18m left
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-2.5">
                      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                        Channel
                      </p>
                      <p className="mt-1.5 text-sm font-semibold">Email</p>
                    </div>
                  </div>

                  <div className="mt-4 divide-y rounded-lg border">
                    {ticketDetails.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 px-3 py-2.5"
                      >
                        <span className="text-muted-foreground text-sm">{label}</span>
                        <span className="truncate text-sm text-right">{value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground mt-4 text-xs font-medium tracking-wide uppercase">
                    Recent activity
                  </p>
                  <div className="mt-1">
                    {ticketActivity.map(([time, text]) => (
                      <div key={time + text} className="flex items-baseline gap-3 py-1.5">
                        <span className="text-muted-foreground w-9 shrink-0 text-xs tabular-nums">
                          {time}
                        </span>
                        <span className="text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <DrawerFooter className="flex-row items-center justify-end gap-2 border-t">
                  <DrawerClose render={<Button variant="outline">Close</Button>} />
                  <Button>Resolve ticket</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </header>

          {/* Transcript */}
          <div className="flex-1 overflow-hidden px-4 pt-4">
            <MessageGroup>
              <Message>
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader>
                    Marta Aydin
                    <span className="text-muted-foreground font-normal">
                      · Acme Corp
                    </span>
                  </MessageHeader>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Our checkout started timing out around 14:05 — error rate
                      is near 40% on mobile.
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter>
                    <Clock3 className="size-3.5" />
                    Today · 10:38
                  </MessageFooter>
                </MessageContent>
              </Message>

              <Message align="end">
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <BubbleGroup>
                    <Bubble variant="primary" align="end">
                      <BubbleContent>
                        On it — pulling the checkout dashboards now.
                      </BubbleContent>
                    </Bubble>
                    <Bubble variant="primary" align="end">
                      <BubbleContent>p95 is 4.2 s, up from 310 ms.</BubbleContent>
                    </Bubble>
                  </BubbleGroup>
                  <MessageFooter>
                    <CheckCheck className="size-3.5" />
                    Read · 10:40
                  </MessageFooter>
                </MessageContent>
              </Message>

              <Message>
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Thanks — our launch review is at 11:00. Any chance of a
                      fix before then?
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter>
                    <Clock3 className="size-3.5" />
                    Today · 10:42
                  </MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </div>

          {/* Composer with reply-templates popover */}
          <div className="shrink-0 border-t p-3">
            <div className="flex items-center gap-2">
              <Popover defaultOpen>
                <PopoverTrigger
                  render={
                    <Button variant="outline" size="sm">
                      <Zap />
                      Templates
                    </Button>
                  }
                />
                <PopoverContent side="top" align="start" className="w-80">
                  <PopoverHeader>
                    <PopoverTitle>Reply templates</PopoverTitle>
                    <PopoverDescription>
                      Saved replies for billing incidents.
                    </PopoverDescription>
                  </PopoverHeader>
                  <div className="mt-3 grid gap-1">
                    {replyTemplates.map((template) => (
                      <div
                        key={template.label}
                        className="flex cursor-default items-center justify-between gap-3 rounded-md px-2 py-2"
                      >
                        <span className="truncate text-sm">{template.label}</span>
                        <span className="text-muted-foreground shrink-0 text-xs">
                          {template.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                  <PopoverFooter className="mt-3">
                    <span className="text-muted-foreground text-xs">
                      3 of 12 templates
                    </span>
                    <span className="text-xs font-medium">Browse all</span>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <div className="text-muted-foreground bg-input/30 flex h-9 min-w-0 flex-1 items-center rounded-md border px-3 text-sm">
                Write a reply…
              </div>
              <Button variant="ghost" size="icon-sm" aria-label="Attach a file">
                <Paperclip />
              </Button>
              <Button size="icon-sm" aria-label="Send reply">
                <SendHorizontal />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
