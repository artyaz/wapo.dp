"use client"
// EVAL page — label p2 — customer support ticket inbox — 390x844 light (phone)
// Label front and center: compact filter labels, reply composer label with a
// character count, status radio labels, switch/checkbox label rows, required
// marks. Co-stars: Input, Textarea, Select, RadioGroup, Switch, Checkbox,
// Badge, Button, Card, Separator, Avatar.

import { LifeBuoy, Search, Send, SlidersHorizontal } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const queues = [
  { label: "All queues", value: "all" },
  { label: "Orders", value: "orders" },
  { label: "Billing", value: "billing" },
  { label: "Returns", value: "returns" },
]

const statuses = [
  { label: "All open", value: "open" },
  { label: "Unanswered", value: "unanswered" },
  { label: "Solved", value: "solved" },
]

const tickets = [
  {
    id: "TK-4821",
    subject: "Order #48213 arrived damaged",
    customer: "Dana Whitfield",
    time: "12m",
    status: "Open",
    statusVariant: "default" as const,
    meta: "High · SLA 45m left",
  },
  {
    id: "TK-4796",
    subject: "Refund not showing on statement",
    customer: "Marcus Lee",
    time: "1h",
    status: "Pending",
    statusVariant: "secondary" as const,
    meta: "Normal · waiting on bank",
  },
  {
    id: "TK-4771",
    subject: "Change shipping address",
    customer: "Priya Raman",
    time: "3h",
    status: "Solved",
    statusVariant: "outline" as const,
    meta: "Low · closed 14:32",
  },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col gap-3.5 px-4 py-4">
        {/* App header */}
        <header className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border">
            <LifeBuoy className="size-4 text-foreground" />
          </span>
          <div className="min-w-0">
            <h1 className="font-heading-3 text-heading-3 text-foreground">
              Helm Desk
            </h1>
            <p className="font-caption text-caption text-muted-foreground">
              support inbox
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge className="font-code font-normal">12 open</Badge>
            <Avatar className="size-8">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Quick filters — labels above each control */}
        <Card className="gap-3 py-4">
          <CardContent className="flex flex-col gap-3 px-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ticket-search">
                Search
                <span className="font-code text-xs font-normal text-muted-foreground">
                  3 matches
                </span>
              </Label>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="ticket-search"
                  defaultValue="refund"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="queue-filter">Queue</Label>
                <Select items={queues} defaultValue="orders">
                  <SelectTrigger id="queue-filter" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {queues.map((q) => (
                        <SelectItem key={q.value} value={q.value}>
                          {q.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="status-filter">Status</Label>
                <Select items={statuses} defaultValue="open">
                  <SelectTrigger id="status-filter" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statuses.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ticket list */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-heading-3 text-heading-3 text-foreground">
              Today
            </h2>
            <span className="font-caption text-caption text-muted-foreground">
              sorted by SLA
            </span>
          </div>
          {tickets.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <Avatar className="mt-0.5 size-8">
                <AvatarFallback>
                  {t.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {t.subject}
                </p>
                <p className="mt-0.5 truncate font-caption text-caption text-muted-foreground">
                  {t.customer} · {t.meta}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge variant={t.statusVariant}>{t.status}</Badge>
                  <span className="font-code text-xs text-muted-foreground">
                    {t.id} · {t.time} ago
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Reply composer — the label-dense zone */}
        <Card className="mt-auto gap-3 py-4">
          <CardContent className="flex flex-col gap-3 px-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                Reply · TK-4821
              </p>
              <span className="ml-auto font-code text-xs text-muted-foreground">
                38 / 500
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reply-body">
                Message to Dana
                <span aria-hidden="true" className="text-foreground">
                  *
                </span>
              </Label>
              <Textarea
                id="reply-body"
                rows={3}
                defaultValue="Hi Dana — so sorry about the dented box. I've queued a replacement for order #48213, shipping today with a prepaid return label."
                className="resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Set status</Label>
              <RadioGroup defaultValue="pending" className="flex gap-3">
                {[
                  { value: "open", label: "Open" },
                  { value: "pending", label: "Pending" },
                  { value: "solved", label: "Solved" },
                ].map((s) => (
                  <div key={s.value} className="flex items-center gap-1.5">
                    <RadioGroupItem id={`st-${s.value}`} value={s.value} />
                    <Label htmlFor={`st-${s.value}`} className="font-normal">
                      {s.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <Label htmlFor="notify-watcher" className="text-sm">
                  Notify watcher
                </Label>
                <span className="font-caption text-caption text-muted-foreground">
                  Ashley R. follows this ticket.
                </span>
              </div>
              <Switch id="notify-watcher" defaultChecked />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="attach-order" defaultChecked />
              <Label htmlFor="attach-order" className="font-normal">
                Attach order #48213
              </Label>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Send />
                Send reply
              </Button>
              <Button variant="outline">Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EvalShell>
  )
}
