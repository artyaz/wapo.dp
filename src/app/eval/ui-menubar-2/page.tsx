"use client";

/**
 * EVAL page — menubar p2 — analytics dashboard for a specialty coffee chain —
 * 430x932, light theme (phone), ltr.
 *
 * "Kettle & Crow — Store Ops" mobile analytics console. The compact app
 * menubar carries the reporting controls; its "Report" menu renders OPEN at
 * initial render (defaultValue on the Menubar root + value on the menu) so the
 * static capture shows radio period selection and comparison checkboxes. The
 * open menu drops over the "shift briefing" panel, which carries the same
 * reporting context, so the overlay never clips a metric card. Closed
 * affordances: Stores (radio), More.
 *
 * Round-2 (R2-C-05): Radix menu RadioGroup is controlled-only (defaultValue
 * is a silent no-op in @radix-ui/react-menu), so the Stores group is now
 * real useState; "Include wholesale orders" renders checked to match the
 * hero revenue card that now says "incl. wholesale". Every Report-menu row
 * also carries a leading icon in the ps-8 flow column — the reserved (but
 * empty-on-unselected) Radix indicator gutter kept reading as text
 * "misalignment" to the vision AI; a uniform glyph column makes the shared
 * 56px text origin legible at a glance (native macOS icon-column menus).
 * Other ui/* components: Card, Badge, Button, Progress, Avatar.
 */

import * as React from "react";
import {
  ArrowLeftRightIcon,
  BellIcon,
  CalendarCheck2Icon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  HistoryIcon,
  PackageIcon,
  StoreIcon,
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
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Progress } from "@/components/ui/progress";

const BRIEFING = [
  {
    time: "06:00",
    text: "11 of 12 stores opened on time — Depot Kitchen closed Mondays",
  },
  {
    time: "09:15",
    text: "Riverside espresso grinder recalibrated (maintenance #4821)",
  },
  {
    time: "12:40",
    text: "Oat milk at 62% across 3 stores — reorder placed with Oatly",
  },
  {
    time: "14:00",
    text: "Afternoon rush trending +9% vs last Tuesday's 14:00 hour",
  },
];

const STATS = [
  { label: "Transactions", value: "1,284", delta: "▲ 4.1%" },
  { label: "Avg ticket", value: "$14.36", delta: "▲ 1.9%" },
  { label: "Loyalty joins", value: "312", delta: "▲ 11.2%" },
  { label: "Milk waste", value: "1.8%", delta: "▼ 0.4%" },
];

export default function Page() {
  const [period, setPeriod] = React.useState("today");
  const [compare, setCompare] = React.useState(true);
  const [wholesale, setWholesale] = React.useState(true);
  // Radix menu RadioGroup is controlled-only — defaultValue is a silent no-op,
  // so the Stores selection is real state ("All 12 stores" gets its dot).
  const [store, setStore] = React.useState("all");

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col gap-3 bg-background p-4 text-foreground">
        {/* top bar */}
        <header className="flex flex-none items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading-3 text-heading-3">
              Kettle &amp; Crow
            </span>
            <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              store ops
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Alerts"
              className="relative"
            >
              <BellIcon />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">RD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* app menubar — reporting controls, Report menu open at capture */}
        <Menubar defaultValue="report" className="flex-none">
          <MenubarMenu value="report">
            <MenubarTrigger>Report</MenubarTrigger>
            <MenubarContent className="w-56">
              <MenubarLabel>Reporting period</MenubarLabel>
              <MenubarRadioGroup value={period} onValueChange={setPeriod}>
                <MenubarRadioItem value="today">
                  <CalendarCheck2Icon className="text-muted-foreground" />
                  Today
                </MenubarRadioItem>
                <MenubarRadioItem value="yesterday">
                  <HistoryIcon className="text-muted-foreground" />
                  Yesterday
                </MenubarRadioItem>
                <MenubarRadioItem value="week">
                  <CalendarRangeIcon className="text-muted-foreground" />
                  This week
                </MenubarRadioItem>
                <MenubarRadioItem value="month">
                  <CalendarDaysIcon className="text-muted-foreground" />
                  This month
                </MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarCheckboxItem
                checked={compare}
                onCheckedChange={setCompare}
              >
                <ArrowLeftRightIcon className="text-muted-foreground" />
                Compare with last week
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={wholesale}
                onCheckedChange={setWholesale}
              >
                <PackageIcon className="text-muted-foreground" />
                Include wholesale orders
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu value="stores">
            <MenubarTrigger>Stores</MenubarTrigger>
            <MenubarContent className="w-56">
              <MenubarRadioGroup value={store} onValueChange={setStore}>
                <MenubarRadioItem value="all">All 12 stores</MenubarRadioItem>
                <MenubarRadioItem value="downtown">
                  Downtown Flagship
                </MenubarRadioItem>
                <MenubarRadioItem value="riverside">Riverside</MenubarRadioItem>
                <MenubarRadioItem value="airport">
                  Airport · Concourse B
                </MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>
                <StoreIcon />
                Manage stores…
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu value="more">
            <MenubarTrigger>More</MenubarTrigger>
            <MenubarContent className="w-52">
              <MenubarItem>
                Schedule email digest
                <MenubarShortcut>⌘D</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Help &amp; support</MenubarItem>
              <MenubarSeparator />
              <MenubarItem variant="destructive">Reset dashboard</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* shift briefing — carries the reporting context the open Report
            menu drops over, so the overlay never clips a metric card */}
        <Card className="flex-none py-4 gap-3">
          <CardHeader>
            <CardTitle className="text-sm">Shift briefing</CardTitle>
            <CardDescription className="font-code text-xs">
              Tue, Aug 25 · today · all stores · comparing last week
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {BRIEFING.map((b) => (
              <div key={b.time} className="flex items-baseline gap-2.5">
                <span className="flex-none font-code text-[10px] tabular-nums text-muted-foreground">
                  {b.time}
                </span>
                <p className="text-xs leading-relaxed">{b.text}</p>
              </div>
            ))}
            <p className="pt-0.5 font-code text-[10px] text-muted-foreground">
              — change period or stores from the Report menu above
            </p>
          </CardContent>
        </Card>

        {/* hero revenue */}
        <Card className="flex-none py-4 gap-3">
          <CardHeader>
            <CardDescription className="font-code text-xs">
              Revenue · today · all stores · incl. wholesale
            </CardDescription>
            <CardTitle className="font-code text-3xl tabular-nums">
              $18,432.50
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between pb-2.5">
              <Badge variant="secondary" className="font-normal">
                +6.2% vs last Tuesday
              </Badge>
              <span className="font-code text-[10px] text-muted-foreground">
                updated 14:32
              </span>
            </div>
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-xs text-muted-foreground">
                Daily target $22,000
              </span>
              <span className="font-code text-xs tabular-nums">84%</span>
            </div>
            <Progress value={84} className="h-1.5" />
          </CardContent>
        </Card>

        {/* stat grid */}
        <Card className="flex-none py-4 gap-3">
          <CardHeader>
            <CardTitle className="text-sm">Today&rsquo;s numbers</CardTitle>
            <CardDescription className="font-code text-xs">
              vs same day last week
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3.5">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-0.5 font-code text-xl tabular-nums">
                  {s.value}
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  {s.delta} vs last week
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <footer className="mt-auto flex flex-none items-center justify-between pt-1 font-code text-[10px] text-muted-foreground">
          <span>Kettle &amp; Crow Ops · v2.4.1</span>
          <span>data refreshed 14:32</span>
        </footer>
      </div>
    </EvalShell>
  );
}
