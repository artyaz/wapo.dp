"use client";

// EVAL page — bubble p2 — customer support ticket inbox — 430x932 dark (phone)
// Layout: fixed-height shell; app bar + ticket summary + macro/composer chrome
// are non-scrolling, the thread is bottom-anchored inside its own clipped lane
// so message bubbles can never overlap the header or metadata card.

import {
  ArrowLeftIcon,
  ClockIcon,
  LinkIcon,
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
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-[932px] w-full max-w-[430px] flex-col overflow-hidden bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Back to ticket inbox"
            className="text-muted-foreground"
          >
            <ArrowLeftIcon />
          </Button>
          <div className="min-w-0 flex-1 leading-tight">
            <h1 className="truncate text-heading-3 font-heading-3">
              Payment failed on renewal
            </h1>
            <p className="truncate font-code text-xs text-muted-foreground">
              Ticket #4821 · Amara Osei
            </p>
          </div>
          <Badge>In progress</Badge>
        </header>

        {/* Ticket summary */}
        <div className="shrink-0 border-b px-4 py-3">
          <Card className="gap-2.5 rounded-lg py-3">
            <CardContent className="flex flex-col gap-2.5 px-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-medium">Amara Osei</p>
                  <p className="truncate font-code text-[11px] text-muted-foreground">
                    Creator plan · Annual · $228.00/yr
                  </p>
                </div>
                <Badge variant="secondary">High</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs">
                <span className="font-code text-muted-foreground">
                  Last attempt · Feb 28, 11:42 PM
                </span>
                <span className="inline-flex items-center gap-1 font-code text-warning-500">
                  <ClockIcon className="size-3" />
                  SLA 42m
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversation — bottom-anchored, clipped below the chrome */}
        <main className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
          <p className="text-center font-code text-[11px] uppercase tracking-wide text-muted-foreground">
            Mar 1 · Today
          </p>
          <MessageGroup className="gap-3">
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">
                  Amara Osei · Customer
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Hi — my renewal charge failed yesterday but the invoice
                    still shows unpaid. Can I retry with a different card?
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">10:54 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="items-end gap-1.5">
                <BubbleGroup>
                  <Bubble align="end" variant="secondary">
                    <BubbleContent>
                      I can see the failed attempt —{" "}
                      <span className="font-code text-[13px]">Feb 28, 11:42 PM</span>,
                      declined by your card issuer (
                      <span className="font-code text-[13px]">code 51</span>).
                    </BubbleContent>
                  </Bubble>
                  <Bubble align="end" variant="secondary">
                    <BubbleContent>
                      Your workspace stays fully active. The retry link below
                      lets you pick any card — open for 72 hours, no late fee,
                      no plan change.
                    </BubbleContent>
                    <MessageFooter className="text-xs">
                      <span className="font-code">11:02 AM</span>
                    </MessageFooter>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">
                  Amara Osei · Customer
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Just paid with the Visa ending{" "}
                    <span className="font-code text-[13px]">4419</span> — it went through
                    this time!
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <BubbleReactions
                      role="img"
                      aria-label="Reactions: party popper, clapping hands"
                      className="self-auto"
                    >
                      <span>🎉</span>
                      <span>👏</span>
                    </BubbleReactions>
                    <span className="font-code">11:15 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="items-end gap-1.5">
                <Bubble align="end" variant="secondary">
                  <BubbleContent>
                    Confirmed — invoice{" "}
                    <span className="font-code text-[13px]">INV-2024-0841</span> shows
                    paid, and your plan renews on{" "}
                    <span className="font-code text-[13px]">Feb 28, 2027</span>. Closing
                    this ticket as resolved.
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">11:18 AM</span>
                    <span>·</span>
                    <span>Read</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
        </main>

        {/* Macro chips + composer */}
        <footer className="shrink-0 border-t px-3 py-3">
          <div className="mb-2.5 flex items-center gap-2">
            <Button variant="outline" size="xs">
              <LinkIcon />
              Send payment link
            </Button>
            <Button variant="outline" size="xs">
              Escalate to billing
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Attach a file"
              className="text-muted-foreground"
            >
              <PaperclipIcon />
            </Button>
            <div className="flex h-9 flex-1 items-center rounded-md border border-input px-3 text-sm text-muted-foreground">
              Reply as Leo…
            </div>
            <Button size="icon-sm" aria-label="Send reply">
              <SendIcon />
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
