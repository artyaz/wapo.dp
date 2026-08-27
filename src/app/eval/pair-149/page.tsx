"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { StatTile } from "@/components/ds/StatTile";
import { GlassDisplacement } from "@/components/ds/GlassDisplacement";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CalendarDays, Link2, MapPin } from "lucide-react";

const followerSparkline = (
  <svg
    viewBox="0 0 120 24"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="h-6 w-full text-neutral-500"
  >
    <polyline
      points="0,18 12,17 24,19 36,14 48,15 60,10 72,12 84,8 96,9 108,5 120,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const activity = [
  {
    user: "Priya Natarajan",
    avatar: "https://github.com/shadcn.png",
    initials: "PN",
    text: "liked “Ferrofluid Study No. 4”",
    time: "2h",
    action: "View",
    variant: "ghost" as const,
  },
  {
    user: "Devon Iwaki",
    avatar: "https://github.com/maxleiter.png",
    initials: "DI",
    text: "started following you",
    time: "5h",
    action: "Follow",
    variant: "outline" as const,
  },
  {
    user: "Tomas Lindqvist",
    avatar: "https://github.com/evilrabbit.png",
    initials: "TL",
    text: "commented on “Halide Grain”",
    time: "1d",
    action: "Reply",
    variant: "ghost" as const,
  },
  {
    user: "Studio Ferro",
    avatar: null,
    initials: "SF",
    text: "mentioned you in “Weekly Critique”",
    time: "2d",
    action: "View",
    variant: "ghost" as const,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-code text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
      {children}
    </h2>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ---------------- cover banner ---------------- */}
        <section className="relative h-[228px] shrink-0 overflow-hidden border-b border-solid border-default-border bg-neutral-100">
          {/* ambient glows */}
          <div
            aria-hidden
            className="absolute -top-44 right-[-120px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(143,140,132,0.22),transparent_62%)]"
          />
          <div
            aria-hidden
            className="absolute bottom-[-240px] left-[36%] size-[480px] rounded-full bg-[radial-gradient(circle,rgba(85,82,76,0.55),transparent_70%)]"
          />

          {/* ghost display type — the backdrop the glass panel bends */}
          <div aria-hidden className="absolute inset-0 flex items-center">
            <span className="select-none whitespace-nowrap pl-10 font-code text-[100px] font-semibold leading-none tracking-[0.12em] text-neutral-900/30">
              MARA·CHEN
            </span>
          </div>

          {/* hairlines running under the glass edge */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-[96px] h-px bg-neutral-500/30"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-[152px] h-px bg-neutral-500/20"
          />

          {/* corner chrome */}
          <div className="absolute right-10 top-5">
            <Button variant="outline" size="sm">
              Edit profile
            </Button>
          </div>
          <p className="absolute bottom-7 right-10 font-code text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Visual designer · Providence · est. 2019
          </p>

          {/* liquid-glass identity card floating over the cover */}
          <GlassDisplacement
            radius="lg"
            intensity="medium"
            className="absolute bottom-6 left-10 h-[112px] w-[500px]"
          >
            <div className="flex h-full w-full items-center gap-4 p-5">
              <Avatar className="size-12">
                <AvatarFallback className="text-sm font-medium">
                  MC
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[17px] font-medium leading-tight text-default-font">
                  Mara Chen
                </p>
                <p className="mt-1 truncate text-[13px] leading-tight text-neutral-500">
                  @mara.chen · Visual designer
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-600/50 px-2.5 py-1 font-code text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                <span className="size-1.5 rounded-full bg-success-500" />
                Open for work
              </span>
            </div>
          </GlassDisplacement>
        </section>

        {/* ---------------- main content ---------------- */}
        <main className="flex min-h-0 flex-1 flex-col gap-5 px-10 pb-6 pt-5">
          {/* metrics row */}
          <div className="grid shrink-0 grid-cols-3 gap-4">
            <StatTile
              label="Followers"
              value="12,847"
              delta="+3.2%"
              sign="positive"
              footer="gained 397 this month"
              sparkline={followerSparkline}
            />
            <StatTile
              label="Shot views"
              value="98.4K"
              delta="+12.6%"
              sign="positive"
              footer="last 28 days"
            />
            <StatTile
              label="Engagement"
              value="4.8%"
              delta="-0.3"
              sign="negative"
              footer="likes + comments"
            />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-5">
            {/* activity feed */}
            <section className="flex min-h-0 flex-col">
              <div className="flex items-center justify-between">
                <SectionLabel>Recent activity</SectionLabel>
                <span className="inline-flex items-center gap-1 text-[12px] text-neutral-500">
                  View all
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
              <div className="mt-3 rounded-lg border border-solid border-default-border bg-panel p-2">
                <ItemGroup>
                  {activity.map((a, i) => (
                    <React.Fragment key={a.user}>
                      {i > 0 ? <ItemSeparator /> : null}
                      <Item>
                        <ItemMedia>
                          <Avatar>
                            {a.avatar ? (
                              <AvatarImage
                                src={a.avatar}
                                className="grayscale"
                              />
                            ) : null}
                            <AvatarFallback>{a.initials}</AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{a.user}</ItemTitle>
                          <ItemDescription>{a.text}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <span className="font-code text-[11px] tabular-nums text-neutral-500">
                            {a.time}
                          </span>
                          <Button variant={a.variant} size="sm">
                            {a.action}
                          </Button>
                        </ItemActions>
                      </Item>
                    </React.Fragment>
                  ))}
                </ItemGroup>
              </div>
              <p className="mt-3 text-center font-code text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Showing 4 of 128 events
              </p>
            </section>

            {/* about panel */}
            <section className="flex min-h-0 flex-col">
              <SectionLabel>About</SectionLabel>
              <div className="mt-3 rounded-lg border border-solid border-default-border bg-panel p-5">
                <p className="text-[13px] leading-relaxed text-neutral-500">
                  Independent visual designer working across type systems,
                  print ephemera, and calm software. Previously design lead at
                  Studio Ferro; now taking select commissions.
                </p>
                <div className="my-4 h-px bg-default-border" />
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-3 text-[13px] text-neutral-500">
                    <MapPin className="size-4 text-neutral-500" />
                    Providence, RI
                  </li>
                  <li className="flex items-center gap-3 text-[13px] text-neutral-500">
                    <CalendarDays className="size-4 text-neutral-500" />
                    Joined March 2021
                  </li>
                  <li className="flex items-center gap-3 text-[13px] text-neutral-500">
                    <Link2 className="size-4 text-neutral-500" />
                    marachen.design
                  </li>
                </ul>
                <div className="my-4 h-px bg-default-border" />
                <p className="font-code text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                  Focus
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {["Type systems", "Print", "Design tokens", "Motion"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-solid border-default-border px-2.5 py-1 text-[11px] text-neutral-500"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </EvalShell>
  );
}
