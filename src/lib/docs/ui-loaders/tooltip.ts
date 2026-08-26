// Auto-generated demo loaders for Tooltip.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "disabled-button": () => import("@/components/ui-demos/tooltip/disabled-button"),
  "rtl": () => import("@/components/ui-demos/tooltip/rtl"),
  "side": () => import("@/components/ui-demos/tooltip/side"),
  "with-keyboard-shortcut": () => import("@/components/ui-demos/tooltip/with-keyboard-shortcut"),
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
