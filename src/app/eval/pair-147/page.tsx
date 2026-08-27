"use client";

/**
 * EVAL page (pair-147) — "confirm your stay" step of a boutique lodge
 * booking flow. Components: ui:aspect-ratio, ui:skeleton, ui:tooltip.
 * Conditions: 1280x800 desktop, dark theme, ltr, dense-content.
 *
 * Story: step 3 of 4 in booking a Fjord-view Suite. The left column is the
 * media gallery — a 16/9 AspectRatio hero (deterministic SVG fjord night
 * scene) plus three 4/3 AspectRatio thumbnails — followed by dense room
 * copy and an amenity grid with long real-world labels. The right rail is
 * the booking summary card: dates/guests/room rows, a host block and a
 * "live extras" block still loading (Skeleton), a price breakdown whose
 * total row carries a default-open Tooltip, a closed Tooltip on the
 * cancellation policy, and a disabled "Confirm & pay" Button whose Tooltip
 * explains why it is locked (it unlocks once the Skeleton sections resolve).
 */

import React from "react";
import {
  Bath,
  BedDouble,
  Car,
  ChevronLeft,
  Coffee,
  Info,
  ShieldCheck,
  Waves,
  Wifi,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/** Deterministic monochrome fjord night scene — stands in for the hero photo. */
function FjordScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fjord-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#191d23" />
          <stop offset="100%" stopColor="#262c34" />
        </linearGradient>
        <linearGradient id="fjord-aurora" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9fb0c2" stopOpacity="0" />
          <stop offset="45%" stopColor="#9fb0c2" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9fb0c2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#fjord-sky)" />
      {/* aurora band */}
      <path
        d="M-20 84 Q 140 28 300 66 T 660 44 L 660 -10 L -20 -10 Z"
        fill="url(#fjord-aurora)"
        opacity="0.5"
      />
      <path
        d="M-20 116 Q 180 60 360 96 T 660 74 L 660 -10 L -20 -10 Z"
        fill="url(#fjord-aurora)"
        opacity="0.22"
      />
      {/* moon + halo */}
      <circle cx="478" cy="86" r="44" fill="#dfe3e8" opacity="0.08" />
      <circle cx="478" cy="86" r="22" fill="#dfe3e8" opacity="0.9" />
      {/* far ridge */}
      <path
        d="M0 226 L92 154 L172 208 L252 142 L342 218 L422 172 L522 228 L640 168 L640 360 L0 360 Z"
        fill="#22262e"
      />
      {/* near ridge */}
      <path
        d="M0 264 L122 192 L224 252 L332 188 L472 268 L562 218 L640 258 L640 360 L0 360 Z"
        fill="#15181e"
      />
      {/* water */}
      <rect y="292" width="640" height="68" fill="#101318" />
      <ellipse cx="478" cy="306" rx="34" ry="3.5" fill="#dfe3e8" opacity="0.22" />
      <ellipse cx="478" cy="318" rx="20" ry="2.5" fill="#dfe3e8" opacity="0.12" />
      <path d="M0 296 H640" stroke="#39414d" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

const THUMBS = [
  {
    label: "Bedroom · king bed",
    grad: "bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-950",
    selected: true,
  },
  {
    label: "Spa bathroom · heated slate",
    grad: "bg-gradient-to-tr from-neutral-500 via-neutral-700 to-neutral-900",
    selected: false,
  },
  {
    label: "Cedar sauna deck",
    grad: "bg-gradient-to-t from-neutral-700 via-neutral-800 to-neutral-950",
    selected: false,
  },
];

const AMENITIES = [
  { icon: BedDouble, text: "King bed with blackout curtains & reading lights" },
  { icon: Bath, text: "Rainfall shower · heated slate floor · anti-fog mirror" },
  { icon: Waves, text: "Cedar sauna, ice plunge & panorama pool, 07:00–22:00" },
  { icon: Coffee, text: "Pour-over bar with locally roasted Tromsø beans" },
  { icon: Wifi, text: "Fibre Wi-Fi · study desk with a north-facing fjord view" },
  { icon: Car, text: "Free EV charging in the heated garage (Type 2, 22 kW)" },
];

function SummaryRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="text-right text-sm font-medium leading-snug text-foreground">
          {value}
        </span>
      </div>
      <p className="text-right text-xs leading-snug text-muted-foreground">
        {sub}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-5">
          {/* ---------- header ---------- */}
          <header className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" aria-label="Back to search results">
              <ChevronLeft className="size-4" />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold leading-tight">
                Aurora Fjord Lodge &amp; Spa
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Tromsø, Norway · Kvaløya island · 12 min from the harbour by airport shuttle
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-1.5 w-8 rounded-full bg-muted-foreground/50" />
                <span className="h-1.5 w-8 rounded-full bg-muted-foreground/50" />
                <span className="h-1.5 w-8 rounded-full bg-primary" />
                <span className="h-1.5 w-8 rounded-full bg-border" />
              </div>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                Step 3 of 4 · Confirm &amp; pay
              </span>
            </div>
          </header>

          <main className="mt-5 grid grid-cols-12 gap-6">
            {/* ---------- left: gallery + room detail ---------- */}
            <section className="col-span-7 space-y-4">
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl border border-border"
              >
                <div className="relative h-full w-full">
                  <FjordScene className="h-full w-full" />
                  <span className="absolute right-3 top-3 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium text-neutral-200 backdrop-blur-sm">
                    Photo 1 of 24
                  </span>
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
                    <span className="truncate rounded-md bg-black/45 px-2 py-1 text-[11px] leading-none text-neutral-200 backdrop-blur-sm">
                      Deluxe Fjord-view Suite · 42 m² · sleeps 4 · north-facing panorama
                    </span>
                    <span className="shrink-0 rounded-md bg-black/45 px-2 py-1 text-[11px] leading-none text-neutral-200 backdrop-blur-sm">
                      4th floor
                    </span>
                  </div>
                </div>
              </AspectRatio>

              <div className="grid grid-cols-3 gap-3">
                {THUMBS.map((t) => (
                  <AspectRatio
                    key={t.label}
                    ratio={4 / 3}
                    className={`overflow-hidden rounded-lg border ${
                      t.selected
                        ? "border-primary ring-2 ring-primary/70"
                        : "border-border"
                    }`}
                  >
                    <div className={`relative h-full w-full ${t.grad}`}>
                      <span className="absolute inset-x-1.5 bottom-1.5 truncate rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-neutral-200 backdrop-blur-sm">
                        {t.label}
                      </span>
                    </div>
                  </AspectRatio>
                ))}
              </div>

              <div>
                <h2 className="text-sm font-medium">About this suite</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  The 42 m² Deluxe Fjord-view Suite faces due north across the
                  water: floor-to-ceiling windows frame the far ridge, and a
                  separate lounge nook doubles as a reading corner or a second
                  sleeping space for a child. The bathroom has underfloor
                  heating, a rainfall shower and an anti-fog mirror; breakfast
                  is served in the glasshouse conservatory from 07:00.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium">Included with your stay</h2>
                <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-2">
                  {AMENITIES.map((a) => (
                    <li key={a.text} className="flex items-start gap-2">
                      <a.icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-xs leading-snug text-muted-foreground">
                        {a.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ---------- right: booking summary ---------- */}
            <aside className="col-span-5">
              <div className="space-y-4 rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold">Your stay</h2>
                  <Badge variant="secondary">Rates updating…</Badge>
                </div>

                <div className="space-y-3">
                  <SummaryRow
                    label="Dates"
                    value="Thu 12 Feb → Sat 21 Feb 2026"
                    sub="9 nights · check-in from 15:00 · check-out until 11:00"
                  />
                  <SummaryRow
                    label="Guests"
                    value="2 adults · 1 child (7) · 1 infant"
                    sub="Cot and high chair available on request at no charge"
                  />
                  <SummaryRow
                    label="Room"
                    value="Deluxe Fjord-view Suite · 4th floor"
                    sub="King bed + sofa bed · breakfast for 4 included"
                  />
                </div>

                <Separator />

                {/* host block — still loading */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-medium">Your host</h3>
                    <span className="text-[11px] text-muted-foreground">
                      Verifying…
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="grid w-full gap-1.5">
                      <Skeleton className="h-3.5 w-2/5" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                    Checking identity verification and average response time —
                    Praxis hosts reply within 2 h on average.
                  </p>
                </div>

                {/* live extras — still loading */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-medium">Live extras · local partners</h3>
                    <span className="text-[11px] text-muted-foreground">
                      Fetching…
                    </span>
                  </div>
                  <div className="mt-2 grid gap-1.5">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-4/5" />
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                    Aurora wake-up call, dog-sledding transfer and the 21:00
                    sauna slot are priced live for your dates.
                  </p>
                </div>

                <Separator />

                {/* price breakdown */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price breakdown</h3>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">
                      9 nights × NOK 2,145
                    </span>
                    <span className="tabular-nums">NOK 19,305</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      Spa &amp; sauna credit
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <button
                              type="button"
                              aria-label="Spa credit details"
                              className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Info className="size-3.5" />
                            </button>
                          }
                        />
                        <TooltipContent side="top" className="max-w-[250px]">
                          <p>
                            Unlimited access to the cedar sauna, ice plunge and
                            panorama pool, 07:00–22:00 daily. Robes and slippers
                            are in the wardrobe.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <span className="text-muted-foreground">Included</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      Taxes, VAT &amp; city fees (12%)
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <button
                              type="button"
                              aria-label="Tax details"
                              className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Info className="size-3.5" />
                            </button>
                          }
                        />
                        <TooltipContent side="top" className="max-w-[250px]">
                          <p>
                            12% VAT plus the Tromsø city tax of NOK 40 per
                            adult, per night (children under 15 free), capped at
                            7 nights.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <span className="tabular-nums">NOK 2,317</span>
                  </div>
                </div>

                {/* total — tooltip rendered open for the audit */}
                <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    Total · 9 nights
                    <Tooltip defaultOpen>
                      <TooltipTrigger
                        render={
                          <button
                            type="button"
                            aria-label="Total price details"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Info className="size-3.5" />
                          </button>
                        }
                      />
                      <TooltipContent side="top" sideOffset={6} className="max-w-[270px]">
                        <p>
                          Charged in NOK. Includes 12% VAT and the Tromsø city
                          tax (NOK 40 per adult, per night). This rate is locked
                          for 24 hours after you continue.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </span>
                  <span className="text-base font-semibold tabular-nums">
                    NOK 21,622
                  </span>
                </div>

                {/* cancellation policy */}
                <div className="flex items-start gap-2.5">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <button
                          type="button"
                          aria-label="Cancellation policy details"
                          className="mt-0.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <ShieldCheck className="size-4" />
                        </button>
                      }
                    />
                    <TooltipContent side="bottom" className="max-w-[260px]">
                      <p>
                        After the deadline the first night (NOK 2,145) is
                        charged. Date changes remain free of charge while
                        availability lasts.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-snug">
                      Free cancellation until 17:00 on 5 Feb 2026
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      After that, the first night is charged · date changes stay
                      free
                    </p>
                  </div>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2 pt-1">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className="inline-flex w-full">
                          <Button className="w-full" disabled>
                            Confirm &amp; pay · NOK 21,622
                          </Button>
                        </span>
                      }
                    />
                    <TooltipContent side="top" className="max-w-[280px]">
                      <p>
                        Locked while live extras finish loading — usually under
                        a minute. Nothing is charged until the host accepts your
                        request.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <Button variant="outline" className="shrink-0">
                    Hold rate · 24 h
                  </Button>
                </div>

                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  By holding this rate you authorise Aurora Fjord Lodge &amp;
                  Spa to charge the full amount 48 h before arrival. House rule
                  R-114: the spa &amp; sauna quiet window runs 23:00–07:00, and
                  the glasshouse conservatory closes at 22:00.
                </p>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
