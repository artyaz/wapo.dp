"use client"
// EVAL page — direction p2 — freelance invoice console — 1180x820 dark

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BarChart3Icon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  PlusIcon,
  SendIcon,
  TimerIcon,
  UsersIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type InvoiceStatus = "paid" | "sent" | "overdue" | "draft"

type Invoice = {
  number: string
  client: string
  clientRtl?: boolean
  issued: string
  due: string
  amount: string
  currency: string
  status: InvoiceStatus
}

const invoices: Invoice[] = [
  {
    number: "INV-2026-0141",
    client: "Halcyon Studio",
    issued: "Jun 24",
    due: "Jul 08",
    amount: "2,400.00",
    currency: "USD",
    status: "sent",
  },
  {
    number: "INV-2026-0140",
    client: "Meridian Coffee Co.",
    issued: "Jun 22",
    due: "Jul 06",
    amount: "1,150.00",
    currency: "USD",
    status: "paid",
  },
  {
    number: "INV-2026-0139",
    client: "شركة نور للتقنية",
    clientRtl: true,
    issued: "Jun 18",
    due: "Jul 02",
    amount: "16,905.00",
    currency: "SAR",
    status: "overdue",
  },
  {
    number: "INV-2026-0137",
    client: "Bloom & Vine Florals",
    issued: "Jun 12",
    due: "Jun 26",
    amount: "890.00",
    currency: "USD",
    status: "paid",
  },
  {
    number: "INV-2026-0135",
    client: "Trailhead Outfitters",
    issued: "Jun 08",
    due: "Jun 22",
    amount: "3,720.00",
    currency: "USD",
    status: "overdue",
  },
  {
    number: "INV-2026-0134",
    client: "Kestrel Analytics",
    issued: "Jun 05",
    due: "Jun 19",
    amount: "1,980.00",
    currency: "USD",
    status: "draft",
  },
]

function StatusBadge({ status }: { status: InvoiceStatus }) {
  if (status === "overdue") {
    return (
      <Badge variant="destructive" className="font-code text-[11px]">
        OVERDUE
      </Badge>
    )
  }
  if (status === "paid") {
    return (
      <Badge variant="outline" className="font-code text-[11px]">
        PAID
      </Badge>
    )
  }
  if (status === "sent") {
    return (
      <Badge variant="secondary" className="font-code text-[11px]">
        SENT
      </Badge>
    )
  }
  return (
    <Badge variant="secondary" className="font-code text-[11px]">
      DRAFT
    </Badge>
  )
}

/** A "go to detail" glyph that mirrors itself from the provider's context. */
function RowChevron({ className }: { className?: string }) {
  const direction = useDirection()
  const Icon = direction === "rtl" ? ChevronLeftIcon : ChevronRightIcon
  return <Icon className={className} aria-hidden="true" />
}

/** Forward-pointing arrow used by the pagination/readout controls. */
function ForwardArrow({ className }: { className?: string }) {
  const direction = useDirection()
  const Icon = direction === "rtl" ? ArrowLeftIcon : ArrowRightIcon
  return <Icon className={className} aria-hidden="true" />
}

/** Live readout chip — proves which context a component sits in. */
function DirectionReadout({ label }: { label: string }) {
  const direction = useDirection()
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Badge variant="outline" className="font-code text-[10px]">
        {direction}
      </Badge>
      <ForwardArrow className="ms-auto size-3.5 text-muted-foreground" />
    </div>
  )
}

/** Client cell — Noor Tech renders inside its own RTL context. */
function ClientCell({ invoice }: { invoice: Invoice }) {
  if (invoice.clientRtl) {
    return (
      <DirectionProvider direction="rtl">
        <span dir="rtl" className="text-sm font-medium">
          {invoice.client}
        </span>
      </DirectionProvider>
    )
  }
  return <span className="text-sm font-medium">{invoice.client}</span>
}

/**
 * Row-end "open" glyph. The column position is identical for every row;
 * only the glyph itself mirrors — the RTL client's provider flips it.
 */
