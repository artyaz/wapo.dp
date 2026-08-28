"use client";

/**
 * EVAL page — aspect-ratio p2 — craft brewery tap list — 390x844 dark.
 * AspectRatio drives: the 16:9 featured-pour photo and the 1:1 beer thumbs
 * in the tap list rows. Co-stars: Tabs, Badge, Progress, Alert, Button,
 * Separator.
 */

import React from "react";
import { BeerIcon, MapPinIcon, TriangleAlertIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featured = {
  name: "Night Shift",
  style: "Oatmeal Stout",
  abv: "6.2%",
  ibu: "38 IBU",
  keg: 62,
  img: "https://picsum.photos/seed/nightshift-stout/900/506",
  note: "Roasted barley, bittersweet chocolate, and a poured-cream head. Back in the rotation after a 3-month lagering break.",
};

const taps = [
  {
    name: "Hop Cartel",
    style: "West Coast IPA",
    abv: "6.8%",
    ibu: 65,
    keg: 81,
    img: "https://picsum.photos/seed/hopcartel-ipa/160/160",
    low: false,
  },
  {
    name: "Halcyon",
    style: "Czech Pilsner",
    abv: "4.8%",
    ibu: 35,
    keg: 26,
    img: "https://picsum.photos/seed/halcyon-pils/160/160",
    low: true,
  },
  {
    name: "Velvet Antler",
    style: "Chocolate Porter",
    abv: "5.9%",
    ibu: 30,
    keg: 58,
    img: "https://picsum.photos/seed/velvet-porter/160/160",
    low: false,
  },
  {
    name: "Little Wing",
    style: "Hibiscus Gose",
    abv: "4.2%",
    ibu: 8,
    keg: 18,
    img: "https://picsum.photos/seed/littlewing-gose/160/160",
    low: true,
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background text-foreground">
        {/* ---------- Header ---------- */}
        <header className="flex flex-col gap-2.5 px-4 pb-3 pt-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <BeerIcon className="size-3.5" />
              Ironworks Brewing Co.
            </span>
            <span className="font-code text-xs text-muted-foreground">Updated 17:42</span>
          </div>
          <h1 className="font-heading-1 text-[28px] leading-tight text-foreground">Tap list</h1>
          <p className="text-sm text-muted-foreground">
            Taproom · 5 beers flowing · last pour logged 4 minutes ago
          </p>
        </header>

        {/* ---------- Style filter ---------- */}
        <div className="px-4">
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="ipa" className="text-xs">
                IPA
              </TabsTrigger>
              <TabsTrigger value="stout" className="text-xs">
                Stout
              </TabsTrigger>
              <TabsTrigger value="sour" className="text-xs">
                Sour
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* ---------- Featured pour ---------- */}
        <section className="mt-4 px-4">
          <article className="rounded-lg border border-default-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Featured pour
              </p>
              <Badge variant="secondary">Back on tap</Badge>
            </div>
            {/* 16:9 hero photo — width constrained by the card */}
            <AspectRatio
              ratio={16 / 9}
              className="overflow-hidden rounded-md border border-default-border bg-muted"
            >
              <img
                src={featured.img}
                alt={`Glass of ${featured.name} ${featured.style}`}
                className="size-full object-cover grayscale dark:brightness-90"
              />
            </AspectRatio>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h2 className="font-heading-3 text-lg leading-tight text-foreground">
                {featured.name}
              </h2>
              <span className="font-code text-xs text-muted-foreground">
                {featured.abv} · {featured.ibu}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{featured.note}</p>
            <div className="mt-3 flex items-center gap-2.5">
              <Progress value={featured.keg} className="h-1.5 w-full" aria-label="Keg remaining" />
              <span className="shrink-0 font-code text-[11px] text-muted-foreground">
                {featured.keg}% left
              </span>
            </div>
          </article>
        </section>

        {/* ---------- On tap now ---------- */}
        <section className="mt-5 flex flex-col px-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold tracking-tight">On tap now</h2>
            <span className="font-code text-xs text-muted-foreground">4 handles</span>
          </div>
          <Separator className="mt-2.5" />
          <ul className="flex flex-col">
            {taps.map((beer) => (
              <li key={beer.name}>
                <div className="flex items-center gap-3 py-3">
                  {/* 1:1 beer thumb — width constrained on the parent */}
                  <div className="w-12 shrink-0">
                    <AspectRatio
                      ratio={1 / 1}
                      className="overflow-hidden rounded-md border border-default-border bg-muted"
                    >
                      <img
                        src={beer.img}
                        alt={`Glass of ${beer.name}`}
                        className="size-full object-cover grayscale dark:brightness-90"
                      />
                    </AspectRatio>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium">{beer.name}</span>
                      <span className="shrink-0 font-code text-xs text-muted-foreground">
                        {beer.abv} · {beer.ibu} IBU
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{beer.style}</Badge>
                      {beer.low && (
                        <span className="text-[11px] font-medium text-warning-600 dark:text-warning-500">
                          Kicked soon
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={beer.keg}
                        className="h-1 w-full max-w-[150px]"
                        aria-label={`${beer.name} keg remaining`}
                      />
                      <span className="font-code text-[10px] text-muted-foreground">
                        {beer.keg}%
                      </span>
                    </div>
                  </div>
                </div>
                <Separator className="last:hidden" />
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Low-keg notice ---------- */}
        <section className="mt-1 px-4">
          <Alert>
            <TriangleAlertIcon />
            <AlertTitle>Two kegs are running low</AlertTitle>
            <AlertDescription>
              Halcyon and Little Wing are under 30%. Fresh half-barrels of each go on
              Saturday at noon.
            </AlertDescription>
          </Alert>
        </section>

        {/* ---------- Footer CTA ---------- */}
        <footer className="mt-auto px-4 pb-5 pt-4">
          <div className="flex items-center gap-2">
            <Button className="flex-1">Reserve a table</Button>
            <Button variant="outline" size="icon" aria-label="Open taproom map">
              <MapPinIcon />
            </Button>
          </div>
          <p className="mt-2.5 text-center font-code text-[10px] text-muted-foreground">
            41 Nuffield Way · open till 23:00 · flights of four for $12
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
