"use client";

// EVAL page — message p2 — personal recipe collection — 430x932 dark (phone)

import {
  ArrowLeftIcon,
  CameraIcon,
  ChefHatIcon,
  ClockIcon,
  DownloadIcon,
  FileTextIcon,
  HeartIcon,
  MoreVerticalIcon,
  PaperclipIcon,
  PinIcon,
  SendIcon,
  UsersIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment";
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-[932px] w-full max-w-[430px] flex-col overflow-hidden bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-2.5 border-b px-3">
          <Button variant="ghost" size="icon-sm" aria-label="Back to chats" className="text-muted-foreground">
            <ArrowLeftIcon />
          </Button>
          <div className="relative">
            <Avatar>
              <AvatarFallback>RM</AvatarFallback>
              <AvatarBadge className="bg-success-500" />
            </Avatar>
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <h1 className="truncate text-heading-3 font-heading-3">Cucina della Nonna</h1>
            <p className="truncate text-xs text-muted-foreground">
              Rosa · Marco · Luca · you
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Group settings" className="text-muted-foreground">
            <MoreVerticalIcon />
          </Button>
        </header>

        {/* Pinned recipe */}
        <div className="flex shrink-0 items-center gap-2.5 border-b bg-card px-3 py-2.5">
          <PinIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-xs font-medium">Sunday Ragù alla Bolognese</p>
            <p className="truncate font-code text-[11px] text-muted-foreground">
              serves 6 · 3h 20m · simmering now
            </p>
          </div>
          <Button variant="ghost" size="xs">
            View
          </Button>
        </div>

        {/* Thread */}
        <main className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-3 py-3">
          <MessageGroup className="gap-2.5">
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">Nonna Rosa</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Buongiorno! Today we make the ragù — soffritto first,
                    fine as sand. No cream, no garlic.
                  </BubbleContent>
                </Bubble>
                <Attachment className="max-w-[260px]">
                  <AttachmentMedia>
                    <FileTextIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>ragu_1978_scan.jpg</AttachmentTitle>
                    <AttachmentDescription>JPG · 2.1 MB · handwritten card</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction variant="ghost" size="icon-sm" aria-label="Download scanned recipe card">
                      <DownloadIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
                <MessageFooter className="text-xs">
                  <span className="font-code">09:12</span>
                </MessageFooter>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>GV</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="items-end gap-1.5">
                <Bubble align="end" variant="secondary">
                  <BubbleContent>
                    Soffritto is in the pot, guanciale too!
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="text-xs">
                  <span className="font-code">09:41</span>
                  <span>·</span>
                  <span>Read</span>
                </MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">Nonna Rosa</MessageHeader>

                {/* Shared recipe card */}
                <Card className="gap-2 rounded-lg py-3.5">
                  <CardContent className="flex flex-col gap-2 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ChefHatIcon className="size-4 text-muted-foreground" />
                        <h2 className="text-sm font-semibold font-heading-3">Ragù alla Bolognese</h2>
                      </div>
                      <Badge variant="secondary">Family · 1978</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="gap-1">
                        <UsersIcon className="size-3" /> 6 servings
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <ClockIcon className="size-3" /> 3h 20m
                      </Badge>
                      <Badge variant="outline">Medium</Badge>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      400 g beef · 150 g pancetta · passata · wine · milk
                    </p>
                    <Button variant="outline" size="sm" className="self-start">
                      Add to my cookbook
                    </Button>
                  </CardContent>
                </Card>
                <BubbleReactions role="img" aria-label="Reaction: heart, 3 people" align="start">
                  <HeartIcon className="size-3" />
                  <span>3</span>
                </BubbleReactions>
                <MessageFooter className="text-xs">
                  <span className="font-code">09:58</span>
                </MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">Marco</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Can I sub butter for the olive oil? Corner store is out
                    again.
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="text-xs">
                  <span className="font-code">10:15</span>
                </MessageFooter>
              </MessageContent>
            </Message>

            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent className="gap-1.5">
                <MessageHeader className="text-xs text-muted-foreground">Nonna Rosa</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Only if it is unsalted, tesoro. Half a spoon, no more.
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="text-xs">
                  <span className="font-code">10:18</span>
                </MessageFooter>
              </MessageContent>
            </Message>
          </MessageGroup>
        </main>

        {/* Composer */}
        <footer className="flex shrink-0 items-end gap-2 border-t px-3 py-3">
          <Button variant="ghost" size="icon-sm" aria-label="Attach a file" className="text-muted-foreground">
            <PaperclipIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Take a photo" className="text-muted-foreground">
            <CameraIcon />
          </Button>
          <Textarea
            rows={1}
            placeholder="Message the family…"
            className="min-h-9 resize-none py-2 text-sm"
            aria-label="Message the family chat"
          />
          <Button size="icon-sm" aria-label="Send message">
            <SendIcon />
          </Button>
        </footer>
      </div>
    </EvalShell>
  );
}
