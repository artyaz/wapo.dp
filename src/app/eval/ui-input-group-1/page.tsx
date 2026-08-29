"use client";

/**
 * EVAL page — input-group p1 — personal recipe collection — 1920x1080 light
 *
 * Scenario: "Salt & Spine" — Mara's personal recipe collection on a big
 * desktop screen. Global search with ⌘K hint in the header, sidebar
 * collections + quick-add-to-shopping-list group, recipe toolbar with a
 * dropdown-in-group collection picker (open), max-time (icon + unit suffix)
 * and servings (prefix) groups, a 2×2 recipe grid, a "scale tonight's bake"
 * panel (prefix/suffix groups) and a pinned kitchen note (textarea group with
 * block-end action row). Co-stars: Card, Badge, Button, DropdownMenu, Kbd,
 * Progress, Separator, Avatar.
 */

import {
  ChefHat,
  ChevronDown,
  Clock,
  Flame,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Thermometer,
  UtensilsCrossed,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const COLLECTIONS = [
  { name: "Weeknight dinners", count: 32, active: true },
  { name: "Baking projects", count: 18 },
  { name: "Slow Sundays", count: 12 },
  { name: "Vegetarian", count: 24 },
  { name: "Guest-worthy", count: 9 },
];

const TAGS = ["under 30 min", "one pan", "freezer-friendly", "sourdough"];

const RECIPES = [
  {
    name: "Focaccia di Recco",
    collection: "Baking",
    time: "35 min",
    serves: "serves 4",
    kcal: "620 kcal",
    stock: 100,
    cooked: "Cooked 6×",
    note: "Twin sheets of paper-thin dough, stracchino and a hard flash of oven heat.",
  },
  {
    name: "Charred lemon risotto",
    collection: "Weeknight",
    time: "40 min",
    serves: "serves 2",
    kcal: "540 kcal",
    stock: 75,
    cooked: "Cooked 11×",
    note: "Carnaroli rice and blistered lemon halves, finished off-heat with cold butter.",
  },
  {
    name: "Miso-glazed eggplant",
    collection: "Vegetarian",
    time: "25 min",
    serves: "serves 4",
    kcal: "410 kcal",
    stock: 60,
    cooked: "Cooked 4×",
    note: "White miso, mirin and a touch of honey under the broiler until lacquered.",
  },
  {
    name: "Sunday ragù alla bolognese",
    collection: "Slow Sundays",
    time: "4 hr",
    serves: "serves 8",
    kcal: "780 kcal",
    stock: 40,
    cooked: "Cooked 2×",
    note: "Four hours at the barest simmer — milk, wine, patience. Freezes beautifully.",
  },
];

const AMOUNTS: Array<[string, string]> = [
  ["00 flour", "480 g"],
  ["stracchino", "300 g"],
  ["extra-virgin olive oil", "120 ml"],
  ["fine sea salt", "12 g"],
];

const LABEL_CLASS =
  "text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="bg-background text-foreground flex h-screen flex-col">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-card flex size-8 items-center justify-center rounded-md border">
              <ChefHat className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Salt &amp; Spine</p>
              <p className={LABEL_CLASS}>Mara&apos;s kitchen log</p>
            </div>
          </div>

          <InputGroup className="mx-auto w-[420px]">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search recipes, notes, ingredients…"
              aria-label="Search your collection"
            />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="size-4" />
              Import
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New recipe
            </Button>
            <Avatar>
              <AvatarFallback className="bg-muted text-xs font-medium">
                MK
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className="flex w-60 shrink-0 flex-col gap-4 border-e px-4 py-5">
            <div>
              <p className={LABEL_CLASS}>Collections</p>
              <nav className="mt-2 flex flex-col">
                {COLLECTIONS.map((c) => (
                  <button
                    key={c.name}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm ${
                      c.active
                        ? "bg-muted font-medium"
                        : "text-muted-foreground hover:bg-muted/60"
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="font-code text-xs">{c.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            <Separator />

            <div>
              <p className={LABEL_CLASS}>Tags</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {TAGS.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="font-code text-[10px]"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2.5">
              <Separator />
              <div>
                <p className={LABEL_CLASS}>Quick add to list</p>
                <InputGroup className="mt-2">
                  <InputGroupInput
                    defaultValue="250"
                    inputMode="numeric"
                    aria-label="Quantity"
                    className="w-14 shrink-0 px-2 font-code"
                  />
                  <InputGroupAddon className="px-0">g</InputGroupAddon>
                  <InputGroupInput
                    placeholder="flour"
                    aria-label="Ingredient"
                    className="px-2"
                  />
                  <InputGroupAddon align="inline-end" className="pe-1.5">
                    <InputGroupButton
                      variant="secondary"
                      size="icon-xs"
                      aria-label="Add to shopping list"
                    >
                      <Plus />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
                148 recipes · 12 collections
              </p>
            </div>
          </aside>

          {/* ── Main ──────────────────────────────────────────────── */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 px-6 py-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-heading-1 text-heading-1">
                  Your kitchen log
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Last cooked today — Focaccia di Recco, crisp as ever.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-code">
                  148 recipes
                </Badge>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="size-4" />
                  Bulk edit
                </Button>
              </div>
            </div>

            {/* ── Filter toolbar ─────────────────────────────────── */}
            <div className="flex items-center gap-3">
              <InputGroup className="flex-1">
                <InputGroupAddon>
                  <Search className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Filter recipes…"
                  aria-label="Filter recipes"
                />
                <InputGroupAddon align="inline-end" className="pe-1.5">
                  <DropdownMenu defaultOpen>
                    <DropdownMenuTrigger
                      render={
                        <InputGroupButton variant="ghost" size="sm">
                          All collections
                          <ChevronDown className="size-3.5" />
                        </InputGroupButton>
                      }
                    />
                    <DropdownMenuContent align="end" sideOffset={8}>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>All collections</DropdownMenuItem>
                        <DropdownMenuItem>Weeknight dinners</DropdownMenuItem>
                        <DropdownMenuItem>Baking projects</DropdownMenuItem>
                        <DropdownMenuItem>Slow Sundays</DropdownMenuItem>
                        <DropdownMenuItem>Vegetarian</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup className="w-40">
                <InputGroupAddon>
                  <Clock className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  defaultValue="45"
                  inputMode="numeric"
                  aria-label="Maximum total time"
                  className="font-code"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="font-code text-xs">
                    min
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup className="w-36">
                <InputGroupAddon>
                  <InputGroupText className="text-xs">serves</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  defaultValue="4"
                  inputMode="numeric"
                  aria-label="Servings"
                  className="font-code"
                />
              </InputGroup>
            </div>

            {/* ── Content grid ───────────────────────────────────── */}
            <div className="grid min-h-0 flex-1 grid-cols-12 gap-5">
              <div className="col-span-8 grid grid-cols-2 gap-5">
                {RECIPES.map((r) => (
                  <Card key={r.name} className="gap-3 py-4">
                    <CardHeader className="px-5">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-heading-3 text-heading-3">
                          {r.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="shrink-0 font-code text-[10px]"
                        >
                          {r.collection}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {r.note}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 px-5">
                      <p className="text-muted-foreground flex items-center gap-3 font-code text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {r.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <UtensilsCrossed className="size-3.5" />
                          {r.serves}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="size-3.5" />
                          {r.kcal}
                        </span>
                      </p>
                      <div className="flex items-center gap-2.5">
                        <Progress value={r.stock} className="h-1.5 flex-1" />
                        <span className="text-muted-foreground w-[74px] shrink-0 text-right font-code text-[11px]">
                          {r.stock}% pantry
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <Star className="size-3.5" />
                          {r.cooked}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="col-span-4 flex flex-col gap-5">
                <Card className="gap-3 py-4">
                  <CardHeader className="px-5">
                    <CardTitle className="font-heading-3 text-heading-3">
                      Scale tonight&apos;s bake
                    </CardTitle>
                    <CardDescription>
                      Focaccia di Recco — auto-scaled from the master recipe.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 px-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="scale-serves"
                          className="text-xs font-medium"
                        >
                          Batch size
                        </label>
                        <InputGroup>
                          <InputGroupAddon>
                            <InputGroupText className="text-xs">
                              serves
                            </InputGroupText>
                          </InputGroupAddon>
                          <InputGroupInput
                            id="scale-serves"
                            defaultValue="6"
                            inputMode="numeric"
                            className="font-code"
                          />
                        </InputGroup>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="scale-oven"
                          className="text-xs font-medium"
                        >
                          Oven
                        </label>
                        <InputGroup>
                          <InputGroupAddon>
                            <Thermometer className="size-4" />
                          </InputGroupAddon>
                          <InputGroupInput
                            id="scale-oven"
                            defaultValue="500"
                            inputMode="numeric"
                            className="font-code"
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupText className="font-code text-xs">
                              °F
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    </div>
                    <Separator />
                    <ul className="flex flex-col gap-1.5 font-code text-code">
                      {AMOUNTS.map(([ingredient, amount]) => (
                        <li
                          key={ingredient}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <span className="text-muted-foreground truncate">
                            {ingredient}
                          </span>
                          <span>{amount}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground text-xs">
                      Scaled from serves 4 · hydration stays at 68%
                    </p>
                  </CardContent>
                  <CardFooter className="gap-2 px-5">
                    <Button size="sm">Apply to shopping list</Button>
                    <Button variant="ghost" size="sm">
                      Reset
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="gap-3 py-4">
                  <CardHeader className="px-5">
                    <CardTitle className="font-heading-3 text-heading-3">
                      Pin a note
                    </CardTitle>
                    <CardDescription>
                      Notes attach to the recipe you last cooked.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-5">
                    <InputGroup className="h-auto">
                      <InputGroupTextarea
                        placeholder="Double the lemon next time; finish with chive oil…"
                        aria-label="Kitchen note"
                      />
                      <InputGroupAddon
                        align="block-end"
                        className="border-t py-1.5"
                      >
                        <InputGroupText className="font-code text-xs">
                          0/280
                        </InputGroupText>
                        <InputGroupButton
                          variant="default"
                          size="sm"
                          className="ms-auto"
                        >
                          Save note
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="text-muted-foreground flex h-9 shrink-0 items-center justify-between border-t px-6 font-code text-[10px] uppercase tracking-[0.12em]">
          <span>Synced from Paprika · 3 cookbooks imported</span>
          <span>Last edit 18:42 — Focaccia di Recco</span>
        </footer>
      </div>
    </EvalShell>
  );
}
