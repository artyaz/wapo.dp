"use client";

// EVAL page — message-scroller p1 — crypto portfolio tracker — 1024x768 light

import React from "react";
import { ArrowDownRightIcon, ArrowUpRightIcon, BellIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FeedEntry =
  | {
      kind: "event";
      id: string;
      time: string;
      label: string;
      detail: string;
    }
  | {
      kind: "note";
      id: string;
      time: string;
      author: string;
      initials: string;
      text: string;
      mine?: boolean;
    };

const feed: FeedEntry[] = [
  {
    kind: "event",
    id: "fill-01",
    time: "14:02",
    label: "LIMIT FILL",
    detail: "BUY 0.142 BTC @ 67,418.20 · Coinbase",
  },
  {
    kind: "note",
    id: "note-01",
    time: "14:05",
    author: "Priya Nair",
    initials: "PN",
    text: "Trimmed SOL by 12% after the second failed retest of $182. Holding the rest for a confirmed range break.",
  },
  {
    kind: "event",
    id: "alert-01",
    time: "14:09",
    label: "PRICE ALERT",
    detail: "ETH crossed $3,500 — take-profit ladder armed at 3,540 / 3,580",
  },
  {
    kind: "note",
    id: "note-02",
    time: "14:12",
    author: "You",
    initials: "AR",
    mine: true,
    text: "Keep the DCA schedule flat through Friday's CPI print. No discretionary adds while drift is under 5%.",
  },
  {
    kind: "event",
    id: "fill-02",
    time: "14:17",
    label: "MARKET FILL",
    detail: "SELL 18.5 SOL @ 179.84 · Kraken",
  },
  {
    kind: "event",
    id: "rebal-01",
    time: "14:21",
    label: "AUTO-REBALANCE",
    detail: "Moved $4,200 USDC → BTC (BTC drifted 5.2% below target)",
  },
  {
    kind: "note",
    id: "note-03",
    time: "14:26",
    author: "Marco Reyes",
    initials: "MR",
    text: "Taker fees on the Coinbase DCA leg are eating the edge. Switched the ladder to limit-only fills.",
  },
  {
    kind: "event",
    id: "alert-02",
    time: "14:29",
    label: "RATE ALERT",
    detail: "LINK perp funding flipped negative (−0.012%) — carry now pays longs",
  },
  {
    kind: "note",
    id: "note-04",
    time: "14:31",
    author: "Priya Nair",
    initials: "PN",
    text: "Stop moved to breakeven on the ETH add. Free carry into the print either way.",
  },
  {
    kind: "event",
    id: "fill-03",
    time: "14:33",
    label: "LIMIT FILL",
    detail: "BUY 165 LINK @ 16.42 · re-balanced to target weight",
  },
];

const holdings = [
  {
    asset: "Bitcoin",
    ticker: "BTC",
    amount: "2.1840",
    price: "67,418.20",
    change: "+2.41%",
    direction: "up" as const,
    value: "147,225.40",
  },
  {
    asset: "Ethereum",
    ticker: "ETH",
    amount: "14.2000",
    price: "3,492.60",
    change: "+1.18%",
    direction: "up" as const,
    value: "49,594.92",
  },
  {
    asset: "Solana",
    ticker: "SOL",
    amount: "118.50",
    price: "179.84",
    change: "−3.07%",
    direction: "down" as const,
    value: "21,311.04",
  },
  {
    asset: "Chainlink",
    ticker: "LINK",
    amount: "940.00",
    price: "16.42",
    change: "+0.86%",
    direction: "up" as const,
    value: "15,434.80",
  },
  {
    asset: "USD Coin",
    ticker: "USDC",
    amount: "15,046.00",
    price: "1.0001",
    change: "0.00%",
    direction: "flat" as const,
    value: "15,045.84",
  },
];

function FeedScrollStatus() {
  const { start, end } = useMessageScrollerScrollable();

  const label =
    start && end
      ? "Mid-feed — scrolls both ways"
      : end
        ? "At the top of today's feed"
        : "Caught up — live edge";

  return (
    <span className="font-code text-[11px] text-muted-foreground">
      {label}
    </span>
  );
}

export default function Page() {
  const [live, setLive] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-[768px] w-full flex-col overflow-hidden bg-background text-foreground">
        {/* App header */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded-sm bg-primary font-code text-[12px] font-medium text-primary-foreground">
              M
            </div>
            <span className="text-sm font-semibold">Meridian</span>
          </div>
          <Badge variant="outline" className="font-code text-[10px]">
            Mainnet
          </Badge>
          <span className="font-code text-xs text-muted-foreground">
            0x7f3a…9c2b
          </span>
          <div className="ml-auto flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="relative flex size-1.5 rounded-full bg-success-600" />
              Synced 12s ago
            </span>
            <Button variant="ghost" size="icon-sm" aria-label="Price alerts">
              <BellIcon />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Left rail — portfolio + holdings */}
          <aside className="flex w-[400px] shrink-0 flex-col gap-4 border-r p-4">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Total balance
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5">
                <div className="flex flex-col gap-1">
                  <p className="font-code text-3xl font-medium">
                    $248,612.04
                  </p>
                  <p className="flex items-center gap-1 text-xs font-medium text-success-700">
                    <ArrowUpRightIcon className="size-3.5" />
                    +$3,412.18&nbsp;
                    <span className="font-code">(+1.39%)</span>&nbsp;today
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-muted-foreground">
                      BTC at target weight
                    </span>
                    <span className="font-code text-muted-foreground">
                      59.2% / 60%
                    </span>
                  </div>
                  <Progress value={94} aria-label="BTC at target weight" />
                </div>
                <div className="flex items-center justify-between">
                  <dl className="flex gap-5">
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground">
                        24h volume
                      </dt>
                      <dd className="font-code text-xs font-medium">$18.4k</dd>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[11px] text-muted-foreground">
                        Realized P/L
                      </dt>
                      <dd className="font-code text-xs font-medium text-success-700">
                        +$9,128.55
                      </dd>
                    </div>
                  </dl>
                  <Button variant="outline" size="sm">
                    Rebalance
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-0 overflow-hidden py-0">
              <div className="flex h-11 shrink-0 items-center justify-between border-b px-5">
                <span className="font-heading-3 text-heading-3">Holdings</span>
                <span className="font-code text-[11px] text-muted-foreground">
                  5 assets
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-5">Asset</TableHead>
                    <TableHead className="text-end">24h</TableHead>
                    <TableHead className="pr-5 text-end">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdings.map((row) => (
                    <TableRow key={row.ticker}>
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-7 items-center justify-center rounded-full border font-code text-[10px] text-muted-foreground">
                            {row.ticker.slice(0, 2)}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-medium">
                              {row.asset}
                            </span>
                            <span className="font-code text-[11px] text-muted-foreground">
                              {row.amount} {row.ticker}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-end">
                        {row.direction === "flat" ? (
                          <span className="inline-flex font-code text-xs font-medium text-muted-foreground">
                            {row.change}
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-0.5 font-code text-xs font-medium ${
                              row.direction === "up"
                                ? "text-success-700"
                                : "text-destructive"
                            }`}
                          >
                            {row.direction === "up" ? (
                              <ArrowUpRightIcon className="size-3" />
                            ) : (
                              <ArrowDownRightIcon className="size-3" />
                            )}
                            {row.change}
                          </span>
                        )}
                        <div className="font-code text-[11px] text-muted-foreground">
                          ${row.price}
                        </div>
                      </TableCell>
                      <TableCell className="pr-5 text-end font-code text-[11px]">
                        ${row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <p className="mt-auto px-1 font-code text-[11px] text-muted-foreground">
              Prices · CoinGecko · updated 14:33:06
            </p>
          </aside>

          {/* Main — live desk feed */}
          <main className="flex min-w-0 flex-1 flex-col p-4">
            <MessageScrollerProvider
              autoScroll={live}
              defaultScrollPosition="start"
            >
              <Card className="min-h-0 flex-1 gap-0 overflow-hidden bg-background py-0">
                <div className="flex h-12 shrink-0 items-center gap-3 border-b px-5">
                  <span className="font-heading-3 text-heading-3">Desk feed</span>
                  <Badge variant="secondary" className="font-code text-[10px]">
                    4 new
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Executions · alerts · desk notes
                  </span>
                  <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                    <span className={live ? "text-foreground" : undefined}>
                      Live
                    </span>
                    <Switch
                      checked={live}
                      onCheckedChange={setLive}
                      aria-label="Follow the live edge of the feed"
                    />
                  </label>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden">
                  <MessageScroller>
                    <MessageScrollerViewport
                      aria-label="Portfolio activity feed"
                      className="px-2"
                    >
                      <MessageScrollerContent className="gap-3 px-3 py-4">
                        <MessageScrollerItem className="flex justify-center">
                          <span className="rounded-full border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                            Today · 12 Feb 2026
                          </span>
                        </MessageScrollerItem>
                        {feed.map((entry) =>
                          entry.kind === "event" ? (
                            <MessageScrollerItem
                              key={entry.id}
                              messageId={entry.id}
                              scrollAnchor
                            >
                              <div className="flex w-full items-center gap-3 rounded-md border bg-card px-3 py-2">
                                <span className="font-code text-[11px] text-muted-foreground">
                                  {entry.time}
                                </span>
                                <span className="font-code text-[11px] font-medium">
                                  {entry.label}
                                </span>
                                <span className="min-w-0 flex-1 font-code text-xs text-muted-foreground">
                                  {entry.detail}
                                </span>
                              </div>
                            </MessageScrollerItem>
                          ) : (
                            <MessageScrollerItem
                              key={entry.id}
                              messageId={entry.id}
                              scrollAnchor={!entry.mine}
                            >
                              <Message align={entry.mine ? "end" : "start"}>
                                <MessageAvatar>
                                  <Avatar size="sm">
                                    <AvatarFallback>
                                      {entry.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                </MessageAvatar>
                                <MessageContent>
                                  <MessageHeader>
                                    <span className="text-[13px]">
                                      {entry.author}
                                    </span>
                                    <span className="font-code text-[11px] font-normal text-muted-foreground">
                                      {entry.time}
                                    </span>
                                  </MessageHeader>
                                  <Bubble
                                    variant={entry.mine ? "primary" : "outline"}
                                  >
                                    <BubbleContent className="max-w-[420px]">
                                      {entry.text}
                                    </BubbleContent>
                                  </Bubble>
                                </MessageContent>
                              </Message>
                            </MessageScrollerItem>
                          )
                        )}
                      </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                  </MessageScroller>
                </div>

                <div className="flex h-9 shrink-0 items-center justify-between border-t px-5">
                  <span className="font-code text-[11px] text-muted-foreground">
                    10 entries · updated 14:33:06
                  </span>
                  <FeedScrollStatus />
                </div>
              </Card>
            </MessageScrollerProvider>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
