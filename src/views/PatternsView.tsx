"use client";

/**
 * PatternsView — the Patterns document: how the laid-object components compose
 * into surfaces over live content. Three sections live here — floating HUDs,
 * contextual chunking, and vibrancy over opacity — plus B16's
 * ScrimPatternsSection rendered as the progressive-blur section. Every demo is
 * deterministic; the HUDs are absolutely positioned against their stage's
 * margin box, which is the "chrome floats on the canvas" pattern made literal.
 */

import { PageShell, Labeled, Note, Token } from "@/components/site/DocPage";
import { DemoStage } from "@/components/site/DemoStage";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";
import { GlassChip } from "@/components/ds/GlassChip";
import { TransportBar } from "@/components/ds/TransportBar";
import { PlayerBar } from "@/components/ds/PlayerBar";
import { AtmosphereScrim } from "@/components/ds/AtmosphereScrim";
import { GlassSurface } from "@/lib/glass";
import { ScrimPatternsSection } from "./sections/patterns/ScrimPatternsSection";

/** Light specimen lines for the vibrancy demo's dark half — mirrors the
 * DemoStage text variant so the material has content to sample on both sides. */
const DARK_SPECIMEN_LINES = Array.from(
  { length: 8 },
  (_, i) =>
    `The quick brown fox jumps over the lazy dog — dark specimen line ${String(
      i + 1
    ).padStart(2, "0")}`
);

/* ------------------------------------------------------------------ */
/* §1 — Floating HUDs over content                                     */
/* ------------------------------------------------------------------ */

