/**
 * Foundations documentation data for the Praxis design system.
 *
 * Every value below is lifted verbatim from the Subframe export's
 * `components/theme.css` (light `:root` + `.dark` blocks) and, for the
 * material ramp, from the ported runtime constants in
 * `src/lib/glass/engine-detect.ts` (MATERIAL_RAMP). Nothing here is
 * invented — this file is the typed mirror the foundations views render.
 */

/* ---------------------------------------------------------------------------
 * Color scales
 * ------------------------------------------------------------------------- */

export type ColorScaleName = "neutral" | "brand" | "success" | "warning" | "destructive";

/** One step of a color scale (50–900) with its light- and dark-mode values. */
export interface ColorStepDoc {
  /** Step label, e.g. "50". */
  name: string;
  /** `:root` value from theme.css. */
  light: string;
  /** `.dark` value from theme.css. */
  dark: string;
}

/** Ordered iteration helper for the scale keys. */
export const COLOR_SCALE_NAMES: readonly ColorScaleName[] = [
  "neutral",
  "brand",
  "success",
  "warning",
  "destructive",
];

/**
 * The five ramp families, steps 50–900, light and dark values exactly as
 * authored in theme.css. Neutral and brand are intentionally identical —
 * the system is monochrome and brand simply aliases the neutral ramp.
 */
export const COLOR_SCALES: Record<ColorScaleName, ColorStepDoc[]> = {
  neutral: [
    { name: "50", light: "rgb(251 251 249)", dark: "rgb(11 11 10)" },
    { name: "100", light: "rgb(244 242 236)", dark: "rgb(21 21 19)" },
    { name: "200", light: "rgb(233 230 223)", dark: "rgb(42 41 38)" },
    { name: "300", light: "rgb(214 210 199)", dark: "rgb(58 56 53)" },
    { name: "400", light: "rgb(179 175 163)", dark: "rgb(85 82 76)" },
    { name: "500", light: "rgb(138 135 126)", dark: "rgb(143 140 132)" },
    { name: "600", light: "rgb(110 107 98)", dark: "rgb(168 164 155)" },
    { name: "700", light: "rgb(76 74 67)", dark: "rgb(196 192 182)" },
    { name: "800", light: "rgb(42 41 38)", dark: "rgb(221 217 207)" },
    { name: "900", light: "rgb(21 20 15)", dark: "rgb(241 239 233)" },
  ],
  brand: [
    { name: "50", light: "rgb(251 251 249)", dark: "rgb(11 11 10)" },
    { name: "100", light: "rgb(244 242 236)", dark: "rgb(21 21 19)" },
    { name: "200", light: "rgb(233 230 223)", dark: "rgb(42 41 38)" },
    { name: "300", light: "rgb(214 210 199)", dark: "rgb(58 56 53)" },
    { name: "400", light: "rgb(179 175 163)", dark: "rgb(85 82 76)" },
    { name: "500", light: "rgb(138 135 126)", dark: "rgb(143 140 132)" },
    { name: "600", light: "rgb(110 107 98)", dark: "rgb(168 164 155)" },
    { name: "700", light: "rgb(76 74 67)", dark: "rgb(196 192 182)" },
    { name: "800", light: "rgb(42 41 38)", dark: "rgb(221 217 207)" },
    { name: "900", light: "rgb(21 20 15)", dark: "rgb(241 239 233)" },
  ],
  success: [
    { name: "50", light: "rgb(237 250 243)", dark: "rgb(8 37 24)" },
    { name: "100", light: "rgb(209 242 224)", dark: "rgb(13 58 37)" },
    { name: "200", light: "rgb(163 229 194)", dark: "rgb(18 79 50)" },
    { name: "300", light: "rgb(109 211 158)", dark: "rgb(23 101 63)" },
    { name: "400", light: "rgb(61 186 122)", dark: "rgb(45 165 104)" },
    { name: "500", light: "rgb(28 122 77)", dark: "rgb(86 207 144)" },
    { name: "600", light: "rgb(23 101 63)", dark: "rgb(126 219 169)" },
    { name: "700", light: "rgb(18 79 50)", dark: "rgb(166 231 194)" },
    { name: "800", light: "rgb(13 58 37)", dark: "rgb(206 243 219)" },
    { name: "900", light: "rgb(8 37 24)", dark: "rgb(237 250 243)" },
  ],
  warning: [
    { name: "50", light: "rgb(254 248 234)", dark: "rgb(44 29 0)" },
    { name: "100", light: "rgb(252 237 197)", dark: "rgb(77 51 0)" },
    { name: "200", light: "rgb(248 217 138)", dark: "rgb(110 72 0)" },
    { name: "300", light: "rgb(239 192 80)", dark: "rgb(143 94 0)" },
    { name: "400", light: "rgb(214 155 26)", dark: "rgb(196 142 26)" },
    { name: "500", light: "rgb(176 116 0)", dark: "rgb(224 168 58)" },
    { name: "600", light: "rgb(143 94 0)", dark: "rgb(232 188 100)" },
    { name: "700", light: "rgb(110 72 0)", dark: "rgb(240 208 142)" },
    { name: "800", light: "rgb(77 51 0)", dark: "rgb(247 228 184)" },
    { name: "900", light: "rgb(44 29 0)", dark: "rgb(254 248 234)" },
  ],
  destructive: [
    { name: "50", light: "rgb(254 240 238)", dark: "rgb(54 16 12)" },
    { name: "100", light: "rgb(253 216 212)", dark: "rgb(87 26 19)" },
    { name: "200", light: "rgb(245 174 167)", dark: "rgb(120 36 27)" },
    { name: "300", light: "rgb(228 127 116)", dark: "rgb(154 47 35)" },
    { name: "400", light: "rgb(208 88 72)", dark: "rgb(212 82 72)" },
    { name: "500", light: "rgb(187 58 44)", dark: "rgb(255 111 99)" },
    { name: "600", light: "rgb(154 47 35)", dark: "rgb(255 145 137)" },
    { name: "700", light: "rgb(120 36 27)", dark: "rgb(255 179 174)" },
    { name: "800", light: "rgb(87 26 19)", dark: "rgb(255 213 210)" },
    { name: "900", light: "rgb(54 16 12)", dark: "rgb(255 240 238)" },
  ],
};

