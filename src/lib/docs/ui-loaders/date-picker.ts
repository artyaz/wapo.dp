// Auto-generated demo loaders for Date Picker.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "basic": () => import("@/components/ui-demos/date-picker/basic"),
  "date-of-birth": () => import("@/components/ui-demos/date-picker/date-of-birth"),
  "input": () => import("@/components/ui-demos/date-picker/input"),
  "natural-language-picker": () => import("@/components/ui-demos/date-picker/natural-language-picker"),
  "range-picker": () => import("@/components/ui-demos/date-picker/range-picker"),
  "rtl": () => import("@/components/ui-demos/date-picker/rtl"),
  "time-picker": () => import("@/components/ui-demos/date-picker/time-picker"),
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
