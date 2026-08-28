"use client"
// EVAL page — collapsible p3 — recipe meal-plan weekly planner — 768x1024 light
// Collapsible front and center: each day of the week expands to its planned
// meals, and the shopping list groups collapse by aisle. Co-stars: Card,
// Badge, Button, Checkbox, Progress, Separator.

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChefHatIcon,
  ShareIcon,
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const dayTrigger =
  "group flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 [&[data-state=open]>svg]:rotate-180"

type Meal = { time: string; label: string; recipe: string; tag?: string }

const days: {
  day: string
  date: string
  kcal: string
  open: boolean
  meals?: Meal[]
}[] = [
  {
    day: "Monday",
    date: "Jun 9",
    kcal: "1,940",
    open: true,
    meals: [
      { time: "07:30", label: "Breakfast", recipe: "Greek yogurt & honey bowl" },
      { time: "12:30", label: "Lunch", recipe: "Leftover white bean stew", tag: "Leftovers" },
      { time: "19:00", label: "Dinner", recipe: "Sheet-pan chicken & harissa", tag: "New" },
    ],
  },
  {
    day: "Tuesday",
    date: "Jun 10",
    kcal: "1,780",
    open: true,
    meals: [
      { time: "07:30", label: "Breakfast", recipe: "Sourdough toast, ricotta & figs" },
      { time: "12:30", label: "Lunch", recipe: "Cacio e pepe for one" },
      { time: "19:00", label: "Dinner", recipe: "Miso butter ramen" },
    ],
  },
  { day: "Wednesday", date: "Jun 11", kcal: "1,860", open: false },
  {
    day: "Thursday",
    date: "Jun 12",
    kcal: "2,020",
    open: true,
    meals: [
      { time: "07:30", label: "Breakfast", recipe: "Chilled cucumber soup", tag: "New" },
      { time: "12:30", label: "Lunch", recipe: "Delivered: Mixed poke bowl", tag: "Eating out" },
      { time: "19:00", label: "Dinner", recipe: "Sunday ragù, second night", tag: "Leftovers" },
    ],
  },
  { day: "Friday", date: "Jun 13", kcal: "—", open: false },
  { day: "Saturday", date: "Jun 14", kcal: "—", open: false },
  { day: "Sunday", date: "Jun 15", kcal: "2,110", open: false },
]

const shoppingGroups = [
  {
    name: "Produce",
    open: true,
    items: [
      { id: "p1", label: "2 bunches lacinato kale", checked: true },
      { id: "p2", label: "1.2 kg tomatoes, ripe", checked: false },
      { id: "p3", label: "4 lemons", checked: false },
      { id: "p4", label: "Fresh figs (8)", checked: true },
    ],
  },
  {
    name: "Pantry",
    open: true,
    items: [
      { id: "a1", label: "White miso, 500 g", checked: false },
      { id: "a2", label: "Harissa paste", checked: true },
      { id: "a3", label: "Tagliatelle, egg — 400 g", checked: false },
    ],
  },
  {
    name: "Proteins",
    open: false,
    items: [
      { id: "m1", label: "Chicken thighs, 1.5 kg", checked: false },
      { id: "m2", label: "Pork shoulder, 800 g", checked: false },
      { id: "m3", label: "Greek yogurt, 1 kg tub", checked: true },
      { id: "m4", label: "Pancetta, 150 g", checked: false },
    ],
  },
]

