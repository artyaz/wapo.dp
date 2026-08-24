"use client";

/**
 * GlassRuntime — mounts once at the app root.
 *
 * 1. Negotiates the glass strategy on the client (after hydration — SSR always
 *    renders the base tier, which is also the safe default).
 * 2. Exposes { strategy, level } through GlassMaterialContext so consumers can
 *    read the active tier (the documented provider contract).
 * 3. Hosts the page-level <GlassFilters /> SVG defs for the Chromium tier.
 */

import React from "react";
import { negotiateStrategy } from "./engine-detect";
import { useGlassRuntime, GlassMaterialContext } from "./glass-store";
import { GlassFilters } from "./GlassFilters";
import type { MaterialLevel } from "./engine-detect";

export function GlassRuntime({
  children,
  level = "regular",
}: {
  children: React.ReactNode;
  level?: MaterialLevel;
}) {
  const strategy = useGlassRuntime((s) => s.strategy);
  const setStrategy = useGlassRuntime((s) => s.setStrategy);

  React.useEffect(() => {
    const s = negotiateStrategy();
    setStrategy(s);
  }, [setStrategy]);

  const value = React.useMemo(() => ({ strategy, level }), [strategy, level]);

  return (
    <GlassMaterialContext.Provider value={value}>
      {children}
      <GlassFilters />
    </GlassMaterialContext.Provider>
  );
}