/* ---------------------------------------------------------------------------
 * Color singletons
 * ------------------------------------------------------------------------- */

/** A named color token outside any ramp, with light/dark variants. */
export interface ColorSingletonDoc {
  name: string;
  light: string;
  dark: string;
  description: string;
}

/**
 * The four standalone color tokens from theme.css — the canvas, the panel
 * surface, the border hairline and the ink every component inherits.
 */
export const COLOR_SINGLETONS: ColorSingletonDoc[] = [
  {
    name: "panel",
    light: "rgb(255 255 255)",
    dark: "rgb(21 21 19)",
    description:
      "Pure surface white (light) / near-black (dark) — the base every glass tint mixes over at 40–72% opacity.",
  },
  {
    name: "default-background",
    light: "rgb(251 251 249)",
    dark: "rgb(11 11 10)",
    description:
      "The document canvas behind all content, a whisper warmer than pure white.",
  },
  {
    name: "default-border",
    light: "rgb(233 230 223)",
    dark: "rgb(42 41 38)",
    description:
      "Hairline separator for in-flow structure — matches neutral-200 in both modes.",
  },
  {
    name: "default-font",
    light: "rgb(21 20 15)",
    dark: "rgb(241 239 233)",
    description:
      "The ink every component inherits — matches neutral-900; warm near-black on paper, paper on near-black.",
  },
];

/* ---------------------------------------------------------------------------
 * Typography
 * ------------------------------------------------------------------------- */

export type FontFamilyName = "Inter" | "Source Serif 4" | "IBM Plex Mono";

/** One text style from the theme's `--text-*` token block. */
export interface TypographyStyleDoc {
  /** Token name, e.g. "heading-1" (used as `text-heading-1`). */
  name: string;
  family: FontFamilyName;
  size: string;
  weight: number;
  lineHeight: string;
  letterSpacing: string;
  usage: string;
}

/**
 * All nine text styles with their exact theme.css values. Two families do
 * the work: Inter for UI, Source Serif 4 for headings and long-form prose,
 * IBM Plex Mono for code and numeric readouts.
 */
