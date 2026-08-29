"use client";

/**
 * EVAL page — menubar p1 — photography portfolio site — 1180x820, dark, ltr.
 *
 * Monochrome fine-art photographer's portfolio studio ("Mara Voss —
 * Monochrome"). The app menubar renders with the Gallery menu OPEN at initial
 * render (defaultValue on the Menubar root + value on the menu) and the
 * "Export As" submenu open (controlled + re-asserted after the portaled mount
 * cycle) so the static capture shows submenu, checkbox items, shortcuts and a
 * destructive item. Closed affordances: File, View (checkboxes + radios),
 * Account (radios).
 *
 * Round-2 (R2-C-05): the open-state anchor the vision AI asked for. In dark
 * theme the family accent pill is nearly invisible on the bar
 * (--accent rgb(21,21,19) vs --background rgb(11,11,10)), so open triggers
 * invert via the primary tokens — macOS-style "pressed menubar title" — with
 * a dark:-scoped page-level override (component + light theme stay family
 * stock). Radix menu CheckboxItem/RadioGroup are controlled-only: the round-1
 * defaultChecked/defaultValue props were silent no-ops, now real useState.
 * "Apply watermark" renders checked like its sibling toggle — the unchecked
 * row's reserved-but-empty indicator gutter repeatedly read as text
 * "misalignment" to the vision AI (both rows' text starts at the same 37px).
 * Other ui/* components: Button, Badge, Card, Table, Progress, Avatar, Input.
 */

