// Auto-generated demo loaders for Input Otp.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "alphanumeric": () => import("@/components/ui-demos/input-otp/alphanumeric"),
  "controlled": () => import("@/components/ui-demos/input-otp/controlled"),
  "disabled": () => import("@/components/ui-demos/input-otp/disabled"),
  "form": () => import("@/components/ui-demos/input-otp/form"),
  "four-digits": () => import("@/components/ui-demos/input-otp/four-digits"),
  "invalid": () => import("@/components/ui-demos/input-otp/invalid"),
  "pattern": () => import("@/components/ui-demos/input-otp/pattern"),
  "rtl": () => import("@/components/ui-demos/input-otp/rtl"),
  "separator": () => import("@/components/ui-demos/input-otp/separator"),
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