export const TYPOGRAPHY_STYLES: TypographyStyleDoc[] = [
  {
    name: "body",
    family: "Inter",
    size: "16px",
    weight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    usage:
      "Default reading size for paragraphs, labels and general product copy.",
  },
  {
    name: "body-medium",
    family: "Inter",
    size: "14px",
    weight: 400,
    lineHeight: "20px",
    letterSpacing: "0em",
    usage:
      "Denser body copy for table rows, list items and secondary descriptions.",
  },
  {
    name: "caption",
    family: "Inter",
    size: "13px",
    weight: 400,
    lineHeight: "19px",
    letterSpacing: "0em",
    usage:
      "The smallest UI voice — metadata, timestamps and helper annotations.",
  },
  {
    name: "heading-1",
    family: "Source Serif 4",
    size: "28px",
    weight: 600,
    lineHeight: "35px",
    letterSpacing: "-0.01em",
    usage:
      "Top-level page titles set in the serif display voice with the tightest tracking.",
  },
  {
    name: "heading-2",
    family: "Source Serif 4",
    size: "22px",
    weight: 600,
    lineHeight: "29px",
    letterSpacing: "-0.005em",
    usage: "Major section headings inside a page.",
  },
  {
    name: "heading-3",
    family: "Source Serif 4",
    size: "17px",
    weight: 600,
    lineHeight: "23px",
    letterSpacing: "0em",
    usage: "Card and panel titles that sit close to body content.",
  },
  {
    name: "prose",
    family: "Source Serif 4",
    size: "19px",
    weight: 400,
    lineHeight: "31px",
    letterSpacing: "0em",
    usage:
      "Long-form documentation and article text with a generous reading measure.",
  },
  {
    name: "default",
    family: "Inter",
    size: "16px",
    weight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    usage:
      "The unstyled baseline every component inherits before a named text style is applied.",
  },
  {
    name: "code",
    family: "IBM Plex Mono",
    size: "13px",
    weight: 400,
    lineHeight: "20px",
    letterSpacing: "0em",
    usage:
      "Monospace for code, terminal output, timecodes and tabular numeric readouts.",
  },
];

/* ---------------------------------------------------------------------------
 * Radius
 * ------------------------------------------------------------------------- */

/** A corner-radius token. */
export interface RadiusTokenDoc {
  name: string;
  value: string;
  description: string;
}

/**
 * The four theme radius tokens plus the two shape-system constants from the
 * glass vocabulary (capsule and card geometry from SHAPE_RADIUS).
 */
export const RADIUS_TOKENS: RadiusTokenDoc[] = [
  {
    name: "sm",
    value: "3px",
    description:
      "Hairline controls and small inline elements — badges, method chips, toolbar members.",
  },
  {
    name: "md",
    value: "3px",
    description:
      "Alias of sm — the export pins medium to the same 3px default.",
  },
  {
    name: "lg",
    value: "8px",
    description:
      "The default container radius for cards, panels, fields and code panes.",
  },
  {
    name: "xl",
    value: "8px",
    description: "Alias of lg — large sheets and media frames.",
  },
  {
    name: "capsule",
    value: "9999px",
    description:
      "Fully rounded pill geometry for chips, laid objects and transport controls (glass shape `capsule`).",
  },
  {
    name: "card",
    value: "16px",
    description:
      "Glass card geometry from the shape system — the roundest anchored silhouette (glass shape `card`).",
  },
];

/* ---------------------------------------------------------------------------
 * Shadows
 * ------------------------------------------------------------------------- */

/** A box-shadow token. Glass shadows are mode-invariant; only `default` forks. */
export interface ShadowTokenDoc {
  name: string;
  /** Value in light mode. */
  value: string;
  /** `.dark` override from theme.css, when the token differs by mode. */
  darkValue?: string;
  description: string;
}

/**
 * The elevation + glass edge vocabulary. In this system elevation is rare
 * (`default`) and glass edges are everything else — specular insets, a
 * hairline rim, and the composed surface treatment.
 */
export const SHADOW_TOKENS: ShadowTokenDoc[] = [
  {
    name: "default",
    value: "0px 12px 40px 0px rgb(21 20 15 / 0.18)",
    darkValue: "0px 12px 40px 0px rgb(0 0 0 / 0.55)",
    description:
      "The one true elevation shadow — reserved for genuinely floating layers such as dialogs and popovers.",
  },
  {
    name: "glass-specular",
    value:
      "inset 0px 1px 0px 0px rgb(255 255 255 / 0.26), inset 0px -1px 0px 0px rgb(255 255 255 / 0.1)",
    description:
      "Top and bottom specular insets that give a glass surface its lit edge.",
  },
  {
    name: "glass-hairline",
    value: "0px 0px 0px 1px rgb(255 255 255 / 0.08)",
    description:
      "A 1px light-catching outline that separates glass from the backdrop without casting.",
  },
  {
    name: "glass-surface",
    value:
      "inset 0px 1px 0px 0px rgb(255 255 255 / 0.26), inset 0px -1px 0px 0px rgb(255 255 255 / 0.1), 0px 0px 0px 1px rgb(255 255 255 / 0.08)",
    description:
      "Specular insets plus the hairline rim composed — the complete edge treatment of a finished glass surface.",
  },
];

