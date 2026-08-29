"use client"

// EVAL page — separator p2 — recipe meal-plan weekly planner — 1920x1080 dark

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  ShoppingBasket,
  Sparkles,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Meal = {
  slot: string
  name: string
  meta: string
  badge?: string
}

type Day = {
  weekday: string
  date: string
  today?: boolean
  meals: Meal[]
}

const WEEK: Day[] = [
  {
    weekday: "Mon",
    date: "12",
    meals: [
      { slot: "Breakfast", name: "Overnight oats & berries", meta: "5 MIN · 320 KCAL" },
      { slot: "Lunch", name: "Lemon orzo soup", meta: "25 MIN · 430 KCAL" },
      { slot: "Dinner", name: "Sheet-pan harissa salmon", meta: "35 MIN · 640 KCAL" },
    ],
  },
  {
    weekday: "Tue",
    date: "13",
    meals: [
      { slot: "Breakfast", name: "Soft eggs & rye soldiers", meta: "12 MIN · 340 KCAL" },
      { slot: "Lunch", name: "Halloumi & freekeh salad", meta: "18 MIN · 510 KCAL" },
      { slot: "Dinner", name: "Chicken adobo & rice", meta: "45 MIN · 680 KCAL" },
    ],
  },
  {
    weekday: "Wed",
    date: "14",
    today: true,
    meals: [
      { slot: "Breakfast", name: "Yogurt & honey toast", meta: "8 MIN · 290 KCAL" },
      { slot: "Lunch", name: "Turkey club wraps", meta: "15 MIN · 580 KCAL" },
      { slot: "Dinner", name: "Smash burgers & slaw", meta: "25 MIN · 720 KCAL" },
    ],
  },
  {
    weekday: "Thu",
    date: "15",
    meals: [
      { slot: "Breakfast", name: "Chia pudding & pear", meta: "5 MIN · 280 KCAL" },
      { slot: "Lunch", name: "Miso butter noodles", meta: "20 MIN · 540 KCAL" },
      { slot: "Dinner", name: "Mushroom ragù pappardelle", meta: "40 MIN · 710 KCAL" },
    ],
  },
  {
    weekday: "Fri",
    date: "16",
    meals: [
      { slot: "Breakfast", name: "PB & banana toast", meta: "6 MIN · 360 KCAL" },
      { slot: "Lunch", name: "Carrot & tahini rolls", meta: "12 MIN · 460 KCAL" },
      {
        slot: "Dinner",
        name: "Tacos Verde · takeout",
        meta: "7:30 PM · RESERVED",
        badge: "Eating out",
      },
    ],
  },
  {
    weekday: "Sat",
    date: "17",
    meals: [
      { slot: "Breakfast", name: "Smoked salmon bagel", meta: "10 MIN · 420 KCAL" },
      { slot: "Lunch", name: "Tomato galette & greens", meta: "30 MIN · 520 KCAL" },
      { slot: "Dinner", name: "Za'atar roast chicken", meta: "50 MIN · 630 KCAL" },
    ],
  },
  {
    weekday: "Sun",
    date: "18",
    meals: [
      { slot: "Breakfast", name: "Cottage cheese & peach", meta: "5 MIN · 310 KCAL" },
      { slot: "Lunch", name: "Leftover galette & greens", meta: "8 MIN · 500 KCAL" },
      {
        slot: "Dinner",
        name: "Batch cook · coconut dal",
        meta: "30 MIN · 4 PORTIONS",
      },
    ],
  },
]

const LIBRARY = [
  { name: "Chana masala & jeera rice", cuisine: "Indian", time: "35 MIN" },
  { name: "Miso-glazed aubergine bowls", cuisine: "Japanese", time: "30 MIN" },
  { name: "Black bean tacos & lime crema", cuisine: "Mexican", time: "20 MIN" },
  { name: "Frittata with herbs & feta", cuisine: "Mediterranean", time: "25 MIN" },
  { name: "Ribollita bean soup", cuisine: "Italian", time: "40 MIN" },
  { name: "Gochujang tofu bibimbap", cuisine: "Korean", time: "35 MIN" },
  { name: "Shakshuka with halloumi toast", cuisine: "Middle Eastern", time: "25 MIN" },
  { name: "Cod & chorizo stew", cuisine: "Spanish", time: "35 MIN" },
]

