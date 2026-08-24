"use client";

/**
 * Hash-based router — the sandbox exposes a single Next.js route, so the
 * design-system site runs as one page with hash navigation (#/components/glass-chip).
 * Back/forward, deep links and scrolling all behave like real routes.
 */

import React from "react";

export interface Route {
  /** "#/components/glass-chip" → "/components/glass-chip" */
  path: string;
  segments: string[];
}

function parse(): Route {
  if (typeof window === "undefined") {
    return { path: "/", segments: [] };
  }
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const segments = path.split("/").filter(Boolean);
  return { path, segments };
}

export function useRoute(): Route {
  const [route, setRoute] = React.useState<Route>(parse);

  React.useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  if (typeof window === "undefined") return;
  const target = path.startsWith("/") ? path : `/${path}`;
  if (window.location.hash === `#${target}`) return;
  window.location.hash = target;
}

/** Scroll to top whenever the path (not anchor) changes. */
export function useScrollRestoration(route: Route) {
  const { path } = route;
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);
}

export function Link({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  return (
    <a
      href={`#${to.startsWith("/") ? to : `/${to}`}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
