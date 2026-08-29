"use client";

// EVAL page — message-scroller p2 — HR onboarding checklist for new hires — 390x844 light (phone)

import React from "react";
import {
  BellIcon,
  CalendarCheckIcon,
  HomeIcon,
  ListChecksIcon,
  MessageCircleIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Message,
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
import { Progress } from "@/components/ui/progress";

const tasks = [
  {
    id: "laptop",
    label: "Collect laptop & badge",
    meta: "IT desk · 9:00 AM · done",
    done: true,
  },
  {
    id: "forms",
    label: "Sign NDA & payroll forms",
    meta: "People team · DocuSign · done",
    done: true,
  },
  {
    id: "sso",
    label: "Set up SSO & password manager",
    meta: "1Password · done",
    done: true,
  },
  {
    id: "benefits",
    label: "Benefits enrollment",
    meta: "Vision add-on picked",
    done: false,
    due: "Due Fri",
  },
];

const chat = [
  {
    id: "m1",
    from: "you" as const,
    time: "09:02",
    text: "Morning Sam! Picking up my laptop at 9 — anything I should bring besides ID?",
  },
  {
    id: "m2",
    from: "sam" as const,
    time: "09:04",
    text: "Morning Jordan! ID is all you need. They take the badge photo at the same desk, so it's a two-minute stop.",
  },
  {
    id: "m3",
    from: "you" as const,
    time: "09:15",
    text: "Badge photo survived. SSO and 1Password are set up — but DocuSign shows two tax forms. Is that right?",
  },
  {
    id: "m4",
    from: "sam" as const,
    time: "09:18",
    text: "Totally normal — federal and state. Sign both; payroll can't run until they're in. Ping me if either one rejects.",
  },
  {
    id: "m5",
    from: "you" as const,
    time: "09:41",
    text: "Both signed and marked complete. What's the vibe for the 12:30 team lunch?",
  },
  {
    id: "m6",
    from: "sam" as const,
    time: "09:43",
    text: "Very casual — Café West around the corner, and it's on the team budget. You'll meet the whole pod; Priya joined last month, so you're not the newest for long.",
  },
  {
    id: "m7",
    from: "you" as const,
    time: "10:05",
    text: "Looking forward to it. Last one: benefits enrollment — is the vision add-on worth it?",
  },
  {
    id: "m8",
    from: "sam" as const,
    time: "10:06",
    text: "Most of design takes it — $12 a month and it covers the monitor-adjacent lifestyle. Enrollment closes Friday, so you have a couple of days.",
  },
  {
    id: "m9",
    from: "sam" as const,
    time: "10:08",
    text: "I'll drop the updated checklist link in here once HR pushes it. Shout if anything else comes up before lunch!",
  },
];

function ChatScrollStatus() {
  const { start, end } = useMessageScrollerScrollable();

  const label =
    start && end
      ? "Mid-conversation · both ways"
      : end
        ? "At the start · newer below"
        : "Caught up with Sam";

  return (
    <span className="shrink-0 whitespace-nowrap font-code text-[10px] text-muted-foreground">
      {label}
    </span>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-[844px] w-full flex-col overflow-hidden bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <Avatar>
            <AvatarFallback>JE</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold">Good morning, Jordan</p>
            <p className="truncate text-xs text-muted-foreground">
              Product Design · Day 1 at Northwind
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Notifications"
            className="relative"
          >
            <BellIcon />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </Button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
          {/* Progress */}
          <section className="flex shrink-0 flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h1 className="font-heading-3 text-heading-3">Onboarding</h1>
              <span className="font-code text-xs text-muted-foreground">
                5 of 12 tasks
              </span>
            </div>
            <Progress value={42} aria-label="Onboarding progress" />
            <p className="text-xs text-muted-foreground">
              Next up: benefits enrollment · closes Friday 5 PM
            </p>
          </section>

          {/* Day 1 checklist — compact single-line rows */}
          <Card className="shrink-0 gap-0 py-3">
            <div className="flex items-center gap-2 px-4 pb-1">
              <ListChecksIcon className="size-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Day 1 checklist</span>
              <Badge variant="outline" className="ml-auto font-code text-[10px]">
                1 left
              </Badge>
            </div>
            <ul className="flex flex-col px-3">
              {tasks.map((task) => (
                <li key={task.id}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2">
                    <Checkbox
                      id={task.id}
                      defaultChecked={task.done}
                      aria-label={task.label}
                    />
                    <span
                      className={`min-w-0 flex-1 truncate text-sm ${
                        task.done ? "text-muted-foreground" : "font-medium"
                      }`}
                    >
                      {task.label}
                    </span>
                    {task.due ? (
                      <Badge variant="outline" className="font-code text-[10px]">
                        {task.due}
                      </Badge>
                    ) : null}
                  </label>
                </li>
              ))}
            </ul>
          </Card>

          {/* Onboarding buddy chat */}
          <MessageScrollerProvider defaultScrollPosition="start">
            <Card className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden bg-background py-0">
              <div className="flex h-11 shrink-0 items-center gap-2.5 border-b px-4">
                <Avatar size="sm">
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-[13px] font-medium">Sam Rivera</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    Onboarding buddy · Design Ops
                  </p>
                </div>
                <Badge variant="secondary" className="font-code text-[10px]">
                  Online
                </Badge>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <MessageScroller>
                  <MessageScrollerViewport
                    aria-label="Chat with Sam Rivera"
                    className="px-1"
                  >
                    <MessageScrollerContent className="gap-3 px-3 py-4">
                      {chat.map((message) => {
                        const mine = message.from === "you";
                        return (
                          <MessageScrollerItem
                            key={message.id}
                            messageId={message.id}
                            scrollAnchor={mine}
                          >
                            <Message align={mine ? "end" : "start"}>
                              <MessageContent>
                                <MessageHeader className="text-[11px] font-normal text-muted-foreground">
                                  {mine ? "You" : "Sam"}
                                  <span className="font-code">{message.time}</span>
                                </MessageHeader>
                                <Bubble variant={mine ? "primary" : "secondary"}>
                                  <BubbleContent className="max-w-[268px] text-sm">
                                    {message.text}
                                  </BubbleContent>
                                </Bubble>
                              </MessageContent>
                            </Message>
                          </MessageScrollerItem>
                        );
                      })}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </div>

              <div className="flex h-9 shrink-0 items-center justify-between gap-2 border-t px-4">
                <span className="shrink-0 font-code text-[10px] text-muted-foreground">
                  9 messages
                </span>
                <ChatScrollStatus />
              </div>
            </Card>
          </MessageScrollerProvider>

          {/* Composer */}
          <div className="flex shrink-0 items-center gap-2">
            <Input
              placeholder="Ask Sam anything…"
              aria-label="Message Sam Rivera"
              className="h-9"
            />
            <Button size="icon-sm" aria-label="Send message">
              <SendIcon />
            </Button>
          </div>

        </div>

        {/* Bottom tab bar */}
        <nav
          aria-label="Primary"
          className="flex h-14 shrink-0 items-stretch border-t"
        >
          {[
            { icon: HomeIcon, label: "Home", active: false },
            { icon: CalendarCheckIcon, label: "Tasks", active: false },
            { icon: MessageCircleIcon, label: "Chat", active: true },
            { icon: UserIcon, label: "Profile", active: false },
          ].map((tab) => (
            <span
              key={tab.label}
              aria-current={tab.active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-1 text-[10px] ${
                tab.active
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon className="size-[18px]" />
              {tab.label}
            </span>
          ))}
        </nav>
      </div>
    </EvalShell>
  );
}