const GROCERIES = [
  {
    aisle: "Produce",
    count: "2 items",
    items: [
      { name: "Baby spinach", qty: "200 G", checked: true },
      { name: "Cherry tomatoes", qty: "500 G", checked: false },
    ],
  },
  {
    aisle: "Proteins",
    count: "2 items",
    items: [
      { name: "Salmon fillets", qty: "600 G", checked: false },
      { name: "Halloumi", qty: "225 G", checked: true },
    ],
  },
  {
    aisle: "Pantry",
    count: "2 items",
    items: [
      { name: "Harissa paste", qty: "1 JAR", checked: true },
      { name: "Flatbreads", qty: "×6", checked: false },
    ],
  },
]

const NUTRITION = [
  { label: "Protein", value: "96 / 117 G", share: 82 },
  { label: "Carbohydrates", value: "210 / 330 G", share: 64 },
  { label: "Fiber", value: "27 / 35 G", share: 78 },
]

const HEADER_STATS = [
  { label: "21 meals planned" },
  { label: "6 h 45 m cook time" },
  { label: "$142.60 est. groceries" },
  { label: "0 open slots" },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function MealBlock({ meal }: { meal: Meal }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-caption font-caption text-muted-foreground">
        {meal.slot}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
          {meal.name}
        </p>
        {meal.badge ? <Badge variant="secondary">{meal.badge}</Badge> : null}
      </div>
      <p className="truncate font-code text-xs text-muted-foreground">
        {meal.meta}
      </p>
    </div>
  )
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full flex-col bg-default-background">
        {/* Header */}
        <header className="flex items-center gap-6 border-b border-default-border px-6 py-3.5">
          <div className="w-64 shrink-0">
            <p className="font-heading-3 text-heading-3 text-foreground">
              Simmerstone
            </p>
            <p className="text-caption font-caption text-muted-foreground">
              Household meal planning
            </p>
          </div>

          {/* Week navigation */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" aria-label="Previous week">
              <ChevronLeft />
            </Button>
            <div className="min-w-[210px] text-center">
              <p className="font-heading-2 text-heading-2 text-foreground">
                Week 3 · January 12–18
              </p>
              <p className="text-caption font-caption text-muted-foreground">
                2026 · Winter rotation
              </p>
            </div>
            <Button variant="outline" size="icon-sm" aria-label="Next week">
              <ChevronRight />
            </Button>
          </div>

          {/* Week meta separated by vertical separators */}
          <div className="flex items-center gap-4">
            {HEADER_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 ? <Separator orientation="vertical" className="h-4" /> : null}
                <span className="text-caption font-caption text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="ms-auto flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Avatar size="sm">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <p className="text-caption font-caption text-muted-foreground">
                3 members
              </p>
            </div>
            <Button variant="outline">
              <Copy />
              Copy last week
            </Button>
            <Button>
              <ShoppingBasket />
              Generate groceries
            </Button>
          </div>
        </header>

        {/* Body */}
        <div className="flex min-h-0 flex-1 gap-6 p-6">
          {/* Left: recipe library */}
          <Card className="w-64 shrink-0 gap-0 rounded-lg py-0 shadow-none">
            <CardHeader className="border-b border-default-border px-5 py-4 [.border-b]:pb-4">
              <CardTitle className="font-heading-3 text-heading-3">
                Recipe library
              </CardTitle>
              <CardDescription>6 saved · winter rotation</CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col overflow-auto px-5 py-4">
              {LIBRARY.map((recipe, i) => (
                <div key={recipe.name} className="flex flex-col">
                  {i > 0 ? <Separator /> : null}
                  <div className="flex flex-col gap-1 py-3">
                    <p className="truncate text-sm font-medium text-foreground">
                      {recipe.name}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline">{recipe.cuisine}</Badge>
                      <span className="font-code text-xs text-muted-foreground">
                        {recipe.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="border-t border-default-border px-5 py-4">
              <Button variant="outline" className="w-full">
                <Plus />
                New recipe
              </Button>
            </div>
          </Card>

          {/* Center: the week planner — day columns divided by vertical separators */}
          <div className="flex min-w-0 flex-1 items-stretch rounded-lg border border-default-border bg-card">
            {WEEK.map((day, i) => (
              <div key={day.date} className="flex min-w-0 flex-1 items-stretch">
                {/* Vertical separator dividing the day columns */}
                {i > 0 ? <Separator orientation="vertical" /> : null}
                <div
                  className={`flex min-w-0 flex-1 flex-col px-4 py-4 ${
                    day.today ? "bg-muted/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <p className="text-caption font-caption text-muted-foreground">
                        {day.weekday}
                      </p>
                      <p className="font-code text-code text-foreground">
                        {day.date}
                      </p>
                    </div>
                    {day.today ? <Badge variant="secondary">Today</Badge> : null}
                  </div>
                  <Separator className="mt-3" />
                  <div className="flex flex-1 flex-col py-3">
                    {day.meals.map((meal, j) => (
                      <div key={meal.slot} className="flex flex-col">
                        {j > 0 ? <Separator /> : null}
                        <div className="py-3">
                          <MealBlock meal={meal} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right rail */}
          <div className="flex w-80 shrink-0 flex-col gap-6">
            {/* Grocery list */}
            <Card className="gap-0 rounded-lg py-0 shadow-none">
              <CardHeader className="px-5 py-3">
                <CardTitle className="font-heading-3 text-heading-3">
                  Grocery list
                </CardTitle>
                <CardDescription>
                  Week 3 · 6 items · 3 checked off
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col px-5 pb-5">
                {GROCERIES.map((group, i) => (
                  <div key={group.aisle} className="flex flex-col">
                    {i > 0 ? <Separator className="mb-2" /> : null}
                    {/* Labeled aisle group anchored by a hairline separator */}
                    <div className="flex items-center gap-2 py-2">
                      <p className="text-caption font-caption font-medium text-muted-foreground">
                        {group.aisle.toUpperCase()}
                      </p>
                      <Separator className="flex-1" />
                      <p className="font-code text-xs text-muted-foreground">
                        {group.count}
                      </p>
                    </div>
                    {group.items.map((item) => (
                      <label
                        key={item.name}
                        className="flex cursor-pointer items-center gap-2.5 py-1"
                      >
                        <Checkbox defaultChecked={item.checked} />
                        <span
                          className={`flex-1 text-sm ${
                            item.checked
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="font-code text-xs text-muted-foreground">
                          {item.qty}
                        </span>
                      </label>
                    ))}
                  </div>
                ))}
                <Separator className="mt-3" />
                <div className="flex items-center justify-between pt-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      Estimated total
                    </span>
                    <span className="text-caption font-caption text-muted-foreground">
                      Prices from Grocer&nbsp;Co.
                    </span>
                  </div>
                  <span className="font-code text-code text-foreground">
                    $142.60
                  </span>
                </div>
                <Button className="mt-3 w-full">
                  <ShoppingBasket />
                  Send to store
                </Button>
              </CardContent>
            </Card>

            {/* Nutrition balance */}
            <Card className="gap-0 rounded-lg py-0 shadow-none">
              <CardHeader className="px-5 py-3">
                <CardTitle className="flex items-center gap-2 font-heading-3 text-heading-3">
                  <Sparkles className="size-4 text-muted-foreground" />
                  Nutrition balance
                </CardTitle>
                <CardDescription>
                  Daily average vs. targets · week 3
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col px-5 pb-4">
                {NUTRITION.map((nutrient, i) => (
                  <div key={nutrient.label} className="flex flex-col">
                    {i > 0 ? <Separator /> : null}
                    <div className="flex flex-col gap-1.5 py-2.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-foreground">
                          {nutrient.label}
                        </span>
                        <span className="font-code text-code text-foreground">
                          {nutrient.value}
                        </span>
                      </div>
                      <Progress
                        value={nutrient.share}
                        aria-label={`${nutrient.label} versus target`}
                      />
                    </div>
                  </div>
                ))}
                <Separator />
                <p className="pt-2.5 text-caption font-caption text-muted-foreground">
                  Targets from your meal profile · updated Jan 8
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-default-border px-6 py-3">
          <p className="text-caption font-caption text-muted-foreground">
            Simmerstone Kitchen · Week 3 plan · draft v3
          </p>
          <div className="flex items-center gap-3">
            <p className="font-code text-xs text-muted-foreground">
              Prices synced 4 min ago
            </p>
            <Badge variant="outline">Shared with 2 members</Badge>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
