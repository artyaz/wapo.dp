"use client";

// EVAL page — bubble p1 — HR onboarding checklist for new hires — 390x844 dark (phone)

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
  BubbleGroup,
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
      <div className="mx-auto flex h-[844px] w-full max-w-[390px] flex-col overflow-hidden bg-background">
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
          <Avatar size="default">
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium">Dana Whitfield</p>
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
          <p className="mt-2 text-xs text-muted-foreground">
            Badge photo · Laptop pickup · Benefits enrollment
          </p>
        </div>

        {/* Thread */}
        <main className="flex min-h-0 flex-1 flex-col justify-end gap-4 px-4 py-4">
          <MessageGroup>
            <Message>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>DW</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader className="text-xs text-muted-foreground">
                  Dana · People Ops
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Morning Priya! Welcome to Northwind Health. I&apos;m your
                    onboarding buddy for the next two weeks — ping me here with
                    anything, big or small.
                  </BubbleContent>
                </Bubble>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Three things on today&apos;s list: badge photo at
                      reception, laptop pickup at 10:30, and benefits
                      enrollment opens at noon.
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Which one are you knocking out first?
                    </BubbleContent>
                    <MessageFooter className="text-xs">
                      <span className="font-code">9:02 AM</span>
                    </MessageFooter>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <MessageHeader className="text-xs text-muted-foreground">
                  Priya Raman
                </MessageHeader>
                <BubbleGroup>
                  <Bubble align="end">
                    <BubbleContent>
                      Morning Dana! Badge photo is done — the line at reception
                      was short.
                    </BubbleContent>
                  </Bubble>
                  <Bubble align="end">
                    <BubbleContent>
                      Heading to the 4th floor IT desk now for the laptop.
                    </BubbleContent>
                    <MessageFooter className="text-xs">
                      <span className="font-code">9:12 AM</span>
                      <span>·</span>
                      <span>Delivered</span>
                    </MessageFooter>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </MessageAvatar>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>DW</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    Perfect pace. Two down, one to go — enrollment closes
                    Friday at 5 PM.
                  </BubbleContent>
                  <BubbleReactions
                    role="img"
                    aria-label="Reaction: thumbs up"
                    align="start"
                  >
                    <span>👍</span>
                  </BubbleReactions>
                  <MessageFooter className="text-xs">
                    <span className="font-code">9:47 AM</span>
                  </MessageFooter>
                </Bubble>

                {/* Inline task card */}
                <Card className="gap-3 rounded-lg py-4">
                  <CardContent className="flex flex-col gap-3 px-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="size-4 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Benefits enrollment
                        </p>
                      </div>
                      <Badge variant="secondary">Task 3 of 8</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pick your medical, dental, and HSA options in the Workday
                      portal. Auto-enrolls in the default plan on Mar 14.
                    </p>
                    <Button variant="outline" size="sm" className="self-start">
                      Open task in Workday
                    </Button>
                  </CardContent>
                </Card>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>
                    Quick question — can I pick the HSA option now and change
                    it later?
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">10:05 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </MessageAvatar>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>DW</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    Yes — HSA is editable until Mar 14, then it locks until
                    open enrollment in October. Enroll today and you can keep
                    tweaking all week.
                  </BubbleContent>
                  <BubbleReactions
                    role="img"
                    aria-label="Reaction: party popper"
                    align="start"
                  >
                    <span>🎉</span>
                  </BubbleReactions>
                  <MessageFooter className="text-xs">
                    <span className="font-code">10:09 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>
                    Enrolling right now then. Thanks Dana!
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">10:14 AM</span>
                    <span>·</span>
                    <span>Read</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </MessageAvatar>
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
          <Button size="icon-sm" aria-label="Send message">
            <SendIcon />
          </Button>
        </footer>
      </div>
    </EvalShell>
  );
}
