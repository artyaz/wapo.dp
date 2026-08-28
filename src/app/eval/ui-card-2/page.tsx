"use client"

// EVAL page — card p2 — HR onboarding checklist for new hires — 834x1112 dark
// Card family (progress / checklist / table / team compositions) + Badge,
// Button, Checkbox, Progress, Avatar, Table. Flat panels + hairlines only.

import { Bell, Check, Download, KeyRound, Laptop, MessageSquare } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const paperwork = [
  { label: "Signed offer letter", due: "Jun 2", done: true },
  { label: "Direct deposit form", due: "Jun 2", done: true },
  { label: "Emergency contacts", due: "Jun 6", done: false },
]

const access = [
  { label: "SSO + 2FA enrollment", due: "Jun 3", done: true, note: "Okta" },
  { label: "MacBook Pro 16\" ordered", due: "Jun 4", done: true, note: "Shipped · arrives Jun 3" },
  { label: "Figma seat", due: "Jun 5", done: false, note: "Waiting on IT" },
]

const documents = [
  { name: "Employee handbook", owner: "People Ops", due: "Jun 6", status: "Signed" },
  { name: "I-9 eligibility form", owner: "HR", due: "Jun 6", status: "Waiting" },
  { name: "IP assignment agreement", owner: "Legal", due: "Jun 9", status: "Waiting" },
]

function statusBadge(status: string) {
  if (status === "Signed")
    return (
      <Badge variant="outline">
        <Check />
        Completed
      </Badge>
    )
  return <Badge variant="outline">In review</Badge>
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[780px] flex-col gap-4 px-6 py-5">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>DO</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-caption text-caption text-muted-foreground">
                Onboarding · Design Engineering · starts Mon, Jun 2
              </p>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Daniel Okafor — New Hire Checklist
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download />
              Export plan
            </Button>
            <Button size="sm">
              <MessageSquare />
              Message HR
            </Button>
          </div>
        </header>

        {/* Progress overview card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">First two weeks · day 3 of 14</CardTitle>
            <CardDescription>
              Buddy intro Mon 10:00 · team lunch Tue 12:30 · design review Thu 15:00
            </CardDescription>
            <CardAction>
              <Badge variant="secondary">On track</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Progress value={62} className="flex-1" aria-label="Onboarding progress" />
              <span className="font-code text-sm text-foreground">62%</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border px-4 py-2.5">
                <p className="font-code text-xl text-foreground">13</p>
                <p className="font-caption text-caption text-muted-foreground">
                  tasks completed
                </p>
              </div>
              <div className="rounded-lg border px-4 py-2.5">
                <p className="font-code text-xl text-foreground">6</p>
                <p className="font-caption text-caption text-muted-foreground">
                  in review or pending
                </p>
              </div>
              <div className="rounded-lg border px-4 py-2.5">
                <p className="font-code text-xl text-destructive">2</p>
                <p className="font-caption text-caption text-muted-foreground">
                  overdue · need action
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="gap-3 py-5">
            <CardHeader>
              <CardTitle className="text-sm">1 · Paperwork</CardTitle>
              <CardDescription>Due before first team standup</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {paperwork.map((item) => (
                <label key={item.label} className="flex cursor-pointer items-center gap-3">
                  <Checkbox defaultChecked={item.done} aria-label={item.label} />
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="font-code text-xs text-muted-foreground">{item.due}</span>
                </label>
              ))}
            </CardContent>
            <CardFooter className="justify-between">
              <span className="font-caption text-caption text-muted-foreground">
                2 of 3 complete
              </span>
              <Button variant="ghost" size="xs">
                <Bell />
                Remind me
              </Button>
            </CardFooter>
          </Card>

          <Card className="gap-3 py-5">
            <CardHeader>
              <CardTitle className="text-sm">2 · IT &amp; access</CardTitle>
              <CardDescription>Provisioned by the IT service desk</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {access.map((item) => (
                <label key={item.label} className="flex cursor-pointer items-center gap-3">
                  <Checkbox defaultChecked={item.done} aria-label={item.label} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5">
                      <Laptop className="size-3 shrink-0 text-muted-foreground" />
                      <span className="truncate font-caption text-caption text-muted-foreground">
                        {item.note}
                      </span>
                    </span>
                  </span>
                  <span className="font-code text-xs text-muted-foreground">{item.due}</span>
                </label>
              ))}
            </CardContent>
            <CardFooter className="justify-between">
              <span className="font-caption text-caption text-muted-foreground">
                2 of 3 complete
              </span>
              <Button variant="ghost" size="xs">
                <KeyRound />
                Request access
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Documents table card — edge-to-edge rows */}
        <Card className="py-5">
          <CardHeader>
            <CardTitle className="text-sm">3 · Documents to sign</CardTitle>
            <CardDescription>E-signature tracked in the People portal</CardDescription>
            <CardAction>
              <Badge variant="outline">2 awaiting signature</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Document</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.name}>
                    <TableCell className="pl-6 font-medium">{doc.name}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.owner}</TableCell>
                    <TableCell className="font-code text-xs text-muted-foreground">
                      {doc.due}
                    </TableCell>
                    <TableCell className="pr-6 text-right">{statusBadge(doc.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between border-t">
            <span className="font-caption text-caption text-muted-foreground">
              Auto-reminders sent every 48h until signed
            </span>
            <Button variant="outline" size="xs">
              Open portal
            </Button>
          </CardFooter>
        </Card>

        {/* Team card — buddy introduction */}
        <Card className="gap-3 py-4">
          <CardContent className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                Maya Reyes · onboarding buddy
              </p>
              <p className="truncate font-caption text-caption text-muted-foreground">
                Senior Product Designer · daily 11:00–12:00 · intro call scheduled Mon 10:00
              </p>
            </div>
            <Button variant="outline" size="sm">
              <MessageSquare />
              Say hello
            </Button>
          </CardContent>
        </Card>

        <footer className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Updated today, 09:14 by Priya Nayar (People Ops)
          </span>
          <span className="font-code text-xs text-muted-foreground">
            plan v3 · rev 2025-05-30
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
