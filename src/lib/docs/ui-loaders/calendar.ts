// Auto-generated demo loaders for Calendar.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/calendar/basic"),
  "booked-dates": () => import("@/components/ui-demos/calendar/booked-dates"),
  "custom-cell-size": () => import("@/components/ui-demos/calendar/custom-cell-size"),
  "date-and-time-picker": () => import("@/components/ui-demos/calendar/date-and-time-picker"),
  "month-and-year-selector": () => import("@/components/ui-demos/calendar/month-and-year-selector"),
  "persian-hijri-jalali-calendar": () => import("@/components/ui-demos/calendar/persian-hijri-jalali-calendar"),
  "presets": () => import("@/components/ui-demos/calendar/presets"),
  "range-calendar": () => import("@/components/ui-demos/calendar/range-calendar"),
  "rtl": () => import("@/components/ui-demos/calendar/rtl"),
  "selected-date-with-timezone": () => import("@/components/ui-demos/calendar/selected-date-with-timezone"),
  "week-numbers": () => import("@/components/ui-demos/calendar/week-numbers"),
};

export async function loadVariant(variantSlug: string): Promise<any | null> {
  const loader = DEMO_LOADERS[variantSlug];
  if (!loader) return null;
  try {
    return await loader();
  } catch {
    return null;
  }
}
