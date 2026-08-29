"use client";

/**
 * EVAL page — radio-group p1 — engineering team wiki — 1920x1080 light
 *
 * Desktop admin screen for "Helix Wiki", the internal engineering wiki of
 * Helix Systems. The screen is the space-settings console for the Platform
 * Engineering space, where every preference is a single-select choice —
 * four RadioGroups on one page: default page template (choice cards with
 * descriptions), new-page visibility (fieldset with legend), editor
 * preference (radios with helper descriptions) and a "sort by" filter list
 * in the sidebar.
 * Other ui/* components: Card, Badge, Button, Input, Table, Avatar,
 * Separator, Kbd.
 */
import {
  ArrowUpDown,
  Bell,
  BookOpen,
  ChevronRight,
  FileText,
  FlaskConical,
  History,
  Layers,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Users,
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
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NAV_SECTIONS = [
  {
    title: "Spaces",
    items: [
      { icon: Layers, label: "Platform", active: true },
      { icon: Server, label: "Infrastructure", active: false },
      { icon: Terminal, label: "SRE runbooks", active: false },
      { icon: FlaskConical, label: "Research", active: false },
    ],
  },
  {
    title: "Workspace",
    items: [
      { icon: Users, label: "Contributors", active: false },
      { icon: History, label: "Audit log", active: false },
      { icon: ShieldCheck, label: "Permissions", active: false },
    ],
  },
];

const TEMPLATES = [
  {
    id: "runbook",
    name: "Runbook",
    description: "Alert thresholds, escalation paths, rollback steps.",
    usedBy: "used 34× this month",
  },
  {
    id: "postmortem",
    name: "Postmortem",
    description: "Incident timeline, contributing factors, action items.",
    usedBy: "used 12× this month",
  },
  {
    id: "design-review",
    name: "Design review",
    description: "Context, options considered, open questions.",
    usedBy: "used 21× this month",
  },
];

const VISIBILITIES = [
  {
    id: "space",
    label: "Space — all 214 Helix employees",
    hint: "Anyone signed in can read, platform-eng can edit.",
  },
  {
    id: "team",
    label: "Team only — platform-eng (38 members)",
    hint: "Read and write restricted to the team group.",
  },
  {
    id: "restricted",
    label: "Restricted — invited editors",
    hint: "Hidden from search; access granted per page.",
  },
];

const EDITORS = [
  {
    id: "markdown",
    label: "Markdown-first",
    description: "Plain-text editor with live preview. ⌘⇧P toggles the pane.",
  },
  {
    id: "rich",
    label: "Rich text",
    description: "Toolbar editor with blocks, tables and diagrams.",
  },
  {
    id: "ask",
    label: "Ask each time",
    description: "Choose the editor when a new page is created.",
  },
];

const SORTS = [
  { id: "edited", label: "Recently edited" },
  { id: "created", label: "Recently created" },
  { id: "views", label: "Most viewed" },
  { id: "az", label: "Title A–Z" },
];

const STATS = [
  { label: "Pages", value: "486" },
  { label: "Contributors", value: "38" },
  { label: "Edits this week", value: "127" },
];

const RECENT = [
  {
    page: "Deprecating the v1 Metrics API",
    editor: "R.K.",
    editorName: "R. Kawaguchi",
    when: "12 min ago",
    status: "published" as const,
  },
  {
    page: "Postgres 16 migration runbook",
    editor: "M.O.",
    editorName: "M. Osei",
    when: "1 h ago",
    status: "review" as const,
  },
  {
    page: "Design review: service mesh sidecars",
    editor: "L.F.",
    editorName: "L. Ferreira",
    when: "3 h ago",
    status: "draft" as const,
  },
  {
    page: "Escalation rota · Q3",
    editor: "A.N.",
    editorName: "A. Novak",
    when: "Yesterday",
    status: "published" as const,
  },
  {
    page: "On-call handbook, week 24",
    editor: "J.S.",
    editorName: "J. Sørensen",
    when: "2 days ago",
    status: "published" as const,
  },
];

function StatusBadge({ status }: { status: "published" | "review" | "draft" }) {
  if (status === "review") {
    return (
      <Badge variant="outline" className="border-warning-500/40 text-warning-600">
        Needs review
      </Badge>
    );
  }
  if (status === "draft") {
    return <Badge variant="secondary">Draft</Badge>;
  }
  return <Badge variant="outline">Published</Badge>;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* ------------------------------------------------ sidebar */}
        <aside className="flex w-60 flex-none flex-col border-r border-default-border bg-card">
          <div className="flex h-14 flex-none items-center gap-2.5 border-b border-default-border px-4">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-background">
              <BookOpen className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Helix Wiki</p>
              <p className="font-code text-[10px] text-muted-foreground">
                wiki.helix.io
              </p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="mb-5">
                <p className="px-2 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  {section.title}
                </p>
                <div className="grid gap-0.5">
                  {section.items.map((item) => (
                    <span
                      key={item.label}
                      className={
                        item.active
                          ? "flex items-center gap-2.5 rounded-sm bg-accent px-2 py-1.5 text-sm font-medium text-accent-foreground"
                          : "flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground"
                      }
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <Separator className="mb-4" />

            {/* single-select sort filter — compact radio list */}
            <FieldSet className="gap-2.5 rounded-none border-0 p-0">
              <FieldLegend variant="label" className="px-2 pb-1">
                <span className="flex items-center gap-2">
                  <ArrowUpDown className="size-3.5" />
                  Sort pages by
                </span>
              </FieldLegend>
              <RadioGroup defaultValue="edited" className="gap-1.5">
                {SORTS.map((sort) => (
                  <Field key={sort.id} orientation="horizontal">
                    <RadioGroupItem value={sort.id} id={`sort-${sort.id}`} />
                    <FieldLabel
                      htmlFor={`sort-${sort.id}`}
                      className="font-normal"
                    >
                      <span className="text-sm text-foreground">
                        {sort.label}
                      </span>
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>

            <div className="mt-4 flex items-center gap-2 px-2 text-xs text-muted-foreground">
              Quick search
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </nav>

          <div className="flex flex-none items-center gap-2.5 border-t border-default-border px-4 py-3">
            <Avatar className="size-7">
              <AvatarFallback>DV</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-xs font-medium">D. Veldman</p>
              <p className="font-code text-[10px] text-muted-foreground">
                space admin
              </p>
            </div>
          </div>
        </aside>

        {/* ------------------------------------------------ main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* top bar */}
          <header className="flex h-14 flex-none items-center gap-4 border-b border-default-border bg-background px-6">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>Platform Engineering</span>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-foreground">Space settings</span>
            </div>
            <div className="relative ml-auto w-72">
              <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search 486 pages…"
                className="h-8 pl-8 text-sm"
                aria-label="Search pages"
              />
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <Bell />
            </Button>
            <Button size="sm">
              <FileText />
              New page
            </Button>
          </header>

          <main className="flex min-h-0 flex-1 gap-5 overflow-hidden p-5">
            {/* settings column */}
            <div className="flex min-w-0 max-w-[720px] flex-1 flex-col gap-5 overflow-y-auto">
              <div className="flex-none">
                <p className="font-code text-xs text-muted-foreground">
                  space / platform-engineering · general
                </p>
                <h1 className="mt-1 font-heading-1 text-heading-1 text-foreground">
                  Space settings
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Defaults applied to every page created in this space. Admins
                  can override per page.
                </p>
              </div>

              {/* choice cards — default template */}
              <Card className="gap-3 py-4">
                <CardHeader className="px-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Default page template
                  </CardTitle>
                  <CardDescription>
                    Pre-selected when a contributor hits “New page”.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4">
                  <RadioGroup defaultValue="runbook" className="gap-2.5">
                    {TEMPLATES.map((tpl) => (
                      <FieldLabel
                        key={tpl.id}
                        htmlFor={`tpl-${tpl.id}`}
                        className="block"
                      >
                        <div className="flex items-start gap-3 rounded-lg border border-default-border bg-background p-3 transition-colors has-[button[data-state=checked]]:border-foreground/40 has-[button[data-state=checked]]:bg-accent/60">
                          <RadioGroupItem
                            value={tpl.id}
                            id={`tpl-${tpl.id}`}
                            className="mt-0.5"
                          />
                          <FieldContent className="min-w-0 flex-1 gap-0.5">
                            <span className="flex w-full items-center justify-between gap-3">
                              <span className="text-sm leading-none font-medium">
                                {tpl.name}
                              </span>
                              <span className="font-code text-[11px] whitespace-nowrap text-muted-foreground">
                                {tpl.usedBy}
                              </span>
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {tpl.description}
                            </span>
                          </FieldContent>
                        </div>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* fieldset + legend — visibility */}
              <Card className="gap-3 py-4">
                <CardHeader className="px-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Visibility &amp; access
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <FieldSet className="gap-3.5 rounded-lg p-4">
                    <FieldLegend variant="label">
                      New page visibility
                    </FieldLegend>
                    <FieldDescription className="-mt-2">
                      Applies at creation; owners can tighten it later.
                    </FieldDescription>
                    <RadioGroup defaultValue="team" className="gap-2.5">
                      {VISIBILITIES.map((vis) => (
                        <Field
                          key={vis.id}
                          orientation="horizontal"
                          className="items-start"
                        >
                          <RadioGroupItem
                            value={vis.id}
                            id={`vis-${vis.id}`}
                            className="mt-0.5"
                          />
                          <FieldContent className="gap-0.5">
                            <FieldLabel
                              htmlFor={`vis-${vis.id}`}
                              className="font-normal"
                            >
                              {vis.label}
                            </FieldLabel>
                            <FieldDescription>{vis.hint}</FieldDescription>
                          </FieldContent>
                        </Field>
                      ))}
                    </RadioGroup>
                  </FieldSet>
                </CardContent>
              </Card>

              {/* radios with descriptions — editor preference */}
              <Card className="gap-3 py-4">
                <CardHeader className="px-4">
                  <CardTitle className="font-heading-3 text-heading-3">
                    Editor preference
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <RadioGroup defaultValue="markdown" className="gap-2.5">
                    {EDITORS.map((ed) => (
                      <Field
                        key={ed.id}
                        orientation="horizontal"
                        className="items-start"
                      >
                        <RadioGroupItem
                          value={ed.id}
                          id={`ed-${ed.id}`}
                          className="mt-0.5"
                        />
                        <FieldContent className="gap-0.5">
                          <FieldLabel
                            htmlFor={`ed-${ed.id}`}
                            className="font-normal"
                          >
                            {ed.label}
                          </FieldLabel>
                          <FieldDescription>{ed.description}</FieldDescription>
                        </FieldContent>
                      </Field>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* right rail */}
            <div className="hidden w-96 flex-none flex-col gap-5 lg:flex">
              {/* space stats — flat panels, border separation */}
              <div className="grid grid-cols-3 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-default-border bg-card p-3"
                  >
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 font-code text-xl tabular-nums">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* recently edited */}
              <div className="rounded-lg border border-default-border bg-card">
                <div className="flex items-center justify-between border-b border-default-border px-4 py-3">
                  <h2 className="font-heading-3 text-heading-3 leading-none text-foreground">
                    Recently edited
                  </h2>
                  <Button variant="ghost" size="xs">
                    View all
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-9 pl-4">Page</TableHead>
                      <TableHead className="h-9">Editor</TableHead>
                      <TableHead className="h-9 pr-4 text-right whitespace-nowrap">
                        When
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RECENT.map((row) => (
                      <TableRow key={row.page}>
                        <TableCell className="max-w-[220px] truncate py-2.5 pl-4">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium">
                              {row.page}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <span
                            className="flex items-center gap-1.5"
                            title={row.editorName}
                          >
                            <Avatar className="size-5">
                              <AvatarFallback className="text-[9px]">
                                {row.editor}
                              </AvatarFallback>
                            </Avatar>
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5 pr-4 text-right">
                          <span className="font-code text-[10px] text-muted-foreground">
                            {row.when}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* review queue */}
              <div className="rounded-lg border border-default-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading-3 text-heading-3 leading-none text-foreground">
                    Review queue
                  </h2>
                  <Badge variant="outline" className="border-warning-500/40 text-warning-600">
                    2 waiting
                  </Badge>
                </div>
                <div className="mt-3 grid gap-2.5">
                  {RECENT.filter((r) => r.status !== "published").map((r) => (
                    <div
                      key={r.page}
                      className="flex items-center gap-2.5 rounded-sm border border-default-border bg-background p-2.5"
                    >
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[10px]">
                          {r.editor}
                        </AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {r.page}
                        </span>
                        <span className="font-code text-[10px] text-muted-foreground">
                          {r.editorName} · {r.when}
                        </span>
                      </span>
                      <StatusBadge status={r.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* footer — in-flow, flat */}
          <footer className="flex h-12 flex-none items-center justify-between border-t border-default-border bg-background px-6">
            <span className="font-code text-[11px] text-muted-foreground">
              autosaved 14:32 · 3 pending changes
            </span>
            <span className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Discard
              </Button>
              <Button size="sm">Save changes</Button>
            </span>
          </footer>
        </div>
      </div>
    </EvalShell>
  );
}
