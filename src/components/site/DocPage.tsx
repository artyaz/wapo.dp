"use client";

/**
 * DocPage — shared scaffold for documentation views: sticky TOC sidebar with
 * scrollspy, serif section headings, calm monochrome layout.
 */

import React from "react";
import { twClassNames } from "@/lib/subframe/utils";
import { Link } from "./HashRouter";

export interface DocSectionConfig {
  id: string;
  title: string;
  caption?: string;
  el: React.ReactNode;
}

export function PageShell({
  eyebrow,
  title,
  description,
  sections,
  wide,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  sections: DocSectionConfig[];
  wide?: boolean;
}) {
  const [active, setActive] = React.useState(sections[0]?.id ?? "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6">
      <header className="mb-12 max-w-3xl">
        <span className="font-code text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-heading-1 font-heading-1 text-default-font">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-prose font-prose text-neutral-600 dark:text-neutral-500">
            {description}
          </p>
        ) : null}
      </header>

      <div className="flex gap-12">
        <nav
          aria-label="Sections"
          className="sticky top-24 hidden h-fit w-52 shrink-0 flex-col gap-0.5 lg:flex"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={twClassNames(
                "rounded-md px-3 py-1.5 text-[13px] transition-colors",
                active === s.id
                  ? "bg-default-font/[0.05] font-medium text-default-font"
                  : "text-neutral-500 hover:text-default-font"
              )}
            >
              {s.title}
            </a>
          ))}
        </nav>

        <div
          className={twClassNames(
            "flex min-w-0 flex-1 flex-col gap-20",
            wide ? "max-w-none" : "max-w-3xl"
          )}
        >
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-heading-2 font-heading-2 text-default-font">
                {s.title}
              </h2>
              {s.caption ? (
                <p className="mt-2 mb-8 max-w-2xl text-body-medium text-neutral-500">
                  {s.caption}
                </p>
              ) : (
                <div className="mb-8" />
              )}
              {s.el}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Small labeled block used across doc views. */
export function Labeled({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}

/** Quiet note / callout block. */
export function Note({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "warning";
}) {
  return (
    <div
      className={twClassNames(
        "rounded-lg border px-4 py-3 text-body-medium",
        tone === "warning"
          ? "border-warning-300 bg-warning-50 text-warning-800 dark:text-warning-200"
          : "border-default-border bg-neutral-100 text-neutral-600 dark:text-neutral-500"
      )}
    >
      {children}
    </div>
  );
}

/** Inline mono token chip. */
export function Token({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-[4px] bg-default-font/[0.06] px-1.5 py-0.5 font-code text-[12px] text-default-font">
      {children}
    </code>
  );
}

/** Link styled as quiet inline reference. */
export function RefLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="font-medium text-default-font underline decoration-default-border underline-offset-4 hover:decoration-default-font"
    >
      {children}
    </Link>
  );
}
