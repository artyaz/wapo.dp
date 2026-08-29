"use client";

// EVAL page — bubble p3 — podcast recording studio console — 1280x800 light
// Layout: fixed-height shell; global transport header + per-pane headers are
// non-scrolling. The studio-chat thread is bottom-anchored inside its own
// clipped lane (overflow-hidden) between the pane header and the composer, so
// bubbles can never occlude the "Studio chat" header or the top transport bar.

import {
  MicIcon,
  PaperclipIcon,
  PauseIcon,
  SendIcon,
  UsersIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Progress } from "@/components/ui/progress";

const segments = [
  { time: "00:00:00", name: "Cold open", status: "Done" },
  { time: "00:06:30", name: "Intro & housekeeping", status: "Done" },
  { time: "00:19:00", name: "Alfama field walk", status: "Recording" },
  { time: "00:38:00", name: "Tram 28 ambience", status: "Up next" },
  { time: "00:52:00", name: "Guest interview", status: "Queued" },
  { time: "01:06:00", name: "Outro & credits", status: "Queued" },
] as const;

const notes = [
  { time: "00:41:18", text: "Tram bell ×2 — clean, no voice bleed" },
  { time: "00:38:05", text: "Room tone, café in Alfama (2:00)" },
  { time: "00:33:40", text: "Siren in background — retake?" },
  { time: "00:27:12", text: "Mic swap: SM7B → RE20 for guest" },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-[800px] w-full flex-col overflow-hidden bg-background text-foreground">
        {/* Transport header */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-3">
            <MicIcon className="size-5 text-muted-foreground" />
            <div className="leading-tight">
              <h1 className="font-heading-3 text-heading-3">The Signal Path</h1>
              <p className="text-xs text-muted-foreground">
                Ep. 112 · Field Recordings in Lisbon
              </p>
            </div>
          </div>
          <div className="mx-2 h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="relative inline-flex size-2 rounded-full bg-destructive" />
            <span className="font-code text-xs font-medium text-destructive">
              REC
            </span>
            <span className="font-code text-xs text-muted-foreground">
              00:47:12 / 01:16:00
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <KbdGroup className="hidden items-center gap-1 lg:inline-flex">
              <Kbd>⌘</Kbd>
              <Kbd>M</Kbd>
              <span className="text-xs text-muted-foreground">mark</span>
            </KbdGroup>
            <Button variant="outline" size="sm">
              <PauseIcon />
              Pause
            </Button>
            <Button size="sm">Mark segment</Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Left rail — rundown */}
          <aside className="flex w-80 shrink-0 flex-col border-r">
            <div className="flex items-baseline justify-between px-4 pt-4">
              <p className="text-caption font-caption text-muted-foreground">
                Rundown
              </p>
              <span className="font-code text-xs text-muted-foreground">
                6 segments
              </span>
            </div>
            <ul className="flex flex-col px-2 py-2">
              {segments.map((s) => (
                <li
                  key={s.time}
                  className="flex items-center gap-3 rounded-md px-2 py-2.5"
                >
                  <span className="font-code text-xs text-muted-foreground">
                    {s.time}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {s.name}
                  </span>
                  {s.status === "Recording" ? (
                    <Badge variant="destructive">Recording</Badge>
                  ) : s.status === "Up next" ? (
                    <Badge>Up next</Badge>
                  ) : (
                    <Badge variant="secondary">{s.status}</Badge>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t px-4 py-4">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-caption font-caption text-muted-foreground">
                  Episode progress
                </span>
                <span className="font-code text-xs text-muted-foreground">
                  62%
                </span>
              </div>
              <Progress value={62} aria-label="Episode 62% recorded" />
            </div>
          </aside>

          {/* Center — studio chat */}
          <main className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-12 shrink-0 items-center gap-3 border-b px-6">
              <p className="text-sm font-medium">Studio chat</p>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>NK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>ID</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <span className="text-xs text-muted-foreground">
                3 in session · Studio B + Lisbon remote
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Invite to session"
                className="ml-auto text-muted-foreground"
              >
                <UsersIcon />
              </Button>
            </div>

            {/* Thread — bottom-anchored, clipped to its lane */}
            <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-6 py-4">
              <MessageGroup className="gap-3">
                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>NK</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="gap-1.5">
                    <MessageHeader className="text-xs text-muted-foreground">
                      Nadia Kaur · Producer
                    </MessageHeader>
                    <Bubble variant="muted">
                      <BubbleContent>
                        Marcus, you&apos;re peaking at −12 dB — sounding
                        great. Inês, I&apos;m easing your channel 2 dB.
                      </BubbleContent>
                      <MessageFooter className="text-xs">
                        <span className="font-code text-[13px]">10:58</span>
                      </MessageFooter>
                    </Bubble>
                  </MessageContent>
                </Message>

                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="gap-1.5">
                    <MessageHeader className="text-xs text-muted-foreground">
                      Inês Duarte · Guest · Lisbon
                    </MessageHeader>
                    <Bubble variant="muted">
                      <BubbleContent>
                        Obrigada, Nadia. Is the room tone still rolling for
                        the outro?
                      </BubbleContent>
                      <MessageFooter className="text-xs">
                        <span className="font-code text-[13px]">11:01</span>
                      </MessageFooter>
                    </Bubble>
                  </MessageContent>
                </Message>

                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>MW</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="items-end gap-1.5">
                    <Bubble align="end" variant="primary">
                      <BubbleContent>
                        Rolling until 11:40 station time — ad break right
                        after Alfama.
                      </BubbleContent>
                      <MessageFooter className="text-xs">
                        <span className="font-code text-[13px]">11:02</span>
                      </MessageFooter>
                    </Bubble>
                  </MessageContent>
                </Message>

                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>NK</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="gap-1.5">
                    <MessageHeader className="text-xs text-muted-foreground">
                      Nadia Kaur · Producer
                    </MessageHeader>
                    <Bubble variant="muted">
                      <BubbleContent>
                        Segment 4 in 90 seconds — two minutes of ambience,
                        then the tram tape.
                      </BubbleContent>
                      <MessageFooter className="text-xs">
                        <BubbleReactions
                          role="img"
                          aria-label="Reaction: headphones"
                          className="self-auto"
                        >
                          <span>🎧</span>
                        </BubbleReactions>
                        <span className="font-code text-[13px]">11:03</span>
                      </MessageFooter>
                    </Bubble>
                  </MessageContent>
                </Message>

                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>MW</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent className="items-end gap-1.5">
                    <BubbleGroup>
                      <Bubble align="end" variant="primary">
                        <BubbleContent>
                          Yes — that&apos;s our cold open for Ep. 113.
                        </BubbleContent>
                      </Bubble>
                      <Bubble align="end" variant="primary">
                        <BubbleContent>
                          Nadia, mark this take as Print, please.
                        </BubbleContent>
                        <MessageFooter className="text-xs">
                          <BubbleReactions
                            role="img"
                            aria-label="Reaction: OK hand"
                            className="self-auto"
                          >
                            <span>👌</span>
                          </BubbleReactions>
                          <span className="font-code text-[13px]">11:05</span>
                          <span>·</span>
                          <span>Printed</span>
                        </MessageFooter>
                      </Bubble>
                    </BubbleGroup>
                  </MessageContent>
                </Message>
              </MessageGroup>
            </div>

            {/* Chat composer */}
            <div className="flex h-14 shrink-0 items-center gap-2 border-t px-6">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Attach a file"
                className="text-muted-foreground"
              >
                <PaperclipIcon />
              </Button>
              <div className="flex h-9 flex-1 items-center rounded-md border border-input px-3 text-sm text-muted-foreground">
                Message the studio…
              </div>
              <Button size="icon-sm" aria-label="Send message">
                <SendIcon />
              </Button>
            </div>
          </main>

          {/* Right rail — notes & shortcuts */}
          <aside className="flex w-80 shrink-0 flex-col border-l">
            <Card className="m-4 gap-3 rounded-lg py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Session notes</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                {notes.map((n) => (
                  <div key={n.time} className="flex items-start gap-3">
                    <span className="font-code text-xs text-muted-foreground">
                      {n.time}
                    </span>
                    <span className="text-xs leading-relaxed">{n.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mx-4 gap-3 rounded-lg py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Transport shortcuts</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Arm recording
                  </span>
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>R</Kbd>
                  </KbdGroup>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Mark segment
                  </span>
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>M</Kbd>
                  </KbdGroup>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Play / pause
                  </span>
                  <KbdGroup>
                    <Kbd>Space</Kbd>
                  </KbdGroup>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </EvalShell>
  );
}
