// Measurement probe for ds:InspectorRow color-variant swatch/hex gap (task fix-c5-11)
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/home/z/.npm-global/lib/node_modules/playwright");

const URL_ = "http://localhost:3000/eval/pair-064";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 420 }, deviceScaleFactor: 2 });
await page.goto(URL_, { waitUntil: "load", timeout: 90_000 });
await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
await page.evaluate(() => {
  document.documentElement.classList.add("dark");
  document.documentElement.setAttribute("dir", "ltr");
  document.documentElement.style.colorScheme = "dark";
});
await page.evaluate(() => document.fonts?.ready?.catch?.(() => {}) ?? undefined).catch(() => {});
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  // find the InspectorRow whose label is "accent"
  const rows = [...document.querySelectorAll("div")].filter(
    (d) => d.className && String(d.className).includes("group/4f1d3bcc")
  );
  const out = [];
  for (const row of rows) {
    const label = row.querySelector(":scope > span");
    if (!label || label.textContent.trim() !== "accent") continue;
    // color variant container: the flex div holding the swatch + hex span
    const valueSide = [...row.children].find((c) => c.tagName === "DIV");
    const colorBox = [...valueSide.querySelectorAll(":scope > div")].find(
      (d) => getComputedStyle(d).display === "flex" && d.querySelector(":scope > div.h-3, :scope > div.w-3")
    );
    const swatch = colorBox.querySelector(":scope > div");
    const hex = colorBox.querySelector(":scope > span");
    const r = (el) => el.getBoundingClientRect();
    const sw = r(swatch), hx = r(hex), cb = r(colorBox), rb = r(row);
    const cs = getComputedStyle(colorBox);
    out.push({
      row: { x: rb.x, w: rb.width, right: rb.right },
      colorBox: { x: cb.x, w: cb.width, right: cb.right, display: cs.display, gap: cs.gap },
      swatch: { x: sw.x, w: sw.width, right: sw.right, y: sw.y, h: sw.height, border: getComputedStyle(swatch).borderTopWidth, bg: getComputedStyle(swatch).backgroundColor },
      hex: { x: hx.x, w: hx.width, right: hx.right, y: hx.y, h: hx.height, fontSize: getComputedStyle(hex).fontSize, font: getComputedStyle(hex).fontFamily.slice(0, 40), text: hex.textContent },
      gapPx: +(hx.x - sw.right).toFixed(2),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      docScrollW: document.documentElement.scrollWidth,
      docClientW: document.documentElement.clientWidth,
    });
  }
  return out;
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