/* ---------------------------------------------------------------------------
 * Blur
 * ------------------------------------------------------------------------- */

/** One stop of the backdrop blur scale. */
export interface BlurTokenDoc {
  name: string;
  /** Blur radius in px. */
  px: number;
}

/**
 * The pinned backdrop-blur scale used by the Tailwind utilities
 * `backdrop-blur-sm … backdrop-blur-3xl`. Note the material ramp's own
 * blur values (16–56px) are driven by the glass runtime, not this scale.
 */
export const BLUR_SCALE: BlurTokenDoc[] = [
  { name: "sm", px: 4 },
  { name: "md", px: 12 },
  { name: "lg", px: 16 },
  { name: "xl", px: 24 },
  { name: "2xl", px: 40 },
  { name: "3xl", px: 64 },
];

/* ---------------------------------------------------------------------------
 * Spacing
 * ------------------------------------------------------------------------- */

/** One extension beyond Tailwind's default spacing scale. */
export interface SpacingExtensionDoc {
  /** Tailwind spacing key (multiplier of the 4px base). */
  name: string;
  /** Value as authored in the export's tailwind.config.js. */
  value: string;
  /** Equivalent at the 16px root. */
  px: number;
}

/** Spacing scale documentation: base note + the export's extensions. */
export interface SpacingScaleDoc {
  baseNote: string;
  extended: SpacingExtensionDoc[];
}

/**
 * Spacing runs on Tailwind's standard 4px-base scale; the export extends it
 * with five large keys for player cards, timelines and page-level sheets.
 */
export const SPACING_SCALE: SpacingScaleDoc = {
  baseNote:
    "Standard Tailwind spacing in 4px increments (1 = 4px … 96 = 384px); the export extends it with the large-format keys below.",
  extended: [
    { name: "112", value: "28rem", px: 448 },
    { name: "144", value: "36rem", px: 576 },
    { name: "192", value: "48rem", px: 768 },
    { name: "256", value: "64rem", px: 1024 },
    { name: "320", value: "80rem", px: 1280 },
  ],
};

/* ---------------------------------------------------------------------------
 * Material ramp
 * ------------------------------------------------------------------------- */

export type MaterialLevelName = "ultrathin" | "thin" | "regular" | "thick";

/** One level of the liquid-glass material ramp. */
export interface MaterialLevelDoc {
  level: MaterialLevelName;
  /** In-filter frost — feGaussianBlur stdDeviation, 0–1px (kube.io range). */
  blur: number;
  /** feColorMatrix saturate multiplier on the refracted content (×4–×9). */
  saturate: number;
  /** White tint alpha on the glass layer, percent. */
  tint: number;
  /** WebGL refraction strength, 0–1. */
  strength: number;
  /** The shipped kube.io maxDisplacement constant (filter scale at ×1). */
  displacement: number;
  description: string;
}

/**
 * The four material levels — the same values the glass runtime's MATERIAL_RAMP
 * negotiates per engine tier (backdrop-filter base, SVG displacement on
 * Chromium, WebGL refraction elsewhere). Each level reuses one shipped
 * kube.io reference component, constants verbatim.
 */
export const MATERIAL_RAMP_DOCS: MaterialLevelDoc[] = [
  {
    level: "ultrathin",
    blur: 0.2,
    saturate: 4,
    tint: 5,
    strength: 0.35,
    displacement: 55.65,
    description:
      "The scrim end of the scrim-to-sheet range — glass that must barely register over large ambient fields. kube.io switch-thumb constants.",
  },
  {
    level: "thin",
    blur: 1,
    saturate: 4,
    tint: 5,
    strength: 0.5,
    displacement: 78.53,
    description:
      "Light-touch floating chrome up to sheet weight, where the content underneath stays the priority. kube.io searchbox constants.",
  },
  {
    level: "regular",
    blur: 0,
    saturate: 9,
    tint: 5,
    strength: 0.65,
    displacement: 122.81,
    description:
      "The anchor level and system default — the material of GlassChip, FloatingToolbar and most laid objects. kube.io magnifying-glass constants.",
  },
  {
    level: "thick",
    blur: 0.2,
    saturate: 4,
    tint: 6,
    strength: 0.85,
    displacement: 133.97,
    description:
      "The legibility floor for text over busy content — dialogs, drawers and anything that must be read. kube.io hero-lens constants.",
  },
];
