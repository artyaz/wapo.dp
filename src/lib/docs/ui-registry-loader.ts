"use client";

/**
 * UI demo dispatcher — loads a per-component loader module lazily, so the
 * 423 demo files never enter the initial page graph (memory-friendly).
 */

import { UI_REGISTRY } from "./ui-registry-data";

export { UI_REGISTRY };

const COMPONENT_LOADERS: Record<string, () => Promise<{ loadVariant(v: string): Promise<unknown> }>> = {
  "accordion": () => import("./ui-loaders/accordion"),
  "alert": () => import("./ui-loaders/alert"),
  "alert-dialog": () => import("./ui-loaders/alert-dialog"),
  "aspect-ratio": () => import("./ui-loaders/aspect-ratio"),
  "attachment": () => import("./ui-loaders/attachment"),
  "avatar": () => import("./ui-loaders/avatar"),
  "badge": () => import("./ui-loaders/badge"),
  "breadcrumb": () => import("./ui-loaders/breadcrumb"),
  "bubble": () => import("./ui-loaders/bubble"),
  "button": () => import("./ui-loaders/button"),
  "button-group": () => import("./ui-loaders/button-group"),
  "calendar": () => import("./ui-loaders/calendar"),
  "card": () => import("./ui-loaders/card"),
  "carousel": () => import("./ui-loaders/carousel"),
  "chart": () => import("./ui-loaders/chart"),
  "checkbox": () => import("./ui-loaders/checkbox"),
  "collapsible": () => import("./ui-loaders/collapsible"),
  "combobox": () => import("./ui-loaders/combobox"),
  "command": () => import("./ui-loaders/command"),
  "context-menu": () => import("./ui-loaders/context-menu"),
  "data-table": () => import("./ui-loaders/data-table"),
  "date-picker": () => import("./ui-loaders/date-picker"),
  "dialog": () => import("./ui-loaders/dialog"),
  "drawer": () => import("./ui-loaders/drawer"),
  "dropdown-menu": () => import("./ui-loaders/dropdown-menu"),
  "empty": () => import("./ui-loaders/empty"),
  "field": () => import("./ui-loaders/field"),
  "hover-card": () => import("./ui-loaders/hover-card"),
  "input": () => import("./ui-loaders/input"),
  "input-group": () => import("./ui-loaders/input-group"),
  "input-otp": () => import("./ui-loaders/input-otp"),
  "item": () => import("./ui-loaders/item"),
  "kbd": () => import("./ui-loaders/kbd"),
  "label": () => import("./ui-loaders/label"),
  "marker": () => import("./ui-loaders/marker"),
  "menubar": () => import("./ui-loaders/menubar"),
  "message": () => import("./ui-loaders/message"),
  "message-scroller": () => import("./ui-loaders/message-scroller"),
  "native-select": () => import("./ui-loaders/native-select"),
  "navigation-menu": () => import("./ui-loaders/navigation-menu"),
  "pagination": () => import("./ui-loaders/pagination"),
  "popover": () => import("./ui-loaders/popover"),
  "progress": () => import("./ui-loaders/progress"),
  "questionnaire": () => import("./ui-loaders/questionnaire"),
  "radio-group": () => import("./ui-loaders/radio-group"),
  "resizable": () => import("./ui-loaders/resizable"),
  "scroll-area": () => import("./ui-loaders/scroll-area"),
  "select": () => import("./ui-loaders/select"),
  "separator": () => import("./ui-loaders/separator"),
  "sheet": () => import("./ui-loaders/sheet"),
  "sidebar": () => import("./ui-loaders/sidebar"),
  "skeleton": () => import("./ui-loaders/skeleton"),
  "slider": () => import("./ui-loaders/slider"),
  "spinner": () => import("./ui-loaders/spinner"),
  "switch": () => import("./ui-loaders/switch"),
  "table": () => import("./ui-loaders/table"),
  "tabs": () => import("./ui-loaders/tabs"),
  "textarea": () => import("./ui-loaders/textarea"),
  "toast": () => import("./ui-loaders/toast"),
  "toggle": () => import("./ui-loaders/toggle"),
  "toggle-group": () => import("./ui-loaders/toggle-group"),
  "tooltip": () => import("./ui-loaders/tooltip"),
  "typography": () => import("./ui-loaders/typography"),
  "code-block": () => import("./ui-loaders/code-block"),
  "direction": () => import("./ui-loaders/direction"),
  "file-upload": () => import("./ui-loaders/file-upload"),
  "kanban": () => import("./ui-loaders/kanban"),
  "mention": () => import("./ui-loaders/mention"),
  "stepper": () => import("./ui-loaders/stepper"),
  "filter-bar": () => import("./ui-loaders/filter-bar"),
  "timeline": () => import("./ui-loaders/timeline"),
};

export interface DemoModule {
  [key: string]: unknown;
}

export async function loadUIDemo(
  componentSlug: string,
  variantSlug: string
): Promise<DemoModule | null> {
  const componentLoader = COMPONENT_LOADERS[componentSlug];
  if (!componentLoader) return null;
  try {
    const mod = await componentLoader();
    return (await mod.loadVariant(variantSlug)) as DemoModule | null;
  } catch {
    return null;
  }
}

export function getUIComponent(slug: string) {
  return UI_REGISTRY.find((c) => c.slug === slug) ?? null;
}
