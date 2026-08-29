"use client";

// EVAL page — message p3 — podcast recording studio console — 768x1024 light (portrait tablet)

import {
  AudioLinesIcon,
  CircleIcon,
  DownloadIcon,
  HeadphonesIcon,
  MicIcon,
  PaperclipIcon,
  RadioIcon,
  SendIcon,
  SlidersIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment";
import { Avatar, AvatarGroup, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const SEGMENTS = [
  { tc: "00:00", label: "Cold open", state: "done" },
  { tc: "04:20", label: "Intro & credits", state: "done" },
  { tc: "12:40", label: "Interview · Dr. Okonkwo", state: "live" },
  { tc: "32:10", label: "Ad break", state: "next" },
  { tc: "35:40", label: "Listener questions", state: "moved" },
  { tc: "58:00", label: "Outro & credits", state: "next" },
] as const;

const LEVELS = [
  { name: "Nadia · SM7B", db: "-12 dB", value: 74 },
  { name: "Guest · DPA 4088", db: "-18 dB", value: 52 },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex h-[1024px] w-full max-w-[768px] flex-col overflow-hidden bg-background text-foreground">
        {/* Session header */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border">
            <RadioIcon className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <h1 className="truncate text-heading-3 font-heading-3">
              EP 147 · Deep Oceans, Darker Truths
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              Waveform Studio · Session 3 of 4 · Booth A
            </p>
          </div>
          <Badge variant="outline" className="gap-1.5 border-warning-500/40 text-warning-600">
            <CircleIcon className="size-2 animate-pulse fill-warning-500 text-warning-500" />
            REC <span className="font-code tabular-nums">00:42:17</span>
          </Badge>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>SO</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>NR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <Button variant="outline" size="sm">
            End session
          </Button>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Session chat */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-11 shrink-0 items-center gap-2 border-b px-4">
              <SlidersIcon className="size-3.5 text-muted-foreground" />
              <p className="text-sm font-medium"># ep-147-session</p>
              <Badge variant="secondary" className="gap-1">
                <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
                Live
              </Badge>
              <span className="ml-auto text-xs text-muted-foreground">
                Producer · Host · Engineer
              </span>
            </div>

            <main className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-4">
              <MessageGroup className="gap-3">
                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>SO</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="gap-1.5">
                    <MessageHeader className="text-xs text-muted-foreground">
                      Sam Okafor <span className="font-normal">· Producer</span>
                    </MessageHeader>
                    <Bubble variant="muted">
                      <BubbleContent>
                        We&apos;re rolling. Nadia, come in on my count — pickup
                        from &ldquo;the trench begins here&rdquo;.
                      </BubbleContent>
                    </Bubble>
                    <MessageFooter className="text-xs">
                      <span className="font-code tabular-nums">00:41:52</span>
                    </MessageFooter>
                  </MessageContent>
                </Message>

                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>NR</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="items-end gap-1.5">
                    <Bubble align="end">
                      <BubbleContent>
                        Ready. Should I bring in the Mariana data from the WHOI
                        report now, or hold it for part two?
                      </BubbleContent>
                    </Bubble>
                    <MessageFooter className="text-xs">
                      <span className="font-code tabular-nums">00:41:58</span>
                      <span>·</span>
                      <span>Delivered</span>
                    </MessageFooter>
                  </MessageContent>
                </Message>

                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>JB</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="gap-1.5">
                    <MessageHeader className="text-xs text-muted-foreground">
                      Jonah Beck <span className="font-normal">· Engineer</span>
                    </MessageHeader>
                    <Bubble variant="muted">
                      <BubbleContent>
                        Take 12 saved. There&apos;s a low HVAC rumble under your
                        side, Nadia — I can gate it in post, or we redo the line
                        after the break.
                      </BubbleContent>
                    </Bubble>
                    <Attachment className="max-w-[280px]">
                      <AttachmentMedia>
                        <AudioLinesIcon />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>EP147_take12_raw.wav</AttachmentTitle>
                        <AttachmentDescription>WAV · 148 MB · 24-bit / 48 kHz</AttachmentDescription>
                      </AttachmentContent>
                      <AttachmentActions>
                        <AttachmentAction variant="ghost" size="icon-sm" aria-label="Download take 12">
                          <DownloadIcon />
                        </AttachmentAction>
                      </AttachmentActions>
                    </Attachment>
                    <MessageFooter className="text-xs">
                      <span className="font-code tabular-nums">00:42:06</span>
                    </MessageFooter>
                  </MessageContent>
                </Message>

                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>NR</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="items-end gap-1.5">
                    <BubbleGroup>
                      <Bubble align="end">
                        <BubbleContent>
                          Let&apos;s redo it after the break — cleaner is
                          better.
                        </BubbleContent>
                      </Bubble>
                      <Bubble align="end">
                        <BubbleContent>
                          Grabbing water, back in five.
                        </BubbleContent>
                      </Bubble>
                    </BubbleGroup>
                    <MessageFooter className="text-xs">
                      <span className="font-code tabular-nums">00:42:11</span>
                      <span>·</span>
                      <span>Read</span>
                    </MessageFooter>
                  </MessageContent>
                </Message>

                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>SO</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="gap-1.5">
                    <MessageHeader className="text-xs text-muted-foreground">
                      Sam Okafor <span className="font-normal">· Producer</span>
                    </MessageHeader>
                    <Bubble variant="muted">
                      <BubbleContent>
                        Works for me. Listener questions now run after the ad
                        break — rundown is updated on the right.
                      </BubbleContent>
                      <BubbleReactions role="img" aria-label="Reaction: thumbs up, 2 people" align="start">
                        <span>👍</span>
                        <span>2</span>
                      </BubbleReactions>
                    </Bubble>
                    <MessageFooter className="text-xs">
                      <span className="font-code tabular-nums">00:42:15</span>
                    </MessageFooter>
                  </MessageContent>
                </Message>
              </MessageGroup>
            </main>

            <footer className="flex shrink-0 items-end gap-2 border-t px-4 py-3">
              <Button variant="ghost" size="icon-sm" aria-label="Attach a file" className="text-muted-foreground">
                <PaperclipIcon />
              </Button>
              <Textarea
                rows={1}
                placeholder="Message the session…"
                className="min-h-9 resize-none py-2 text-sm"
                aria-label="Message the session channel"
              />
              <Button size="icon-sm" aria-label="Send message">
                <SendIcon />
              </Button>
            </footer>
          </div>

          {/* Console side panel */}
          <aside className="flex w-60 shrink-0 flex-col gap-4 border-l p-4">
            <Card className="gap-3 rounded-lg py-4">
              <CardContent className="flex flex-col gap-3 px-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Rundown</p>
                  <Badge variant="secondary">6 segments</Badge>
                </div>
                <Separator />
                <ol className="flex flex-col gap-2.5">
                  {SEGMENTS.map((s) => (
                    <li key={s.label} className="flex items-center gap-2 text-xs">
                      <span className="font-code tabular-nums text-muted-foreground">{s.tc}</span>
                      <span className="min-w-0 flex-1 truncate font-medium">{s.label}</span>
                      {s.state === "done" ? (
                        <span className="size-1.5 shrink-0 rounded-full bg-success-500" aria-label="Recorded" />
                      ) : s.state === "live" ? (
                        <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-warning-500" aria-label="On air" />
                      ) : s.state === "moved" ? (
                        <Badge variant="outline" className="px-1.5 py-0 text-[10px] text-muted-foreground">
                          Moved
                        </Badge>
                      ) : (
                        <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/40" aria-label="Queued" />
                      )}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="gap-3 rounded-lg py-4">
              <CardContent className="flex flex-col gap-3 px-4">
                <div className="flex items-center gap-2">
                  <MicIcon className="size-3.5 text-muted-foreground" />
                  <p className="text-sm font-medium">Input levels</p>
                </div>
                {LEVELS.map((l) => (
                  <div key={l.name} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between text-xs">
                      <span>{l.name}</span>
                      <span className="font-code tabular-nums text-muted-foreground">{l.db}</span>
                    </div>
                    <Progress value={l.value} aria-label={`${l.name} input level`} />
                  </div>
                ))}
                <Separator />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <HeadphonesIcon className="size-3.5" />
                  Monitor mix · both channels clean
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
