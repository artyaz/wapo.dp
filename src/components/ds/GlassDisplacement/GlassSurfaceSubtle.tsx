"use client";

/**
 * GlassSurfaceSubtle — a thin re-export of the shared GlassSurface runtime.
 *
 * Originally a local fork that pulled the chromatic aberration multipliers
 * down; the kube.io rewrite made that moot — the reference filter carries
 * NO chromatic aberration (one displacement map, one scale, monochrome
 * rim), which is exactly the "subtle" doctrine this fork wanted. The fork
 * is retired to stop the two implementations drifting apart; the export
 * name and prop surface are preserved for existing consumers.
 */

export { GlassSurface as GlassSurfaceSubtle } from "@/lib/glass/GlassSurface";
export type { GlassSurfaceProps as GlassSurfaceSubtleProps } from "@/lib/glass/GlassSurface";
