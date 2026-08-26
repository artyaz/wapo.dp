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

/** The route SSR always renders — also the pre-hydration client default. */
const SSR_ROUTE: Route = { path: "/", segments: [] };

function parse(): Route {
  if (typeof window === "undefined") {
    return SSR_ROUTE;
  }
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const segments = path.split("/").filter(Boolean);
  return { path, segments };
}

/**
 * Hydration-safe route hook.
 *
 * The initial state is ALWAYS the SSR route ("/") — never `parse()` — so the
 * first client render matches the server markup exactly (no attribute
 * mismatch on nav active states, no React hydration error). The real hash
 * route is adopted in the mount effect, one commit later, together with the
 * Router's own `mounted` gate in page.tsx.
 */
export function useRoute(): Route {
  const [route, setRoute] = React.useState<Route>(SSR_ROUTE);

  React.useEffect(() => {
    const onChange = () => setRoute(parse());
    onChange(); // adopt the real (possibly deep-linked) route after mount
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
