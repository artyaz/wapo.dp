"use client"
// EVAL page — direction p1 — public library catalog search — 1920x1080 light

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  Building2Icon,
  ClockIcon,
  LanguagesIcon,
  MapPinIcon,
  SearchIcon,
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Locale = "en" | "ar"

/** Live readout of the direction the catalog is currently running in. */
function DirectionBadge() {
  const direction = useDirection()
  return (
    <Badge variant={direction === "rtl" ? "default" : "outline"} className="font-code">
      {direction.toUpperCase()}
    </Badge>
  )
}

/** Pagination glyph that points toward "forward" in the active direction. */
function ForwardArrow({ className }: { className?: string }) {
  const direction = useDirection()
  const Icon = direction === "rtl" ? ArrowLeftIcon : ArrowRightIcon
  return <Icon className={className} />
}

type Result = {
  title: string
  author: string
  year: string
  callNumber: string
  branch: string
  status: "available" | "transit" | "reference" | "partial"
}

const results: Result[] = [
  {
    title: "The Climate Atlas of North America",
    author: "Marion Estes",
    year: "2024",
    callNumber: "G1046.C5 E88 2024",
    branch: "Central Branch · 2 copies",
    status: "available",
  },
  {
    title: "Under a White Sky: The Nature of the Future",
    author: "Elizabeth Kolbert",
    year: "2021",
    callNumber: "QC903 .K65 2021",
    branch: "Central Branch · 1 copy",
    status: "transit",
  },
  {
    title: "Climate Resilience Field Guide",
    author: "Priya Raghavan",
    year: "2023",
    callNumber: "GB981.8 .R34 2023",
    branch: "Riverside Branch · 3 copies",
    status: "available",
  },
  {
    title: "The Great Lakes Water Wars",
    author: "Peter Annin",
    year: "2018",
    callNumber: "HD1697 .G7 A56 2018",
    branch: "Central Branch · 4 copies",
    status: "available",
  },
  {
    title: "Atmosphere: A Very Short Introduction",
    author: "Paul I. Palmer",
    year: "2020",
    callNumber: "QC861.2 .P36 2020",
    branch: "Central Branch · Reference desk",
    status: "reference",
  },
  {
    title: "Drawdown: The Most Comprehensive Plan Ever Proposed",
    author: "Paul Hawken (ed.)",
    year: "2017",
    callNumber: "TD171.7 .D73 2017",
    branch: "Riverside Branch · 2 copies",
    status: "partial",
  },
  {
    title: "Field Notes from a Catastrophe",
    author: "Elizabeth Kolbert",
    year: "2015",
    callNumber: "QC981.8 .C5 K65 2015",
    branch: "Central Branch · 1 copy",
    status: "available",
  },
]