function HudSection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 1 · Doctrine */}
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Chrome that acts on content lives on the canvas itself. In Praxis,
          breadcrumbs, toolbars and player controls are not bands carved out of
          the document flow — they are HUDs floated directly over it,
          positioned against the content region&rsquo;s margin box so they move
          dynamically as margins appear, disappear and re-flow. Nothing under a
          HUD is reserved: the text runs to the full column, and the glass
          simply occupies the topmost layer of the same canvas. Elevation is
          the material&rsquo;s job, never shadow or fill — a laid object
          carries the specular insets of <Token>shadow-glass-surface</Token>{" "}
          and a hairline rim, while <Token>shadow-default</Token>, the one true
          cast shadow, is reserved for overlays that dim the page.
        </p>
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The second half of the pattern is contextual chunking. Rather than
          one full-length toolbar ribbon that owns a strip of the interface,
          actions group into standalone floating capsules — chips — each placed
          where it acts: a selection gets a duplicate-or-discard chip beside
          it, a document region gets one toolbar of related commands near its
          top edge. The user reads each capsule as an object because elevation
          is perceived through bent light along the capsule perimeter — on the
          displacement tier the backdrop is literally refracted around the rim,
          and on the base tier the dual-gradient sheen and the 20% white rim
          draw the same edge in two dimensions.
        </p>
      </div>

      {/* 2 · Demo A — toolbar and chip coexisting on one canvas */}
      <Labeled label="Demo A — toolbar and chip over one canvas">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <DemoStage variant="text" height="h-80" />
            {/* HUD 1 — the toolbar, docked to the top of the content region */}
            <div className="absolute inset-x-0 top-5 z-10 flex justify-center px-3">
              <FloatingToolbar className="hidden sm:flex">
                <FloatingToolbar.Action glyph="⌘" label="Share" />
                <FloatingToolbar.Action glyph="⟲" label="Rerun" />
                <FloatingToolbar.Rule />
                <FloatingToolbar.Action glyph="↓" label="Export" />
                <FloatingToolbar.Action
                  glyph="⌫"
                  label="Delete"
                  tone="destructive"
                />
              </FloatingToolbar>
              {/* compact toolbar below 640px — same pattern, fewer actions */}
              <FloatingToolbar className="flex sm:hidden">
                <FloatingToolbar.Action glyph="⌘" label="Share" />
                <FloatingToolbar.Action glyph="⟲" label="Rerun" />
                <FloatingToolbar.Rule />
                <FloatingToolbar.Action
                  glyph="⌫"
                  label="Delete"
                  tone="destructive"
                />
              </FloatingToolbar>
            </div>
            {/* HUD 2 — one contextual chip, floating in the region's corner */}
            <div className="absolute right-4 bottom-4 z-10">
              <GlassChip>
                <GlassChip.Action glyph="⇧" label="Duplicate" />
                <GlassChip.Rule />
                <GlassChip.Action label="Discard" tone="destructive" />
              </GlassChip>
            </div>
          </div>
          <p className="font-code text-[11px] leading-4 text-neutral-400 select-none">
            FloatingToolbar docked to the top edge of the region · GlassChip
            floating in its bottom-right corner — both positioned against the
            stage&rsquo;s margin box and held above the content by material
            alone (narrow viewports swap in a compact toolbar).
          </p>
        </div>
      </Labeled>

      {/* 3 · Demo B — transports dock, players pair with the scrim */}
      <Labeled label="Demo B — transports dock, players pair with the scrim">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <DemoStage variant="grid" height="h-96" />
            {/* the graded defocus field the player rides on */}
            <AtmosphereScrim className="h-48" />
            {/* the bottom cluster — transport docked above the player */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 px-2 pb-4 sm:px-4 sm:pb-5">
              <div className="flex w-full justify-center">
                <div className="scale-[0.68] sm:scale-100">
                  <TransportBar
                    currentTime="00:42"
                    totalTime="12:08"
                    speed="1.0×"
                  />
                </div>
              </div>
              <PlayerBar
                className="max-w-full"
                position="03:12 / 18:40"
                explainLabel="Explain"
                excerpt="The interface recedes and the work remains — playback controls stay near the content they act on, held above the canvas by material alone."
              />
            </div>
          </div>
          <p className="max-w-2xl text-body-medium text-neutral-500">
            Transports dock to content regions — this TransportBar is pinned
            flush against the playback cluster it controls. Player bars pair
            with the AtmosphereScrim: the PlayerBar sits low in the graded blur
            field, where the defocus is strongest, so the grid dissolves before
            it reaches the controls. Both are laid objects — the material holds
            them above the content, and no cast shadow is involved.
          </p>
        </div>
      </Labeled>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* §2 — Contextual chunking                                            */
/* ------------------------------------------------------------------ */

function ChunkingSection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 1 · The isolation principle */}
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Contextual chunking runs on an isolation principle: each capsule owns
          exactly one intent. The chip below carries a single action — ⌘K,
          Shortcut — and that completeness is what lets a user parse it at a
          glance. A capsule holding duplicate-or-discard still owns one intent,
          acting on the selection; the moment it also navigates and plays
          media it owns three, and no amount of visual grouping will make it
          read as one object again. When a second family of actions appears, it
          becomes a second capsule floated next to the content it acts on —
          never a second wing bolted onto the first.
        </p>
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The Rule is the hairline that keeps grouping honest inside a toolbar.
          It separates groups within one family — the safe actions before it,
          the destructive ones after — so each group keeps its identity while
          the family travels as one object. What a Rule never does is merge
          families: Share, Export and Delete may share a toolbar because they
          all act on the document, whereas playback, navigation and editing
          never share a capsule, however many Rules divide it. Rules divide;
          they never combine. Chip and toolbar are the same substance at two
          scales — compare the surfaces below.
        </p>
      </div>

      {/* 2 · One intent vs one family, over a shared stage */}
      <Labeled label="One intent vs one family — the same substance, two scales">
        <DemoStage variant="text" height="h-64">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
            <div className="flex flex-col items-center gap-2.5">
              <GlassChip>
                <GlassChip.Action glyph="⌘K" label="Shortcut" />
              </GlassChip>
              <span className="font-code text-[11px] text-neutral-500 select-none">
                GlassChip — one intent
              </span>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <FloatingToolbar className="hidden sm:flex">
                <FloatingToolbar.Action glyph="✓" label="Approve" />
                <FloatingToolbar.Action glyph="✎" label="Edit" />
                <FloatingToolbar.Rule />
                <FloatingToolbar.Action glyph="↗" label="Publish" />
                <FloatingToolbar.Action
                  glyph="⌫"
                  label="Delete"
                  tone="destructive"
                />
              </FloatingToolbar>
              {/* compact toolbar below 640px — same family, fewer members */}
              <FloatingToolbar className="flex sm:hidden">
                <FloatingToolbar.Action glyph="✓" label="Approve" />
                <FloatingToolbar.Action glyph="✎" label="Edit" />
                <FloatingToolbar.Rule />
                <FloatingToolbar.Action
                  glyph="⌫"
                  label="Delete"
                  tone="destructive"
                />
              </FloatingToolbar>
              <span className="font-code text-[11px] text-neutral-500 select-none">
                FloatingToolbar — one family, grouped by Rule
              </span>
            </div>
          </div>
        </DemoStage>
      </Labeled>

      {/* 3 · The comparison table */}
      <Labeled label="Chip vs toolbar — surface, radius, when to use">
        <div className="overflow-x-auto rounded-lg border border-solid border-default-border">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="bg-neutral-100">
                <th className="w-28 border-b border-solid border-default-border px-3 py-2.5 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase" />
                <th className="border-b border-solid border-default-border px-3 py-2.5 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                  GlassChip
                </th>
                <th className="border-b border-solid border-default-border px-3 py-2.5 font-code text-[11px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                  FloatingToolbar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t border-solid border-default-border px-3 py-3 font-body text-body-medium font-medium text-default-font">
                  Surface
                </td>
                <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                  panel/60 · blur 40px · saturate 150%
                </td>
                <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                  panel/50 · blur 28px · saturate 135%
                </td>
              </tr>
              <tr>
                <td className="border-t border-solid border-default-border px-3 py-3 font-body text-body-medium font-medium text-default-font">
                  Radius
                </td>
                <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                  9999px — full pill
                </td>
                <td className="whitespace-nowrap border-t border-solid border-default-border px-3 py-3 font-code text-[12px] text-default-font tabular-nums">
                  22px — soft rectangle
                </td>
              </tr>
              <tr>
                <td className="border-t border-solid border-default-border px-3 py-3 font-body text-body-medium font-medium text-default-font">
                  When to use
                </td>
                <td className="border-t border-solid border-default-border px-3 py-3 text-body-medium text-neutral-600 dark:text-neutral-500">
                  One intent traveling alone — a shortcut, a toggle, a single
                  command beside the content it acts on.
                </td>
                <td className="border-t border-solid border-default-border px-3 py-3 text-body-medium text-neutral-600 dark:text-neutral-500">
                  One family of related actions traveling together, its groups
                  separated by Rules.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Labeled>

      {/* 4 · The rule, restated */}
      <Note>
        <span className="font-medium text-default-font">
          One intent per capsule — Rules separate groups, they never merge
          families.
        </span>{" "}
        A Rule inside a toolbar divides one family into groups — the safe
        actions from the destructive ones. No number of Rules can weld two
        families into a single object: when playback, navigation and editing
        meet on one canvas, each becomes its own capsule, placed where that
        family acts.
      </Note>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* §3 — Vibrancy over opacity                                          */
