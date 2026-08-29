"use client";

/**
 * EVAL page — radio-group p3 — job board for designers — 768x1024 dark
 *
 * Portrait-tablet screen for "Kern & Co.", a job board for designers. A
 * persistent filter rail on the left holds three single-select
 * RadioGroups — remote policy, experience level (with result counts) and
 * sort order — plus a "hiring now" switch. The listing column shows the
 * role cards, and a job-alerts card closes the page with a fourth
 * RadioGroup (digest frequency with descriptions, one disabled option).
 * Other ui/* components: Badge, Button, Card, Avatar, Switch, Input,
 * Separator.
 */

import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkle,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type WorkMode = "Remote" | "Hybrid" | "On-site";

type Job = {
  id: string;
  title: string;
  company: string;
  initials: string;
  mode: WorkMode;
  location: string;
  rate: string;
  posted: string;
  closingSoon?: boolean;
};

const JOBS: Job[] = [
  {
    id: "KC-2214",
    title: "Staff Product Designer",
    company: "Figma",
    initials: "FI",
    mode: "Hybrid",
    location: "San Francisco",
    rate: "$220–250k",
    posted: "2 h ago",
  },
  {
    id: "KC-2207",
    title: "Brand Designer",
    company: "Ghostnote Studio",
    initials: "GS",
    mode: "Remote",
    location: "EU · anywhere",
    rate: "€65–75 / hr",
    posted: "Yesterday",
  },
  {
    id: "KC-2196",
    title: "Design Systems Lead",
    company: "Northbeam",
    initials: "NB",
    mode: "Remote",
    location: "US · anywhere",
    rate: "$195–215k",
    posted: "3 d ago",
    closingSoon: true,
  },
  {
    id: "KC-2188",
    title: "Motion Designer",
    company: "Parcel",
    initials: "PA",
    mode: "On-site",
    location: "New York",
    rate: "$130–150k",
    posted: "5 d ago",
  },
];

const REMOTE_POLICY = [
  { id: "any", label: "Any policy", count: 124 },
  { id: "remote", label: "Remote", count: 71 },
  { id: "hybrid", label: "Hybrid", count: 38 },
  { id: "onsite", label: "On-site", count: 15 },
];

const LEVELS = [
  { id: "junior", label: "Junior", count: 18 },
  { id: "mid", label: "Mid-level", count: 54 },
  { id: "senior", label: "Senior", count: 39 },
  { id: "lead", label: "Lead & principal", count: 13 },
];

const SORTS = [
  { id: "recent", label: "Most recent" },
  { id: "rate", label: "Highest rate" },
  { id: "applicants", label: "Fewest applicants" },
];

