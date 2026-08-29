"use client";

// EVAL page — message-scroller p3 — engineering team wiki — 1280x800 dark

import React from "react";
import {
  BookIcon,
  FileTextIcon,
  GitBranchIcon,
  HomeIcon,
  PencilIcon,
  SearchIcon,
  SirenIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@/components/ui/message-scroller";
import { Separator } from "@/components/ui/separator";

const spaces = [
  { icon: HomeIcon, label: "Home", active: false },
  { icon: BookIcon, label: "Architecture", active: false },
  { icon: FileTextIcon, label: "Runbooks", active: false, count: "12" },
  { icon: GitBranchIcon, label: "CI / CD", active: true },
  { icon: SirenIcon, label: "Postmortems", active: false, count: "5" },
];

const comments = [
  {
    id: "c1",
    initials: "DN",
    author: "Dana Nguyen",
    role: "Payments",
    time: "11:02",
    text: "Does the canary step support stateful services, or is it still stateless-only?",
  },
  {
    id: "c2",
    initials: "MK",
    author: "Marco Kim",
    role: "Platform",
    time: "11:10",
    text: "Stateless only for now — stateful rides the blue/green lane. Added a note at the end of §3.",
  },
  {
    id: "c3",
    initials: "JP",
    author: "Jin Park",
    role: "Platform",
    time: "11:21",
    text: "The artifact step failed on S3 perms twice this week. Fixed by the runbook: runbooks/artifact-perms.",
  },
  {
    id: "c4",
    initials: "RC",
    author: "Riley Chen",
    role: "Search",
    time: "11:34",
    text: "That runbook saved our on-call on Tuesday. Linking it from the pipeline README so it's one hop away.",
  },
  {
    id: "c5",
    initials: "DN",
    author: "Dana Nguyen",
    role: "Payments",
    time: "11:40",
    text: "Understood, thanks. Last thing — what's the rollback story mid-canary if error rates spike?",
  },
  {
    id: "c6",
    initials: "MK",
    author: "Marco Kim",
    role: "Platform",
    time: "11:47",
    text: "One click from the deploy page: it drains the canary weights first, then swaps back. ~90 seconds end to end.",
  },
  {
    id: "c7",
    initials: "SA",
    author: "Sofia Almeida",
    role: "Docs",
    time: "12:05",
    text: "Doc nit — §2 says shipit-v1 retires in March, the RFC says April. Which one is it?",
  },
  {
    id: "c8",
    initials: "JP",
    author: "Jin Park",
    role: "Platform",
    time: "12:09",
    text: "April; the RFC is the source of truth. I'll patch the paragraph before the review.",
  },
  {
    id: "c9",
    initials: "RC",
    author: "Riley Chen",
    role: "Search",
    time: "12:15",
    text: "Can we pin this page once the date is settled? New joiners keep asking in #platform-help.",
  },
];

function DiscussionScrollStatus() {
  const { start, end } = useMessageScrollerScrollable();

  const label =
    start && end
      ? "Mid-thread · scrolls both ways"
      : end
        ? "Oldest comment first"
        : "Newest comment";

  return <span className="font-code text-[11px] text-muted-foreground">{label}</span>;
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-[800px] w-full flex-col overflow-hidden bg-background text-foreground">
        {/* Top nav */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded-sm bg-primary font-code text-[12px] font-medium text-primary-foreground">
              A
            </div>
            <span className="font-heading-3 text-heading-3">Atlas</span>
          </div>
          <Badge variant="outline" className="font-code text-[10px]">
            internal
          </Badge>
          <div className="relative ml-4 w-80">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search the wiki…"
              aria-label="Search the wiki"
              className="h-9 pl-9"
            />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              <PencilIcon />
              New page
            </Button>
            <AvatarGroup>
              <Avatar size="sm">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Left sidebar — spaces */}
          <aside className="flex w-60 shrink-0 flex-col border-r py-4">
            <p className="px-4 pb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Spaces
            </p>
            <nav className="flex flex-col gap-0.5 px-2">
              {spaces.map((space) => (
                <span
                  key={space.label}
                  aria-current={space.active ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${
                    space.active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <space.icon className="size-4" />
                  <span className="flex-1">{space.label}</span>
                  {space.count ? (
                    <span className="font-code text-[11px] text-muted-foreground">
                      {space.count}
                    </span>
                  ) : null}
                </span>
              ))}
            </nav>
            <Separator className="my-4" />
            <p className="px-4 pb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Recently viewed
            </p>
            <nav className="flex flex-col gap-0.5 px-2">
              {["Artifact storage quotas", "Edge router runbook", "Q1 on-call schedule"].map(
                (page) => (
                  <span
                    key={page}
                    className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-muted-foreground"
                  >
                    <FileTextIcon className="size-4" />
                    <span className="truncate">{page}</span>
                  </span>
                )
              )}
            </nav>
            <div className="mt-auto px-4">
              <p className="font-code text-[11px] text-muted-foreground">
                Last deploy · 2h ago
              </p>
            </div>
          </aside>

          {/* Article */}
          <main className="flex min-w-0 flex-1 flex-col overflow-hidden px-10 py-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Atlas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Platform</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>CI / CD</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mt-4 font-heading-1 text-heading-1">
              Rolling deploys on the 2026 pipeline
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <AvatarGroup>
                <Avatar size="sm">
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>DN</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <span className="font-code text-xs text-muted-foreground">
                Updated 12 Feb 2026 · 14 min read
              </span>
              <Badge variant="secondary" className="text-[10px]">
                Stable
              </Badge>
            </div>

            <div className="mt-6 flex min-h-0 flex-1 flex-col gap-5 overflow-hidden">
              <Alert>
                <SirenIcon />
                <AlertTitle>shipit-v1 is frozen</AlertTitle>
                <AlertDescription>
                  No new services on the legacy CLI — it retires in April 2026.
                  Everything ships with <span className="font-code">atlas deploy</span> from
                  now on.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/90">
                <p>
                  The 2026 pipeline replaces batch deploys with a continuous
                  rolling flow. Every merge to <span className="font-code text-xs">main</span>{" "}
                  builds an immutable artifact, runs the full test grid, then
                  enters a ten-minute canary at 5% of edge traffic before
                  promotion.
                </p>
                <p>
                  Canary decisions are automatic: the edge router compares error
                  ratio and p99 latency against the running version and rolls
                  back on breach — no human in the loop for the happy path.
                </p>
              </div>

              <pre className="overflow-hidden rounded-md border bg-muted p-4 font-code text-xs leading-relaxed text-foreground">
                <code>{`# atlas.yaml — rolling deploy
deploy:
  strategy: canary
  steps: [5, 25, 50, 100]   # % of edge traffic
  hold: 10m
  rollback: { on: [error_ratio, p99_latency] }`}</code>
              </pre>

              <div className="mt-auto flex items-center justify-between border-t pt-4">
                <p className="font-code text-[11px] text-muted-foreground">
                  Owners · platform-oncall@atlas
                </p>
                <p className="font-code text-[11px] text-muted-foreground">
                  Review due 30 Apr 2026
                </p>
              </div>
            </div>
          </main>

          {/* Right rail — discussion */}
          <MessageScrollerProvider defaultScrollPosition="start">
            <aside className="flex w-[360px] shrink-0 flex-col border-l">
              <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                <span className="text-sm font-semibold">Discussion</span>
                <Badge variant="secondary" className="font-code text-[10px]">
                  9
                </Badge>
                <Button variant="outline" size="xs" className="ml-auto">
                  Follow
                </Button>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <MessageScroller>
                  <MessageScrollerViewport
                    aria-label="Page discussion"
                    className="px-1"
                  >
                    <MessageScrollerContent className="gap-4 px-3 pt-4 pb-6">
                      {comments.map((comment) => (
                        <MessageScrollerItem
                          key={comment.id}
                          messageId={comment.id}
                          scrollAnchor
                        >
                          <Message>
                            <MessageAvatar>
                              <Avatar size="sm">
                                <AvatarFallback>{comment.initials}</AvatarFallback>
                              </Avatar>
                            </MessageAvatar>
                            <MessageContent>
                              <MessageHeader>
                                <span className="text-[13px]">
                                  {comment.author}
                                </span>
                                <span className="text-xs font-normal text-muted-foreground">
                                  {comment.role}
                                </span>
                                <span className="font-code text-xs font-normal text-muted-foreground">
                                  {comment.time}
                                </span>
                              </MessageHeader>
                              <Bubble variant="ghost">
                                <BubbleContent className="max-w-[248px] text-[13px] leading-relaxed">
                                  {comment.text}
                                </BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </div>

              <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-t px-4">
                <DiscussionScrollStatus />
                <Button variant="ghost" size="xs">
                  Add comment
                </Button>
              </div>
            </aside>
          </MessageScrollerProvider>
        </div>
      </div>
    </EvalShell>
  );
}
