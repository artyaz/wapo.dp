"use client"
// EVAL page — alert-dialog p1 — real estate listing browser — 1920x1080 light

import {
  BathIcon,
  BedDoubleIcon,
  BellIcon,
  CalendarDaysIcon,
  CameraIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  HeartIcon,
  HeartOffIcon,
  HouseIcon,
  LayoutGridIcon,
  ListIcon,
  MapPinIcon,
  MessageSquareIcon,
  RulerIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  TrendingDownIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Listing = {
  id: string
  address: string
  price: string
  beds: number
  baths: string
  sqft: string
  type: string
  seed: string
  photos: number
  tags: { label: string; variant: "outline" | "secondary" }[]
}

const listings: Listing[] = [
  {
    id: "NS-1041",
    address: "2145 N Halsted St, Unit 2B",
    price: "$824,000",
    beds: 2,
    baths: "2",
    sqft: "1,420",
    type: "Condo",
    seed: "wapo-ad-halsted",
    photos: 24,
    tags: [{ label: "Saved", variant: "outline" }],
  },
  {
    id: "NS-1044",
    address: "2038 N Cleveland Ave",
    price: "$699,000",
    beds: 2,
    baths: "2",
    sqft: "1,180",
    type: "Condo",
    seed: "wapo-ad-cleveland",
    photos: 18,
    tags: [{ label: "Open Sat 1–3 PM", variant: "secondary" }],
  },
  {
    id: "NS-1047",
    address: "2712 N Mildred Ave",
    price: "$1,150,000",
    beds: 3,
    baths: "3",
    sqft: "2,310",
    type: "Townhouse",
    seed: "wapo-ad-mildred",
    photos: 31,
    tags: [{ label: "Price cut $25,000", variant: "outline" }],
  },
  {
    id: "NS-1052",
    address: "1834 N Orchard St",
    price: "$925,000",
    beds: 3,
    baths: "2.5",
    sqft: "1,865",
    type: "Townhouse",
    seed: "wapo-ad-orchard",
    photos: 27,
    tags: [{ label: "Tour Sat 11 AM", variant: "outline" }],
  },
  {
    id: "NS-1055",
    address: "812 W Webster Ave",
    price: "$1,395,000",
    beds: 4,
    baths: "3.5",
    sqft: "3,020",
    type: "Single family",
    seed: "wapo-ad-webster",
    photos: 36,
    tags: [{ label: "Just listed", variant: "secondary" }],
  },
  {
    id: "NS-1058",
    address: "2220 N Geneva Ter, Unit 3",
    price: "$565,000",
    beds: 1,
    baths: "1",
    sqft: "920",
    type: "Condo",
    seed: "wapo-ad-geneva",
    photos: 12,
    tags: [{ label: "Pending", variant: "secondary" }],
  },
]

const navItems = [
  { icon: HouseIcon, label: "Browse listings", active: true },
  { icon: HeartIcon, label: "Saved homes", count: "12" },
  { icon: CalendarDaysIcon, label: "Tours" },
  { icon: MessageSquareIcon, label: "Messages" },
  { icon: FileTextIcon, label: "Documents" },
]

const savedSearches = [
  { label: "Lincoln Park · 2 bd · under $850K", fresh: "12 new", active: true },
  { label: "Logan Sq · condo · balcony", fresh: "4 new" },
  { label: "Evanston · near Purple Line" },
]

const marketRows = [
  { label: "Median list price", value: "$845,000" },
  { label: "Avg days on market", value: "14" },
  { label: "Median price / sq ft", value: "$512" },
  { label: "Active listings", value: "38" },
]

function ListingFacts({ listing }: { listing: Listing }) {
  return (
    <div className="flex items-center gap-3 font-code text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <BedDoubleIcon className="size-3.5" /> {listing.beds} bd
      </span>
      <span className="inline-flex items-center gap-1">
        <BathIcon className="size-3.5" /> {listing.baths} ba
      </span>
      <span className="inline-flex items-center gap-1">
        <RulerIcon className="size-3.5" /> {listing.sqft} sqft
      </span>
    </div>
  )
}

export default function Page() {
  const saved = listings[0]

  return (
    <EvalShell theme="light" dir="ltr">
      {/* Single AlertDialog root: the saved-listing heart in the grid is the
          trigger; the dialog is open on first paint for the static capture. */}
      <AlertDialog defaultOpen>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Sidebar */}
        <aside className="flex w-64 shrink-0 flex-col gap-6 border-e p-4">
          <div className="flex items-center gap-2.5 px-2 pt-1">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HouseIcon className="size-4" />
            </span>
            <span className="font-heading-2 text-lg font-semibold">
              Northline
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${
                  item.active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
                {item.count ? (
                  <span className="ms-auto font-code text-xs">
                    {item.count}
                  </span>
                ) : null}
              </span>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <p className="px-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Saved searches
            </p>
            {savedSearches.map((s) => (
              <span
                key={s.label}
                className={`flex flex-col gap-1 rounded-md border px-2.5 py-2 text-xs ${
                  s.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {s.label}
                {s.fresh ? (
                  <span className="font-code text-[11px] text-muted-foreground">
                    {s.fresh}
                  </span>
                ) : null}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2.5 rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-sm font-medium">Dana Whitfield</p>
                <p className="text-xs text-muted-foreground">Your agent</p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Message agent"
              >
                <MessageSquareIcon />
              </Button>
            </div>
            <p className="font-code text-[11px] text-muted-foreground">
              IL Lic. 471-022188
            </p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-6">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <div className="relative w-[380px]">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                defaultValue="Lincoln Park, Chicago, IL"
                aria-label="Search listings"
              />
            </div>
            <Button variant="outline">
              <SlidersHorizontalIcon /> Filters
            </Button>
            <Button>
              <BellIcon /> Save search
            </Button>
            <div className="ms-auto flex items-center gap-3">
              <Button variant="outline" size="icon" aria-label="Notifications">
                <BellIcon />
              </Button>
              <Avatar size="sm">
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Heading */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-heading-2 text-2xl font-semibold">
                Homes for sale in Lincoln Park
              </h1>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPinIcon className="size-3.5" /> North Side · Chicago, IL
                60614
              </p>
            </div>
            <p className="font-code text-xs text-muted-foreground">
              38 results · updated 4:02 PM CDT
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <Tabs defaultValue="for-sale">
              <TabsList>
                <TabsTrigger value="for-sale">For sale</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="sold">Sold</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="ms-auto">
              Sort: Newest <ChevronDownIcon />
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="Grid view">
              <LayoutGridIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="List view"
              className="text-muted-foreground"
            >
              <ListIcon />
            </Button>
          </div>

          {/* Listing grid */}
          <div className="grid flex-1 grid-cols-3 content-start gap-4">
            {listings.map((listing, i) => (
              <Card key={listing.id} className="gap-0 overflow-hidden py-0">
                <div className="relative h-36 border-b bg-muted">
                  <img
                    src={`https://picsum.photos/seed/${listing.seed}/640/400?grayscale`}
                    alt={listing.address}
                    className="size-full object-cover"
                  />
                  {i === 0 ? (
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="outline"
                          size="icon-xs"
                          aria-label="Remove 2145 N Halsted St from saved homes"
                          className="absolute top-2 right-2"
                        />
                      }
                    >
                      <HeartIcon className="fill-foreground text-foreground" />
                    </AlertDialogTrigger>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon-xs"
                      aria-label={`Save ${listing.address}`}
                      className="absolute top-2 right-2"
                    >
                      <HeartIcon />
                    </Button>
                  )}
                  <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-background px-1.5 py-0.5 font-code text-[10px] text-muted-foreground">
                    <CameraIcon className="size-3" /> {listing.photos}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-code text-base font-semibold">
                      {listing.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {listing.type}
                    </span>
                  </div>
                  <p className="text-sm">{listing.address}</p>
                  <ListingFacts listing={listing} />
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {listing.tags.map((tag) => (
                      <Badge
                        key={tag.label}
                        variant={tag.variant}
                        className={
                          tag.label === "Price cut $25,000"
                            ? "gap-1 font-code"
                            : undefined
                        }
                      >
                        {tag.label === "Price cut $25,000" ? (
                          <TrendingDownIcon />
                        ) : null}
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t pt-3">
            <p className="font-code text-xs text-muted-foreground">
              Showing 1–6 of 38 results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                disabled
                aria-label="Previous page"
              >
                <ChevronLeftIcon />
              </Button>
              <span className="font-code text-xs text-muted-foreground">
                Page 1 of 7
              </span>
              <Button variant="outline" size="icon-sm" aria-label="Next page">
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <aside className="flex w-80 shrink-0 flex-col gap-4 overflow-y-auto border-s p-6">
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Upcoming tours</CardTitle>
              <CardDescription className="text-xs">
                Booked with Dana Whitfield
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-code text-xs text-muted-foreground">
                    SAT JUN 14 · 11:00 AM
                  </span>
                  <Badge variant="outline" className="font-code">
                    NS-1041
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm">2145 N Halsted St, Unit 2B</p>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="xs">
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-muted-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-code text-xs text-muted-foreground">
                    SUN JUN 22 · 1:30 PM
                  </span>
                  <Badge variant="outline" className="font-code">
                    NS-1055
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm">812 W Webster Ave</p>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="xs">
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-muted-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Monthly estimate</CardTitle>
              <CardDescription className="text-xs">
                2145 N Halsted St · 20% down · 30-yr fixed
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Principal &amp; interest
                </span>
                <span className="font-code">$4,218</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Property taxes</span>
                <span className="font-code">$808</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Insurance</span>
                <span className="font-code">$148</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">HOA dues</span>
                <span className="font-code">$385</span>
              </div>
              <Separator className="my-1" />
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium">Est. monthly</span>
                <span className="font-code text-lg font-semibold">$5,559</span>
              </div>
            </CardContent>
            <CardFooter className="px-5">
              <Button className="w-full">Get pre-approved</Button>
            </CardFooter>
          </Card>

          <Card className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Market snapshot</CardTitle>
              <CardDescription className="text-xs">
                Lincoln Park · June 2026
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-5">
              {marketRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-code">{row.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Alert dialog content — open at initial render */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <HeartOffIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Remove this saved home?</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ll stop receiving price updates and open-house alerts
              for {saved.address} — currently listed at{" "}
              <span className="font-code">{saved.price}</span>. This
              won&apos;t cancel your Saturday 11:00 AM tour.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep saved</AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        </div>
      </AlertDialog>
    </EvalShell>
  )
}
