"use client"
// EVAL page — item p2 — insurance claims portal — 1440x900 dark
// "Meridian Mutual" claims desk. Item family showcase: sidebar nav as link
// items (render prop), claims queue rows with avatar media + severity badges
// + actionable rows, claim detail with sectioned ItemGroups (ItemHeader,
// ItemSeparator), coverage rows (icon media), documents (image media) and
// an activity log (xs muted items). Co-stars: Card, Badge, Button, Avatar,
// InputGroup, Kbd, Separator. Flat panels + hairlines in flow.

import {
  BarChart3Icon,
  BellIcon,
  CarIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  FileTextIcon,
  InboxIcon,
  LogOutIcon,
  MessageSquareIcon,
  PlusIcon,
  ReceiptIcon,
  SearchIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"

// Document thumbnails — inline neutral SVGs (offline-safe, monochrome).
const docSvgs = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%232a2926'/><rect x='22' y='14' width='52' height='68' rx='2' fill='%23d6d3ce'/><rect x='30' y='26' width='36' height='6' fill='%238f8a82'/><rect x='30' y='40' width='36' height='4' fill='%23a8a29e'/><rect x='30' y='50' width='28' height='4' fill='%23a8a29e'/><rect x='30' y='60' width='32' height='4' fill='%23a8a29e'/><rect x='46' y='72' width='12' height='6' fill='%238f8a82'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%232a2926'/><rect x='22' y='14' width='52' height='68' rx='2' fill='%23c8c4bc'/><path d='M54 14 L74 34 L54 34 Z' fill='%238f8a82'/><rect x='30' y='42' width='36' height='4' fill='%23a8a29e'/><rect x='30' y='52' width='28' height='4' fill='%23a8a29e'/><rect x='30' y='62' width='32' height='4' fill='%23a8a29e'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%232a2926'/><rect x='22' y='14' width='52' height='68' rx='2' fill='%23b5b0a8'/><rect x='30' y='24' width='20' height='20' fill='%232a2926'/><rect x='54' y='24' width='12' height='4' fill='%232a2926'/><rect x='54' y='32' width='12' height='4' fill='%232a2926'/><rect x='30' y='54' width='36' height='4' fill='%238f8a82'/><rect x='30' y='64' width='24' height='4' fill='%238f8a82'/></svg>",
]

const nav = [
  { label: "Claims queue", icon: InboxIcon, active: true },
  { label: "Policies", icon: FileTextIcon, active: false },
  { label: "Billing", icon: ReceiptIcon, active: false },
  { label: "Reports", icon: BarChart3Icon, active: false },
  { label: "Messages", icon: MessageSquareIcon, active: false, count: "3" },
]

const claims = [
  {
    id: "CLM-88231",
    claimant: "Marcus Whitfield",
    initials: "MW",
    detail: "Rear-end collision · AU-4471 · Filed Mar 12",
    amount: "$12,480",
    severity: "high" as const,
  },
  {
    id: "CLM-88218",
    claimant: "Sofia Andersson",
    initials: "SA",
    detail: "Hail damage — roof & hood · HH-2210 · Filed Mar 11",
    amount: "$4,015",
    severity: "medium" as const,
  },
  {
    id: "CLM-88204",
    claimant: "Devon Price",
    initials: "DP",
    detail: "Windshield stone chip · AU-3120 · Filed Mar 10",
    amount: "$640",
    severity: "low" as const,
  },
  {
    id: "CLM-88197",
    claimant: "Amara Diallo",
    initials: "AD",
    detail: "Water damage — kitchen · HH-2098 · Filed Mar 09",
    amount: "$9,120",
    severity: "medium" as const,
  },
  {
    id: "CLM-88183",
    claimant: "Jonah Reyes",
    initials: "JR",
    detail: "Side mirror — parking lot · AU-8845 · Filed Mar 08",
    amount: "$310",
    severity: "low" as const,
  },
]

