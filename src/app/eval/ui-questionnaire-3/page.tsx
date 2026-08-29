"use client"
// EVAL page — questionnaire p3 — freelance invoice console — 1280x800 light
// Questionnaire front and center: client onboarding intake that drives
// invoice defaults (entity, payment terms, reminder policy, PO reference).
// Co-stars: Card, Badge, Button, Avatar, Table, Progress, Separator.

import { FileText, Plus, ReceiptText } from "lucide-react"

import * as React from "react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  { name: "entity", required: true },
  { name: "terms", required: true },
  { name: "reminders", required: true },
  { name: "reference" },
] as const

const invoices = [
  {
    id: "INV-2041",
    client: "Meridian Studio",
    amount: "€4,800.00",
    due: "Nov 28",
    status: "Sent",
  },
  {
    id: "INV-2038",
    client: "Northwind Press",
    amount: "€1,250.00",
    due: "Nov 24",
    status: "Overdue",
  },
  {
    id: "INV-2035",
    client: "Atlas Freight",
    amount: "€9,320.00",
    due: "Dec 02",
    status: "Draft",
  },
  {
    id: "INV-2031",
    client: "Orbit Labs",
    amount: "€2,075.50",
    due: "Nov 30",
    status: "Paid",
  },
] as const

const steps = [
  { label: "Invoice entity", state: "done" },
  { label: "Payment terms", state: "current" },
  { label: "Reminder policy", state: "todo" },
  { label: "Billing reference", state: "todo" },
] as const

function statusBadge(status: string) {
  if (status === "Overdue") return <Badge variant="destructive">Overdue</Badge>
  if (status === "Paid") return <Badge variant="secondary">Paid</Badge>
  if (status === "Draft") return <Badge variant="outline">Draft</Badge>
  return <Badge>Sent</Badge>
}

