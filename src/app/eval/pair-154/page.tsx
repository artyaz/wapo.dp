"use client";

import React from "react";
import {
  Activity,
  BellOff,
  Globe,
  Inbox,
  Mail,
  MessageSquare,
  OctagonAlert,
  Radio,
  RotateCcw,
  Slack,
  Trash2,
  TriangleAlert,
  UserPlus,
  Zap,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { RecordHeader } from "@/components/ds/RecordHeader";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

/* ------------------------------------------------------------------ */
/* Notification feed data                                              */
/* ------------------------------------------------------------------ */

type Tone = "neutral" | "destructive" | "warning" | "success";

const toneChip: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  destructive: "bg-destructive/15 text-destructive",
  warning: "bg-warning-500/15 text-warning-500",
  success: "bg-success-500/15 text-success-500",
};

const feed: {
  icon: React.ReactNode;
  tone: Tone;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}[] = [
  {
    icon: <OctagonAlert className="size-3.5" />,
    tone: "destructive",
    title: "Latency breached SLO",
    description: "p99 checkout latency at 2.4s — threshold is 1.2s · eu-west-1",
    time: "4m",
    unread: true,
  },
  {
    icon: <TriangleAlert className="size-3.5" />,
    tone: "warning",
    title: "Error budget 80% consumed",
    description: "3.2% of the monthly availability budget remains",
    time: "18m",
    unread: true,
  },
  {
    icon: <UserPlus className="size-3.5" />,
    tone: "neutral",
    title: "On-call lead changed",
    description: "Priya R. is now escalation lead for INC-2417",
    time: "42m",
    unread: true,
  },
  {
    icon: <RotateCcw className="size-3.5" />,
    tone: "success",
    title: "Auto-rollback succeeded",
    description: "deploy #4127 restored payments-v2 8.3.2 in 96s",
    time: "1h",
  },
  {
    icon: <MessageSquare className="size-3.5" />,
    tone: "neutral",
    title: "Comment · Platform team",
    description: "Confirmed dependency on the payments-v2 cache purge",
    time: "2h",
  },
  {
    icon: <Globe className="size-3.5" />,
    tone: "neutral",
    title: "Status page updated",
    description: "Investigating — checkout latency degradation",
    time: "3h",
  },
];

const channels: {
  icon: React.ReactNode;
  name: string;
  detail: string;
  status: string;
  tone: Tone;
}[] = [
  {
    icon: <Slack className="size-3.5" />,
    name: "Slack",
    detail: "#ops-oncall",
    status: "Delivered · 12 events",
    tone: "success",
  },
  {
    icon: <Radio className="size-3.5" />,
    name: "PagerDuty",
    detail: "ops-service · prod",
    status: "Failing · retry 2 of 5",
    tone: "destructive",
  },
  {
    icon: <Mail className="size-3.5" />,
    name: "Email digest",
    detail: "Daily · 08:00 UTC",
    status: "Scheduled",
    tone: "neutral",
  },
];

const statusDot: Record<Tone, string> = {
  neutral: "bg-muted-foreground/60",
  destructive: "bg-destructive",
  warning: "bg-warning-500",
  success: "bg-success-500",
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col">
        {/* Record identity strip — the notification stream for one incident */}
        <RecordHeader
          breadcrumb="Pulse / Incidents / 2025 / Q3"
          title="Checkout latency spike"
          recordId="INC-2417"
          meta="Notification center · Opened Aug 24, 2025 · Severity 2 · Owner: Platform"
          secondaryAction="Mute"
          primaryAction="Resolve"
        />

        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1140px] px-6 py-6">
            <div className="grid grid-cols-[minmax(0,1fr)_340px] items-start gap-6">
              {/* ---------------- Inbox feed ---------------- */}
              <AlertDialog defaultOpen>
                <section className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Inbox className="size-4 text-muted-foreground" />
                        Inbox
                      </h2>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        3 unread
                      </span>
                      <nav className="hidden items-center gap-3 text-xs md:flex">
                        <span className="text-foreground underline underline-offset-4">
                          All
                        </span>
                        <span className="text-muted-foreground">Unread</span>
                        <span className="text-muted-foreground">Pinned</span>
                      </nav>
                    </div>
                    <AlertDialogTrigger
                      render={
                        <Button variant="outline" size="sm">
                          <Trash2 />
                          Clear all…
                        </Button>
                      }
                    />
                  </div>

                  <ul className="divide-y divide-border">
                    {feed.map((item) => (
                      <li
                        key={item.title}
                        className="flex items-start gap-3 px-4 py-3.5"
                      >
                        <span
                          className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md ${toneChip[item.tone]}`}
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-4">
                            <p className="truncate text-sm font-medium text-foreground">
                              {item.title}
                            </p>
                            <time className="shrink-0 text-xs text-muted-foreground">
                              {item.time}
                            </time>
                          </div>
                          <p className="mt-0.5 truncate text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        {item.unread ? (
                          <span
                            aria-hidden
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground"
                          />
                        ) : null}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border px-4 py-2.5 text-center text-xs text-muted-foreground">
                    Load 6 older notifications
                  </div>
                </section>

                {/* Destructive confirmation — open by default for the audit */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                      <Trash2 />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                      Clear all notifications?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This dismisses all 12 notifications on INC-2417,
                      including 3 unread. Pinned items and the full audit trail
                      are kept.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                      Clear all
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* ---------------- Delivery side panel ---------------- */}
              <aside className="flex flex-col gap-6">
                <section className="overflow-hidden rounded-lg border border-border bg-card">
                  <header className="flex items-center justify-between border-b border-border px-4 py-3">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Zap className="size-4 text-muted-foreground" />
                      Delivery
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      last 24h
                    </span>
                  </header>
                  <ul className="divide-y divide-border">
                    {channels.map((ch) => (
                      <li
                        key={ch.name}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          {ch.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">
                            {ch.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {ch.detail}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span
                            aria-hidden
                            className={`size-1.5 rounded-full ${statusDot[ch.tone]}`}
                          />
                          <span className="text-xs text-muted-foreground">
                            {ch.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-lg border border-border bg-card px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <BellOff className="size-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        Quiet hours
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Daily 22:00–07:00 UTC · Severity 1 pages override quiet
                        hours.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-border bg-card px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Activity className="size-3.5" />
                    </span>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Live updates for this incident stream are on. Toasts
                      appear bottom-right while the console is open.
                    </p>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>

      {/* ---------------- Live toasts (kept open for the audit) ---------------- */}
      <ToastProvider>
        <Toast duration={Infinity}>
          <div className="grid gap-1">
            <ToastTitle>Escalation acknowledged</ToastTitle>
            <ToastDescription>
              Priya R. accepted the page · 42s response time
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <Toast duration={Infinity} variant="destructive">
          <div className="grid gap-1">
            <ToastTitle>Webhook delivery failed</ToastTitle>
            <ToastDescription>
              PagerDuty endpoint returned 502 · retry 2 of 5 in 60s
            </ToastDescription>
          </div>
          <ToastAction altText="Retry now">Retry now</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </EvalShell>
  );
}
