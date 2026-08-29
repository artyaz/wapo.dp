"use client"
// EVAL page — dialog p2 — retail banking transaction history — 768x1024 dark

import {
  ArrowDownToLineIcon,
  ArrowLeftRightIcon,
  Building2Icon,
  DownloadIcon,
  LandmarkIcon,
  ReceiptTextIcon,
  SearchIcon,
  ShieldAlertIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type Txn = {
  date: string
  merchant: string
  category: string
  amount: string
  positive?: boolean
  status: "posted" | "pending" | "disputed"
}

const transactions: Txn[] = [
  {
    date: "JUN 12",
    merchant: "Whole Foods Market #148",
    category: "Groceries",
    amount: "−$84.27",
    status: "posted",
  },
  {
    date: "JUN 11",
    merchant: "Lyra Coffee Roasters",
    category: "Food & drink",
    amount: "−$6.40",
    status: "posted",
  },
  {
    date: "JUN 10",
    merchant: "Northmark Mortgage · MTG 2241",
    category: "Housing",
    amount: "−$1,912.00",
    status: "posted",
  },
  {
    date: "JUN 09",
    merchant: "Powell's Tech Supply",
    category: "Shopping",
    amount: "−$129.99",
    status: "disputed",
  },
  {
    date: "JUN 08",
    merchant: "Direct deposit · Harborview Clinic",
    category: "Income",
    amount: "+$3,214.58",
    positive: true,
    status: "posted",
  },
  {
    date: "JUN 07",
    merchant: "City Light & Power",
    category: "Utilities",
    amount: "−$118.20",
    status: "pending",
  },
  {
    date: "JUN 06",
    merchant: "Birch & Vine Restaurant",
    category: "Food & drink",
    amount: "−$58.90",
    status: "posted",
  },
]

function StatusBadge({ status }: { status: Txn["status"] }) {
  if (status === "disputed") {
    return (
      <Badge variant="destructive" className="font-code text-[11px]">
        DISPUTED
      </Badge>
    )
  }
  if (status === "pending") {
    return (
      <Badge variant="secondary" className="font-code text-[11px]">
        PENDING
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="font-code text-[11px]">
      POSTED
    </Badge>
  )
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      {/* Single Dialog root: the disputed row's action is the trigger; the
          dispute dialog is open on first paint for the static capture. */}
      <Dialog defaultOpen>
        <div className="mx-auto flex min-h-screen w-full max-w-[768px] flex-col gap-5 bg-background p-5 text-foreground">
          {/* Top bar */}
          <header className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LandmarkIcon className="size-4" />
            </span>
            <div>
              <p className="font-heading-3 text-base leading-tight font-semibold">
                Northmark Bank
              </p>
              <p className="font-code text-[11px] text-muted-foreground">
                Online banking · last login 8:04 AM
              </p>
            </div>
            <div className="relative ms-auto w-52">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9 text-sm"
                placeholder="Search transactions"
                aria-label="Search transactions"
              />
            </div>
            <Button variant="outline" size="icon" aria-label="Download statement">
              <DownloadIcon />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
          </header>

          {/* Account summary */}
          <Card className="gap-0 py-0">
            <CardContent className="flex items-stretch">
              <div className="flex flex-1 flex-col gap-1 px-5 py-4">
                <p className="text-xs text-muted-foreground">
                  Everyday Checking ·••• 4821
                </p>
                <p className="font-heading-1 text-3xl leading-tight font-semibold">
                  $4,286.51
                </p>
                <p className="font-code text-[11px] text-muted-foreground">
                  Available $4,086.51 · $200.00 hold
                </p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex w-44 flex-col gap-1 px-5 py-4">
                <p className="text-xs text-muted-foreground">June spend</p>
                <p className="font-code text-xl font-semibold">$1,924.85</p>
                <p className="text-[11px] text-muted-foreground">
                  Budget $2,400 · 8 days left
                </p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col justify-center gap-2 px-5 py-4">
                <Button size="sm" variant="outline">
                  <ArrowLeftRightIcon /> Transfer
                </Button>
                <Button size="sm" variant="outline">
                  <ArrowDownToLineIcon /> Deposit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="font-heading-3 text-lg font-semibold">
                Transaction history
              </h1>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="disputed">Disputed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Card className="gap-0 overflow-hidden py-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-5">Date</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-end">Amount</TableHead>
                    <TableHead className="pr-5 text-end">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.merchant}>
                      <TableCell className="pl-5 font-code text-xs text-muted-foreground">
                        {txn.date}
                      </TableCell>
                      <TableCell className="text-sm">
                        {txn.merchant}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {txn.category}
                      </TableCell>
                      <TableCell
                        className="text-end font-code text-sm"
                      >
                        {txn.amount}
                      </TableCell>
                      <TableCell className="pr-5 text-end">
                        {txn.status === "disputed" ? (
                          <DialogTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="xs"
                                aria-label="Continue dispute for Powell's Tech Supply"
                              />
                            }
                          >
                            <ShieldAlertIcon /> Dispute
                          </DialogTrigger>
                        ) : (
                          <StatusBadge status={txn.status} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <div className="flex items-center justify-between">
              <p className="font-code text-[11px] text-muted-foreground">
                7 of 41 transactions · Jun 1–12, 2026
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="xs" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="xs">
                  Next
                </Button>
              </div>
            </div>
          </section>

          {/* Bottom cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="gap-3 py-4">
              <CardContent className="flex items-center gap-3 px-5">
                <span className="flex size-9 items-center justify-center rounded-md border">
                  <ReceiptTextIcon className="size-4 text-muted-foreground" />
                </span>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">May statement ready</p>
                  <p className="text-xs text-muted-foreground">
                    PDF · posted May 31 · 34 pages
                  </p>
                </div>
                <Button variant="outline" size="xs" className="ms-auto">
                  View
                </Button>
              </CardContent>
            </Card>
            <Card className="gap-3 py-4">
              <CardContent className="flex items-center gap-3 px-5">
                <span className="flex size-9 items-center justify-center rounded-md border">
                  <Building2Icon className="size-4 text-muted-foreground" />
                </span>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Savings ·••• 7302</p>
                  <p className="text-xs text-muted-foreground">
                    $12,840.00 · 4.10% APY
                  </p>
                </div>
                <Button variant="outline" size="xs" className="ms-auto">
                  Details
                </Button>
              </CardContent>
            </Card>
          </div>

          <footer className="mt-auto flex items-center justify-between border-t pt-3">
            <p className="font-code text-[11px] text-muted-foreground">
              FDIC insured · Equal Housing Lender
            </p>
            <p className="font-code text-[11px] text-muted-foreground">
              Session times out in 09:41
            </p>
          </footer>
        </div>

        {/* Dialog — dispute form, open at initial render */}
        <DialogContent className="sm:max-w-md">
          <form className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Dispute a transaction</DialogTitle>
              <DialogDescription>
                We&apos;ll apply a provisional credit within 2 business days of
                filing.
              </DialogDescription>
            </DialogHeader>

            {/* Transaction under dispute */}
            <div className="flex flex-col gap-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Powell&apos;s Tech Supply
                </span>
                <span className="font-code text-sm font-semibold">−$129.99</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-code">JUN 09 · 2:14 PM · CARD 4821</span>
                <span className="font-code">AUTH 044821</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Posted to</span>
                <span>Everyday Checking</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="dispute-reason">Reason</Label>
              <Select defaultValue="not-received">
                <SelectTrigger id="dispute-reason" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-received">Item not received</SelectItem>
                  <SelectItem value="duplicate">Charged more than once</SelectItem>
                  <SelectItem value="unauthorized">
                    I didn&apos;t authorize this
                  </SelectItem>
                  <SelectItem value="refund">Refund not processed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="dispute-amount">Disputed amount</Label>
              <Input
                id="dispute-amount"
                defaultValue="129.99"
                className="font-code"
                aria-describedby="dispute-amount-hint"
              />
              <p
                id="dispute-amount-hint"
                className="text-[11px] text-muted-foreground"
              >
                Partial amounts are allowed for split shipments.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="dispute-detail">What happened?</Label>
              <Textarea
                id="dispute-detail"
                defaultValue="Order #PT-88214 placed June 2 with 2-day shipping. Tracking hasn't updated since June 4 and the merchant hasn't answered two support emails."
                className="min-h-20 text-sm"
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="dispute-confirm" defaultChecked className="mt-0.5" />
              <Label
                htmlFor="dispute-confirm"
                className="text-xs leading-snug font-normal text-muted-foreground"
              >
                I confirm this dispute is accurate to the best of my knowledge
                and I haven&apos;t received the goods or a refund.
              </Label>
            </div>

            <DialogFooter className="flex-row gap-2 sm:justify-end">
              <DialogClose
                render={<Button variant="outline" type="button" />}
              >
                Cancel
              </DialogClose>
              <Button type="submit">Submit dispute</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </EvalShell>
  )
}
