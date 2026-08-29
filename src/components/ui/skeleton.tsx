import { cn } from "@/lib/utils"

// Praxis audit notes:
// - Fill = the hairline tone (neutral-200) in BOTH themes: `--color-neutral-200`
//   is the inverted Praxis scale, so light gets #e9e6df (readable on #fbfbf9 bg
//   and white panels) and dark gets #2a2926 (readable on #151513 panels /
//   #0b0b0a background). `bg-accent` would be invisible in dark (accent ===
//   panel color) and nearly invisible on the light page background.
// - rounded-md resolves to the 3px small-control token; callers override to
//   rounded-lg / rounded-full for panel- and avatar-shaped placeholders.
// - aria-hidden: the shimmer blocks are purely decorative — the loading state
//   is conveyed by the surrounding region (e.g. aria-busy / role="status"),
//   never by the pulsing boxes themselves.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "bg-neutral-200 animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