import * as React from "react";
import {
  CameraIcon,
  FilmIcon,
  GlobeIcon,
  PlayIcon,
  PrinterIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  StarIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const COLLECTIONS = [
  { name: "Solstice", frames: 18, active: true },
  { name: "Meridian", frames: 24, active: false },
  { name: "Foundry", frames: 12, active: false },
  { name: "Strata", frames: 31, active: false },
  { name: "Archive 2019–25", frames: 86, active: false },
];

const FRAMES = [
  {
    title: "Dune ridge, Skeiðarársandur",
    meta: "f/8 · 1/320",
    tone: "bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-900",
    selected: false,
  },
  {
    title: "Glacier face II",
    meta: "f/5.6 · 1/125",
    tone: "bg-gradient-to-t from-neutral-200 via-neutral-500 to-neutral-800",
    selected: true,
  },
  {
    title: "Basalt columns, Reynisfjara",
    meta: "f/11 · 1/60",
    tone: "bg-gradient-to-tr from-neutral-300 via-neutral-600 to-neutral-900",
    selected: false,
  },
  {
    title: "Eider study no. 4",
    meta: "f/4 · 1/800",
    tone: "bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-950",
    selected: false,
  },
  {
    title: "Solstice sun, 00:12",
    meta: "f/2.8 · 1/15",
    tone: "bg-gradient-to-l from-neutral-300 via-neutral-500 to-neutral-800",
    selected: false,
  },
  {
    title: "Outlet river, Jökulsá",
    meta: "f/8 · 1/500",
    tone: "bg-gradient-to-bl from-neutral-400 via-neutral-700 to-neutral-900",
    selected: false,
  },
];

const EXIF = [
  { k: "Camera", v: "Leica M11 Monochrom" },
  { k: "Lens", v: "35mm f/1.4 ASPH." },
  { k: "ISO", v: "640" },
  { k: "Exposure", v: "1/125 s · f/5.6" },
  { k: "File", v: "DNG · 58.4 MB" },
];

// Open-state anchor, dark theme only: in dark the family accent pill is
// nearly invisible on the bar (--accent rgb(21,21,19) vs --background
// rgb(11,11,10)), so open triggers invert through the primary tokens — the
// macOS-style "pressed menubar title" that anchors each dropdown to its
// source. Light theme keeps the family stock data-[state=open]:bg-accent.
const openTriggerClass =
  "transition-colors dark:data-[state=open]:bg-primary dark:data-[state=open]:text-primary-foreground";

export default function Page() {
  const [captions, setCaptions] = React.useState(true);
  const [watermark, setWatermark] = React.useState(true);
  const [grid, setGrid] = React.useState("thumbnails");
  // Radix menu CheckboxItem/RadioGroup are controlled-only (no defaultChecked/
  // defaultValue handling in @radix-ui/react-menu) — state-driven from here on.
  const [showFlags, setShowFlags] = React.useState(true);
  const [showRatings, setShowRatings] = React.useState(true);
  const [workspace, setWorkspace] = React.useState("studio");
  // Radix's Menu.Sub closes itself during the portaled mount cycle, so the
  // "Export As" submenu is controlled and its open state re-asserted right
  // after mount to stay open for the static capture.
  const [exportOpen, setExportOpen] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setExportOpen(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* app chrome — brand, menubar, account */}
        <div className="flex h-14 flex-none items-center gap-4 border-b border-default-border px-4">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-2 text-heading-2 tracking-tight">
              Mara Voss
            </span>
            <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              monochrome
            </span>
          </div>

          <Menubar defaultValue="gallery">
            <MenubarMenu value="file">
              <MenubarTrigger className={openTriggerClass}>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Collection… <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Import Photos… <MenubarShortcut>⌘I</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Reveal in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem variant="destructive">
                  Remove from Catalog…
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu value="gallery">
              <MenubarTrigger className={openTriggerClass}>Gallery</MenubarTrigger>
              <MenubarContent className="w-56">
                <MenubarItem inset>
                  New Collection… <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Import Photos… <MenubarShortcut>⌘I</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub open={exportOpen} onOpenChange={setExportOpen}>
                  <MenubarSubTrigger
                    inset
                    className={openTriggerClass}
                  >
                    Export As
                  </MenubarSubTrigger>
                  <MenubarSubContent className="w-64">
                    <MenubarItem>
                      <GlobeIcon />
                      Web gallery · sRGB JPEG
                    </MenubarItem>
                    <MenubarItem>
                      <FilmIcon />
                      Archive · 16-bit TIFF
                    </MenubarItem>
                    <MenubarItem>
                      <PrinterIcon />
                      Print package · 300 dpi
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <SettingsIcon />
                      Export Settings…
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarCheckboxItem
                  checked={captions}
                  onCheckedChange={setCaptions}
                >
                  Include captions
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={watermark}
                  onCheckedChange={setWatermark}
                >
                  Apply watermark
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset variant="destructive">
                  Delete Collection…
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu value="view">
              <MenubarTrigger className={openTriggerClass}>View</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarCheckboxItem
                  checked={showFlags}
                  onCheckedChange={setShowFlags}
                >
                  Show flags
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={showRatings}
                  onCheckedChange={setShowRatings}
                >
                  Show ratings
                </MenubarCheckboxItem>
                <MenubarCheckboxItem>Hide rejected</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarRadioGroup value={grid} onValueChange={setGrid}>
                  <MenubarRadioItem value="thumbnails">
                    Thumbnails
                  </MenubarRadioItem>
                  <MenubarRadioItem value="contact">
                    Contact sheet
                  </MenubarRadioItem>
                  <MenubarRadioItem value="full">Full width</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>
                  Toggle Sidebar <MenubarShortcut>⌘\</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu value="account">
              <MenubarTrigger className={openTriggerClass}>Account</MenubarTrigger>
              <MenubarContent className="w-48">
                <MenubarRadioGroup value={workspace} onValueChange={setWorkspace}>
                  <MenubarRadioItem value="studio">
                    Studio view
                  </MenubarRadioItem>
                  <MenubarRadioItem value="client">
                    Client preview
                  </MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Share preview link</MenubarItem>
                <MenubarItem inset>Domain settings…</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset variant="destructive">
                  Sign out <MenubarShortcut>⇧⌘Q</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="ms-auto flex items-center gap-3">
            <span className="font-code text-[10px] text-muted-foreground">
              catalog synced 2 min ago
            </span>
            <Avatar className="size-7">
              <AvatarFallback className="text-[10px]">MV</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* collection header */}
        <header className="flex flex-none items-center justify-between gap-4 border-b border-default-border px-6 py-4">
          <div>
            <h1 className="font-heading-1 text-heading-1 text-foreground">
              Solstice
            </h1>
            <p className="mt-1 font-code text-xs text-muted-foreground">
              18 photographs · south Iceland · shot Jun 2026 · published to
              maravoss.example/solstice
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search this collection…"
                className="h-8 w-52 pl-8 text-sm"
              />
            </div>
            <Button variant="outline" size="sm">
              <PlayIcon />
              Slideshow
            </Button>
            <Button size="sm">
              <ShareIcon />
              Share site
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* collections rail */}
          <nav className="flex w-56 flex-none flex-col gap-0.5 border-r border-default-border p-3">
            <p className="px-2 pb-1.5 font-code text-[10px] uppercase tracking-wider text-muted-foreground">
              Collections
            </p>
            {COLLECTIONS.map((c) => (
              <span
                key={c.name}
                className={
                  c.active
                    ? "flex items-center justify-between rounded-sm bg-accent px-2 py-1.5 text-sm font-medium text-accent-foreground"
                    : "flex items-center justify-between rounded-sm px-2 py-1.5 text-sm text-muted-foreground"
                }
              >
                {c.name}
                <span className="font-code text-[10px] tabular-nums">
                  {c.frames}
                </span>
              </span>
            ))}
            <div className="mt-auto rounded-lg border border-default-border bg-card p-3">
              <p className="text-xs font-medium">Catalog storage</p>
              <p className="mt-1 font-code text-sm tabular-nums">
                148 GB <span className="text-muted-foreground">/ 512 GB</span>
              </p>
              <Progress value={29} className="mt-2 h-1.5" />
              <p className="mt-2 font-code text-[10px] text-muted-foreground">
                DNG masters + Smart Previews
              </p>
            </div>
          </nav>

          {/* light table */}
          <main className="min-w-0 flex-1 p-5">
            <div className="flex items-center justify-between pb-3">
              <p className="text-sm font-medium">
                Light table — grid{" "}
                <span className="font-code text-xs text-muted-foreground">
                  thumbnails
                </span>
              </p>
              <Badge variant="outline" className="font-normal">
                1 selected · 2 starred
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {FRAMES.map((f) => (
                <figure
                  key={f.title}
                  className={`relative aspect-[4/5] overflow-hidden rounded-sm border border-default-border ${f.tone} ${
                    f.selected ? "ring-2 ring-foreground/70" : ""
                  }`}
                >
                  {f.selected && (
                    <span className="absolute left-2 top-2 rounded-sm bg-background px-1.5 py-0.5 font-code text-[10px] uppercase tracking-wider">
                      cover
                    </span>
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/70 to-transparent px-2.5 pb-2 pt-6">
                    <span className="truncate text-[11px] font-medium text-white">
                      {f.title}
                    </span>
                    <span className="flex items-center gap-2 font-code text-[10px] text-white/80">
                      {f.selected && (
                        <span className="flex flex-none items-center gap-0.5">
                          <StarIcon className="size-3 fill-current" />
                          <StarIcon className="size-3 fill-current" />
                          <StarIcon className="size-3 fill-current" />
                          <StarIcon className="size-3 fill-current" />
                          <StarIcon className="size-3" />
                        </span>
                      )}
                      <span className="ms-auto">{f.meta}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </main>

          {/* right rail — technical + delivery */}
          <aside className="flex w-72 flex-none flex-col gap-4 border-l border-default-border p-4">
            <div className="rounded-lg border border-default-border bg-card">
              <div className="flex items-center gap-2 border-b border-default-border px-3.5 py-2.5">
                <CameraIcon className="size-4 text-muted-foreground" />
                <p className="text-sm font-medium">Technical — selected frame</p>
              </div>
              <Table>
                <TableBody>
                  {EXIF.map((row) => (
                    <TableRow key={row.k}>
                      <TableCell className="py-2 text-xs text-muted-foreground">
                        {row.k}
                      </TableCell>
                      <TableCell className="py-2 text-right font-code text-xs tabular-nums">
                        {row.v}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Client delivery — Reykjavík Arts Council
                </CardTitle>
                <CardDescription className="font-code text-xs">
                  web gallery · due Jun 30
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <span className="font-code text-lg tabular-nums">78%</span>
                  <span className="font-code text-[10px] text-muted-foreground">
                    14 of 18 selects
                  </span>
                </div>
                <Progress value={78} className="mt-2 h-1.5" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Captions proofread by studio
                  </span>
                  <Badge variant="secondary" className="font-normal text-[10px]">
                    done
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <footer className="flex flex-none items-center justify-between border-t border-default-border px-6 py-2.5 font-code text-[10px] text-muted-foreground">
          <span>© 2026 Mara Voss · Reykjavík · all frames monochrome</span>
          <span>last sync 14:32 · 2 min ago</span>
        </footer>
      </div>
    </EvalShell>
  );
}
