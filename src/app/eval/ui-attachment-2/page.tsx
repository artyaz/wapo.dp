"use client";

// EVAL page — attachment p2 — customer support ticket inbox — 834x1112 light (tablet)

import {
  ClockIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PaperclipIcon,
  PlusIcon,
  SendIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { EvalShell } from "@/eval/EvalShell";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const dashboardShot =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80";

type TicketStatus = "open" | "in-progress" | "waiting";

const tickets: {
  id: string
  subject: string
  requester: string
  time: string
  status: TicketStatus
  active?: boolean
}[] = [
  {
    id: "4829",
    subject: "Payment webhook retries in a loop",
    requester: "Priya Natarajan",
    time: "2h ago",
    status: "open",
  },
  {
    id: "4831",
    subject: "Cannot export ledger to CSV",
    requester: "Tomás Ruiz",
    time: "45m ago",
    status: "in-progress",
  },
  {
    id: "4812",
    subject: "VPN gateway drops every ~20 minutes",
    requester: "Maren Okafor",
    time: "3h ago",
    status: "in-progress",
    active: true,
  },
  {
    id: "4815",
    subject: "SSO login loops on Safari 17",
    requester: "Jonas Kjellberg",
    time: "5h ago",
    status: "open",
  },
  {
    id: "4809",
    subject: "Invoice PDF missing tax ID",
    requester: "Alba Moreno",
    time: "yesterday",
    status: "waiting",
  },
];

const statusLabel: Record<TicketStatus, string> = {
  open: "Open",
  "in-progress": "In progress",
  waiting: "Waiting",
};

const statusVariant: Record<
  TicketStatus,
  "outline" | "secondary" | "ghost"
> = {
  open: "outline",
  "in-progress": "secondary",
  waiting: "ghost",
};

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-default-border px-4">
          <span className="font-heading-3 text-heading-3 text-foreground">
            Meridian Support
          </span>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Tier 2 · EMEA
          </Badge>
          <div className="ms-auto flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search tickets…"
              aria-label="Search tickets"
              className="w-52"
            />
            <Button size="sm" variant="outline">
              <PlusIcon />
              New
            </Button>
            <Avatar size="sm">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[288px_1fr]">
          {/* Ticket list */}
          <aside className="flex min-h-0 flex-col border-e border-default-border">
            <div className="flex shrink-0 items-center justify-between border-b border-default-border px-4 py-3">
              <span className="text-sm font-medium">Open tickets</span>
              <span className="font-code text-xs text-muted-foreground">12</span>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  aria-current={ticket.active ? "true" : undefined}
                  className={cn(
                    "cursor-pointer border-b border-default-border border-s-2 py-3 ps-[14px] pe-4",
                    ticket.active
                      ? "border-s-primary bg-accent"
                      : "border-s-transparent hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-code text-xs text-muted-foreground">
                      #{ticket.id}
                    </span>
                    <Badge variant={statusVariant[ticket.status]}>
                      {statusLabel[ticket.status]}
                    </Badge>
                  </div>
                  <p className="mt-1.5 truncate text-sm font-medium text-foreground">
                    {ticket.subject}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {ticket.requester} · {ticket.time}
                  </p>
                </li>
              ))}
            </ul>
          </aside>

          {/* Conversation */}
          <main className="min-h-0 overflow-y-auto px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-code text-xs text-muted-foreground">
                  #4812 · VPN &amp; Networking
                </p>
                <h1 className="mt-1 font-heading-2 text-heading-2 text-foreground">
                  VPN gateway drops every ~20 minutes
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 pt-1">
                <Badge variant="secondary">In progress</Badge>
                <Badge
                  variant="outline"
                  className="gap-1 border-warning-300 bg-warning-50 text-warning-700"
                >
                  <ClockIcon />
                  SLA 3h 12m
                </Badge>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Avatar size="sm">
                <AvatarFallback>MO</AvatarFallback>
              </Avatar>
              <span>
                <span className="font-medium text-foreground">
                  Maren Okafor
                </span>{" "}
                · maren.okafor@arcticwind.example
              </span>
              <span>·</span>
              <span>opened Mar 14, 09:42 UTC</span>
              <span>·</span>
              <span>
                assignee{" "}
                <span className="font-medium text-foreground">
                  Rosa Lindqvist
                </span>
              </span>
            </div>

            <Separator className="my-4" />

            {/* Customer message with attachments */}
            <div className="flex gap-3">
              <Avatar className="mt-0.5" size="sm">
                <AvatarFallback>MO</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Maren Okafor
                  </span>
                  <span className="font-code text-xs text-muted-foreground">
                    Mar 14, 09:42
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  Since this morning the Berlin gateway drops every VPN session
                  after roughly 20 minutes. Reconnecting works, but it is
                  breaking our shift handovers. Attached are the gateway log
                  from this morning, a screenshot of the dashboard at the
                  moment of a drop, and yesterday&apos;s speedtest results.
                </p>

                <AttachmentGroup className="mt-3">
                  {/* Gateway log */}
                  <Attachment state="done" size="sm">
                    <AttachmentMedia>
                      <FileTextIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>gateway-berlin-mar14.log</AttachmentTitle>
                      <AttachmentDescription>
                        Uploaded · TXT · 48 KB
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions className="opacity-100!">
                      <AttachmentAction
                        variant="ghost"
                        aria-label="Download gateway-berlin-mar14.log"
                      >
                        <DownloadIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                    <AttachmentTrigger
                      render={
                        <a
                          href="#gateway-log"
                          aria-label="Open gateway-berlin-mar14.log"
                        />
                      }
                    />
                  </Attachment>

                  {/* Dashboard screenshot — image attachment */}
                  <Attachment
                    state="done"
                    orientation="vertical"
                    className="max-w-[360px]"
                  >
                    <AttachmentMedia variant="image">
                      <img
                        src={dashboardShot}
                        alt="VPN dashboard at the moment of the drop"
                      />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>vpn-dashboard-error.png</AttachmentTitle>
                      <AttachmentDescription>
                        Uploaded · PNG · 1.2 MB
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions className="opacity-100!">
                      <AttachmentAction
                        variant="ghost"
                        aria-label="Remove vpn-dashboard-error.png"
                      >
                        <XIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                    <AttachmentTrigger
                      render={
                        <a
                          href={dashboardShot}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Preview vpn-dashboard-error.png"
                        />
                      }
                    />
                  </Attachment>

                  {/* Speedtest results */}
                  <Attachment state="done" size="sm">
                    <AttachmentMedia>
                      <FileSpreadsheetIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>speedtest-results.csv</AttachmentTitle>
                      <AttachmentDescription>
                        Uploaded · CSV · 18 KB
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions className="opacity-100!">
                      <AttachmentAction
                        variant="ghost"
                        aria-label="Download speedtest-results.csv"
                      >
                        <DownloadIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                    <AttachmentTrigger
                      render={
                        <a
                          href="#speedtest"
                          aria-label="Open speedtest-results.csv"
                        />
                      }
                    />
                  </Attachment>
                </AttachmentGroup>
              </div>
            </div>

            {/* Agent reply */}
            <div className="mt-5 flex gap-3">
              <Avatar className="mt-0.5" size="sm">
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Rosa Lindqvist
                  </span>
                  <span className="rounded-sm bg-muted px-1.5 py-px text-[11px] text-muted-foreground">
                    Agent
                  </span>
                  <span className="font-code text-xs text-muted-foreground">
                    Mar 14, 10:18
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  Thanks Maren — the log shows rekey timeouts at exact
                  19-minute intervals, which matches a known IKEv2 issue on
                  gateway firmware 7.2.4. I have reserved a maintenance window
                  for the Berlin gateway tonight at 02:00 UTC and attached the
                  maintenance notes below so your on-call knows what to expect.
                </p>
              </div>
            </div>

            {/* Uploading attachment sits above the composer so the pending
                file reads as part of the reply, not a nested card-in-card */}
            <Attachment state="uploading" size="sm" className="mt-6 mb-3">
              <AttachmentMedia>
                <Spinner />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>gateway-maintenance-notes.pdf</AttachmentTitle>
                <AttachmentDescription>
                  Uploading · 78% · 3.4 MB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions className="opacity-100!">
                <AttachmentAction
                  variant="ghost"
                  aria-label="Cancel upload of gateway-maintenance-notes.pdf"
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
              {/* Edge-mounted upload progress: out of flow, so the card
                  keeps the exact height/padding rhythm of its siblings */}
              <Progress
                value={78}
                className="absolute inset-x-2.5 bottom-0 h-0.5! w-auto!"
              />
            </Attachment>

            {/* Composer */}
            <div className="rounded-lg border border-default-border bg-card p-3">
              <Textarea
                aria-label="Reply to Maren Okafor"
                placeholder="Reply to Maren…"
                className="min-h-16"
              />

              <AttachmentTrigger className="mt-3">
                <PaperclipIcon />
                Attach files or drop them here
              </AttachmentTrigger>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Visible to customer · sent from Meridian Support
                </span>
                <Button size="sm">
                  <SendIcon />
                  Send reply
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
