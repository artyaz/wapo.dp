"use client";

import { create } from "zustand";
import type { GlassStrategy, MaterialLevel } from "./engine-detect";

/**
 * Global glass runtime state.
 *
 * - `strategy` is negotiated once on the client after mount. The initial
 *   render is always the safe base tier (backdrop-filter), and the runtime
 *   promotes the tier afterwards — the review's "ship blur-based glass as the
 *   base state, opt into url() refraction only on a Chromium-positive signal".
 *
 * - `filters` is the page-level SVG filter registry. Every GlassSurface
 *   registers a filter keyed by its geometry (size × radius × scales); the
 *   GlassFilters host renders <filter> defs for all registered entries with
 *   refcounting. Per-instance IDs sidestep the singleton-vs-multi-instance
 *   open question — identical geometry dedupes to one filter.
 */

export interface GlassFilterSpec {
  id: string;
  /** displacement map data-url */
  mapUrl: string;
  scaleR: number;
  scaleG: number;
  scaleB: number;
}

interface GlassRuntimeState {
  strategy: GlassStrategy;
  negotiated: boolean;
  filters: Record<string, GlassFilterSpec>;
  setStrategy: (strategy: GlassStrategy) => void;
  registerFilter: (key: string, spec: GlassFilterSpec) => void;
  unregisterFilter: (key: string) => void;
}

export const useGlassRuntime = create<GlassRuntimeState>((set) => ({
  strategy: "backdrop-filter",
  negotiated: false,
  filters: {},
  setStrategy: (strategy) => set({ strategy, negotiated: true }),
  registerFilter: (key, spec) =>
    set((state) => {
      if (state.filters[key]) return state; // refcount: keep-first wins
      return { filters: { ...state.filters, [key]: spec } };
    }),
  unregisterFilter: (key) =>
    set((state) => {
      if (!state.filters[key]) return state;
      const next = { ...state.filters };
      delete next[key];
      return { filters: next };
    }),
}));

/** Stable hash for filter ids (djb2, hex). */
export function hashKey(key: string): string {
  let h = 5381;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) + h + key.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

/**
 * React context carrying { strategy, level } to consumers — the documented
 * provider contract. GlassSurface consumes it so `material` can be inherited
 * from context when not set explicitly.
 */
import { createContext, useContext } from "react";

export interface GlassMaterialContextValue {
  strategy: GlassStrategy;
  level: MaterialLevel;
}

export const GlassMaterialContext = createContext<GlassMaterialContextValue>({
  strategy: "backdrop-filter",
  level: "regular",
});

export function useGlassMaterial(): GlassMaterialContextValue {
  return useContext(GlassMaterialContext);
}
