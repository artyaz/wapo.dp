"use client"

// EVAL page — typography p3 — retail banking transaction history — 1920x1080 dark
// Three type roles on a dense dark register: Inter UI chrome, Source Serif
// statement prose (Typography variant="reading" in dark), IBM Plex Mono for
// money, dates and references (typeset table with per-cell font-code +
// tabular numerals). Plus Card, Badge, Button, Tabs, Alert, Avatar.

import {
  ArrowUpRight,
  Download,
  Landmark,
  Search,
  ShieldAlert,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Typography } from "@/components/ui/typography"

const transactions = [
  { date: "08-29", desc: "Whole Foods Market #2541", ref: "POS-88213", cat: "Groceries", amount: "−142.87", balance: "24,836.12" },
  { date: "08-28", desc: "Payroll · Lumen Health Systems", ref: "DEP-88102", cat: "Income", amount: "+4,286.00", balance: "24,978.99" },
  { date: "08-27", desc: "Shell Station 4472", ref: "POS-87940", cat: "Transport", amount: "−64.30", balance: "20,692.99" },
  { date: "08-26", desc: "Transfer to Savings ••9902", ref: "TRF-87811", cat: "Transfer", amount: "−500.00", balance: "20,757.29" },
  { date: "08-25", desc: "Meridian Mortgage 2208", ref: "ACH-87655", cat: "Housing", amount: "−2,148.22", balance: "21,257.29" },
  { date: "08-24", desc: "Overdraft protection fee", ref: "FEE-87601", cat: "Fees", amount: "−35.00", balance: "23,405.51" },
  { date: "08-22", desc: "City Power & Light", ref: "ACH-87402", cat: "Utilities", amount: "−118.44", balance: "23,440.51" },
  { date: "08-20", desc: "Amazon Marketplaces", ref: "POS-87190", cat: "Shopping", amount: "−37.15", balance: "23,558.95" },
  { date: "08-18", desc: "Rosa's Cafe — card 4", ref: "POS-86933", cat: "Dining", amount: "−28.60", balance: "23,596.10" },
  { date: "08-15", desc: "Cascade Dental Group", ref: "ACH-86887", cat: "Health", amount: "−186.00", balance: "23,624.70" },
]

const spending = [
  { cat: "Housing", amount: "2,266.66", share: 63 },
  { cat: "Groceries", amount: "742.18", share: 21 },
  { cat: "Transport", amount: "318.44", share: 9 },
  { cat: "Dining", amount: "264.80", share: 7 },
]

const upcoming = [
  { name: "Renters insurance · autopay", when: "Sep 01", amount: "84.50" },
  { name: "Card payment ••4417", when: "Sep 03", amount: "450.00" },
  { name: "Northside Gym", when: "Sep 05", amount: "39.00" },
]

