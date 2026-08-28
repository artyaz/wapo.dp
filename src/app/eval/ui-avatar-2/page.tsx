"use client"

// EVAL page — avatar p2 — stock research terminal — 390x844 light

import {
  Bell,
  ChevronRight,
  LayoutGrid,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const ANALYSTS = [
  {
    name: "Marcus Chen",
    firm: "Halvorsen Securities",
    src: "https://i.pravatar.cc/150?img=12",
    initials: "MC",
    rating: "Strong Buy",
    tone: "success",
    target: "$160",
  },
  {
    name: "Aisha Bello",
    firm: "Beacon Point Research",
    src: "https://i.pravatar.cc/150?img=32",
    initials: "AB",
    rating: "Buy",
    tone: "success",
    target: "$150",
  },
  {
    name: "Tom Lindqvist",
    firm: "Fjord Capital",
    src: undefined,
    initials: "TL",
    rating: "Hold",
    tone: "neutral",
    target: "$128",
  },
]

const THREAD = [
  {
    name: "Marcus Chen",
    src: "https://i.pravatar.cc/150?img=12",
    initials: "MC",
    text: "H200 channel checks point to a 3-week backlog.",
    when: "14:32",
  },
  {
    name: "Aisha Bello",
    src: "https://i.pravatar.cc/150?img=32",
    initials: "AB",
    text: "Desk sits at 68% growth vs. 61% consensus.",
    when: "15:07",
  },
]

const BOTTOM_NAV = [
  { label: "Watchlist", icon: Star, active: true },
  { label: "Screen", icon: LayoutGrid, active: false },
  { label: "Alerts", icon: Bell, active: false },
  { label: "Portfolio", icon: Wallet, active: false },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* Top bar */}
        <header className="flex h-13 shrink-0 items-center justify-between border-b border-default-border px-4">
          <div>
            <p className="text-sm font-semibold leading-none">Meridian</p>
            <p className="text-caption font-caption text-muted-foreground mt-1">
              Research terminal
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Badge variant="outline" className="font-code">
              NASDAQ
            </Badge>
            <Avatar size="sm">
              <AvatarImage
                src="https://i.pravatar.cc/150?img=31"
                alt="Elena Vargas"
              />
              <AvatarFallback>EV</AvatarFallback>
              <AvatarBadge className="bg-success-500" />
            </Avatar>
          </div>
        </header>

        {/* Ticker header */}
        <section className="flex shrink-0 items-start justify-between gap-3 px-4 pt-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-code text-2xl font-semibold tracking-tight">
                NVDA
              </h1>
              <Badge variant="secondary">Semis</Badge>
            </div>
            <p className="text-caption font-caption text-muted-foreground mt-0.5">
              NVIDIA Corp · 16:00 ET
            </p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="font-code text-2xl font-semibold">$131.88</span>
              <span className="flex items-center gap-1 font-code text-sm text-success-600">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                +2.34 (+1.81%)
              </span>
            </p>
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Add NVDA to watchlist"
          >
            <Star className="size-4" aria-hidden="true" />
          </Button>
        </section>

        {/* Tabs */}
        <div className="shrink-0 px-4 pt-2.5">
          <Tabs defaultValue="analysts">
            <TabsList className="w-full">
              <TabsTrigger value="analysts">Analysts</TabsTrigger>
              <TabsTrigger value="thread">Desk thread</TabsTrigger>
              <TabsTrigger value="notes">My notes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <main className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Consensus */}
          <Card className="gap-3 py-3">
            <CardContent className="flex flex-col gap-2 px-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium leading-none">
                    Analyst consensus
                  </p>
                  <p className="text-caption font-caption text-muted-foreground mt-1">
                    22 estimates · updated 2h ago
                  </p>
                </div>
                <Badge className="border-transparent bg-success-100 text-success-700">
                  Buy
                </Badge>
              </div>
              <Progress value={78} aria-label="Bullish share" />
              <div className="flex items-center justify-between gap-3">
                <p className="font-code text-xs text-muted-foreground">
                  17 of 22 bullish
                </p>
                <p className="font-code text-xs text-foreground">
                  $148 median · +12% upside
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analyst list */}
          <Card className="gap-0 py-3">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">Coverage & targets</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 px-4">
              {ANALYSTS.map((analyst, i) => (
                <div key={analyst.name} className="flex flex-col">
                  {i > 0 ? <Separator className="bg-default-border" /> : null}
                  <div className="flex items-center gap-3 py-1.5">
                    <Avatar size="sm">
                      {analyst.src ? (
                        <AvatarImage src={analyst.src} alt={analyst.name} />
                      ) : null}
                      <AvatarFallback>{analyst.initials}</AvatarFallback>
                      {analyst.tone === "success" ? (
                        <AvatarBadge className="bg-success-500" />
                      ) : null}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium leading-none">
                        {analyst.name}
                      </p>
                      <p className="text-caption font-caption text-muted-foreground mt-1 truncate">
                        {analyst.firm}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {analyst.tone === "success" ? (
                        <Badge
                          variant="outline"
                          className="border-success-200 text-success-700"
                        >
                          {analyst.rating}
                        </Badge>
                      ) : (
                        <Badge variant="outline">{analyst.rating}</Badge>
                      )}
                      <span className="font-code text-xs text-muted-foreground">
                        target {analyst.target}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Desk thread */}
          <Card className="gap-0 py-3">
            <CardContent className="flex flex-col gap-2.5 px-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <AvatarGroup className="-space-x-1.5">
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Marcus Chen"
                      />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://i.pravatar.cc/150?img=32"
                        alt="Aisha Bello"
                      />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarFallback>TL</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount className="border border-default-border">
                      +9
                    </AvatarGroupCount>
                  </AvatarGroup>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-none">
                      Semiconductors desk
                    </p>
                    <p className="text-caption font-caption text-muted-foreground mt-1">
                      13 analysts · 2 replies today
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <Separator className="bg-default-border" />
              {THREAD.map((msg, i) => (
                <div key={msg.when} className="flex flex-col gap-3">
                  {i > 0 ? <Separator className="bg-default-border" /> : null}
                  <div className="flex items-start gap-2.5">
                    <Avatar size="sm">
                      <AvatarImage src={msg.src} alt={msg.name} />
                      <AvatarFallback>{msg.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-baseline gap-2">
                        <span className="text-sm font-medium leading-none">
                          {msg.name}
                        </span>
                        <span className="font-code text-xs text-muted-foreground">
                          {msg.when}
                        </span>
                      </p>
                      <p className="mt-1 text-sm leading-snug text-muted-foreground">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>

        {/* Bottom nav */}
        <footer className="flex h-13 shrink-0 items-stretch border-t border-default-border">
          {BOTTOM_NAV.map((item) => (
            <span
              key={item.label}
              className={`flex flex-1 flex-col items-center justify-center gap-1 ${
                item.active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <item.icon className="size-4" aria-hidden="true" />
              <span className="text-caption font-caption text-xs">
                {item.label}
              </span>
            </span>
          ))}
        </footer>
      </div>
    </EvalShell>
  )
}
