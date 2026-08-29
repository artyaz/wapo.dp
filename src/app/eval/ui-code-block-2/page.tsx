"use client"
// EVAL page — code-block p2 — gym workout tracker — 430x932 dark (phone)
// The webhook integration screen of a workout-tracking app: a curl snippet
// to fire a test event, the JSON payload shape with a numbered gutter, and
// the event subscription + delivery-log surfaces around it.
// Co-stars: Card, Badge, Button, Switch, Avatar.

import { ChevronLeft, MoreHorizontal, Zap } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockCopyButton,
} from "@/components/ui/code-block"
import { Switch } from "@/components/ui/switch"

const curlCode = `# fire a test workout.session.completed event
curl -X POST https://hooks.replog.app/9f2c \\
  -H "Authorization: Bearer $REPLOG_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"type":"workout.session.completed",
       "test":true}'`

const payloadCode = `{
  "id": "evt_01HTX4K2M8QZ",
  "type": "workout.session.completed",
  "created_at": "2026-02-18T06:41:12Z",
  "athlete": {
    "id": "ath_5521",
    "name": "Kai Deleon",
    "plan": "hypertrophy-4d"
  },
  "session": {
    "id": "s_8842",
    "title": "Push day — chest focus",
    "duration_sec": 3120,
    "volume_kg": 9420,
    "exercises": [
      { "movement": "bench press", "sets": 4, "top_kg": 102.5 },
      { "movement": "incline db press", "sets": 3, "top_kg": 34 }
    ]
  },
  "personal_records": ["bench press"],
  "streak_days": 41
}`

const events = [
  {
    name: "workout.session.completed",
    hint: "Fires when a logged session is saved",
    on: true,
  },
  {
    name: "personal_record.hit",
    hint: "New best set for any tracked movement",
    on: true,
  },
  {
    name: "streak.milestone",
    hint: "Every 7 days of unbroken training",
    on: false,
  },
]

const deliveries = [
  { time: "06:41:12", status: "200 OK", latency: "84 ms", ok: true },
  { time: "06:12:55", status: "200 OK", latency: "132 ms", ok: true },
  { time: "05:58:03", status: "502", latency: "timed out", ok: false },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col bg-background">
        {/* App bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
          <Button variant="ghost" size="icon-sm" aria-label="Back to integrations">
            <ChevronLeft aria-hidden="true" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              Webhooks
            </p>
            <p className="font-caption text-caption text-muted-foreground">
              Integration · RepLog
            </p>
          </div>
          <Avatar size="sm">
            <AvatarFallback>KD</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </header>

        <main className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3">
          {/* Endpoint status */}
          <Card className="gap-0 py-0">
            <CardContent className="flex items-center gap-3 px-4 py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted">
                <Zap className="size-4 text-muted-foreground" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Endpoint live
                  </span>
                  <Badge className="border-transparent bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300">
                    Active
                  </Badge>
                </div>
                <p className="mt-0.5 truncate font-code text-xs text-muted-foreground">
                  hooks.replog.app/9f2c
                </p>
              </div>
              <Switch defaultChecked aria-label="Webhook endpoint enabled" />
            </CardContent>
          </Card>

          {/* Test event */}
          <section className="flex flex-col gap-1.5">
            <h2 className="text-sm font-medium text-foreground">
              Send a test event
            </h2>
            <CodeBlock code={curlCode} language="bash" size="compact">
              <CodeBlockCode />
              <CodeBlockCopyButton />
            </CodeBlock>
            <p className="font-caption text-caption text-muted-foreground">
              Synthetic session tagged{" "}
              <span className="rounded-sm border border-default-border bg-muted px-1 py-px font-code text-[11px] text-foreground">
                &quot;test&quot;: true
              </span>{" "}
              — never counted in streaks.
            </p>
          </section>

          {/* Payload shape */}
          <section className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium text-foreground">
                Payload shape
              </h2>
              <span className="font-code text-xs text-muted-foreground">
                v2 · 21 fields
              </span>
            </div>
            <CodeBlock code={payloadCode} language="json" size="compact">
              {/* 188px = compact density (10px pad + 9 × 19.8px lines = 188.2),
                  so the scroll region ends on a line boundary — the athlete
                  object closes and the cut leaves no half-rendered text. */}
              <CodeBlockCode showLineNumbers wrap maxHeight={188} />
            </CodeBlock>
          </section>

          {/* Subscriptions */}
          <section className="flex flex-col gap-1.5">
            <h2 className="text-sm font-medium text-foreground">
              Subscribed events
            </h2>
            <Card className="gap-0 py-0">
              <CardContent className="flex flex-col px-0 py-0">
                {events.map((event, i) => (
                  <div
                    key={event.name}
                    className={
                      "flex items-center gap-3 px-4 py-1.5" +
                      (i < events.length - 1 ? " border-b" : "")
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-code text-xs text-foreground">
                        {event.name}
                      </p>
                      <p className="mt-0.5 font-caption text-caption text-muted-foreground">
                        {event.hint}
                      </p>
                    </div>
                    <Switch
                      defaultChecked={event.on}
                      aria-label={`Subscribe to ${event.name}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Delivery log */}
          <section className="flex flex-col gap-1.5 pb-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium text-foreground">
                Recent deliveries
              </h2>
              <span className="font-code text-xs text-muted-foreground">
                3 / 500 this month
              </span>
            </div>
            <Card className="gap-0 py-0">
              <CardContent className="flex flex-col px-0 py-0">
                {deliveries.map((delivery, i) => (
                  <div
                    key={delivery.time}
                    className={
                      "flex items-center gap-3 px-4 py-1.5" +
                      (i < deliveries.length - 1 ? " border-b" : "")
                    }
                  >
                    <span className="font-code text-xs text-muted-foreground">
                      {delivery.time}
                    </span>
                    {delivery.ok ? (
                      <Badge
                        variant="secondary"
                        className="border-transparent bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300"
                      >
                        {delivery.status}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">{delivery.status}</Badge>
                    )}
                    <span className="ms-auto font-code text-xs text-muted-foreground">
                      {delivery.latency}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Action bar */}
        <div className="flex shrink-0 items-center gap-2 border-t px-4 py-3">
          <Button variant="outline" className="flex-1">
            Send test event
          </Button>
          <Button className="flex-1">Save changes</Button>
        </div>
      </div>
    </EvalShell>
  )
}
