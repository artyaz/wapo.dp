"use client";

/**
 * pair-174 — phone 390x844, light, ltr.
 * Components: ds:DrawerLayout, ui:combobox, ui:table.
 *
 * Scenario: a courier fulfillment app — a right-anchored route sheet
 * (DrawerLayout) open over the "Today's route" screen. The sheet carries an
 * assigned-courier combobox, the pickup-stop table, and a dispatch action.
 */

import React from "react";
import * as SubframeCore from "@/lib/subframe/core";
import { BellIcon, ClockIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { DrawerLayout } from "@/components/ds/DrawerLayout";
import { Button } from "@/components/ds/Button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const couriers = [
  "Maya Chen",
  "Jonas Weber",
  "Priya Nair",
  "Sam Okafor",
  "Ana Ruiz",
] as const;

const stops = [
  { stop: "1", order: "#4821", pickup: "2:40 PM", parcels: 3 },
  { stop: "2", order: "#4837", pickup: "3:05 PM", parcels: 1 },
  { stop: "3", order: "#4844", pickup: "3:50 PM", parcels: 5 },
  { stop: "4", order: "#4852", pickup: "4:30 PM", parcels: 2 },
  { stop: "5", order: "#4860", pickup: "5:05 PM", parcels: 1 },
  { stop: "6", order: "#4871", pickup: "5:40 PM", parcels: 3 },
];

export default function Page() {
  const [open, setOpen] = React.useState(true);
  // vaul's Drawer.Content reads `document` during render, so the drawer is
  // mounted client-side only (SSR would throw "document is not defined").
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="relative h-screen w-full overflow-hidden bg-background">
        {/* ---------- the route screen sitting under the drawer scrim ---------- */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between border-b px-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
                C
              </span>
              <span className="text-sm font-medium">Courier HQ</span>
            </div>
            <span className="flex size-8 items-center justify-center rounded-md border text-muted-foreground">
              <BellIcon className="size-4" />
            </span>
          </header>

          <main className="flex-1 px-5 pt-6">
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Routes · Tue, Aug 12
            </p>
            <h1 className="mt-1 text-xl font-semibold">Today&apos;s route</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Route A — harbor district loop
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: "Stops", value: "6" },
                { label: "Parcels", value: "15" },
                { label: "Distance", value: "12.4 km" },
                { label: "Window", value: "2–6 PM" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-1.5 text-lg font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                Stop 3 — #4844 · Marina Gate, pier 9
              </div>
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                Stop 4 — #4852 · Harborprint, dock level
              </div>
            </div>
          </main>
        </div>

        {/* ---------- the pickup-queue drawer sheet ---------- */}
        {mounted ? (
        <DrawerLayout
          open={open}
          onOpenChange={setOpen}
          direction="right"
          modal={false}
          className="absolute inset-0"
        >
          {/* sheet header */}
          <div className="flex w-[320px] max-w-full flex-col items-start gap-1.5 px-6 pt-6">
            <SubframeCore.Drawer.Title className="text-heading-2 font-heading-2 text-default-font">
              Pickup queue
            </SubframeCore.Drawer.Title>
            <SubframeCore.Drawer.Description className="text-caption font-caption text-neutral-500">
              Route A · 6 stops · 12.4 km
            </SubframeCore.Drawer.Description>
          </div>

          {/* courier assignment */}
          <div className="flex w-[320px] max-w-full flex-col items-start gap-2 px-6">
            <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
              Assigned courier
            </span>
            <Combobox items={couriers} defaultValue="Maya Chen" autoHighlight>
              <ComboboxInput showClear placeholder="Select a courier" />
              <ComboboxContent>
                <ComboboxEmpty>No couriers found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          {/* stop list */}
          <div className="flex w-[320px] max-w-full flex-col px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stop</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead className="text-right">Parcels</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stops.map((s) => (
                  <TableRow key={s.order}>
                    <TableCell className="font-medium">{s.stop}</TableCell>
                    <TableCell>{s.order}</TableCell>
                    <TableCell>{s.pickup}</TableCell>
                    <TableCell className="text-right">{s.parcels}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-medium">
                    Route total
                  </TableCell>
                  <TableCell className="text-right font-medium">15</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* cutoff note */}
          <div className="flex w-[320px] max-w-full items-start gap-2.5 rounded-md border border-default-border bg-panel p-3">
            <ClockIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-caption font-caption leading-snug text-neutral-500">
              Warehouse dock closes at 6:00 PM — pickups after 5:15 PM roll
              over to tomorrow&apos;s route.
            </p>
          </div>

          {/* dispatch action pinned to the sheet foot */}
          <div className="mt-auto flex w-[320px] max-w-full flex-col items-stretch gap-3 px-6 pb-6">
            <Button size="large" className="w-full">
              Dispatch route
            </Button>
            <p className="text-center text-caption font-caption text-neutral-500">
              Courier confirms each stop in the driver app
            </p>
          </div>
        </DrawerLayout>
        ) : null}
      </div>
    </EvalShell>
  );
}
