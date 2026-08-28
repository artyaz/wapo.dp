"use client";

// EVAL page — bubble p2 — customer support ticket inbox — 430x932 dark (phone)

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
      <div className="mx-auto flex h-[932px] w-full max-w-[430px] flex-col overflow-hidden bg-background">
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
            <p className="truncate text-sm font-medium">
              Payment failed on renewal
            </p>
            <p className="truncate font-code text-xs text-muted-foreground">
              Ticket #4821 · Amara Osei
            </p>
          </div>
          <Badge>In progress</Badge>
        </header>

        {/* Ticket summary */}
        <div className="shrink-0 border-b px-4 py-3">
          <Card className="gap-3 rounded-lg py-4">
            <CardContent className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3">
                <Avatar size="default">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-medium">Amara Osei</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Creator plan · Annual · $228.00/yr
                  </p>
                </div>
                <Badge variant="secondary">High</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
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

        {/* Conversation */}
        <main className="flex min-h-0 flex-1 flex-col justify-end gap-4 px-4 py-4">
          <p className="text-center font-code text-[11px] uppercase tracking-wide text-muted-foreground">
            Mar 1 · Today
          </p>
          <MessageGroup>
            <Message>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader className="text-xs text-muted-foreground">
                  Amara Osei · Customer
                </MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Hi — my renewal charge failed yesterday but the invoice
                    still shows unpaid. I really don&apos;t want to lose my
                    workspace. What happens now?
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">10:54 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <MessageHeader className="text-xs text-muted-foreground">
                  Leo Fontaine · Support
                </MessageHeader>
                <BubbleGroup>
                  <Bubble align="end">
                    <BubbleContent>
                      Hi Amara, I can see the failed attempt — Feb 28 at 11:42
                      PM, declined by your card issuer (code 51).
                    </BubbleContent>
                  </Bubble>
                  <Bubble align="end">
                    <BubbleContent>
                      Nothing is wrong with the account itself. Your workspace
                      stays fully active for 7 days; the plan just renews once
                      payment clears.
                    </BubbleContent>
                    <MessageFooter className="text-xs">
                      <span className="font-code">11:02 AM</span>
                    </MessageFooter>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
              </MessageAvatar>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    That&apos;s a relief. Can I retry with a different card?
                  </BubbleContent>
                  <BubbleReactions
                    role="img"
                    aria-label="Reaction: relieved face"
                    align="start"
                  >
                    <span>😌</span>
                  </BubbleReactions>
                  <MessageFooter className="text-xs">
                    <span className="font-code">11:06 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>
                    Yes — the retry link below lets you pick any card, and it
                    stays open for 72 hours. No late fee, no plan change.
                  </BubbleContent>
                  <MessageFooter className="text-xs">
                    <span className="font-code">11:07 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
              </MessageAvatar>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    Just paid with the Visa ending 4419 — it went through this
                    time! Can you confirm the invoice is settled?
                  </BubbleContent>
                  <BubbleReactions
                    role="img"
                    aria-label="Reactions: party popper, clapping hands"
                    align="start"
                  >
                    <span>🎉</span>
                    <span>👏</span>
                  </BubbleReactions>
                  <MessageFooter className="text-xs">
                    <span className="font-code">11:15 AM</span>
                  </MessageFooter>
                </Bubble>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <BubbleGroup>
                  <Bubble align="end">
                    <BubbleContent>
                      Confirmed — invoice INV-2024-0841 shows paid, and your
                      plan now renews on Feb 28, 2027. Closing this ticket as
                      resolved.
                    </BubbleContent>
                  </Bubble>
                  <Bubble align="end">
                    <BubbleContent>
                      Anything else I can help with while I have you?
                    </BubbleContent>
                    <MessageFooter className="text-xs">
                      <span className="font-code">11:18 AM</span>
                      <span>·</span>
                      <span>Read</span>
                    </MessageFooter>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="default">
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
              </MessageAvatar>
            </Message>
          </MessageGroup>
        </main>

        {/* Macro chips + composer */}
        <footer className="shrink-0 border-t px-3 py-3">
          <div className="mb-3 flex items-center gap-2">
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
