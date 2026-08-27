// Measurement probe #2: color-variant swatch/hex gap on pair-080 (desktop dark) — task fix-c5-11
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/home/z/.npm-global/lib/node_modules/playwright");

const browser = await chromium.launch();

async function probe(url, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "load", timeout: 90_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
  await page.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.style.colorScheme = "dark";
  });
  await page.evaluate(() => document.fonts?.ready?.catch?.(() => {}) ?? undefined).catch(() => {});
  await page.waitForTimeout(1200);
  const data = await page.evaluate(() => {
    const rows = [...document.querySelectorAll("div")].filter(
      (d) => d.className && String(d.className).includes("group/4f1d3bcc")
    );
    const out = [];
    for (const row of rows) {
      const label = row.querySelector(":scope > span");
      if (!label || label.textContent.trim() !== "accent") continue;
      const valueSide = [...row.children].find((c) => c.tagName === "DIV");
      const colorBox = [...valueSide.querySelectorAll(":scope > div")].find(
        (d) => getComputedStyle(d).display === "flex" && d.querySelector(":scope > div.h-3, :scope > div.w-3")
      );
      const swatch = colorBox.querySelector(":scope > div");
      const hex = colorBox.querySelector(":scope > span");
      const sw = swatch.getBoundingClientRect(), hx = hex.getBoundingClientRect(), rb = row.getBoundingClientRect();
      out.push({
        rowRight: +rb.right.toFixed(1),
        swatchRight: +sw.right.toFixed(1),
        hexLeft: +hx.x.toFixed(1),
        gapPx: +(hx.x - sw.right).toFixed(2),
        swatchSize: `${sw.width}x${sw.height}`,
        hexText: hex.textContent,
        docOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      });
    }
    return out;
  });
  await page.close();
  return data;
}

console.log("pair-080 (1280x800 dark):", JSON.stringify(await probe("http://localhost:3000/eval/pair-080", 1280, 800)));
await browser.close();
