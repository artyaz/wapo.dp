#!/usr/bin/env node
/** precise stacking check: which child is topmost at each overlap seam */
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
  }, ["dark", dir]);
  await page.waitForTimeout(1200);
  const out = await page.evaluate(() => {
    const g = document.querySelector('[data-slot="avatar-group"]');
    const kids = [...g.children];
    const seams = [];
    for (let i = 0; i < kids.length - 1; i++) {
      const a = kids[i].getBoundingClientRect();
      const b = kids[i + 1].getBoundingClientRect();
      const x = (Math.max(a.x, b.x) + Math.min(a.right, b.right)) / 2;
      const y = a.y + a.height / 2;
      const top = document.elementFromPoint(x, y);
      const idx = kids.findIndex((k) => k === top || k.contains(top));
      seams.push({
        pair: `${kids[i].dataset.slot}#${i} & ${kids[i + 1].dataset.slot}#${i + 1}`,
        overlapPx: Math.round(Math.min(a.right, b.right) - Math.max(a.x, b.x)),
        onTopIndex: idx,
        onTopIsLaterDom: idx === i + 1,
      });
    }
    return seams;
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();
