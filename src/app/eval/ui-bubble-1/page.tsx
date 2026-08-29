"use client";

// EVAL page — bubble p1 — HR onboarding checklist for new hires — 390x844 dark (phone)
// Layout: fixed-height shell, non-scrolling chrome (app bar + checklist strip +
// composer) and a bottom-anchored thread that is hard-clipped to its own lane
// (overflow-hidden) so chat content can never render over the header.

import {
  ArrowLeftIcon,
  CheckIcon,
  PaperclipIcon,
  SendIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-[844px] w-full max-w-[390px] flex-col overflow-hidden bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Back to inbox"
            className="text-muted-foreground"
          >
            <ArrowLeftIcon />
          </Button>
          <Avatar>
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <h1 className="truncate text-heading-3 font-heading-3">
              Dana Whitfield
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              People Ops · Onboarding buddy
            </p>
          </div>
          <Badge variant="secondary">Day 1 of 5</Badge>
        </header>

        {/* Checklist progress strip */}
        <div className="shrink-0 border-b px-4 py-3">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-caption font-caption text-muted-foreground">
              Onboarding checklist
            </span>
            <span className="font-code text-xs text-muted-foreground">
              3/8 tasks
            </span>
          </div>
          <Progress value={37} aria-label="3 of 8 onboarding tasks complete" />
          <p className="mt-2 text-xs text-foreground/70">
            Badge photo · Laptop pickup · Benefits enrollment
          </p>
        </div>

        {/* Thread — bottom-anchored, clipped below the chrome */}
        <main className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 py-3">
          <MessageGroup className="gap-3">
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>DW</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">
                  Dana · People Ops
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Morning Priya! Welcome to Northwind Health. Today&apos;s
                    list: badge photo at reception, laptop pickup at 10:30, and
                    benefits enrollment opens at noon.
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">9:02 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="items-end gap-1.5">
                <Bubble align="end" variant="secondary">
                  <BubbleContent>
                    Morning Dana! Badge photo is done — heading to the 4th
                    floor IT desk for the laptop now.
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">9:12 AM</span>
                    <span>·</span>
                    <span>Delivered</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>DW</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">
                  Dana · People Ops
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Perfect pace — two down, one to go. Enrollment closes
                    Friday at 5 PM.
                  </BubbleContent>
                </Bubble>

                {/* Inline task card */}
                <Card className="w-full max-w-[300px] gap-2.5 rounded-lg py-3.5">
                  <CardContent className="flex flex-col gap-2.5 px-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="size-4 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Benefits enrollment
                        </p>
                      </div>
                      <Badge variant="secondary">Task 3 of 8</Badge>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Pick your medical, dental, and HSA options in Workday —
                      auto-enrolls Mar 14.
                    </p>
                    <Button variant="outline" size="sm" className="self-start">
                      Open task in Workday
                    </Button>
                  </CardContent>
                </Card>

                <MessageFooter className="text-xs">
                  <BubbleReactions
                    role="img"
                    aria-label="Reaction: thumbs up"
                    className="self-auto"
                  >
                    <span>👍</span>
                  </BubbleReactions>
                  <span className="font-code">9:47 AM</span>
                </MessageFooter>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="items-end gap-1.5">
                <Bubble align="end" variant="secondary">
                  <BubbleContent>
                    Enrolling right now — thanks Dana!
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">10:14 AM</span>
                    <span>·</span>
                    <span>Read</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
        </main>

        {/* Composer */}
        <footer className="flex shrink-0 items-center gap-2 border-t px-3 py-3">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Attach a file"
            className="text-muted-foreground"
          >
            <PaperclipIcon />
          </Button>
          <div className="flex h-9 flex-1 items-center rounded-md border border-input px-3 text-sm text-muted-foreground">
            Ask Dana anything…
          </div>
          <Button variant="secondary" size="icon-sm" aria-label="Send message">
            <SendIcon />
          </Button>
        </footer>
      </div>
    </EvalShell>
  );
}