const coverage = [
  {
    label: "Collision deductible",
    detail: "Applies after inspection",
    value: "$500",
    icon: ShieldCheckIcon,
  },
  {
    label: "Rental reimbursement",
    detail: "While vehicle is in shop",
    value: "30 days",
    icon: CarIcon,
  },
  {
    label: "OEM parts",
    detail: "HH tier policy rider",
    value: "Approved",
    icon: WrenchIcon,
  },
]

const documents = [
  {
    label: "Photos — rear bumper",
    detail: "JPG ×6 · 4.2 MB · Mar 11",
    svg: docSvgs[0],
  },
  {
    label: "Police report 40-2217",
    detail: "PDF · 1.1 MB · Mar 12",
    svg: docSvgs[1],
  },
  {
    label: "Repair estimate — Vega Auto",
    detail: "PDF · 860 KB · Mar 12",
    svg: docSvgs[2],
  },
]

const activity = [
  { time: "14:02", text: "Estimate requested from Vega Auto Body" },
  { time: "11:38", text: "6 photos uploaded by claimant" },
  { time: "Mar 12", text: "Claim filed and triaged to you" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
          <div className="flex items-center gap-2.5 border-b px-4 py-4">
            <span className="flex size-8 items-center justify-center rounded-sm border bg-muted">
              <ShieldCheckIcon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Meridian Mutual
              </p>
              <p className="font-caption text-[11px] text-muted-foreground">
                Claims desk · v4.2
              </p>
            </div>
          </div>

          <ItemGroup className="px-2 py-2">
            {nav.map((n) => (
              <Item
                key={n.label}
                size="sm"
                variant={n.active ? "muted" : "default"}
                render={<a href="#claims-queue" />}
              >
                <ItemMedia>
                  <n.icon className="size-4 text-muted-foreground" />
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle
                    className={
                      n.active ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {n.label}
                  </ItemTitle>
                </ItemContent>
                {n.count ? (
                  <ItemActions>
                    <Badge variant="outline">{n.count}</Badge>
                  </ItemActions>
                ) : null}
              </Item>
            ))}
          </ItemGroup>

          <div className="mt-auto border-t px-2 py-2">
            <Item size="sm">
              <ItemMedia>
                <Avatar>
                  <AvatarFallback className="font-code text-[11px] font-semibold">
                    AK
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-0">
                <ItemTitle className="text-[13px]">Aisha Khan</ItemTitle>
                <ItemDescription className="text-[11px]">
                  Senior adjuster
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Sign out"
                >
                  <LogOutIcon />
                </Button>
              </ItemActions>
            </Item>
          </div>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <div className="flex h-14 items-center gap-3 border-b px-6">
            <InputGroup className="h-9 w-72">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search claims, policies…"
                aria-label="Search claims and policies"
              />
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <span className="font-caption text-caption text-muted-foreground">
              12 unreviewed · 3 flagged for SLA
            </span>
            <div className="ms-auto flex items-center gap-2">
              <Button variant="outline" size="icon-sm" aria-label="Notifications">
                <BellIcon />
              </Button>
              <Button size="sm">
                <PlusIcon />
                New claim
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-4 px-6 py-5">
            <header className="flex items-end justify-between">
              <div>
                <p className="font-caption text-caption text-muted-foreground">
                  Auto &amp; home · Payouts pending review
                </p>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  Claims queue
                </h1>
              </div>
              <span className="font-caption text-caption text-muted-foreground">
                Showing 5 of 12 · updated 14:02
              </span>
            </header>

            <div className="grid flex-1 grid-cols-12 items-start gap-4">
              {/* Claims queue */}
              <Card className="col-span-7 gap-0 py-0">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    Unreviewed claims
                  </p>
                  <span className="font-caption text-caption text-muted-foreground">
                    Sorted by severity
                  </span>
                </div>
                <ItemGroup>
                  {claims.map((c) => (
                    <Item key={c.id} size="sm" variant="outline">
                      <ItemMedia>
                        <Avatar>
                          <AvatarFallback className="font-code text-[11px] font-semibold">
                            {c.initials}
                          </AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="gap-2.5">
                          <span className="font-code text-[13px]">
                            {c.id}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="truncate">{c.claimant}</span>
                        </ItemTitle>
                        <ItemDescription>{c.detail}</ItemDescription>
                      </ItemContent>
                      <ItemActions className="flex-col items-end gap-1">
                        <span className="font-code text-sm text-foreground">
                          {c.amount}
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            c.severity === "high"
                              ? "justify-center text-destructive-500"
                              : c.severity === "medium"
                                ? "justify-center text-warning-700"
                                : "justify-center text-muted-foreground"
                          }
                        >
                          {c.severity === "high"
                            ? "High"
                            : c.severity === "medium"
                              ? "Medium"
                              : "Low"}
                        </Badge>
                      </ItemActions>
                      <ItemActions>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Actions for ${c.id}`}
                        >
                          <EllipsisVerticalIcon />
                        </Button>
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
                <div className="flex items-center justify-between border-t px-4 py-2.5">
                  <span className="font-caption text-caption text-muted-foreground">
                    SLA: 4 business days remaining on 3 claims
                  </span>
                  <Button variant="ghost" size="sm">
                    Open full queue
                  </Button>
                </div>
              </Card>

              {/* Claim detail */}
              <Card className="col-span-5 gap-0 py-0">
                <div className="flex items-start justify-between border-b px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      CLM-88231 · Whitfield, Marcus
                    </p>
                    <p className="font-caption text-caption text-muted-foreground">
                      Assigned to you · Mar 12 · Policy AU-4471
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="justify-center text-destructive-500"
                  >
                    High
                  </Badge>
                </div>

                <ItemGroup>
                  <Item variant="muted" size="xs">
                    <ItemHeader>
                      <span className="text-xs font-medium text-muted-foreground">
                        Coverage limits
                      </span>
                    </ItemHeader>
                  </Item>
                  {coverage.map((c) => (
                    <Item key={c.label} size="sm" variant="outline">
                      <ItemMedia variant="icon">
                        <c.icon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{c.label}</ItemTitle>
                        <ItemDescription>{c.detail}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <span className="font-code text-xs text-foreground">
                          {c.value}
                        </span>
                      </ItemActions>
                    </Item>
                  ))}

                  <ItemSeparator />

                  <Item variant="muted" size="xs">
                    <ItemHeader>
                      <span className="text-xs font-medium text-muted-foreground">
                        Documents · 3
                      </span>
                    </ItemHeader>
                  </Item>
                  {documents.map((d) => (
                    <Item key={d.label} size="sm" variant="outline">
                      <ItemMedia variant="image">
                        <img src={d.svg} alt={`${d.label} thumbnail`} />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="text-[13px]">
                          {d.label}
                        </ItemTitle>
                        <ItemDescription>{d.detail}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Download ${d.label}`}
                        >
                          <DownloadIcon />
                        </Button>
                      </ItemActions>
                    </Item>
                  ))}

                  <ItemSeparator />

                  <Item variant="muted" size="xs">
                    <ItemHeader>
                      <span className="text-xs font-medium text-muted-foreground">
                        Activity
                      </span>
                    </ItemHeader>
                  </Item>
                  {activity.map((a) => (
                    <Item key={a.time} size="xs" variant="muted">
                      <ItemMedia>
                        <span className="w-12 font-code text-[11px] text-muted-foreground">
                          {a.time}
                        </span>
                      </ItemMedia>
                      <ItemContent className="gap-0">
                        <ItemDescription className="line-clamp-1">
                          {a.text}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>

                <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                  <Button variant="outline" size="sm">
                    Request documents
                  </Button>
                  <Button size="sm">Approve payout</Button>
                </div>
              </Card>
            </div>

            <Separator />

            <footer className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-caption text-caption text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success-500" />
                ClaimCore sync healthy · last batch 13:50
              </span>
              <span className="font-caption text-caption text-muted-foreground">
                Fraud watch: 1 claim referred to SIU this week
              </span>
            </footer>
          </div>
        </main>
      </div>
    </EvalShell>
  )
}