const DIGEST = [
  {
    id: "daily",
    label: "Daily digest",
    hint: "One email each morning at 08:00.",
  },
  {
    id: "weekly",
    label: "Weekly roundup",
    hint: "Monday summary of the 10 best matches.",
  },
  {
    id: "instant",
    label: "Instant alerts",
    hint: "Realtime email the moment a role posts.",
  },
  {
    id: "sms",
    label: "SMS alerts — coming soon",
    hint: "Not available for your region yet.",
    disabled: true,
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* header */}
        <header className="flex h-14 flex-none items-center gap-3 border-b border-default-border px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <Sparkle className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Kern &amp; Co.</p>
              <p className="font-code text-[10px] text-muted-foreground">
                design roles · est. 2019
              </p>
            </div>
          </div>
          <div className="relative ml-auto w-56">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Role, company, skill…"
              className="h-8 pl-8 text-sm"
              aria-label="Search roles"
            />
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Saved roles">
            <Bell />
          </Button>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* filter rail — three single-select radio groups */}
          <aside className="flex w-64 flex-none flex-col gap-5 border-r border-default-border bg-card px-4 py-5">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              <SlidersHorizontal className="size-3.5" />
              Filters
            </p>

            <FieldSet className="gap-3 rounded-lg p-3.5">
              <FieldLegend variant="label">Remote policy</FieldLegend>
              <RadioGroup defaultValue="any" className="gap-2.5">
                {REMOTE_POLICY.map((policy) => (
                  <Field key={policy.id} orientation="horizontal">
                    <RadioGroupItem value={policy.id} id={`pol-${policy.id}`} />
                    <FieldLabel
                      htmlFor={`pol-${policy.id}`}
                      className="w-full justify-between font-normal"
                    >
                      <span className="text-sm">{policy.label}</span>
                      <span className="font-code text-[10px] text-muted-foreground">
                        {policy.count}
                      </span>
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>

            <FieldSet className="gap-3 rounded-lg p-3.5">
              <FieldLegend variant="label">Experience level</FieldLegend>
              <RadioGroup defaultValue="mid" className="gap-2.5">
                {LEVELS.map((level) => (
                  <Field key={level.id} orientation="horizontal">
                    <RadioGroupItem value={level.id} id={`lvl-${level.id}`} />
                    <FieldLabel
                      htmlFor={`lvl-${level.id}`}
                      className="w-full justify-between font-normal"
                    >
                      <span className="text-sm">{level.label}</span>
                      <span className="font-code text-[10px] text-muted-foreground">
                        {level.count}
                      </span>
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>

            <FieldSet className="gap-3 rounded-lg p-3.5">
              <FieldLegend variant="label">Sort by</FieldLegend>
              <RadioGroup defaultValue="recent" className="gap-2.5">
                {SORTS.map((sort) => (
                  <Field key={sort.id} orientation="horizontal">
                    <RadioGroupItem value={sort.id} id={`srt-${sort.id}`} />
                    <FieldLabel
                      htmlFor={`srt-${sort.id}`}
                      className="font-normal"
                    >
                      <span className="text-sm">{sort.label}</span>
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>

            <Separator />

            <Field orientation="horizontal" className="justify-between">
              <div className="grid gap-0.5">
                <FieldLabel htmlFor="hiring-now" className="font-normal">
                  Hiring now only
                </FieldLabel>
                <FieldDescription>
                  Teams with open interview slots.
                </FieldDescription>
              </div>
              <Switch id="hiring-now" defaultChecked aria-label="Hiring now only" />
            </Field>
          </aside>

          {/* listing column */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 px-5 py-5">
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Product design roles
              </h1>
              <p className="mt-0.5 font-code text-xs text-muted-foreground">
                124 open · 71 remote · updated 10 min ago
              </p>
            </div>

            <div className="grid gap-3">
              {JOBS.map((job) => (
                <article
                  key={job.id}
                  className="flex items-start gap-3 rounded-lg border border-default-border bg-card p-4"
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="font-code text-xs">
                      {job.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-medium">
                          {job.title}
                        </h2>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Building2 className="size-3" />
                          {job.company}
                          <span aria-hidden>·</span>
                          <MapPin className="size-3" />
                          {job.location}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Save ${job.title} at ${job.company}`}
                      >
                        <Bookmark />
                      </Button>
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline">{job.mode}</Badge>
                      {job.closingSoon ? (
                        <Badge
                          variant="outline"
                          className="border-warning-500/40 text-warning-500"
                        >
                          Closes Friday
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Actively hiring</Badge>
                      )}
                      <span className="ml-auto font-code text-xs tabular-nums text-muted-foreground">
                        {job.rate}
                      </span>
                    </div>
                    <p className="mt-2 font-code text-[10px] text-muted-foreground">
                      {job.id} · posted {job.posted} · 8 applicants
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* job alerts — fourth radio group with descriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading-3 text-heading-3">
                  Job alerts · “design systems” + 2 more
                </CardTitle>
                <CardDescription>
                  How should we send new matches for your saved searches?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="daily" className="gap-3">
                  {DIGEST.map((option) => (
                    <Field
                      key={option.id}
                      orientation="horizontal"
                      className="items-start"
                      data-disabled={option.disabled || undefined}
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={`dig-${option.id}`}
                        className="mt-0.5"
                        disabled={option.disabled}
                      />
                      <FieldContent className="gap-0.5">
                        <FieldLabel
                          htmlFor={`dig-${option.id}`}
                          className="font-normal"
                        >
                          {option.label}
                        </FieldLabel>
                        <FieldDescription>{option.hint}</FieldDescription>
                      </FieldContent>
                    </Field>
                  ))}
                </RadioGroup>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BriefcaseBusiness className="size-3.5" />
                    Last alert: 3 roles · 06:40 today
                  </span>
                  <Button size="sm">Save alerts</Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
