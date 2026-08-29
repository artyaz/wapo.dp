"use client"
// EVAL page — dialog p3 — public library catalog search — 834x1112 light

import {
  BookOpenIcon,
  BookmarkIcon,
  ClockIcon,
  LibraryIcon,
  SearchIcon,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Book = {
  id: string
  title: string
  author: string
  year: number
  format: string
  callNumber: string
  availability: "available" | "wait"
  availabilityDetail: string
}

const books: Book[] = [
  {
    id: "b-2841",
    title: "The Pacific Northwest Garden",
    author: "Neil Trenton",
    year: 2019,
    format: "Book",
    callNumber: "635.9 TRE",
    availability: "available",
    availabilityDetail: "3 of 5 copies on shelf",
  },
  {
    id: "b-2846",
    title: "Coastal Gardening for Short Seasons",
    author: "Maria Okafor",
    year: 2021,
    format: "Book",
    callNumber: "635.9 OKA",
    availability: "wait",
    availabilityDetail: "All copies out · 2nd in line",
  },
  {
    id: "b-2852",
    title: "Soil Science for the Home Grower",
    author: "Devin Hale",
    year: 2017,
    format: "Large print",
    callNumber: "631.4 HAL",
    availability: "available",
    availabilityDetail: "1 of 2 copies on shelf",
  },
  {
    id: "b-2858",
    title: "The Winter Garden",
    author: "Elise Brandt",
    year: 2022,
    format: "E-book",
    callNumber: "—",
    availability: "available",
    availabilityDetail: "Available instantly · 21-day loan",
  },
]

const facets = [
  { label: "Book", count: 18, checked: true },
  { label: "Large print", count: 4, checked: true },
  { label: "Audiobook on CD", count: 3, checked: false },
  { label: "E-book", count: 7, checked: false },
]

const branches = [
  {
    name: "Fairview Central",
    detail: "On shelf now · hold until 8:00 PM today",
    eta: "Today",
    checked: true,
  },
  {
    name: "Cedar Park Branch",
    detail: "Transfer from Central · 4 miles away",
    eta: "2 days",
    checked: false,
  },
  {
    name: "Hawthorne Branch",
    detail: "All copies out · you'd be 2nd in line",
    eta: "~3 weeks",
    checked: false,
  },
  {
    name: "Riverside Library",
    detail: "All copies out · you'd be 5th in line",
    eta: "~8 weeks",
    checked: false,
  },
  {
    name: "Southgate Community Library",
    detail: "On shelf now · pickup locker available",
    eta: "Today",
    checked: false,
  },
  {
    name: "University Hill",
    detail: "1 copy in transit · non-holdable bestseller shelf",
    eta: "~4 weeks",
    checked: false,
  },
]

export default function Page() {
  const featured = books[0]

  return (
    <EvalShell theme="light" dir="ltr">
      {/* Single Dialog root: the featured result's "Place hold" button is the
          trigger; the dialog is open on first paint for the static capture. */}
      <Dialog defaultOpen>
        <div className="mx-auto flex min-h-screen w-full max-w-[834px] flex-col gap-4 bg-background p-5 text-foreground">
          {/* Header */}
          <header className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LibraryIcon className="size-4" />
            </span>
            <div>
              <h1 className="font-heading-3 text-base leading-tight font-semibold">
                Fairview Public Library
              </h1>
              <p className="font-code text-[11px] text-muted-foreground">
                Catalog · 412 Cedar Ave · open until 8 PM
              </p>
            </div>
            <div className="relative ms-auto w-72">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9 text-sm"
                defaultValue="vegetable gardening pacific northwest"
                aria-label="Search the catalog"
              />
            </div>
            <Button variant="outline" size="sm">
              <BookmarkIcon /> My holds
              <Badge variant="secondary" className="font-code text-[11px]">
                2
              </Badge>
            </Button>
            <Avatar size="sm">
              <AvatarFallback>PO</AvatarFallback>
            </Avatar>
          </header>

          {/* Format tabs */}
          <div className="flex items-center justify-between">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All formats</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="large-print">Large print</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="font-code text-[11px] text-muted-foreground">
              32 results · sorted by relevance
            </p>
          </div>

          {/* Facets + results */}
          <div className="grid flex-1 grid-cols-[220px_1fr] items-start gap-4">
            {/* Facets */}
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Refine</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5">
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    Format
                  </p>
                  {facets.map((facet) => (
                    <Label
                      key={facet.label}
                      className="cursor-pointer justify-between text-sm font-normal text-muted-foreground hover:text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <Checkbox defaultChecked={facet.checked} />
                        {facet.label}
                      </span>
                      <span className="font-code text-[11px]">
                        {facet.count}
                      </span>
                    </Label>
                  ))}
                </div>
                <Separator />
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    Availability
                  </p>
                  <Label className="cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground hover:text-foreground">
                    <Checkbox defaultChecked />
                    On shelf now
                  </Label>
                  <Label className="cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground hover:text-foreground">
                    <Checkbox />
                    E-instant
                  </Label>
                </div>
                <Separator />
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    Published
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2014 – 2026 · any language
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="flex flex-col gap-3">
              {books.map((book) => (
                <Card key={book.id} className="gap-0 py-0">
                  <CardContent className="flex items-stretch gap-4 p-4">
                    {/* Cover placeholder */}
                    <div className="flex h-24 w-16 shrink-0 flex-col items-center justify-center rounded-sm border bg-muted">
                      <BookOpenIcon className="size-5 text-muted-foreground" />
                      <span className="mt-1 font-code text-[9px] text-muted-foreground">
                        {book.callNumber}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <h2 className="font-heading-2 truncate text-base font-semibold">
                          {book.title}
                        </h2>
                        <span className="shrink-0 font-code text-[11px] text-muted-foreground">
                          {book.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline" className="text-[11px]">
                          {book.format}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-[11px]"
                        >
                          {book.availability === "available"
                            ? "On shelf"
                            : "Wait list"}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <ClockIcon className="size-3" />
                          {book.availabilityDetail}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col justify-center gap-2">
                      {book.id === featured.id ? (
                        <DialogTrigger
                          render={<Button size="sm" type="button" />}
                        >
                          Place hold
                        </DialogTrigger>
                      ) : (
                        <Button size="sm" variant="outline">
                          {book.availability === "available"
                            ? "Place hold"
                            : "Join wait"}
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex items-center justify-between border-t pt-3">
                <p className="font-code text-[11px] text-muted-foreground">
                  Showing 1–4 of 32 results for &quot;vegetable gardening
                  pacific northwest&quot;
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
            </div>
          </div>

          <footer className="flex items-center justify-between border-t pt-3">
            <p className="font-code text-[11px] text-muted-foreground">
              Fairview County Library System · card 4402 8817
            </p>
            <p className="font-code text-[11px] text-muted-foreground">
              Renewals: 2 · loan period: 21 days
            </p>
          </footer>
        </div>

        {/* Dialog — place hold, open at initial render */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-start">
              Place hold ·{" "}
              <span className="font-heading-2 font-semibold">
                {featured.title}
              </span>
            </DialogTitle>
            <DialogDescription className="text-start">
              {featured.author} · {featured.year} · held for 7 days after
              arrival at your pickup branch.
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable branch picker */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs">Pick up at</Label>
            <RadioGroup
              defaultValue="fairview-central"
              className="gap-0 rounded-lg border p-1"
            >
              {branches.map((branch, i) => (
                <div key={branch.name}>
                  {i > 0 ? <Separator className="mx-3" /> : null}
                  <Label
                    className="flex cursor-pointer items-start gap-3 rounded-sm px-3 py-2.5 text-sm leading-snug font-normal hover:bg-accent/50 has-[[data-state=checked]]:bg-accent"
                  >
                    <RadioGroupItem value={branch.name} className="mt-0.5" />
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="flex items-baseline justify-between gap-2 font-medium">
                        {branch.name}
                        <span className="font-code text-[11px] font-normal text-muted-foreground">
                          {branch.eta}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {branch.detail}
                      </span>
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Notification preference */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="notify-via" className="text-xs">
              Notify me
            </Label>
            <Select defaultValue="email">
              <SelectTrigger id="notify-via" size="sm" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  Email · patricia.ollis@example.com
                </SelectItem>
                <SelectItem value="text">Text · (503) 555-0164</SelectItem>
                <SelectItem value="none">No notification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sticky footer */}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ClockIcon className="size-3.5" />
            Hold expires 7 days after arrival · notify once, then reminder at 3
            days
          </p>
          <DialogFooter className="flex-row justify-end gap-2 border-t pt-4 sm:justify-end">
            <DialogClose
              render={<Button variant="outline" size="sm" type="button" />}
            >
              Cancel
            </DialogClose>
            <Button size="sm">Confirm hold</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EvalShell>
  )
}
