"use client"
// EVAL page — filter-bar p1 — email client inbox zero — 390x844 light

import * as React from "react"
import { ArchiveIcon, PaperclipIcon } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  FilterBar,
  FilterBarSummary,
  FilterRuleEditor,
  SortBar,
  type FilterField,
  type FilterRule,
  type SortRule,
} from "@/components/ui/filter-bar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const mailFields: FilterField[] = [
  {
    value: "from",
    label: "From",
    type: "string",
    placeholder: "name or email",
  },
  {
    value: "status",
    label: "Status",
    type: "enum",
    options: [
      { label: "Unread", value: "unread" },
      { label: "Read", value: "read" },
    ],
  },
  {
    value: "attachment",
    label: "Has attachment",
    type: "enum",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  { value: "date", label: "Date", type: "date" },
]

const sortFields = [
  { value: "date", label: "date" },
  { value: "sender", label: "sender" },
  { value: "subject", label: "subject" },
]

type Message = {
  id: string
  name: string
  email: string
  subject: string
  preview: string
  date: string // ISO yyyy-mm-dd — compares lexicographically
  time: string
  status: "unread" | "read"
  hasAttachment: boolean
}

const messages: Message[] = [
  {
    id: "m1",
    name: "GitHub",
    email: "notifications@github.com",
    subject: "[praxis-ui] Pull request review requested: #412",
    preview: "mara-chen requested your review on “feat(ui): filter-bar query builder”.",
    date: "2026-08-29",
    time: "08:36",
    status: "unread",
    hasAttachment: false,
  },
  {
    id: "m2",
    name: "Marisol Vega",
    email: "marisol@bastionfreight.com",
    subject: "BOL paperwork for the Rotterdam run",
    preview: "Signed bill of lading is attached — customs needs the counter-copy by Friday.",
    date: "2026-08-29",
    time: "08:12",
    status: "unread",
    hasAttachment: true,
  },
  {
    id: "m3",
    name: "Linear",
    email: "team@linear.app",
    subject: "SEC-148 “Filter presets” assigned to you",
    preview: "Priority bumped to high. Sprint 41 ends Thursday — see the updated scope.",
    date: "2026-08-29",
    time: "07:58",
    status: "unread",
    hasAttachment: false,
  },
  {
    id: "m4",
    name: "Jules Okafor",
    email: "jules@copperline.studio",
    subject: "Final brand assets — logo pack attached",
    preview: "Everything is in the zip: SVGs, the mono wordmark, and print-ready PDFs.",
    date: "2026-08-29",
    time: "07:41",
    status: "unread",
    hasAttachment: true,
  },
  {
    id: "m5",
    name: "Stripe",
    email: "receipts@stripe.com",
    subject: "Your receipt from Meridian Legal LLP",
    preview: "Payment of $1,240.00 processed on Aug 29. This is a transaction receipt.",
    date: "2026-08-28",
    time: "Aug 28",
    status: "read",
    hasAttachment: false,
  },
  {
    id: "m6",
    name: "Priya Raman",
    email: "priya@northwindcoffee.com",
    subject: "Contract redline + exhibits",
    preview: "Legal marked up clause 4.2 — exhibits A–C are attached for your pass.",
    date: "2026-08-28",
    time: "Aug 28",
    status: "unread",
    hasAttachment: true,
  },
  {
    id: "m7",
    name: "GitHub",
    email: "notifications@github.com",
    subject: "[praxis-ui] CI failed on main",
    preview: "3 checks failed — vitest “filter-bar” suite. First failure at 21:04.",
    date: "2026-08-28",
    time: "Aug 28",
    status: "unread",
    hasAttachment: false,
  },
  {
    id: "m8",
    name: "Dana Whitfield",
    email: "dana@figtreedesign.co",
    subject: "Re: Invoice August — signed",
    preview: "Countersigned and returned. Net-15 as agreed, thank you for the quick turn.",
    date: "2026-08-27",
    time: "Aug 27",
    status: "read",
    hasAttachment: false,
  },
  {
    id: "m9",
    name: "Tomás Ferreira",
    email: "tomas@atlasfoundry.io",
    subject: "Q3 spend table (updated)",
    preview: "Attached the refreshed forecast — foundry ops came in 6% under plan.",
    date: "2026-08-27",
    time: "Aug 27",
    status: "unread",
    hasAttachment: true,
  },
  {
    id: "m10",
    name: "Calendly",
    email: "noreply@calendly.com",
    subject: "Reminder: 1:1 with Mara Chen",
    preview: "Tomorrow at 09:30 · 30 min. Agenda is still empty — add talking points.",
    date: "2026-08-26",
    time: "Aug 26",
    status: "read",
    hasAttachment: false,
  },
]

const initialRules: FilterRule[] = [
  { id: "rule-status", field: "status", operator: "is", value: "unread" },
  { id: "rule-attachment", field: "attachment", operator: "is", value: "yes" },
  {
    id: "rule-from",
    field: "from",
    operator: "isNot",
    value: "notifications@github.com",
  },
]

// ---------------------------------------------------------------------------
// Query engine
// ---------------------------------------------------------------------------