function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[724px] flex-col gap-4 px-5 py-4">
        {/* App header */}
        <header className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border">
            <ChefHatIcon className="size-4 text-foreground" />
          </span>
          <div>
            <h1 className="font-heading-3 text-heading-3 text-foreground">
              Kowalski Kitchen
            </h1>
            <p className="font-caption text-caption text-muted-foreground">
              Meal plan · serves 4 · week of Jun 9–15, 2026
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon-sm" aria-label="Previous week">
              <ChevronLeftIcon />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Next week">
              <ChevronRightIcon />
            </Button>
            <Button variant="outline" size="sm">
              <ShareIcon />
              Share
            </Button>
          </div>
        </header>

        {/* Week summary strip */}
        <Card className="gap-3 py-4">
          <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-caption text-caption text-muted-foreground">
                Meals planned
              </span>
              <span className="font-code text-sm text-foreground">18 / 21</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-caption text-caption text-muted-foreground">
                New recipes
              </span>
              <span className="font-code text-sm text-foreground">3</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-caption text-caption text-muted-foreground">
                Est. groceries
              </span>
              <span className="font-code text-sm text-foreground">$142.50</span>
            </div>
            <div className="ml-auto flex min-w-40 flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Week complete
                </span>
                <span className="font-code text-xs text-foreground">86%</span>
              </div>
              <Progress value={86} aria-label="Meals planned this week" />
            </div>
          </CardContent>
        </Card>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_230px] items-start gap-4">
          {/* Day list — each day a Collapsible */}
          <Card className="gap-2 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">This week&apos;s plan</CardTitle>
              <CardDescription>
                Open a day to review or swap meals
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-4">
              {days.map((day, i) => (
                <div key={day.day}>
                  {i > 0 && <Separator />}
                  <Collapsible defaultOpen={day.open}>
                    <CollapsibleTrigger className={dayTrigger}>
                      <span className="w-24 shrink-0 text-sm font-medium text-foreground">
                        {day.day}
                      </span>
                      <span className="font-code text-xs text-muted-foreground">
                        {day.date}
                      </span>
                      <span className="ml-auto font-code text-xs text-muted-foreground">
                        {day.kcal} kcal
                      </span>
                      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul className="flex flex-col px-2 pb-2">
                        {(day.meals ?? []).map((meal) => (
                          <li
                            key={meal.time}
                            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                          >
                            <span className="w-10 shrink-0 font-code text-xs text-muted-foreground">
                              {meal.time}
                            </span>
                            <span className="w-16 shrink-0 font-caption text-caption text-muted-foreground">
                              {meal.label}
                            </span>
                            <span className="flex-1 truncate text-foreground">
                              {meal.recipe}
                            </span>
                            {meal.tag && (
                              <Badge
                                variant="outline"
                                className="font-normal"
                              >
                                {meal.tag}
                              </Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rail */}
          <div className="flex flex-col gap-3">
            <Card className="gap-2 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Shopping list</CardTitle>
                <CardDescription>4 of 11 picked up</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 px-4">
                {shoppingGroups.map((group, i) => (
                  <div key={group.name}>
                    {i > 0 && <Separator />}
                    <Collapsible defaultOpen={group.open}>
                      <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 [&[data-state=open]>svg]:rotate-180">
                        {group.name}
                        <span className="font-code text-xs font-normal text-muted-foreground">
                          {group.items.length}
                        </span>
                        <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="flex flex-col gap-2 px-2 pt-1 pb-2">
                          {group.items.map((item) => (
                            <label
                              key={item.id}
                              className="flex cursor-pointer items-start gap-2.5"
                            >
                              <Checkbox
                                id={item.id}
                                defaultChecked={item.checked}
                                aria-label={item.label}
                              />
                              <span
                                className={`text-sm leading-snug ${
                                  item.checked
                                    ? "text-muted-foreground line-through"
                                    : "text-foreground"
                                }`}
                              >
                                {item.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Daily average</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 px-4 text-sm">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="font-code text-xs text-foreground">
                      1,926 / 2,100
                    </span>
                  </div>
                  <Progress value={92} aria-label="Average daily calories" />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Protein</span>
                  <span className="font-code text-xs text-foreground">96 g</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Fiber</span>
                  <span className="font-code text-xs text-foreground">31 g</span>
                </div>
                <span className="font-caption text-caption text-muted-foreground">
                  Averages across 6 planned days
                </span>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Synced to the family calendar · changes notify Marek &amp; Zofia
          </span>
          <span className="font-code text-xs text-muted-foreground">
            plan #W-24
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}

export default Page