/* ------------------------------------------------------------------ */

function VibrancySection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 1 · Doctrine */}
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          The naive glass recipe is a translucent fill: paint the capsule{" "}
          <Token>rgba(255,255,255,0.7)</Token> and stop. The result is a film,
          not a material. Whatever sits beneath it is dimmed but not
          interpreted — sharp text keeps glaring through at 30% contrast, dark
          content turns the film into a slab of glare, bright content erases
          the capsule&rsquo;s edge entirely — and because the film&rsquo;s
          lightness is fixed, any label on it stays legible only while the
          content beneath happens to cooperate. Opacity removes information
          from the backdrop without adding structure of its own. It flattens.
        </p>
        <p className="max-w-2xl text-body text-neutral-600 dark:text-neutral-500">
          Vibrancy — the principle behind Apple&rsquo;s HIG materials — treats
          the backdrop as input. The material samples it, defocuses it, and
          reshapes its luminance and chroma so content stays present while
          receding: dark regions are lifted and quieted, bright regions are
          softened, and high-frequency chroma noise averages away in the blur.
          Because the material sets the local background rather than borrowing
          it, ink contrast stays accessible over both dark and bright content.
          In Praxis, Regular does exactly this with <Token>blur(40px)</Token>,{" "}
          <Token>saturate(150%)</Token> and <Token>panel/60</Token> — the blur
          does the averaging, the saturation keeps the sample alive, and the
          tint pins the midpoint the label contrasts against.
        </p>
      </div>

      {/* 2 · The split-content demo — flat film vs Regular vibrancy */}
      <Labeled label="Regular over split content — dark half / bright half">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <DemoStage variant="text" height="h-96" />
            {/* the dark half — absolutely positioned, theme-independent */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-0 w-1/2"
              style={{ backgroundColor: "#15140F" }}
            >
              <div className="flex flex-col gap-2 p-6">
                {DARK_SPECIMEN_LINES.map((line) => (
                  <p
                    key={line}
                    className="truncate text-[12px] leading-[1.6] text-neutral-500 select-none"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {/* the two surfaces, each spanning the dark/bright boundary */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6">
              {/* anti-pattern: the fixed film */}
              <div
                className="flex h-20 w-full max-w-[320px] flex-col items-center justify-center gap-1 rounded-[16px] border border-solid border-white/40"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <span
                  className="font-body text-[15px] font-semibold"
                  style={{ color: "#15140F" }}
                >
                  The label you are reading
                </span>
                <span
                  className="font-code text-[11px]"
                  style={{ color: "rgba(21,20,15,0.65)" }}
                >
                  rgba(255,255,255,0.7) — fixed film
                </span>
              </div>
              {/* the material: Regular vibrancy */}
              <GlassSurface
                material="regular"
                shape="card"
                className="h-20 w-full max-w-[320px]"
              >
                <div className="flex w-full flex-col items-center gap-1 text-center">
                  <span className="font-body text-[15px] font-semibold text-default-font">
                    The label you are reading
                  </span>
                  <span className="font-code text-[11px] text-default-font">
                    Regular · blur 40px · saturate 150% · panel/60
                  </span>
                </div>
              </GlassSurface>
            </div>
            {/* half markers */}
            <span className="absolute bottom-2.5 left-3 z-10 font-code text-[10px] tracking-[0.12em] text-neutral-500 uppercase select-none">
              dark content
            </span>
            <span className="absolute right-3 bottom-2.5 z-10 font-code text-[10px] tracking-[0.12em] text-neutral-500 uppercase select-none">
              bright content
            </span>
          </div>
          <p className="max-w-2xl text-body-medium text-neutral-500">
            Same geometry, same position, same words. The fixed film glares
            over the dark half and lets sharp specimen text compete with the
            label over the bright one; the Regular material defocuses and
            resaturates whatever it covers, so the label sits on a calm local
            background — and stays legible — on both halves.
          </p>
        </div>
      </Labeled>

      {/* 3 · The rule, restated */}
      <Note>
        <span className="font-medium text-default-font">
          Never hand-roll glass with a fixed rgba fill.
        </span>{" "}
        If a surface floats over live content, it takes a material level — the
        tint tracks the theme, the blur and saturation track the backdrop, and
        the rim and sheen supply the edge. Fixed translucency is only
        acceptable where nothing lives beneath: page-level panels, not laid
        objects.
      </Note>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The view                                                            */
/* ------------------------------------------------------------------ */

export function PatternsView({ section }: { section?: string }) {
  // `section` is the deep-link slug (#/patterns/hud); all sections render on
  // one calm page, matching the sibling views.
  void section;
  return (
    <PageShell
      eyebrow="Patterns"
      title="Patterns"
      description="How components compose into surfaces over live content — floating HUDs, chunked actions, vibrancy and progressive blur."
      sections={[
        {
          id: "hud",
          title: "Floating HUDs over content",
          caption:
            "Breadcrumbs, toolbars and players float on the document canvas itself — material, never shadow, is what makes them read as elevated.",
          el: <HudSection />,
        },
        {
          id: "chunking",
          title: "Contextual chunking",
          caption:
            "The isolation principle: each capsule owns one intent. Rules separate groups inside a toolbar, but never merge families.",
          el: <ChunkingSection />,
        },
        {
          id: "vibrancy",
          title: "Vibrancy over opacity",
          caption:
            "A fixed translucent film flattens whatever it covers; a vibrancy material samples the backdrop and keeps ink legible over dark and bright content alike.",
          el: <VibrancySection />,
        },
        {
          id: "scrims",
          title: "Progressive blur scrims",
          caption:
            "Feathered blur fields that protect text as content scrolls under chrome.",
          el: <ScrimPatternsSection />,
        },
      ]}
    />
  );
}
