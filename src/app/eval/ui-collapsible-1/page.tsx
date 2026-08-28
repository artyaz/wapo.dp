"use client"
// EVAL page — collapsible p1 — personal recipe collection — 834x1112 light
// Collapsible front and center: recipe sections (ingredients / method /
// notes) plus collection groups in the library. Co-stars: Card, Badge,
// Button, Input, Progress, Separator.

import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  SoupIcon,
  CroissantIcon,
  MilkIcon,
  StarIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const sectionTrigger =
  "group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 [&[data-state=open]>svg]:rotate-180"

const raguIngredients = [
  { qty: "600 g", name: "beef chuck, hand-chopped" },
  { qty: "200 g", name: "pork shoulder, hand-chopped" },
  { qty: "1", name: "yellow onion, finely diced" },
  { qty: "2", name: "carrots, finely diced" },
  { qty: "2 stalks", name: "celery, finely diced" },
  { qty: "4 tbsp", name: "tomato paste" },
  { qty: "250 ml", name: "dry white wine" },
  { qty: "800 g", name: "canned San Marzano tomatoes" },
  { qty: "500 ml", name: "whole milk" },
  { qty: "400 g", name: "tagliatelle, egg" },
]

const raguSteps = [
  "Sear the chopped meats until deeply browned.",
  "Soften onion, carrot and celery over low heat, 15 min.",
  "Cook tomato paste until rust-red; deglaze with wine.",
  "Return the meat, add tomatoes, simmer for 3 hours.",
  "Add the milk; simmer 30 min until glossy and sweet.",
]

const weeknightDinners = [
  { name: "Miso butter ramen", time: "25 min", meta: "Cooked 12×" },
  { name: "Sheet-pan chicken & harissa", time: "40 min", meta: "Cooked 8×" },
  { name: "White bean & greens stew", time: "30 min", meta: "Cooked 6×" },
  { name: "Cacio e pepe for one", time: "15 min", meta: "Cooked 21×" },
]

const recentlyCooked = [
  { date: "Jun 11", name: "Miso butter ramen" },
  { date: "Jun 09", name: "Sunday ragù" },
  { date: "Jun 07", name: "Skillet cornbread" },
  { date: "Jun 05", name: "Chilled cucumber soup" },
]

function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[790px] flex-col gap-4 px-6 py-5">
        {/* App header */}
        <header className="flex items-center gap-4">
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Sage &amp; Skillet
            </h1>
            <p className="font-caption text-caption text-muted-foreground">
              My recipe collection · 47 recipes in 12 collections
            </p>
          </div>
          <div className="relative ml-auto w-56">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recipes, tags…"
              aria-label="Search recipes"
              className="pl-8"
            />
          </div>
          <Button size="sm">
            <PlusIcon />
            New recipe
          </Button>
        </header>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_264px] items-start gap-4">
          {/* Main column */}
          <div className="flex flex-col gap-4">
            {/* Featured recipe with collapsible sections */}
            <Card className="gap-3 py-4">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Nonna Rosa&apos;s Sunday Ragù
                </CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>Pasta · Sunday lunch</span>
                  <span className="font-code text-xs">3 hr 30 min</span>
                  <span className="font-code text-xs">serves 6</span>
                  <span className="flex items-center gap-1 font-code text-xs">
                    <StarIcon className="size-3.5" />
                    4.8
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-5">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className={sectionTrigger}>
                    Ingredients
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      10 items
                    </span>
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 px-2 pt-1 pb-2 text-sm">
                      {raguIngredients.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-baseline gap-3"
                        >
                          <span className="w-16 shrink-0 font-code text-xs text-muted-foreground">
                            {item.qty}
                          </span>
                          <span className="min-w-0 leading-snug text-foreground">
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className={sectionTrigger}>
                    Method
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      5 steps
                    </span>
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ol className="flex flex-col gap-2 px-2 pt-1 pb-2">
                      {raguSteps.map((step, i) => (
                        <li key={step} className="flex gap-3 text-sm">
                          <span className="w-4 shrink-0 text-right font-code text-xs leading-5 text-muted-foreground">
                            {i + 1}
                          </span>
                          <span className="leading-5 text-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible>
                  <CollapsibleTrigger className={sectionTrigger}>
                    Notes &amp; variations
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="px-2 pt-1 pb-2 text-sm text-muted-foreground">
                      Rosa&apos;s original used veal; I swap in pork shoulder.
                      Freezes beautifully for up to 3 months.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* Collections with collapsible groups */}
            <Card className="gap-2 py-4">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Collections</CardTitle>
                <CardDescription>
                  Tap a collection to browse its recipes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 px-5">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className={sectionTrigger}>
                    <SoupIcon className="size-4 shrink-0 text-muted-foreground" />
                    Weeknight dinners
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      12
                    </span>
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="flex flex-col pb-1">
                      {weeknightDinners.map((recipe) => (
                        <li
                          key={recipe.name}
                          className="flex items-center gap-3 rounded-md px-2 py-1 text-sm hover:bg-accent"
                        >
                          <span className="flex-1 truncate text-foreground">
                            {recipe.name}
                          </span>
                          <span className="font-caption text-caption text-muted-foreground">
                            {recipe.meta}
                          </span>
                          <span className="font-code text-xs text-muted-foreground">
                            {recipe.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible>
                  <CollapsibleTrigger className={sectionTrigger}>
                    <CroissantIcon className="size-4 shrink-0 text-muted-foreground" />
                    Sourdough &amp; baking
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      8
                    </span>
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="px-2 py-1 text-sm text-muted-foreground">
                      8 recipes
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
                <Collapsible>
                  <CollapsibleTrigger className={sectionTrigger}>
                    <MilkIcon className="size-4 shrink-0 text-muted-foreground" />
                    Summer preserves
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      5
                    </span>
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="px-2 py-1 text-sm text-muted-foreground">
                      5 recipes
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <Card className="gap-3 py-4">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">June in the kitchen</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Recipes cooked</dt>
                    <dd className="font-code text-xs text-foreground">11</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">New recipes</dt>
                    <dd className="font-code text-xs text-foreground">5</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Avg. rating</dt>
                    <dd className="font-code text-xs text-foreground">4.6</dd>
                  </div>
                </dl>
                <Separator />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Cookbook goal</span>
                    <span className="font-code text-xs text-foreground">
                      5 / 8
                    </span>
                  </div>
                  <Progress value={62} aria-label="Cookbook goal progress" />
                  <span className="font-caption text-caption text-muted-foreground">
                    5 of 8 new recipes tried this quarter
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-2 py-4">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Recently cooked</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 px-5">
                {recentlyCooked.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="truncate text-foreground">
                      {item.name}
                    </span>
                    <span className="shrink-0 font-code text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-2 py-4">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5 px-5">
                {[
                  "vegetarian",
                  "30-min",
                  "one-pot",
                  "pasta",
                  "summer",
                  "freezer-friendly",
                  "weekend",
                ].map((tag) => (
                  <Badge key={tag} variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Sage &amp; Skillet · synced from iCloud · last backup Jun 12, 06:40
          </span>
          <span className="font-code text-xs text-muted-foreground">v2.4.1</span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
