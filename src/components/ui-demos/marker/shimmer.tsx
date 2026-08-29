"use client"

import { Marker, MarkerContent } from "@/components/ui/marker"

/**
 * Shimmer demo — the effect is defined locally (opacity-only pulse,
 * per the calm-transitions rule) because the `shimmer` utility class
 * referenced by the upstream docs snippet has no global definition.
 */
export function MarkerShimmerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <style>{`
        @keyframes praxis-marker-shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .praxis-marker-shimmer {
          animation: praxis-marker-shimmer 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .praxis-marker-shimmer { animation: none; }
        }
      `}</style>
      <Marker role="status">
        <MarkerContent className="praxis-marker-shimmer">
          Thinking...
        </MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent className="praxis-marker-shimmer">
          Reading 4 files
        </MarkerContent>
      </Marker>
    </div>
  )
}
