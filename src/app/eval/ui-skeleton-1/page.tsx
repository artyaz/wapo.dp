"use client"

// EVAL page — skeleton p1 — engineering team wiki — 1920x1080 dark
// Loading state of an internal wiki: sidebar menu skeletons, article skeleton
// (title / byline / prose / code block / endpoints table) and comment
// skeletons, mixed with loaded chrome — header, breadcrumb, rail cards and
// two live comments — so the placeholders read as intentional progressive
// loading, not missing content.
// Family: Skeleton + Breadcrumb, Button, Input, Badge, Avatar, Card, Table,
// Spinner. Flat panels + hairlines only — no shadows on in-flow content.

import {
  BookOpen,
  BookText,
  FileText,
  GitBranch,
  Palette,
  Plus,
  Search,
  Siren,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const handbookNav = [
  { icon: BookOpen, label: "Onboarding guide", active: false },
  { icon: GitBranch, label: "Code review guide", active: false },
  { icon: Palette, label: "Design tokens", active: false },
  { icon: Siren, label: "Incident escalation", active: false },
]

const recentPages = [
  "Postgres failover drill — notes",
  "RFC 42: event bus migration",
  "Auth service SLO dashboard",
]

const contributors = [
  { initials: "MK", name: "Mara Kim" },
  { initials: "JD", name: "Jonas Delgado" },
  { initials: "PR", name: "Priya Raman" },
  { initials: "TO", name: "Tom Osei" },
]

const linkedResources = [
  { title: "Rate limiting policy", meta: "page" },
  { title: "OAuth service guide", meta: "page" },
  { title: "Deprecation calendar Q3", meta: "PDF · 84 KB" },
]

function MenuSkeleton({ width }: { width: string }) {
  return (
    <div className="flex h-8 items-center gap-2 px-2" aria-hidden="true">
      <Skeleton className="size-4 shrink-0" />
      <Skeleton className={cn("h-3.5", width)} />
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof BookOpen
  label: string
  active: boolean
}) {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2 text-sm",
        active
          ? "bg-sidebar-accent font-medium text-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  )
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Top bar — loaded */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md border bg-card">
              <BookText className="size-4" />
            </div>
            <span className="font-heading-3 text-heading-3">Atlas Wiki</span>
          </div>
          <div className="relative w-[380px]">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Atlas Wiki…"
              aria-label="Search Atlas Wiki"
              className="pl-8 pr-12"
            />
            <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-sm border px-1.5 py-0.5 font-code text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" size="sm">
              Import
            </Button>
            <Button size="sm">
              <Plus />
              New page
            </Button>
            <Avatar className="ml-1">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Sidebar — nav tree partially loaded */}
          <aside className="flex w-64 shrink-0 flex-col gap-5 overflow-hidden border-r bg-sidebar px-3 py-4">
            <div className="flex flex-col gap-2">
              <p className="px-2 font-code text-xs tracking-wide text-muted-foreground uppercase">
                Spaces
              </p>
              <p className="px-2 text-xs font-medium text-muted-foreground">
                Platform
              </p>
              <div aria-busy="true" aria-label="Loading Platform pages">
                <MenuSkeleton width="w-24" />
                <MenuSkeleton width="w-20" />
                <MenuSkeleton width="w-28" />
                <MenuSkeleton width="w-16" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                Handbook
              </p>
              {handbookNav.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="px-2 font-code text-xs tracking-wide text-muted-foreground uppercase">
                Recent
              </p>
              {recentPages.map((label) => (
                <div
                  key={label}
                  className="flex h-8 items-center gap-2 px-2 text-sm text-muted-foreground"
                >
                  <FileText className="size-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Article — loading */}
          <main className="flex min-w-0 flex-1 justify-center overflow-hidden">
            <div
              className="flex w-full max-w-3xl flex-col gap-4 px-10 py-6"
              aria-busy="true"
              aria-label="Loading page: Runtime API"
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Engineering</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Platform</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Runtime API</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner className="size-3.5" />
                <span className="font-code text-xs">
                  Fetching revision 128 · 8.4k words
                </span>
              </div>

              {/* Title + byline */}
              <div className="flex flex-col gap-4">
                <Skeleton className="h-10 w-2/3" />
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                </div>
              </div>

              {/* Prose */}
              <div className="flex flex-col gap-2.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Code block */}
              <div className="overflow-hidden rounded-lg border bg-card">
                <div className="flex items-center gap-2 border-b px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-neutral-700" />
                    <span className="size-2 rounded-full bg-neutral-700" />
                    <span className="size-2 rounded-full bg-neutral-700" />
                  </div>
                  <span className="font-code text-xs text-muted-foreground">
                    runtime-api.http
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 px-4 py-4">
                  <Skeleton className="h-3.5 w-3/5" />
                  <Skeleton className="ml-4 h-3.5 w-2/5" />
                  <Skeleton className="ml-4 h-3.5 w-1/2" />
                  <Skeleton className="h-3.5 w-1/3" />
                </div>
              </div>

              {/* Endpoints table — cached schema, rows streaming */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-heading-3 text-heading-3">Endpoints</h2>
                  <span className="font-code text-xs text-muted-foreground">
                    schema cached · v2
                  </span>
                </div>
                <div className="rounded-lg border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-4">Method</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Auth</TableHead>
                        <TableHead className="pr-4">Rate limit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[0, 1, 2].map((row) => (
                        <TableRow key={row}>
                          <TableCell className="py-3 pl-4">
                            <Skeleton className="h-4 w-10" />
                          </TableCell>
                          <TableCell className="py-3">
                            <Skeleton className="h-4 w-64 max-w-full" />
                          </TableCell>
                          <TableCell className="py-3">
                            <Skeleton className="h-4 w-12" />
                          </TableCell>
                          <TableCell className="py-3 pr-4">
                            <Skeleton className="h-4 w-16" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Discussion — two live comments, one streaming in */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading-3 text-heading-3">Discussion</h2>
                  <Badge variant="secondary">3 comments</Badge>
                </div>
                <div className="flex gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>PR</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-sm font-medium">Priya Raman</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      Platform team · 3 days ago
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      The timeout table still lists the 30s gateway default —
                      that moved to 10s in v2.4. Patch incoming unless someone
                      objects.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-sm font-medium">Jonas Delgado</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      SRE · 2 days ago
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Good catch. The retry budget note below it is out of date
                      too.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3" aria-busy="true">
                  <Skeleton className="size-6 shrink-0 rounded-full" />
                  <div className="flex w-full max-w-md flex-col gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-3/5" />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Avatar size="sm">
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Add a comment — Markdown supported"
                    aria-label="Add a comment"
                  />
                  <Button size="sm" className="shrink-0">
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </main>

          {/* Right rail — page metadata loaded, TOC derives from article */}
          <aside className="flex w-72 shrink-0 flex-col gap-4 overflow-hidden border-l px-4 py-6">
            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Page details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 px-4">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Status
                  </span>
                  <Badge variant="outline">In review</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Last edited
                  </span>
                  <span className="text-xs">2 h ago · Mara Kim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Version
                  </span>
                  <span className="font-code text-xs">rev 128</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Contributors
                  </span>
                  <AvatarGroup>
                    {contributors.map((c) => (
                      <Avatar key={c.initials} size="sm" title={c.name}>
                        <AvatarFallback>{c.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">Linked resources</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-4">
                {linkedResources.map((r) => (
                  <div key={r.title} className="flex items-center gap-2.5">
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{r.title}</p>
                      <p className="font-caption text-caption text-muted-foreground">
                        {r.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader>
                <CardTitle className="text-sm">On this page</CardTitle>
              </CardHeader>
              <CardContent
                className="flex flex-col gap-2.5 px-4"
                aria-busy="true"
              >
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="ml-3 h-3 w-1/2" />
                <Skeleton className="ml-3 h-3 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="ml-3 h-3 w-2/5" />
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Footer — loaded */}
        <footer className="flex h-10 shrink-0 items-center justify-between border-t px-6">
          <span className="font-code text-xs text-muted-foreground">
            Atlas Wiki · Platform space · 1,284 pages
          </span>
          <div className="flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground">
              Last sync 14:02:11 UTC
            </span>
            <Button variant="ghost" size="xs">
              Shortcuts
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