function Page() {
  const [item, setItem] = React.useState<string>(
    "terms"
  )

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1216px] flex-col gap-5 px-6 py-5">
        {/* App header */}
        <header className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg border">
              <ReceiptText className="size-4 text-foreground" />
            </span>
            <span className="font-heading-3 text-heading-3 text-foreground">
              Ledgerline
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              invoice console
            </span>
          </div>
          <nav className="ms-6 flex items-center gap-1">
            <Button variant="ghost" size="sm">Invoices</Button>
            <Button variant="secondary" size="sm">Clients</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <span className="font-caption text-caption text-muted-foreground">
              Nadia Farouk · sole proprietor
            </span>
            <Avatar>
              <AvatarFallback>NF</AvatarFallback>
            </Avatar>
            <Button size="sm">
              <Plus />
              New invoice
            </Button>
          </div>
        </header>

        {/* Page title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Client intake — Meridian Studio Ltd
            </h1>
            <p className="mt-1 font-caption text-caption text-muted-foreground">
              Four questions set the defaults for every invoice you send this
              client.
            </p>
          </div>
          <span className="font-code text-xs text-muted-foreground">
            draft saved 16:42 · VAT BE 0844.618.203
          </span>
        </div>

        <div className="grid flex-1 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ---- Intake column ---- */}
          <Card className="gap-4 py-5">
            <Questionnaire
              items={items}
              item={item}
              onItemChange={setItem}
              shortcuts="numbers"
            >
              {/* Step 1 — answered before this view */}
              <QuestionnaireItem name="entity" required>
                <QuestionnaireTitle>
                  How should invoices be addressed?
                </QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="company" defaultChecked>
                    Meridian Studio Ltd — company account
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="person">
                    Ilse Verhoeven — named contact only
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="both">
                    Company, attention Ilse Verhoeven
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>

              {/* Step 2 — the active step */}
              <QuestionnaireItem name="terms" required>
                <CardHeader className="gap-1.5 px-5">
                  <QuestionnaireTitle className="font-heading-3">
                    Which payment terms are agreed?
                  </QuestionnaireTitle>
                  <QuestionnaireDescription>
                    Applies to all new invoices — late fees follow the EU late
                    payment directive after the due date.
                  </QuestionnaireDescription>
                  <CardAction>
                    <QuestionnaireProgress />
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="net-7">
                      <span>Net 7 — fast cycle</span>
                      <span className="font-caption text-caption text-muted-foreground">
                        For retainer sprints under €1,000
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="net-14" defaultChecked>
                      <span>Net 14 — standard</span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Recommended for design work
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="net-30">
                      <span>Net 30 — their finance policy</span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Requires a PO number on every invoice
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="net-45">
                      <span>Net 45 — enterprise arrangement</span>
                      <span className="font-caption text-caption text-muted-foreground">
                        Approved by procurement only
                      </span>
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </CardContent>
              </QuestionnaireItem>

              {/* Step 3 */}
              <QuestionnaireItem name="reminders" required>
                <QuestionnaireTitle>
                  Which reminders should Ledgerline send?
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                  Select every reminder you want automated. Reminders go to the
                  billing contact, never to your day-to-day chat.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="due-date">
                    Email on the due date
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="nudge-3">
                    Gentle nudge 3 days late
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="escalate-14">
                    Firm reminder 14 days late
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="statement">
                    Monthly statement copy
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>

              {/* Step 4 */}
              <QuestionnaireItem name="reference">
                <QuestionnaireTitle>Any billing reference to include?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Optional — cost centre, contract number, or PO pattern.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireInput
                    placeholder="e.g. COST-4412 · MS-contract-2024"
                    aria-label="Billing reference"
                  />
                </QuestionnaireChoices>
              </QuestionnaireItem>

              <div className="flex flex-col gap-3 px-5 pb-1">
                <Separator />
                <QuestionnaireActions>
                  <QuestionnairePrevious />
                  <QuestionnaireSkip />
                  {item === "reference" ? (
                    <QuestionnaireSubmit>Finish intake</QuestionnaireSubmit>
                  ) : (
                    <QuestionnaireNext>Next</QuestionnaireNext>
                  )}
                </QuestionnaireActions>
              </div>
            </Questionnaire>
          </Card>

          {/* ---- Side rail ---- */}
          <div className="flex flex-col gap-5">
            {/* Intake status */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Intake status</CardTitle>
                <CardDescription>Step 2 of 4 · 50% complete</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <Progress value={50} aria-label="Intake progress" />
                <div className="flex flex-col gap-1.5">
                  {steps.map((step) => (
                    <div
                      key={step.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-sm text-foreground">
                        {step.label}
                      </span>
                      {step.state === "done" ? (
                        <Badge variant="secondary">Answered</Badge>
                      ) : step.state === "current" ? (
                        <Badge>In progress</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outstanding invoices */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Outstanding invoices</CardTitle>
                <CardDescription>Last 30 days · all clients</CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-code text-xs">
                          {invoice.id}
                        </TableCell>
                        <TableCell className="font-code text-xs">
                          {invoice.amount}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {invoice.due}
                        </TableCell>
                        <TableCell>{statusBadge(invoice.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Collections health */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Collections health</CardTitle>
                <CardDescription>November · target 95%</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5 px-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Paid on time
                    </span>
                    <span className="font-code text-xs text-foreground">92%</span>
                  </div>
                  <Progress value={92} aria-label="Paid on time" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-muted-foreground">
                      Outstanding vs invoiced
                    </span>
                    <span className="font-code text-xs text-foreground">
                      €16.7k / €41.2k
                    </span>
                  </div>
                  <Progress value={41} aria-label="Outstanding ratio" />
                </div>
                <div className="flex items-center gap-2 border-t pt-3">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="font-caption text-caption text-muted-foreground">
                    Q4 VAT report due Dec 20 — 6 invoices pending
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Ledgerline — intake answers apply to invoices created after saving
          </span>
          <span className="font-code text-xs text-muted-foreground">
            client since Mar 2024 · 23 invoices
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
