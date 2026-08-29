"use client";

/**
 * EVAL page — dropdown-menu p2 — HR onboarding checklist for new hires —
 * 1280x800, light theme, ltr.
 *
 * People-ops onboarding tracker for a new backend hire. The "View options"
 * dropdown in the checklist toolbar renders OPEN at initial render
 * (defaultOpen) and stacks a radio group (status) and checkbox items (scope)
 * — the uniform filter-menu shape of the component, every item reserving the
 * same marker gutter. A closed row-action dropdown sits on the checklist
 * header. Other ui/* components: Tabs, Checkbox, Badge, Avatar, Progress,
 * Button, Card, Separator.
 */

import * as React from "react";
import {
  ArrowUpDownIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  UserRoundIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Item = {
  task: string;
  note: string;
  owner: string;
  initials: string;
  due: string;
  status: "done" | "active" | "todo" | "overdue";
};

const GROUPS: Array<{ name: string; items: Item[] }> = [
  {
    name: "Paperwork & compliance",
    items: [
      {
        task: "Sign offer letter & NDA",
        note: "DocuSign envelope 8F-2210",
        owner: "A. Iyer",
        initials: "AI",
        due: "Feb 12",
        status: "done",
      },
      {
        task: "I-9 employment verification",
        note: "in person, day 1 — bring ID",
        owner: "A. Iyer",
        initials: "AI",
        due: "Mar 03",
        status: "active",
      },
    ],
  },
  {
    name: "IT & access",
    items: [
      {
        task: "Provision Okta account",
        note: "SSO group: platform-eng",
        owner: "IT desk",
        initials: "IT",
        due: "Feb 24",
        status: "done",
      },
      {
        task: "GitHub + AWS access",
        note: "least-privilege review pending",
        owner: "IT desk",
        initials: "IT",
        due: "Mar 03",
        status: "active",
      },
      {
        task: "VPN profile & 2FA keys",
        note: "hardware key shipped to home address",
        owner: "D. Osei",
        initials: "DO",
        due: "Feb 27",
        status: "overdue",
      },
    ],
  },
  {
    name: "Workspace & day one",
    items: [
      {
        task: "Assign desk — 4F pod B",
        note: "sit-stand, near platform team",
        owner: "Facilities",
        initials: "FA",
        due: "Feb 25",
        status: "done",
      },
      {
        task: "Badge & parking pass",
        note: "photo submitted Feb 21",
        owner: "Facilities",
        initials: "FA",
        due: "Mar 03",
        status: "todo",
      },
      {
        task: "Orientation @ 09:30",
        note: "followed by team lunch 12:00",
        owner: "People Ops",
        initials: "PO",
        due: "Mar 03",
        status: "todo",
      },
    ],
  },
];

const STATUS_BADGE: Record<Item["status"], { label: string; className: string }> =
  {
    done: { label: "Complete", className: "" },
    active: { label: "In progress", className: "" },
    todo: { label: "Not started", className: "" },
    overdue: { label: "Overdue", className: "" },
  };

export default function Page() {
  const [status, setStatus] = React.useState("active");
  const [onlyMine, setOnlyMine] = React.useState(false);
  const [hideDone, setHideDone] = React.useState(false);
  const [groupBySection, setGroupBySection] = React.useState(true);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* app bar with primary tabs */}
        <header className="flex h-14 flex-none items-center justify-between gap-4 border-b border-default-border px-5">
          <div className="flex items-center gap-4">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <UserRoundIcon className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Northwind People
            </span>
            <Separator orientation="vertical" className="!h-5" />
            <Tabs defaultValue="onboarding">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
                <TabsTrigger value="directory">Directory</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Export checklist
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">AI</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex flex-1 gap-5 p-4">
          {/* checklist column */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  New-hire onboarding
                </h1>
                <p className="mt-0.5 font-code text-xs text-muted-foreground">
                  Daniel Osei · backend engineer · start date Mar 03 · 9 days out
                </p>
              </div>
              <div className="flex flex-none items-center gap-2">
                {/* open filter menu — uniform radio + checkbox marker items */}
                <DropdownMenu defaultOpen modal={false}>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline" size="sm">
                        <SlidersHorizontalIcon />
                        View options
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter &amp; view</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuRadioGroup
                        value={status}
                        onValueChange={setStatus}
                      >
                        <DropdownMenuLabel className="font-normal text-muted-foreground">
                          Status
                        </DropdownMenuLabel>
                        <DropdownMenuRadioItem value="all">
                          All tasks
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="active">
                          In progress
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="todo">
                          Not started
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="overdue">
                          Overdue
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal text-muted-foreground">
                        Scope
                      </DropdownMenuLabel>
                      <DropdownMenuCheckboxItem
                        checked={hideDone}
                        onCheckedChange={setHideDone}
                      >
                        Hide completed
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={onlyMine}
                        onCheckedChange={setOnlyMine}
                      >
                        Only my tasks
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={groupBySection}
                        onCheckedChange={setGroupBySection}
                      >
                        Group by section
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <ArrowUpDownIcon />
                  Sort
                </Button>
                <Button size="sm">
                  <PlusIcon />
                  Add task
                </Button>
              </div>
            </div>

            {/* checklist groups */}
            <div className="flex flex-col gap-3">
              {GROUPS.map((group) => (
                <section
                  key={group.name}
                  className="rounded-lg border border-default-border bg-card"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-default-border px-4 py-1.5">
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading-3 text-heading-3">
                        {group.name}
                      </h2>
                      <Badge variant="outline" className="font-code text-[10px]">
                        {group.items.filter((i) => i.status === "done").length}/
                        {group.items.length}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Section actions for ${group.name}`}
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>Rename section</DropdownMenuItem>
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete section
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <ul>
                    {group.items.map((item) => (
                      <li
                        key={item.task}
                        className="flex items-center gap-3 border-b border-default-border px-4 py-1.5 last:border-b-0"
                      >
                        <Checkbox
                          defaultChecked={item.status === "done"}
                          aria-label={item.task}
                          className="flex-none"
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm leading-snug ${
                              item.status === "done"
                                ? "text-muted-foreground"
                                : "font-medium"
                            }`}
                          >
                            {item.task}
                          </p>
                          <p className="truncate font-code text-[10px] leading-[14px] text-muted-foreground">
                            {item.note}
                          </p>
                        </div>
                        <div className="flex flex-none items-center gap-1.5 text-xs text-muted-foreground">
                          <Avatar className="size-5">
                            <AvatarFallback className="text-[9px]">
                              {item.initials}
                            </AvatarFallback>
                          </Avatar>
                          {item.owner}
                        </div>
                        <span className="w-12 flex-none text-right font-code text-[11px] tabular-nums text-muted-foreground">
                          {item.due}
                        </span>
                        {item.status === "overdue" ? (
                          <Badge variant="destructive" className="flex-none">
                            {STATUS_BADGE[item.status].label}
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="flex-none font-normal"
                          >
                            {STATUS_BADGE[item.status].label}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <footer className="mt-auto font-code text-[10px] text-muted-foreground">
              template: engineer-onboarding-v3 · owner: people-ops · 11 tasks · 3
              complete
            </footer>
          </div>

          {/* right rail — new hire profile + readiness */}
          <aside className="flex w-80 flex-none flex-col gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">New hire</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback className="text-sm">DO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">Daniel Osei</p>
                    <p className="text-xs text-muted-foreground">
                      Backend engineer · Platform
                    </p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-default-border pt-3 text-xs">
                  {[
                    ["Manager", "Sofia Lindqvist"],
                    ["Buddy", "Marc Tran"],
                    ["Level", "L4 · senior"],
                    ["Location", "Columbus, OH"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Readiness</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">
                      Overall
                    </span>
                    <span className="font-code text-xs tabular-nums">27%</span>
                  </div>
                  <Progress value={27} className="mt-1.5 h-1.5" />
                </div>
                {GROUPS.map((group) => {
                  const done = group.items.filter(
                    (i) => i.status === "done"
                  ).length;
                  return (
                    <div key={group.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">
                          {group.name}
                        </span>
                        <span className="font-code text-[10px] tabular-nums text-muted-foreground">
                          {done}/{group.items.length}
                        </span>
                      </div>
                      <Progress
                        value={(done / group.items.length) * 100}
                        className="mt-1 h-1"
                      />
                    </div>
                  );
                })}
                <p className="border-t border-default-border pt-3 font-code text-[10px] text-muted-foreground">
                  1 overdue item — VPN &amp; 2FA keys
                </p>
              </CardContent>
            </Card>
          </aside>
        </main>
      </div>
    </EvalShell>
  );
}
