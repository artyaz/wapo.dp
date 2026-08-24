"use client";

/**
 * AppShell — site chrome that itself consumes the design system:
 * a glass Regular header (with a top-anchored progressive-blur scrim),
 * capsule nav pills, monochrome palette, serif headings.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Link, useRoute } from "./HashRouter";
import { ThemeToggle } from "./ThemeToggle";
import { StrategyBadge } from "./StrategyBadge";
import { ScrimTop } from "./ScrimTop";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/foundations", label: "Foundations" },
  { to: "/materials", label: "Materials" },
  { to: "/components", label: "Components" },
  { to: "/patterns", label: "Patterns" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const [open, setOpen] = React.useState(false);

  const isActive = (to: string) =>
    to === "/" ? route.path === "/" : route.path.startsWith(to);

  return (
    <div className="flex min-h-screen flex-col">
      {/* header — glass Regular over scrolling content */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className="relative border-b border-default-border/60"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--ds-color-panel) 60%, transparent)",
            backdropFilter: "blur(40px) saturate(150%)",
            WebkitBackdropFilter: "blur(40px) saturate(150%)",
          }}
        >
          {/* dual sheen */}
          <div className="praxis-sheen-primary pointer-events-none absolute inset-0" />
          <div className="praxis-sheen-counter pointer-events-none absolute inset-0" />

          <div className="relative z-10 mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-default-font/20 bg-default-font/[0.04]"
              >
                <span className="h-2 w-2 rounded-[2px] bg-default-font" />
              </span>
              <span className="font-heading-3 text-[16px] font-semibold tracking-tight text-default-font">
                Praxis
              </span>
              <span className="mt-[3px] hidden font-code text-[10px] tracking-[0.14em] text-neutral-400 uppercase sm:inline">
                design system
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={twClassNames(
                    "rounded-[9999px] px-3 py-1.5 text-[13px] font-medium transition-colors",
                    isActive(item.to)
                      ? "bg-default-font/[0.06] text-default-font"
                      : "text-neutral-500 hover:bg-default-font/[0.04] hover:text-default-font"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <StrategyBadge active />
              </div>
              <ThemeToggle />
              <button
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9999px] text-neutral-500 transition-colors hover:bg-default-font/[0.05] hover:text-default-font md:hidden"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d={open ? "M3 3l10 10M13 3L3 13" : "M2 4h12M2 8h12M2 12h12"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {open ? (
            <nav
              className="relative z-10 flex flex-col gap-1 border-t border-default-border/60 px-4 py-3 md:hidden"
              aria-label="Mobile"
            >
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={twClassNames(
                    "rounded-md px-3 py-2 text-body-medium font-medium transition-colors",
                    isActive(item.to)
                      ? "bg-default-font/[0.06] text-default-font"
                      : "text-neutral-500 hover:bg-default-font/[0.04] hover:text-default-font"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
        {/* progressive-blur scrim feathering the boundary below the header */}
        <ScrimTop height="h-10" />
      </header>

      <main className="flex-1 pt-14">{children}</main>

      <footer className="mt-24 border-t border-default-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-col gap-1">
            <span className="font-heading-3 text-[14px] font-semibold text-default-font">
              Praxis Design System
            </span>
            <span className="text-caption text-neutral-500">
              Calm, monochrome, liquid glass. Materials that bend light instead
              of casting shadows.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-code text-[11px] tracking-[0.08em] text-neutral-400 uppercase">
              v1.0 · 48 components · 4 materials
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
