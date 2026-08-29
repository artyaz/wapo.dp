"use client"
// EVAL page — label p1 — personal recipe collection — 1280x800 dark
// Label front and center: form labels with required marks, optional hints,
// character counts, checkbox/radio/switch label rows, filter labels.
// Co-stars: Input, Textarea, Select, Checkbox, RadioGroup, Switch, Button,
// Card, Badge, Progress, Separator, Avatar.

import { CookingPot, Plus, Save } from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const collections = [
  { name: "All recipes", count: 128, active: true },
  { name: "Weeknight", count: 24, active: false },
  { name: "Baking", count: 31, active: false },
  { name: "Sunday projects", count: 9, active: false },
  { name: "To try", count: 17, active: false },
]

const cuisines = [
  { label: "Italian", value: "italian" },
  { label: "Japanese", value: "japanese" },
  { label: "Japanese-Italian", value: "fusion" },
  { label: "Mexican", value: "mexican" },
]

const dietary = [
  { id: "diet-weeknight", label: "Weeknight-friendly", checked: true },
  { id: "diet-vegetarian", label: "Vegetarian", checked: false },
  { id: "diet-freezer", label: "Freezer-friendly", checked: true },
  { id: "diet-spicy", label: "Spicy", checked: false },
]

const recent = [
  { name: "Brown butter banana bread", added: "Nov 12", tag: "Baking" },
  { name: "Dry-fried green beans", added: "Nov 10", tag: "Weeknight" },
  { name: "No-knead focaccia", added: "Nov 08", tag: "Baking" },
]

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-foreground">
      *
    </span>
  )
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1160px] flex-col gap-5 px-6 py-5">
        {/* App header */}
        <header className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg border">
            <CookingPot className="size-4 text-foreground" />
          </span>
          <span className="font-heading-3 text-heading-3 text-foreground">
            Mise
          </span>
          <span className="font-caption text-caption text-muted-foreground">
            personal recipe collection
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-code text-xs text-muted-foreground">
              128 recipes
            </span>
            <Avatar>
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <Button size="sm">
              <Save />
              Save draft
            </Button>
          </div>
        </header>

        {/* Page title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              New recipe
            </h1>
            <p className="mt-1 font-caption text-caption text-muted-foreground">
              Draft · autosaved 20:14 · last edited on iPad
            </p>
          </div>
          <Badge variant="outline" className="font-code font-normal">
            draft #129
          </Badge>
        </div>

        <div className="grid flex-1 grid-cols-[212px_minmax(0,1fr)_276px] items-start gap-5">
          {/* ---- Collections rail ---- */}
          <nav className="flex flex-col gap-1 rounded-lg border p-2">
            <p className="px-2 pt-1 pb-2 font-caption text-caption text-muted-foreground">
              Collections
            </p>
            {collections.map((c) => (
              <div
                key={c.name}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${
                  c.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <span>{c.name}</span>
                <span className="font-code text-xs text-muted-foreground">
                  {c.count}
                </span>
              </div>
            ))}
            <Separator className="my-1" />
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Plus />
              New collection
            </Button>
          </nav>

          {/* ---- Recipe editor ---- */}
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">Recipe details</CardTitle>
              <CardDescription>
                Fields marked * are required before a recipe joins the
                collection.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="recipe-title">
                  Recipe title
                  <RequiredMark />
                </Label>
                <Input
                  id="recipe-title"
                  defaultValue="Weeknight Miso Carbonara"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="recipe-source">
                  Source
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="recipe-source"
                  defaultValue="Adapted from Bon Appétit, March 2019"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="recipe-headnote">
                  Headnote
                  <span className="font-code text-xs font-normal text-muted-foreground">
                    142 / 280
                  </span>
                </Label>
                <Textarea
                  id="recipe-headnote"
                  rows={2}
                  defaultValue="A 20-minute carbonara where white miso stands in for half the pecorino — deeper umami, silkier sauce, no eggs scrambling on a Tuesday."
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="prep-time">
                    Prep (min)
                    <RequiredMark />
                  </Label>
                  <Input id="prep-time" defaultValue="10" className="font-code" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cook-time">Cook (min)</Label>
                  <Input id="cook-time" defaultValue="12" className="font-code" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input id="servings" defaultValue="2" className="font-code" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="recipe-cuisine">Cuisine</Label>
                <Select items={cuisines} defaultValue="fusion">
                  <SelectTrigger id="recipe-cuisine" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cuisines.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex flex-col gap-2.5">
                <Label>Dietary tags</Label>
                <div className="grid grid-cols-2 gap-2.5">
                  {dietary.map((d) => (
                    <div key={d.id} className="flex items-center gap-2">
                      <Checkbox id={d.id} defaultChecked={d.checked} />
                      <Label htmlFor={d.id} className="font-normal">
                        {d.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <Label>Effort</Label>
                <RadioGroup
                  defaultValue="medium"
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "project", label: "Weekend project" },
                  ].map((r) => (
                    <div key={r.value} className="flex items-center gap-2">
                      <RadioGroupItem id={`effort-${r.value}`} value={r.value} />
                      <Label
                        htmlFor={`effort-${r.value}`}
                        className="font-normal"
                      >
                        {r.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="share-family">Share with family</Label>
                  <span className="font-caption text-caption text-muted-foreground">
                    Mom and Sam can view and cook this draft.
                  </span>
                </div>
                <Switch id="share-family" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* ---- Status rail ---- */}
          <div className="flex flex-col gap-5">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Draft status</CardTitle>
                <CardDescription>3 fields missing.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-muted-foreground">
                    Completeness
                  </span>
                  <span className="font-code text-xs text-foreground">
                    70%
                  </span>
                </div>
                <Progress value={70} aria-label="Draft completeness" />
                <ul className="flex flex-col gap-1.5 pt-1">
                  {["Photo", "Oven temperature", "Ingredient weights"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-caption text-caption text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="size-1 rounded-full bg-muted-foreground"
                        />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="text-sm">Recently added</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                {recent.map((r) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">
                        {r.name}
                      </p>
                      <p className="font-code text-xs text-muted-foreground">
                        added {r.added}
                      </p>
                    </div>
                    <Badge variant="secondary">{r.tag}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t pt-3">
          <span className="font-caption text-caption text-muted-foreground">
            Mise — your recipes sync across iPhone, iPad and the kitchen laptop
          </span>
          <span className="font-code text-xs text-muted-foreground">
            autosave 20:14 · 1 unsaved edit
          </span>
        </footer>
      </div>
    </EvalShell>
  )
}
