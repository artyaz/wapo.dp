// Auto-generated demo loaders for Questionnaire.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_LOADERS: Record<string, () => Promise<any>> = {
  "animated-items": () => import("@/components/ui-demos/questionnaire/animated-items"),
  "card": () => import("@/components/ui-demos/questionnaire/card"),
  "conditional-items": () => import("@/components/ui-demos/questionnaire/conditional-items"),
  "controlled": () => import("@/components/ui-demos/questionnaire/controlled"),
  "custom-progress": () => import("@/components/ui-demos/questionnaire/custom-progress"),
  "custom-validation": () => import("@/components/ui-demos/questionnaire/custom-validation"),
  "dialog": () => import("@/components/ui-demos/questionnaire/dialog"),
  "explicit-skip": () => import("@/components/ui-demos/questionnaire/explicit-skip"),
  "freeform-answer": () => import("@/components/ui-demos/questionnaire/freeform-answer"),
  "multiple-selection": () => import("@/components/ui-demos/questionnaire/multiple-selection"),
  "navigation-state": () => import("@/components/ui-demos/questionnaire/navigation-state"),
  "resume": () => import("@/components/ui-demos/questionnaire/resume"),
  "shortcuts": () => import("@/components/ui-demos/questionnaire/shortcuts"),
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
