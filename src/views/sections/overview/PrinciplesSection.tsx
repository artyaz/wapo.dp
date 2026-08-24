"use client";

/**
 * PrinciplesSection — the "Principles" block of the overview: the five
 * commitments as numbered entries (mono number left, serif heading-3 title,
 * prose body), closing with a quiet link row into the materials and
 * foundations documentation.
 */

import { Link } from "@/components/site/HashRouter";

interface Principle {
  number: string;
  title: string;
  body: string;
}

/** The five commitments, in priority order — each one decides the next token. */
const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Content is the canvas",
    body: "Controls never compete with the user's primary content — the interface exists to serve the work, not to share the stage with it. Materials sample the colors beneath them rather than declaring colors of their own, so chrome integrates with the environment instead of sitting on top of it; that is the Apple Human Interface Guidelines' materials principle, adopted here as the first commitment. When a surface and the document beneath it disagree, the surface yields.",
  },
  {
    number: "02",
    title: "Calm over clever",
    body: "No gradients, no decorative color, no playful motion — nothing in the system performs for attention. Its expressiveness comes from restraint: hierarchy is decided with weight, spacing and typography, never with hue. The warm-gray monochrome palette keeps every screen quiet, so the little energy a screen does carry belongs to the work.",
  },
  {
    number: "03",
    title: "Refractive elevation",
    body: "Floating objects separate from their background optically, not mechanically. Light bends along their curved perimeters and specular rim highlights trace the edge from an upper-left key light, so a surface reads as physically above the canvas with nothing stacked beneath it. Drop shadows are reserved for true overlays — dialogs and popovers — the few surfaces that genuinely occlude the document.",
  },
  {
    number: "04",
    title: "Vibrancy over opacity",
    body: "An rgba fill flattens whatever it covers: over dark content it adds a gray film that deadens the work, and over bright content the text dissolves into the fill. Materials work on the backdrop instead — desaturating it and brightening its luminance, the vibrancy approach — so contrast stays accessible over dark and bright content alike. Legibility comes from the material's optics rather than from the strength of its fill, which is why the document keeps glowing through the chrome.",
  },
  {
    number: "05",
    title: "Swap implementation, never semantics",
    body: "Four material levels, one contract, three rendering tiers. Chromium draws the refraction with an SVG displacement map, Safari and Firefox with a WebGL lens, and every other engine with the backdrop-filter base of blur and saturation — but each level's blur, saturation, tint and displacement are specified once, never per tier. Promoting a surface between implementations changes how the light bends, never how thick the glass reads, so no redesign is owed when the implementation moves.",
  },
];

/** Shared class for the quiet onward links (matches the teaser sections). */
const linkClass =
  "text-body-medium font-medium text-default-font underline decoration-default-border underline-offset-4 transition-colors hover:decoration-default-font";

export function PrinciplesSection() {
  return (
    <div className="flex flex-col gap-12">
      <ol className="flex flex-col gap-12 sm:gap-14">
        {PRINCIPLES.map((principle) => (
          <li key={principle.number} className="flex gap-5 sm:gap-7">
            <span
              aria-hidden="true"
              className="w-8 shrink-0 font-code text-[13px] font-medium leading-[23px] tracking-[0.04em] text-neutral-400"
            >
              {principle.number}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-heading-3 font-heading-3 text-default-font">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-2xl text-prose font-prose text-neutral-600 dark:text-neutral-500">
                {principle.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* quiet onward links — the principles are elaborated in the docs */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-default-border pt-6">
        <Link to="/materials" className={linkClass}>
          The material system, in full
          <span aria-hidden="true" className="ml-1.5 text-neutral-400">
            →
          </span>
        </Link>
        <Link to="/foundations" className={linkClass}>
          Type, color and geometry
          <span aria-hidden="true" className="ml-1.5 text-neutral-400">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