function RowEndChevron({ rtl }: { rtl?: boolean }) {
  if (rtl) {
    return (
      <DirectionProvider direction="rtl">
        <RowChevron className="ms-auto size-4 text-muted-foreground" />
      </DirectionProvider>
    )
  }
  return <RowChevron className="ms-auto size-4 text-muted-foreground" />
}

/** Arabic tax invoice preview — the whole card runs in an RTL context. */
function RtlInvoicePreview() {
  return (
    <DirectionProvider direction="rtl">
      <Card className="gap-3 py-4" dir="rtl">
        <CardHeader className="px-5">
          <CardTitle className="font-heading-3 text-sm">
            فاتورة ضريبية · INV-2026-0139
          </CardTitle>
          <Badge variant="destructive" className="font-code text-[10px]">
            متأخرة ١٤ يومًا
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold">شركة نور للتقنية</p>
            <p className="text-[11px] text-muted-foreground">
              الرياض، حي العليا · الرقم الضريبي ٣١٠٤٩٢٨٧٦٥
            </p>
          </div>
          <Separator />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">تصميم الهوية البصرية</span>
              <span className="font-code">8,500.00</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">تطوير واجهة الموقع</span>
              <span className="font-code">6,200.00</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                ضريبة القيمة المضافة ١٥٪
              </span>
              <span className="font-code">2,205.00</span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">الإجمالي المستحق</span>
            <span className="font-code text-lg font-semibold">
              16,905.00 ر.س
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">المحصل</span>
              <span className="font-code">8,450.00 ر.س</span>
            </div>
            <Progress value={50} aria-label="نسبة المبلغ المحصل" />
            <p className="text-[10px] text-muted-foreground">
              ٥٠٪ · الدفعة الأولى ١٥ يونيو · تاريخ الاستحقاق ٢ يوليو
            </p>
          </div>
        </CardContent>
        <div className="flex items-center gap-2 border-t px-5 pt-3">
          <Button variant="outline" size="xs" className="ms-auto">
            <DownloadIcon /> عرض PDF
          </Button>
          <Button size="xs">
            <SendIcon /> إرسال تذكير
          </Button>
        </div>
      </Card>
    </DirectionProvider>
  )
}

