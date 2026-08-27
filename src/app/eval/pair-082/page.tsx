"use client";

/**
 * EVAL page (pair-082) — ui:drawer + ds:CandleSeries + ui:aspect-ratio
 * Conditions: 360x640 small phone, light theme, LTR, dense-content.
 *
 * Scenario: "Praxis Cloud" system status page. Behind the modal: brand header,
 * a tappable degraded-status banner (the drawer trigger) and an edge-region
 * status module whose globe panel is locked to a fixed ratio (AspectRatio).
 * The bottom Drawer opens by default with the active incident sheet: dense
 * two-line title, meta line, the CandleSeries latency chart (p99 per 5-min
 * window) with a live-stat rail, and follow/timeline actions.
 */

import React from "react";
import {
  Activity,
  Bell,
  ChevronRight,
  Globe,
  History,
  TriangleAlert,
  X,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CandleSeries } from "@/components/ds/CandleSeries";

const REGIONS = [
  "iad",
  "pdx",
  "sfo",
  "gru",
  "syd",
  "sin",
  "hkg",
  "fra",
  "lhr",
  "cdg",
];

const SERVICES = [
  {
    name: "Checkout & Payments API — REST + GraphQL gateway",
    status: "Degraded",
    uptime: "99.21%",
    tone: "warning" as const,
  },
  {
    name: "Identity & Access — SSO, SAML and SCIM provisioning",
    status: "Operational",
    uptime: "99.99%",
    tone: "ok" as const,
  },
  {
    name: "Edge CDN & object storage (static asset delivery)",
    status: "Operational",
    uptime: "99.99%",
    tone: "ok" as const,
  },
  {
    name: "Webhooks delivery queue with automatic retries",
    status: "Operational",
    uptime: "99.97%",
    tone: "ok" as const,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <Drawer defaultOpen>
        <div className="flex min-h-screen flex-col bg-background px-4 pt-3">
          {/* ---- brand / status header ---- */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex size-5 flex-none items-center justify-center rounded-md bg-neutral-900 text-white">
                <Activity className="size-3" />
              </span>
              <h1 className="truncate text-sm font-semibold leading-5 text-neutral-800">
                Praxis Cloud Status
              </h1>
            </div>
            <span className="flex-none font-code text-[10px] tabular-nums text-neutral-400">
              18:42 UTC · live
            </span>
          </div>

          {/* ---- degraded banner = drawer trigger ---- */}
          <DrawerTrigger
            render={
              <button
                type="button"
                aria-label="Open incident details for INC-2041"
                data-eval-banner
                className="mt-1.5 flex w-full items-start gap-2.5 rounded-lg border border-solid border-warning-200 bg-warning-50 px-3 py-1.5 text-left"
              />
            }
          >
            <TriangleAlert className="mt-0.5 size-4 flex-none text-warning-600" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium leading-4 text-warning-800">
                Partially degraded — elevated latency on Checkout &amp; Payments
                API
              </span>
              <span className="mt-1 block font-code text-[10px] leading-[14px] text-warning-700">
                INC-2041 · eu-west-2 · updated 6 min ago
              </span>
            </span>
            <ChevronRight className="mt-0.5 size-4 flex-none text-warning-600/70" />
          </DrawerTrigger>

          {/* ---- edge network module (ui:aspect-ratio) ---- */}
          <section
            data-eval-region-card
            className="mt-1.5 rounded-lg border border-solid border-default-border bg-card p-2"
          >
            <div className="flex items-center justify-between px-1">
              <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <Globe className="size-3" />
                Edge network
              </span>
              <span className="flex items-center gap-1 font-code text-[10px] text-neutral-400">
                <span className="size-1.5 rounded-full bg-success-500" />
                live · 14 regions
              </span>
            </div>

            <div className="mt-2">
            <AspectRatio
              ratio={3.0}
              className="overflow-hidden rounded-md border border-solid border-default-border bg-card"
            >
              {/* fixed-ratio globe panel */}
              <svg
                viewBox="0 0 111 111"
                aria-hidden="true"
                className="absolute inset-y-0 left-1 h-full w-[111px] flex-none"
              >
                <defs>
                  <clipPath id="pair082-globe-clip">
                    <circle cx="55.5" cy="55.5" r="45" />
                  </clipPath>
                </defs>
                <g
                  clipPath="url(#pair082-globe-clip)"
                  fill="none"
                  stroke="var(--ds-color-neutral-200)"
                  strokeWidth="1"
                >
                  <ellipse cx="55.5" cy="55.5" rx="18" ry="45" />
                  <ellipse cx="55.5" cy="55.5" rx="36" ry="45" />
                  <line x1="10.5" y1="28" x2="100.5" y2="28" />
                  <line x1="10.5" y1="55.5" x2="100.5" y2="55.5" />
                  <line x1="10.5" y1="83" x2="100.5" y2="83" />
                </g>
                <circle
                  cx="55.5"
                  cy="55.5"
                  r="45"
                  fill="none"
                  stroke="var(--ds-color-neutral-300)"
                  strokeWidth="1"
                />
                <g fill="var(--ds-color-neutral-400)">
                  <circle cx="35" cy="33" r="2" />
                  <circle cx="52" cy="30" r="2" />
                  <circle cx="63" cy="62" r="2" />
                  <circle cx="82" cy="50" r="2" />
                  <circle cx="86" cy="64" r="2" />
                  <circle cx="38" cy="52" r="2" />
                  <circle cx="30" cy="60" r="2" />
                  <circle cx="45" cy="40" r="2" />
                  <circle cx="68" cy="35" r="2" />
                  <circle cx="60" cy="75" r="2" />
                  <circle cx="90" cy="44" r="2" />
                </g>
                {/* dublin — the degraded region */}
                <circle
                  cx="72"
                  cy="43"
                  r="5.5"
                  fill="none"
                  stroke="var(--ds-color-warning-500)"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                />
                <circle
                  cx="72"
                  cy="43"
                  r="2.6"
                  fill="var(--ds-color-warning-500)"
                />
              </svg>

              {/* region chips */}
              <div className="absolute inset-y-0 left-[122px] right-1 flex flex-wrap content-center gap-x-2.5 gap-y-1.5">
                {REGIONS.map((code) => (
                  <span
                    key={code}
                    className="flex items-center gap-1 font-code text-[9px] leading-none text-neutral-400"
                  >
                    <span className="size-1.5 rounded-full bg-neutral-300" />
                    {code}
                  </span>
                ))}
                <span className="flex items-center gap-1 rounded-full border border-solid border-warning-200 bg-warning-50 px-1.5 py-[3px] font-code text-[9px] font-medium leading-none text-warning-700">
                  <span className="size-1.5 rounded-full bg-warning-500" />
                  dub eu-west-2
                </span>
              </div>
            </AspectRatio>
            </div>

            <p className="mt-1 px-1 text-[10px] leading-[13px] text-neutral-500">
              13 operational · 1 degraded · 90-day uptime 99.98%
            </p>
          </section>

          {/* ---- service list (scrolls under the sheet) ---- */}
          <section
            data-eval-services
            className="mt-2.5 rounded-lg border border-solid border-default-border bg-card p-2"
          >
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                Core services
              </span>
              <span className="font-code text-[10px] text-neutral-400">
                90-day uptime
              </span>
            </div>
            <ul>
              {SERVICES.map((svc, i) => (
                <li
                  key={svc.name}
                  className={`flex items-center gap-2.5 px-1 py-2 ${
                    i > 0 ? "border-t border-solid border-default-border" : ""
                  }`}
                >
                  <span
                    className={`size-1.5 flex-none rounded-full ${
                      svc.tone === "warning"
                        ? "bg-warning-500"
                        : "bg-success-500"
                    }`}
                  />
                  <span className="min-w-0 flex-1 text-xs leading-4 text-neutral-700">
                    {svc.name}
                  </span>
                  <span className="flex flex-none flex-col items-end gap-0.5">
                    <span
                      className={`text-[10px] leading-none ${
                        svc.tone === "warning"
                          ? "text-warning-700"
                          : "text-neutral-500"
                      }`}
                    >
                      {svc.status}
                    </span>
                    <span className="font-code text-[10px] leading-none tabular-nums text-neutral-400">
                      {svc.uptime}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <p className="pb-3 pt-2 text-center text-[10px] text-neutral-400">
            Status page auto-refreshes every 30 s · subscribe for incident email
            alerts
          </p>
        </div>

        {/* ---- incident sheet (ui:drawer, open by default) ---- */}
        <DrawerContent className="h-[348px]">
          <div className="px-4 pb-1.5 pt-1">
            <div className="flex items-start gap-2">
              <DrawerTitle className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-neutral-800">
                Elevated p99 latency and intermittent 503 errors
              </DrawerTitle>
              <DrawerClose
                render={
                  <button
                    type="button"
                    aria-label="Close incident details"
                    className="flex size-10 flex-none items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
                  />
                }
              >
                <X className="size-4" />
              </DrawerClose>
            </div>
            <DrawerDescription className="mt-1 text-[11px] leading-4 text-neutral-500">
              <span className="font-code font-medium text-neutral-600">
                INC-2041
              </span>{" "}
              · SEV-2 · Checkout &amp; Payments API · eu-west-2
            </DrawerDescription>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-medium uppercase leading-[12px] tracking-[0.08em] text-neutral-500">
                p99 latency · 5-min windows
              </span>
              <span className="font-code text-[9px] leading-[12px] tabular-nums text-neutral-400">
                ms · last 70 min
              </span>
            </div>

            <div className="mt-1 flex items-stretch gap-3">
              <div data-eval-candle className="flex-none">
                <CandleSeries />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div>
                  <p className="font-code text-[9px] uppercase tracking-[0.06em] text-neutral-400">
                    p99 now
                  </p>
                  <p className="mt-1 font-code text-[17px] font-medium leading-none tabular-nums text-neutral-800">
                    107.8
                    <span className="ml-1 text-[10px] font-normal text-neutral-400">
                      ms
                    </span>
                  </p>
                </div>
                <div className="h-px bg-default-border" />
                <div>
                  <p className="font-code text-[9px] uppercase tracking-[0.06em] text-neutral-400">
                    Δ 1h
                  </p>
                  <p className="mt-1 font-code text-[13px] font-medium leading-none tabular-nums text-warning-700">
                    +4.2%
                  </p>
                </div>
                <div className="h-px bg-default-border" />
                <div>
                  <p className="font-code text-[9px] uppercase tracking-[0.06em] text-neutral-400">
                    503 rate
                  </p>
                  <p className="mt-1 font-code text-[13px] font-medium leading-none tabular-nums text-neutral-700">
                    0.14%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="flex-row gap-2 border-t border-solid border-default-border px-4 py-2.5">
            <DrawerClose
              render={
                <Button
                  variant="outline"
                  className="h-10 flex-1 text-xs font-medium"
                />
              }
            >
              <History className="size-3.5" />
              View timeline
            </DrawerClose>
            <Button className="h-10 flex-1 text-xs font-medium">
              <Bell className="size-3.5" />
              Follow updates
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </EvalShell>
  );
}
