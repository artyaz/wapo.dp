#!/usr/bin/env node
/**
 * probe-avatar.mjs — measure AvatarGroup geometry (RTL vs LTR) + fallback contrast
 * Usage: node /home/z/my-project/wapo.dp/qa/tmp-mc/probe-avatar.mjs <pairId> <dir>
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/home/z/.npm-global/lib/node_modules/playwright");

const pairId = process.argv[2] || "pair-004";
const dir = process.argv[3] || "rtl";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`http://localhost:3000/eval/${pairId}?_t=${Date.now()}`, { waitUntil: "load", timeout: 90_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
  await page.evaluate(([t, d]) => {
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.setAttribute("dir", d);
    document.documentElement.style.colorScheme = t;
  }, ["dark", dir]);
  await page.waitForTimeout(1200);

  const data = await page.evaluate(() => {
    const groups = [...document.querySelectorAll('[data-slot="avatar-group"]')];
    const out = [];
    for (const g of groups) {
      const cs = getComputedStyle(g);
      const kids = [...g.children].map((k) => {
        const r = k.getBoundingClientRect();
        const s = getComputedStyle(k);
        return {
          slot: k.getAttribute("data-slot"),
          x: Math.round(r.x), right: Math.round(r.right), y: Math.round(r.y),
          w: Math.round(r.width), h: Math.round(r.height),
          marginLeft: s.marginLeft, marginRight: s.marginRight, z: s.zIndex,
        };
      });
      out.push({ groupDir: cs.direction, kids });
      // top-most element at each overlap seam
      const seams = [];
      for (let i = 0; i < kids.length - 1; i++) {
        const a = kids[i], b = kids[i + 1];
        const seamX = Math.round((Math.max(a.x, b.x) + Math.min(a.right, b.right)) / 2);
        const y = a.y + a.h / 2;
        const top = document.elementFromPoint(seamX, y);
        seams.push({ between: `${a.slot}->${b.slot}`, seamX, topSlot: top?.closest("[data-slot]")?.getAttribute("data-slot") });
      }
      out[out.length - 1].seams = seams;
    }
    // fallback contrast info
    const fb = document.querySelector('[data-slot="avatar-fallback"]');
    const fbStyle = fb ? getComputedStyle(fb) : null;
    const count = document.querySelector('[data-slot="avatar-group-count"]');
    const countStyle = count ? getComputedStyle(count) : null;
    const ringEl = document.querySelector('[data-slot="avatar"]');
    const ringStyle = ringEl ? getComputedStyle(ringEl, "::after") : null;
    return {
      groups: out,
      fallback: fbStyle ? { color: fbStyle.color, bg: fbStyle.backgroundColor } : null,
      count: countStyle ? { color: countStyle.color, bg: countStyle.backgroundColor } : null,
      avatarAfter: ringStyle ? { borderColor: ringStyle.borderColor } : null,
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
