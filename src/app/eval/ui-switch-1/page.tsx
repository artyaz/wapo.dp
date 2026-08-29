"use client"
// EVAL page — switch p1 — real estate listing browser — 1440x900 dark
// Switch front and center: saved-search preference rows with descriptions,
// a notification-channel panel (master toggle + per-channel switches), a
// disabled SMS row, and an invalid consent row.
// Co-stars: Card, Badge, Button, Slider, Avatar, Progress.

import {
  Bell,
  Calendar,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  TrendingDown,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

const sections = [
  { label: "Search & alerts", active: true },
  { label: "Saved searches", count: "3" },
  { label: "Tours", count: "2" },
  { label: "Agents" },
  { label: "Billing" },
  { label: "Privacy" },
]

const savedSearches = [
  { name: "Logan Square · 2 bd", badge: "Active", tone: "default", count: "12 new" },
  { name: "Avondale · 3 bd", badge: "Active", tone: "default", count: "3 new" },
  { name: "Pilsen · loft", badge: "Paused", tone: "secondary", count: "—" },
] as const

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-screen w-full max-w-[1360px] flex-col gap-4 px-6 py-4">
        {/* App header */}
        <header className="flex items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-3 text-title text-foreground">
              Keystone
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Chicago homes, block by block
            </span>
          </div>
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Address, neighborhood, or MLS #"
              className="pl-9"
            />
          </div>
          <nav className="ml-auto flex items-center gap-5 text-sm text-muted-foreground">
            <span className="cursor-pointer text-foreground">Browse</span>
            <span className="cursor-pointer">Saved</span>
            <span className="cursor-pointer">Tours</span>
            <span className="cursor-pointer">Messages</span>
          </nav>
          <Avatar>
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[210px_minmax(0,1fr)_300px] gap-4">
          {/* Settings nav */}
          <Card className="h-fit gap-1 py-3">
            <CardContent className="flex flex-col gap-0.5 px-2">
              <p className="px-3 pt-1 pb-2 font-caption text-caption text-muted-foreground">
                Account settings
              </p>
              {sections.map((item) => (
                <span
                  key={item.label}
                  className={
                    item.active
                      ? "flex items-center justify-between rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      : "flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-muted-foreground"
                  }
                >
                  {item.label}
                  {item.count && (
                    <span className="font-code text-xs text-muted-foreground">
                      {item.count}
                    </span>
                  )}
                </span>
              ))}
            </CardContent>
          </Card>

          {/* Main: two switch panels */}
          <div className="grid min-h-0 grid-cols-2 gap-4">
            {/* Search preferences */}
            <Card className="flex min-h-0 flex-col gap-0 py-0">
              <CardHeader className="border-b px-5 py-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-muted-foreground" />
                  Search preferences
                </CardTitle>
                <CardDescription>
                  Saved search · Logan Square · 2 bd condos · under $800k
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col divide-y px-5">
                <label
                  htmlFor="sw-price-drop"
                  className="flex cursor-pointer items-start justify-between gap-4 py-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      Only show price drops
                    </span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Hide homes that haven&apos;t cut their price in 90 days
                    </span>
                  </span>
                  <Switch id="sw-price-drop" defaultChecked className="mt-0.5" />
                </label>
                <label
                  htmlFor="sw-pending"
                  className="flex cursor-pointer items-start justify-between gap-4 py-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      Include pending &amp; contingent
                    </span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Show listings already under contract
                    </span>
                  </span>
                  <Switch id="sw-pending" className="mt-0.5" />
                </label>
                <label
                  htmlFor="sw-radius"
                  className="flex cursor-pointer items-start justify-between gap-4 py-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      Auto-expand search radius
                    </span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Add nearby blocks when fewer than 25 homes match
                    </span>
                  </span>
                  <Switch id="sw-radius" defaultChecked className="mt-0.5" />
                </label>
                <label
                  htmlFor="sw-auctions"
                  className="flex cursor-pointer items-start justify-between gap-4 py-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      Hide auctions &amp; foreclosures
                    </span>
                    <span className="font-caption text-caption text-muted-foreground">
                      Skip distressed and court-ordered sales
                    </span>
                  </span>
                  <Switch id="sw-auctions" defaultChecked className="mt-0.5" />
                </label>
                <div className="flex flex-col gap-2.5 py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Price range
                    </span>
                    <span className="font-code text-xs text-muted-foreground">
                      $350k – $780k
                    </span>
                  </div>
                  <Slider
                    defaultValue={[350, 780]}
                    min={200}
                    max={1200}
                    step={10}
                    aria-label="Price range in thousands of dollars"
                  />
                </div>
                <label
                  htmlFor="sw-agent-share"
                  className="flex cursor-pointer items-start justify-between gap-4 py-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      Share my search activity with my agent
                    </span>
                    <span className="font-caption text-caption text-destructive">
                      Required — accept before saving tour requests
                    </span>
                  </span>
                  <Switch id="sw-agent-share" aria-invalid className="mt-0.5" />
                </label>
              </CardContent>
              <CardFooter className="justify-end gap-2 border-t px-5 py-3">
                <Button variant="ghost" size="sm">
                  Reset
                </Button>
                <Button size="sm">Save preferences</Button>
              </CardFooter>
            </Card>

            {/* Notifications */}
            <Card className="flex min-h-0 flex-col gap-0 py-0">
              <CardHeader className="border-b px-5 py-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bell className="size-4 text-muted-foreground" />
                  Notifications
                </CardTitle>
                <CardDescription>Where Keystone reaches you</CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-0 flex-1 flex-col px-5">
                <label
                  htmlFor="sw-master"
                  className="flex cursor-pointer items-center justify-between gap-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    All alerts for this search
                  </span>
                  <Switch id="sw-master" defaultChecked />
                </label>
                <div className="flex flex-1 flex-col divide-y border-t">
                  <label
                    htmlFor="sw-new-matches"
                    className="flex cursor-pointer items-center gap-3 py-3"
                  >
                    <Home className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-foreground">
                        New matching listings
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Push, instantly
                      </span>
                    </span>
                    <Switch id="sw-new-matches" defaultChecked />
                  </label>
                  <label
                    htmlFor="sw-drop-alerts"
                    className="flex cursor-pointer items-center gap-3 py-3"
                  >
                    <TrendingDown className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-foreground">
                        Price-drop alerts
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Push + email
                      </span>
                    </span>
                    <Switch id="sw-drop-alerts" defaultChecked />
                  </label>
                  <label
                    htmlFor="sw-open-house"
                    className="flex cursor-pointer items-center gap-3 py-3"
                  >
                    <Calendar className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-foreground">
                        Open-house reminders
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        24 hours before each tour
                      </span>
                    </span>
                    <Switch id="sw-open-house" />
                  </label>
                  <label
                    htmlFor="sw-digest"
                    className="flex cursor-pointer items-center gap-3 py-3"
                  >
                    <Mail className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-foreground">
                        Weekly market digest
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Email, Mondays 07:00
                      </span>
                    </span>
                    <Switch id="sw-digest" defaultChecked />
                  </label>
                  <div className="flex items-center gap-3 py-3">
                    <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-muted-foreground">
                        SMS alerts
                      </span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Verify +1 (312) 555-0142 to enable
                      </span>
                    </span>
                    <Switch disabled aria-label="SMS alerts, verification required" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-5 py-3">
                <span className="font-caption text-caption text-muted-foreground">
                  Quiet hours 21:00 – 07:00 · no more than 6 pushes a day
                </span>
              </CardFooter>
            </Card>
          </div>

          {/* Right rail */}
          <div className="flex min-h-0 flex-col gap-4">
            <Card className="gap-3 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Saved searches</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                {savedSearches.map((search) => (
                  <div key={search.name} className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                      {search.name}
                    </span>
                    <Badge
                      variant={search.tone === "default" ? "default" : "secondary"}
                    >
                      {search.badge}
                    </Badge>
                    <span className="w-12 text-right font-code text-xs text-muted-foreground">
                      {search.count}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="px-5">
                <Button variant="outline" size="sm" className="w-full">
                  New saved search
                </Button>
              </CardFooter>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Logan Square pulse</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border px-3 py-2.5">
                    <p className="font-code text-xl text-foreground">128</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      new listings
                    </p>
                  </div>
                  <div className="rounded-lg border px-3 py-2.5">
                    <p className="font-code text-xl text-foreground">41</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      price drops
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Match rate for this search
                    </span>
                    <span className="font-code text-xs text-foreground">64%</span>
                  </div>
                  <Progress value={64} aria-label="Match rate for this search" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Keystone — 4,812 homes for sale across Chicago
          </span>
          <span className="font-code text-xs text-muted-foreground">
            MLS feed synced 8 min ago
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