function matchesRule(message: Message, rule: FilterRule): boolean {
  const value = (rule.value ?? "").toLowerCase()
  switch (rule.field) {
    case "from": {
      const from = `${message.name} ${message.email}`.toLowerCase()
      if (rule.operator === "is") return message.email.toLowerCase() === value
      if (rule.operator === "isNot") return message.email.toLowerCase() !== value
      if (rule.operator === "contains") return from.includes(value)
      if (rule.operator === "notContains") return !from.includes(value)
      return true
    }
    case "status":
      return rule.operator === "isNot"
        ? message.status !== value
        : message.status === value
    case "attachment": {
      const actual = message.hasAttachment ? "yes" : "no"
      return rule.operator === "isNot" ? actual !== value : actual === value
    }
    case "date": {
      if (rule.operator === "is") return message.date === value
      if (rule.operator === "isNot") return message.date !== value
      if (rule.operator === "after") return message.date > value
      if (rule.operator === "before") return message.date < value
      return true
    }
    default:
      return true
  }
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  const [rules, setRules] = React.useState<FilterRule[]>(initialRules)
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<SortRule>({
    field: "date",
    direction: "desc",
  })
  // Rule editor lives in a scrimmed bottom sheet on the phone viewport —
  // open at initial render so the query builder is captured.
  const [editorOpen, setEditorOpen] = React.useState(true)

  const rows = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    const factor = sort.direction === "asc" ? 1 : -1
    return messages
      .filter((message) => {
        if (
          term &&
          !`${message.name} ${message.email} ${message.subject} ${message.preview}`
            .toLowerCase()
            .includes(term)
        ) {
          return false
        }
        return rules.every((rule) => matchesRule(message, rule))
      })
      .sort((a, b) => {
        if (sort.field === "sender") return a.name.localeCompare(b.name) * factor
        if (sort.field === "subject")
          return a.subject.localeCompare(b.subject) * factor
        return a.date.localeCompare(b.date) * factor
      })
  }, [rules, search, sort])

  const unreadTotal = messages.filter((m) => m.status === "unread").length
  const activeSortField = sortFields.find((f) => f.value === sort.field)

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        {/* App bar */}
        <header className="flex h-14 flex-none items-center justify-between border-b px-4">
          <div className="flex items-center gap-2.5">
            <Avatar aria-label="Mara Chen">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-heading-3 text-heading-3">Inbox</h1>
              <p className="mt-0.5 font-code text-[11px] text-muted-foreground">
                MARA CHEN · INBOX ZERO
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-code text-[11px]">
              {unreadTotal} UNREAD
            </Badge>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Run archive sweep"
            >
              <ArchiveIcon />
            </Button>
          </div>
        </header>

        {/* Query zone */}
        <div className="flex flex-none flex-col gap-2.5 px-4 pt-3">
          <FilterBar
            aria-label="Filter inbox"
            fields={mailFields}
            rules={rules}
            onRulesChange={setRules}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search mail…"
            searchLabel="Search mail"
            onAddClick={() => setEditorOpen(true)}
          />

          <SortBar
            fields={sortFields}
            value={sort}
            onChange={setSort}
            label="Sort"
          />

          <FilterBarSummary
            filterCount={rules.length}
            resultCount={rows.length}
            resultNoun="message"
            sort={
              activeSortField
                ? { label: activeSortField.label, direction: sort.direction }
                : null
            }
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading-3 text-sm font-semibold">
                Weekly zero goal
              </h2>
              <p className="font-code text-[11px] text-muted-foreground">
                126/170
              </p>
            </div>
            <Progress
              value={74}
              className="h-1.5"
              aria-label="Weekly inbox zero progress"
            />
          </div>
        </div>

        {/* Message list */}
        <main className="flex min-h-0 flex-1 flex-col pt-3">
          {rows.length > 0 ? (
            <ul className="mx-4 divide-y overflow-hidden rounded-lg border bg-card">
              {rows.map((message) => (
                <li
                  key={message.id}
                  className="flex items-start gap-3 px-3 py-2.5"
                >
                  <Avatar className="mt-0.5" aria-hidden="true">
                    <AvatarFallback>{initials(message.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p
                        className={cn(
                          "truncate text-sm",
                          message.status === "unread"
                            ? "font-semibold"
                            : "font-medium text-foreground"
                        )}
                      >
                        {message.name}
                      </p>
                      <span className="font-code text-[11px] whitespace-nowrap text-muted-foreground">
                        {message.time}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "truncate text-sm",
                        message.status === "unread"
                          ? "font-medium"
                          : "text-foreground"
                      )}
                    >
                      {message.subject}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {message.preview}
                    </p>
                  </div>
                  {message.hasAttachment ? (
                    <PaperclipIcon
                      aria-label="Has attachment"
                      className="mt-1 size-3.5 shrink-0 text-muted-foreground"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-4 rounded-lg border bg-card px-3 py-6 text-center text-sm text-muted-foreground">
              No messages match the current filters.
            </p>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-3 flex h-11 flex-none items-center justify-between border-t px-4">
          <p className="font-code text-[11px] text-muted-foreground">
            170 MESSAGES · SYNCED 08:41
          </p>
          <Button variant="ghost" size="sm" className="text-neutral-600">
            Archive {rows.length}
          </Button>
        </footer>

        {/* Filter rule editor — scrimmed bottom sheet (phone pattern) */}
        <Drawer open={editorOpen} onOpenChange={setEditorOpen}>
          {/* The vaul drag handle ships bg-muted (~1.1:1 on the sheet) from
              the shared drawer.tsx — restyled here at page level to
              neutral-500 (~3.5:1) so the affordance clears WCAG 1.4.11. */}
          <DrawerContent className="[&>div:first-child]:bg-neutral-500">
            <DrawerHeader className="pb-2 text-left">
              <DrawerTitle className="font-heading-3 text-base">
                Add filter
              </DrawerTitle>
              <DrawerDescription>
                Rules combine with AND — the inbox narrows as you go.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <FilterRuleEditor
                aria-label="New filter rule"
                fields={mailFields}
                defaultValue={{
                  field: "date",
                  operator: "after",
                  value: "2026-08-26",
                }}
                onApply={(rule) => {
                  setRules((prev) => [...prev, rule])
                  setEditorOpen(false)
                }}
                onCancel={() => setEditorOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </EvalShell>
  )
}