const navItems = [
  { label: "Overview", icon: LayoutDashboardIcon, active: false },
  { label: "Invoices", icon: FileTextIcon, active: true },
  { label: "Clients", icon: UsersIcon, active: false },
  { label: "Time tracking", icon: TimerIcon, active: false },
  { label: "Reports", icon: BarChart3Icon, active: false },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <aside className="flex w-52 shrink-0 flex-col border-e px-3 py-4">
          <div className="flex items-center gap-2.5 px-2 pb-5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-heading-3 text-sm font-semibold">
              L
            </span>
            <div>
              <p className="text-sm font-semibold">Ledgerline</p>
              <p className="font-code text-[10px] text-muted-foreground">
                freelance billing
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm ${
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
                {item.active && (
                  <Badge variant="secondary" className="ms-auto font-code text-[10px]">
                    24
                  </Badge>
                )}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 border-t px-2 pt-4">
            <Avatar size="sm">
              <AvatarFallback>DW</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs font-medium">Dana Whitfield</p>
              <p className="font-code text-[10px] text-muted-foreground">
                Design & front-end
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <DirectionProvider direction="ltr">
          <div className="flex min-w-0 flex-1 flex-col gap-3.5 p-4">
            <header className="flex items-center gap-3">
              <div>
                <h1 className="font-heading-2 text-xl font-semibold">
                  Invoices
                </h1>
                <p className="font-code text-[11px] text-muted-foreground">
                  June 2026 · 24 invoices · USD (SAR at 3.75)
                </p>
              </div>
              <div className="ms-auto flex items-center gap-2">
                <Button variant="outline" size="icon-sm" aria-label="Notifications">
                  <BellIcon />
                </Button>
                <Button size="sm">
                  <PlusIcon /> New invoice
                </Button>
              </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3.5">
              <Card className="gap-1.5 py-3.5">
                <CardContent className="flex flex-col gap-1.5 px-5">
                  <p className="text-xs text-muted-foreground">Outstanding</p>
                  <p className="font-heading-1 text-xl leading-tight font-semibold">
                    $10,628
                  </p>
                  <Progress value={58} aria-label="Outstanding vs billed" />
                  <p className="font-code text-[10px] text-muted-foreground">
                    8 open · 58% of $18.4k billed Q2
                  </p>
                </CardContent>
              </Card>
              <Card className="gap-1.5 py-3.5">
                <CardContent className="flex flex-col gap-1.5 px-5">
                  <p className="text-xs text-muted-foreground">Overdue</p>
                  <p className="font-heading-1 text-xl leading-tight font-semibold">
                    $8,228
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="font-code text-[10px]">
                      2 OVERDUE
                    </Badge>
                    <span className="font-code text-[10px] text-muted-foreground">
                      avg 11 days late
                    </span>
                  </div>
                  <p className="font-code text-[10px] text-muted-foreground">
                    Noor Tech SAR 16,905 · Trailhead $3,720
                  </p>
                </CardContent>
              </Card>
              <Card className="gap-1.5 py-3.5">
                <CardContent className="flex flex-col gap-1.5 px-5">
                  <p className="text-xs text-muted-foreground">
                    Collected in June
                  </p>
                  <p className="font-heading-1 text-xl leading-tight font-semibold">
                    $8,920
                  </p>
                  <Progress value={82} aria-label="Collected vs goal" />
                  <p className="font-code text-[10px] text-muted-foreground">
                    82% of $10,900 goal
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Table + preview */}
            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_330px] gap-3.5">
              <Card className="gap-0 overflow-hidden py-0">
                <div className="flex items-center justify-between border-b px-4 py-2.5">
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="sent">Sent</TabsTrigger>
                      <TabsTrigger value="overdue">Overdue</TabsTrigger>
                      <TabsTrigger value="paid">Paid</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="font-code text-[10px] text-muted-foreground">
                    6 of 24 · June 2026
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Invoice</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead className="text-end">Amount</TableHead>
                      <TableHead className="text-end">Status</TableHead>
                      <TableHead className="w-8 pr-4" aria-label="Open" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.number}>
                        <TableCell className="pl-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-code text-xs">
                              {invoice.number}
                            </span>
                            <span className="font-code text-[10px] text-muted-foreground">
                              {invoice.issued} · {invoice.due}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ClientCell invoice={invoice} />
                        </TableCell>
                        <TableCell className="text-end font-code text-sm">
                          {invoice.amount}
                          <span className="ms-1 text-[10px] text-muted-foreground">
                            {invoice.currency}
                          </span>
                        </TableCell>
                        <TableCell className="pr-3 text-end">
                          <StatusBadge status={invoice.status} />
                        </TableCell>
                        <TableCell className="pr-4">
                          <RowEndChevron rtl={invoice.clientRtl} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-between border-t px-4 py-2">
                  <p className="font-code text-[10px] text-muted-foreground">
                    Net 14 terms · auto-reminders on
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
              </Card>

              {/* Right rail */}
              <div className="flex flex-col gap-3.5">
                <RtlInvoicePreview />

                <Card className="gap-2.5 py-4">
                  <CardHeader className="px-5">
                    <CardTitle className="text-sm">
                      Direction context
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2.5 px-5">
                    <p className="text-xs text-muted-foreground">
                      Mirrored controls ask{" "}
                      <span className="font-code text-[11px]">
                        useDirection()
                      </span>{" "}
                      — the Arabic invoice runs its own RTL provider.
                    </p>
                    <div className="flex flex-col gap-2 rounded-lg border p-3">
                      <DirectionReadout label="Console · table rows" />
                      <Separator />
                      <DirectionProvider direction="rtl">
                        <div dir="rtl">
                          <DirectionReadout label="فاتورة نور · RTL" />
                        </div>
                      </DirectionProvider>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <footer className="flex items-center justify-between pb-1">
              <p className="font-code text-[10px] text-muted-foreground">
                Ledgerline · last sync 2 min ago · wire transfers 1–2 days
              </p>
              <p className="font-code text-[10px] text-muted-foreground">
                Q2 totals · billed $18,412 · collected $23,105
              </p>
            </footer>
          </div>
        </DirectionProvider>
      </div>
    </EvalShell>
  )
}
