"use client";

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import {
  AtSignIcon,
  BellIcon,
  CheckCircle2Icon,
  FileTextIcon,
  GitBranchIcon,
  InboxIcon,
  MessageSquareIcon,
  RocketIcon,
  SearchIcon,
  ServerIcon,
  UserIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawerLayout } from "@/components/ds/DrawerLayout";

/* A single notification entry, used inside the accordion groups and the
   "earlier this week" list. */
function NotificationRow({
  icon,
  title,
  time,
  unread = false,
  first = false,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  time: string;
  unread?: boolean;
  first?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 py-3 ${first ? "pt-1" : ""}`}
    >
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted/40 text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{time}</p>
      </div>
      {unread ? (
        <span
          aria-hidden="true"
          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/80"
        />
      ) : null}
    </div>
  );
}

export default function Page() {
  const [open, setOpen] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative h-screen w-full overflow-hidden bg-background">
        {/* ---------- the workspace sitting under the drawer scrim ---------- */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
                N
              </span>
              <span className="text-sm font-medium">Northwind</span>
              <span className="text-xs text-muted-foreground">
                / Team workspace
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-64 items-center gap-2 rounded-md border px-3 text-xs text-muted-foreground">
                <SearchIcon className="size-3.5" />
                Search projects, files, people…
              </div>
              <span className="relative flex size-8 items-center justify-center rounded-md border">
                <BellIcon className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-foreground" />
              </span>
            </div>
          </header>

          <main className="flex-1 px-10 pt-9">
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Workspace · Overview
            </p>
            <h1 className="mt-1 text-xl font-semibold">
              Good afternoon, Alex
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              3 teammates are active across 4 projects right now.
            </p>

            <div className="mt-6 grid max-w-3xl grid-cols-3 gap-4">
              {[
                { label: "Active projects", value: "4", sub: "1 needs review" },
                { label: "Open threads", value: "12", sub: "3 awaiting you" },
                { label: "Deploys today", value: "3", sub: "All passing" },
              ].map((card) => (
                <div key={card.label} className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="mt-1.5 text-lg font-semibold">{card.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                Recent activity
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {[
                  "Maya pushed 3 commits to northwind-web",
                  "Priya updated the Q3 planning session notes",
                  "Jonas resolved incident #482 — Billing API latency",
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>

        {/* ---------- the notification center drawer ---------- */}
        <DrawerLayout
          open={open}
          onOpenChange={setOpen}
          direction="right"
          modal={false}
          className="absolute inset-0"
        >
          {/* header */}
          <div className="flex w-[400px] max-w-full items-start justify-between gap-4 px-6 pt-6">
            <div className="flex flex-col items-start gap-1.5">
              <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
                Notifications
              </SubframeCore.Drawer.Title>
              <SubframeCore.Drawer.Description className="text-caption font-caption text-neutral-500">
                Northwind workspace · 3 unread today
              </SubframeCore.Drawer.Description>
            </div>
            <button
              type="button"
              className="mt-1 shrink-0 rounded-md text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Mark all read
            </button>
          </div>

          {/* grouped feed */}
          <div className="flex w-[400px] max-w-full flex-col gap-5 px-6">
            <Marker variant="separator">
              <MarkerContent>Today</MarkerContent>
            </Marker>

            <Accordion defaultValue={["mentions", "system"]} className="w-full">
              <AccordionItem value="mentions">
                <AccordionTrigger>
                  <span className="flex items-center gap-2.5">
                    <AtSignIcon className="size-4 text-muted-foreground" />
                    <span>Mentions</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      2 new
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <NotificationRow
                    first
                    unread
                    icon={<AtSignIcon className="size-3.5" />}
                    title={
                      <>
                        Maya mentioned you in{" "}
                        <span className="font-medium">Q3 planning session</span>
                      </>
                    }
                    time="12 minutes ago"
                  />
                  <NotificationRow
                    unread
                    icon={<UserIcon className="size-3.5" />}
                    title={
                      <>
                        Jonas assigned you{" "}
                        <span className="font-medium">Billing migration</span>
                      </>
                    }
                    time="1 hour ago"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="comments">
                <AccordionTrigger>
                  <span className="flex items-center gap-2.5">
                    <MessageSquareIcon className="size-4 text-muted-foreground" />
                    <span>Comments &amp; reviews</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      3 new
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <NotificationRow
                    first
                    icon={<MessageSquareIcon className="size-3.5" />}
                    title={
                      <>
                        Priya commented on{" "}
                        <span className="font-medium">
                          Brand refresh — round 2
                        </span>
                      </>
                    }
                    time="2 hours ago"
                  />
                  <NotificationRow
                    icon={<FileTextIcon className="size-3.5" />}
                    title={
                      <>
                        Sam requested your review on{" "}
                        <span className="font-medium">Export job v2</span>
                      </>
                    }
                    time="5 hours ago"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="system">
                <AccordionTrigger>
                  <span className="flex items-center gap-2.5">
                    <ServerIcon className="size-4 text-muted-foreground" />
                    <span>System &amp; deploys</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      1 new
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <NotificationRow
                    first
                    unread
                    icon={<RocketIcon className="size-3.5" />}
                    title={
                      <>
                        Deploy completed for{" "}
                        <span className="font-medium">northwind-web</span>
                      </>
                    }
                    time="6 minutes ago"
                  />
                  <Marker variant="border" className="mt-3 w-full">
                    <MarkerIcon>
                      <GitBranchIcon />
                    </MarkerIcon>
                    <MarkerContent>
                      main · build #1842 · all checks passed
                    </MarkerContent>
                  </Marker>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Marker variant="separator">
              <MarkerContent>Earlier this week</MarkerContent>
            </Marker>

            <div>
              <NotificationRow
                first
                icon={<CheckCircle2Icon className="size-3.5" />}
                title={
                  <>
                    Priya resolved{" "}
                    <span className="font-medium">incident #482</span>
                  </>
                }
                time="Tuesday · 4:32 PM"
              />
              <NotificationRow
                icon={<FileTextIcon className="size-3.5" />}
                title={
                  <>
                    Jonas shared{" "}
                    <span className="font-medium">
                      Brand refresh — round 2
                    </span>
                  </>
                }
                time="Monday · 10:05 AM"
              />
              <NotificationRow
                icon={<InboxIcon className="size-3.5" />}
                title="Your weekly digest is ready to read"
                time="Monday · 8:00 AM"
              />
            </div>
          </div>

          {/* end of feed */}
          <div className="flex w-[400px] max-w-full flex-col px-6 pb-6">
            <Marker>
              <MarkerIcon>
                <CheckCircle2Icon />
              </MarkerIcon>
              <MarkerContent>That&apos;s everything for this week</MarkerContent>
            </Marker>
          </div>
        </DrawerLayout>
      </div>
    </EvalShell>
  );
}
