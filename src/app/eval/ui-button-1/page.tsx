"use client"

// EVAL page — button p1 — photography portfolio site — 1180x820 dark
// Button hierarchy (primary / outline / ghost / quiet-destructive / loading /
// icon buttons) + AspectRatio, Card, Badge, DropdownMenu, Spinner.

import {
  Aperture,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Download,
  Heart,
  Images,
  LayoutGrid,
  Rows3,
  Search,
  Send,
  Trash2,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"

const NAV = [
  { label: "Portfolio", active: true },
  { label: "Series", active: false },
  { label: "Journal", active: false },
  { label: "About", active: false },
]

const WORK = [
  {
    title: "Ebb tide",
    place: "Reine, Lofoten",
    exif: "38mm · f/5.6 · 1/125",
    favourite: false,
    isNew: true,
  },
  {
    title: "Harbour lights",
    place: "Å, Norway",
    exif: "80mm · f/4 · 1/60",
    favourite: false,
    isNew: false,
  },
  {
    title: "Whiteout study",
    place: "Nusfjord",
    exif: "24mm · f/8 · 1/500",
    favourite: true,
    isNew: false,
  },
  {
    title: "Kelp II",
    place: "Uttakleiv beach",
    exif: "120mm · f/11 · 1/15",
    favourite: false,
    isNew: false,
  },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col">
        {/* Site header */}
        <header className="flex h-16 shrink-0 items-center gap-6 border-b px-6">
          <div className="flex items-baseline gap-3">
            <p className="font-heading-3 text-heading-3 text-foreground">
              Mara Lindqvist
            </p>
            <p className="text-caption font-caption text-muted-foreground">
              Fine-art photography
            </p>
          </div>
          <nav className="flex items-center gap-1" aria-label="Main">
            {NAV.map((item) => (
              <Button
                key={item.label}
                size="sm"
                variant={item.active ? "secondary" : "ghost"}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" aria-label="Search the archive">
              <Search />
            </Button>
            <Button variant="outline" size="sm">
              Client area
            </Button>
            <Button size="sm">Book a session</Button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-5 px-6 py-5">
          {/* Featured series */}
          <section
            aria-label="Featured series"
            className="grid grid-cols-[1.25fr_1fr] items-stretch gap-6"
          >
            <div className="flex flex-col justify-center gap-3">
              <Badge variant="outline" className="w-fit">
                <Aperture /> Featured series · 24 photographs
              </Badge>
              <h1 className="font-heading-1 text-heading-1 text-foreground">
                Salt &amp; Stone
              </h1>
              <p className="text-caption font-caption text-muted-foreground">
                Lofoten Islands · 4&ndash;18 March 2026 · Fotografiens Hus, Oslo
              </p>
              <p className="max-w-[52ch] text-sm text-muted-foreground">
                Black sand, winter light and the tideline between storm fronts
                &mdash; a slow study of the Lofoten coast over eleven days of
                settled high pressure.
              </p>
              <p className="font-code text-xs text-muted-foreground">
                Hasselblad 907X · 38mm · f/5.6 · ISO 64
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Button size="lg">
                  View the series <ArrowRight />
                </Button>
                <Button variant="outline" size="lg">
                  <Images /> Series index
                </Button>
                <Button variant="ghost" size="lg">
                  <Download /> Press kit
                </Button>
              </div>
            </div>
            <div>
              <AspectRatio
                ratio={16 / 10}
                className="overflow-hidden rounded-lg border bg-neutral-200"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Aperture className="size-10 text-neutral-500" />
                </div>
                <p className="absolute bottom-2.5 start-3 font-code text-xs text-neutral-500">
                  SALT_STONE_011 · HAMNØY 04:12
                </p>
              </AspectRatio>
            </div>
          </section>

          {/* Latest work */}
          <section aria-label="Latest work" className="flex flex-col gap-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading-2 text-heading-2 text-foreground">
                  Latest work
                </h2>
                <p className="text-caption font-caption text-muted-foreground">
                  148 photographs · updated Friday 14 March
                </p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu defaultOpen>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline" size="sm">
                        Newest first <ChevronDown />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup defaultValue="newest">
                      <DropdownMenuRadioItem value="newest">
                        Newest first
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="awarded">
                        Most awarded
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="favourites">
                        Client favourites
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioItem value="random">
                      Random order
                    </DropdownMenuRadioItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="secondary" size="icon-sm" aria-label="Grid view">
                  <LayoutGrid />
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="List view">
                  <Rows3 />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {WORK.map((item) => (
                <Card key={item.title} className="gap-0 overflow-hidden py-0">
                  <AspectRatio
                    ratio={3 / 2}
                    className="overflow-hidden rounded-none border-0 bg-neutral-200"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Aperture className="size-6 text-neutral-500" />
                    </div>
                    {item.isNew && (
                      <Badge variant="secondary" className="absolute start-2 top-2">
                        New
                      </Badge>
                    )}
                  </AspectRatio>
                  <CardContent className="flex items-start justify-between gap-2 px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="truncate text-caption font-caption text-muted-foreground">
                        {item.place}
                      </p>
                      <p className="mt-1 font-code text-xs text-muted-foreground">
                        {item.exif}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={
                        item.favourite
                          ? `Remove ${item.title} from favourites`
                          : `Add ${item.title} to favourites`
                      }
                    >
                      <Heart
                        className={
                          item.favourite
                            ? "fill-neutral-600 text-neutral-600"
                            : undefined
                        }
                      />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-2">
              <p className="font-code text-xs text-muted-foreground">
                &copy; 2026 Mara Lindqvist — all photographs rights-managed
              </p>
              <Button variant="ghost" size="xs">
                <ArrowUp /> Back to top
              </Button>
            </div>
          </section>
        </main>

        {/* Client proofing strip */}
        <footer className="flex shrink-0 items-center justify-between gap-4 border-t bg-card px-6 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              Bergstr&ouml;m wedding &mdash; proofing gallery
            </p>
            <p className="truncate text-caption font-caption text-muted-foreground">
              312 photos · 27 favourites · syncs live to client
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" disabled aria-live="polite">
              <Spinner className="size-3.5" /> Preparing download&hellip;
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 /> Clear favourites
            </Button>
            <Button size="sm">
              <Send /> Send selection
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