function StatusBadge({ status }: { status: Result["status"] }) {
  if (status === "transit") {
    return (
      <Badge variant="secondary" className="font-code text-[11px]">
        IN TRANSIT
      </Badge>
    )
  }
  if (status === "reference") {
    return (
      <Badge variant="secondary" className="font-code text-[11px]">
        REFERENCE ONLY
      </Badge>
    )
  }
  if (status === "partial") {
    return (
      <Badge variant="outline" className="font-code text-[11px]">
        1 OF 2 IN
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="font-code text-[11px]">
      AVAILABLE
    </Badge>
  )
}

const formats = [
  { label: "Books", count: 812, checked: true },
  { label: "Audiobooks", count: 214, checked: false },
  { label: "Large print", count: 96, checked: false },
  { label: "DVDs", count: 126, checked: false },
]

const languages = [
  { label: "English", count: 891, checked: true },
  { label: "العربية · Arabic", count: 142, checked: false },
  { label: "Español · Spanish", count: 131, checked: false },
  { label: "中文 · Chinese", count: 84, checked: false },
]

const arabicTitles = [
  {
    title: "أطلس المناخ العربي",
    author: "ليلى حدّاد · 2022",
    callNumber: "QC981.7 .H33",
    available: true,
  },
  {
    title: "مدن تحت الماء",
    author: "عمر الشامي · 2023",
    callNumber: "GB1590 .S53",
    available: false,
  },
  {
    title: "تاريخ الرياح",
    author: "سارة النعيمي · 2021",
    callNumber: "QC931 .N35",
    available: true,
  },
]

export default function Page() {
  const [locale, setLocale] = React.useState<Locale>("en")
  const direction = locale === "ar" ? "rtl" : "ltr"

  return (
    <EvalShell theme="light" dir="ltr">
      <DirectionProvider direction={direction}>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          {/* Top bar */}
          <header className="flex h-16 shrink-0 items-center gap-4 border-b px-8">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpenIcon className="size-4" />
              </span>
              <div>
                <p className="font-heading-3 text-base leading-tight font-semibold">
                  Riverbend City Library
                </p>
                <p className="font-code text-[11px] text-muted-foreground">
                  catalog.riverbend.gov
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-[560px]">
              <SearchIcon className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                defaultValue="climate"
                className="ps-9 text-sm"
                aria-label="Search the catalog"
                placeholder="Search the catalog — title, author, ISBN"
              />
            </div>

            {/* Language / direction control — flips the whole catalog. */}
            <div
              className="flex items-center rounded-md border p-0.5"
              role="group"
              aria-label="Interface language"
            >
              <Button
                size="xs"
                variant={locale === "en" ? "secondary" : "ghost"}
                onClick={() => setLocale("en")}
              >
                English
              </Button>
              <Button
                size="xs"
                variant={locale === "ar" ? "secondary" : "ghost"}
                onClick={() => setLocale("ar")}
              >
                <LanguagesIcon /> العربية
                <span className="font-code text-[10px] text-muted-foreground">
                  RTL
                </span>
              </Button>
            </div>

            <Button variant="outline" size="sm" className="gap-2">
              Holds
              <Badge variant="secondary" className="font-code text-[10px]">
                3
              </Badge>
            </Button>
            <Avatar>
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
          </header>

          {/* Main */}
          <main
            dir={direction}
            className="grid flex-1 grid-cols-[248px_minmax(0,1fr)_360px] gap-6 px-8 py-6"
          >
            {/* Facets */}
            <aside className="flex flex-col gap-4">
              <Card className="gap-4 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="text-sm">Refine results</CardTitle>
                  <p className="font-code text-[11px] text-muted-foreground">
                    1,248 items
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-5">
                  <div className="flex flex-col gap-2.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Format
                    </p>
                    {formats.map((format) => (
                      <label
                        key={format.label}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <Checkbox
                          id={`format-${format.label}`}
                          defaultChecked={format.checked}
                        />
                        {format.label}
                        <span className="ms-auto font-code text-[11px] text-muted-foreground">
                          {format.count}
                        </span>
                      </label>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-2.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Language
                    </p>
                    {languages.map((language) => (
                      <label
                        key={language.label}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <Checkbox
                          id={`lang-${language.label}`}
                          defaultChecked={language.checked}
                        />
                        {language.label}
                        <span className="ms-auto font-code text-[11px] text-muted-foreground">
                          {language.count}
                        </span>
                      </label>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="available-only" className="text-sm">
                      Available now only
                    </Label>
                    <Switch id="available-only" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-3 py-5">
                <CardContent className="flex items-center gap-3 px-5">
                  <Avatar size="lg">
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Elena Marsh</p>
                    <p className="font-code text-[11px] text-muted-foreground">
                      CARD 2409-118X
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      3 holds · 2 items due Jun 14
                    </p>
                  </div>
                </CardContent>
                <CardContent className="px-5">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage account
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <section className="flex min-w-0 flex-col gap-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h1 className="font-heading-2 text-2xl font-semibold">
                    Search results
                  </h1>
                  <p className="mt-0.5 font-code text-[11px] text-muted-foreground">
                    1,248 items for &quot;climate&quot; · sorted by relevance
                  </p>
                </div>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="books">Books</TabsTrigger>
                    <TabsTrigger value="audio">Audiobooks</TabsTrigger>
                    <TabsTrigger value="arabic">العربية</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex flex-col gap-2.5">
                {results.map((result) => (
                  <Card key={result.title} className="gap-0 py-3.5">
                    <CardContent className="flex items-center gap-4 px-5">
                      <span className="flex h-16 w-12 shrink-0 items-center justify-center rounded-sm border bg-muted font-heading-3 text-lg text-muted-foreground">
                        {result.title.charAt(0)}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p className="truncate font-heading-3 text-sm font-semibold">
                          {result.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.author} · {result.year}
                        </p>
                        <p className="font-code text-[11px] text-muted-foreground">
                          {result.callNumber} · {result.branch}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <StatusBadge status={result.status} />
                        <Button variant="outline" size="xs">
                          Place hold
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-1">
                <p className="font-code text-[11px] text-muted-foreground">
                  Showing 1–7 of 1,248 · Riverbend, Oregon
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon-sm" disabled aria-label="Previous page">
                    <ForwardArrow className="size-4 rotate-180" />
                  </Button>
                  <span className="font-code text-xs text-muted-foreground">
                    Page 1 of 178
                  </span>
                  <Button variant="outline" size="icon-sm" aria-label="Next page">
                    <ForwardArrow className="size-4" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Direction column */}
            <aside className="flex flex-col gap-4">
              <Card className="gap-3 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="text-sm">Interface direction</CardTitle>
                  <DirectionBadge />
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Mirrored controls read{" "}
                    <span className="font-code text-[11px]">useDirection()</span>{" "}
                    from the provider — the Arabic collection below runs its own
                    RTL context.
                  </p>
                  <div className="flex flex-col gap-2 rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-code text-[10px] text-muted-foreground">
                        dir=&quot;ltr&quot;
                      </span>
                      <span className="ms-auto flex items-center gap-1 text-xs font-medium">
                        Next page <ForwardArrow className="size-3.5" />
                      </span>
                    </div>
                    <Separator />
                    <DirectionProvider direction="rtl">
                      <div dir="rtl" className="flex items-center gap-2">
                        <span className="font-code text-[10px] text-muted-foreground">
                          dir=&quot;rtl&quot;
                        </span>
                        <span className="ms-auto flex items-center gap-1 text-xs font-medium">
                          الصفحة التالية{" "}
                          <ForwardArrow className="size-3.5" />
                        </span>
                      </div>
                    </DirectionProvider>
                  </div>
                </CardContent>
              </Card>

              {/* Arabic collection — nested RTL provider */}
              <DirectionProvider direction="rtl">
                <Card className="gap-4 py-5" dir="rtl">
                  <CardHeader className="px-5">
                    <CardTitle className="font-heading-3 text-sm">
                      المجموعة العربية
                    </CardTitle>
                    <Badge className="font-code text-[10px]">RTL</Badge>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 px-5">
                    <div className="relative">
                      <SearchIcon className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="ps-9 text-sm"
                        placeholder="ابحث في الفهرس"
                        aria-label="ابحث في الفهرس"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {arabicTitles.map((book) => (
                        <div
                          key={book.title}
                          className="flex items-center gap-3 rounded-lg border p-2.5"
                        >
                          <span className="flex h-12 w-9 shrink-0 items-center justify-center rounded-sm bg-muted font-heading-3 text-sm text-muted-foreground">
                            {book.title.charAt(0)}
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <p className="truncate font-heading-3 text-sm font-semibold">
                              {book.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {book.author}
                            </p>
                            <p className="font-code text-[10px] text-muted-foreground">
                              {book.callNumber}
                            </p>
                          </div>
                          <Badge
                            variant={book.available ? "outline" : "secondary"}
                            className="font-code text-[10px]"
                          >
                            {book.available ? "متاح" : "قيد النقل"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-code text-[11px] text-muted-foreground">
                        الصفحة 1 من 12
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium">
                        الصفحة التالية <ForwardArrow className="size-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </DirectionProvider>

              <Card className="gap-2 py-4">
                <CardContent className="flex flex-col gap-1.5 px-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPinIcon className="size-3.5" /> Central Branch · 210
                    Larch Street
                  </span>
                  <span className="flex items-center gap-2">
                    <ClockIcon className="size-3.5" /> Open today 9 AM – 8 PM
                  </span>
                  <span className="flex items-center gap-2">
                    <Building2Icon className="size-3.5" /> Riverside Branch ·
                    open 10 AM – 6 PM
                  </span>
                </CardContent>
              </Card>
            </aside>
          </main>

          {/* Footer */}
          <footer
            dir="ltr"
            className="flex h-12 shrink-0 items-center justify-between border-t px-8"
          >
            <p className="font-code text-[11px] text-muted-foreground">
              Riverbend City Library · catalog synced 06:00 PT
            </p>
            <p className="font-code text-[11px] text-muted-foreground">
              MARC records · 412,908 holdings
            </p>
          </footer>
        </div>
      </DirectionProvider>
    </EvalShell>
  )
}
