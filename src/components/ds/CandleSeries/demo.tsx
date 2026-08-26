"use client";

/**
 * Demo — a quiet quote card for the Praxis Daily Index. The authored
 * CandleSeries snapshot sits above the same visual language at model scale:
 * forty OHLC sessions from a seeded sine + drift generator with a literal
 * seed, computed once at module scope. Fully deterministic — no randomness,
 * no clocks.
 */

import React from "react";
import { CandleSeries } from "@/components/ds/CandleSeries";

/* ------------------------------------------------------------------ *
 * Deterministic 40-session OHLC model (seeded sine + drift)           *
 * ------------------------------------------------------------------ */

const SEED = 0x50584e; // "PXN" — fixed literal seed
const SESSIONS = 40;

/** mulberry32 — small deterministic PRNG; seeded once at module scope. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const CANDLES: Candle[] = (() => {
  const rand = mulberry32(SEED);
  const candles: Candle[] = [];
  let close = 101.4;
  for (let i = 0; i < SESSIONS; i++) {
    const open = close;
    // slow swing around a mild upward drift, plus seeded session noise
    const swing = Math.sin((i / SESSIONS) * Math.PI * 2.2 + 0.7) * 0.45;
    close = open + 0.05 + swing + (rand() - 0.5) * 1.5;
    const high = Math.max(open, close) + rand() * 0.55;
    const low = Math.min(open, close) - rand() * 0.55;
    const volume = 0.55 + rand() * 0.45 + Math.abs(close - open);
    candles.push({ open, high, low, close, volume });
  }
  return candles;
})();

const LAST = CANDLES[SESSIONS - 1];
const PREVIOUS = CANDLES[SESSIONS - 2];
const LAST_CLOSE = LAST.close.toFixed(2);
const CHANGE = ((LAST.close - PREVIOUS.close) / PREVIOUS.close) * 100;
const CHANGE_LABEL = (CHANGE >= 0 ? "+" : "−") + Math.abs(CHANGE).toFixed(2) + "%";

/** Price axis: four labels at 0.5-quantized steps spanning every candle. */
const MIN_LOW = Math.min(...CANDLES.map((c) => c.low));
const MAX_HIGH = Math.max(...CANDLES.map((c) => c.high));
const AXIS_STEP = Math.max(0.5, Math.ceil(((MAX_HIGH - MIN_LOW) / 3) / 0.5) * 0.5);
const AXIS_LOW = Math.floor(MIN_LOW / 0.5) * 0.5;
const AXIS_HIGH = AXIS_LOW + AXIS_STEP * 3;
const GRID_PRICES = [
  AXIS_HIGH,
  AXIS_HIGH - AXIS_STEP,
  AXIS_HIGH - AXIS_STEP * 2,
  AXIS_LOW,
];

const MAX_VOLUME = Math.max(...CANDLES.map((c) => c.volume));

/** Chart geometry — the component's proportions at model width. */
const CHART_HEIGHT = 88;
const CHART_PADDING = 5;
const VOLUME_HEIGHT = 14;

const priceToY = (price: number) =>
  CHART_PADDING +
  ((AXIS_HIGH - price) / (AXIS_HIGH - AXIS_LOW)) *
    (CHART_HEIGHT - 2 * CHART_PADDING);

/** Slot math as percentages of chart width (40 sessions across). */
const SLOT = 100 / SESSIONS;
const BODY_WIDTH = 1.9; // ≈ 10px at 528px
const WICK_WIDTH = 0.4; // ≈ 2px at 528px
const candleLeft = (i: number, width: number) => i * SLOT + (SLOT - width) / 2;

export default function Demo() {
  return (
    <div className="w-full max-w-[560px] rounded-lg border border-solid border-default-border bg-panel p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-code text-[11px] uppercase tracking-[0.08em] text-neutral-500">
          PXN · Praxis Daily Index
        </span>
        <span className="font-code text-[11px] text-neutral-400 tabular-nums">
          {LAST_CLOSE}
          <span className="ml-2">{CHANGE_LABEL}</span>
        </span>
      </div>

      {/* The component: authored fourteen-session snapshot */}
      <CandleSeries />

      {/* The pattern at model scale: forty deterministic sessions */}
      <div className="mt-3">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="font-code text-[9px] font-[400] uppercase tracking-[0.08em] text-neutral-400">
            model · 40 sessions
          </span>
          <div className="h-px flex-1 bg-default-border" />
        </div>
        <div className="relative w-full" style={{ height: CHART_HEIGHT }}>
          <div className="absolute inset-0 pointer-events-none">
            {GRID_PRICES.map((price) => (
              <div
                key={price}
                className="flex h-px w-full flex-none items-center absolute left-0 right-0"
                style={{ top: priceToY(price) }}
              >
                <div className="flex h-px flex-1 items-start bg-default-border" />
                <span className="flex-none pl-1.5 font-code text-[9px] font-[400] leading-[9px] text-neutral-400 tabular-nums">
                  {price.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 right-[34px]">
            {CANDLES.map((candle, i) => {
              const up = candle.close >= candle.open;
              return (
                <React.Fragment key={i}>
                  <div
                    className="absolute flex-none bg-neutral-400"
                    style={{
                      left: `${candleLeft(i, WICK_WIDTH)}%`,
                      width: `${WICK_WIDTH}%`,
                      top: priceToY(candle.high),
                      height: priceToY(candle.low) - priceToY(candle.high),
                    }}
                  />
                  <div
                    className={`absolute flex-none rounded-[1px] ${
                      up ? "bg-default-font/80" : "bg-default-font/35"
                    }`}
                    style={{
                      left: `${candleLeft(i, BODY_WIDTH)}%`,
                      width: `${BODY_WIDTH}%`,
                      top: priceToY(Math.max(candle.open, candle.close)),
                      height: Math.max(
                        2,
                        Math.abs(priceToY(candle.open) - priceToY(candle.close))
                      ),
                    }}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="mt-[2px] h-px w-full flex-none bg-default-border" />
        <div className="relative mt-[2px] w-full" style={{ height: VOLUME_HEIGHT }}>
          <div className="absolute inset-y-0 left-0 right-[34px]">
            {CANDLES.map((candle, i) => (
              <div
                key={i}
                className={`absolute bottom-0 flex-none rounded-[1px] ${
                  i === SESSIONS - 1 ? "bg-default-font/40" : "bg-neutral-300"
                }`}
                style={{
                  left: `${candleLeft(i, BODY_WIDTH)}%`,
                  width: `${BODY_WIDTH}%`,
                  height: Math.max(
                    2,
                    (candle.volume / MAX_VOLUME) * VOLUME_HEIGHT
                  ),
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex justify-between">
        <span className="font-code text-[10px] text-neutral-400">
          snapshot + 40-session model
        </span>
        <span className="font-code text-[10px] text-neutral-400">
          seeded sine + drift · 0x50584e
        </span>
      </div>
    </div>
  );
}

export const demoSource = `<div className="w-full max-w-[560px] rounded-lg border border-solid border-default-border bg-panel p-4">
  <CandleSeries />
</div>`;
