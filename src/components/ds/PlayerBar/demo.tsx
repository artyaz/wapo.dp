"use client";

/**
 * PlayerBar demo — a live excerpt player: StatusBadge (built into the header
 * row) reading Live, a tabular position, a two-line serif excerpt and an
 * explain action. Contained to the demo width budget via max-w.
 */

import React from "react";
import { PlayerBar } from "@/components/ds/PlayerBar";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <PlayerBar
        className="max-w-[560px]"
        position="03:12 / 18:40"
        explainLabel="Explain"
        excerpt="The material system earns its elevation from light — refraction at the rim, a quiet sheen across the body — so nothing here casts a hard shadow over the page."
      />
    </div>
  );
}

export const demoSource = `<PlayerBar
  className="max-w-[560px]"
  position="03:12 / 18:40"
  explainLabel="Explain"
  excerpt="The material system earns its elevation from light — refraction at the rim, a quiet sheen across the body — so nothing here casts a hard shadow over the page."
/>`;