const documents = [
  { name: "Statement — July 2026", meta: "PDF · 214 KB" },
  { name: "Rate hold letter", meta: "PDF · 86 KB" },
  { name: "Tax summary 2025", meta: "PDF · 1.1 MB" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full flex-col">
        {/* ── App header — Inter interface role ─────────────────────── */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-8">
          <div className="flex items-center gap-2.5">
            <Landmark className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold tracking-tight">
              Meridian Private
            </span>
            <span className="font-caption text-caption text-muted-foreground">
              Personal banking
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-8 w-64 items-center gap-2 rounded-md border px-2.5 text-muted-foreground">
              <Search className="size-3.5" />
              <span className="text-sm">Search transactions…</span>
            </div>
            <Button variant="outline" size="sm">
              <Download />
              Export CSV
            </Button>
            <Button size="sm">
              <ArrowUpRight />
              Pay &amp; transfer
            </Button>
            <div className="ml-2 flex items-center gap-2.5 border-l pl-4">
              <Avatar className="size-8">
                <AvatarFallback className="text-[11px]">JE</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col leading-tight xl:flex">
                <span className="text-sm font-medium">Jordan Ellison</span>
                <span className="font-caption text-caption text-muted-foreground">
                  Everyday Checking ••4821
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-[1560px] flex-1 grid-cols-[320px_minmax(0,1fr)_380px] gap-6 px-8 py-6">
          {/* ── Accounts — mono figures ───────────────────────────────── */}
          <aside className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3 pt-5">
                <div className="flex items-center justify-between">
                  <p className="font-caption text-caption text-muted-foreground">
                    Everyday Checking ••4821
                  </p>
                  <Badge variant="secondary">Open</Badge>
                </div>
                <p className="font-code text-4xl leading-none tabular-nums">
                  24,836.12
                </p>
                <p className="font-caption text-caption text-muted-foreground">
                  USD · as of Aug 29, 18:42 ET
                </p>
                <dl className="mt-1 flex flex-col gap-2 border-t pt-3">
                  {[
                    ["Available balance", "24,689.47"],
                    ["Pending holds", "−146.65"],
                    ["Posted this month", "−3,760.55"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="font-code text-sm tabular-nums">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Spending — August</CardTitle>
                <CardDescription>By category · month to date</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {spending.map((s) => (
                  <div key={s.cat} className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm">{s.cat}</span>
                      <span className="font-code text-xs tabular-nums text-muted-foreground">
                        {s.amount}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-800">
                      <div
                        className="h-full rounded-full bg-neutral-400"
                        style={{ width: `${s.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upcoming</CardTitle>
                <CardDescription>3 payments scheduled</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                {upcoming.map((u, i) => (
                  <div key={u.name} className={i > 0 ? "mt-3 border-t pt-3" : ""}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm">{u.name}</p>
                      <p className="shrink-0 font-code text-sm tabular-nums">
                        {u.amount}
                      </p>
                    </div>
                    <p className="mt-0.5 font-code text-xs text-muted-foreground">
                      {u.when} · USD
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* ── Register — typeset table, mono numerals ───────────────── */}
          <main className="flex min-w-0 flex-col gap-4">
            <Tabs defaultValue="aug" className="gap-4">
              <TabsList>
                <TabsTrigger value="aug">August 2026</TabsTrigger>
                <TabsTrigger value="jul">July 2026</TabsTrigger>
                <TabsTrigger value="jun">June 2026</TabsTrigger>
              </TabsList>

              <TabsContent value="aug" className="mt-0 flex flex-col gap-4">
                <Alert variant="destructive">
                  <ShieldAlert />
                  <AlertTitle>Fee review in progress</AlertTitle>
                  <AlertDescription className="text-destructive">
                    The overdraft protection fee of 35.00 charged Aug 24 is under
                    review — decision expected within 2 business days.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Transaction history — August 2026
                    </CardTitle>
                    <CardDescription>
                      31 posted items · register view · newest first
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="docs">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Reference</th>
                            <th scope="col">Category</th>
                            <th scope="col" className="text-right">
                              Amount
                            </th>
                            <th scope="col" className="text-right">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((t) => (
                            <tr key={t.ref}>
                              <td className="font-code">{t.date}</td>
                              <td>{t.desc}</td>
                              <td className="font-code text-muted-foreground">
                                {t.ref}
                              </td>
                              <td className="text-muted-foreground">{t.cat}</td>
                              <td className="text-right font-code tabular-nums">
                                {t.amount}
                              </td>
                              <td className="text-right font-code tabular-nums text-muted-foreground">
                                {t.balance}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <caption className="font-caption text-caption">
                          All amounts in USD · balances shown after each posting ·
                          18 items filtered out
                        </caption>
                      </table>
                    </Typography>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jul" className="mt-0">
                <p className="text-sm text-muted-foreground">
                  34 posted items in July — open the register to view.
                </p>
              </TabsContent>

              <TabsContent value="jun" className="mt-0">
                <p className="text-sm text-muted-foreground">
                  29 posted items in June — open the register to view.
                </p>
              </TabsContent>
            </Tabs>
          </main>

          {/* ── Insights — Source Serif prose + documents ─────────────── */}
          <aside className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Statement summary</CardTitle>
                <CardDescription>August · written by Meridian</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography
                  variant="reading"
                  className="[--typeset-size:15px] [--typeset-leading:1.8] [--typeset-flow:1.35em]"
                >
                  <p>
                    Spending is tracking six percent below your twelve-month
                    average. The mortgage posted on the 25th, and the transfer to
                    savings lifted the month&apos;s saving rate to eleven percent
                    — the strongest since March.
                  </p>
                  <p>
                    Two card refunds are still pending and should settle by
                    September 2. Dining and transport are the only categories
                    running above your usual pattern this month.
                  </p>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Message from your advisor</CardTitle>
                <CardDescription>Rachel Tran · Aug 29, 09:14</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography
                  variant="chat"
                  className="[--typeset-font-body:var(--ds-font-prose)] [--typeset-size:15px]"
                >
                  <p>
                    Morning Jordan — the loft refinance rate hold{" "}
                    <code>RF-2026-114</code> expires Sep 12. I can extend it
                    once, so let me know before Friday if you want to lock.
                  </p>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Documents</CardTitle>
                <CardDescription>Statements &amp; letters</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                {documents.map((d, i) => (
                  <div key={d.name} className={i > 0 ? "mt-3 border-t pt-3" : ""}>
                    <p className="truncate text-sm">{d.name}</p>
                    <p className="mt-0.5 font-code text-xs text-muted-foreground">
                      {d.meta}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* ── Footer — mono metadata ─────────────────────────────────── */}
        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-8">
          <span className="font-code text-xs text-muted-foreground">
            Register synced 18:42:11 ET · TLS session 9f3c-22e1
          </span>
          <span className="font-caption text-caption text-muted-foreground">
            Meridian Private Bank · Member FDIC · Equal Housing Lender
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
