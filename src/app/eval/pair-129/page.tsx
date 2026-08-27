"use client";

import React from "react";
import {
  Check,
  ChevronLeft,
  CloudOff,
  MoreHorizontal,
  Music2,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Users,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Spinner } from "@/components/ui/spinner";

/**
 * Scenario — "Night Drive" media player with its playlist on a 390×844 dark
 * phone: the now-playing card (ui:badge chips the lossless stream), an
 * offline-sync notice with a retry action (ui:alert), the up-next queue with
 * per-track badges (ui:badge variants + custom colors), and a group listening
 * session where friends react to the queue (ui:message).
 */
export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-6 pt-4">
        {/* Playlist header */}
        <header className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Back">
            <ChevronLeft />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold leading-tight">
              Night Drive
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              Playlist · 14 tracks · 52 min
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontal />
          </Button>
        </header>

        {/* Now playing */}
        <section className="rounded-xl border bg-card p-3">
          <div className="flex items-center gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-neutral-700 to-neutral-900 text-neutral-300">
              <Music2 className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-medium">Neon Coastline</p>
                <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  Lossless
                </Badge>
              </div>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                Ava Solaris
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[62%] rounded-full bg-primary" />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-muted-foreground">
              <span>2:14</span>
              <span>-1:22</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Shuffle"
              className="text-muted-foreground"
            >
              <Shuffle />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Previous track">
              <SkipBack />
            </Button>
            <Button size="icon-lg" aria-label="Play" className="rounded-full">
              <Play className="translate-x-px fill-current" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Next track">
              <SkipForward />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Repeat"
              className="text-muted-foreground"
            >
              <Repeat />
            </Button>
          </div>
        </section>

        {/* Offline sync notice */}
        <Alert>
          <CloudOff aria-hidden="true" />
          <AlertTitle>Offline sync paused</AlertTitle>
          <AlertDescription>
            2 tracks in this playlist aren&apos;t downloaded for offline
            playback.
          </AlertDescription>
          <AlertAction>
            <Button size="xs" variant="outline">
              Retry
            </Button>
          </AlertAction>
        </Alert>

        {/* Up next */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium">Up next</h2>
            <span className="text-xs text-muted-foreground">Queue</span>
          </div>
          <ul className="mt-1 flex flex-col">
            <li className="flex items-center gap-3 py-2">
              <span className="w-4 shrink-0 text-center text-sm tabular-nums text-muted-foreground">
                1
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-medium">Glass Avenue</p>
                  <Badge variant="secondary">Atmos</Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  Kite Season
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                3:47
              </span>
            </li>
            <li className="flex items-center gap-3 py-2">
              <span className="w-4 shrink-0 text-center text-sm tabular-nums text-muted-foreground">
                2
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-medium">Static Bloom</p>
                  <Badge variant="outline">Explicit</Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  Ava Solaris
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                4:12
              </span>
            </li>
            <li className="flex items-center gap-3 py-2">
              <span className="w-4 shrink-0 text-center text-sm tabular-nums text-muted-foreground">
                3
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-medium">Parallel Sky</p>
                  <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                    <Check aria-hidden="true" />
                    Downloaded
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  Nocturne Club
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                3:05
              </span>
            </li>
            <li className="flex items-center gap-3 py-2">
              <span className="w-4 shrink-0 text-center text-sm tabular-nums text-muted-foreground">
                4
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Low Tide Motel</p>
                <p className="truncate text-xs text-muted-foreground">
                  Marin Hills
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                5:01
              </span>
            </li>
          </ul>
        </section>

        {/* Group listening session */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Group session</h2>
            <Badge variant="secondary">
              <Users aria-hidden="true" />
              3 listening
            </Badge>
          </div>
          <MessageGroup className="mt-3">
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>MY</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Maya</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Queued Static Bloom next — perfect for the tunnel stretch.
                  </BubbleContent>
                </Bubble>
                <MessageFooter>
                  <span>Added to queue · 21:02</span>
                </MessageFooter>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>Love it. Keep them coming.</BubbleContent>
                </Bubble>
                <MessageFooter>
                  <span>Sent · 21:04</span>
                </MessageFooter>
              </MessageContent>
            </Message>
            <Message>
              <Marker role="status">
                <MarkerIcon>
                  <Spinner />
                </MarkerIcon>
                <MarkerContent>Syncing queue with Maya…</MarkerContent>
              </Marker>
            </Message>
          </MessageGroup>
        </section>
      </div>
    </EvalShell>
  );
}
